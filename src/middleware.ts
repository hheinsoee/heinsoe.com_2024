import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./auth";
import myLink from "./link";

export default async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  if (request.nextUrl.pathname.startsWith("/admin")) {
    try {
      await updateSession(request);
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (err) {
      return NextResponse.redirect(new URL(myLink.signin(), request.url));
    }
  } else {
    return NextResponse.next();
  }
}

// specify the path regex to apply the middleware to
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "next-action" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
