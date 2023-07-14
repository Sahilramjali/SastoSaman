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
            dark: 'var(--text-dark)',
            secondary: 'var(--text-info)',
            hoverPrimary: 'var(--hover-primary)',
        },
        borderColor: {
            primary: 'var(--text-primary)',
        },
    },
},
plugins: [],
}

