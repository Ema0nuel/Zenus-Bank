import Link from "next/link";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDateTime } from "@/lib/format";
import type { Transaction } from "./types";

const creditTypes = ["deposit", "credit", "incoming", "interest", "refund", "topup"];

function isCredit(type: string | null): boolean {
  return creditTypes.includes((type ?? "").toLowerCase());
}

export function RecentTransactions({
  transactions,
  loading,
}: {
  transactions: Transaction[];
  loading: boolean;
}) {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Recent activity
        </h2>
        <Link
          href="/dashboard/history"
          className="text-xs font-semibold text-primary hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {loading ? (
          <p className="p-6 text-sm text-muted-foreground">Loading…</p>
        ) : transactions.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">
            No transactions yet.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {transactions.map((t) => {
              const credit = isCredit(t.type);
              return (
                <li key={t.id} className="flex items-center gap-3 px-4 py-3">
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-full",
                      credit
                        ? "bg-success/10 text-success"
                        : "bg-primary-muted text-primary"
                    )}
                  >
                    {credit ? (
                      <ArrowDownLeft className="size-4" />
                    ) : (
                      <ArrowUpRight className="size-4" />
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {t.description || t.type || "Transaction"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDateTime(t.created_at)}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p
                      className={cn(
                        "font-mono text-sm font-semibold",
                        credit ? "text-success" : "text-foreground"
                      )}
                    >
                      {credit ? "+" : "−"}
                      {formatCurrency(t.amount)}
                    </p>
                    <Badge variant="outline" className="mt-1">
                      {t.status ?? "Completed"}
                    </Badge>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
