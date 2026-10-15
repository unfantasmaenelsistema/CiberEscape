# CiberEscape

**Escape room de ciberseguridad en el navegador** de [Un Fantasma en el Sistema](https://www.unfantasmaenelsistema.com). Has quedado encerrado en el centro de comando de *CorpTarget*: cinco códigos abren la puerta y cada uno se consigue investigando la propia web con técnicas reales.

▶ **Jugar:** https://unfantasmaenelsistema.github.io/CiberEscape/

| # | Desafío | Qué se practica |
|---|---|---|
| 1 | Criptografía: hashes | Revisar código fuente, MD5 y ataque de diccionario |
| 2 | Búsqueda de vulnerabilidades | Investigar un CVE real a partir de un producto y una versión |
| 3 | Codificación | Encontrar un script externo y decodificar Base64 |
| 4 | Debilidades comunes | Clasificar una vulnerabilidad con su código CWE |
| 5 | Fallo de configuración | `robots.txt` y ficheros de copia expuestos |

- Incluye una **herramienta de cracking MD5** con ataque de diccionario real (MD5 implementado en el propio repositorio, sin librerías externas).
- Pista extra opcional en cada desafío, cronómetro y contador de pistas para usarlo en clase.
- Las respuestas se comprueban por **SHA-256** y la bandera final va cifrada: no se puede sacar del código fuente.
- Español e inglés, tema claro y oscuro (se recuerdan entre visitas).

## Writeup

La solución completa, con capturas y una guía para docentes, está en [`writeup/WRITEUP.md`](writeup/WRITEUP.md). **Contiene spoilers.**

## Ejecutar en local

```bash
python -m http.server
```

y abrir `http://localhost:8000`. Hace falta un servidor (no basta con abrir el HTML) para que el ataque de diccionario pueda cargar `wordlist.txt`.

## Estructura

```
index.html          centro de comando
hash_cracker.html   herramienta de cracking MD5
css/style.css       estilos (claro/oscuro)
js/i18n.js          textos ES/EN
js/common.js        tema e idioma
js/game.js          validación de códigos y bandera cifrada
js/md5.js           MD5 (RFC 1321) en JavaScript puro
js/cracker.js       ataque de palabra y de diccionario
js/telemetry.js     ← forma parte del reto
robots.txt          ← forma parte del reto
backup/config.txt   ← forma parte del reto
wordlist.txt        diccionario del ataque
writeup/            solución con capturas
```

## English

**CiberEscape** is a browser-based cybersecurity escape room: five codes (MD5 cracking, CVE research, Base64, CWE classification and an exposed backup found through `robots.txt`). Answers are checked by SHA-256 and the final flag is encrypted, so it cannot be pulled from the source. Bilingual (ES/EN), light/dark themes. Full walkthrough with screenshots in [`writeup/WRITEUP.md`](writeup/WRITEUP.md) (Spanish, spoilers).

## Licencia / License

[MIT](LICENSE) © Un Fantasma en el Sistema
