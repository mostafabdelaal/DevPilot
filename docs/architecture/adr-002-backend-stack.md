# ADR-002 — Backend stack

- Status: **Accepted**
- Date: 2026-07-18
- Deciders: DevPilot team

## Context

Phase 2 needs an API service + worker pool behind the Next.js front-end (ADR-001).
The front-end currently renders hardcoded sample data; the backend must serve the same
shapes (see `docs/handoff/BACKEND_HANDOFF.md`).

## Options

1. **Node.js + TypeScript** (Fastify) — shared types/validation with the Next front-end,
   one language across the stack, large ecosystem, strong SSE support.
2. **Go** (Chi) — matches the sample service (`orbit-api`), great for CPU-bound scanning
   workers, but a second language and no type sharing with the front-end.

## Decision

Adopt **Option 1 — Node.js + TypeScript with Fastify**.

Rationale: end-to-end TypeScript means the API response types and the front-end client
share definitions; Fastify is fast and has first-class streaming for the SSE progress/deploy
flows; a single toolchain speeds delivery for one squad. CPU-heavy scanning is delegated to
external tools (Trivy, gitleaks) and can move to a Go worker later if profiling demands it.

## Consequences

- API service lives in `services/api` (Fastify + Zod + `pg`).
- Postgres via SQL migrations (`services/api/src/db/migrations`).
- Shared response types in `services/api/src/lib/types.ts`; front-end will import equivalent
  types via a typed client (later task).
- Related open ADRs: ADR-003 (job queue — leaning BullMQ/Redis), ADR-005 (SSE vs WebSocket —
  SSE for progress, WS reserved for deploy logs), ADR-006 (sandbox isolation).
