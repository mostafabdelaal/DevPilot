import { Card } from "@/components/ui/Card";

type Role = "owner" | "admin" | "member" | "bot";

const MEMBERS: { name: string; email: string; initials: string; bg: string; role: Role }[] = [
  { name: "Dana Reyes", email: "dana@acme-labs.io", initials: "DR", bg: "var(--accent)", role: "owner" },
  { name: "Jae Mercer", email: "jae@acme-labs.io", initials: "JM", bg: "var(--accent-2)", role: "admin" },
  { name: "Priya Lakshmi", email: "priya@acme-labs.io", initials: "PL", bg: "var(--green)", role: "member" },
  { name: "Tom Okafor", email: "tom@acme-labs.io", initials: "TO", bg: "var(--amber)", role: "member" },
  { name: "CI service account", email: "ci@acme-labs.io", initials: "CI", bg: "var(--surface-2)", role: "bot" },
];

const ROLE_CLASS: Record<Role, string> = {
  owner: "bg-accent-soft text-accent",
  admin: "bg-accent-soft text-accent",
  member: "bg-surface-2 text-text-2",
  bot: "bg-surface-2 text-text-3",
};

const FEATURES = [
  "Unlimited repositories & analyses",
  "Streamed deployments with rollback",
  "Security scanning (Trivy + gitleaks)",
  "Multi-cloud cost estimates",
  "Priority support",
];

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-[1080px]">
      <h1 className="mb-5 text-2xl font-semibold tracking-tight">Team &amp; billing</h1>

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[1fr_320px]">
        {/* Members */}
        <Card className="!rounded-[15px] overflow-hidden !p-0">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="text-sm font-semibold">
              Members <span className="font-normal text-text-3">· 5</span>
            </h3>
            <button className="rounded-lg border border-border-strong bg-surface px-3 py-1.5 text-[12.5px] font-semibold hover:bg-surface-2">
              Invite
            </button>
          </div>
          {MEMBERS.map((m) => (
            <div
              key={m.email}
              className="flex items-center gap-3.5 border-b border-border px-5 py-3.5 last:border-0"
            >
              <span
                className="grid h-[34px] w-[34px] flex-none place-items-center rounded-full text-xs font-bold text-white"
                style={{ background: m.bg }}
              >
                {m.initials}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-semibold">{m.name}</div>
                <div className="text-[11.5px] text-text-3">{m.email}</div>
              </div>
              <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${ROLE_CLASS[m.role]}`}>
                {m.role}
              </span>
            </div>
          ))}
        </Card>

        {/* Plan */}
        <div className="flex flex-col gap-4">
          <div
            className="rounded-[15px] border px-5 py-5"
            style={{
              background:
                "linear-gradient(135deg,rgba(124,108,255,.12),rgba(51,214,200,.05))",
              borderColor: "rgba(124,108,255,.25)",
            }}
          >
            <div className="mb-1.5 text-xs text-text-3">Current plan</div>
            <div className="text-xl font-bold tracking-tight">Team</div>
            <div className="mb-4 text-[13px] text-text-2">
              $49 / seat / month · 5 seats
            </div>
            <div className="flex flex-col gap-2.5">
              {FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-2.5 text-[12.5px] text-text-2">
                  <span className="text-green">✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>

          <Card className="!rounded-[15px] px-5 py-5">
            <div className="mb-2.5 flex justify-between text-[13px]">
              <span className="text-text-2">This month</span>
              <span className="font-bold">$245.00</span>
            </div>
            <div className="mb-2 h-1.5 overflow-hidden rounded bg-bg-elev">
              <div
                className="h-full"
                style={{
                  width: "62%",
                  background: "linear-gradient(90deg,var(--accent),var(--accent-2))",
                }}
              />
            </div>
            <div className="text-[11.5px] text-text-3">Renews Aug 1 · Visa ···· 4242</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
