/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './{components,pages}/**/*.{md,mdx,tsx}', 
    './theme.config.tsx',
    './components/**/*.{js,jsx,ts,tsx,md,mdx}',
 
    // Or if using `src` directory:
    './src/**/*.{js,jsx,ts,tsx,md,mdx}'
  ],
  theme: {
    extend: {
      animation: {
        ["infinite-slider"]: "infiniteSlider 20s linear infinite",
      },
      keyframes: {
        infiniteSlider: {
          "0%": { transform: "translateX(0)" },
          "100%": {
            transform: "translateX(calc(-250px * 5))",
          },
        },
      },
      colors: {
        primary: '#213751',
        secondary: 'rgb(200 63 90)',
        tertiary: '#484848',
        success: '#39D98A',
        error: '#FF3B3B',
        warning: '#FEC800',
        info: '#61A0B2',
      }
    },
  },
}
