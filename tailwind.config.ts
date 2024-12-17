import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f7ff",
          100: "#ebf0ff",
          200: "#d6e0ff",
          300: "#b3c5ff",
          400: "#809fff",
          500: "#4d7aff",
          600: "#1a55ff",
          700: "#0044ff",
          800: "#0036cc",
          900: "#002b99",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
