/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F26522", // SmartHR Orange
        sidebar: "#FFFFFF",
        active: "#FFF5F0", // Light orange for active state
      }
    },
  },
  plugins: [],
}
