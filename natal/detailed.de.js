/* ============================================================
   ZODIAC · GEBURTSHOROSKOP — DETAILLIERTE DEUTUNG (Langform) — de
   Struktur inspiriert vom Cafe-Astrology-Report: Planet-im-Zeichen,
   Planet-im-Haus, Zeichen-auf-Haus, gedeutete Aspekte.
   Pop-Stimme, bereit fürs KI-Umschreiben in der Stimme des Buchs.
   Hängt ab von: window.NATAL, window.NATALTXT, window.NATALASPECTS
   API: window.NATALDETAIL_DE.report(result) -> HTML
   ============================================================ */
(function () {
  const SIGN_EXPR = {
    ariete: "auf direkte, impulsive Art mit Vollgas: du gehst als Erster los, hasst Warten und entzündest dich im Nu",
    toro: "mit Ruhe, Handfestigkeit und Sinnlichkeit: du gehst es langsam an, baust auf festem Boden und lässt den Knochen nie los",
    gemelli: "auf neugierige, schnelle, vielseitige Art: du kommunizierst, änderst deine Meinung und langweilst dich leicht",
    cancro: "auf emotionale, beschützende, intuitive Art: du fühlst alles und nimmst die Menschen, die du liebst, unter deine Fittiche",
    leone: "mit Wärme, Stolz und Großzügigkeit: du willst strahlen und dein Herz in alles legen",
    vergine: "mit Präzision, Methode und praktischem Sinn: du achtest auf die Details und willst nützlich sein",
    bilancia: "mit Eleganz, Diplomatie und Hunger nach Harmonie: du wägst alles ab und suchst das Gleichgewicht",
    scorpione: "mit Intensität, Tiefe und Strategie: ganz oder gar nicht, und du gehst bis zum Grund",
    sagittario: "mit Begeisterung, Freiheit und Sinnhunger: du zielst weit und hasst Käfige",
    capricorno: "mit Disziplin, Ehrgeiz und Geduld: du baust auf lange Sicht, Schritt für Schritt",
    acquario: "auf originelle, freie, unkonventionelle Art: du denkst außerhalb der Schublade",
    pesci: "auf sensible, fließende, fantasievolle Art: du saugst alles auf und träumst mit offenen Augen"
  };
  const P = {
    Sun: { n: "Sonne", dom: "deine Identität, deine Vitalität und das, was dich zum Strahlen bringt", verb: "drückt sich dein Ich aus" },
    Moon: { n: "Mond", dom: "deine Gefühle, deine Instinkte und dein Bedürfnis, dich sicher zu fühlen", verb: "fühlst und sorgst du" },
    Mercury: { n: "Merkur", dom: "wie du denkst, sprichst, lernst und dich mit anderen verbindest", verb: "arbeitet dein Verstand" },
    Venus: { n: "Venus", dom: "wie du liebst, was dich anzieht und dein Sinn für Schönheit", verb: "liebst du und suchst Genuss" },
    Mars: { n: "Mars", dom: "dein Biss, dein Verlangen und die Art, wie du handelst", verb: "handelst du und jagst dem nach, was du willst" },
    Jupiter: { n: "Jupiter", dom: "wo du wächst, dich ausdehnst und Glück anziehst", verb: "dehnst du dich aus" },
    Saturn: { n: "Saturn", dom: "wo du Disziplin, Grenzen und Verantwortung lernst", verb: "baust du mit harter Arbeit" },
    Uranus: { n: "Uranus", dom: "wo du originell bist und Freiheit suchst — ein Zug deiner Generation", verb: "brichst du das Muster" },
    Neptune: { n: "Neptun", dom: "wo du träumst, fantasierst und dich auflöst — ein Zug deiner Generation", verb: "träumst und idealisierst du" },
    Pluto: { n: "Pluto", dom: "wo du dich in der Tiefe verwandelst — ein Zug deiner Generation", verb: "verwandelst du dich" }
  };
  const HOUSE = {
    1: "du selbst: das Bild, das du abgibst, und wie du Dinge in Gang bringst", 2: "das Geld, der Besitz und das, was dir wirklich wichtig ist",
    3: "der Alltagsverstand, die Kommunikation, Geschwister und die Nachbarschaft", 4: "das Zuhause, die Wurzeln, die Familie und deine private Welt",
    5: "die Romantik, die Kreativität, das Spiel und die Kinder", 6: "die tägliche Arbeit, die Gesundheit und die Routinen",
    7: "die Eins-zu-eins-Beziehungen: Partner, Teilhaber, Verträge", 8: "die tiefe Intimität, die Verwandlung und die geteilten Ressourcen",
    9: "die Reisen, das höhere Studium, die Philosophie und die Ferne", 10: "die Karriere, das öffentliche Bild und die Ambitionen",
    11: "die Freunde, die Gruppen, die Projekte und die Träume in der Schublade", 12: "das Unterbewusste, das Verborgene, die Spiritualität und das Loslassen"
  };
  const PROLE = {
    Sun: "dein Ich", Moon: "deine Gefühle", Mercury: "dein Verstand", Venus: "deine Art zu lieben",
    Mars: "dein Biss", Jupiter: "dein Wachstum", Saturn: "deine Pflichten", Uranus: "deine Freiheit",
    Neptune: "deine Träume", Pluto: "deine Intensität", Ascendant: "dein Bild", MC: "deine Richtung"
  };

  function signText(R, key, sign) {
    if (key === "Sun") return window.NATALTXT.sun(sign);
    if (key === "Moon") return window.NATALTXT.moon(sign);
    const p = P[key];
    return `${cap(p.dom)}. In ${sign.n} ${p.verb} ${SIGN_EXPR[sign.k]}.`;
  }
  function houseText(key, n) {
    return `Mit <b>${P[key].n} im Haus ${roman(n)}</b> spielt sich dieser Teil von dir vor allem rund um <b>${HOUSE[n]}</b> ab.`;
  }
  function aspectLong(a) {
    const ra = PROLE[a.a.key] || a.a.name, rb = PROLE[a.b.key] || a.b.name;
    if (a.kind === "armonico")
      return `${cap(ra)} und ${rb} fließen im Gleichklang: sie arbeiten fast mühelos zusammen. Ein natürliches Talent — nutze es.`;
    if (a.kind === "teso")
      return `Zwischen ${ra} und ${rb} gibt es Reibung: sie fordern sich gegenseitig heraus. Es ist die Art von Spannung, die dich am meisten wachsen lässt — wenn du sie bearbeitest, statt nur darunter zu leiden.`;
    return `${cap(ra)} und ${rb} verschmelzen: sie verstärken sich gegenseitig, im Guten wie im Schlechten. Ein Punkt von echter Kraft an deinem Himmel.`;
  }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function roman(n) { return ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][n] || n; }

  function report(R) {
    const aspects = window.NATALASPECTS.compute(R);
    const byPlanet = {};
    aspects.forEach(a => { (byPlanet[a.a.key] = byPlanet[a.a.key] || []).push(a); });

    let h = `<p class="dtl-intro">Das ist die <b>vollständige</b> Deutung deines Himmels: jeder Planet, wo er landet und wie er mit den anderen spricht. Das sind die "Teile", die zusammen <b>dich</b> ergeben — manchmal sogar im Widerspruch zueinander, genau wie echte Menschen.</p>`;

    // --- DIE PLANETEN ---
    h += `<h3 class="dtl-h">Deine Planeten, einer nach dem anderen</h3>`;
    R.planets.forEach(p => {
      const houseStr = p.house ? ` · Haus ${roman(p.house)}` : "";
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

    // --- DER ASZENDENT ---
    if (R.ascendant) {
      h += `<h3 class="dtl-h">Der Aszendent — deine Maske</h3>`;
      h += `<div class="dtl-block"><div class="dtl-title">↑ Aszendent ${R.ascendant.sign.n} <span class="dtl-deg">${R.ascendant.degText}</span></div><p>${window.NATALTXT.asc(R.ascendant.sign)}</p><p>Es ist der erste Eindruck, den du machst, und die Art, wie du in alles Neue startest.</p></div>`;
    }

    // --- DIE HÄUSER ---
    if (R.houses) {
      h += `<h3 class="dtl-h">Die 12 Häuser — die Spielfelder deines Lebens</h3>`;
      R.houses.forEach(hh => {
        h += `<div class="dtl-block sm"><div class="dtl-title sm">Haus ${roman(hh.num)} in ${hh.sign.g} ${hh.sign.n}</div><p><span class="dtl-hk">${cap(HOUSE[hh.num])}.</span> Du lebst diesen Bereich ${SIGN_EXPR[hh.sign.k]}.</p></div>`;
      });
    } else {
      h += `<p class="dtl-note">Für die Häuser und den Aszendenten brauchst du deine genaue Geburtszeit und deinen genauen Geburtsort.</p>`;
    }

    return h;
  }

  window.NATALDETAIL_DE = { report };
})();
