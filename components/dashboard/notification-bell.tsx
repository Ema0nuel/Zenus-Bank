"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Bell,
  BellRing,
  CheckCheck,
  Info,
  ShieldAlert,
  TriangleAlert,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { formatDateTime } from "@/lib/format";
import { useAuthStore } from "@/stores/auth-store";
import { useNotificationsStore } from "@/stores/notifications-store";
import { Button } from "@/components/ui/button";

function iconFor(type: string | null) {
  switch (type) {
    case "danger":
      return ShieldAlert;
    case "warning":
      return TriangleAlert;
    case "success":
      return CheckCheck;
    default:
      return Info;
  }
}

export function NotificationBell() {
  const userId = useAuthStore((s) => s.user?.id);
  const items = useNotificationsStore((s) => s.items);
  const subscribe = useNotificationsStore((s) => s.subscribe);
  const markRead = useNotificationsStore((s) => s.markRead);
  const markAllRead = useNotificationsStore((s) => s.markAllRead);

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (userId) subscribe(userId);
  }, [userId, subscribe]);

  useEffect(() => {
    if (!open) return;

    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const unreadCount = useMemo(() => items.filter((n) => !n.read).length, [items]);

  function handleMarkRead(id: string) {
    markRead(id);
    setExpanded((cur) => (cur === id ? null : id));
  }

  function handleMarkAllRead() {
    if (userId) markAllRead(userId);
  }

  return (
    <div ref={rootRef} className="relative">
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Notifications"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="relative"
      >
        {unreadCount > 0 ? <BellRing className="size-5" /> : <Bell className="size-5" />}
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <span className="text-sm font-semibold text-foreground">Notifications</span>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={handleMarkAllRead}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Mark all read
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X className="size-3.5" />
              </Button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {items.length === 0 ? (
              <p className="px-4 py-10 text-center text-sm text-muted-foreground">
                You have no notifications.
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {items.map((n) => {
                  const Icon = iconFor(n.type);
                  const isExpanded = expanded === n.id;
                  return (
                    <li key={n.id}>
                      <button
                        type="button"
                        onClick={() => handleMarkRead(n.id)}
                        className={cn(
                          "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted",
                          !n.read && "bg-primary-muted/40"
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
                            n.type === "danger"
                              ? "bg-destructive/10 text-destructive"
                              : "bg-primary-muted text-primary"
                          )}
                        >
                          <Icon className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="truncate text-sm font-semibold text-foreground">
                              {n.title || "Notification"}
                            </span>
                            {!n.read && (
                              <span className="size-2 shrink-0 rounded-full bg-primary" />
                            )}
                          </span>
                          <span
                            className={cn(
                              "block text-xs text-muted-foreground",
                              isExpanded ? "whitespace-pre-line" : "truncate"
                            )}
                          >
                            {n.message}
                          </span>
                          <span className="mt-1 block text-[11px] text-muted-foreground">
                            {formatDateTime(n.created_at)}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="border-t border-border p-2 text-center">
            <Link
              href="/dashboard/history"
              onClick={() => setOpen(false)}
              className="text-xs font-semibold text-primary hover:underline"
            >
              View activity
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
