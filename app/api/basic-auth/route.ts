import { NextResponse } from "next/server";
import { BASIC_AUTH_COOKIE } from "@/lib/auth";

const VALID_USERNAME = "admin@example.com";
const VALID_PASSWORD = "password";

function unauthorized() {
  return NextResponse.json(
    { error: "Invalid credentials" },
    { status: 401 },
  );
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.toLowerCase().startsWith("basic ")) {
    return unauthorized();
  }

  let decoded: string;
  const encoded = authHeader.slice(6).trim();
  try {
    decoded = atob(encoded);
  } catch {
    return unauthorized();
  }

  const separatorIndex = decoded.indexOf(":");
  if (separatorIndex === -1) {
    return unauthorized();
  }

  const username = decoded.slice(0, separatorIndex);
  const password = decoded.slice(separatorIndex + 1);

  if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
    return unauthorized();
  }

  const response = NextResponse.json({ ok: true, user: username });
  response.cookies.set({
    name: BASIC_AUTH_COOKIE,
    value: encoded,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  return response;
}
