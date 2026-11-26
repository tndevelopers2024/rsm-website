import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Abstract, AuditEntry, Automation, DayKey, Message, Registration, Settings } from "./types";
import { DEMO_DELEGATE_ID, defaultSettings, seedAbstracts, seedAudit, seedAutomations, seedMessages, seedRegistrations } from "./seed";

interface DB {
  regs: Registration[];
  abstracts: Abstract[];
  messages: Message[];
  audit: AuditEntry[];
  automations: Automation[];
  settings: Settings;
}

export type Session = { role: "delegate"; regId: string; name: string } | { role: "admin"; name: string; title: string } | null;

const KEY = "rsm-portal-demo-v1";
const LIVE = "rsm-live-regs";

/* Registrations made on the website (signed token from the server). */
export type LiveReg = { email: string; token: string; id: string };
export function liveRegs(): LiveReg[] { try { return JSON.parse(localStorage.getItem(LIVE) || "[]"); } catch { return []; } }
export function saveLive(r: LiveReg) { try { localStorage.setItem(LIVE, JSON.stringify([r, ...liveRegs().filter((x) => x.email !== r.email)])); } catch { /* ignore */ } }
function decodePayload(token: string): Partial<Registration> | null {
  try {
    const b = token.split(".")[0].replace(/-/g, "+").replace(/_/g, "/");
    const bin = atob(b + "===".slice((b.length + 3) % 4));
    return JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0))));
  } catch { return null; }
}
export function toRegistration(p: Partial<Registration>): Registration {
  return {
    id: p.id!, title: p.title ?? "Dr", first: p.first ?? "", last: p.last ?? "", email: p.email ?? "", phone: p.phone ?? "", country: p.country ?? "", city: p.city ?? "",
    type: p.type ?? "intl", category: (p.category ?? "International delegate") as Registration["category"], days: p.days ?? ["fri", "sat", "sun"], amount: p.amount ?? 0, usd: p.usd,
    earlyBird: true, status: "paid", method: "Card · SBM secure payment", txn: p.txn, paidAt: p.paidAt, registeredAt: p.registeredAt ?? new Date().toISOString(),
    workplace: p.workplace ?? "", mcr: p.mcr ?? "", speciality: "", dietary: p.dietary ?? "None", hotel: !!p.hotel, source: "Website (live)", attendance: {}, notes: "",
  };
}
function mergeLive(db: DB): DB {
  let regs = db.regs, messages = db.messages;
  for (const l of liveRegs()) {
    if (regs.some((r) => r.id === l.id)) continue;
    const p = decodePayload(l.token); if (!p?.id) continue;
    const r = toRegistration(p);
    regs = [r, ...regs];
    messages = [
      { id: `L${r.id}a`, regId: r.id, channel: "Email", template: "Registration confirmed + login details", to: r.email, at: r.registeredAt, status: "Delivered" },
      { id: `L${r.id}b`, regId: r.id, channel: "WhatsApp", template: "Registration confirmed", to: r.phone, at: r.registeredAt, status: "Sent" },
      ...messages,
    ];
  }
  return regs === db.regs ? db : { ...db, regs, messages };
}
const SKEY = "rsm-portal-session";

function fresh(): DB {
  const regs = seedRegistrations();
  return { regs, abstracts: seedAbstracts(regs), messages: seedMessages(regs), audit: seedAudit(), automations: seedAutomations(), settings: defaultSettings };
}
function load(): DB {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return mergeLive(JSON.parse(raw) as DB);
  } catch { /* storage unavailable */ }
  return mergeLive(fresh());
}
function loadSession(): Session {
  try { const s = sessionStorage.getItem(SKEY); return s ? (JSON.parse(s) as Session) : null; } catch { return null; }
}

interface Ctx extends DB {
  session: Session;
  signIn: (s: Session) => void;
  signOut: () => void;
  updateReg: (id: string, patch: Partial<Registration>, why: string) => void;
  checkIn: (id: string, day: DayKey) => { ok: boolean; msg: string; reg?: Registration };
  addAbstract: (a: Abstract) => void;
  updateAbstract: (id: string, patch: Partial<Abstract>, why: string) => void;
  send: (m: Omit<Message, "id" | "at" | "status"> & { status?: Message["status"] }) => void;
  log: (action: string, target: string) => void;
  toggleAutomation: (id: string) => void;
  updateSettings: (p: Partial<Settings>) => void;
  simulateEventDays: () => void;
  reset: () => void;
  addLive: (r: Registration) => void;
  toast: string | null;
  notify: (t: string) => void;
}

const C = createContext<Ctx | null>(null);
let seq = 0;
const nid = (p: string) => `${p}${Date.now().toString(36)}${(seq++).toString(36)}`;

export function StoreProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState<DB>(load);
  const [session, setSession] = useState<Session>(loadSession);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch { /* ignore */ } }, [db]);
  useEffect(() => { try { session ? sessionStorage.setItem(SKEY, JSON.stringify(session)) : sessionStorage.removeItem(SKEY); } catch { /* ignore */ } }, [session]);

  useEffect(() => { const f = () => setDb((d) => mergeLive(d)); window.addEventListener("focus", f); window.addEventListener("storage", f); return () => { window.removeEventListener("focus", f); window.removeEventListener("storage", f); }; }, []);

  const notify = useCallback((t: string) => { setToast(t); window.setTimeout(() => setToast((x) => (x === t ? null : x)), 3200); }, []);

  const actor = session?.role === "admin" ? session.name : session?.role === "delegate" ? session.name : "System";
  const role = session?.role === "admin" ? session.title : session?.role === "delegate" ? "Participant" : "System";
  const audit = useCallback((action: string, target: string): AuditEntry => ({ id: nid("A"), at: new Date().toISOString(), actor, role, action, target, ip: "197.224.18.42" }), [actor, role]);

  const value = useMemo<Ctx>(() => ({
    ...db, session, toast, notify,
    signIn: (s) => { setSession(s); if (s) setDb((d) => ({ ...d, audit: [{ id: nid("A"), at: new Date().toISOString(), actor: s.name, role: s.role === "admin" ? s.title : "Participant", action: s.role === "admin" ? "Signed in (2FA verified)" : "Signed in", target: s.role === "admin" ? "Admin console" : "Participant portal", ip: "197.224.18.42" }, ...d.audit] })); },
    signOut: () => setSession(null),
    updateReg: (id, patch, why) => setDb((d) => ({ ...d, regs: d.regs.map((x) => (x.id === id ? { ...x, ...patch } : x)), audit: [audit(why, id), ...d.audit] })),
    checkIn: (id, day) => {
      const reg = db.regs.find((x) => x.id === id.trim().toUpperCase());
      if (!reg) return { ok: false, msg: "No registration found for this badge" };
      if (reg.status !== "paid") return { ok: false, msg: `Payment ${reg.status} · send to the help desk`, reg };
      if (!reg.days.includes(day)) return { ok: false, msg: "Not registered for this day", reg };
      if (reg.attendance[day]) return { ok: false, msg: `Already checked in at ${new Date(reg.attendance[day]!).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`, reg };
      const at = new Date().toISOString();
      setDb((d) => ({ ...d, regs: d.regs.map((x) => (x.id === reg.id ? { ...x, attendance: { ...x.attendance, [day]: at } } : x)), audit: [audit("Checked in participant (QR)", `${reg.id} · ${day.toUpperCase()}`), ...d.audit] }));
      return { ok: true, msg: "Checked in", reg: { ...reg, attendance: { ...reg.attendance, [day]: at } } };
    },
    addAbstract: (a) => setDb((d) => ({
      ...d, abstracts: [a, ...d.abstracts],
      messages: [{ id: nid("M"), regId: a.regId, channel: "Email", template: "Abstract received", to: d.regs.find((x) => x.id === a.regId)?.email ?? "", at: new Date().toISOString(), status: "Delivered" }, ...d.messages],
      audit: [audit("Submitted abstract", a.id), ...d.audit],
    })),
    updateAbstract: (id, patch, why) => setDb((d) => {
      const abs = d.abstracts.find((x) => x.id === id);
      const reg = abs && d.regs.find((x) => x.id === abs.regId);
      const decided = patch.status && ["Accepted", "Rejected", "Revisions requested"].includes(patch.status);
      return {
        ...d, abstracts: d.abstracts.map((x) => (x.id === id ? { ...x, ...patch } : x)),
        messages: decided && reg ? [{ id: nid("M"), regId: reg.id, channel: "Email", template: `Abstract decision · ${patch.status}`, to: reg.email, at: new Date().toISOString(), status: "Delivered" }, ...d.messages] : d.messages,
        audit: [audit(why, id), ...d.audit],
      };
    }),
    send: (m) => setDb((d) => ({ ...d, messages: [{ ...m, id: nid("M"), at: new Date().toISOString(), status: m.status ?? "Sent" }, ...d.messages] })),
    log: (action, target) => setDb((d) => ({ ...d, audit: [audit(action, target), ...d.audit] })),
    toggleAutomation: (id) => setDb((d) => ({ ...d, automations: d.automations.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a)), audit: [audit("Toggled automation", d.automations.find((a) => a.id === id)?.name ?? id), ...d.audit] })),
    updateSettings: (p) => setDb((d) => ({ ...d, settings: { ...d.settings, ...p }, audit: [audit("Updated settings", Object.keys(p).join(", ")), ...d.audit] })),
    simulateEventDays: () => setDb((d) => {
      const base = { fri: "2027-05-07T08:", sat: "2027-05-08T08:", sun: "2027-05-09T08:" } as const;
      let k = 0;
      const regs = d.regs.map((x) => {
        if (x.status !== "paid" || x.id === DEMO_DELEGATE_ID) return x;
        const att: Registration["attendance"] = { ...x.attendance };
        for (const day of x.days) if (!att[day] && (k++ * 7919) % 100 < 86) att[day] = `${base[day]}${String(5 + ((k * 13) % 50)).padStart(2, "0")}:00+04:00`;
        return { ...x, attendance: att };
      });
      return { ...d, regs, audit: [audit("Loaded event-day demo check-ins", "Fri–Sun"), ...d.audit] };
    }),
    reset: () => { const f = mergeLive(fresh()); setDb(f); notify("Demo data reset"); },
    addLive: (r) => setDb((d) => (d.regs.some((x) => x.id === r.id) ? d : mergeLive(d))),
  }), [db, session, toast, notify, audit]);

  return <C.Provider value={value}>{children}</C.Provider>;
}

export function useStore() {
  const c = useContext(C);
  if (!c) throw new Error("StoreProvider missing");
  return c;
}
