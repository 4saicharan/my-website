/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030303",
        foreground: "#ededed",
        midnight: {
          DEFAULT: "#030303",
          50: "#eef0ff",
          100: "#dde1ff",
          200: "#c3c9fe",
          300: "#9aa3fc",
          400: "#6b74f7",
          500: "#4f4ef0",
          600: "#3f37e3",
          700: "#352cc7",
          800: "#2d26a1",
          900: "#14102b",
          950: "#030303",
        },
        brand: {
          indigo: "#6366f1",
          violet: "#8b5cf6",
          purple: "#a78bfa",
          glow: "#818cf8",
          deep: "#4f46e5",
          midnight: "#0a0a12",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-indigo": "0 0 60px -12px rgba(99, 102, 241, 0.35)",
        "glow-violet": "0 0 120px -24px rgba(139, 92, 246, 0.2)",
        "glow-soft": "0 0 20px rgba(99, 102, 241, 0.35)",
      },
      backgroundImage: {
        "mesh-indigo":
          "radial-gradient(ellipse 70% 60% at 0% 0%, rgba(99, 102, 241, 0.22) 0%, rgba(79, 70, 229, 0.08) 40%, transparent 70%)",
        "mesh-violet":
          "radial-gradient(ellipse 65% 55% at 100% 100%, rgba(139, 92, 246, 0.18) 0%, rgba(67, 56, 202, 0.07) 45%, transparent 70%)",
      },
    },
  },
  plugins: [],
};
