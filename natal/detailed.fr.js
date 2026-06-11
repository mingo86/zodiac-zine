/* ============================================================
   ZODIAC · THÈME NATAL — LECTURE DÉTAILLÉE (longue) — FR
   Structure inspirée du rapport de Cafe Astrology : planète-en-signe,
   planète-en-maison, signe-sur-maison, aspects interprétés.
   Voix pop, prête pour réécriture IA dans la voix du livre.
   Dépend de : window.NATAL, window.NATALTXT, window.NATALASPECTS
   API : window.NATALDETAIL_FR.report(result) -> HTML
   ============================================================ */
(function () {
  const SIGN_EXPR = {
    ariete: "de façon directe, impulsive et pleine d'élan : tu pars en premier, tu détestes attendre et tu t'enflammes en un instant",
    toro: "avec calme, concret et sensualité : tu avances doucement, tu construis sur du solide et tu ne lâches pas prise",
    gemelli: "de façon curieuse, rapide et polyvalente : tu communiques, tu changes d'avis et tu t'ennuies facilement",
    cancro: "de façon émotive, protectrice et intuitive : tu ressens tout et tu protèges ceux que tu aimes",
    leone: "avec chaleur, fierté et générosité : tu veux briller et y mettre tout ton cœur",
    vergine: "avec précision, méthode et esprit pratique : tu soignes les détails et tu veux être utile",
    bilancia: "avec élégance, diplomatie et quête d'harmonie : tu pèses tout et tu cherches l'équilibre",
    scorpione: "avec intensité, profondeur et stratégie : tout ou rien, et tu vas jusqu'au bout",
    sagittario: "avec enthousiasme, liberté et soif de sens : tu vises loin et tu détestes les cages",
    capricorno: "avec discipline, ambition et patience : tu construis sur le long terme, un pas à la fois",
    acquario: "de façon originale, libre et anticonformiste : tu penses hors des sentiers battus",
    pesci: "de façon sensible, fluide et pleine d'imagination : tu absorbes tout et tu rêves les yeux ouverts"
  };
  const P = {
    Sun: { n: "Soleil", dom: "ton identité, ta vitalité et ce qui te fait briller", verb: "ton moi s'exprime" },
    Moon: { n: "Lune", dom: "tes émotions, tes instincts et ton besoin de te sentir en sécurité", verb: "tu ressens et tu prends soin" },
    Mercury: { n: "Mercure", dom: "ta façon de penser, parler, apprendre et te connecter aux autres", verb: "ton esprit fonctionne" },
    Venus: { n: "Vénus", dom: "ta façon d'aimer, ce qui t'attire et ton sens du beau", verb: "tu aimes et tu cherches le plaisir" },
    Mars: { n: "Mars", dom: "ta niaque, ton désir et ta façon d'agir", verb: "tu agis et tu poursuis ce que tu veux" },
    Jupiter: { n: "Jupiter", dom: "là où tu grandis, t'épanouis et attires la chance", verb: "tu t'épanouis" },
    Saturn: { n: "Saturne", dom: "là où tu apprends discipline, limites et responsabilités", verb: "tu construis avec sérieux" },
    Uranus: { n: "Uranus", dom: "là où tu es original et cherches la liberté — un trait de génération", verb: "tu casses les codes" },
    Neptune: { n: "Neptune", dom: "là où tu rêves, imagines et te dissous — un trait de génération", verb: "tu rêves et tu idéalises" },
    Pluto: { n: "Pluton", dom: "là où tu te transformes en profondeur — un trait de génération", verb: "tu te transformes" }
  };
  const HOUSE = {
    1: "toi-même : l'image que tu donnes et ta façon de démarrer", 2: "l'argent, les biens et ce à quoi tu accordes de la valeur",
    3: "l'esprit du quotidien, la communication, la fratrie et le voisinage", 4: "le foyer, les racines, la famille et ton monde intime",
    5: "l'amour romantique, la créativité, le jeu et les enfants", 6: "le travail quotidien, la santé et les routines",
    7: "les relations en tête-à-tête : partenaires, associés, contrats", 8: "l'intimité profonde, la transformation et les ressources partagées",
    9: "les voyages, les hautes études, la philosophie et l'étranger", 10: "la carrière, l'image publique et les ambitions",
    11: "les amis, les groupes, les projets et les rêves dans les cartons", 12: "le subconscient, ce qui est caché, la spiritualité et le lâcher-prise"
  };
  const PROLE = {
    Sun: "ton moi", Moon: "tes émotions", Mercury: "ton esprit", Venus: "ta façon d'aimer",
    Mars: "ta niaque", Jupiter: "ta croissance", Saturn: "tes devoirs", Uranus: "ta liberté",
    Neptune: "tes rêves", Pluto: "ton intensité", Ascendant: "ton image", MC: "ta direction"
  };

  function signText(R, key, sign) {
    if (key === "Sun") return window.NATALTXT.sun(sign);
    if (key === "Moon") return window.NATALTXT.moon(sign);
    const p = P[key];
    return `${cap(p.dom)}. En ${sign.n}, ${p.verb} ${SIGN_EXPR[sign.k]}.`;
  }
  function houseText(key, n) {
    return `Avec <b>${P[key].n} en maison ${roman(n)}</b>, cette partie de toi se joue surtout sur <b>${HOUSE[n]}</b>.`;
  }
  function aspectLong(a) {
    const ra = PROLE[a.a.key] || a.a.name, rb = PROLE[a.b.key] || a.b.name;
    if (a.kind === "armonico")
      return `${cap(ra)} et ${rb} coulent en harmonie : ils collaborent presque sans effort. C'est un talent naturel — sers-t'en.`;
    if (a.kind === "teso")
      return `Entre ${ra} et ${rb}, ça frotte : ils se défient. C'est la tension qui, si tu la travailles au lieu de la subir, te fait grandir le plus.`;
    return `${cap(ra)} et ${rb} fusionnent : ils s'amplifient mutuellement, pour le meilleur et pour le pire. Un point de grande puissance dans ton ciel.`;
  }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function roman(n) { return ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][n] || n; }

  function report(R) {
    const aspects = window.NATALASPECTS.compute(R);
    const byPlanet = {};
    aspects.forEach(a => { (byPlanet[a.a.key] = byPlanet[a.a.key] || []).push(a); });

    let h = `<p class="dtl-intro">Voici la lecture <b>complète</b> de ton ciel : chaque planète, où elle tombe et comment elle dialogue avec les autres. Ce sont les "pièces" qui, assemblées, font <b>toi</b> — parfois même en contradiction, exactement comme les vraies personnes.</p>`;

    // --- LES PLANÈTES ---
    h += `<h3 class="dtl-h">Tes planètes, une par une</h3>`;
    R.planets.forEach(p => {
      const houseStr = p.house ? ` · Maison ${roman(p.house)}` : "";
      h += `<div class="dtl-block">`;
      h += `<div class="dtl-title">${p.glyph} ${P[p.key].n} en ${p.sign.n}${houseStr} <span class="dtl-deg">${p.degText}</span></div>`;
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
      h += `<h3 class="dtl-h">L'Ascendant — ton masque</h3>`;
      h += `<div class="dtl-block"><div class="dtl-title">↑ Ascendant ${R.ascendant.sign.n} <span class="dtl-deg">${R.ascendant.degText}</span></div><p>${window.NATALTXT.asc(R.ascendant.sign)}</p><p>C'est la première impression que tu donnes et ta façon de démarrer toute nouveauté.</p></div>`;
    }

    // --- LES MAISONS ---
    if (R.houses) {
      h += `<h3 class="dtl-h">Les 12 maisons — les terrains de ta vie</h3>`;
      R.houses.forEach(hh => {
        h += `<div class="dtl-block sm"><div class="dtl-title sm">Maison ${roman(hh.num)} en ${hh.sign.g} ${hh.sign.n}</div><p><span class="dtl-hk">${cap(HOUSE[hh.num])}.</span> Tu vis ce domaine ${SIGN_EXPR[hh.sign.k]}.</p></div>`;
      });
    } else {
      h += `<p class="dtl-note">Pour les maisons et l'Ascendant, il faut l'heure et le lieu de naissance exacts.</p>`;
    }

    return h;
  }

  window.NATALDETAIL_FR = { report };
})();
