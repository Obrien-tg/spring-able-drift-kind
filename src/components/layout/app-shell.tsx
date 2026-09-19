import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  ClipboardList,
  LayoutDashboard,
  MessageCircle,
  Sparkles,
  TrendingUp,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";
import { UserButton } from "@/lib/auth/gates";
import { cn } from "@/lib/utils";
import type { Profile } from "@/lib/hub/types";

const nav = [
  { to: "/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/hub", label: "Lessons", icon: BookOpen },
  { to: "/assignments", label: "Assignments", icon: ClipboardList },
  { to: "/practice", label: "Practice", icon: Sparkles },
  { to: "/progress", label: "Progress", icon: TrendingUp },
  { to: "/messages", label: "Lounge", icon: MessageCircle },
  { to: "/profile", label: "Profile", icon: UserRound },
];

export function AppShell({
  children,
  profile,
}: {
  children: ReactNode;
  profile: Profile;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-6xl gap-0 md:gap-6 md:px-4 md:py-6">
        <aside className="hidden w-56 shrink-0 md:block">
          <div className="sticky top-6 rounded-[28px] border border-border bg-card p-4 shadow-[var(--shadow-card)]">
            <Link to="/" className="mb-5 flex items-center gap-2 px-1">
              <img src="/images/mascot-owl.jpg" alt="" className="size-9 rounded-full object-cover" />
              <div>
                <p className="font-display text-sm font-semibold leading-tight">PG Hub</p>
                <p className="text-xs capitalize text-muted-foreground">{profile.role}</p>
              </div>
            </Link>
            <nav className="space-y-1">
              {nav.map((item) => {
                const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={cn(
                      "flex h-11 items-center gap-2.5 rounded-2xl px-3 text-sm font-semibold transition-colors",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <item.icon className="size-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-5 border-t border-border pt-4">
              <UserButton />
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1 pb-24 md:pb-0">
          <div className="flex items-center justify-between border-b border-border px-4 py-3 md:hidden">
            <Link to="/dashboard" className="flex items-center gap-2">
              <img src="/images/mascot-owl.jpg" alt="" className="size-8 rounded-full object-cover" />
              <span className="font-display text-sm font-semibold">PG Hub</span>
            </Link>
            <UserButton />
          </div>
          <main className="px-4 py-5 md:px-0 md:py-0">{children}</main>
        </div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur md:hidden">
        <div className="grid grid-cols-5">
          {nav.slice(0, 5).map((item) => {
            const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="size-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
