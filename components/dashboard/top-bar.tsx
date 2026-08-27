"use client";

import Link from "next/link";
import Image from "next/image";

import { getInitials } from "@/lib/format";
import { useAuthStore } from "@/stores/auth-store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NotificationBell } from "./notification-bell";
import { ThemeToggle } from "./theme-toggle";
import type { Profile } from "./types";

export function TopBar() {
  const profile = useAuthStore((s) => s.profile) as Profile | null;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur lg:hidden">
      <Link href="/dashboard" className="flex items-center gap-2.5">
        <Image
          src="/images/logo-nobg.png"
          alt="Zenus Bank"
          width={0}
          height={0}
          sizes="100vw"
          className="h-8 w-auto dark:hidden"
        />
        <Image
          src="/images/logo.jpg"
          alt="Zenus Bank"
          width={0}
          height={0}
          sizes="100vw"
          className="hidden h-8 w-auto dark:block"
        />
        <span className="font-heading text-lg font-bold text-primary">Zenus Bank</span>
      </Link>

      <div className="flex items-center gap-1.5">
        <NotificationBell />
        <ThemeToggle />
        <Link href="/dashboard/profile" aria-label="Profile">
          <Avatar className="size-9">
            <AvatarFallback>
              {getInitials(profile?.full_name ?? profile?.username ?? "")}
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}
