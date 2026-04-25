"use client";

import { useState } from "react";
import { Zap, Save, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { mockRules } from "@/lib/mock-data";

const topicIcons: Record<string, string> = {
  Returns: "↩️",
  "Shipping Delays": "📦",
  "Wrong Item": "❌",
  "Damaged Goods": "💔",
  General: "💬",
};

const templates: Record<string, string> = {
  Returns:
    "If the customer wants to return an item, first offer a 20% discount to keep it. If they decline, offer 50% off. If they still decline, escalate to me.",
  "Shipping Delays":
    "Check the tracking status. Provide the latest update and estimated delivery. If it's been more than 14 days, escalate.",
  "Wrong Item":
    "Apologize and offer to send the correct item. Ask for a photo. If the customer mentions a chargeback, escalate immediately.",
  "Damaged Goods":
    "Ask for a photo of the damage. If they provide one, offer a free replacement. If they refuse after 2 attempts, escalate.",
  General:
    "Be friendly and professional. Use the customer's first name. Keep responses concise. If unsure, escalate rather than guess.",
};

export default function RulesPage() {
  const [rules, setRules] = useState(
    mockRules.map((r) => ({ ...r, draft: r.content }))
  );
  const [selectedTopic, setSelectedTopic] = useState(rules[0]?.topic ?? "");

  const current = rules.find((r) => r.topic === selectedTopic);

  function updateDraft(topic: string, value: string) {
    setRules((prev) =>
      prev.map((r) => (r.topic === topic ? { ...r, draft: value } : r))
    );
  }

  function handleSave(topic: string) {
    setRules((prev) =>
      prev.map((r) =>
        r.topic === topic
          ? { ...r, content: r.draft, updatedAt: new Date().toISOString() }
          : r
      )
    );
  }

  function handleReset(topic: string) {
    setRules((prev) =>
      prev.map((r) => (r.topic === topic ? { ...r, draft: r.content } : r))
    );
  }

  function handleUseTemplate(topic: string) {
    const template = templates[topic];
    if (template) updateDraft(topic, template);
  }

  const hasChanges = current ? current.draft !== current.content : false;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Rules</h1>
        <p className="text-sm text-muted-foreground">
          Define how the AI responds to different types of customer inquiries
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Topic selector */}
        <div className="space-y-1">
          {rules.map((r) => (
            <button
              key={r.topic}
              onClick={() => setSelectedTopic(r.topic)}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                selectedTopic === r.topic
                  ? "bg-accent font-medium text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <span>{topicIcons[r.topic] ?? "📋"}</span>
              {r.topic}
              {r.draft !== r.content && (
                <Badge variant="secondary" className="ml-auto text-[10px]">
                  Unsaved
                </Badge>
              )}
            </button>
          ))}
        </div>

        {/* Editor */}
        {current && (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <Zap className="h-4 w-4" />
                  {current.topic}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleUseTemplate(current.topic)}
                >
                  Use template
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Write rules in plain language. The AI will follow these
                instructions when handling {current.topic.toLowerCase()} cases.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={current.draft}
                onChange={(e) => updateDraft(current.topic, e.target.value)}
                rows={8}
                placeholder={`Describe how the AI should handle ${current.topic.toLowerCase()} cases...`}
                className="text-sm"
              />
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  disabled={!hasChanges}
                  onClick={() => handleSave(current.topic)}
                  className="gap-1.5"
                >
                  <Save className="h-3.5 w-3.5" />
                  Save Changes
                </Button>
                {hasChanges && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleReset(current.topic)}
                    className="gap-1.5"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Discard
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Last updated:{" "}
                {new Date(current.updatedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
