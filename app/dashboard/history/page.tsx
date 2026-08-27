"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { formatDateTime } from "@/lib/format";
import { getBrowserClient } from "@/lib/supabase/browser";
import { useAuthStore } from "@/stores/auth-store";
import { useMoney } from "@/hooks/use-preferences";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/dashboard/page-header";
import type { Account, Transaction } from "@/components/dashboard/types";

const creditTypes = ["deposit", "credit", "incoming", "interest", "refund", "topup"];

function isCredit(type: string | null) {
  return creditTypes.includes((type ?? "").toLowerCase());
}

function statusTone(status: string | null): "default" | "secondary" | "destructive" | "outline" {
  switch (status?.toLowerCase()) {
    case "completed":
    case "approved":
      return "default";
    case "declined":
    case "failed":
    case "rejected":
      return "destructive";
    case "pending":
      return "outline";
    default:
      return "secondary";
  }
}

export default function HistoryPage() {
  const account = useAuthStore((s) => s.account) as Account | null;
  const { format } = useMoney();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Transaction | null>(null);

  useEffect(() => {
    const accountId = account?.id;
    if (!accountId) return;
    let active = true;
    async function load() {
      const supabase = getBrowserClient();
      const { data } = await supabase
        .from("transactions")
        .select("*")
        .eq("account_id", accountId)
        .order("created_at", { ascending: false })
        .limit(100);
      if (active) {
        setTransactions((data as Transaction[]) ?? []);
        setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [account?.id]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="History"
        description="Your account statement and full transaction history."
        crumbs={[{ label: "History" }]}
      />

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {loading ? (
          <p className="p-6 text-sm text-muted-foreground">Loading…</p>
        ) : transactions.length === 0 ? (
          <p className="p-6 text-sm text-muted-foreground">No transactions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Description</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 text-right font-semibold">Amount</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => {
                  const credit = isCredit(t.type);
                  return (
                    <tr
                      key={t.id}
                      className="cursor-pointer border-b border-border last:border-0 hover:bg-muted/50"
                      onClick={() => setSelected(t)}
                    >
                      <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                        {formatDateTime(t.created_at)}
                      </td>
                      <td className="px-4 py-3">{t.description || t.type || "Transaction"}</td>
                      <td className="px-4 py-3 capitalize text-muted-foreground">{t.type}</td>
                      <td
                        className={cn(
                          "px-4 py-3 text-right font-mono font-semibold",
                          credit ? "text-success" : "text-foreground"
                        )}
                      >
                        {credit ? "+" : "−"}
                        {format(t.amount)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={statusTone(t.status)}>{t.status ?? "Pending"}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Transaction receipt"
            className="w-full max-w-md rounded-2xl border border-border bg-popover p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h2 className="font-heading text-lg font-medium text-foreground">Transaction receipt</h2>
              <Button variant="ghost" size="icon-sm" onClick={() => setSelected(null)} aria-label="Close">
                <X className="size-4" />
              </Button>
            </div>

            <dl className="mt-4 space-y-2 text-sm">
              <Row label="Reference" value={selected.id} mono />
              <Row label="Date" value={formatDateTime(selected.created_at)} />
              <Row label="Type" value={selected.type ?? "—"} />
              <Row label="Description" value={selected.description ?? "—"} />
              <Row label="Amount" value={format(selected.amount)} />
              <Row label="Status" value={selected.status ?? "Pending"} />
              <Row label="Balance before" value={format(selected.balance_before)} />
              <Row label="Balance after" value={format(selected.balance_after)} />
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-2 last:border-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn("text-right", mono && "break-all font-mono text-xs")}>{value}</dd>
    </div>
  );
}
