import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Clock } from "lucide-react";
import { toast } from "sonner";
import { AuthGate, useHubSession } from "@/components/auth/guard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getMaterial, markMaterialDone } from "@/lib/hub/api";

export const Route = createFileRoute("/hub/$materialId")({ component: MaterialPage });

function MaterialPage() {
  return (
    <AuthGate>
      <MaterialInner />
    </AuthGate>
  );
}

function MaterialInner() {
  const { materialId } = Route.useParams();
  const { profile } = useHubSession();
  const qc = useQueryClient();
  const q = useQuery({
    queryKey: ["material", materialId],
    queryFn: () => getMaterial({ data: Number(materialId) }),
  });
  const m = q.data;
  const mut = useMutation({
    mutationFn: () => markMaterialDone({ data: { materialId: Number(materialId) } }),
    onSuccess: () => {
      toast.success("Marked as complete. Well done.");
      void qc.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (q.isPending) return <p className="text-sm text-muted-foreground">Opening lesson…</p>;
  if (!m) return <p>That lesson is not available.</p>;

  return (
    <article className="mx-auto max-w-2xl space-y-5">
      <Link to="/hub" className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
        <ArrowLeft className="size-4" /> All lessons
      </Link>
      <div>
        <Badge>{m.subjectName}</Badge>
        <h1 className="mt-2 text-3xl">{m.title}</h1>
        <p className="mt-2 text-muted-foreground">{m.description}</p>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5" /> {m.estimatedMinutes} min · Grade {m.gradeLevel} · {m.difficulty}
        </p>
      </div>
      <Card className="p-6">
        <div className="space-y-4 text-[15px] leading-7">
          {m.content.split("\n\n").map((para) => (
            <p key={para.slice(0, 24)} className="whitespace-pre-wrap">
              {para}
            </p>
          ))}
        </div>
      </Card>
      {profile?.role === "student" ? (
        <Button onClick={() => mut.mutate()} disabled={mut.isPending || m.progressStatus === "completed"}>
          {m.progressStatus === "completed" ? "Completed" : "Mark complete"}
        </Button>
      ) : null}
    </article>
  );
}
