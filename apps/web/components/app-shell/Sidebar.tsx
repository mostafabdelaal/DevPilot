"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV } from "@/lib/nav";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border bg-bg-elev">
      {/* Brand */}
      <div className="flex items-center gap-2 px-5 py-4">
        <span
          aria-hidden
          className="grid h-7 w-7 place-items-center rounded-md bg-accent-soft text-accent"
        >
          ▲
        </span>
        <span className="font-semibold tracking-tight">DevPilot AI</span>
      </div>

      {/* Project switcher (stub) */}
      <button className="mx-3 mb-2 flex items-center justify-between rounded-lg border border-border px-3 py-2 text-sm text-text-2 hover:bg-surface">
        <span className="truncate">acme-labs / orbit-api</span>
        <span aria-hidden className="text-text-3">
          ⌄
        </span>
      </button>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {NAV.map((grp) => (
          <div key={grp.group} className="mb-4">
            <div className="px-2 pb-1 text-[11px] font-medium uppercase tracking-wider text-text-3">
              {grp.group}
            </div>
            <ul>
              {grp.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={[
                        "flex items-center justify-between rounded-lg px-2 py-1.5 text-sm transition-colors",
                        active
                          ? "bg-accent-soft text-text"
                          : "text-text-2 hover:bg-surface hover:text-text",
                      ].join(" ")}
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="rounded-full bg-red-soft px-1.5 text-[11px] text-red">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User footer (stub) */}
      <div className="flex items-center gap-2 border-t border-border px-4 py-3 text-sm">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-surface-2 text-text-2">
          DR
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate">Dana Reyes</div>
          <div className="truncate text-xs text-text-3">Owner</div>
        </div>
      </div>
    </aside>
  );
}
