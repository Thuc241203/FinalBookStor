/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '280px'
      },
      colors:{
        'custom-main': '#CE5A67'
      },
      animation:{
        'spin-slow': 'spin 5s linear infinite'
      },
    },
    fontFamily:{
      'inclusiveSans' : ['Inclusive Sans', 'sans-serif'],
      'poppins' : ['Poppins', 'sans-serif'],
      'Raleway': ['Raleway', 'sans-serif'],
      'dancingScript':['Dancing Script', 'cursive']
    }
  },
  plugins: [],
}