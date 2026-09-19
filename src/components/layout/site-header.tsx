import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#how", label: "How it works" },
  { href: "/#subjects", label: "Subjects" },
  { href: "/#pricing", label: "Plans" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user, isPending } = useCurrentUserState();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src="/images/mascot-owl.jpg"
            alt=""
            className="size-9 rounded-full object-cover"
          />
          <span className="font-display text-sm font-semibold tracking-tight sm:text-base">
            PG Tutoring Hub
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-muted-foreground md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="h-9 w-28 animate-pulse rounded-full bg-muted" />
          ) : (
            <>
              <SignedOut>
                <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
                  <Link to="/login" search={{ mode: "signin" }}>
                    Sign in
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/login" search={{ mode: "signup", role: "student" }}>
                    Get started
                  </Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <Button size="sm" variant="outline" asChild className="hidden sm:inline-flex">
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <div className="hidden sm:block">
                  <UserButton />
                </div>
              </SignedIn>
            </>
          )}
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div className={cn("md:hidden", open ? "block" : "hidden")}>
        <div className="space-y-1 border-t border-border bg-background px-4 py-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block rounded-xl px-3 py-3 text-sm font-semibold"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          {user ? (
            <Link
              to="/dashboard"
              className="block rounded-xl px-3 py-3 text-sm font-semibold"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              search={{ mode: "signin" }}
              className="block rounded-xl px-3 py-3 text-sm font-semibold"
              onClick={() => setOpen(false)}
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
