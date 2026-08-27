import { cn } from "@/lib/utils";
import { formatCurrency, maskAccountNumber } from "@/lib/format";
import type { Account, Profile } from "./types";

export function BalanceCard({
  account,
  profile,
}: {
  account: Account | null;
  profile: Profile | null;
}) {
  const accountType = account?.account_type ?? "USD Saving";
  const isActive = account?.is_active === true;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#180934] via-[#2a1048] to-[#120623] p-6 text-white shadow-xl ring-1 ring-white/10">
      <div
        className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-[#f5c962]/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-10 size-64 rounded-full bg-[#f5c962]/10 blur-3xl"
        aria-hidden
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
            Available balance
          </p>
          <p className="mt-2 font-heading text-4xl font-extralight tracking-tight text-white">
            {formatCurrency(account?.balance)}
          </p>
        </div>
        <span className="shrink-0 rounded-4xl border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-semibold text-[#f5c962]">
          {accountType}
        </span>
      </div>

      <div className="relative mt-8 flex items-center justify-between">
        <div className="flex h-9 w-12 items-center justify-center rounded-md bg-gradient-to-br from-[#f5c962] to-[#d9a83a]">
          <div className="grid h-5 w-7 grid-cols-3 gap-px">
            <span className="rounded-[2px] bg-[#180934]/70" />
            <span className="rounded-[2px] bg-[#180934]/70" />
            <span className="rounded-[2px] bg-[#180934]/70" />
            <span className="rounded-[2px] bg-[#180934]/70" />
            <span className="rounded-[2px] bg-[#180934]/70" />
            <span className="rounded-[2px] bg-[#180934]/70" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={cn(
              "size-2 rounded-full",
              isActive ? "bg-[#22c55e]" : "bg-white/40"
            )}
          />
          <span className="text-xs font-semibold text-white/70">
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      <div className="relative mt-8 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
            Account number
          </p>
          <p className="mt-1 font-mono text-sm text-white/90">
            {maskAccountNumber(account?.account_number)}
          </p>
        </div>
        <div className="min-w-0 text-right">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
            Account holder
          </p>
          <p className="mt-1 truncate text-sm font-semibold text-white/90">
            {profile?.full_name ?? "Account holder"}
          </p>
        </div>
      </div>

      <div className="relative mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs">
        <span className="text-white/50">Interest rate</span>
        <span className="font-semibold text-[#f5c962]">
          {account?.interest_rate != null
            ? `${account.interest_rate}% APY`
            : "—"}
        </span>
      </div>
    </div>
  );
}
