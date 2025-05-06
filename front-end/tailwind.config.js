/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar";
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [tailwindScrollbar],
  theme: {
    extend: {
      colors: {
        "tc-green": "#00cc9c",
        "tc-blue": "#2082C94D",
        "tc-dark-blue": "#1E89D6",

        "hover-tc-blue": "#1C4587",
        // "tc-dark-blue": "#2B3F60",
        "tc-pink": "#6A0080",
        "tc-dark-pink": "#40004D",

        "tc-click-blue": "#364D74",

        "tc-input-border": "#475569",
        "forest-green": "#32b950",
        "golden-rod": "#e6ba1f",
        "medium-slate-blue": "#5d5fef",
        "corn-flower-blue": "#a5a6f6",
        "indian-red": {
          100: "#eb5757",
        },
        "medium-aqua-marine": "#85e0ab",
        "green-1": "#219653",
        "sky-blue": "#56ccf2",
        "medium-orchid": "#bb6bd9",
        violet: "#fd8bff",
        gold: "#ffca2a",
        "dark-cyan": "#1f8a7d",
        orange: "#ffa400",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        mqMin800: "800px",
        mqMin850: "850px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      boxShadow: {
        card: "0px 4px 60px 0px #00000005",
      },
      fontFamily: {
        "sf-pro-display": "SF Pro Display",
      },
    },
  },
};
