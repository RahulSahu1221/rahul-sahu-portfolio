/* ==========================================================================
   SKILL CHIPS — turns the <br>-separated skill list inside each
   .skill-items element into individual tag-style chips, matching the
   tech-tag language already used on project cards. Runs after every
   i18n application (translation source stays a simple <br>-joined
   string in data/translations.js — this just re-renders it).
   ========================================================================== */
(function () {
  function render() {
    document.querySelectorAll('.skill-items').forEach(el => {
      const raw = el.innerHTML;
      if (!raw || raw.indexOf('skill-chip') !== -1) return; // already chipped this pass
      const items = raw.split(/<br\s*\/?>/i).map(s => s.trim()).filter(Boolean);
      el.innerHTML = items.map((item, i) => `<span class="skill-chip" style="--i:${i}">${item}</span>`).join('');
      el.classList.add('skill-chips-wrap');
    });
  }

  // i18n.js sets raw <br>-joined innerHTML on every langchange (including
  // the very first application on load) — always re-chip right after.
  document.addEventListener('langchange', render);
  document.addEventListener('DOMContentLoaded', () => setTimeout(render, 0));
})();
