/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#060913",
          900: "#0B0F19",
          850: "#0E1524",
          800: "#131C31",
          700: "#1B2844",
          600: "#24365C",
        },
        brand: {
          blue: "#38bdf8",
          indigo: "#6366f1",
          violet: "#8b5cf6",
          emerald: "#10b981",
        },
      },
    },
  },
  plugins: [],
};
