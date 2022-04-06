module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'ip': {'max':'424px'},     
      'sm': {'max':'624px'},     
      'md': {'max':'768px'},           
      'lg': {'max':'1024px'},
      'xl': {'max':'1280px'},
      '2xl': {'max':'1536px'}
    },
    extend: {},
  },
  plugins: [],
}