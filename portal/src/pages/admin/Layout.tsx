import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Activity, Award, Bell, Landmark, CreditCard, FileSpreadsheet, LayoutDashboard, LogOut, Menu, MessagesSquare, QrCode, ScrollText, Search, Settings, ShieldCheck, Users, X } from "lucide-react";
import { useStore } from "../../data/store";
import { ago } from "../../lib";

const groups = [
  { label: "", items: [{ to: "/admin", label: "Overview", icon: LayoutDashboard, end: true }] },
  { label: "Participants", items: [{ to: "/admin/registrations", label: "Registrations", icon: Users }, { to: "/admin/payments", label: "Payments", icon: CreditCard }, { to: "/admin/abstracts", label: "Abstracts", icon: ScrollText }] },
  { label: "Event", items: [{ to: "/admin/attendance", label: "QR attendance", icon: QrCode }, { to: "/admin/certificates", label: "Certificates", icon: Award }] },
  { label: "Engage", items: [{ to: "/admin/communications", label: "Email & WhatsApp", icon: MessagesSquare }] },
  { label: "Insights", items: [{ to: "/admin/reports", label: "Excel reports", icon: FileSpreadsheet }, { to: "/admin/activity", label: "Website & audit log", icon: Activity }] },
  { label: "", items: [{ to: "/admin/settings", label: "Settings & security", icon: Settings }] },
];

function Sidebar({ onNav }: { onNav?: () => void }) {
  const { regs, abstracts } = useStore();
  const counts: Record<string, number> = {
    "/admin/registrations": regs.filter((r) => r.status === "pending").length,
    "/admin/abstracts": abstracts.filter((a) => a.status === "Submitted").length,
  };
  return (
    <div className="flex h-full flex-col bg-navy-deep text-white">
      <div className="px-4 pb-4 pt-5"><div className="rounded-2xl bg-white px-4 py-3 shadow-[0_10px_30px_-18px_rgba(0,0,0,.6)]"><img src="./rsm-logo-full.png" alt="Rheumatology Society, Mauritius" className="w-full" /></div><div className="mt-3 px-1 font-cond text-[10.5px] uppercase tracking-[0.2em] text-white/45">Congress registration · Admin</div></div>
      <div className="mx-4 rounded-2xl border border-white/10 bg-white/[.05] px-4 py-3">
        <div className="eyebrow text-gold">Event</div>
        <div className="mt-1 text-sm font-semibold">7th PAFLAR Congress</div>
        <div className="text-xs text-white/55">7–9 May 2027 · Mauritius</div>
      </div>
      <nav className="scroll-thin mt-4 flex-1 overflow-y-auto px-3 pb-6">
        {groups.map((g, i) => (
          <div key={i} className="mt-3">
            {g.label && <div className="px-3 pb-1.5 font-cond text-[10px] uppercase tracking-[0.2em] text-white/35">{g.label}</div>}
            {g.items.map((it) => (
              <NavLink key={it.to} to={it.to} end={"end" in it} onClick={onNav} className={({ isActive }) => clsx("group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition", isActive ? "bg-white text-navy shadow" : "text-white/70 hover:bg-white/[.07] hover:text-white")}>
                <it.icon className="h-[18px] w-[18px]" />
                <span className="flex-1">{it.label}</span>
                {counts[it.to] ? <span className="rounded-full bg-crimson px-1.5 py-0.5 text-[10.5px] font-bold text-white">{counts[it.to]}</span> : null}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
      <div className="m-3 space-y-2"><div className="rounded-xl bg-white/[.05] px-3 py-2.5 text-[11.5px] text-white/60"><div className="flex items-center gap-2 font-semibold text-white/85"><Landmark className="h-4 w-4 text-gold" /> Funds → Society’s SBM account</div><div className="mt-0.5 pl-6">No partner holds the money</div></div><div className="flex items-center gap-2 rounded-xl bg-white/[.05] px-3 py-2.5 text-[11.5px] text-white/60"><ShieldCheck className="h-4 w-4 text-aqua" /> 2FA on · 15-min idle timeout</div></div>
    </div>
  );
}

export default function AdminLayout() {
  const { session, signOut, audit } = useStore();
  const nav = useNavigate();
  const loc = useLocation();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [bell, setBell] = useState(false);
  const name = session?.role === "admin" ? session.name : "";
  return (
    <div className="min-h-svh lg:pl-[264px]">
      <aside className="no-print fixed inset-y-0 left-0 hidden w-[264px] lg:block"><Sidebar /></aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-navy-deep/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[280px]"><Sidebar onNav={() => setOpen(false)} /></div>
          <button onClick={() => setOpen(false)} className="absolute left-[292px] top-4 grid h-10 w-10 place-items-center rounded-full bg-white"><X className="h-5 w-5" /></button>
        </div>
      )}
      <header className="no-print sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white/90 px-4 backdrop-blur md:px-8">
        <button onClick={() => setOpen(true)} className="grid h-10 w-10 place-items-center rounded-xl hover:bg-mist lg:hidden" aria-label="Menu"><Menu className="h-5 w-5" /></button>
        <form onSubmit={(e) => { e.preventDefault(); nav(`/admin/registrations?q=${encodeURIComponent(q)}`); }} className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search participants by name, email or ID…" className="input !rounded-full bg-mist !py-2 pl-10" />
        </form>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <button onClick={() => setBell((b) => !b)} className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-mist" aria-label="Notifications"><Bell className="h-[18px] w-[18px]" /><span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-crimson" /></button>
            {bell && (
              <div className="card absolute right-0 top-12 w-80 p-2">
                <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted">Latest activity</div>
                {audit.slice(0, 5).map((a) => (
                  <div key={a.id} className="rounded-xl px-3 py-2 hover:bg-mist"><div className="text-[13px] font-semibold text-navy">{a.action}</div><div className="text-[11.5px] text-muted">{a.target} · {ago(a.at)}</div></div>
                ))}
              </div>
            )}
          </div>
          <div className="hidden text-right sm:block"><div className="text-[13px] font-semibold text-navy">{name}</div><div className="text-[11px] text-muted">Super admin</div></div>
          <div className="grid h-9 w-9 place-items-center rounded-full bg-navy text-[13px] font-bold text-white">SE</div>
          <button onClick={() => { signOut(); nav("/login"); }} className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-mist hover:text-crimson" title="Sign out" aria-label="Sign out"><LogOut className="h-4 w-4" /></button>
        </div>
      </header>
      <main key={loc.pathname} className="px-4 py-6 md:px-8 md:py-8"><Outlet /></main>
    </div>
  );
}
