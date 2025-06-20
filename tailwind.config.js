/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)', //black
        text: 'var(--text)',
        secondary: 'var(--secondary)', //skyblue
        'header-text': 'var(--header-text)', //white
        navbar: 'var(--navbar)',
        accent: 'var(--accent)', //yellow
        background: 'var(--background)', //white
        highlight: 'var(--highlight)', //red
        hover: 'rgb(156 163 175)' //red
      },

      fontFamily: {
        Ubuntu: ['Ubuntu'],
        arial: ['Arial'],
        bUbuntu: ['UbuntuBold']
      },
      fontSize: {
        //'2xl': '12.5rem',
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
}
