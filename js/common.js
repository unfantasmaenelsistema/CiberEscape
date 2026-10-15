// Tema, idioma y textos compartidos por las dos páginas.
const store = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  del(k) { try { localStorage.removeItem(k); } catch (e) {} }
};

let LANG = store.get('ce_lang') || ((navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en');
const T = () => I18N[LANG];

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const b = document.getElementById('themeBtn');
  if (b) b.textContent = theme === 'light' ? T().themeDark : T().themeLight;
}

// Rellena todo elemento con data-t="clave" (texto) o data-th="clave" (HTML de confianza).
function applyTexts() {
  document.documentElement.lang = LANG;
  document.querySelectorAll('[data-t]').forEach(el => { el.textContent = T()[el.dataset.t]; });
  document.querySelectorAll('[data-th]').forEach(el => { el.innerHTML = T()[el.dataset.th]; });
  document.querySelectorAll('[data-tp]').forEach(el => { el.placeholder = T()[el.dataset.tp]; });
  const lb = document.getElementById('langBtn');
  if (lb) lb.textContent = T().lang;
  applyTheme(document.documentElement.getAttribute('data-theme') || 'dark');
}

function initChrome(onLangChange) {
  applyTexts();
  document.getElementById('themeBtn').addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    store.set('ce_theme', next);
    applyTheme(next);
  });
  document.getElementById('langBtn').addEventListener('click', () => {
    LANG = LANG === 'es' ? 'en' : 'es';
    store.set('ce_lang', LANG);
    applyTexts();
    if (onLangChange) onLangChange();
  });
}
