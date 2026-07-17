import { Card, StatTile } from "@/components/ui/Card";

/**
 * Dashboard — scaffold. Score tiles use plain numbers for now; the prototype's
 * radial score gauges and cost bars will be rebuilt with the dataviz approach
 * during the dashboard sprint.
 */
export default function DashboardPage() {
  const scores = [
    { label: "Health", value: 88 },
    { label: "Security", value: 74 },
    { label: "Deploy readiness", value: 91 },
    { label: "Cloud readiness", value: 82 },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-text-2">acme-labs / orbit-api · main</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {scores.map((s) => (
          <StatTile key={s.label} label={s.label} value={s.value} suffix="/ 100" />
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
