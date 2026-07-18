-- DevPilot AI — initial schema (SDD §11). Postgres 16.
-- Apply with: psql "$DATABASE_URL" -f 0001_init.sql

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE teams (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  plan            TEXT NOT NULL DEFAULT 'Team',
  seats           INT  NOT NULL DEFAULT 1,
  usage_this_month NUMERIC NOT NULL DEFAULT 0,
  renewal_date    DATE,
  payment_method  TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE users (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id         UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  email           TEXT NOT NULL UNIQUE,
  avatar_initials TEXT,
  role            TEXT NOT NULL CHECK (role IN ('owner','admin','member','bot')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE projects (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id          UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name             TEXT NOT NULL,
  org              TEXT NOT NULL,
  default_branch   TEXT NOT NULL DEFAULT 'main',
  provider         TEXT NOT NULL DEFAULT 'github',
  health_score     INT,
  security_score   INT,
  deploy_readiness INT,
  cloud_readiness  INT,
  last_analyzed_at TIMESTAMPTZ,
  status           TEXT NOT NULL DEFAULT 'healthy',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE analyses (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id   UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  ref          TEXT NOT NULL DEFAULT 'main',
  status       TEXT NOT NULL CHECK (status IN ('queued','running','done','failed')),
  started_at   TIMESTAMPTZ,
  finished_at  TIMESTAMPTZ,
  progress_pct INT NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_analyses_project_status ON analyses(project_id, status);

CREATE TABLE analysis_steps (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id   UUID NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
  ordinal       INT NOT NULL,
  title         TEXT NOT NULL,
  detail        TEXT,
  meta          TEXT,
  meta_severity TEXT CHECK (meta_severity IN ('ok','warn','danger'))
);

CREATE TABLE detected_stack (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  version     TEXT
);

CREATE TABLE generated_assets (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
  key         TEXT NOT NULL,
  name        TEXT NOT NULL,
  size_bytes  INT,
  language    TEXT,
  content     TEXT,
  status      TEXT NOT NULL DEFAULT 'ready'
);

CREATE TABLE security_findings (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
  severity    TEXT NOT NULL CHECK (severity IN ('high','medium','low')),
  cve         TEXT,
  title       TEXT NOT NULL,
  package     TEXT,
  location    TEXT,
  status      TEXT NOT NULL DEFAULT 'open',
  remediation TEXT
);

CREATE TABLE cost_estimates (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id           UUID NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
  provider              TEXT NOT NULL,
  region                TEXT,
  monthly_total         NUMERIC NOT NULL,
  comparison_to_current NUMERIC
);

CREATE TABLE cost_line_items (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cost_estimate_id UUID NOT NULL REFERENCES cost_estimates(id) ON DELETE CASCADE,
  label            TEXT NOT NULL,
  monthly          NUMERIC NOT NULL
);

CREATE TABLE deployments (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id     UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  target         TEXT NOT NULL,
  env            TEXT NOT NULL,
  version        TEXT,
  status         TEXT NOT NULL,
  started_at     TIMESTAMPTZ,
  duration_ms    INT,
  url            TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE deployment_logs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deployment_id UUID NOT NULL REFERENCES deployments(id) ON DELETE CASCADE,
  ts            TIMESTAMPTZ NOT NULL DEFAULT now(),
  text          TEXT NOT NULL,
  level         TEXT NOT NULL DEFAULT 'info'
);

CREATE TABLE notifications (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category   TEXT NOT NULL CHECK (category IN ('security','deploy','system','mention')),
  title      TEXT NOT NULL,
  body       TEXT,
  read       BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, read);

CREATE TABLE audit_events (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id    UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  category   TEXT NOT NULL CHECK (category IN ('deploy','security','access','config')),
  title      TEXT NOT NULL,
  actor_id   UUID REFERENCES users(id) ON DELETE SET NULL,
  target     TEXT,
  source     TEXT,
  status     TEXT NOT NULL DEFAULT 'success',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_audit_team_created ON audit_events(team_id, created_at DESC);

CREATE TABLE integrations (
  id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  kind    TEXT NOT NULL,
  name    TEXT NOT NULL,
  status  TEXT NOT NULL DEFAULT 'not_connected',
  config  JSONB
);

CREATE TABLE api_keys (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id       UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  token_hash    TEXT NOT NULL,
  token_preview TEXT NOT NULL,
  scope         TEXT NOT NULL CHECK (scope IN ('read','read/write','admin')),
  last_used_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
