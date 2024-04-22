import { NextResponse } from "next/server";

export default function middleware(request) {

  const authCookie = request.cookies.get("auth");

  // if (authCookie) {
  //   // return NextResponse.redirect(new URL("/admin",request.url));
    return NextResponse.next();
  // } else {
  //   return NextResponse.rewrite(new URL("/not-found", request.url));
  // }
}

// specify the path regex to apply the middleware to
export const config = {
  matcher: ["/admin/:path*"],
};
