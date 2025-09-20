import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;

export default config;
