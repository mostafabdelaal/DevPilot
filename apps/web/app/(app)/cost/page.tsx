"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";

type Provider = "AWS" | "GCP" | "Azure";

type Row = { name: string; spec: string; cost: number; color: string };

const DATA: Record<Provider, { total: number; region: string; rows: Row[] }> = {
  AWS: {
    total: 412,
    region: "eu-west-1",
    rows: [
      { name: "EKS control plane", spec: "1 cluster", cost: 73, color: "var(--accent)" },
      { name: "EC2 nodes", spec: "3× t4g.medium", cost: 180, color: "var(--accent-2)" },
      { name: "RDS Postgres", spec: "Multi-AZ db.t4g.medium", cost: 124, color: "var(--green)" },
      { name: "ALB", spec: "1 load balancer", cost: 22, color: "var(--amber)" },
      { name: "CloudWatch", spec: "logs + metrics", cost: 13, color: "var(--red)" },
    ],
  },
  GCP: {
    total: 398,
    region: "europe-west1",
    rows: [
      { name: "GKE control plane", spec: "1 cluster", cost: 74, color: "var(--accent)" },
      { name: "Compute nodes", spec: "3× e2-medium", cost: 164, color: "var(--accent-2)" },
      { name: "Cloud SQL", spec: "HA Postgres", cost: 118, color: "var(--green)" },
      { name: "Load Balancer", spec: "1 forwarding rule", cost: 23, color: "var(--amber)" },
      { name: "Cloud Monitoring", spec: "logs + metrics", cost: 19, color: "var(--red)" },
    ],
  },
  Azure: {
    total: 431,
    region: "west-europe",
    rows: [
      { name: "AKS control plane", spec: "1 cluster", cost: 77, color: "var(--accent)" },
      { name: "VM nodes", spec: "3× B2ms", cost: 192, color: "var(--accent-2)" },
      { name: "Postgres Flexible", spec: "HA zone-redundant", cost: 120, color: "var(--green)" },
      { name: "App Gateway", spec: "1 gateway", cost: 28, color: "var(--amber)" },
      { name: "Azure Monitor", spec: "logs + metrics", cost: 14, color: "var(--red)" },
    ],
  },
};

const PROVIDERS: Provider[] = ["AWS", "GCP", "Azure"];
const COMPARE_MAX = Math.max(...PROVIDERS.map((p) => DATA[p].total));

export default function CostPage() {
  const [provider, setProvider] = useState<Provider>("AWS");
  const d = DATA[provider];

  // 12-month projection at 8% monthly growth
  const proj = Array.from({ length: 12 }, (_, i) => Math.round(d.total * 1.08 ** i));
  const projMax = proj[proj.length - 1];
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

  return (
    <div className="mx-auto max-w-[1240px]">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="mb-1 text-2xl font-semibold tracking-tight">
            Cloud cost estimate
          </h1>
          <p className="text-sm text-text-2">
            Production profile · derived from the generated Terraform
          </p>
        </div>
        <div className="flex gap-2 rounded-[10px] border border-border bg-surface p-1">
          {PROVIDERS.map((p) => (
            <button
              key={p}
              onClick={() => setProvider(p)}
              className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
                provider === p ? "bg-accent-soft text-accent" : "text-text-2"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        {/* Breakdown */}
        <Card className="!rounded-[15px] px-6 py-5">
          <div className="mb-5 flex items-baseline justify-between">
            <h3 className="text-sm font-semibold">
              Monthly breakdown · {provider} {d.region}
            </h3>
            <div>
              <span className="text-3xl font-bold tracking-tight">${d.total}</span>
              <span className="text-sm text-text-3">/mo</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {d.rows.map((c) => (
              <div key={c.name}>
                <div className="mb-1.5 flex justify-between text-[13px]">
                  <span className="flex items-center gap-2.5">
                    <span
                      className="h-2.5 w-2.5 rounded-[3px]"
                      style={{ background: c.color }}
                    />
                    {c.name}
                    <span className="text-xs text-text-3">{c.spec}</span>
                  </span>
                  <span className="font-mono text-text-2">${c.cost}</span>
                </div>
                <div className="h-[7px] overflow-hidden rounded bg-bg-elev">
                  <div
                    className="h-full rounded"
                    style={{
                      width: `${(c.cost / d.total) * 100}%`,
                      background: c.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Comparison + savings */}
        <div className="flex flex-col gap-4">
          <Card className="!rounded-[15px] px-5 py-5">
            <h3 className="mb-4 text-[13px] text-text-2">Provider comparison</h3>
            {PROVIDERS.map((p) => (
              <div key={p} className="mb-3.5 flex items-center gap-3">
                <span
                  className="w-[52px] text-[12.5px] font-semibold"
                  style={{ color: p === provider ? "var(--accent)" : "var(--text-2)" }}
                >
                  {p}
                </span>
                <div className="h-6 flex-1 overflow-hidden rounded-md bg-bg-elev">
                  <div
                    className="flex h-full items-center justify-end rounded-md pr-2 font-mono text-[11px] font-semibold text-white"
                    style={{
                      width: `${(DATA[p].total / COMPARE_MAX) * 100}%`,
                      background:
                        p === provider ? "var(--accent)" : "var(--surface-2)",
                    }}
                  >
                    ${DATA[p].total}
                  </div>
                </div>
              </div>
            ))}
          </Card>

          <div
            className="rounded-[15px] border px-5 py-5"
            style={{
              background:
                "linear-gradient(135deg,rgba(62,207,142,.12),rgba(51,214,200,.06))",
              borderColor: "rgba(62,207,142,.25)",
            }}
          >
            <h3 className="mb-2 text-[13px] font-semibold text-green">
              Savings opportunity
            </h3>
            <div className="text-2xl font-bold tracking-tight">
              $62<span className="text-[13px] font-medium text-text-3">/mo</span>
            </div>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-text-2">
              Single-AZ database in staging + a Spot node group saves ~15%. Ask the
              assistant to generate a staging workspace.
            </p>
          </div>
        </div>
      </div>

      {/* 12-month projection */}
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
                  background:
                    i === proj.length - 1 ? "var(--accent)" : "var(--surface-2)",
                }}
              />
              <span className="text-[9.5px] text-text-3">{months[i]}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
