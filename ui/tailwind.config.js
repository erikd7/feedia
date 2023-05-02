module.exports = {
  purge: ["./index.html", "./client/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      flexGrow: {
        "1/2": ".5"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
