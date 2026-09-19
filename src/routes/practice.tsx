import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { AuthGate } from "@/components/auth/guard";
import { Card } from "@/components/ui/card";
import { QUIZZES } from "@/lib/hub/quizzes";

export const Route = createFileRoute("/practice")({ component: PracticePage });

function PracticePage() {
  return (
    <AuthGate>
      <div className="space-y-6">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Practice</p>
          <h1 className="mt-1 text-3xl">Short games. Real thinking.</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Four to six minutes each. Scores save to your lesson progress.
          </p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2">
          {QUIZZES.map((quiz) => (
            <Link key={quiz.slug} to="/practice/$slug" params={{ slug: quiz.slug }}>
              <Card className="h-full p-5 transition-shadow hover:shadow-[var(--shadow-lift)]">
                <Sparkles className="size-5 text-primary" />
                <h2 className="mt-3 font-display text-lg">{quiz.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{quiz.blurb}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-primary">
                  {quiz.subject} · {quiz.minutes} min
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </AuthGate>
  );
}
