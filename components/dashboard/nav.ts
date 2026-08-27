import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  CreditCard,
  History,
  ArrowLeftRight,
  User,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const dashboardNav: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Cards", href: "/dashboard/cards", icon: CreditCard },
  { label: "History", href: "/dashboard/history", icon: History },
  { label: "Transfers", href: "/dashboard/transfers", icon: ArrowLeftRight },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];

export function isActivePath(href: string, pathname: string): boolean {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname.startsWith(href);
}
