module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        toasty: {
          "0%": { opacity: 0, transform: "translateX(0)" },
          "15%": { opacity: 1, transform: "translateX(-100px)" },
          "75%": { opacity: 1, transform: "translateX(-100px)" },
          "100%": { opacity: 0, transform: "translateX(0)" },
        },
      },
      animation: {
        toastyAnim: "toasty 3s  cubic-bezier(0.56, 0.55, 0.27, 1.27) forwards",
      },
    },
  },
  plugins: [],
};
