<div align="center">

# DevPilot AI

**Ingest a GitHub repo → analyze the stack → generate production-ready DevOps artifacts → review, edit, deploy.**

Dockerfile · Compose · Kubernetes · Helm · Terraform · CI/CD · Monitoring · Security findings · Cloud-cost estimates

</div>

---

## Status

**Prototype stage.** The clickable front-end prototype (16 screens, dark + light) is
complete. Backend and production front-end are not built yet. Target architecture is being
decided — see [the project plan](docs/DevPilot_AI_Full_Project_Plan.md).

## Features (product scope)

- **Repository analysis** — shallow-clone a repo, detect languages/frameworks, map
  architecture, resolve dependencies, scan secrets & vulnerabilities, score cloud readiness.
- **Asset generation** — Dockerfile, Compose, Kubernetes, Helm, Terraform, CI/CD pipelines,
  monitoring configs. Editable; edits open a PR (never push to default branch).
- **Security** — Trivy + gitleaks findings with CVEs and remediation.
- **Cloud cost** — per-service monthly estimates across AWS / GCP / Azure.
- **Deployments** — streamed deploy runs (SSE/WebSocket) with rollout, readiness, rollback.
- **AI assistant**, architecture diagram, notifications, audit log, team & billing,
  integrations & API keys, in-app docs.

## Architecture (high level)

Prototype front-end today → real front-end + API service + worker pool + Postgres/Redis.
Full detail in the [Software Design Document](docs/DevPilot_AI_Full_Project_Plan.md).

## Repository structure

```
DevPilot-AI/
├── apps/
│   ├── web/                     # production front-end — Next.js + TS + Tailwind
│   │   ├── app/                 # App Router: (app) shell + routes, landing, connect
│   │   ├── components/          # app-shell (Sidebar/Topbar) + ui primitives
│   │   ├── lib/                 # nav config, helpers
│   │   └── tailwind.config.ts   # design tokens mapped from globals.css
│   └── prototype/               # clickable design reference (do not ship)
│       ├── DevPilot AI.dc.html  # prototype (design source of truth)
│       └── support.js           # generated dc-runtime (vendored — do not edit)
├── services/
│   └── api/                     # API service — Fastify + TypeScript (ADR-002)
│       ├── src/routes/          # health, me, projects, analyses (+ SSE)
│       ├── src/lib/             # shared types + sample data
│       └── src/db/migrations/   # Postgres schema (SDD §11)
├── docs/
│   ├── DevPilot_AI_Full_Project_Plan.md   # the SDD
│   ├── handoff/BACKEND_HANDOFF.md         # data models, API surface, jobs
│   ├── design/DESIGN_TOKENS.md            # colors, fonts, radii, motion
│   └── architecture/adr-001-*.md          # decisions (ADRs)
├── .github/workflows/           # CI/CD (as added)
├── CLAUDE.md                    # Claude Code project memory
├── CONTRIBUTING.md · SECURITY.md · CODE_OF_CONDUCT.md · CHANGELOG.md
├── .env.example · .editorconfig · .gitattributes · .gitignore
├── LICENSE
└── README.md
```

## Getting started

Requirements: Node.js 20+ for the web app; a modern browser for the prototype.

```bash
# Production front-end (Next.js)
cd apps/web
npm install
npm run dev        # http://localhost:3000

# View the original design prototype
cd apps/prototype
npx serve .        # open the printed URL, load "DevPilot AI.dc.html"
```

## Development

- Branches: `main` (protected) · `develop` (integration) · `feature/*` (work).
- **Never commit directly to `main`.** Open a PR into `develop`.
- Commits: [Conventional Commits](https://www.conventionalcommits.org/).
- See [CONTRIBUTING.md](CONTRIBUTING.md).

## Deployment

Defined once the stack is chosen. Target: containerized services on a managed Kubernetes
cluster (EKS/GKE/AKS) with streamed deploys. See the SDD's Deployment Architecture section.

## Documentation

- [Full Project Plan / SDD](docs/DevPilot_AI_Full_Project_Plan.md)
- [Backend handoff](docs/handoff/BACKEND_HANDOFF.md)
- [Design tokens](docs/design/DESIGN_TOKENS.md)

## Roadmap

See [SDD → Development Roadmap](docs/DevPilot_AI_Full_Project_Plan.md#28-development-roadmap).

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Security

Report vulnerabilities per [SECURITY.md](SECURITY.md). Do not open public issues for security bugs.

## License

Proprietary — see [LICENSE](LICENSE).
