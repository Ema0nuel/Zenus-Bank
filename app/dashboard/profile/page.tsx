"use client";

import type * as React from "react";
import { useState } from "react";

import { bankConfig } from "@/lib/bank-config";
import { maskAccountNumber } from "@/lib/format";
import { getBrowserClient } from "@/lib/supabase/browser";
import { useAuthStore } from "@/stores/auth-store";
import { useMoney } from "@/hooks/use-preferences";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, NativeSelect } from "@/components/dashboard/field";
import { PageHeader } from "@/components/dashboard/page-header";
import { getInitials } from "@/lib/format";
import type { Account, Profile } from "@/components/dashboard/types";

const genders = ["Male", "Female", "Non-binary", "Prefer not to say"];
const marital = ["Single", "Married", "Divorced", "Widowed"];

type Editable = {
  full_name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  dob: string;
  occupation: string;
  gender: string;
  marital_status: string;
  nationality: string;
};

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile) as Profile | null;
  const account = useAuthStore((s) => s.account) as Account | null;
  const { amount } = useMoney();

  const [form, setForm] = useState<Editable>(() => ({
    full_name: profile?.full_name ?? "",
    phone: profile?.phone ?? "",
    address: profile?.address ?? "",
    city: profile?.city ?? "",
    state: profile?.state ?? "",
    zip: profile?.zip ?? "",
    dob: profile?.dob ?? "",
    occupation: profile?.occupation ?? "",
    gender: profile?.gender ?? "",
    marital_status: profile?.marital_status ?? "",
    nationality: profile?.nationality ?? "",
  }));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof Editable>(key: K, value: Editable[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setSaved(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user?.id) return;
    setSaving(true);
    setError("");
    setSaved(false);

    const supabase = getBrowserClient();
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ ...form })
      .eq("id", user.id);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    setSaved(true);
  }

  const name = profile?.full_name ?? "Account holder";

  return (
    <div className="space-y-8">
      <PageHeader
        title="Profile"
        description="View your account details and update your personal information."
        crumbs={[{ label: "Profile" }]}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <section className="space-y-4 rounded-2xl border border-border bg-card p-5">
          <div className="flex flex-col items-center gap-3 text-center">
            <Avatar size="lg">
              <AvatarFallback className="text-lg">
                {getInitials(profile?.full_name ?? profile?.username ?? "")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-foreground">{name}</p>
              <p className="text-xs text-muted-foreground">{profile?.email ?? ""}</p>
            </div>
          </div>

          <dl className="space-y-2 border-t border-border pt-4 text-sm">
            <InfoRow label="Balance" value={amount(account?.balance)} />
            <InfoRow label="Account number" value={maskAccountNumber(account?.account_number)} mono />
            <InfoRow label="Account type" value={account?.account_type ?? "—"} />
            <InfoRow
              label="Status"
              value={account?.is_active ? "Active" : "Inactive"}
            />
            <InfoRow
              label="Interest"
              value={
                account?.interest_rate != null
                  ? `${account.interest_rate}% APY`
                  : "—"
              }
            />
          </dl>
        </section>

        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-2xl border border-border bg-card p-5 lg:col-span-2"
        >
          <h2 className="font-heading text-lg font-medium text-foreground">
            Personal information
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Full name" htmlFor="full_name">
              <Input
                id="full_name"
                value={form.full_name}
                onChange={(e) => set("full_name", e.target.value)}
              />
            </Field>
            <Field label="Phone" htmlFor="phone">
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </Field>
            <Field label="Date of birth" htmlFor="dob">
              <Input
                id="dob"
                type="date"
                value={form.dob}
                onChange={(e) => set("dob", e.target.value)}
              />
            </Field>
            <Field label="Occupation" htmlFor="occupation">
              <Input
                id="occupation"
                value={form.occupation}
                onChange={(e) => set("occupation", e.target.value)}
              />
            </Field>
            <Field label="Gender" htmlFor="gender">
              <NativeSelect
                id="gender"
                value={form.gender}
                onChange={(e) => set("gender", e.target.value)}
              >
                <option value="">Select</option>
                {genders.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </NativeSelect>
            </Field>
            <Field label="Marital status" htmlFor="marital_status">
              <NativeSelect
                id="marital_status"
                value={form.marital_status}
                onChange={(e) => set("marital_status", e.target.value)}
              >
                <option value="">Select</option>
                {marital.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </NativeSelect>
            </Field>
            <Field label="Address" htmlFor="address" className="sm:col-span-2">
              <Input
                id="address"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
              />
            </Field>
            <Field label="City" htmlFor="city">
              <Input
                id="city"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
              />
            </Field>
            <Field label="State / province" htmlFor="state">
              <Input
                id="state"
                value={form.state}
                onChange={(e) => set("state", e.target.value)}
              />
            </Field>
            <Field label="ZIP / postal code" htmlFor="zip">
              <Input
                id="zip"
                value={form.zip}
                onChange={(e) => set("zip", e.target.value)}
              />
            </Field>
            <Field label="Nationality" htmlFor="nationality">
              <Input
                id="nationality"
                value={form.nationality}
                onChange={(e) => set("nationality", e.target.value)}
              />
            </Field>
          </div>

          {error && <p className="text-xs text-destructive">{error}</p>}
          {saved && <p className="text-xs text-success">Profile updated.</p>}

          <div className="flex items-center justify-between pt-2">
            <a
              href={`mailto:${bankConfig.adminEmail}`}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Contact support
            </a>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InfoRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={mono ? "font-mono text-xs" : "font-medium"}>{value}</dd>
    </div>
  );
}
