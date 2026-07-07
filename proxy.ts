import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// const isPublicRoute = createRouteMatcher([
//   "/",
//   "/events(.*)",
//   "/sign-in(.*)",
//   "/sign-up(.*)",
//   "/api/webhook(.*)",
// ]);

const isAuthRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { isAuthenticated } = await auth();

  if (isAuthenticated && isAuthRoute(req)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
});
