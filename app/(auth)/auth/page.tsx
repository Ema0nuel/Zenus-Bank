"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { MailCheck } from "lucide-react";

import { AuthShell } from "@/components/auth/auth-shell";
import { resendVerificationEmail } from "@/lib/auth";

const submitBtnClass =
  "inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-hover active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const emptySubscribe = () => () => {};

export default function EmailVerificationPage() {
  const email = useSyncExternalStore(
    emptySubscribe,
    () => (typeof window === "undefined" ? "" : sessionStorage.getItem("pendingEmail") ?? ""),
    () => ""
  );

  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");

  async function handleResend() {
    if (!email) {
      setError("No email found. Please sign up again.");
      return;
    }
    setLoading(true);
    setError("");
    setInfo("");
    try {
      await resendVerificationEmail(email);
      setInfo("Verification email resent. Please check your inbox.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not resend email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Verify your email"
      subtitle="One last step before you're in."
      footer={
        <p className="text-center font-sans text-sm font-semibold text-muted-foreground">
          <Link href="/" className="text-primary hover:underline">
            Home
          </Link>{" "}
          <span className="text-muted-foreground">|</span> Already have an
          account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      }
    >
      <div className="space-y-5">
        {error ? (
          <p className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 font-sans text-sm font-semibold text-danger">
            {error}
          </p>
        ) : null}
        {info ? (
          <p className="rounded-xl border border-success/30 bg-success/10 px-4 py-3 font-sans text-sm font-semibold text-success">
            {info}
          </p>
        ) : null}

        <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-6 py-10 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-primary-muted text-primary">
            <MailCheck className="size-6" strokeWidth={1.5} />
          </span>
          <p className="max-w-sm font-sans text-sm font-semibold leading-relaxed text-muted-foreground">
            We sent a verification link to{" "}
            <span className="text-foreground">{email || "your email"}</span>.
            Please check your inbox and spam folder to complete the process.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResend}
          disabled={loading || !email}
          className={submitBtnClass}
        >
          {loading ? "Sending..." : "Resend verification email"}
        </button>
      </div>
    </AuthShell>
  );
}
