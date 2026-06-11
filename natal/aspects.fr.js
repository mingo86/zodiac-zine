/* ============================================================
   ZODIAC · ASPECTS NATAUX — planète↔planète dans la carte — FR
   Inspiré du rapport de Cafe Astrology (table des aspects avec
   valeur positive/négative), mais en voix pop.
   Dépend de : window.NATAL
   API : window.NATALASPECTS_FR.compute(result) -> [{a,b,aspect,orb,kind,score,text}]
        window.NATALASPECTS_FR.balance(result) -> {el,mod,pol}
   ============================================================ */
(function () {
  const ASPECTS = [
    { k: "conjonction", g: "☌", angle: 0, orb: 8, kind: "intenso" },
    { k: "sextile", g: "✶", angle: 60, orb: 5, kind: "armonico" },
    { k: "carré", g: "□", angle: 90, orb: 6, kind: "teso" },
    { k: "trigone", g: "△", angle: 120, orb: 7, kind: "armonico" },
    { k: "opposition", g: "☍", angle: 180, orb: 8, kind: "teso" }
  ];
  // "poids" de la planète (les personnelles comptent davantage)
  const PW = { Sun: 1, Moon: 1, Mercury: .85, Venus: .9, Mars: .9, Jupiter: .7, Saturn: .7, Uranus: .55, Neptune: .55, Pluto: .55, Ascendant: .9, MC: .7 };
  // ce que représente chaque point (pour générer le texte)
  const ROLE = {
    Sun: "ton moi", Moon: "tes émotions", Mercury: "ton esprit", Venus: "ta façon d'aimer",
    Mars: "ta niaque", Jupiter: "ton expansion", Saturn: "ta discipline",
    Uranus: "ta liberté", Neptune: "ton rêve", Pluto: "ton intensité",
    Ascendant: "ton image", MC: "ta direction"
  };
  const QUALITY = {
    intenso: "fusionnent et s'amplifient : énergie concentrée, pour le meilleur et pour le pire",
    armonico: "coulent ensemble avec aisance : un talent naturel sur lequel compter",
    teso: "se frottent et se défient : une friction qui, une fois travaillée, devient une force"
  };
  // valeur signée : positive (armonico) / négative (teso) / neutre
  function signedValue(kind, tight) {
    const base = Math.round(tight * 100);
    if (kind === "armonico") return base;
    if (kind === "teso") return -base;
    return Math.round(base * 0.6); // conjonction : légèrement positive
  }

  function sep(a, b) { let d = Math.abs(a - b) % 360; if (d > 180) d = 360 - d; return d; }

  function points(result) {
    const pts = result.planets.map(p => ({ key: p.key, name: p.name, glyph: p.glyph, lon: p.lon }));
    if (result.ascendant) pts.push({ key: "Ascendant", name: "Ascendant", glyph: "↑", lon: result.ascendant.lon });
    if (result.mc) pts.push({ key: "MC", name: "Milieu du Ciel", glyph: "MC", lon: result.mc.lon });
    return pts;
  }

  function compute(result) {
    const pts = points(result);
    const out = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        // pas d'aspects entre Asc et MC (ce sont des points, pas des planètes) avec le Soleil déjà couvert : on les garde quand même
        const s = sep(pts[i].lon, pts[j].lon);
        for (const asp of ASPECTS) {
          const diff = Math.abs(s - asp.angle);
          if (diff <= asp.orb) {
            const tight = (asp.orb - diff) / asp.orb;
            const score = tight * (PW[pts[i].key] || .5) * (PW[pts[j].key] || .5)
              * (asp.k === "conjonction" || asp.k === "opposition" ? 1 : asp.k === "trigone" || asp.k === "carré" ? .92 : .8);
            out.push({
              a: pts[i], b: pts[j], aspect: asp.k, glyph: asp.g, kind: asp.kind,
              orb: diff, score: score, value: signedValue(asp.kind, tight),
              text: `<b>${pts[i].name} ${asp.g} ${pts[j].name}</b> — ${ROLE[pts[i].key] || pts[i].name} et ${ROLE[pts[j].key] || pts[j].name} ${QUALITY[asp.kind]}.`
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
    const core = result.planets.slice(0, 10); // 10 planètes, comme la balance de cafeastrology
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

  window.NATALASPECTS_FR = { compute, balance };
})();
