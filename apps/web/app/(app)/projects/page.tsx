import { Card } from "@/components/ui/Card";

type Health = "ok" | "warn" | "danger";

const PROJECTS: {
  name: string;
  org: string;
  initial: string;
  tint: string;
  status: string;
  statusHealth: Health;
  tags: string[];
  health: number;
  healthColor: string;
  updated: string;
}[] = [
  { name: "orbit-api", org: "acme-labs", initial: "O", tint: "var(--accent)", status: "healthy", statusHealth: "ok", tags: ["Go", "Postgres", "gRPC"], health: 88, healthColor: "var(--green)", updated: "2h ago" },
  { name: "payments-svc", org: "acme-labs", initial: "P", tint: "var(--accent-2)", status: "healthy", statusHealth: "ok", tags: ["Go", "Stripe"], health: 82, healthColor: "var(--green)", updated: "5h ago" },
  { name: "web-dashboard", org: "acme-labs", initial: "W", tint: "var(--amber)", status: "review", statusHealth: "warn", tags: ["Next.js", "TypeScript"], health: 71, healthColor: "var(--amber)", updated: "1d ago" },
  { name: "ml-inference", org: "acme-labs", initial: "M", tint: "var(--green)", status: "healthy", statusHealth: "ok", tags: ["Python", "GPU"], health: 90, healthColor: "var(--green)", updated: "3h ago" },
  { name: "notifications", org: "acme-labs", initial: "N", tint: "var(--accent)", status: "healthy", statusHealth: "ok", tags: ["Node", "Redis"], health: 85, healthColor: "var(--green)", updated: "8h ago" },
  { name: "legacy-billing", org: "acme-labs", initial: "L", tint: "var(--red)", status: "at risk", statusHealth: "danger", tags: ["Ruby", "MySQL"], health: 54, healthColor: "var(--red)", updated: "6d ago" },
];

const STATUS_CLASS: Record<Health, string> = {
  ok: "bg-green-soft text-green",
  warn: "bg-amber-soft text-amber",
  danger: "bg-red-soft text-red",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[1240px]">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="mb-1 text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="text-sm text-text-2">
            6 repositories connected · acme-labs organization
          </p>
        </div>
        <button
          className="rounded-lg px-4 py-2 text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg,var(--accent),#6a58f5)" }}
        >
          + New project
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <Card
            key={p.name}
            className="!rounded-[15px] flex cursor-pointer flex-col gap-3.5 px-5 py-4 hover:border-border-strong"
          >
            <div className="flex items-center gap-2.5">
              <span
                className="grid h-[34px] w-[34px] flex-none place-items-center rounded-[9px] text-sm font-bold text-white"
                style={{ background: p.tint }}
              >
                {p.initial}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="text-[11.5px] text-text-3">{p.org}</div>
              </div>
              <span
                className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${STATUS_CLASS[p.statusHealth]}`}
              >
                {p.status}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-border bg-bg-elev px-2 py-0.5 text-[11px] text-text-2"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-border pt-3">
              <span
                className="flex items-center gap-1.5 text-xs"
                style={{ color: p.healthColor }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: p.healthColor }}
                />
                Health {p.health}
              </span>
              <span className="text-[11.5px] text-text-3">{p.updated}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
