"use client";

import CredentialsForm from "@/app/_components/credentials-form";

const JWT_STORAGE_KEY = "jwt-access-token";

const LoginForm = () => {
  return (
    <CredentialsForm
      onSubmit={async ({ email, password }) => {
        const response = await fetch("/api/jwt/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const data = (await response.json()) as { token: string };
          window.localStorage.setItem(JWT_STORAGE_KEY, data.token);
          return { ok: true };
        }

        if (response.status === 422) {
          return { ok: false, message: "Invalid email or password." };
        }

        return { ok: false, message: "Login failed. Please try again." };
      }}
    />
  );
};

export default LoginForm;
