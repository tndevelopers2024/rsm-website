import { checkPassword, readToken } from "@/lib/server/registration";

export const runtime = "nodejs";

/* Delegate sign-in for the demo phase: verifies the signed registration token and the password. */
export async function POST(req: Request) {
  let b: { token?: string; email?: string; password?: string };
  try { b = await req.json(); } catch { return Response.json({ error: "Invalid request" }, { status: 400 }); }
  const p = b.token ? readToken(b.token) : null;
  if (!p || p.email !== String(b.email ?? "").trim().toLowerCase() || !checkPassword(p.id, String(b.password ?? ""))) {
    await new Promise((r) => setTimeout(r, 600)); // slow down guessing
    return Response.json({ error: "Email or password is incorrect" }, { status: 401 });
  }
  return Response.json({ registration: p });
}
