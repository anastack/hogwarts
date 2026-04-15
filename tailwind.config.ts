import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#0a1020",
        ink: "#090d15",
        velvet: "#2b1220",
        wine: "#5b1830",
        gold: "#d6b56a",
        parchment: "#f4e8c8",
        mist: "#c8cedf"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Segoe UI", "system-ui", "sans-serif"],
        serif: ["var(--font-seriffed)", "Georgia", "serif"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(214,181,106,0.15), 0 20px 60px rgba(0,0,0,0.35)"
      },
      backgroundImage: {
        veil: "linear-gradient(180deg, rgba(8,12,22,0.2) 0%, rgba(8,12,22,0.72) 45%, rgba(8,12,22,0.96) 100%)"
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translateY(0px)", opacity: "0.4" },
          "50%": { transform: "translateY(-10px)", opacity: "0.9" }
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        ember: {
          "0%, 100%": { opacity: "0.2", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.08)" }
        }
      },
      animation: {
        drift: "drift 4s ease-in-out infinite",
        rise: "rise 0.8s ease forwards",
        ember: "ember 3.2s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
