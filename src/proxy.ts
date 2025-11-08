import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { indifferentRoutes, publicRoutes, protectedRoutes } from "./routes";

const matchRoute = (pathname: string, routes: string[]) => {
  return routes.some((route) => pathname.startsWith(route));
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (matchRoute(pathname, publicRoutes)) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (matchRoute(pathname, protectedRoutes)) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
    return NextResponse.next();
  }

  if (matchRoute(pathname, indifferentRoutes)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|.*\\..*).*)"],
};
