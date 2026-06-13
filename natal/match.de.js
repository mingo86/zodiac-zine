/* ============================================================
   ZODIAC · MATCH DES TAGES
   Kreuzt die Basis-Kompatibilität (Paar-Engine, Liebes-Linse)
   mit dem "Liebeswetter" des Tages für jedes Sternzeichen
   (Venus/Mond/Mars-Transite). Findet, wer zu dir passt UND
   heute einen guten Liebestag erwischt hat.
   Hängt ab von: window.NATAL, window.ZODIAC (coppie/engine.js), window.TRANSIT
   API: window.MATCH_DE.ofDay(userSignKey, jsDate)
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
    if (w >= 78) return "ein strahlender Liebestag";
    if (w >= 62) return "ein guter Moment für die Liebe";
    if (w >= 45) return "Liebe im Mittelmaß";
    return "die Liebe ein bisschen verschnupft";
  }

  // mini love-horoscope of the day for one sign (detailed text)
  function loveHoroscope(signKey, trans) {
    const X = signByKey(signKey);
    const venus = trans.find(t => t.key === "Venus").sign;
    const moon = trans.find(t => t.key === "Moon").sign;
    const mars = trans.find(t => t.key === "Mars").sign;
    const w = loveWeather(signKey, trans);
    const parts = [];

    // Venus (the planet of love: biggest weight)
    const vh = elScore(venus.el, X.el);
    if (venus.k === X.k)
      parts.push(`<b>Venus ist bei dir zu Gast</b>: in diesen Tagen gehörst du zu den Zeichen, die die Liebe am meisten knutscht, mit Charme und Magnetismus auf Vollgas. Du musst nur auftauchen.`);
    else if (vh >= 4)
      parts.push(`<b>Venus in ${venus.n}</b> ist in voller Harmonie mit deinem Element (${X.el}): die Liebe fließt locker dahin, du fühlst dich begehrenswert und die Türen gehen fast von allein auf.`);
    else if (vh === 3)
      parts.push(`<b>Venus in ${venus.n}</b> sieht dich mit wohlwollendem Blick: kleine Chancen auf Süße und Zärtlichkeit, wenn deine Antenne auf Empfang steht.`);
    else
      parts.push(`<b>Venus in ${venus.n}</b> spielt auf einem anderen Feld als du: in der Liebe heute lieber nichts erzwingen und die Dinge in Ruhe reifen lassen.`);

    // Moon (emotional mood of the day)
    const mh = elScore(moon.el, X.el);
    if (mh >= 4)
      parts.push(`Der <b>Mond in ${moon.n}</b> begleitet dein Bedürfnis nach Nähe: du bist offener, zärtlicher und bereit, etwas zu riskieren.`);
    else
      parts.push(`Der <b>Mond in ${moon.n}</b> macht dich eine Spur zurückhaltender: bevor du dich öffnest, willst du dich sicher fühlen – und das ist völlig in Ordnung.`);

    // Mars (desire, spark)
    const ah = elScore(mars.el, X.el);
    if (ah >= 4)
      parts.push(`<b>Mars</b> bringt Biss und körperliches Verlangen: da knistert es, und an Mut für den ersten Schritt fehlt es nicht.`);
    else
      parts.push(`<b>Mars</b> sorgt für eine Prise Nervosität: Vorsicht vor Anflügen von Ungeduld und unnötiger Eifersucht.`);

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

  // rich couple description: base dynamic + why today is special
  function coupleStory(userSign, m, res) {
    let t = `<p><b>${userSign.n} und ${m.sign.n}.</b> ${m.verdict} `;
    if (m.unisce) t += `Was euch verbindet: ${low(m.unisce)}. `;
    if (m.scotta) t += `Was brennen könnte: ${low(m.scotta)}. `;
    t += `</p><p><b>Warum heute ein besonderer Tag für euch beide ist.</b> `;
    if (m.weather >= 62 && res.userWeather >= 62)
      t += `Der Himmel entfacht die Liebe für euch beide gleichzeitig: ${res.userWeatherLabel} für dich, ${m.weatherLabel} für ${m.sign.n}. Wenn die zwei "guten Tage" zusammenfallen – und das passiert nicht oft – ist es das richtige Fenster, um ernst zu machen: eine Nachricht, eine Einladung, der erste Schritt.`;
    else if (m.weather >= 62)
      t += `Heute kommt der Anstoß von ${m.sign.n}, der gerade ${m.weatherLabel} erlebt: empfänglich, verfügbar, mit gesenkter Deckung. Jetzt bist du dran, näher zu rücken und die Gelegenheit zu nutzen.`;
    else if (res.userWeather >= 62)
      t += `Heute kommt der Anstoß von dir: du bist in Topform in der Liebe (${res.userWeatherLabel}), und ${m.sign.n} lässt sich gern von deiner Energie anstecken. Der Schwung liegt bei dir.`;
    else
      t += `Heute steht keiner von euch beiden voll in Flammen: keine wilden Aktionen, aber ein guter Tag für eine sanfte Annäherung und um den Grundstein für die nächsten Tage zu legen.`;
    if (m.advice) t += ` <i>Profi-Tipp:</i> ${low(m.advice)}`;
    t += `</p>`;
    return t;
  }

  window.MATCH_DE = { ofDay, loveWeather, loveHoroscope, coupleStory };
})();
