/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    fontFamily: {
      poppins: ['"Poppins"', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#FFFFFF",
        darkest: "#292D32",
        black: "#263238",
        extralightgrey: "#F2F2F2",
        grey: "#5B5B5B",
        lightgrey: "#C6CCD2",
        red: "#B92B27",
        lightred: "#FFE7E7",
        darken: "#F8F8F8",
        darker: "#F5F7F9",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require("daisyui"),
    require("tailwindcss-animated"),
  ],
};
