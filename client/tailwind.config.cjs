/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    // "./src/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors : {
        primary : {
          50: '#EFF2F5',
          100: '#DFE4EB',
          200: '#C0CAD8',
          300: '#A0AFC4',
          400: '#8194B1',
          500: '#627B9D',
          600: '#4E627E',
          700: '#3B4A5F',
          800: '#27313F',
          900: '#14181F',
        },
        secondary : {
          50: '#FEF1E6',
          100: '#FDE3CE',
          200: '#FCC69C',
          300: '#FAAA6B',
          400: '#F88E3A',
          500: '#F77108',
          600: '#C55B07',
          700: '#944405',
          800: '#632D03',
          900: '#311702',
        }
      },

      gridTemplateColumns : {
        content : '200px 1fr'
      },

      animation : {
        'notification-flash' : 'notification-flash 2s linear'
      },

      keyframes : {
        'notification-flash' : {
          'from' : { backgroundColor : 'transparent' },
          '5%' : { backgroundColor : 'rgb(226 232 240)' },
          '50%' : { backgroundColor : 'rgb(226 232 240)' },
          'to' : { backgroundColor : 'transparent' }
        }
      },
    },
  },
  plugins: [],
}