/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./app.js"],
  theme: {
    fontFamily: {
      sans: [
        "Inter",
        "system-ui",
        "Avenir",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      symbols: [
        "varela-round",
        "Inter",
        "system-ui",
        "Avenir",
        "Helvetica",
        "Arial",
        "sans-serif",
        "sans-serif",
      ],
    },
    extend: {
      colors: {
        "bg-dark": "#242424",
      },
      gridTemplateColumns: {
        layout: "192px 1fr 192px",
      },
    },
  },
  darkMode: "class",
};
