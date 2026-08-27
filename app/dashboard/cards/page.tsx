"use client";

import type * as React from "react";
import { useEffect, useState } from "react";

import { bankConfig } from "@/lib/bank-config";
import { formatDateTime, maskAccountNumber } from "@/lib/format";
import { getCardStatusLabel, getCardStatusTone, maskCardNumber } from "@/lib/card-status";
import { createNotification } from "@/lib/notifications";
import { sendEmail } from "@/lib/emails";
import { getBrowserClient } from "@/lib/supabase/browser";
import { useAuthStore } from "@/stores/auth-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, NativeSelect } from "@/components/dashboard/field";
import { PageHeader } from "@/components/dashboard/page-header";
import type { Account, Card, Profile } from "@/components/dashboard/types";

function generateReference() {
  return Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join("");
}

export default function CardsPage() {
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile) as Profile | null;
  const account = useAuthStore((s) => s.account) as Account | null;

  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [cardType, setCardType] = useState(bankConfig.cardTypes[0]?.value ?? "");
  const [holder, setHolder] = useState(profile?.full_name ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const userId = user?.id;
    if (!userId) return;
    let active = true;
    async function load() {
      const supabase = getBrowserClient();
      const { data } = await supabase
        .from("cards")
        .select("*")
        .eq("user_id", userId)
        .order("issued_at", { ascending: false });
      if (active) {
        setCards((data as Card[]) ?? []);
        setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [user?.id]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user?.id || !account?.id) return;
    setError("");
    setSubmitting(true);

    const supabase = getBrowserClient();
    const typeLabel =
      bankConfig.cardTypes.find((c) => c.value === cardType)?.label ?? cardType;

    const { error: insertError } = await supabase.from("cards").insert({
      user_id: user.id,
      account_id: account.id,
      card_type: cardType,
      card_number: generateReference(),
      status: "pending",
    });

    if (insertError) {
      setError(insertError.message);
      setSubmitting(false);
      return;
    }

    await createNotification({
      userId: user.id,
      title: "Card request submitted",
      message: `Your ${typeLabel} request is pending approval.`,
      type: "info",
    });

    if (profile?.email) {
      await sendEmail({
        to: profile.email,
        subject: "Card request received",
        html: `<p>Hi ${profile.full_name ?? "there"},</p><p>Your ${typeLabel} request has been received and is pending approval.</p>`,
      });
    }

    setSubmitting(false);
    setHolder(profile?.full_name ?? "");
    const { data } = await supabase
      .from("cards")
      .select("*")
      .eq("user_id", user.id)
      .order("issued_at", { ascending: false });
    setCards((data as Card[]) ?? []);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Cards"
        description="Request a new card and track the status of your existing cards."
        crumbs={[{ label: "Cards" }]}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-2xl border border-border bg-card p-5"
        >
          <h2 className="font-heading text-lg font-medium text-foreground">Request a card</h2>
          <Field label="Card type" htmlFor="card-type" required>
            <NativeSelect
              id="card-type"
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
            >
              {bankConfig.cardTypes.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </NativeSelect>
          </Field>

          <Field label="Card holder" htmlFor="card-holder" required>
            <Input
              id="card-holder"
              value={holder}
              onChange={(e) => setHolder(e.target.value)}
              placeholder="Name on card"
            />
          </Field>

          {error && <p className="text-xs text-destructive">{error}</p>}

          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting…" : "Submit request"}
          </Button>
        </form>

        <section className="rounded-2xl border border-border bg-card p-5">
          <h2 className="font-heading text-lg font-medium text-foreground">Your cards</h2>
          {loading ? (
            <p className="mt-4 text-sm text-muted-foreground">Loading…</p>
          ) : cards.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No cards requested yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {cards.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold capitalize text-foreground">
                      {c.card_type ?? "Card"}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {maskCardNumber(c.card_number)}
                    </p>
                    {c.issued_at && (
                      <p className="text-[11px] text-muted-foreground">
                        {formatDateTime(c.issued_at)}
                      </p>
                    )}
                  </div>
                  <Badge variant={getCardStatusTone(c.status)}>
                    {getCardStatusLabel(c.status)}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-xs text-muted-foreground">
            Linked account {maskAccountNumber(account?.account_number)}
          </p>
        </section>
      </div>
    </div>
  );
}
