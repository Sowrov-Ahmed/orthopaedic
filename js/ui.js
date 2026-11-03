/*!
 * js/ui.js — SHARED CORE (never edit). window.UI: helpers, icons, class recipes and ready-made glass components.
 * Every component returns an HTML string. After injecting HTML call UI.mount(container) (binds motion, accordion, tabs, carousel).
 * theme: 'dark' (white text on aurora-dark/ink sections) | 'light' (ink text on aurora-light/pearl sections)
 */
(function (window, document) {
  'use strict';
  var tabSequence = 0;
  var ICONS = {
    'arrow-right': '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>', 'arrow-left': '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
    'arrow-up': '<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>', 'arrow-up-right': '<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>',
    'phone': '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    'mail': '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    'map-pin': '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>', 'navigation': '<polygon points="3 11 22 2 13 21 11 13 3 11"/>',
    'clock': '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', 'calendar': '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    'check': '<polyline points="20 6 9 17 4 12"/>', 'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    'alert-circle': '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>', 'info': '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>',
    'star': '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    'quote': '<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>',
    'menu': '<line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="17" x2="15" y2="17"/>', 'x': '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    'chevron-down': '<polyline points="6 9 12 15 18 9"/>', 'chevron-up': '<polyline points="18 15 12 9 6 15"/>', 'chevron-left': '<polyline points="15 18 9 12 15 6"/>', 'chevron-right': '<polyline points="9 18 15 12 9 6"/>',
    'search': '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>', 'user': '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    'users': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    'lock': '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>', 'eye': '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    'eye-off': '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>',
    'share': '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
    'facebook': '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    'linkedin': '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    'youtube': '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>',
    'instagram': '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
    'message-circle': '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
    'activity': '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>', 'shield': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    'award': '<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>', 'heart': '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
    'stethoscope': '<path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/>',
    'bone': '<path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z"/>',
    'target': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    'building': '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
    'car': '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
    'wifi': '<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>',
    'wheelchair': '<circle cx="12" cy="4" r="1.5"/><path d="M12 7v6h5l3 5"/><path d="M8 11a5 5 0 1 0 6 7"/>',
    'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    'filter': '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>', 'tag': '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>',
    'book-open': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>', 'play': '<polygon points="5 3 19 12 5 21 5 3"/>',
    'plus': '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>', 'minus': '<line x1="5" y1="12" x2="19" y2="12"/>',
    'printer': '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
    'external-link': '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
    'globe': '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
    'credit-card': '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>', 'copy': '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    'trending-up': '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>', 'home': '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    'log-in': '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>', 'send': '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
    'sparkles': '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z"/>', 'layers': '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>'
  };
  var T = {
    dark: { text: 'text-white', muted: 'text-white/65', faint: 'text-white/45', eyebrow: 'text-iris-300', em: '[&_em]:text-iris-300', glass: 'border border-white/15 bg-white/10 backdrop-blur-xl shadow-glass', chip: 'border-white/20 bg-white/10 text-white/85', iconBg: 'bg-white/10 text-iris-300', divider: 'border-white/10', input: 'border-white/15 bg-white/10 text-white placeholder:text-white/70 focus-visible:border-iris-300 focus-visible:ring-iris-400/40', label: 'text-white/85' },
    light: { text: 'text-ink', muted: 'text-ink/65', faint: 'text-ink/45', eyebrow: 'text-iris-600', em: '[&_em]:text-iris-600', glass: 'border border-white/80 bg-white/60 backdrop-blur-xl shadow-glass', chip: 'border-ink/10 bg-white/70 text-ink/80', iconBg: 'bg-iris/10 text-iris-600', divider: 'border-ink/10', input: 'border-ink/10 bg-white/70 text-ink placeholder:text-ink/60 focus-visible:border-iris focus-visible:ring-iris/35', label: 'text-ink/85' }
  };
  function th(t) { return T[t] || T.dark; }
  var SPOT = 'before:pointer-events-none before:absolute before:inset-0 before:z-10 before:opacity-0 motion-safe:before:transition-opacity before:duration-500 hover:before:opacity-100 before:bg-[radial-gradient(420px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,.2),transparent_45%)]';
  function trim1(n) { return String(Math.round(n * 10) / 10).replace(/\.0$/, ''); }
  function shortBDT(n) { return n >= 100000 ? trim1(n / 100000) + ' lakh' : Number(n).toLocaleString('en-IN'); }

  var UI = {
    cls: {
      container: 'mx-auto w-full max-w-7xl px-5 sm:px-8',
      sectionDark: 'relative isolate overflow-hidden bg-aurora-dark py-20 text-white md:py-32',
      sectionLight: 'relative isolate overflow-hidden bg-aurora-light py-20 text-ink md:py-32',
      sectionInk: 'relative isolate overflow-hidden bg-ink py-20 text-white md:py-32',
      glassDark: 'rounded-[2rem] border border-white/15 bg-white/10 backdrop-blur-xl shadow-glass',
      glassLight: 'rounded-[2rem] border border-white/80 bg-white/60 backdrop-blur-xl shadow-glass',
      h1: 'font-display text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl [&_em]:font-normal [&_em]:italic',
      h2: 'font-display text-4xl font-light leading-[1.05] tracking-tight md:text-5xl [&_em]:font-normal [&_em]:italic',
      h3: 'font-display text-2xl font-normal leading-snug',
      eyebrow: 'inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.22em]',
      btnPrimary: 'group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-iris-grad px-7 py-3.5 font-semibold text-white shadow-glow-iris motion-safe:transition-[transform,opacity,color,background-color,border-color,box-shadow] duration-300 hover:-translate-y-0.5 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:active:scale-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-iris/40',
      btnGlass: 'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-md motion-safe:transition-[transform,opacity,color,background-color,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-white/20 active:scale-[.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30',
      btnInk: 'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 font-semibold text-white shadow-depth motion-safe:transition-[transform,opacity,color,background-color,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-ink-800 active:scale-[.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink/30',
      btnOutline: 'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-ink/20 bg-white/40 px-7 py-3.5 font-semibold text-ink backdrop-blur-md motion-safe:transition-[transform,opacity,color,background-color,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-ink hover:text-white active:scale-[.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ink/20',
      shine: '<span aria-hidden="true" class="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/30 blur-md motion-safe:animate-shine"></span>',
      stage: '[perspective:1400px]', preserve3d: '[transform-style:preserve-3d]', noBackface: '[backface-visibility:hidden]'
    },
    ready: function (fn) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn(); },
    qs: function (s, r) { return (r || document).querySelector(s); },
    qsa: function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); },
    esc: function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); },
    emph: function (s) { return UI.esc(s).replace(/\*([^*]+)\*/g, '<em>$1</em>'); },
    getParam: function (n) { return new URLSearchParams(window.location.search).get(n); },
    setParams: function (values) {
      if (window.location.protocol === 'file:') return;
      var params = new URLSearchParams(window.location.search);
      Object.keys(values).forEach(function (key) {
        var value = values[key];
        if (value === null || value === undefined || value === '') params.delete(key);
        else params.set(key, String(value));
      });
      var query = params.toString();
      window.history.replaceState(null, '', window.location.pathname + (query ? '?' + query : '') + window.location.hash);
    },
    debounce: function (fn, ms) { var t; return function () { var a = arguments, c = this; clearTimeout(t); t = setTimeout(function () { fn.apply(c, a); }, ms || 200); }; },
    slugify: function (s) { return String(s).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''); },
    formatBDT: function (n) { return '\u09F3' + Number(n).toLocaleString('en-IN'); },
    formatBDTRange: function (a, b) { if (a >= 100000 && b >= 100000) return '\u09F3' + trim1(a / 100000) + ' \u2013 ' + trim1(b / 100000) + ' lakh'; return '\u09F3' + shortBDT(a) + ' \u2013 ' + shortBDT(b); },
    formatDate: function (iso, style) { var d = new Date(String(iso).indexOf('T') > -1 ? iso : iso + 'T00:00:00'); return d.toLocaleDateString('en-GB', { day: 'numeric', month: style === 'short' ? 'short' : 'long', year: 'numeric' }); },
    formatTime: function (date) { return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }); },
    isBDPhone: function (v) { return /^(?:\+?88)?01[3-9]\d{8}$/.test(String(v).replace(/[\s-]/g, '')); },
    icon: function (name, cls) {
      var filled = /-fill$/.test(name), base = name.replace(/-fill$/, ''), d = ICONS[base]; if (!d) return '';
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="' + (cls || 'h-5 w-5') + '" fill="' + (filled ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="' + (filled ? 1.2 : 1.7) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + d + '</svg>';
    },
    iconNames: function () { return Object.keys(ICONS); },
    img: function (src, alt, cls, o) {
      o = o || {}; var w = o.w || 800, h = o.h || 600;
      return '<img src="' + UI.esc(src) + '" alt="' + UI.esc(alt) + '" width="' + w + '" height="' + h + '" class="' + (cls || '') + '" loading="' + (o.eager ? 'eager' : 'lazy') + '"' + (o.eager ? ' fetchpriority="high"' : '') + ' decoding="async">';
    },
    deco: function (src, cls) { return '<img src="' + UI.esc(src) + '" alt="" aria-hidden="true" width="400" height="400" class="' + (cls || '') + '" loading="lazy" decoding="async">'; },
    stars: function (r, cls) { var o = '<span class="inline-flex items-center gap-0.5" role="img" aria-label="Rated ' + r + ' out of 5">'; for (var i = 1; i <= 5; i++) o += UI.icon('star-fill', (cls || 'h-4 w-4') + (i <= Math.round(r) ? ' text-gold' : ' text-white/25')); return o + '</span>'; },
    eyebrow: function (text, theme) { var t = th(theme); return '<p data-reveal="fade" class="' + UI.cls.eyebrow + ' ' + t.eyebrow + '"><span class="h-px w-8 bg-current"></span>' + UI.esc(text) + '</p>'; },
    /* o: {eyebrow,title(*em*),lead,align:'center'|'left',theme} */
    sectionHead: function (o) {
      var t = th(o.theme), c = o.align === 'center';
      return '<div data-component="SectionHead" class="' + (c ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl') + '">' + (o.eyebrow ? '<div class="' + (c ? 'flex justify-center' : '') + '">' + UI.eyebrow(o.eyebrow, o.theme) + '</div>' : '') +
        '<h2 data-split class="mt-5 ' + UI.cls.h2 + ' ' + t.text + ' ' + t.em + '">' + UI.emph(o.title) + '</h2>' + (o.lead ? '<p data-reveal="up" data-delay="150" class="mt-5 text-lg leading-relaxed ' + t.muted + '">' + UI.esc(o.lead) + '</p>' : '') + '</div>';
    },
    /* Standard inner-page hero (dark, 3D parallax objects). o: {eyebrow,title(*em*),lead,actionsHTML} */
    pageHero: function (o) {
      var ob = SITE.img.objects;
      return '<section data-component="PageHero" data-section="page-hero" data-stage class="relative isolate overflow-hidden bg-aurora-dark pb-20 pt-32 text-white md:pb-28 md:pt-40">' +
        '<div aria-hidden="true" class="absolute inset-0 -z-10 bg-grid-lines opacity-70 [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>' +
        '<div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-0 hidden md:block">' +
        '<div data-depth="46" data-rotate="4" class="absolute right-[7%] top-32 w-44">' + UI.deco(ob.bone, 'w-full motion-safe:animate-float3d') + '</div>' +
        '<div data-depth="-30" class="absolute right-[24%] top-[58%] w-24">' + UI.deco(ob.ball, 'w-full motion-safe:animate-float3d-slow') + '</div>' +
        '<div data-depth="24" class="absolute right-[3%] bottom-10 w-32">' + UI.deco(ob.ring, 'w-full motion-safe:animate-orbit') + '</div>' +
        '<div data-depth="-52" class="absolute left-[46%] top-28 w-20 opacity-80">' + UI.deco(ob.capsule, 'w-full motion-safe:animate-float3d') + '</div></div>' +
        '<div class="' + UI.cls.container + '">' +
        (o.eyebrow ? UI.eyebrow(o.eyebrow, 'dark') : '') +
        '<h1 data-split class="mt-5 max-w-4xl ' + UI.cls.h1 + ' [&_em]:text-iris-300">' + UI.emph(o.title) + '</h1>' +
        (o.lead ? '<p data-reveal="up" data-delay="250" class="mt-7 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">' + UI.esc(o.lead) + '</p>' : '') +
        (o.actionsHTML ? '<div data-reveal="up" data-delay="350" class="mt-9 flex flex-wrap gap-3">' + o.actionsHTML + '</div>' : '') + '</div></section>';
    },
    badge: function (text, theme) { return '<span class="inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-widest ' + th(theme).chip + '">' + UI.esc(text) + '</span>'; },
    statTile: function (o) {
      var t = th(o.theme);
      return '<div data-component="StatTile" data-reveal="up" data-delay="' + (o.delay || 0) + '" class="relative overflow-hidden rounded-3xl p-6 ' + t.glass + '"><p class="font-display text-5xl font-light ' + t.text + '"><span data-counter="' + o.value + '"' + (o.suffix ? ' data-suffix="' + UI.esc(o.suffix) + '"' : '') + (o.decimals ? ' data-decimals="' + o.decimals + '"' : '') + '>' + o.value + '</span></p><p class="mt-2 font-mono text-xs uppercase tracking-[0.18em] ' + t.muted + '">' + UI.esc(o.label) + '</p></div>';
    },
    serviceCard: function (s, o) {
      o = o || {}; var t = th(o.theme);
      return '<article data-component="ServiceCard" data-category="' + UI.esc(s.category) + '" class="group"><a href="' + SITE.url.service(s.slug) + '" class="block h-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-iris/40 rounded-[2rem]">' +
        '<div data-tilt data-spotlight class="relative h-full overflow-hidden rounded-[2rem] ' + t.glass + ' ' + SPOT + '"><div data-tilt-glare aria-hidden="true" class="pointer-events-none absolute inset-0 z-10 opacity-0 motion-safe:transition-opacity duration-300"></div>' +
        '<div class="overflow-hidden">' + UI.img(s.image, s.name, 'aspect-[4/3] w-full object-cover motion-safe:transition-[transform,opacity] duration-700 group-hover:scale-105', { w: 800, h: 600 }) + '</div>' +
        '<div class="p-6"><div class="flex items-center justify-between gap-3">' + UI.badge(s.category.replace('-', ' '), o.theme) + '<span class="flex h-10 w-10 items-center justify-center rounded-full ' + t.iconBg + '">' + UI.icon(s.icon, 'h-5 w-5') + '</span></div>' +
        '<h3 class="mt-5 ' + UI.cls.h3 + ' ' + t.text + '">' + UI.esc(s.name) + '</h3><p class="mt-3 text-sm leading-relaxed ' + t.muted + '">' + UI.esc(s.short) + '</p>' +
        '<div class="mt-6 flex items-center justify-between border-t pt-4 ' + t.divider + '"><p class="font-mono text-xs ' + t.muted + '">' + UI.formatBDTRange(s.priceFrom, s.priceTo) + '<span class="block opacity-70">' + UI.esc(s.priceUnit) + '</span></p><span class="flex h-10 w-10 items-center justify-center rounded-full bg-iris-grad text-white motion-safe:transition-[transform,opacity] duration-300 group-hover:translate-x-1">' + UI.icon('arrow-right', 'h-4 w-4') + '</span></div></div></div></a></article>';
    },
    chamberCard: function (c, o) {
      o = o || {}; var t = th(o.theme);
      return '<article data-component="ChamberCard" class="group"><div data-tilt data-spotlight class="relative h-full overflow-hidden rounded-[2rem] ' + t.glass + ' ' + SPOT + '"><div data-tilt-glare aria-hidden="true" class="pointer-events-none absolute inset-0 z-10 opacity-0 motion-safe:transition-opacity duration-300"></div>' +
        '<div class="overflow-hidden">' + UI.img(c.image, c.name + ' building', 'aspect-[4/3] w-full object-cover motion-safe:transition-[transform,opacity] duration-700 group-hover:scale-105', { w: 800, h: 600 }) + '</div><div class="p-6">' +
        '<p class="font-mono text-xs uppercase tracking-[0.2em] ' + t.eyebrow + '">' + UI.esc(c.area) + ', ' + UI.esc(c.city) + '</p><h3 class="mt-2 ' + UI.cls.h3 + ' ' + t.text + '">' + UI.esc(c.name) + '</h3>' +
        '<ul class="mt-4 space-y-2 text-sm ' + t.muted + '"><li class="flex gap-2">' + UI.icon('map-pin', 'mt-0.5 h-4 w-4 shrink-0') + UI.esc(c.address) + '</li>' +
        c.schedule.map(function (s) { return '<li class="flex gap-2">' + UI.icon('clock', 'mt-0.5 h-4 w-4 shrink-0') + '<span><b class="' + t.text + '">' + UI.esc(s.label) + '</b> · ' + UI.esc(s.hours) + '</span></li>'; }).join('') +
        '<li class="flex gap-2">' + UI.icon('credit-card', 'mt-0.5 h-4 w-4 shrink-0') + 'First visit ' + UI.formatBDT(c.fee.firstVisit) + ' · Follow-up ' + UI.formatBDT(c.fee.followUp) + '</li></ul>' +
        '<div class="mt-6 flex flex-wrap gap-3"><a href="' + SITE.url.appointment({ chamber: c.slug }) + '" class="' + UI.cls.btnPrimary + ' !px-5 !py-2.5 text-sm">Book here' + UI.icon('arrow-right', 'h-4 w-4') + '</a><a href="' + SITE.url.chamber(c.slug) + '" class="' + (o.theme === 'light' ? UI.cls.btnOutline : UI.cls.btnGlass) + ' !px-5 !py-2.5 text-sm">Details</a></div></div></div></article>';
    },
    postCard: function (p, o) {
      o = o || {}; var t = th(o.theme);
      return '<article data-component="PostCard" class="group"><a href="' + SITE.url.blog(p.slug) + '" class="block h-full rounded-[2rem] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-iris/40"><div data-tilt data-spotlight class="relative h-full overflow-hidden rounded-[2rem] ' + t.glass + ' ' + SPOT + '"><div data-tilt-glare aria-hidden="true" class="pointer-events-none absolute inset-0 z-10 opacity-0 motion-safe:transition-opacity duration-300"></div>' +
        '<div class="overflow-hidden">' + UI.img(p.image, p.title, 'aspect-[16/10] w-full object-cover motion-safe:transition-[transform,opacity] duration-700 group-hover:scale-105', { w: 800, h: 500 }) + '</div><div class="p-6">' +
        '<div class="flex flex-wrap items-center gap-3">' + UI.badge(p.category, o.theme) + '<span class="font-mono text-xs ' + t.faint + '">' + UI.formatDate(p.date, 'short') + ' · ' + p.readMinutes + ' min read</span></div>' +
        '<h3 class="mt-4 ' + UI.cls.h3 + ' ' + t.text + '">' + UI.esc(p.title) + '</h3><p class="mt-3 text-sm leading-relaxed ' + t.muted + '">' + UI.esc(p.excerpt) + '</p>' +
        '<p class="mt-5 inline-flex items-center gap-2 text-sm font-semibold ' + (o.theme === 'light' ? 'text-iris-600' : 'text-iris-300') + '">Read article' + UI.icon('arrow-right', 'h-4 w-4 motion-safe:transition-[transform,opacity] group-hover:translate-x-1') + '</p></div></div></a></article>';
    },
    testimonialCard: function (x, o) {
      o = o || {}; var t = th(o.theme), s = SITE.getService(x.serviceSlug);
      return '<figure data-component="TestimonialCard" class="relative h-full overflow-hidden rounded-[2rem] p-7 ' + t.glass + '"><span aria-hidden="true" class="absolute -right-2 -top-3 font-display text-[9rem] leading-none ' + (o.theme === 'light' ? 'text-iris/10' : 'text-white/10') + '">\u201D</span>' +
        '<div class="relative">' + UI.stars(x.rating) + '<blockquote class="mt-5 font-display text-xl font-light leading-relaxed ' + t.text + '">\u201C' + UI.esc(x.quote) + '\u201D</blockquote>' +
        '<figcaption class="mt-6 flex items-center gap-3 border-t pt-5 ' + t.divider + '"><span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-iris-grad font-display text-lg text-white">' + UI.esc(x.name.charAt(0)) + '</span><span class="min-w-0"><span class="block font-semibold ' + t.text + '">' + UI.esc(x.name) + ', ' + x.age + '</span><span class="block truncate text-sm ' + t.muted + '">' + UI.esc(x.area) + (s ? ' · ' + UI.esc(s.name) : '') + '</span></span></figcaption></div></figure>';
    },
    faqItem: function (o) {
      var t = th(o.theme), id = UI.esc(o.id), open = !!o.open;
      return '<div data-component="FaqItem" data-accordion-item class="rounded-3xl ' + t.glass + '"><h3><button type="button" id="acc-btn-' + id + '" data-accordion-trigger aria-expanded="' + open + '" aria-controls="acc-panel-' + id + '" class="flex w-full items-center justify-between gap-4 rounded-3xl px-6 py-5 text-left font-display text-lg ' + t.text + ' focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-iris/40"><span>' + UI.esc(o.question) + '</span><span data-accordion-icon class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full ' + t.iconBg + ' motion-safe:transition-transform duration-300' + (open ? ' rotate-180' : '') + '">' + UI.icon('chevron-down', 'h-4 w-4') + '</span></button></h3>' +
        '<div id="acc-panel-' + id + '" role="region" aria-labelledby="acc-btn-' + id + '" data-accordion-panel' + (open ? '' : ' hidden inert') + '><div class="px-6 pb-6 leading-relaxed ' + t.muted + '">' + o.answerHTML + '</div></div></div>';
    },
    ctaBand: function (o) {
      return '<section data-component="CtaBand" data-section="cta" class="relative isolate overflow-hidden bg-aurora-dark py-20 text-white md:py-28"><div aria-hidden="true" class="absolute -left-20 top-0 h-80 w-80 rounded-full bg-iris/40 blur-3xl motion-safe:animate-aurora"></div><div aria-hidden="true" class="absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-coral/30 blur-3xl motion-safe:animate-aurora [animation-delay:4s]"></div>' +
        '<div class="' + UI.cls.container + '"><div data-scroll-3d class="mx-auto max-w-4xl rounded-[2.5rem] p-10 text-center md:p-16 ' + th('dark').glass + '"><h2 data-split class="' + UI.cls.h2 + ' [&_em]:text-iris-300">' + UI.emph(o.title) + '</h2><p data-reveal="up" data-delay="200" class="mx-auto mt-5 max-w-xl text-lg text-white/70">' + UI.esc(o.lead) + '</p>' +
        '<div data-reveal="up" data-delay="300" class="mt-9 flex flex-wrap justify-center gap-3"><a data-magnetic href="' + (o.primaryHref || SITE.routes.appointment) + '" class="' + UI.cls.btnPrimary + '">' + UI.cls.shine + UI.esc(o.primaryLabel || 'Book Appointment') + UI.icon('arrow-right', 'h-5 w-5') + '</a><a href="' + (o.secondaryHref || 'tel:' + SITE.contact.phone.e164) + '" class="' + UI.cls.btnGlass + '">' + UI.icon('phone', 'h-5 w-5') + UI.esc(o.secondaryLabel || SITE.contact.phone.display) + '</a></div></div></div></section>';
    },
    marqueeHTML: function (items, o) {
      o = o || {}; var t = th(o.theme), row = items.map(function (i) { return '<li class="flex items-center gap-6 whitespace-nowrap"><span class="font-display text-3xl font-light italic ' + t.text + ' md:text-5xl">' + UI.esc(i) + '</span>' + UI.icon('sparkles', 'h-6 w-6 text-iris-400') + '</li>'; }).join('');
      return '<div data-component="Marquee" data-marquee class="relative overflow-hidden"><div aria-hidden="true" class="overflow-hidden"><ul data-marquee-track class="flex w-max gap-6 motion-safe:animate-marquee hover:[animation-play-state:paused]">' + row + row + '</ul></div><button type="button" data-marquee-toggle aria-pressed="false" aria-label="Pause scrolling content" class="absolute right-5 top-2 z-10 hidden rounded-full border border-current/20 bg-ink/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white motion-safe:inline-flex">Pause motion</button></div>';
    },
    /* Form field. o:{label,name,type:'text|email|tel|password|date|number|select|textarea|checkbox',required,placeholder,options:[string|{value,label}],rows,minlength,validate:'bd-phone',autocomplete,hint,theme,value,min,max} */
    field: function (o) {
      var t = th(o.theme), id = o.id || 'f-' + o.name, errorId = o.errorId || 'err-' + id, type = o.type || 'text';
      var isSelect = type === 'select', controlTheme = (o.theme === 'light' ? 'scheme-light ' : 'scheme-dark ') + t.input;
      var optionTheme = o.theme === 'light' ? 'bg-white text-ink' : 'bg-ink text-white';
      var base = 'w-full rounded-2xl border px-4 py-3.5 motion-safe:transition-[border-color,box-shadow] focus-visible:outline-none focus-visible:ring-4 aria-[invalid=true]:border-danger ' + controlTheme;
      var autocomplete = o.autocomplete || 'off';
      var attrs = ' id="' + id + '" name="' + o.name + '"' + (o.required ? ' required' : '') + (o.minlength ? ' minlength="' + o.minlength + '"' : '') + (o.validate ? ' data-validate="' + o.validate + '"' : '') + ' autocomplete="' + autocomplete + '"' + (/^(email|username)$/.test(autocomplete) || type === 'email' ? ' spellcheck="false"' : '') + (o.placeholder ? ' placeholder="' + UI.esc(o.placeholder) + '"' : '') + ' aria-describedby="' + errorId + '"';
      var ctl;
      if (type === 'select') ctl = '<select' + attrs + ' class="' + base + ' pr-10"><option value="" class="' + optionTheme + '">' + UI.esc(o.placeholder || 'Select…') + '</option>' + (o.options || []).map(function (x) { var v = typeof x === 'string' ? x : x.value, l = typeof x === 'string' ? x : x.label; return '<option value="' + UI.esc(v) + '" class="' + optionTheme + '"' + (o.value === v ? ' selected' : '') + '>' + UI.esc(l) + '</option>'; }).join('') + '</select>';
      else if (type === 'textarea') ctl = '<textarea' + attrs + ' rows="' + (o.rows || 5) + '" class="' + base + '">' + UI.esc(o.value || '') + '</textarea>';
      else if (type === 'checkbox') return '<div data-component="Field"><label class="flex cursor-pointer items-start gap-3 text-sm ' + t.muted + '"><input type="checkbox"' + attrs + ' class="mt-1 h-5 w-5 shrink-0 rounded border-ink/20 accent-iris focus-visible:ring-2 focus-visible:ring-iris"><span>' + (o.labelHTML != null ? o.labelHTML : UI.esc(o.label || '')) + '</span></label><p id="' + errorId + '" data-error-for="' + o.name + '" aria-live="polite" class="mt-1 hidden text-sm text-danger"></p></div>';
      else ctl = '<input type="' + type + '"' + attrs + (type === 'number' ? ' inputmode="numeric"' : '') + (o.value ? ' value="' + UI.esc(o.value) + '"' : '') + (o.min ? ' min="' + o.min + '"' : '') + (o.max ? ' max="' + o.max + '"' : '') + ' class="' + base + '">';
      return '<div data-component="Field"><label for="' + id + '" class="mb-1.5 block text-sm font-semibold ' + t.label + '">' + UI.esc(o.label) + (o.required ? ' <span class="text-coral" aria-hidden="true">*</span>' : '') + '</label>' + ctl + (o.hint ? '<p class="mt-1 text-xs ' + t.faint + '">' + UI.esc(o.hint) + '</p>' : '') + '<p id="' + errorId + '" data-error-for="' + o.name + '" aria-live="polite" class="mt-1 hidden text-sm text-danger"></p></div>';
    },
    validateForm: function (form) {
      var ok = true, first = null;
      Array.prototype.forEach.call(form.querySelectorAll('[name]'), function (f) {
        if (f.disabled || f.type === 'hidden' || f.type === 'submit' || f.type === 'button') return;
        var m = form.querySelector('[data-error-for="' + f.name + '"]'), msg = '';
        var empty = f.type === 'checkbox' ? !f.checked : f.type === 'radio' ? !form.querySelector('[name="' + f.name + '"]:checked') : !String(f.value).trim();
        if (f.required && empty) msg = f.type === 'checkbox' ? 'Please tick this box to continue.' : 'This field is required.';
        else if (f.type === 'email' && f.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value)) msg = 'Enter a valid email address.';
        else if (f.getAttribute('data-validate') === 'bd-phone' && f.value && !UI.isBDPhone(f.value)) msg = 'Enter a valid Bangladeshi mobile number, e.g. 01712-345678.';
        else if (f.minLength > 0 && f.value && f.value.length < f.minLength) msg = 'Please enter at least ' + f.minLength + ' characters.';
        f.setAttribute('aria-invalid', msg ? 'true' : 'false');
        if (m) { m.textContent = msg; m.classList.toggle('hidden', !msg); }
        if (msg) { ok = false; if (!first) first = f; }
      });
      if (first) first.focus(); return ok;
    },
    toast: function (message, type) {
      type = type || 'success'; var root = document.getElementById('toast-root');
      if (!root) { root = document.createElement('div'); root.id = 'toast-root'; root.setAttribute('role', 'status'); root.setAttribute('aria-live', 'polite'); root.className = 'pointer-events-none fixed inset-x-0 top-24 z-[80] flex flex-col items-center gap-2 px-4'; document.body.appendChild(root); }
      var el = document.createElement('div');
      el.className = 'pointer-events-auto flex max-w-md items-center gap-3 rounded-2xl border border-white/20 px-5 py-3 text-sm font-medium text-white shadow-glass-lg backdrop-blur-xl motion-safe:animate-fade-up ' + (type === 'error' ? 'bg-danger/80' : type === 'info' ? 'bg-iris/80' : 'bg-ink/85');
      el.innerHTML = UI.icon(type === 'error' ? 'alert-circle' : 'check-circle', 'h-5 w-5 shrink-0 ' + (type === 'success' ? 'text-mint' : '')) + '<span>' + UI.esc(message) + '</span>'; root.appendChild(el);
      setTimeout(function () { el.classList.remove('motion-safe:animate-fade-up'); el.classList.add('motion-safe:transition-opacity', 'duration-300'); void el.offsetWidth; el.classList.add('opacity-0'); setTimeout(function () { el.remove(); }, 350); }, 4200);
    },
    copy: function (text) { var done = function () { UI.toast('Copied to clipboard'); }; if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(text).then(done); var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); done(); } catch (e) { /* ignore */ } ta.remove(); return Promise.resolve(); },
    scrollLock: function (on) { document.documentElement.classList.toggle('overflow-hidden', !!on); },
    trapFocus: function (c) {
      var sel = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
      function k(e) { if (e.key !== 'Tab') return; var f = c.querySelectorAll(sel); if (!f.length) return; var a = f[0], z = f[f.length - 1]; if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); } }
      c.addEventListener('keydown', k); return function () { c.removeEventListener('keydown', k); };
    },
    /* behaviours: auto-bound by mount() on [data-accordion], [data-tabs], [data-carousel] */
    accordion: function (root) {
      if (!root || root.hasAttribute('data-accordion-bound')) return; root.setAttribute('data-accordion-bound', '');
      function set(btn, open) { var p = document.getElementById(btn.getAttribute('aria-controls')); if (!p) return; btn.setAttribute('aria-expanded', String(open)); p.hidden = !open; if (open) p.removeAttribute('inert'); else p.setAttribute('inert', ''); var ic = btn.querySelector('[data-accordion-icon]'); if (ic) ic.classList.toggle('rotate-180', open); }
      var requested = UI.getParam('accordion');
      if (requested) {
        var initial = UI.qsa('[data-accordion-trigger]', root).filter(function (b) { return b.id === requested; })[0];
        if (initial) {
          if (root.hasAttribute('data-accordion-single')) UI.qsa('[data-accordion-trigger][aria-expanded="true"]', root).forEach(function (b) { set(b, false); });
          set(initial, true);
        }
      }
      root.addEventListener('click', function (e) { var b = e.target.closest('[data-accordion-trigger]'); if (!b || !root.contains(b)) return; var will = b.getAttribute('aria-expanded') !== 'true'; if (root.hasAttribute('data-accordion-single')) UI.qsa('[data-accordion-trigger][aria-expanded="true"]', root).forEach(function (x) { if (x !== b) set(x, false); }); set(b, will); if (b.id) UI.setParams({ accordion: will ? b.id : '' }); });
    },
    /* Tabs: root[data-tabs] > [role=tablist] > button[role=tab][data-tab="id"] ; panels [role=tabpanel][data-tab-panel="id"]. Tab classes should include aria-selected:* variants. */
    tabs: function (root) {
      if (!root || root.hasAttribute('data-tabs-bound')) return; root.setAttribute('data-tabs-bound', '');
      var tabs = UI.qsa('[data-tab]', root), panels = UI.qsa('[data-tab-panel]', root), urlParam = root.getAttribute('data-url-param');
      var groupId = root.id || 'ui-tabs-' + (++tabSequence);
      if (!root.id) root.id = groupId;
      tabs.forEach(function (t, i) {
        var panel = panels.filter(function (p) { return p.getAttribute('data-tab-panel') === t.getAttribute('data-tab'); })[0];
        if (!panel) return;
        if (!t.id) t.id = groupId + '-tab-' + i;
        if (!panel.id) panel.id = groupId + '-panel-' + i;
        t.setAttribute('aria-controls', panel.id);
        panel.setAttribute('aria-labelledby', t.id);
      });
      function show(id, focus) { tabs.forEach(function (t) { var on = t.getAttribute('data-tab') === id; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; if (on && focus) t.focus(); }); panels.forEach(function (p) { var on = p.getAttribute('data-tab-panel') === id; p.hidden = !on; p.classList.toggle('hidden', !on); if (on && !(window.FX && FX.reduced())) { p.classList.remove('animate-fade-in'); void p.offsetWidth; p.classList.add('animate-fade-in'); } }); if (urlParam && tabs.length) { var values = {}; values[urlParam] = id === tabs[0].getAttribute('data-tab') ? '' : id; UI.setParams(values); } root.dispatchEvent(new CustomEvent('tabchange', { detail: { id: id } })); }
      tabs.forEach(function (t) { t.classList.add('focus-visible:outline', 'focus-visible:outline-2', 'focus-visible:outline-offset-2', 'focus-visible:outline-iris'); });
      tabs.forEach(function (t, i) { t.addEventListener('click', function () { show(t.getAttribute('data-tab')); }); t.addEventListener('keydown', function (e) { var n = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : null; if (n === null) return; e.preventDefault(); n = (n + tabs.length) % tabs.length; show(tabs[n].getAttribute('data-tab'), true); }); });
      var requested = urlParam && UI.getParam(urlParam);
      var init = tabs.filter(function (t) { return t.getAttribute('data-tab') === requested; })[0] || tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0]; if (init) show(init.getAttribute('data-tab'));
      root.showTab = show;
    },
    /* Carousel: root[data-carousel] > [data-carousel-track] (flex, overflow-x-auto, snap-x) > [data-carousel-slide]; optional [data-carousel-prev], [data-carousel-next], [data-carousel-dots]; data-autoplay="6000" */
    carousel: function (root) {
      if (!root || root.hasAttribute('data-carousel-bound')) return; root.setAttribute('data-carousel-bound', '');
      var track = root.querySelector('[data-carousel-track]'), slides = UI.qsa('[data-carousel-slide]', root), dots = root.querySelector('[data-carousel-dots]'), toggle = root.querySelector('[data-carousel-toggle]'), idx = 0, timer = null;
      if (!track || !slides.length) return;
      function go(i) { idx = (i + slides.length) % slides.length; track.scrollTo({ left: slides[idx].offsetLeft - track.offsetLeft, behavior: window.FX && FX.reduced() ? 'auto' : 'smooth' }); mark(); }
      function mark() { if (dots) UI.qsa('button', dots).forEach(function (b, i) { b.setAttribute('aria-current', i === idx ? 'true' : 'false'); b.classList.toggle('bg-iris-400', i === idx); b.classList.toggle('bg-white/30', i !== idx); b.classList.toggle('opacity-100', i === idx); b.classList.toggle('opacity-50', i !== idx); }); }
      if (dots) { dots.innerHTML = slides.map(function (_, i) { return '<button type="button" aria-label="Go to slide ' + (i + 1) + '" class="h-2.5 w-2.5 rounded-full bg-white/30 opacity-50 motion-safe:transition-opacity duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-aqua"></button>'; }).join(''); UI.qsa('button', dots).forEach(function (b, i) { b.addEventListener('click', function () { go(i); }); }); }
      var p = root.querySelector('[data-carousel-prev]'), n = root.querySelector('[data-carousel-next]');
      if (p) p.addEventListener('click', function () { go(idx - 1); }); if (n) n.addEventListener('click', function () { go(idx + 1); });
      track.addEventListener('scroll', UI.debounce(function () { var best = 0, d = 1e9; slides.forEach(function (s, i) { var x = Math.abs(s.offsetLeft - track.offsetLeft - track.scrollLeft); if (x < d) { d = x; best = i; } }); idx = best; mark(); }, 80), { passive: true });
      root.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') go(idx + 1); if (e.key === 'ArrowLeft') go(idx - 1); });
      var ms = parseInt(root.getAttribute('data-autoplay') || '0', 10), reduce = window.FX && FX.reduced();
      if (toggle && (!ms || reduce)) toggle.hidden = true;
      if (ms && !(window.FX && FX.reduced())) {
        var paused = false, hovered = false, focused = false;
        var stop = function () { clearInterval(timer); };
        var start = function () { if (!paused && !hovered && !focused) { stop(); timer = setInterval(function () { go(idx + 1); }, ms); } };
        root.addEventListener('pointerenter', function () { hovered = true; stop(); });
        root.addEventListener('pointerleave', function () { hovered = false; start(); });
        root.addEventListener('focusin', function () { focused = true; stop(); });
        root.addEventListener('focusout', function (e) { if (!root.contains(e.relatedTarget)) { focused = false; start(); } });
        if (toggle) toggle.addEventListener('click', function () {
          paused = !paused; stop();
          toggle.setAttribute('aria-pressed', String(paused));
          toggle.setAttribute('aria-label', paused ? 'Resume scrolling testimonials' : 'Pause scrolling testimonials');
          toggle.textContent = paused ? 'Resume motion' : 'Pause motion';
          start();
        });
        start();
      }
    },
    marquee: function (root) {
      if (!root || root.hasAttribute('data-marquee-bound')) return; root.setAttribute('data-marquee-bound', '');
      var track = root.querySelector('[data-marquee-track]'), toggle = root.querySelector('[data-marquee-toggle]');
      if (!track || !toggle) return;
      toggle.addEventListener('click', function () {
        var paused = toggle.getAttribute('aria-pressed') !== 'true';
        toggle.setAttribute('aria-pressed', String(paused));
        toggle.setAttribute('aria-label', paused ? 'Resume scrolling content' : 'Pause scrolling content');
        toggle.textContent = paused ? 'Resume motion' : 'Pause motion';
        track.style.animationPlayState = paused ? 'paused' : '';
      });
    },
    /* Call after injecting HTML into `container` (or document). Binds motion + accordion + tabs + carousel. */
    mount: function (container) {
      var c = container || document;
      if (window.FX) FX.init(c);
      UI.qsa('[data-accordion]', c).forEach(UI.accordion); UI.qsa('[data-tabs]', c).forEach(UI.tabs); UI.qsa('[data-carousel]', c).forEach(UI.carousel); UI.qsa('[data-marquee]', c).forEach(UI.marquee);
      if (c !== document && c.matches) { if (c.matches('[data-accordion]')) UI.accordion(c); if (c.matches('[data-tabs]')) UI.tabs(c); if (c.matches('[data-carousel]')) UI.carousel(c); if (c.matches('[data-marquee]')) UI.marquee(c); }
    }
  };
  window.UI = UI;
  UI.ready(function () { UI.mount(document); });
})(window, document);
