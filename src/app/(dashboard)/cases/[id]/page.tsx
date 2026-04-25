import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, ShoppingBag, Tag, Bot, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCaseById, getMessagesForCase, getOffersForCase } from "@/lib/mock-data";

const statusConfig = {
  open: { label: "Open", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  resolved: { label: "Resolved", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" },
  escalated: { label: "Escalated", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const caseData = getCaseById(id);
  if (!caseData) notFound();

  const messages = getMessagesForCase(id);
  const offers = getOffersForCase(id);
  const status = statusConfig[caseData.status];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Link href="/cases">
          <Button variant="ghost" size="icon" className="mt-0.5">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight">
              {caseData.subject}
            </h1>
            <Badge variant="secondary" className={status.className}>
              {status.label}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {caseData.customerName} &middot; {caseData.customerEmail}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Email thread */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              Conversation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {messages.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No messages yet. Waiting for AI to process.
              </p>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${
                    msg.direction === "outbound" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      msg.direction === "inbound"
                        ? "bg-muted"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {msg.direction === "inbound" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-xl px-4 py-3 ${
                      msg.direction === "inbound"
                        ? "bg-muted"
                        : "bg-primary/5 border"
                    }`}
                  >
                    <p className="whitespace-pre-line text-sm">
                      {msg.parsedBody}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <p className="text-[11px] text-muted-foreground">
                        {formatDate(msg.sentAt)}
                      </p>
                      {msg.aiGenerated && (
                        <Badge
                          variant="outline"
                          className="h-4 px-1 text-[10px]"
                        >
                          AI
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Sidebar info */}
        <div className="space-y-4">
          {/* Case info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">
                Case Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Customer</span>
                <span className="ml-auto font-medium">
                  {caseData.customerName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Status</span>
                <Badge
                  variant="secondary"
                  className={`ml-auto ${status.className}`}
                >
                  {status.label}
                </Badge>
              </div>
              {caseData.outcome && (
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Outcome</span>
                  <span className="ml-auto font-medium capitalize">
                    {caseData.outcome.replace(/_/g, " ")}
                  </span>
                </div>
              )}
              {caseData.estimatedValueSaved && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Value saved</span>
                  <span className="ml-auto font-semibold text-emerald-600 dark:text-emerald-400">
                    &euro;{caseData.estimatedValueSaved.toFixed(2)}
                  </span>
                </div>
              )}
              {caseData.escalationReason && (
                <>
                  <Separator />
                  <div>
                    <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
                      Escalation Reason
                    </p>
                    <p className="mt-1 text-sm">{caseData.escalationReason}</p>
                  </div>
                </>
              )}
              <Separator />
              <div className="space-y-1 text-xs text-muted-foreground">
                <p>Created: {formatDate(caseData.createdAt)}</p>
                {caseData.resolvedAt && (
                  <p>Resolved: {formatDate(caseData.resolvedAt)}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Offers */}
          {offers.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">
                  Offers Made
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {offers.map((offer) => (
                  <div
                    key={offer.id}
                    className="flex items-center justify-between text-sm"
                  >
                    <div>
                      <p className="font-medium">{offer.offerValue} off</p>
                      <p className="text-xs capitalize text-muted-foreground">
                        {offer.offerType.replace(/_/g, " ")}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className={
                        offer.customerResponse === "accepted"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                          : offer.customerResponse === "declined"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                          : ""
                      }
                    >
                      {offer.customerResponse ?? "Pending"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          {caseData.status !== "resolved" && (
            <Card>
              <CardContent className="space-y-2 p-4">
                {caseData.status === "escalated" && (
                  <Button className="w-full" size="sm">
                    Review & Reply
                  </Button>
                )}
                <Button variant="outline" className="w-full" size="sm">
                  {caseData.status === "open"
                    ? "Mark as Resolved"
                    : "Mark as Resolved"}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
