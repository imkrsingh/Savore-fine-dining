import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light: "#f3e5ab",
          DEFAULT: "#d4af37",
          dark: "#a3821a",
          amber: "#e5a93b",
        },
        truffle: {
          DEFAULT: "#0d0f14",
          dark: "#08090c",
          card: "#13151b",
          border: "#20232d",
        },
        flame: {
          DEFAULT: "#e85d34",
          bright: "#ff7a45",
        },
        parchment: {
          DEFAULT: "#faf8f5",
          warm: "#f5f0e8",
          dark: "#eae3d2",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "Manrope", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "DM Mono", "monospace"],
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "hero-zoom": "hero-zoom 14s ease-out both",
        rise: "rise .9s ease both",
        "slide-left": "slide-left 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-up": "scale-up 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-down": "slide-down 0.25s ease-out forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "hero-zoom": {
          from: { transform: "scale(1.06)" },
          to: { transform: "scale(1)" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-left": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "scale-up": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
