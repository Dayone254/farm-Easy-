import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#2F5233",
          foreground: "#F5F5DC",
        },
        secondary: {
          DEFAULT: "#1F371F",
          foreground: "#F5F5DC",
        },
        success: {
          DEFAULT: "#34c759",
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#ff9f0a",
          foreground: "#ffffff",
        },
        error: {
          DEFAULT: "#ff3b30",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#4A7856",
          foreground: "#F5F5DC",
        },
        card: {
          DEFAULT: "rgba(255, 255, 255, 0.8)",
          foreground: "#2F5233",
        },
        cream: "#F5F5DC",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-up": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "scale-up": "scale-up 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;