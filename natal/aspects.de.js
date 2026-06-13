/* ============================================================
   ZODIAC · GEBURTSASPEKTE — Planet↔Planet innerhalb des Charts — de
   Inspiriert vom Report von Cafe Astrology (Aspekttabelle mit
   positivem/negativem Wert), aber in Pop-Stimme.
   Hängt ab von: window.NATAL
   API: window.NATALASPECTS_DE.compute(result) -> [{a,b,aspect,orb,kind,score,text}]
        window.NATALASPECTS_DE.balance(result) -> {el,mod,pol}
   ============================================================ */
(function () {
  const ASPECTS = [
    { k: "congiunzione", g: "☌", angle: 0, orb: 8, kind: "intenso" },
    { k: "sestile", g: "✶", angle: 60, orb: 5, kind: "armonico" },
    { k: "quadrato", g: "□", angle: 90, orb: 6, kind: "teso" },
    { k: "trigono", g: "△", angle: 120, orb: 7, kind: "armonico" },
    { k: "opposizione", g: "☍", angle: 180, orb: 8, kind: "teso" }
  ];
  // "Gewicht" des Planeten (die persönlichen zählen mehr)
  const PW = { Sun: 1, Moon: 1, Mercury: .85, Venus: .9, Mars: .9, Jupiter: .7, Saturn: .7, Uranus: .55, Neptune: .55, Pluto: .55, Ascendant: .9, MC: .7 };
  // wofür jeder Punkt steht (zum Erzeugen des Textes)
  const ROLE = {
    Sun: "dein Ich", Moon: "deine Gefühle", Mercury: "dein Verstand", Venus: "deine Art zu lieben",
    Mars: "dein Biss", Jupiter: "deine Expansion", Saturn: "deine Disziplin",
    Uranus: "deine Freiheit", Neptune: "dein Traum", Pluto: "deine Intensität",
    Ascendant: "dein Auftreten", MC: "deine Richtung"
  };
  const QUALITY = {
    intenso: "verschmelzen und verstärken sich gegenseitig: gebündelte Energie, im Guten wie im Schlechten",
    armonico: "fließen mühelos zusammen: ein natürliches Talent, auf das du dich verlassen kannst",
    teso: "reiben und fordern sich gegenseitig: Reibung, die – einmal bearbeitet – zur Stärke wird"
  };
  // vorzeichenbehafteter Wert: positiv (harmonisch) / negativ (gespannt) / neutral
  function signedValue(kind, tight) {
    const base = Math.round(tight * 100);
    if (kind === "armonico") return base;
    if (kind === "teso") return -base;
    return Math.round(base * 0.6); // Konjunktion: leicht positiv
  }

  function sep(a, b) { let d = Math.abs(a - b) % 360; if (d > 180) d = 360 - d; return d; }

  function points(result) {
    const pts = result.planets.map(p => ({ key: p.key, name: p.name, glyph: p.glyph, lon: p.lon }));
    if (result.ascendant) pts.push({ key: "Ascendant", name: "Aszendent", glyph: "↑", lon: result.ascendant.lon });
    if (result.mc) pts.push({ key: "MC", name: "Medium Coeli", glyph: "MC", lon: result.mc.lon });
    return pts;
  }

  function compute(result) {
    const pts = points(result);
    const out = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        // keine Aspekte zwischen Asz und MC (sie sind Punkte, keine Planeten) mit der bereits abgedeckten Sonne: wir behalten sie trotzdem
        const s = sep(pts[i].lon, pts[j].lon);
        for (const asp of ASPECTS) {
          const diff = Math.abs(s - asp.angle);
          if (diff <= asp.orb) {
            const tight = (asp.orb - diff) / asp.orb;
            const score = tight * (PW[pts[i].key] || .5) * (PW[pts[j].key] || .5)
              * (asp.k === "congiunzione" || asp.k === "opposizione" ? 1 : asp.k === "trigono" || asp.k === "quadrato" ? .92 : .8);
            out.push({
              a: pts[i], b: pts[j], aspect: asp.k, glyph: asp.g, kind: asp.kind,
              orb: diff, score: score, value: signedValue(asp.kind, tight),
              text: `<b>${pts[i].name} ${asp.g} ${pts[j].name}</b> — ${ROLE[pts[i].key] || pts[i].name} und ${ROLE[pts[j].key] || pts[j].name} ${QUALITY[asp.kind]}.`
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
    const core = result.planets.slice(0, 10); // 10 Planeten, wie die Balance von cafeastrology
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

  window.NATALASPECTS_DE = { compute, balance };
})();
