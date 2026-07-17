import Link from "next/link";

const SCOPES = [
  "Read repository contents & metadata",
  "Read commit history (secret scanning)",
  "Open pull requests",
];

export default function ConnectPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-bg px-6">
      <div className="w-full max-w-md rounded-card border border-border bg-surface p-6">
        <h1 className="text-lg font-semibold">Connect a repository</h1>
        <p className="mt-1 text-sm text-text-2">
          DevPilot AI requests read-only access. We never push to your default
          branch — changes open a pull request.
        </p>

        <ul className="mt-4 space-y-2 text-sm">
          {SCOPES.map((s) => (
            <li key={s} className="flex items-center gap-2 text-text-2">
              <span aria-hidden className="text-green">
                ✓
              </span>
              {s}
            </li>
          ))}
        </ul>

        <Link
          href="/dashboard"
          className="mt-6 block rounded-lg bg-accent px-4 py-2.5 text-center font-medium text-white hover:opacity-90"
        >
          Authorize GitHub App
        </Link>
        <p className="mt-3 text-center text-xs text-text-3">
          Source is cloned in an ephemeral sandbox and never persisted.
        </p>
      </div>
    </div>
  );
}
