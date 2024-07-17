/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{html,js}", './index.html', './scripts/**/*.{html,js}'],
  theme: {
    fontFamily: {
      sans: ['Montserrat, sans-serif']
    },
    backgroundImage: {
      fondo: [ "url('/fondo.png')"]
    },
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["dark"],
  },
}