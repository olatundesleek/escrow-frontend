 
import type { Config } from "tailwindcss";
 

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-4px)" },
          "50%": { transform: "translateX(4px)" },
          "75%": { transform: "translateX(-4px)" },
        },
        fade: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        shake: "shake 0.3s ease-in-out",
        fade: "fade 0.5s ease-out forwards",
      },
      colors: {
        // "db-background": "var(--db-background)",
        // "db-surface": "var(--db-surface)",
        // "db-text": "var(--db-text)",
        // "db-subText": "var(--db-subText)",
        // "db-primary": "var(--db-primary)",
        // "db-accent": "var(--db-accent)",
        // "db-border": "var(--db-border)",
        // primary: "var(--color-primary)",
        // secondary: "var(--color-secondary)",
        // accent: "var(--color-accent)",
        // error: "var(--color-error)",
        // warning: "var(--color-warning)",
        // info: "var(--color-info)",
        // success: "var(--color-success)",
      },
    },
  },
  plugins: [],
};

export default config;
