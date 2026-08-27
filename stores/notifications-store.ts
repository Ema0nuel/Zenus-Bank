"use client";

import { create } from "zustand";
import type { RealtimeChannel } from "@supabase/supabase-js";

import { getBrowserClient } from "@/lib/supabase/browser";
import type { Notification } from "@/components/dashboard/types";

type NotificationsState = {
  items: Notification[];
  subscribedUserId: string | null;
  channel: RealtimeChannel | null;
  subscribe: (userId: string) => void;
  markRead: (id: string) => Promise<void>;
  markAllRead: (userId: string) => Promise<void>;
  reset: () => void;
};

async function fetchItems(userId: string) {
  const supabase = getBrowserClient();
  const { data } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(20);
  useNotificationsStore.setState({ items: (data as Notification[]) ?? [] });
}

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  items: [],
  subscribedUserId: null,
  channel: null,

  subscribe: (userId) => {
    const { subscribedUserId, channel } = get();

    // Already subscribed for this user (e.g. a second bell on the page).
    if (subscribedUserId === userId) return;

    // User changed — tear down the previous subscription first.
    if (channel) getBrowserClient().removeChannel(channel);

    const supabase = getBrowserClient();

    fetchItems(userId);

    const next = supabase
      .channel(`notifications:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        () => fetchItems(userId)
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        () => fetchItems(userId)
      )
      .subscribe();

    set({ subscribedUserId: userId, channel: next });
  },

  markRead: async (id) => {
    set((s) => ({
      items: s.items.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));
    await getBrowserClient().from("notifications").update({ read: true }).eq("id", id);
  },

  markAllRead: async (userId) => {
    set((s) => ({
      items: s.items.map((n) => ({ ...n, read: true })),
    }));
    await getBrowserClient()
      .from("notifications")
      .update({ read: true })
      .eq("user_id", userId)
      .eq("read", false);
  },

  reset: () => {
    const { channel } = get();
    if (channel) getBrowserClient().removeChannel(channel);
    set({ items: [], subscribedUserId: null, channel: null });
  },
}));
