import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scaleUp: {
          '0%': {
            transform: 'scale(1)'
          },
          '100%': {
            transform: 'scale(1.1)'
          },
        },
        scaleDown: {
          '0%': {
            transform: 'scale(1.1)'
          },
          '100%': {
            transform: 'scale(1)'
          },
        },
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        scaleUp: 'scaleUp 0.3s ease-in-out',
        scaleDown: 'scaleDown 0.3s ease-in-out',
        fadeInUp: "fadeInUp 0.5s ease-in-out",

      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    base: false,
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
      {
        "custom": {
          primary: "black",
          secondary: "#f000b8",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      }]
  }

}