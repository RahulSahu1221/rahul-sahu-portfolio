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
    const prevBtn = document.getElementById('certPrev');
    const nextBtn = document.getElementById('certNext');
    if (!modal || !modalImg) return;

    const cards = Array.from(document.querySelectorAll('[data-cert-image]'));
    let index = 0;
    let zoomed = false;

    function show(i) {
      index = (i + cards.length) % cards.length;
      zoomed = false;
      modalImg.classList.remove('zoomed');
      modalImg.src = cards[index].getAttribute('data-cert-image');
    }
    function open(i) {
      show(i);
      modal.style.display = 'flex';
      requestAnimationFrame(() => modal.classList.add('open'));
    }
    function close() {
      modal.classList.remove('open');
      setTimeout(() => { modal.style.display = 'none'; }, 200);
    }

    cards.forEach((card, i) => card.addEventListener('click', () => open(i)));
    closeBtn && closeBtn.addEventListener('click', close);
    prevBtn && prevBtn.addEventListener('click', e => { e.stopPropagation(); show(index - 1); });
    nextBtn && nextBtn.addEventListener('click', e => { e.stopPropagation(); show(index + 1); });
    modal.addEventListener('click', e => { if (e.target === modal) close(); });

    // Click/tap the image to toggle a simple zoom (a lightweight stand-in
    // for pinch-zoom that also works with mouse on desktop)
    modalImg.addEventListener('click', e => {
      e.stopPropagation();
      zoomed = !zoomed;
      modalImg.classList.toggle('zoomed', zoomed);
    });

    document.addEventListener('keydown', e => {
      if (modal.style.display !== 'flex') return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') show(index + 1);
      if (e.key === 'ArrowLeft') show(index - 1);
    });

    // Swipe left/right on mobile to move between certificates
    let touchStartX = 0;
    modal.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    modal.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    }, { passive: true });
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

  function initVcfDownload() {
    const btn = document.getElementById('add-to-contacts');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const vcf = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'N:Sahu;Rahul;;;',
        'FN:Rahul Sahu',
        'TITLE:Electrical & Electronics Engineer',
        'EMAIL;TYPE=INTERNET:sahurahuloc@gmail.com',
        'TEL;TYPE=CELL:+917007696657',
        'URL:https://www.linkedin.com/in/rahul-sahu-eee/',
        'END:VCARD'
      ].join('\r\n');
      const blob = new Blob([vcf], { type: 'text/vcard' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Rahul_Sahu.vcf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    initProjectTabs();
    initCertModal();
    initCopyButtons();
    initVcfDownload();
  });
})();
