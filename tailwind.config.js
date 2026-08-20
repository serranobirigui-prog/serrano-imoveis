/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: { night: '#20222E', nightlight: '#2B2E3D', gold: '#D98A3D', goldlight: '#F0A85C', skyblue: '#4C86B8' },
      fontFamily: { display: ['Georgia', 'serif'], body: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'] },
      boxShadow: { card: '0 4px 20px rgba(0,0,0,0.08)' },
    },
  },
  plugins: [],
};
