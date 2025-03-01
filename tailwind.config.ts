import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        primaryColor: "var(--primary)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryHighlight: "var(--primaryHighlight)",
      },
    },
  },
  plugins: [],
} satisfies Config;
