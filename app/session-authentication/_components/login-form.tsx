"use client";

import CredentialsForm from "@/app/_components/credentials-form";

const LoginForm = () => {
  return (
    <CredentialsForm
      onSubmit={async ({ email, password }) => {
        const response = await fetch("/api/session/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        if (response.ok) return { ok: true };
        return { ok: false, message: "Invalid email or password." };
      }}
    />
  );
};

export default LoginForm;
