import type { Config } from "tailwindcss";

/**
 * Colors are backed by CSS variables defined in app/globals.css so dark/light
 * themes swap via [data-theme]. Values in DESIGN_TOKENS.md are the source of truth.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-elev": "var(--bg-elev)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        text: "var(--text)",
        "text-2": "var(--text-2)",
        "text-3": "var(--text-3)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        "accent-soft": "var(--accent-soft)",
        green: "var(--green)",
        amber: "var(--amber)",
        red: "var(--red)",
        "green-soft": "var(--green-soft)",
        "amber-soft": "var(--amber-soft)",
        "red-soft": "var(--red-soft)",
        "accent-border": "var(--accent-border)",
      },
      fontFamily: {
        sans: ["var(--font-geist)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        card: "0 12px 40px rgba(0,0,0,.5)",
      },
      keyframes: {
        "dp-spin": { to: { transform: "rotate(360deg)" } },
        "dp-pulse": {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: ".4" },
        },
      },
      animation: {
        "dp-spin": "dp-spin 1s linear infinite",
        "dp-pulse": "dp-pulse 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
