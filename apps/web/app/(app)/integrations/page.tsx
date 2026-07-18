import { Card } from "@/components/ui/Card";
import { apiGetOr } from "@/lib/api";
import type { ApiKey, Integration } from "@/lib/api-types";

export const dynamic = "force-dynamic";

const FALLBACK_INTEGRATIONS: Integration[] = [
  { name: "GitHub", desc: "Source control", connected: true },
  { name: "Amazon Web Services", desc: "Cloud provider", connected: true },
  { name: "Docker Registry", desc: "Image registry", connected: true },
  { name: "Slack", desc: "Notifications", connected: true },
  { name: "Google Cloud", desc: "Cloud provider", connected: false },
  { name: "Datadog", desc: "Observability", connected: false },
];

const FALLBACK_KEYS: ApiKey[] = [
  { name: "Production CI", token: "dp_live_••••••••4a2f", used: "2h ago", scope: "read/write" },
  { name: "Staging deploy", token: "dp_live_••••••••9c01", used: "1d ago", scope: "read/write" },
  { name: "Read-only dashboard", token: "dp_live_••••••••77b3", used: "5d ago", scope: "read" },
];

const TINTS = [
  { tint: "var(--accent-soft)", fg: "var(--accent)" },
  { tint: "var(--amber-soft)", fg: "var(--amber)" },
  { tint: "var(--accent-soft)", fg: "var(--accent-2)" },
  { tint: "var(--green-soft)", fg: "var(--green)" },
  { tint: "var(--surface-2)", fg: "var(--text-3)" },
  { tint: "var(--surface-2)", fg: "var(--text-3)" },
];

function initials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 3).toUpperCase();
}

export default async function IntegrationsPage() {
  const [integrations, keys] = await Promise.all([
    apiGetOr<Integration[]>("/v1/integrations", FALLBACK_INTEGRATIONS),
    apiGetOr<ApiKey[]>("/v1/api-keys", FALLBACK_KEYS),
  ]);

  return (
    <div className="mx-auto max-w-[1080px]">
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">Integrations &amp; API keys</h1>
      <p className="mb-6 text-sm text-text-2">
        Connect DevPilot to your cloud, registry and observability stack
      </p>

      <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {integrations.map((i, idx) => {
          const pal = TINTS[idx % TINTS.length];
          return (
            <div key={i.name} className="flex items-center gap-3.5 rounded-[13px] border border-border bg-surface px-4 py-3.5">
              <span
                className="grid h-[38px] w-[38px] flex-none place-items-center rounded-[10px] text-[11px] font-bold"
                style={{ background: pal.tint, color: pal.fg }}
              >
                {initials(i.name)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-semibold">{i.name}</div>
                <div className="text-[11.5px] text-text-3">{i.desc}</div>
              </div>
              <span
                className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                  i.connected ? "bg-green-soft text-green" : "border border-border text-text-3"
                }`}
              >
                {i.connected ? "connected" : "connect"}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mb-3.5 flex items-center justify-between">
        <h3 className="text-[15px] font-semibold">API keys</h3>
        <button className="rounded-lg border border-border-strong bg-surface px-3.5 py-2 text-[12.5px] font-semibold hover:bg-surface-2">
          + Create key
        </button>
      </div>
      <Card className="!rounded-[15px] overflow-hidden !p-0">
        {keys.map((k) => (
          <div key={k.name} className="flex items-center gap-4 border-b border-border px-5 py-3.5 last:border-0">
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold">{k.name}</div>
              <div className="mt-0.5 font-mono text-xs text-text-3">{k.token}</div>
            </div>
            <span className="text-[11.5px] text-text-3">Last used {k.used}</span>
            <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${k.scope === "read" ? "bg-surface-2 text-text-2" : "bg-accent-soft text-accent"}`}>
              {k.scope}
            </span>
            <button className="rounded-lg border border-border px-3 py-1.5 text-xs text-text-2 hover:bg-surface-2">
              Revoke
            </button>
          </div>
        ))}
      </Card>
    </div>
  );
}
