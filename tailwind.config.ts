import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundColor: {
        "habit-green": "#66BB6A",
        "habit-gray": "#AAAAAA",
        "habit-lightgray": "#E2E2E2",
        "habit-background": "#EEEEEE",
      },
      textColor: {
        "habit-green": "#66BB6A",
        "habit-gray": "#AAAAAA",
        "habit-lightgray": "#E2E2E2",
        "habit-background": "#EEEEEE",
      },
      borderColor: {
        "habit-green": "#66BB6A",
        "habit-gray": "#AAAAAA",
        "habit-lightgray": "#E2E2E2",
        "habit-background": "#EEEEEE",
      },
      ringColor: {
        "habit-green": "#66BB6A",
        "habit-gray": "#AAAAAA",
        "habit-lightgray": "#E2E2E2",
        "habit-background": "#EEEEEE",
      },
    },
  },
  darkMode: "media",
  plugins: [],
};
export default config;
