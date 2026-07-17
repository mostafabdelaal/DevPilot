# Contributing to DevPilot AI

## Branch strategy

- `main` — protected, always releasable. **No direct commits.**
- `develop` — integration branch. Features merge here first.
- `feature/*` — one branch per feature/fix, cut from `develop`.

```
feature/auth · feature/dashboard · feature/repository-analysis
feature/docker-generator · feature/security · feature/terraform
feature/monitoring · feature/settings
```

Flow: `feature/*` → PR into `develop` → (release) `develop` → PR into `main`.

## Commits — Conventional Commits

```
<type>(<scope>): <subject>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.

Examples:
```
feat(analysis): stream pipeline step progress over SSE
fix(sidebar): correct active-route highlight on mobile
docs(sdd): expand deployment architecture section
```

## Pull requests

- Target `develop` (not `main`).
- Keep PRs focused. Reference the issue.
- CI must pass. No merge with failing checks.
- At least one review approval.
- Fill in the PR template.

## Code quality

SOLID · Clean Architecture · DRY · KISS · YAGNI · Separation of Concerns.
Accessible, responsive, semantic markup. No duplicated code. No secrets in the repo.

## Front-end / design

Preserve the prototype's design exactly (see `docs/design/DESIGN_TOKENS.md`). Do not
hand-edit `apps/web/support.js` (generated). Do not redesign screens without sign-off.

## Local setup

Copy `.env.example` → `.env` and fill values. Never commit `.env`.
