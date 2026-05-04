"use client";

import CredentialsForm from "@/app/_components/credentials-form";

const LoginForm = () => {
  return (
    <CredentialsForm
      onSubmit={async ({ email, password }) => {
        const credentials = btoa(`${email}:${password}`);
        const response = await fetch("/api/basic-auth", {
          method: "GET",
          headers: { Authorization: `Basic ${credentials}` },
        });
        if (response.ok) return { ok: true };
        return { ok: false, message: "Invalid email or password." };
      }}
    />
  );
};

export default LoginForm;
