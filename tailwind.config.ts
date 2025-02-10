import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nanum: ["Nanum Myeongjo", "serif"],
        roboto: ["Roboto", "serif"],
        "road-rage": ["Road Rage", "serif"],
      },
      colors: {
        primary: {
          100: "hsl(var(--primary-100))",
          200: "hsl(var(--primary-200))",
          300: "hsl(var(--primary-300))",
          400: "hsl(var(--primary-400))",
        },
        gray: {
          100: "hsl(var(--gray-100))",
          200: "hsl(var(--gray-200))",
          300: "hsl(var(--gray-300))",
          900: "hsl(var(--gray-900))",
        },
        accent: {
          100: "hsl(var(--accent-100))",
          200: "hsl(var(--accent-200))",
          300: "hsl(var(--accent-300))",
          400: "hsl(var(--accent-400))",
          500: "hsl(var(--accent-500))",
          600: "hsl(var(--accent-600))",
          700: "hsl(var(--accent-700))",
          800: "hsl(var(--accent-800))",
        },
        "gray-900-20": "hsl(var(--gray-900-20))",
        "gray-900-10": "hsl(var(--gray-900-10))",
      },
    },
  },
  plugins: [],
} satisfies Config;
