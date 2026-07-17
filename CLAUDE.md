# CLAUDE.md — DevPilot AI

Project memory for Claude Code. Read every session. Keep high-signal; prune stale entries.

## Project

DevPilot AI — SaaS that ingests a GitHub repo, analyzes its stack, and generates
production-ready DevOps artifacts (Dockerfile, Compose, Kubernetes, Helm, Terraform,
CI/CD, monitoring, security findings, cloud-cost estimates), then lets users review,
edit, and deploy them.

Current state: **front-end prototype only** (Claude Design export). No backend yet.

## Layout

- `apps/web/DevPilot AI.dc.html` — clickable prototype. 16 screens, dark + light. Design source of truth.
- `apps/web/support.js` — **GENERATED** dc-runtime (React-based interpreter). Vendored. **Do NOT edit or split** — rebuilt from `dc-runtime/src/*.ts`, not present here.
- `docs/DevPilot_AI_Full_Project_Plan.md` — the SDD (source of truth for scope/architecture).
- `docs/handoff/BACKEND_HANDOFF.md` — data models, API surface, jobs (original handoff).
- `docs/design/DESIGN_TOKENS.md` — colors, fonts, radii, shadows.

## Hard rules

- Preserve the prototype's visual design exactly (colors, spacing, type, motion, copy). Do not redesign.
- `apps/web/support.js` is generated build output — never hand-edit.
- The `.dc.html` + `support.js` must stay in the same directory (`./support.js` is a relative ref); renaming the `.dc.html` changes the dc root-component name.
- Never commit directly to `main`. Branches: `main`, `develop`, then `feature/*`. Conventional Commits.
- No source persistence of user repos (shallow clone in ephemeral sandbox) — see handoff security section.

## Skills — use every session

Reach for these by task type. If a skill plausibly applies, invoke it via the Skill tool BEFORE acting.

- **caveman** — communication mode. Default ON (SessionStart hook). Terse, drop filler. Normal prose for code/commits/PRs/security.
- **frontend-design** — ANY new UI or UI reshape. Invoke before writing components/layout.
- **ui-ux-pro-max** / **ui-styling** / **design-system** — component build, palettes, tokens, shadcn/Tailwind, accessibility.
- **dataviz** — before ANY chart/graph/gauge/stat-tile/dashboard (dashboard, cost bars, score rings all qualify).
- **superpowers:brainstorming** — before any feature/creative work, before plan mode.
- **superpowers:test-driven-development** — before writing feature/bugfix code.
- **superpowers:systematic-debugging** — any bug/test failure/unexpected behavior.
- **superpowers:writing-plans** / **executing-plans** — multi-step work.
- **graphify** — questions about codebase/architecture/file relationships.
- **verify** / **code-review** — before claiming done; before merge.

Skill priority: process skills first (brainstorming, systematic-debugging set the approach),
then implementation skills (frontend-design, ui-styling) carry it out.

## Next decision (blocked on user)

Target architecture for turning the prototype into production code:
Next.js + TS migration (recommended) vs static multi-page HTML/CSS/JS vs keep dc prototype as design reference.
Do not start backend until the front-end structure direction is chosen.
