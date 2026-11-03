/*!
 * js/fx.js — SHARED CORE (never edit). Motion / 3D / parallax engine driven by data-attributes.
 *   data-reveal="up|left|right|zoom|flip|blur|fade" [data-delay=ms]   scroll-in animation (not on elements that also use tilt/parallax/depth)
 *   data-split                                                       editorial word-by-word headline reveal [data-delay]
 *   data-tilt [data-tilt-max=8] + optional child [data-tilt-glare]    3D pointer tilt with glare
 *   data-stage > [data-depth=n]                                       pointer-driven depth layers (wrap animated art in an inner element)
 *   data-parallax="0.15"                                              scroll parallax (translateY factor, negative reverses)
 *   data-scroll-3d                                                    card "unfolds" in 3D as it scrolls into view
 *   data-magnetic                                                     magnetic button
 *   data-spotlight                                                    sets --mx/--my for glow-follow backgrounds
 *   data-counter="1200" [data-prefix] [data-suffix] [data-decimals]   animated number
 * FX.init(root?) is idempotent; call it (or UI.mount) after injecting HTML.
 */
(function (w, d) {
  'use strict';
  var NAMES = { up: 'fade-up', left: 'slide-left', right: 'slide-right', zoom: 'zoom-in', flip: 'flip-in', blur: 'blur-in', fade: 'fade-in' };
  function reduced() { return !!(w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches); }
  function fine() { return !!(w.matchMedia && w.matchMedia('(pointer: fine)').matches); }
  function all(root, sel) { return Array.prototype.slice.call((root || d).querySelectorAll(sel)); }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  var hasIO = 'IntersectionObserver' in w;

  var revealIO, splitIO, counterIO, visIO, scrollItems = [], visible = new Set(), ticking = false;

  function ensureIO() {
    if (!hasIO || revealIO) return;
    revealIO = new IntersectionObserver(function (es, o) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return; var el = e.target; o.unobserve(el);
        var cls = 'animate-' + (NAMES[el.getAttribute('data-reveal')] || 'fade-up');
        var delay = parseInt(el.getAttribute('data-delay') || '0', 10), dcls = delay ? '[animation-delay:' + delay + 'ms]' : '';
        el.classList.remove('opacity-0'); el.classList.add(cls); if (dcls) el.classList.add(dcls);
        el.addEventListener('animationend', function () { el.classList.remove(cls); if (dcls) el.classList.remove(dcls); el.setAttribute('data-revealed', 'true'); }, { once: true });
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    splitIO = new IntersectionObserver(function (es, o) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return; o.unobserve(e.target);
        all(e.target, '[data-split-word]').forEach(function (n) { n.classList.remove('translate-y-[115%]'); n.classList.add('translate-y-0'); });
      });
    }, { threshold: 0.2 });
    counterIO = new IntersectionObserver(function (es, o) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return; o.unobserve(e.target); runCounter(e.target);
      });
    }, { threshold: 0.4 });
    visIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) visible.add(e.target); else visible.delete(e.target); });
      schedule();
    }, { rootMargin: '200px 0px 200px 0px' });
  }

  function reveal(root) {
    all(root, '[data-reveal]:not([data-reveal-bound])').forEach(function (el) {
      el.setAttribute('data-reveal-bound', '');
      if (reduced() || !hasIO) return;
      el.classList.add('opacity-0'); revealIO.observe(el);
    });
  }

  function split(root) {
    all(root, '[data-split]:not([data-split-done])').forEach(function (el) {
      el.setAttribute('data-split-done', '');
      if (reduced() || !hasIO) return;
      var i = 0, base = parseInt(el.getAttribute('data-delay') || '0', 10);
      (function walk(node) {
        Array.prototype.slice.call(node.childNodes).forEach(function (ch) {
          if (ch.nodeType === 3) {
            var frag = d.createDocumentFragment();
            ch.textContent.split(/(\s+)/).forEach(function (tok) {
              if (!tok) return;
              if (/^\s+$/.test(tok)) { frag.appendChild(d.createTextNode(' ')); return; }
              var o = d.createElement('span'); o.className = 'inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]';
              var n = d.createElement('span'); n.className = 'inline-block translate-y-[115%] motion-safe:transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)]';
              n.setAttribute('data-split-word', ''); n.style.transitionDelay = (base + i * 55) + 'ms'; i++; n.textContent = tok;
              o.appendChild(n); frag.appendChild(o);
            });
            ch.parentNode.replaceChild(frag, ch);
          } else if (ch.nodeType === 1) walk(ch);
        });
      })(el);
      splitIO.observe(el);
    });
  }

  function tilt(root) {
    if (reduced() || !fine()) return;
    all(root, '[data-tilt]:not([data-tilt-bound])').forEach(function (el) {
      el.setAttribute('data-tilt-bound', '');
      var max = parseFloat(el.getAttribute('data-tilt-max') || '8'), raf = 0;
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          el.style.transition = 'transform 120ms ease-out';
          el.style.transform = 'perspective(1000px) rotateX(' + ((0.5 - py) * 2 * max).toFixed(2) + 'deg) rotateY(' + ((px - 0.5) * 2 * max).toFixed(2) + 'deg) scale3d(1.02,1.02,1.02)';
          var g = el.querySelector('[data-tilt-glare]');
          if (g) { g.style.opacity = '1'; g.style.background = 'radial-gradient(440px circle at ' + (px * 100).toFixed(1) + '% ' + (py * 100).toFixed(1) + '%, rgba(255,255,255,.26), transparent 55%)'; }
        });
      });
      el.addEventListener('pointerleave', function () {
        cancelAnimationFrame(raf); el.style.transition = 'transform 700ms cubic-bezier(.22,1,.36,1)'; el.style.transform = '';
        var g = el.querySelector('[data-tilt-glare]'); if (g) g.style.opacity = '0';
      });
    });
  }

  function stage(root) {
    if (reduced() || !fine()) return;
    all(root, '[data-stage]:not([data-stage-bound])').forEach(function (el) {
      el.setAttribute('data-stage-bound', '');
      var layers = all(el, '[data-depth]'), tx = 0, ty = 0, cx = 0, cy = 0, run = false;
      function loop() {
        cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08;
        layers.forEach(function (l) {
          var k = parseFloat(l.getAttribute('data-depth')) || 0, rot = parseFloat(l.getAttribute('data-rotate') || '0');
          l.style.transform = 'translate3d(' + (cx * k).toFixed(2) + 'px,' + (cy * k).toFixed(2) + 'px,0)' + (rot ? ' rotate(' + (cx * rot).toFixed(2) + 'deg)' : '');
        });
        if (Math.abs(tx - cx) > 0.002 || Math.abs(ty - cy) > 0.002) requestAnimationFrame(loop); else run = false;
      }
      function go() { if (!run) { run = true; requestAnimationFrame(loop); } }
      el.addEventListener('pointermove', function (e) { var r = el.getBoundingClientRect(); tx = ((e.clientX - r.left) / r.width - 0.5) * 2; ty = ((e.clientY - r.top) / r.height - 0.5) * 2; go(); });
      el.addEventListener('pointerleave', function () { tx = 0; ty = 0; go(); });
    });
  }

  function magnetic(root) {
    if (reduced() || !fine()) return;
    all(root, '[data-magnetic]:not([data-mag-bound])').forEach(function (el) {
      el.setAttribute('data-mag-bound', '');
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect(); el.style.transition = 'transform 120ms ease-out';
        el.style.transform = 'translate3d(' + ((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.28).toFixed(1) + 'px,0)';
      });
      el.addEventListener('pointerleave', function () { el.style.transition = 'transform 500ms cubic-bezier(.22,1,.36,1)'; el.style.transform = ''; });
    });
  }

  function spotlight(root) {
    if (!fine()) return;
    all(root, '[data-spotlight]:not([data-spot-bound])').forEach(function (el) {
      el.setAttribute('data-spot-bound', '');
      el.addEventListener('pointermove', function (e) { var r = el.getBoundingClientRect(); el.style.setProperty('--mx', (e.clientX - r.left) + 'px'); el.style.setProperty('--my', (e.clientY - r.top) + 'px'); });
    });
  }

  function scrollFx(root) {
    all(root, '[data-parallax]:not([data-px-bound]),[data-scroll-3d]:not([data-px-bound])').forEach(function (el) {
      el.setAttribute('data-px-bound', '');
      if (reduced() || !hasIO) return;
      scrollItems.push(el); visIO.observe(el);
    });
  }
  function schedule() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  function update() {
    ticking = false; var vh = w.innerHeight;
    visible.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (el.hasAttribute('data-parallax')) {
        var f = parseFloat(el.getAttribute('data-parallax')) || 0.15, y = (r.top + r.height / 2 - vh / 2) * -f;
        el.style.transform = 'translate3d(0,' + y.toFixed(1) + 'px,0)';
      } else {
        var p = clamp((vh - r.top) / (vh * 0.85), 0, 1), e = 1 - Math.pow(1 - p, 3);
        el.style.transform = 'perspective(1200px) rotateX(' + ((1 - e) * 16).toFixed(2) + 'deg) translateY(' + ((1 - e) * 50).toFixed(1) + 'px) scale(' + (0.92 + 0.08 * e).toFixed(3) + ')';
        el.style.opacity = (0.35 + 0.65 * e).toFixed(2);
      }
    });
  }

  function runCounter(el) {
    var target = parseFloat(el.getAttribute('data-counter')) || 0, pre = el.getAttribute('data-prefix') || '', suf = el.getAttribute('data-suffix') || '';
    var dec = parseInt(el.getAttribute('data-decimals') || '0', 10), dur = parseInt(el.getAttribute('data-duration') || '1900', 10), t0 = performance.now();
    function fmt(v) { return pre + v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf; }
    (function tick(t) { var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4); el.textContent = fmt(p < 1 ? target * e : target); if (p < 1) requestAnimationFrame(tick); })(t0);
  }
  function counters(root) {
    all(root, '[data-counter]:not([data-counter-bound])').forEach(function (el) {
      el.setAttribute('data-counter-bound', '');
      var target = parseFloat(el.getAttribute('data-counter')) || 0, pre = el.getAttribute('data-prefix') || '', suf = el.getAttribute('data-suffix') || '', dec = parseInt(el.getAttribute('data-decimals') || '0', 10);
      var fin = pre + target.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suf;
      if (reduced() || !hasIO) { el.textContent = fin; return; }
      el.textContent = pre + (0).toFixed(dec) + suf; counterIO.observe(el);
    });
  }

  function cursorGlow() {
    if (reduced() || !fine() || d.getElementById('cursor-glow')) return;
    var g = d.createElement('div'); g.id = 'cursor-glow'; g.setAttribute('aria-hidden', 'true');
    g.className = 'pointer-events-none fixed left-0 top-0 z-[5] h-[460px] w-[460px] rounded-full bg-iris/25 opacity-0 mix-blend-screen blur-[90px] motion-safe:transition-opacity duration-500';
    d.body.appendChild(g); var x = 0, y = 0, cx = 0, cy = 0, on = false;
    d.addEventListener('pointermove', function (e) { x = e.clientX - 230; y = e.clientY - 230; g.classList.remove('opacity-0'); if (!on) { on = true; requestAnimationFrame(loop); } }, { passive: true });
    d.documentElement.addEventListener('pointerleave', function () { g.classList.add('opacity-0'); });
    function loop() { cx += (x - cx) * 0.12; cy += (y - cy) * 0.12; g.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)'; if (Math.abs(x - cx) > .5 || Math.abs(y - cy) > .5) requestAnimationFrame(loop); else on = false; }
  }

  var FX = {
    init: function (root) {
      ensureIO(); reveal(root); split(root); tilt(root); stage(root); magnetic(root); spotlight(root); scrollFx(root); counters(root);
    },
    cursorGlow: cursorGlow, reduced: reduced
  };
  w.addEventListener('scroll', function () { if (visible.size) schedule(); }, { passive: true });
  w.addEventListener('resize', schedule, { passive: true });
  w.FX = FX;
  function boot() { FX.init(d); cursorGlow(); }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', boot); else boot();
})(window, document);
