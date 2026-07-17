# Handoff: DevPilot AI — Platform & Backend

## Overview
DevPilot AI is a SaaS platform that ingests a GitHub repository, analyzes its stack, and generates production-ready DevOps artifacts (Dockerfile, Compose, Kubernetes, Helm, Terraform, CI/CD, monitoring, security findings, cloud-cost estimates), then lets the user review, edit, and deploy them. The bundled `DevPilot AI.dc.html` is a **fully clickable front-end prototype** of the entire product (16 screens, dark + light mode).

This handoff is oriented toward **building the backend** that the prototype front-end implies. It documents the data models, API surface, jobs, and integrations you need so the real UI (built later from the same prototype) has something to talk to.

## About the Design Files
The file in this bundle is a **design reference created in HTML** — a prototype showing intended look and behavior, **not production code to ship**. All data in it is hard-coded sample data (a Go 1.22 / Chi / Postgres / Redis service called `orbit-api`). The task here is to stand up a backend in the project's chosen stack whose responses match the shapes the prototype renders, and later recreate the HTML screens in the target front-end environment (React/Vue/etc.) using that codebase's patterns.

If no backend environment exists yet, choose an appropriate stack (the domain — repo cloning, static analysis, IaC generation, cloud APIs — suits a Node/TypeScript or Go service with a job queue and Postgres).

## Fidelity
**High-fidelity.** The prototype has final colors, typography, spacing, copy, and interactions. Treat the data shapes and flows below as the source of truth for the API contract.

---

## Core Domain & Data Models

Entities inferred from the prototype. Field names are suggestions; types matter.

### User
- `id`, `name`, `email`, `avatarInitials`, `role` (`owner` | `admin` | `member` | `bot`)
- Team-scoped. Sample team: Dana Reyes (owner), Jae Mercer (admin), Priya Lakshmi (member), Tom Okafor (member), CI service account (bot).

### Team / Org & Billing
- `id`, `name`, `plan` (`Team` @ $49/seat/mo), `seats`, `usageThisMonth`, `renewalDate`, `paymentMethod`
- `planFeatures[]` (string list)

### Project (Repository)
- `id`, `name` (`orbit-api`), `org` (`acme-labs`), `defaultBranch` (`main`), `provider` (`github`)
- `healthScore`, `securityScore`, `deployReadiness`, `cloudReadiness` (0–100)
- `lastAnalyzedAt`, `status` (`healthy` | ...)

### Analysis (a run against a repo @ ref)
- `id`, `projectId`, `ref`, `status` (`queued` | `running` | `done` | `failed`), `startedAt`, `finishedAt`, `progressPct`
- `steps[]`: ordered pipeline steps, each `{ title, detail, meta, metaSeverity }`. The prototype's 8 steps:
  1. Cloning repository — `214 files · 3.2 MB`
  2. Detecting languages & frameworks — `Go 91% · Shell 6% · Dockerfile 3%`
  3. Mapping architecture — `3 external dependencies`
  4. Resolving dependencies — `2 outdated · 0 yanked` (warn)
  5. Scanning secrets & vulnerabilities — `1 high · 3 medium · 1 secret` (danger)
  6. Assessing cloud readiness — `Score 82 / 100` (warn)
  7. Generating DevOps assets — `11 files produced` (ok)
  8. Estimating cloud cost — `≈ $412 / month` (ok)
- `detectedStack[]`: `{ name, version }` — Go 1.22, Chi v5, PostgreSQL 16, Redis 7, NATS 2.10, gRPC/Buf
- `recommendations[]`: `{ severity, title, body }`

### GeneratedAsset (belongs to an Analysis)
- `id`, `analysisId`, `key` (`dockerfile`|`compose`|`kubernetes`|`helm`|`terraform`|`cicd`), `name`, `sizeBytes`, `language`, `content` (text), `status` (`ready`)
- 11 files total in the sample bundle (2.4 MB). Editable; edits open a PR rather than pushing to default branch.

### SecurityFinding
- `id`, `analysisId`, `severity` (`high`|`medium`|`low`), `cve`, `title`, `package`, `location`, `status` (`open`|`resolved`), `remediation`
- Sample: 1 high (`CVE-2024-2961` in glibc base layer), 3 medium, 1 hard-coded secret in `config/dev.yaml`.

### CostEstimate
- `id`, `analysisId`, `provider` (`AWS`|`GCP`|`Azure`), `region`, `monthlyTotal`, `lineItems[]` (`{ label, monthly }`), `comparisonToCurrent` (pct)
- Sample AWS eu-west-1 = **$412/mo**: EKS $73, 3× t4g.medium $180, RDS Multi-AZ db.t4g.medium $124, ALB $22, CloudWatch $13.

### Deployment
- `id`, `projectId`, `assetBundleId`, `target` (`eks`|`gke`|`aks`), `env` (`production`|`staging`), `version` (`1.4.0`), `status` (`running`|`succeeded`|`failed`|`rolled_back`), `startedAt`, `durationMs`, `logLines[]` (`{ ts, text, level }`), `url`
- Deploy is a **streamed** job (prototype streams ~12 log lines with a step machine: auth → apply → rollout → readiness → done). Use SSE or WebSocket.

### Notification
- `id`, `userId`, `category` (`security`|`deploy`|`system`|`mention`), `title`, `body`, `createdAt`, `read` (bool)
- Endpoints for list, filter by category/unread, mark-all-read, unread count (drives the bell badge).

### AuditEvent (Activity log)
- `id`, `teamId`, `category` (`deploy`|`security`|`access`|`config`), `title`, `actorId`, `target`, `source` (channel + IP, e.g. `CLI · 10.4.2.19`), `status` (`success`|`warning`|`danger`), `createdAt`
- Immutable, append-only, exportable to CSV.

### Integration & ApiKey
- Integration: `{ id, kind (github|aws|registry|slack|...), name, status (connected|not connected), config }`
- ApiKey: `{ id, name, tokenPreview, scope (read|read/write|admin), lastUsedAt, createdAt }` — create + revoke.

---

## Suggested API Surface (REST)
```
# Auth / GitHub
POST /auth/github/connect            # OAuth / GitHub App install
GET  /me
GET  /team            PATCH /team    # billing, seats

# Projects
GET  /projects        POST /projects (connect repo)
GET  /projects/:id

# Analysis (long-running job)
POST /projects/:id/analyses          # kick off; returns {analysisId}
GET  /analyses/:id                   # poll status/progress/steps
GET  /analyses/:id/events            # SSE stream of step progress
GET  /analyses/:id/stack
GET  /analyses/:id/recommendations

# Generated assets
GET  /analyses/:id/assets
GET  /assets/:id                     # content
PUT  /assets/:id                     # edit -> opens PR
GET  /analyses/:id/assets/download   # zip

# Security & cost
GET  /analyses/:id/security
GET  /analyses/:id/cost?provider=AWS

# Deployments (streamed)
POST /projects/:id/deployments       # {target, env}
GET  /deployments/:id
GET  /deployments/:id/logs           # SSE/WebSocket stream
GET  /projects/:id/deployments       # history

# Notifications / Audit / Settings
GET  /notifications?filter=unread    POST /notifications/read-all
GET  /notifications/unread-count
GET  /audit?category=deploy          GET /audit/export.csv
GET  /integrations   POST /integrations/:kind/connect
GET  /api-keys       POST /api-keys   DELETE /api-keys/:id
```

## Background Jobs / Workers
- **Analysis pipeline** — clone (shallow, ephemeral sandbox; never persist source), detect stack, map deps, run Trivy + gitleaks, score readiness, generate assets (templating engine), estimate cost. Emit progress events per step.
- **Deploy runner** — auth to cluster, apply manifests, watch rollout, run readiness probes, stream logs; support rollback.
- **Cost estimator** — pull provider price lists; compute per-service monthly.
- **Notification/audit emitters** — fan out on job completion + security findings.

## Security & Privacy Requirements (called out in the prototype's docs)
- Read-only GitHub access; open PRs, never push to default branch without approval.
- Shallow clone in an **ephemeral sandbox**; source is **not persisted** after analysis.
- Scopes: read repo contents & metadata, read commit history (secret scanning), open PRs.
- Secret scanning across git history; API keys shown as previews only; revocable.

---

## Screens in the Prototype (front-end reference)
Hero flow: Landing → Connect GitHub → Dashboard → Repository analysis (live) → Generator (asset editor) → AI assistant.
Operate: Security, Cloud cost, Architecture diagram, Deploy wizard (streamed), Deployment history, **Activity log** (audit), **Notifications**.
Account: Projects, Integrations & API keys, Team & billing, **Documentation** (in-app docs viewer).
All routing is client-side in the single DC file; each screen is an `sc-if` block keyed off a `route` state. Both dark and light themes are implemented.

## Design Tokens (from the prototype root)
```
--bg #0a0a0c   --bg-elev #0e0e12   --surface #141419   --surface-2 #1b1b22
--border rgba(255,255,255,.07)   --border-strong rgba(255,255,255,.13)
--text #f4f4f7  --text-2 #a2a2ae  --text-3 #6a6a76
--accent #7c6cff (violet)   --accent-2 #33d6c8 (cyan)   --accent-soft rgba(124,108,255,.15)
--green #3ecf8e   --amber #f5b445   --red #f16a6a
Fonts: Geist (UI), JetBrains Mono (code). Radii ~9–15px cards. Shadow: 0 12px 40px rgba(0,0,0,.5)
```

## Assets
No binary assets. All icons are inline SVG; brand mark is an inline SVG shield. Fonts load from Google Fonts (Geist, JetBrains Mono).

## Files
- `DevPilot AI.dc.html` — the complete clickable prototype (all screens, both themes, sample data). Open directly in a browser to explore flows before building the API.
