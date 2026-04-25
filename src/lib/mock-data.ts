import type {
  Case,
  DashboardStats,
  KnowledgeBaseSection,
  Merchant,
  Message,
  Offer,
  Rule,
} from "./types";

export const mockMerchant: Merchant = {
  id: "m_1",
  email: "alex@trendygoods.com",
  name: "Alex van Dijk",
  storeName: "TrendyGoods",
  domain: "trendygoods.com",
  shopifyStoreUrl: "https://trendygoods.myshopify.com",
  shopifyConnected: true,
  emailDomainVerified: true,
  createdAt: "2025-11-15T10:00:00Z",
};

export const mockCases: Case[] = [
  {
    id: "c_1",
    merchantId: "m_1",
    customerEmail: "sarah.m@gmail.com",
    customerName: "Sarah Martinez",
    subject: "I want to return my order #1847",
    status: "resolved",
    outcome: "saved_return",
    estimatedValueSaved: 89.95,
    escalationReason: null,
    createdAt: "2026-03-27T14:30:00Z",
    resolvedAt: "2026-03-27T15:45:00Z",
    lastActivityAt: "2026-03-27T15:45:00Z",
  },
  {
    id: "c_2",
    merchantId: "m_1",
    customerEmail: "jdoe42@outlook.com",
    customerName: "John Doe",
    subject: "Where is my package? Order #1832",
    status: "resolved",
    outcome: "resolved_by_ai",
    estimatedValueSaved: null,
    escalationReason: null,
    createdAt: "2026-03-27T09:15:00Z",
    resolvedAt: "2026-03-27T09:18:00Z",
    lastActivityAt: "2026-03-27T09:18:00Z",
  },
  {
    id: "c_3",
    merchantId: "m_1",
    customerEmail: "lisa.chen88@gmail.com",
    customerName: "Lisa Chen",
    subject: "Wrong item received - order #1851",
    status: "escalated",
    outcome: null,
    estimatedValueSaved: null,
    escalationReason: "Customer mentioned chargeback",
    createdAt: "2026-03-28T11:00:00Z",
    resolvedAt: null,
    lastActivityAt: "2026-03-28T16:30:00Z",
  },
  {
    id: "c_4",
    merchantId: "m_1",
    customerEmail: "mike.r@yahoo.com",
    customerName: "Mike Robinson",
    subject: "Product quality question - LED strips",
    status: "resolved",
    outcome: "resolved_by_ai",
    estimatedValueSaved: null,
    escalationReason: null,
    createdAt: "2026-03-26T08:45:00Z",
    resolvedAt: "2026-03-26T08:48:00Z",
    lastActivityAt: "2026-03-26T08:48:00Z",
  },
  {
    id: "c_5",
    merchantId: "m_1",
    customerEmail: "emma.w@proton.me",
    customerName: "Emma Wilson",
    subject: "Return request - not as described",
    status: "resolved",
    outcome: "saved_return",
    estimatedValueSaved: 124.5,
    escalationReason: null,
    createdAt: "2026-03-25T16:20:00Z",
    resolvedAt: "2026-03-26T10:15:00Z",
    lastActivityAt: "2026-03-26T10:15:00Z",
  },
  {
    id: "c_6",
    merchantId: "m_1",
    customerEmail: "david.k@gmail.com",
    customerName: "David Kim",
    subject: "Damaged package on arrival",
    status: "escalated",
    outcome: null,
    estimatedValueSaved: null,
    escalationReason: "3 replies without resolution",
    createdAt: "2026-03-28T09:00:00Z",
    resolvedAt: null,
    lastActivityAt: "2026-03-29T08:15:00Z",
  },
  {
    id: "c_7",
    merchantId: "m_1",
    customerEmail: "anna.b@hotmail.com",
    customerName: "Anna Bergström",
    subject: "Order #1855 - shipping delay?",
    status: "open",
    outcome: null,
    estimatedValueSaved: null,
    escalationReason: null,
    createdAt: "2026-03-29T07:30:00Z",
    resolvedAt: null,
    lastActivityAt: "2026-03-29T07:30:00Z",
  },
  {
    id: "c_8",
    merchantId: "m_1",
    customerEmail: "peter.j@gmail.com",
    customerName: "Peter Jensen",
    subject: "Can I change my shipping address?",
    status: "open",
    outcome: null,
    estimatedValueSaved: null,
    escalationReason: null,
    createdAt: "2026-03-29T10:00:00Z",
    resolvedAt: null,
    lastActivityAt: "2026-03-29T10:00:00Z",
  },
  {
    id: "c_9",
    merchantId: "m_1",
    customerEmail: "rachel.g@gmail.com",
    customerName: "Rachel Green",
    subject: "Want to return - too small",
    status: "resolved",
    outcome: "unsaved_return",
    estimatedValueSaved: null,
    escalationReason: null,
    createdAt: "2026-03-24T13:00:00Z",
    resolvedAt: "2026-03-25T09:00:00Z",
    lastActivityAt: "2026-03-25T09:00:00Z",
  },
  {
    id: "c_10",
    merchantId: "m_1",
    customerEmail: "tom.h@outlook.com",
    customerName: "Tom Harris",
    subject: "Re: Return request - changed my mind",
    status: "resolved",
    outcome: "saved_return",
    estimatedValueSaved: 67.0,
    escalationReason: null,
    createdAt: "2026-03-23T11:00:00Z",
    resolvedAt: "2026-03-23T14:30:00Z",
    lastActivityAt: "2026-03-23T14:30:00Z",
  },
  {
    id: "c_11",
    merchantId: "m_1",
    customerEmail: "sophie.l@gmail.com",
    customerName: "Sophie Laurent",
    subject: "How waterproof is the phone case?",
    status: "resolved",
    outcome: "resolved_by_ai",
    estimatedValueSaved: null,
    escalationReason: null,
    createdAt: "2026-03-22T15:00:00Z",
    resolvedAt: "2026-03-22T15:03:00Z",
    lastActivityAt: "2026-03-22T15:03:00Z",
  },
  {
    id: "c_12",
    merchantId: "m_1",
    customerEmail: "carlos.m@gmail.com",
    customerName: "Carlos Mendez",
    subject: "I never received order #1798",
    status: "resolved",
    outcome: "resolved_by_ai",
    estimatedValueSaved: null,
    escalationReason: null,
    createdAt: "2026-03-21T09:30:00Z",
    resolvedAt: "2026-03-21T09:35:00Z",
    lastActivityAt: "2026-03-21T09:35:00Z",
  },
];

export const mockMessages: Record<string, Message[]> = {
  c_1: [
    {
      id: "msg_1",
      caseId: "c_1",
      direction: "inbound",
      parsedBody:
        "Hi, I received my order #1847 yesterday but the color is not what I expected from the photos. I'd like to return it for a full refund please.",
      aiGenerated: false,
      sentAt: "2026-03-27T14:30:00Z",
    },
    {
      id: "msg_2",
      caseId: "c_1",
      direction: "outbound",
      parsedBody:
        "Hi Sarah,\n\nThank you for reaching out! I'm sorry to hear the color wasn't quite what you expected. I completely understand how frustrating that can be.\n\nAs a token of our appreciation for your patience, I'd like to offer you a 20% discount on your order. This would be a refund of €17.99 back to your original payment method. Would that work for you?\n\nBest regards,\nTrendyGoods Support",
      aiGenerated: true,
      sentAt: "2026-03-27T14:32:00Z",
    },
    {
      id: "msg_3",
      caseId: "c_1",
      direction: "inbound",
      parsedBody:
        "Hmm, I appreciate the offer but I was really hoping for a full refund. The color difference is quite noticeable.",
      aiGenerated: false,
      sentAt: "2026-03-27T15:10:00Z",
    },
    {
      id: "msg_4",
      caseId: "c_1",
      direction: "outbound",
      parsedBody:
        "Hi Sarah,\n\nI totally understand your concern. Let me do better — I can offer you a 50% discount on this order, which would be a €44.98 refund. You'd get to keep the item and receive nearly half your money back.\n\nWould this work for you?\n\nBest regards,\nTrendyGoods Support",
      aiGenerated: true,
      sentAt: "2026-03-27T15:12:00Z",
    },
    {
      id: "msg_5",
      caseId: "c_1",
      direction: "inbound",
      parsedBody:
        "Ok, that's actually a pretty good deal. I'll keep it then. Thanks!",
      aiGenerated: false,
      sentAt: "2026-03-27T15:40:00Z",
    },
    {
      id: "msg_6",
      caseId: "c_1",
      direction: "outbound",
      parsedBody:
        "Wonderful! I'm so glad we could work this out. I've processed the €44.98 refund — it should appear in your account within 3-5 business days.\n\nThank you for your understanding, Sarah. Enjoy the product!\n\nBest regards,\nTrendyGoods Support",
      aiGenerated: true,
      sentAt: "2026-03-27T15:42:00Z",
    },
  ],
  c_3: [
    {
      id: "msg_7",
      caseId: "c_3",
      direction: "inbound",
      parsedBody:
        "I ordered a blue wireless speaker (order #1851) but received a red phone case instead. This is completely wrong! I need this fixed immediately.",
      aiGenerated: false,
      sentAt: "2026-03-28T11:00:00Z",
    },
    {
      id: "msg_8",
      caseId: "c_3",
      direction: "outbound",
      parsedBody:
        "Hi Lisa,\n\nI sincerely apologize for this mix-up! Receiving the wrong item is really frustrating and I want to make this right.\n\nI can see your order #1851 and confirm it should have been a blue wireless speaker. I'd like to arrange for the correct item to be sent to you right away. Would you like us to ship the correct item, or would you prefer a full refund?\n\nBest regards,\nTrendyGoods Support",
      aiGenerated: true,
      sentAt: "2026-03-28T11:03:00Z",
    },
    {
      id: "msg_9",
      caseId: "c_3",
      direction: "inbound",
      parsedBody:
        "This is the second time I've had issues with your store. If this isn't resolved today I'm going to file a chargeback with my bank. Send me the correct item AND refund me for the inconvenience.",
      aiGenerated: false,
      sentAt: "2026-03-28T16:30:00Z",
    },
  ],
  c_6: [
    {
      id: "msg_10",
      caseId: "c_6",
      direction: "inbound",
      parsedBody:
        "My package arrived completely crushed. The box was damaged and the product inside is broken. Order #1849. I need a replacement or refund.",
      aiGenerated: false,
      sentAt: "2026-03-28T09:00:00Z",
    },
    {
      id: "msg_11",
      caseId: "c_6",
      direction: "outbound",
      parsedBody:
        "Hi David,\n\nI'm so sorry to hear about the damaged package! That's definitely not the experience we want for you.\n\nCould you please send us a photo of the damaged item and packaging? This will help us process your claim quickly and also file a report with the shipping carrier.\n\nBest regards,\nTrendyGoods Support",
      aiGenerated: true,
      sentAt: "2026-03-28T09:03:00Z",
    },
    {
      id: "msg_12",
      caseId: "c_6",
      direction: "inbound",
      parsedBody:
        "I already threw away the packaging. The item is clearly broken though. Can you just send a replacement?",
      aiGenerated: false,
      sentAt: "2026-03-28T14:00:00Z",
    },
    {
      id: "msg_13",
      caseId: "c_6",
      direction: "outbound",
      parsedBody:
        "Hi David,\n\nI understand. Could you send a photo of just the damaged item? Even without the packaging, this will help us process your replacement request.\n\nBest regards,\nTrendyGoods Support",
      aiGenerated: true,
      sentAt: "2026-03-28T14:03:00Z",
    },
    {
      id: "msg_14",
      caseId: "c_6",
      direction: "inbound",
      parsedBody:
        "I don't want to take photos. Just send me a new one or give me my money back. This is ridiculous.",
      aiGenerated: false,
      sentAt: "2026-03-29T08:15:00Z",
    },
  ],
  c_7: [
    {
      id: "msg_15",
      caseId: "c_7",
      direction: "inbound",
      parsedBody:
        "Hi, I placed order #1855 five days ago and the tracking hasn't updated since it was shipped. Is there an issue? When can I expect delivery?",
      aiGenerated: false,
      sentAt: "2026-03-29T07:30:00Z",
    },
  ],
};

export const mockOffers: Record<string, Offer[]> = {
  c_1: [
    {
      id: "o_1",
      caseId: "c_1",
      offerType: "percentage_discount",
      offerValue: "20%",
      customerResponse: "declined",
      createdAt: "2026-03-27T14:32:00Z",
    },
    {
      id: "o_2",
      caseId: "c_1",
      offerType: "percentage_discount",
      offerValue: "50%",
      customerResponse: "accepted",
      createdAt: "2026-03-27T15:12:00Z",
    },
  ],
  c_5: [
    {
      id: "o_3",
      caseId: "c_5",
      offerType: "percentage_discount",
      offerValue: "20%",
      customerResponse: "declined",
      createdAt: "2026-03-25T16:25:00Z",
    },
    {
      id: "o_4",
      caseId: "c_5",
      offerType: "store_credit",
      offerValue: "€25",
      customerResponse: "accepted",
      createdAt: "2026-03-26T10:10:00Z",
    },
  ],
  c_10: [
    {
      id: "o_5",
      caseId: "c_10",
      offerType: "percentage_discount",
      offerValue: "20%",
      customerResponse: "accepted",
      createdAt: "2026-03-23T11:05:00Z",
    },
  ],
};

export const mockStats: DashboardStats = {
  totalSaves: 4,
  totalValueSaved: 326.43,
  resolutionRate: 75,
  escalationRate: 16.7,
  avgResponseTimeMinutes: 3,
  activeCases: 4,
  totalCases: 12,
};

export const mockRules: Rule[] = [
  {
    id: "r_1",
    topic: "Returns",
    content:
      "If the customer wants to return an item, first offer a 20% discount to keep it. If they decline, offer 50% off. If they still decline, escalate to me. Never offer more than 50% without my approval.",
    updatedAt: "2026-03-20T10:00:00Z",
  },
  {
    id: "r_2",
    topic: "Shipping Delays",
    content:
      "If a package is delayed, check the tracking status in Shopify. Provide the customer with the latest tracking update and estimated delivery. If it's been more than 14 days since shipping, escalate.",
    updatedAt: "2026-03-20T10:00:00Z",
  },
  {
    id: "r_3",
    topic: "Wrong Item",
    content:
      "If a customer received the wrong item, apologize and offer to send the correct item. Ask for a photo if possible. If the customer mentions a chargeback or is very upset, escalate immediately.",
    updatedAt: "2026-03-20T10:00:00Z",
  },
  {
    id: "r_4",
    topic: "Damaged Goods",
    content:
      "Ask for a photo of the damage. If they provide one, offer a free replacement. If they refuse to send a photo after 2 attempts, escalate. Never refuse a claim outright.",
    updatedAt: "2026-03-20T10:00:00Z",
  },
  {
    id: "r_5",
    topic: "General",
    content:
      "Be friendly and professional. Always use the customer's first name. Keep responses concise. If you're not sure about something, escalate rather than guessing.",
    updatedAt: "2026-03-20T10:00:00Z",
  },
];

export const mockKnowledgeBase: KnowledgeBaseSection[] = [
  {
    id: "kb_1",
    title: "Product Info",
    content:
      "We sell trending consumer electronics and accessories. All products are sourced from verified suppliers. Standard warranty is 30 days. Products include: LED strip lights, wireless speakers, phone cases, portable chargers, smart home accessories.",
    updatedAt: "2026-03-18T10:00:00Z",
  },
  {
    id: "kb_2",
    title: "FAQ",
    content:
      "Q: How long does shipping take?\nA: Standard shipping takes 7-14 business days. Express shipping takes 3-5 business days.\n\nQ: Do you offer free shipping?\nA: Free shipping on orders over €50.\n\nQ: Can I change my order after placing it?\nA: Orders can be modified within 2 hours of placement. After that, please contact support.",
    updatedAt: "2026-03-18T10:00:00Z",
  },
  {
    id: "kb_3",
    title: "Return Policy",
    content:
      "30-day return policy on all items. Items must be in original condition. Customer pays return shipping unless the item was defective or wrong. Refunds processed within 5-7 business days.",
    updatedAt: "2026-03-18T10:00:00Z",
  },
  {
    id: "kb_4",
    title: "Shipping Policy",
    content:
      "We ship worldwide from our warehouse in Shenzhen, China. Standard shipping: 7-14 business days. Express shipping: 3-5 business days (additional €9.95). Tracking provided for all orders. Customs duties may apply for international orders.",
    updatedAt: "2026-03-18T10:00:00Z",
  },
];

export function getCaseById(id: string): Case | undefined {
  return mockCases.find((c) => c.id === id);
}

export function getMessagesForCase(caseId: string): Message[] {
  return mockMessages[caseId] ?? [];
}

export function getOffersForCase(caseId: string): Offer[] {
  return mockOffers[caseId] ?? [];
}

export function getEscalatedCases(): Case[] {
  return mockCases.filter((c) => c.status === "escalated");
}

export function getCasesByStatus(status?: string): Case[] {
  if (!status || status === "all") return mockCases;
  return mockCases.filter((c) => c.status === status);
}
