# Changelog

All notable changes to this project are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/);
this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added
- Professional repository structure (`apps/web`, `docs/`, `.github/`).
- Git configuration: `.gitignore`, `.editorconfig`, `.gitattributes`, `.env.example`.
- Documentation: root `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`, `CHANGELOG.md`.
- `CLAUDE.md` project memory for Claude Code.
- Software Design Document at `docs/DevPilot_AI_Full_Project_Plan.md`.
- Design tokens reference at `docs/design/DESIGN_TOKENS.md`.
- Proprietary `LICENSE`.

### Changed
- Moved the clickable prototype (`DevPilot AI.dc.html`) and its runtime (`support.js`) into `apps/web/`.
- Preserved the original backend handoff as `docs/handoff/BACKEND_HANDOFF.md`.

### Notes
- Front-end prototype design unchanged. `apps/web/support.js` remains vendored/generated.
- Target production architecture (Next.js migration vs static vs keep-prototype) still to be decided.
