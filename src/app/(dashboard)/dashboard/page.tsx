import { mockStats, mockCases } from "@/lib/mock-data";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RecentCases } from "@/components/dashboard/recent-cases";

export default function DashboardPage() {
  const recentCases = [...mockCases]
    .sort(
      (a, b) =>
        new Date(b.lastActivityAt).getTime() -
        new Date(a.lastActivityAt).getTime()
    )
    .slice(0, 8);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your customer service performance
        </p>
      </div>
      <StatsCards stats={mockStats} />
      <RecentCases cases={recentCases} />
    </div>
  );
}
