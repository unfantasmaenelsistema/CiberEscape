/*
 * CorpTarget Analytics SDK v0.9 (build interno)
 * Mantenido por: equipo web
 */
(function () {
  var CONFIG = {
    endpoint: 'https://telemetry.corptarget.example/v1/events',
    // Clave "ofuscada" para que no se vea en claro. (Spoiler: Base64 no es cifrado.)
    apiKey: 'QVBJS0VZX0RFQ09ERQ==',
    sampleRate: 0.25
  };

  // TODO (dev): el buscador interno /search devuelve el parámetro q sin escapar:
  //   res.send('<p>Resultados para ' + req.query.q + '</p>');
  // Pendiente de revisar con seguridad antes de la auditoría.

  function track(event) {
    // En este escape room no se envía nada: todo es local.
    return { event: event, key: CONFIG.apiKey.length, at: Date.now() };
  }
  window.CorpTelemetry = { track: track };
})();
