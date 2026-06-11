/* ============================================================
   ZODIAC · ASPECTOS NATALES (ES) — planeta↔planeta dentro de la carta
   Inspirado en el report de Cafe Astrology (tabla de aspectos con
   valor positivo/negativo), pero en voz pop.
   Depende de: window.NATAL
   API: window.NATALASPECTS_ES.compute(result) -> [{a,b,aspect,orb,kind,score,text}]
        window.NATALASPECTS_ES.balance(result) -> {el,mod,pol}
   ============================================================ */
(function () {
  const ASPECTS = [
    { k: "conjunción", g: "☌", angle: 0, orb: 8, kind: "intenso" },
    { k: "sextil", g: "✶", angle: 60, orb: 5, kind: "armonico" },
    { k: "cuadratura", g: "□", angle: 90, orb: 6, kind: "teso" },
    { k: "trígono", g: "△", angle: 120, orb: 7, kind: "armonico" },
    { k: "oposición", g: "☍", angle: 180, orb: 8, kind: "teso" }
  ];
  // "peso" del planeta (los personales cuentan más)
  const PW = { Sun: 1, Moon: 1, Mercury: .85, Venus: .9, Mars: .9, Jupiter: .7, Saturn: .7, Uranus: .55, Neptune: .55, Pluto: .55, Ascendant: .9, MC: .7 };
  // qué representa cada punto (para generar el texto)
  const ROLE = {
    Sun: "tu yo", Moon: "tus emociones", Mercury: "tu mente", Venus: "tu manera de amar",
    Mars: "tu garra", Jupiter: "tu expansión", Saturn: "tu disciplina",
    Uranus: "tu libertad", Neptune: "tu sueño", Pluto: "tu intensidad",
    Ascendant: "tu imagen", MC: "tu dirección"
  };
  const QUALITY = {
    intenso: "se funden y se amplifican: energía concentrada, para lo bueno y para lo malo",
    armonico: "fluyen juntos con facilidad: un talento natural con el que puedes contar",
    teso: "se rozan y se desafían: fricción que, bien trabajada, se convierte en fuerza"
  };
  // valor con signo: positivo (armonico) / negativo (teso) / neutro
  function signedValue(kind, tight) {
    const base = Math.round(tight * 100);
    if (kind === "armonico") return base;
    if (kind === "teso") return -base;
    return Math.round(base * 0.6); // conjunción: ligeramente positiva
  }

  function sep(a, b) { let d = Math.abs(a - b) % 360; if (d > 180) d = 360 - d; return d; }

  function points(result) {
    const pts = result.planets.map(p => ({ key: p.key, name: p.name, glyph: p.glyph, lon: p.lon }));
    if (result.ascendant) pts.push({ key: "Ascendant", name: "Ascendente", glyph: "↑", lon: result.ascendant.lon });
    if (result.mc) pts.push({ key: "MC", name: "Medio Cielo", glyph: "MC", lon: result.mc.lon });
    return pts;
  }

  function compute(result) {
    const pts = points(result);
    const out = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        // nada de aspectos entre Asc y MC (son puntos, no planetas) con el Sol ya cubierto: los mantenemos igualmente
        const s = sep(pts[i].lon, pts[j].lon);
        for (const asp of ASPECTS) {
          const diff = Math.abs(s - asp.angle);
          if (diff <= asp.orb) {
            const tight = (asp.orb - diff) / asp.orb;
            const score = tight * (PW[pts[i].key] || .5) * (PW[pts[j].key] || .5)
              * (asp.k === "conjunción" || asp.k === "oposición" ? 1 : asp.k === "trígono" || asp.k === "cuadratura" ? .92 : .8);
            out.push({
              a: pts[i], b: pts[j], aspect: asp.k, glyph: asp.g, kind: asp.kind,
              orb: diff, score: score, value: signedValue(asp.kind, tight),
              text: `<b>${pts[i].name} ${asp.g} ${pts[j].name}</b> — ${ROLE[pts[i].key] || pts[i].name} y ${ROLE[pts[j].key] || pts[j].name} ${QUALITY[asp.kind]}.`
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
    const core = result.planets.slice(0, 10); // 10 planetas, como la balanza de cafeastrology
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

  window.NATALASPECTS_ES = { compute, balance };
})();
