import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Case } from "@/lib/types";

const statusConfig = {
  open: { label: "Open", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  resolved: { label: "Resolved", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
  escalated: { label: "Escalated", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function RecentCases({ cases }: { cases: Case[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-base font-semibold">Recent Cases</CardTitle>
        <Link
          href="/cases"
          className="text-sm font-medium text-primary hover:underline"
        >
          View all
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {cases.map((c) => {
            const status = statusConfig[c.status];
            return (
              <Link
                key={c.id}
                href={`/cases/${c.id}`}
                className="flex items-center gap-4 px-6 py-3 transition-colors hover:bg-muted/50"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium">
                      {c.customerName}
                    </p>
                    <Badge
                      variant="secondary"
                      className={status.className}
                    >
                      {status.label}
                    </Badge>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">
                    {c.subject}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs text-muted-foreground">
                    {timeAgo(c.lastActivityAt)}
                  </p>
                  {c.estimatedValueSaved ? (
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
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
  );
}
