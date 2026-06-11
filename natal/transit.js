/* ============================================================
   ZODIAC · TRANSITI — motore del giorno
   Calcola le posizioni planetarie di una data e i loro aspetti
   verso il tema natale. Base per l'oroscopo giornaliero.
   Dipende da: window.Astronomy, window.NATAL
   API: window.TRANSIT.forDate(natalResult, jsDate, atHour)
   ============================================================ */
(function () {
  const A = window.Astronomy;
  const N = window.NATAL;
  const norm360 = x => ((x % 360) + 360) % 360;

  function eclLon(bodyKey, date) {
    return norm360(A.Ecliptic(A.GeoVector(bodyKey, date, true)).elon);
  }
  function isRetro(bodyKey, date) {
    if (bodyKey === "Sun" || bodyKey === "Moon") return false;
    const b = eclLon(bodyKey, new Date(date.getTime() - 43200000));
    const a = eclLon(bodyKey, new Date(date.getTime() + 43200000));
    let d = a - b; if (d > 180) d -= 360; if (d < -180) d += 360;
    return d < 0;
  }
  function transitsAt(date) {
    return N.PLANETS.map(p => {
      const lon = eclLon(p.key, date);
      const s = N.signOf(lon);
      return {
        key: p.key, name: p.n, glyph: p.g, lon: lon,
        sign: s.sign, deg: s.deg, degText: N.fmtDeg(s.deg), retro: isRetro(p.key, date)
      };
    });
  }

  // aspetti maggiori
  const ASPECTS = [
    { k: "congiunzione", g: "☌", angle: 0, kind: "intenso" },
    { k: "sestile", g: "✶", angle: 60, kind: "facile" },
    { k: "quadrato", g: "□", angle: 90, kind: "teso" },
    { k: "trigono", g: "△", angle: 120, kind: "facile" },
    { k: "opposizione", g: "☍", angle: 180, kind: "teso" }
  ];
  // orbita ammessa per pianeta in transito (gradi)
  const ORB = { Sun: 5, Moon: 6, Mercury: 4.5, Venus: 4.5, Mars: 4.5, Jupiter: 4, Saturn: 4, Uranus: 3, Neptune: 3, Pluto: 3 };
  // peso del punto natale colpito (impatto personale)
  const NATAL_WEIGHT = { Sun: 1.0, Moon: 1.0, Ascendant: 1.0, MC: 0.7, Venus: 0.85, Mars: 0.85, Mercury: 0.8, Jupiter: 0.6, Saturn: 0.6, Uranus: 0.45, Neptune: 0.45, Pluto: 0.45 };
  const ASPECT_WEIGHT = { congiunzione: 1.0, opposizione: 0.9, quadrato: 0.85, trigono: 0.8, sestile: 0.6 };

  function sep(a, b) { let d = Math.abs(norm360(a) - norm360(b)); if (d > 180) d = 360 - d; return d; }

  // costruisce la lista dei punti natali da colpire
  function natalPoints(natal) {
    const pts = natal.planets.map(p => ({ key: p.key, name: p.name, glyph: p.glyph, lon: p.lon, sign: p.sign }));
    if (natal.ascendant) pts.push({ key: "Ascendant", name: "Ascendente", glyph: "↑", lon: natal.ascendant.lon, sign: natal.ascendant.sign });
    if (natal.mc) pts.push({ key: "MC", name: "Medio Cielo", glyph: "MC", lon: natal.mc.lon, sign: natal.mc.sign });
    return pts;
  }

  function forDate(natal, jsDate, atHour) {
    const d = new Date(jsDate.getFullYear(), jsDate.getMonth(), jsDate.getDate(), atHour == null ? 12 : atHour, 0, 0);
    const trans = transitsAt(d);
    const points = natalPoints(natal);
    const aspects = [];
    trans.forEach(t => {
      const orb = ORB[t.key] || 3;
      points.forEach(np => {
        const s = sep(t.lon, np.lon);
        for (const asp of ASPECTS) {
          const diff = Math.abs(s - asp.angle);
          if (diff <= orb) {
            const tight = (orb - diff) / orb; // 0..1
            const score = tight * (ASPECT_WEIGHT[asp.k] || 0.6) * (NATAL_WEIGHT[np.key] || 0.5)
              * (t.key === "Moon" ? 0.85 : 1) // la Luna conta ma è veloce
              * (["Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"].includes(t.key) ? 1.15 : 1); // transiti lenti = temi forti
            aspects.push({
              tKey: t.key, tName: t.name, tGlyph: t.glyph, tRetro: t.retro, tSign: t.sign,
              nKey: np.key, nName: np.name, nGlyph: np.glyph, nSign: np.sign,
              aspect: asp.k, aspectGlyph: asp.g, kind: asp.kind,
              orb: diff, score: score
            });
            break; // un solo aspetto per coppia
          }
        }
      });
    });
    aspects.sort((a, b) => b.score - a.score);

    // fase lunare (Sole-Luna) per il "meteo" generale
    const sunLon = trans[0].lon, moonLon = trans[1].lon;
    const phaseAngle = norm360(moonLon - sunLon);
    let phase = "crescente";
    if (phaseAngle < 10 || phaseAngle > 350) phase = "luna nuova";
    else if (phaseAngle < 80) phase = "crescente";
    else if (phaseAngle < 100) phase = "primo quarto";
    else if (phaseAngle < 170) phase = "gibbosa crescente";
    else if (phaseAngle < 190) phase = "luna piena";
    else if (phaseAngle < 260) phase = "gibbosa calante";
    else if (phaseAngle < 280) phase = "ultimo quarto";
    else phase = "calante";

    return {
      date: d, transits: trans, aspects: aspects,
      moon: trans[1], moonPhase: phase, phaseAngle: phaseAngle,
      top: aspects.slice(0, 6)
    };
  }

  window.TRANSIT = { forDate, transitsAt };
})();
