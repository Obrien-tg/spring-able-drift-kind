import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { AuthGate } from "@/components/auth/guard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDesc, CardTitle } from "@/components/ui/card";
import { Input, Label, Textarea } from "@/components/ui/input";
import { ProgressBar } from "@/components/ui/progress";
import {
  createAnnouncement,
  createAssignment,
  getDashboard,
  gradeSubmission,
  linkChild,
} from "@/lib/hub/api";
import { formatDue } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({ component: DashboardPage });

function DashboardPage() {
  return (
    <AuthGate>
      <DashboardInner />
    </AuthGate>
  );
}

function DashboardInner() {
  const q = useQuery({ queryKey: ["dashboard"], queryFn: () => getDashboard() });
  const data = q.data;
  if (!data) {
    return <p className="text-sm text-muted-foreground">Loading your week…</p>;
  }
  const { profile, stats } = data;
  const rate =
    stats.assignments > 0 ? Math.round((stats.completed / stats.assignments) * 100) : 0;

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {profile.role === "teacher"
            ? "Teacher desk"
            : profile.role === "parent"
              ? "Family view"
              : "Your week"}
        </p>
        <h1 className="mt-1 text-3xl">Hello, {profile.displayName.split(" ")[0]}.</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {profile.role === "parent" && data.childName
            ? `Following ${data.childName}.`
            : profile.role === "parent"
              ? "Link a student email to follow their work."
              : "Ollie packed a few lessons and a practice game."}
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Lessons" value={String(stats.materials)} />
        <Stat label="Assignments" value={String(stats.assignments)} />
        <Stat
          label={profile.role === "teacher" ? "Students" : "Average"}
          value={
            profile.role === "teacher"
              ? String(data.students.length)
              : stats.averageScore != null
                ? `${stats.averageScore}%`
                : "—"
          }
        />
      </div>

      {profile.role !== "teacher" ? (
        <Card>
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle>Completion</CardTitle>
              <CardDesc>
                {stats.completed} of {stats.assignments} assignments in.
              </CardDesc>
            </div>
            <p className="font-display text-2xl tabular-nums">{rate}%</p>
          </div>
          <ProgressBar value={rate} className="mt-4" />
        </Card>
      ) : null}

      {data.announcements[0] ? (
        <Card className="bg-primary-soft">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-foreground">
            Note from class
          </p>
          <CardTitle className="mt-1">{data.announcements[0].title}</CardTitle>
          <p className="mt-2 text-sm">{data.announcements[0].body}</p>
        </Card>
      ) : null}

      {profile.role === "parent" && !data.childName ? <ParentLink /> : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <CardTitle>Upcoming work</CardTitle>
            <Link to="/assignments" className="text-sm font-semibold text-primary">
              All
            </Link>
          </div>
          <ul className="space-y-3">
            {data.upcoming.map((a) => (
              <li key={a.id} className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{formatDue(a.dueAt)}</p>
                </div>
                <Badge tone={a.submissionStatus === "graded" ? "mint" : "peach"}>
                  {a.submissionStatus ?? "to do"}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <CardTitle>Lessons</CardTitle>
            <Link to="/hub" className="text-sm font-semibold text-primary">
              Hub
            </Link>
          </div>
          <ul className="space-y-3">
            {data.recentMaterials.map((m) => (
              <li key={m.id}>
                <Link to="/hub/$materialId" params={{ materialId: String(m.id) }} className="block">
                  <p className="text-sm font-semibold">{m.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {m.subjectName} · {m.estimatedMinutes} min
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {profile.role === "teacher" ? <TeacherTools data={data} /> : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card className="p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-3xl tabular-nums">{value}</p>
    </Card>
  );
}

function ParentLink() {
  const qc = useQueryClient();
  const [email, setEmail] = useState("");
  const mut = useMutation({
    mutationFn: () => linkChild({ data: email }),
    onSuccess: () => {
      toast.success("Child linked.");
      void qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });
  return (
    <Card>
      <CardTitle>Link your child</CardTitle>
      <CardDesc>Use the email on their student account.</CardDesc>
      <form
        className="mt-4 flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          mut.mutate();
        }}
      >
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="student@email"
          required
        />
        <Button type="submit" disabled={mut.isPending}>
          Link
        </Button>
      </form>
    </Card>
  );
}

function TeacherTools({ data }: { data: NonNullable<Awaited<ReturnType<typeof getDashboard>>> }) {
  const qc = useQueryClient();
  const [assignTitle, setAssignTitle] = useState("");
  const [assignBody, setAssignBody] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [scores, setScores] = useState<Record<number, string>>({});

  const makeAssign = useMutation({
    mutationFn: () =>
      createAssignment({
        data: {
          title: assignTitle,
          description: assignBody,
          instructions: assignBody,
          materialId: null,
        },
      }),
    onSuccess: () => {
      toast.success("Assignment posted.");
      setAssignTitle("");
      setAssignBody("");
      void qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const makeNote = useMutation({
    mutationFn: () => createAnnouncement({ data: { title: noteTitle, body: noteBody } }),
    onSuccess: () => {
      toast.success("Note sent.");
      setNoteTitle("");
      setNoteBody("");
      void qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardTitle>New assignment</CardTitle>
        <form
          className="mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            makeAssign.mutate();
          }}
        >
          <Input value={assignTitle} onChange={(e) => setAssignTitle(e.target.value)} placeholder="Title" required />
          <Textarea value={assignBody} onChange={(e) => setAssignBody(e.target.value)} placeholder="Instructions" />
          <Button type="submit" disabled={makeAssign.isPending}>
            Post to class
          </Button>
        </form>
      </Card>
      <Card>
        <CardTitle>Class note</CardTitle>
        <form
          className="mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            makeNote.mutate();
          }}
        >
          <Input value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} placeholder="Title" required />
          <Textarea value={noteBody} onChange={(e) => setNoteBody(e.target.value)} placeholder="Message for families" />
          <Button type="submit" disabled={makeNote.isPending}>
            Share
          </Button>
        </form>
      </Card>
      <Card className="lg:col-span-2">
        <CardTitle>Waiting for a mark</CardTitle>
        <ul className="mt-4 space-y-4">
          {data.gradeQueue.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing in the queue.</p>
          ) : (
            data.gradeQueue.map((item) => (
              <li key={item.submissionId} className="rounded-2xl bg-muted p-4">
                <p className="text-sm font-semibold">
                  {item.studentName} · {item.assignmentTitle}
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm">{item.content}</p>
                <form
                  className="mt-3 flex flex-wrap items-end gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    void gradeSubmission({
                      data: {
                        submissionId: item.submissionId,
                        score: Number(scores[item.submissionId] ?? 80),
                        feedback: "Lovely effort — keep going.",
                      },
                    })
                      .then(() => {
                        toast.success("Graded.");
                        void qc.invalidateQueries({ queryKey: ["dashboard"] });
                      })
                      .catch((err: Error) => toast.error(err.message));
                  }}
                >
                  <div>
                    <Label htmlFor={`s-${item.submissionId}`}>Score</Label>
                    <Input
                      id={`s-${item.submissionId}`}
                      type="number"
                      min={0}
                      max={100}
                      className="w-24"
                      value={scores[item.submissionId] ?? "80"}
                      onChange={(e) =>
                        setScores((s) => ({ ...s, [item.submissionId]: e.target.value }))
                      }
                    />
                  </div>
                  <Button type="submit" size="sm">
                    Grade
                  </Button>
                </form>
              </li>
            ))
          )}
        </ul>
      </Card>
    </div>
  );
}
