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
        darkblue: {
          primary: '#0077B6',
          'primary-focus': '#003459',
          'primary-content': '#FFFFFF',
          secondary: '#8A2BE2',
          'secondary-focus': '#5B21B6',
          'secondary-content': '#FFFFFF',
          accent: '#00BFFF',
          'accent-focus': '#00FFFF',
          'accent-content': '#000000',
          neutral: '#5C5C5C',
          'neutral-focus': '#3B3B3B',
          'neutral-content': '#FFFFFF',
          'base-100': '#212121',
          'base-200': '#2E2E2E',
          'base-300': '#424242',
          'base-content': '#FFFFFF',
          info: '#00ffff',
          'info-content': '#323232',
          success: '#2e8b57',
          'success-content': '#ffffff',
          warning: '#ffd700',
          'warning-content': '#000000',
          error: '#dc143c',
          'error-content': '#ffffff',
        },
        earth: {
          primary: '#C1B7B1',
          'primary-focus': '#8D807A',
          'primary-content': '#FFFFFF',
          secondary: '#D3BFA3',
          'secondary-focus': '#BFAA8F',
          'secondary-content': '#2F2E2B',
          accent: '#9D8C85',
          'accent-focus': '#72645E',
          'accent-content': '#FFFFFF',
          neutral: '#C9C0B5',
          'neutral-focus': '#8D807A',
          'neutral-content': '#2F2E2B',
          'base-100': '#FFFFFF',
          'base-200': '#F7F2EB',
          'base-300': '#EBE3D7',
          'base-content': '#2F2E2B',
          info: '#8D807A',
          'info-content': '#FFFFFF',
          success: '#766B60',
          'success-content': '#FFFFFF',
          warning: '#C1B7B1',
          'warning-content': '#FFFFFF',
          error: '#BDAFA4',
          'error-content': '#FFFFFF',
        },
        steelblue: {
          primary: '#E74C3C',
          'primary-focus': '#C0392B',
          'primary-content': '#FFFFFF',
          secondary: '#F4D03F',
          'secondary-focus': '#F7DC6F',
          'secondary-content': '#000000',
          accent: '#2980B9',
          'accent-focus': '#1A5276',
          'accent-content': '#FFFFFF',
          neutral: '#7F8C8D',
          'neutral-focus': '#BDC3C7',
          'neutral-content': '#FFFFFF',
          'base-100': '#F5F5F5',
          'base-200': '#E0E0E0',
          'base-300': '#BDBDBD',
          'base-content': '#1F1F1F',
          info: '#34495E',
          'info-content': '#FFFFFF',
          success: '#27AE60',
          'success-content': '#FFFFFF',
          warning: '#F39C12',
          'warning-content': '#FFFFFF',
          error: '#E74C3C',
          'error-content': '#FFFFFF',
        },
        darkLavenda: {
          primary: '#6b8ba4',
          'primary-focus': '#6b8ba4',
          'primary-content': '#f5f5f5',
          secondary: '#95b8d1',
          'secondary-focus': '#95b8d1',
          'secondary-content': '#f5f5f5',
          accent: '#6a5acd',
          'accent-focus': '#6a5acd',
          'accent-content': '#f5f5f5',
          neutral: '#696969',
          'neutral-focus': '#A9A9A9',
          'neutral-content': '#f5f5f5',
          'base-100': '#121212',
          'base-200': '#181818',
          'base-300': '#212121',
          'base-content': '#f5f5f5',
          info: '#87CEFA',
          'info-content': '#f5f5f5',
          success: '#2E8B57',
          'success-content': '#f5f5f5',
          warning: '#FFD700',
          'warning-content': '#000000',
          error: '#B22222',
          'error-content': '#f5f5f5',
        },
        arctic: {
          primary: '#3d8fd1',
          'primary-focus': '#0b5fa8',
          'primary-content': '#ffffff',
          secondary: '#73a3b8',
          'secondary-focus': '#345264',
          'secondary-content': '#ffffff',
          accent: '#54b7c1',
          'accent-focus': '#218e94',
          'accent-content': '#ffffff',
          neutral: '#818c99',
          'neutral-focus': '#4a5159',
          'neutral-content': '#ffffff',
          'base-100': '#f5f8fa',
          'base-200': '#d9e2e9',
          'base-300': '#b7c7d4',
          'base-content': '#0e222c',
          info: '#48b5e6',
          'info-content': '#ffffff',
          success: '#4caf50',
          'success-content': '#ffffff',
          warning: '#ffb900',
          'warning-content': '#ffffff',
          error: '#f44336',
          'error-content': '#ffffff',
        },
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
        oceanic: {
          primary: '#3b5998',
          'primary-focus': '#23375d',
          'primary-content': '#ffffff',
          secondary: '#00bfff',
          'secondary-focus': '#0077b3',
          'secondary-content': '#ffffff',
          accent: '#d4af37',
          'accent-focus': '#b38d1d',
          'accent-content': '#ffffff',
          neutral: '#8c8c8c',
          'neutral-focus': '#595959',
          'neutral-content': '#ffffff',
          'base-100': '#f8f8f8',
          'base-200': '#f0f0f0',
          'base-300': '#d9d9d9',
          'base-content': '#333333',
          info: '#00bfff',
          'info-content': '#ffffff',
          success: '#3cb371',
          'success-content': '#ffffff',
          warning: '#ffd700',
          'warning-content': '#ffffff',
          error: '#ff6347',
          'error-content': '#ffffff',
        },
      },
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
