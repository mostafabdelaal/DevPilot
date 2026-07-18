"use client";

import { useState } from "react";

type Block = { type: "h2" | "p" | "code"; text: string };
type Doc = { id: string; label: string; group: string; section: string; body: Block[] };

const DOCS: Doc[] = [
  {
    id: "overview",
    label: "Overview",
    group: "Getting started",
    section: "Getting started",
    body: [
      { type: "p", text: "DevPilot AI connects to a GitHub repository, analyzes its stack, and generates production-ready DevOps artifacts — Dockerfiles, Kubernetes, Helm, Terraform, CI/CD, monitoring — with security findings and cloud-cost estimates." },
      { type: "h2", text: "How it works" },
      { type: "p", text: "Every analysis runs in an ephemeral sandbox. Source is shallow-cloned, scanned, and discarded — it is never persisted. Generated assets are editable, and edits open a pull request rather than pushing to your default branch." },
    ],
  },
  {
    id: "connect",
    label: "Connect a repository",
    group: "Getting started",
    section: "Getting started",
    body: [
      { type: "p", text: "Install the DevPilot GitHub App and select a repository. Access is read-only: repo contents, metadata, and commit history for secret scanning." },
      { type: "code", text: "# Scopes requested\nread: contents, metadata\nread: commit history\nwrite: pull requests" },
    ],
  },
  {
    id: "first-analysis",
    label: "First analysis",
    group: "Getting started",
    section: "Getting started",
    body: [
      { type: "p", text: "The first analysis runs automatically after you connect a repo. It streams progress through eight steps, from cloning to cost estimation." },
    ],
  },
  {
    id: "assets",
    label: "Generated assets",
    group: "Guides",
    section: "Guides",
    body: [
      { type: "p", text: "DevPilot produces a package of DevOps files tuned to your stack. Each file is validated and editable in the generator." },
      { type: "code", text: "docker build -t orbit-api .\nkubectl apply -f k8s/" },
    ],
  },
  {
    id: "deploying",
    label: "Deploying",
    group: "Guides",
    section: "Guides",
    body: [
      { type: "p", text: "Choose a target (EKS, GKE, or AKS) and environment, then deploy. Logs stream live through authenticate → apply → rollout → readiness. Failed readiness triggers an automatic rollback." },
    ],
  },
  {
    id: "api",
    label: "REST API",
    group: "Reference",
    section: "Reference",
    body: [
      { type: "p", text: "The API is versioned under /v1. Long-running jobs return an id and stream progress over SSE." },
      { type: "code", text: "POST /v1/projects/:id/analyses\nGET  /v1/analyses/:id/events   # SSE" },
    ],
  },
];

export default function DocsPage() {
  const [activeId, setActiveId] = useState(DOCS[0].id);
  const index = DOCS.findIndex((d) => d.id === activeId);
  const doc = DOCS[index];
  const prev = index > 0 ? DOCS[index - 1] : null;
  const next = index < DOCS.length - 1 ? DOCS[index + 1] : null;

  const groups = Array.from(new Set(DOCS.map((d) => d.group)));

  return (
    <div className="mx-auto max-w-[1180px]">
      <div className="grid grid-cols-1 items-start gap-9 lg:grid-cols-[236px_1fr]">
        {/* Nav */}
        <div className="lg:sticky lg:top-4">
          <div className="mb-4 flex items-center gap-2.5 border-b border-border pb-3.5">
            <span className="grid h-[30px] w-[30px] flex-none place-items-center rounded-lg bg-accent-soft text-accent">
              ▤
            </span>
            <span className="text-[13.5px] font-bold tracking-tight">Documentation</span>
          </div>
          {groups.map((g) => (
            <div key={g}>
              <div className="px-0 pb-1 pt-3 text-[10.5px] font-semibold uppercase tracking-wider text-text-3">
                {g}
              </div>
              {DOCS.filter((d) => d.group === g).map((d) => {
                const on = d.id === activeId;
                return (
                  <button
                    key={d.id}
                    onClick={() => setActiveId(d.id)}
                    className={`block w-full rounded-lg px-2.5 py-1.5 text-left text-[13px] transition-colors ${
                      on ? "bg-accent-soft text-text" : "text-text-2 hover:bg-surface"
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Article */}
        <div className="min-w-0">
          <div className="mb-4 flex items-center gap-2 text-xs text-text-3">
            <span>{doc.section}</span>
            <span>/</span>
            <span className="text-text-2">{doc.label}</span>
          </div>
          <article className="max-w-[720px] text-sm leading-[1.72] text-text-2">
            <h1 className="mb-4 text-2xl font-semibold tracking-tight text-text">
              {doc.label}
            </h1>
            {doc.body.map((b, i) => {
              if (b.type === "h2")
                return (
                  <h2 key={i} className="mb-2 mt-6 text-lg font-semibold text-text">
                    {b.text}
                  </h2>
                );
              if (b.type === "code")
                return (
                  <pre
                    key={i}
                    className="my-4 overflow-x-auto rounded-[11px] border border-border bg-bg-elev p-4 font-mono text-[12.5px] text-text-2"
                  >
                    {b.text}
                  </pre>
                );
              return (
                <p key={i} className="mb-3">
                  {b.text}
                </p>
              );
            })}
          </article>

          <div className="mt-9 flex max-w-[720px] justify-between gap-3.5 border-t border-border pt-5">
            {prev ? (
              <button
                onClick={() => setActiveId(prev.id)}
                className="rounded-[11px] border border-border bg-surface px-4 py-3 text-left hover:bg-surface-2"
              >
                <div className="text-[11px] text-text-3">← Previous</div>
                <div className="mt-0.5 text-[13px] font-semibold text-text">{prev.label}</div>
              </button>
            ) : (
              <span />
            )}
            {next && (
              <button
                onClick={() => setActiveId(next.id)}
                className="ml-auto rounded-[11px] border border-border bg-surface px-4 py-3 text-right hover:bg-surface-2"
              >
                <div className="text-[11px] text-text-3">Next →</div>
                <div className="mt-0.5 text-[13px] font-semibold text-text">{next.label}</div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
