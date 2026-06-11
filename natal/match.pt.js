/* ============================================================
   ZODIAC · MATCH DEL GIORNO — pt-BR
   Incrocia la compatibilità di base (motore Coppie, lente amore)
   con il "meteo amoroso" del giorno per ciascun segno (transiti
   di Venere/Luna/Marte). Trova chi è compatibile con te E sta
   vivendo una buona giornata d'amore, oggi.
   Dipende da: window.NATAL, window.ZODIAC (coppie/engine.js), window.TRANSIT
   API: window.MATCH_PT.ofDay(userSignKey, jsDate)
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
    if (w >= 78) return "dia de amor brilhante";
    if (w >= 62) return "bom momento no amor";
    if (w >= 45) return "amor na média";
    return "amor meio em baixa";
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
      parts.push(`<b>Vênus está hospedada na sua casa</b>: nestes dias você está entre os signos mais beijados pelo amor, com charme e magnetismo no máximo. Basta você aparecer.`);
    else if (vh >= 4)
      parts.push(`<b>Vênus em ${venus.n}</b> está em plena sintonia com o seu elemento (${X.el}): o amor flui numa boa, você se sente desejável e as portas se abrem quase sozinhas.`);
    else if (vh === 3)
      parts.push(`<b>Vênus em ${venus.n}</b> te olha com bons olhos: pequenas chances de doçura e ternura, se você estiver com a antena ligada para captá-las.`);
    else
      parts.push(`<b>Vênus em ${venus.n}</b> joga num campo diferente do seu: no amor, hoje, melhor não forçar e deixar as coisas amadurecerem com calma.`);

    // Luna (umore affettivo del giorno)
    const mh = elScore(moon.el, X.el);
    if (mh >= 4)
      parts.push(`A <b>Lua em ${moon.n}</b> acompanha a sua necessidade de proximidade: você está mais aberto, carinhoso e disposto a se arriscar.`);
    else
      parts.push(`A <b>Lua em ${moon.n}</b> te deixa um fio mais reservado: antes de se abrir você quer se sentir seguro, e está certo assim.`);

    // Marte (desiderio, scintilla)
    const ah = elScore(mars.el, X.el);
    if (ah >= 4)
      parts.push(`<b>Marte</b> adiciona garra e desejo físico: tem faísca, e a vontade de dar o primeiro passo não falta.`);
    else
      parts.push(`<b>Marte</b> traz uma pitada de nervosismo: cuidado com arroubos de impaciência e ciúmes inúteis.`);

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

  // descrizione ricca della coppia: dinamica di base + perché oggi è speciale
  function coupleStory(userSign, m, res) {
    let t = `<p><b>${userSign.n} e ${m.sign.n}.</b> ${m.verdict} `;
    if (m.unisce) t += `O que une vocês: ${low(m.unisce)}. `;
    if (m.scotta) t += `O que pode queimar: ${low(m.scotta)}. `;
    t += `</p><p><b>Por que hoje é um dia especial para vocês.</b> `;
    if (m.weather >= 62 && res.userWeather >= 62)
      t += `O céu acende o amor para os dois ao mesmo tempo: ${res.userWeatherLabel} para você, ${m.weatherLabel} para ${m.sign.n}. Quando os dois "dias bons" coincidem — e não é sempre que acontece — é a janela certa para jogar sério: uma mensagem, um convite, o primeiro passo.`;
    else if (m.weather >= 62)
      t += `Hoje o empurrão vem de ${m.sign.n}, que hoje tem ${m.weatherLabel}: está receptivo, disponível, com a guarda baixa. É a sua vez de se aproximar e aproveitar a abertura.`;
    else if (res.userWeather >= 62)
      t += `Hoje o empurrão é seu: você está em grande forma no amor (${res.userWeatherLabel}), e ${m.sign.n} se deixa contagiar de bom grado pela sua energia. O movimento é por sua conta.`;
    else
      t += `Hoje nenhum dos dois está em plena chama: nada de loucuras, mas é um bom dia para uma aproximação doce e para plantar as bases dos próximos dias.`;
    if (m.advice) t += ` <i>Dica:</i> ${low(m.advice)}`;
    t += `</p>`;
    return t;
  }

  window.MATCH_PT = { ofDay, loveWeather, loveHoroscope, coupleStory };
})();
