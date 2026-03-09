/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        panel: "#111827",
        panelSoft: "#1f2937",
        accent: "#00d4ff",
      },
      boxShadow: {
        neon: "0 0 20px rgba(0, 212, 255, 0.25)",
      },
    },
  },
  plugins: [],
};
