import { Card } from "@/components/ui/Card";
import { apiGetOr } from "@/lib/api";
import type { Analysis, AnalysisStep, Severity } from "@/lib/api-types";

export const dynamic = "force-dynamic";

const FALLBACK_STEPS: AnalysisStep[] = [
  { title: "Cloning repository", detail: "Shallow clone in ephemeral sandbox", meta: "214 files · 3.2 MB", metaSeverity: "ok" },
  { title: "Detecting languages & frameworks", detail: "Language breakdown", meta: "Go 91% · Shell 6% · Dockerfile 3%", metaSeverity: "ok" },
  { title: "Mapping architecture", detail: "Service + dependency graph", meta: "3 external dependencies", metaSeverity: "ok" },
  { title: "Resolving dependencies", detail: "Module + version audit", meta: "2 outdated · 0 yanked", metaSeverity: "warn" },
  { title: "Scanning secrets & vulnerabilities", detail: "Trivy + gitleaks", meta: "1 high · 3 medium · 1 secret", metaSeverity: "danger" },
  { title: "Assessing cloud readiness", detail: "Deploy + scale checks", meta: "Score 82 / 100", metaSeverity: "warn" },
  { title: "Generating DevOps assets", detail: "Templating engine", meta: "11 files produced", metaSeverity: "ok" },
  { title: "Estimating cloud cost", detail: "AWS eu-west-1", meta: "≈ $412 / month", metaSeverity: "ok" },
];

const FALLBACK: Analysis = {
  id: "an_current",
  projectId: "prj_orbit",
  ref: "main",
  status: "done",
  startedAt: "2026-07-18T06:00:00Z",
  finishedAt: "2026-07-18T06:01:12Z",
  progressPct: 100,
  steps: FALLBACK_STEPS,
};

const STACK: { name: string; v: string; c: string }[] = [
  { name: "Go", v: "1.22", c: "var(--accent-2)" },
  { name: "Chi", v: "v5", c: "var(--accent)" },
  { name: "PostgreSQL", v: "16", c: "var(--green)" },
  { name: "Redis", v: "7", c: "var(--red)" },
  { name: "NATS", v: "2.10", c: "var(--amber)" },
  { name: "gRPC / Buf", v: "", c: "var(--accent-2)" },
];

const META_CLASS: Record<Severity, string> = {
  ok: "bg-green-soft text-green",
  warn: "bg-amber-soft text-amber",
  danger: "bg-red-soft text-red",
};

export default async function AnalysisPage() {
  const analysis = await apiGetOr<Analysis>("/v1/analyses/an_current", FALLBACK);
  const steps = analysis.steps;

  return (
    <div className="mx-auto max-w-[1240px]">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <div className="mb-1 flex items-center gap-2.5">
            <h1 className="text-2xl font-semibold tracking-tight">
              acme-labs/orbit-api
            </h1>
            <span className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-text-3">
              {analysis.ref}
            </span>
          </div>
          <p className="text-sm text-text-2">
            Go order-fulfilment service · 38 modules · 214 files
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-border-strong bg-surface px-4 py-2 text-sm font-semibold hover:bg-surface-2">
          Re-run
        </button>
      </div>

      {/* Progress */}
      <div className="mb-4 flex items-center gap-4 rounded-card border border-border bg-surface px-5 py-3.5">
        <div className="flex-1">
          <div className="mb-2 flex justify-between text-xs">
            <span className="text-text-2">
              {analysis.status === "done" ? "Analysis complete" : "Analyzing…"}
            </span>
            <span className="font-mono text-text-3">{analysis.progressPct}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded bg-border-strong">
            <div
              className="h-full rounded"
              style={{
                width: `${analysis.progressPct}%`,
                background: "linear-gradient(90deg,var(--accent),var(--accent-2))",
              }}
            />
          </div>
        </div>
        <button
          className="whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg,var(--accent),#6a58f5)" }}
        >
          View 11 generated files →
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_1fr]">
        {/* Timeline */}
        <Card className="!rounded-[15px] px-6 py-5">
          <h3 className="mb-4 text-[11px] font-medium uppercase tracking-wider text-text-2">
            Analysis timeline
          </h3>
          {steps.map((s, i) => (
            <div key={s.title} className="flex gap-3.5">
              <div className="flex flex-col items-center">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-green text-[9px] text-bg">
                  ✓
                </span>
                {i < steps.length - 1 && (
                  <span className="min-h-[14px] w-0.5 flex-1 bg-border-strong" />
                )}
              </div>
              <div className="flex-1 pb-5">
                <div className="text-sm font-semibold">{s.title}</div>
                <div className="mt-0.5 text-xs text-text-2">{s.detail}</div>
                {s.meta && (
                  <span
                    className={`mt-1.5 inline-block rounded px-1.5 py-0.5 text-[11px] ${META_CLASS[s.metaSeverity]}`}
                  >
                    {s.meta}
                  </span>
                )}
              </div>
            </div>
          ))}
        </Card>

        {/* Detection */}
        <div className="flex flex-col gap-4">
          <Card className="!rounded-[15px] px-5 py-5">
            <h3 className="mb-3.5 text-[11px] font-medium uppercase tracking-wider text-text-2">
              Detected stack
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {STACK.map((t) => (
                <span
                  key={t.name}
                  className="flex items-center gap-2 rounded-lg border border-border bg-bg-elev px-3 py-1.5 text-xs"
                >
                  <span className="h-2 w-2 rounded-sm" style={{ background: t.c }} />
                  {t.name}
                  {t.v && <span className="text-text-3">{t.v}</span>}
                </span>
              ))}
            </div>
          </Card>

          <Card className="!rounded-[15px] px-5 py-5">
            <h3 className="mb-3 text-[11px] font-medium uppercase tracking-wider text-text-2">
              AI architecture summary
            </h3>
            <div className="flex flex-col gap-3">
              <p className="text-[13px] leading-relaxed text-text-2">
                orbit-api is a stateless Go service exposing a REST + gRPC API for
                order fulfilment. It reads and writes to a single Postgres primary,
                caches hot inventory in Redis, and publishes events to an internal
                NATS stream.
              </p>
              <p className="text-[13px] leading-relaxed text-text-2">
                The service is{" "}
                <span className="text-text">horizontally scalable</span> and
                cloud-ready with two blockers: hard-coded connection strings and a
                missing readiness probe. Both are fixed in the generated manifests.
              </p>
              <button className="self-start rounded-lg border border-accent-border bg-accent-soft px-3 py-2 text-xs font-semibold text-accent">
                Ask the assistant about this →
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
