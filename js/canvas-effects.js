/* ==========================================================================
   CANVAS EFFECTS — ambient network graph, cursor sparkle trail, radar chart
   All three now subscribe to the shared PortfolioPerf ticker instead of
   running their own requestAnimationFrame loop, and pause automatically
   when their canvas is off-screen. Particle counts scale down on lower-tier
   devices so nothing is dropped — just lighter.
   ========================================================================== */

/* ---------- Ambient network graph (fixed full-page backdrop) ---------- */
(function () {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const perf = window.PortfolioPerf;
  let w, h, nodes = [];
  const COUNT = perf.tier === 'low' ? 26 : perf.tier === 'mid' ? 40 : 60;
  const DIST = 200;
  let mx = innerWidth / 2, my = innerHeight / 2;

  function resize() { w = canvas.width = innerWidth; h = canvas.height = innerHeight; nodes = Array.from({ length: COUNT }, () => new Node()); }
  window.addEventListener('resize', debounce(resize, 200));
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function debounce(fn, ms) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }

  class Node {
    constructor() { this.x = Math.random() * w; this.y = Math.random() * h; this.vx = (Math.random() - 0.5) * 0.25; this.vy = (Math.random() - 0.5) * 0.25; this.r = Math.random() * 1.4 + 0.8; }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < -50) this.x = w + 50; if (this.x > w + 50) this.x = -50;
      if (this.y < -50) this.y = h + 50; if (this.y > h + 50) this.y = -50;
    }
  }

  function hexToRgba(hex, alpha) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const num = parseInt(hex, 16);
    return `rgba(${(num >> 16) & 255},${(num >> 8) & 255},${num & 255},${alpha})`;
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);
    const isLight = document.body.classList.contains('light-mode');
    const accent = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#c8a96e';
    const ox = (mx - w / 2) * 0.015, oy = (my - h / 2) * 0.015;
    ctx.lineWidth = 0.5;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < DIST) {
          ctx.strokeStyle = hexToRgba(accent, (1 - dist / DIST) * (isLight ? 0.07 : 0.15));
          ctx.beginPath();
          ctx.moveTo(nodes[i].x + ox, nodes[i].y + oy);
          ctx.lineTo(nodes[j].x + ox, nodes[j].y + oy);
          ctx.stroke();
        }
      }
      nodes[i].update();
      ctx.beginPath();
      ctx.arc(nodes[i].x + ox, nodes[i].y + oy, nodes[i].r, 0, Math.PI * 2);
      ctx.fillStyle = hexToRgba(accent, isLight ? 0.35 : 0.55);
      ctx.fill();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    resize();
    perf.subscribe(frame);
  });
})();

/* ---------- Sparkle cursor trail ---------- */
(function () {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
  const perf = window.PortfolioPerf;
  if (perf.reducedMotion) return;
  const ctx = canvas.getContext('2d');
  let w, h, stars = [];
  const MAX = perf.tier === 'low' ? 40 : perf.tier === 'mid' ? 70 : 120;
  const SPAWN_CHANCE = perf.tier === 'low' ? 0.25 : 0.55;

  function resize() { w = canvas.width = innerWidth; h = canvas.height = innerHeight; }
  window.addEventListener('resize', resize); resize();

  document.addEventListener('mousemove', e => {
    if (Math.random() > SPAWN_CHANCE) return;
    stars.push({ x: e.clientX, y: e.clientY, life: 1, r: Math.random() * 1.8 + 0.6, vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6 - 0.3 });
    if (stars.length > MAX) stars.shift();
  });

  function frame() {
    ctx.clearRect(0, 0, w, h);
    const accent = getComputedStyle(document.body).getPropertyValue('--accent').trim() || '#c8a96e';
    stars = stars.filter(s => s.life > 0);
    stars.forEach(s => {
      s.life -= 0.025; s.x += s.vx; s.y += s.vy;
      ctx.globalAlpha = Math.max(s.life, 0);
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }
  perf.subscribe(frame);
})();

/* ---------- Competency radar chart ---------- */
(function () {
  const canvas = document.getElementById('radar-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const perf = window.PortfolioPerf;

  const skills = [
    { key: 'r1', value: 90, color: '#c8a96e' },
    { key: 'r2', value: 75, color: '#4a9eff' },
    { key: 'r3', value: 85, color: '#7dd3fc' },
    { key: 'r4', value: 78, color: '#a78bfa' },
    { key: 'r5', value: 60, color: '#34d399' },
    { key: 'r6', value: 78, color: '#f472b6' },
  ];
  const N = skills.length;
  let progress = 0, started = false, startTime = null;
  const DURATION = 1200;
  const ease = t => 1 - Math.pow(1 - t, 3);

  function label(key) {
    const t = (window.PORTFOLIO_I18N && window.PORTFOLIO_I18N[document.documentElement.lang]) || (window.PORTFOLIO_I18N && window.PORTFOLIO_I18N.en);
    return t && t.skills ? t.skills[key] : key;
  }

  function draw(p) {
    const W = canvas.width, H = canvas.height, cx = W / 2, cy = H / 2, R = Math.min(W, H) * 0.36;
    const isLight = document.body.classList.contains('light-mode');
    const borderCol = isLight ? 'rgba(140,128,105,0.32)' : 'rgba(148,163,184,0.18)';
    const labelCol = isLight ? 'rgba(51,65,85,0.95)' : 'rgba(148,163,184,0.9)';
    ctx.clearRect(0, 0, W, H);

    for (let l = 1; l <= 5; l++) {
      const lr = R * l / 5;
      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        const a = (i / N) * Math.PI * 2 - Math.PI / 2;
        const x = cx + lr * Math.cos(a), y = cy + lr * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = borderCol;
      ctx.lineWidth = l === 5 ? 1 : 0.5;
      ctx.stroke();
    }
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2 - Math.PI / 2;
      ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + R * Math.cos(a), cy + R * Math.sin(a));
      ctx.strokeStyle = borderCol; ctx.lineWidth = 0.7; ctx.stroke();
    }

    const pts = skills.map((s, i) => {
      const a = (i / N) * Math.PI * 2 - Math.PI / 2;
      const val = (s.value / 100) * p;
      return { x: cx + R * val * Math.cos(a), y: cy + R * val * Math.sin(a) };
    });
    ctx.beginPath(); pts.forEach((pt, i) => i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y)); ctx.closePath();
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    grad.addColorStop(0, 'rgba(200,169,110,0.28)'); grad.addColorStop(1, 'rgba(74,158,255,0.10)');
    ctx.fillStyle = grad; ctx.fill();
    ctx.strokeStyle = 'rgba(200,169,110,0.7)'; ctx.lineWidth = 1.5; ctx.stroke();

    pts.forEach((pt, i) => {
      const pulse = perf.tier === 'low' ? 2.2 : 2 + Math.sin(Date.now() * 0.003 + i * 1.1) * 1.1;
      ctx.beginPath(); ctx.arc(pt.x, pt.y, pulse, 0, Math.PI * 2);
      ctx.fillStyle = skills[i].color; ctx.fill();
    });

    skills.forEach((s, i) => {
      const a = (i / N) * Math.PI * 2 - Math.PI / 2, lr = R * 1.2;
      const lx = cx + lr * Math.cos(a), ly = cy + lr * Math.sin(a);
      ctx.fillStyle = s.color; ctx.font = '600 10.5px Inter, sans-serif';
      ctx.textAlign = Math.abs(Math.cos(a)) < 0.1 ? 'center' : Math.cos(a) > 0 ? 'left' : 'right';
      ctx.textBaseline = Math.abs(Math.sin(a)) < 0.1 ? 'middle' : Math.sin(a) > 0 ? 'top' : 'bottom';
      const words = (label(s.key) || '').split(' ');
      ctx.fillText(words[0] || '', lx, ly);
      ctx.fillStyle = labelCol; ctx.font = '9.5px Inter, sans-serif';
      ctx.fillText(`${s.value}%`, lx, ly + (Math.sin(a) > 0.1 ? 13 : Math.sin(a) < -0.1 ? -13 : 12));
    });
  }

  let unsub = null;
  function frame(ts) {
    if (!startTime) startTime = ts;
    progress = Math.min(ease((ts - startTime) / DURATION), 1);
    draw(progress);
    if (progress >= 1 && unsub) { unsub(); unsub = null; } // stop once fully drawn — no need to redraw every frame
  }

  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !started) {
      started = true; io.disconnect();
      unsub = perf.subscribe(frame, { el: canvas });
    }
  }, { threshold: 0.3 });
  document.addEventListener('DOMContentLoaded', () => io.observe(canvas));
  document.addEventListener('themechange', () => { if (started) draw(progress); });
  document.addEventListener('langchange', () => { if (started) draw(progress); });
})();
