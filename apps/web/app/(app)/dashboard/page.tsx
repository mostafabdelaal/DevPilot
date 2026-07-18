import { Card } from "@/components/ui/Card";
import { Gauge } from "@/components/ui/Gauge";
import { apiGetOr } from "@/lib/api";
import type { Project } from "@/lib/api-types";

export const dynamic = "force-dynamic";

const FALLBACK: Project = {
  id: "prj_orbit",
  name: "orbit-api",
  org: "acme-labs",
  defaultBranch: "main",
  provider: "github",
  healthScore: 88,
  securityScore: 78,
  deployReadiness: 91,
  cloudReadiness: 82,
  lastAnalyzedAt: null,
  status: "healthy",
  tags: ["Go", "Postgres", "gRPC"],
  updatedAt: "2h ago",
};

export default async function DashboardPage() {
  const p = await apiGetOr<Project>("/v1/projects/prj_orbit", FALLBACK);

  const scores = [
    { label: "Health", value: p.healthScore },
    { label: "Security", value: p.securityScore },
    { label: "Deploy readiness", value: p.deployReadiness },
    { label: "Cloud readiness", value: p.cloudReadiness },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-text-2">
          {p.org} / {p.name} · {p.defaultBranch}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {scores.map((s) => (
          <Gauge key={s.label} label={s.label} value={s.value} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="text-sm font-medium">Generated assets</div>
          <p className="mt-2 text-sm text-text-2">
            11 files produced · 2.4 MB — Dockerfile, Compose, Kubernetes, Helm,
            Terraform, CI/CD.
          </p>
        </Card>
        <Card>
          <div className="text-sm font-medium">Estimated cost</div>
          <div className="mt-2 text-2xl font-semibold">
            ~$412<span className="ml-1 text-sm text-text-2">/mo</span>
          </div>
          <p className="mt-1 text-xs text-text-3">AWS · eu-west-1</p>
        </Card>
      </div>

      <Card>
        <div className="text-sm font-medium">Recommendations</div>
        <ul className="mt-2 space-y-1 text-sm text-text-2">
          <li>· 1 high-severity CVE in glibc base layer — bump base image.</li>
          <li>· Hard-coded secret in config/dev.yaml — move to secret manager.</li>
          <li>· 2 outdated dependencies — review upgrade path.</li>
        </ul>
      </Card>
    </div>
  );
}
