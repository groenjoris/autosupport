import Link from "next/link";
import { Mail, ShoppingBag, Bell, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const settingsLinks = [
  {
    href: "/settings/email",
    icon: Mail,
    title: "Email Setup",
    description: "Configure your sending domain and DNS records",
    status: "Verified",
    statusClass:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  {
    href: "/settings/shopify",
    icon: ShoppingBag,
    title: "Shopify Connection",
    description: "Connect your Shopify store for order lookups",
    status: "Connected",
    statusClass:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  {
    href: "/settings",
    icon: Bell,
    title: "Notifications",
    description: "Escalation alerts and email digest settings",
    status: null,
    statusClass: "",
  },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account and integrations
        </p>
      </div>

      <div className="space-y-3">
        {settingsLinks.map((item) => (
          <Link key={item.href + item.title} href={item.href}>
            <Card className="transition-colors hover:bg-muted/50">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <item.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                {item.status && (
                  <Badge variant="secondary" className={item.statusClass}>
                    {item.status}
                  </Badge>
                )}
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
