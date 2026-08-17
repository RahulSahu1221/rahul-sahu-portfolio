/* ==========================================================================
   CERTIFICATIONS FILMSTRIP — autonomous ping-pong marquee.
   x tracks how far the track has shifted left, from 0 (first card's left
   edge flush with the viewport's left edge) up to scrollDistance (last
   card's right edge flush with the viewport's right edge). dir flips at
   both bounds. Paused while hovered/focused so text stays readable, and
   auto-paused off-screen for free via PortfolioPerf's {el} gating.
   Disabled on touch/narrow viewports and prefers-reduced-motion — CSS
   swaps the viewport to a native swipeable scroller in both cases.
   ========================================================================== */
(function () {
  const perf = window.PortfolioPerf;
  const section = document.getElementById('certifications');
  const viewport = section && section.querySelector('.filmstrip-viewport');
  const track = document.getElementById('filmstrip-track');
  const progressFill = document.getElementById('filmstrip-progress-fill');
  if (!section || !viewport || !track || !perf) return;

  const SPEED = 34; // px per second

  function autoplayActive() {
    return window.innerWidth > 900 && !perf.reducedMotion;
  }

  let scrollDistance = 0;
  let x = 0;
  let dir = 1; // 1 = drifting right-to-left (x increasing), -1 = drifting left-to-right

  function measure() {
    if (!autoplayActive()) {
      track.style.transform = '';
      if (progressFill) progressFill.style.width = '0%';
      return;
    }
    scrollDistance = Math.max(track.scrollWidth - viewport.clientWidth, 0);
    x = Math.min(x, scrollDistance);
  }

  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(measure, 200); });

  // Thumbnails loading late change track.scrollWidth — remeasure once they settle.
  track.querySelectorAll('img').forEach(img => {
    if (img.complete) return;
    img.addEventListener('load', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(measure, 60); }, { once: true });
  });

  let paused = false;
  track.addEventListener('mouseenter', () => { paused = true; });
  track.addEventListener('mouseleave', () => { paused = false; });
  track.addEventListener('focusin', () => { paused = true; });
  track.addEventListener('focusout', () => { paused = false; });

  function frame(ts, dt) {
    if (!autoplayActive() || scrollDistance <= 0) return;
    if (!paused) {
      x += dir * SPEED * (dt / 1000);
      if (x >= scrollDistance) { x = scrollDistance; dir = -1; } // last card's right edge hit the viewport's right edge
      if (x <= 0) { x = 0; dir = 1; } // first card's left edge hit the viewport's left edge
    }
    track.style.transform = `translate3d(${-x}px, 0, 0)`;
    if (progressFill) progressFill.style.width = (scrollDistance ? (x / scrollDistance) * 100 : 0) + '%';
  }

  document.addEventListener('DOMContentLoaded', () => {
    measure();
    perf.subscribe(frame, { el: section });
  });
})();