import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { a as require_jsx_runtime, i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/react+tanstack__react-query.mjs";
import { a as cn, s as initials } from "./utils-OBPSrjs4.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as sendMessage, d as listMessages } from "./api-yLYAzf32.mjs";
import { n as useHubSession, t as AuthGate } from "./guard-BJVVYHaz.mjs";
import { t as Button } from "./button-DRQCHBxH.mjs";
import { t as Input } from "./input-QFlaJFMH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/messages-BDaCDaby.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MessagesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessagesInner, {}) });
}
function MessagesInner() {
	const { user } = useHubSession();
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["messages"],
		queryFn: () => listMessages(),
		refetchInterval: 8e3
	});
	const [text, setText] = (0, import_react.useState)("");
	const endRef = (0, import_react.useRef)(null);
	const mut = useMutation({
		mutationFn: () => sendMessage({ data: text }),
		onSuccess: () => {
			setText("");
			qc.invalidateQueries({ queryKey: ["messages"] });
		},
		onError: (e) => toast.error(e.message)
	});
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [q.data?.length]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[70vh] flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.18em] text-primary",
					children: "Class lounge"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-3xl",
					children: "Say hello."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 space-y-3 overflow-y-auto rounded-[28px] border border-border bg-card p-4",
				children: [(q.data ?? []).map((m) => {
					const mine = m.mine || m.senderId === user?.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex gap-2", mine && "flex-row-reverse"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-semibold text-accent-foreground",
							children: initials(m.senderName)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("max-w-[80%] rounded-2xl px-3.5 py-2 text-sm", mine ? "rounded-tr-sm bg-primary text-primary-foreground" : "rounded-tl-sm bg-muted"),
							children: [!mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-0.5 text-[11px] font-semibold opacity-80",
								children: m.senderName
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "whitespace-pre-wrap",
								children: m.content
							})]
						})]
					}, m.id);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-3 flex gap-2",
				onSubmit: (e) => {
					e.preventDefault();
					mut.mutate();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: text,
					onChange: (e) => setText(e.target.value),
					placeholder: "Write a note…",
					required: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: mut.isPending,
					children: "Send"
				})]
			})
		]
	});
}
//#endregion
export { MessagesPage as component };
