/* ==========================================================================
   CANVAS EFFECTS — ambient network graph, cursor sparkle trail
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

/* ---------- Sparkling Star Cursor + Mouse-Attracting Particles ---------- */
(function() {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;
  if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
  const perf = window.PortfolioPerf;
  if (perf.reducedMotion) return;
  const ctx = canvas.getContext('2d');
  
  let W, H;
  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Scale star count based on device tier
  const STAR_COUNT = perf.tier === 'low' ? 50 : perf.tier === 'mid' ? 85 : 120;
  const stars = [];

  class Star {
    constructor(fromMouse) {
      this.reset(fromMouse);
    }
    reset(fromMouse) {
      if (fromMouse) {
        this.x = mouseX + (Math.random() - 0.5) * 40;
        this.y = mouseY + (Math.random() - 0.5) * 40;
      } else {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
      }
      this.baseX = this.x;
      this.baseY = this.y;
      this.vx = (Math.random() - 0.5) * 0.25;
      this.vy = (Math.random() - 0.5) * 0.25;
      this.radius = Math.random() * 1.4 + 0.4;
      this.maxRadius = this.radius * 4.5;
      this.alpha = Math.random() * 0.5 + 0.15;
      this.twinkleSpeed = Math.random() * 0.02 + 0.005;
      this.twinklePhase = Math.random() * Math.PI * 2;
      this.attractDist = 110 + Math.random() * 70;
      this.sparkling = false;
      this.sparkAlpha = 0;
      this.sparkSize = 0;
      this.sparkDecay = 0;
    }
    update(t) {
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < -10) this.x = W + 10;
      if (this.x > W + 10) this.x = -10;
      if (this.y < -10) this.y = H + 10;
      if (this.y > H + 10) this.y = -10;

      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < this.attractDist && dist > 0) {
        const force = (1 - dist / this.attractDist) * 0.06;
        this.vx += dx / dist * force;
        this.vy += dy / dist * force;
        const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (spd > 1.8) { this.vx = this.vx / spd * 1.8; this.vy = this.vy / spd * 1.8; }
        
        if (dist < 55 && !this.sparkling && Math.random() < 0.12) {
          this.sparkling = true;
          this.sparkAlpha = 1;
          this.sparkSize = this.maxRadius;
          this.sparkDecay = 0.04 + Math.random() * 0.04;
        }
      } else {
        this.vx *= 0.97;
        this.vy *= 0.97;
      }

      if (this.sparkling) {
        this.sparkAlpha -= this.sparkDecay;
        this.sparkSize *= 0.92;
        if (this.sparkAlpha <= 0) this.sparkling = false;
      }
      this.twinklePhase += this.twinkleSpeed;
    }
    draw(isLight) {
      const twinkle = 0.5 + 0.5 * Math.sin(this.twinklePhase);
      const a = this.alpha * (0.6 + 0.4 * twinkle);
      const r = this.radius * (0.85 + 0.3 * twinkle);
      const gold = isLight ? '160,120,64' : '200,169,110';

      ctx.beginPath();
      ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${gold},${a})`;
      ctx.fill();

      if (twinkle > 0.5) {
        const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r * 4);
        grd.addColorStop(0, `rgba(${gold},${a * 0.35})`);
        grd.addColorStop(1, `rgba(${gold},0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      if (this.sparkling && this.sparkAlpha > 0) {
        const sa = this.sparkAlpha;
        const ss = this.sparkSize;
        ctx.save();
        ctx.globalAlpha = sa;
        ctx.strokeStyle = `rgba(${gold},${sa})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(this.x - ss, this.y); ctx.lineTo(this.x + ss, this.y);
        ctx.moveTo(this.x, this.y - ss); ctx.lineTo(this.x, this.y + ss);
        const d = ss * 0.6;
        ctx.moveTo(this.x - d, this.y - d); ctx.lineTo(this.x + d, this.y + d);
        ctx.moveTo(this.x + d, this.y - d); ctx.lineTo(this.x - d, this.y + d);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.x, this.y, ss * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,240,200,${sa})`;
        ctx.fill();
        ctx.restore();
      }
    }
  }

  for (let i = 0; i < STAR_COUNT; i++) stars.push(new Star(false));

  let lastMX = mouseX, lastMY = mouseY, spawnAccum = 0;
  document.addEventListener('mousemove', e => {
    const spd = Math.sqrt((e.clientX - lastMX) ** 2 + (e.clientY - lastMY) ** 2);
    spawnAccum += spd * 0.015;
    lastMX = e.clientX; lastMY = e.clientY;
    mouseX = e.clientX; mouseY = e.clientY;
  });

  let t = 0;
  function frame(ts, dt) {
    ctx.clearRect(0, 0, W, H);
    t += 0.001 * dt;
    const isLight = document.body.classList.contains('light-mode');

    if (spawnAccum > 1) {
      spawnAccum -= 1;
      const s = stars.find(st => !st.sparkling && Math.sqrt((st.x-mouseX)**2+(st.y-mouseY)**2) > 200);
      if (s) {
        s.x = mouseX + (Math.random() - 0.5) * 20;
        s.y = mouseY + (Math.random() - 0.5) * 20;
        s.vx = (Math.random() - 0.5) * 1.5;
        s.vy = (Math.random() - 0.5) * 1.5;
        s.sparkling = true;
        s.sparkAlpha = 0.9;
        s.sparkSize = s.maxRadius * 1.2;
        s.sparkDecay = 0.05 + Math.random() * 0.03;
      }
    }

    for (let i = 0; i < stars.length; i++) {
      stars[i].update(t);
      const di = Math.sqrt((stars[i].x - mouseX) ** 2 + (stars[i].y - mouseY) ** 2);
      if (di < 160) {
        for (let j = i + 1; j < stars.length; j++) {
          const dj = Math.sqrt((stars[j].x - mouseX) ** 2 + (stars[j].y - mouseY) ** 2);
          if (dj < 160) {
            const d = Math.sqrt((stars[i].x - stars[j].x) ** 2 + (stars[i].y - stars[j].y) ** 2);
            if (d < 90) {
              const a = (1 - d / 90) * 0.12 * (1 - di / 160);
              ctx.beginPath();
              ctx.strokeStyle = isLight ? `rgba(160,120,64,${a})` : `rgba(200,169,110,${a})`;
              ctx.lineWidth = 0.6;
              ctx.moveTo(stars[i].x, stars[i].y);
              ctx.lineTo(stars[j].x, stars[j].y);
              ctx.stroke();
            }
          }
        }
      }
    }

    for (let i = 0; i < stars.length; i++) {
      stars[i].draw(isLight);
    }
  }

  // Connects the logic to your new shared performance ticker
  perf.subscribe(frame);
})();