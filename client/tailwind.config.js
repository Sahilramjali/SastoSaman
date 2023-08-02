/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
        backgroundColor: {
            primary: 'var(--background-primary)',
            cardLight: 'var(--card-bg-light)',
            cardPrimary: 'var(--card-bg-primary)',
            cardSecondary: 'var(--card-bg-secondary)',
            buttonSecondary: 'var(--button-bg-secondary)',
            hoverPrimary: 'var(--hover-primary)',
            hoverSecondary: 'var(--hover-secondary)',
        },
        colors: {
            primary: 'var(--text-primary)',
            blue:'var(--text-secondary)',
            dark: 'var(--text-dark)',
            secondary: 'var(--text-info)',
            hoverPrimary: 'var(--hover-primary)',
        },
        borderColor: {
            primary: 'var(--text-primary)',
        },
        keyframes: {
            scaleup: {
              '0%':{scale:'scale(0px)'},
                '50%':{scale:'scale(40px)'},
              '100%': { scale: 'scale(80px)' },
            }
          },
          animation: {
            scaleup: 'scaleup 1s linear infinite',
          }
    },
},
plugins: [
    
],
}

