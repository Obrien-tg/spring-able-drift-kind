import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as cn } from "./utils-OBPSrjs4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-CVMC8lRq.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ className, tone = "mint", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", tone === "mint" && "bg-primary-soft text-accent-foreground", tone === "peach" && "bg-peach-soft text-foreground", tone === "ink" && "bg-muted text-muted-foreground", tone === "coral" && "bg-secondary text-coral", className),
		...props
	});
}
//#endregion
export { Badge as t };
