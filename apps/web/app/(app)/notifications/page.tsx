import { NotificationsView } from "@/components/notifications/NotificationsView";
import { apiGetOr } from "@/lib/api";
import type { Notification } from "@/lib/api-types";

export const dynamic = "force-dynamic";

const FALLBACK: Notification[] = [
  { group: "Today", category: "security", title: "High-severity CVE detected", body: "CVE-2024-2961 found in the glibc base layer of orbit-api.", time: "2h ago", unread: true },
  { group: "Today", category: "deploy", title: "Deployment succeeded", body: "orbit-api v1.4.0 rolled out to production in 42s.", time: "3h ago", unread: true },
  { group: "Earlier", category: "system", title: "Analysis completed", body: "11 DevOps assets generated for orbit-api.", time: "1d ago", unread: false },
  { group: "Earlier", category: "deploy", title: "Deployment rolled back", body: "orbit-api v1.3.8 rolled back after a failed readiness probe.", time: "1d ago", unread: false },
  { group: "Earlier", category: "security", title: "Secret detected & remediated", body: "Hard-coded Postgres password replaced with a Kubernetes Secret.", time: "2d ago", unread: false },
];

export default async function NotificationsPage() {
  const items = await apiGetOr<Notification[]>("/v1/notifications", FALLBACK);
  return <NotificationsView items={items} />;
}
