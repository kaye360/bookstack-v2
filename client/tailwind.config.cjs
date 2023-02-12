/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors : {
        primary : {
          50: 'hsl(219, 22%, 95%)',
          100: 'hsl(219, 22%, 90%)',
          150: 'hsl(219, 22%, 85%)',
          200: 'hsl(219, 22%, 80%)',
          250: 'hsl(219, 22%, 75%)',
          300: 'hsl(219, 22%, 70%)',
          400: 'hsl(219, 22%, 60%)',
          500: 'hsl(219, 22%, 50%)',
          600: 'hsl(219, 22%, 40%)',
          700: 'hsl(219, 22%, 25%)',
          750: 'hsl(219, 22%, 18%)',
          800: 'hsl(219, 22%, 15%)',
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

      animation : {
        'notification-flash-dark' : 'notification-flash-dark 2s linear',
        'notification-flash-light' : 'notification-flash-light 2s linear'
      },

      keyframes : {
        'notification-flash-dark' : {
          'from' : { backgroundColor : 'transparent' },
          '5%' : { backgroundColor : 'hsl(219, 22%, 25%)' },
          '30%' : { backgroundColor : 'hsl(219, 22%, 25%)' },
          'to' : { backgroundColor : 'transparent' }
        },
        'notification-flash-light' : {
          'from' : { backgroundColor : 'transparent' },
          '5%' : { backgroundColor : 'hsl(219, 22%, 80%)' },
          '30%' : { backgroundColor : 'hsl(219, 22%, 80%)' },
          'to' : { backgroundColor : 'transparent' }
        }
      },
      dropShadow : {
        'sidebar-dark': '0 -10px 10px hsla(219, 22%, 15%, 0.5)',
        'sidebar-light': '0 -10px 10px hsla(219, 22%, 85%, 0.5)',
      },
      backgroundImage : {
        'stars' : "url(./assets/img/bg-stars.png)",
        'starsVertical' : "url(./assets/img/bg-stars-vertical.png)"
      },
      letterSpacing : {
        normal : '1rem',
        default : '1rem'
      }
    },
  },
  plugins: [],
}