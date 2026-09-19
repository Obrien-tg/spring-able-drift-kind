import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { o as formatDue } from "./utils-OBPSrjs4.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as linkChild, i as getDashboard, n as createAssignment, s as gradeSubmission, t as createAnnouncement } from "./api-yLYAzf32.mjs";
import { t as AuthGate } from "./guard-BJVVYHaz.mjs";
import { t as Badge } from "./badge-CVMC8lRq.mjs";
import { t as Button } from "./button-DRQCHBxH.mjs";
import { n as CardDesc, r as CardTitle, t as Card } from "./card-BWVJrU2j.mjs";
import { n as Label, r as Textarea, t as Input } from "./input-QFlaJFMH.mjs";
import { t as ProgressBar } from "./progress-CwRD9mZv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-C9XNl8Wf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DashboardPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardInner, {}) });
}
function DashboardInner() {
	const data = useQuery({
		queryKey: ["dashboard"],
		queryFn: () => getDashboard()
	}).data;
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Loading your week…"
	});
	const { profile, stats } = data;
	const rate = stats.assignments > 0 ? Math.round(stats.completed / stats.assignments * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.18em] text-primary",
					children: profile.role === "teacher" ? "Teacher desk" : profile.role === "parent" ? "Family view" : "Your week"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-1 text-3xl",
					children: [
						"Hello, ",
						profile.displayName.split(" ")[0],
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: profile.role === "parent" && data.childName ? `Following ${data.childName}.` : profile.role === "parent" ? "Link a student email to follow their work." : "Ollie packed a few lessons and a practice game."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Lessons",
						value: String(stats.materials)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Assignments",
						value: String(stats.assignments)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: profile.role === "teacher" ? "Students" : "Average",
						value: profile.role === "teacher" ? String(data.students.length) : stats.averageScore != null ? `${stats.averageScore}%` : "—"
					})
				]
			}),
			profile.role !== "teacher" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Completion" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDesc, { children: [
					stats.completed,
					" of ",
					stats.assignments,
					" assignments in."
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-display text-2xl tabular-nums",
					children: [rate, "%"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
				value: rate,
				className: "mt-4"
			})] }) : null,
			data.announcements[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "bg-primary-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-wide text-accent-foreground",
						children: "Note from class"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "mt-1",
						children: data.announcements[0].title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm",
						children: data.announcements[0].body
					})
				]
			}) : null,
			profile.role === "parent" && !data.childName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParentLink, {}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Upcoming work" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/assignments",
						className: "text-sm font-semibold text-primary",
						children: "All"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: data.upcoming.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: a.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: formatDue(a.dueAt)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: a.submissionStatus === "graded" ? "mint" : "peach",
							children: a.submissionStatus ?? "to do"
						})]
					}, a.id))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Lessons" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/hub",
						className: "text-sm font-semibold text-primary",
						children: "Hub"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3",
					children: data.recentMaterials.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/hub/$materialId",
						params: { materialId: String(m.id) },
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: m.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								m.subjectName,
								" · ",
								m.estimatedMinutes,
								" min"
							]
						})]
					}) }, m.id))
				})] })]
			}),
			profile.role === "teacher" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeacherTools, { data }) : null
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-display text-3xl tabular-nums",
			children: value
		})]
	});
}
function ParentLink() {
	const qc = useQueryClient();
	const [email, setEmail] = (0, import_react.useState)("");
	const mut = useMutation({
		mutationFn: () => linkChild({ data: email }),
		onSuccess: () => {
			toast.success("Child linked.");
			qc.invalidateQueries({ queryKey: ["dashboard"] });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Link your child" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: "Use the email on their student account." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "mt-4 flex flex-col gap-3 sm:flex-row",
			onSubmit: (e) => {
				e.preventDefault();
				mut.mutate();
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				type: "email",
				value: email,
				onChange: (e) => setEmail(e.target.value),
				placeholder: "student@email",
				required: true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				disabled: mut.isPending,
				children: "Link"
			})]
		})
	] });
}
function TeacherTools({ data }) {
	const qc = useQueryClient();
	const [assignTitle, setAssignTitle] = (0, import_react.useState)("");
	const [assignBody, setAssignBody] = (0, import_react.useState)("");
	const [noteTitle, setNoteTitle] = (0, import_react.useState)("");
	const [noteBody, setNoteBody] = (0, import_react.useState)("");
	const [scores, setScores] = (0, import_react.useState)({});
	const makeAssign = useMutation({
		mutationFn: () => createAssignment({ data: {
			title: assignTitle,
			description: assignBody,
			instructions: assignBody,
			materialId: null
		} }),
		onSuccess: () => {
			toast.success("Assignment posted.");
			setAssignTitle("");
			setAssignBody("");
			qc.invalidateQueries({ queryKey: ["dashboard"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const makeNote = useMutation({
		mutationFn: () => createAnnouncement({ data: {
			title: noteTitle,
			body: noteBody
		} }),
		onSuccess: () => {
			toast.success("Note sent.");
			setNoteTitle("");
			setNoteBody("");
			qc.invalidateQueries({ queryKey: ["dashboard"] });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "New assignment" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4 space-y-3",
				onSubmit: (e) => {
					e.preventDefault();
					makeAssign.mutate();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: assignTitle,
						onChange: (e) => setAssignTitle(e.target.value),
						placeholder: "Title",
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: assignBody,
						onChange: (e) => setAssignBody(e.target.value),
						placeholder: "Instructions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: makeAssign.isPending,
						children: "Post to class"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Class note" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-4 space-y-3",
				onSubmit: (e) => {
					e.preventDefault();
					makeNote.mutate();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: noteTitle,
						onChange: (e) => setNoteTitle(e.target.value),
						placeholder: "Title",
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: noteBody,
						onChange: (e) => setNoteBody(e.target.value),
						placeholder: "Message for families"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: makeNote.isPending,
						children: "Share"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Waiting for a mark" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-4",
					children: data.gradeQueue.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Nothing in the queue."
					}) : data.gradeQueue.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-2xl bg-muted p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-semibold",
								children: [
									item.studentName,
									" · ",
									item.assignmentTitle
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 whitespace-pre-wrap text-sm",
								children: item.content
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "mt-3 flex flex-wrap items-end gap-2",
								onSubmit: (e) => {
									e.preventDefault();
									gradeSubmission({ data: {
										submissionId: item.submissionId,
										score: Number(scores[item.submissionId] ?? 80),
										feedback: "Lovely effort — keep going."
									} }).then(() => {
										toast.success("Graded.");
										qc.invalidateQueries({ queryKey: ["dashboard"] });
									}).catch((err) => toast.error(err.message));
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: `s-${item.submissionId}`,
									children: "Score"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: `s-${item.submissionId}`,
									type: "number",
									min: 0,
									max: 100,
									className: "w-24",
									value: scores[item.submissionId] ?? "80",
									onChange: (e) => setScores((s) => ({
										...s,
										[item.submissionId]: e.target.value
									}))
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									size: "sm",
									children: "Grade"
								})]
							})
						]
					}, item.submissionId))
				})]
			})
		]
	});
}
//#endregion
export { DashboardPage as component };
