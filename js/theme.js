/* ==========================================================================
   THEME TOGGLE — circular blur-wipe transition
   Instead of crossfading colors, a radial clip-path + backdrop-filter
   pulse expands outward from the toggle button so the new theme
   "resolves into focus" rather than fading in.
   ========================================================================== */
(function () {
  function init() {
    const body = document.body;
    const toggles = document.querySelectorAll('[data-theme-toggle]');
    const veil = document.getElementById('theme-transition-veil');
    if (!toggles.length) return;

    const stored = localStorage.getItem('theme');
    if (stored === 'light') body.classList.add('light-mode');
    const pulseEl = document.getElementById('page-blur-pulse');

    function fireWipe(originEl) {
      if (!veil) return;
      const rect = originEl ? originEl.getBoundingClientRect() : { left: window.innerWidth / 2, top: 40, width: 0, height: 0 };
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      veil.style.setProperty('--tx', x + 'px');
      veil.style.setProperty('--ty', y + 'px');
      veil.classList.remove('wiping');
      void veil.offsetWidth; // restart the clip-path transition
      veil.classList.add('wiping');
      setTimeout(() => veil.classList.remove('wiping'), 650);

      // Brief static blur pulse — two paints, not an animated blur value
      if (pulseEl) {
        pulseEl.classList.add('pulsing');
        setTimeout(() => pulseEl.classList.remove('pulsing'), 180);
      }
    }

    function toggleTheme(originEl) {
      fireWipe(originEl);
      const isLight = body.classList.toggle('light-mode');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      document.dispatchEvent(new CustomEvent('themechange', { detail: { light: isLight } }));
    }

    toggles.forEach(btn => btn.addEventListener('click', () => toggleTheme(btn)));

    window.PortfolioTheme = { toggle: toggleTheme, isLight: () => body.classList.contains('light-mode') };
  }

  document.addEventListener('DOMContentLoaded', init);
})();
