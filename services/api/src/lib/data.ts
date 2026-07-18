// Sample data matching the prototype / handoff. Serves the API contract until the
// analysis pipeline + Postgres are wired in. Shapes are the source of truth for the client.
import type {
  Analysis,
  AnalysisStep,
  CostReport,
  GeneratedAsset,
  Project,
  SecurityReport,
  Team,
  User,
} from "./types.js";

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

export const SAMPLE_MEMBERS: User[] = [
  { id: "usr_dana", name: "Dana Reyes", email: "dana@acme-labs.io", avatarInitials: "DR", role: "owner" },
  { id: "usr_jae", name: "Jae Mercer", email: "jae@acme-labs.io", avatarInitials: "JM", role: "admin" },
  { id: "usr_priya", name: "Priya Lakshmi", email: "priya@acme-labs.io", avatarInitials: "PL", role: "member" },
  { id: "usr_tom", name: "Tom Okafor", email: "tom@acme-labs.io", avatarInitials: "TO", role: "member" },
  { id: "usr_ci", name: "CI service account", email: "ci@acme-labs.io", avatarInitials: "CI", role: "bot" },
];

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

export const SAMPLE_SECURITY: SecurityReport = {
  score: 78,
  verdict: "Needs review",
  severities: { high: 1, medium: 3, low: 5 },
  stats: [
    { label: "Total findings", value: "9", sub: "across 3 severities" },
    { label: "Auto-remediated", value: "7", sub: "fixed in manifests" },
    { label: "Needs review", value: "2", sub: "manual action" },
  ],
  findings: [
    { severity: "HIGH", cve: "CVE-2024-2961", title: "glibc iconv() buffer overflow in base layer", pkg: "glibc 2.35", fix: "2.39", status: "Open" },
    { severity: "MEDIUM", cve: "CVE-2023-44487", title: "HTTP/2 Rapid Reset denial of service", pkg: "golang.org/x/net", fix: "0.17.0", status: "Patched" },
    { severity: "MEDIUM", cve: "CVE-2024-24790", title: "net/netip mapped IPv4 mishandling", pkg: "stdlib go1.22", fix: "go1.22.4", status: "Patched" },
    { severity: "MEDIUM", cve: "CVE-2023-39325", title: "net/http HTTP/2 stream DoS", pkg: "stdlib", fix: "go1.21.3", status: "Patched" },
  ],
  secret: {
    title: "Hard-coded Postgres password",
    location: "config/dev.yaml : 14",
    value: "POSTGRES_PASSWORD=orbit",
    remediated: true,
  },
};

export const SAMPLE_COST: CostReport = {
  providers: [
    { provider: "AWS", region: "eu-west-1", total: 412, rows: [
      { name: "EKS control plane", spec: "1 cluster", cost: 73 },
      { name: "EC2 nodes", spec: "3× t4g.medium", cost: 180 },
      { name: "RDS Postgres", spec: "Multi-AZ db.t4g.medium", cost: 124 },
      { name: "ALB", spec: "1 load balancer", cost: 22 },
      { name: "CloudWatch", spec: "logs + metrics", cost: 13 },
    ]},
    { provider: "GCP", region: "europe-west1", total: 398, rows: [
      { name: "GKE control plane", spec: "1 cluster", cost: 74 },
      { name: "Compute nodes", spec: "3× e2-medium", cost: 164 },
      { name: "Cloud SQL", spec: "HA Postgres", cost: 118 },
      { name: "Load Balancer", spec: "1 forwarding rule", cost: 23 },
      { name: "Cloud Monitoring", spec: "logs + metrics", cost: 19 },
    ]},
    { provider: "Azure", region: "west-europe", total: 431, rows: [
      { name: "AKS control plane", spec: "1 cluster", cost: 77 },
      { name: "VM nodes", spec: "3× B2ms", cost: 192 },
      { name: "Postgres Flexible", spec: "HA zone-redundant", cost: 120 },
      { name: "App Gateway", spec: "1 gateway", cost: 28 },
      { name: "Azure Monitor", spec: "logs + metrics", cost: 14 },
    ]},
  ],
  savings: { amount: 62, note: "Single-AZ database in staging + a Spot node group saves ~15%. Ask the assistant to generate a staging workspace." },
};

export const SAMPLE_ASSETS: GeneratedAsset[] = [
  { key: "dockerfile", name: "Dockerfile", size: "0.9 KB", language: "docker", desc: "Multi-stage build · distroless runtime", note: "Non-root user and pinned base image applied automatically.", content: [
    "# syntax=docker/dockerfile:1",
    "FROM golang:1.22-alpine AS build",
    "WORKDIR /src",
    "COPY go.mod go.sum ./",
    "RUN go mod download",
    "COPY . .",
    "RUN CGO_ENABLED=0 go build -o /orbit ./cmd/api",
    "",
    "FROM gcr.io/distroless/static:nonroot",
    "COPY --from=build /orbit /orbit",
    "USER nonroot:nonroot",
    "EXPOSE 8080",
    'ENTRYPOINT ["/orbit"]',
  ].join("\n") },
  { key: "compose", name: "docker-compose.yml", size: "0.7 KB", language: "yaml", desc: "Local dev stack", note: "Postgres and Redis wired for local development.", content: [
    "services:", "  api:", "    build: .", '    ports: ["8080:8080"]', "    depends_on: [db, cache]",
    "  db:", "    image: postgres:16-alpine", "  cache:", "    image: redis:7-alpine",
  ].join("\n") },
  { key: "kubernetes", name: "k8s/deployment.yaml", size: "1.4 KB", language: "yaml", desc: "Kubernetes Deployment", note: "Readiness probe and resource limits added — fixes the analysis blocker.", content: [
    "apiVersion: apps/v1", "kind: Deployment", "metadata:", "  name: orbit-api", "spec:", "  replicas: 3",
    "  template:", "    spec:", "      containers:", "        - name: api", "          image: acme-labs/orbit-api:1.4.0",
    "          readinessProbe:", "            httpGet: { path: /healthz, port: 8080 }",
  ].join("\n") },
  { key: "terraform", name: "terraform/main.tf", size: "2.1 KB", language: "hcl", desc: "AWS EKS + RDS + ElastiCache", note: "Multi-AZ RDS and 3-node EKS matching the cost estimate.", content: [
    'provider "aws" {', '  region = "eu-west-1"', "}", "", 'module "eks" {',
    '  source       = "terraform-aws-modules/eks/aws"', '  cluster_name = "orbit"', "  min_size     = 3", "}",
  ].join("\n") },
  { key: "cicd", name: ".github/workflows/ci.yml", size: "0.8 KB", language: "yaml", desc: "CI pipeline", note: "Lint, test, build, and image scan on every push.", content: [
    "name: ci", "on: [push, pull_request]", "jobs:", "  build:", "    runs-on: ubuntu-latest",
    "    steps:", "      - uses: actions/checkout@v4", "      - run: go test ./...", "      - run: docker build -t orbit-api .",
  ].join("\n") },
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
