import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
      fontFamily: {
        display: ['Nanum Myeongjo', 'serif'],
        body: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Responsive fluid typography using clamp
        'fluid-xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.35vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.25rem)',
        'fluid-xl': 'clamp(1.25rem, 1rem + 1.25vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.2rem + 1.5vw, 2rem)',
        'fluid-3xl': 'clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)',
        'fluid-4xl': 'clamp(2.25rem, 1.8rem + 2.25vw, 3rem)',
        'fluid-5xl': 'clamp(3rem, 2rem + 3vw, 4rem)',
        'fluid-hero': 'clamp(2.5rem, 1.5rem + 5vw, 6rem)',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        warm: {
          glow: "hsl(var(--warm-glow))",
        },
        text: {
          hero: "hsl(var(--text-hero))",
          body: "hsl(var(--text-body))",
          muted: "hsl(var(--text-muted))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsla(35, 70%, 55%, 0.3)" },
          "50%": { boxShadow: "0 0 40px hsla(35, 70%, 55%, 0.6)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        // New advanced animations
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "33%": { transform: "translateY(-8px) rotate(1deg)" },
          "66%": { transform: "translateY(-4px) rotate(-1deg)" },
        },
        "blur-in": {
          "0%": { opacity: "0", filter: "blur(12px)", transform: "scale(0.95)" },
          "100%": { opacity: "1", filter: "blur(0)", transform: "scale(1)" },
        },
        "scale-up": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
        "glow-pulse": {
          "0%, 100%": { 
            textShadow: "0 0 20px hsla(260, 70%, 65%, 0.3), 0 0 40px hsla(260, 70%, 65%, 0.1)" 
          },
          "50%": { 
            textShadow: "0 0 30px hsla(260, 70%, 65%, 0.5), 0 0 60px hsla(260, 70%, 65%, 0.2)" 
          },
        },
        "slide-up-fade": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "reveal-text": {
          "0%": { opacity: "0", transform: "translateY(100%)", filter: "blur(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "scale-in": "scale-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-in-right": "slide-in-right 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "float": "float 4s ease-in-out infinite",
        // New animations
        "shimmer": "shimmer 2.5s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "blur-in": "blur-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "scale-up": "scale-up 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "slide-up-fade": "slide-up-fade 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "reveal-text": "reveal-text 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      transitionDelay: {
        "0": "0ms",
        "75": "75ms",
        "100": "100ms",
        "150": "150ms",
        "200": "200ms",
        "300": "300ms",
        "400": "400ms",
        "500": "500ms",
        "600": "600ms",
        "700": "700ms",
        "800": "800ms",
        "900": "900ms",
        "1000": "1000ms",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "900": "900ms",
        "1200": "1200ms",
        "1500": "1500ms",
        "2000": "2000ms",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
