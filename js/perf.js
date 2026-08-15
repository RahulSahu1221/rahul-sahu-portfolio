/* ==========================================================================
   PERFORMANCE CORE
   - One shared requestAnimationFrame loop. Every animated module subscribes
     instead of running its own rAF loop — this alone removes most of the
     "several independent loops fighting for the main thread" jank.
   - Subscribers can be tagged with an element; when that element leaves
     the viewport its callback is automatically skipped (still subscribed,
     just not run) until it's visible again.
   - A simple device tier (low / mid / high) lets modules scale down
     particle counts / canvas resolution on weaker hardware without
     dropping the feature entirely.
   ========================================================================== */
window.PortfolioPerf = (function () {
  const subscribers = new Map(); // id -> { fn, el, active }
  let id = 0;
  let running = false;
  let last = 0;

  function tick(ts) {
    const dt = last ? ts - last : 16.7;
    last = ts;
    subscribers.forEach(sub => {
      if (sub.active) sub.fn(ts, dt);
    });
    requestAnimationFrame(tick);
  }

  function start() {
    if (running) return;
    running = true;
    requestAnimationFrame(tick);
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      subscribers.forEach(sub => {
        if (sub.el === entry.target) sub.active = entry.isIntersecting;
      });
    });
  }, { rootMargin: '100px' });

  function subscribe(fn, opts) {
    const key = ++id;
    const el = opts && opts.el;
    subscribers.set(key, { fn, el, active: !el });
    if (el) io.observe(el);
    return function unsubscribe() {
      subscribers.delete(key);
      if (el) io.unobserve(el);
    };
  }

  document.addEventListener('visibilitychange', () => {
    subscribers.forEach(sub => { if (document.hidden) sub._wasActive = sub.active; });
  });

  // ---- Device tier heuristic ----
  const cores = navigator.hardwareConcurrency || 4;
  const mem = navigator.deviceMemory || 4;
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let tier = 'high';
  if (cores <= 4 || mem <= 4) tier = 'mid';
  if (cores <= 2 || mem <= 2) tier = 'low';
  if (reducedMotion) tier = 'low';

  start();

  return { subscribe, tier, reducedMotion, dpr: Math.min(window.devicePixelRatio || 1, tier === 'high' ? 2 : 1.4) };
})();
