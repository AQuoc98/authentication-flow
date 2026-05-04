"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/logout", { method: "POST" });
    } catch {
      // ignore network errors and proceed to clear client-side state
    }

    if (typeof window !== "undefined") {
      window.localStorage.clear();
      window.sessionStorage.clear();
    }

    router.replace("/");
    router.refresh();
  };

  return (
    <Button onClick={handleLogout} disabled={isLoggingOut}>
      {isLoggingOut ? "Logging out..." : "Logout"}
    </Button>
  );
}
