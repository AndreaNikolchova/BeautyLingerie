/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      colors: {
      'beige': '#FBF4F2',
    },},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
