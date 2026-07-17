# apps/web — Front-end

## What this is

`DevPilot AI.dc.html` is the **clickable design prototype** for the entire product —
16 screens, dark + light mode, produced with Claude Design. It is the **visual source
of truth**, not shippable production code.

`support.js` is the **generated dc-runtime** (a React-based interpreter for `.dc.html`
templates). It is vendored build output.

## Run it

Open `DevPilot AI.dc.html` directly in a browser, or serve the folder:

```bash
npx serve .
# then open the printed URL and load "DevPilot AI.dc.html"
```

`support.js` is loaded relatively (`./support.js`), so the two files must stay together.

## Rules

- **Do not hand-edit `support.js`** — generated output (`// GENERATED from dc-runtime/src/*.ts`).
- **Do not rename `DevPilot AI.dc.html`** — the dc runtime derives the root component name from the path.
- Preserve the design exactly. This prototype's colors, type, spacing, motion, and copy are final.

## Screens (client-side routes, `state.route`)

Marketing: `landing`, `connect`.
App: `dashboard`, `analysis`, `generator`, `assistant`, `security`, `cost`, `diagram`,
`deploy`, `projects`, `history`, `integrations`, `team`, `notifications`, `activity`, `docs`.

## Next step

Rebuild these screens in the chosen production framework (see
`../../docs/DevPilot_AI_Full_Project_Plan.md`). When migrated, the dc prototype stays here
as the reference; the runtime is dropped.
