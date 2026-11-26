export type DayKey = "fri" | "sat" | "sun";
export type RegStatus = "paid" | "pending" | "failed" | "refunded" | "cancelled";
export type Category = "Mauritian resident" | "International delegate" | "PAFLAR member" | "Allied health professional";

export interface Registration {
  id: string;
  title: string;
  first: string;
  last: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  type: "mu" | "intl";
  category: Category;
  days: DayKey[];
  amount: number; // MUR
  usd?: number;
  earlyBird: boolean;
  status: RegStatus;
  method: string;
  txn?: string;
  paidAt?: string;
  registeredAt: string;
  workplace: string;
  mcr: string;
  speciality: string;
  dietary: string;
  hotel: boolean;
  source: string;
  attendance: Partial<Record<DayKey, string>>;
  certificateIssued?: string;
  notes: string;
}

export type AbstractStatus = "Submitted" | "Under review" | "Accepted" | "Revisions requested" | "Rejected";
export interface Abstract {
  id: string;
  regId: string;
  author: string;
  coAuthors: string;
  affiliation: string;
  country: string;
  title: string;
  track: string;
  presentation: "Oral" | "Poster" | "Either";
  body: string;
  status: AbstractStatus;
  submittedAt: string;
  score?: number;
  reviewer?: string;
  decisionNote?: string;
}

export interface Message {
  id: string;
  regId?: string;
  channel: "Email" | "WhatsApp";
  template: string;
  to: string;
  at: string;
  status: "Delivered" | "Read" | "Opened" | "Failed" | "Scheduled" | "Sent";
}

export interface AuditEntry {
  id: string;
  at: string;
  actor: string;
  role: string;
  action: string;
  target: string;
  ip: string;
}

export interface Automation {
  id: string;
  name: string;
  trigger: string;
  channels: ("Email" | "WhatsApp")[];
  enabled: boolean;
  sent: number;
}

export interface Settings {
  earlyBirdEnds: string;
  localDayFee: number;
  intlFee: number;
  memberFee: number;
  registrationOpen: boolean;
  abstractsOpen: boolean;
  abstractDeadline: string;
  certificateMinDays: number;
}
