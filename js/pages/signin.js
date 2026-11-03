/* js/pages/signin.js · Owner Part 1 · Sign-in / Create account / Reset password · Depends on: SITE, UI (kit) */
(function () {
  'use strict';
  UI.ready(function () {
    var main = UI.qs('#main'), F = function (o) { o.theme = 'dark'; return UI.field(o); };
    var perks = [['calendar', 'Manage appointments', 'Reschedule or cancel from one place, with reminders before every visit.'], ['file-text', 'Keep your records', 'Prescriptions, reports and scan summaries stay organised and ready to share.'], ['activity', 'Rebook in seconds', 'Follow-up visits reuse your saved details, so booking takes under a minute.']];
    var tab = 'min-h-11 rounded-full text-sm font-semibold text-white/70 motion-safe:transition-[transform,opacity] aria-selected:bg-iris aria-selected:text-white';
    var btn = UI.cls.btnPrimary + ' w-full justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';
    var link = 'min-h-11 text-sm text-aqua underline-offset-4 hover:underline';
    main.innerHTML = '<section id="auth" data-section="auth" class="' + UI.cls.sectionDark + ' relative min-h-screen overflow-hidden pt-36"><div class="' + UI.cls.container + ' grid items-center gap-12 lg:grid-cols-2">' +
      '<div data-stage data-component="AuthIntro" class="relative"><div aria-hidden="true" class="pointer-events-none absolute -left-32 -top-20 h-80 w-80 rounded-full bg-iris/40 blur-3xl motion-safe:animate-aurora"></div>' +
      '<h1 data-split class="relative font-display text-5xl font-light leading-none tracking-tight text-white sm:text-6xl [&_em]:text-iris-300">' + UI.emph('Your care, *in one place*') + '</h1>' +
      '<ul class="relative mt-8 space-y-5">' + perks.map(function (p) { return '<li class="flex gap-4"><span class="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-iris/30 text-iris-300">' + UI.icon(p[0], 'h-5 w-5') + '</span><div><h2 class="font-display text-xl text-white">' + p[1] + '</h2><p class="text-white/70">' + p[2] + '</p></div></li>'; }).join('') + '</ul>' +
      '<div class="relative mx-auto mt-14 hidden max-w-md lg:block"><div data-depth="20"><div data-tilt class="' + UI.cls.glassDark + ' relative rounded-3xl p-2"><div class="overflow-hidden rounded-2xl">' + UI.img(SITE.img.theatre, 'Orthopaedic operating theatre', 'aspect-[4/3] w-full object-cover', { w: 900, h: 675 }) + '</div><div data-tilt-glare class="pointer-events-none absolute inset-0 rounded-3xl opacity-0 motion-safe:transition-opacity"></div></div></div>' +
      '<div data-depth="70" class="absolute -right-10 -top-10 w-20"><div class="motion-safe:animate-float3d">' + UI.deco(SITE.img.objects.capsule, 'w-full') + '</div></div><div data-depth="60" class="absolute -bottom-8 -left-10 w-20"><div class="motion-safe:animate-float3d">' + UI.deco(SITE.img.objects.cross, 'w-full') + '</div></div></div></div>' +
      '<div data-component="AuthCard" class="' + UI.cls.glassDark + ' rounded-3xl p-6 sm:p-10"><div data-tabs data-url-param="mode"><div role="tablist" aria-label="Account" class="grid grid-cols-2 gap-1 rounded-full bg-white/5 p-1">' +
      '<button type="button" role="tab" data-tab="signin" aria-selected="true" class="' + tab + '">Sign in</button><button type="button" role="tab" data-tab="register" aria-selected="false" class="' + tab + '">Create account</button></div>' +
      '<div role="tabpanel" data-tab-panel="signin" class="mt-8"><form data-form="signin" novalidate class="space-y-5" aria-label="Sign in">' +
      F({ label: 'Mobile number or email', name: 'identifier', type: 'text', required: true, autocomplete: 'username', placeholder: 'Email or mobile number', id: 'signin-identifier', errorId: 'err-signin-identifier' }) + F({ label: 'Password', name: 'password', type: 'password', required: true, minlength: 8, autocomplete: 'current-password', id: 'signin-password', errorId: 'err-signin-password' }) +
      '<div class="flex items-center justify-between gap-4"><div class="min-w-0">' + F({ label: 'Remember me', name: 'remember', type: 'checkbox' }) + '</div><button type="button" data-action="show-forgot" class="' + link + ' shrink-0">Forgot password?</button></div>' +
      '<button type="submit" class="' + btn + '">' + UI.cls.shine + 'Sign in</button></form>' +
      '<form data-form="forgot-password" novalidate hidden class="space-y-5" aria-label="Reset password"><p class="text-white/70">Enter your mobile number or email and we will send a reset link.</p>' + F({ label: 'Mobile number or email', name: 'identifier', type: 'text', required: true, autocomplete: 'username', id: 'forgot-identifier', errorId: 'err-forgot-identifier' }) +
      '<button type="submit" class="' + btn + '">' + UI.cls.shine + 'Send reset link</button><button type="button" data-action="show-signin" class="' + link + '">Back to sign in</button></form></div>' +
      '<div role="tabpanel" data-tab-panel="register" class="mt-8" hidden><form data-form="register" novalidate class="space-y-5" aria-label="Create account">' +
      F({ label: 'Full name', name: 'fullName', type: 'text', required: true, autocomplete: 'name' }) + F({ label: 'Mobile number', name: 'phone', type: 'tel', required: true, validate: 'bd-phone', autocomplete: 'tel', placeholder: 'e.g. 01711-223344…' }) + F({ label: 'Email', name: 'email', type: 'email', required: true, autocomplete: 'email' }) +
      F({ label: 'Password', name: 'password', type: 'password', required: true, minlength: 8, autocomplete: 'new-password', hint: 'At least 8 characters.', id: 'register-password', errorId: 'err-register-password' }) + F({ label: 'Confirm password', name: 'confirm', type: 'password', required: true, autocomplete: 'new-password' }) +
      F({ label: 'I agree to the terms of use and privacy policy', name: 'terms', type: 'checkbox', required: true }) + '<button type="submit" class="' + btn + '">' + UI.cls.shine + 'Create account</button></form></div></div></div></div></section>';
    UI.mount(main);

    UI.qsa('input[type=password]', main).forEach(function (inp) {
      var w = document.createElement('div'), b = document.createElement('button');
      w.className = 'relative'; inp.parentNode.insertBefore(w, inp); w.appendChild(inp); inp.classList.add('pr-12');
      b.type = 'button'; b.setAttribute('aria-label', 'Show password'); b.setAttribute('aria-pressed', 'false');
      b.className = 'absolute right-1 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center text-white/70 motion-safe:transition-[transform,opacity] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aqua'; b.innerHTML = UI.icon('eye', 'h-5 w-5'); w.appendChild(b);
      b.addEventListener('click', function () {
        var show = inp.type === 'password'; inp.type = show ? 'text' : 'password'; b.setAttribute('aria-pressed', String(show));
        b.setAttribute('aria-label', show ? 'Hide password' : 'Show password'); b.innerHTML = UI.icon(show ? 'eye-off' : 'eye', 'h-5 w-5');
      });
      if (inp.name === 'password' && inp.closest('[data-form="register"]')) {
        var m = document.createElement('div'); m.className = 'mt-2 flex items-center gap-1.5'; m.setAttribute('aria-live', 'polite');
        m.innerHTML = '<span class="h-1.5 flex-1 rounded-full bg-white/10"></span>'.repeat(4) + '<span data-strength class="w-16 text-right font-mono text-[11px] uppercase text-white/70"></span>';
        w.insertAdjacentElement('afterend', m);
        var cols = ['bg-coral', 'bg-gold', 'bg-aqua', 'bg-mint'], names = ['Weak', 'Fair', 'Good', 'Strong'];
        inp.addEventListener('input', UI.debounce(function () {
          var v = inp.value, s = (v.length >= 8) + (/[a-z]/.test(v) && /[A-Z]/.test(v)) + /\d/.test(v) + /[^A-Za-z0-9]/.test(v);
          UI.qsa('span.h-1\\.5', m).forEach(function (seg, i) { seg.className = 'h-1.5 flex-1 rounded-full motion-safe:transition-[transform,opacity] ' + (i < s ? cols[s - 1] : 'bg-white/10'); });
          UI.qs('[data-strength]', m).textContent = v ? names[Math.max(s - 1, 0)] : '';
        }, 80));
      }
    });

    var signin = UI.qs('[data-form="signin"]', main), forgot = UI.qs('[data-form="forgot-password"]', main);
    main.addEventListener('click', function (e) {
      var a = e.target.closest('[data-action]'); if (!a) return;
      var action = a.getAttribute('data-action');
      if (action !== 'show-forgot' && action !== 'show-signin') return;
      var showForgot = action === 'show-forgot', target = showForgot ? forgot : signin;
      signin.hidden = showForgot; forgot.hidden = !showForgot;
      target.querySelector('input:not([type="hidden"])').focus();
    });
    UI.qsa('form[data-form]', main).forEach(function (form) {
      var name = form.getAttribute('data-form');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!UI.validateForm(form)) return;
        if (name === 'register') {
          var er = form.querySelector('[data-error-for="confirm"]'), bad = form.elements.password.value !== form.elements.confirm.value;
          if (er) er.textContent = bad ? 'Passwords do not match.' : ''; if (bad) return;
        }
        var sb = form.querySelector('button[type=submit]'), data = {}; sb.disabled = true;
        new FormData(form).forEach(function (v, k) { if (k !== 'confirm') data[k] = v; });
        SITE.submit(name, data).then(function () {
          var msg = name === 'forgot-password' ? 'Reset link sent. Check your messages.' : name === 'register' ? 'Account created. Taking you to booking…' : 'Signed in. Taking you to booking…';
          form.innerHTML = '<div role="status" aria-live="polite" class="py-10 text-center"><div class="mx-auto grid h-20 w-20 place-items-center rounded-full bg-mint/20 text-mint motion-safe:animate-pulse">' + UI.icon('check-circle', 'h-10 w-10') + '</div><p class="mt-6 font-display text-2xl text-white">' + UI.esc(msg) + '</p></div>';
          UI.toast(msg, 'success');
          if (name !== 'forgot-password') setTimeout(function () { location.href = 'appointment.html'; }, 1400);
        }).catch(function () { sb.disabled = false; UI.toast('Something went wrong. Please try again.', 'error'); });
      });
    });
  });
})();
