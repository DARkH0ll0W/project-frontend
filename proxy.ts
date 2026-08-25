// proxy.ts (formerly middleware.ts — renamed for Next.js 16)

import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(
  request: NextRequest
) {
  const token =
    request.cookies.get(
      "access_token"
    )?.value;

  const pathname =
    request.nextUrl.pathname;

  const isProtected =
    pathname.startsWith(
      "/dashboard"
    );

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");

  if (isProtected && !token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(
      new URL(
        "/dashboard",
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
  ],
};