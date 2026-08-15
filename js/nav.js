/* ==========================================================================
   FLOATING DOCK NAV
   ========================================================================== */
(function () {
  function init() {
    const dock = document.getElementById('dock');
    const links = Array.from(document.querySelectorAll('.dock-links a'));
    const indicator = document.getElementById('dock-indicator');
    const sections = links
      .map(a => document.querySelector(a.getAttribute('href')))
      .filter(Boolean);

    function movePill(link) {
      if (!link || !indicator || !dock) return;
      const linkRect = link.getBoundingClientRect();
      const dockRect = dock.querySelector('.dock-links').getBoundingClientRect();
      indicator.style.setProperty('--pill-w', linkRect.width + 'px');
      indicator.style.setProperty('--pill-x', (linkRect.left - dockRect.left) + 'px');
      indicator.classList.add('visible');
    }

    function setActive(link) {
      links.forEach(a => a.classList.toggle('active', a === link));
      movePill(link);
    }

    // Scroll-spy
    const spy = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = '#' + entry.target.id;
          const link = links.find(a => a.getAttribute('href') === id);
          if (link) setActive(link);
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
    sections.forEach(s => spy.observe(s));

    // Condense dock on scroll down, expand on scroll up.
    // Bug fixed here: the pill previously only repositioned on scroll/resize,
    // so switching condensed state (which changes every link's width) or
    // switching language (different text widths per language) left the
    // active pill visibly misaligned until the next scroll-spy trigger.
    // Both now explicitly re-run movePill() after their layout settles.
    let lastY = window.scrollY;
    let condensed = false;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (!dock) { lastY = y; return; }
      const shouldCondense = y > 120 && y > lastY;
      const shouldExpand = y < lastY;
      if (shouldCondense && !condensed) {
        dock.classList.add('condensed'); condensed = true;
        requestAnimationFrame(() => requestAnimationFrame(realign));
      } else if (shouldExpand && condensed) {
        dock.classList.remove('condensed'); condensed = false;
        requestAnimationFrame(() => requestAnimationFrame(realign));
      }
      lastY = y;
    }, { passive: true });

    function realign() {
      const active = links.find(a => a.classList.contains('active'));
      if (active) movePill(active);
    }
    document.addEventListener('langchange', () => requestAnimationFrame(() => requestAnimationFrame(realign)));
    // Fonts loading late can also silently resize link labels — realign once webfonts settle.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(realign);

    // Smooth in-page nav with brief transition veil
    const overlay = document.getElementById('page-transition-overlay');
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const targetId = a.getAttribute('href');
        if (targetId === '#') return;
        const targetEl = document.querySelector(targetId);
        if (!targetEl) return;
        e.preventDefault();
        if (overlay) {
          overlay.classList.add('active');
          setTimeout(() => {
            targetEl.scrollIntoView({ behavior: 'auto', block: 'start' });
            setTimeout(() => {
              overlay.style.transformOrigin = 'top';
              overlay.classList.remove('active');
              setTimeout(() => (overlay.style.transformOrigin = 'bottom'), 600);
            }, 80);
          }, 420);
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    window.addEventListener('resize', () => {
      const activeLink = links.find(a => a.classList.contains('active'));
      if (activeLink) movePill(activeLink);
    });

    // Language dropdown
    const langBtn = document.getElementById('lang-switch-btn');
    const langMenu = document.getElementById('lang-menu');
    if (langBtn && langMenu) {
      langBtn.addEventListener('click', e => { e.stopPropagation(); langMenu.classList.toggle('open'); });
      document.addEventListener('click', e => { if (!langMenu.contains(e.target) && e.target !== langBtn) langMenu.classList.remove('open'); });
    }

    // Initial pill position once layout settles
    setTimeout(() => { const first = links[0]; if (first) setActive(first); }, 300);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
