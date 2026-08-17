/* ==========================================================================
   PROJECT SHOWCASE — cursor-follow preview thumbnail + full-screen
   case-study modal. Each .project-row carries its own <template
   class="project-case-content"> right in the HTML — no separate JS data
   object to keep in sync. Preview follow runs on the shared PortfolioPerf
   ticker; disabled outright on touch devices (pointer: coarse), where the
   CTA is always visible instead and tapping opens the modal directly.
   ========================================================================== */
(function () {
  const perf = window.PortfolioPerf;
  const isCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

  /* ---------- Cursor-follow preview ---------- */
  function initPreviewFollow() {
    const float = document.getElementById('project-preview-float');
    const rows = Array.from(document.querySelectorAll('.project-row[data-preview], .project-row'));
    if (!float || !rows.length || isCoarse || !perf) return;

    let tx = 0, ty = 0, x = 0, y = 0, visible = false;

    function setContent(row) {
      const src = row.getAttribute('data-preview');
      float.innerHTML = '';
      if (src) {
        const img = new Image();
        img.alt = '';
        img.onerror = () => { float.innerHTML = fallbackMarkup(); };
        img.src = src;
        float.appendChild(img);
      } else {
        float.innerHTML = fallbackMarkup();
      }
    }
    function fallbackMarkup() {
      return '<div class="preview-fallback"><svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div>';
    }

    rows.forEach(row => {
      row.addEventListener('mouseenter', () => { setContent(row); visible = true; float.classList.add('visible'); });
      row.addEventListener('mouseleave', () => { visible = false; float.classList.remove('visible'); });
      row.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
    });

    perf.subscribe((ts, dt) => {
      if (!visible) return;
      const f = Math.min(1, (dt / 16.7) * 0.18);
      x += (tx - x) * f;
      y += (ty - y) * f;
      float.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1)`;
    });
  }

  /* ---------- Full-screen case-study modal ---------- */
  function initCaseModal() {
    const modal = document.getElementById('case-modal');
    const backdrop = document.getElementById('case-modal-backdrop');
    const body = document.getElementById('case-modal-body');
    const closeBtn = document.getElementById('case-modal-close');
    const rows = document.querySelectorAll('.project-row');
    if (!modal || !body || !rows.length) return;

    let lastTrigger = null;

    function open(row) {
      const tpl = row.querySelector('template.project-case-content');
      if (!tpl) return;
      body.innerHTML = '';
      body.appendChild(tpl.content.cloneNode(true));
      body.scrollTop = 0;
      lastTrigger = row;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => closeBtn && closeBtn.focus());
    }
    function close() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      if (lastTrigger) { lastTrigger.focus(); lastTrigger = null; }
    }

    rows.forEach(row => {
      row.setAttribute('role', 'button');
      row.setAttribute('tabindex', '0');
      row.addEventListener('click', () => open(row));
      row.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(row); }
      });
    });

    closeBtn && closeBtn.addEventListener('click', close);
    backdrop && backdrop.addEventListener('click', close);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && modal.classList.contains('open')) close();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initPreviewFollow();
    initCaseModal();
  });
})();