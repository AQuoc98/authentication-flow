import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AuthPageShell from "@/app/_components/auth-page-shell";
import { JWT_COOKIE } from "@/lib/auth";
import { verifyJwt } from "@/lib/jwt";
import LoginForm from "./_components/login-form";

export default async function JwtAuthenticationPage() {
  const cookieStore = await cookies();
  const result = verifyJwt(cookieStore.get(JWT_COOKIE)?.value);
  if (result.ok) {
    redirect("/login-successfully");
  }

  return (
    <AuthPageShell title="JWT Authentication">
      <LoginForm />
    </AuthPageShell>
  );
}
