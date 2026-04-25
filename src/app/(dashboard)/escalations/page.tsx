"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Clock,
  Send,
  Pencil,
  CheckCircle2,
  Bot,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { getEscalatedCases, getMessagesForCase } from "@/lib/mock-data";
import type { Case } from "@/lib/types";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

const aiDrafts: Record<string, string> = {
  c_3: `Hi Lisa,

I completely understand your frustration, and I sincerely apologize for the inconvenience of receiving the wrong item twice.

I've arranged for the correct blue wireless speaker to be shipped to you via express delivery at no additional cost. You should receive a tracking number within 24 hours.

As a gesture of goodwill for the trouble, I've also applied a 30% discount to your order. You don't need to return the phone case — please keep or donate it.

Is there anything else I can help with?

Best regards,
TrendyGoods Support`,
  c_6: `Hi David,

I understand your frustration and I apologize for the damaged item. I want to make this right for you.

I've gone ahead and arranged a free replacement to be shipped to you immediately — no photos needed. You should receive tracking information within 24 hours.

I'm sorry again for the inconvenience. Please let me know if there's anything else I can do.

Best regards,
TrendyGoods Support`,
};

export default function EscalationsPage() {
  const escalated = getEscalatedCases();
  const [selectedId, setSelectedId] = useState<string | null>(
    escalated[0]?.id ?? null
  );
  const [editingDraft, setEditingDraft] = useState(false);
  const [draftText, setDraftText] = useState("");

  const selected = escalated.find((c) => c.id === selectedId);
  const messages = selected ? getMessagesForCase(selected.id) : [];
  const aiDraft = selected ? aiDrafts[selected.id] ?? "" : "";

  function handleEdit() {
    setDraftText(aiDraft);
    setEditingDraft(true);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Escalations</h1>
        <p className="text-sm text-muted-foreground">
          Cases that need your attention
        </p>
      </div>

      {escalated.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
              <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="mt-4 text-sm font-medium">All clear!</p>
            <p className="text-sm text-muted-foreground">
              No cases need your attention right now.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
          {/* Case list */}
          <div className="space-y-2">
            {escalated.map((c) => (
              <EscalationCard
                key={c.id}
                caseData={c}
                isSelected={c.id === selectedId}
                onClick={() => {
                  setSelectedId(c.id);
                  setEditingDraft(false);
                }}
              />
            ))}
          </div>

          {/* Detail panel */}
          {selected && (
            <div className="space-y-4">
              {/* Thread */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">
                      {selected.subject}
                    </CardTitle>
                    <Link href={`/cases/${selected.id}`}>
                      <Button variant="ghost" size="sm">
                        Full case
                      </Button>
                    </Link>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selected.customerName} &middot; {selected.customerEmail}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${
                        msg.direction === "outbound" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${
                          msg.direction === "inbound"
                            ? "bg-muted"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {msg.direction === "inbound" ? (
                          <User className="h-3.5 w-3.5" />
                        ) : (
                          <Bot className="h-3.5 w-3.5" />
                        )}
                      </div>
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                          msg.direction === "inbound"
                            ? "bg-muted"
                            : "bg-primary/5 border"
                        }`}
                      >
                        <p className="whitespace-pre-line">{msg.parsedBody}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* AI Draft + Actions */}
              <Card className="border-amber-200 dark:border-amber-900">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <CardTitle className="text-sm font-semibold">
                      AI Draft Reply
                    </CardTitle>
                  </div>
                  {selected.escalationReason && (
                    <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400">
                      <AlertTriangle className="h-3 w-3" />
                      Escalated: {selected.escalationReason}
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {editingDraft ? (
                    <Textarea
                      value={draftText}
                      onChange={(e) => setDraftText(e.target.value)}
                      rows={10}
                      className="font-mono text-sm"
                    />
                  ) : (
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="whitespace-pre-line text-sm">{aiDraft}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" className="gap-1.5">
                      <Send className="h-3.5 w-3.5" />
                      {editingDraft ? "Send Edited Reply" : "Approve & Send"}
                    </Button>
                    {!editingDraft && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5"
                        onClick={handleEdit}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit Reply
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Resolve Without Reply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function EscalationCard({
  caseData,
  isSelected,
  onClick,
}: {
  caseData: Case;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg border p-4 text-left transition-colors ${
        isSelected
          ? "border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30"
          : "hover:bg-muted/50"
      }`}
    >
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium">{caseData.customerName}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {timeAgo(caseData.lastActivityAt)}
        </div>
      </div>
      <p className="mt-1 truncate text-sm text-muted-foreground">
        {caseData.subject}
      </p>
      {caseData.escalationReason && (
        <div className="mt-2 flex items-center gap-1.5">
          <AlertTriangle className="h-3 w-3 text-amber-500" />
          <p className="text-xs text-amber-600 dark:text-amber-400">
            {caseData.escalationReason}
          </p>
        </div>
      )}
    </button>
  );
}
