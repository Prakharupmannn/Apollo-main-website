import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

function clearSession() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully.",
  });

  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}

export async function POST() {
  return clearSession();
}

export async function GET() {
  return clearSession();
}
