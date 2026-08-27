"use client";

import type * as React from "react";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { bankConfig } from "@/lib/bank-config";
import { formatCurrency } from "@/lib/format";
import { createNotification } from "@/lib/notifications";
import { sendEmail } from "@/lib/emails";
import { getBrowserClient } from "@/lib/supabase/browser";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AccountStatCards } from "@/components/dashboard/account-stat-cards";
import { Field, Textarea } from "@/components/dashboard/field";
import { PageHeader } from "@/components/dashboard/page-header";
import type { Account, Profile } from "@/components/dashboard/types";

export default function DepositPage() {
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile) as Profile | null;
  const account = useAuthStore((s) => s.account) as Account | null;

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user?.id || !account?.id) return;
    setError("");

    const value = Number.parseFloat(amount);
    if (Number.isNaN(value) || value < bankConfig.limits.minDeposit) {
      setError(`Minimum deposit is ${formatCurrency(bankConfig.limits.minDeposit)}.`);
      return;
    }

    setSubmitting(true);
    const supabase = getBrowserClient();
    const balance = account.balance ?? 0;

    const { error: txError } = await supabase.from("transactions").insert({
      account_id: account.id,
      user_id: user.id,
      type: "deposit",
      amount: value,
      description: description.trim() || "Deposit request",
      balance_before: balance,
      balance_after: balance,
      status: "pending",
    });

    if (txError) {
      setError(txError.message);
      setSubmitting(false);
      return;
    }

    await createNotification({
      userId: user.id,
      title: "Deposit request recorded",
      message: `Your deposit request of ${formatCurrency(value)} is pending processing.`,
      type: "info",
    });

    if (profile?.email) {
      await sendEmail({
        to: profile.email,
        subject: "Deposit request received",
        html: `<p>Hi ${profile.full_name ?? "there"},</p><p>Your deposit request of <b>${formatCurrency(value)}</b> has been received and is pending processing.</p>`,
      });
    }

    setSubmitting(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="space-y-8">
        <PageHeader title="Deposit" crumbs={[{ label: "Deposit" }]} />
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-6 py-14 text-center">
          <CheckCircle2 className="size-10 text-success" />
          <h2 className="font-heading text-xl font-medium text-foreground">
            Deposit request recorded
          </h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Your request has been received and is pending processing. You will be notified
            once it completes.
          </p>
          <Button variant="outline" onClick={() => setDone(false)}>
            Make another deposit
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Deposit"
        description="Request a deposit into your account."
        crumbs={[{ label: "Deposit" }]}
      />

      <AccountStatCards />

      <form onSubmit={onSubmit} className="max-w-xl space-y-4 rounded-2xl border border-border bg-card p-5">
        <Field
          label="Amount"
          htmlFor="deposit-amount"
          required
          hint={`Minimum ${formatCurrency(bankConfig.limits.minDeposit)}`}
        >
          <Input
            id="deposit-amount"
            type="number"
            min={bankConfig.limits.minDeposit}
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
        </Field>

        <Field label="Description" htmlFor="deposit-desc">
          <Textarea
            id="deposit-desc"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Monthly savings"
          />
        </Field>

        {error && <p className="text-xs text-destructive">{error}</p>}

        <Button type="submit" disabled={submitting}>
          {submitting ? "Submitting…" : "Submit deposit request"}
        </Button>
      </form>
    </div>
  );
}
