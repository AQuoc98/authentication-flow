import { createHmac, timingSafeEqual } from "crypto";

const SECRET = process.env.SWT_SECRET ?? "dev-only-swt-secret-change-me";

export const SWT_TTL_MS = 1000 * 60 * 60;

export type SwtClaims = {
  Issuer: string;
  Subject: string;
  Email: string;
  ExpiresOn: number;
};

function base64url(buf: Buffer) {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64url(value: string) {
  const padded = value
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(value.length + ((4 - (value.length % 4)) % 4), "=");
  return Buffer.from(padded, "base64");
}

function sign(payload: string) {
  return base64url(createHmac("sha256", SECRET).update(payload).digest());
}

export function createSwt(claims: Omit<SwtClaims, "ExpiresOn"> & { ttlMs?: number }) {
  const expires = Date.now() + (claims.ttlMs ?? SWT_TTL_MS);
  const params = new URLSearchParams({
    Issuer: claims.Issuer,
    Subject: claims.Subject,
    Email: claims.Email,
    ExpiresOn: String(expires),
  });
  const payload = params.toString();
  const sig = sign(payload);
  return `${payload}&HMACSHA256=${sig}`;
}

export function verifySwt(token: string): SwtClaims | null {
  if (!token) return null;

  const sigIndex = token.lastIndexOf("&HMACSHA256=");
  if (sigIndex === -1) return null;

  const payload = token.slice(0, sigIndex);
  const provided = token.slice(sigIndex + "&HMACSHA256=".length);

  const expected = sign(payload);
  const a = fromBase64url(provided);
  const b = fromBase64url(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  const params = new URLSearchParams(payload);
  const expiresOn = Number(params.get("ExpiresOn"));
  if (!expiresOn || expiresOn < Date.now()) return null;

  return {
    Issuer: params.get("Issuer") ?? "",
    Subject: params.get("Subject") ?? "",
    Email: params.get("Email") ?? "",
    ExpiresOn: expiresOn,
  };
}
