const LEGEND = [
  { label: "Compute", color: "var(--accent)" },
  { label: "Edge", color: "var(--accent-2)" },
  { label: "Data", color: "#5b9bd5" },
  { label: "Events", color: "var(--green)" },
];

export default function DiagramPage() {
  return (
    <div className="-m-6 flex h-[calc(100vh-58px)] flex-col">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-border px-8 py-4">
        <div>
          <h1 className="mb-0.5 text-xl font-semibold tracking-tight">
            Architecture diagram
          </h1>
          <p className="text-[13px] text-text-2">
            Reconstructed from the generated Terraform &amp; Kubernetes manifests
          </p>
        </div>
        <div className="flex gap-2 rounded-[10px] border border-border bg-surface p-1">
          <span className="rounded-md bg-accent-soft px-3 py-1.5 text-sm font-semibold text-accent">
            Cloud
          </span>
          <span className="rounded-md px-3 py-1.5 text-sm text-text-2">Logical</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative flex-1 overflow-hidden bg-bg">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(var(--border) 1.1px,transparent 1.1px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="relative grid h-full place-items-center p-6">
          <svg
            viewBox="0 0 900 460"
            className="h-auto w-full max-w-[960px]"
            fontFamily="Geist,sans-serif"
          >
            <defs>
              <marker id="dpArrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto">
                <path d="M0 0 L8 4.5 L0 9 z" fill="var(--text-3)" />
              </marker>
            </defs>

            {/* VPC boundary */}
            <rect x="150" y="70" width="720" height="360" rx="16" fill="none" stroke="var(--border-strong)" strokeWidth="1.5" strokeDasharray="6 5" />
            <text x="168" y="94" fill="var(--text-3)" fontSize="12" fontWeight="600">
              AWS VPC · eu-west-1 · orbit-prod
            </text>

            {/* Edges */}
            <g stroke="var(--text-3)" strokeWidth="1.6" fill="none" markerEnd="url(#dpArrow)" opacity="0.8">
              <path d="M96 250 L212 250" />
              <path d="M300 250 L360 250" />
              <path d="M548 205 L620 150" />
              <path d="M548 250 L620 250" />
              <path d="M548 295 L620 340" />
            </g>

            {/* Client */}
            <g>
              <rect x="20" y="222" width="76" height="56" rx="11" fill="var(--surface)" stroke="var(--border-strong)" />
              <text x="58" y="246" textAnchor="middle" fill="var(--text)" fontSize="12" fontWeight="600">Client</text>
              <text x="58" y="262" textAnchor="middle" fill="var(--text-3)" fontSize="10">HTTPS</text>
            </g>

            {/* ALB */}
            <g>
              <rect x="212" y="220" width="88" height="60" rx="11" fill="var(--surface)" stroke="var(--accent-2)" />
              <text x="256" y="245" textAnchor="middle" fill="var(--text)" fontSize="12" fontWeight="600">ALB</text>
              <text x="256" y="261" textAnchor="middle" fill="var(--text-3)" fontSize="10">:443 → :8080</text>
            </g>

            {/* API pods */}
            <g>
              <rect x="360" y="196" width="188" height="108" rx="13" fill="rgba(124,108,255,.08)" stroke="var(--accent)" />
              <text x="454" y="218" textAnchor="middle" fill="var(--accent)" fontSize="11" fontWeight="700">Deployment · orbit-api ×3</text>
              <rect x="376" y="230" width="50" height="58" rx="9" fill="var(--surface)" stroke="var(--border-strong)" />
              <text x="401" y="263" textAnchor="middle" fill="var(--text-2)" fontSize="10">pod</text>
              <rect x="430" y="230" width="50" height="58" rx="9" fill="var(--surface)" stroke="var(--border-strong)" />
              <text x="455" y="263" textAnchor="middle" fill="var(--text-2)" fontSize="10">pod</text>
              <rect x="484" y="230" width="50" height="58" rx="9" fill="var(--surface)" stroke="var(--border-strong)" />
              <text x="509" y="263" textAnchor="middle" fill="var(--text-2)" fontSize="10">pod</text>
            </g>

            {/* Postgres */}
            <g>
              <rect x="620" y="118" width="150" height="64" rx="11" fill="var(--surface)" stroke="#5b9bd5" />
              <text x="695" y="145" textAnchor="middle" fill="var(--text)" fontSize="12" fontWeight="600">RDS Postgres 16</text>
              <text x="695" y="163" textAnchor="middle" fill="var(--text-3)" fontSize="10">Multi-AZ · db.t4g.medium</text>
            </g>

            {/* Redis */}
            <g>
              <rect x="620" y="218" width="150" height="64" rx="11" fill="var(--surface)" stroke="var(--red)" />
              <text x="695" y="245" textAnchor="middle" fill="var(--text)" fontSize="12" fontWeight="600">Redis 7</text>
              <text x="695" y="263" textAnchor="middle" fill="var(--text-3)" fontSize="10">ElastiCache</text>
            </g>

            {/* NATS */}
            <g>
              <rect x="620" y="318" width="150" height="64" rx="11" fill="var(--surface)" stroke="var(--green)" />
              <text x="695" y="345" textAnchor="middle" fill="var(--text)" fontSize="12" fontWeight="600">NATS stream</text>
              <text x="695" y="363" textAnchor="middle" fill="var(--text-3)" fontSize="10">events</text>
            </g>
          </svg>
        </div>

        {/* Legend */}
        <div className="absolute bottom-5 left-6 flex gap-4 rounded-[10px] border border-border bg-surface px-3.5 py-2.5">
          {LEGEND.map((l) => (
            <span key={l.label} className="flex items-center gap-1.5 text-[11.5px] text-text-2">
              <span
                className="h-2.5 w-2.5 rounded-[3px] border-2"
                style={{ borderColor: l.color }}
              />
              {l.label}
            </span>
          ))}
        </div>

        {/* Zoom */}
        <div className="absolute bottom-5 right-6 flex gap-1.5">
          <span className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg border border-border bg-surface text-text-2">
            −
          </span>
          <span className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg border border-border bg-surface text-text-2">
            +
          </span>
        </div>
      </div>
    </div>
  );
}
