/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "c-purple": "#4C2675",
        "c-grey": "#EDEDED",
      },
    },
  },
  plugins: [],
};
