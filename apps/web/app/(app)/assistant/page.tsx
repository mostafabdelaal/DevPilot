"use client";

import { useState } from "react";

type Msg = { role: "ai" | "user"; text: string };

const SUGGESTIONS = [
  "Why is the security score 78?",
  "Explain the generated Dockerfile",
  "How do I cut cloud cost?",
];

const REPLIES: Record<string, string> = {
  "Why is the security score 78?":
    "The score is held down by one high-severity finding (CVE-2024-2961 in the glibc base layer) and a hard-coded Postgres password in config/dev.yaml. Both are already fixed in the generated manifests — bump the base image and use the K8s Secret.",
  "Explain the generated Dockerfile":
    "It's a multi-stage build: a golang:1.22-alpine stage compiles a static binary, then a distroless/static:nonroot runtime stage copies just the binary. It runs as a non-root user and exposes :8080 — small, rootless, and CVE-minimal.",
  "How do I cut cloud cost?":
    "Biggest levers: use a Spot node group for non-critical workloads and run Single-AZ RDS in staging. Together that's ~15% (about $62/mo). I can generate a staging Terraform workspace with those settings.",
};

const DEFAULT_REPLY =
  "I have full context of orbit-api and its generated assets. Ask about the architecture, security findings, cost, or any generated file.";

export default function AssistantPage() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "I've analyzed orbit-api and generated 11 DevOps files. Ask me anything about the architecture, security, cost, or the manifests.",
    },
  ]);
  const [input, setInput] = useState("");

  function send(text: string) {
    const q = text.trim();
    if (!q) return;
    const reply = REPLIES[q] ?? DEFAULT_REPLY;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: q },
      { role: "ai", text: reply },
    ]);
    setInput("");
  }

  return (
    <div className="-m-6 flex h-[calc(100vh-58px)] flex-col">
      {/* Thread */}
      <div className="flex-1 overflow-y-auto py-7">
        <div className="mx-auto flex max-w-[760px] flex-col gap-5 px-6">
          {messages.map((m, i) =>
            m.role === "ai" ? (
              <div key={i} className="flex gap-3">
                <span
                  className="grid h-7 w-7 flex-none place-items-center rounded-lg text-[11px] font-bold text-white"
                  style={{
                    background: "linear-gradient(135deg,var(--accent),var(--accent-2))",
                  }}
                >
                  ▲
                </span>
                <div className="rounded-2xl rounded-tl-sm border border-border bg-surface px-4 py-3 text-[14px] leading-relaxed text-text-2">
                  {m.text}
                </div>
              </div>
            ) : (
              <div key={i} className="flex justify-end">
                <div
                  className="max-w-[80%] rounded-2xl rounded-tr-sm px-4 py-3 text-[14px] leading-relaxed text-white"
                  style={{ background: "var(--accent)" }}
                >
                  {m.text}
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-bg-elev py-4">
        <div className="mx-auto max-w-[760px] px-6">
          <div className="mb-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-lg border border-border bg-surface px-3 py-1.5 text-[12.5px] text-text-2 hover:bg-surface-2"
              >
                {q}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-end gap-2.5 rounded-[14px] border border-border-strong bg-surface py-2.5 pl-4 pr-2.5"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the architecture, infra, security…"
              className="flex-1 bg-transparent py-1.5 text-[14.5px] text-text outline-none placeholder:text-text-3"
            />
            <button
              type="submit"
              aria-label="Send"
              className="grid h-[38px] w-[38px] flex-none place-items-center rounded-[10px] text-white"
              style={{ background: "linear-gradient(135deg,var(--accent),#6a58f5)" }}
            >
              →
            </button>
          </form>
          <div className="mt-2.5 text-center text-[11px] text-text-3">
            DevPilot has full context of orbit-api and its generated assets
          </div>
        </div>
      </div>
    </div>
  );
}
