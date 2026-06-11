/* ============================================================
   ZODIAC · MATCH DEL GIORNO
   Incrocia la compatibilità di base (motore Coppie, lente amore)
   con il "meteo amoroso" del giorno per ciascun segno (transiti
   di Venere/Luna/Marte). Trova chi è compatibile con te E sta
   vivendo una buona giornata d'amore, oggi.
   Dipende da: window.NATAL, window.ZODIAC (coppie/engine.js), window.TRANSIT
   API: window.MATCH.ofDay(userSignKey, jsDate)
   ============================================================ */
(function () {
  const N = window.NATAL, Z = window.ZODIAC, T = window.TRANSIT;

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
    if (w >= 78) return "giornata d'amore brillante";
    if (w >= 62) return "buon momento in amore";
    if (w >= 45) return "amore nella media";
    return "amore un po' sottotono";
  }

  // mini-oroscopo d'amore del giorno per un segno (testo dettagliato)
  function loveHoroscope(signKey, trans) {
    const X = signByKey(signKey);
    const venus = trans.find(t => t.key === "Venus").sign;
    const moon = trans.find(t => t.key === "Moon").sign;
    const mars = trans.find(t => t.key === "Mars").sign;
    const w = loveWeather(signKey, trans);
    const parts = [];

    // Venere (il pianeta dell'amore: peso maggiore)
    const vh = elScore(venus.el, X.el);
    if (venus.k === X.k)
      parts.push(`<b>Venere è ospite a casa tua</b>: in questi giorni sei tra i segni più baciati dall'amore, con fascino e magnetismo al massimo. Ti basta esserci.`);
    else if (vh >= 4)
      parts.push(`<b>Venere in ${venus.n}</b> è in piena sintonia col tuo elemento (${X.el}): l'amore scorre liscio, ti senti desiderabile e le porte si aprono quasi da sole.`);
    else if (vh === 3)
      parts.push(`<b>Venere in ${venus.n}</b> ti guarda con un occhio benevolo: piccole occasioni di dolcezza e tenerezza, se hai l'antenna accesa per coglierle.`);
    else
      parts.push(`<b>Venere in ${venus.n}</b> gioca su un campo diverso dal tuo: in amore, oggi, conviene non forzare e lasciar maturare le cose con calma.`);

    // Luna (umore affettivo del giorno)
    const mh = elScore(moon.el, X.el);
    if (mh >= 4)
      parts.push(`La <b>Luna in ${moon.n}</b> asseconda il tuo bisogno di vicinanza: sei più aperto, affettuoso e disposto a metterti in gioco.`);
    else
      parts.push(`La <b>Luna in ${moon.n}</b> ti rende un filo più riservato: prima di aprirti vuoi sentirti al sicuro, ed è giusto così.`);

    // Marte (desiderio, scintilla)
    const ah = elScore(mars.el, X.el);
    if (ah >= 4)
      parts.push(`<b>Marte</b> aggiunge grinta e desiderio fisico: c'è scintilla, e la voglia di fare il primo passo non manca.`);
    else
      parts.push(`<b>Marte</b> porta un pizzico di nervosismo: occhio a scatti d'impazienza e a gelosie inutili.`);

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
        const cc = Z.computeCouple(userSignKey, O.k, "amore");
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

  // descrizione ricca della coppia: dinamica di base + perché oggi è speciale
  function coupleStory(userSign, m, res) {
    let t = `<p><b>${userSign.n} e ${m.sign.n}.</b> ${m.verdict} `;
    if (m.unisce) t += `Quello che vi unisce: ${low(m.unisce)}. `;
    if (m.scotta) t += `Quello che può scottare: ${low(m.scotta)}. `;
    t += `</p><p><b>Perché oggi è un giorno particolare per voi.</b> `;
    if (m.weather >= 62 && res.userWeather >= 62)
      t += `Il cielo accende l'amore per entrambi nello stesso momento: ${res.userWeatherLabel} per te, ${m.weatherLabel} per ${m.sign.n}. Quando le due "giornate buone" coincidono — e non capita spesso — è la finestra giusta per fare sul serio: un messaggio, un invito, il primo passo.`;
    else if (m.weather >= 62)
      t += `Oggi la spinta arriva da ${m.sign.n}, che vive una ${m.weatherLabel}: è ricettivo, disponibile, con la guardia abbassata. Tocca a te avvicinarti e cogliere l'apertura.`;
    else if (res.userWeather >= 62)
      t += `Oggi la spinta ce l'hai tu: sei in gran forma in amore (${res.userWeatherLabel}), e ${m.sign.n} si lascia volentieri contagiare dalla tua energia. Porta tu il movimento.`;
    else
      t += `Oggi nessuno dei due è in piena fiamma: niente colpi di testa, ma è una buona giornata per un avvicinamento dolce e per gettare le basi dei prossimi giorni.`;
    if (m.advice) t += ` <i>Dritta:</i> ${low(m.advice)}`;
    t += `</p>`;
    return t;
  }

  window.MATCH = { ofDay, loveWeather, loveHoroscope, coupleStory };
})();
