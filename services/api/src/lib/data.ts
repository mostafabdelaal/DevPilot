// Sample data matching the prototype / handoff. Serves the API contract until the
// analysis pipeline + Postgres are wired in. Shapes are the source of truth for the client.
import type { Analysis, AnalysisStep, Project, Team, User } from "./types.js";

export const SAMPLE_USER: User = {
  id: "usr_dana",
  name: "Dana Reyes",
  email: "dana@acme-labs.io",
  avatarInitials: "DR",
  role: "owner",
};

export const SAMPLE_TEAM: Team = {
  id: "team_acme",
  name: "acme-labs",
  plan: "Team",
  seats: 5,
  usageThisMonth: 245,
  renewalDate: "2026-08-01",
};

export const SAMPLE_PROJECTS: Project[] = [
  { id: "prj_orbit", name: "orbit-api", org: "acme-labs", defaultBranch: "main", provider: "github", healthScore: 88, securityScore: 78, deployReadiness: 91, cloudReadiness: 82, lastAnalyzedAt: "2026-07-18T06:00:00Z", status: "healthy", tags: ["Go", "Postgres", "gRPC"], updatedAt: "2h ago" },
  { id: "prj_payments", name: "payments-svc", org: "acme-labs", defaultBranch: "main", provider: "github", healthScore: 82, securityScore: 80, deployReadiness: 85, cloudReadiness: 79, lastAnalyzedAt: "2026-07-18T03:00:00Z", status: "healthy", tags: ["Go", "Stripe"], updatedAt: "5h ago" },
  { id: "prj_web", name: "web-dashboard", org: "acme-labs", defaultBranch: "main", provider: "github", healthScore: 71, securityScore: 68, deployReadiness: 74, cloudReadiness: 70, lastAnalyzedAt: "2026-07-17T09:00:00Z", status: "review", tags: ["Next.js", "TypeScript"], updatedAt: "1d ago" },
  { id: "prj_legacy", name: "legacy-billing", org: "acme-labs", defaultBranch: "master", provider: "github", healthScore: 54, securityScore: 49, deployReadiness: 51, cloudReadiness: 45, lastAnalyzedAt: "2026-07-12T10:00:00Z", status: "at_risk", tags: ["Ruby", "MySQL"], updatedAt: "6d ago" },
];

export const SAMPLE_STEPS: AnalysisStep[] = [
  { title: "Cloning repository", detail: "Shallow clone in ephemeral sandbox", meta: "214 files · 3.2 MB", metaSeverity: "ok" },
  { title: "Detecting languages & frameworks", detail: "Language breakdown", meta: "Go 91% · Shell 6% · Dockerfile 3%", metaSeverity: "ok" },
  { title: "Mapping architecture", detail: "Service + dependency graph", meta: "3 external dependencies", metaSeverity: "ok" },
  { title: "Resolving dependencies", detail: "Module + version audit", meta: "2 outdated · 0 yanked", metaSeverity: "warn" },
  { title: "Scanning secrets & vulnerabilities", detail: "Trivy + gitleaks", meta: "1 high · 3 medium · 1 secret", metaSeverity: "danger" },
  { title: "Assessing cloud readiness", detail: "Deploy + scale checks", meta: "Score 82 / 100", metaSeverity: "warn" },
  { title: "Generating DevOps assets", detail: "Templating engine", meta: "11 files produced", metaSeverity: "ok" },
  { title: "Estimating cloud cost", detail: "AWS eu-west-1", meta: "≈ $412 / month", metaSeverity: "ok" },
];

export function sampleAnalysis(projectId: string, id: string): Analysis {
  return {
    id,
    projectId,
    ref: "main",
    status: "done",
    startedAt: "2026-07-18T06:00:00Z",
    finishedAt: "2026-07-18T06:01:12Z",
    progressPct: 100,
    steps: SAMPLE_STEPS,
  };
}
