import { NextResponse, type NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/middleware";

const ADMIN_HOSTS = new Set(["admin.zenusbanks.com"]);

function isAllowedHost(hostname: string): boolean {
  if (ADMIN_HOSTS.has(hostname)) return true;
  if (hostname === "localhost" || hostname.startsWith("127.0.0.1")) return true;
  return false;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.headers.get("host")?.split(":")[0] ?? "";

  // Gate the admin panel by hostname so it's not reachable from the public site.
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (!isAllowedHost(hostname)) {
      return new NextResponse("Not Found", { status: 404 });
    }
  }

  return updateSession(request);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
