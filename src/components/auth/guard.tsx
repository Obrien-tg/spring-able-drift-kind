import { Navigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getMyProfile } from "@/lib/hub/api";
import { AppShell } from "@/components/layout/app-shell";
import type { Profile } from "@/lib/hub/types";

export function useHubSession() {
  const { user, isPending } = useCurrentUserState();
  const profileQuery = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => getMyProfile(),
    enabled: Boolean(user),
  });
  return {
    user,
    authPending: isPending,
    profile: (profileQuery.data ?? null) as Profile | null,
    profilePending: Boolean(user) && profileQuery.isPending,
  };
}

export function AuthGate({ children }: { children: ReactNode }) {
  const { user, authPending, profile, profilePending } = useHubSession();
  if (authPending) return <AppSkeleton />;
  if (!user) return <RedirectToSignIn />;
  if (profilePending) return <AppSkeleton />;
  if (!profile) return <Navigate to="/welcome" />;
  return <AppShell profile={profile}>{children}</AppShell>;
}

export function AppSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="h-10 w-48 animate-pulse rounded-full bg-muted" />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="h-32 animate-pulse rounded-[28px] bg-muted" />
        <div className="h-32 animate-pulse rounded-[28px] bg-muted" />
        <div className="h-32 animate-pulse rounded-[28px] bg-muted" />
      </div>
    </div>
  );
}
