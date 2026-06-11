/* ============================================================
   ZODIAC · TEMA NATALE — TESTI (voce pop / fumetto)
   Sole = chi sei · Luna = come senti · Ascendente = come appari
   + righe brevi per i pianeti.
   window.NATALTXT.sun(sign) / .moon(sign) / .asc(sign) / .planet(key, sign)
   ============================================================ */
(function () {
  const SUN = {
    Ariete: "Sei la scintilla che accende la stanza. Primo a partire, primo a osare: vivi a tutta velocità e l'attesa ti annoia. Coraggio da vendere, pazienza da allenare.",
    Toro: "Sei la roccia calda: stabile, sensuale, fedele al bello e al buono. Lento ad accendersi, impossibile da spostare. Godi la vita coi cinque sensi.",
    Gemelli: "Mente curiosa, lingua veloce, mille finestre aperte. Cambi idea come cambi argomento — e fai entrambe le cose benissimo. Ti annoi, mai sei noioso.",
    Cancro: "Cuore grande con la corazza. Senti tutto, ricordi tutto, proteggi i tuoi come un fortino. Casa, affetti e memoria sono il tuo superpotere.",
    Leone: "Nato per brillare e non te ne scusi. Generoso, caldo, drammatico al punto giusto: quando entri, si accendono le luci. Hai bisogno di applausi veri.",
    Vergine: "Occhio chirurgico per il dettaglio che nessuno vede. Pratico, preciso, utile: sistemi il mondo un pezzo alla volta. Impara a perdonarti gli errori.",
    Bilancia: "Cerchi equilibrio, bellezza e armonia in ogni cosa. Diplomatico nato, vivi di relazioni e dettagli eleganti. La decisione è la tua palestra.",
    Scorpione: "Intenso fino al midollo: o tutto o niente. Vedi sotto la superficie, ami in profondità e non dimentichi. Magnetico, leale, impossibile da ignorare.",
    Sagittario: "Anima libera con la freccia puntata all'orizzonte. Vivi di avventure, verità e significato — odi le gabbie e le bugie. Ottimismo contagioso.",
    Capricorno: "Scali la montagna con calma e disciplina. Ambizioso, affidabile, ironico sotto la corazza da manager. Costruisci cose che durano.",
    Acquario: "Mente dal futuro, allergico alle regole inutili. Originale, idealista, un po' alieno — e ne vai fiero. Cambi le cose pensando in grande.",
    Pesci: "Sognatore con le antenne accese sul mondo invisibile. Empatico, creativo, fluido: senti gli altri prima che parlino. Hai bisogno dei tuoi confini."
  };
  const MOON = {
    Ariete: "Emozioni a fuoco rapido: ti accendi subito e ti passa altrettanto in fretta. Hai bisogno di agire per stare bene, non di rimuginare.",
    Toro: "Hai bisogno di calma, comfort e routine per sentirti al sicuro. Coccole, buon cibo e stabilità sono la tua medicina emotiva.",
    Gemelli: "Senti pensando: devi parlarne per capirlo. Ti calma la varietà, ti agita la noia. Cervello sempre acceso, anche di notte.",
    Cancro: "La Luna è a casa: senti tutto al massimo volume. Affetti, ricordi e nido ti nutrono; ti ritiri nel guscio quando ferito.",
    Leone: "Hai bisogno di sentirti visto e amato per stare bene. Il cuore caldo si scalda con riconoscenti, dramma e gioco.",
    Vergine: "Ti tranquillizza l'ordine: una lista fatta, una cosa sistemata. Tendi a preoccuparti — la cura degli altri è la tua lingua d'amore.",
    Bilancia: "Stai bene quando c'è armonia attorno a te. Litigi e tensione ti destabilizzano; la bellezza e la compagnia ti rimettono al centro.",
    Scorpione: "Senti in profondità e in segreto: poche emozioni, ma oceaniche. Hai bisogno di fiducia totale e intimità vera per aprirti.",
    Sagittario: "Hai bisogno di spazio, libertà e senso. Ti tira su un'avventura, una risata, un orizzonte nuovo. La gabbia ti spegne.",
    Capricorno: "Controlli le emozioni e ti fidi dei fatti. Ti senti sicuro quando hai una struttura e una meta. Concediti di sentire, non solo gestire.",
    Acquario: "Vivi i sentimenti dalla giusta distanza: razionalizzi prima di sentire. Hai bisogno di libertà e amici-tribù più che di simbiosi.",
    Pesci: "Spugna emotiva: assorbi gli stati d'animo della stanza. Hai bisogno di arte, sogno e momenti di solitudine per ricaricarti."
  };
  const ASC = {
    Ariete: "Arrivi come un'energia diretta e sportiva: sembri pronto a partire. Prima impressione: grinta, spontaneità, un pizzico di impazienza.",
    Toro: "Trasmetti calma e solidità: presenza rilassata, voce morbida, stile curato. Sembri qualcuno di cui ci si può fidare.",
    Gemelli: "Sembri sveglio, brillante e chiacchierone: metti subito a loro agio. Aria giovane e curiosa, mille domande pronte.",
    Cancro: "Dai l'impressione di essere dolce, accogliente e un po' riservato. Gli altri si sentono protetti vicino a te.",
    Leone: "Entri con presenza: portamento fiero, sorriso caldo, qualcosa di magnetico. Difficile non notarti.",
    Vergine: "Sembri composto, attento e affidabile: occhio ai dettagli e modi misurati. Trasmetti competenza tranquilla.",
    Bilancia: "Aria elegante e gentile: charme naturale e modi diplomatici. Piaci facilmente, metti pace nella stanza.",
    Scorpione: "Sguardo intenso e magnetico, un'aura di mistero. Sembri uno che vede oltre — affascini e un po' intimidisci.",
    Sagittario: "Arrivi con energia aperta e ottimista: sorriso largo, spirito da viaggiatore. Sembri uno con cui ci si diverte.",
    Capricorno: "Trasmetti serietà, controllo e ambizione: presenza adulta anche da giovane. Sembri uno che sa il fatto suo.",
    Acquario: "Aria originale e un po' fuori dagli schemi: amichevole ma distaccato. Sembri uno che pensa diverso.",
    Pesci: "Aura dolce, sognante e sfuggente: sguardo gentile, modi morbidi. Sembri sensibile e un po' altrove."
  };
  // Pianeti minori: parola-chiave per dominio + come la colora il segno
  const PLANET_THEME = {
    Mercury: "Come pensi e comunichi",
    Venus: "Come ami e cosa ti piace",
    Mars: "Come agisci e desideri",
    Jupiter: "Dove cresci e hai fortuna",
    Saturn: "Dove impari e ti impegni",
    Uranus: "Dove sei ribelle (generazione)",
    Neptune: "Dove sogni (generazione)",
    Pluto: "Dove ti trasformi (generazione)"
  };
  const SIGN_KW = {
    Ariete: "con slancio diretto e impaziente",
    Toro: "con calma concreta e testarda",
    Gemelli: "in modo curioso, veloce e versatile",
    Cancro: "in modo emotivo, protettivo e intuitivo",
    Leone: "con calore, orgoglio e teatralità",
    Vergine: "con precisione, metodo e senso pratico",
    Bilancia: "con eleganza, equilibrio e diplomazia",
    Scorpione: "con intensità, strategia e profondità",
    Sagittario: "con entusiasmo, libertà e visione",
    Capricorno: "con disciplina, ambizione e pazienza",
    Acquario: "in modo originale, libero e fuori dagli schemi",
    Pesci: "in modo sensibile, fluido e fantasioso"
  };

  // ====== RITRATTO COMPLETO: lettura sintetica dell'intero tema ======
  const ELEM = {
    fuoco: { adj: "fuoco", temper: "Sei mosso dall'istinto, dall'entusiasmo e dalla voglia di agire: ti accendi in fretta, ci metti calore e coraggio. La tua sfida è incanalare tutta questa energia senza bruciarti.", much: "Tanto fuoco: vivi a tutta, sei un motore acceso — attento a non partire prima di pensare.", lack: "Poco fuoco: l'iniziativa e l'entusiasmo spontaneo non sono il tuo automatico — a volte ti serve una spinta per buttarti." },
    terra: { adj: "terra", temper: "Hai i piedi per terra: concretezza, pazienza e senso pratico. Costruisci cose che durano e ti fidi di ciò che puoi toccare. La tua sfida è non irrigidirti e lasciare spazio all'imprevisto.", much: "Tanta terra: sei solido, affidabile, costruttore nato — occhio alla rigidità e al «si è sempre fatto così».", lack: "Poca terra: la concretezza e la routine ti pesano — il tuo lavoro è radicare i sogni nel reale." },
    aria: { adj: "aria", temper: "Vivi di idee, parole e relazioni: mente veloce, curiosità infinita, bisogno di scambio. Capisci il mondo pensandoci e raccontandolo. La tua sfida è scendere dalla testa al cuore e al corpo.", much: "Tanta aria: pensi e comunichi di continuo, mille connessioni — attento a non vivere solo di testa.", lack: "Poca aria: razionalizzare e prendere distanza non è il tuo forte — tendi a vivere le cose, più che analizzarle." },
    acqua: { adj: "acqua", temper: "Senti tutto in profondità: empatia, intuito e memoria emotiva. Leggi le persone prima che parlino e ami intensamente. La tua sfida è proteggere i tuoi confini senza chiuderti.", much: "Tanta acqua: sei un'antenna emotiva potentissima — impara a non assorbire gli stati d'animo di tutti.", lack: "Poca acqua: l'emotività esplicita ti mette a disagio — la tua crescita è dare voce a ciò che senti." }
  };
  const MOD = {
    cardinale: "Sei uno che <b>parte</b>: inizi, proponi, apri strade. Energia da leader e da pioniere; la sfida è portare a termine ciò che lanci.",
    fisso: "Sei uno che <b>costruisce e resiste</b>: determinazione, costanza, lealtà. Una volta deciso non molli; la sfida è la flessibilità.",
    mobile: "Sei uno che <b>si adatta e connette</b>: versatile, curioso, camaleontico. Ti muovi bene nel cambiamento; la sfida è scegliere e restare."
  };
  // dialogo Sole–Luna a livello di elemento
  function elemPair(a, b) {
    if (a === b) return "Sole e Luna parlano la stessa lingua: dentro e fuori sei coerente, ciò che mostri è ciò che senti. Una bella forza tranquilla.";
    const k = [a, b].sort().join("|");
    if (k === "aria|fuoco") return "Sole e Luna si alimentano a vicenda (fuoco e aria): le tue idee accendono l'azione e viceversa. Spontaneo, vivace, un po' irrequieto.";
    if (k === "acqua|terra") return "Sole e Luna si nutrono a vicenda (terra e acqua): concretezza ed emozione vanno a braccetto. Profondo e affidabile insieme.";
    if (k === "fuoco|terra" || k === "aria|terra") return "C'è una tensione creativa tra chi sei e ciò che senti: parte di te spinge, parte frena. Imparare a far dialogare le due metà è il tuo superpotere.";
    if (k === "acqua|fuoco") return "Dentro convivono fuoco e acqua: passione e sensibilità, slancio e profondità. Un mix intenso, a volte contraddittorio — ma magnetico.";
    if (k === "acqua|aria") return "Tra testa e cuore (aria e acqua) c'è un dialogo continuo: analizzi ciò che senti e senti ciò che pensi. Ricco, ma a volte ti complichi.";
    return "Chi sei (Sole) e come senti (Luna) viaggiano su binari diversi: una ricchezza, se impari a tradurre l'uno nell'altro.";
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
    h += `<p>Il tuo tema respira soprattutto di <b>${ELEM[domEl].adj}</b>. ${ELEM[domEl].temper}</p>`;
    // 2. i tre pilastri insieme
    let p2 = `<p>Con il <b>Sole in ${sun.sign.n}</b> sei, nel profondo, ${shortSun(sun.sign)}. `;
    p2 += `La <b>Luna in ${moon.sign.n}</b> racconta il tuo mondo emotivo: ${shortMoon(moon.sign)}. `;
    if (asc) p2 += `E l'<b>Ascendente ${asc.sign.n}</b> è la prima impressione che dai: ${shortAsc(asc.sign)}.`;
    else p2 += `(Con l'ora di nascita potrai aggiungere anche l'Ascendente, la maschera con cui ti presenti al mondo.)`;
    p2 += `</p>`;
    h += p2;
    // 3. dialogo sole-luna
    h += `<p>${elemPair(sun.sign.el, moon.sign.el)}</p>`;
    // 4. equilibrio elementi
    const elOrder = ["fuoco", "terra", "aria", "acqua"].sort((a, b) => elc[b] - elc[a]);
    h += `<p><b>Il tuo equilibrio:</b> ${ELEM[domEl].much} `;
    if (elc[lowEl] === 0) h += `Al contrario, l'elemento <b>${ELEM[lowEl].adj}</b> è assente o quasi: ${ELEM[lowEl].lack}</p>`;
    else h += `L'elemento meno presente è <b>${ELEM[lowEl].adj}</b>: ${ELEM[lowEl].lack}</p>`;
    // 5. modalità
    h += `<p>${MOD[domMod]}</p>`;
    // 6. mente / amore / azione
    const merc = R.planets[2], ven = R.planets[3], mars = R.planets[4];
    h += `<p><b>Mente, amore, azione.</b> Pensi e comunichi ${kw(merc.sign)} (Mercurio in ${merc.sign.n}). `;
    h += `In amore e nel piacere ti muovi ${kw(ven.sign)} (Venere in ${ven.sign.n}). `;
    h += `E quando agisci o desideri, lo fai ${kw(mars.sign)} (Marte in ${mars.sign.n}).</p>`;
    // 7. chiusura
    h += `<p class="closing">In sintesi: ${closing(sun.sign, moon.sign, asc ? asc.sign : null, domEl)}</p>`;
    return h;
  }
  // estratti brevi (prima frase) dei testi pilastro
  function firstSentence(t) { const m = t.match(/^[^.]*\./); return m ? m[0].toLowerCase().replace(/^./, c => c.toLowerCase()) : t; }
  function shortSun(s) { return firstSentence(SUN[s.n] || "").replace(/\.$/, ""); }
  function shortMoon(s) { return firstSentence(MOON[s.n] || "").replace(/\.$/, "").replace(/^[A-Z]/, c => c.toLowerCase()); }
  function shortAsc(s) { return firstSentence(ASC[s.n] || "").replace(/\.$/, "").replace(/^[A-Z]/, c => c.toLowerCase()); }
  function kw(s) { return SIGN_KW[s.n] || ""; }
  function closing(sun, moon, asc, domEl) {
    let t = `un'anima di ${ELEM[domEl].adj}, ${sun.n} nel cuore`;
    t += ` e ${moon.n} nelle emozioni`;
    if (asc) t += `, che al mondo si presenta con l'aria di ${asc.n}`;
    t += `. Il bello del tuo tema è proprio qui: non sei una sola etichetta, ma l'incontro di tutte queste energie.`;
    return t;
  }

  window.NATALTXT = {
    sun: s => SUN[s.n] || "",
    moon: s => MOON[s.n] || "",
    asc: s => ASC[s.n] || "",
    planetTheme: key => PLANET_THEME[key] || "",
    planet: (key, sign) => (PLANET_THEME[key] || "") + " " + (SIGN_KW[sign.n] || "") + ".",
    reading: reading
  };
})();
