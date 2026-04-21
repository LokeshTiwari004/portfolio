/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F766E',
          light: '#14B8A6',
        },
        accent: '#20C997',
        'dark-bg': '#0F172A',
        'dark-surface': '#1E293B',
        'text-primary': '#F1F5F9',
        'text-secondary': '#94A3B8',
        'light-bg': '#FFFFFF',
        'light-surface': '#F8FAFC',
        'light-text-primary': '#1E293B',
        'light-text-secondary': '#64748B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundColor: {
        'dark-bg': '#0F172A',
        'dark-surface': '#1E293B',
        'light-bg': '#FFFFFF',
        'light-surface': '#F8FAFC',
      },
      textColor: {
        'text-primary': '#F1F5F9',
        'text-secondary': '#94A3B8',
        'light-text-primary': '#1E293B',
        'light-text-secondary': '#64748B',
      },
      borderColor: {
        'dark-surface': '#1E293B',
      },
    },
  },
}
