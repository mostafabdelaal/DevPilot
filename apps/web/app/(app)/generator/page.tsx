import { GeneratorView } from "@/components/generator/GeneratorView";
import { apiGetOr } from "@/lib/api";
import type { GeneratedAsset } from "@/lib/api-types";

export const dynamic = "force-dynamic";

const FALLBACK: GeneratedAsset[] = [
  { key: "dockerfile", name: "Dockerfile", size: "0.9 KB", language: "docker", desc: "Multi-stage build · distroless runtime", note: "Non-root user and pinned base image applied automatically.", content: "# syntax=docker/dockerfile:1\nFROM golang:1.22-alpine AS build\nWORKDIR /src\nCOPY go.mod go.sum ./\nRUN go mod download\nCOPY . .\nRUN CGO_ENABLED=0 go build -o /orbit ./cmd/api\n\nFROM gcr.io/distroless/static:nonroot\nCOPY --from=build /orbit /orbit\nUSER nonroot:nonroot\nEXPOSE 8080\nENTRYPOINT [\"/orbit\"]" },
  { key: "compose", name: "docker-compose.yml", size: "0.7 KB", language: "yaml", desc: "Local dev stack", note: "Postgres and Redis wired for local development.", content: "services:\n  api:\n    build: .\n    ports: [\"8080:8080\"]\n    depends_on: [db, cache]\n  db:\n    image: postgres:16-alpine\n  cache:\n    image: redis:7-alpine" },
  { key: "kubernetes", name: "k8s/deployment.yaml", size: "1.4 KB", language: "yaml", desc: "Kubernetes Deployment", note: "Readiness probe and resource limits added — fixes the analysis blocker.", content: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: orbit-api\nspec:\n  replicas: 3\n  template:\n    spec:\n      containers:\n        - name: api\n          image: acme-labs/orbit-api:1.4.0\n          readinessProbe:\n            httpGet: { path: /healthz, port: 8080 }" },
];

export default async function GeneratorPage() {
  const assets = await apiGetOr<GeneratedAsset[]>(
    "/v1/analyses/an_current/assets",
    FALLBACK,
  );
  return <GeneratorView assets={assets} />;
}
