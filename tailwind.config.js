const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "375px", // Targeting small screens (e.g., mobile phones)
      md: "768px", // Targeting medium screens (e.g., tablets)
      lg: "1280px", // Targeting larger screens (e.g., desktop monitors)
    },
  },
  plugins: [],
});
