import { Card } from "@/components/ui/Card";
import { apiGetOr } from "@/lib/api";
import type { SecurityFinding, SecurityReport } from "@/lib/api-types";

export const dynamic = "force-dynamic";

const FALLBACK: SecurityReport = {
  score: 78,
  verdict: "Needs review",
  severities: { high: 1, medium: 3, low: 5 },
  stats: [
    { label: "Total findings", value: "9", sub: "across 3 severities" },
    { label: "Auto-remediated", value: "7", sub: "fixed in manifests" },
    { label: "Needs review", value: "2", sub: "manual action" },
  ],
  findings: [
    { severity: "HIGH", cve: "CVE-2024-2961", title: "glibc iconv() buffer overflow in base layer", pkg: "glibc 2.35", fix: "2.39", status: "Open" },
    { severity: "MEDIUM", cve: "CVE-2023-44487", title: "HTTP/2 Rapid Reset denial of service", pkg: "golang.org/x/net", fix: "0.17.0", status: "Patched" },
    { severity: "MEDIUM", cve: "CVE-2024-24790", title: "net/netip mapped IPv4 mishandling", pkg: "stdlib go1.22", fix: "go1.22.4", status: "Patched" },
    { severity: "MEDIUM", cve: "CVE-2023-39325", title: "net/http HTTP/2 stream DoS", pkg: "stdlib", fix: "go1.21.3", status: "Patched" },
  ],
  secret: { title: "Hard-coded Postgres password", location: "config/dev.yaml : 14", value: "POSTGRES_PASSWORD=orbit", remediated: true },
};

const R = 54;
const C = 2 * Math.PI * R;

const SEV_BADGE: Record<SecurityFinding["severity"], string> = {
  HIGH: "bg-red-soft text-red",
  MEDIUM: "bg-amber-soft text-amber",
  LOW: "bg-surface-2 text-text-2",
};

const STAT_COLOR = ["var(--text)", "var(--green)", "var(--amber)"];

export default async function SecurityPage() {
  const report = await apiGetOr<SecurityReport>(
    "/v1/analyses/an_current/security",
    FALLBACK,
  );

  const sev = [
    { label: "High", n: report.severities.high, color: "var(--red)" },
    { label: "Medium", n: report.severities.medium, color: "var(--amber)" },
    { label: "Low", n: report.severities.low, color: "var(--accent-2)" },
  ];
  const total = sev.reduce((a, s) => a + s.n, 0);

  let start = 0;
  const arcs = sev.map((s) => {
    const len = (s.n / total) * C;
    const arc = { color: s.color, len, offset: -start };
    start += len;
    return arc;
  });

  return (
    <div className="mx-auto max-w-[1240px]">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="mb-1 text-2xl font-semibold tracking-tight">Security</h1>
          <p className="text-sm text-text-2">
            Trivy + gitleaks + SCA · last scan 4 hours ago · orbit-api @ main
          </p>
        </div>
        <button className="rounded-lg border border-accent-border bg-accent-soft px-4 py-2 text-sm font-semibold text-accent">
          Ask AI to fix these
        </button>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_2fr]">
        <Card className="!rounded-[15px] flex flex-col items-center justify-center gap-3.5 p-6">
          <div className="relative h-[132px] w-[132px]">
            <svg width="132" height="132" viewBox="0 0 132 132" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="66" cy="66" r={R} fill="none" stroke="var(--border-strong)" strokeWidth="12" />
              {arcs.map((a, i) => (
                <circle
                  key={i}
                  cx="66"
                  cy="66"
                  r={R}
                  fill="none"
                  stroke={a.color}
                  strokeWidth="12"
                  strokeDasharray={`${a.len} ${C - a.len}`}
                  strokeDashoffset={a.offset}
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">{report.score}</span>
              <span className="text-[11px] text-text-3">/ 100</span>
            </div>
          </div>
          <div className="text-sm font-semibold text-amber">{report.verdict}</div>
          <div className="flex flex-wrap justify-center gap-3.5">
            {sev.map((s) => (
              <span key={s.label} className="flex items-center gap-1.5 text-[11px] text-text-2">
                <span className="h-2 w-2 rounded-sm" style={{ background: s.color }} />
                {s.label} {s.n}
              </span>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {report.stats.map((s, i) => (
            <Card key={s.label} className="!rounded-[15px] px-5 py-4">
              <div className="mb-2 text-xs text-text-3">{s.label}</div>
              <div className="text-2xl font-bold tracking-tight" style={{ color: STAT_COLOR[i % STAT_COLOR.length] }}>
                {s.value}
              </div>
              <div className="mt-1 text-[11px] text-text-2">{s.sub}</div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="!rounded-[15px] mb-4 overflow-hidden !p-0">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="text-sm font-semibold">Vulnerabilities</h3>
          <div className="flex gap-1.5">
            {["All", "High", "Medium", "Low"].map((f, i) => (
              <span key={f} className={`rounded-md px-2 py-1 text-[11px] ${i === 0 ? "bg-accent-soft text-accent" : "text-text-3"}`}>
                {f}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-[110px_1fr_150px_120px_90px] border-b border-border px-5 py-2.5 text-[11px] uppercase tracking-wider text-text-3">
          <span>Severity</span>
          <span>Advisory</span>
          <span>Package</span>
          <span>Fixed in</span>
          <span />
        </div>
        {report.findings.map((v) => (
          <div key={v.cve} className="grid grid-cols-[110px_1fr_150px_120px_90px] items-center border-b border-border px-5 py-3.5">
            <span>
              <span className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${SEV_BADGE[v.severity]}`}>
                {v.severity}
              </span>
            </span>
            <div className="min-w-0">
              <div className="font-mono text-[12.5px] font-semibold">{v.cve}</div>
              <div className="mt-0.5 truncate text-xs text-text-2">{v.title}</div>
            </div>
            <span className="font-mono text-xs text-text-2">{v.pkg}</span>
            <span className="font-mono text-xs text-green">{v.fix}</span>
            <span className={`text-[11px] font-semibold ${v.status === "Open" ? "text-red" : "text-green"}`}>
              {v.status}
            </span>
          </div>
        ))}
      </Card>

      <Card className="!rounded-[15px] px-5 py-5">
        <div className="mb-3.5 flex items-center gap-2.5">
          <h3 className="text-sm font-semibold">Secret detection</h3>
          <span className="rounded-md bg-red-soft px-2 py-0.5 text-[11px] font-bold text-red">
            {report.secret.remediated ? "1 remediated" : "1 exposed"}
          </span>
        </div>
        <div className="flex items-center gap-3.5 rounded-[11px] border border-border bg-bg-elev px-4 py-3">
          <span className="grid h-9 w-9 flex-none place-items-center rounded-[9px] bg-red-soft text-red">!</span>
          <div className="min-w-0 flex-1">
            <div className="text-[13px] font-semibold">{report.secret.title}</div>
            <div className="mt-0.5 font-mono text-xs text-text-2">
              {report.secret.location} · <span className="text-text-3">{report.secret.value}</span>
            </div>
          </div>
          {report.secret.remediated && (
            <span className="whitespace-nowrap text-[11px] font-semibold text-green">
              ✓ Replaced with K8s Secret
            </span>
          )}
        </div>
      </Card>
    </div>
  );
}
