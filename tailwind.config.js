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
    },
    extend: {
      colors: {
        'bg-dark': '#242424',
      },
      gridTemplateColumns: {
        'layout': '1fr 2fr 1fr',
      },
    },
  },
  plugins: [],
};
