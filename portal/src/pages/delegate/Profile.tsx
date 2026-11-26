import { useState } from "react";
import { Download, KeyRound, Laptop, Save, ShieldCheck, Smartphone } from "lucide-react";
import { useStore } from "../../data/store";
import { flag } from "../../data/seed";
import { downloadXlsx, regRow } from "../../lib";
import { SectionHead, Toggle } from "../../ui/ui";
import { useMe } from "./Layout";

const DIETS = ["None", "Vegetarian", "Vegan", "Halal", "Gluten-free", "Other"];

export default function DelegateProfile() {
  const me = useMe();
  const { updateReg, notify } = useStore();
  const [f, setF] = useState({ phone: me.phone, dietary: me.dietary, workplace: me.workplace });
  const [prefs, setPrefs] = useState({ email: true, whatsapp: true, twofa: false });
  const dirty = f.phone !== me.phone || f.dietary !== me.dietary || f.workplace !== me.workplace;
  return (
    <div className="space-y-6">
      <SectionHead title="Profile" sub="Keep your details up to date. Changes are visible to the Secretariat straight away." />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="card">
          <div className="border-b border-line px-6 py-4 font-semibold text-navy">Personal details</div>
          <div className="grid gap-5 p-6 sm:grid-cols-2">
            <div><label className="label">Full name</label><input className="input bg-mist" disabled value={`${me.title} ${me.first} ${me.last}`} /><p className="mt-1 text-[11.5px] text-muted">Printed on your badge and certificate. To correct it, contact the Secretariat.</p></div>
            <div><label className="label">Email</label><input className="input bg-mist" disabled value={me.email} /></div>
            <div><label className="label">Mobile (WhatsApp)</label><input className="input" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} /></div>
            <div><label className="label">Country</label><input className="input bg-mist" disabled value={`${flag(me.country)} ${me.country}`} /></div>
            <div className="sm:col-span-2"><label className="label">Workplace</label><input className="input" value={f.workplace} onChange={(e) => setF({ ...f, workplace: e.target.value })} /></div>
            <div><label className="label">Dietary requirements</label><select className="input" value={f.dietary} onChange={(e) => setF({ ...f, dietary: e.target.value })}>{DIETS.map((d) => <option key={d}>{d}</option>)}</select></div>
            <div><label className="label">Medical Council / licence no.</label><input className="input bg-mist" disabled value={me.mcr || "—"} /></div>
          </div>
          <div className="flex justify-end border-t border-line bg-mist/60 px-6 py-4">
            <button disabled={!dirty} onClick={() => { updateReg(me.id, f, "Participant updated own profile"); notify("Profile saved"); }} className="btn btn-primary"><Save className="h-4 w-4" /> Save changes</button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <div className="font-semibold text-navy">Notifications</div>
            <div className="mt-4 space-y-4">
              {([["email", "Email updates", "Receipts, reminders, decisions"], ["whatsapp", "WhatsApp reminders", "Badge and day-before reminders"]] as const).map(([k, t, s]) => (
                <div key={k} className="flex items-center justify-between gap-4"><div><div className="text-sm font-semibold text-navy">{t}</div><div className="text-xs text-muted">{s}</div></div><Toggle on={prefs[k]} onChange={() => setPrefs({ ...prefs, [k]: !prefs[k] })} label={t} /></div>
              ))}
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-2 font-semibold text-navy"><ShieldCheck className="h-4 w-4 text-teal" /> Security</div>
            <div className="mt-4 flex items-center justify-between gap-4"><div><div className="text-sm font-semibold text-navy">Two-step verification</div><div className="text-xs text-muted">Code by email at each sign-in</div></div><Toggle on={prefs.twofa} onChange={() => setPrefs({ ...prefs, twofa: !prefs.twofa })} label="Two-step verification" /></div>
            <button onClick={() => notify("Password reset link sent to your email")} className="btn btn-ghost btn-sm mt-5 w-full"><KeyRound className="h-3.5 w-3.5" /> Change password</button>
            <div className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted">Active sessions</div>
            <ul className="mt-2 space-y-2 text-[13px]">
              <li className="flex items-center gap-2"><Laptop className="h-4 w-4 text-teal" /> This browser · now</li>
              <li className="flex items-center gap-2"><Smartphone className="h-4 w-4 text-muted" /> iPhone · Lagos · 2 days ago</li>
            </ul>
          </div>
          <div className="card p-6 text-[13px] text-muted">
            <div className="font-semibold text-navy">Your data</div>
            <p className="mt-2">Download a copy of everything we hold about you, or ask us to delete it after the congress.</p>
            <button onClick={() => downloadXlsx(`my-data-${me.id}.xlsx`, { "My registration": [regRow(me)] })} className="btn btn-ghost btn-sm mt-4"><Download className="h-3.5 w-3.5" /> Download my data</button>
          </div>
        </div>
      </div>
    </div>
  );
}
