import { ActivityView } from "@/components/activity/ActivityView";
import { apiGetOr } from "@/lib/api";
import type { AuditEvent } from "@/lib/api-types";

export const dynamic = "force-dynamic";

const FALLBACK: AuditEvent[] = [
  { category: "deploy", title: "Deployed orbit-api v1.4.0", source: "CLI · 10.4.2.19", actor: "Dana Reyes", actorInitials: "DR", target: "orbit-api@main", status: "success", time: "2h ago" },
  { category: "security", title: "Resolved CVE-2024-2961", source: "Web · 10.4.2.7", actor: "Jae Mercer", actorInitials: "JM", target: "glibc", status: "warning", time: "4h ago" },
  { category: "access", title: "Created API key Production CI", source: "Web · 10.4.2.7", actor: "Dana Reyes", actorInitials: "DR", target: "api-key", status: "success", time: "8h ago" },
  { category: "config", title: "Updated deploy target to EKS", source: "Web · 10.4.2.11", actor: "Priya Lakshmi", actorInitials: "PL", target: "deploy-config", status: "success", time: "1d ago" },
  { category: "deploy", title: "Rolled back orbit-api v1.3.8", source: "CLI · 10.4.2.19", actor: "Jae Mercer", actorInitials: "JM", target: "orbit-api", status: "danger", time: "1d ago" },
  { category: "security", title: "Secret scan flagged config/dev.yaml", source: "System", actor: "ci-bot", actorInitials: "CI", target: "config/dev.yaml", status: "warning", time: "2d ago" },
  { category: "access", title: "Invited tom@acme-labs.io", source: "Web · 10.4.2.7", actor: "Dana Reyes", actorInitials: "DR", target: "member", status: "success", time: "3d ago" },
  { category: "config", title: "Enabled Slack notifications", source: "Web · 10.4.2.11", actor: "Priya Lakshmi", actorInitials: "PL", target: "integration", status: "success", time: "4d ago" },
];

export default async function ActivityPage() {
  const rows = await apiGetOr<AuditEvent[]>("/v1/audit", FALLBACK);
  return <ActivityView rows={rows} />;
}
