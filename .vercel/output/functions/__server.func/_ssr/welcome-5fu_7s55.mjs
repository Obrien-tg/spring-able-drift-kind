import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Navigate, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { c as useCurrentUserState, t as RedirectToSignIn } from "./utils-OBPSrjs4.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { g as saveProfile, o as getMyProfile } from "./api-yLYAzf32.mjs";
import { t as Button } from "./button-DRQCHBxH.mjs";
import { n as Label, t as Input } from "./input-QFlaJFMH.mjs";
import { t as SiteHeader } from "./site-header-1x8m3mAE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/welcome-5fu_7s55.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var roles = [
	{
		id: "student",
		title: "I’m a student",
		body: "Lessons, assignments, practice games, and Ollie in the lounge."
	},
	{
		id: "parent",
		title: "I’m a parent",
		body: "Follow your child’s work, scores, and teacher notes."
	},
	{
		id: "teacher",
		title: "I’m the teacher",
		body: "Add lessons, set work, mark, and send class notes."
	}
];
function Welcome() {
	const { user, isPending } = useCurrentUserState();
	const navigate = useNavigate();
	const profileQuery = useQuery({
		queryKey: ["profile", user?.id],
		queryFn: () => getMyProfile(),
		enabled: Boolean(user)
	});
	const [role, setRole] = (0, import_react.useState)("student");
	const [name, setName] = (0, import_react.useState)("");
	const [grade, setGrade] = (0, import_react.useState)("4");
	const [parentEmail, setParentEmail] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const stored = sessionStorage.getItem("pg-role");
		if (stored === "student" || stored === "parent" || stored === "teacher") setRole(stored);
		if (user?.displayName) setName(user.displayName);
	}, [user]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-screen bg-background" });
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (profileQuery.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/dashboard" });
	async function onSubmit(e) {
		e.preventDefault();
		setBusy(true);
		try {
			await saveProfile({ data: {
				displayName: name.trim() || user?.displayName || "Learner",
				role,
				gradeLevel: role === "student" ? grade : void 0,
				parentEmail: role === "student" ? parentEmail : void 0
			} });
			sessionStorage.removeItem("pg-role");
			toast.success("Profile saved. Welcome to the hub.");
			await navigate({ to: "/dashboard" });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not save profile.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "mx-auto max-w-xl px-4 py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.18em] text-primary",
					children: "Almost there"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-3xl",
					children: "How will you use the hub?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: [
						"Signed in as ",
						user.primaryEmail ?? user.displayName,
						". Choose a role to open the right dashboard."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 space-y-2",
					children: roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setRole(r.id),
						className: `w-full rounded-[22px] border px-4 py-4 text-left transition-colors ${role === r.id ? "border-primary bg-primary-soft" : "border-border bg-card"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display font-semibold",
							children: r.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: r.body
						})]
					}, r.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "display",
						children: "Display name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "display",
						value: name,
						onChange: (e) => setName(e.target.value),
						required: true
					})] }), role === "student" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "grade",
						children: "Grade"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						id: "grade",
						value: grade,
						onChange: (e) => setGrade(e.target.value),
						className: "h-11 w-full rounded-[14px] border border-input bg-card px-3.5 text-sm",
						children: [
							"1",
							"2",
							"3",
							"4",
							"5",
							"6",
							"7"
						].map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: g,
							children: ["Grade ", g]
						}, g))
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "parent",
						children: "Parent email (optional)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "parent",
						type: "email",
						value: parentEmail,
						onChange: (e) => setParentEmail(e.target.value)
					})] })] }) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "mt-6 w-full",
					disabled: busy,
					children: busy ? "Saving…" : "Enter the hub"
				})
			]
		})]
	});
}
//#endregion
export { Welcome as component };
