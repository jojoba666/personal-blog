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
        primary: {
          DEFAULT: "#FF6B35",
          hover: "#e55a2b",
          light: "#fff0e8",
          muted: "#ffc4a3",
        },
        accent: {
          green: "#2d6a4f",
          yellow: "#e9c46a",
          blue: "#457b9d",
          red: "#e76f51",
        },
        surface: {
          DEFAULT: "#f5f0eb",
          hover: "#ede6df",
        },
        warm: {
          bg: "#faf8f5",
          border: "#e0d5c7",
          text: "#2c2416",
          textSec: "#6b5e4f",
          muted: "#9b8e7c",
        },
        code: {
          bg: "#26211a",
          text: "#e8dcc8",
          inline: "#f0e6d3",
        },
      },
      fontFamily: {
        hand: ['"Virgil"', '"Ma Shan Zheng"', "cursive"],
        body: ['"Caveat"', '"ZCOOL XiaoWei"', '"KaiTi"', "楷体", "serif"],
        mono: ['"Fira Code"', '"JetBrains Mono"', "monospace"],
        decor: ['"Caveat"', "cursive"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.25rem" }],
        sm: ["0.875rem", { lineHeight: "1.4rem" }],
        base: ["1.125rem", { lineHeight: "1.85rem" }],
        lg: ["1.25rem", { lineHeight: "1.85rem" }],
        xl: ["1.5rem", { lineHeight: "2rem" }],
        "2xl": ["1.875rem", { lineHeight: "2.5rem" }],
        "3xl": ["2.25rem", { lineHeight: "2.75rem" }],
        "4xl": ["3rem", { lineHeight: "3.5rem" }],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
