import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: "hsl(var(--card))",
                'card-foreground': "hsl(var(--card-foreground))",
                popover: "hsl(var(--popover))",
                'popover-foreground': "hsl(var(--popover-foreground))",
                primary: "hsl(var(--primary))",
                'primary-foreground': "hsl(var(--primary-foreground))",
                secondary: "hsl(var(--secondary))",
                'secondary-foreground': "hsl(var(--secondary-foreground))",
                muted: "hsl(var(--muted))",
                'muted-foreground': "hsl(var(--muted-foreground))",
                accent: "hsl(var(--accent))",
                'accent-foreground': "hsl(var(--accent-foreground))",
                destructive: "hsl(var(--destructive))",
                'destructive-foreground': "hsl(var(--destructive-foreground))",
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
            },
            fontFamily: {
                head: ['var(--font-head)', 'sans-serif'],
                body: ['var(--font-body)', 'sans-serif'],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            animation: {
                ticker: 'ticker 60s linear infinite',
            },
            keyframes: {
                ticker: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-100%)' },
                }
            }
        },
    },
    plugins: [],
};
export default config;
