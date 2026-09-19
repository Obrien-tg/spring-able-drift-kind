import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Clock } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AuthGate, useHubSession } from "@/components/auth/guard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { createMaterial, listMaterials, listSubjects } from "@/lib/hub/api";

export const Route = createFileRoute("/hub")({ component: HubPage });

function HubPage() {
  return (
    <AuthGate>
      <HubInner />
    </AuthGate>
  );
}

function HubInner() {
  const { profile } = useHubSession();
  const materials = useQuery({ queryKey: ["materials"], queryFn: () => listMaterials() });
  const [filter, setFilter] = useState("all");
  const items = materials.data ?? [];
  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((m) => m.subjectSlug === filter)),
    [filter, items],
  );
  const subjects = Array.from(new Map(items.map((m) => [m.subjectSlug, m.subjectName])).entries());

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Learning hub</p>
        <h1 className="mt-1 text-3xl">Lessons ready when you are.</h1>
      </header>
      <div className="flex flex-wrap gap-2">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          All
        </FilterChip>
        {subjects.map(([slug, name]) => (
          <FilterChip key={slug} active={filter === slug} onClick={() => setFilter(slug)}>
            {name}
          </FilterChip>
        ))}
      </div>
      {profile?.role === "teacher" ? <AddLesson /> : null}
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((m) => (
          <Link key={m.id} to="/hub/$materialId" params={{ materialId: String(m.id) }}>
            <Card className="h-full p-5 transition-shadow hover:shadow-[var(--shadow-lift)]">
              <div className="flex items-center justify-between gap-2">
                <Badge>{m.subjectName}</Badge>
                {m.progressStatus === "completed" ? <Badge tone="peach">Done</Badge> : null}
              </div>
              <h2 className="mt-3 font-display text-lg">{m.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="size-3.5" /> {m.estimatedMinutes} min · Grade {m.gradeLevel}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-10 rounded-full px-4 text-sm font-semibold ${
        active ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function AddLesson() {
  const qc = useQueryClient();
  const subjects = useQuery({ queryKey: ["subjects"], queryFn: () => listSubjects() });
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [subjectId, setSubjectId] = useState<number | null>(null);
  const mut = useMutation({
    mutationFn: () =>
      createMaterial({
        data: {
          title,
          description,
          content,
          subjectId: subjectId ?? subjects.data?.[0]?.id ?? 1,
          materialType: "worksheet",
          difficulty: "beginner",
          gradeLevel: "3-5",
          estimatedMinutes: 20,
        },
      }),
    onSuccess: () => {
      toast.success("Lesson added.");
      setOpen(false);
      setTitle("");
      setDescription("");
      setContent("");
      void qc.invalidateQueries({ queryKey: ["materials"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
  if (!open) {
    return (
      <Button variant="outline" onClick={() => setOpen(true)}>
        Add a lesson
      </Button>
    );
  }
  return (
    <Card>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          mut.mutate();
        }}
      >
        <Label htmlFor="lt">Title</Label>
        <Input id="lt" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Label htmlFor="ld">Short description</Label>
        <Input id="ld" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Label htmlFor="ls">Subject</Label>
        <select
          id="ls"
          className="h-11 w-full rounded-[14px] border border-input bg-card px-3.5 text-sm"
          value={subjectId ?? subjects.data?.[0]?.id ?? ""}
          onChange={(e) => setSubjectId(Number(e.target.value))}
        >
          {(subjects.data ?? []).map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <Label htmlFor="lc">Lesson text</Label>
        <Textarea id="lc" value={content} onChange={(e) => setContent(e.target.value)} required />
        <div className="flex gap-2">
          <Button type="submit" disabled={mut.isPending}>
            Save lesson
          </Button>
          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
