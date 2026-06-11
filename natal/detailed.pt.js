/* ============================================================
   ZODIAC · TEMA NATALE — LETTURA DETTAGLIATA (lunga) — pt-BR
   Struttura ispirata al report di Cafe Astrology: pianeta-in-segno,
   pianeta-in-casa, segno-su-casa, aspetti interpretati.
   Voce pop, pronta per riscrittura AI nella voce del libro.
   Dipende da: window.NATAL, window.NATALTXT, window.NATALASPECTS
   API: window.NATALDETAIL_PT.report(result) -> HTML
   ============================================================ */
(function () {
  const SIGN_EXPR = {
    ariete: "de um jeito direto, impulsivo e cheio de ímpeto: você parte primeiro, odeia esperar e acende num instante",
    toro: "com calma, concretude e sensualidade: você vai devagar, constrói sobre o sólido e não larga o osso",
    gemelli: "de um jeito curioso, rápido e versátil: você se comunica, muda de ideia e se entedia fácil",
    cancro: "de um jeito emotivo, protetor e intuitivo: você sente tudo e protege quem ama",
    leone: "com calor, orgulho e generosidade: você quer brilhar e colocar o coração em tudo",
    vergine: "com precisão, método e espírito prático: você cuida dos detalhes e quer ser útil",
    bilancia: "com elegância, diplomacia e busca de harmonia: você pesa tudo e procura o equilíbrio",
    scorpione: "com intensidade, profundidade e estratégia: ou tudo ou nada, e você vai até o fim",
    sagittario: "com entusiasmo, liberdade e sede de sentido: você mira longe e odeia gaiolas",
    capricorno: "com disciplina, ambição e paciência: você constrói no longo prazo, um passo de cada vez",
    acquario: "de um jeito original, livre e anticonvencional: você pensa fora da caixa",
    pesci: "de um jeito sensível, fluido e imaginativo: você absorve tudo e sonha acordado"
  };
  const P = {
    Sun: { n: "Sol", dom: "a sua identidade, a vitalidade e o que te faz brilhar", verb: "o seu eu se expressa" },
    Moon: { n: "Lua", dom: "as suas emoções, os seus instintos e a necessidade de se sentir seguro", verb: "você sente e cuida" },
    Mercury: { n: "Mercúrio", dom: "como você pensa, fala, aprende e se conecta com os outros", verb: "a sua mente trabalha" },
    Venus: { n: "Vênus", dom: "como você ama, o que te atrai e o seu senso de beleza", verb: "você ama e busca prazer" },
    Mars: { n: "Marte", dom: "a sua garra, o desejo e o jeito como você age", verb: "você age e corre atrás do que quer" },
    Jupiter: { n: "Júpiter", dom: "onde você cresce, se expande e atrai sorte", verb: "você se expande" },
    Saturn: { n: "Saturno", dom: "onde você aprende disciplina, limites e responsabilidade", verb: "você constrói com empenho" },
    Uranus: { n: "Urano", dom: "onde você é original e busca liberdade — um traço de geração", verb: "você quebra padrões" },
    Neptune: { n: "Netuno", dom: "onde você sonha, imagina e se dissolve — um traço de geração", verb: "você sonha e idealiza" },
    Pluto: { n: "Plutão", dom: "onde você se transforma em profundidade — um traço de geração", verb: "você se transforma" }
  };
  const HOUSE = {
    1: "você mesmo: a imagem que você passa e como você começa as coisas", 2: "o dinheiro, os bens e aquilo a que você dá valor",
    3: "a mente do dia a dia, a comunicação, irmãos e vizinhança", 4: "o lar, as raízes, a família e o seu mundo íntimo",
    5: "o amor romântico, a criatividade, a diversão e os filhos", 6: "o trabalho cotidiano, a saúde e as rotinas",
    7: "as relações um a um: parceiros, sócios, contratos", 8: "a intimidade profunda, a transformação e os recursos compartilhados",
    9: "as viagens, os estudos superiores, a filosofia e o exterior", 10: "a carreira, a imagem pública e as ambições",
    11: "os amigos, os grupos, os projetos e os sonhos na gaveta", 12: "o subconsciente, o que está escondido, a espiritualidade e o deixar ir"
  };
  const PROLE = {
    Sun: "o seu eu", Moon: "as suas emoções", Mercury: "a sua mente", Venus: "o seu jeito de amar",
    Mars: "a sua garra", Jupiter: "o seu crescimento", Saturn: "os seus deveres", Uranus: "a sua liberdade",
    Neptune: "os seus sonhos", Pluto: "a sua intensidade", Ascendant: "a sua imagem", MC: "a sua direção"
  };

  function signText(R, key, sign) {
    if (key === "Sun") return window.NATALTXT.sun(sign);
    if (key === "Moon") return window.NATALTXT.moon(sign);
    const p = P[key];
    return `${cap(p.dom)}. Em ${sign.n} ${p.verb} ${SIGN_EXPR[sign.k]}.`;
  }
  function houseText(key, n) {
    return `Com <b>${P[key].n} na casa ${roman(n)}</b>, essa parte de você se joga sobretudo em <b>${HOUSE[n]}</b>.`;
  }
  function aspectLong(a) {
    const ra = PROLE[a.a.key] || a.a.name, rb = PROLE[a.b.key] || a.b.name;
    if (a.kind === "armonico")
      return `${cap(ra)} e ${rb} fluem em sintonia: colaboram quase sem esforço. É um talento natural — use-o.`;
    if (a.kind === "teso")
      return `Entre ${ra} e ${rb} há atrito: eles se desafiam. É a tensão que, se você trabalhar em vez de só sofrer, te faz crescer mais.`;
    return `${cap(ra)} e ${rb} se fundem: amplificam-se mutuamente, para o bem e para o mal. Um ponto de grande potência no seu céu.`;
  }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function roman(n) { return ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][n] || n; }

  function report(R) {
    const aspects = window.NATALASPECTS.compute(R);
    const byPlanet = {};
    aspects.forEach(a => { (byPlanet[a.a.key] = byPlanet[a.a.key] || []).push(a); });

    let h = `<p class="dtl-intro">Esta é a leitura <b>completa</b> do seu céu: cada planeta, onde ele cai e como dialoga com os outros. São as "peças" que, juntas, fazem <b>você</b> — às vezes até em contradição, exatamente como as pessoas de verdade.</p>`;

    // --- I PIANETI ---
    h += `<h3 class="dtl-h">Seus planetas, um por um</h3>`;
    R.planets.forEach(p => {
      const houseStr = p.house ? ` · Casa ${roman(p.house)}` : "";
      h += `<div class="dtl-block">`;
      h += `<div class="dtl-title">${p.glyph} ${P[p.key].n} em ${p.sign.n}${houseStr} <span class="dtl-deg">${p.degText}</span></div>`;
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
      h += `<h3 class="dtl-h">O Ascendente — a sua máscara</h3>`;
      h += `<div class="dtl-block"><div class="dtl-title">↑ Ascendente ${R.ascendant.sign.n} <span class="dtl-deg">${R.ascendant.degText}</span></div><p>${window.NATALTXT.asc(R.ascendant.sign)}</p><p>É a primeira impressão que você causa e o jeito como você começa qualquer coisa nova.</p></div>`;
    }

    // --- LE CASE ---
    if (R.houses) {
      h += `<h3 class="dtl-h">As 12 casas — os campos da sua vida</h3>`;
      R.houses.forEach(hh => {
        h += `<div class="dtl-block sm"><div class="dtl-title sm">Casa ${roman(hh.num)} em ${hh.sign.g} ${hh.sign.n}</div><p><span class="dtl-hk">${cap(HOUSE[hh.num])}.</span> Você vive esta área ${SIGN_EXPR[hh.sign.k]}.</p></div>`;
      });
    } else {
      h += `<p class="dtl-note">Para as casas e o Ascendente são necessários a hora e o local de nascimento exatos.</p>`;
    }

    return h;
  }

  window.NATALDETAIL_PT = { report };
})();
