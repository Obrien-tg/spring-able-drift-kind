import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { AuthGate, useHubSession } from "@/components/auth/guard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { savePracticeScore } from "@/lib/hub/api";
import { getQuiz, scoreQuiz } from "@/lib/hub/quizzes";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/practice/$slug")({ component: QuizPage });

function QuizPage() {
  return (
    <AuthGate>
      <QuizInner />
    </AuthGate>
  );
}

function QuizInner() {
  const { slug } = Route.useParams();
  const { profile } = useHubSession();
  const quiz = getQuiz(slug);
  const [picks, setPicks] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const mut = useMutation({
    mutationFn: (score: number) =>
      savePracticeScore({ data: { materialTitle: quiz?.materialTitle ?? "", score } }),
  });

  if (!quiz) return <p>That game is not here.</p>;
  const q = quiz.questions[step];
  const score = scoreQuiz(quiz, picks);

  function choose(i: number) {
    const next = [...picks];
    next[step] = i;
    setPicks(next);
    if (step + 1 < quiz!.questions.length) {
      setStep(step + 1);
    } else {
      setDone(true);
      const s = scoreQuiz(quiz!, next);
      if (profile?.role === "student") {
        mut.mutate(s, {
          onSuccess: () => toast.success(`Saved ${s}% to your progress.`),
        });
      }
    }
  }

  if (done) {
    return (
      <Card className="mx-auto max-w-lg p-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Finished</p>
        <h1 className="mt-2 text-3xl">{score}%</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {score >= 75 ? "Beautiful work." : "A solid try — peek at the lesson and play again."}
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button asChild>
            <Link to="/practice">More games</Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setPicks([]);
              setStep(0);
              setDone(false);
            }}
          >
            Try again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
        {quiz.subject} · {step + 1} / {quiz.questions.length}
      </p>
      <h1 className="text-2xl">{quiz.title}</h1>
      <Card className="p-6">
        <p className="font-display text-lg">{q.prompt}</p>
        <div className="mt-5 space-y-2">
          {q.options.map((opt, i) => (
            <button
              key={opt}
              type="button"
              onClick={() => choose(i)}
              className={cn(
                "w-full rounded-2xl border border-border bg-muted px-4 py-3 text-left text-sm font-semibold",
                "transition-colors hover:border-primary hover:bg-primary-soft",
              )}
            >
              {opt}
            </button>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Hint: {q.hint}</p>
      </Card>
    </div>
  );
}
