import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { AuthGate, useHubSession } from "@/components/auth/guard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDesc, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";
import { listAssignments, submitAssignment } from "@/lib/hub/api";
import { formatDue } from "@/lib/utils";

export const Route = createFileRoute("/assignments")({ component: AssignmentsPage });

function AssignmentsPage() {
  return (
    <AuthGate>
      <AssignmentsInner />
    </AuthGate>
  );
}

function AssignmentsInner() {
  const { profile } = useHubSession();
  const q = useQuery({ queryKey: ["assignments"], queryFn: () => listAssignments() });
  const items = q.data ?? [];

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Assignments</p>
        <h1 className="mt-1 text-3xl">Work for this week.</h1>
      </header>
      <div className="space-y-4">
        {items.map((a) => (
          <AssignmentCard key={a.id} assignment={a} canSubmit={profile?.role === "student"} />
        ))}
      </div>
    </div>
  );
}

function AssignmentCard({
  assignment: a,
  canSubmit,
}: {
  assignment: Awaited<ReturnType<typeof listAssignments>>[number];
  canSubmit: boolean;
}) {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(a.submissionContent ?? "");
  const mut = useMutation({
    mutationFn: () => submitAssignment({ data: { assignmentId: a.id, content } }),
    onSuccess: () => {
      toast.success("Sent to Patience.");
      setOpen(false);
      void qc.invalidateQueries({ queryKey: ["assignments"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <CardTitle>{a.title}</CardTitle>
          <CardDesc>
            {a.materialTitle ?? "Class task"} · due {formatDue(a.dueAt)}
          </CardDesc>
        </div>
        <Badge tone={a.submissionStatus === "graded" ? "mint" : a.submissionStatus ? "peach" : "ink"}>
          {a.submissionStatus === "graded"
            ? `${a.submissionScore}%`
            : a.submissionStatus ?? "to do"}
        </Badge>
      </div>
      <p className="mt-3 text-sm">{a.description}</p>
      <p className="mt-2 text-sm text-muted-foreground">{a.instructions}</p>
      {a.feedback ? (
        <p className="mt-3 rounded-2xl bg-primary-soft p-3 text-sm">Teacher: {a.feedback}</p>
      ) : null}
      {canSubmit ? (
        open ? (
          <form
            className="mt-4 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              mut.mutate();
            }}
          >
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} required />
            <div className="flex gap-2">
              <Button type="submit" disabled={mut.isPending}>
                Submit
              </Button>
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <Button className="mt-4" variant="outline" onClick={() => setOpen(true)}>
            {a.submissionStatus ? "Update answers" : "Write answers"}
          </Button>
        )
      ) : null}
    </Card>
  );
}
