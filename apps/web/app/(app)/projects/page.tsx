import { Card } from "@/components/ui/Card";
import { apiGetOr } from "@/lib/api";
import type { Project } from "@/lib/api-types";

// Fetch live from the API each request; fall back to sample data when the API is down.
export const dynamic = "force-dynamic";

const FALLBACK: Project[] = [
  { id: "prj_orbit", name: "orbit-api", org: "acme-labs", defaultBranch: "main", provider: "github", healthScore: 88, securityScore: 78, deployReadiness: 91, cloudReadiness: 82, lastAnalyzedAt: null, status: "healthy", tags: ["Go", "Postgres", "gRPC"], updatedAt: "2h ago" },
  { id: "prj_payments", name: "payments-svc", org: "acme-labs", defaultBranch: "main", provider: "github", healthScore: 82, securityScore: 80, deployReadiness: 85, cloudReadiness: 79, lastAnalyzedAt: null, status: "healthy", tags: ["Go", "Stripe"], updatedAt: "5h ago" },
  { id: "prj_web", name: "web-dashboard", org: "acme-labs", defaultBranch: "main", provider: "github", healthScore: 71, securityScore: 68, deployReadiness: 74, cloudReadiness: 70, lastAnalyzedAt: null, status: "review", tags: ["Next.js", "TypeScript"], updatedAt: "1d ago" },
  { id: "prj_ml", name: "ml-inference", org: "acme-labs", defaultBranch: "main", provider: "github", healthScore: 90, securityScore: 84, deployReadiness: 88, cloudReadiness: 86, lastAnalyzedAt: null, status: "healthy", tags: ["Python", "GPU"], updatedAt: "3h ago" },
  { id: "prj_notif", name: "notifications", org: "acme-labs", defaultBranch: "main", provider: "github", healthScore: 85, securityScore: 82, deployReadiness: 87, cloudReadiness: 83, lastAnalyzedAt: null, status: "healthy", tags: ["Node", "Redis"], updatedAt: "8h ago" },
  { id: "prj_legacy", name: "legacy-billing", org: "acme-labs", defaultBranch: "master", provider: "github", healthScore: 54, securityScore: 49, deployReadiness: 51, cloudReadiness: 45, lastAnalyzedAt: null, status: "at_risk", tags: ["Ruby", "MySQL"], updatedAt: "6d ago" },
];

const TINTS = ["var(--accent)", "var(--accent-2)", "var(--amber)", "var(--green)", "var(--accent)", "var(--red)"];

const STATUS_LABEL: Record<Project["status"], string> = {
  healthy: "healthy",
  review: "review",
  at_risk: "at risk",
};

const STATUS_CLASS: Record<Project["status"], string> = {
  healthy: "bg-green-soft text-green",
  review: "bg-amber-soft text-amber",
  at_risk: "bg-red-soft text-red",
};

function healthColor(v: number): string {
  if (v >= 80) return "var(--green)";
  if (v >= 60) return "var(--amber)";
  return "var(--red)";
}

export default async function ProjectsPage() {
  const projects = await apiGetOr<Project[]>("/v1/projects", FALLBACK);

  return (
    <div className="mx-auto max-w-[1240px]">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="mb-1 text-2xl font-semibold tracking-tight">Projects</h1>
          <p className="text-sm text-text-2">
            {projects.length} repositories connected · acme-labs organization
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
        {projects.map((p, i) => {
          const color = healthColor(p.healthScore);
          return (
            <Card
              key={p.id}
              className="!rounded-[15px] flex cursor-pointer flex-col gap-3.5 px-5 py-4 hover:border-border-strong"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="grid h-[34px] w-[34px] flex-none place-items-center rounded-[9px] text-sm font-bold text-white"
                  style={{ background: TINTS[i % TINTS.length] }}
                >
                  {p.name[0]?.toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold">{p.name}</div>
                  <div className="text-[11.5px] text-text-3">{p.org}</div>
                </div>
                <span
                  className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${STATUS_CLASS[p.status]}`}
                >
                  {STATUS_LABEL[p.status]}
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
                <span className="flex items-center gap-1.5 text-xs" style={{ color }}>
                  <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                  Health {p.healthScore}
                </span>
                <span className="text-[11.5px] text-text-3">{p.updatedAt}</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
