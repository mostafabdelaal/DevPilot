"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/Card";

type Status = "idle" | "running" | "done";
type LogLine = { ts: string; text: string; color: string };

const TARGETS = [
  { id: "eks", name: "Amazon EKS", sub: "AWS · eu-west-1", initial: "E", tint: "var(--accent)" },
  { id: "gke", name: "Google GKE", sub: "GCP · europe-west1", initial: "G", tint: "var(--accent-2)" },
  { id: "aks", name: "Azure AKS", sub: "Azure · west-europe", initial: "A", tint: "var(--amber)" },
];

const SCRIPT: { text: string; color: string; at: number }[] = [
  { text: "Authenticating to cluster…", color: "var(--text-2)", at: 200 },
  { text: "✓ Authenticated as ci@acme-labs", color: "var(--green)", at: 900 },
  { text: "Applying manifests (deployment, service, ingress)…", color: "var(--text-2)", at: 1500 },
  { text: "✓ deployment.apps/orbit-api configured", color: "var(--green)", at: 2300 },
  { text: "Waiting for rollout…", color: "var(--text-2)", at: 2800 },
  { text: "✓ 3/3 replicas ready", color: "var(--green)", at: 3800 },
  { text: "Running readiness probes…", color: "var(--text-2)", at: 4300 },
  { text: "✓ readiness OK · https://orbit.acme-labs.dev", color: "var(--green)", at: 5100 },
  { text: "Deployment succeeded in 5.3s", color: "var(--accent)", at: 5400 },
];

const STEPS = ["Configure", "Authenticate", "Apply", "Complete"];

function clock() {
  const d = new Date();
  return d.toLocaleTimeString("en-GB", { hour12: false });
}

export default function DeployPage() {
  const [target, setTarget] = useState("eks");
  const [status, setStatus] = useState<Status>("idle");
  const [log, setLog] = useState<LogLine[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
      if (tick.current) clearInterval(tick.current);
    };
  }, []);

  function start() {
    timers.current.forEach(clearTimeout);
    if (tick.current) clearInterval(tick.current);
    setStatus("running");
    setLog([]);
    setElapsed(0);

    const t0 = Date.now();
    tick.current = setInterval(
      () => setElapsed((Date.now() - t0) / 1000),
      100,
    );

    SCRIPT.forEach((line) => {
      timers.current.push(
        setTimeout(() => {
          setLog((prev) => [...prev, { ts: clock(), text: line.text, color: line.color }]);
        }, line.at),
      );
    });
    timers.current.push(
      setTimeout(() => {
        setStatus("done");
        if (tick.current) clearInterval(tick.current);
      }, SCRIPT[SCRIPT.length - 1].at + 200),
    );
  }

  const stepIndex = status === "idle" ? 0 : status === "running" ? 2 : 3;
  const dotColor =
    status === "running"
      ? "var(--amber)"
      : status === "done"
        ? "var(--green)"
        : "var(--text-3)";
  const statusLabel =
    status === "running" ? "Deploying…" : status === "done" ? "Deployed" : "Ready to deploy";

  return (
    <div className="mx-auto max-w-[1180px]">
      <div className="mb-6">
        <h1 className="mb-1 text-2xl font-semibold tracking-tight">Deploy orbit-api</h1>
        <p className="text-sm text-text-2">
          Roll out the generated package to your cluster
        </p>
      </div>

      {/* Stepper */}
      <div className="mb-6 flex items-center">
        {STEPS.map((s, i) => {
          const done = i <= stepIndex;
          return (
            <div key={s} className="flex flex-1 items-center last:flex-none">
              <div className="flex items-center gap-2.5">
                <span
                  className="grid h-6 w-6 flex-none place-items-center rounded-full text-[11px] font-bold"
                  style={{
                    background: done ? "var(--accent)" : "var(--surface-2)",
                    color: done ? "#fff" : "var(--text-3)",
                  }}
                >
                  {i + 1}
                </span>
                <div
                  className="text-[13px] font-semibold"
                  style={{ color: done ? "var(--text)" : "var(--text-3)" }}
                >
                  {s}
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <span
                  className="mx-4 h-0.5 flex-1"
                  style={{ background: i < stepIndex ? "var(--accent)" : "var(--border-strong)" }}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.3fr]">
        {/* Config */}
        <Card className="!rounded-[15px] px-6 py-5">
          <h3 className="mb-4 text-sm font-semibold">Target &amp; configuration</h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-2 block text-xs text-text-3">Deployment target</label>
              <div className="flex flex-col gap-2">
                {TARGETS.map((t) => {
                  const on = t.id === target;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTarget(t.id)}
                      className={`flex items-center gap-3 rounded-[10px] border px-3 py-2.5 text-left transition-colors ${
                        on ? "border-accent bg-accent-soft" : "border-border hover:bg-surface-2"
                      }`}
                    >
                      <span
                        className="grid h-[30px] w-[30px] flex-none place-items-center rounded-lg text-xs font-bold text-white"
                        style={{ background: t.tint }}
                      >
                        {t.initial}
                      </span>
                      <span className="flex-1">
                        <span className="block text-[13px] font-semibold">{t.name}</span>
                        <span className="block text-[11.5px] text-text-3">{t.sub}</span>
                      </span>
                      <span
                        className="h-4 w-4 rounded-full border-2"
                        style={{
                          borderColor: on ? "var(--accent)" : "var(--border-strong)",
                          background: on ? "var(--accent)" : "transparent",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-2 block text-xs text-text-3">Environment</label>
                <div className="flex items-center justify-between rounded-[9px] border border-border-strong bg-bg-elev px-3 py-2.5 text-[13px]">
                  production<span className="text-text-3">▾</span>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs text-text-3">Replicas</label>
                <div className="rounded-[9px] border border-border-strong bg-bg-elev px-3 py-2.5 font-mono text-[13px]">
                  3
                </div>
              </div>
            </div>

            <button
              onClick={start}
              disabled={status === "running"}
              className="w-full rounded-[11px] py-3 text-sm font-semibold text-white disabled:opacity-60"
              style={{ background: "linear-gradient(135deg,var(--accent),#6a58f5)" }}
            >
              {status === "running"
                ? "Deploying…"
                : status === "done"
                  ? "Deploy again"
                  : "Deploy to production"}
            </button>
          </div>
        </Card>

        {/* Live log */}
        <div
          className="flex flex-col overflow-hidden rounded-[15px] border border-border"
          style={{ background: "#0b0b0f" }}
        >
          <div className="flex items-center gap-2.5 border-b border-border bg-bg-elev px-4 py-3">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: dotColor, boxShadow: `0 0 8px ${dotColor}` }}
            />
            <span className="text-[13px] font-semibold">{statusLabel}</span>
            <div className="flex-1" />
            <span className="font-mono text-[11.5px] text-text-3">
              {elapsed.toFixed(1)}s
            </span>
          </div>
          <div className="max-h-[400px] min-h-[300px] flex-1 overflow-y-auto px-4 py-4 font-mono text-xs leading-[1.85]">
            {log.length === 0 && (
              <div className="text-text-3">
                Waiting to start… choose a target and deploy.
              </div>
            )}
            {log.map((l, i) => (
              <div key={i} className="flex gap-2.5">
                <span className="flex-none text-text-3">{l.ts}</span>
                <span className="whitespace-pre-wrap" style={{ color: l.color }}>
                  {l.text}
                </span>
              </div>
            ))}
            {status === "running" && <div className="text-accent">▍</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
