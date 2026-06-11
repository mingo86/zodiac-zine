/* ============================================================
   ZODIAC · TEMA NATALE — TEXTOS (voz pop / cómic) [ES]
   Sole = quién eres · Luna = cómo sientes · Ascendente = cómo te ven
   + líneas breves para los planetas.
   window.NATALTXT_ES.sun(sign) / .moon(sign) / .asc(sign) / .planet(key, sign)
   ============================================================ */
(function () {
  const SUN = {
    Ariete: "Eres la chispa que enciende la habitación. El primero en salir, el primero en atreverse: vives a toda velocidad y esperar te aburre. Valor para regalar, paciencia por entrenar.",
    Toro: "Eres la roca cálida: estable, sensual, fiel a lo bello y a lo bueno. Lento para encenderte, imposible de mover. Disfrutas la vida con los cinco sentidos.",
    Gemelli: "Mente curiosa, lengua rápida, mil ventanas abiertas. Cambias de idea como cambias de tema — y haces ambas cosas de maravilla. Te aburres, pero aburrido no eres jamás.",
    Cancro: "Corazón enorme con coraza. Lo sientes todo, lo recuerdas todo, proteges a los tuyos como un fortín. Casa, afectos y memoria son tu superpoder.",
    Leone: "Naciste para brillar y no pides perdón por ello. Generoso, cálido, dramático en su justa medida: cuando entras, se encienden las luces. Necesitas aplausos de verdad.",
    Vergine: "Ojo quirúrgico para el detalle que nadie ve. Práctico, preciso, útil: arreglas el mundo pieza a pieza. Aprende a perdonarte los errores.",
    Bilancia: "Buscas equilibrio, belleza y armonía en todo. Diplomático nato, vives de relaciones y detalles elegantes. Decidir es tu gimnasio.",
    Scorpione: "Intenso hasta la médula: o todo o nada. Ves bajo la superficie, amas en profundidad y no olvidas. Magnético, leal, imposible de ignorar.",
    Sagittario: "Alma libre con la flecha apuntando al horizonte. Vives de aventuras, verdad y sentido — odias las jaulas y las mentiras. Optimismo contagioso.",
    Capricorno: "Escalas la montaña con calma y disciplina. Ambicioso, fiable, irónico bajo la coraza de manager. Construyes cosas que duran.",
    Acquario: "Mente venida del futuro, alérgico a las reglas inútiles. Original, idealista, un poco alienígena — y a mucha honra. Cambias las cosas pensando en grande.",
    Pesci: "Soñador con las antenas puestas en el mundo invisible. Empático, creativo, fluido: sientes a los demás antes de que hablen. Necesitas tus propios límites."
  };
  const MOON = {
    Ariete: "Emociones de fuego rápido: te enciendes al instante y se te pasa igual de deprisa. Necesitas actuar para estar bien, no rumiar.",
    Toro: "Necesitas calma, comodidad y rutina para sentirte a salvo. Mimos, buena comida y estabilidad son tu medicina emocional.",
    Gemelli: "Sientes pensando: necesitas hablarlo para entenderlo. Te calma la variedad, te inquieta el aburrimiento. Cerebro siempre encendido, incluso de noche.",
    Cancro: "La Luna está en casa: lo sientes todo a máximo volumen. Afectos, recuerdos y nido te nutren; te retiras al caparazón cuando algo te hiere.",
    Leone: "Necesitas sentirte visto y amado para estar bien. Tu corazón cálido se alimenta de reconocimiento, drama y juego.",
    Vergine: "Te tranquiliza el orden: una lista hecha, una cosa resuelta. Tiendes a preocuparte — cuidar de los demás es tu lenguaje del amor.",
    Bilancia: "Estás bien cuando hay armonía a tu alrededor. Las peleas y la tensión te desestabilizan; la belleza y la compañía te devuelven al centro.",
    Scorpione: "Sientes en profundidad y en secreto: pocas emociones, pero oceánicas. Necesitas confianza total e intimidad de verdad para abrirte.",
    Sagittario: "Necesitas espacio, libertad y sentido. Te levanta el ánimo una aventura, una risa, un horizonte nuevo. La jaula te apaga.",
    Capricorno: "Controlas las emociones y te fías de los hechos. Te sientes seguro cuando tienes estructura y una meta. Permítete sentir, no solo gestionar.",
    Acquario: "Vives los sentimientos a la distancia justa: racionalizas antes de sentir. Necesitas libertad y amigos-tribu más que simbiosis.",
    Pesci: "Esponja emocional: absorbes el estado de ánimo de toda la habitación. Necesitas arte, sueño y momentos de soledad para recargarte."
  };
  const ASC = {
    Ariete: "Llegas como una energía directa y deportiva: pareces listo para salir disparado. Primera impresión: garra, espontaneidad y una pizca de impaciencia.",
    Toro: "Transmites calma y solidez: presencia relajada, voz suave, estilo cuidado. Pareces alguien de quien uno se puede fiar.",
    Gemelli: "Pareces despierto, brillante y charlatán: pones a todos cómodos al instante. Aire joven y curioso, mil preguntas listas.",
    Cancro: "Das la impresión de ser dulce, acogedor y un poco reservado. Los demás se sienten protegidos a tu lado.",
    Leone: "Entras con presencia: porte orgulloso, sonrisa cálida, algo magnético. Difícil no fijarse en ti.",
    Vergine: "Pareces sereno, atento y fiable: ojo para los detalles y modales medidos. Transmites competencia tranquila.",
    Bilancia: "Aire elegante y amable: encanto natural y maneras diplomáticas. Gustas con facilidad, pones paz en la habitación.",
    Scorpione: "Mirada intensa y magnética, un aura de misterio. Pareces alguien que ve más allá — fascinas y un poco intimidas.",
    Sagittario: "Llegas con energía abierta y optimista: sonrisa ancha, espíritu de viajero. Pareces alguien con quien uno se lo pasa bien.",
    Capricorno: "Transmites seriedad, control y ambición: presencia adulta incluso de joven. Pareces alguien que sabe lo que hace.",
    Acquario: "Aire original y un poco fuera de lo común: amistoso pero distante. Pareces alguien que piensa distinto.",
    Pesci: "Aura dulce, soñadora y escurridiza: mirada amable, maneras suaves. Pareces sensible y un poco en otra parte."
  };
  // Planetas menores: palabra clave por dominio + cómo la colorea el signo
  const PLANET_THEME = {
    Mercury: "Cómo piensas y comunicas",
    Venus: "Cómo amas y qué te gusta",
    Mars: "Cómo actúas y deseas",
    Jupiter: "Dónde creces y tienes suerte",
    Saturn: "Dónde aprendes y te comprometes",
    Uranus: "Dónde eres rebelde (generación)",
    Neptune: "Dónde sueñas (generación)",
    Pluto: "Dónde te transformas (generación)"
  };
  const SIGN_KW = {
    Ariete: "con impulso directo e impaciente",
    Toro: "con calma concreta y testaruda",
    Gemelli: "de forma curiosa, rápida y versátil",
    Cancro: "de forma emotiva, protectora e intuitiva",
    Leone: "con calidez, orgullo y teatralidad",
    Vergine: "con precisión, método y sentido práctico",
    Bilancia: "con elegancia, equilibrio y diplomacia",
    Scorpione: "con intensidad, estrategia y profundidad",
    Sagittario: "con entusiasmo, libertad y visión",
    Capricorno: "con disciplina, ambición y paciencia",
    Acquario: "de forma original, libre y fuera de lo común",
    Pesci: "de forma sensible, fluida y fantasiosa"
  };

  // ====== RETRATO COMPLETO: lectura sintética de toda la carta ======
  const ELEM = {
    fuoco: { adj: "fuego", temper: "Te mueven el instinto, el entusiasmo y las ganas de actuar: te enciendes rápido, le pones calor y valentía. Tu reto es canalizar toda esa energía sin quemarte.", much: "Mucho fuego: vives a tope, eres un motor encendido — cuidado con arrancar antes de pensar.", lack: "Poco fuego: la iniciativa y el entusiasmo espontáneo no te salen en automático — a veces necesitas un empujón para lanzarte." },
    terra: { adj: "tierra", temper: "Tienes los pies en el suelo: concreción, paciencia y sentido práctico. Construyes cosas que duran y te fías de lo que puedes tocar. Tu reto es no volverte rígido y dejar sitio al imprevisto.", much: "Mucha tierra: eres sólido, fiable, constructor nato — ojo con la rigidez y el «siempre se ha hecho así».", lack: "Poca tierra: lo concreto y la rutina te pesan — tu trabajo es enraizar los sueños en lo real." },
    aria: { adj: "aire", temper: "Vives de ideas, palabras y relaciones: mente rápida, curiosidad infinita, necesidad de intercambio. Entiendes el mundo pensándolo y contándolo. Tu reto es bajar de la cabeza al corazón y al cuerpo.", much: "Mucho aire: piensas y comunicas sin parar, mil conexiones — cuidado con vivir solo de cabeza.", lack: "Poco aire: racionalizar y tomar distancia no es tu fuerte — tiendes a vivir las cosas más que a analizarlas." },
    acqua: { adj: "agua", temper: "Lo sientes todo en profundidad: empatía, intuición y memoria emocional. Lees a las personas antes de que hablen y amas intensamente. Tu reto es proteger tus límites sin cerrarte.", much: "Mucha agua: eres una antena emocional potentísima — aprende a no absorber el estado de ánimo de todo el mundo.", lack: "Poca agua: la emotividad explícita te incomoda — tu crecimiento pasa por dar voz a lo que sientes." }
  };
  const MOD = {
    cardinale: "Eres de los que <b>arrancan</b>: inicias, propones, abres caminos. Energía de líder y de pionero; el reto es terminar lo que lanzas.",
    fisso: "Eres de los que <b>construyen y resisten</b>: determinación, constancia, lealtad. Una vez decidido no sueltas; el reto es la flexibilidad.",
    mobile: "Eres de los que <b>se adaptan y conectan</b>: versátil, curioso, camaleónico. Te mueves bien en el cambio; el reto es elegir y quedarte."
  };
  // diálogo Sol–Luna a nivel de elemento
  function elemPair(a, b) {
    if (a === b) return "El Sol y la Luna hablan el mismo idioma: por dentro y por fuera eres coherente, lo que muestras es lo que sientes. Una bonita fuerza tranquila.";
    const k = [a, b].sort().join("|");
    if (k === "aria|fuoco") return "Sol y Luna se alimentan mutuamente (fuego y aire): tus ideas encienden la acción y viceversa. Espontáneo, vivaz, un poco inquieto.";
    if (k === "acqua|terra") return "Sol y Luna se nutren mutuamente (tierra y agua): lo concreto y la emoción van de la mano. Profundo y fiable a la vez.";
    if (k === "fuoco|terra" || k === "aria|terra") return "Hay una tensión creativa entre quién eres y lo que sientes: una parte de ti empuja, la otra frena. Aprender a poner a dialogar a las dos mitades es tu superpoder.";
    if (k === "acqua|fuoco") return "Dentro de ti conviven fuego y agua: pasión y sensibilidad, impulso y profundidad. Una mezcla intensa, a veces contradictoria — pero magnética.";
    if (k === "acqua|aria") return "Entre cabeza y corazón (aire y agua) hay un diálogo continuo: analizas lo que sientes y sientes lo que piensas. Riqueza pura, aunque a veces te complicas.";
    return "Quién eres (Sol) y cómo sientes (Luna) viajan por vías distintas: una riqueza, si aprendes a traducir el uno en el otro.";
  }
  function countEl(planets) {
    const c = { fuoco: 0, terra: 0, aria: 0, acqua: 0 };
    planets.forEach(p => { if (c[p.sign.el] != null) c[p.sign.el]++; });
    return c;
  }
  function countMod(planets) {
    const c = { cardinale: 0, fisso: 0, mobile: 0 };
    planets.forEach(p => { if (c[p.sign.mod] != null) c[p.sign.mod]++; });
    return c;
  }
  function topKey(c) { return Object.keys(c).sort((a, b) => c[b] - c[a])[0]; }
  function lowKey(c) { return Object.keys(c).sort((a, b) => c[a] - c[b])[0]; }

  // construye el HTML del retrato a partir del resultado del cálculo
  function reading(R) {
    const sun = R.sun, moon = R.moon, asc = R.ascendant;
    // consideramos los 7 planetas "personales+sociales" para el equilibrio (no transgeneracionales) + Asc
    const core = R.planets.slice(0, 7).concat(asc ? [{ sign: asc.sign }] : []);
    const elc = countEl(core), modc = countMod(core);
    const domEl = topKey(elc), lowEl = lowKey(elc);
    const domMod = topKey(modc);

    let h = "";
    // 1. apertura
    h += `<p>Tu carta respira sobre todo de <b>${ELEM[domEl].adj}</b>. ${ELEM[domEl].temper}</p>`;
    // 2. los tres pilares juntos
    let p2 = `<p>Con el <b>Sol en ${sun.sign.n}</b> eres, en el fondo, ${shortSun(sun.sign)}. `;
    p2 += `La <b>Luna en ${moon.sign.n}</b> cuenta tu mundo emocional: ${shortMoon(moon.sign)}. `;
    if (asc) p2 += `Y el <b>Ascendente ${asc.sign.n}</b> es la primera impresión que das: ${shortAsc(asc.sign)}.`;
    else p2 += `(Con la hora de nacimiento podrás añadir también el Ascendente, la máscara con la que te presentas al mundo.)`;
    p2 += `</p>`;
    h += p2;
    // 3. diálogo sol-luna
    h += `<p>${elemPair(sun.sign.el, moon.sign.el)}</p>`;
    // 4. equilibrio de elementos
    const elOrder = ["fuoco", "terra", "aria", "acqua"].sort((a, b) => elc[b] - elc[a]);
    h += `<p><b>Tu equilibrio:</b> ${ELEM[domEl].much} `;
    if (elc[lowEl] === 0) h += `En cambio, el elemento <b>${ELEM[lowEl].adj}</b> está ausente o casi: ${ELEM[lowEl].lack}</p>`;
    else h += `El elemento menos presente es <b>${ELEM[lowEl].adj}</b>: ${ELEM[lowEl].lack}</p>`;
    // 5. modalidad
    h += `<p>${MOD[domMod]}</p>`;
    // 6. mente / amor / acción
    const merc = R.planets[2], ven = R.planets[3], mars = R.planets[4];
    h += `<p><b>Mente, amor, acción.</b> Piensas y comunicas ${kw(merc.sign)} (Mercurio en ${merc.sign.n}). `;
    h += `En el amor y el placer te mueves ${kw(ven.sign)} (Venus en ${ven.sign.n}). `;
    h += `Y cuando actúas o deseas, lo haces ${kw(mars.sign)} (Marte en ${mars.sign.n}).</p>`;
    // 7. cierre
    h += `<p class="closing">En resumen: ${closing(sun.sign, moon.sign, asc ? asc.sign : null, domEl)}</p>`;
    return h;
  }
  // extractos breves (primera frase) de los textos pilar
  function firstSentence(t) { const m = t.match(/^[^.]*\./); return m ? m[0].toLowerCase().replace(/^./, c => c.toLowerCase()) : t; }
  function shortSun(s) { return firstSentence(SUN[s.n] || "").replace(/\.$/, ""); }
  function shortMoon(s) { return firstSentence(MOON[s.n] || "").replace(/\.$/, "").replace(/^[A-Z]/, c => c.toLowerCase()); }
  function shortAsc(s) { return firstSentence(ASC[s.n] || "").replace(/\.$/, "").replace(/^[A-Z]/, c => c.toLowerCase()); }
  function kw(s) { return SIGN_KW[s.n] || ""; }
  function closing(sun, moon, asc, domEl) {
    let t = `un alma de ${ELEM[domEl].adj}, ${sun.n} en el corazón`;
    t += ` y ${moon.n} en las emociones`;
    if (asc) t += `, que al mundo se presenta con aire de ${asc.n}`;
    t += `. Lo bonito de tu carta está justo ahí: no eres una sola etiqueta, sino el encuentro de todas estas energías.`;
    return t;
  }

  window.NATALTXT_ES = {
    sun: s => SUN[s.n] || "",
    moon: s => MOON[s.n] || "",
    asc: s => ASC[s.n] || "",
    planetTheme: key => PLANET_THEME[key] || "",
    planet: (key, sign) => (PLANET_THEME[key] || "") + " " + (SIGN_KW[sign.n] || "") + ".",
    reading: reading
  };
})();
