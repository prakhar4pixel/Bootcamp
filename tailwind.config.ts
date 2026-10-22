import type { Config } from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: { extend: { fontFamily: { heading: ["Outfit", "sans-serif"], body: ["Inter", "sans-serif"] } } },
  plugins: []
} satisfies Config;
