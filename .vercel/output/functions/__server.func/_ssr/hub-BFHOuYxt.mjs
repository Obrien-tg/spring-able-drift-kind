import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Clock } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { p as listSubjects, r as createMaterial, u as listMaterials } from "./api-yLYAzf32.mjs";
import { n as useHubSession, t as AuthGate } from "./guard-BJVVYHaz.mjs";
import { t as Badge } from "./badge-CVMC8lRq.mjs";
import { t as Button } from "./button-DRQCHBxH.mjs";
import { t as Card } from "./card-BWVJrU2j.mjs";
import { n as Label, r as Textarea, t as Input } from "./input-QFlaJFMH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hub-BFHOuYxt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HubPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HubInner, {}) });
}
function HubInner() {
	const { profile } = useHubSession();
	const materials = useQuery({
		queryKey: ["materials"],
		queryFn: () => listMaterials()
	});
	const [filter, setFilter] = (0, import_react.useState)("all");
	const items = materials.data ?? [];
	const filtered = (0, import_react.useMemo)(() => filter === "all" ? items : items.filter((m) => m.subjectSlug === filter), [filter, items]);
	const subjects = Array.from(new Map(items.map((m) => [m.subjectSlug, m.subjectName])).entries());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.18em] text-primary",
				children: "Learning hub"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-3xl",
				children: "Lessons ready when you are."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					active: filter === "all",
					onClick: () => setFilter("all"),
					children: "All"
				}), subjects.map(([slug, name]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					active: filter === slug,
					onClick: () => setFilter(slug),
					children: name
				}, slug))]
			}),
			profile?.role === "teacher" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddLesson, {}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: filtered.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/hub/$materialId",
					params: { materialId: String(m.id) },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "h-full p-5 transition-shadow hover:shadow-[var(--shadow-lift)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: m.subjectName }), m.progressStatus === "completed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "peach",
									children: "Done"
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-display text-lg",
								children: m.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: m.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 flex items-center gap-1.5 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }),
									" ",
									m.estimatedMinutes,
									" min · Grade ",
									m.gradeLevel
								]
							})
						]
					})
				}, m.id))
			})
		]
	});
}
function FilterChip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: `h-10 rounded-full px-4 text-sm font-semibold ${active ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"}`,
		children
	});
}
function AddLesson() {
	const qc = useQueryClient();
	const subjects = useQuery({
		queryKey: ["subjects"],
		queryFn: () => listSubjects()
	});
	const [open, setOpen] = (0, import_react.useState)(false);
	const [title, setTitle] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [content, setContent] = (0, import_react.useState)("");
	const [subjectId, setSubjectId] = (0, import_react.useState)(null);
	const mut = useMutation({
		mutationFn: () => createMaterial({ data: {
			title,
			description,
			content,
			subjectId: subjectId ?? subjects.data?.[0]?.id ?? 1,
			materialType: "worksheet",
			difficulty: "beginner",
			gradeLevel: "3-5",
			estimatedMinutes: 20
		} }),
		onSuccess: () => {
			toast.success("Lesson added.");
			setOpen(false);
			setTitle("");
			setDescription("");
			setContent("");
			qc.invalidateQueries({ queryKey: ["materials"] });
		},
		onError: (e) => toast.error(e.message)
	});
	if (!open) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "outline",
		onClick: () => setOpen(true),
		children: "Add a lesson"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-3",
		onSubmit: (e) => {
			e.preventDefault();
			mut.mutate();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "lt",
				children: "Title"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: "lt",
				value: title,
				onChange: (e) => setTitle(e.target.value),
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "ld",
				children: "Short description"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: "ld",
				value: description,
				onChange: (e) => setDescription(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "ls",
				children: "Subject"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				id: "ls",
				className: "h-11 w-full rounded-[14px] border border-input bg-card px-3.5 text-sm",
				value: subjectId ?? subjects.data?.[0]?.id ?? "",
				onChange: (e) => setSubjectId(Number(e.target.value)),
				children: (subjects.data ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: s.id,
					children: s.name
				}, s.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: "lc",
				children: "Lesson text"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				id: "lc",
				value: content,
				onChange: (e) => setContent(e.target.value),
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: mut.isPending,
					children: "Save lesson"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					onClick: () => setOpen(false),
					children: "Cancel"
				})]
			})
		]
	}) });
}
//#endregion
export { HubPage as component };
