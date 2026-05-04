import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIES } from "@/lib/auth";
import LogoutButton from "./_components/logout-button";

export default async function LoginSuccessfullyPage() {
  const cookieStore = await cookies();
  const isAuthenticated = AUTH_COOKIES.some(
    (name) => cookieStore.get(name)?.value,
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
