/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{html,js}", "./components/**/*.{html,js}"],
  theme: {
    fontFamily: {
      sans: ['Montserrat, sans-serif']
    },
    backgroundImage: {
      fondo: [ "url('/public/fondo.png')"]
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark", "synthwave"],
  },
}