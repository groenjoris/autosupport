"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, RefreshCw, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useOnboarding } from "@/lib/onboarding-context";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const DRAFT_KEY = "autosupport-kb-draft";

export default function KnowledgeBasePage() {
  const router = useRouter();
  const { state, updateKnowledgeBase } = useOnboarding();
  const shopifyConnected = state.shopify.status === "completed";

  const [returnPolicy, setReturnPolicy] = useState("");
  const [shippingPolicy, setShippingPolicy] = useState("");
  const [faq, setFaq] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [productCount, setProductCount] = useState(shopifyConnected ? 47 : 0);
  const [lastSynced, setLastSynced] = useState(shopifyConnected ? "just now" : "");
  const draftTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load draft from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        const d = JSON.parse(saved);
        setReturnPolicy(d.returnPolicy ?? "");
        setShippingPolicy(d.shippingPolicy ?? "");
        setFaq(d.faq ?? "");
      }
    } catch {}
  }, []);

  // Auto-save draft every 30s
  const scheduleDraftSave = () => {
    if (draftTimer.current) clearTimeout(draftTimer.current);
    draftTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ returnPolicy, shippingPolicy, faq }));
        toast.success("Draft saved", { duration: 2000 });
      } catch {}
    }, 30000);
  };

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>, key: string) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setter(e.target.value);
      setErrors((er) => { const n = { ...er }; delete n[key]; return n; });
      scheduleDraftSave();
    };

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setProductCount(47);
      setLastSynced("just now");
      setSyncing(false);
      toast.success("Products synced");
    }, 1500);
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (returnPolicy.length < 50)
      next.returnPolicy =
        "Your return policy is too short. Include your conditions, timeframes, and process.";
    if (shippingPolicy.length < 50)
      next.shippingPolicy =
        "Your shipping policy is too short. Include delivery times and carriers.";
    return next;
  };

  const handleSave = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true);
    // Clear draft
    try { localStorage.removeItem(DRAFT_KEY); } catch {}
    setTimeout(() => {
      updateKnowledgeBase({ status: "completed" });
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
          <BookOpen className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Teach AutoSupport about your store</h1>
          <p className="text-sm text-muted-foreground">The more it knows, the better it answers.</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Products */}
        <div className="rounded-xl border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold">Products</span>
              <Badge variant="secondary" className="text-[10px]">auto-sync</Badge>
            </div>
            {shopifyConnected && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 gap-1.5 text-xs"
                onClick={handleSync}
                disabled={syncing}
              >
                <RefreshCw className={cn("h-3.5 w-3.5", syncing && "animate-spin")} />
                Refresh
              </Button>
            )}
          </div>
          {shopifyConnected ? (
            <p className="text-sm text-muted-foreground">
              Synced from Shopify:{" "}
              <span className="font-medium text-foreground">{productCount} products</span> loaded.
              {lastSynced && <span className="ml-1">Last synced: {lastSynced}</span>}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              <Link href="/onboarding/shopify" className="text-primary hover:underline">
                Connect Shopify first
              </Link>{" "}
              to auto-sync your products.
            </p>
          )}
        </div>

        {/* Return policy */}
        <div className="rounded-xl border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="return-policy" className="text-sm font-semibold">
              Return &amp; Refund Policy
            </Label>
            <Badge variant="destructive" className="text-[10px]">required</Badge>
          </div>
          <Textarea
            id="return-policy"
            placeholder="Paste or type your return policy here. Tip: include timeframes, conditions, and who pays for return shipping."
            className={cn("min-h-[150px] resize-y", errors.returnPolicy ? "border-destructive" : "")}
            value={returnPolicy}
            onChange={handleChange(setReturnPolicy, "returnPolicy")}
          />
          {errors.returnPolicy && (
            <p className="text-xs text-destructive">{errors.returnPolicy}</p>
          )}
          <p className="text-xs text-muted-foreground text-right">{returnPolicy.length} chars</p>
        </div>

        {/* Shipping policy */}
        <div className="rounded-xl border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="shipping-policy" className="text-sm font-semibold">
              Shipping Policy
            </Label>
            <Badge variant="destructive" className="text-[10px]">required</Badge>
          </div>
          <Textarea
            id="shipping-policy"
            placeholder="Paste or type your shipping info here. Tip: include delivery times per region and what carrier(s) you use."
            className={cn("min-h-[150px] resize-y", errors.shippingPolicy ? "border-destructive" : "")}
            value={shippingPolicy}
            onChange={handleChange(setShippingPolicy, "shippingPolicy")}
          />
          {errors.shippingPolicy && (
            <p className="text-xs text-destructive">{errors.shippingPolicy}</p>
          )}
          <p className="text-xs text-muted-foreground text-right">{shippingPolicy.length} chars</p>
        </div>

        {/* FAQ */}
        <div className="rounded-xl border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="faq" className="text-sm font-semibold">
              FAQ / Additional Info
            </Label>
            <Badge variant="secondary" className="text-[10px]">optional</Badge>
          </div>
          <Textarea
            id="faq"
            placeholder="Anything else AutoSupport should know. Common questions, brand voice notes, etc."
            className="min-h-[150px] resize-y"
            value={faq}
            onChange={handleChange(setFaq, "faq")}
          />
        </div>

        <Button className="w-full" onClick={handleSave} disabled={saving}>
          {saving ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
              Saving…
            </span>
          ) : (
            "Save knowledge base"
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          You can update this anytime. Changes apply to new conversations immediately.
        </p>
      </div>
    </div>
  );
}
