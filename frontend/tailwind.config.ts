import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
        "destructive-foreground": "var(--destructive-foreground)",
        "raisin-black": "#181818",
        "eerie-black": "#111418",
        "engineering-orange": "#2e5eaa",
        "light-green": "#9edd84",
        "ghost-white": "#f4f6fb",
        surface: "#1b1f26",
        "text-primary": "#f1f4fb",
        "text-secondary": "#c4c9d5",
        "text-muted": "#8e939f",
        "accent-strong": "#2e5eaa",
        "accent-orange": "#9edd84",
      },
      borderRadius: {
        xl: "24px",
      },
      boxShadow: {
        accent: "0 24px 60px rgba(158,221,132,0.32)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
