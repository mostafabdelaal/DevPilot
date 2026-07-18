"use client";

import { useState } from "react";
import type { Notification } from "@/lib/api-types";

type Category = Notification["category"];

const META: Record<Category, { chip: string; chipCls: string; tint: string; fg: string; icon: string }> = {
  security: { chip: "Security", chipCls: "bg-red-soft text-red", tint: "var(--red-soft)", fg: "var(--red)", icon: "!" },
  deploy: { chip: "Deploy", chipCls: "bg-green-soft text-green", tint: "var(--green-soft)", fg: "var(--green)", icon: "✓" },
  system: { chip: "System", chipCls: "bg-surface-2 text-text-2", tint: "var(--accent-soft)", fg: "var(--accent)", icon: "∴" },
};

const TABS: { label: string; value: Category | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Security", value: "security" },
  { label: "Deploys", value: "deploy" },
  { label: "System", value: "system" },
];

const GROUPS: Notification["group"][] = ["Today", "Earlier"];

export function NotificationsView({ items }: { items: Notification[] }) {
  const [tab, setTab] = useState<Category | "all">("all");
  const visible = items.filter((n) => tab === "all" || n.category === tab);
  const unread = items.filter((n) => n.unread).length;

  return (
    <div className="mx-auto max-w-[840px]">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h1 className="mb-1 text-2xl font-semibold tracking-tight">Notifications</h1>
          <p className="text-sm text-text-2">{unread} unread · security, deploys and system events</p>
        </div>
        <button className="rounded-lg border border-border-strong bg-surface px-3.5 py-2 text-[12.5px] font-semibold hover:bg-surface-2">
          Mark all as read
        </button>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {TABS.map((t) => {
          const count = t.value === "all" ? items.length : items.filter((n) => n.category === t.value).length;
          const on = tab === t.value;
          return (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
                on ? "border-accent bg-accent-soft text-accent" : "border-border text-text-2 hover:bg-surface-2"
              }`}
            >
              {t.label}
              <span className="rounded-full bg-surface-2 px-1.5 text-[11px] text-text-3">{count}</span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 && (
        <div className="py-16 text-center text-text-3">
          <div className="text-sm text-text-2">You&apos;re all caught up</div>
          <div className="mt-1 text-[12.5px]">No notifications match this filter.</div>
        </div>
      )}

      {GROUPS.map((g) => {
        const groupItems = visible.filter((n) => n.group === g);
        if (groupItems.length === 0) return null;
        return (
          <div key={g}>
            <div className="mb-2.5 mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-3">{g}</div>
            <div className="mb-5 flex flex-col gap-2.5">
              {groupItems.map((n, i) => {
                const m = META[n.category];
                return (
                  <div key={`${n.title}-${i}`} className="flex gap-3.5 rounded-[13px] border border-border bg-surface px-4 py-3.5">
                    <span className="grid h-[38px] w-[38px] flex-none place-items-center rounded-[10px] text-sm font-bold" style={{ background: m.tint, color: m.fg }}>
                      {m.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-[13.5px] font-semibold leading-snug">{n.title}</span>
                        <span className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${m.chipCls}`}>{m.chip}</span>
                      </div>
                      <div className="mt-0.5 text-[12.5px] leading-normal text-text-2">{n.body}</div>
                      <div className="mt-1.5 text-[11.5px] text-text-3">{n.time}</div>
                    </div>
                    {n.unread && (
                      <span className="mt-1.5 h-2 w-2 flex-none rounded-full" style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
