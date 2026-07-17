import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg">
      <header className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-5">
        <span
          aria-hidden
          className="grid h-7 w-7 place-items-center rounded-md bg-accent-soft text-accent"
        >
          ▲
        </span>
        <span className="font-semibold tracking-tight">DevPilot AI</span>
        <div className="flex-1" />
        <Link
          href="/dashboard"
          className="text-sm text-text-2 hover:text-text"
        >
          Open app
        </Link>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Ship your repo anywhere,
          <br />
          <span className="text-accent">safely, at a known cost.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-text-2">
          DevPilot AI analyzes your GitHub repository and generates
          production-ready Dockerfiles, Kubernetes, Helm, Terraform, CI/CD,
          security findings, and multi-cloud cost estimates — then deploys.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/connect"
            className="rounded-lg bg-accent px-5 py-2.5 font-medium text-white hover:opacity-90"
          >
            Connect GitHub
          </Link>
          <Link
            href="/dashboard"
            className="rounded-lg border border-border px-5 py-2.5 font-medium text-text-2 hover:bg-surface"
          >
            View demo
          </Link>
        </div>
      </main>
    </div>
  );
}
