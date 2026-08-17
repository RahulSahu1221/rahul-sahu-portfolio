/* ==========================================================================
   WIRE TIMELINE — scroll-driven fill + traveling pulse + node lighting.
   Same progressive-fill idiom as initEduTimeline()/initThreadLine() in
   scroll-animations.js: only runs while the container is on screen
   (IntersectionObserver-gated), driven by the shared PortfolioPerf ticker
   rather than its own scroll handler.
   ========================================================================== */
(function () {
  const perf = window.PortfolioPerf;
  const container = document.getElementById('wire-timeline');
  const fill = document.getElementById('wire-fill');
  const pulse = document.getElementById('wire-pulse');
  if (!container || !fill || !perf) return;

  const nodes = Array.from(container.querySelectorAll('.wire-node'));

  let inView = false;
  const io = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; }, { threshold: 0 });
  io.observe(container);

  function frame() {
    if (!inView) return;
    const r = container.getBoundingClientRect();
    const vh = innerHeight;
    // Same "reaches 75% down the viewport, completes over 85% of the
    // section's own height" curve as the Academic Journey timeline —
    // keeps the two scroll-linked timelines feeling like one system.
    const progress = Math.min(Math.max((vh * 0.75 - r.top) / (r.height * 0.85), 0), 1);
    fill.style.height = (progress * 100) + '%';

    if (pulse) {
      const atEdge = progress <= 0.005 || progress >= 0.995;
      pulse.style.top = (progress * 100) + '%';
      pulse.style.opacity = atEdge ? '0' : '1';
    }

    nodes.forEach(node => {
      const nodeRect = node.getBoundingClientRect();
      const nodeProgress = (nodeRect.top + nodeRect.height / 2 - r.top) / r.height;
      node.classList.toggle('lit', progress >= nodeProgress - 0.015);
    });
  }

  perf.subscribe(frame, { el: container });
})();