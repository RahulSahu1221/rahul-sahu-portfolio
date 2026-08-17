/* ==========================================================================
   METABALL BLOB — liquid-glass background object for the hero section.
   Same goo technique as before (blur+contrast fusion of soft circles),
   but now: capped canvas resolution and blur radius on lower-tier devices,
   paused entirely when the hero is off-screen, and driven by the shared
   ticker instead of its own rAF loop — this was the single heaviest
   effect on the page, so it gets the most aggressive scaling.
   ========================================================================== */
(function () {
  const canvas = document.getElementById('metaball-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const perf = window.PortfolioPerf;
  const supportsFilter = 'filter' in ctx;
  let w, h;
  const dpr = perf.tier === 'high' ? Math.min(window.devicePixelRatio || 1, 1.6) : 1;
  const blurFactor = perf.tier === 'low' ? 0.028 : perf.tier === 'mid' ? 0.036 : 0.045;
  let mx = 0.7, my = 0.5, tmx = 0.7, tmy = 0.5;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    w = canvas.width = Math.round(rect.width * dpr);
    h = canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
  }
  let resizeTimer;
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 200); });

  document.addEventListener('mousemove', e => {
    tmx = e.clientX / window.innerWidth;
    tmy = e.clientY / window.innerHeight;
  });

  const balls = [
    { a: 0.0, spd: 0.31, rx: 0.20, ry: 0.16, rr: 0.15 },
    { a: 1.4, spd: 0.23, rx: 0.14, ry: 0.20, rr: 0.11 },
    { a: 2.6, spd: 0.27, rx: 0.17, ry: 0.12, rr: 0.09 },
    { a: 4.2, spd: 0.19, rx: 0.11, ry: 0.15, rr: 0.07 },
  ];
  const activeBalls = perf.tier === 'low' ? balls.slice(0, 3) : balls;

  function colors() {
    const cs = getComputedStyle(document.body);
    return {
      accent: cs.getPropertyValue('--accent').trim() || '#c8a96e',
      accent2: cs.getPropertyValue('--accent2').trim() || '#4a9eff',
      light: document.body.classList.contains('light-mode'),
    };
  }

  function hexToRgba(hex, alpha) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const num = parseInt(hex, 16);
    return `rgba(${(num >> 16) & 255},${(num >> 8) & 255},${num & 255},${alpha})`;
  }

  let t = 0;
  function frame(ts, dt) {
    if (!w || !h) return;
    t += 0.006 * (dt / 16.7);
    mx += (tmx - mx) * 0.03; my += (tmy - my) * 0.03;
    const { accent, accent2, light } = colors();
    const cx = w * (0.5 + (mx - 0.5) * 0.18);
    const cy = h * (0.5 + (my - 0.5) * 0.18);
    const baseR = Math.min(w, h);

    ctx.clearRect(0, 0, w, h);
    ctx.save();
    if (supportsFilter) ctx.filter = 'blur(' + (baseR * blurFactor) + 'px) contrast(24)';

    activeBalls.forEach((b, i) => {
      const ang = t * b.spd + b.a;
      const bx = cx + Math.cos(ang) * baseR * b.rx + Math.sin(t * 0.4 + i) * baseR * 0.02;
      const by = cy + Math.sin(ang * 1.3) * baseR * b.ry;
      const r = baseR * b.rr * (1 + 0.08 * Math.sin(t * 1.7 + i * 2));
      ctx.beginPath();
      ctx.fillStyle = i % 2 === 0 ? accent : accent2;
      ctx.arc(bx, by, r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    ctx.save();
    ctx.globalCompositeOperation = 'source-atop';
    const tint = ctx.createLinearGradient(0, 0, w, h);
    tint.addColorStop(0, hexToRgba(accent, light ? 0.30 : 0.34));
    tint.addColorStop(1, hexToRgba(accent2, light ? 0.20 : 0.26));
    ctx.fillStyle = tint;
    ctx.fillRect(0, 0, w, h);

    const hl = ctx.createRadialGradient(cx - baseR * 0.06, cy - baseR * 0.08, 0, cx, cy, baseR * 0.34);
    hl.addColorStop(0, 'rgba(255,255,255,0.35)');
    hl.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = hl;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }

  document.addEventListener('DOMContentLoaded', () => {
    resize();
    perf.subscribe(frame, { el: canvas });
  });
})();
