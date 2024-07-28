import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", '[data-mode="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        "black": ["Roboto Black", "sans-serif"],
        "blackitalic": ["Roboto Black Italic", "sans-serif"],
        "bold": ["Roboto Bold", "sans-serif"],
        "bolditalic": ["Roboto Bold Italic", "sans-serif"],
        "italic": ["Roboto Italic", "sans-serif"],
        "light": ["Roboto Light", "sans-serif"],
        "lightitalic": ["Roboto Light Italic", "sans-serif"],
        "medium": ["Roboto Medium", "sans-serif"],
        "mediumitalic": ["Roboto Medium Italic", "sans-serif"],
        "regular": ["Robglobaloto Regular", "sans-serif"],
        "thin": ["Roboto Thin", "sans-serif"],
        "thinitalic": ["Roboto Thin Italic", "sans-serif"],
        "digit":['digit']
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
