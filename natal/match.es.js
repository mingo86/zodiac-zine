/* ============================================================
   ZODIAC · MATCH DEL DÍA (ES)
   Cruza la compatibilidad de base (motor Parejas, lente amor)
   con el "clima amoroso" del día para cada signo (tránsitos
   de Venus/Luna/Marte). Encuentra a quien es compatible contigo
   Y está viviendo un buen día de amor, hoy.
   Depende de: window.NATAL, window.ZODIAC (coppie/engine.js), window.TRANSIT
   API: window.MATCH_ES.ofDay(userSignKey, jsDate)
   ============================================================ */
(function () {
  const N = window.NATAL, T = window.TRANSIT;
  const Z = () => window.ZODIAC; // letto al volo: rispetta ZWIRE.activate (rimappatura lingua)

  function elScore(a, b) {
    if (a === b) return 5;
    const k = [a, b].sort().join("|");
    return { "aria|fuoco": 4, "acqua|terra": 4, "acqua|aria": 3, "aria|terra": 3, "fuoco|terra": 3, "acqua|fuoco": 2 }[k] || 3;
  }
  const h100 = (a, b) => (elScore(a, b) - 1) / 4 * 100;
  const signByKey = k => N.SIGNS.find(s => s.k === k);
  const low = s => s ? s.charAt(0).toLowerCase() + s.slice(1) : s;

  function loveWeather(signKey, trans) {
    const X = signByKey(signKey);
    const venus = trans.find(t => t.key === "Venus").sign;
    const moon = trans.find(t => t.key === "Moon").sign;
    const mars = trans.find(t => t.key === "Mars").sign;
    let w = 0.5 * h100(venus.el, X.el) + 0.3 * h100(moon.el, X.el) + 0.2 * h100(mars.el, X.el);
    if (venus.k === X.k) w = Math.min(100, w + 15);
    if (moon.k === X.k) w = Math.min(100, w + 8);
    return Math.round(w);
  }
  function weatherLabel(w) {
    if (w >= 78) return "día de amor brillante";
    if (w >= 62) return "buen momento en el amor";
    if (w >= 45) return "amor dentro de la media";
    return "amor un poco apagado";
  }

  // mini-horóscopo de amor del día para un signo (texto detallado)
  function loveHoroscope(signKey, trans) {
    const X = signByKey(signKey);
    const venus = trans.find(t => t.key === "Venus").sign;
    const moon = trans.find(t => t.key === "Moon").sign;
    const mars = trans.find(t => t.key === "Mars").sign;
    const w = loveWeather(signKey, trans);
    const parts = [];

    // Venus (el planeta del amor: peso mayor)
    const vh = elScore(venus.el, X.el);
    if (venus.k === X.k)
      parts.push(`<b>Venus está de visita en tu casa</b>: estos días eres de los signos más mimados por el amor, con encanto y magnetismo al máximo. Te basta con estar.`);
    else if (vh >= 4)
      parts.push(`<b>Venus en ${venus.n}</b> está en plena sintonía con tu elemento (${X.el}): el amor fluye solo, te sientes deseable y las puertas se abren casi por sí solas.`);
    else if (vh === 3)
      parts.push(`<b>Venus en ${venus.n}</b> te mira con buenos ojos: pequeñas ocasiones de dulzura y ternura, si llevas la antena encendida para captarlas.`);
    else
      parts.push(`<b>Venus en ${venus.n}</b> juega en un campo distinto al tuyo: en el amor, hoy, mejor no forzar y dejar que las cosas maduren con calma.`);

    // Luna (humor afectivo del día)
    const mh = elScore(moon.el, X.el);
    if (mh >= 4)
      parts.push(`La <b>Luna en ${moon.n}</b> acompaña tu necesidad de cercanía: estás más abierto, cariñoso y dispuesto a lanzarte.`);
    else
      parts.push(`La <b>Luna en ${moon.n}</b> te vuelve un punto más reservado: antes de abrirte quieres sentirte seguro, y está bien que así sea.`);

    // Marte (deseo, chispa)
    const ah = elScore(mars.el, X.el);
    if (ah >= 4)
      parts.push(`<b>Marte</b> añade garra y deseo físico: hay chispa, y las ganas de dar el primer paso no faltan.`);
    else
      parts.push(`<b>Marte</b> trae una pizca de nerviosismo: ojo con los arranques de impaciencia y los celos inútiles.`);

    return { weather: w, label: weatherLabel(w), text: parts.join(" ") };
  }

  function ofDay(userSignKey, jsDate) {
    const d = jsDate || new Date();
    const trans = T.transitsAt(new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12));
    const venus = trans.find(t => t.key === "Venus").sign;
    const moon = trans.find(t => t.key === "Moon").sign;
    const userEl = signByKey(userSignKey).el;
    const wUser = loveWeather(userSignKey, trans);

    const ranking = N.SIGNS
      .filter(O => O.k !== userSignKey)
      .map(O => {
        const cc = Z().computeCouple(userSignKey, O.k, "amore");
        const compat100 = cc.score * 20;
        const wO = loveWeather(O.k, trans);
        const synergy = (h100(venus.el, userEl) + h100(venus.el, O.el)) / 2;
        const matchScore = Math.round(0.45 * compat100 + 0.20 * wUser + 0.20 * wO + 0.15 * synergy);
        return {
          sign: O, matchScore,
          compat: cc.score, compatPct: compat100, sint: cc.sint, verdict: cc.verdict,
          unisce: cc.unisce, scotta: cc.scotta, advice: cc.advice,
          weather: wO, weatherLabel: weatherLabel(wO)
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore);

    return {
      date: d, userSign: signByKey(userSignKey),
      venusSign: venus, moonSign: moon, transits: trans,
      userWeather: wUser, userWeatherLabel: weatherLabel(wUser),
      userHoroscope: loveHoroscope(userSignKey, trans),
      bestHoroscope: loveHoroscope(ranking[0].sign.k, trans),
      best: ranking[0], ranking: ranking
    };
  }

  // descripción rica de la pareja: dinámica de base + por qué hoy es especial
  function coupleStory(userSign, m, res) {
    let t = `<p><b>${userSign.n} y ${m.sign.n}.</b> ${m.verdict} `;
    if (m.unisce) t += `Lo que os une: ${low(m.unisce)}. `;
    if (m.scotta) t += `Lo que puede quemar: ${low(m.scotta)}. `;
    t += `</p><p><b>Por qué hoy es un día especial para vosotros.</b> `;
    if (m.weather >= 62 && res.userWeather >= 62)
      t += `El cielo enciende el amor para los dos a la vez: ${res.userWeatherLabel} para ti, ${m.weatherLabel} para ${m.sign.n}. Cuando los dos "días buenos" coinciden — y no pasa a menudo — es la ventana perfecta para ir en serio: un mensaje, una invitación, el primer paso.`;
    else if (m.weather >= 62)
      t += `Hoy el impulso viene de ${m.sign.n}, que vive un momento de ${m.weatherLabel}: está receptivo, disponible, con la guardia baja. Te toca a ti acercarte y aprovechar la apertura.`;
    else if (res.userWeather >= 62)
      t += `Hoy el impulso lo pones tú: estás en plena forma en el amor (${res.userWeatherLabel}), y ${m.sign.n} se deja contagiar encantado por tu energía. Lleva tú el movimiento.`;
    else
      t += `Hoy ninguno de los dos está al rojo vivo: nada de locuras, pero es un buen día para un acercamiento suave y para sembrar lo que florecerá en los próximos días.`;
    if (m.advice) t += ` <i>Consejo:</i> ${low(m.advice)}`;
    t += `</p>`;
    return t;
  }

  window.MATCH_ES = { ofDay, loveWeather, loveHoroscope, coupleStory };
})();
