/* ============================================================
   ZODIAC · MATCH OF THE DAY
   Crosses base compatibility (Couples engine, love lens)
   with each sign's "love weather" of the day (Venus/Moon/Mars
   transits). Finds who's compatible with you AND having a good
   love day, today.
   Depends on: window.NATAL, window.ZODIAC (coppie/engine.js), window.TRANSIT
   API: window.MATCH_EN.ofDay(userSignKey, jsDate)
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
    if (w >= 78) return "a dazzling day for love";
    if (w >= 62) return "a good moment for love";
    if (w >= 45) return "love running on average";
    return "love a bit under the weather";
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
      parts.push(`<b>Venus is a guest at your place</b>: these days you're among the signs love is kissing the most, with charm and magnetism at full power. Just showing up is enough.`);
    else if (vh >= 4)
      parts.push(`<b>Venus in ${venus.n}</b> is in full harmony with your element (${X.el}): love flows smoothly, you feel desirable and doors practically open on their own.`);
    else if (vh === 3)
      parts.push(`<b>Venus in ${venus.n}</b> looks at you with a kindly eye: small chances for sweetness and tenderness, if your antenna is switched on to catch them.`);
    else
      parts.push(`<b>Venus in ${venus.n}</b> is playing on a different field than yours: in love, today, better not to force it — let things ripen at their own pace.`);

    // Moon (emotional mood of the day)
    const mh = elScore(moon.el, X.el);
    if (mh >= 4)
      parts.push(`The <b>Moon in ${moon.n}</b> backs your need for closeness: you're more open, affectionate and willing to put yourself out there.`);
    else
      parts.push(`The <b>Moon in ${moon.n}</b> makes you a touch more reserved: you want to feel safe before opening up — and that's perfectly fine.`);

    // Mars (desire, spark)
    const ah = elScore(mars.el, X.el);
    if (ah >= 4)
      parts.push(`<b>Mars</b> adds grit and physical desire: there's a spark, and no shortage of nerve to make the first move.`);
    else
      parts.push(`<b>Mars</b> brings a pinch of edginess: watch out for flashes of impatience and pointless jealousy.`);

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
    let t = `<p><b>${userSign.n} and ${m.sign.n}.</b> ${m.verdict} `;
    if (m.unisce) t += `What brings you together: ${low(m.unisce)}. `;
    if (m.scotta) t += `What might burn: ${low(m.scotta)}. `;
    t += `</p><p><b>Why today is a special day for you two.</b> `;
    if (m.weather >= 62 && res.userWeather >= 62)
      t += `The sky is lighting up love for both of you at the same time: ${res.userWeatherLabel} for you, ${m.weatherLabel} for ${m.sign.n}. When the two "good days" line up — and that doesn't happen often — it's the right window to get serious: a message, an invitation, the first move.`;
    else if (m.weather >= 62)
      t += `Today the push comes from ${m.sign.n}, who's having ${m.weatherLabel}: receptive, available, guard down. It's on you to step closer and seize the opening.`;
    else if (res.userWeather >= 62)
      t += `Today the push is yours: you're in great shape in love (${res.userWeatherLabel}), and ${m.sign.n} will happily catch your energy. You bring the momentum.`;
    else
      t += `Today neither of you is fully ablaze: no wild moves, but it's a good day for a gentle approach and for laying the groundwork for the days ahead.`;
    if (m.advice) t += ` <i>Pro tip:</i> ${low(m.advice)}`;
    t += `</p>`;
    return t;
  }

  window.MATCH_EN = { ofDay, loveWeather, loveHoroscope, coupleStory };
})();
