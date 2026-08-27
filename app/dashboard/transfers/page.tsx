"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { bankConfig } from "@/lib/bank-config";
import { AccountStatCards } from "@/components/dashboard/account-stat-cards";
import { PageHeader } from "@/components/dashboard/page-header";

export default function TransfersPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Transfers"
        description="Choose how you'd like to send money."
        crumbs={[{ label: "Transfers" }]}
      />

      <AccountStatCards />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {bankConfig.transferTypes.map((t) => (
          <Link
            key={t.key}
            href={`/dashboard/transfers/${t.key}`}
            className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:bg-primary-muted"
          >
            <h2 className="font-heading text-lg font-medium text-foreground">{t.label}</h2>
            <p className="text-sm text-muted-foreground">{t.description}</p>
            <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Start
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
