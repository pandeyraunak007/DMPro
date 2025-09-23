import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        background: '#0F0F0F',
        foreground: '#F4F4F5',
        muted: '#A1A1AA',
        'muted-dark': '#71717A',
        border: '#27272A',
        'border-light': '#3F3F46',
        primary: '#8B5CF6',
        'primary-hover': '#7C3AED',
        secondary: '#52525B',
        panel: '#18181B',
        hover: '#27272A',
      },
    },
  },
  plugins: [],
};
export default config;