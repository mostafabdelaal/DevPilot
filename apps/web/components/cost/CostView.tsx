"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import type { CostReport } from "@/lib/api-types";

const ROW_COLORS = ["var(--accent)", "var(--accent-2)", "var(--green)", "var(--amber)", "var(--red)"];
const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

export function CostView({ report }: { report: CostReport }) {
  const [active, setActive] = useState(report.providers[0].provider);
  const d = report.providers.find((p) => p.provider === active) ?? report.providers[0];
  const compareMax = Math.max(...report.providers.map((p) => p.total));

  const proj = Array.from({ length: 12 }, (_, i) => Math.round(d.total * 1.08 ** i));
  const projMax = proj[proj.length - 1];

  return (
    <div className="mx-auto max-w-[1240px]">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="mb-1 text-2xl font-semibold tracking-tight">Cloud cost estimate</h1>
          <p className="text-sm text-text-2">
            Production profile · derived from the generated Terraform
          </p>
        </div>
        <div className="flex gap-2 rounded-[10px] border border-border bg-surface p-1">
          {report.providers.map((p) => (
            <button
              key={p.provider}
              onClick={() => setActive(p.provider)}
              className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
                active === p.provider ? "bg-accent-soft text-accent" : "text-text-2"
              }`}
            >
              {p.provider}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card className="!rounded-[15px] px-6 py-5">
          <div className="mb-5 flex items-baseline justify-between">
            <h3 className="text-sm font-semibold">
              Monthly breakdown · {d.provider} {d.region}
            </h3>
            <div>
              <span className="text-3xl font-bold tracking-tight">${d.total}</span>
              <span className="text-sm text-text-3">/mo</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {d.rows.map((c, i) => {
              const color = ROW_COLORS[i % ROW_COLORS.length];
              return (
                <div key={c.name}>
                  <div className="mb-1.5 flex justify-between text-[13px]">
                    <span className="flex items-center gap-2.5">
                      <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: color }} />
                      {c.name}
                      <span className="text-xs text-text-3">{c.spec}</span>
                    </span>
                    <span className="font-mono text-text-2">${c.cost}</span>
                  </div>
                  <div className="h-[7px] overflow-hidden rounded bg-bg-elev">
                    <div className="h-full rounded" style={{ width: `${(c.cost / d.total) * 100}%`, background: color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <Card className="!rounded-[15px] px-5 py-5">
            <h3 className="mb-4 text-[13px] text-text-2">Provider comparison</h3>
            {report.providers.map((p) => (
              <div key={p.provider} className="mb-3.5 flex items-center gap-3">
                <span
                  className="w-[52px] text-[12.5px] font-semibold"
                  style={{ color: p.provider === active ? "var(--accent)" : "var(--text-2)" }}
                >
                  {p.provider}
                </span>
                <div className="h-6 flex-1 overflow-hidden rounded-md bg-bg-elev">
                  <div
                    className="flex h-full items-center justify-end rounded-md pr-2 font-mono text-[11px] font-semibold text-white"
                    style={{
                      width: `${(p.total / compareMax) * 100}%`,
                      background: p.provider === active ? "var(--accent)" : "var(--surface-2)",
                    }}
                  >
                    ${p.total}
                  </div>
                </div>
              </div>
            ))}
          </Card>

          <div
            className="rounded-[15px] border px-5 py-5"
            style={{
              background: "linear-gradient(135deg,rgba(62,207,142,.12),rgba(51,214,200,.06))",
              borderColor: "rgba(62,207,142,.25)",
            }}
          >
            <h3 className="mb-2 text-[13px] font-semibold text-green">Savings opportunity</h3>
            <div className="text-2xl font-bold tracking-tight">
              ${report.savings.amount}
              <span className="text-[13px] font-medium text-text-3">/mo</span>
            </div>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-text-2">
              {report.savings.note}
            </p>
          </div>
        </div>
      </div>

      <Card className="!rounded-[15px] px-6 py-5">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-sm font-semibold">12-month projection</h3>
          <span className="text-xs text-text-3">assumes 8% monthly traffic growth</span>
        </div>
        <div className="flex h-[130px] items-end gap-2">
          {proj.map((v, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className="w-full rounded-t-[5px]"
                style={{
                  height: `${(v / projMax) * 110}px`,
                  background: i === proj.length - 1 ? "var(--accent)" : "var(--surface-2)",
                }}
              />
              <span className="text-[9.5px] text-text-3">{MONTHS[i]}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
