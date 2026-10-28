import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const hasSessionCookie = Boolean(request.cookies.get(SESSION_COOKIE)?.value);

  // 1. Admin API endpoints: /api/admin/*
  // Reject unauthenticated requests directly
  if (pathname.startsWith("/api/admin")) {
    if (!hasSessionCookie) {
      return NextResponse.json(
        { success: false, message: "Unauthorized." },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  // 2. All other API endpoints (e.g., /api/login, /api/logout, /api/doctors, etc.)
  // Allow API operations to execute without modifying session state
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // 3. Admin protected page routes: /admin or /admin/*
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (!hasSessionCookie) {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    const response = NextResponse.next();
    // Prevent browser bfcache and caching of protected admin views
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    return response;
  }

  // 4. Any Non-Admin Route (e.g. /, /doctors, /ourspecialities, /careers, /login, etc.)
  // When leaving the admin panel to any non-admin route, terminate the admin session immediately.
  if (hasSessionCookie) {
    const response = NextResponse.next();
    response.cookies.set(SESSION_COOKIE, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
    return response;
  }

  return NextResponse.next();
}

// Named alias export for compatibility
export { proxy as middleware };

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Static asset extensions
     */
    "/((?!_next/static|_next/image|favicon.ico|images/|icons/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf)$).*)",
  ],
};
