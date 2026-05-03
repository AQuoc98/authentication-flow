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

export default function Home() {
  const [value, setValue] = useState("basic");
  const router = useRouter();

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 font-sans">
      <div className="flex items-end gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-black">
            Authentication Flow
          </label>
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger className="w-96">
              <SelectValue placeholder="Select authentication" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic Authentication</SelectItem>
              <SelectItem value="jwt">JWT Authentication</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={() =>
            router.push(
              value === "basic"
                ? "/basic-authentication"
                : "/jwt-authentication",
            )
          }
        >
          Go
        </Button>
      </div>
    </div>
  );
}
