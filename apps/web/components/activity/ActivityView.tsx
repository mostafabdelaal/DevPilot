"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import type { AuditEvent } from "@/lib/api-types";

type Cat = AuditEvent["category"];

const CAT_META: Record<Cat, { tint: string; fg: string; icon: string }> = {
  deploy: { tint: "var(--accent-soft)", fg: "var(--accent)", icon: "▲" },
  security: { tint: "var(--amber-soft)", fg: "var(--amber)", icon: "!" },
  access: { tint: "var(--accent-soft)", fg: "var(--accent-2)", icon: "⚿" },
  config: { tint: "var(--green-soft)", fg: "var(--green)", icon: "⚙" },
};

const STATUS_COLOR: Record<AuditEvent["status"], string> = {
  success: "var(--green)",
  warning: "var(--amber)",
  danger: "var(--red)",
};

const AVATAR_BG = ["var(--accent)", "var(--accent-2)", "var(--green)", "var(--amber)", "var(--surface-2)"];

const FILTERS: { label: string; value: Cat | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Deploy", value: "deploy" },
  { label: "Security", value: "security" },
  { label: "Access", value: "access" },
  { label: "Config", value: "config" },
];

const COLS = "grid-cols-[1fr_168px_148px_150px]";

export function ActivityView({ rows }: { rows: AuditEvent[] }) {
  const [filter, setFilter] = useState<Cat | "all">("all");
  const shown = rows.filter((r) => filter === "all" || r.category === filter);

  return (
    <div className="mx-auto max-w-[1240px]">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h1 className="mb-1 text-2xl font-semibold tracking-tight">Activity log</h1>
          <p className="text-sm text-text-2">A complete audit trail of every action across orbit-api</p>
        </div>
        <button className="rounded-lg border border-border-strong bg-surface px-3.5 py-2 text-[12.5px] font-semibold hover:bg-surface-2">
          Export CSV
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count = f.value === "all" ? rows.length : rows.filter((r) => r.category === f.value).length;
          const on = filter === f.value;
          return (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
                on ? "border-accent bg-accent-soft text-accent" : "border-border text-text-2 hover:bg-surface-2"
              }`}
            >
              {f.label}
              <span className="rounded-full bg-surface-2 px-1.5 text-[11px] text-text-3">{count}</span>
            </button>
          );
        })}
      </div>

      <Card className="!rounded-[15px] overflow-hidden !p-0">
        <div className="overflow-x-auto">
          <div className="min-w-[760px]">
            <div className={`grid ${COLS} gap-3.5 border-b border-border px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-text-3`}>
              <span>Event</span>
              <span>Actor</span>
              <span>Target</span>
              <span>Time</span>
            </div>
            {shown.map((a, i) => {
              const m = CAT_META[a.category];
              return (
                <div key={`${a.title}-${i}`} className={`grid ${COLS} items-center gap-3.5 border-b border-border px-5 py-3.5 last:border-0`}>
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid h-[30px] w-[30px] flex-none place-items-center rounded-lg text-xs font-bold" style={{ background: m.tint, color: m.fg }}>
                      {m.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-[13px] font-medium">{a.title}</div>
                      <div className="mt-0.5 text-[11px] text-text-3">{a.source}</div>
                    </div>
                  </div>
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="grid h-6 w-6 flex-none place-items-center rounded-full text-[10px] font-bold text-white" style={{ background: AVATAR_BG[i % AVATAR_BG.length] }}>
                      {a.actorInitials}
                    </span>
                    <span className="truncate text-[12.5px] text-text-2">{a.actor}</span>
                  </div>
                  <span className="truncate font-mono text-[11.5px] text-text-2">{a.target}</span>
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: STATUS_COLOR[a.status] }} />
                    <span className="text-xs text-text-3">{a.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}
