import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { S as ArrowLeft, _ as Clock } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as Route$2 } from "./router-D2B_2qgz.mjs";
import { a as getMaterial, m as markMaterialDone } from "./api-yLYAzf32.mjs";
import { n as useHubSession, t as AuthGate } from "./guard-BJVVYHaz.mjs";
import { t as Badge } from "./badge-CVMC8lRq.mjs";
import { t as Button } from "./button-DRQCHBxH.mjs";
import { t as Card } from "./card-BWVJrU2j.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hub._materialId-CUuyLyL9.js
var import_jsx_runtime = require_jsx_runtime();
function MaterialPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaterialInner, {}) });
}
function MaterialInner() {
	const { materialId } = Route$2.useParams();
	const { profile } = useHubSession();
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["material", materialId],
		queryFn: () => getMaterial({ data: Number(materialId) })
	});
	const m = q.data;
	const mut = useMutation({
		mutationFn: () => markMaterialDone({ data: { materialId: Number(materialId) } }),
		onSuccess: () => {
			toast.success("Marked as complete. Well done.");
			qc.invalidateQueries();
		},
		onError: (e) => toast.error(e.message)
	});
	if (q.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Opening lesson…"
	});
	if (!m) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "That lesson is not available." });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-2xl space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/hub",
				className: "inline-flex items-center gap-1 text-sm font-semibold text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " All lessons"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: m.subjectName }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-3xl",
					children: m.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted-foreground",
					children: m.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 flex items-center gap-1.5 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }),
						" ",
						m.estimatedMinutes,
						" min · Grade ",
						m.gradeLevel,
						" · ",
						m.difficulty
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4 text-[15px] leading-7",
					children: m.content.split("\n\n").map((para) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whitespace-pre-wrap",
						children: para
					}, para.slice(0, 24)))
				})
			}),
			profile?.role === "student" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => mut.mutate(),
				disabled: mut.isPending || m.progressStatus === "completed",
				children: m.progressStatus === "completed" ? "Completed" : "Mark complete"
			}) : null
		]
	});
}
//#endregion
export { MaterialPage as component };
