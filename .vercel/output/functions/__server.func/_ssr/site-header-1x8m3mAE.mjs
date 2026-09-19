import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as cn, c as useCurrentUserState, i as UserButton, n as SignedIn, r as SignedOut } from "./utils-OBPSrjs4.mjs";
import { p as Menu, t as X } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-DRQCHBxH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-header-1x8m3mAE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var links = [
	{
		href: "/#how",
		label: "How it works"
	},
	{
		href: "/#subjects",
		label: "Subjects"
	},
	{
		href: "/#pricing",
		label: "Plans"
	},
	{
		href: "/#faq",
		label: "FAQ"
	}
];
function SiteHeader() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { user, isPending } = useCurrentUserState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/mascot-owl.jpg",
						alt: "",
						className: "size-9 rounded-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-sm font-semibold tracking-tight sm:text-base",
						children: "PG Tutoring Hub"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-6 text-sm font-semibold text-muted-foreground md:flex",
					children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: l.href,
						className: "transition-colors hover:text-foreground",
						children: l.label
					}, l.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-9 w-28 animate-pulse rounded-full bg-muted" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SignedOut, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						asChild: true,
						className: "hidden sm:inline-flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							search: { mode: "signin" },
							children: "Sign in"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							search: {
								mode: "signup",
								role: "student"
							},
							children: "Get started"
						})
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SignedIn, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						asChild: true,
						className: "hidden sm:inline-flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							children: "Dashboard"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden sm:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
					})] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "inline-flex size-11 items-center justify-center rounded-full md:hidden",
						"aria-label": open ? "Close menu" : "Open menu",
						onClick: () => setOpen((v) => !v),
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("md:hidden", open ? "block" : "hidden"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1 border-t border-border bg-background px-4 py-3",
				children: [links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: l.href,
					className: "block rounded-xl px-3 py-3 text-sm font-semibold",
					onClick: () => setOpen(false),
					children: l.label
				}, l.href)), user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/dashboard",
					className: "block rounded-xl px-3 py-3 text-sm font-semibold",
					onClick: () => setOpen(false),
					children: "Dashboard"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					search: { mode: "signin" },
					className: "block rounded-xl px-3 py-3 text-sm font-semibold",
					onClick: () => setOpen(false),
					children: "Sign in"
				})]
			})
		})]
	});
}
//#endregion
export { SiteHeader as t };
