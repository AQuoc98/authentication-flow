import { NextResponse } from "next/server";
import { DEMO_EMAIL, DEMO_PASSWORD, JWT_COOKIE } from "@/lib/auth";
import { JWT_TTL_MS, createJwt } from "@/lib/jwt";

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

  const token = createJwt({ userId: "user_1", email });

  const response = NextResponse.json({
    token,
    tokenType: "Bearer",
    expiresIn: Math.floor(JWT_TTL_MS / 1000),
    user: { id: "user_1", email },
  });
  response.cookies.set({
    name: JWT_COOKIE,
    value: token,
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(JWT_TTL_MS / 1000),
  });
  return response;
}
