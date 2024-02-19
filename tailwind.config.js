import uiPreset from "./ui.preset.js";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", '[data-kb-theme="dark"]'],
  content: ["./src/**/*.{html,js,jsx,md,mdx,ts,tsx}"],
  presets: [uiPreset],
};
