import { a as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as cn } from "./utils-OBPSrjs4.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-DRQCHBxH.js
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[transform,background-color,box-shadow,color] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary-bright",
			outline: "border border-primary bg-transparent text-primary hover:bg-primary-soft",
			ghost: "text-foreground hover:bg-muted",
			peach: "bg-peach text-primary-foreground hover:opacity-90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-peach-soft"
		},
		size: {
			default: "h-11 px-5 text-sm",
			sm: "h-9 px-4 text-sm",
			lg: "h-12 px-7 text-base",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
//#endregion
export { Button as t };
