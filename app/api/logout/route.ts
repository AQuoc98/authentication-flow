import { NextResponse } from "next/server";
import { AUTH_COOKIES } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  for (const name of AUTH_COOKIES) {
    response.cookies.set({
      name,
      value: "",
      path: "/",
      maxAge: 0,
    });
  }
  return response;
}
