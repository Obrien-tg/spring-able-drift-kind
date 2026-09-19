import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as cn } from "./utils-OBPSrjs4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-CwRD9mZv.js
var import_jsx_runtime = require_jsx_runtime();
function ProgressBar({ value, className }) {
	const pct = Math.max(0, Math.min(100, Math.round(value)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-2.5 w-full overflow-hidden rounded-full bg-primary-soft", className),
		role: "progressbar",
		"aria-valuenow": pct,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full rounded-full bg-primary transition-[width] duration-500 ease-out",
			style: { width: `${pct}%` }
		})
	});
}
//#endregion
export { ProgressBar as t };
