# Security Policy

## Reporting a vulnerability

**Do not open a public issue for security bugs.**

Email **security@devpilot.ai** (placeholder — update to the real address) with:

- description and impact
- steps to reproduce / PoC
- affected component and version/commit

Expect an acknowledgement within **3 business days** and a triage update within **10 business days**.
Please allow reasonable time to remediate before public disclosure.

## Supported versions

Pre-release. No supported versions yet; the `main` branch receives fixes.

## Product security requirements

These are hard requirements for DevPilot AI (a tool that ingests user source code):

- **GitHub access is read-only.** Generated changes open a PR — never push to the default branch without approval.
- **Ephemeral, shallow clones.** User source is analyzed in an isolated sandbox and **not persisted** afterward.
- **Least-privilege scopes** — read repo contents & metadata, read commit history (secret scanning), open PRs.
- **Secret scanning** runs across git history; **no secrets** are stored or logged.
- **API keys** are shown as previews only and are revocable.
- Audit log is **append-only** and immutable.

## Handling secrets in this repo

- Never commit `.env`, keys, tokens, or credentials.
- Use `.env.example` for shape only.
- Rotate any credential that lands in git history and purge it.
