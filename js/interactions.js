/* ==========================================================================
   PROJECT TABS + CERTIFICATE MODAL
   ========================================================================== */
(function () {
  function initProjectTabs() {
    const tabs = Array.from(document.querySelectorAll('.project-tab'));
    const panels = document.querySelectorAll('.project-panel');
    const indicator = document.getElementById('project-tab-indicator');
    const wrap = document.querySelector('.project-tabs');

    function moveIndicator(tab) {
      if (!indicator || !wrap || !tab) return;
      const tabRect = tab.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();
      indicator.style.setProperty('--tab-w', tabRect.width + 'px');
      indicator.style.setProperty('--tab-x', (tabRect.left - wrapRect.left) + 'px');
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(b => b.classList.remove('active'));
        tab.classList.add('active');
        moveIndicator(tab);
        const target = tab.dataset.tab;
        panels.forEach(p => p.classList.toggle('active', p.dataset.panel === target));
      });
    });

    // Position on load and keep it correct across resizes / language swaps
    const initial = () => moveIndicator(tabs.find(t => t.classList.contains('active')));
    setTimeout(initial, 50);
    window.addEventListener('resize', initial);
    document.addEventListener('langchange', () => setTimeout(initial, 50));
  }

  function initCertModal() {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.getElementById('closeModal');
    if (!modal || !modalImg) return;

    function open(src) {
      modalImg.src = src;
      modal.style.display = 'flex';
      requestAnimationFrame(() => modal.classList.add('open'));
    }
    function close() {
      modal.classList.remove('open');
      setTimeout(() => { modal.style.display = 'none'; }, 200);
    }

    document.querySelectorAll('[data-cert-image]').forEach(card => {
      card.addEventListener('click', () => open(card.getAttribute('data-cert-image')));
    });
    closeBtn && closeBtn.addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  function initCopyButtons() {
    document.querySelectorAll('.copy-btn[data-copy]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        const text = btn.getAttribute('data-copy');
        const done = () => {
          btn.classList.add('copied');
          setTimeout(() => btn.classList.remove('copied'), 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(done);
        } else {
          const ta = document.createElement('textarea');
          ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
          document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); } catch (err) {}
          document.body.removeChild(ta);
          done();
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initProjectTabs();
    initCertModal();
    initCopyButtons();
  });
})();
