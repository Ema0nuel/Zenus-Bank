"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useAdminAuthStore } from "@/stores/admin-auth-store";

export function AdminTopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const { adminEmail } = useAdminAuthStore();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur lg:hidden">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted"
        >
          <Menu className="size-5" />
        </button>
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <svg className="size-5 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span className="font-heading text-lg font-bold text-primary">Zenus Admin</span>
        </Link>
      </div>

      <div className="flex items-center gap-1.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
          {adminEmail?.[0]?.toUpperCase() || "A"}
        </div>
      </div>
    </header>
  );
}
