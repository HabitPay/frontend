import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundColor: {
        "habit-green": "#66BB6A",
        "habit-gray": "#AAAAAA",
        "habit-background": "#EEEEEE",
      },
    },
  },
  darkMode: "media",
  plugins: [],
};
export default config;
