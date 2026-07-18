import { Card } from "@/components/ui/Card";

const R = 40;
const C = 2 * Math.PI * R;

function scoreColor(v: number): string {
  if (v >= 80) return "var(--green)";
  if (v >= 60) return "var(--amber)";
  return "var(--red)";
}

/** Radial score gauge (0–100), matching the prototype's dashboard rings. */
export function Gauge({ label, value }: { label: string; value: number }) {
  const color = scoreColor(value);
  const dash = (value / 100) * C;

  return (
    <Card className="flex flex-col items-center gap-3 py-5">
      <div className="relative h-[104px] w-[104px]">
        <svg width="104" height="104" viewBox="0 0 104 104" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="52" cy="52" r={R} fill="none" stroke="var(--border-strong)" strokeWidth="9" />
          <circle
            cx="52"
            cy="52"
            r={R}
            fill="none"
            stroke={color}
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${C - dash}`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">{value}</span>
        </div>
      </div>
      <div className="text-xs uppercase tracking-wider text-text-3">{label}</div>
    </Card>
  );
}
