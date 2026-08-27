"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { AuthShell } from "@/components/auth/auth-shell";
import { inputClass } from "@/components/auth/password-input";
import { loginAndSendOtp, verifyOtp } from "@/lib/auth";
import { useAuthStore } from "@/stores/auth-store";

const LAST_ACCESS_KEY = "lastAccessID";

const labelClass =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground";

const submitBtnClass =
  "inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-hover active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const emptySubscribe = () => () => {};

export default function VerifyPage() {
  const router = useRouter();
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);

  const lastAccessID = useSyncExternalStore(
    emptySubscribe,
    () => (typeof window === "undefined" ? "" : sessionStorage.getItem(LAST_ACCESS_KEY) ?? ""),
    () => ""
  );

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setInfo("");

    if (otp.length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }

    setLoading(true);
    try {
      const user = await verifyOtp(lastAccessID, otp);
      sessionStorage.removeItem(LAST_ACCESS_KEY);
      await setAuthenticated(user);
      router.replace("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid or expired OTP.");
      setLoading(false);
    }
  }

  async function handleResend() {
    if (!lastAccessID) {
      setError("Please login again to resend OTP.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await loginAndSendOtp(lastAccessID, "");
      setInfo("OTP resent to your email.");
    } catch {
      setError("Could not resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Verify login"
      subtitle="Enter the one-time password sent to your email."
      footer={
        <p className="text-center font-sans text-sm font-semibold text-muted-foreground">
          <Link href="/" className="text-primary hover:underline">
            Home
          </Link>{" "}
          <span className="text-muted-foreground">|</span> Didn&apos;t receive
          the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="text-primary hover:underline"
          >
            Resend
          </button>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
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

        <div>
          <label htmlFor="otp" className={labelClass}>
            One-time code
          </label>
          <input
            id="otp"
            className={inputClass}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="Enter 6-digit code"
          />
        </div>

        <button type="submit" disabled={loading} className={submitBtnClass}>
          {loading ? "Verifying..." : "Log in"}
        </button>
      </form>
    </AuthShell>
  );
}
