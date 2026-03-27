import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: "#0A192F",
                cream: "#F5F5DC",
                gold: "#D4AF37",
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                serif: ["var(--font-cormorant-garamond)", "serif"],
            },
        },
    },
    plugins: [],
};

export default config;
