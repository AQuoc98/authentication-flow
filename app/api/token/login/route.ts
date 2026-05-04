import { NextResponse } from "next/server";
import { DEMO_EMAIL, DEMO_PASSWORD, TOKEN_COOKIE } from "@/lib/auth";
import { SWT_TTL_MS, createSwt } from "@/lib/swt";

export async function POST(request: Request) {
  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 422 },
    );
  }

  if (email !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 422 },
    );
  }

  const token = createSwt({
    Issuer: "auth-flow",
    Subject: "user_1",
    Email: email,
  });

  const response = NextResponse.json({
    token,
    tokenType: "SWT",
    expiresIn: Math.floor(SWT_TTL_MS / 1000),
    user: { id: "user_1", email },
  });
  response.cookies.set({
    name: TOKEN_COOKIE,
    value: token,
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(SWT_TTL_MS / 1000),
  });
  return response;
}
