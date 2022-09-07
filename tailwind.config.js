const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./apps/clips/src/**/*.{html,ts}'],
  safelist: ['bg-blue-400', 'bg-red-400', 'bg-green-400'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Barlow', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  corePlugins: {
    aspectRatio: true,
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
