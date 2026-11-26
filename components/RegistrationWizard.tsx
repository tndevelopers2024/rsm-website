"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import {
  ArrowLeft, ArrowRight, Check, MapPin, Award, Globe2, Home, ShieldCheck, Lock, CreditCard,
  BedDouble, Utensils, Mail, Pencil, X, Clock, Sparkles, Info, Hourglass,
} from "lucide-react";
import {
  days, localDayFee, localCpdPerDay, localPackageNames, intlCategories, earlyBirdEnds, earlyBirdLabel,
  mauritiusWorkplaces, dietaryOptions, registrationTerms, type IntlCategory,
} from "@/lib/paflar";

type Path = "mu" | "intl";
type DayId = "fri" | "sat" | "sun";
const ORDER: DayId[] = ["fri", "sat", "sun"];
const fmt = (n: number) => n.toLocaleString("en-GB");
const SECRETARIAT = "paflar2020@gmail.com";

const ISO =
  "AF AL DZ AD AO AR AM AU AT AZ BH BD BE BJ BT BO BA BW BR BG BF BI CV KH CM CA CF TD CL CN CO KM CG CD CR CI HR CU CY CZ DK DJ DO EC EG SV GQ ER EE SZ ET FJ FI FR GA GM GE DE GH GR GT GN GW GY HT HN HK HU IS IN ID IR IQ IE IL IT JM JP JO KZ KE KW KG LA LV LB LS LR LY LT LU MG MW MY MV ML MT MR MU MX MD MC MN ME MA MZ MM NA NP NL NZ NI NE NG MK NO OM PK PS PA PG PY PE PH PL PT QA RE RO RU RW SA SN RS SC SL SG SK SI SO ZA KR SS ES LK SD SR SE CH SY TW TJ TZ TH TG TT TN TR TM UG UA AE GB US UY UZ VE VN YE ZM ZW".split(" ");

type Form = {
  first: string; last: string; email: string; phone: string; country: string; city: string; street: string; street2: string;
  mcr: string; workplace: string; workplaceOther: string; diet: string[]; dietOther: string;
  hotel: boolean; checkIn: string; checkOut: string; hotelNote: string; terms: boolean;
};
const emptyForm: Form = {
  first: "", last: "", email: "", phone: "", country: "", city: "", street: "", street2: "",
  mcr: "", workplace: "", workplaceOther: "", diet: [], dietOther: "",
  hotel: false, checkIn: "2027-05-06", checkOut: "2027-05-10", hotelNote: "", terms: false,
};

/* ---------------- small UI pieces ---------------- */
function Field({ label, req, error, hint, children, className }: { label: string; req?: boolean; error?: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={clsx("block", className)}>
      <span className="mb-1.5 block text-[14px] font-medium text-navy">{label}{req && <span className="text-crimson"> *</span>}</span>
      {children}
      {error ? <span className="mt-1.5 block text-[13px] text-crimson">{error}</span> : hint ? <span className="mt-1.5 block text-[12.5px] text-muted">{hint}</span> : null}
    </label>
  );
}
const inputCls = (err?: string) =>
  clsx("h-12 w-full rounded-xl border bg-white px-4 text-[15.5px] text-navy outline-none transition placeholder:text-muted/60 focus:ring-4", err ? "border-crimson focus:ring-crimson/10" : "border-line focus:border-teal focus:ring-teal/10");

function Stepper({ step, labels, onJump }: { step: number; labels: string[]; onJump: (i: number) => void }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3">
      {labels.map((l, i) => {
        const done = i < step, on = i === step;
        return (
          <li key={l} className="flex flex-1 items-center gap-2 sm:gap-3">
            <button type="button" disabled={!done} onClick={() => onJump(i)} className={clsx("flex min-w-0 items-center gap-2.5", done && "cursor-pointer")}>
              <span className={clsx("grid h-9 w-9 shrink-0 place-items-center rounded-full text-[14px] font-semibold transition", done ? "bg-teal text-white" : on ? "bg-navy text-white ring-4 ring-navy/10" : "bg-mist text-muted ring-1 ring-line")}>
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              <span className={clsx("hidden truncate text-[14px] font-medium md:block", on ? "text-navy" : done ? "text-teal" : "text-muted")}>{l}</span>
            </button>
            {i < labels.length - 1 && <span className={clsx("h-[2px] flex-1 rounded", done ? "bg-teal" : "bg-line")} />}
          </li>
        );
      })}
    </ol>
  );
}

/* ---------------- main ---------------- */
export function RegistrationWizard() {
  const [step, setStep] = useState(0);
  const [path, setPath] = useState<Path | null>(null);
  const [sel, setSel] = useState<DayId[]>([]);
  const [cat, setCat] = useState<IntlCategory["id"] | null>(null);
  const [form, setForm] = useState<Form>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [payOpen, setPayOpen] = useState(false);
  const [now, setNow] = useState<number | null>(null);
  const top = useRef<HTMLDivElement>(null);

  useEffect(() => setNow(Date.now()), []);
  const early = now === null ? true : now < new Date(earlyBirdEnds).getTime();
  const daysLeft = now === null ? null : Math.max(0, Math.ceil((new Date(earlyBirdEnds).getTime() - now) / 86400000));

  const countries = useMemo(() => {
    try {
      const dn = new Intl.DisplayNames(["en"], { type: "region" });
      return ISO.map((c) => dn.of(c) || c).sort((a, b) => a.localeCompare(b));
    } catch {
      return ["Mauritius", "South Africa", "Kenya", "Nigeria", "France", "India", "United Kingdom", "United States"];
    }
  }, []);

  const key = ORDER.filter((d) => sel.includes(d)).join(",");
  const category = intlCategories.find((c) => c.id === cat);
  const order = useMemo(() => {
    if (path === "mu" && sel.length) {
      return {
        name: localPackageNames[key],
        lines: ORDER.filter((d) => sel.includes(d)).map((id) => {
          const d = days.find((x) => x.id === id)!;
          return { label: `${d.weekday} ${d.date.replace(" 2027", "")}`, sub: d.venue, amount: `MUR ${fmt(localDayFee)}` };
        }),
        total: `MUR ${fmt(localDayFee * sel.length)}`,
        alt: null as string | null,
        cpd: sel.length * localCpdPerDay,
      };
    }
    if (path === "intl" && category) {
      const p = early ? category.early : category.normal;
      return {
        name: `${category.title} · 3-day pass`,
        lines: [{ label: `${category.title} (${early ? "early bird" : "normal rate"})`, sub: "Workshops 7 May + congress 8–9 May", amount: `USD ${p.usd}` }],
        total: `USD ${p.usd}`,
        alt: `Charged as MUR ${fmt(p.mur)}`,
        cpd: 12,
      };
    }
    return null;
  }, [path, sel, key, category, early]);

  const labels = ["Delegate type", path === "intl" ? "Category" : "Days", "Your details", "Review & pay"];
  const go = (n: number) => {
    setStep(n);
    requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const choosePath = (p: Path) => {
    setPath(p);
    if (p === "mu") setForm((f) => ({ ...f, country: f.country || "Mauritius" }));
    go(1);
  };
  const toggleDay = (d: DayId) => setSel((s) => (s.includes(d) ? s.filter((x) => x !== d) : [...s, d]));

  const validate = () => {
    const e: Partial<Record<keyof Form, string>> = {};
    const req: [keyof Form, string][] = [["first", "First name"], ["last", "Last name"], ["email", "Email"], ["phone", "Phone"], ["country", "Country"], ["city", "Town / city"], ["street", "Street address"], ["mcr", "Registration number"]];
    for (const [k, l] of req) if (!String(form[k]).trim()) e[k] = `${l} is required`;
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email address";
    if (form.phone && form.phone.replace(/\D/g, "").length < 7) e.phone = "Enter a valid phone number";
    if (form.workplace === "Other" && !form.workplaceOther.trim()) e.workplaceOther = "Please tell us where you work";
    if (form.hotel && form.checkOut <= form.checkIn) e.checkOut = "Check-out must be after check-in";
    if (!form.terms) e.terms = "Please accept the terms to continue";
    setErrors(e);
    if (Object.keys(e).length) {
      const first = Object.keys(e)[0];
      requestAnimationFrame(() => document.querySelector<HTMLElement>(`[name="${first}"]`)?.focus());
      return false;
    }
    return true;
  };

  const canNext = step === 1 ? (path === "mu" ? sel.length > 0 : !!cat) : true;
  const next = () => {
    if (step === 1 && !canNext) return;
    if (step === 2 && !validate()) return;
    go(step + 1);
  };

  /* ---------------- order summary ---------------- */
  const Summary = (
    <div className="overflow-hidden rounded-[26px] bg-white ring-1 ring-line shadow-[0_30px_60px_-45px_rgba(20,45,70,.55)]">
      <div className="bg-navy-deep px-6 py-4 text-white">
        <div className="font-cond text-[12px] uppercase tracking-[0.22em] text-gold">Your registration</div>
        <div className="mt-1 font-display text-[18px] font-medium">{order?.name ?? "Nothing selected yet"}</div>
      </div>
      <div className="px-6 py-5">
        {order ? (
          <>
            <ul className="space-y-3">
              {order.lines.map((l) => (
                <li key={l.label} className="flex items-start justify-between gap-3 text-[14.5px]">
                  <span><span className="font-medium text-navy">{l.label}</span><span className="block text-[12.5px] text-muted">{l.sub}</span></span>
                  <span className="shrink-0 font-medium text-navy">{l.amount}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
              <span className="text-[14px] text-muted">Total</span>
              <span className="text-right"><span className="block font-display text-[26px] font-semibold leading-none text-navy">{order.total}</span>{order.alt && <span className="mt-1 block text-[12.5px] text-muted">{order.alt}</span>}</span>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-aqua px-3.5 py-2.5 text-[13.5px] text-teal"><Award className="h-4 w-4" /> {order.cpd} CPD points</div>
          </>
        ) : (
          <p className="text-[14.5px] text-muted">Choose how you&apos;re joining us and your package will appear here.</p>
        )}
        {step > 0 && (
          <div className="mt-5 hidden lg:block">
            {step < 3 ? (
              <button type="button" onClick={next} disabled={!canNext} className="btn btn-teal w-full justify-center disabled:cursor-not-allowed disabled:opacity-40">{step === 2 ? "Review registration" : "Continue"} <ArrowRight className="h-4 w-4" /></button>
            ) : (
              <button type="button" onClick={() => setPayOpen(true)} className="btn btn-red w-full justify-center"><Lock className="h-4 w-4" /> Pay {order?.total}</button>
            )}
          </div>
        )}
        <div className="mt-5 space-y-2 text-[12.5px] text-muted">
          <p className="flex items-center gap-2"><Lock className="h-3.5 w-3.5" /> Secure online card payment</p>
          <p className="flex items-center gap-2"><Info className="h-3.5 w-3.5" /> Registration is non-refundable and non-transferable</p>
        </div>
      </div>
    </div>
  );

  /* ---------------- steps ---------------- */
  const step0 = (
    <div>
      <h2 className="text-[clamp(1.45rem,2.3vw,1.9rem)] font-light text-navy">Where will you be joining us from?</h2>
      <p className="mt-1.5 text-[15px] text-muted">Fees and options depend on where you live.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {[
          { p: "mu" as const, icon: Home, flag: "🇲🇺", t: "Mauritian resident", d: "Register for one, two or all three days. Pay per day.", price: `MUR ${fmt(localDayFee)}`, per: "per day · 4 CPD points" },
          { p: "intl" as const, icon: Globe2, flag: "🌍", t: "International delegate", d: "Full three-day pass including workshops and main congress.", price: `from USD ${Math.min(...intlCategories.map((c) => (early ? c.early.usd : c.normal.usd)))}`, per: early ? "early-bird rate" : "3-day pass" },
        ].map((o) => (
          <button
            key={o.p}
            type="button"
            onClick={() => choosePath(o.p)}
            className={clsx("group relative flex flex-col overflow-hidden rounded-[24px] p-6 text-left ring-1 transition hover:-translate-y-1", path === o.p ? "bg-aqua ring-2 ring-teal" : "bg-white ring-line hover:shadow-[0_30px_60px_-40px_rgba(20,45,70,.6)] hover:ring-teal/50")}
          >
            <span className="text-[34px] leading-none" aria-hidden>{o.flag}</span>
            <span className="mt-4 font-display text-[22px] font-semibold text-navy">{o.t}</span>
            <span className="mt-2 text-[15px] leading-relaxed text-muted">{o.d}</span>
            <span className="mt-5 flex items-end justify-between border-t border-line pt-4">
              <span><span className="block font-display text-[24px] font-semibold text-navy">{o.price}</span><span className="text-[13px] text-muted">{o.per}</span></span>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-navy text-white transition group-hover:bg-teal"><ArrowRight className="h-5 w-5" /></span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  const stepMu = (
    <div>
      <h2 className="text-[clamp(1.45rem,2.3vw,1.9rem)] font-light text-navy">Choose the days you&apos;d like to attend</h2>
      <p className="mt-1.5 text-[15px] text-muted">We&apos;d love to welcome you for all three days. Each day is MUR {fmt(localDayFee)} and earns {localCpdPerDay} CPD points.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {[["All 3 days", ["fri", "sat", "sun"]], ["Congress only (Sat + Sun)", ["sat", "sun"]], ["Workshops only (Fri)", ["fri"]]].map(([l, v]) => (
          <button key={l as string} type="button" onClick={() => setSel(v as DayId[])} className={clsx("rounded-full px-4 py-2 text-[14px] font-medium ring-1 transition", key === (v as string[]).join(",") ? "bg-navy text-white ring-navy" : "text-navy ring-line hover:bg-mist")}>{l as string}</button>
        ))}
        {sel.length > 0 && <button type="button" onClick={() => setSel([])} className="rounded-full px-4 py-2 text-[14px] text-muted hover:text-navy">Clear</button>}
      </div>
      <div className="mt-4 grid gap-2.5">
        {days.map((d) => {
          const on = sel.includes(d.id);
          return (
            <button
              key={d.id}
              type="button"
              role="checkbox"
              aria-checked={on}
              onClick={() => toggleDay(d.id)}
              className={clsx("group grid grid-cols-[auto_1fr] items-start gap-4 rounded-[20px] p-4 text-left ring-1 transition sm:grid-cols-[auto_1fr_auto] sm:items-center sm:px-5 sm:py-4", on ? "bg-aqua ring-2 ring-teal" : "bg-white ring-line hover:ring-teal/50")}
            >
              <span className={clsx("mt-1 grid h-7 w-7 place-items-center rounded-lg transition sm:mt-0", on ? "bg-teal text-white" : "bg-white ring-2 ring-line group-hover:ring-teal/60")}>{on && <Check className="h-4 w-4" strokeWidth={3} />}</span>
              <span className="min-w-0">
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-[18px] font-semibold text-navy">{d.weekday} {d.date.replace(" 2027", "")}</span>
                  <span className="rounded-full bg-white px-2.5 py-0.5 font-cond text-[11.5px] uppercase tracking-[0.12em] text-teal ring-1 ring-line">{d.label}</span>
                </span>
                <span className="mt-1 block text-[14px] leading-snug text-muted">{d.summary}</span>
                <span className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-navy"><MapPin className="h-3.5 w-3.5 text-teal" />{d.venue}</span>
              </span>
              <span className="col-start-2 flex items-baseline gap-3 sm:col-start-3 sm:flex-col sm:items-end sm:gap-0.5">
                <span className="font-display text-[19px] font-semibold text-navy">MUR {fmt(localDayFee)}</span>
                <span className="text-[13px] text-muted">{d.cpd} CPD points</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );

  const stepIntl = (
    <div>
      <h2 className="text-[clamp(1.45rem,2.3vw,1.9rem)] font-light text-navy">Welcome, international delegates</h2>
      <p className="mt-1.5 text-[15px] text-muted">Choose the category that applies to you. Every pass covers all three days: the pre-congress workshops on 7 May and the main congress on 8–9 May.</p>
      {early && (
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl bg-gold-soft px-4 py-2.5 text-[14px] text-[#6b5418]">
          <Hourglass className="h-5 w-5 shrink-0" />
          <span><b className="font-semibold">Early-bird rates until {earlyBirdLabel}.</b> Places are limited.</span>
          {daysLeft !== null && <span className="ml-auto rounded-full bg-white px-3 py-1 font-semibold text-navy">{daysLeft} days left</span>}
        </div>
      )}
      <div className="mt-3 grid gap-2.5">
        {intlCategories.map((c) => {
          const on = cat === c.id;
          const p = early ? c.early : c.normal;
          return (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setCat(c.id)}
              className={clsx("group grid grid-cols-[auto_1fr] items-start gap-4 rounded-[20px] p-4 text-left ring-1 transition sm:grid-cols-[auto_1fr_auto] sm:items-center sm:px-5 sm:py-4", on ? "bg-aqua ring-2 ring-teal" : "bg-white ring-line hover:ring-teal/50")}
            >
              <span className={clsx("mt-1 grid h-7 w-7 place-items-center rounded-full transition sm:mt-0", on ? "bg-teal" : "ring-2 ring-line group-hover:ring-teal/60")}>{on && <span className="h-2.5 w-2.5 rounded-full bg-white" />}</span>
              <span className="min-w-0">
                <span className="block font-display text-[18px] font-semibold text-navy">{c.title}</span>
                <span className="mt-0.5 block text-[14px] leading-snug text-muted">
                  {c.copy}
                  {c.joinLink && <> Not a member yet? <a href={c.joinLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="font-medium text-teal underline underline-offset-2">Join PAFLAR</a>.</>}
                </span>
              </span>
              <span className="col-start-2 sm:col-start-3 sm:text-right">
                <span className="flex items-baseline gap-2 sm:justify-end">
                  <span className="font-display text-[24px] font-semibold text-navy">USD {p.usd}</span>
                  {early && <span className="text-[14px] text-muted line-through">USD {c.normal.usd}</span>}
                </span>
                <span className="block text-[13px] text-muted">MUR {fmt(p.mur)}{early ? " · early bird" : ""}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 grid gap-1.5 rounded-2xl bg-mist px-5 py-3.5 text-[13.5px] text-ink/75 sm:grid-cols-2">
        <span className="flex items-center gap-2"><Check className="h-4 w-4 text-teal" /> Pre-congress workshops (7 May)</span>
        <span className="flex items-center gap-2"><Check className="h-4 w-4 text-teal" /> Main congress sessions (8–9 May)</span>
        <span className="flex items-center gap-2"><Check className="h-4 w-4 text-teal" /> 12 CPD points</span>
        <span className="flex items-center gap-2"><Check className="h-4 w-4 text-teal" /> Normal rate from 1 February 2027: USD 350–400</span>
      </div>
    </div>
  );

  const stepDetails = (
    <div>
      <h2 className="text-[clamp(1.45rem,2.3vw,1.9rem)] font-light text-navy">Your details</h2>
      <p className="mt-1.5 text-[15px] text-muted">These appear on your receipt, badge and certificate. Fields marked <span className="text-crimson">*</span> are required.</p>

      <fieldset className="mt-8">
        <legend className="font-cond text-[13px] uppercase tracking-[0.2em] text-teal">Personal</legend>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="First name" req error={errors.first}><input name="first" autoComplete="given-name" className={inputCls(errors.first)} value={form.first} onChange={(e) => set("first", e.target.value)} /></Field>
          <Field label="Last name" req error={errors.last}><input name="last" autoComplete="family-name" className={inputCls(errors.last)} value={form.last} onChange={(e) => set("last", e.target.value)} /></Field>
          <Field label="Email address" req error={errors.email} hint="Your confirmation and receipt are sent here."><input name="email" type="email" autoComplete="email" className={inputCls(errors.email)} value={form.email} onChange={(e) => set("email", e.target.value)} /></Field>
          <Field label="Phone" req error={errors.phone} hint="Include your country code."><input name="phone" type="tel" autoComplete="tel" placeholder={path === "mu" ? "+230 5xxx xxxx" : "+27 82 xxx xxxx"} className={inputCls(errors.phone)} value={form.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="font-cond text-[13px] uppercase tracking-[0.2em] text-teal">Professional</legend>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label={path === "mu" ? "Medical Council registration number" : "Medical / professional registration number"} req error={errors.mcr}>
            <input name="mcr" className={inputCls(errors.mcr)} value={form.mcr} onChange={(e) => set("mcr", e.target.value)} />
          </Field>
          {path === "mu" ? (
            <Field label="Workplace">
              <select name="workplace" className={inputCls()} value={form.workplace} onChange={(e) => set("workplace", e.target.value)}>
                <option value="">Select your workplace</option>
                {mauritiusWorkplaces.map((w) => <option key={w}>{w}</option>)}
              </select>
            </Field>
          ) : (
            <Field label="Institution / workplace"><input name="workplace" className={inputCls()} value={form.workplace} onChange={(e) => set("workplace", e.target.value)} /></Field>
          )}
          {path === "mu" && form.workplace === "Other" && (
            <Field label="Please specify your workplace" req error={errors.workplaceOther} className="sm:col-span-2"><input name="workplaceOther" className={inputCls(errors.workplaceOther)} value={form.workplaceOther} onChange={(e) => set("workplaceOther", e.target.value)} /></Field>
          )}
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="font-cond text-[13px] uppercase tracking-[0.2em] text-teal">Billing address</legend>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Country / region" req error={errors.country}>
            <select name="country" autoComplete="country-name" className={inputCls(errors.country)} value={form.country} onChange={(e) => set("country", e.target.value)}>
              <option value="">Select country</option>
              {countries.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Town / city" req error={errors.city}><input name="city" autoComplete="address-level2" className={inputCls(errors.city)} value={form.city} onChange={(e) => set("city", e.target.value)} /></Field>
          <Field label="Street address" req error={errors.street}><input name="street" autoComplete="address-line1" placeholder="House number and street name" className={inputCls(errors.street)} value={form.street} onChange={(e) => set("street", e.target.value)} /></Field>
          <Field label="Apartment, suite, unit (optional)"><input name="street2" autoComplete="address-line2" className={inputCls()} value={form.street2} onChange={(e) => set("street2", e.target.value)} /></Field>
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="flex items-center gap-2 font-cond text-[13px] uppercase tracking-[0.2em] text-teal"><Utensils className="h-4 w-4" /> Dietary requirements</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {dietaryOptions.map((d) => {
            const on = form.diet.includes(d);
            return (
              <button key={d} type="button" aria-pressed={on} onClick={() => set("diet", d === "None" ? (on ? [] : ["None"]) : on ? form.diet.filter((x) => x !== d) : [...form.diet.filter((x) => x !== "None"), d])} className={clsx("rounded-full px-4 py-2 text-[14px] ring-1 transition", on ? "bg-teal text-white ring-teal" : "bg-white text-navy ring-line hover:bg-mist")}>
                {on && <Check className="-ml-1 mr-1 inline h-3.5 w-3.5" />}{d}
              </button>
            );
          })}
        </div>
        {form.diet.includes("Other") && <input name="dietOther" placeholder="Please describe" className={clsx(inputCls(), "mt-3 sm:max-w-md")} value={form.dietOther} onChange={(e) => set("dietOther", e.target.value)} />}
      </fieldset>

      <fieldset className="mt-8 rounded-[22px] bg-mist p-5 sm:p-6">
        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" className="mt-1 h-5 w-5 accent-[#087f83]" checked={form.hotel} onChange={(e) => set("hotel", e.target.checked)} />
          <span><span className="flex items-center gap-2 font-medium text-navy"><BedDouble className="h-4 w-4 text-teal" /> I&apos;m interested in booking a room during the congress</span><span className="mt-0.5 block text-[13.5px] text-muted">We&apos;ll pass your dates to the hotel team. This is not a booking.</span></span>
        </label>
        <AnimatePresence initial={false}>
          {form.hotel && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="grid gap-4 pt-5 sm:grid-cols-2">
                <Field label="Check-in"><input type="date" name="checkIn" min="2027-04-30" max="2027-05-20" className={inputCls()} value={form.checkIn} onChange={(e) => set("checkIn", e.target.value)} /></Field>
                <Field label="Check-out" error={errors.checkOut}><input type="date" name="checkOut" min="2027-05-01" max="2027-05-25" className={inputCls(errors.checkOut)} value={form.checkOut} onChange={(e) => set("checkOut", e.target.value)} /></Field>
                <Field label="Anything the hotel should know?" className="sm:col-span-2"><textarea name="hotelNote" rows={3} className={clsx(inputCls(), "h-auto py-3")} value={form.hotelNote} onChange={(e) => set("hotelNote", e.target.value)} /></Field>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </fieldset>

      <label className={clsx("mt-8 flex cursor-pointer items-start gap-3 rounded-2xl p-4 ring-1", errors.terms ? "ring-crimson" : "ring-line")}>
        <input type="checkbox" name="terms" className="mt-1 h-5 w-5 accent-[#087f83]" checked={form.terms} onChange={(e) => set("terms", e.target.checked)} />
        <span className="text-[14.5px] text-ink/80">{registrationTerms} <span className="text-crimson">*</span>{errors.terms && <span className="mt-1 block text-[13px] text-crimson">{errors.terms}</span>}</span>
      </label>
    </div>
  );

  const Edit = ({ to }: { to: number }) => (
    <button type="button" onClick={() => go(to)} className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-teal hover:underline"><Pencil className="h-3.5 w-3.5" /> Edit</button>
  );
  const stepReview = (
    <div>
      <h2 className="text-[clamp(1.45rem,2.3vw,1.9rem)] font-light text-navy">Review and pay</h2>
      <p className="mt-1.5 text-[15px] text-muted">Check your details, then continue to secure payment.</p>
      <div className="mt-8 space-y-4">
        <div className="rounded-[22px] bg-white p-6 ring-1 ring-line">
          <div className="flex items-center justify-between"><span className="font-cond text-[13px] uppercase tracking-[0.2em] text-teal">Registration</span><Edit to={1} /></div>
          <div className="mt-2 font-display text-[19px] font-semibold text-navy">{order?.name}</div>
          <div className="mt-1 text-[14.5px] text-muted">{path === "mu" ? "Mauritian resident" : "International delegate"} · {order?.cpd} CPD points</div>
        </div>
        <div className="rounded-[22px] bg-white p-6 ring-1 ring-line">
          <div className="flex items-center justify-between"><span className="font-cond text-[13px] uppercase tracking-[0.2em] text-teal">Delegate</span><Edit to={2} /></div>
          <dl className="mt-3 grid gap-x-6 gap-y-3 text-[14.5px] sm:grid-cols-2">
            {[
              ["Name", `${form.first} ${form.last}`],
              ["Email", form.email],
              ["Phone", form.phone],
              ["Registration no.", form.mcr],
              ["Workplace", form.workplace === "Other" ? form.workplaceOther : form.workplace || "—"],
              ["Address", [form.street, form.street2, form.city, form.country].filter(Boolean).join(", ")],
              ["Dietary", form.diet.length ? form.diet.map((d) => (d === "Other" && form.dietOther ? form.dietOther : d)).join(", ") : "—"],
              ["Hotel interest", form.hotel ? `${form.checkIn} → ${form.checkOut}` : "No"],
            ].map(([k, v]) => (
              <div key={k}><dt className="text-[12.5px] uppercase tracking-[0.08em] text-muted">{k}</dt><dd className="mt-0.5 break-words font-medium text-navy">{v}</dd></div>
            ))}
          </dl>
        </div>
        <div className="rounded-[22px] bg-white p-6 ring-1 ring-line">
          <span className="font-cond text-[13px] uppercase tracking-[0.2em] text-teal">Payment method</span>
          <div className="mt-3 flex items-center gap-4 rounded-2xl border-2 border-teal bg-aqua p-4">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-white text-teal ring-1 ring-line"><CreditCard className="h-5 w-5" /></span>
            <span className="min-w-0 flex-1"><span className="block font-medium text-navy">Secure card payment</span><span className="text-[13px] text-muted">Visa, Mastercard and local payment options</span></span>
            <span className="rounded-full bg-gold-soft px-3 py-1 text-[12px] font-semibold text-[#6b5418]">Connecting soon</span>
          </div>
        </div>
      </div>
    </div>
  );

  const body = step === 0 ? step0 : step === 1 ? (path === "intl" ? stepIntl : stepMu) : step === 2 ? stepDetails : stepReview;

  return (
    <div ref={top} className="scroll-mt-[150px] lg:scroll-mt-[175px]">
      <Stepper step={step} labels={labels} onJump={go} />
      <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_360px] lg:gap-10">
        <div className="min-w-0">
          <AnimatePresence mode="wait">
            <motion.div key={`${step}-${path}`} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}>
              {body}
            </motion.div>
          </AnimatePresence>

          {step > 0 && (
            <div className="sticky bottom-0 z-10 mt-6 hidden items-center justify-between gap-4 border-t border-line bg-white/95 py-4 backdrop-blur lg:flex">
              <button type="button" onClick={() => go(step - 1)} className="inline-flex items-center gap-2 text-[15px] font-medium text-navy hover:text-teal"><ArrowLeft className="h-4 w-4" /> Back</button>
              {step < 3 ? (
                <button type="button" onClick={next} disabled={!canNext} className="btn btn-teal disabled:cursor-not-allowed disabled:opacity-40">Continue <ArrowRight className="h-4 w-4" /></button>
              ) : (
                <button type="button" onClick={() => setPayOpen(true)} className="btn btn-red"><Lock className="h-4 w-4" /> Pay {order?.total}</button>
              )}
            </div>
          )}
        </div>
        <aside className="hidden lg:block"><div className="sticky top-[100px]">{Summary}</div></aside>
      </div>

      {/* Mobile summary + sticky action bar */}
      {step > 0 && (
        <>
          <div className="mt-8 lg:hidden">{Summary}</div>
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 py-3 shadow-[0_-12px_30px_-20px_rgba(20,45,70,.5)] backdrop-blur lg:hidden">
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => go(step - 1)} aria-label="Back" className="grid h-12 w-12 shrink-0 place-items-center rounded-full ring-1 ring-line"><ArrowLeft className="h-5 w-5 text-navy" /></button>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[12px] text-muted">{order?.name ?? "Make a selection"}</div>
                <div className="font-display text-[18px] font-semibold text-navy">{order?.total ?? "—"}</div>
              </div>
              {step < 3 ? (
                <button type="button" onClick={next} disabled={!canNext} className="btn btn-teal !px-5 !py-3 disabled:opacity-40">Continue</button>
              ) : (
                <button type="button" onClick={() => setPayOpen(true)} className="btn btn-red !px-5 !py-3"><Lock className="h-4 w-4" /> Pay</button>
              )}
            </div>
          </div>
          <div className="h-20 lg:hidden" />
        </>
      )}

      {/* Payment placeholder */}
      <AnimatePresence>
        {payOpen && (
          <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-navy-deep/70 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPayOpen(false)}>
            <motion.div role="dialog" aria-modal="true" aria-labelledby="pay-title" onClick={(e) => e.stopPropagation()} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="relative w-full max-w-lg overflow-hidden rounded-[28px] bg-white">
              <button onClick={() => setPayOpen(false)} aria-label="Close" className="absolute right-4 top-4 rounded-full p-2 text-muted hover:bg-mist"><X className="h-5 w-5" /></button>
              <div className="bg-gradient-to-br from-teal to-navy px-8 pb-8 pt-10 text-white">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15"><ShieldCheck className="h-7 w-7" /></span>
                <h3 id="pay-title" className="mt-5 font-display text-[24px] font-medium">Secure payment is being connected</h3>
                <p className="mt-2 text-white/80">Online card payment for PAFLAR 2027 will be switched on shortly.</p>
              </div>
              <div className="px-8 py-7">
                <div className="flex items-start gap-3 rounded-2xl bg-gold-soft px-4 py-3.5 text-[14px] text-[#6b5418]"><Clock className="mt-0.5 h-4 w-4 shrink-0" /> Your registration has not been submitted yet and no payment has been taken.</div>
                <dl className="mt-5 space-y-2 text-[14.5px]">
                  <div className="flex justify-between"><dt className="text-muted">Package</dt><dd className="font-medium text-navy">{order?.name}</dd></div>
                  <div className="flex justify-between"><dt className="text-muted">Delegate</dt><dd className="font-medium text-navy">{form.first} {form.last}</dd></div>
                  <div className="flex justify-between border-t border-line pt-2"><dt className="text-muted">Total</dt><dd className="font-display text-[18px] font-semibold text-navy">{order?.total}</dd></div>
                </dl>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button onClick={() => setPayOpen(false)} className="btn btn-outline flex-1 justify-center">Back to review</button>
                  <a href={`mailto:${SECRETARIAT}?subject=${encodeURIComponent("PAFLAR 2027 registration – " + (order?.name ?? ""))}&body=${encodeURIComponent(`Name: ${form.first} ${form.last}\nEmail: ${form.email}\nPhone: ${form.phone}\nPackage: ${order?.name}\nTotal: ${order?.total}`)}`} className="btn btn-teal flex-1 justify-center"><Mail className="h-4 w-4" /> Email the Secretariat</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function EarlyBirdBadge() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => setLeft(Math.ceil((new Date(earlyBirdEnds).getTime() - Date.now()) / 86400000)), []);
  if (left === null || left <= 0) return null;
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-1.5 font-cond text-[13px] uppercase tracking-[0.14em] text-navy-deep">
      <Sparkles className="h-4 w-4" /> Early bird · {left} days left
    </span>
  );
}

