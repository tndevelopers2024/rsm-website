import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { ArrowLeft, ArrowRight, BadgeCheck, Eye, EyeOff, KeyRound, Landmark, LockKeyhole, Mail, QrCode, ShieldCheck, UserRound, Award, ScrollText } from "lucide-react";
import { liveRegs, saveLive, toRegistration, useStore } from "../data/store";
import { DEMO_DELEGATE_ID } from "../data/seed";
import { Logo } from "../ui/ui";

const DEMO = {
  delegate: { email: "amara.okafor@example.com", password: "Participant@2027" },
  admin: { email: "secretariat@rheumatologysociety.org", password: "Admin@2027!" },
};
const DEMO_OTP = "482913";

export default function Login() {
  const nav = useNavigate();
  const { signIn, session, addLive } = useStore();
  const loc = useLocation();
  const [welcome, setWelcome] = useState<string | null>(null);
  const first = useRef(true);
  const [role, setRole] = useState<"delegate" | "admin">("delegate");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [step, setStep] = useState<"creds" | "otp">("creds");
  const [otp, setOtp] = useState("");
  const [busy, setBusy] = useState(false);
  const otpRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (session) nav(session.role === "admin" ? "/admin" : "/me", { replace: true }); }, [session, nav]);
  useEffect(() => { if (first.current) { first.current = false; return; } setEmail(""); setPassword(""); setErr(""); setStep("creds"); setOtp(""); }, [role]);
  useEffect(() => {
    const t = new URLSearchParams(loc.search).get("t");
    if (!t) return;
    try {
      const b = t.split(".")[0].replace(/-/g, "+").replace(/_/g, "/");
      const bin = atob(b + "===".slice((b.length + 3) % 4));
      const p = JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0))));
      saveLive({ email: p.email, token: t, id: p.id });
      setRole("delegate"); setEmail(p.email); setWelcome(`${p.first} ${p.last}`);
    } catch { /* bad link */ }
  }, [loc.search]);
  useEffect(() => { if (step === "otp") otpRef.current?.focus(); }, [step]);

  const fillDemo = () => { setEmail(DEMO[role].email); setPassword(DEMO[role].password); setErr(""); };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const em = email.trim().toLowerCase();
    if (role === "delegate" && em !== DEMO.delegate.email) {
      const live = liveRegs().find((x) => x.email === em);
      if (!live) { setErr("We couldn’t find a registration for this email on this device. Please use the sign-in link in your confirmation email."); return; }
      setBusy(true);
      fetch("/api/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token: live.token, email: em, password }) })
        .then(async (r) => {
          const d = await r.json().catch(() => ({}));
          if (!r.ok) throw new Error(d.error || "Email or password is incorrect");
          const reg = toRegistration(d.registration);
          addLive(reg);
          signIn({ role: "delegate", regId: reg.id, name: `${reg.title} ${reg.first} ${reg.last}` });
          nav("/me");
        })
        .catch((e2) => setErr(e2 instanceof TypeError ? "Couldn’t reach the sign-in service. Please check your connection and try again." : e2.message))
        .finally(() => setBusy(false));
      return;
    }
    if (em !== DEMO[role].email || password !== DEMO[role].password) {
      setErr("Email or password is incorrect. For this demo, use the demo credentials button.");
      return;
    }
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      if (role === "admin") setStep("otp");
      else { signIn({ role: "delegate", regId: DEMO_DELEGATE_ID, name: "Dr Amara Okafor" }); nav("/me"); }
    }, 550);
  };

  const verify = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (otp !== DEMO_OTP) { setErr("That code is not valid. Codes expire after 5 minutes."); return; }
    setBusy(true);
    window.setTimeout(() => { signIn({ role: "admin", name: "Secretariat", title: "Super admin" }); nav("/admin"); }, 450);
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-[1.05fr_1fr]">
      {/* visual side */}
      <div className="grain relative isolate hidden overflow-hidden bg-navy-deep text-white lg:block">
        <img src="./a03.jpg" alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_35%] opacity-45" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(160deg,rgba(11,32,52,.55),rgba(11,32,52,.92)_62%)]" />
        <div className="absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full border border-white/10" />
        <div className="absolute -right-24 -top-24 -z-10 h-[360px] w-[360px] rounded-full border border-white/10" />
        <div className="flex h-full flex-col p-12 xl:p-16">
          <Logo light size="lg" />
          <div className="mt-auto max-w-xl">
            <div className="eyebrow text-gold">Official registration · 7th PAFLAR Congress · 7–9 May 2027</div>
            <h1 className="mt-5 text-[42px] font-light leading-[1.06] tracking-tight xl:text-[50px]">
              Register directly with the <span className="font-serif italic text-aqua">Rheumatology Society, Mauritius.</span>
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/70">One place for participants and the organising team: registration, secure payment, QR badges, abstracts, attendance and certificates.</p>
            <ul className="mt-9 space-y-3">
              {[
                [Landmark, "Secure card payment", "Received directly into the Society’s own SBM bank account"],
                [QrCode, "Instant receipt and QR badge", "Emailed and always available in your account"],
                [ScrollText, "Abstract submission", "Submit, track and receive the committee’s decision"],
                [Award, "e-Certificate with CPD points", "Issued automatically after you attend"],
              ].map(([I, t, s]) => {
                const Icon = I as typeof QrCode;
                return (
                  <li key={t as string} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.06] px-4 py-3 backdrop-blur">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-aqua/15 text-aqua"><Icon className="h-5 w-5" /></span>
                    <span><span className="block text-sm font-semibold">{t as string}</span><span className="block text-xs text-white/60">{s as string}</span></span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-10 flex items-center gap-2 text-xs text-white/50"><ShieldCheck className="h-4 w-4" /> Encrypted connection · Two-step verification for staff · Every action audited</div>
        </div>
      </div>

      {/* form side */}
      <div className="relative flex flex-col bg-white">
        <div className="flex items-center justify-between p-6 lg:px-16 lg:pt-10"><Logo tag="Congress registration" /></div>
        <div className="flex flex-1 items-center justify-center px-6 pb-12 lg:px-16">
          <div className="w-full max-w-[420px]">
            <AnimatePresence mode="wait">
              {step === "creds" ? (
                <motion.div key="creds" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                  <div className="eyebrow text-teal">Welcome back</div>
                  <h2 className="mt-3 text-[32px] font-semibold tracking-tight text-navy">Sign in</h2>
                  <p className="mt-1.5 text-sm text-muted">7th PAFLAR Congress · hosted by the Rheumatology Society, Mauritius</p>

                  <div className="mt-7 grid grid-cols-2 gap-2 rounded-2xl bg-mist p-1.5">
                    {([["delegate", "Participant", UserRound], ["admin", "Organising team", LockKeyhole]] as const).map(([k, l, I]) => (
                      <button key={k} onClick={() => setRole(k)} className={clsx("flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition", role === k ? "bg-white text-navy shadow-sm" : "text-muted hover:text-navy")}>
                        <I className="h-4 w-4" /> {l}
                      </button>
                    ))}
                  </div>

                  {welcome && role === "delegate" && (
                    <div className="mt-5 flex items-start gap-3 rounded-2xl bg-teal/8 px-4 py-3 ring-1 ring-teal/20">
                      <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                      <div className="text-[13px] text-ink/80"><b className="text-navy">Welcome, {welcome}.</b> Your registration is confirmed. Enter the password from your confirmation email to sign in.</div>
                    </div>
                  )}
                  {!welcome && <button type="button" onClick={fillDemo} className="mt-5 flex w-full items-center justify-between rounded-2xl border border-dashed border-gold/70 bg-gold-soft/50 px-4 py-3 text-left transition hover:bg-gold-soft">
                    <span>
                      <span className="block text-[13px] font-semibold text-[#7a5d18]">Use demo credentials</span>
                      <span className="block text-xs text-[#7a5d18]/75">{role === "delegate" ? "Dr Amara Okafor · PAFLAR member, Nigeria" : "Secretariat · Super admin with 2-step verification"}</span>
                    </span>
                    <KeyRound className="h-5 w-5 text-gold" />
                  </button>}

                  <form onSubmit={submit} className="mt-5 space-y-4">
                    <div>
                      <label className="label" htmlFor="email">Email address</label>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                        <input id="email" className="input pl-10" type="email" autoComplete="username" placeholder={role === "delegate" ? "you@hospital.org" : "name@rheumatologysociety.org"} value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between"><label className="label" htmlFor="pw">Password</label><button type="button" className="mb-1.5 text-xs font-semibold text-teal hover:underline">Forgot password?</button></div>
                      <div className="relative">
                        <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                        <input id="pw" className="input px-10" type={show ? "text" : "password"} autoComplete="current-password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-navy" aria-label="Show password">{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
                      </div>
                    </div>
                    {err && <p className="rounded-xl bg-bad/8 px-3 py-2 text-[13px] text-bad">{err}</p>}
                    <button className="btn btn-primary w-full !py-3 text-[15px]" disabled={busy}>{busy ? "Checking…" : <>Sign in <ArrowRight className="h-4 w-4" /></>}</button>
                  </form>

                  {role === "delegate" ? (
                    <p className="mt-6 text-center text-[13px] text-muted">First time here? Your login is created automatically when you <a className="font-semibold text-teal hover:underline" href="https://rsm-website-peach.vercel.app/paflar-2027/register" target="_blank" rel="noreferrer">register for PAFLAR 2027</a>.</p>
                  ) : (
                    <p className="mt-6 text-center text-[13px] text-muted">Staff accounts are invited by a Super admin. Two-step verification is required for every sign-in.</p>
                  )}
                </motion.div>
              ) : (
                <motion.div key="otp" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                  <button onClick={() => { setStep("creds"); setOtp(""); setErr(""); }} className="flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-navy"><ArrowLeft className="h-4 w-4" /> Back</button>
                  <div className="mt-8 grid h-14 w-14 place-items-center rounded-2xl bg-teal/10 text-teal"><BadgeCheck className="h-7 w-7" /></div>
                  <h2 className="mt-5 text-[28px] font-semibold tracking-tight text-navy">Two-step verification</h2>
                  <p className="mt-1.5 text-sm text-muted">Enter the 6-digit code from your authenticator app, or the code sent by SMS to +230 5•• •• 21.</p>
                  <form onSubmit={verify} className="mt-7">
                    <div className="relative" onClick={() => otpRef.current?.focus()}>
                      <input ref={otpRef} value={otp} onChange={(e) => { setErr(""); setOtp(e.target.value.replace(/\D/g, "").slice(0, 6)); }} inputMode="numeric" autoComplete="one-time-code" className="absolute inset-0 opacity-0" aria-label="Verification code" />
                      <div className="grid grid-cols-6 gap-2">
                        {Array.from({ length: 6 }, (_, i) => (
                          <div key={i} className={clsx("grid h-14 place-items-center rounded-xl border text-xl font-semibold text-navy transition", otp.length === i ? "border-teal ring-4 ring-teal/10" : "border-line")}>{otp[i] ?? ""}</div>
                        ))}
                      </div>
                    </div>
                    <button type="button" onClick={() => { setOtp(DEMO_OTP); setErr(""); }} className="mt-4 w-full rounded-xl border border-dashed border-gold/70 bg-gold-soft/50 py-2.5 text-[13px] font-semibold text-[#7a5d18] hover:bg-gold-soft">Use demo code ({DEMO_OTP})</button>
                    {err && <p className="mt-3 rounded-xl bg-bad/8 px-3 py-2 text-[13px] text-bad">{err}</p>}
                    <button className="btn btn-primary mt-5 w-full !py-3 text-[15px]" disabled={otp.length < 6 || busy}>{busy ? "Verifying…" : "Verify and continue"}</button>
                    <p className="mt-4 text-center text-xs text-muted">Didn’t get a code? <button type="button" className="font-semibold text-teal">Resend in 0:30</button></p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 border-t border-line px-6 py-4 text-[11.5px] text-muted"><ShieldCheck className="h-3.5 w-3.5 text-teal" /> Personal data handled under the Mauritius Data Protection Act 2017</div>
      </div>
    </div>
  );
}
