import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { g as saveProfile } from "./api-yLYAzf32.mjs";
import { n as useHubSession, t as AuthGate } from "./guard-BJVVYHaz.mjs";
import { t as Button } from "./button-DRQCHBxH.mjs";
import { r as CardTitle, t as Card } from "./card-BWVJrU2j.mjs";
import { n as Label, t as Input } from "./input-QFlaJFMH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-BDAkvt5I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileInner, {}) });
}
function ProfileInner() {
	const { profile, user } = useHubSession();
	const qc = useQueryClient();
	const [name, setName] = (0, import_react.useState)(profile?.displayName ?? "");
	const [grade, setGrade] = (0, import_react.useState)(profile?.gradeLevel ?? "4");
	const mut = useMutation({
		mutationFn: () => saveProfile({ data: {
			displayName: name,
			role: profile.role,
			gradeLevel: profile?.role === "student" ? grade : void 0,
			parentEmail: profile?.parentEmail ?? void 0
		} }),
		onSuccess: () => {
			toast.success("Profile updated.");
			qc.invalidateQueries();
		},
		onError: (e) => toast.error(e.message)
	});
	if (!profile) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-lg space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs font-semibold uppercase tracking-[0.18em] text-primary",
			children: "Profile"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 text-3xl",
			children: "Your details"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "capitalize",
				children: profile.role
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: user?.primaryEmail
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-5 space-y-4",
				onSubmit: (e) => {
					e.preventDefault();
					mut.mutate();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "n",
						children: "Display name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "n",
						value: name,
						onChange: (e) => setName(e.target.value),
						required: true
					})] }),
					profile.role === "student" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "g",
						children: "Grade"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						id: "g",
						className: "h-11 w-full rounded-[14px] border border-input bg-card px-3.5 text-sm",
						value: grade ?? "4",
						onChange: (e) => setGrade(e.target.value),
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
					})] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: mut.isPending,
						children: "Save"
					})
				]
			})
		] })]
	});
}
//#endregion
export { ProfilePage as component };
