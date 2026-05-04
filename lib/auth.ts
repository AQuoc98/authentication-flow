export const SESSION_COOKIE = "session-id";
export const BASIC_AUTH_COOKIE = "basic-auth-session";
export const TOKEN_COOKIE = "swt-token";

export const AUTH_COOKIES = [
  BASIC_AUTH_COOKIE,
  SESSION_COOKIE,
  TOKEN_COOKIE,
  "jwt-access-token",
  "jwt-refresh-token",
] as const;
