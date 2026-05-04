import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  BASIC_AUTH_COOKIE,
  JWT_COOKIE,
  SESSION_COOKIE,
  TOKEN_COOKIE,
} from "@/lib/auth";
import { getSession } from "@/lib/session-store";
import { verifySwt } from "@/lib/swt";
import { verifyJwt } from "@/lib/jwt";
import LogoutButton from "./_components/logout-button";

type AuthCheck = {
  name: string;
  isAuthenticated: (cookieValue: string | undefined) => boolean;
  cookieName: string;
};

const authChecks: AuthCheck[] = [
  {
    name: "basic",
    cookieName: BASIC_AUTH_COOKIE,
    isAuthenticated: (value) => Boolean(value),
  },
  {
    name: "session",
    cookieName: SESSION_COOKIE,
    isAuthenticated: (value) => Boolean(getSession(value)),
  },
  {
    name: "swt",
    cookieName: TOKEN_COOKIE,
    isAuthenticated: (value) => Boolean(verifySwt(value ?? "")),
  },
  {
    name: "jwt",
    cookieName: JWT_COOKIE,
    isAuthenticated: (value) => verifyJwt(value).ok,
  },
];

export default async function LoginSuccessfullyPage() {
  const cookieStore = await cookies();
  const isAuthenticated = authChecks.some((check) =>
    check.isAuthenticated(cookieStore.get(check.cookieName)?.value),
  );

  if (!isAuthenticated) {
    redirect("/");
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 font-sans">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-3xl font-semibold tracking-tight text-black">
          Login Successfully
        </h1>
        <LogoutButton />
      </div>
    </div>
  );
}
