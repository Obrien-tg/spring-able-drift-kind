import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as cn } from "./utils-OBPSrjs4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-QFlaJFMH.js
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-[14px] border border-input bg-card px-3.5 text-sm text-foreground placeholder:text-ink-faint", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-32 w-full rounded-[18px] border border-input bg-card px-3.5 py-3 text-sm text-foreground placeholder:text-ink-faint", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("mb-1.5 block text-sm font-semibold text-foreground", className),
		...props
	});
}
//#endregion
export { Label as n, Textarea as r, Input as t };
