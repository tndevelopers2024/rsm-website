"use client";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const field = "w-full rounded-xl border border-line bg-white px-4 py-3.5 text-[15.5px] text-ink outline-none transition focus:border-teal focus:ring-4 focus:ring-teal/10";
const label = "mb-2 block font-cond text-[12.5px] uppercase tracking-[0.14em] text-navy";

export function ContactForm({ defaultType = "General enquiry", submitLabel = "Send enquiry" }: { defaultType?: string; submitLabel?: string }) {
  const [sent, setSent] = useState(false);
  const [type, setType] = useState(defaultType);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("type");
    if (q === "sponsorship") setType("PAFLAR 2027 sponsorship");
    if (q === "partnership") setType("Institutional partnership");
    if (q === "support") setType("Support our initiatives");
    if (q === "membership") setType("Membership");
  }, []);
  return (
    <form
      className="rounded-[28px] bg-mist p-8 md:p-12"
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: connect to the Society's form handler / email service (e.g. Resend, Formspree)
        setSent(true);
        (e.target as HTMLFormElement).reset();
      }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div><label className={label} htmlFor="n">Full name</label><input id="n" required className={field} placeholder="Dr. Jane Doe" /></div>
        <div><label className={label} htmlFor="o">Organisation</label><input id="o" className={field} placeholder="Hospital / institution" /></div>
        <div><label className={label} htmlFor="e">Email</label><input id="e" type="email" required className={field} placeholder="you@institution.org" /></div>
        <div>
          <label className={label} htmlFor="t">Enquiry type</label>
          <select id="t" className={field} value={type} onChange={(e) => setType(e.target.value)}>
            {["General enquiry", "Membership", "Education & CPD", "Institutional partnership", "PAFLAR 2027 sponsorship", "Support our initiatives", "Media"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="md:col-span-2"><label className={label} htmlFor="m">Message</label><textarea id="m" required rows={5} className={field} placeholder="How can we help?" /></div>
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-5">
        <button className="btn btn-red" type="submit">{submitLabel} <ArrowRight className="h-4 w-4" /></button>
        {sent && <p className="flex items-center gap-2 text-[15px] text-teal"><CheckCircle2 className="h-5 w-5" /> Thank you. Your enquiry has been received.</p>}
      </div>
    </form>
  );
}
