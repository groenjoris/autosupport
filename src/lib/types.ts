export type CaseStatus = "open" | "resolved" | "escalated";
export type CaseOutcome =
  | "resolved_by_ai"
  | "escalated"
  | "saved_return"
  | "unsaved_return"
  | null;
export type MessageDirection = "inbound" | "outbound";
export type OfferType = "percentage_discount" | "store_credit" | "free_replacement";
export type CustomerResponse = "accepted" | "declined" | "pending" | null;

export interface Merchant {
  id: string;
  email: string;
  name: string;
  storeName: string;
  domain: string;
  shopifyStoreUrl: string | null;
  shopifyConnected: boolean;
  emailDomainVerified: boolean;
  createdAt: string;
}

export interface Case {
  id: string;
  merchantId: string;
  customerEmail: string;
  customerName: string;
  subject: string;
  status: CaseStatus;
  outcome: CaseOutcome;
  estimatedValueSaved: number | null;
  escalationReason: string | null;
  createdAt: string;
  resolvedAt: string | null;
  lastActivityAt: string;
}

export interface Message {
  id: string;
  caseId: string;
  direction: MessageDirection;
  parsedBody: string;
  aiGenerated: boolean;
  sentAt: string;
}

export interface Offer {
  id: string;
  caseId: string;
  offerType: OfferType;
  offerValue: string;
  customerResponse: CustomerResponse;
  createdAt: string;
}

export interface DashboardStats {
  totalSaves: number;
  totalValueSaved: number;
  resolutionRate: number;
  escalationRate: number;
  avgResponseTimeMinutes: number;
  activeCases: number;
  totalCases: number;
}

export interface Rule {
  id: string;
  topic: string;
  content: string;
  updatedAt: string;
}

export interface KnowledgeBaseSection {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}
