# Design Tokens

Extracted from the prototype root (`apps/web/DevPilot AI.dc.html`). These are the
**final** values — carry them verbatim into the production design system.

## Color — dark (default)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0a0a0c` | page background |
| `--bg-elev` | `#0e0e12` | elevated background |
| `--surface` | `#141419` | cards / panels |
| `--surface-2` | `#1b1b22` | nested surfaces |
| `--border` | `rgba(255,255,255,.07)` | hairline borders |
| `--border-strong` | `rgba(255,255,255,.13)` | emphasized borders |
| `--text` | `#f4f4f7` | primary text |
| `--text-2` | `#a2a2ae` | secondary text |
| `--text-3` | `#6a6a76` | tertiary / muted |
| `--accent` | `#7c6cff` | violet — primary accent |
| `--accent-2` | `#33d6c8` | cyan — secondary accent |
| `--accent-soft` | `rgba(124,108,255,.15)` | accent tint / hover |
| `--green` | `#3ecf8e` | success / ok |
| `--amber` | `#f5b445` | warning |
| `--red` | `#f16a6a` | danger / high severity |

A light-theme override map is defined in the prototype JS and applied via `toggleTheme`
(`state.theme`, default `dark`). Recreate as a `[data-theme="light"]` token set.

## Typography

- UI font: **Geist** (Google Fonts).
- Code / monospace: **JetBrains Mono** (Google Fonts).

## Shape & elevation

- Card radii: ~**9–15px**.
- Shadow: `0 12px 40px rgba(0,0,0,.5)`.

## Motion

7 `@keyframes` in the prototype `<style>` block: `dp-spin`, `dp-pulse`, `dp-scan`,
`dp-ring` (+ others) — spinners, progress rings, scan lines on the analysis timeline.

## Responsive

Single breakpoint in prototype: `@media (max-width:900px)` — collapses sidebar/topbar to
mobile off-canvas nav driven by `data-*` attributes.

## Assets

No binary assets. All icons are inline SVG (`ICON` map in prototype JS). Brand mark is an
inline SVG shield.
