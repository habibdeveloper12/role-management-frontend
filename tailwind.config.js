module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#a991f7",
          secondary: "#3b82f6",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
          gradient: "linear-gradient( 90deg, #ffbe0b, #fb5607, #ff006e, #8338ec, #3a86ff )",
          buttn: "bg-gradient-to-r from-cyan-500 to-blue-500"
        },
      },
      "dark",
      "cupcake",
    ],
  },
}
