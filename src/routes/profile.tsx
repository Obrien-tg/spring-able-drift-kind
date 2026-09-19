import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { AuthGate, useHubSession } from "@/components/auth/guard";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { saveProfile } from "@/lib/hub/api";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  return (
    <AuthGate>
      <ProfileInner />
    </AuthGate>
  );
}

function ProfileInner() {
  const { profile, user } = useHubSession();
  const qc = useQueryClient();
  const [name, setName] = useState(profile?.displayName ?? "");
  const [grade, setGrade] = useState(profile?.gradeLevel ?? "4");
  const mut = useMutation({
    mutationFn: () =>
      saveProfile({
        data: {
          displayName: name,
          role: profile!.role,
          gradeLevel: profile?.role === "student" ? grade : undefined,
          parentEmail: profile?.parentEmail ?? undefined,
        },
      }),
    onSuccess: () => {
      toast.success("Profile updated.");
      void qc.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });
  if (!profile) return null;

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Profile</p>
        <h1 className="mt-1 text-3xl">Your details</h1>
      </header>
      <Card>
        <CardTitle className="capitalize">{profile.role}</CardTitle>
        <p className="mt-1 text-sm text-muted-foreground">{user?.primaryEmail}</p>
        <form
          className="mt-5 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            mut.mutate();
          }}
        >
          <div>
            <Label htmlFor="n">Display name</Label>
            <Input id="n" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          {profile.role === "student" ? (
            <div>
              <Label htmlFor="g">Grade</Label>
              <select
                id="g"
                className="h-11 w-full rounded-[14px] border border-input bg-card px-3.5 text-sm"
                value={grade ?? "4"}
                onChange={(e) => setGrade(e.target.value)}
              >
                {["1", "2", "3", "4", "5", "6", "7"].map((g) => (
                  <option key={g} value={g}>
                    Grade {g}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
          <Button type="submit" disabled={mut.isPending}>
            Save
          </Button>
        </form>
      </Card>
    </div>
  );
}
