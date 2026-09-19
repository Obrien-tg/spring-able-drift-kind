import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getMyProfile, saveProfile } from "@/lib/hub/api";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { SiteHeader } from "@/components/layout/site-header";
import type { Role } from "@/lib/hub/types";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/welcome")({ component: Welcome });

const roles: { id: Role; title: string; body: string }[] = [
  { id: "student", title: "I’m a student", body: "Lessons, assignments, practice games, and Ollie in the lounge." },
  { id: "parent", title: "I’m a parent", body: "Follow your child’s work, scores, and teacher notes." },
  { id: "teacher", title: "I’m the teacher", body: "Add lessons, set work, mark, and send class notes." },
];

function Welcome() {
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const profileQuery = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => getMyProfile(),
    enabled: Boolean(user),
  });
  const [role, setRole] = useState<Role>("student");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("4");
  const [parentEmail, setParentEmail] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("pg-role");
    if (stored === "student" || stored === "parent" || stored === "teacher") {
      setRole(stored);
    }
    if (user?.displayName) setName(user.displayName);
  }, [user]);

  if (isPending) return <div className="min-h-screen bg-background" />;
  if (!user) return <RedirectToSignIn />;
  if (profileQuery.data) return <Navigate to="/dashboard" />;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      await saveProfile({
        data: {
          displayName: name.trim() || user?.displayName || "Learner",
          role,
          gradeLevel: role === "student" ? grade : undefined,
          parentEmail: role === "student" ? parentEmail : undefined,
        },
      });
      sessionStorage.removeItem("pg-role");
      toast.success("Profile saved. Welcome to the hub.");
      await navigate({ to: "/dashboard" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save profile.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <form onSubmit={onSubmit} className="mx-auto max-w-xl px-4 py-12">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Almost there</p>
        <h1 className="mt-2 text-3xl">How will you use the hub?</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Signed in as {user.primaryEmail ?? user.displayName}. Choose a role to open the right dashboard.
        </p>

        <div className="mt-6 space-y-2">
          {roles.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className={`w-full rounded-[22px] border px-4 py-4 text-left transition-colors ${
                role === r.id ? "border-primary bg-primary-soft" : "border-border bg-card"
              }`}
            >
              <p className="font-display font-semibold">{r.title}</p>
              <p className="text-sm text-muted-foreground">{r.body}</p>
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <Label htmlFor="display">Display name</Label>
            <Input id="display" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          {role === "student" ? (
            <>
              <div>
                <Label htmlFor="grade">Grade</Label>
                <select
                  id="grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="h-11 w-full rounded-[14px] border border-input bg-card px-3.5 text-sm"
                >
                  {["1", "2", "3", "4", "5", "6", "7"].map((g) => (
                    <option key={g} value={g}>
                      Grade {g}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="parent">Parent email (optional)</Label>
                <Input
                  id="parent"
                  type="email"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                />
              </div>
            </>
          ) : null}
        </div>

        <Button type="submit" className="mt-6 w-full" disabled={busy}>
          {busy ? "Saving…" : "Enter the hub"}
        </Button>
      </form>
    </div>
  );
}
