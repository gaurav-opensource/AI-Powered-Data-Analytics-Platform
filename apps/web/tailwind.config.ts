import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // ✅ if your pages are in src/
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // ✅ if using app router
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
