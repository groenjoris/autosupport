"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Store,
  Mail,
  BookOpen,
  ListChecks,
  CheckCircle2,
  AlertCircle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useOnboarding, StepStatus } from "@/lib/onboarding-context";
import { cn } from "@/lib/utils";

type CardConfig = {
  key: "shopify" | "email" | "knowledgeBase" | "rules";
  num: number;
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  cta: string;
  completedLabel: (state: { storeUrl?: string; email?: string }) => string;
};

const cards: CardConfig[] = [
  {
    key: "shopify",
    num: 1,
    title: "Connect Shopify",
    description: "Link your store so AutoSupport can look up orders and products.",
    icon: Store,
    href: "/onboarding/shopify",
    cta: "Connect store",
    completedLabel: (s) => `Connected: ${s.storeUrl ?? "your store"}`,
  },
  {
    key: "email",
    num: 2,
    title: "Connect Email",
    description: "Set up your support email address so replies come from your domain.",
    icon: Mail,
    href: "/onboarding/email",
    cta: "Set up email",
    completedLabel: (s) => `Sending from: ${s.email ?? "your email"}`,
  },
  {
    key: "knowledgeBase",
    num: 3,
    title: "Knowledge Base",
    description: "Add product info, FAQ, and policies so AutoSupport answers accurately.",
    icon: BookOpen,
    href: "/onboarding/knowledge-base",
    cta: "Add knowledge",
    completedLabel: () => "Return policy, shipping & FAQ saved",
  },
  {
    key: "rules",
    num: 4,
    title: "Cases & Rules",
    description: "Tell AutoSupport how to handle returns, complaints, and more.",
    icon: ListChecks,
    href: "/onboarding/rules",
    cta: "Set up rules",
    completedLabel: () => "Rules configured",
  },
];

function statusBadge(status: StepStatus) {
  if (status === "completed") return { ring: "ring-1 ring-green-200 bg-green-50", iconColor: "text-green-600", badge: "completed" as const };
  if (status === "in_progress") return { ring: "ring-1 ring-amber-200 bg-amber-50", iconColor: "text-amber-500", badge: "in_progress" as const };
  return { ring: "", iconColor: "text-muted-foreground", badge: "pending" as const };
}

export default function OnboardingPage() {
  const router = useRouter();
  const { state, allComplete } = useOnboarding();
  const [launchOpen, setLaunchOpen] = useState(false);

  const completedCount = [state.shopify, state.email, state.knowledgeBase, state.rules].filter(
    (s) => s.status === "completed"
  ).length;

  return (
    <div className="flex-1 px-6 py-10 max-w-3xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Set up AutoSupport</h1>
        <p className="mt-1 text-muted-foreground">
          Complete these 4 steps to activate your email agent.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          {completedCount} of 4 steps completed
        </p>
        {/* Progress bar */}
        <div className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${(completedCount / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* 2×2 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {cards.map((card) => {
          const stepState = state[card.key] as { status: StepStatus; storeUrl?: string; email?: string };
          const { ring, iconColor, badge } = statusBadge(stepState.status);
          const Icon = card.icon;

          return (
            <div
              key={card.key}
              className={cn(
                "rounded-xl border p-5 flex flex-col gap-4 transition-colors",
                ring
              )}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted relative",
                    badge === "completed" && "bg-green-100"
                  )}
                >
                  <Icon className={cn("h-5 w-5", iconColor)} />
                  {badge === "completed" && (
                    <CheckCircle2 className="absolute -top-1.5 -right-1.5 h-4 w-4 text-green-600 bg-white rounded-full" />
                  )}
                  {badge === "in_progress" && (
                    <AlertCircle className="absolute -top-1.5 -right-1.5 h-4 w-4 text-amber-500 bg-white rounded-full" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-0.5">Step {card.num}</p>
                  <h3 className="text-sm font-semibold leading-tight">{card.title}</h3>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                {badge === "completed"
                  ? card.completedLabel(stepState)
                  : badge === "in_progress"
                  ? "Setup incomplete"
                  : card.description}
              </p>

              <div className="mt-auto">
                <Link href={card.href}>
                  <Button
                    variant={badge === "completed" ? "outline" : badge === "in_progress" ? "secondary" : "default"}
                    size="sm"
                    className="w-full"
                  >
                    {badge === "completed"
                      ? "Edit settings"
                      : badge === "in_progress"
                      ? "Continue setup"
                      : card.cta}
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Launch button */}
      <div className="rounded-xl border bg-muted/30 p-5 text-center">
        <Button
          size="lg"
          className={cn(
            "w-full sm:w-auto px-10 gap-2",
            allComplete && "animate-pulse"
          )}
          onClick={() => setLaunchOpen(true)}
        >
          <Zap className="h-4 w-4" />
          Launch AutoSupport
        </Button>
        <p className="mt-2 text-xs text-muted-foreground">
          {allComplete
            ? "You're ready to go"
            : "Complete all 4 steps to activate"}
        </p>
      </div>

      {/* Launch confirmation modal */}
      <Dialog open={launchOpen} onOpenChange={setLaunchOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ready to go live?</DialogTitle>
          </DialogHeader>
          <div className="mt-2 space-y-3 text-sm text-muted-foreground">
            <p>
              AutoSupport will start answering customer emails sent to{" "}
              <span className="font-medium text-foreground">
                {state.email.email ?? "your support email"}
              </span>
              .
            </p>
            <div className="rounded-lg bg-muted px-4 py-3 space-y-1.5">
              <p>
                <span className="text-foreground font-medium">Connected store:</span>{" "}
                {state.shopify.storeUrl ?? "mystore.myshopify.com"}
              </p>
              <p>
                <span className="text-foreground font-medium">Email:</span>{" "}
                {state.email.email ?? "support@mystore.com"}
              </p>
              <p>
                <span className="text-foreground font-medium">Active cases:</span> Returns, Order status, Products
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setLaunchOpen(false)}>
              Not yet
            </Button>
            <Button onClick={() => { setLaunchOpen(false); router.push("/dashboard"); }}>
              Go live
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
