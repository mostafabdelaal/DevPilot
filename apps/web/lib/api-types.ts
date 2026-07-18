// Mirrors services/api/src/lib/types.ts (the API contract).
// Keep in sync until a generated/shared package replaces this.

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

export type Severity = "ok" | "warn" | "danger";
export type AnalysisStatus = "queued" | "running" | "done" | "failed";

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
