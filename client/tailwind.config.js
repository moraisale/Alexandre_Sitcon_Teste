/** @type {import('tailwindcss').Config} */
import { mauve, violet, red, blackA } from "@radix-ui/colors";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#00629B",
        secondaryBlue: "#E7F4F9",
        layoutBackground: "#EFEFEF",
        orange: "#EFEFEF",
        btnOrange: "#FF8200",
        btnOrangee: "#EFEFEF",
        textGray: "#C4C4C4",
        ...mauve,
        ...violet,
        ...red,
        ...blackA,
      },
      keyframes: {
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};