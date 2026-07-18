import { Card } from "@/components/ui/Card";
import { apiGetOr } from "@/lib/api";
import type { Deployment } from "@/lib/api-types";

export const dynamic = "force-dynamic";

const FALLBACK: Deployment[] = [
  { status: "succeeded", version: "v1.4.0", commit: "a3f9c21", message: "add readiness probe", target: "EKS · production", actor: "Dana Reyes", actorInitials: "DR", duration: "42s", when: "2h ago" },
  { status: "succeeded", version: "v1.3.9", commit: "7b1e004", message: "bump base image", target: "EKS · production", actor: "ci-bot", actorInitials: "CI", duration: "39s", when: "8h ago" },
  { status: "rolled_back", version: "v1.3.8", commit: "e22ac7d", message: "cache layer refactor", target: "EKS · production", actor: "Jae Mercer", actorInitials: "JM", duration: "1m 12s", when: "1d ago" },
  { status: "failed", version: "v1.3.6", commit: "1af8823", message: "migrate to Chi v5", target: "EKS · staging", actor: "Tom Okafor", actorInitials: "TO", duration: "18s", when: "3d ago" },
];

const STATUS_META: Record<Deployment["status"], { label: string; cls: string }> = {
  succeeded: { label: "succeeded", cls: "bg-green-soft text-green" },
  failed: { label: "failed", cls: "bg-red-soft text-red" },
  rolled_back: { label: "rolled back", cls: "bg-amber-soft text-amber" },
};

const AVATAR_BG = ["var(--accent)", "var(--surface-2)", "var(--accent-2)", "var(--green)", "var(--amber)"];
const COLS = "grid-cols-[130px_1fr_150px_130px_110px_90px]";

export default async function HistoryPage() {
  const deploys = await apiGetOr<Deployment[]>(
    "/v1/projects/prj_orbit/deployments",
    FALLBACK,
  );

  return (
    <div className="mx-auto max-w-[1240px]">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="mb-1 text-2xl font-semibold tracking-tight">Deployment history</h1>
          <p className="text-sm text-text-2">
            orbit-api · {deploys.length} shown · 98.4% success rate
          </p>
        </div>
        <button className="rounded-lg px-4 py-2 text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg,var(--accent),#6a58f5)" }}>
          New deployment
        </button>
      </div>

      <Card className="!rounded-[15px] overflow-hidden !p-0">
        <div className={`grid ${COLS} border-b border-border px-5 py-3 text-[11px] uppercase tracking-wider text-text-3`}>
          <span>Status</span>
          <span>Version / commit</span>
          <span>Target</span>
          <span>Triggered by</span>
          <span>Duration</span>
          <span>When</span>
        </div>
        {deploys.map((d, i) => {
          const m = STATUS_META[d.status];
          return (
            <div key={d.commit} className={`grid ${COLS} items-center border-b border-border px-5 py-3.5 last:border-0`}>
              <span>
                <span className={`rounded px-2 py-0.5 text-[11px] font-semibold ${m.cls}`}>{m.label}</span>
              </span>
              <div className="min-w-0">
                <div className="font-mono text-[12.5px] font-semibold">{d.version}</div>
                <div className="truncate font-mono text-[11.5px] text-text-3">{d.commit} · {d.message}</div>
              </div>
              <span className="text-[12.5px] text-text-2">{d.target}</span>
              <span className="flex items-center gap-2 text-[12.5px] text-text-2">
                <span className="grid h-5 w-5 place-items-center rounded-full text-[9px] font-bold text-white" style={{ background: AVATAR_BG[i % AVATAR_BG.length] }}>
                  {d.actorInitials}
                </span>
                {d.actor}
              </span>
              <span className="font-mono text-xs text-text-2">{d.duration}</span>
              <span className="text-[11.5px] text-text-3">{d.when}</span>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
