/* ==========================================================================
   I18N ENGINE
   - Default language on first load / reload: English (per spec).
   - Persists the user's later choice to localStorage for return visits.
   - Reads window.PORTFOLIO_I18N (data/translations.js), applies by
     dot-path key found in each element's [data-i18n] attribute.
   ========================================================================== */
const I18N = (() => {
  const DICT = window.PORTFOLIO_I18N || {};
  const SUPPORTED = ['en', 'ja', 'hi'];
  const STORAGE_KEY = 'portfolio_lang';

  function getInitialLang() {
    // Spec: English is primary on first open / reload. Only honor a stored
    // choice if the user has explicitly switched language before.
    // localStorage can throw (SecurityError) when the page is opened as a
    // local file:// URL, in private/incognito mode with storage disabled,
    // or in an iframe with storage blocked — none of that should be able
    // to take the whole translation pipeline down with it.
    let stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* fall through to 'en' */ }
    return SUPPORTED.includes(stored) ? stored : 'en';
  }

  function resolve(path, langObj) {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), langObj);
  }

  function applyLang(lang) {
    if (!SUPPORTED.includes(lang)) lang = 'en';
    const table = DICT[lang] || DICT.en;
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', 'ltr');

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = resolve(key, table);
      if (val === undefined) return;
      el.innerHTML = val;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      // format: data-i18n-attr="title:dock.theme,placeholder:cmdk.placeholder"
      const spec = el.getAttribute('data-i18n-attr');
      spec.split(',').forEach(pair => {
        const [attr, key] = pair.split(':').map(s => s.trim());
        const val = resolve(key, table);
        if (val !== undefined) el.setAttribute(attr, val);
      });
    });

    // Marquee (array of strings) — rebuild the scrolling strip
    const marqueeEl = document.getElementById('marquee-track');
    if (marqueeEl && Array.isArray(table.marquee)) {
      const items = table.marquee;
      const build = () => items.map(t => `<span>${t}</span><span class="accent">◆</span>`).join('');
      marqueeEl.innerHTML = build() + build();
    }

    document.querySelectorAll('.lang-menu button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    const langBtnLabel = document.getElementById('lang-current-label');
    if (langBtnLabel) langBtnLabel.textContent = lang.toUpperCase();

    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  function setLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* language still applies this session, just won't persist */ }
    applyLang(lang);
  }

  function init() {
    applyLang(getInitialLang());
    document.querySelectorAll('.lang-menu button[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        setLang(btn.dataset.lang);
        document.getElementById('lang-menu')?.classList.remove('open');
      });
    });
  }

  return { init, setLang, get current() { return document.documentElement.getAttribute('lang') || 'en'; } };
})();

document.addEventListener('DOMContentLoaded', I18N.init);