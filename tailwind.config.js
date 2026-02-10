/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
        colors: {
        primary: "#d95140",
        primarySoft: "#f7cac4",
        bgLight: "#ffffff",
        bgDark: "#1f1f1f",
        textLight: "#2b2b2b",
        textMuted: "#6b6b6b",
      },
      backgroundImage: {
        hero: "linear-gradient(135deg, #f7cac4, #f5e6e4)",
        heroDark: "linear-gradient(135deg, #4a3a3a, #3a2f2f)",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Poppins", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
