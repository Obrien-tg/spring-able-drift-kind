import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as cn } from "./utils-OBPSrjs4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/card-BWVJrU2j.js
var import_jsx_runtime = require_jsx_runtime();
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-[28px] border border-border bg-card p-6 text-card-foreground shadow-[var(--shadow-card)]", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: cn("font-display text-lg font-semibold", className),
		...props
	});
}
function CardDesc({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("mt-1 text-sm text-muted-foreground", className),
		...props
	});
}
//#endregion
export { CardDesc as n, CardTitle as r, Card as t };
