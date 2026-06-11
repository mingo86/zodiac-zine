/* ============================================================
   ZODIAC · TEMA NATALE — LECTURA DETALLADA (larga) [ES]
   Estructura inspirada en el report de Cafe Astrology: planeta-en-signo,
   planeta-en-casa, signo-sobre-casa, aspectos interpretados.
   Voz pop, lista para reescritura AI con la voz del libro.
   Depende de: window.NATAL, window.NATALTXT, window.NATALASPECTS
   API: window.NATALDETAIL_ES.report(result) -> HTML
   ============================================================ */
(function () {
  const SIGN_EXPR = {
    ariete: "de forma directa, impulsiva y llena de empuje: sales el primero, odias esperar y te enciendes en un instante",
    toro: "con calma, concreción y sensualidad: vas despacio, construyes sobre lo sólido y no sueltas la presa",
    gemelli: "de forma curiosa, rápida y versátil: comunicas, cambias de idea y te aburres con facilidad",
    cancro: "de forma emotiva, protectora e intuitiva: lo sientes todo y proteges a quien amas",
    leone: "con calidez, orgullo y generosidad: quieres brillar y ponerle el corazón",
    vergine: "con precisión, método y espíritu práctico: cuidas los detalles y quieres ser útil",
    bilancia: "con elegancia, diplomacia y búsqueda de armonía: lo sopesas todo y buscas el equilibrio",
    scorpione: "con intensidad, profundidad y estrategia: o todo o nada, y llegas hasta el fondo",
    sagittario: "con entusiasmo, libertad y ganas de sentido: apuntas lejos y odias las jaulas",
    capricorno: "con disciplina, ambición y paciencia: construyes a largo plazo, paso a paso",
    acquario: "de forma original, libre y anticonvencional: piensas fuera de lo establecido",
    pesci: "de forma sensible, fluida e imaginativa: lo absorbes todo y sueñas despierto"
  };
  const P = {
    Sun: { n: "Sol", dom: "tu identidad, la vitalidad y lo que te hace brillar", verb: "tu yo se expresa" },
    Moon: { n: "Luna", dom: "tus emociones, tus instintos y la necesidad de sentirte a salvo", verb: "sientes y cuidas" },
    Mercury: { n: "Mercurio", dom: "cómo piensas, hablas, aprendes y conectas con los demás", verb: "tu mente trabaja" },
    Venus: { n: "Venus", dom: "cómo amas, qué te atrae y tu sentido de la belleza", verb: "amas y buscas placer" },
    Mars: { n: "Marte", dom: "tu garra, el deseo y tu forma de actuar", verb: "actúas y persigues lo que quieres" },
    Jupiter: { n: "Júpiter", dom: "dónde creces, te expandes y atraes fortuna", verb: "te expandes" },
    Saturn: { n: "Saturno", dom: "dónde aprendes disciplina, límites y responsabilidad", verb: "construyes con esfuerzo" },
    Uranus: { n: "Urano", dom: "dónde eres original y buscas libertad — un rasgo de generación", verb: "rompes esquemas" },
    Neptune: { n: "Neptuno", dom: "dónde sueñas, imaginas y te disuelves — un rasgo de generación", verb: "sueñas e idealizas" },
    Pluto: { n: "Plutón", dom: "dónde te transformas en profundidad — un rasgo de generación", verb: "te transformas" }
  };
  const HOUSE = {
    1: "tú mismo: la imagen que das y cómo arrancas", 2: "el dinero, los bienes y aquello a lo que das valor",
    3: "la mente del día a día, la comunicación, hermanos y vecindario", 4: "el hogar, las raíces, la familia y tu mundo íntimo",
    5: "el amor romántico, la creatividad, el juego y los hijos", 6: "el trabajo cotidiano, la salud y las rutinas",
    7: "las relaciones uno a uno: pareja, socios, contratos", 8: "la intimidad profunda, la transformación y los recursos compartidos",
    9: "los viajes, los estudios superiores, la filosofía y el extranjero", 10: "la carrera, la imagen pública y las ambiciones",
    11: "los amigos, los grupos, los proyectos y los sueños pendientes", 12: "el subconsciente, lo oculto, la espiritualidad y el soltar"
  };
  const PROLE = {
    Sun: "tu yo", Moon: "tus emociones", Mercury: "tu mente", Venus: "tu forma de amar",
    Mars: "tu garra", Jupiter: "tu crecimiento", Saturn: "tus deberes", Uranus: "tu libertad",
    Neptune: "tus sueños", Pluto: "tu intensidad", Ascendant: "tu imagen", MC: "tu dirección"
  };

  function signText(R, key, sign) {
    if (key === "Sun") return window.NATALTXT.sun(sign);
    if (key === "Moon") return window.NATALTXT.moon(sign);
    const p = P[key];
    return `${cap(p.dom)}. En ${sign.n} ${p.verb} ${SIGN_EXPR[sign.k]}.`;
  }
  function houseText(key, n) {
    return `Con <b>${P[key].n} en casa ${roman(n)}</b>, esta parte de ti se juega sobre todo en <b>${HOUSE[n]}</b>.`;
  }
  function aspectLong(a) {
    const ra = PROLE[a.a.key] || a.a.name, rb = PROLE[a.b.key] || a.b.name;
    if (a.kind === "armonico")
      return `${cap(ra)} y ${rb} fluyen en sintonía: colaboran casi sin esfuerzo. Es un talento natural — úsalo.`;
    if (a.kind === "teso")
      return `Entre ${ra} y ${rb} hay fricción: se desafían. Es la tensión que, si la trabajas en vez de sufrirla, más te hace crecer.`;
    return `${cap(ra)} y ${rb} se funden: se amplifican mutuamente, para bien y para mal. Un punto de gran potencia en tu cielo.`;
  }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function roman(n) { return ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][n] || n; }

  function report(R) {
    const aspects = window.NATALASPECTS.compute(R);
    const byPlanet = {};
    aspects.forEach(a => { (byPlanet[a.a.key] = byPlanet[a.a.key] || []).push(a); });

    let h = `<p class="dtl-intro">Esta es la lectura <b>completa</b> de tu cielo: cada planeta, dónde cae y cómo dialoga con los demás. Son las "piezas" que, juntas, te hacen <b>a ti</b> — a veces incluso en contradicción, igual que las personas de verdad.</p>`;

    // --- LOS PLANETAS ---
    h += `<h3 class="dtl-h">Tus planetas, uno a uno</h3>`;
    R.planets.forEach(p => {
      const houseStr = p.house ? ` · Casa ${roman(p.house)}` : "";
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

    // --- ASCENDENTE ---
    if (R.ascendant) {
      h += `<h3 class="dtl-h">El Ascendente — tu máscara</h3>`;
      h += `<div class="dtl-block"><div class="dtl-title">↑ Ascendente ${R.ascendant.sign.n} <span class="dtl-deg">${R.ascendant.degText}</span></div><p>${window.NATALTXT.asc(R.ascendant.sign)}</p><p>Es la primera impresión que das y tu forma de arrancar en todo lo nuevo.</p></div>`;
    }

    // --- LAS CASAS ---
    if (R.houses) {
      h += `<h3 class="dtl-h">Las 12 casas — los campos de tu vida</h3>`;
      R.houses.forEach(hh => {
        h += `<div class="dtl-block sm"><div class="dtl-title sm">Casa ${roman(hh.num)} en ${hh.sign.g} ${hh.sign.n}</div><p><span class="dtl-hk">${cap(HOUSE[hh.num])}.</span> Vives esta área ${SIGN_EXPR[hh.sign.k]}.</p></div>`;
      });
    } else {
      h += `<p class="dtl-note">Para las casas y el Ascendente hacen falta la hora y el lugar de nacimiento exactos.</p>`;
    }

    return h;
  }

  window.NATALDETAIL_ES = { report };
})();
