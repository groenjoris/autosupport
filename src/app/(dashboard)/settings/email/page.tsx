"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Copy,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const dnsRecords = [
  {
    type: "TXT (SPF)",
    host: "@",
    value: "v=spf1 include:spf.mtasv.net ~all",
    verified: true,
  },
  {
    type: "CNAME (DKIM)",
    host: "20250101._domainkey",
    value: "20250101._domainkey.pstmrk.com",
    verified: true,
  },
  {
    type: "TXT (DMARC)",
    host: "_dmarc",
    value: "v=DMARC1; p=none; rua=mailto:dmarc@trendygoods.com",
    verified: true,
  },
  {
    type: "MX (Inbound)",
    host: "support",
    value: "inbound.postmarkapp.com",
    priority: "10",
    verified: true,
  },
];

export default function EmailSettingsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/settings">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Email Setup</h1>
          <p className="text-sm text-muted-foreground">
            Configure your sending domain and DNS records
          </p>
        </div>
      </div>

      {/* Domain status */}
      <Card>
        <CardContent className="flex items-center gap-4 p-5">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <div className="flex-1">
            <p className="text-sm font-medium">
              support@trendygoods.com
            </p>
            <p className="text-sm text-muted-foreground">
              Domain verified and ready to send
            </p>
          </div>
          <Badge
            variant="secondary"
            className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
          >
            Verified
          </Badge>
        </CardContent>
      </Card>

      {/* Sending address */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Sending Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">From Name</label>
              <Input
                defaultValue="TrendyGoods Support"
                className="mt-1.5"
              />
            </div>
            <div>
              <label className="text-sm font-medium">From Email</label>
              <Input
                defaultValue="support@trendygoods.com"
                className="mt-1.5"
                disabled
              />
            </div>
          </div>
          <Button size="sm">Save</Button>
        </CardContent>
      </Card>

      {/* DNS Records */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">
              DNS Records
            </CardTitle>
            <Button variant="outline" size="sm" className="gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" />
              Re-verify
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Add these records to your domain&apos;s DNS settings
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dnsRecords.map((record) => (
              <div
                key={record.type}
                className="rounded-lg border p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{record.type}</p>
                    {record.verified ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    )}
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      record.verified
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                    }
                  >
                    {record.verified ? "Verified" : "Pending"}
                  </Badge>
                </div>
                <div className="grid gap-2 text-sm sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground">Host</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <code className="rounded bg-muted px-2 py-1 text-xs">
                        {record.host}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          copyToClipboard(record.host, `host-${record.type}`)
                        }
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      {copied === `host-${record.type}` && (
                        <span className="text-xs text-emerald-600">
                          Copied
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Value</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <code className="max-w-[240px] truncate rounded bg-muted px-2 py-1 text-xs">
                        {record.value}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() =>
                          copyToClipboard(record.value, `value-${record.type}`)
                        }
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      {copied === `value-${record.type}` && (
                        <span className="text-xs text-emerald-600">
                          Copied
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
