/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // screens: {
    //   tablet: "480px",
    //   // => @media (min-width: 640px) { ... }
    //   notebookPc: "846",

    //   laptop: "1280",
    //   // => @media (min-width: 1024px) { ... }

    //   desktop: "1441px",
    //   // => @media (min-width: 1280px) { ... }
    //   largeDevice: "1721",

    //   extraLarge: "1921",
    //
    extend: {
      fontFamily: {
        bokorRegular: ['"Bokor"', "sans-serif"],
        cormorant: ["Cormorant Garamond", "serif"],
        lobster: ["Lobster", "sans-serif"],
        openfont: ["Open Sans", "sans-serif"],
        oldEnglish: ["UnifrakturCook", "cursive"],
      },
      textShadow: {
        "3d": "1px 1px 2px rgba(0, 0, 0, 0.5)",
      },
      backgroundImage: {
        "gradient-to-r":
          "linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/src/assets/images/bg2.jpeg')",
        "custom-gradient":
          "linear-gradient(to bottom, black 30%, #e8e8e8 100%)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".text-shadow-3d": {
          "text-shadow": "1px 1px 2px rgba(0, 0, 0, 0.5)",
        },
      });
    },
  ],
};
