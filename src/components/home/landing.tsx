import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Check,
  ChevronDown,
  Gamepad2,
  Heart,
  MessageCircle,
  Palette,
  Puzzle,
  Sparkles,
  Star,
  Sun,
  Trophy,
  Users,
} from "lucide-react";
import { useState } from "react";
import { SignedIn, SignedOut } from "@/lib/auth/gates";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const steps = [
  { n: "01", title: "Sign up", body: "Create a student or parent account in a minute. No clutter, just a warm welcome." },
  { n: "02", title: "Meet your tutor", body: "Patience (and Ollie) greet you, learn your pace, and pick a starting lesson." },
  { n: "03", title: "Learn & practice", body: "Work through lessons, games, and assignments with feedback you can actually use." },
  { n: "04", title: "Celebrate success", body: "Stars, scores, and family updates make progress visible — and worth cheering." },
];

const subjects = [
  { name: "Mathematics", blurb: "Number sense, fractions, times tables, and calm problem solving.", grades: "Grades 1–7", icon: Sparkles },
  { name: "English", blurb: "Reading, spelling, comprehension, and story-building.", grades: "Grades 1–7", icon: BookOpen },
  { name: "Science", blurb: "Living things, weather, water, magnets — curious questions first.", grades: "Grades 1–7", icon: Sun },
  { name: "Creative Arts", blurb: "Colour, drawing, and making, so ideas have somewhere to go.", grades: "Grades 1–7", icon: Palette },
];

const services = [
  { n: "01", title: "Personal tutoring", body: "One-to-one sessions that follow the learner, not a script." },
  { n: "02", title: "Family messaging", body: "A class lounge for students, parents, and the teacher." },
  { n: "03", title: "Lessons hub", body: "Worksheets, stories, and investigations in one clear place." },
  { n: "04", title: "Progress tracking", body: "Milestones and scores without hunting through menus." },
  { n: "05", title: "Parent visibility", body: "See assignments, feedback, and how the week is going." },
  { n: "06", title: "Practice games", body: "Short quizzes that turn revision into a small adventure." },
];

const plans = [
  {
    name: "Starter",
    price: "R150",
    note: "per month",
    points: ["1 subject focus", "Weekly lesson pack", "Parent progress note"],
  },
  {
    name: "Learner",
    price: "R350",
    note: "per month · most families",
    popular: true,
    points: ["Up to 3 subjects", "Assignments with feedback", "Practice games + lounge"],
  },
  {
    name: "Scholar",
    price: "R550",
    note: "per month",
    points: ["All subjects, Grades 1–7", "Priority marking", "Weekly challenge + reports"],
  },
];

const reviews = [
  {
    quote: "My Grade 3 finally enjoys fractions. The lessons feel like a story, not a scolding.",
    name: "Thandi M.",
    role: "Parent",
  },
  {
    quote: "Ollie is funny and the quizzes are short. I like seeing the stars go up.",
    name: "Lerato",
    role: "Grade 5 student",
  },
  {
    quote: "I can check homework from my phone after work. Clear, kind, and organised.",
    name: "James K.",
    role: "Parent",
  },
];

const faqs = [
  {
    q: "Which grades do you teach?",
    a: "Primary school, Grades 1–7, with Mathematics, English, Science, and Creative Arts.",
  },
  {
    q: "How do sessions work?",
    a: "Families sign in, open the hub, and follow the week’s lessons. Live notes go through the Class Lounge. Patience sets the pace for each child.",
  },
  {
    q: "What is in each plan?",
    a: "Starter is a gentle single-subject month. Learner covers most families with three subjects and marking. Scholar is the full programme plus weekly challenges.",
  },
  {
    q: "Can parents see progress?",
    a: "Yes. A parent account links to the student’s email and opens the same assignments, scores, and feedback.",
  },
  {
    q: "Is this only online?",
    a: "The hub is built for families on phones and laptops. In-person sessions can be arranged directly with Patience.",
  },
  {
    q: "How do we start?",
    a: "Create a student or parent account, pick a role, and open the first lesson. Ollie will be in the lounge if you get stuck.",
  },
];

export function LandingPage() {
  return (
    <div>
      <Hero />
      <How />
      <Subjects />
      <Services />
      <Fun />
      <About />
      <Pricing />
      <Reviews />
      <Faq />
      <Cta />
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Primary school tutoring · Patience Gwanyanya
          </p>
          <h1 className="mt-3 max-w-xl text-[clamp(2rem,5vw,3.4rem)]">
            Learning made fun and easy for kids and families.
          </h1>
          <p className="mt-4 max-w-lg text-base text-muted-foreground sm:text-lg">
            Personal tutoring that follows your child’s pace — lessons, practice,
            progress, and a kind place to ask for help.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <SignedOut>
              <Button size="lg" className="cta-glow" asChild>
                <Link to="/login" search={{ mode: "signup", role: "student" }}>
                  Register as a student
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login" search={{ mode: "signin" }}>
                  Sign in
                </Link>
              </Button>
            </SignedOut>
            <SignedIn>
              <Button size="lg" className="cta-glow" asChild>
                <Link to="/dashboard">Go to dashboard</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#subjects">Explore subjects</a>
              </Button>
            </SignedIn>
          </div>
          <div className="mt-8 flex items-center gap-3 rounded-[22px] border border-border bg-card px-4 py-3 shadow-[var(--shadow-card)]">
            <img src="/images/mascot-owl.jpg" alt="" className="size-12 rounded-2xl object-cover" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Meet Ollie
              </p>
              <p className="text-sm">Your study buddy in the Class Lounge.</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src="/images/hero-kids-learning.jpg"
            alt="Illustrated children learning with Ollie the owl"
            className="w-full rounded-[32px] object-cover shadow-[var(--shadow-lift)]"
          />
          <img
            src="/images/mascot-owl.jpg"
            alt="Ollie the owl mascot"
            className="mascot-float absolute -bottom-6 -left-3 w-28 rounded-[28px] object-cover shadow-[var(--shadow-lift)] sm:-left-6 sm:w-36"
          />
        </div>
      </div>
    </section>
  );
}

function How() {
  return (
    <section id="how" className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">How it works</p>
          <h2 className="mt-2 max-w-xl text-[clamp(1.6rem,3vw,2.3rem)]">Four calm steps from hello to high five.</h2>
        </Reveal>
        <Reveal className="mt-8">
          <img
            src="/images/how-it-works.jpg"
            alt="Four illustrated steps of the tutoring journey"
            className="w-full rounded-[28px] object-cover"
          />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 70}>
              <Card className="h-full p-5">
                <p className="text-xs font-semibold tracking-wide text-primary">{step.n}</p>
                <h3 className="mt-2 font-display text-lg">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Subjects() {
  return (
    <section id="subjects" className="bg-muted px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Subjects</p>
          <h2 className="mt-2 max-w-xl text-[clamp(1.6rem,3vw,2.3rem)]">Four paths, Grades 1–7.</h2>
        </Reveal>
        <Reveal className="mt-8">
          <img
            src="/images/subjects-icons.jpg"
            alt="Illustrated icons for mathematics, English, science, and creative arts"
            className="w-full rounded-[28px] object-cover"
          />
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {subjects.map((s, i) => (
            <Reveal key={s.name} delay={i * 60}>
              <Card className="wiggle-hover flex h-full gap-4 p-5">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary-soft text-primary">
                  <s.icon className="size-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg">{s.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.blurb}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-primary">{s.grades}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">The hub</p>
          <h2 className="mx-auto mt-2 max-w-xl text-[clamp(1.6rem,3vw,2.3rem)]">
            Soft colours, clear learning paths, no noise.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.n} delay={i * 50}>
              <Card className="h-full p-5">
                <p className="text-xs font-semibold text-primary">{s.n}</p>
                <h3 className="mt-2 font-display text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Fun() {
  const bits = [
    { icon: Star, title: "Star trail", body: "Lessons and quizzes add up to a week you can actually see." },
    { icon: Gamepad2, title: "Practice games", body: "Short rounds for fractions, tables, and science." },
    { icon: Puzzle, title: "Puzzles", body: "Story questions and colour labs that stretch thinking." },
    { icon: Trophy, title: "Weekly challenge", body: "One extra quest for Scholar families, posted in the lounge." },
  ];
  return (
    <section id="fun" className="px-4 py-16">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-10">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-peach">Fun learning</p>
          <h2 className="mt-2 max-w-xl text-[clamp(1.6rem,3vw,2.3rem)]">An adventure, not a pile of worksheets.</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Stars, games, puzzles, and a weekly challenge live inside the hub —
            always optional, always kind, never a loud leaderboard.
          </p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bits.map((b) => (
            <div key={b.title} className="rounded-2xl bg-muted p-4">
              <b.icon className="size-5 text-primary" />
              <h3 className="mt-3 font-display text-base">{b.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const points = [
    "Certified primary-school educator with classroom experience",
    "Methods designed for mobile-first families",
    "Progress tracking that keeps parents in the loop",
    "Personal feedback on every assignment",
  ];
  return (
    <section id="about" className="px-4 py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">About</p>
          <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.3rem)]">Built around a teacher, not a marketing script.</h2>
          <p className="mt-4 text-muted-foreground">
            Patience Gwanyanya leads the tutoring with clarity, consistency, and
            approachable guidance for primary learners.
          </p>
          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex gap-3 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Button asChild>
              <Link to="/login" search={{ mode: "signup", role: "parent" }}>
                Register as a parent
              </Link>
            </Button>
          </div>
        </Reveal>
        <Reveal>
          <Card className="flex items-center gap-4 p-5">
            <div className="grid size-20 place-items-center rounded-full bg-primary text-2xl font-semibold text-primary-foreground">
              PG
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Lead tutor</p>
              <h3 className="font-display text-xl">Patience Gwanyanya</h3>
              <p className="text-sm text-muted-foreground">Founder · primary education</p>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-primary">
                <Heart className="size-4" /> Families first
              </p>
            </div>
          </Card>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[
              { n: "1:1", l: "Tutoring" },
              { n: "1–7", l: "Grades" },
              { n: "4", l: "Subjects" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-muted p-4 text-center">
                <p className="font-display text-xl">{s.n}</p>
                <p className="text-xs text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="bg-muted px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Plans</p>
          <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.3rem)]">Simple monthly plans in rand.</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 80}>
              <Card className={cn("flex h-full flex-col p-6", plan.popular && "ring-2 ring-primary")}>
                {plan.popular ? (
                  <p className="mb-3 w-fit rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Most families
                  </p>
                ) : null}
                <h3 className="font-display text-xl">{plan.name}</h3>
                <p className="mt-2 font-display text-4xl">{plan.price}</p>
                <p className="text-sm text-muted-foreground">{plan.note}</p>
                <ul className="mt-5 flex-1 space-y-2 text-sm">
                  {plan.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <Check className="mt-0.5 size-4 text-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Button className="mt-6 w-full" variant={plan.popular ? "default" : "outline"} asChild>
                  <Link to="/login" search={{ mode: "signup", role: "parent" }}>
                    Choose {plan.name}
                  </Link>
                </Button>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="love" className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Families</p>
          <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.3rem)]">Kind words from the first tables.</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 70}>
              <Card className="h-full p-5">
                <div className="flex gap-1 text-peach">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm">“{r.quote}”</p>
                <p className="mt-4 text-sm font-semibold">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.role}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">FAQ</p>
          <h2 className="mt-2 text-[clamp(1.6rem,3vw,2.3rem)]">Questions parents usually ask.</h2>
        </Reveal>
        <div className="mt-8 space-y-2">
          {faqs.map((item, i) => {
            const on = open === i;
            return (
              <div key={item.q} className="rounded-[22px] border border-border bg-card">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                  onClick={() => setOpen(on ? null : i)}
                  aria-expanded={on}
                >
                  <span className="font-display text-base font-semibold">{item.q}</span>
                  <ChevronDown className={cn("size-5 shrink-0 transition-transform", on && "rotate-180")} />
                </button>
                {on ? <p className="px-5 pb-5 text-sm text-muted-foreground">{item.a}</p> : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="px-4 pb-20">
      <Reveal>
        <div className="mx-auto max-w-6xl rounded-[32px] bg-primary px-6 py-12 text-primary-foreground sm:px-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-primary-soft">
                <Users className="size-4" /> Students and parents welcome
              </p>
              <h2 className="mt-2 max-w-lg text-[clamp(1.6rem,3vw,2.3rem)] text-primary-foreground">
                Get started today and start learning together.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/login" search={{ mode: "signup", role: "student" }}>
                  Register as student
                </Link>
              </Button>
              <Button
                size="lg"
                asChild
                className="border border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-bright"
              >
                <Link to="/login" search={{ mode: "signup", role: "parent" }}>
                  Register as parent
                </Link>
              </Button>
            </div>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-primary-soft">
            <MessageCircle className="size-4" /> Already have an account?{" "}
            <Link to="/login" search={{ mode: "signin" }} className="underline">
              Sign in
            </Link>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
