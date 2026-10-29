/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        win98: {
          teal: '#008080',
          gray: '#c0c0c0',
          darkGray: '#808080',
          lightGray: '#dfdfdf',
          blueActiveStart: '#000080',
          blueActiveEnd: '#1084d0',
          blueInactive: '#808080',
        },
        mac: {
          darkBg: '#1e1e24',
          windowBg: '#1e1e20',
          windowLight: '#ffffff',
          close: '#ff5f56',
          minimize: '#ffbd2e',
          maximize: '#27c93f',
        },
      },
      fontFamily: {
        win98: ['"MS Sans Serif"', 'Tahoma', 'sans-serif'],
        mac: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"SF Pro Text"', 'Inter', 'sans-serif'],
        mono: ['"SF Mono"', 'Menlo', 'Monaco', 'Consolas', '"Courier New"', 'monospace'],
      },
      boxShadow: {
        'win98-outset': 'inset 1px 1px #ffffff, inset -1px -1px #808080, inset 2px 2px #dfdfdf, inset -2px -2px #0a0a0a',
        'win98-inset': 'inset 1px 1px #808080, inset -1px -1px #ffffff, inset 2px 2px #0a0a0a, inset -2px -2px #dfdfdf',
        'win98-window': 'inset 1px 1px #ffffff, inset -1px -1px #0a0a0a, inset 2px 2px #dfdfdf, inset -2px -2px #808080',
        'mac-window': '0 25px 50px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'mac-dock': '0 20px 40px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
      },
    },
  },
  plugins: [],
};
