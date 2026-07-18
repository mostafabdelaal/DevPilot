# services/api — DevPilot AI API

Fastify + TypeScript API service. See
[`ADR-002`](../../docs/architecture/adr-002-backend-stack.md).

Phase 2 scaffold: serves the handoff-shaped endpoints from **sample data** (no DB required
to run). The Postgres schema is included and ready; the analysis pipeline + persistence are
the next tasks.

## Run

```bash
npm install
npm run dev        # http://localhost:8080  (tsx watch)
npm run build      # tsc -> dist/
npm start          # node dist/server.js
npm run typecheck
```

## Endpoints

| Method | Path | Notes |
|---|---|---|
| GET | `/health` | liveness |
| GET | `/v1/me` | current user (sample) |
| GET | `/v1/team` | team + billing (sample) |
| GET | `/v1/projects` | project list |
| GET | `/v1/projects/:id` | one project (404 if missing) |
| POST | `/v1/projects/:id/analyses` | start analysis → `{ analysisId }` (202) |
| GET | `/v1/analyses/:id` | analysis status + steps |
| GET | `/v1/analyses/:id/events` | **SSE** stream of step progress |

## Database

Schema (SDD §11) is in `src/db/migrations/0001_init.sql`. Apply with:

```bash
psql "$DATABASE_URL" -f src/db/migrations/0001_init.sql
```

Connection pool in `src/db/pool.ts` (lazy — the API boots without a DB while endpoints
serve sample data).

## Structure

```
src/
  server.ts            Fastify bootstrap + route registration
  config.ts            env config (PORT, DATABASE_URL, APP_URL)
  routes/              health, me, projects, analyses (+ SSE)
  lib/types.ts         shared response shapes (client contract)
  lib/data.ts          sample data (until pipeline + DB land)
  db/pool.ts           Postgres pool
  db/migrations/       SQL schema
```
