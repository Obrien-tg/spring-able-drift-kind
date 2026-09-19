import { b as Navigate, f as useRouterState, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_jsx_runtime, n as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { a as cn, c as useCurrentUserState, i as UserButton, t as RedirectToSignIn } from "./utils-OBPSrjs4.mjs";
import { f as MessageCircle, l as Sparkles, m as LayoutDashboard, o as TrendingUp, r as UserRound, v as ClipboardList, x as BookOpen } from "../_libs/lucide-react.mjs";
import { o as getMyProfile } from "./api-yLYAzf32.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guard-BJVVYHaz.js
var import_jsx_runtime = require_jsx_runtime();
var nav = [
	{
		to: "/dashboard",
		label: "Home",
		icon: LayoutDashboard
	},
	{
		to: "/hub",
		label: "Lessons",
		icon: BookOpen
	},
	{
		to: "/assignments",
		label: "Assignments",
		icon: ClipboardList
	},
	{
		to: "/practice",
		label: "Practice",
		icon: Sparkles
	},
	{
		to: "/progress",
		label: "Progress",
		icon: TrendingUp
	},
	{
		to: "/messages",
		label: "Lounge",
		icon: MessageCircle
	},
	{
		to: "/profile",
		label: "Profile",
		icon: UserRound
	}
];
function AppShell({ children, profile }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl gap-0 md:gap-6 md:px-4 md:py-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "hidden w-56 shrink-0 md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sticky top-6 rounded-[28px] border border-border bg-card p-4 shadow-[var(--shadow-card)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "mb-5 flex items-center gap-2 px-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/images/mascot-owl.jpg",
								alt: "",
								className: "size-9 rounded-full object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-sm font-semibold leading-tight",
								children: "PG Hub"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs capitalize text-muted-foreground",
								children: profile.role
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "space-y-1",
							children: nav.map((item) => {
								const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: item.to,
									className: cn("flex h-11 items-center gap-2.5 rounded-2xl px-3 text-sm font-semibold transition-colors", active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
								}, item.to);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 border-t border-border pt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1 pb-24 md:pb-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border px-4 py-3 md:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/dashboard",
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/mascot-owl.jpg",
							alt: "",
							className: "size-8 rounded-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-sm font-semibold",
							children: "PG Hub"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "px-4 py-5 md:px-0 md:py-0",
					children
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 backdrop-blur md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-5",
				children: nav.slice(0, 5).map((item) => {
					const active = pathname === item.to || pathname.startsWith(`${item.to}/`);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold", active ? "text-primary" : "text-muted-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-5" }), item.label]
					}, item.to);
				})
			})
		})]
	});
}
function useHubSession() {
	const { user, isPending } = useCurrentUserState();
	const profileQuery = useQuery({
		queryKey: ["profile", user?.id],
		queryFn: () => getMyProfile(),
		enabled: Boolean(user)
	});
	return {
		user,
		authPending: isPending,
		profile: profileQuery.data ?? null,
		profilePending: Boolean(user) && profileQuery.isPending
	};
}
function AuthGate({ children }) {
	const { user, authPending, profile, profilePending } = useHubSession();
	if (authPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppSkeleton, {});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	if (profilePending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppSkeleton, {});
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/welcome" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		profile,
		children
	});
}
function AppSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-48 animate-pulse rounded-full bg-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-4 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 animate-pulse rounded-[28px] bg-muted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 animate-pulse rounded-[28px] bg-muted" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 animate-pulse rounded-[28px] bg-muted" })
			]
		})]
	});
}
//#endregion
export { useHubSession as n, AuthGate as t };
