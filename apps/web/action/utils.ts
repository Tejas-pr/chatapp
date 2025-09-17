"use server"
import { auth } from "@repo/auth/auth";
import { headers } from "next/headers";

export async function getUserSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session;
  } catch (e) {
    console.error(e);
    return null;
  }
}
