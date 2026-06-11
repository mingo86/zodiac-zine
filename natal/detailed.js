/* ============================================================
   ZODIAC · TEMA NATALE — LETTURA DETTAGLIATA (lunga)
   Struttura ispirata al report di Cafe Astrology: pianeta-in-segno,
   pianeta-in-casa, segno-su-casa, aspetti interpretati.
   Voce pop, pronta per riscrittura AI nella voce del libro.
   Dipende da: window.NATAL, window.NATALTXT, window.NATALASPECTS
   API: window.NATALDETAIL.report(result) -> HTML
   ============================================================ */
(function () {
  const SIGN_EXPR = {
    ariete: "in modo diretto, impulsivo e pieno di slancio: parti per primo, odi aspettare e ti accendi in un istante",
    toro: "con calma, concretezza e sensualità: vai piano, costruisci sul solido e non molli la presa",
    gemelli: "in modo curioso, veloce e versatile: comunichi, cambi idea e ti annoi facilmente",
    cancro: "in modo emotivo, protettivo e intuitivo: senti tutto e proteggi chi ami",
    leone: "con calore, orgoglio e generosità: vuoi brillare e metterci il cuore",
    vergine: "con precisione, metodo e spirito pratico: curi i dettagli e vuoi essere utile",
    bilancia: "con eleganza, diplomazia e ricerca di armonia: pesi tutto e cerchi l'equilibrio",
    scorpione: "con intensità, profondità e strategia: o tutto o niente, e vai fino in fondo",
    sagittario: "con entusiasmo, libertà e voglia di senso: punti lontano e odi le gabbie",
    capricorno: "con disciplina, ambizione e pazienza: costruisci a lungo termine, un passo alla volta",
    acquario: "in modo originale, libero e anticonvenzionale: pensi fuori dagli schemi",
    pesci: "in modo sensibile, fluido e immaginifico: assorbi tutto e sogni a occhi aperti"
  };
  const P = {
    Sun: { n: "Sole", dom: "la tua identità, la vitalità e ciò che ti fa brillare", verb: "il tuo io si esprime" },
    Moon: { n: "Luna", dom: "le tue emozioni, i tuoi istinti e il bisogno di sentirti al sicuro", verb: "senti e ti prendi cura" },
    Mercury: { n: "Mercurio", dom: "come pensi, parli, impari e ti colleghi agli altri", verb: "la tua mente lavora" },
    Venus: { n: "Venere", dom: "come ami, cosa ti attrae e il tuo senso del bello", verb: "ami e cerchi piacere" },
    Mars: { n: "Marte", dom: "la tua grinta, il desiderio e il modo in cui agisci", verb: "agisci e insegui ciò che vuoi" },
    Jupiter: { n: "Giove", dom: "dove cresci, ti espandi e attiri fortuna", verb: "ti espandi" },
    Saturn: { n: "Saturno", dom: "dove impari disciplina, limiti e responsabilità", verb: "costruisci con impegno" },
    Uranus: { n: "Urano", dom: "dove sei originale e cerchi libertà — un tratto di generazione", verb: "rompi gli schemi" },
    Neptune: { n: "Nettuno", dom: "dove sogni, immagini e ti dissolvi — un tratto di generazione", verb: "sogni e idealizzi" },
    Pluto: { n: "Plutone", dom: "dove ti trasformi in profondità — un tratto di generazione", verb: "ti trasformi" }
  };
  const HOUSE = {
    1: "te stesso: l'immagine che dai e come parti", 2: "i soldi, i beni e ciò a cui dai valore",
    3: "la mente di tutti i giorni, la comunicazione, fratelli e vicinato", 4: "la casa, le radici, la famiglia e il tuo mondo intimo",
    5: "l'amore romantico, la creatività, il gioco e i figli", 6: "il lavoro quotidiano, la salute e le routine",
    7: "le relazioni uno-a-uno: partner, soci, contratti", 8: "l'intimità profonda, la trasformazione e le risorse condivise",
    9: "i viaggi, gli studi alti, la filosofia e l'estero", 10: "la carriera, l'immagine pubblica e le ambizioni",
    11: "gli amici, i gruppi, i progetti e i sogni nel cassetto", 12: "il subconscio, ciò che è nascosto, la spiritualità e il lasciar andare"
  };
  const PROLE = {
    Sun: "il tuo io", Moon: "le tue emozioni", Mercury: "la tua mente", Venus: "il tuo modo di amare",
    Mars: "la tua grinta", Jupiter: "la tua crescita", Saturn: "i tuoi doveri", Uranus: "la tua libertà",
    Neptune: "i tuoi sogni", Pluto: "la tua intensità", Ascendant: "la tua immagine", MC: "la tua direzione"
  };

  function signText(R, key, sign) {
    if (key === "Sun") return window.NATALTXT.sun(sign);
    if (key === "Moon") return window.NATALTXT.moon(sign);
    const p = P[key];
    return `${cap(p.dom)}. In ${sign.n} ${p.verb} ${SIGN_EXPR[sign.k]}.`;
  }
  function houseText(key, n) {
    return `Con <b>${P[key].n} in casa ${roman(n)}</b>, questa parte di te si gioca soprattutto su <b>${HOUSE[n]}</b>.`;
  }
  function aspectLong(a) {
    const ra = PROLE[a.a.key] || a.a.name, rb = PROLE[a.b.key] || a.b.name;
    if (a.kind === "armonico")
      return `${cap(ra)} e ${rb} scorrono in sintonia: collaborano quasi senza sforzo. È un talento naturale — usalo.`;
    if (a.kind === "teso")
      return `Tra ${ra} e ${rb} c'è attrito: si sfidano. È la tensione che, se la lavori invece di subirla, ti fa crescere di più.`;
    return `${cap(ra)} e ${rb} si fondono: si amplificano a vicenda, nel bene e nel male. Un punto di grande potenza nel tuo cielo.`;
  }
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function roman(n) { return ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"][n] || n; }

  function report(R) {
    const aspects = window.NATALASPECTS.compute(R);
    const byPlanet = {};
    aspects.forEach(a => { (byPlanet[a.a.key] = byPlanet[a.a.key] || []).push(a); });

    let h = `<p class="dtl-intro">Questa è la lettura <b>completa</b> del tuo cielo: ogni pianeta, dove cade e come dialoga con gli altri. Sono i "pezzi" che, messi insieme, fanno <b>te</b> — a volte anche in contraddizione, proprio come le persone vere.</p>`;

    // --- I PIANETI ---
    h += `<h3 class="dtl-h">I tuoi pianeti, uno per uno</h3>`;
    R.planets.forEach(p => {
      const houseStr = p.house ? ` · Casa ${roman(p.house)}` : "";
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

    // --- ASCENDENTE ---
    if (R.ascendant) {
      h += `<h3 class="dtl-h">L'Ascendente — la tua maschera</h3>`;
      h += `<div class="dtl-block"><div class="dtl-title">↑ Ascendente ${R.ascendant.sign.n} <span class="dtl-deg">${R.ascendant.degText}</span></div><p>${window.NATALTXT.asc(R.ascendant.sign)}</p><p>È la prima impressione che dai e il modo in cui parti in ogni cosa nuova.</p></div>`;
    }

    // --- LE CASE ---
    if (R.houses) {
      h += `<h3 class="dtl-h">Le 12 case — i campi della tua vita</h3>`;
      R.houses.forEach(hh => {
        h += `<div class="dtl-block sm"><div class="dtl-title sm">Casa ${roman(hh.num)} in ${hh.sign.g} ${hh.sign.n}</div><p><span class="dtl-hk">${cap(HOUSE[hh.num])}.</span> Vivi quest'area ${SIGN_EXPR[hh.sign.k]}.</p></div>`;
      });
    } else {
      h += `<p class="dtl-note">Per le case e l'Ascendente servono l'ora e il luogo di nascita esatti.</p>`;
    }

    return h;
  }

  window.NATALDETAIL = { report };
})();
