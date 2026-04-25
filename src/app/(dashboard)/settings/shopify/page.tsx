import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockMerchant } from "@/lib/mock-data";

export default function ShopifySettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/settings">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Shopify Connection
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your Shopify store integration
          </p>
        </div>
      </div>

      {/* Connection status */}
      <Card>
        <CardContent className="flex items-center gap-4 p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/40">
            <ShoppingBag className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{mockMerchant.storeName}</p>
              <Badge
                variant="secondary"
                className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
              >
                Connected
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {mockMerchant.shopifyStoreUrl}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Permissions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Permissions</CardTitle>
          <p className="text-sm text-muted-foreground">
            Access levels granted to AutoSupport
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                scope: "read_orders",
                description: "View orders, fulfillment, and tracking data",
              },
              {
                scope: "read_products",
                description: "View product catalog and inventory",
              },
              {
                scope: "read_customers",
                description: "View customer profiles and email addresses",
              },
            ].map((perm) => (
              <div key={perm.scope} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <p className="text-sm font-medium font-mono">{perm.scope}</p>
                  <p className="text-xs text-muted-foreground">
                    {perm.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <Card>
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm font-medium">Store Admin</p>
            <p className="text-sm text-muted-foreground">
              Open your Shopify admin panel
            </p>
          </div>
          <a
            href={mockMerchant.shopifyStoreUrl + "/admin"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-sm font-medium shadow-xs hover:bg-accent hover:text-accent-foreground"
          >
            Open Shopify
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm font-medium text-destructive">
              Disconnect Store
            </p>
            <p className="text-sm text-muted-foreground">
              Remove the Shopify connection. The AI won&apos;t be able to look up orders.
            </p>
          </div>
          <Button variant="destructive" size="sm">
            Disconnect
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
