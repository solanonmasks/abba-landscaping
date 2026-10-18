/* Abba Landscaping — small bits of interactivity. No libraries needed. */

/* ---------- Mobile menu ---------- */
(function mobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const openBtn = document.querySelector('[data-menu-open]');
  if (!menu || !openBtn) return;

  function setOpen(open) {
    menu.hidden = !open;
    document.body.classList.toggle('menu-open', open);
    openBtn.setAttribute('aria-expanded', String(open));
  }

  openBtn.addEventListener('click', function () { setOpen(true); });
  menu.querySelector('[data-menu-close]').addEventListener('click', function () { setOpen(false); });
  // Close the menu when a link inside it is tapped
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });
  // Close it if the window gets wide enough for the normal header
  window.addEventListener('resize', function () {
    if (window.innerWidth >= 960) setOpen(false);
  });
})();

/* ---------- "What are you building?" chips ----------
   Picking a chip highlights it and pre-fills "Project type" in the form. */
(function projectChips() {
  const chips = document.querySelectorAll('.chip');
  const select = document.querySelector('[data-project-type]');
  if (!select) return;

  function sync() {
    chips.forEach(function (c) {
      c.setAttribute('aria-pressed', String(c.textContent === select.value));
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      // Clicking the selected chip again clears it
      select.value = (select.value === chip.textContent) ? '' : chip.textContent;
      sync();
    });
  });
  select.addEventListener('change', sync);
})();

/* ---------- Services tabs ---------- */
(function serviceTabs() {
  const tabs = document.querySelectorAll('.svc-tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        const on = (t === tab);
        t.setAttribute('aria-selected', String(on));
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
    });
  });
})();

/* ---------- Hide photos that fail to load (leaves the grey box) ---------- */
document.querySelectorAll('img').forEach(function (img) {
  img.addEventListener('error', function () { img.style.visibility = 'hidden'; });
});

/* ---------- Estimate form ----------
   Sends the form (with photos) and shows the thank-you message. */
(function estimateForm() {
  const form = document.querySelector('[data-estimate-form]');
  if (!form) return;

  const thanks = document.querySelector('[data-thanks]');
  const error = document.querySelector('[data-form-error]');
  const photos = form.querySelector('[data-photos]');
  const photosText = form.querySelector('[data-photos-text]');
  const defaultPhotosText = photosText.textContent;

  photos.addEventListener('change', function () {
    const n = photos.files.length;
    photosText.textContent = n ? n + ' photo' + (n > 1 ? 's' : '') + ' added' : defaultPhotosText;
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    error.hidden = true;
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;

    // Netlify Forms: posts the form to the site itself. If you use a different
    // service (Formspree etc.), change the form's "action" in index.html.
    fetch(form.getAttribute('action') || '/', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form) // FormData keeps the photo uploads
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Form send failed: ' + res.status);
        form.hidden = true;
        thanks.hidden = false;
      })
      .catch(function () {
        error.hidden = false;
      })
      .finally(function () {
        button.disabled = false;
      });
  });

  document.querySelector('[data-send-another]').addEventListener('click', function () {
    form.reset();
    photosText.textContent = defaultPhotosText;
    document.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
    thanks.hidden = true;
    form.hidden = false;
  });
})();
