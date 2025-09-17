import { auth, fromNodeHeaders } from "@repo/auth/auth";

export async function getSessionFromRequest(req: any) {
  try {
    const session = await auth.api.getSession({ 
      headers: fromNodeHeaders(req.headers)
     });
    return session ?? null;
    
  } catch (err) {
    console.error("❌ Failed to get session:", err);
    return null;
  }
}
