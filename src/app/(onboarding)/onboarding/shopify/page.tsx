"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOnboarding } from "@/lib/onboarding-context";

type Step = "enter" | "connecting" | "confirmed";

export default function ShopifySetupPage() {
  const router = useRouter();
  const { updateShopify } = useOnboarding();
  const [step, setStep] = useState<Step>("enter");
  const [handle, setHandle] = useState("");
  const [error, setError] = useState("");

  const validate = (value: string) => {
    if (!value) return "Enter your store handle.";
    if (!/^[a-zA-Z0-9-]{3,50}$/.test(value))
      return "That doesn't look like a valid Shopify store URL.";
    return "";
  };

  const handleConnect = () => {
    const err = validate(handle);
    if (err) { setError(err); return; }
    setError("");
    updateShopify({ status: "in_progress" });
    setStep("connecting");
    // Simulate OAuth round-trip
    setTimeout(() => {
      updateShopify({ status: "completed", storeUrl: `${handle}.myshopify.com` });
      setStep("confirmed");
    }, 1800);
  };

  if (step === "confirmed") {
    return (
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-sm w-full text-center space-y-4">
          <div className="flex justify-center">
            <CheckCircle2 className="h-14 w-14 text-green-500" />
          </div>
          <h1 className="text-2xl font-semibold">Connected!</h1>
          <p className="text-muted-foreground text-sm">
            <span className="font-medium text-foreground">{handle}.myshopify.com</span> is now
            linked to AutoSupport.
          </p>
          <Button asChild className="w-full">
            <Link href="/onboarding">Back to setup</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 px-6 py-10 max-w-lg mx-auto w-full">
      <Link
        href="/onboarding"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to setup
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
          <Store className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Connect your Shopify store</h1>
          <p className="text-sm text-muted-foreground">
            AutoSupport needs access to your orders and products.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="handle">Your Shopify store URL</Label>
          <div className="flex items-center gap-0">
            <Input
              id="handle"
              placeholder="my-store"
              value={handle}
              onChange={(e) => { setHandle(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleConnect()}
              disabled={step === "connecting"}
              className={cn("rounded-r-none", error ? "border-destructive" : "")}
            />
            <span className="flex items-center h-9 rounded-r-md border border-l-0 bg-muted px-3 text-sm text-muted-foreground whitespace-nowrap">
              .myshopify.com
            </span>
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>

        <Button
          className="w-full"
          onClick={handleConnect}
          disabled={step === "connecting"}
        >
          {step === "connecting" ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
              Connecting to Shopify…
            </span>
          ) : (
            "Connect to Shopify"
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          We only request read access. AutoSupport will never change your orders or products.
        </p>
      </div>
    </div>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}
