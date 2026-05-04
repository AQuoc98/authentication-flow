import { NextResponse } from "next/server";
import { verifySwt } from "@/lib/swt";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.toLowerCase().startsWith("bearer ")) {
    return NextResponse.json(
      { error: "Missing bearer token" },
      { status: 401 },
    );
  }

  const token = authHeader.slice(7).trim();
  const claims = verifySwt(token);
  if (!claims) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 },
    );
  }

  return NextResponse.json({
    user: { id: claims.Subject, email: claims.Email },
    issuer: claims.Issuer,
    expiresOn: claims.ExpiresOn,
  });
}
