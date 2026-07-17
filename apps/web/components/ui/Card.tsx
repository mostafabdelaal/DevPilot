import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-card border border-border bg-surface p-4 ${className}`}
    >
      {children}
    </div>
  );
}

export function StatTile({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string | number;
  suffix?: string;
}) {
  return (
    <Card>
      <div className="text-xs uppercase tracking-wider text-text-3">{label}</div>
      <div className="mt-2 text-3xl font-semibold text-text">
        {value}
        {suffix && <span className="ml-1 text-base text-text-2">{suffix}</span>}
      </div>
    </Card>
  );
}
