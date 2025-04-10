/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],  // Aggiungi il percorso per i tuoi file
    theme: {
      extend: {
        fontFamily: {
          montserrat: ["Montserrat", "sans-serif"],
          greatvibes: ["Great Vibes", "cursive"],
          parisienne: ["Parisienne", "cursive"],
          allura: ["Allura", "cursive"],
          sacramento: ["Sacramento", "cursive"],
          merienda: ["Merienda", "cursive"],
          cormorant: ["Cormorant", "serif"],
        },
      },
    },
    plugins: [],
  }
  