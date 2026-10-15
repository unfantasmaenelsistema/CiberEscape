// Herramienta de cracking: MD5 real (js/md5.js) contra una palabra o contra wordlist.txt.
const $ = (id) => document.getElementById(id);
let WORDS = [];
let running = false;

function setMsg(kind, text) {
  const m = $('message');
  m.className = 'msg ' + kind;
  m.textContent = text;
}

// Muestra la coincidencia insertando la palabra como texto (nunca como HTML).
function showMatch(word, extra) {
  const m = $('message');
  m.className = 'msg ok';
  m.innerHTML = T().match();
  m.querySelector('code').textContent = word;
  if (extra) m.append(' ' + extra);
}

function targetHash() {
  const h = $('targetHash').value.trim().toLowerCase();
  return /^[0-9a-f]{32}$/.test(h) ? h : null;
}

function renderDictText() {
  $('dictText').innerHTML = T().dictText(WORDS.length || '…');
}

async function loadWordlist() {
  try {
    const res = await fetch('wordlist.txt', { cache: 'no-cache' });
    if (!res.ok) throw new Error(res.status);
    WORDS = (await res.text()).split(/\r?\n/).map(w => w.trim()).filter(w => w && !w.startsWith('#'));
  } catch (e) {
    WORDS = [];
    setMsg('bad', T().wordlistError);
  }
  renderDictText();
}

function tryWord() {
  const h = targetHash();
  if (!h) return setMsg('bad', T().badHash);
  const w = $('wordToTest').value.trim();
  if (!w) return setMsg('bad', T().needWord);
  const got = md5(w);
  if (got === h) showMatch(w);
  else setMsg('bad', T().noMatch(w, got.toUpperCase()));
}

async function runDictionary() {
  if (running) return;
  const h = targetHash();
  if (!h) return setMsg('bad', T().badHash);
  if (!WORDS.length) await loadWordlist();
  if (!WORDS.length) return;

  running = true;
  $('dictBtn').disabled = true;
  const log = $('log');
  log.textContent = '';
  const t0 = performance.now();
  let found = null, i = 0;

  // Por lotes, para que el navegador pinte el registro mientras trabaja.
  for (; i < WORDS.length && !found; i++) {
    const w = WORDS[i];
    const d = md5(w);
    if (d === h) found = w;
    if (i % 4 === 0 || found) {
      log.textContent += `[${String(i + 1).padStart(3, '0')}] md5("${w}") = ${d}${found ? '   <== MATCH' : ''}\n`;
      log.scrollTop = log.scrollHeight;
      await new Promise(r => setTimeout(r, 12));
    }
  }
  const ms = Math.round(performance.now() - t0);
  if (found) showMatch(found, T().dictMatch(i, ms));
  else setMsg('bad', T().dictNoMatch(i, ms));
  running = false;
  $('dictBtn').disabled = false;
}

$('tryBtn').addEventListener('click', tryWord);
$('wordToTest').addEventListener('keydown', (e) => { if (e.key === 'Enter') tryWord(); });
$('dictBtn').addEventListener('click', runDictionary);

initChrome(renderDictText);
loadWordlist();
