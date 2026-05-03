"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type StepStatus = "pending" | "in_progress" | "completed";

export type OnboardingState = {
  shopify: { status: StepStatus; storeUrl?: string };
  email: { status: StepStatus; email?: string; dnsVerified?: boolean };
  knowledgeBase: { status: StepStatus };
  rules: { status: StepStatus };
};

type OnboardingContextType = {
  state: OnboardingState;
  updateShopify: (update: Partial<OnboardingState["shopify"]>) => void;
  updateEmail: (update: Partial<OnboardingState["email"]>) => void;
  updateKnowledgeBase: (update: Partial<OnboardingState["knowledgeBase"]>) => void;
  updateRules: (update: Partial<OnboardingState["rules"]>) => void;
  allComplete: boolean;
};

const STORAGE_KEY = "autosupport-onboarding";

const defaultState: OnboardingState = {
  shopify: { status: "pending" },
  email: { status: "pending" },
  knowledgeBase: { status: "pending" },
  rules: { status: "pending" },
};

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(defaultState);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setState(JSON.parse(stored));
    } catch {}
  }, []);

  const save = (next: OnboardingState) => {
    setState(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };

  const updateShopify = (update: Partial<OnboardingState["shopify"]>) =>
    save({ ...state, shopify: { ...state.shopify, ...update } });

  const updateEmail = (update: Partial<OnboardingState["email"]>) =>
    save({ ...state, email: { ...state.email, ...update } });

  const updateKnowledgeBase = (update: Partial<OnboardingState["knowledgeBase"]>) =>
    save({ ...state, knowledgeBase: { ...state.knowledgeBase, ...update } });

  const updateRules = (update: Partial<OnboardingState["rules"]>) =>
    save({ ...state, rules: { ...state.rules, ...update } });

  const allComplete =
    state.shopify.status === "completed" &&
    state.email.status === "completed" &&
    state.knowledgeBase.status === "completed" &&
    state.rules.status === "completed";

  return (
    <OnboardingContext.Provider
      value={{ state, updateShopify, updateEmail, updateKnowledgeBase, updateRules, allComplete }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
