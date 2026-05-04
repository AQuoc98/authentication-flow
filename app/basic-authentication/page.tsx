import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AuthPageShell from "@/app/_components/auth-page-shell";
import { BASIC_AUTH_COOKIE } from "@/lib/auth";
import LoginForm from "./_components/login-form";

export default async function BasicAuthenticationPage() {
  const cookieStore = await cookies();
  if (cookieStore.get(BASIC_AUTH_COOKIE)?.value) {
    redirect("/login-successfully");
  }

  return (
    <AuthPageShell title="Basic Authentication">
      <LoginForm />
    </AuthPageShell>
  );
}
