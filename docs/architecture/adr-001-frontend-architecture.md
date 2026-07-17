# ADR-001 — Production front-end architecture

- Status: **Accepted**
- Date: 2026-07-18
- Deciders: DevPilot team

## Context

The product exists as a Claude Design `.dc.html` prototype (16 screens) driven by a vendored,
generated runtime (`support.js`) and inline styles. It is a design reference, not a
production, scalable, maintainable front-end. We must choose the target architecture to build
the real UI while preserving the prototype's visual design exactly.

## Options

1. **Next.js + TypeScript** — rebuild screens as React route-pages + shared components; extract
   inline styles into a design-token + Tailwind system; drop the dc runtime.
2. **Static multi-page HTML/CSS/JS** — one plain `.html` per screen, modular CSS, feature JS
   modules. Requires converting the dc template to plain HTML and extracting styles by hand.
3. **Keep the dc prototype** as the only front-end (design reference), build backend around it.

## Decision

Adopt **Option 1 — Next.js (App Router) + TypeScript**.

Rationale: component reuse across 16 screens, typed API contract against the handoff shapes,
SSR/streaming fit the SSE progress/deploy-log flows, first-class routing, and a mature
ecosystem for a scalable SaaS front-end. Design fidelity is preserved via a tokenized design
system (see `docs/design/DESIGN_TOKENS.md`), not a redesign.

## Consequences

- `apps/prototype/` keeps the `.dc.html` + runtime as the visual source of truth (unmaintained, reference only).
- `apps/web/` becomes the Next.js production app; the dc runtime is dropped from the product.
- Styling standard: CSS variables (tokens) + Tailwind theme mapping; no inline styles in product code.
- Fonts: Geist + JetBrains Mono via `next/font/google`.
- Reversible until significant screen work lands; nothing pushed to a remote yet.
