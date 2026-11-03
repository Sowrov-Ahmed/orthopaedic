/*!
 * js/tailwind-config.js — SHARED CORE (identical for every member; never edit)
 * Design system: "Aurora Glass" — glassmorphism + editorial typography + 3D depth.
 * Tailwind configuration only (tokens, keyframes, animations). It is not custom CSS.
 */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0A0E1F', 900: '#0F1530', 800: '#161C3D', 700: '#222A52' },
        pearl: { DEFAULT: '#F4F1EB', 100: '#FAF8F4', 200: '#ECE7DD' },
        iris: { DEFAULT: '#7C5CFF', 300: '#B5A3FF', 400: '#9A82FF', 500: '#7C5CFF', 600: '#6240F0', 700: '#4D2FD1' },
        aqua: { DEFAULT: '#22D3EE', 600: '#0891B2' },
        coral: { DEFAULT: '#FF7A59', 600: '#E5532F' },
        gold: { DEFAULT: '#F4C46A' },
        mint: { DEFAULT: '#34D399' },
        danger: '#F43F5E'
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace']
      },
      backgroundImage: {
        'aurora-dark': 'radial-gradient(60% 50% at 12% 8%,rgba(124,92,255,.55),transparent 60%),radial-gradient(50% 45% at 88% 18%,rgba(34,211,238,.32),transparent 60%),radial-gradient(55% 50% at 62% 100%,rgba(255,122,89,.28),transparent 60%),linear-gradient(180deg,#0A0E1F,#0F1530)',
        'aurora-light': 'radial-gradient(50% 40% at 8% 0%,rgba(124,92,255,.20),transparent 60%),radial-gradient(40% 40% at 96% 8%,rgba(34,211,238,.20),transparent 60%),radial-gradient(45% 40% at 70% 100%,rgba(255,122,89,.16),transparent 60%),linear-gradient(#F4F1EB,#F4F1EB)',
        'iris-grad': 'linear-gradient(135deg,#7C5CFF 0%,#22D3EE 100%)',
        'coral-grad': 'linear-gradient(135deg,#FF7A59 0%,#F4C46A 100%)',
        'glass-sheen': 'linear-gradient(135deg,rgba(255,255,255,.28),rgba(255,255,255,.04))',
        'grid-lines': 'linear-gradient(rgba(255,255,255,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.06) 1px,transparent 1px)'
      },
      boxShadow: {
        glass: '0 22px 50px -22px rgba(10,14,31,.5), inset 0 1px 0 rgba(255,255,255,.35)',
        'glass-lg': '0 44px 90px -34px rgba(10,14,31,.65), inset 0 1px 0 rgba(255,255,255,.4)',
        'glow-iris': '0 14px 40px -10px rgba(124,92,255,.7)',
        'glow-aqua': '0 14px 40px -10px rgba(34,211,238,.6)',
        depth: '0 34px 60px -28px rgba(10,14,31,.6)'
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        fadeUp: { from: { opacity: '0', transform: 'translateY(44px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideLeft: { from: { opacity: '0', transform: 'translateX(-60px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        slideRight: { from: { opacity: '0', transform: 'translateX(60px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        zoomIn: { from: { opacity: '0', transform: 'scale(.88)' }, to: { opacity: '1', transform: 'scale(1)' } },
        flipIn: { from: { opacity: '0', transform: 'perspective(900px) rotateX(-55deg) translateY(30px)' }, to: { opacity: '1', transform: 'perspective(900px) rotateX(0) translateY(0)' } },
        blurIn: { from: { opacity: '0', filter: 'blur(14px)', transform: 'scale(1.04)' }, to: { opacity: '1', filter: 'blur(0)', transform: 'scale(1)' } },
        float3d: { '0%,100%': { transform: 'translateY(0) rotate(0deg) scale(1)' }, '50%': { transform: 'translateY(-22px) rotate(6deg) scale(1.04)' } },
        spinY: { from: { transform: 'perspective(900px) rotateY(0deg)' }, to: { transform: 'perspective(900px) rotateY(360deg)' } },
        orbit: { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        aurora: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(40px,-30px) scale(1.15)' } },
        shine: { from: { transform: 'translateX(-160%) skewX(-20deg)' }, to: { transform: 'translateX(320%) skewX(-20deg)' } },
        pulseGlow: { '0%,100%': { opacity: '.5', transform: 'scale(1)' }, '50%': { opacity: '1', transform: 'scale(1.12)' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        draw: { to: { strokeDashoffset: '0' } },
        bob: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } }
      },
      animation: {
        'fade-in': 'fadeIn .9s ease-out both',
        'fade-up': 'fadeUp .95s cubic-bezier(.22,1,.36,1) both',
        'slide-left': 'slideLeft .95s cubic-bezier(.22,1,.36,1) both',
        'slide-right': 'slideRight .95s cubic-bezier(.22,1,.36,1) both',
        'zoom-in': 'zoomIn .9s cubic-bezier(.22,1,.36,1) both',
        'flip-in': 'flipIn 1s cubic-bezier(.22,1,.36,1) both',
        'blur-in': 'blurIn 1.1s cubic-bezier(.22,1,.36,1) both',
        'float3d': 'float3d 7s ease-in-out infinite',
        'float3d-slow': 'float3d 11s ease-in-out infinite',
        'spin-y': 'spinY 14s linear infinite',
        'orbit': 'orbit 40s linear infinite',
        'orbit-rev': 'orbit 60s linear infinite reverse',
        'aurora': 'aurora 16s ease-in-out infinite',
        'shine': 'shine 2.8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3.2s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'draw': 'draw 2.4s ease-out forwards',
        'bob': 'bob 3s ease-in-out infinite'
      }
    }
  }
};
