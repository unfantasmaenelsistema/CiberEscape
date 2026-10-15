// Centro de comando: validación de los cinco códigos.
// Las respuestas no aparecen en claro: solo su SHA-256. La bandera final va cifrada
// con una clave derivada de las cinco respuestas, así que no sale en el código fuente.

const ANSWER_SHA256 = [
  '2396b68f7ca5a29b2444886f898614b71e6b876a66b237c684463333a4625f3e',
  '9b7d9835bdc687ab8e89d6cbb143f0d356fdf615faa718651ddf3c52328487ee',
  '150853fd47815759944535e2e722b0dc9f9c2e3f94573cabd22dfdf400cba7bb',
  '3915c06db2e2c3549144ef23d60217b8b2c48add2fdd04bf0feece70345552da',
  'cd1d86e0e387dab1d6232592933e0077e3840b3f1c6752ce4b5ac1f42b5f4d13'
];
// bandera XOR SHA-512(respuesta1|respuesta2|…|respuesta5)
const FLAG_CIPHER = 'b7786b3ec9730dce42a67619721ad4a9c60b4835bcc00d8a502953dd4432073379dc9060ca550c79d295257d';

const $ = (id) => document.getElementById(id);
const hex = (buf) => [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
const sha = async (alg, text) => crypto.subtle.digest(alg, new TextEncoder().encode(text));
const normalize = (s) => s.trim().toUpperCase();

function loadState() {
  try {
    const s = JSON.parse(store.get('ce_state'));
    if (s && Array.isArray(s.solved) && Array.isArray(s.hints)) return s;
  } catch (e) {}
  return { solved: [], hints: [false, false, false, false, false], start: Date.now(), end: null };
}
let state = loadState();
const save = () => store.set('ce_state', JSON.stringify(state));
save();

function fmtTime(ms) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = s % 60;
  return (h ? h + ':' : '') + String(m).padStart(h ? 2 : 1, '0') + ':' + String(r).padStart(2, '0');
}

async function decryptFlag() {
  const key = new Uint8Array(await sha('SHA-512', state.solved.join('|')));
  const bytes = FLAG_CIPHER.match(/../g).map((h, i) => parseInt(h, 16) ^ key[i]);
  return new TextDecoder().decode(new Uint8Array(bytes));
}

function render() {
  const n = state.solved.length;
  const done = n >= 5;
  $('progress').innerHTML = [0, 1, 2, 3, 4].map(i =>
    `<span class="${i < n ? 'done' : i === n ? 'current' : ''}"></span>`).join('');
  $('progressText').textContent = T().progress(Math.min(n + 1, 5));
  $('hintsText').textContent = T().hintsUsed(state.hints.filter(Boolean).length);
  tick();

  $('play').hidden = done;
  $('done').hidden = !done;
  if (done) {
    const time = fmtTime((state.end || Date.now()) - state.start);
    $('doneText').textContent = T().doneText(time, state.hints.filter(Boolean).length);
    decryptFlag().then(f => { $('flag').textContent = f; });
    return;
  }
  const ch = T().challenges[n];
  $('chTitle').textContent = ch.theme;
  $('chClue').innerHTML = ch.clue;
  $('chExtra').innerHTML = ch.extra;
  $('chExtra').hidden = !state.hints[n];
  $('hintBtn').hidden = state.hints[n];
}

function tick() {
  const end = state.end || Date.now();
  $('timeText').textContent = T().elapsed(fmtTime(end - state.start));
}

function setMsg(kind, text) {
  const m = $('message');
  m.className = 'msg ' + kind;
  m.textContent = text;
}

async function validate() {
  if (state.solved.length >= 5) return;
  const input = normalize($('codeInput').value);
  if (!input) return setMsg('bad', T().empty);
  setMsg('info', T().checking);
  const n = state.solved.length;
  const digest = hex(await sha('SHA-256', input));
  if (digest === ANSWER_SHA256[n]) {
    state.solved.push(input);
    if (state.solved.length === 5) state.end = Date.now();
    save();
    $('codeInput').value = '';
    setMsg('ok', T().ok(n + 1));
    render();
    if (state.solved.length < 5) $('codeInput').focus();
  } else {
    setMsg('bad', T().bad);
  }
}

$('validateBtn').addEventListener('click', validate);
$('codeInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') validate(); });
$('hintBtn').addEventListener('click', () => { state.hints[state.solved.length] = true; save(); render(); });
$('resetBtn').addEventListener('click', () => {
  if (!confirm(T().resetConfirm)) return;
  store.del('ce_state');
  state = loadState();
  save();
  setMsg('info', '');
  $('message').className = 'msg';
  $('message').innerHTML = '&nbsp;';
  render();
});

initChrome(render);
render();
setInterval(() => { if (!state.end) tick(); }, 1000);
