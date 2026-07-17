# apps/web — DevPilot AI front-end

Production front-end. **Next.js (App Router) + TypeScript + Tailwind CSS.** See
[`ADR-001`](../../docs/architecture/adr-001-frontend-architecture.md).

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint
```

## Structure

```
app/
  layout.tsx            # root: fonts (Geist, JetBrains Mono), globals
  globals.css           # design tokens (CSS vars) — dark default + light overrides
  page.tsx              # landing (marketing)
  connect/page.tsx      # connect GitHub
  (app)/
    layout.tsx          # app shell: Sidebar + Topbar + main
    dashboard/page.tsx  # dashboard (scaffolded)
    <screen>/page.tsx   # 14 more screens (stubs → migrate from prototype)
components/
  app-shell/            # Sidebar, Topbar
  ui/                   # Card, StatTile
  ScreenStub.tsx        # placeholder for un-migrated screens
lib/nav.ts              # sidebar nav + route titles
tailwind.config.ts      # maps tokens → utility classes
```

## Design fidelity

The visual design is fixed to the prototype (`apps/prototype/`). Tokens live in
`app/globals.css` and are mapped in `tailwind.config.ts`. Use token classes
(`bg-surface`, `text-accent-2`, `border-border`) — no ad-hoc hex, no inline styles.

## Status

Sprint S1 scaffold: shell + tokens + landing/connect + dashboard. Remaining 14 screens are
stubs to be migrated screen-by-screen. Radial score gauges / cost bars on the dashboard are
placeholders pending the chart implementation pass.
