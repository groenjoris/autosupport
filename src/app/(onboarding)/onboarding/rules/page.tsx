"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ListChecks, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/lib/onboarding-context";
import { cn } from "@/lib/utils";

type Strategy = "save-sale" | "accept" | "escalate";
type Tone = "formal" | "friendly" | "short";
type NoTrackingAction = "processing" | "escalate";

type ReturnRuleConfig = {
  strategy: Strategy;
  firstDiscount: number;
  secondDiscount: number;
  ifBothDeclined: "escalate" | "accept";
  tone: Tone;
  instructions: string;
};

type OrderStatusConfig = {
  noTrackingAction: NoTrackingAction;
  proactiveFollowUp: boolean;
  followUpDays: number;
  tone: Tone;
  instructions: string;
};

type GenericRuleConfig = {
  strategy: "auto" | "escalate";
  tone: Tone;
  instructions: string;
};

type CaseType = {
  key: string;
  label: string;
  description: string;
  enabled: boolean;
};

const defaultCaseTypes: CaseType[] = [
  { key: "returns", label: "Return requests", description: "Customer wants to send something back.", enabled: true },
  { key: "order-status", label: "Order status questions", description: '"Where is my package?" and tracking requests.', enabled: true },
  { key: "product-questions", label: "Product questions", description: "Questions about size, color, features, stock.", enabled: true },
  { key: "damaged", label: "Damaged or wrong item", description: "Customer received the wrong item or it arrived broken.", enabled: false },
  { key: "shipping-delays", label: "Shipping delays", description: "Package is late or stuck in transit.", enabled: false },
  { key: "general", label: "General questions", description: "Anything that doesn't fit the above categories.", enabled: false },
];

const TONES: { value: Tone; label: string }[] = [
  { value: "formal", label: "Formal and professional" },
  { value: "friendly", label: "Friendly and personal" },
  { value: "short", label: "Short and to the point" },
];

function RadioGroup<T extends string>({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="accent-primary"
          />
          <span className="text-sm">{opt.label}</span>
          {/* default badge */}
          {(opt.value === "save-sale" || opt.value === "friendly" || opt.value === "processing" || opt.value === "auto") &&
            value !== opt.value && (
              <span className="text-[10px] text-muted-foreground">(default)</span>
            )}
        </label>
      ))}
    </div>
  );
}

function ReturnRules({
  config,
  onChange,
}: {
  config: ReturnRuleConfig;
  onChange: (c: ReturnRuleConfig) => void;
}) {
  return (
    <div className="space-y-5 pt-1">
      <p className="text-sm text-muted-foreground">
        Tell AutoSupport what to do when a customer wants to return.
      </p>

      <div className="space-y-2">
        <p className="text-sm font-medium">Strategy</p>
        <RadioGroup
          name="return-strategy"
          options={[
            { value: "save-sale", label: "Try to save the sale with discounts" },
            { value: "accept", label: "Accept all returns immediately" },
            { value: "escalate", label: "Always escalate to me" },
          ]}
          value={config.strategy}
          onChange={(v) => onChange({ ...config, strategy: v as Strategy })}
        />
      </div>

      {config.strategy === "save-sale" && (
        <div className="rounded-lg bg-muted/50 p-4 space-y-4 border">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="first-discount" className="text-xs text-muted-foreground">First offer</Label>
              <div className="flex items-center gap-1.5">
                <Input
                  id="first-discount"
                  type="number"
                  min={5}
                  max={100}
                  className="w-20"
                  value={config.firstDiscount}
                  onChange={(e) => onChange({ ...config, firstDiscount: Number(e.target.value) })}
                />
                <span className="text-sm">% discount</span>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="second-discount" className="text-xs text-muted-foreground">Second offer</Label>
              <div className="flex items-center gap-1.5">
                <Input
                  id="second-discount"
                  type="number"
                  min={5}
                  max={100}
                  className="w-20"
                  value={config.secondDiscount}
                  onChange={(e) => onChange({ ...config, secondDiscount: Number(e.target.value) })}
                />
                <span className="text-sm">% discount</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">If both offers are declined:</p>
            <RadioGroup
              name="both-declined"
              options={[
                { value: "escalate", label: "Escalate to me" },
                { value: "accept", label: "Accept the return" },
              ]}
              value={config.ifBothDeclined}
              onChange={(v) => onChange({ ...config, ifBothDeclined: v as "escalate" | "accept" })}
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <p className="text-sm font-medium">Tone</p>
        <RadioGroup
          name="return-tone"
          options={TONES}
          value={config.tone}
          onChange={(v) => onChange({ ...config, tone: v as Tone })}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="return-instructions" className="text-sm font-medium">
          Additional instructions <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Textarea
          id="return-instructions"
          placeholder='e.g. "Never mention our supplier" or "Always apologize first"'
          className="min-h-[80px] resize-none"
          value={config.instructions}
          onChange={(e) => onChange({ ...config, instructions: e.target.value })}
        />
      </div>
    </div>
  );
}

function OrderStatusRules({
  config,
  onChange,
}: {
  config: OrderStatusConfig;
  onChange: (c: OrderStatusConfig) => void;
}) {
  return (
    <div className="space-y-5 pt-1">
      <p className="text-sm text-muted-foreground">
        AutoSupport looks up the order in Shopify and replies with the latest tracking info and
        estimated delivery date.
      </p>

      <div className="space-y-2">
        <p className="text-sm font-medium">If no tracking info is available:</p>
        <RadioGroup
          name="no-tracking"
          options={[
            { value: "processing", label: "Tell the customer their order is being processed" },
            { value: "escalate", label: "Escalate to me" },
          ]}
          value={config.noTrackingAction}
          onChange={(v) => onChange({ ...config, noTrackingAction: v as NoTrackingAction })}
        />
      </div>

      <div className="rounded-lg border p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Proactive follow-up</p>
            <p className="text-xs text-muted-foreground">
              Send a follow-up email after estimated delivery to check if the package arrived.
            </p>
          </div>
          <Switch
            checked={config.proactiveFollowUp}
            onCheckedChange={(v) => onChange({ ...config, proactiveFollowUp: v })}
          />
        </div>
        {config.proactiveFollowUp && (
          <div className="flex items-center gap-2 text-sm pt-1">
            <span className="text-muted-foreground">Send</span>
            <Input
              type="number"
              min={1}
              max={14}
              className="w-16"
              value={config.followUpDays}
              onChange={(e) => onChange({ ...config, followUpDays: Number(e.target.value) })}
            />
            <span className="text-muted-foreground">days after estimated delivery</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Tone</p>
        <RadioGroup
          name="order-tone"
          options={TONES}
          value={config.tone}
          onChange={(v) => onChange({ ...config, tone: v as Tone })}
        />
      </div>
    </div>
  );
}

function GenericRules({
  label,
  configKey,
  config,
  onChange,
}: {
  label: string;
  configKey: string;
  config: GenericRuleConfig;
  onChange: (c: GenericRuleConfig) => void;
}) {
  return (
    <div className="space-y-5 pt-1">
      <div className="space-y-2">
        <p className="text-sm font-medium">Strategy</p>
        <RadioGroup
          name={`${configKey}-strategy`}
          options={[
            { value: "auto", label: "Handle automatically" },
            { value: "escalate", label: "Always escalate to me" },
          ]}
          value={config.strategy}
          onChange={(v) => onChange({ ...config, strategy: v as "auto" | "escalate" })}
        />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Tone</p>
        <RadioGroup
          name={`${configKey}-tone`}
          options={TONES}
          value={config.tone}
          onChange={(v) => onChange({ ...config, tone: v as Tone })}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={`${configKey}-instructions`} className="text-sm font-medium">
          Additional instructions <span className="text-muted-foreground font-normal">(optional)</span>
        </Label>
        <Textarea
          id={`${configKey}-instructions`}
          placeholder={`Custom behavior for "${label}"`}
          className="min-h-[80px] resize-none"
          value={config.instructions}
          onChange={(e) => onChange({ ...config, instructions: e.target.value })}
        />
      </div>
    </div>
  );
}

export default function RulesPage() {
  const router = useRouter();
  const { updateRules } = useOnboarding();

  const [caseTypes, setCaseTypes] = useState<CaseType[]>(defaultCaseTypes);
  const [expanded, setExpanded] = useState<string | null>("returns");
  const [saving, setSaving] = useState(false);

  const [returnConfig, setReturnConfig] = useState<ReturnRuleConfig>({
    strategy: "save-sale",
    firstDiscount: 20,
    secondDiscount: 50,
    ifBothDeclined: "accept",
    tone: "friendly",
    instructions: "",
  });

  const [orderConfig, setOrderConfig] = useState<OrderStatusConfig>({
    noTrackingAction: "processing",
    proactiveFollowUp: true,
    followUpDays: 2,
    tone: "friendly",
    instructions: "",
  });

  const [genericConfigs, setGenericConfigs] = useState<Record<string, GenericRuleConfig>>({
    "product-questions": { strategy: "auto", tone: "friendly", instructions: "" },
    damaged: { strategy: "auto", tone: "friendly", instructions: "" },
    "shipping-delays": { strategy: "auto", tone: "friendly", instructions: "" },
    general: { strategy: "auto", tone: "friendly", instructions: "" },
  });

  const enabledCount = caseTypes.filter((c) => c.enabled).length;

  const toggleCase = (key: string) => {
    setCaseTypes((prev) =>
      prev.map((c) => (c.key === key ? { ...c, enabled: !c.enabled } : c))
    );
  };

  const toggleExpand = (key: string) => {
    setExpanded((prev) => (prev === key ? null : key));
  };

  const handleSave = () => {
    if (enabledCount === 0) return;
    setSaving(true);
    setTimeout(() => {
      updateRules({ status: "completed" });
      router.push("/onboarding");
    }, 700);
  };

  return (
    <div className="flex-1 px-6 py-10 max-w-2xl mx-auto w-full">
      <Link
        href="/onboarding"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to setup
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
          <ListChecks className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Choose what AutoSupport handles</h1>
          <p className="text-sm text-muted-foreground">
            Turn on the case types you want automated. You can always add more later.
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {caseTypes.map((ct) => {
          const isExpanded = expanded === ct.key;
          return (
            <div
              key={ct.key}
              className={cn(
                "rounded-xl border transition-colors",
                ct.enabled ? "bg-background" : "bg-muted/20"
              )}
            >
              {/* Header row */}
              <div className="flex items-start gap-3 p-4">
                <Switch
                  checked={ct.enabled}
                  onCheckedChange={() => toggleCase(ct.key)}
                  className="mt-0.5 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm font-medium", !ct.enabled && "text-muted-foreground")}>
                    {ct.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{ct.description}</p>
                </div>
                {ct.enabled && (
                  <button
                    onClick={() => toggleExpand(ct.key)}
                    className="shrink-0 flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    Set rules
                    {isExpanded ? (
                      <ChevronUp className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5" />
                    )}
                  </button>
                )}
              </div>

              {/* Expanded rule config */}
              {ct.enabled && isExpanded && (
                <div className="border-t px-4 pb-4 pt-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                    Rules for: {ct.label}
                  </p>
                  {ct.key === "returns" && (
                    <ReturnRules config={returnConfig} onChange={setReturnConfig} />
                  )}
                  {ct.key === "order-status" && (
                    <OrderStatusRules config={orderConfig} onChange={setOrderConfig} />
                  )}
                  {ct.key !== "returns" && ct.key !== "order-status" && (
                    <GenericRules
                      label={ct.label}
                      configKey={ct.key}
                      config={genericConfigs[ct.key] ?? { strategy: "auto", tone: "friendly", instructions: "" }}
                      onChange={(c) => setGenericConfigs((prev) => ({ ...prev, [ct.key]: c }))}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {enabledCount === 0 && (
        <p className="text-xs text-destructive mb-4 text-center">
          At least 1 case type must be enabled.
        </p>
      )}

      <Button className="w-full" onClick={handleSave} disabled={saving || enabledCount === 0}>
        {saving ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
            Saving…
          </span>
        ) : (
          "Save rules"
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground mt-3">
        You can change these anytime from your settings.
      </p>
    </div>
  );
}
