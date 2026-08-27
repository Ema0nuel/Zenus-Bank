import Link from "next/link";
import { ArrowLeftRight, CreditCard, History, Landmark } from "lucide-react";

const actions = [
  { label: "Transfer", href: "/dashboard/transfers", icon: ArrowLeftRight },
  { label: "History", href: "/dashboard/history", icon: History },
  { label: "Loans", href: "/dashboard/loans", icon: Landmark },
  { label: "Cards", href: "/dashboard/cards", icon: CreditCard },
];

export function QuickActions() {
  return (
    <section>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Quick actions
      </h2>
      <div className="grid grid-cols-4 gap-3">
        {actions.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="group flex flex-col items-center gap-2.5 rounded-2xl border border-border bg-card p-4 text-center transition-all hover:border-primary/40 hover:bg-primary-muted"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-primary-muted text-primary transition-transform group-hover:scale-105">
              <Icon className="size-5" strokeWidth={1.8} />
            </span>
            <span className="text-xs font-semibold text-foreground">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
