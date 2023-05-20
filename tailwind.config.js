/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    
    fontFamily: {
      'p22': ['p22-typewriter', 'serif'],
      'darkmode': ['darkmode-mono', 'sans-serif'],
      'input-compressed': ['input-mono-compressed', 'monospace'],
      'input': ['input-mono', 'monospace'],
    },

    extend: {
      colors: {
      'bermuda': '#78dcca',
      'oxblood': '#4A0404',
      },
      placeholderColor: {
        'blue': '#AOAECO'
      },
      minWidth: {
        'min-w-remilio': '2000px',
      }
    },
  },
  plugins: [],
}

