import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2.5rem" }, screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        noite: { 950: "#050B15", 900: "#0A1628", 800: "#10223D", 700: "#1B3354", 500: "#5E7391", 300: "#A9B6C9" },
        gelo: { DEFAULT: "#F2F4F7", linha: "#D8DEE7" },
        tinta: { DEFAULT: "#0B1424", suave: "#46566E" },
        ouro: { DEFAULT: "#C8A45C", claro: "#E3C887", escuro: "#8A6A2A" },
      },
      fontFamily: {
        sans: ['"Archivo"', "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(2.6rem, 1.4rem + 5.2vw, 5.75rem)", { lineHeight: "0.98", letterSpacing: "-0.018em" }],
        titulo: ["clamp(2rem, 1.3rem + 2.6vw, 3.4rem)", { lineHeight: "1.04", letterSpacing: "-0.015em" }],
        lede: ["clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)", { lineHeight: "1.6" }],
      },
      keyframes: {
        assentar: { from: { transform: "scale(1.07)" }, to: { transform: "scale(1)" } },
        subir: { from: { transform: "translateY(18px)" }, to: { transform: "translateY(0)" } },
        realce: { "0%": { backgroundColor: "rgba(200,164,92,0.28)" }, "100%": { backgroundColor: "rgba(200,164,92,0)" } },
      },
      animation: {
        assentar: "assentar 2.6s cubic-bezier(0.16,1,0.3,1) both",
        subir: "subir 1.1s cubic-bezier(0.16,1,0.3,1) both",
        realce: "realce 1.6s cubic-bezier(0.16,1,0.3,1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
