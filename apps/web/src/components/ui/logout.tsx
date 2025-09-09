"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@repo/auth/client";
import { LogOutIcon } from "lucide-react";

export function LogoutButton() {
  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout <LogOutIcon className="size-4" />
    </Button>
  );
}
