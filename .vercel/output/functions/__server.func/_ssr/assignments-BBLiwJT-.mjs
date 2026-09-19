import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { o as formatDue } from "./utils-OBPSrjs4.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { l as listAssignments, v as submitAssignment } from "./api-yLYAzf32.mjs";
import { n as useHubSession, t as AuthGate } from "./guard-BJVVYHaz.mjs";
import { t as Badge } from "./badge-CVMC8lRq.mjs";
import { t as Button } from "./button-DRQCHBxH.mjs";
import { n as CardDesc, r as CardTitle, t as Card } from "./card-BWVJrU2j.mjs";
import { r as Textarea } from "./input-QFlaJFMH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assignments-BBLiwJT-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AssignmentsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssignmentsInner, {}) });
}
function AssignmentsInner() {
	const { profile } = useHubSession();
	const items = useQuery({
		queryKey: ["assignments"],
		queryFn: () => listAssignments()
	}).data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-semibold uppercase tracking-[0.18em] text-primary",
			children: "Assignments"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 text-3xl",
			children: "Work for this week."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: items.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssignmentCard, {
				assignment: a,
				canSubmit: profile?.role === "student"
			}, a.id))
		})]
	});
}
function AssignmentCard({ assignment: a, canSubmit }) {
	const qc = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [content, setContent] = (0, import_react.useState)(a.submissionContent ?? "");
	const mut = useMutation({
		mutationFn: () => submitAssignment({ data: {
			assignmentId: a.id,
			content
		} }),
		onSuccess: () => {
			toast.success("Sent to Patience.");
			setOpen(false);
			qc.invalidateQueries({ queryKey: ["assignments"] });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: a.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDesc, { children: [
				a.materialTitle ?? "Class task",
				" · due ",
				formatDue(a.dueAt)
			] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				tone: a.submissionStatus === "graded" ? "mint" : a.submissionStatus ? "peach" : "ink",
				children: a.submissionStatus === "graded" ? `${a.submissionScore}%` : a.submissionStatus ?? "to do"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm",
			children: a.description
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: a.instructions
		}),
		a.feedback ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 rounded-2xl bg-primary-soft p-3 text-sm",
			children: ["Teacher: ", a.feedback]
		}) : null,
		canSubmit ? open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-4 space-y-3",
			onSubmit: (e) => {
				e.preventDefault();
				mut.mutate();
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: content,
				onChange: (e) => setContent(e.target.value),
				required: true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: mut.isPending,
					children: "Submit"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					onClick: () => setOpen(false),
					children: "Cancel"
				})]
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-4",
			variant: "outline",
			onClick: () => setOpen(true),
			children: a.submissionStatus ? "Update answers" : "Write answers"
		}) : null
	] });
}
//#endregion
export { AssignmentsPage as component };
