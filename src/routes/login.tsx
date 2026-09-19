import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  GROK_PROVIDERS,
  authClient,
  authEnabled,
  signIn,
} from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { SiteHeader } from "@/components/layout/site-header";
import type { Role } from "@/lib/hub/types";

type Search = { mode: "signin" | "signup"; role?: Role };

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    mode: search.mode === "signup" ? "signup" : "signin",
    role:
      search.role === "student" || search.role === "parent" || search.role === "teacher"
        ? search.role
        : undefined,
  }),
  component: Login,
});

function Login() {
  const { mode, role } = Route.useSearch();
  const navigate = useNavigate();
  const { user, isPending } = useCurrentUserState();
  const signup = mode === "signup";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  if (!isPending && user) {
    void navigate({ to: "/dashboard" });
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (signup) {
        const { error } = await authClient.signUp.email({
          email,
          password,
          name: name.trim() || "Learner",
        });
        if (error) throw new Error(error.message ?? "Could not create account.");
        if (role) sessionStorage.setItem("pg-role", role);
        toast.success("Welcome in. Let’s set up your profile.");
        await navigate({ to: "/welcome" });
      } else {
        const { error } = await authClient.signIn.email({ email, password });
        if (error) throw new Error(error.message ?? "Could not sign in.");
        toast.success("Signed in.");
        await navigate({ to: "/dashboard" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {signup ? "Join the hub" : "Welcome back"}
          </p>
          <h1 className="mt-3 text-[clamp(1.8rem,4vw,2.8rem)]">
            {signup ? "Create an account and start the learning flow." : "Sign in and continue the learning flow."}
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Lessons, assignments, practice games, and the Class Lounge — all in
            one warm space for students, parents, and Patience.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li>Learning hub</li>
            <li>Family messages</li>
            <li>Progress you can see</li>
          </ul>
        </div>

        <div className="rounded-[28px] border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
          <div className="mb-6 flex rounded-full bg-muted p-1">
            <Link
              to="/login"
              search={{ mode: "signin", role }}
              className={`flex-1 rounded-full py-2 text-center text-sm font-semibold ${
                !signup ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              Sign in
            </Link>
            <Link
              to="/login"
              search={{ mode: "signup", role: role ?? "student" }}
              className={`flex-1 rounded-full py-2 text-center text-sm font-semibold ${
                signup ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              Create account
            </Link>
          </div>

          {authEnabled ? (
            <>
              <form onSubmit={onSubmit} className="space-y-4">
                {signup ? (
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      required
                    />
                  </div>
                ) : null}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={signup ? "new-password" : "current-password"}
                    minLength={8}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={busy}>
                  {busy ? "Please wait…" : signup ? "Create account" : "Sign in"}
                </Button>
              </form>

              <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wide text-muted-foreground">
                <span className="h-px flex-1 bg-border" />
                or
                <span className="h-px flex-1 bg-border" />
              </div>

              <div className="space-y-2">
                {GROK_PROVIDERS.map((p) => (
                  <Button
                    key={p.providerId}
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      if (role) sessionStorage.setItem("pg-role", role);
                      void signIn(p.providerId, { callbackURL: "/welcome" });
                    }}
                  >
                    Continue with {p.label}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Sign-in is disabled.</p>
          )}
        </div>
      </section>
    </div>
  );
}
