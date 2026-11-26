import type { Abstract, AuditEntry, Automation, Category, DayKey, Message, Registration, Settings } from "./types";

/* Deterministic PRNG so the demo data is the same on every load. */
function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const r = rng(2027);
const pick = <T,>(a: readonly T[]) => a[Math.floor(r() * a.length)];
const chance = (p: number) => r() < p;

export const USD_RATE = 48; // MUR per USD (indicative)
export const DAY_LABEL: Record<DayKey, string> = { fri: "Fri 7 May", sat: "Sat 8 May", sun: "Sun 9 May" };
export const DAY_LONG: Record<DayKey, string> = {
  fri: "Friday 7 May · Pre-congress workshops · Artemis Cascavelle Hospital",
  sat: "Saturday 8 May · Main congress, day 1 · Hilton Mauritius Resort & Spa",
  sun: "Sunday 9 May · Main congress, day 2 · Hilton Mauritius Resort & Spa",
};
export const NOW = new Date("2026-11-26T18:30:00+04:00");

export const FLAGS: Record<string, string> = {
  Mauritius: "🇲🇺", "South Africa": "🇿🇦", Kenya: "🇰🇪", Nigeria: "🇳🇬", Egypt: "🇪🇬", Ghana: "🇬🇭", Uganda: "🇺🇬",
  Tanzania: "🇹🇿", Madagascar: "🇲🇬", "Réunion (France)": "🇷🇪", India: "🇮🇳", "United Kingdom": "🇬🇧", Zambia: "🇿🇲",
  Ethiopia: "🇪🇹", Cameroon: "🇨🇲", Senegal: "🇸🇳", Rwanda: "🇷🇼", Morocco: "🇲🇦", Seychelles: "🇸🇨", France: "🇫🇷",
};
export const flag = (c: string) => FLAGS[c] ?? "🌍";

const intlCountries = [
  ["South Africa", "Johannesburg"], ["South Africa", "Cape Town"], ["Kenya", "Nairobi"], ["Nigeria", "Lagos"], ["Nigeria", "Abuja"],
  ["Egypt", "Cairo"], ["Ghana", "Accra"], ["Uganda", "Kampala"], ["Tanzania", "Dar es Salaam"], ["Madagascar", "Antananarivo"],
  ["Réunion (France)", "Saint-Denis"], ["India", "Chennai"], ["United Kingdom", "London"], ["Zambia", "Lusaka"], ["Ethiopia", "Addis Ababa"],
  ["Cameroon", "Yaoundé"], ["Senegal", "Dakar"], ["Rwanda", "Kigali"], ["Morocco", "Rabat"], ["Seychelles", "Victoria"], ["France", "Paris"],
] as const;
const muCities = ["Port Louis", "Curepipe", "Quatre Bornes", "Rose Hill", "Vacoas", "Flic-en-Flac", "Moka", "Pamplemousses", "Mahébourg", "Grand Baie"];
const muWorkplaces = ["Dr A.G. Jeetoo Hospital", "Sir Seewoosagur Ramgoolam National Hospital", "Victoria Hospital", "Flacq Hospital", "Jawaharlal Nehru Hospital", "Apollo Bramwell Hospital", "C-Care Darné", "Wellkin Hospital", "Artemis Cascavelle Hospital", "Private practice"];
const intlWorkplaces = ["University Teaching Hospital", "Children's Hospital", "National Referral Hospital", "Faculty of Medicine", "Regional Paediatric Centre", "Private practice"];
const specialities = ["Paediatric rheumatology", "Paediatrics", "Rheumatology", "General medicine", "Physiotherapy", "Nursing", "Pharmacy", "Radiology", "Orthopaedics", "Family medicine"];
const firsts = ["Amara", "Kwame", "Fatima", "Thandiwe", "Neha", "Rohan", "Aisha", "Joseph", "Grace", "Samuel", "Leïla", "Nadia", "Kevin", "Anjali", "Yusuf", "Chloé", "Brian", "Esther", "Daniel", "Priya", "Tariq", "Zanele", "Olivier", "Mariam", "Ibrahim", "Sophie", "Ravi", "Naledi", "David", "Shalini", "Moses", "Ama", "Hannah", "Arjun", "Mireille", "Peter", "Lerato", "Sanjay", "Ruth", "Emmanuel", "Kavya", "Jean", "Wanjiru", "Hassan", "Elodie", "Vikash", "Abena", "Nicolas", "Deepa", "Tendai"];
const lasts = ["Okafor", "Mensah", "Ramsamy", "Dlamini", "Boodhoo", "Mwangi", "Seebaluck", "Nkosi", "Appadoo", "Abdallah", "Kariuki", "Ramgoolam", "Adeyemi", "Moutou", "Naidoo", "Oduya", "Lallmahomed", "Achieng", "Rakotomalala", "Hossen", "Bekele", "Fofana", "Payet", "Gunness", "Musa", "Ndlovu", "Jugnauth", "Banda", "Hoareau", "Osei", "Pillay", "Kamau", "Beeharry", "Diallo", "Chung", "Sooben", "Mutua", "Toure", "Bissessur", "Asante"];
const sources = ["Website", "Website", "Website", "PAFLAR newsletter", "Email campaign", "Facebook", "WhatsApp group", "Colleague referral"];
const dietary = ["None", "None", "None", "None", "Vegetarian", "Vegetarian", "Halal", "Vegan", "Gluten-free"];

function iso(d: Date) { return d.toISOString(); }
function daysAgo(n: number, h = 10) { const d = new Date(NOW); d.setDate(d.getDate() - n); d.setHours(h, Math.floor(r() * 60)); return d; }

export const fees = { localDay: 4000, intl: 300, intlNormal: 400, member: 250, memberNormal: 350 };

export function priceFor(category: Category, days: DayKey[], early = true) {
  if (category === "Mauritian resident") return { amount: days.length * fees.localDay };
  const usd = category === "International delegate" ? (early ? fees.intl : fees.intlNormal) : (early ? fees.member : fees.memberNormal);
  return { amount: usd * USD_RATE, usd };
}

function makeReg(i: number): Registration {
  const mu = chance(0.56);
  const [country, city] = mu ? ["Mauritius", pick(muCities)] : pick(intlCountries);
  const first = pick(firsts), last = pick(lasts);
  const category: Category = mu ? "Mauritian resident" : (pick(["International delegate", "International delegate", "PAFLAR member", "Allied health professional"]) as Category);
  const days: DayKey[] = mu ? pick([["fri", "sat", "sun"], ["fri", "sat", "sun"], ["sat", "sun"], ["sat", "sun"], ["fri"], ["sat"]] as DayKey[][]) : ["fri", "sat", "sun"];
  const ago = Math.floor(Math.pow(r(), 1.6) * 54); // more recent registrations are more common
  const reg = daysAgo(ago, 8 + Math.floor(r() * 12));
  const roll = r();
  const status = roll < 0.8 ? "paid" : roll < 0.92 ? "pending" : roll < 0.97 ? "failed" : "refunded";
  const { amount, usd } = priceFor(category, days, true);
  const paidAt = status === "paid" || status === "refunded" ? iso(new Date(reg.getTime() + (3 + r() * 90) * 60000)) : undefined;
  const allied = category === "Allied health professional";
  return {
    id: `RSM27-${String(1001 + i)}`,
    title: allied ? pick(["Mr", "Ms", "Mrs"]) : "Dr",
    first, last,
    email: `${first}.${last}`.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "") + "@example.com",
    phone: mu ? `+230 5${Math.floor(100 + r() * 899)} ${Math.floor(1000 + r() * 8999)}` : `+${Math.floor(20 + r() * 230)} ${Math.floor(700 + r() * 299)} ${Math.floor(100000 + r() * 899999)}`,
    country, city, type: mu ? "mu" : "intl", category, days, amount, usd, earlyBird: true,
    status, method: "Card · SBM secure payment", txn: paidAt ? `SBM-${Math.floor(10000000 + r() * 89999999)}` : undefined, paidAt,
    registeredAt: iso(reg),
    workplace: mu ? pick(muWorkplaces) : `${pick(intlWorkplaces)}, ${city}`,
    mcr: mu ? `MCM-${Math.floor(10000 + r() * 89999)}` : "",
    speciality: allied ? pick(["Physiotherapy", "Nursing", "Pharmacy"]) : pick(specialities),
    dietary: pick(dietary), hotel: !mu && chance(0.7), source: pick(sources), attendance: {}, notes: "",
  };
}

export const DEMO_DELEGATE_ID = "RSM27-1000";

export function seedRegistrations(): Registration[] {
  const list = Array.from({ length: 186 }, (_, i) => makeReg(i));
  const demo: Registration = {
    id: DEMO_DELEGATE_ID, title: "Dr", first: "Amara", last: "Okafor", email: "amara.okafor@example.com", phone: "+234 803 555 0142",
    country: "Nigeria", city: "Lagos", type: "intl", category: "PAFLAR member", days: ["fri", "sat", "sun"], amount: 250 * USD_RATE, usd: 250,
    earlyBird: true, status: "paid", method: "Card · SBM secure payment", txn: "SBM-48291736", paidAt: iso(daysAgo(6, 11)), registeredAt: iso(daysAgo(6, 11)),
    workplace: "Lagos University Teaching Hospital", mcr: "MDCN-58213", speciality: "Paediatric rheumatology", dietary: "Halal",
    hotel: true, source: "PAFLAR newsletter", attendance: {}, notes: "Presenting a poster on JIA outcomes.",
  };
  return [demo, ...list].sort((a, b) => b.registeredAt.localeCompare(a.registeredAt));
}

const tracks = ["Original research", "Clinical case", "Quality improvement", "Medical education", "Allied health practice"];
const titles = [
  "Delayed diagnosis of juvenile idiopathic arthritis in sub-Saharan Africa: a multicentre audit",
  "Musculoskeletal ultrasound in the early assessment of childhood arthritis",
  "Childhood-onset lupus nephritis: outcomes at a tertiary centre in Nairobi",
  "pGALS screening by primary care nurses: a training evaluation",
  "Kawasaki disease presenting with arthritis: a case series",
  "Transition of adolescents with rheumatic disease to adult care in Mauritius",
  "Vitamin D status in children with JIA in an island population",
  "Methotrexate access and adherence in resource-limited settings",
  "Macrophage activation syndrome complicating systemic JIA: lessons from three cases",
  "Telemedicine follow-up for paediatric rheumatology during the rainy season",
  "Autoinflammatory fevers in North African children: a genetic registry",
  "Physiotherapy-led hydrotherapy programme for children with JIA",
  "Uveitis screening in JIA: are we meeting the guidelines?",
  "Parent-reported quality of life in childhood rheumatic disease",
  "Rheumatic fever and post-streptococcal arthritis: revisiting the burden",
  "Biologic therapy registry for paediatric rheumatology in Southern Africa",
];
const loremBody = "Background: Paediatric rheumatic diseases remain under-recognised across the region, and delays to specialist review are common. Objectives: We describe the presentation, time to diagnosis and early outcomes in a cohort of children referred to our service. Methods: Retrospective review of case notes over 36 months, with descriptive statistics and comparison against published benchmarks. Results: Median time from symptom onset to diagnosis was 9 months. Most children had been treated for infection or trauma before referral. Conclusions: Targeted education for primary care, simple screening tools and clear referral pathways could shorten the diagnostic journey.";

export function seedAbstracts(regs: Registration[]): Abstract[] {
  const doctors = regs.filter((x) => x.title === "Dr" && x.status === "paid").slice(0, 26);
  const statuses = ["Submitted", "Submitted", "Under review", "Under review", "Under review", "Accepted", "Accepted", "Revisions requested", "Rejected"] as const;
  const out: Abstract[] = doctors.map((d, i) => {
    const status = statuses[i % statuses.length];
    return {
      id: `ABS-${String(201 + i)}`, regId: d.id, author: `${d.title} ${d.first} ${d.last}`, coAuthors: `${pick(firsts)} ${pick(lasts)}, ${pick(firsts)} ${pick(lasts)}`,
      affiliation: d.workplace, country: d.country, title: titles[i % titles.length], track: tracks[i % tracks.length],
      presentation: pick(["Oral", "Poster", "Either"] as const), body: loremBody, status, submittedAt: iso(daysAgo(Math.floor(r() * 30), 9 + Math.floor(r() * 10))),
      score: status === "Submitted" ? undefined : Math.round((5 + r() * 5) * 10) / 10, reviewer: status === "Submitted" ? undefined : pick(["Scientific committee · Reviewer A", "Scientific committee · Reviewer B", "Scientific committee · Reviewer C"]),
    };
  });
  return out.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));
}

export function seedMessages(regs: Registration[]): Message[] {
  const out: Message[] = [];
  let n = 0;
  for (const x of regs.slice(0, 120)) {
    out.push({ id: `M${++n}`, regId: x.id, channel: "Email", template: "Registration received", to: x.email, at: x.registeredAt, status: chance(0.75) ? "Opened" : "Delivered" });
    if (x.paidAt && x.status === "paid") {
      out.push({ id: `M${++n}`, regId: x.id, channel: "Email", template: "Payment receipt + QR badge", to: x.email, at: x.paidAt, status: chance(0.7) ? "Opened" : "Delivered" });
      out.push({ id: `M${++n}`, regId: x.id, channel: "WhatsApp", template: "Registration confirmed", to: x.phone, at: x.paidAt, status: chance(0.8) ? "Read" : chance(0.9) ? "Delivered" : "Failed" });
    }
    if (x.status === "pending") out.push({ id: `M${++n}`, regId: x.id, channel: "Email", template: "Complete your payment", to: x.email, at: iso(new Date(new Date(x.registeredAt).getTime() + 86400000)), status: "Delivered" });
  }
  return out.sort((a, b) => b.at.localeCompare(a.at));
}

export function seedAudit(): AuditEntry[] {
  const acts: [string, string, string, string][] = [
    ["Dr S. Ramdhony", "Super admin", "Signed in (2FA verified)", "Admin console"],
    ["Finance office", "Finance", "Exported report", "Payments reconciliation.xlsx"],
    ["Dr S. Ramdhony", "Super admin", "Updated setting", "Early-bird deadline → 31 Jan 2027"],
    ["Scientific committee · Reviewer A", "Reviewer", "Scored abstract", "ABS-204 · 8.4"],
    ["Finance office", "Finance", "Marked payment as received (bank transfer)", "RSM27-1143"],
    ["System", "Automation", "Sent reminder batch", "Complete your payment · 14 recipients"],
    ["Secretariat", "Secretariat", "Edited registration", "RSM27-1088 · dietary → Vegetarian"],
    ["Secretariat", "Secretariat", "Resent confirmation email", "RSM27-1019"],
    ["System", "Security", "Blocked sign-in after 5 failed attempts", "unknown@mail.ru"],
    ["Dr S. Ramdhony", "Super admin", "Invited user", "Front desk volunteer (Check-in only)"],
  ];
  return acts.map((a, i) => ({ id: `A${i}`, at: iso(daysAgo(Math.floor(i / 2), 17 - i)), actor: a[0], role: a[1], action: a[2], target: a[3], ip: `197.224.${Math.floor(r() * 255)}.${Math.floor(r() * 255)}` }));
}

export function seedAutomations(): Automation[] {
  return [
    { id: "au1", name: "Registration received", trigger: "Immediately after the form is submitted", channels: ["Email"], enabled: true, sent: 187 },
    { id: "au2", name: "Payment receipt + QR badge", trigger: "Immediately after payment succeeds", channels: ["Email", "WhatsApp"], enabled: true, sent: 151 },
    { id: "au3", name: "Complete your payment", trigger: "24 hours after an unpaid registration", channels: ["Email", "WhatsApp"], enabled: true, sent: 22 },
    { id: "au4", name: "Abstract received", trigger: "When an abstract is submitted", channels: ["Email"], enabled: true, sent: 26 },
    { id: "au5", name: "Abstract decision", trigger: "When the committee records a decision", channels: ["Email"], enabled: true, sent: 9 },
    { id: "au6", name: "Early-bird closing soon", trigger: "7 days before 31 January 2027 · unregistered contacts", channels: ["Email"], enabled: true, sent: 0 },
    { id: "au7", name: "See you in Mauritius", trigger: "30 days before the congress", channels: ["Email"], enabled: true, sent: 0 },
    { id: "au8", name: "Event-day reminder with QR badge", trigger: "Evening before each day attended, 6 pm Mauritius time", channels: ["WhatsApp"], enabled: true, sent: 0 },
    { id: "au9", name: "Certificate available", trigger: "When a certificate is issued after attendance", channels: ["Email", "WhatsApp"], enabled: true, sent: 0 },
  ];
}

export const defaultSettings: Settings = {
  earlyBirdEnds: "2027-01-31", localDayFee: 4000, intlFee: 300, memberFee: 250,
  registrationOpen: true, abstractsOpen: true, abstractDeadline: "2027-02-28", certificateMinDays: 1,
};

/* Website analytics (last 30 days) */
export function seedTraffic() {
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(NOW); d.setDate(d.getDate() - (29 - i));
    const base = 180 + i * 7 + Math.round(r() * 90) + (d.getDay() === 0 || d.getDay() === 6 ? -40 : 0);
    return { date: d.toISOString().slice(0, 10), visitors: base, views: Math.round(base * (2.6 + r())) };
  });
  return {
    days,
    pages: [
      { page: "Home", path: "/", views: 6120 }, { page: "PAFLAR 2027 · Overview", path: "/paflar-2027", views: 4380 },
      { page: "Programme", path: "/paflar-2027/programme", views: 3210 }, { page: "Registration", path: "/paflar-2027/register", views: 2740 },
      { page: "Accommodation", path: "/paflar-2027/accommodation", views: 1460 }, { page: "Travel & logistics", path: "/paflar-2027/travel", views: 1020 },
      { page: "Sponsorship", path: "/paflar-2027/sponsorship", views: 640 }, { page: "Gallery", path: "/gallery", views: 590 },
    ],
    funnel: [
      { step: "Opened registration page", count: 1840 }, { step: "Chose participant type", count: 1120 },
      { step: "Selected days / category", count: 690 }, { step: "Filled in details", count: 312 }, { step: "Paid", count: 151 },
    ],
    sourcesTraffic: [
      { name: "Direct", value: 38 }, { name: "Google search", value: 27 }, { name: "PAFLAR / email", value: 18 }, { name: "Social media", value: 12 }, { name: "Other", value: 5 },
    ],
    live: [
      "Visitor from Kenya opened Programme", "Visitor from Mauritius started a registration", "Visitor from South Africa viewed Accommodation",
      "Visitor from Nigeria downloaded the sponsorship brochure", "Visitor from India opened PAFLAR 2027 · Overview", "Visitor from Réunion viewed Travel & logistics",
      "Visitor from Ghana chose International delegate", "Visitor from Egypt viewed Speakers",
    ],
  };
}
