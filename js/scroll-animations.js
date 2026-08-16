/* ==========================================================================
   SCROLL ANIMATIONS — spatial section reveals, staggered card entrances,
   scroll-glass edge blur, counters, spring-based card tilt, parallax.
   Parallax now runs on the shared PortfolioPerf ticker instead of its own
   loop. Scroll-glass no longer measures every card on every scroll frame —
   only cards currently flagged "near an edge" by an IntersectionObserver
   get a getBoundingClientRect() call, so cost scales with what's near the
   fold, not with total card count.
   ========================================================================== */
(function () {
  const perf = window.PortfolioPerf;
  const lerp = (a, b, f) => a + (b - a) * f;

  function initSpatialSections() {
    const sections = document.querySelectorAll('.section-spatial');
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.remove('out');
          el.classList.add('in');
        } else if (el.classList.contains('in')) {
          // Only play the "recede" exit once it's actually been seen —
          // otherwise sections below the fold would exit-animate on load.
          el.classList.remove('in');
          el.classList.add('out');
        }
      });
    }, { threshold: 0.12 });
    sections.forEach(s => io.observe(s));
  }

  function initStagger() {
    const els = document.querySelectorAll('[data-anim]');
    els.forEach(el => {
      const delay = el.getAttribute('data-delay');
      if (delay !== null) el.style.transitionDelay = delay + 'ms';
    });
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) {
          el.classList.remove('out');
          el.classList.add('in');
        } else if (el.classList.contains('in')) {
          el.classList.remove('in');
          el.classList.add('out');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => io.observe(el));
  }

  /* Scroll-glass: only cards within ~180px of the viewport top/bottom edge
     are measured per scroll frame. Everything else is either fully clear
     (blur = 0, set once) or not yet relevant. */
  function initScrollGlass() {
    const cards = Array.from(document.querySelectorAll('.scroll-glass'));
    if (!cards.length) return;
    const nearEdge = new Set();

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) nearEdge.add(entry.target);
        else { nearEdge.delete(entry.target); entry.target.style.setProperty('--scroll-blur', '0px'); }
      });
    }, { rootMargin: '-0px 0px -0px 0px', threshold: buildThresholds() });

    function buildThresholds() { const t = []; for (let i = 0; i <= 20; i++) t.push(i / 20); return t; }
    cards.forEach(c => io.observe(c));

    let ticking = false;
    function measure() {
      const vh = innerHeight, zone = 140;
      nearEdge.forEach(card => {
        const r = card.getBoundingClientRect();
        const edge = Math.min(r.top, vh - r.bottom);
        const proximity = Math.max(0, 1 - Math.max(edge, 0) / zone);
        card.style.setProperty('--scroll-blur', (proximity * 10).toFixed(1) + 'px');
      });
      ticking = false;
    }
    document.addEventListener('scroll', () => {
      if (ticking || nearEdge.size === 0) return;
      ticking = true;
      requestAnimationFrame(measure);
    }, { passive: true });
  }

  function initCounters() {
    document.querySelectorAll('.stat-val, .counter-num').forEach(el => { el.dataset.originalText = el.textContent.trim(); });
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const el = entry.target;
        if (!entry.isIntersecting || el.dataset.animating === 'true') { if (!entry.isIntersecting) el.dataset.animating = 'false'; return; }
        el.dataset.animating = 'true';
        const match = el.dataset.originalText.match(/^(\D*)(\d*\.?\d+)(\D*)$/);
        if (!match) return;
        const [, prefix, numStr, suffix] = match;
        const target = parseFloat(numStr);
        const isFloat = numStr.includes('.');
        let start = null;
        function frame(t) {
          if (!start) start = t;
          const p = Math.min((t - start) / 1000, 1);
          const ease = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          const cur = target * ease;
          el.textContent = `${prefix}${isFloat ? cur.toFixed(2) : Math.floor(cur)}${suffix}`;
          if (p < 1) requestAnimationFrame(frame); else el.textContent = el.dataset.originalText;
        }
        requestAnimationFrame(frame);
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('.stat-val, .counter-num').forEach(el => io.observe(el));
  }

  /* iOS-flavored tilt: gentle, spring-eased on release, capped rotation so
     it reads as "responsive material" rather than a gimmicky 3D flip. */
  function initTilt() {
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
    document.querySelectorAll('.skill-card, .project-card, .cert-card, .exp-card, .edu-card, .achievement-item').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const rotX = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -3.5;
        const rotY = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 3.5;
        card.style.transition = 'transform 0.12s linear';
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-3px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)';
        card.style.transform = '';
      });
      // iOS-style press feedback
      card.addEventListener('mousedown', () => { card.style.transition = 'transform 0.15s cubic-bezier(0.4,0,0.2,1)'; card.style.transform += ' scale(0.98)'; });
      card.addEventListener('mouseup', () => { card.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'; card.style.transform = card.style.transform.replace(' scale(0.98)', ''); });
    });
  }

  function initHeroPhotoTilt() {
    const heroImg = document.querySelector('.hero-photo');
    const hero = document.querySelector('.hero');
    if (!heroImg || !hero) return;
    hero.addEventListener('mousemove', e => {
      const x = (innerWidth / 2 - e.clientX) / 45;
      const y = (innerHeight / 2 - e.clientY) / 45;
      heroImg.style.transform = `translate(${x}px, ${y}px) scale(1.00)`;
    });
  }

  /* Hero photo — scroll-triggered arrive/recede, layered on top of the
     one-time load-in keyframe and the continuous float (both untouched). */
  function initHeroScrollLayer() {
    const wrap = document.querySelector('.hero-photo-wrap');
    const heroSection = document.querySelector('.hero');
    if (!wrap || !heroSection) return;
    let everSeen = false;
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          wrap.classList.remove('hero-receded');
          everSeen = true;
        } else if (everSeen) {
          wrap.classList.add('hero-receded');
        }
      });
    }, { threshold: 0.15 });
    io.observe(heroSection);
  }

  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    const railFill = document.getElementById('scroll-rail-fill');
    if (!bar && !railFill) return;
    let ticking = false;
    document.addEventListener('scroll', () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        const p = max > 0 ? scrollY / max : 0;
        if (bar) bar.style.transform = `scaleX(${p})`;
        if (railFill) railFill.style.height = (p * 100) + '%';
        ticking = false;
      });
    }, { passive: true });
  }

  /* Parallax — now a single ticker subscriber instead of its own loop */
  function initParallax() {
    const line = document.getElementById('energy-flow-line');
    const grid = document.getElementById('bg-depth-grid');
    let scaleY = 0, gx = 0, gy = 0, mx = innerWidth / 2, my = innerHeight / 2;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    function frame() {
      const max = document.documentElement.scrollHeight - innerHeight;
      scaleY = lerp(scaleY, max > 0 ? scrollY / max : 0, 0.1);
      if (line) line.style.transform = `scaleY(${scaleY})`;
      gx = lerp(gx, (mx / innerWidth - 0.5) * -30, 0.05);
      gy = lerp(gy, (my / innerHeight - 0.5) * -30, 0.05);
      if (grid) grid.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
    }
    perf.subscribe(frame);
  }

  /* Career "thread" line — fills across the experience row as it scrolls through view */
  function initThreadLine() {
    const container = document.getElementById('experience-thread');
    const fill = document.getElementById('thread-fill');
    if (!container || !fill || !perf) return;
    let inView = false;
    const io = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; }, { threshold: 0 });
    io.observe(container);
    function frame() {
      if (!inView) return;
      const r = container.getBoundingClientRect();
      const vh = innerHeight;
      const progress = Math.min(Math.max((vh * 0.75 - r.top) / (r.height * 0.6), 0), 1);
      fill.style.width = (progress * 100) + '%';
    }
    perf.subscribe(frame, { el: container });
  }

  /* Academic Journey timeline — same progressive-fill pattern */
  function initEduTimeline() {
    const container = document.getElementById('edu-timeline');
    const fill = document.getElementById('edu-timeline-fill');
    if (!container || !fill || !perf) return;
    let inView = false;
    const io = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; }, { threshold: 0 });
    io.observe(container);
    function frame() {
      if (!inView) return;
      const r = container.getBoundingClientRect();
      const vh = innerHeight;
      const progress = Math.min(Math.max((vh * 0.8 - r.top) / (r.height * 0.85), 0), 1);
      fill.style.height = (progress * 100) + '%';
    }
    perf.subscribe(frame, { el: container });
  }

  function initSparkline() {
    document.querySelectorAll('#gpa-sparkline, .edu-sgpa-chart svg').forEach(svg => {
      const line = svg.querySelector('polyline');
      if (!line) return;
      const io = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          line.style.transition = 'stroke-dashoffset 1.3s var(--ease-glass)';
          line.style.strokeDashoffset = '0';
        }
      }, { threshold: 0.4 });
      io.observe(svg);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initSpatialSections();
    initStagger();
    initScrollGlass();
    initCounters();
    initTilt();
    initHeroPhotoTilt();
    initHeroScrollLayer();
    initScrollProgress();
    initParallax();
    initThreadLine();
    initEduTimeline();
    initSparkline();
  });
})();
