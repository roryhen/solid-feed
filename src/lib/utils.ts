import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { parseURL } from "ufo";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -._~:]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-|-$/, "");
}

export function getDomainName(url: string) {
  return parseURL(url).host?.split(".")[0];
}
