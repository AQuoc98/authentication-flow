"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AUTH_FLOWS = [
  { value: "basic", label: "Basic Authentication", path: "/basic-authentication" },
  { value: "session", label: "Session Authentication", path: "/session-authentication" },
  { value: "token", label: "Token Based Authentication", path: "/token-authentication" },
  { value: "jwt", label: "JWT Authentication", path: "/jwt-authentication" },
] as const;

export default function Home() {
  const [value, setValue] = useState<(typeof AUTH_FLOWS)[number]["value"]>(
    "basic",
  );
  const router = useRouter();

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 font-sans">
      <div className="flex items-end gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-black">
            Authentication Flow
          </label>
          <Select
            value={value}
            onValueChange={(v) => setValue(v as typeof value)}
          >
            <SelectTrigger className="w-96">
              <SelectValue placeholder="Select authentication" />
            </SelectTrigger>
            <SelectContent>
              {AUTH_FLOWS.map((flow) => (
                <SelectItem key={flow.value} value={flow.value}>
                  {flow.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={() => {
            const flow = AUTH_FLOWS.find((f) => f.value === value);
            if (flow) router.push(flow.path);
          }}
        >
          Go
        </Button>
      </div>
    </div>
  );
}
