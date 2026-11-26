/* Registration API for the Rheumatology Society, Mauritius participant portal.
   Routes (via vercel.json rewrite): POST /api/register, POST /api/session.
   Demo phase: no database. Each registration travels in an HMAC-signed token, and the
   password is derived from the registration ID with the same secret. */
import { createHmac, randomInt, timingSafeEqual } from "node:crypto";

/* Demo-phase registration: no database yet. Each registration is carried in a
   signed token (HMAC-SHA256) and the password is derived from the registration ID
   with the same secret, so the server can verify both without storing anything.
   Phase 2 replaces this with a database and hashed passwords. */

const SECRET = process.env.TOKEN_SECRET || "rsm-demo-secret-change-before-launch";

type RegPayload = {
  id: string;
  title: string;
  first: string;
  last: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  type: "mu" | "intl";
  category: string;
  days: ("fri" | "sat" | "sun")[];
  amount: number; // MUR
  usd?: number;
  workplace: string;
  mcr: string;
  dietary: string;
  hotel: boolean;
  registeredAt: string;
  paidAt: string;
  txn: string;
};

const b64 = (s: string) => Buffer.from(s, "utf8").toString("base64url");
const unb64 = (s: string) => Buffer.from(s, "base64url").toString("utf8");
const sign = (s: string) => createHmac("sha256", SECRET).update(s).digest("base64url");

function makeToken(p: RegPayload) {
  const body = b64(JSON.stringify(p));
  return `${body}.${sign(body)}`;
}

function readToken(token: string): RegPayload | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const a = Buffer.from(sig), b = Buffer.from(sign(body));
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try { return JSON.parse(unb64(body)) as RegPayload; } catch { return null; }
}

/* Readable password: no 0/O/1/l, e.g. "Rsm-K7pX-4mQd". */
function passwordFor(id: string) {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  const h = createHmac("sha256", SECRET).update(`pw:${id}`).digest();
  const chars = Array.from(h.subarray(0, 8), (x) => alphabet[x % alphabet.length]).join("");
  return `Rsm-${chars.slice(0, 4)}-${chars.slice(4)}`;
}

function checkPassword(id: string, given: string) {
  const a = Buffer.from(passwordFor(id)), b = Buffer.from(given.trim());
  return a.length === b.length && timingSafeEqual(a, b);
}

function newId() {
  return `RSM27-${randomInt(2000, 9999)}`;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const DAY = { fri: "Friday 7 May · Pre-congress workshops · Artemis Cascavelle Hospital", sat: "Saturday 8 May · Main congress, day 1 · Hilton Mauritius", sun: "Sunday 9 May · Main congress, day 2 · Hilton Mauritius" };
const mur = (n: number) => `MUR ${n.toLocaleString("en-GB")}`;

function confirmationEmail(p: RegPayload, password: string, link: string, origin: string) {
  const name = `${p.title} ${p.first} ${p.last}`.trim();
  const total = p.usd ? `USD ${p.usd} (${mur(p.amount)})` : mur(p.amount);
  const subject = `Registration confirmed · 7th PAFLAR Congress, Mauritius · ${p.id}`;
  const row = (k: string, v: string) => `<tr><td style="padding:8px 0;color:#607286;font-size:13px;width:150px;vertical-align:top">${k}</td><td style="padding:8px 0;color:#0f2a44;font-size:14px;font-weight:600">${v}</td></tr>`;
  const html = `<!doctype html><html><body style="margin:0;background:#f3f7f9;font-family:Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f7f9;padding:28px 12px"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e3eaef">
<tr><td style="padding:26px 32px 18px"><img src="${origin}/rsm-logo-full.png" alt="Rheumatology Society, Mauritius" height="46" style="display:block;height:46px"></td></tr>
<tr><td style="height:5px;line-height:5px;font-size:0;background:linear-gradient(90deg,#e42320 0 25%,#142d46 25% 50%,#f6c400 50% 75%,#5bb431 75%)">&nbsp;</td></tr>
<tr><td style="background:#0b2034;padding:30px 32px;color:#ffffff">
<div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#c7a65a">7th PAFLAR Congress · Mauritius · 7–9 May 2027</div>
<div style="font-size:26px;line-height:1.25;margin-top:10px">You’re registered, ${esc(name)}.</div>
<div style="font-size:14px;color:#c9d6e2;margin-top:8px">Thank you for registering with the Rheumatology Society, Mauritius. Your place is confirmed.</div>
</td></tr>
<tr><td style="padding:26px 32px 6px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${row("Registration ID", esc(p.id))}${row("Category", esc(p.category))}${row("Days", p.days.map((d) => DAY[d]).join("<br>"))}${row("Amount paid", esc(total))}${row("Payment reference", esc(p.txn))}
</table></td></tr>
<tr><td style="padding:14px 32px 4px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f7f9;border-radius:14px;border:1px solid #e3eaef"><tr><td style="padding:20px 22px">
<div style="font-size:15px;font-weight:700;color:#0f2a44">Your participant area</div>
<div style="font-size:13px;color:#607286;margin-top:4px">Sign in to see your registration, download your receipt and QR badge, submit an abstract and, after the congress, your certificate.</div>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:14px">
<tr><td style="font-size:13px;color:#607286;padding:3px 14px 3px 0">Email</td><td style="font-size:14px;color:#0f2a44;font-weight:600">${esc(p.email)}</td></tr>
<tr><td style="font-size:13px;color:#607286;padding:3px 14px 3px 0">Password</td><td style="font-size:16px;color:#0f2a44;font-weight:700;font-family:Menlo,Consolas,monospace;letter-spacing:1px">${esc(password)}</td></tr>
</table>
<a href="${link}" style="display:inline-block;margin-top:18px;background:#14868c;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:13px 24px;border-radius:999px">Sign in to your participant area →</a>
<div style="font-size:12px;color:#607286;margin-top:12px">Please keep this password private. You can change it after signing in.</div>
</td></tr></table></td></tr>
<tr><td style="padding:22px 32px 28px;font-size:12px;line-height:1.6;color:#607286">
Payment is received directly by the Rheumatology Society, Mauritius. Registration fees are non-refundable and non-transferable.<br>
Questions? Write to the PAFLAR Secretariat at <a href="mailto:paflar2020@gmail.com" style="color:#14868c">paflar2020@gmail.com</a>.
</td></tr>
</table>
<div style="font-size:11px;color:#9aabb9;margin-top:14px">Rheumatology Society, Mauritius · This is an automated message.</div>
</td></tr></table></body></html>`;
  const text = `You're registered, ${name}.\n\nRegistration ID: ${p.id}\nCategory: ${p.category}\nAmount paid: ${total}\nPayment reference: ${p.txn}\n\nYour participant area\nEmail: ${p.email}\nPassword: ${password}\nSign in: ${link}\n\nRheumatology Society, Mauritius · paflar2020@gmail.com`;
  return { subject, html, text };
}

/* Sends with SMTP (e.g. Gmail app password, Brevo) or Resend, whichever is configured. */
async function sendMail(to: string, mail: { subject: string; html: string; text: string }): Promise<{ sent: boolean; via?: string; error?: string }> {
  const from = process.env.MAIL_FROM || "Rheumatology Society, Mauritius <no-reply@rheumatologysociety.org>";
  try {
    if (process.env.RESEND_API_KEY) {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to, subject: mail.subject, html: mail.html, text: mail.text }),
      });
      if (!r.ok) return { sent: false, error: `Resend ${r.status}` };
      return { sent: true, via: "resend" };
    }
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const nodemailer = (await import("nodemailer")).default;
      const port = Number(process.env.SMTP_PORT || 465);
      const t = nodemailer.createTransport({ host: process.env.SMTP_HOST, port, secure: port === 465, auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } });
      await t.sendMail({ from, to, subject: mail.subject, html: mail.html, text: mail.text });
      return { sent: true, via: "smtp" };
    }
    return { sent: false, error: "not-configured" };
  } catch (e) {
    return { sent: false, error: e instanceof Error ? e.message : "send-failed" };
  }
}


/* ---------- fees (server is the source of truth) ---------- */
const EARLY_BIRD_ENDS = "2027-02-01T00:00:00+04:00";
const LOCAL_DAY_FEE = 4000;
const CATEGORIES = {
  intl: { title: "International delegate", early: { usd: 300, mur: 14400 }, normal: { usd: 400, mur: 19100 } },
  member: { title: "PAFLAR member", early: { usd: 250, mur: 12000 }, normal: { usd: 350, mur: 16800 } },
  allied: { title: "Allied health professional", early: { usd: 250, mur: 12000 }, normal: { usd: 350, mur: 16800 } },
} as const;

/* ---------- CORS: the website may call this API ---------- */
const ALLOWED = [/^https:\/\/rsm-website[a-z0-9-]*\.vercel\.app$/, /^https:\/\/([a-z0-9-]+\.)?rheumatologysociety\.(org|mu|com)$/, /^http:\/\/localhost(:\d+)?$/];
function cors(req: Request) {
  const o = req.headers.get("origin") || "";
  const ok = ALLOWED.some((r) => r.test(o));
  return { "Access-Control-Allow-Origin": ok ? o : "null", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", Vary: "Origin" };
}
const json = (req: Request, body: unknown, status = 200) => Response.json(body, { status, headers: cors(req) });
const clean = (s: unknown, max = 120) => String(s ?? "").replace(/[\u0000-\u001f]/g, "").trim().slice(0, max);

async function register(req: Request) {
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return json(req, { error: "Invalid request" }, 400); }
  const email = clean(b.email, 160).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(req, { error: "Enter a valid email address" }, 400);
  if (!clean(b.first) || !clean(b.last) || !b.terms) return json(req, { error: "Missing details" }, 400);
  const early = Date.now() < new Date(EARLY_BIRD_ENDS).getTime();
  let days: RegPayload["days"], amount: number, usd: number | undefined, category: string;
  if (b.path === "mu") {
    const want = Array.isArray(b.days) ? (b.days as string[]) : [];
    days = (["fri", "sat", "sun"] as const).filter((d) => want.includes(d));
    if (!days.length) return json(req, { error: "Choose at least one day" }, 400);
    amount = days.length * LOCAL_DAY_FEE; category = "Mauritian resident";
  } else {
    const c = CATEGORIES[String(b.category) as keyof typeof CATEGORIES];
    if (!c) return json(req, { error: "Choose a category" }, 400);
    const p = early ? c.early : c.normal;
    days = ["fri", "sat", "sun"]; amount = p.mur; usd = p.usd; category = c.title;
  }
  const now = new Date().toISOString();
  const id = newId();
  const payload: RegPayload = {
    id, title: "", first: clean(b.first, 60), last: clean(b.last, 60), email, phone: clean(b.phone, 40), country: clean(b.country, 60), city: clean(b.city, 60),
    type: b.path === "mu" ? "mu" : "intl", category, days, amount, usd, workplace: clean(b.workplace), mcr: clean(b.mcr, 40), dietary: clean(b.diet, 80) || "None",
    hotel: !!b.hotel, registeredAt: now, paidAt: now, txn: `SBM-DEMO-${Date.now().toString().slice(-8)}`,
  };
  const token = makeToken(payload);
  const password = passwordFor(id);
  const origin = new URL(req.url).origin;
  const link = `${origin}/#/login?t=${encodeURIComponent(token)}`;
  const mail = confirmationEmail(payload, password, link, origin);
  const result = await sendMail(email, mail);
  return json(req, { id, link, emailSent: result.sent, emailError: result.sent ? undefined : result.error, preview: result.sent ? undefined : { subject: mail.subject, html: mail.html, password } });
}

async function session(req: Request) {
  let b: { token?: string; email?: string; password?: string };
  try { b = await req.json(); } catch { return json(req, { error: "Invalid request" }, 400); }
  const p = b.token ? readToken(b.token) : null;
  if (!p || p.email !== String(b.email ?? "").trim().toLowerCase() || !checkPassword(p.id, String(b.password ?? ""))) {
    await new Promise((r) => setTimeout(r, 600));
    return json(req, { error: "Email or password is incorrect" }, 401);
  }
  return json(req, { registration: p });
}

export default {
  async fetch(req: Request) {
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(req) });
    const path = new URL(req.url).pathname.replace(/\/+$/, "");
    if (req.method === "POST" && path.endsWith("/register")) return register(req);
    if (req.method === "POST" && path.endsWith("/session")) return session(req);
    return json(req, { error: "Not found" }, 404);
  },
};
