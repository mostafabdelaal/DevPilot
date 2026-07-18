"use client";

import { useState } from "react";

type Category = "security" | "deploy" | "system";

type Notif = {
  group: "Today" | "Earlier";
  category: Category;
  title: string;
  chip: string;
  chipCls: string;
  tint: string;
  fg: string;
  icon: string;
  body: string;
  time: string;
  unread: boolean;
};

const NOTIFS: Notif[] = [
  { group: "Today", category: "security", title: "High-severity CVE detected", chip: "Security", chipCls: "bg-red-soft text-red", tint: "var(--red-soft)", fg: "var(--red)", icon: "!", body: "CVE-2024-2961 found in the glibc base layer of orbit-api.", time: "2h ago", unread: true },
  { group: "Today", category: "deploy", title: "Deployment succeeded", chip: "Deploy", chipCls: "bg-green-soft text-green", tint: "var(--green-soft)", fg: "var(--green)", icon: "✓", body: "orbit-api v1.4.0 rolled out to production in 42s.", time: "3h ago", unread: true },
  { group: "Earlier", category: "system", title: "Analysis completed", chip: "System", chipCls: "bg-surface-2 text-text-2", tint: "var(--accent-soft)", fg: "var(--accent)", icon: "∴", body: "11 DevOps assets generated for orbit-api.", time: "1d ago", unread: false },
  { group: "Earlier", category: "deploy", title: "Deployment rolled back", chip: "Deploy", chipCls: "bg-amber-soft text-amber", tint: "var(--amber-soft)", fg: "var(--amber)", icon: "↺", body: "orbit-api v1.3.8 rolled back after a failed readiness probe.", time: "1d ago", unread: false },
  { group: "Earlier", category: "security", title: "Secret detected & remediated", chip: "Security", chipCls: "bg-green-soft text-green", tint: "var(--green-soft)", fg: "var(--green)", icon: "✓", body: "Hard-coded Postgres password replaced with a Kubernetes Secret.", time: "2d ago", unread: false },
];

const TABS: { label: string; value: Category | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Security", value: "security" },
  { label: "Deploys", value: "deploy" },
  { label: "System", value: "system" },
];

const GROUPS: Notif["group"][] = ["Today", "Earlier"];

export default function NotificationsPage() {
  const [tab, setTab] = useState<Category | "all">("all");

  const visible = NOTIFS.filter((n) => tab === "all" || n.category === tab);
  const unreadCount = NOTIFS.filter((n) => n.unread).length;

  return (
    <div className="mx-auto max-w-[840px]">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h1 className="mb-1 text-2xl font-semibold tracking-tight">Notifications</h1>
          <p className="text-sm text-text-2">
            {unreadCount} unread · security, deploys and system events
          </p>
        </div>
        <button className="rounded-lg border border-border-strong bg-surface px-3.5 py-2 text-[12.5px] font-semibold hover:bg-surface-2">
          Mark all as read
        </button>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {TABS.map((t) => {
          const count =
            t.value === "all"
              ? NOTIFS.length
              : NOTIFS.filter((n) => n.category === t.value).length;
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
              <span className="rounded-full bg-surface-2 px-1.5 text-[11px] text-text-3">
                {count}
              </span>
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
        const items = visible.filter((n) => n.group === g);
        if (items.length === 0) return null;
        return (
          <div key={g}>
            <div className="mb-2.5 mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-3">
              {g}
            </div>
            <div className="mb-5 flex flex-col gap-2.5">
              {items.map((n) => (
                <div
                  key={n.title}
                  className={`flex gap-3.5 rounded-[13px] border px-4 py-3.5 ${
                    n.unread ? "border-border-strong bg-surface" : "border-border bg-surface"
                  }`}
                >
                  <span
                    className="grid h-[38px] w-[38px] flex-none place-items-center rounded-[10px] text-sm font-bold"
                    style={{ background: n.tint, color: n.fg }}
                  >
                    {n.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-[13.5px] font-semibold leading-snug">
                        {n.title}
                      </span>
                      <span className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${n.chipCls}`}>
                        {n.chip}
                      </span>
                    </div>
                    <div className="mt-0.5 text-[12.5px] leading-normal text-text-2">
                      {n.body}
                    </div>
                    <div className="mt-1.5 text-[11.5px] text-text-3">{n.time}</div>
                  </div>
                  {n.unread && (
                    <span
                      className="mt-1.5 h-2 w-2 flex-none rounded-full"
                      style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
