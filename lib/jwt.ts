import { createHmac, timingSafeEqual } from "crypto";

const SECRET = process.env.JWT_SECRET ?? "dev-only-jwt-secret-change-me";

export const JWT_TTL_MS = 1000 * 30;

export type JwtClaims = {
  userId: string;
  email: string;
  iss?: string;
  sub?: string;
  iat: number;
  exp: number;
};

function base64urlEncode(input: Buffer | string) {
  const buf = typeof input === "string" ? Buffer.from(input, "utf8") : input;
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64urlDecode(value: string) {
  const padded = value
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(value.length + ((4 - (value.length % 4)) % 4), "=");
  return Buffer.from(padded, "base64");
}

function sign(headerAndPayload: string) {
  return base64urlEncode(
    createHmac("sha256", SECRET).update(headerAndPayload).digest(),
  );
}

export function createJwt(
  data: { userId: string; email: string; iss?: string; sub?: string },
  ttlMs: number = JWT_TTL_MS,
) {
  const header = { typ: "jwt", alg: "HS256" };
  const now = Math.floor(Date.now() / 1000);
  const claims: JwtClaims = {
    userId: data.userId,
    email: data.email,
    iss: data.iss ?? "auth-flow",
    sub: data.sub ?? data.userId,
    iat: now,
    exp: now + Math.floor(ttlMs / 1000),
  };

  const headerPart = base64urlEncode(JSON.stringify(header));
  const payloadPart = base64urlEncode(JSON.stringify(claims));
  const signature = sign(`${headerPart}.${payloadPart}`);
  return `${headerPart}.${payloadPart}.${signature}`;
}

export type JwtVerifyResult =
  | { ok: true; claims: JwtClaims }
  | { ok: false; reason: "malformed" | "bad-signature" | "expired" };

export function verifyJwt(token: string | undefined | null): JwtVerifyResult {
  if (!token) return { ok: false, reason: "malformed" };

  const parts = token.split(".");
  if (parts.length !== 3) return { ok: false, reason: "malformed" };

  const [headerPart, payloadPart, providedSig] = parts;
  const expectedSig = sign(`${headerPart}.${payloadPart}`);

  const a = base64urlDecode(providedSig);
  const b = base64urlDecode(expectedSig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return { ok: false, reason: "bad-signature" };
  }

  let claims: JwtClaims;
  try {
    claims = JSON.parse(base64urlDecode(payloadPart).toString("utf8"));
  } catch {
    return { ok: false, reason: "malformed" };
  }

  const now = Math.floor(Date.now() / 1000);
  if (!claims.exp || claims.exp < now) {
    return { ok: false, reason: "expired" };
  }

  return { ok: true, claims };
}
