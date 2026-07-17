"use client";

import { usePathname } from "next/navigation";
import { ROUTE_TITLES } from "@/lib/nav";

export function Topbar() {
  const pathname = usePathname();
  const title = ROUTE_TITLES[pathname] ?? "Dashboard";

  return (
    <header className="flex items-center gap-3 border-b border-border px-6 py-3">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-2">
        <span className="text-text-3">orbit-api</span>
        <span aria-hidden className="text-text-3">
          /
        </span>
        <span className="text-text">{title}</span>
      </div>

      <div className="flex-1" />

      {/* Command palette trigger (stub) */}
      <button className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm text-text-3 hover:bg-surface">
        <span>Search</span>
        <kbd className="rounded border border-border px-1 text-xs">⌘K</kbd>
      </button>

      {/* Notifications */}
      <button
        aria-label="Notifications"
        className="relative rounded-lg border border-border px-2.5 py-1.5 text-text-2 hover:bg-surface"
      >
        <span aria-hidden>🔔</span>
        <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red" />
      </button>

      {/* Primary CTA */}
      <button className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-white hover:opacity-90">
        New analysis
      </button>
    </header>
  );
}
