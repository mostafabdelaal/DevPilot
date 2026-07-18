// Shared API response shapes. Mirror docs/handoff/BACKEND_HANDOFF.md.
// The front-end will consume equivalent types via a typed client.

export type Role = "owner" | "admin" | "member" | "bot";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
  role: Role;
}

export interface Team {
  id: string;
  name: string;
  plan: string;
  seats: number;
  usageThisMonth: number;
  renewalDate: string;
}

export interface Project {
  id: string;
  name: string;
  org: string;
  defaultBranch: string;
  provider: "github";
  healthScore: number;
  securityScore: number;
  deployReadiness: number;
  cloudReadiness: number;
  lastAnalyzedAt: string | null;
  status: "healthy" | "review" | "at_risk";
  tags: string[];
  updatedAt: string;
}

export type AnalysisStatus = "queued" | "running" | "done" | "failed";
export type Severity = "ok" | "warn" | "danger";

export interface AnalysisStep {
  title: string;
  detail: string;
  meta: string;
  metaSeverity: Severity;
}

export interface Analysis {
  id: string;
  projectId: string;
  ref: string;
  status: AnalysisStatus;
  startedAt: string;
  finishedAt: string | null;
  progressPct: number;
  steps: AnalysisStep[];
}

export interface SecurityFinding {
  severity: "HIGH" | "MEDIUM" | "LOW";
  cve: string;
  title: string;
  pkg: string;
  fix: string;
  status: "Open" | "Patched";
}

export interface SecurityReport {
  score: number;
  verdict: string;
  severities: { high: number; medium: number; low: number };
  stats: { label: string; value: string; sub: string }[];
  findings: SecurityFinding[];
  secret: { title: string; location: string; value: string; remediated: boolean };
}

export interface CostRow {
  name: string;
  spec: string;
  cost: number;
}

export interface CostProviderEstimate {
  provider: "AWS" | "GCP" | "Azure";
  region: string;
  total: number;
  rows: CostRow[];
}

export interface CostReport {
  providers: CostProviderEstimate[];
  savings: { amount: number; note: string };
}

export interface GeneratedAsset {
  key: string;
  name: string;
  size: string;
  language: string;
  desc: string;
  note: string;
  content: string;
}

export interface Deployment {
  status: "succeeded" | "failed" | "rolled_back";
  version: string;
  commit: string;
  message: string;
  target: string;
  actor: string;
  actorInitials: string;
  duration: string;
  when: string;
}

export interface Notification {
  group: "Today" | "Earlier";
  category: "security" | "deploy" | "system";
  title: string;
  body: string;
  time: string;
  unread: boolean;
}

export interface Integration {
  name: string;
  desc: string;
  connected: boolean;
}

export interface ApiKey {
  name: string;
  token: string;
  used: string;
  scope: "read" | "read/write" | "admin";
}

export interface AuditEvent {
  category: "deploy" | "security" | "access" | "config";
  title: string;
  source: string;
  actor: string;
  actorInitials: string;
  target: string;
  status: "success" | "warning" | "danger";
  time: string;
}

export interface ApiError {
  error: { code: string; message: string; details?: unknown };
}
