import { intlCategories, localDayFee, earlyBirdEnds } from "@/lib/paflar";
import { confirmationEmail, makeToken, newId, passwordFor, sendMail, type RegPayload } from "@/lib/server/registration";

export const runtime = "nodejs";

type Body = {
  path: "mu" | "intl"; days?: string[]; category?: string;
  first: string; last: string; email: string; phone: string; country: string; city: string;
  workplace?: string; mcr?: string; diet?: string; hotel?: boolean; terms: boolean;
};

const clean = (s: unknown, max = 120) => String(s ?? "").replace(/[\u0000-\u001f]/g, "").trim().slice(0, max);

export async function POST(req: Request) {
  let b: Body;
  try { b = await req.json(); } catch { return Response.json({ error: "Invalid request" }, { status: 400 }); }

  const email = clean(b.email, 160).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return Response.json({ error: "Enter a valid email address" }, { status: 400 });
  if (!clean(b.first) || !clean(b.last) || !b.terms) return Response.json({ error: "Missing details" }, { status: 400 });

  // Price is always computed on the server, never trusted from the browser.
  const early = Date.now() < new Date(earlyBirdEnds).getTime();
  let days: RegPayload["days"], amount: number, usd: number | undefined, category: string;
  if (b.path === "mu") {
    days = (["fri", "sat", "sun"] as const).filter((d) => b.days?.includes(d));
    if (!days.length) return Response.json({ error: "Choose at least one day" }, { status: 400 });
    amount = days.length * localDayFee; category = "Mauritian resident";
  } else {
    const c = intlCategories.find((x) => x.id === b.category);
    if (!c) return Response.json({ error: "Choose a category" }, { status: 400 });
    const p = early ? c.early : c.normal;
    days = ["fri", "sat", "sun"]; amount = p.mur; usd = p.usd; category = c.title;
  }

  const now = new Date().toISOString();
  const id = newId();
  const payload: RegPayload = {
    id, title: "", first: clean(b.first, 60), last: clean(b.last, 60), email, phone: clean(b.phone, 40),
    country: clean(b.country, 60), city: clean(b.city, 60), type: b.path === "mu" ? "mu" : "intl", category, days, amount, usd,
    workplace: clean(b.workplace), mcr: clean(b.mcr, 40), dietary: clean(b.diet, 80) || "None", hotel: !!b.hotel,
    registeredAt: now, paidAt: now, txn: `SBM-DEMO-${Date.now().toString().slice(-8)}`,
  };
  const token = makeToken(payload);
  const password = passwordFor(id);
  const origin = new URL(req.url).origin;
  const link = `${origin}/portal/index.html#/login?t=${encodeURIComponent(token)}`;
  const mail = confirmationEmail(payload, password, link, origin);
  const result = await sendMail(email, mail);

  // When no email service is configured yet (demo), return the email so the page can show it.
  return Response.json({
    id, token, link, emailSent: result.sent, emailError: result.sent ? undefined : result.error,
    preview: result.sent ? undefined : { subject: mail.subject, html: mail.html, password },
  });
}
