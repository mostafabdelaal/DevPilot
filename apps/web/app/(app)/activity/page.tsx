"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";

type Cat = "deploy" | "security" | "access" | "config";
type Status = "success" | "warning" | "danger";

type Row = {
  cat: Cat;
  title: string;
  source: string;
  icon: string;
  tint: string;
  fg: string;
  actor: string;
  ini: string;
  abg: string;
  target: string;
  status: Status;
  time: string;
};

const ROWS: Row[] = [
  { cat: "deploy", title: "Deployed orbit-api v1.4.0", source: "CLI · 10.4.2.19", icon: "▲", tint: "var(--accent-soft)", fg: "var(--accent)", actor: "Dana Reyes", ini: "DR", abg: "var(--accent)", target: "orbit-api@main", status: "success", time: "2h ago" },
  { cat: "security", title: "Resolved CVE-2024-2961", source: "Web · 10.4.2.7", icon: "✓", tint: "var(--green-soft)", fg: "var(--green)", actor: "Jae Mercer", ini: "JM", abg: "var(--accent-2)", target: "glibc", status: "warning", time: "4h ago" },
  { cat: "access", title: "Created API key Production CI", source: "Web · 10.4.2.7", icon: "⚿", tint: "var(--accent-soft)", fg: "var(--accent)", actor: "Dana Reyes", ini: "DR", abg: "var(--accent)", target: "api-key", status: "success", time: "8h ago" },
  { cat: "config", title: "Updated deploy target to EKS", source: "Web · 10.4.2.11", icon: "⚙", tint: "var(--amber-soft)", fg: "var(--amber)", actor: "Priya Lakshmi", ini: "PL", abg: "var(--green)", target: "deploy-config", status: "success", time: "1d ago" },
  { cat: "deploy", title: "Rolled back orbit-api v1.3.8", source: "CLI · 10.4.2.19", icon: "↺", tint: "var(--amber-soft)", fg: "var(--amber)", actor: "Jae Mercer", ini: "JM", abg: "var(--accent-2)", target: "orbit-api", status: "danger", time: "1d ago" },
  { cat: "security", title: "Secret scan flagged config/dev.yaml", source: "System", icon: "!", tint: "var(--red-soft)", fg: "var(--red)", actor: "ci-bot", ini: "CI", abg: "var(--surface-2)", target: "config/dev.yaml", status: "warning", time: "2d ago" },
  { cat: "access", title: "Invited tom@acme-labs.io", source: "Web · 10.4.2.7", icon: "+", tint: "var(--accent-soft)", fg: "var(--accent)", actor: "Dana Reyes", ini: "DR", abg: "var(--accent)", target: "member", status: "success", time: "3d ago" },
  { cat: "config", title: "Enabled Slack notifications", source: "Web · 10.4.2.11", icon: "⚙", tint: "var(--green-soft)", fg: "var(--green)", actor: "Priya Lakshmi", ini: "PL", abg: "var(--green)", target: "integration", status: "success", time: "4d ago" },
];

const STATUS_COLOR: Record<Status, string> = {
  success: "var(--green)",
  warning: "var(--amber)",
  danger: "var(--red)",
};

const FILTERS: { label: string; value: Cat | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Deploy", value: "deploy" },
  { label: "Security", value: "security" },
  { label: "Access", value: "access" },
  { label: "Config", value: "config" },
];

const COLS = "grid-cols-[1fr_168px_148px_150px]";

export default function ActivityPage() {
  const [filter, setFilter] = useState<Cat | "all">("all");
  const rows = ROWS.filter((r) => filter === "all" || r.cat === filter);

  return (
    <div className="mx-auto max-w-[1240px]">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h1 className="mb-1 text-2xl font-semibold tracking-tight">Activity log</h1>
          <p className="text-sm text-text-2">
            A complete audit trail of every action across orbit-api
          </p>
        </div>
        <button className="rounded-lg border border-border-strong bg-surface px-3.5 py-2 text-[12.5px] font-semibold hover:bg-surface-2">
          Export CSV
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const count =
            f.value === "all" ? ROWS.length : ROWS.filter((r) => r.cat === f.value).length;
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
              <span className="rounded-full bg-surface-2 px-1.5 text-[11px] text-text-3">
                {count}
              </span>
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
            {rows.map((a) => (
              <div
                key={a.title}
                className={`grid ${COLS} items-center gap-3.5 border-b border-border px-5 py-3.5 last:border-0`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className="grid h-[30px] w-[30px] flex-none place-items-center rounded-lg text-xs font-bold"
                    style={{ background: a.tint, color: a.fg }}
                  >
                    {a.icon}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-[13px] font-medium">{a.title}</div>
                    <div className="mt-0.5 text-[11px] text-text-3">{a.source}</div>
                  </div>
                </div>
                <div className="flex min-w-0 items-center gap-2.5">
                  <span
                    className="grid h-6 w-6 flex-none place-items-center rounded-full text-[10px] font-bold text-white"
                    style={{ background: a.abg }}
                  >
                    {a.ini}
                  </span>
                  <span className="truncate text-[12.5px] text-text-2">{a.actor}</span>
                </div>
                <span className="truncate font-mono text-[11.5px] text-text-2">{a.target}</span>
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: STATUS_COLOR[a.status] }}
                  />
                  <span className="text-xs text-text-3">{a.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
