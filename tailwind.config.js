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
        'gray-neutral': '#898989',
        'gray-dim': '#696969',
        'gray-muted': '#F3F4F6',
        'gray-muted-light': '#FAFBFD',
        'gray-lightest': '#f9f9f9',
        'gray-light-100': '#f0f0f0',
        'gray-light-125': '#e0e0e0',
        'gray-light-150': '#d5d5d5',
        'gray-light-200': '#b3b3b3',
        'gray-light-300': '#52525B',
        'gray-dark-100': '#565656',
        'gray-dark-150': '#404040',
        'gray-dark-200': '#363636',
        'gray-dark-300': '#333333',
        'primary-blue': '#2179A1',
        'primary-blue-hover': '#1e6390',
        'gray-blue-light': '#C1D7E1',
        'sky-blue': '#4880FF',
        black: '#000000',
        'black-muted': '#202224',
        blue: '#337FA2',
        'blue-muted': '#071A34',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
      },

      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        'min-1780': { min: '1780px', max: '4000px' },
        'min-2040': { min: '2040px', max: '4000px' },
        '2040-2300': { min: '2040px', max: '2300px' },
        'min-2300': { min: '2040px', max: '4000px' },
      },
    },
  },
  plugins: [],
};
