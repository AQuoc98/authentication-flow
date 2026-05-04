import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BASIC_AUTH_COOKIE, SESSION_COOKIE } from "@/lib/auth";
import { getSession } from "@/lib/session-store";
import LogoutButton from "./_components/logout-button";

export default async function LoginSuccessfullyPage() {
  const cookieStore = await cookies();

  const hasBasicAuth = Boolean(cookieStore.get(BASIC_AUTH_COOKIE)?.value);
  const hasValidSession = Boolean(
    getSession(cookieStore.get(SESSION_COOKIE)?.value),
  );

  if (!hasBasicAuth && !hasValidSession) {
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
