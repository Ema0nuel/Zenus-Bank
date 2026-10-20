import { NextResponse, type NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/middleware";

const ADMIN_HOSTS = new Set(["admin.allybanks.cc"]);

function isAllowedHost(hostname: string): boolean {
  if (ADMIN_HOSTS.has(hostname)) return true;
  if (hostname === "localhost" || hostname.startsWith("127.0.0.1")) return true;
  return false;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get("host")?.split(":")[0] ?? "";

  // Bare admin subdomain lands on the panel.
  if (pathname === "/" && ADMIN_HOSTS.has(hostname)) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // The admin panel lives only on admin.allybanks.cc (and localhost in dev).
  // Any other host gets a 404 so /admin looks nonexistent there.
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (!isAllowedHost(hostname)) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json({ error: "Not Found" }, { status: 404 });
      }
      return NextResponse.rewrite(new URL("/admin-blocked", request.url));
    }
  }

  return updateSession(request);
}

export const config = {
  matcher: ["/", "/admin/:path*", "/api/admin/:path*"],
};
