module.exports = {
  content: ["./dist/*.{html,js}"],
  theme: {
      extend: {},


      screens: {
          '2xl': {'max': '1919px'},
          'xl': {'max': '1023px'},
          'lg': {'max': '767px'},
          'md': {'max': '539px'},
          'sm': {'max': '360px'},
          'xm': {'max': '320px'},
        },
  },
  plugins: [],
}