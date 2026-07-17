import { Card } from "@/components/ui/Card";

type DStatus = "succeeded" | "failed" | "rolled_back";

const STATUS_META: Record<DStatus, { label: string; cls: string }> = {
  succeeded: { label: "succeeded", cls: "bg-green-soft text-green" },
  failed: { label: "failed", cls: "bg-red-soft text-red" },
  rolled_back: { label: "rolled back", cls: "bg-amber-soft text-amber" },
};

const DEPLOYS: {
  status: DStatus;
  version: string;
  commit: string;
  msg: string;
  target: string;
  who: string;
  byName: string;
  avatarBg: string;
  dur: string;
  when: string;
}[] = [
  { status: "succeeded", version: "v1.4.0", commit: "a3f9c21", msg: "add readiness probe", target: "EKS · production", who: "DR", byName: "Dana Reyes", avatarBg: "var(--accent)", dur: "42s", when: "2h ago" },
  { status: "succeeded", version: "v1.3.9", commit: "7b1e004", msg: "bump base image", target: "EKS · production", who: "CI", byName: "ci-bot", avatarBg: "var(--surface-2)", dur: "39s", when: "8h ago" },
  { status: "rolled_back", version: "v1.3.8", commit: "e22ac7d", msg: "cache layer refactor", target: "EKS · production", who: "JM", byName: "Jae Mercer", avatarBg: "var(--accent-2)", dur: "1m 12s", when: "1d ago" },
  { status: "succeeded", version: "v1.3.7", commit: "9c40b1a", msg: "add NATS consumer", target: "EKS · staging", who: "PL", byName: "Priya Lakshmi", avatarBg: "var(--green)", dur: "35s", when: "2d ago" },
  { status: "failed", version: "v1.3.6", commit: "1af8823", msg: "migrate to Chi v5", target: "EKS · staging", who: "TO", byName: "Tom Okafor", avatarBg: "var(--amber)", dur: "18s", when: "3d ago" },
  { status: "succeeded", version: "v1.3.5", commit: "5de1170", msg: "initial cutover", target: "EKS · production", who: "DR", byName: "Dana Reyes", avatarBg: "var(--accent)", dur: "48s", when: "5d ago" },
];

const COLS = "grid-cols-[130px_1fr_150px_130px_110px_90px]";

export default function HistoryPage() {
  return (
    <div className="mx-auto max-w-[1240px]">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="mb-1 text-2xl font-semibold tracking-tight">
            Deployment history
          </h1>
          <p className="text-sm text-text-2">
            orbit-api · 42 deployments · 98.4% success rate
          </p>
        </div>
        <button
          className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg,var(--accent),#6a58f5)" }}
        >
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
        {DEPLOYS.map((d) => {
          const m = STATUS_META[d.status];
          return (
            <div
              key={d.commit}
              className={`grid ${COLS} items-center border-b border-border px-5 py-3.5 last:border-0`}
            >
              <span>
                <span className={`rounded px-2 py-0.5 text-[11px] font-semibold ${m.cls}`}>
                  {m.label}
                </span>
              </span>
              <div className="min-w-0">
                <div className="font-mono text-[12.5px] font-semibold">{d.version}</div>
                <div className="truncate font-mono text-[11.5px] text-text-3">
                  {d.commit} · {d.msg}
                </div>
              </div>
              <span className="text-[12.5px] text-text-2">{d.target}</span>
              <span className="flex items-center gap-2 text-[12.5px] text-text-2">
                <span
                  className="grid h-5 w-5 place-items-center rounded-full text-[9px] font-bold text-white"
                  style={{ background: d.avatarBg }}
                >
                  {d.who}
                </span>
                {d.byName}
              </span>
              <span className="font-mono text-xs text-text-2">{d.dur}</span>
              <span className="text-[11.5px] text-text-3">{d.when}</span>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
