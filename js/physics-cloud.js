/* ==========================================================================
   SKILLS PHYSICS CLOUD
   Reads the real chip text your existing skills-chips.js already produced
   from .skills-data-source (untouched i18n content), builds one real DOM
   pill per skill inside .skills-physics-wrap, and syncs each pill's
   transform to a Matter.js body every tick on the shared PortfolioPerf
   ticker. Draggable/throwable via Matter's built-in mouse+touch
   constraint. Falls back to a static flex-wrapped chip cloud (no physics)
   on prefers-reduced-motion, perf.tier === 'low', or if Matter.js failed
   to load from the CDN.

   Init timing: rather than guessing a delay, this waits for the same
   'langchange' event skills-chips.js listens for to build its chips.
   i18n.js fires that once on load (after the very first translation pass)
   and again on every language switch. Listeners on the same event fire in
   registration order, so as long as this script's <script> tag comes
   after skills-chips.js's in the document, skills-chips.js's chip-build
   listener is guaranteed to run first on every dispatch — no race.
   ========================================================================== */
(function () {
  const perf = window.PortfolioPerf;
  const wrap = document.getElementById('skills-physics-wrap');
  const dataSource = document.getElementById('skills-data-source');
  if (!wrap || !dataSource || !perf) return;

  const TINTS = ['tint-a', 'tint-b', 'tint-c'];
  let built = false;

  function harvestChips() {
    const cards = Array.from(dataSource.querySelectorAll('.skill-card'));
    const out = [];
    cards.forEach((card, i) => {
      card.querySelectorAll('.skill-chip').forEach(chip => {
        const text = chip.textContent.trim();
        if (text) out.push({ text, cat: i });
      });
    });
    return out;
  }

  function buildStatic(items) {
    wrap.classList.add('static-fallback');
    wrap.querySelectorAll('.phys-chip').forEach(el => el.remove());
    items.forEach(item => {
      const el = document.createElement('span');
      el.className = 'phys-chip ' + TINTS[item.cat % TINTS.length];
      el.textContent = item.text;
      wrap.appendChild(el);
    });
  }

  function init() {
    if (built) return; // physics/static cloud only needs to build once
    const items = harvestChips();
    if (!items.length) {
      console.warn('[physics-cloud] No .skill-chip text found yet — skills-chips.js may not have run before this script, or your skill-items translations are empty.');
      return; // will retry on the next 'langchange' dispatch (e.g. a manual language switch) rather than giving up permanently
    }
    built = true;

    const canPhysics =
      typeof Matter !== 'undefined' &&
      perf.tier !== 'low' &&
      !perf.reducedMotion;

    if (!canPhysics) {
      if (typeof Matter === 'undefined') console.warn('[physics-cloud] Matter.js not found — check the CDN <script> tag loaded before this file. Falling back to a static chip cloud.');
      buildStatic(items);
      return;
    }

    // Everything below touches the Matter.js API directly — if any of it
    // throws (a CDN version mismatch, a global naming collision, etc.),
    // the container should still end up with the static chip cloud rather
    // than silently staying empty forever with `built` already true.
    try {
      buildPhysics(items);
    } catch (err) {
      console.error('[physics-cloud] Physics setup failed, falling back to static chip cloud:', err);
      wrap.querySelectorAll('.phys-chip').forEach(el => el.remove());
      buildStatic(items);
    }
  }

  function buildPhysics(items) {
    const { Engine, World, Bodies, Body, Composite, Mouse, MouseConstraint } = Matter;

    const engine = Engine.create();
    engine.gravity.y = 1;
    const world = engine.world;

    let w = wrap.clientWidth, h = wrap.clientHeight;
    const WALL = 60;

    function makeWalls() {
      return [
        Bodies.rectangle(w / 2, h + WALL / 2, w + WALL * 2, WALL, { isStatic: true, label: 'floor' }),
        Bodies.rectangle(w / 2, -WALL / 2, w + WALL * 2, WALL, { isStatic: true, label: 'ceiling' }),
        Bodies.rectangle(-WALL / 2, h / 2, WALL, h + WALL * 2, { isStatic: true, label: 'left' }),
        Bodies.rectangle(w + WALL / 2, h / 2, WALL, h + WALL * 2, { isStatic: true, label: 'right' }),
      ];
    }
    let walls = makeWalls();
    Composite.add(world, walls);

    const chips = [];
    const measureHost = document.createElement('div');
    document.body.appendChild(measureHost);

    items.forEach((item, i) => {
      const el = document.createElement('span');
      el.className = 'phys-chip phys-chip-measure ' + TINTS[item.cat % TINTS.length];
      el.textContent = item.text;
      measureHost.appendChild(el);
      const rect = el.getBoundingClientRect();
      const cw = Math.max(rect.width, 40);
      const ch = Math.max(rect.height, 28);
      el.classList.remove('phys-chip-measure');
      wrap.appendChild(el);

      const startX = 30 + Math.random() * Math.max(w - 60, 40);
      const startY = -80 - i * 34;
      const body = Bodies.rectangle(startX, startY, cw, ch, {
        chamfer: { radius: ch / 2 },
        restitution: 0.45,
        friction: 0.2,
        frictionAir: 0.018,
        angle: (Math.random() - 0.5) * 0.6,
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);
      Composite.add(world, body);
      chips.push({ el, body, halfW: cw / 2, halfH: ch / 2 });

      requestAnimationFrame(() => { requestAnimationFrame(() => el.classList.add('settled')); });
    });
    measureHost.remove();

    const mouse = Mouse.create(wrap);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, damping: 0.15, render: { visible: false } },
    });
    Composite.add(world, mouseConstraint);
    if (mouse.element && mouse.mousewheel) {
      mouse.element.removeEventListener('wheel', mouse.mousewheel);
      mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
      mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);
    }

    let resizeTimer;
    function onResize() {
      w = wrap.clientWidth; h = wrap.clientHeight;
      Composite.remove(world, walls);
      walls = makeWalls();
      Composite.add(world, walls);
    }
    window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(onResize, 200); });

    function frame(ts, dt) {
      const clamped = Math.min(dt, 32);
      Engine.update(engine, clamped);
      for (let i = 0; i < chips.length; i++) {
        const { el, body, halfW, halfH } = chips[i];
        el.style.transform =
          `translate3d(${body.position.x - halfW}px, ${body.position.y - halfH}px, 0) rotate(${body.angle}rad)`;
      }
    }
    perf.subscribe(frame, { el: wrap });
  }

  document.addEventListener('langchange', init);
  // Safety net: if i18n.js itself never fires 'langchange' for some reason,
  // still attempt a build shortly after load rather than staying empty forever.
  document.addEventListener('DOMContentLoaded', () => setTimeout(init, 400));
})();