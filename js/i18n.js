// Textos ES/EN de CiberEscape. Las respuestas no dependen del idioma.
const I18N = {
  es: {
    brandSub: 'UN FANTASMA EN EL SISTEMA',
    themeLight: '☀ CLARO', themeDark: '☾ OSCURO', lang: 'EN',
    footer: 'Escape room educativo. CorpTarget es ficticia: todo ocurre dentro de esta web.',
    source: 'Código fuente', writeup: 'Writeup (spoilers)',
    // Centro de comando
    pageTitle: 'CiberEscape — Centro de Comando',
    winTitle: 'Escapar.exe — Módulo de validación',
    h1: 'Prueba del analista',
    lead: 'Has quedado encerrado en el centro de comando de CorpTarget. Cinco códigos abren la puerta. Cada uno se consigue investigando esta misma web con técnicas reales de ciberseguridad.',
    openCracker: '🛠️ Abrir la herramienta de cracking',
    progress: (n) => `Desafío ${n} de 5`,
    elapsed: (t) => `Tiempo: ${t}`,
    hintsUsed: (n) => `Pistas usadas: ${n}`,
    current: 'Desafío actual',
    showHint: 'Mostrar pista extra',
    inputLabel: 'Introduce el código de validación:',
    validate: 'Validar código',
    checking: 'Verificando…',
    ok: (n) => `¡Código ${n} correcto! Se desbloquea el siguiente desafío.`,
    bad: 'Código incorrecto. ¡Sigue investigando!',
    empty: 'Escribe un código antes de validar.',
    doneTitle: '¡HAS ESCAPADO!',
    doneText: (t, h) => `Has resuelto los cinco desafíos en ${t} usando ${h} pista(s) extra. Esta es tu bandera maestra:`,
    reset: 'Reiniciar la partida',
    resetConfirm: '¿Seguro que quieres borrar tu progreso?',
    challenges: [
      {
        theme: 'Criptografía: hashes',
        clue: 'El administrador dejó un <b>hash MD5</b> olvidado en el <b>código fuente</b> de esta página. Encuéntralo y rómpelo con la herramienta de cracking: la contraseña que esconde es el primer código.',
        extra: 'Pulsa <code>Ctrl+U</code> (ver código fuente) y baja hasta el final: hay un comentario HTML. Copia el hash y lanza el <b>ataque de diccionario</b> en la herramienta de cracking.'
      },
      {
        theme: 'Búsqueda de vulnerabilidades (CVE)',
        clue: 'Con esa contraseña entras en el correo del administrador. El servidor muestra el banner <code>Microsoft Exchange Server 2019 CU8</code>, sin parches desde 2020. Busca el <b>CVE</b> de la vulnerabilidad <b>SSRF</b> que abrió la cadena <b>ProxyLogon</b> en marzo de 2021.',
        extra: 'Busca «ProxyLogon» en el NVD (<code>nvd.nist.gov</code>) o en el aviso de Microsoft. La cadena incluye varios CVE; el SSRF es el que permite el primer paso sin autenticación. Formato: <code>CVE-AAAA-NNNNN</code>.'
      },
      {
        theme: 'Codificación: Base64',
        clue: 'Esta página carga un <b>script de telemetría externo</b> que guarda una clave de API «ofuscada». Encuéntralo y <b>decodifica</b> la clave: es el tercer código.',
        extra: 'Abre las herramientas de desarrollador (<code>F12</code>) → pestaña <b>Fuentes</b> o <b>Red</b> y busca <code>js/telemetry.js</code>. Los <code>==</code> del final delatan Base64: usa <code>atob("…")</code> en la consola o CyberChef.'
      },
      {
        theme: 'Debilidades comunes (CWE)',
        clue: 'En ese mismo script hay una nota del desarrollador: el buscador devuelve el parámetro <code>?q=</code> dentro de la página <b>sin escapar</b>. Eso es una <b>XSS reflejada</b>. ¿Qué código <b>CWE</b> la identifica?',
        extra: 'Busca «Cross-site Scripting» en el catálogo de MITRE (<code>cwe.mitre.org</code>). Formato: <code>CWE-NN</code>.'
      },
      {
        theme: 'Fallo de configuración',
        clue: 'El administrador pidió a los buscadores que no indexaran una <b>copia de seguridad</b>… y lo dejó escrito en un <b>fichero público estándar</b> de la raíz de esta web. Encuentra la copia y lee el código de validación.',
        extra: 'Los buscadores leen <code>robots.txt</code>. Lo que aparece en <code>Disallow</code> no está protegido, solo «escondido»: ábrelo en el navegador.'
      }
    ],
    // Herramienta de cracking
    crackerTitle: 'CiberEscape — Herramienta de cracking MD5',
    crackerWin: 'Herramienta_MD5.exe — Descifrador de hash',
    crackerH1: 'Descifrador de hash MD5',
    crackerLead: 'MD5 no se puede «descifrar»: es una función resumen de un solo sentido. Lo que se hace es <b>adivinar</b>: calcular el MD5 de muchas palabras candidatas y comparar. Si una coincide, has encontrado la contraseña.',
    targetLabel: 'Hash MD5 objetivo (32 caracteres hexadecimales):',
    targetPh: 'Pega aquí el hash que encuentres',
    wordLabel: 'Probar una palabra concreta:',
    wordPh: 'Ej.: Password_10',
    tryWord: 'Probar palabra',
    dictTitle: 'Ataque de diccionario',
    dictText: (n) => `Prueba automáticamente las ${n} contraseñas de <a href="wordlist.txt" target="_blank" rel="noopener">wordlist.txt</a>, una lista de contraseñas habituales como las que circulan en filtraciones reales.`,
    runDict: '▶ Lanzar ataque de diccionario',
    badHash: 'El hash debe tener exactamente 32 caracteres hexadecimales (0-9, A-F).',
    needWord: 'Escribe una palabra para probar.',
    noMatch: (w, h) => `«${w}» → ${h}. No coincide.`,
    match: (w) => `¡COINCIDENCIA! La contraseña es <code></code>. Úsala en el centro de comando.`,
    dictNoMatch: (n, ms) => `Probadas ${n} palabras en ${ms} ms. Ninguna coincide: o el hash está mal copiado, o la contraseña no está en el diccionario.`,
    dictMatch: (n, ms) => `Encontrada tras ${n} intentos en ${ms} ms.`,
    wordlistError: 'No se pudo cargar wordlist.txt. Si abres la página como archivo local, sírvela con un servidor (por ejemplo, python -m http.server).',
    back: '← Volver al centro de comando'
  },
  en: {
    brandSub: 'A GHOST IN THE SYSTEM',
    themeLight: '☀ LIGHT', themeDark: '☾ DARK', lang: 'ES',
    footer: 'Educational escape room. CorpTarget is fictitious: everything happens inside this website.',
    source: 'Source code', writeup: 'Writeup (spoilers)',
    pageTitle: 'CiberEscape — Command Center',
    winTitle: 'Escape.exe — Validation module',
    h1: 'The analyst\'s test',
    lead: 'You are locked inside CorpTarget\'s command center. Five codes open the door. Each one is obtained by investigating this very website with real cybersecurity techniques.',
    openCracker: '🛠️ Open the cracking tool',
    progress: (n) => `Challenge ${n} of 5`,
    elapsed: (t) => `Time: ${t}`,
    hintsUsed: (n) => `Hints used: ${n}`,
    current: 'Current challenge',
    showHint: 'Show extra hint',
    inputLabel: 'Enter the validation code:',
    validate: 'Validate code',
    checking: 'Checking…',
    ok: (n) => `Code ${n} correct! The next challenge is unlocked.`,
    bad: 'Wrong code. Keep investigating!',
    empty: 'Type a code before validating.',
    doneTitle: 'YOU ESCAPED!',
    doneText: (t, h) => `You solved all five challenges in ${t} using ${h} extra hint(s). Here is your master flag:`,
    reset: 'Restart the game',
    resetConfirm: 'Are you sure you want to erase your progress?',
    challenges: [
      {
        theme: 'Cryptography: hashes',
        clue: 'The admin left a forgotten <b>MD5 hash</b> in this page\'s <b>source code</b>. Find it and crack it with the cracking tool: the password it hides is the first code.',
        extra: 'Press <code>Ctrl+U</code> (view source) and scroll to the bottom: there is an HTML comment. Copy the hash and run the <b>dictionary attack</b> in the cracking tool.'
      },
      {
        theme: 'Vulnerability research (CVE)',
        clue: 'With that password you get into the admin\'s mailbox. The server shows the banner <code>Microsoft Exchange Server 2019 CU8</code>, unpatched since 2020. Find the <b>CVE</b> of the <b>SSRF</b> vulnerability that started the <b>ProxyLogon</b> chain in March 2021.',
        extra: 'Search «ProxyLogon» on the NVD (<code>nvd.nist.gov</code>) or in Microsoft\'s advisory. The chain has several CVEs; the SSRF is the one that enables the first, unauthenticated step. Format: <code>CVE-YYYY-NNNNN</code>.'
      },
      {
        theme: 'Encoding: Base64',
        clue: 'This page loads an <b>external telemetry script</b> holding an «obfuscated» API key. Find it and <b>decode</b> the key: it is the third code.',
        extra: 'Open the developer tools (<code>F12</code>) → <b>Sources</b> or <b>Network</b> tab and look for <code>js/telemetry.js</code>. The trailing <code>==</code> gives Base64 away: use <code>atob("…")</code> in the console or CyberChef.'
      },
      {
        theme: 'Common weaknesses (CWE)',
        clue: 'That same script has a developer note: the search feature echoes the <code>?q=</code> parameter into the page <b>unescaped</b>. That is a <b>reflected XSS</b>. Which <b>CWE</b> code identifies it?',
        extra: 'Search «Cross-site Scripting» in MITRE\'s catalogue (<code>cwe.mitre.org</code>). Format: <code>CWE-NN</code>.'
      },
      {
        theme: 'Misconfiguration',
        clue: 'The admin asked search engines not to index a <b>backup copy</b>… and wrote it down in a <b>standard public file</b> at the root of this website. Find the backup and read the validation code.',
        extra: 'Search engines read <code>robots.txt</code>. Whatever is under <code>Disallow</code> is not protected, only «hidden»: open it in the browser.'
      }
    ],
    crackerTitle: 'CiberEscape — MD5 cracking tool',
    crackerWin: 'MD5_Tool.exe — Hash cracker',
    crackerH1: 'MD5 hash cracker',
    crackerLead: 'MD5 cannot be «decrypted»: it is a one-way hash function. What you do is <b>guess</b>: hash many candidate words and compare. If one matches, you have found the password.',
    targetLabel: 'Target MD5 hash (32 hexadecimal characters):',
    targetPh: 'Paste the hash you find here',
    wordLabel: 'Try a specific word:',
    wordPh: 'E.g.: Password_10',
    tryWord: 'Try word',
    dictTitle: 'Dictionary attack',
    dictText: (n) => `Automatically tries the ${n} passwords in <a href="wordlist.txt" target="_blank" rel="noopener">wordlist.txt</a>, a list of common passwords like those found in real leaks.`,
    runDict: '▶ Run dictionary attack',
    badHash: 'The hash must be exactly 32 hexadecimal characters (0-9, A-F).',
    needWord: 'Type a word to try.',
    noMatch: (w, h) => `«${w}» → ${h}. No match.`,
    match: (w) => `MATCH! The password is <code></code>. Use it in the command center.`,
    dictNoMatch: (n, ms) => `Tried ${n} words in ${ms} ms. None matched: either the hash was copied wrong, or the password is not in the dictionary.`,
    dictMatch: (n, ms) => `Found after ${n} attempts in ${ms} ms.`,
    wordlistError: 'Could not load wordlist.txt. If you opened the page as a local file, serve it with a web server (e.g. python -m http.server).',
    back: '← Back to the command center'
  }
};
