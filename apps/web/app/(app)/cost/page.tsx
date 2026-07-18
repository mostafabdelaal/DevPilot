import { CostView } from "@/components/cost/CostView";
import { apiGetOr } from "@/lib/api";
import type { CostReport } from "@/lib/api-types";

export const dynamic = "force-dynamic";

const FALLBACK: CostReport = {
  providers: [
    { provider: "AWS", region: "eu-west-1", total: 412, rows: [
      { name: "EKS control plane", spec: "1 cluster", cost: 73 },
      { name: "EC2 nodes", spec: "3× t4g.medium", cost: 180 },
      { name: "RDS Postgres", spec: "Multi-AZ db.t4g.medium", cost: 124 },
      { name: "ALB", spec: "1 load balancer", cost: 22 },
      { name: "CloudWatch", spec: "logs + metrics", cost: 13 },
    ] },
    { provider: "GCP", region: "europe-west1", total: 398, rows: [
      { name: "GKE control plane", spec: "1 cluster", cost: 74 },
      { name: "Compute nodes", spec: "3× e2-medium", cost: 164 },
      { name: "Cloud SQL", spec: "HA Postgres", cost: 118 },
      { name: "Load Balancer", spec: "1 forwarding rule", cost: 23 },
      { name: "Cloud Monitoring", spec: "logs + metrics", cost: 19 },
    ] },
    { provider: "Azure", region: "west-europe", total: 431, rows: [
      { name: "AKS control plane", spec: "1 cluster", cost: 77 },
      { name: "VM nodes", spec: "3× B2ms", cost: 192 },
      { name: "Postgres Flexible", spec: "HA zone-redundant", cost: 120 },
      { name: "App Gateway", spec: "1 gateway", cost: 28 },
      { name: "Azure Monitor", spec: "logs + metrics", cost: 14 },
    ] },
  ],
  savings: { amount: 62, note: "Single-AZ database in staging + a Spot node group saves ~15%. Ask the assistant to generate a staging workspace." },
};

export default async function CostPage() {
  const report = await apiGetOr<CostReport>("/v1/analyses/an_current/cost", FALLBACK);
  return <CostView report={report} />;
}
