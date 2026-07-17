import { Card } from "@/components/ui/Card";

/**
 * Placeholder for screens not yet migrated from the prototype.
 * Replace with the real screen implementation during its sprint.
 */
export function ScreenStub({
  title,
  note,
}: {
  title: string;
  note?: string;
}) {
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-xl font-semibold">{title}</h1>
      <Card className="mt-4">
        <p className="text-sm text-text-2">
          {note ??
            "Screen scaffolded. UI to be migrated from the prototype, preserving the design."}
        </p>
        <p className="mt-2 text-xs text-text-3">
          Reference: apps/prototype/DevPilot AI.dc.html
        </p>
      </Card>
    </div>
  );
}
