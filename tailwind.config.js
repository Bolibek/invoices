const {fontFamily} = require('tailwindcss/defaultTheme')
const defaultTheme = require('tailwindcss/defaultTheme')

const {mono: defaultFontFamily} = defaultTheme.fontFamily

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      mobile: '23.4rem',
      tablet: '48rem',
      desktop: '90rem',
    },
    colors: {
      current: 'currentColor',
      transparent: 'transparent',
      white: '#fff',
      red: {
        DEFAULT: '#EC5757',
        light: '#FF9797',
      },
      purple: {
        DEFAULT: '#7C5DFA',
        light: '#9277FF',
      },
      gray: {
        800: '#1E2139',
        700: '#141625',
        600: '#0C0E16',
        500: '#252945',
        400: '#7E88C3',
        300: '#888EB0',
        200: '#DFE3FA',
        100: '#F8F8FB',
      },
    },
    fontSize: {
      'body-1': ['0.75rem', {lineHeight: '0.94rem', letterSpacing: '-0.25px'}],
      'body-2': ['0.7rem', {lineHeight: '1.125rem', letterSpacing: '-0.23px'}],
      xs: [
        '0.75rem',
        {
          lineHeight: '0.94rem',
          letterSpacing: '-0.25px',
        },
      ],
      base: [
        '1rem',
        {
          lineHeight: '1.5rem',
          letterSpacing: '-0.8px',
        },
      ],
      lg: ['1.25rem', {lineHeight: '1.375rem', letterSpacing: '-0.63px'}],
      xl: ['2rem', {lineHeight: '2.25rem', letterSpacing: '1px'}],
    },
    extend: {},
  },
  plugins: [],
}
