"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  AlertTriangle,
  BookOpen,
  Cog,
  Zap,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/cases", label: "Cases", icon: MessageSquare },
  { href: "/escalations", label: "Escalations", icon: AlertTriangle, badge: 2 },
  { href: "/knowledge-base", label: "Knowledge Base", icon: BookOpen },
  { href: "/rules", label: "Rules", icon: Zap },
  { href: "/settings", label: "Settings", icon: Cog },
];

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

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <div className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center border-b-2 border-slate-100 bg-white px-4 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <div className="ml-3 flex items-center gap-3">
          <PixelLogo />
          <span className="font-['Space_Grotesk'] text-xl font-black uppercase tracking-wider text-[#5852ff]">
            AutoSupport
          </span>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 flex h-full w-72 flex-col border-r-2 border-slate-100 bg-slate-50 transition-transform duration-200",
          "md:translate-x-0 md:static",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex h-20 items-center gap-3 border-b-2 border-slate-100 px-6">
          <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
            <PixelLogo />
            <span className="font-['Space_Grotesk'] text-xl font-black uppercase tracking-wider text-[#5852ff]">
              AutoSupport
            </span>
          </Link>
        </div>

        {/* User profile */}
        <div className="border-b-2 border-slate-100 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00eefc]/30 border-2 border-white shadow-sm text-xs font-bold text-[#006970]">
              AV
            </div>
            <div>
              <p className="font-['Space_Grotesk'] text-sm font-bold text-[#181c1e]">TrendyGoods</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#3d32e6]">Pro Plan</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium font-['Space_Grotesk'] transition-all duration-200",
                  isActive
                    ? "bg-white text-[#5852ff] shadow-[4px_4px_0px_0px_rgba(88,82,255,0.12)] border border-[#5852ff]/20"
                    : "text-slate-500 hover:text-slate-900 hover:translate-x-1"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
                {item.badge ? (
                  <Badge
                    variant="destructive"
                    className="ml-auto h-5 min-w-5 justify-center rounded-full px-1.5 text-[10px]"
                  >
                    {item.badge}
                  </Badge>
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t-2 border-slate-100 p-4">
          <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            alex@trendygoods.com
          </p>
        </div>
      </aside>
    </>
  );
}
