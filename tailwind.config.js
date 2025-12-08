/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // gray-800
        input: "var(--color-input)", // gray-800
        ring: "var(--color-ring)", // lime-500
        background: "var(--color-background)", // black
        foreground: "var(--color-foreground)", // white
        primary: {
          DEFAULT: "var(--color-primary)", // gray-950
          foreground: "var(--color-primary-foreground)", // white
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // gray-900
          foreground: "var(--color-secondary-foreground)", // white
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // pink-500
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // gray-800
          foreground: "var(--color-muted-foreground)", // gray-400
        },
        accent: {
          DEFAULT: "var(--color-accent)", // lime-500
          foreground: "var(--color-accent-foreground)", // gray-950
        },
        popover: {
          DEFAULT: "var(--color-popover)", // gray-800
          foreground: "var(--color-popover-foreground)", // white
        },
        card: {
          DEFAULT: "var(--color-card)", // gray-900
          foreground: "var(--color-card-foreground)", // white
        },
        success: {
          DEFAULT: "var(--color-success)", // lime-500
          foreground: "var(--color-success-foreground)", // gray-950
        },
        warning: {
          DEFAULT: "var(--color-warning)", // yellow-400
          foreground: "var(--color-warning-foreground)", // gray-950
        },
        error: {
          DEFAULT: "var(--color-error)", // pink-500
          foreground: "var(--color-error-foreground)", // white
        },
        toxic: {
          lime: "var(--color-accent)", // lime-500
          magenta: "var(--color-toxic-magenta)", // pink-500
          gold: "var(--color-toxic-gold)", // yellow-400
          orange: "var(--color-toxic-orange)", // orange-600
        },
        surface: "var(--color-surface)", // gray-800
        text: {
          primary: "var(--color-text-primary)", // white
          secondary: "var(--color-text-secondary)", // gray-400
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        cta: ['Space Grotesk', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'modal': '0 8px 40px rgba(0, 0, 0, 0.4)',
        'toxic-lime': '0 0 20px rgba(50, 205, 50, 0.3)',
        'toxic-magenta': '0 0 20px rgba(255, 20, 147, 0.3)',
        'toxic-gold': '0 0 20px rgba(255, 215, 0, 0.3)',
        'brutalist': '20px 20px 0 #FF4500',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "neon-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "glitch": {
          "0%, 100%": { transform: "skew(0deg) translateX(0)" },
          "33%": { transform: "skew(-2deg) translateX(2px)" },
          "66%": { transform: "skew(2deg) translateX(-2px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
        "glitch": "glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite",
      },
    },
  },
  plugins: [],
}