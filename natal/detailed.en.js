/* ============================================================
   ZODIAC · NATAL CHART — DETAILED READING (long form)
   Structure inspired by the Cafe Astrology report: planet-in-sign,
   planet-in-house, sign-on-house, interpreted aspects.
   Pop voice, ready for AI rewriting in the book's voice.
   Depends on: window.NATAL, window.NATALTXT, window.NATALASPECTS
   API: window.NATALDETAIL_EN.report(result) -> HTML
   ============================================================ */
(function () {
  const SIGN_EXPR = {
    ariete: "in a direct, impulsive, full-throttle way: you start first, hate waiting and ignite in an instant",
    toro: "with calm, concreteness and sensuality: you go slow, build on solid ground and never loosen your grip",
    gemelli: "in a curious, quick, versatile way: you communicate, change your mind and get bored easily",
    cancro: "in an emotional, protective, intuitive way: you feel everything and shield the people you love",
    leone: "with warmth, pride and generosity: you want to shine and put your heart into it",
    vergine: "with precision, method and a practical streak: you sweat the details and want to be useful",
    bilancia: "with elegance, diplomacy and a hunger for harmony: you weigh everything and seek balance",
    scorpione: "with intensity, depth and strategy: all or nothing, and you go all the way down",
    sagittario: "with enthusiasm, freedom and a craving for meaning: you aim far and hate cages",
    capricorno: "with discipline, ambition and patience: you build for the long run, one step at a time",
    acquario: "in an original, free, unconventional way: you think outside the box",
    pesci: "in a sensitive, fluid, imaginative way: you absorb everything and daydream wide awake"
  };
  const P = {
    Sun: { n: "Sun", dom: "your identity, your vitality and what makes you shine", verb: "your self expresses itself" },
    Moon: { n: "Moon", dom: "your emotions, your instincts and your need to feel safe", verb: "you feel and take care" },
    Mercury: { n: "Mercury", dom: "how you think, talk, learn and connect with others", verb: "your mind works" },
    Venus: { n: "Venus", dom: "how you love, what attracts you and your sense of beauty", verb: "you love and seek pleasure" },
    Mars: { n: "Mars", dom: "your grit, your desire and the way you act", verb: "you act and chase what you want" },
    Jupiter: { n: "Jupiter", dom: "where you grow, expand and attract luck", verb: "you expand" },
    Saturn: { n: "Saturn", dom: "where you learn discipline, limits and responsibility", verb: "you build with hard work" },
    Uranus: { n: "Uranus", dom: "where you're original and seek freedom — a generational trait", verb: "you break the mold" },
    Neptune: { n: "Neptune", dom: "where you dream, imagine and dissolve — a generational trait", verb: "you dream and idealize" },
    Pluto: { n: "Pluto", dom: "where you transform at the deepest level — a generational trait", verb: "you transform" }
  };
  const HOUSE = {
    1: "yourself: the image you project and how you get going", 2: "money, possessions and what you truly value",
    3: "the everyday mind, communication, siblings and the neighborhood", 4: "home, roots, family and your private world",
    5: "romance, creativity, play and children", 6: "daily work, health and routines",
    7: "one-on-one relationships: partners, associates, contracts", 8: "deep intimacy, transformation and shared resources",
    9: "travel, higher learning, philosophy and faraway places", 10: "career, public image and ambitions",
    11: "friends, groups, projects and the dreams in your drawer", 12: "the subconscious, what stays hidden, spirituality and letting go"
  };
  const PROLE = {
    Sun: "your self", Moon: "your emotions", Mercury: "your mind", Venus: "the way you love",
    Mars: "your grit", Jupiter: "your growth", Saturn: "your duties", Uranus: "your freedom",
    Neptune: "your dreams", Pluto: "your intensity", Ascendant: "your image", MC: "your direction"
  };

  function signText(R, key, sign) {
    if (key === "Sun") return window.NATALTXT.sun(sign);
    if (key === "Moon") return window.NATALTXT.moon(sign);
    const p = P[key];
    return `${cap(p.dom)}. In ${sign.n} ${p.verb} ${SIGN_EXPR[sign.k]}.`;
  }
  function houseText(key, n) {
    return `With <b>${P[key].n} in house ${roman(n)}</b>, this part of you plays out mostly around <b>${HOUSE[n]}</b>.`;
  }
  function aspectLong(a) {
    const ra = PROLE[a.a.key] || a.a.name, rb = PROLE[a.b.key] || a.b.name;
    if (a.kind === "armonico")
      return `${cap(ra)} and ${rb} flow in sync: they collaborate almost effortlessly. A natural talent — use it.`;
    if (a.kind === "teso")
      return `Between ${ra} and ${rb} there's friction: they challenge each other. It's the kind of tension that, if you work it instead of suffering it, makes you grow the most.`;
    return `${cap(ra)} and ${rb} fuse together: they amplify each other, for better and for worse. A point of serious power in your sky.`;
  }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function roman(n) { return ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][n] || n; }

  function report(R) {
    const aspects = window.NATALASPECTS.compute(R);
    const byPlanet = {};
    aspects.forEach(a => { (byPlanet[a.a.key] = byPlanet[a.a.key] || []).push(a); });

    let h = `<p class="dtl-intro">This is the <b>complete</b> reading of your sky: every planet, where it lands and how it talks to the others. These are the "pieces" that, put together, make <b>you</b> — sometimes even contradicting each other, just like real people do.</p>`;

    // --- THE PLANETS ---
    h += `<h3 class="dtl-h">Your planets, one by one</h3>`;
    R.planets.forEach(p => {
      const houseStr = p.house ? ` · House ${roman(p.house)}` : "";
      h += `<div class="dtl-block">`;
      h += `<div class="dtl-title">${p.glyph} ${P[p.key].n} in ${p.sign.n}${houseStr} <span class="dtl-deg">${p.degText}</span></div>`;
      h += `<p>${signText(R, p.key, p.sign)}</p>`;
      if (p.house) h += `<p>${houseText(p.key, p.house)}</p>`;
      const al = byPlanet[p.key] || [];
      if (al.length) {
        h += `<ul class="dtl-asp">` + al.map(a =>
          `<li><b>${a.a.glyph} ${a.glyph} ${a.b.glyph} ${a.b.name}</b> <span class="dtl-val ${a.value >= 0 ? 'pos' : 'neg'}">${a.value >= 0 ? '+' : ''}${a.value}</span><br>${aspectLong(a)}</li>`
        ).join("") + `</ul>`;
      }
      h += `</div>`;
    });

    // --- ASCENDANT ---
    if (R.ascendant) {
      h += `<h3 class="dtl-h">The Ascendant — your mask</h3>`;
      h += `<div class="dtl-block"><div class="dtl-title">↑ Ascendant ${R.ascendant.sign.n} <span class="dtl-deg">${R.ascendant.degText}</span></div><p>${window.NATALTXT.asc(R.ascendant.sign)}</p><p>It's the first impression you make and the way you set off into anything new.</p></div>`;
    }

    // --- THE HOUSES ---
    if (R.houses) {
      h += `<h3 class="dtl-h">The 12 houses — the playing fields of your life</h3>`;
      R.houses.forEach(hh => {
        h += `<div class="dtl-block sm"><div class="dtl-title sm">House ${roman(hh.num)} in ${hh.sign.g} ${hh.sign.n}</div><p><span class="dtl-hk">${cap(HOUSE[hh.num])}.</span> You live this area ${SIGN_EXPR[hh.sign.k]}.</p></div>`;
      });
    } else {
      h += `<p class="dtl-note">For the houses and the Ascendant you'll need your exact birth time and place.</p>`;
    }

    return h;
  }

  window.NATALDETAIL_EN = { report };
})();
