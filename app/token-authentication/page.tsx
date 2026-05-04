import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AuthPageShell from "@/app/_components/auth-page-shell";
import { TOKEN_COOKIE } from "@/lib/auth";
import { verifySwt } from "@/lib/swt";
import LoginForm from "./_components/login-form";

export default async function TokenAuthenticationPage() {
  const cookieStore = await cookies();
  const claims = verifySwt(cookieStore.get(TOKEN_COOKIE)?.value ?? "");
  if (claims) {
    redirect("/login-successfully");
  }

  return (
    <AuthPageShell title="Token Based Authentication">
      <LoginForm />
    </AuthPageShell>
  );
}
