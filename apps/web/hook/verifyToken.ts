"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useVerifyToken(passedToken: string) {
  const [isValid, setIsValid] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const localToken = localStorage.getItem("chat-app-token");

    if (!localToken) {
      alert("Please log in!");
      router.push("/signin");
      return;
    }

    // Check if passed token matches stored token
    if (passedToken !== localToken) {
      alert("Invalid token!");
      router.push("/signin");
      return;
    }

    try {
      const parts = localToken.split(".");
      if (parts.length < 2) throw new Error("Invalid token format");

      const payload = JSON.parse(atob(parts[1] || ""));

      const isExpired = payload.exp
        ? Date.now() >= payload.exp * 1000
        : true; // if no exp, treat as expired

      if (isExpired) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("chat-app-token");
        router.push("/signin");
        return;
      }

      setIsValid(true);
    } catch (err) {
      console.error("Token verification failed", err);
      router.push("/signin");
    }
  }, [passedToken, router]);

  return isValid;
}