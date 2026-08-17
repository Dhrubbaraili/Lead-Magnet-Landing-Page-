import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: { brand: { 50: '#effcf3', 100: '#d9f8e2', 500: '#20ad4b', 600: '#15803d', 700: '#126332' } },
      boxShadow: { soft: '0 20px 60px rgba(15, 75, 42, .10)' }
    }
  },
  plugins: []
};
export default config;
