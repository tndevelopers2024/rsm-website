import * as XLSX from "xlsx";
import type { Registration } from "./data/types";
import { DAY_LABEL, USD_RATE } from "./data/seed";

export const mur = (n: number) => `MUR ${Math.round(n).toLocaleString("en-GB")}`;
export const usd = (n: number) => `USD ${Math.round(n).toLocaleString("en-GB")}`;
export const priceLabel = (r: Registration) => (r.usd ? `${usd(r.usd)} · ${mur(r.amount)}` : mur(r.amount));
export const toUsd = (m: number) => m / USD_RATE;
export const fmtDate = (s?: string) => (s ? new Date(s).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—");
export const fmtDateTime = (s?: string) => (s ? new Date(s).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—");
export const fmtTime = (s?: string) => (s ? new Date(s).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) : "—");
export const ago = (s: string) => {
  const m = Math.round((Date.now() - new Date(s).getTime()) / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} h ago`;
  const d = Math.round(h / 24);
  return d < 31 ? `${d} d ago` : fmtDate(s);
};
export const fullName = (r: Registration) => `${r.title} ${r.first} ${r.last}`;
export const initials = (r: { first: string; last: string }) => `${r.first[0]}${r.last[0]}`;
export const daysLabel = (r: Registration) => (r.days.length === 3 ? "All 3 days" : r.days.map((d) => DAY_LABEL[d]).join(" + "));
export const cpd = (r: Registration) => r.days.length * 4;

/* Signed-looking QR payload. In production this is an HMAC signed server-side. */
export const qrPayload = (r: Registration) => {
  let h = 0;
  for (const c of `${r.id}|${r.email}|paflar2027`) h = (Math.imul(31, h) + c.charCodeAt(0)) | 0;
  return `RSM27:${r.id}:${(h >>> 0).toString(36).toUpperCase()}`;
};

export function downloadXlsx(filename: string, sheets: Record<string, Record<string, unknown>[]>) {
  const wb = XLSX.utils.book_new();
  for (const [name, rows] of Object.entries(sheets)) {
    const ws = XLSX.utils.json_to_sheet(rows.length ? rows : [{ Note: "No rows" }]);
    const keys = Object.keys(rows[0] ?? { Note: "" });
    ws["!cols"] = keys.map((k) => ({ wch: Math.min(48, Math.max(k.length + 2, ...rows.slice(0, 200).map((r) => String(r[k] ?? "").length + 2))) }));
    XLSX.utils.book_append_sheet(wb, ws, name.slice(0, 31));
  }
  XLSX.writeFile(wb, filename);
}

export const regRow = (r: Registration) => ({
  "Registration ID": r.id, Title: r.title, "First name": r.first, "Last name": r.last, Email: r.email, Phone: r.phone,
  Country: r.country, City: r.city, "Participant type": r.type === "mu" ? "Mauritian resident" : "International", Category: r.category,
  Days: daysLabel(r), "Amount (MUR)": r.amount, "Amount (USD)": r.usd ?? "", Status: r.status, "Payment ref": r.txn ?? "",
  "Paid at": r.paidAt ? fmtDateTime(r.paidAt) : "", "Registered at": fmtDateTime(r.registeredAt), Workplace: r.workplace,
  "Medical Council no.": r.mcr, Speciality: r.speciality, Dietary: r.dietary, "Hotel room": r.hotel ? "Yes" : "No", Source: r.source,
  "Fri check-in": fmtTime(r.attendance.fri), "Sat check-in": fmtTime(r.attendance.sat), "Sun check-in": fmtTime(r.attendance.sun),
  "CPD points": cpd(r), Notes: r.notes,
});
