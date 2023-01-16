module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        doctortheme: {
          primary: "#566dfb",
          secondary: "#3a426d",
          accent: "#848ab8",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
};
