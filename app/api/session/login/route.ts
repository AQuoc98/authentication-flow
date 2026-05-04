import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";
import { SESSION_TTL_MS, createSession } from "@/lib/session-store";

const VALID_EMAIL = "admin@example.com";
const VALID_PASSWORD = "password";

export async function POST(request: Request) {
  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 },
    );
  }

  if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 },
    );
  }

  const session = createSession({ userId: "user_1", email });

  const response = NextResponse.json({
    ok: true,
    user: { id: session.userId, email: session.email },
  });
  response.cookies.set({
    name: SESSION_COOKIE,
    value: session.id,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(SESSION_TTL_MS / 1000),
  });
  return response;
}
