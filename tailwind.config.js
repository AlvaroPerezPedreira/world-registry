import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'stats-blue': '#3b82f6',
        'stats-pink': '#FF6FAF',
        'stats-green': '#10b981',
      },
      boxShadow: {
        'card': '0 10px 25px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
