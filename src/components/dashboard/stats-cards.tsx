import {
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Clock,
  MessageSquare,
  Inbox,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { DashboardStats } from "@/lib/types";

export function StatsCards({ stats }: { stats: DashboardStats }) {
  return (
    <div className="space-y-4">
      {/* Hero save card */}
      <Card className="border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30">
        <CardContent className="flex items-center gap-6 p-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/50">
            <ShieldCheck className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
              Returns Saved
            </p>
            <p className="text-3xl font-bold tracking-tight text-emerald-900 dark:text-emerald-100">
              {stats.totalSaves} saves{" "}
              <span className="text-lg font-semibold">
                &mdash; &euro;{stats.totalValueSaved.toFixed(2)} recovered
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={TrendingUp}
          label="Resolution Rate"
          value={`${stats.resolutionRate}%`}
          description="Cases resolved by AI"
        />
        <StatCard
          icon={AlertTriangle}
          label="Escalation Rate"
          value={`${stats.escalationRate}%`}
          description="Cases needing attention"
        />
        <StatCard
          icon={Clock}
          label="Avg Response Time"
          value={`${stats.avgResponseTimeMinutes} min`}
          description="First reply time"
        />
        <StatCard
          icon={Inbox}
          label="Active Cases"
          value={String(stats.activeCases)}
          description={`of ${stats.totalCases} total`}
        />
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
        </div>
        <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
