/* ==========================================================================
   ADAPTIVE CURSOR
   - A small dot tracks the pointer with zero lag (for precision).
   - A translucent ring trails it using a real critically-damped spring
     (not a linear lerp) — this is what makes it feel expensive rather
     than "cursor-follower tutorial #4".
   - Ring squashes/stretches slightly along its direction of travel,
     proportional to velocity — same idea iOS uses for scroll bounce.
   - Hovering any [data-cursor-label] element grows the ring into a soft
     pill and shows that label; hovering plain interactive elements just
     grows the ring. No color gimmicks, no blend-mode tricks.
   ========================================================================== */
(function () {
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
  const perf = window.PortfolioPerf;

  const dot = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  const label = document.getElementById('cursorLabel');
  if (!dot || !ring) return;

  let mx = innerWidth / 2, my = innerHeight / 2;
  let rx = mx, ry = my, vx = 0, vy = 0;
  const K = 0.16;   // spring stiffness
  const D = 0.72;   // damping

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function frame() {
    dot.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;

    const fx = (mx - rx) * K;
    const fy = (my - ry) * K;
    vx = (vx + fx) * D;
    vy = (vy + fy) * D;
    rx += vx; ry += vy;

    const speed = Math.min(Math.hypot(vx, vy), 18);
    const angle = Math.atan2(vy, vx) * (180 / Math.PI);
    const stretch = 1 + speed * 0.018;
    const squash = 1 - speed * 0.012;

    ring.style.transform = `translate3d(${rx - ring.offsetWidth / 2}px, ${ry - ring.offsetHeight / 2}px, 0) rotate(${angle}deg) scale(${stretch}, ${squash})`;
  }
  perf.subscribe(frame);

  let currentTarget = null;
  function findLabelTarget(el) {
    return el && el.closest ? el.closest('[data-cursor-label]') : null;
  }
  function findInteractiveTarget(el) {
    return el && el.closest ? el.closest('a, button, [data-magnetic], .cmdk-item') : null;
  }

  document.addEventListener('mouseover', e => {
    const labelTarget = findLabelTarget(e.target);
    const interactiveTarget = findInteractiveTarget(e.target);
    if (labelTarget) {
      currentTarget = labelTarget;
      ring.classList.add('ring-label');
      ring.classList.remove('ring-hover');
      if (label) label.textContent = labelTarget.getAttribute('data-cursor-label') || '';
    } else if (interactiveTarget) {
      currentTarget = interactiveTarget;
      ring.classList.add('ring-hover');
      ring.classList.remove('ring-label');
    }
  });
  document.addEventListener('mouseout', e => {
    const stillLabel = findLabelTarget(e.relatedTarget);
    const stillInteractive = findInteractiveTarget(e.relatedTarget);
    if (!stillLabel && !stillInteractive) {
      ring.classList.remove('ring-hover', 'ring-label');
      currentTarget = null;
    }
  });
  document.addEventListener('mousedown', () => ring.classList.add('ring-press'));
  document.addEventListener('mouseup', () => ring.classList.remove('ring-press'));
})();
