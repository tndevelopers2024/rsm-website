/* PAFLAR 2027 provisional programme and registration fees.
   Source: Paediatric Society (Mauritius) programme and registration pages, Nov 2026.
   Programme, speakers and timings may change as the scientific programme is finalised. */

export type Item =
  | { t: string; kind: "talk"; title: string; who?: string; tag?: string }
  | { t: string; kind: "admin"; title: string; who?: string }
  | { t: string; kind: "break" | "meal" | "social"; title: string };

export type Session = { n?: number; title?: string; items: Item[] };

export type Day = {
  id: "fri" | "sat" | "sun";
  weekday: string;
  date: string;
  short: string;
  label: string;
  venue: string;
  place: string;
  summary: string;
  cpd: number;
  sessions: Session[];
};

export const programmeNote = "Provisional programme. Speakers and timings may be updated as the scientific programme is finalised.";

export const days: Day[] = [
  {
    id: "fri",
    weekday: "Friday",
    date: "7 May 2027",
    short: "Fri 7",
    label: "Pre-congress workshops",
    venue: "Artemis Cascavelle Hospital",
    place: "Cascavelle",
    summary: "Hands-on workshops: pGALS, musculoskeletal ultrasound, imaging, patient education and laboratory testing.",
    cpd: 4,
    sessions: [
      {
        title: "Pre-congress workshops",
        items: [
          { t: "14:30", kind: "talk", tag: "Parallel workshop", title: "pGALS: The 3-Minute Joint Screen Every Paediatrician Can Use", who: "Facilitator to be confirmed" },
          { t: "14:30", kind: "talk", tag: "Parallel workshop", title: "Seeing the Joint: Hands-On Musculoskeletal Ultrasound", who: "Facilitator to be confirmed" },
          { t: "15:30", kind: "talk", title: "Reading the Bones: Imaging Clues in Childhood Rheumatic Disease", who: "Speaker to be confirmed" },
          { t: "16:30", kind: "break", title: "Tea break" },
          { t: "17:00", kind: "talk", title: "Beyond the Prescription: Educating Children and Parents for Better Outcomes", who: "Facilitator to be confirmed" },
          { t: "18:00", kind: "talk", title: "ANA, RF and Beyond: Which Test, When, and What It Really Means", who: "Facilitator to be confirmed" },
          { t: "19:00", kind: "meal", title: "Symposium dinner" },
        ],
      },
    ],
  },
  {
    id: "sat",
    weekday: "Saturday",
    date: "8 May 2027",
    short: "Sat 8",
    label: "Main congress · Day 1",
    venue: "Hilton Mauritius Resort & Spa",
    place: "Flic-en-Flac",
    summary: "Frontiers in rheumatology, childhood lupus, juvenile idiopathic arthritis and African research priorities.",
    cpd: 4,
    sessions: [
      {
        items: [
          { t: "08:00", kind: "admin", title: "Registration" },
          { t: "08:30", kind: "admin", title: "Welcome remarks", who: "Presidents, Paediatric Society of Mauritius and Rheumatology Society of Mauritius" },
        ],
      },
      {
        n: 1,
        title: "Frontiers in Rheumatology",
        items: [
          { t: "09:00", kind: "talk", title: "CAR-T Cell Therapy: The New Frontier in Rheumatology", who: "Prof Gyorgy Nagy, Hungary" },
          { t: "09:20", kind: "talk", title: "Kawasaki Disease: Don't Miss the Fever That Damages the Heart", who: "Dr Kate Webb, South Africa" },
          { t: "09:40", kind: "talk", title: "The Gut Connection: Microbiome and Autoinflammation", who: "Prof Ulrich Meinzer, France" },
          { t: "10:00", kind: "admin", title: "Oral abstracts" },
          { t: "10:20", kind: "admin", title: "Q&A" },
          { t: "10:30", kind: "break", title: "Tea break and poster viewing" },
        ],
      },
      {
        n: 2,
        title: "Childhood Lupus",
        items: [
          { t: "11:00", kind: "talk", title: "The Great Mimicker: Diagnostic Pitfalls in Childhood Lupus", who: "Prof Isabelle Kone-Paut, France" },
          { t: "11:20", kind: "talk", title: "Protein in the Urine: A Practical Bedside Approach", who: "Dr Francis Furia, Tanzania" },
          { t: "11:40", kind: "talk", title: "Surviving Lupus in Africa: Real Barriers, Real Hope", who: "Dr Ayodele Faleye, Nigeria · Dr Ouma Devi Koussougbo, Mauritius" },
          { t: "12:00", kind: "talk", title: "Saving the Kidney: Managing Lupus Nephritis", who: "Prof Hermine Brunner, USA" },
          { t: "12:20", kind: "admin", title: "Q&A" },
          { t: "12:30", kind: "meal", title: "Lunch and satellite symposium" },
        ],
      },
      {
        n: 3,
        title: "Juvenile Idiopathic Arthritis",
        items: [
          { t: "13:30", kind: "talk", title: "The Child with a Swollen Joint: Is It JIA?", who: "Prof Pierre Quartier, France" },
          { t: "13:50", kind: "talk", title: "Treating JIA in 2027: Targets, Biologics and Beyond", who: "Prof Angelo Ravelli, Italy" },
          { t: "14:10", kind: "talk", title: "The Eye and the Joint: Uveitis and Other JIA Comorbidities", who: "Dr Rameez Hussain, Mauritius" },
          { t: "14:30", kind: "admin", title: "Oral abstracts" },
          { t: "14:50", kind: "admin", title: "Q&A" },
          { t: "15:00", kind: "break", title: "Tea break and poster viewing" },
        ],
      },
      {
        n: 4,
        title: "Made in Africa: Guidelines and a Research Agenda for Our Continent",
        items: [
          { t: "15:30", kind: "talk", title: "Guidelines and a Research Agenda for Our Continent", who: "Prof Wafa Hamdi, Tunisia" },
          { t: "15:50", kind: "talk", title: "Topic to be confirmed", who: "Dr Mohammed Hassan, Egypt" },
          { t: "16:10", kind: "talk", title: "Topic to be confirmed", who: "Further speaker to be announced" },
          { t: "16:30", kind: "talk", title: "Topic to be confirmed", who: "Further speaker to be announced" },
          { t: "16:50", kind: "admin", title: "Q&A" },
          { t: "17:00", kind: "social", title: "Group photograph" },
          { t: "19:00", kind: "meal", title: "Networking dinner" },
        ],
      },
    ],
  },
  {
    id: "sun",
    weekday: "Sunday",
    date: "9 May 2027",
    short: "Sun 9",
    label: "Main congress · Day 2",
    venue: "Hilton Mauritius Resort & Spa",
    place: "Flic-en-Flac",
    summary: "Clinical cases, autoinflammatory conditions, care across the lifespan and the future of paediatric rheumatology training.",
    cpd: 4,
    sessions: [
      { items: [{ t: "08:30", kind: "admin", title: "Registration" }] },
      {
        n: 5,
        title: "Clinical Cases",
        items: [
          { t: "09:00", kind: "talk", title: "Diagnostic Dilemmas: Challenging Cases in Paediatric Rheumatology", who: "Dr Raju Khubchandani, India" },
          { t: "09:20", kind: "talk", title: "Cracking the Case: A Practical Approach to Lupus", who: "Prof Amita Aggarwal, India" },
          { t: "09:40", kind: "talk", title: "The Skin Tells a Story: Cutaneous Clues in Rheumatic Disease", who: "Dr Kawthar Khodaboccus, Mauritius" },
          { t: "10:00", kind: "talk", title: "Infection or Inflammation? The Rheumatology–ID Crossover", who: "Dr Koggie Chinniah, South Africa" },
          { t: "10:20", kind: "admin", title: "Q&A" },
          { t: "10:30", kind: "break", title: "Tea break and poster viewing" },
        ],
      },
      {
        n: 6,
        title: "When It's More Than Arthritis",
        items: [
          { t: "11:00", kind: "talk", title: "The Child with Recurrent Fevers: Thinking Autoinflammation", who: "Prof Michael Hofer, Switzerland" },
          { t: "11:20", kind: "talk", title: "When It's Not Just Rheumatology: Immunodeficiency and FMF", who: "Dr Gail Faller, South Africa" },
          { t: "11:40", kind: "talk", title: "When Muscle Turns to Bone: Recognising FOP", who: "Prof Christiaan Scott, Canada" },
          { t: "12:00", kind: "admin", title: "Oral abstracts" },
          { t: "12:20", kind: "admin", title: "Q&A" },
          { t: "12:30", kind: "meal", title: "Lunch and satellite symposium" },
        ],
      },
      {
        n: 7,
        title: "Across the Lifespan",
        items: [
          { t: "13:30", kind: "talk", title: "From Paediatric to Adult Care: Getting Transition Right", who: "Prof Helen Foster, United Kingdom · Dr Johannes Roth, Switzerland" },
          { t: "13:50", kind: "talk", title: "Myositis Update: More Than Weak Muscles", who: "Dr Angela Migowa, Kenya" },
          { t: "14:10", kind: "talk", title: "Scleroderma in Children: Tightening Our Approach", who: "Prof Soad Hashad, Libya" },
          { t: "14:30", kind: "admin", title: "Oral abstracts" },
          { t: "14:50", kind: "admin", title: "Q&A" },
          { t: "15:00", kind: "break", title: "Tea break and poster viewing" },
        ],
      },
      {
        n: 8,
        title: "Research Agenda and Round Table",
        items: [
          { t: "15:30", kind: "talk", title: "Counting the Burden: Paediatric Rheumatic Disease Across Africa", who: "Dr Ihsane Hmamouchi, Morocco" },
          { t: "15:50", kind: "talk", tag: "Round table", title: "The Way Forward: Advocacy and the Future of Paediatric Rheumatology in Africa", who: "Panel to be announced" },
          { t: "16:10", kind: "talk", title: "Title to be confirmed", who: "Speaker to be confirmed" },
          { t: "16:30", kind: "admin", title: "Oral abstracts" },
          { t: "16:50", kind: "admin", title: "Q&A" },
          { t: "17:00", kind: "social", title: "PAFLAR elections, votes of thanks and closing" },
        ],
      },
    ],
  },
];

/* ---------- Speakers (derived from the programme) ---------- */
const flags: Record<string, string> = {
  Hungary: "🇭🇺", "South Africa": "🇿🇦", France: "🇫🇷", Tanzania: "🇹🇿", Nigeria: "🇳🇬", Mauritius: "🇲🇺", USA: "🇺🇸",
  Italy: "🇮🇹", Tunisia: "🇹🇳", Egypt: "🇪🇬", India: "🇮🇳", Switzerland: "🇨🇭", Canada: "🇨🇦", "United Kingdom": "🇬🇧",
  Kenya: "🇰🇪", Libya: "🇱🇾", Morocco: "🇲🇦",
};
export const flagOf = (country: string) => flags[country] ?? "🌍";

export type Speaker = { name: string; country: string; talks: { title: string; day: string; t: string }[] };

export const speakers: Speaker[] = (() => {
  const map = new Map<string, Speaker>();
  for (const d of days)
    for (const s of d.sessions)
      for (const it of s.items) {
        if (it.kind !== "talk" || !it.who) continue;
        for (const part of it.who.split(" · ")) {
          const m = part.match(/^((?:Prof|Dr)\s.+?),\s(.+)$/);
          if (!m) continue;
          const [, name, country] = m;
          const sp = map.get(name) ?? { name, country, talks: [] };
          sp.talks.push({ title: it.title, day: `${d.weekday} ${d.date}`, t: it.t });
          map.set(name, sp);
        }
      }
  return [...map.values()];
})();

export const speakerCountries = [...new Set(speakers.map((s) => s.country))];

/* ---------- Registration fees ---------- */
/** Early-bird rates apply to registrations made before this date (1 February 2027). */
export const earlyBirdEnds = "2027-02-01T00:00:00+04:00";
export const earlyBirdLabel = "31 January 2027";

export const localDayFee = 4000; // MUR per day, Mauritian residents
export const localCpdPerDay = 4;

export const localPackageNames: Record<string, string> = {
  fri: "Friday 7 May",
  sat: "Saturday 8 May",
  sun: "Sunday 9 May",
  "fri,sat": "Friday 7 & Saturday 8 May",
  "fri,sun": "Friday 7 & Sunday 9 May",
  "sat,sun": "Congress only (8–9 May)",
  "fri,sat,sun": "All 3 days",
};

export type IntlCategory = {
  id: "intl" | "member" | "allied";
  title: string;
  copy: string;
  early: { usd: number; mur: number };
  normal: { usd: number; mur: number };
  joinLink?: string;
};

export const intlCategories: IntlCategory[] = [
  {
    id: "intl",
    title: "International delegate",
    copy: "For doctors attending from outside Mauritius.",
    early: { usd: 300, mur: 14400 },
    normal: { usd: 400, mur: 19100 },
  },
  {
    id: "member",
    title: "PAFLAR member",
    copy: "Members of PAFLAR benefit from a reduced rate.",
    early: { usd: 250, mur: 12000 },
    normal: { usd: 350, mur: 16800 },
    joinLink: "https://mypaflar.org/",
  },
  {
    id: "allied",
    title: "Allied health professional",
    copy: "Nurses, physiotherapists, pharmacists and other non-medical healthcare professionals.",
    early: { usd: 250, mur: 12000 },
    normal: { usd: 350, mur: 16800 },
  },
];

export const mauritiusWorkplaces = [
  "Artemis Cascavelle Hospital", "Artemis Curepipe Hospital", "C-Care Darné", "C-Care Grand Baie", "Candos Hospital",
  "Clinique Bon Pasteur", "Flacq Hospital", "Jeetoo Hospital", "Private practice", "Rose Belle Hospital", "SSRN Hospital",
  "Wellkin Hospital", "Other",
];

export const dietaryOptions = ["None", "Vegetarian", "Vegan", "Halal", "Gluten free", "Other"];

export const registrationTerms =
  "I agree to the Payment Policy and the Terms and Conditions, and I understand that my registration is non-refundable, non-transferable and cannot be cancelled.";
