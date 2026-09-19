import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "mint",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: "mint" | "peach" | "ink" | "coral" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        tone === "mint" && "bg-primary-soft text-accent-foreground",
        tone === "peach" && "bg-peach-soft text-foreground",
        tone === "ink" && "bg-muted text-muted-foreground",
        tone === "coral" && "bg-secondary text-coral",
        className,
      )}
      {...props}
    />
  );
}
