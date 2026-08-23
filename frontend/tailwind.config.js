/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgLight: "#F7F5F0",     // Warm cream off-white
        bgLightMed: "#F3F0E8",  // Medium cream off-white
        bgLightDark: "#EDE9DF", // Darker cream/warm sand
        bgDark: "#111318",      // Immersive deep charcoal
        bgDarkMed: "#16181D",   // Dark medium
        bgDarkLight: "#1C1F26", // Dark light
        charcoal: "#1E2022",    // Deep charcoal typography for light sections
        accent: {
          light: "#ea580c",     // orange-600
          DEFAULT: "#c2410c",    // burnt orange / amber-700
          dark: "#9a3412",      // orange-800
        }
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "-apple-system", "sans-serif"],
        serif: ["DM Serif Display", "Georgia", "serif"],
        mono: ["Fira Code", "monospace"],
      }
    },
  },
  plugins: [],
}
