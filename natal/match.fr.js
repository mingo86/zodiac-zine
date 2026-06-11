/* ============================================================
   ZODIAC · MATCH DU JOUR — FR
   Croise la compatibilité de base (moteur Couples, lentille amour)
   avec la "météo amoureuse" du jour pour chaque signe (transits
   de Vénus/Lune/Mars). Trouve qui est compatible avec toi ET
   passe une bonne journée côté cœur, aujourd'hui.
   Dépend de : window.NATAL, window.ZODIAC (coppie/engine.js), window.TRANSIT
   API : window.MATCH_FR.ofDay(userSignKey, jsDate)
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
    if (w >= 78) return "journée d'amour éclatante";
    if (w >= 62) return "bon moment en amour";
    if (w >= 45) return "amour dans la moyenne";
    return "amour un peu en sourdine";
  }

  // mini-horoscope amoureux du jour pour un signe (texte détaillé)
  function loveHoroscope(signKey, trans) {
    const X = signByKey(signKey);
    const venus = trans.find(t => t.key === "Venus").sign;
    const moon = trans.find(t => t.key === "Moon").sign;
    const mars = trans.find(t => t.key === "Mars").sign;
    const w = loveWeather(signKey, trans);
    const parts = [];

    // Vénus (la planète de l'amour : poids majeur)
    const vh = elScore(venus.el, X.el);
    if (venus.k === X.k)
      parts.push(`<b>Vénus est l'invitée de ta maison</b> : ces jours-ci tu es parmi les signes les plus embrassés par l'amour, charme et magnétisme au maximum. Il te suffit d'être là.`);
    else if (vh >= 4)
      parts.push(`<b>Vénus en ${venus.n}</b> est en pleine harmonie avec ton élément (${X.el}) : l'amour coule tout seul, tu te sens désirable et les portes s'ouvrent presque sans pousser.`);
    else if (vh === 3)
      parts.push(`<b>Vénus en ${venus.n}</b> te regarde d'un œil bienveillant : petites occasions de douceur et de tendresse, si tu gardes l'antenne allumée pour les capter.`);
    else
      parts.push(`<b>Vénus en ${venus.n}</b> joue sur un terrain différent du tien : en amour, aujourd'hui, mieux vaut ne pas forcer et laisser mûrir les choses tranquillement.`);

    // Lune (humeur affective du jour)
    const mh = elScore(moon.el, X.el);
    if (mh >= 4)
      parts.push(`La <b>Lune en ${moon.n}</b> caresse ton besoin de proximité : tu es plus ouvert, affectueux et prêt à te mouiller.`);
    else
      parts.push(`La <b>Lune en ${moon.n}</b> te rend un brin plus réservé : avant de t'ouvrir, tu veux te sentir en sécurité, et c'est très bien comme ça.`);

    // Mars (désir, étincelle)
    const ah = elScore(mars.el, X.el);
    if (ah >= 4)
      parts.push(`<b>Mars</b> ajoute de la niaque et du désir physique : il y a de l'étincelle, et l'envie de faire le premier pas ne manque pas.`);
    else
      parts.push(`<b>Mars</b> apporte une pincée de nervosité : gare aux coups d'impatience et aux jalousies inutiles.`);

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

  // description riche du couple : dynamique de base + pourquoi aujourd'hui est spécial
  function coupleStory(userSign, m, res) {
    let t = `<p><b>${userSign.n} et ${m.sign.n}.</b> ${m.verdict} `;
    if (m.unisce) t += `Ce qui vous unit : ${low(m.unisce)}. `;
    if (m.scotta) t += `Ce qui peut brûler : ${low(m.scotta)}. `;
    t += `</p><p><b>Pourquoi aujourd'hui est un jour particulier pour vous.</b> `;
    if (m.weather >= 62 && res.userWeather >= 62)
      t += `Le ciel allume l'amour pour vous deux au même moment : ${res.userWeatherLabel} pour toi, ${m.weatherLabel} pour ${m.sign.n}. Quand les deux "bonnes journées" coïncident — et ça n'arrive pas souvent — c'est la fenêtre idéale pour passer aux choses sérieuses : un message, une invitation, le premier pas.`;
    else if (m.weather >= 62)
      t += `Aujourd'hui, l'élan vient de ${m.sign.n}, qui vit une ${m.weatherLabel} : il est réceptif, disponible, la garde baissée. À toi de t'approcher et de saisir l'ouverture.`;
    else if (res.userWeather >= 62)
      t += `Aujourd'hui, l'élan, c'est toi qui l'as : tu es en grande forme côté cœur (${res.userWeatherLabel}), et ${m.sign.n} se laisse volontiers contaminer par ton énergie. C'est toi qui mènes la danse.`;
    else
      t += `Aujourd'hui, aucun de vous deux n'est en pleine flamme : pas de coup de tête, mais c'est une bonne journée pour un rapprochement en douceur et pour poser les bases des prochains jours.`;
    if (m.advice) t += ` <i>Le tuyau :</i> ${low(m.advice)}`;
    t += `</p>`;
    return t;
  }

  window.MATCH_FR = { ofDay, loveWeather, loveHoroscope, coupleStory };
})();
