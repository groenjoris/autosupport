"use client";

import { useState } from "react";
import Link from "next/link";
import { mockCases } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CaseStatus } from "@/lib/types";

const statusConfig = {
  open: { label: "Open", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  resolved: { label: "Resolved", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
  escalated: { label: "Escalated", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
};

const filters: { label: string; value: CaseStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Open", value: "open" },
  { label: "Resolved", value: "resolved" },
  { label: "Escalated", value: "escalated" },
];

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function CasesPage() {
  const [filter, setFilter] = useState<CaseStatus | "all">("all");

  const filtered =
    filter === "all" ? mockCases : mockCases.filter((c) => c.status === filter);
  const sorted = [...filtered].sort(
    (a, b) =>
      new Date(b.lastActivityAt).getTime() -
      new Date(a.lastActivityAt).getTime()
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Cases</h1>
        <p className="text-sm text-muted-foreground">
          All customer service cases
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {filters.map((f) => (
          <Button
            key={f.value}
            variant={filter === f.value ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f.value)}
          >
            {f.label}
            {f.value !== "all" && (
              <span className="ml-1.5 text-xs opacity-70">
                {mockCases.filter((c) =>
                  f.value === "all" ? true : c.status === f.value
                ).length}
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Case list */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            {sorted.length} case{sorted.length !== 1 ? "s" : ""}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {sorted.map((c) => {
              const status = statusConfig[c.status];
              return (
                <Link
                  key={c.id}
                  href={`/cases/${c.id}`}
                  className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/50"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{c.customerName}</p>
                      <Badge variant="secondary" className={status.className}>
                        {status.label}
                      </Badge>
                      {c.outcome === "saved_return" && (
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                          Saved
                        </Badge>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-sm text-muted-foreground">
                      {c.subject}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {c.customerEmail}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs text-muted-foreground">
                      {timeAgo(c.lastActivityAt)}
                    </p>
                    {c.estimatedValueSaved ? (
                      <p className="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        +&euro;{c.estimatedValueSaved.toFixed(2)}
                      </p>
                    ) : null}
                  </div>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
