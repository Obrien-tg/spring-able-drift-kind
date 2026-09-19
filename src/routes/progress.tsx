import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AuthGate } from "@/components/auth/guard";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { listProgress } from "@/lib/hub/api";

export const Route = createFileRoute("/progress")({ component: ProgressPage });

function ProgressPage() {
  return (
    <AuthGate>
      <ProgressInner />
    </AuthGate>
  );
}

function ProgressInner() {
  const q = useQuery({ queryKey: ["progress"], queryFn: () => listProgress() });
  const data = q.data;
  if (!data) return <p className="text-sm text-muted-foreground">Gathering stars…</p>;

  const doneLessons = data.items.filter((i) => i.progressStatus === "completed").length;
  const lessonPct = data.items.length ? Math.round((doneLessons / data.items.length) * 100) : 0;
  const doneAssign = data.assignments.filter((a) => a.submissionStatus).length;
  const assignPct = data.assignments.length
    ? Math.round((doneAssign / data.assignments.length) * 100)
    : 0;
  const scores = data.assignments.map((a) => a.submissionScore).filter((n): n is number => n != null);
  const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Progress</p>
        <h1 className="mt-1 text-3xl">
          {data.profile.role === "parent" ? "Your child’s trail" : "Your trail"}
        </h1>
      </header>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <p className="text-xs font-semibold uppercase text-muted-foreground">Lessons</p>
          <p className="mt-1 font-display text-3xl tabular-nums">{lessonPct}%</p>
          <ProgressBar value={lessonPct} className="mt-3" />
        </Card>
        <Card className="p-5">
          <p className="text-xs font-semibold uppercase text-muted-foreground">Assignments</p>
          <p className="mt-1 font-display text-3xl tabular-nums">{assignPct}%</p>
          <ProgressBar value={assignPct} className="mt-3" />
        </Card>
        <Card className="p-5">
          <p className="text-xs font-semibold uppercase text-muted-foreground">Average</p>
          <p className="mt-1 font-display text-3xl tabular-nums">{avg == null ? "—" : `${avg}%`}</p>
        </Card>
      </div>
      <Card>
        <CardTitle>Lessons</CardTitle>
        <ul className="mt-4 space-y-3">
          {data.items.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.subjectName}</p>
              </div>
              <Badge tone={item.progressStatus === "completed" ? "mint" : "ink"}>
                {item.progressScore != null
                  ? `${item.progressScore}%`
                  : item.progressStatus ?? "not started"}
              </Badge>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
