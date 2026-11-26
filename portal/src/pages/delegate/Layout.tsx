import { NavLink, Outlet, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Award, FileText, Home, LogOut, QrCode, ScrollText, UserRound } from "lucide-react";
import { useStore } from "../../data/store";
import { Avatar, Logo } from "../../ui/ui";

const links = [
  { to: "/me", label: "Overview", icon: Home, end: true },
  { to: "/me/badge", label: "QR badge", icon: QrCode },
  { to: "/me/receipt", label: "Receipt", icon: FileText },
  { to: "/me/abstracts", label: "Abstracts", icon: ScrollText },
  { to: "/me/certificate", label: "Certificate", icon: Award },
  { to: "/me/profile", label: "Profile", icon: UserRound },
];

export function useMe() {
  const { session, regs } = useStore();
  const id = session?.role === "delegate" ? session.regId : "";
  return regs.find((r) => r.id === id)!;
}

export default function DelegateLayout() {
  const me = useMe();
  const { signOut } = useStore();
  const nav = useNavigate();
  return (
    <div className="min-h-svh pb-24 lg:pb-0">
      <header className="no-print sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-6xl items-center gap-6 px-4 md:px-6">
          <Logo tag="Participant area" tagClass="xl:block" />
          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => clsx("whitespace-nowrap rounded-full px-3 py-2 text-[13.5px] font-semibold transition", isActive ? "bg-navy text-white" : "text-muted hover:bg-mist hover:text-navy")}>{l.label}</NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3 lg:ml-4">
            <div className="hidden text-right sm:block lg:hidden xl:block">
              <div className="whitespace-nowrap text-[13px] font-semibold text-navy">{me.title} {me.first} {me.last}</div>
              <div className="text-[11px] text-muted">{me.id}</div>
            </div>
            <Avatar first={me.first} last={me.last} />
            <button onClick={() => { signOut(); nav("/login"); }} className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-mist hover:text-crimson" title="Sign out" aria-label="Sign out"><LogOut className="h-4 w-4" /></button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-10"><Outlet /></main>
      <nav className="no-print fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        {links.slice(0, 5).map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => clsx("flex flex-col items-center gap-1 py-2.5 text-[10.5px] font-semibold", isActive ? "text-teal" : "text-muted")}>
            <l.icon className="h-5 w-5" /> {l.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
