/* ==========================================================================
   CONTACT WATERMARK — parallax + outline-to-fill
   The giant "CONTACT" text drifts slower than scroll (parallax, sits at L0)
   and its gradient fill sweeps in as the section crosses the viewport,
   driven by the shared ticker rather than its own scroll handler.
   ========================================================================== */
(function () {
  const wm = document.querySelector('.contact-watermark');
  const fillEl = document.querySelector('.wm-fill');
  const section = document.getElementById('contact');
  const perf = window.PortfolioPerf;
  if (!wm || !fillEl || !section || !perf) return;

  let inView = false;
  const io = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; }, { threshold: 0 });
  io.observe(section);

  function frame() {
    if (!inView) return;
    const r = section.getBoundingClientRect();
    const vh = innerHeight;
    // progress: 0 when section top just enters viewport bottom, 1 when section top reaches viewport top
    const progress = Math.min(Math.max((vh - r.top) / (vh + r.height), 0), 1);
    fillEl.style.setProperty('--fill', (progress * 130) + '%');
    // Parallax: watermark shifts opposite to scroll at ~18% of normal speed
    const parallaxY = (r.top - vh / 2) * -0.06;
    wm.style.transform = `translate3d(0, ${parallaxY}px, 0)`;
  }
  perf.subscribe(frame, { el: section });
})();
