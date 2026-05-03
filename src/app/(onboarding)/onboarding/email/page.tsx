"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Copy,
  Check,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useOnboarding } from "@/lib/onboarding-context";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Step = "enter-email" | "dns" | "test-email" | "test-sent" | "confirmed";

type DnsStatus = "pending" | "verifying" | "verified" | "failed";

type DnsRecord = {
  label: string;
  type: string;
  host: string;
  value: string;
  status: DnsStatus;
  required: boolean;
};

function makeDnsRecords(domain: string): DnsRecord[] {
  return [
    {
      label: "SPF",
      type: "TXT",
      host: "@",
      value: "v=spf1 include:spf.mtasv.net ~all",
      status: "pending",
      required: true,
    },
    {
      label: "DKIM",
      type: "TXT",
      host: "20240101._domainkey",
      value: `k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC+${domain.replace(/\./g, "")}xK9Qd8aX`,
      status: "pending",
      required: true,
    },
    {
      label: "DMARC",
      type: "TXT",
      host: "_dmarc",
      value: `v=DMARC1; p=none; rua=mailto:dmarc@${domain}`,
      status: "pending",
      required: false,
    },
  ];
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className="shrink-0 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
      title="Copy"
    >
      {copied ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

function StatusIcon({ status }: { status: DnsStatus }) {
  if (status === "verified") return <CheckCircle2 className="h-4 w-4 text-green-600" />;
  if (status === "failed") return <XCircle className="h-4 w-4 text-destructive" />;
  if (status === "verifying")
    return <RefreshCw className="h-4 w-4 text-muted-foreground animate-spin" />;
  return <Clock className="h-4 w-4 text-muted-foreground" />;
}

const FREE_PROVIDERS = ["gmail.com", "hotmail.com", "outlook.com", "yahoo.com", "icloud.com", "live.com"];

export default function EmailSetupPage() {
  const router = useRouter();
  const { updateEmail } = useOnboarding();

  const [step, setStep] = useState<Step>("enter-email");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [testEmail, setTestEmail] = useState("");
  const [records, setRecords] = useState<DnsRecord[]>([]);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState("");
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);

  const domain = email.includes("@") ? email.split("@")[1] : "";

  const validateEmail = (val: string) => {
    if (!val) return "Enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return "Enter a valid email address.";
    const d = val.split("@")[1]?.toLowerCase();
    if (FREE_PROVIDERS.includes(d))
      return "You need a custom domain email (e.g. support@yourstore.com). Free email providers aren't supported.";
    return "";
  };

  const handleContinueEmail = () => {
    const err = validateEmail(email);
    if (err) { setEmailError(err); return; }
    setEmailError("");
    updateEmail({ status: "in_progress", email });
    setTestEmail(email);
    setRecords(makeDnsRecords(domain));
    setStep("dns");
  };

  const handleVerifyDns = () => {
    setVerifying(true);
    setVerifyError("");
    // Animate verification per record, then succeed
    setRecords((prev) => prev.map((r) => ({ ...r, status: "verifying" })));
    setTimeout(() => {
      setRecords((prev) =>
        prev.map((r, i) => ({ ...r, status: i < 2 ? "verified" : "verified" }))
      );
      setVerifying(false);
      setTimeout(() => setStep("test-email"), 600);
    }, 2000);
  };

  const handleSendTest = () => {
    setStep("test-sent");
  };

  const handleConfirm = () => {
    updateEmail({ status: "completed", email, dnsVerified: true });
    router.push("/onboarding");
  };

  // ── Step: Enter email ────────────────────────────────────────────────────────
  if (step === "enter-email") {
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
            <Mail className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Set up your support email</h1>
            <p className="text-sm text-muted-foreground">
              AutoSupport will send replies from this address.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email-addr">Sending email address</Label>
            <Input
              id="email-addr"
              type="email"
              placeholder="support@mystore.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleContinueEmail()}
              className={emailError ? "border-destructive" : ""}
            />
            {emailError && <p className="text-xs text-destructive">{emailError}</p>}
          </div>
          <Button className="w-full" onClick={handleContinueEmail}>
            Continue
          </Button>
        </div>
      </div>
    );
  }

  // ── Step: DNS wizard ─────────────────────────────────────────────────────────
  if (step === "dns") {
    return (
      <div className="flex-1 px-6 py-10 max-w-2xl mx-auto w-full">
        <button
          onClick={() => setStep("enter-email")}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <h1 className="text-xl font-semibold mb-1">Add these DNS records to {domain}</h1>
        <p className="text-sm text-muted-foreground mb-6">
          This proves you own the domain and makes sure emails land in the inbox, not spam.
        </p>

        <div className="mb-4 rounded-lg border bg-muted/40 px-4 py-3 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            We detected your registrar: <span className="text-foreground font-medium">Namecheap</span>
          </span>
          <a href="#" className="text-xs text-primary hover:underline">
            View setup guide →
          </a>
        </div>

        <div className="space-y-3 mb-6">
          {records.map((rec) => (
            <div key={rec.label} className="rounded-xl border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Record {rec.label}</span>
                  {!rec.required && (
                    <Badge variant="secondary" className="text-[10px]">recommended</Badge>
                  )}
                </div>
                <StatusIcon status={rec.status} />
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm">
                <span className="text-muted-foreground font-medium">Type</span>
                <span className="font-mono text-xs bg-muted rounded px-1.5 py-0.5 self-center w-fit">{rec.type}</span>
                <span className="text-muted-foreground font-medium">Host</span>
                <span className="font-mono text-xs bg-muted rounded px-1.5 py-0.5 self-center w-fit">{rec.host}</span>
                <span className="text-muted-foreground font-medium">Value</span>
                <div className="flex items-start gap-2">
                  <span className="font-mono text-xs bg-muted rounded px-1.5 py-0.5 break-all">{rec.value}</span>
                  <CopyButton value={rec.value} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {verifyError && (
          <p className="text-sm text-destructive mb-4">{verifyError}</p>
        )}

        <div className="space-y-3">
          <Button className="w-full" onClick={handleVerifyDns} disabled={verifying}>
            {verifying ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                Verifying DNS records…
              </span>
            ) : (
              "Verify DNS records"
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            DNS changes can take up to 48 hours, but usually it&apos;s done in 15 minutes.
          </p>
        </div>
      </div>
    );
  }

  // ── Step: Send test email ────────────────────────────────────────────────────
  if (step === "test-email") {
    return (
      <div className="flex-1 px-6 py-10 max-w-lg mx-auto w-full">
        <button
          onClick={() => setStep("dns")}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="flex justify-center mb-6">
          <CheckCircle2 className="h-12 w-12 text-green-500" />
        </div>
        <h1 className="text-xl font-semibold text-center mb-2">DNS verified! Let&apos;s send a test email.</h1>

        <div className="space-y-4 mt-6">
          <div className="space-y-1.5">
            <Label htmlFor="test-addr">Send a test email to:</Label>
            <Input
              id="test-addr"
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={handleSendTest}>
            Send test email
          </Button>
        </div>
      </div>
    );
  }

  // ── Step: Test sent ──────────────────────────────────────────────────────────
  if (step === "test-sent") {
    return (
      <div className="flex-1 px-6 py-10 max-w-lg mx-auto w-full text-center">
        <div className="flex justify-center mb-6">
          <Mail className="h-14 w-14 text-primary" />
        </div>
        <h1 className="text-xl font-semibold mb-2">Test email sent!</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Check your inbox for an email from{" "}
          <span className="font-medium text-foreground">{email}</span>
        </p>

        <div className="space-y-3">
          <Button className="w-full" onClick={handleConfirm}>
            I received it — continue
          </Button>
          <Button
            variant="ghost"
            className="w-full gap-1.5"
            onClick={() => setShowTroubleshooting((s) => !s)}
          >
            <HelpCircle className="h-4 w-4" />
            I didn&apos;t get it — help
          </Button>
        </div>

        {showTroubleshooting && (
          <div className="mt-6 rounded-xl border bg-muted/30 p-4 text-left space-y-2 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Troubleshooting tips</p>
            <ul className="space-y-1 list-disc pl-4">
              <li>Check your spam or junk folder</li>
              <li>Wait 2 minutes and refresh your inbox</li>
              <li>Make sure DNS records are still correct</li>
              <li>
                <button
                  className="text-primary hover:underline"
                  onClick={() => { setShowTroubleshooting(false); setStep("dns"); }}
                >
                  Re-verify DNS records
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }

  return null;
}
