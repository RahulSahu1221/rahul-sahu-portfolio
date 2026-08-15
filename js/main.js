/* ==========================================================================
   MAIN — small glue logic; all major features self-initialize in their
   own modules (i18n.js, theme.js, nav.js, command-palette.js, etc.)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Keyboard-focus visibility: only show focus rings for keyboard users
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);

  // Footer year, if a placeholder exists
  const yearEl = document.querySelector('[data-current-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Last-updated stamp, sourced from the document's own file timestamp — zero config
  const lastUpdatedEl = document.getElementById('last-updated');
  if (lastUpdatedEl && document.lastModified) {
    const d = new Date(document.lastModified);
    if (!isNaN(d)) {
      const formatted = d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
      lastUpdatedEl.textContent = formatted;
    }
  }

  // Dynamic favicon: swap the tiny "RS" monogram's colors with the active theme
  function setFavicon(isLight) {
    const favicon = document.getElementById('favicon');
    if (!favicon) return;
    const bg = isLight ? '%23f5f3ef' : '%23080a0f';
    const fg = isLight ? '%23a07840' : '%23c8a96e';
    favicon.href = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='${bg}'/%3E%3Ctext x='32' y='42' font-family='Georgia,serif' font-size='28' fill='${fg}' text-anchor='middle'%3ERS%3C/text%3E%3C/svg%3E`;
  }
  setFavicon(document.body.classList.contains('light-mode'));
  document.addEventListener('themechange', e => setFavicon(e.detail.light));
});
