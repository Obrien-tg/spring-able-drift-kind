import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { f as listProgress } from "./api-yLYAzf32.mjs";
import { t as AuthGate } from "./guard-BJVVYHaz.mjs";
import { t as Badge } from "./badge-CVMC8lRq.mjs";
import { r as CardTitle, t as Card } from "./card-BWVJrU2j.mjs";
import { t as ProgressBar } from "./progress-CwRD9mZv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-CD7RPyCG.js
var import_jsx_runtime = require_jsx_runtime();
function ProgressPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressInner, {}) });
}
function ProgressInner() {
	const data = useQuery({
		queryKey: ["progress"],
		queryFn: () => listProgress()
	}).data;
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Gathering stars…"
	});
	const doneLessons = data.items.filter((i) => i.progressStatus === "completed").length;
	const lessonPct = data.items.length ? Math.round(doneLessons / data.items.length * 100) : 0;
	const doneAssign = data.assignments.filter((a) => a.submissionStatus).length;
	const assignPct = data.assignments.length ? Math.round(doneAssign / data.assignments.length * 100) : 0;
	const scores = data.assignments.map((a) => a.submissionScore).filter((n) => n != null);
	const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.18em] text-primary",
				children: "Progress"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-3xl",
				children: data.profile.role === "parent" ? "Your child’s trail" : "Your trail"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase text-muted-foreground",
								children: "Lessons"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-display text-3xl tabular-nums",
								children: [lessonPct, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
								value: lessonPct,
								className: "mt-3"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase text-muted-foreground",
								children: "Assignments"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-display text-3xl tabular-nums",
								children: [assignPct, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
								value: assignPct,
								className: "mt-3"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase text-muted-foreground",
							children: "Average"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-3xl tabular-nums",
							children: avg == null ? "—" : `${avg}%`
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Lessons" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-3",
				children: data.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: item.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: item.subjectName
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: item.progressStatus === "completed" ? "mint" : "ink",
						children: item.progressScore != null ? `${item.progressScore}%` : item.progressStatus ?? "not started"
					})]
				}, item.id))
			})] })
		]
	});
}
//#endregion
export { ProgressPage as component };
