import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f6f4",
          100: "#e4e9e3",
          200: "#c7d1c4",
          600: "#3f5a3a",
          700: "#334a2f",
          900: "#1f2e1d",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
