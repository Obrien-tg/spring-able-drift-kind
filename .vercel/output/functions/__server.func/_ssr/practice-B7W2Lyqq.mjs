import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { l as Sparkles } from "../_libs/lucide-react.mjs";
import { t as AuthGate } from "./guard-BJVVYHaz.mjs";
import { t as Card } from "./card-BWVJrU2j.mjs";
import { t as QUIZZES } from "./quizzes-CHz6GTTD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/practice-B7W2Lyqq.js
var import_jsx_runtime = require_jsx_runtime();
function PracticePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.18em] text-primary",
				children: "Practice"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-3xl",
				children: "Short games. Real thinking."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Four to six minutes each. Scores save to your lesson progress."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2",
			children: QUIZZES.map((quiz) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/practice/$slug",
				params: { slug: quiz.slug },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "h-full p-5 transition-shadow hover:shadow-[var(--shadow-lift)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-lg",
							children: quiz.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: quiz.blurb
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs font-semibold uppercase tracking-wide text-primary",
							children: [
								quiz.subject,
								" · ",
								quiz.minutes,
								" min"
							]
						})
					]
				})
			}, quiz.slug))
		})]
	}) });
}
//#endregion
export { PracticePage as component };
