/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // BloodConnect Core Red
        primary: "#C0392B",
        "primary-light": "#FDEDEC",
        
        // Jade Dynasty / Admin Theme
        jade: {
          sidebar: "#1a2e1f",
          accent: "#2d7a4f",
          "accent-light": "#3dba6e",
          bg: "#f4f7f5",
          dark: "#0d1f18",
        },

        // Jade Response / Donor Theme
        response: {
          sidebar: "#111c15",
          accent: "#2ecc71",
          "accent-dark": "#27ae60",
          bg: "#f5f7f6",
          dark: "#1a3d2b",
        },
        
        // General UI Colors
        dark: "#1A1A2E",
        success: "#27AE60",
        warning: "#F39C12",
        info: "#2980B9",
        muted: "#7F8C8D",
        bg: "#F5F5F5",
        card: "#FFFFFF",
        border: "#E0E0E0",
        
        // Landing Page Forest Green
        "forest-green": "#00594a",
        "forest-green-dark": "#1a4a3a",

        // Clinical Guardian / Patient Theme
        guardian: {
          sidebar: "#1A2A1A",
          "sidebar-active": "#C0392B",
          accent: "#C0392B",
          bg: "#F5F5F5",
          card: "#FFFFFF",
        },
      },
      keyframes: {
        pulseRed: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(192, 57, 43, 0.7)' },
          '50%': { boxShadow: '0 0 0 12px rgba(192, 57, 43, 0)' },
        },
        flash: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        glowGreen: {
          '0%, 100%': { boxShadow: '0 0 5px -2px #2ecc71' },
          '50%': { boxShadow: '0 0 15px 0px #2ecc71' },
        },
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        glow: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 5px #F39C12' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 15px #F39C12' },
        },
      },
      animation: {
        'pulse-red': 'pulseRed 2s infinite',
        'flash-urgent': 'flash 1s infinite',
        'glow-green': 'glowGreen 3s ease-in-out infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-award': 'glow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
