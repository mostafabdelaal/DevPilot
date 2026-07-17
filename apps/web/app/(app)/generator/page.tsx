"use client";

import { useState } from "react";
import { GEN_FILES } from "@/lib/generator-data";

function lineClass(t: string): string {
  const s = t.trimStart();
  if (s.startsWith("#") || s.startsWith("//")) return "text-text-3";
  return "text-text-2";
}

export default function GeneratorPage() {
  const [active, setActive] = useState(0);
  const file = GEN_FILES[active];

  return (
    <div className="-m-6 grid h-[calc(100vh-58px)] grid-cols-[270px_1fr]">
      {/* File list */}
      <div className="overflow-y-auto border-r border-border bg-bg-elev p-3">
        <div className="px-2 pb-2.5 pt-1.5 text-[11px] uppercase tracking-widest text-text-3">
          Generated package
        </div>
        {GEN_FILES.map((f, i) => {
          const on = i === active;
          return (
            <button
              key={f.name}
              onClick={() => setActive(i)}
              className={`mb-1 flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-colors ${
                on ? "bg-accent-soft" : "hover:bg-surface"
              }`}
            >
              <span
                className="grid h-[26px] w-[26px] flex-none place-items-center rounded-[7px] text-[11px] font-bold"
                style={{ background: f.tint, color: f.fg }}
              >
                {f.name.split("/").pop()?.[0]?.toUpperCase()}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12.5px] font-semibold">
                  {f.name}
                </span>
                <span className="block text-[11px] text-text-3">{f.size}</span>
              </span>
            </button>
          );
        })}
        <button className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-[10px] bg-text px-3 py-2.5 text-[13px] font-semibold text-bg">
          Download all (.zip)
        </button>
      </div>

      {/* Code viewer */}
      <div className="flex min-w-0 flex-col" style={{ background: "#0b0b0f" }}>
        <div className="flex items-center gap-3.5 border-b border-border bg-bg-elev px-5 py-3">
          <span className="font-mono text-[13px] font-semibold">{file.name}</span>
          <span className="text-[11.5px] text-text-3">{file.desc}</span>
          <div className="flex-1" />
          <span className="flex items-center gap-1.5 text-[11.5px] text-green">
            ✓ Validated
          </span>
        </div>

        <div className="flex-1 overflow-auto py-4 font-mono text-[12.5px] leading-[1.75]">
          {file.lines.map((t, i) => (
            <div key={i} className="flex px-5">
              <span className="w-[34px] flex-none select-none pr-4 text-right text-text-3 opacity-60">
                {i + 1}
              </span>
              <span className={`whitespace-pre ${lineClass(t)}`}>{t}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 border-t border-border bg-bg-elev px-5 py-3">
          <span className="text-[12.5px] text-text-2">{file.note}</span>
          <div className="flex-1" />
          <button className="rounded-lg border border-accent-border bg-accent-soft px-3 py-1.5 text-xs font-semibold text-accent">
            Explain this file
          </button>
        </div>
      </div>
    </div>
  );
}
