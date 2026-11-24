/**
 * All website copy lives here so the team can edit content without touching layout.
 * Source: RSM Website Development Brief (draft for review, 24 Nov 2026), the master
 * prompt, and the official PAFLAR congress pages (mypaflar.org).
 * Items marked `pending` are awaiting client confirmation and render with an "Awaiting" tag.
 */

export const site = {
  name: "Rheumatology Society, Mauritius",
  short: "RSM",
  established: "July 2015",
  domain: "rheumatologysociety.org",
  email: "info@rheumatologysociety.org", // proposed: confirm once mailboxes are live
  emailPending: true,
  tagline: "Advancing Rheumatology. Strengthening Care. Shaping the Future.",
};

export type NavChild = { label: string; href: string; desc: string; icon: string };
export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
  feature?: { image: "heroTeam" | "heroPanel" | "heroSea" | "heroJoint"; kicker: string; title: string; href: string; cta: string };
};

export const nav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Who We Are", href: "/about", desc: "Our purpose, vision and mission", icon: "Building2" },
      { label: "Our Journey", href: "/about#journey", desc: "Milestones since July 2015", icon: "Milestone" },
      { label: "Future Initiatives", href: "/about#initiatives", desc: "Registries, research & the Centre of Excellence", icon: "Sparkles" },
      { label: "Managing Committee", href: "/committee", desc: "The people leading the Society", icon: "Users" },
    ],
    feature: { image: "heroTeam", kicker: "Est. 2015 · Mauritius", title: "A decade of advancing rheumatology care", href: "/about", cta: "Discover the Society" },
  },
  {
    label: "Education",
    href: "/education",
    children: [
      { label: "Education & CPD", href: "/education", desc: "Quarterly CPD and the annual conference", icon: "GraduationCap" },
      { label: "Research & Publications", href: "/research", desc: "Priorities, guidelines and registries", icon: "Microscope" },
      { label: "Patient Awareness", href: "/awareness", desc: "Campaigns and patient advocacy", icon: "HeartHandshake" },
    ],
    feature: { image: "heroPanel", kicker: "Quarterly CPD", title: "Learning that keeps clinical practice current", href: "/education", cta: "View education" },
  },
  { label: "International", href: "/international" },
  {
    label: "PAFLAR 2027",
    href: "/paflar-2027",
    children: [
      { label: "Congress Overview", href: "/paflar-2027", desc: "Theme, organisers and venue", icon: "CalendarDays" },
      { label: "Programme", href: "/paflar-2027/programme", desc: "Workshop and scientific sessions", icon: "ListChecks" },
      { label: "Accommodation", href: "/paflar-2027/accommodation", desc: "Host venue and nearby hotels", icon: "Hotel" },
      { label: "Welcome to Mauritius", href: "/paflar-2027/mauritius", desc: "The island and things to explore", icon: "TreePalm" },
      { label: "Travel & Logistics", href: "/paflar-2027/travel", desc: "Airport, transfers, visas and weather", icon: "Plane" },
    ],
    feature: { image: "heroSea", kicker: "7–9 May 2027 · Flic-en-Flac", title: "7th PAFLAR Congress, Mauritius", href: "/paflar-2027", cta: "Explore the congress" },
  },
  { label: "News & Events", href: "/news" },
  { label: "Support Us", href: "/partnerships" },
];

export const about = {
  whoWeAre: [
    "Established in July 2015, the Rheumatology Society, Mauritius is a professional medical society dedicated to advancing rheumatology through medical education, scientific research, public awareness and professional collaboration.",
    "The Society works towards improving the understanding and management of rheumatic diseases by bringing together healthcare professionals, researchers and institutional partners, both locally and internationally.",
    "Through scientific conferences, continuing professional development programmes, awareness campaigns and international collaboration, the Society strives to contribute towards improved healthcare outcomes and the advancement of rheumatology in Mauritius and beyond.",
  ],
  vision:
    "To advance excellence in rheumatology through medical education, research, innovation, patient advocacy and international collaboration, with a long-term vision of establishing a Centre of Excellence in Rheumatology in Mauritius.",
  mission:
    "To support professional learning, promote research and awareness of rheumatic diseases, encourage patient advocacy and strengthen collaboration among healthcare professionals and institutions in Mauritius and internationally.",
  pillars: [
    { title: "Medical Education", text: "Scientific conferences and continuing professional development for healthcare professionals." },
    { title: "Scientific Research", text: "Encouraging rheumatology research and scientific collaboration." },
    { title: "Public Awareness", text: "Awareness campaigns that help the public recognise rheumatic diseases." },
    { title: "Professional Collaboration", text: "Bringing together professionals and institutions, locally and internationally." },
  ],
};

export type Milestone = {
  date: string;
  year: string;
  label: string;
  title: string;
  text: string;
  pending?: string;
  future?: boolean;
};

export const milestones: Milestone[] = [
  {
    date: "July 2015",
    year: "2015",
    label: "Founded",
    title: "Establishment of the Society",
    text: "The Rheumatology Society, Mauritius was established as a professional medical society dedicated to advancing rheumatology through education, research, awareness and collaboration.",
  },
  {
    date: "12 October · 2017 or 2018",
    year: "2017/18",
    label: "Awareness",
    title: "World Arthritis Day, Quatre Bornes",
    text: "A World Arthritis Day celebration at the Municipality of Quatre Bornes, with media coverage and support for a patient advocacy group.",
    pending: "Exact year to be confirmed",
  },
  {
    date: "September 2019",
    year: "2019",
    label: "Congress",
    title: "Organisation of the AFLAR Congress",
    text: "The Society organised the AFLAR Congress, an early landmark in its international engagement.",
  },
  {
    date: "2024",
    year: "2024",
    label: "Paediatrics",
    title: "Paediatric awareness campaign & annual conference",
    text: "A paediatric rheumatology awareness campaign held alongside the Society's annual conference.",
  },
  {
    date: "2026",
    year: "2026",
    label: "Science",
    title: "Annual scientific conference",
    text: "The Society's annual scientific conference, continuing its commitment to clinical education and scientific exchange.",
  },
  {
    date: "Ongoing",
    year: "CPD",
    label: "Education",
    title: "Quarterly continuing professional development",
    text: "Quarterly CPD activities that encourage continuing medical education and professional learning.",
  },
  {
    date: "7–9 May 2027",
    year: "2027",
    label: "Upcoming",
    title: "Hosting the 7th PAFLAR Congress",
    text: "The Society, with the Paediatric Society of Mauritius and in collaboration with PAFLAR, hosts the 7th PAFLAR Congress at the Hilton Mauritius Resort & Spa, Flic-en-Flac.",
    future: true,
  },
];

export const initiatives = [
  {
    key: "registries",
    title: "Disease registries",
    text: "Develop registries for rheumatological diseases to support better understanding of local disease patterns, subject to governance and data protection requirements.",
    image: "dna" as const,
  },
  {
    key: "research",
    title: "Scientific research",
    text: "Encourage rheumatology research and scientific collaboration.",
    image: "microscope" as const,
  },
  {
    key: "guidelines",
    title: "Local clinical guidelines",
    text: "Support development and publication of locally relevant clinical guidelines through the Society's medical leadership.",
    image: "doctorReading" as const,
  },
  {
    key: "awareness",
    title: "Awareness and advocacy",
    text: "Promote public awareness of rheumatic diseases and support patient advocacy initiatives.",
    image: "holdingHands" as const,
  },
  {
    key: "international",
    title: "International collaboration",
    text: "Strengthen international engagement, knowledge exchange and institutional visibility.",
    image: "audience" as const,
  },
  {
    key: "coe",
    title: "Centre of Excellence",
    text: "Explore the long-term establishment of a Centre of Excellence in Rheumatology in Mauritius, subject to feasibility and approvals.",
    image: "hospital" as const,
  },
];

export const conferences = [
  { code: "IRACON", name: "Indian Rheumatology Association conference", region: "India" },
  { code: "EULAR", name: "European Congress of Rheumatology", region: "Europe" },
  { code: "ACR", name: "American College of Rheumatology", region: "United States" },
  { code: "SFR", name: "Société Française de Rhumatologie conferences", region: "France" },
];

export const committee = [
  { role: "President" },
  { role: "Vice President" },
  { role: "Secretary" },
  { role: "Treasurer" },
  { role: "Committee Member" },
  { role: "Committee Member" },
  { role: "Committee Member" },
  { role: "Strategic Advisor" },
];

export const news = [
  {
    date: "7–9 May 2027",
    tag: "Congress",
    title: "Mauritius to host the 7th PAFLAR Congress",
    text: "The Rheumatology Society, Mauritius and the Paediatric Society of Mauritius will host the congress in collaboration with PAFLAR at the Hilton Mauritius Resort & Spa, Flic-en-Flac.",
    href: "/paflar-2027",
    image: "heroSea" as const,
  },
  {
    date: "2026",
    tag: "Conference",
    title: "Annual scientific conference",
    text: "The Society's 2026 annual scientific conference brought together clinicians for updates in rheumatology. Highlights and resources will be published here.",
    href: "/news",
    image: "audience2" as const,
  },
  {
    date: "Quarterly",
    tag: "CPD",
    title: "Continuing professional development programme",
    text: "Details of forthcoming CPD sessions, past programmes and approved educational resources will be published as they become available.",
    href: "/education",
    image: "classroom" as const,
  },
  {
    date: "2024",
    tag: "Awareness",
    title: "Paediatric Rheumatology awareness campaign",
    text: "The Society's 2024 campaign raised awareness of rheumatic diseases in children, alongside its annual conference.",
    href: "/awareness",
    image: "childPlay" as const,
  },
];

export const gallery = [
  { cat: "Congresses", caption: "AFLAR Congress · 2019", image: "audience" as const },
  { cat: "CPD", caption: "CPD session", image: "talk" as const },
  { cat: "Congresses", caption: "Annual scientific conference", image: "microphone" as const },
  { cat: "Awareness", caption: "World Arthritis Day · Quatre Bornes", image: "holdingHands" as const },
  { cat: "Awareness", caption: "Paediatric awareness campaign · 2024", image: "childPlay" as const },
  { cat: "CPD", caption: "Clinical update", image: "presentation" as const },
  { cat: "Media", caption: "Media coverage", image: "audience3" as const },
  { cat: "Congresses", caption: "Scientific exchange", image: "audience2" as const },
  { cat: "CPD", caption: "Workshop", image: "classroom" as const },
];

/* ------------------------------ PAFLAR 2027 ------------------------------ */

export const congress = {
  name: "7th PAFLAR Congress",
  dates: "7–9 May 2027",
  startISO: "2027-05-07T08:00:00+04:00",
  venue: "Hilton Mauritius Resort & Spa",
  location: "Flic-en-Flac, Mauritius",
  theme:
    "Shaping the Future of Paediatric Rheumatology in Africa: Precision Medicine, Innovation, and Collaborative Care.",
  themeParts: ["Precision Medicine", "Innovation", "Collaborative Care"],
  organisers: ["Rheumatology Society, Mauritius", "Paediatric Society of Mauritius", "PAFLAR"],
  headline: "Where Global Expertise Meets the Future of Paediatric Rheumatology.",
  sub: "Join the international paediatric rheumatology community in Mauritius for three days of scientific exchange, education and collaboration.",
  intro:
    "The Rheumatology Society, Mauritius and the Paediatric Society of Mauritius, in collaboration with PAFLAR, are hosting the congress. The congress will bring together healthcare professionals, researchers and international faculty to advance education, research and collaborative care in paediatric rheumatology.",
  links: {
    main: "https://mypaflar.org/congress?c=7th-paflar-congress",
    welcome: "https://mypaflar.org/congress-welcome-note",
    accommodation: "https://mypaflar.org/congress-accommodation",
    paflar: "https://mypaflar.org/",
  },
  // Registration destination still to be confirmed by the organisers.
  registrationPending: true,
};

export const paflarThemes = [
  { title: "Better care for children", text: "Better opportunities and care for children living with paediatric rheumatic diseases." },
  { title: "Education & development", text: "Training and professional development for clinicians across the continent." },
  { title: "Scientific research", text: "Generating evidence relevant to children with rheumatic disease in Africa." },
  { title: "Advocacy", text: "Speaking up for children, families and the services they need." },
  { title: "International networking", text: "Connecting paediatric rheumatology professionals across borders." },
  { title: "Access & equity", text: "Working towards fairer access to specialist paediatric rheumatology care." },
];

export const programme = [
  {
    day: "07",
    weekday: "Friday",
    title: "Pre-congress workshop",
    text: "Focused, practical learning ahead of the main scientific programme.",
    kind: "Workshop",
  },
  {
    day: "08",
    weekday: "Saturday",
    title: "Scientific congress · Day 1",
    text: "Opening of the scientific congress with plenary lectures and scientific sessions.",
    kind: "Scientific sessions",
  },
  {
    day: "09",
    weekday: "Sunday",
    title: "Scientific congress · Day 2",
    text: "Continued scientific sessions, discussion and collaborative exchange.",
    kind: "Scientific sessions",
  },
];

export type Hotel = { name: string; cat: "host" | "lux" | "mid" | "bou" | "apt" };
export const hotels: Hotel[] = [
  { name: "Hilton Mauritius Resort & Spa", cat: "host" },
  { name: "Sugar Beach", cat: "lux" },
  { name: "La Pirogue", cat: "lux" },
  { name: "Sofitel Mauritius L'Impérial Resort & Spa", cat: "lux" },
  { name: "Maradiva Villas Resort", cat: "lux" },
  { name: "Sands Suites Resort & Spa", cat: "lux" },
  { name: "Pearle Beach Resort & Spa", cat: "mid" },
  { name: "Gold Beach Resort & Spa", cat: "mid" },
  { name: "Anelia Resort & Spa", cat: "mid" },
  { name: "Silver Sands", cat: "mid" },
  { name: "Aanari Hotel & Spa", cat: "bou" },
  { name: "Les 2 Canons Boutique Hotel", cat: "bou" },
  { name: "Manisa Hotel", cat: "bou" },
  { name: "Villas Caroline", cat: "apt" },
  { name: "Jet Villa Flic en Flac", cat: "apt" },
];
export const hotelCats: Record<Hotel["cat"], string> = {
  host: "Official host venue",
  lux: "Luxury resorts",
  mid: "Mid-range",
  bou: "Boutique hotels",
  apt: "Villas & apartments",
};

export const explore = [
  { name: "Black River Gorges National Park", time: "≈ 25 min", text: "Trails and rainforest viewpoints in the island's largest national park.", image: "greenMountains" as const },
  { name: "Chamarel & the Seven Coloured Earths", time: "≈ 35 min", text: "Volcanic landscapes, waterfalls, and coffee and rum tastings.", image: "lagoonMountains" as const },
  { name: "Tamarin Bay", time: "≈ 15 min", text: "Early-morning catamaran trips to see dolphins.", image: "ocean" as const },
  { name: "The coastal road", time: "Near the resort", text: "Beachfront cafés, seafood restaurants and sunset lounges.", image: "beachSunset" as const },
];

export const travelFacts = {
  airport: "Sir Seewoosagur Ramgoolam International Airport (MRU)",
  transfer: "50–60 min",
  weather: [
    { k: "Daytime", v: "26–28°C" },
    { k: "Evening", v: "20–22°C" },
    { k: "Lagoon", v: "25–26°C" },
  ],
  packing: [
    "Lightweight professional attire",
    "Smart-casual clothing",
    "Comfortable walking shoes",
    "Sun protection",
    "A light layer for air-conditioned halls",
  ],
};

export const travelFaq = [
  {
    q: "Entry and visa requirements",
    a: "The official PAFLAR guide indicates that most international delegates receive a free visa on arrival for short stays, and that passports must be valid for the whole stay. Requirements vary by nationality.",
    verify: true,
  },
  {
    q: "Mauritius All-in-One Travel Digital Form",
    a: "Delegates are advised to complete the All-in-One Travel Digital Form online before departure and keep the confirmation (QR code or PDF) to hand on arrival.",
    verify: true,
  },
  {
    q: "Currency",
    a: "The local currency is the Mauritian Rupee (MUR). Major credit cards are widely accepted; carry some cash for markets and tipping. A tourism tax is collected by hotels.",
    verify: true,
  },
  {
    q: "Language",
    a: "English is the official language; French and Mauritian Creole are widely spoken.",
  },
  {
    q: "Local connectivity",
    a: "Wi-Fi is available at the host venue. Local SIM cards and eSIMs from Mauritian mobile operators are available on arrival.",
  },
  {
    q: "Power and plug types",
    a: "230V, 50Hz. Outlets accept Type G (UK three-pin) and Type C (European two-pin) plugs. Bring an adaptor if needed.",
  },
  {
    q: "Airport transfers",
    a: "The official guide states that the local organising team will arrange transfers from the airport to Flic-en-Flac, approximately 50–60 minutes by road. Transfer arrangements are subject to confirmation.",
  },
  {
    q: "Local transportation",
    a: "Taxis and private drivers are the most practical way to explore the island. Ask your hotel to arrange trusted transport.",
  },
  {
    q: "Health and wellbeing",
    a: "Drink bottled or filtered water, apply sunscreen often as UV is strong, wear water shoes near coral, and use insect repellent for evening outdoor dining or forest visits.",
  },
];
