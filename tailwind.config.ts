import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem", screens: { "2xl": "1200px" } },
    extend: {
      colors: {
        navy: { 950: "#071526", 900: "#0D213A", 800: "#16304F", 700: "#2E4867" },
        gold: { 300: "#F1D58E", 400: "#E6BE5F", 500: "#C99A3A", 700: "#8A6418" },
        paper: { DEFAULT: "#F7F3EA", alt: "#EFE8DA" },
        ink: { DEFAULT: "#14202E", soft: "#45505E" },
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"Manrope"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
