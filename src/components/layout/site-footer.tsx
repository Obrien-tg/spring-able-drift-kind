import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2">
          <div className="flex items-center gap-2">
            <img src="/images/mascot-owl.jpg" alt="" className="size-8 rounded-full object-cover" />
            <p className="font-display font-semibold">PG Tutoring Hub</p>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Primary-school tutoring with Patience Gwanyanya. Calm lessons, clear
            progress, and a friendly owl named Ollie.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Explore
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="/#how">How it works</a></li>
            <li><a href="/#subjects">Subjects</a></li>
            <li><a href="/#pricing">Plans</a></li>
            <li><a href="/#faq">FAQ</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Get started
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/login" search={{ mode: "signup", role: "student" }}>
                Student sign up
              </Link>
            </li>
            <li>
              <Link to="/login" search={{ mode: "signup", role: "parent" }}>
                Parent sign up
              </Link>
            </li>
            <li>
              <Link to="/login" search={{ mode: "signin" }}>
                Sign in
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Patience Gwanyanya · PG Tutoring Hub
      </div>
    </footer>
  );
}
