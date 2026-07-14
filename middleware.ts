import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Проста середина, яка захищає весь застосунок одним спільним паролем
// (див. APP_PASSWORD у .env). Якщо APP_PASSWORD не заданий — доступ вільний.

const PUBLIC_PATHS = ["/login"];

function sha256Hex(input: string) {
  // Web Crypto API доступний у middleware (Edge runtime), без залежностей.
  return crypto.subtle.digest("SHA-256", new TextEncoder().encode(input)).then((buf) =>
    Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/")) ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const appPassword = process.env.APP_PASSWORD;
  if (!appPassword) {
    return NextResponse.next();
  }

  const expected = await sha256Hex(appPassword);
  const cookie = request.cookies.get("kosztorysy_auth")?.value;

  if (cookie === expected) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
