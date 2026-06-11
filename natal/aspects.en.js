/* ============================================================
   ZODIAC · NATAL ASPECTS — planet↔planet inside the chart
   Inspired by the Cafe Astrology report (aspect table with
   positive/negative value), but in a pop voice.
   Depends on: window.NATAL
   API: window.NATALASPECTS_EN.compute(result) -> [{a,b,aspect,orb,kind,score,text}]
        window.NATALASPECTS_EN.balance(result) -> {el,mod,pol}
   ============================================================ */
(function () {
  const ASPECTS = [
    { k: "conjunction", g: "☌", angle: 0, orb: 8, kind: "intenso" },
    { k: "sextile", g: "✶", angle: 60, orb: 5, kind: "armonico" },
    { k: "square", g: "□", angle: 90, orb: 6, kind: "teso" },
    { k: "trine", g: "△", angle: 120, orb: 7, kind: "armonico" },
    { k: "opposition", g: "☍", angle: 180, orb: 8, kind: "teso" }
  ];
  // planet "weight" (the personal ones count more)
  const PW = { Sun: 1, Moon: 1, Mercury: .85, Venus: .9, Mars: .9, Jupiter: .7, Saturn: .7, Uranus: .55, Neptune: .55, Pluto: .55, Ascendant: .9, MC: .7 };
  // what each point stands for (used to generate the text)
  const ROLE = {
    Sun: "your self", Moon: "your emotions", Mercury: "your mind", Venus: "the way you love",
    Mars: "your grit", Jupiter: "your expansion", Saturn: "your discipline",
    Uranus: "your freedom", Neptune: "your dreams", Pluto: "your intensity",
    Ascendant: "your image", MC: "your direction"
  };
  const QUALITY = {
    intenso: "fuse and amplify each other: concentrated energy, for better and for worse",
    armonico: "flow together with ease: a natural talent you can count on",
    teso: "rub and challenge each other: friction that, once worked, turns into strength"
  };
  // signed value: positive (harmonious) / negative (tense) / neutral
  function signedValue(kind, tight) {
    const base = Math.round(tight * 100);
    if (kind === "armonico") return base;
    if (kind === "teso") return -base;
    return Math.round(base * 0.6); // conjunction: slightly positive
  }

  function sep(a, b) { let d = Math.abs(a - b) % 360; if (d > 180) d = 360 - d; return d; }

  function points(result) {
    const pts = result.planets.map(p => ({ key: p.key, name: p.name, glyph: p.glyph, lon: p.lon }));
    if (result.ascendant) pts.push({ key: "Ascendant", name: "Ascendant", glyph: "↑", lon: result.ascendant.lon });
    if (result.mc) pts.push({ key: "MC", name: "Midheaven", glyph: "MC", lon: result.mc.lon });
    return pts;
  }

  function compute(result) {
    const pts = points(result);
    const out = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        // no aspects between Asc and MC (they're points, not planets) with the Sun already covered: we keep them anyway
        const s = sep(pts[i].lon, pts[j].lon);
        for (const asp of ASPECTS) {
          const diff = Math.abs(s - asp.angle);
          if (diff <= asp.orb) {
            const tight = (asp.orb - diff) / asp.orb;
            const score = tight * (PW[pts[i].key] || .5) * (PW[pts[j].key] || .5)
              * (asp.k === "conjunction" || asp.k === "opposition" ? 1 : asp.k === "trine" || asp.k === "square" ? .92 : .8);
            out.push({
              a: pts[i], b: pts[j], aspect: asp.k, glyph: asp.g, kind: asp.kind,
              orb: diff, score: score, value: signedValue(asp.kind, tight),
              text: `<b>${pts[i].name} ${asp.g} ${pts[j].name}</b> — ${ROLE[pts[i].key] || pts[i].name} and ${ROLE[pts[j].key] || pts[j].name} ${QUALITY[asp.kind]}.`
            });
            break;
          }
        }
      }
    }
    out.sort((x, y) => y.score - x.score);
    return out;
  }

  function balance(result) {
    const core = result.planets.slice(0, 10); // 10 planets, like the cafeastrology balance
    const POL = { fuoco: "masc", aria: "masc", terra: "femm", acqua: "femm" };
    const el = { fuoco: 0, terra: 0, aria: 0, acqua: 0 };
    const mod = { cardinale: 0, fisso: 0, mobile: 0 };
    const pol = { masc: 0, femm: 0 };
    core.forEach(p => {
      const s = p.sign; if (!s) return;
      if (el[s.el] != null) el[s.el]++;
      if (mod[s.mod] != null) mod[s.mod]++;
      if (POL[s.el]) pol[POL[s.el]]++;
    });
    return { el, mod, pol, total: core.length };
  }

  window.NATALASPECTS_EN = { compute, balance };
})();
