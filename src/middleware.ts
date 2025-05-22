import { NextResponse, type NextRequest } from "next/server";
import { verifyUserToken } from "./app/_lib/auth";

export default async function middleware(req: NextRequest) {
  const emailToken = req.nextUrl.searchParams.get("token");
  const token = req.cookies.get("token")?.value;
  const { pathname, search } = req.nextUrl;
  let redirectUrl;

  if (pathname.startsWith("/verify-email")) {
    if (!emailToken) {
      redirectUrl = new URL("/register", req.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      redirectUrl = new URL("/login", req.url);
      redirectUrl.searchParams.set("redirect", pathname + search);
      return NextResponse.redirect(redirectUrl);
    }

    const payload = await verifyUserToken(token);
    if (!payload) {
      redirectUrl = new URL("/login", req.url);
      redirectUrl.searchParams.set("redirect", pathname + search);
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (pathname === "/login" && token) {
    const payload = await verifyUserToken(token);
    if (!payload) {
      redirectUrl = new URL("/login", req.url);
      redirectUrl.searchParams.set("redirect", pathname + search);
      return NextResponse.redirect(redirectUrl);
    }

    redirectUrl = new URL("/dashboard", req.url);

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/verify-email"],
};
