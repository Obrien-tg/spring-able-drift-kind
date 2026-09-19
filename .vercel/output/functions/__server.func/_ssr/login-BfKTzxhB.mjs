import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { t as GROK_PROVIDERS } from "./server-B2l21ubT.mjs";
import { c as useCurrentUserState } from "./utils-OBPSrjs4.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as Route$8 } from "./router-D2B_2qgz.mjs";
import { t as Button } from "./button-DRQCHBxH.mjs";
import { n as Label, t as Input } from "./input-QFlaJFMH.mjs";
import { t as SiteHeader } from "./site-header-1x8m3mAE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BfKTzxhB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { mode, role } = Route$8.useSearch();
	const navigate = useNavigate();
	const { user, isPending } = useCurrentUserState();
	const signup = mode === "signup";
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (!isPending && user) navigate({ to: "/dashboard" });
	async function onSubmit(e) {
		e.preventDefault();
		setBusy(true);
		try {
			if (signup) {
				const { error } = await authClient.signUp.email({
					email,
					password,
					name: name.trim() || "Learner"
				});
				if (error) throw new Error(error.message ?? "Could not create account.");
				if (role) sessionStorage.setItem("pg-role", role);
				toast.success("Welcome in. Let’s set up your profile.");
				await navigate({ to: "/welcome" });
			} else {
				const { error } = await authClient.signIn.email({
					email,
					password
				});
				if (error) throw new Error(error.message ?? "Could not sign in.");
				toast.success("Signed in.");
				await navigate({ to: "/dashboard" });
			}
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something went wrong.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-2 lg:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.18em] text-primary",
					children: signup ? "Join the hub" : "Welcome back"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-[clamp(1.8rem,4vw,2.8rem)]",
					children: signup ? "Create an account and start the learning flow." : "Sign in and continue the learning flow."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-md text-muted-foreground",
					children: "Lessons, assignments, practice games, and the Class Lounge — all in one warm space for students, parents, and Patience."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-6 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Learning hub" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Family messages" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Progress you can see" })
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[28px] border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 flex rounded-full bg-muted p-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						search: {
							mode: "signin",
							role
						},
						className: `flex-1 rounded-full py-2 text-center text-sm font-semibold ${!signup ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`,
						children: "Sign in"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						search: {
							mode: "signup",
							role: role ?? "student"
						},
						className: `flex-1 rounded-full py-2 text-center text-sm font-semibold ${signup ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`,
						children: "Create account"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit,
						className: "space-y-4",
						children: [
							signup ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "name",
								children: "Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "name",
								value: name,
								onChange: (e) => setName(e.target.value),
								autoComplete: "name",
								required: true
							})] }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "email",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "email",
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								autoComplete: "email",
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "password",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "password",
								type: "password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								autoComplete: signup ? "new-password" : "current-password",
								minLength: 8,
								required: true
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "w-full",
								disabled: busy,
								children: busy ? "Please wait…" : signup ? "Create account" : "Sign in"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-5 flex items-center gap-3 text-xs uppercase tracking-wide text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
							"or",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							className: "w-full",
							onClick: () => {
								if (role) sessionStorage.setItem("pg-role", role);
								signIn(p.providerId, { callbackURL: "/welcome" });
							},
							children: ["Continue with ", p.label]
						}, p.providerId))
					})
				] })]
			})]
		})]
	});
}
//#endregion
export { Login as component };
