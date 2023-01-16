/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    // "./src/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
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