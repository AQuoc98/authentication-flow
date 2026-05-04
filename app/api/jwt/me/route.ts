import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/jwt";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
    return NextResponse.json(
      { error: "Missing bearer token" },
      { status: 401 },
    );
  }

  const token = authHeader.slice(7).trim();
  const result = verifyJwt(token);
  if (!result.ok) {
    return NextResponse.json(
      { error: `Token ${result.reason}` },
      { status: 401 },
    );
  }

  return NextResponse.json({
    user: { id: result.claims.userId, email: result.claims.email },
    iat: result.claims.iat,
    exp: result.claims.exp,
    iss: result.claims.iss,
    sub: result.claims.sub,
  });
}
