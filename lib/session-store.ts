type SessionData = {
  id: string;
  userId: string;
  email: string;
  createdAt: number;
  expiresAt: number;
};

type SessionStore = Map<string, SessionData>;

const globalForSessions = globalThis as unknown as {
  __sessionStore?: SessionStore;
};

const store: SessionStore =
  globalForSessions.__sessionStore ?? new Map<string, SessionData>();

if (process.env.NODE_ENV !== "production") {
  globalForSessions.__sessionStore = store;
}

export const SESSION_TTL_MS = 1000 * 60 * 60 * 24;

export function createSession(user: { userId: string; email: string }) {
  const id = crypto.randomUUID();
  const now = Date.now();
  const session: SessionData = {
    id,
    userId: user.userId,
    email: user.email,
    createdAt: now,
    expiresAt: now + SESSION_TTL_MS,
  };
  store.set(id, session);
  return session;
}

export function getSession(id: string | undefined): SessionData | null {
  if (!id) return null;
  const session = store.get(id);
  if (!session) return null;
  if (session.expiresAt < Date.now()) {
    store.delete(id);
    return null;
  }
  return session;
}

export function destroySession(id: string | undefined) {
  if (!id) return;
  store.delete(id);
}
