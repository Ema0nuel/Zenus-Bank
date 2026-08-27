"use client";

import type * as React from "react";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { bankConfig } from "@/lib/bank-config";
import { formatCurrency } from "@/lib/format";
import { createNotification } from "@/lib/notifications";
import { sendEmail } from "@/lib/emails";
import { sendActionOtpEmail, storeOtp, verifyOtp } from "@/lib/otp";
import { getBrowserClient } from "@/lib/supabase/browser";
import { useAuthStore } from "@/stores/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AccountStatCards } from "@/components/dashboard/account-stat-cards";
import { Field, NativeSelect, Textarea } from "@/components/dashboard/field";
import { OtpDialog } from "@/components/dashboard/otp-dialog";
import { PageHeader } from "@/components/dashboard/page-header";
import type { Account, Profile } from "@/components/dashboard/types";

export default function WithdrawalPage() {
  const user = useAuthStore((s) => s.user);
  const profile = useAuthStore((s) => s.profile) as Profile | null;
  const account = useAuthStore((s) => s.account) as Account | null;

  const [form, setForm] = useState({
    amount: "",
    description: "",
    bank: "",
    account_number: "",
    account_name: "",
    account_type: bankConfig.withdrawalAccountTypes[0]?.value ?? "local",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [done, setDone] = useState(false);

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user?.id || !account?.id) return;
    setError("");

    const amount = Number.parseFloat(form.amount);
    if (Number.isNaN(amount) || amount < bankConfig.limits.minWithdrawal) {
      setError(`Minimum withdrawal is ${formatCurrency(bankConfig.limits.minWithdrawal)}.`);
      return;
    }
    if (!form.bank.trim() || !form.account_number.trim() || !form.account_name.trim()) {
      setError("Bank, account number, and account name are required.");
      return;
    }

    setSubmitting(true);
    try {
      const otp = await storeOtp(user.id, "withdrawal");
      await sendActionOtpEmail({
        to: profile?.email ?? user.email ?? "",
        name: profile?.full_name ?? undefined,
        otp,
        actionLabel: "withdrawal",
        details: `Amount: <b>${formatCurrency(amount)}</b><br/>Bank: ${form.bank}<br/>Account: ${form.account_number}`,
      });
      setOtpOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  async function onVerify(code: string) {
    if (!user?.id || !account?.id) return;
    setOtpLoading(true);
    setOtpError("");

    const valid = await verifyOtp(user.id, "withdrawal", code);
    if (!valid) {
      setOtpError("Invalid or expired code.");
      setOtpLoading(false);
      return;
    }

    const amount = Number.parseFloat(form.amount);
    const balance = account.balance ?? 0;

    const supabase = getBrowserClient();
    const { error: txError } = await supabase.from("transactions").insert({
      account_id: account.id,
      user_id: user.id,
      type: "withdrawal",
      amount,
      description: form.description.trim() || "Withdrawal request",
      balance_before: balance,
      balance_after: balance,
      status: "pending",
    });

    if (txError) {
      setOtpError(txError.message);
      setOtpLoading(false);
      return;
    }

    await createNotification({
      userId: user.id,
      title: "Withdrawal request submitted",
      message: `Your withdrawal request of ${formatCurrency(amount)} is pending approval.`,
      type: "info",
    });

    if (profile?.email) {
      await sendEmail({
        to: profile.email,
        subject: "Withdrawal request received",
        html: `<p>Hi ${profile.full_name ?? "there"},</p><p>Your withdrawal request of <b>${formatCurrency(amount)}</b> has been received and is pending approval.</p>`,
      });
    }

    setOtpLoading(false);
    setOtpOpen(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="space-y-8">
        <PageHeader title="Withdrawal" crumbs={[{ label: "Withdrawal" }]} />
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card px-6 py-14 text-center">
          <CheckCircle2 className="size-10 text-success" />
          <h2 className="font-heading text-xl font-medium text-foreground">
            Withdrawal submitted
          </h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Your request has been recorded and is pending approval. You will be notified once
            it completes.
          </p>
          <Button variant="outline" onClick={() => setDone(false)}>
            Make another withdrawal
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Withdrawal"
        description="Request a withdrawal to an external account."
        crumbs={[{ label: "Withdrawal" }]}
      />

      <AccountStatCards />

      <form onSubmit={onSubmit} className="max-w-2xl space-y-4 rounded-2xl border border-border bg-card p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field
            label="Amount"
            htmlFor="w-amount"
            required
            hint={`Minimum ${formatCurrency(bankConfig.limits.minWithdrawal)}`}
          >
            <Input
              id="w-amount"
              type="number"
              min={bankConfig.limits.minWithdrawal}
              step="0.01"
              value={form.amount}
              onChange={(e) => set("amount", e.target.value)}
              placeholder="0.00"
            />
          </Field>
          <Field label="Account type" htmlFor="w-type">
            <NativeSelect
              id="w-type"
              value={form.account_type}
              onChange={(e) => set("account_type", e.target.value)}
            >
              {bankConfig.withdrawalAccountTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field label="Bank name" htmlFor="w-bank" required>
            <Input
              id="w-bank"
              value={form.bank}
              onChange={(e) => set("bank", e.target.value)}
              placeholder="Destination bank"
            />
          </Field>
          <Field label="Account number" htmlFor="w-account_number" required>
            <Input
              id="w-account_number"
              value={form.account_number}
              onChange={(e) => set("account_number", e.target.value)}
              placeholder="Destination account number"
            />
          </Field>
          <Field label="Account name" htmlFor="w-account_name" required>
            <Input
              id="w-account_name"
              value={form.account_name}
              onChange={(e) => set("account_name", e.target.value)}
              placeholder="Destination account holder"
            />
          </Field>
          <Field label="Description" htmlFor="w-desc" className="sm:col-span-2">
            <Textarea
              id="w-desc"
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Reference / note"
            />
          </Field>
        </div>

        {error && <p className="text-xs text-destructive">{error}</p>}

        <Button type="submit" disabled={submitting}>
          {submitting ? "Sending code…" : "Request withdrawal"}
        </Button>
      </form>

      <OtpDialog
        open={otpOpen}
        title="Verify withdrawal"
        description={`Enter the code sent to ${profile?.email ?? "your email"} to confirm this withdrawal.`}
        loading={otpLoading}
        error={otpError}
        onVerify={onVerify}
        onClose={() => setOtpOpen(false)}
      />
    </div>
  );
}
