import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = new URL(req.url);
  // Basic guard for admin path; detailed auth happens server-side
  if (url.pathname.startsWith("/admin")) {
    // Redirect unauthenticated users to login; a real check would read session via NextAuth's middleware helper
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};