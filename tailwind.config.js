/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans'], // Remplacez "Roboto" par la police que vous avez ajoutée
      },
    },
  },
  plugins: [],
}

