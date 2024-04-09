const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    // screens: {
    // sm: "640",
    // => @media (min-width: 640px) { ... }

    // md: "768",
    // => @media (min-width: 768px) { ... }

    // lg: "1920px",
    // => @media (min-width: 1024px) { ... }
    // },
  },
  plugins: [],
});
