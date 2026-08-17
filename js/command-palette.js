/* ==========================================================================
   COMMAND PALETTE — ⌘K / Ctrl+K
   ========================================================================== */
(function () {
  function buildItems() {
    const t = (window.PORTFOLIO_I18N[I18N.current] || window.PORTFOLIO_I18N.en).cmdk;
    const iconResume = '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';
    const iconProjects = '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>';
    const iconGithub = '<svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>';
    const iconLinkedin = '<svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>';
    const iconMail = '<svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="m22 6-10 7L2 6"/></svg>';
    const iconSun = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    const iconGlobe = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
    const iconFocus = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>';
    const iconArrow = '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

    return [
      { group: t.groupActions, label: t.resume, icon: iconResume, action: () => window.open('assets/docs/Rahul_Sahu_Resume.pdf', '_blank') },
      { group: t.groupActions, label: t.viewProjects, icon: iconProjects, action: () => jump('#projects') },
      { group: t.groupActions, label: t.github, icon: iconGithub, action: () => window.open('https://github.com/RahulSahu1221', '_blank') },
      { group: t.groupActions, label: t.linkedin, icon: iconLinkedin, action: () => window.open('https://www.linkedin.com/in/rahul-sahu-eee/', '_blank') },
      { group: t.groupActions, label: t.email, icon: iconMail, action: () => (window.location.href = 'mailto:sahurahuloc@gmail.com') },
      { group: t.groupActions, label: t.toggleTheme, icon: iconSun, action: () => window.PortfolioTheme && window.PortfolioTheme.toggle() },
      { group: t.groupActions, label: t.switchLang, icon: iconGlobe, action: () => document.getElementById('lang-menu')?.classList.toggle('open') },
      { group: t.groupActions, label: t.focusMode, icon: iconFocus, action: () => document.body.classList.toggle('focus-mode') },
      { group: t.groupNavigate, label: t.goAbout, icon: iconArrow, action: () => jump('#about') },
      { group: t.groupNavigate, label: t.goExperience, icon: iconArrow, action: () => jump('#experience') },
      { group: t.groupNavigate, label: t.goEducation, icon: iconArrow, action: () => jump('#education') },
      { group: t.groupNavigate, label: t.goSkills, icon: iconArrow, action: () => jump('#skills') },
      { group: t.groupNavigate, label: t.goProjects, icon: iconArrow, action: () => jump('#projects') },
      { group: t.groupNavigate, label: t.goCerts, icon: iconArrow, action: () => jump('#certifications') },
      { group: t.groupNavigate, label: t.goContact, icon: iconArrow, action: () => jump('#contact') },
    ];
  }

  function jump(sel) {
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function init() {
    const backdrop = document.getElementById('cmdk-backdrop');
    const input = document.getElementById('cmdk-input');
    const list = document.getElementById('cmdk-list');
    if (!backdrop || !input || !list) return;

    let items = buildItems();
    let selected = 0;

    function render(filter) {
      const t = (window.PORTFOLIO_I18N[I18N.current] || window.PORTFOLIO_I18N.en).cmdk;
      const q = (filter || '').trim().toLowerCase();
      const filtered = items.filter(it => it.label.toLowerCase().includes(q));
      list.innerHTML = '';
      if (!filtered.length) {
        list.innerHTML = `<div class="cmdk-empty">${t.noResults}</div>`;
        return;
      }
      let lastGroup = null;
      filtered.forEach((it, i) => {
        if (it.group !== lastGroup) {
          const label = document.createElement('div');
          label.className = 'cmdk-group-label';
          label.textContent = it.group;
          list.appendChild(label);
          lastGroup = it.group;
        }
        const row = document.createElement('div');
        row.className = 'cmdk-item' + (i === selected ? ' selected' : '');
        row.innerHTML = `${it.icon}<span class="cmdk-item-label">${highlightMatch(it.label, q)}</span>`;
        row.addEventListener('click', () => { it.action(); close(); });
        row.addEventListener('mouseenter', () => { selected = i; updateSelection(); });
        list.appendChild(row);
      });
    }

    function highlightMatch(label, q) {
      if (!q) return label;
      const idx = label.toLowerCase().indexOf(q);
      if (idx === -1) return label;
      return label.slice(0, idx) + '<mark class="cmdk-match">' + label.slice(idx, idx + q.length) + '</mark>' + label.slice(idx + q.length);
    }

    function updateSelection() {
      Array.from(list.querySelectorAll('.cmdk-item')).forEach((el, i) => el.classList.toggle('selected', i === selected));
    }

    function open() {
      items = buildItems();
      selected = 0;
      render('');
      backdrop.classList.add('open');
      input.value = '';
      setTimeout(() => input.focus(), 60);
    }
    function close() { backdrop.classList.remove('open'); }

    document.addEventListener('keydown', e => {
      const isK = e.key === 'k' || e.key === 'K';
      if ((e.metaKey || e.ctrlKey) && isK) { e.preventDefault(); backdrop.classList.contains('open') ? close() : open(); }
      if (e.key === 'Escape') close();
      if (!backdrop.classList.contains('open')) return;
      const visible = list.querySelectorAll('.cmdk-item');
      if (e.key === 'ArrowDown') { e.preventDefault(); selected = Math.min(selected + 1, visible.length - 1); updateSelection(); }
      if (e.key === 'ArrowUp') { e.preventDefault(); selected = Math.max(selected - 1, 0); updateSelection(); }
      if (e.key === 'Enter') {
        e.preventDefault();
        const filtered = items.filter(it => it.label.toLowerCase().includes(input.value.trim().toLowerCase()));
        if (filtered[selected]) { filtered[selected].action(); close(); }
      }
    });

    input.addEventListener('input', () => { selected = 0; render(input.value); });
    backdrop.addEventListener('click', e => { if (e.target === backdrop) close(); });
    document.querySelectorAll('[data-cmdk-open]').forEach(btn => btn.addEventListener('click', open));
    document.addEventListener('langchange', () => { items = buildItems(); if (backdrop.classList.contains('open')) render(input.value); });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
