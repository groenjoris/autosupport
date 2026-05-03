"use client";

import Link from "next/link";
import { OnboardingProvider } from "@/lib/onboarding-context";

function PixelLogo() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#5852ff] overflow-hidden shrink-0">
      <div className="flex w-6 h-6 flex-col justify-center gap-1.5">
        <div className="flex justify-between w-full px-0.5">
          <div className="w-2 h-2 bg-white rounded-[2px]" />
          <div className="w-2 h-2 bg-white rounded-[2px]" />
        </div>
      </div>
    </div>
  );
}

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <OnboardingProvider>
      <div className="min-h-screen flex flex-col bg-background">
        {/* Top nav */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b-2 border-slate-100 bg-white shadow-[0_4px_20px_-4px_rgba(88,82,255,0.08)] px-6">
          <Link href="/" className="flex items-center gap-3">
            <PixelLogo />
            <span className="font-['Space_Grotesk'] text-xl font-black uppercase tracking-wider text-[#5852ff]">
              AutoSupport
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground border border-border rounded-full px-3 py-1">
              Free trial: <span className="text-foreground font-medium">7 days left</span>
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#00eefc]/30 text-xs font-bold text-[#006970] border-2 border-white shadow-sm">
              AV
            </div>
          </div>
        </header>
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    </OnboardingProvider>
  );
}
