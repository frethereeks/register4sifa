import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screen: {
        'xs': '512px'
      },
      colors: {
        primary: "#79112c",
        secondary: "#4f46e5",
        tertiary: "#fb923c",
        sitetext: "#545454",
        danger: "#f66",
        backdrop: "#f9fafe",
        dark: "#122b54"
      },
    },
    fontFamily: {
      exo: `var(--exo)`,
      nunito: `var(--nunito)`
    }
  },
  plugins: [],
};
export default config;
