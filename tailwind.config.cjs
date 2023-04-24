/* eslint-disable no-undef */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Lato', 'Mukta', 'system-ui'],
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        sandstorm: {
          primary: '#44862d',
          'primary-focus': '#44c427',
          'primary-content': '#ffffff',

          secondary: '#a86900',
          'secondary-focus': '#323f2c',
          'secondary-content': '#121f0e',

          accent: '#517f80',
          'accent-focus': '#0f4244',
          'accent-content': '#002021',

          neutral: '#767872',
          'neutral-focus': '#3a3c38',
          'neutral-content': '#fafaf3',

          'base-100': '#f9fef0',
          'base-200': '#eef3e5',
          'base-300': '#dfe4d7',
          'base-content': '#181d15',

          info: '#386668',
          'info-content': '#ffffff',

          success: '#146e00',
          'success-content': '#ffffff',

          warning: '#c3a624',
          'warning-content': '#ffffff',

          error: '#ba1a1a',
          'error-content': '#ffffff',
        },
      },
      // {
      //   moss: {
      //     primary: '#255102',
      //     'primary-focus': '#173800',
      //     'primary-content': '#f8ffeb',

      //     secondary: '#3f4a35',
      //     'secondary-focus': '#141e0c',
      //     'secondary-content': '#f0fee0',

      //     accent: '#7c7b01',
      //     'accent-focus': '#b2b03d',
      //     'accent-content': '#fffcc4',

      //     neutral: '#565500',
      //     'neutral-focus': '#333200',
      //     'neutral-content': '#fffcc4',

      //     'base-100': '#fafeef',
      //     'base-200': '#e0e4d6',
      //     'base-300': '#a8ada0',
      //     'base-content': '#1a1c18',

      //     info: '#0b2000',
      //     success: '#315d0f',
      //     warning: '#cdcc56',
      //     error: '#93000a',
      //   },
      // },
      // {
      //   moss: {
      //     primary: '#255102',
      //     'primary-focus': '#173800',
      //     'primary-content': '#f8ffeb',

      //     secondary: '#3f4a35',
      //     'secondary-focus': '#141e0c',
      //     'secondary-content': '#f0fee0',

      //     accent: '#7c7b01',
      //     'accent-focus': '#b2b03d',
      //     'accent-content': '#fffcc4',

      //     neutral: '#565500',
      //     'neutral-focus': '#333200',
      //     'neutral-content': '#fffcc4',

      //     'base-100': '#fafeef',
      //     'base-200': '#e0e4d6',
      //     'base-300': '#a8ada0',
      //     'base-content': '#1a1c18',

      //     info: '#0b2000',
      //     success: '#315d0f',
      //     warning: '#cdcc56',
      //     error: '#93000a',
      //   },
      // },
    ],
  },
};

// 'light',
//       'dark',
//       'cupcake',
//       'bumblebee',
//       'emerald',
//       'corporate',
//       'synthwave',
//       'retro',
//       'cyberpunk',
//       'valentine',
//       'halloween',
//       'garden',
//       'forest',
//       'aqua',
//       'lofi',
//       'pastel',
//       'fantasy',
//       'wireframe',
//       'black',
//       'luxury',
//       'dracula',
//       'cmyk',
//       'autumn',
//       'business',
//       'acid',
//       'lemonade',
//       'night',
//       'coffee',
//       'winter',
