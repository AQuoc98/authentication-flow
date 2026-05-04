export const SESSION_COOKIE = "session-id";
export const BASIC_AUTH_COOKIE = "basic-auth-session";
export const TOKEN_COOKIE = "swt-token";
export const JWT_COOKIE = "jwt-access-token";

export const AUTH_COOKIES = [
  BASIC_AUTH_COOKIE,
  SESSION_COOKIE,
  TOKEN_COOKIE,
  JWT_COOKIE,
  "jwt-refresh-token",
] as const;

export const DEMO_EMAIL = "admin@example.com";
export const DEMO_PASSWORD = "password";
