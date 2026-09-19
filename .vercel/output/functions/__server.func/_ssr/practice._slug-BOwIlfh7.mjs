import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { a as cn } from "./utils-OBPSrjs4.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as Route$1 } from "./router-D2B_2qgz.mjs";
import { h as savePracticeScore } from "./api-yLYAzf32.mjs";
import { n as useHubSession, t as AuthGate } from "./guard-BJVVYHaz.mjs";
import { t as Button } from "./button-DRQCHBxH.mjs";
import { t as Card } from "./card-BWVJrU2j.mjs";
import { n as getQuiz, r as scoreQuiz } from "./quizzes-CHz6GTTD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/practice._slug-BOwIlfh7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QuizPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuizInner, {}) });
}
function QuizInner() {
	const { slug } = Route$1.useParams();
	const { profile } = useHubSession();
	const quiz = getQuiz(slug);
	const [picks, setPicks] = (0, import_react.useState)([]);
	const [step, setStep] = (0, import_react.useState)(0);
	const [done, setDone] = (0, import_react.useState)(false);
	const mut = useMutation({ mutationFn: (score) => savePracticeScore({ data: {
		materialTitle: quiz?.materialTitle ?? "",
		score
	} }) });
	if (!quiz) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "That game is not here." });
	const q = quiz.questions[step];
	const score = scoreQuiz(quiz, picks);
	function choose(i) {
		const next = [...picks];
		next[step] = i;
		setPicks(next);
		if (step + 1 < quiz.questions.length) setStep(step + 1);
		else {
			setDone(true);
			const s = scoreQuiz(quiz, next);
			if (profile?.role === "student") mut.mutate(s, { onSuccess: () => toast.success(`Saved ${s}% to your progress.`) });
		}
	}
	if (done) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "mx-auto max-w-lg p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-wide text-primary",
				children: "Finished"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-2 text-3xl",
				children: [score, "%"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: score >= 75 ? "Beautiful work." : "A solid try — peek at the lesson and play again."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/practice",
						children: "More games"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => {
						setPicks([]);
						setStep(0);
						setDone(false);
					},
					children: "Try again"
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs font-semibold uppercase tracking-wide text-primary",
				children: [
					quiz.subject,
					" · ",
					step + 1,
					" / ",
					quiz.questions.length
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl",
				children: quiz.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg",
						children: q.prompt
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 space-y-2",
						children: q.options.map((opt, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => choose(i),
							className: cn("w-full rounded-2xl border border-border bg-muted px-4 py-3 text-left text-sm font-semibold", "transition-colors hover:border-primary hover:bg-primary-soft"),
							children: opt
						}, opt))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-xs text-muted-foreground",
						children: ["Hint: ", q.hint]
					})
				]
			})
		]
	});
}
//#endregion
export { QuizPage as component };
