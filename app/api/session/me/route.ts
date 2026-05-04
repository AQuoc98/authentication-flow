import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/auth";
import { getSession } from "@/lib/session-store";

export async function GET() {
  const cookieStore = await cookies();
  const session = getSession(cookieStore.get(SESSION_COOKIE)?.value);

  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({
    user: { id: session.userId, email: session.email },
  });
}
