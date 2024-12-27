/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#206F6A',
        'primary-hover': '#1A5B56',
        'primary-hover2': '#1B5955',
        gray: '#808080',
        'gray-medium': '#979797',
        'gray-dim': '#696969',
        'gray-muted': '#F3F4F6',
        'gray-lightest': '#f9f9f9',
        'gray-light-100': '#f0f0f0',
        'gray-light-150': '#d5d5d5',
        'gray-light-200': '#b3b3b3',
        'gray-dark-100': '#565656',
        'gray-dark-200': '#333333',
        'primary-blue': '#2179A1',
        'primary-blue-hover': '#1e6390',
        black: '#000000',
        blue: '#337FA2',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
