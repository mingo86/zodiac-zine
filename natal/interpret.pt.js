/* ============================================================
   ZODIAC · TEMA NATALE — TESTI (voce pop / fumetto) — pt-BR
   Sole = chi sei · Luna = come senti · Ascendente = come appari
   + righe brevi per i pianeti.
   window.NATALTXT_PT.sun(sign) / .moon(sign) / .asc(sign) / .planet(key, sign)
   ============================================================ */
(function () {
  const SUN = {
    Ariete: "Você é a faísca que acende a sala. Primeiro a partir, primeiro a ousar: vive em alta velocidade e a espera te entedia. Coragem de sobra, paciência em treinamento.",
    Toro: "Você é a rocha quentinha: estável, sensual, fiel ao belo e ao bom. Demora para acender, impossível de mover do lugar. Aproveita a vida com os cinco sentidos.",
    Gemelli: "Mente curiosa, língua rápida, mil janelas abertas. Você muda de ideia como muda de assunto — e faz as duas coisas muito bem. Você se entedia, mas nunca é entediante.",
    Cancro: "Coração grande com armadura. Sente tudo, lembra de tudo, protege os seus como um fortim. Lar, afetos e memória são o seu superpoder.",
    Leone: "Nasceu para brilhar e não pede desculpa por isso. Generoso, caloroso, dramático na medida certa: quando você entra, as luzes se acendem. Precisa de aplausos de verdade.",
    Vergine: "Olho cirúrgico para o detalhe que ninguém vê. Prático, preciso, útil: você conserta o mundo um pedaço de cada vez. Aprenda a perdoar os próprios erros.",
    Bilancia: "Você busca equilíbrio, beleza e harmonia em tudo. Diplomata nato, vive de relações e detalhes elegantes. Decidir é a sua academia.",
    Scorpione: "Intenso até a medula: ou tudo ou nada. Você enxerga por baixo da superfície, ama em profundidade e não esquece. Magnético, leal, impossível de ignorar.",
    Sagittario: "Alma livre com a flecha apontada para o horizonte. Vive de aventuras, verdade e significado — odeia gaiolas e mentiras. Otimismo contagiante.",
    Capricorno: "Você escala a montanha com calma e disciplina. Ambicioso, confiável, irônico por baixo da armadura de executivo. Constrói coisas que duram.",
    Acquario: "Mente vinda do futuro, alérgico a regras inúteis. Original, idealista, meio alienígena — e com orgulho disso. Você muda as coisas pensando grande.",
    Pesci: "Sonhador com as antenas ligadas no mundo invisível. Empático, criativo, fluido: sente os outros antes que eles falem. Você precisa dos seus limites."
  };
  const MOON = {
    Ariete: "Emoções em fogo rápido: você acende na hora e desacende igualmente rápido. Precisa agir para ficar bem, não ficar ruminando.",
    Toro: "Você precisa de calma, conforto e rotina para se sentir seguro. Carinho, boa comida e estabilidade são o seu remédio emocional.",
    Gemelli: "Você sente pensando: precisa falar do assunto para entendê-lo. A variedade te acalma, o tédio te agita. Cérebro sempre ligado, até de noite.",
    Cancro: "A Lua está em casa: você sente tudo no volume máximo. Afetos, lembranças e ninho te nutrem; você se recolhe na concha quando ferido.",
    Leone: "Você precisa se sentir visto e amado para ficar bem. O coração quente se aquece com reconhecimento, drama e brincadeira.",
    Vergine: "A ordem te tranquiliza: uma lista concluída, uma coisa arrumada. Você tende a se preocupar — cuidar dos outros é a sua língua do amor.",
    Bilancia: "Você fica bem quando há harmonia ao redor. Brigas e tensão te desestabilizam; a beleza e a companhia te recolocam no centro.",
    Scorpione: "Você sente em profundidade e em segredo: poucas emoções, mas oceânicas. Precisa de confiança total e intimidade de verdade para se abrir.",
    Sagittario: "Você precisa de espaço, liberdade e sentido. Uma aventura, uma risada, um horizonte novo te levantam. A gaiola te apaga.",
    Capricorno: "Você controla as emoções e confia nos fatos. Sente-se seguro quando tem uma estrutura e uma meta. Permita-se sentir, não só administrar.",
    Acquario: "Você vive os sentimentos à distância certa: racionaliza antes de sentir. Precisa de liberdade e de amigos-tribo mais do que de simbiose.",
    Pesci: "Esponja emocional: você absorve o clima da sala. Precisa de arte, sonho e momentos de solidão para recarregar."
  };
  const ASC = {
    Ariete: "Você chega como uma energia direta e esportiva: parece pronto para a largada. Primeira impressão: garra, espontaneidade, uma pitada de impaciência.",
    Toro: "Você transmite calma e solidez: presença relaxada, voz macia, estilo caprichado. Parece alguém em quem se pode confiar.",
    Gemelli: "Você parece esperto, brilhante e tagarela: deixa todo mundo à vontade na hora. Ar jovem e curioso, mil perguntas prontas.",
    Cancro: "Você dá a impressão de ser doce, acolhedor e meio reservado. Os outros se sentem protegidos perto de você.",
    Leone: "Você entra com presença: porte altivo, sorriso caloroso, algo de magnético. Difícil não te notar.",
    Vergine: "Você parece composto, atento e confiável: olho nos detalhes e modos comedidos. Transmite competência tranquila.",
    Bilancia: "Ar elegante e gentil: charme natural e jeito diplomático. Você agrada fácil, traz paz para a sala.",
    Scorpione: "Olhar intenso e magnético, uma aura de mistério. Você parece alguém que vê além — fascina e intimida um pouco.",
    Sagittario: "Você chega com energia aberta e otimista: sorriso largo, espírito de viajante. Parece alguém com quem a diversão é garantida.",
    Capricorno: "Você transmite seriedade, controle e ambição: presença adulta mesmo quando jovem. Parece alguém que sabe o que faz.",
    Acquario: "Ar original e meio fora dos padrões: amigável, mas com certa distância. Você parece alguém que pensa diferente.",
    Pesci: "Aura doce, sonhadora e esquiva: olhar gentil, modos suaves. Você parece sensível e meio em outro lugar."
  };
  // Pianeti minori: parola-chiave per dominio + come la colora il segno
  const PLANET_THEME = {
    Mercury: "Como você pensa e se comunica",
    Venus: "Como você ama e o que te agrada",
    Mars: "Como você age e deseja",
    Jupiter: "Onde você cresce e tem sorte",
    Saturn: "Onde você aprende e se dedica",
    Uranus: "Onde você é rebelde (geração)",
    Neptune: "Onde você sonha (geração)",
    Pluto: "Onde você se transforma (geração)"
  };
  const SIGN_KW = {
    Ariete: "com ímpeto direto e impaciente",
    Toro: "com calma concreta e teimosa",
    Gemelli: "de um jeito curioso, rápido e versátil",
    Cancro: "de um jeito emotivo, protetor e intuitivo",
    Leone: "com calor, orgulho e teatralidade",
    Vergine: "com precisão, método e senso prático",
    Bilancia: "com elegância, equilíbrio e diplomacia",
    Scorpione: "com intensidade, estratégia e profundidade",
    Sagittario: "com entusiasmo, liberdade e visão",
    Capricorno: "com disciplina, ambição e paciência",
    Acquario: "de um jeito original, livre e fora dos padrões",
    Pesci: "de um jeito sensível, fluido e cheio de imaginação"
  };

  // ====== RITRATTO COMPLETO: lettura sintetica dell'intero tema ======
  const ELEM = {
    fuoco: { adj: "fuoco", temper: "Você é movido pelo instinto, pelo entusiasmo e pela vontade de agir: acende rápido, coloca calor e coragem em tudo. Seu desafio é canalizar toda essa energia sem se queimar.", much: "Muito fuoco: você vive com tudo, é um motor ligado — cuidado para não partir antes de pensar.", lack: "Pouco fuoco: a iniciativa e o entusiasmo espontâneo não são o seu modo automático — às vezes você precisa de um empurrão para se jogar." },
    terra: { adj: "terra", temper: "Você tem os pés no chão: concretude, paciência e senso prático. Constrói coisas que duram e confia no que pode tocar. Seu desafio é não enrijecer e deixar espaço para o imprevisto.", much: "Muita terra: você é sólido, confiável, construtor nato — atenção à rigidez e ao «sempre foi assim».", lack: "Pouca terra: a concretude e a rotina te pesam — seu trabalho é enraizar os sonhos no mundo real." },
    aria: { adj: "aria", temper: "Você vive de ideias, palavras e relações: mente rápida, curiosidade infinita, necessidade de troca. Entende o mundo pensando nele e contando sobre ele. Seu desafio é descer da cabeça para o coração e para o corpo.", much: "Muita aria: você pensa e se comunica sem parar, mil conexões — cuidado para não viver só de cabeça.", lack: "Pouca aria: racionalizar e tomar distância não é o seu forte — você tende a viver as coisas, mais do que analisá-las." },
    acqua: { adj: "acqua", temper: "Você sente tudo em profundidade: empatia, intuição e memória emocional. Lê as pessoas antes que elas falem e ama intensamente. Seu desafio é proteger os seus limites sem se fechar.", much: "Muita acqua: você é uma antena emocional potentíssima — aprenda a não absorver o humor de todo mundo.", lack: "Pouca acqua: a emoção explícita te deixa desconfortável — seu crescimento é dar voz ao que você sente." }
  };
  const MOD = {
    cardinale: "Você é alguém que <b>parte na frente</b>: inicia, propõe, abre caminhos. Energia de líder e de pioneiro; o desafio é terminar o que lança.",
    fisso: "Você é alguém que <b>constrói e resiste</b>: determinação, constância, lealdade. Uma vez decidido, não solta; o desafio é a flexibilidade.",
    mobile: "Você é alguém que <b>se adapta e conecta</b>: versátil, curioso, camaleônico. Move-se bem na mudança; o desafio é escolher e ficar."
  };
  // dialogo Sole–Luna a livello di elemento
  function elemPair(a, b) {
    if (a === b) return "Sol e Lua falam a mesma língua: por dentro e por fora você é coerente, o que mostra é o que sente. Uma bela força tranquila.";
    const k = [a, b].sort().join("|");
    if (k === "aria|fuoco") return "Sol e Lua se alimentam mutuamente (fuoco e aria): suas ideias acendem a ação e vice-versa. Espontâneo, vivaz, um tanto inquieto.";
    if (k === "acqua|terra") return "Sol e Lua se nutrem mutuamente (terra e acqua): concretude e emoção andam de mãos dadas. Profundo e confiável ao mesmo tempo.";
    if (k === "fuoco|terra" || k === "aria|terra") return "Há uma tensão criativa entre quem você é e o que você sente: parte de você empurra, parte freia. Aprender a fazer as duas metades conversarem é o seu superpoder.";
    if (k === "acqua|fuoco") return "Dentro de você convivem fuoco e acqua: paixão e sensibilidade, ímpeto e profundidade. Uma mistura intensa, às vezes contraditória — mas magnética.";
    if (k === "acqua|aria") return "Entre cabeça e coração (aria e acqua) há um diálogo contínuo: você analisa o que sente e sente o que pensa. Rico, mas às vezes você se complica.";
    return "Quem você é (Sol) e como você sente (Lua) viajam em trilhos diferentes: uma riqueza, se você aprender a traduzir um no outro.";
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

  // costruisce l'HTML del ritratto a partire dal risultato del calcolo
  function reading(R) {
    const sun = R.sun, moon = R.moon, asc = R.ascendant;
    // consideriamo i 7 pianeti "personali+sociali" per l'equilibrio (no transgenerazionali) + Asc
    const core = R.planets.slice(0, 7).concat(asc ? [{ sign: asc.sign }] : []);
    const elc = countEl(core), modc = countMod(core);
    const domEl = topKey(elc), lowEl = lowKey(elc);
    const domMod = topKey(modc);

    let h = "";
    // 1. apertura
    h += `<p>Seu mapa respira sobretudo <b>${ELEM[domEl].adj}</b>. ${ELEM[domEl].temper}</p>`;
    // 2. i tre pilastri insieme
    let p2 = `<p>Com o <b>Sol em ${sun.sign.n}</b>, no fundo, ${shortSun(sun.sign)}. `;
    p2 += `A <b>Lua em ${moon.sign.n}</b> conta o seu mundo emocional: ${shortMoon(moon.sign)}. `;
    if (asc) p2 += `E o <b>Ascendente ${asc.sign.n}</b> é a primeira impressão que você causa: ${shortAsc(asc.sign)}.`;
    else p2 += `(Com a hora de nascimento você poderá adicionar também o Ascendente, a máscara com que se apresenta ao mundo.)`;
    p2 += `</p>`;
    h += p2;
    // 3. dialogo sole-luna
    h += `<p>${elemPair(sun.sign.el, moon.sign.el)}</p>`;
    // 4. equilibrio elementi
    const elOrder = ["fuoco", "terra", "aria", "acqua"].sort((a, b) => elc[b] - elc[a]);
    h += `<p><b>Seu equilíbrio:</b> ${ELEM[domEl].much} `;
    if (elc[lowEl] === 0) h += `Por outro lado, o elemento <b>${ELEM[lowEl].adj}</b> está ausente ou quase: ${ELEM[lowEl].lack}</p>`;
    else h += `O elemento menos presente é <b>${ELEM[lowEl].adj}</b>: ${ELEM[lowEl].lack}</p>`;
    // 5. modalità
    h += `<p>${MOD[domMod]}</p>`;
    // 6. mente / amore / azione
    const merc = R.planets[2], ven = R.planets[3], mars = R.planets[4];
    h += `<p><b>Mente, amor, ação.</b> Você pensa e se comunica ${kw(merc.sign)} (Mercúrio em ${merc.sign.n}). `;
    h += `No amor e no prazer você se move ${kw(ven.sign)} (Vênus em ${ven.sign.n}). `;
    h += `E quando age ou deseja, faz isso ${kw(mars.sign)} (Marte em ${mars.sign.n}).</p>`;
    // 7. chiusura
    h += `<p class="closing">Resumindo: ${closing(sun.sign, moon.sign, asc ? asc.sign : null, domEl)}</p>`;
    return h;
  }
  // estratti brevi (prima frase) dei testi pilastro
  function firstSentence(t) { const m = t.match(/^[^.]*\./); return m ? m[0].toLowerCase().replace(/^./, c => c.toLowerCase()) : t; }
  function shortSun(s) { return firstSentence(SUN[s.n] || "").replace(/\.$/, ""); }
  function shortMoon(s) { return firstSentence(MOON[s.n] || "").replace(/\.$/, "").replace(/^[A-Z]/, c => c.toLowerCase()); }
  function shortAsc(s) { return firstSentence(ASC[s.n] || "").replace(/\.$/, "").replace(/^[A-Z]/, c => c.toLowerCase()); }
  function kw(s) { return SIGN_KW[s.n] || ""; }
  function closing(sun, moon, asc, domEl) {
    let t = `uma alma de ${ELEM[domEl].adj}, ${sun.n} no coração`;
    t += ` e ${moon.n} nas emoções`;
    if (asc) t += `, que se apresenta ao mundo com o ar de ${asc.n}`;
    t += `. A beleza do seu mapa está bem aqui: você não é um rótulo só, mas o encontro de todas essas energias.`;
    return t;
  }

  window.NATALTXT_PT = {
    sun: s => SUN[s.n] || "",
    moon: s => MOON[s.n] || "",
    asc: s => ASC[s.n] || "",
    planetTheme: key => PLANET_THEME[key] || "",
    planet: (key, sign) => (PLANET_THEME[key] || "") + " " + (SIGN_KW[sign.n] || "") + ".",
    reading: reading
  };
})();
