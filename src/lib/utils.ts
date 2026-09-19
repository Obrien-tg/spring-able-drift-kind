import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function initials(name: string | null | undefined) {
  if (!name) return "PG";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "PG";
}

export function formatDue(value: string | null | undefined) {
  if (!value) return "Flexible";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Flexible";
  return new Intl.DateTimeFormat("en-ZA", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}
