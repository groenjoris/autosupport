"use client";

import { useState } from "react";
import { BookOpen, Save, RotateCcw, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { mockKnowledgeBase } from "@/lib/mock-data";

export default function KnowledgeBasePage() {
  const [sections, setSections] = useState(
    mockKnowledgeBase.map((s) => ({ ...s, draft: s.content }))
  );
  const [selectedId, setSelectedId] = useState(sections[0]?.id ?? "");

  const current = sections.find((s) => s.id === selectedId);

  function updateDraft(id: string, value: string) {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, draft: value } : s))
    );
  }

  function handleSave(id: string) {
    setSections((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, content: s.draft, updatedAt: new Date().toISOString() }
          : s
      )
    );
  }

  function handleReset(id: string) {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, draft: s.content } : s))
    );
  }

  const hasChanges = current ? current.draft !== current.content : false;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Knowledge Base
          </h1>
          <p className="text-sm text-muted-foreground">
            Information the AI uses to answer product and policy questions
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Upload className="h-3.5 w-3.5" />
          Import File
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Section selector */}
        <div className="space-y-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedId(s.id)}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                selectedId === s.id
                  ? "bg-accent font-medium text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5 shrink-0" />
              {s.title}
              {s.draft !== s.content && (
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
              <CardTitle className="text-base font-semibold">
                {current.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                The AI will use this information when answering questions about{" "}
                {current.title.toLowerCase()}.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={current.draft}
                onChange={(e) => updateDraft(current.id, e.target.value)}
                rows={12}
                placeholder={`Add your ${current.title.toLowerCase()} information here...`}
                className="text-sm"
              />
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  disabled={!hasChanges}
                  onClick={() => handleSave(current.id)}
                  className="gap-1.5"
                >
                  <Save className="h-3.5 w-3.5" />
                  Save Changes
                </Button>
                {hasChanges && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleReset(current.id)}
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
