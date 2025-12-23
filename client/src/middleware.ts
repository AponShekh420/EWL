// middleware.js
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("session"); // Check for the presence of the token
  // console.log(token);
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Continue to the requested page if the token exists
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Apply middleware to dashboard routes
};
