"use client";

import { create } from "zustand";

type AdminAuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  adminEmail: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  checkAuth: () => boolean;
};

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "support@allybanks.cc";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "12345Em@";

export const useAdminAuthStore = create<AdminAuthState>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  adminEmail: null,

  setLoading: (loading) => set({ isLoading: loading }),

  checkAuth: () => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("zenus-admin-auth");
    console.log("[AdminAuthStore] checkAuth - stored:", stored);
    if (stored) {
      try {
        const { email, timestamp } = JSON.parse(stored);
        const isValid = email === ADMIN_EMAIL && Date.now() - timestamp < 24 * 60 * 60 * 1000;
        console.log("[AdminAuthStore] checkAuth - email:", email, "isValid:", isValid);
        if (isValid) {
          set({ isAuthenticated: true, adminEmail: email, isLoading: false });
          return true;
        }
      } catch {
        // Invalid stored data
      }
    }
    set({ isLoading: false });
    return false;
  },

  login: async (email: string, password: string) => {
    console.log("[AdminAuthStore] login attempt - email:", email);
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const authData = { email, timestamp: Date.now() };
      localStorage.setItem("zenus-admin-auth", JSON.stringify(authData));
      set({ isAuthenticated: true, adminEmail: email, isLoading: false });
      console.log("[AdminAuthStore] login success");
      return true;
    }

    console.log("[AdminAuthStore] login failed - invalid credentials");
    set({ isLoading: false });
    return false;
  },

  logout: () => {
    localStorage.removeItem("zenus-admin-auth");
    set({ isAuthenticated: false, adminEmail: null });
  },
}));