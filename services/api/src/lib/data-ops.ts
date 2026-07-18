// Sample data for operational screens (history, notifications, integrations, audit).
import type {
  ApiKey,
  AuditEvent,
  Deployment,
  Integration,
  Notification,
} from "./types.js";

export const SAMPLE_DEPLOYMENTS: Deployment[] = [
  { status: "succeeded", version: "v1.4.0", commit: "a3f9c21", message: "add readiness probe", target: "EKS · production", actor: "Dana Reyes", actorInitials: "DR", duration: "42s", when: "2h ago" },
  { status: "succeeded", version: "v1.3.9", commit: "7b1e004", message: "bump base image", target: "EKS · production", actor: "ci-bot", actorInitials: "CI", duration: "39s", when: "8h ago" },
  { status: "rolled_back", version: "v1.3.8", commit: "e22ac7d", message: "cache layer refactor", target: "EKS · production", actor: "Jae Mercer", actorInitials: "JM", duration: "1m 12s", when: "1d ago" },
  { status: "succeeded", version: "v1.3.7", commit: "9c40b1a", message: "add NATS consumer", target: "EKS · staging", actor: "Priya Lakshmi", actorInitials: "PL", duration: "35s", when: "2d ago" },
  { status: "failed", version: "v1.3.6", commit: "1af8823", message: "migrate to Chi v5", target: "EKS · staging", actor: "Tom Okafor", actorInitials: "TO", duration: "18s", when: "3d ago" },
  { status: "succeeded", version: "v1.3.5", commit: "5de1170", message: "initial cutover", target: "EKS · production", actor: "Dana Reyes", actorInitials: "DR", duration: "48s", when: "5d ago" },
];

export const SAMPLE_NOTIFICATIONS: Notification[] = [
  { group: "Today", category: "security", title: "High-severity CVE detected", body: "CVE-2024-2961 found in the glibc base layer of orbit-api.", time: "2h ago", unread: true },
  { group: "Today", category: "deploy", title: "Deployment succeeded", body: "orbit-api v1.4.0 rolled out to production in 42s.", time: "3h ago", unread: true },
  { group: "Earlier", category: "system", title: "Analysis completed", body: "11 DevOps assets generated for orbit-api.", time: "1d ago", unread: false },
  { group: "Earlier", category: "deploy", title: "Deployment rolled back", body: "orbit-api v1.3.8 rolled back after a failed readiness probe.", time: "1d ago", unread: false },
  { group: "Earlier", category: "security", title: "Secret detected & remediated", body: "Hard-coded Postgres password replaced with a Kubernetes Secret.", time: "2d ago", unread: false },
];

export const SAMPLE_INTEGRATIONS: Integration[] = [
  { name: "GitHub", desc: "Source control", connected: true },
  { name: "Amazon Web Services", desc: "Cloud provider", connected: true },
  { name: "Docker Registry", desc: "Image registry", connected: true },
  { name: "Slack", desc: "Notifications", connected: true },
  { name: "Google Cloud", desc: "Cloud provider", connected: false },
  { name: "Datadog", desc: "Observability", connected: false },
];

export const SAMPLE_API_KEYS: ApiKey[] = [
  { name: "Production CI", token: "dp_live_••••••••4a2f", used: "2h ago", scope: "read/write" },
  { name: "Staging deploy", token: "dp_live_••••••••9c01", used: "1d ago", scope: "read/write" },
  { name: "Read-only dashboard", token: "dp_live_••••••••77b3", used: "5d ago", scope: "read" },
];

export const SAMPLE_AUDIT: AuditEvent[] = [
  { category: "deploy", title: "Deployed orbit-api v1.4.0", source: "CLI · 10.4.2.19", actor: "Dana Reyes", actorInitials: "DR", target: "orbit-api@main", status: "success", time: "2h ago" },
  { category: "security", title: "Resolved CVE-2024-2961", source: "Web · 10.4.2.7", actor: "Jae Mercer", actorInitials: "JM", target: "glibc", status: "warning", time: "4h ago" },
  { category: "access", title: "Created API key Production CI", source: "Web · 10.4.2.7", actor: "Dana Reyes", actorInitials: "DR", target: "api-key", status: "success", time: "8h ago" },
  { category: "config", title: "Updated deploy target to EKS", source: "Web · 10.4.2.11", actor: "Priya Lakshmi", actorInitials: "PL", target: "deploy-config", status: "success", time: "1d ago" },
  { category: "deploy", title: "Rolled back orbit-api v1.3.8", source: "CLI · 10.4.2.19", actor: "Jae Mercer", actorInitials: "JM", target: "orbit-api", status: "danger", time: "1d ago" },
  { category: "security", title: "Secret scan flagged config/dev.yaml", source: "System", actor: "ci-bot", actorInitials: "CI", target: "config/dev.yaml", status: "warning", time: "2d ago" },
  { category: "access", title: "Invited tom@acme-labs.io", source: "Web · 10.4.2.7", actor: "Dana Reyes", actorInitials: "DR", target: "member", status: "success", time: "3d ago" },
  { category: "config", title: "Enabled Slack notifications", source: "Web · 10.4.2.11", actor: "Priya Lakshmi", actorInitials: "PL", target: "integration", status: "success", time: "4d ago" },
];
