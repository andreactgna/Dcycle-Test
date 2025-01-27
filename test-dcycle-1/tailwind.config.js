/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".centered": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });
    },
  ],
};