/* ============================================================
   ZODIAC · SOCIAL — testi EXTRA (IT) per i format che NON vivono
   nei dati base. Tono pop/ironico. Da rivedere/tradurre.
   - ZSEX_IT  : 3 frasi "a letto" per segno (format sexual)
   - ZPLANETS_IT : pianeti nel segno (luna, venere) — bullet + mantra
   ============================================================ */

/* ---------- SEXUAL: 3 bullet "a letto" per segno ---------- */
window.ZSEX_IT = {
  ariete:    ["Spontaneo e impaziente", "Mi accendo nella sfida", "Tutto fuoco, niente attesa"],
  toro:      ["Lento e sensuale", "Tutti i sensi, zero fretta", "Resistenza da record"],
  gemelli:   ["Le parole mi accendono", "Giocoso e curioso", "Mille modi, mai noia"],
  cancro:    ["Per me è connessione", "Mi lascio andare solo al sicuro", "Tutto cuore e pelle"],
  leone:     ["Generoso e teatrale", "Voglio passione e applausi", "Do tanto, pretendo entusiasmo"],
  vergine:   ["Riservata, poi sorprendente", "Studio cosa ti piace", "Precisione che spiazza"],
  bilancia:  ["Bellezza e atmosfera", "Il piacere è reciproco", "Eleganza, mai volgarità"],
  scorpione: ["Intensità totale", "Magnetico e profondo", "Potere e intimità"],
  sagittario:["Avventura e risate", "Spontaneo, zero copione", "Odio la prevedibilità"],
  capricorno:["Corazza fuori, fuoco dentro", "Solo a porte chiuse", "Controllo e resistenza"],
  acquario:  ["Parte tutto dalla testa", "Sperimentale per natura", "La libertà mi accende"],
  pesci:     ["Fusione totale", "Sento cosa vuoi", "Mi perdo in te"],
};

/* ---------- PIANETI NEL SEGNO ----------
   Struttura: ZPLANETS_IT[pianeta] = {
     label:"luna in…", sub:"(emozioni)", color:"#hex",
     signs:{ segnoKey:{ box:[6-8 frasi 1ª persona], q:"mantra" } }
   }
   Per ora: LUNA + VENERE, tutti i 12 segni.
*/
window.ZPLANETS_IT = {
  luna: {
    label: "luna in…", sub: "(emozioni)", color: "#6b4fb0",
    signs: {
      ariete:    { box: ["Reagisco d'istinto", "Mi sfogo subito e forte", "Niente rancori, passo oltre", "L'attesa mi logora", "Mi serve azione, non parole", "Sotto sotto, impaziente di amare"], q: "«Mi sfogo e in due minuti è già passato.»" },
      toro:      ["Ho bisogno di stabilità", "Mi calmano comfort e abitudini", "Lento a fidarmi, poi resto", "Il caos mi destabilizza", "Mi consolo coi piaceri concreti", "Sicurezza prima di tutto"],
      gemelli:   ["Razionalizzo i sentimenti", "Ho bisogno di parlarne", "Cambio umore in fretta", "La noia mi pesa", "Due voci dentro di me", "Mi distraggo per non sentire"],
      cancro:    ["Sento tutto, anche troppo", "La mia casa è il mio guscio", "Ricordo ogni dettaglio", "Mi ferisco facile", "Proteggo chi amo", "Le maree emotive mi guidano"],
      leone:     ["Ho bisogno di sentirmi visto", "L'indifferenza mi spegne", "Amo in grande, drammatico", "Orgoglio e cuore enorme", "Voglio essere adorato", "Genroso con chi mi vede"],
      vergine:   ["Gestisco l'ansia con l'ordine", "Mi serve una routine", "Aiutare è il mio conforto", "Penso troppo, lo so", "Critico me più di te", "Mi apro piano, ai dettagli"],
      bilancia:  ["Ho bisogno di pace", "Sto meglio in coppia", "Odio i conflitti", "La bruttezza mi turba", "Cerco equilibrio in tutto", "Evito di scegliere per non ferire"],
      scorpione: ["Sento tutto in profondità", "Ma lo nascondo bene", "O dentro o fuori, mai a metà", "Non dimentico un torto", "Mi serve intimità vera", "Sotto controllo, vulcano dentro"],
      sagittario:["Mi serve spazio e ottimismo", "Sto bene in movimento", "La gabbia mi soffoca", "Rido per non pesare", "Cerco senso, non drammi", "Libertà = serenità"],
      capricorno:["Trattengo tutto", "Mi sento sicuro nel controllo", "Le emozioni le tengo per me", "Il lavoro mi calma", "Proteggo in silenzio", "Sotto la corazza, sensibile"],
      acquario:  ["Razionalizzo i sentimenti", "Temo la dipendenza", "Mi serve libertà emotiva", "Amo l'umanità, a modo mio", "Distante per istinto", "Le idee prima della pancia"],
      pesci:     ["Spugna emotiva: sento tutti", "Vivo metà nei sogni", "Confini deboli", "Mi rifugio nella fantasia", "Empatia senza filtri", "Mi commuovo per niente"],
    },
  },
  venere: {
    label: "venere in…", sub: "(amore & gusto)", color: "#ff2d6f",
    signs: {
      ariete:    ["Conquisto, non aspetto", "Mi accende l'inseguimento", "Diretto: se ti voglio lo sai", "La noia mi spegne", "Voglio una sfida, non un trofeo", "Amo con slancio"],
      toro:      ["Amo con i fatti e la presenza", "Sensuale e leale", "Lento ma per sempre", "Mi nutrono bellezza e comfort", "Possessivo, lo ammetto", "Gesti concreti, non promesse"],
      gemelli:   ["Seducimi con la testa", "Mi annoio senza stimoli", "Leggero e giocoso", "Le parole sono il mio flirt", "Voglio un complice", "Cambio, è la mia natura"],
      cancro:    ["Amo nutrendo e proteggendo", "Mi serve sentirmi al sicuro", "Romantico e premuroso", "Dolce ma permaloso", "Costruisco un nido", "Ti do il mondo, se mi rassicuri"],
      leone:     ["Corteggio in grande", "Voglio essere adorato", "Fedele finché apprezzato", "Gesti spettacolari", "L'indifferenza mi ferisce", "Amo con il cuore in scena"],
      vergine:   ["Amo servendo e curando", "Selettiva e riservata", "Mi conquisti con i fatti", "Apprezza i miei gesti pratici", "Niente caos, per favore", "Devota, una volta dentro"],
      bilancia:  ["Sono nata per la coppia", "Romantica e galante", "Cerco un pari", "Bellezza e armonia mi attraggono", "Indecisa, lo so", "In due siamo la versione migliore"],
      scorpione: ["O tutto o niente", "Geloso e devotissimo", "Cerco intimità totale", "Guadagnati la mia fiducia", "Il tradimento non si perdona", "Magnetico, fino all'ossessione"],
      sagittario:["Amo libero, non al guinzaglio", "Voglio un compagno d'avventura", "Onesto fino alla brutalità", "Allergico alla routine", "Lo spazio non si tocca", "Ridi con me e sono tuo"],
      capricorno:["Lento, selettivo, serio", "Te lo dimostro coi fatti", "Mi apro solo da sicuro", "Lealtà totale, poi", "Tradisci e la porta si chiude", "Costruisco, non gioco"],
      acquario:  ["Prima amico, poi amante", "Rispetta la mia libertà", "Amo da pari, mai da padrone", "Stimola la mia mente", "Niente possessività", "Accetta la mia stranezza"],
      pesci:     ["Romantico incurabile", "Amo in modo totale", "Idealizzo chi mi prende", "Crea magia e atmosfera", "Sfuggo quando fa male", "Cerco un'anima in cui fondermi"],
    },
  },
};

/* normalizza: luna.signs.ariete era un oggetto {box,q}, gli altri array → unifica */
(function () {
  const Q = {
    luna: {
      toro: "«Dammi sicurezza e mi apro come un fiore.»", gemelli: "«Ne parlo, quindi lo sento.»",
      cancro: "«Se faccio silenzio, qualcosa mi ha ferito.»", leone: "«Amami forte e mi sentirò a casa.»",
      vergine: "«Metto in ordine fuori per calmare dentro.»", bilancia: "«In due ritrovo il mio equilibrio.»",
      scorpione: "«Sento tutto, lo dico a pochi.»", sagittario: "«Dammi aria e starò bene.»",
      capricorno: "«Le emozioni le custodisco, non le esibisco.»", acquario: "«Ti amo da libero, mai per bisogno.»",
      pesci: "«Sento le emozioni di tutti, anche le tue.»", ariete: "«Mi sfogo e in due minuti è già passato.»",
    },
    venere: {
      ariete: "«La conquista mi elettrizza più del premio.»", toro: "«La conquista lenta è l'unica che dura.»",
      gemelli: "«Conquistami la testa e avrai il resto.»", cancro: "«Dammi un porto sicuro e ti do tutta me.»",
      leone: "«Amami in grande e ti amerò più forte.»", vergine: "«Te lo dimostro nei dettagli.»",
      bilancia: "«In due siamo la versione migliore di noi.»", scorpione: "«Ti voglio tutto, o niente.»",
      sagittario: "«Vieni a esplorare con me.»", capricorno: "«O accetti la mia scalata, o niente.»",
      acquario: "«Amami da libero, mai da padrone.»", pesci: "«Perdiamoci insieme, lontano dal mondo.»",
    },
  };
  Object.keys(window.ZPLANETS_IT).forEach((pk) => {
    const pl = window.ZPLANETS_IT[pk];
    Object.keys(pl.signs).forEach((sk) => {
      let v = pl.signs[sk];
      if (Array.isArray(v)) v = { box: v, q: (Q[pk] && Q[pk][sk]) || "" };
      else if (!v.q) v.q = (Q[pk] && Q[pk][sk]) || "";
      pl.signs[sk] = v;
    });
  });
})();

/* ---------- MARTE · MERCURIO · ASCENDENTE · SOLE ---------- */
(function () {
  const ADD = {
    marte: {
      label: "marte in\u2026", sub: "(grinta & desiderio)", color: "#e23b3b",
      box: {
        ariete: ["Agisco prima di pensare", "Parto in quarta", "Esplodo e mi passa", "Inseguo ci\u00f2 che voglio", "Niente mi ferma a met\u00e0", "La sfida mi accende"],
        toro: ["Lento ma inarrestabile", "Tenace fino alla fine", "Desiderio fisico e concreto", "Mi muovo con calma", "Testardo nel volere", "Resisto pi\u00f9 di tutti"],
        gemelli: ["Mi muovo a parole", "Energia che salta di palo in frasca", "Mi accendo con la testa", "Comincio mille cose", "Discuto invece di scontrarmi", "Mi annoio in fretta"],
        cancro: ["Agisco per proteggere", "Energia a ondate", "Indiretto, mai frontale", "Mi muovo se mi sento sicuro", "Difendo i miei come una tigre", "Sotto pressione mi chiudo"],
        leone: ["Agisco con stile", "Voglio vincere e brillare", "Orgoglio come motore", "Desiderio caldo e teatrale", "Difendo il mio onore", "Generoso anche nella foga"],
        vergine: ["Agisco con metodo", "Energia nei dettagli", "Mi sfogo lavorando", "Preciso anche nella foga", "Mi innervosisco nel caos", "Critico sotto stress"],
        bilancia: ["Agisco in due", "Evito lo scontro diretto", "Energia diplomatica", "Mi muovo per armonia", "Desiderio raffinato", "Sotto stress rimando"],
        scorpione: ["Colpisco al momento giusto", "Desiderio totale", "Strategico e implacabile", "Non dimentico un torto", "Intensit\u00e0 che brucia", "Controllo, poi affondo"],
        sagittario: ["Agisco d'istinto", "Energia da esploratore", "Voglio libert\u00e0 di muovermi", "Mi accende l'avventura", "Schietto anche nella foga", "Mi annoio se fermo"],
        capricorno: ["Agisco con disciplina", "Energia a lungo termine", "Scalo un gradino alla volta", "Desiderio sotto controllo", "Resisto a tutto", "Colpisco quando conviene"],
        acquario: ["Agisco controcorrente", "Energia per le mie idee", "Mi muovo per una causa", "Distaccato anche nella foga", "Ribelle alle regole", "Imprevedibile negli scatti"],
        pesci: ["Agisco di nascosto", "Energia che fluisce", "Evito lo scontro", "Mi muovo per intuito", "Desiderio romantico", "Sotto pressione sparisco"],
      },
      q: {
        ariete: "\u00abLo voglio? \u00c8 gi\u00e0 mio.\u00bb", toro: "\u00abLento, ma non mi fermi.\u00bb", gemelli: "\u00abLa mia arma \u00e8 la parola.\u00bb",
        cancro: "\u00abTocchi i miei e ti distruggo.\u00bb", leone: "\u00abCombatto con il cuore in scena.\u00bb", vergine: "\u00abLa precisione \u00e8 la mia forza.\u00bb",
        bilancia: "\u00abVinco senza alzare la voce.\u00bb", scorpione: "\u00abColpisco una volta sola.\u00bb", sagittario: "\u00abNon ingabbiare la mia foga.\u00bb",
        capricorno: "\u00abResisto pi\u00f9 a lungo di te.\u00bb", acquario: "\u00abCombatto per un'idea.\u00bb", pesci: "\u00abSfuggo, non combatto.\u00bb",
      },
    },
    mercurio: {
      label: "mercurio in\u2026", sub: "(mente & parole)", color: "#1f9b8e",
      box: {
        ariete: ["Penso e agisco insieme", "Diretto, niente giri", "Decido in un secondo", "Mi annoia ascoltare a lungo", "Parlo d'impulso", "Imparo facendo"],
        toro: ["Penso lento e solido", "Pratico e concreto", "Cambio idea a fatica", "Parlo poco, peso le parole", "Imparo con calma", "Testardo nelle opinioni"],
        gemelli: ["Mille pensieri insieme", "Parlo, quindi sono", "Curioso di tutto", "Cambio argomento al volo", "Imparo in fretta", "So un po' di tutto"],
        cancro: ["Penso con la pancia", "Ricordo ogni parola", "Comunico per emozioni", "Mi chiudo se ferito", "Imparo per associazioni", "Intuitivo pi\u00f9 che logico"],
        leone: ["Penso in grande", "Parlo con autorit\u00e0", "Comunico con il cuore", "Mi piace il palco", "Imparo ci\u00f2 che mi appassiona", "Convinco con il carisma"],
        vergine: ["Analizzo tutto", "Noto ogni dettaglio", "Penso in liste", "Critico per migliorare", "Imparo con metodo", "Preciso fino al pignolo"],
        bilancia: ["Peso ogni parola", "Cerco l'accordo", "Comunico con garbo", "Indeciso fino all'ultimo", "Imparo confrontandomi", "Vedo sempre due lati"],
        scorpione: ["Penso in profondit\u00e0", "Leggo tra le righe", "Parlo poco, osservo tutto", "Indago come un detective", "Imparo ci\u00f2 che mi ossessiona", "Tagliente quando serve"],
        sagittario: ["Penso per grandi visioni", "Schietto fino alla brutalit\u00e0", "Mi annoiano i dettagli", "Imparo viaggiando", "Filosofo per natura", "Dico la mia, sempre"],
        capricorno: ["Penso a lungo termine", "Pratico e strategico", "Parlo per concludere", "Asciutto e ironico", "Imparo ci\u00f2 che serve", "Cinico quanto basta"],
        acquario: ["Penso fuori dagli schemi", "Idee dal futuro", "Logico e originale", "Mi annoia il banale", "Imparo ci\u00f2 che mi incuriosisce", "Discuto per principio"],
        pesci: ["Penso per immagini", "Intuitivo, non lineare", "Comunico tra le righe", "Mi distraggo nei sogni", "Imparo per osmosi", "Vago invece di concludere"],
      },
      q: {
        ariete: "\u00abPenso a voce alta, sempre.\u00bb", toro: "\u00abPoche parole, tutte pesate.\u00bb", gemelli: "\u00abParlo, quindi sono.\u00bb",
        cancro: "\u00abLe parole me le ricordo tutte.\u00bb", leone: "\u00abParlo e la stanza ascolta.\u00bb", vergine: "\u00abIl dettaglio non mi sfugge.\u00bb",
        bilancia: "\u00abOgni cosa ha due lati.\u00bb", scorpione: "\u00abLeggo ci\u00f2 che non dici.\u00bb", sagittario: "\u00abTi dico la verit\u00e0 in faccia.\u00bb",
        capricorno: "\u00abParlo solo per concludere.\u00bb", acquario: "\u00abPenso dove gli altri non guardano.\u00bb", pesci: "\u00abComunico tra le righe.\u00bb",
      },
    },
    ascendente: {
      label: "ascendente in\u2026", sub: "(prima impressione)", color: "#e8742b",
      box: {
        ariete: ["Sembro energico e sfrontato", "Entro e mi noti", "Diretto a prima vista", "Sempre di fretta", "Faccia da leader", "Un po' impaziente"],
        toro: ["Sembro calmo e solido", "Trasmetto sicurezza", "Lento e rassicurante", "Amante del bello", "Difficile da smuovere", "Presenza tranquilla"],
        gemelli: ["Sembro arguto e socievole", "Parlo con tutti", "Curioso e irrequieto", "Mille interessi", "Giovanile a ogni et\u00e0", "Mai fermo"],
        cancro: ["Sembro dolce e riservato", "Un po' diffidente all'inizio", "Premuroso a prima vista", "Proteggo subito i miei", "Sensibile sotto la scorza", "Faccia da casa"],
        leone: ["Sembro fiero e magnetico", "Entro e illumino", "Caloroso a prima vista", "Mi muovo con stile", "Voglio essere visto", "Generoso d'impatto"],
        vergine: ["Sembro composto e attento", "Discreto a prima vista", "Noto i tuoi dettagli", "Un filo riservato", "Curato e preciso", "Critico ma gentile"],
        bilancia: ["Sembro affascinante e garbato", "Piacevole a prima vista", "Cerco subito sintonia", "Curato nell'aspetto", "Diplomatico nato", "Sorriso disarmante"],
        scorpione: ["Sembro intenso e misterioso", "Magnetico a prima vista", "Ti scruto in silenzio", "Difficile da decifrare", "Presenza che si sente", "Sguardo che buca"],
        sagittario: ["Sembro allegro e spontaneo", "Aperto a prima vista", "Schietto e diretto", "Sempre in movimento", "Faccia da avventuriero", "Ottimista d'impatto"],
        capricorno: ["Sembro serio e autorevole", "Composto a prima vista", "Distante finch\u00e9 non mi fido", "Maturo a ogni et\u00e0", "Faccia da manager", "Ironia che spiazza"],
        acquario: ["Sembro originale e amichevole", "Strano ma simpatico", "Distante a prima vista", "Anticonformista nato", "Aperto con tutti", "Difficile da incasellare"],
        pesci: ["Sembro gentile ed etereo", "Dolce a prima vista", "Un po' sfuggente", "Empatico d'istinto", "Sguardo sognante", "Ti metto a tuo agio"],
      },
      q: {
        ariete: "\u00abMi noti appena entro.\u00bb", toro: "\u00abTrasmetto calma e solidit\u00e0.\u00bb", gemelli: "\u00abAttacco bottone con chiunque.\u00bb",
        cancro: "\u00abDolce, ma non subito.\u00bb", leone: "\u00abEntro e accendo la stanza.\u00bb", vergine: "\u00abDiscreto, ma vedo tutto.\u00bb",
        bilancia: "\u00abIl mio sorriso disarma.\u00bb", scorpione: "\u00abTi scruto prima di parlare.\u00bb", sagittario: "\u00abSpontaneo a prima vista.\u00bb",
        capricorno: "\u00abSerio fuori, ironico dentro.\u00bb", acquario: "\u00abStrano? Diciamo unico.\u00bb", pesci: "\u00abTi metto subito a tuo agio.\u00bb",
      },
    },
    sole: {
      label: "sole in\u2026", sub: "(identit\u00e0)", color: "#f5a623",
      box: {
        ariete: ["Brillo iniziando per primo", "Sono pura scintilla", "Vivo nel presente", "Coraggio come identit\u00e0", "Mi sento vivo nella sfida", "Pioniere dentro"],
        toro: ["Brillo costruendo", "Sono solido e leale", "Vivo per il piacere vero", "Stabilit\u00e0 come identit\u00e0", "Mi sento vivo nel concreto", "Roccia dentro"],
        gemelli: ["Brillo comunicando", "Sono mille me in uno", "Vivo di curiosit\u00e0", "Versatilit\u00e0 come identit\u00e0", "Mi sento vivo parlando", "Eterno ragazzo dentro"],
        cancro: ["Brillo proteggendo", "Sono il cuore del gruppo", "Vivo per i miei affetti", "Casa come identit\u00e0", "Mi sento vivo al sicuro", "Custode dentro"],
        leone: ["Brillo, \u00e8 la mia natura", "Sono nato per il palco", "Vivo per amare ed essere amato", "Generosit\u00e0 come identit\u00e0", "Mi sento vivo sotto i riflettori", "Re/regina dentro"],
        vergine: ["Brillo migliorando le cose", "Sono utile e preciso", "Vivo per servire", "Cura come identit\u00e0", "Mi sento vivo nell'ordine", "Artigiano dentro"],
        bilancia: ["Brillo creando armonia", "Sono fatto per la relazione", "Vivo di bellezza", "Equilibrio come identit\u00e0", "Mi sento vivo in coppia", "Esteta dentro"],
        scorpione: ["Brillo trasformandomi", "Sono intenso fino in fondo", "Vivo di verit\u00e0 e profondit\u00e0", "Intensit\u00e0 come identit\u00e0", "Mi sento vivo nell'estremo", "Fenice dentro"],
        sagittario: ["Brillo esplorando", "Sono un'anima libera", "Vivo per il significato", "Libert\u00e0 come identit\u00e0", "Mi sento vivo in viaggio", "Filosofo dentro"],
        capricorno: ["Brillo costruendo in alto", "Sono ambizione lucida", "Vivo per lasciare il segno", "Disciplina come identit\u00e0", "Mi sento vivo scalando", "Re della montagna dentro"],
        acquario: ["Brillo essendo diverso", "Sono un visionario", "Vivo per le mie idee", "Libert\u00e0 come identit\u00e0", "Mi sento vivo controcorrente", "Ribelle dentro"],
        pesci: ["Brillo sognando", "Sono empatia pura", "Vivo tra due mondi", "Sensibilit\u00e0 come identit\u00e0", "Mi sento vivo nell'arte", "Sognatore dentro"],
      },
      q: {
        ariete: "\u00abNasco per partire primo.\u00bb", toro: "\u00abCostruisco ci\u00f2 che resta.\u00bb", gemelli: "\u00abSono mille me in uno.\u00bb",
        cancro: "\u00abIl mio regno \u00e8 casa.\u00bb", leone: "\u00abSono fatto per brillare.\u00bb", vergine: "\u00abMiglioro tutto ci\u00f2 che tocco.\u00bb",
        bilancia: "\u00abIn due do il mio meglio.\u00bb", scorpione: "\u00abRinasco da ogni cenere.\u00bb", sagittario: "\u00abLa mia casa \u00e8 l'orizzonte.\u00bb",
        capricorno: "\u00abPunto sempre pi\u00f9 in alto.\u00bb", acquario: "\u00abMarcio al mio ritmo.\u00bb", pesci: "\u00abVivo tra sogno e realt\u00e0.\u00bb",
      },
    },
  };
  Object.keys(ADD).forEach((pk) => {
    const p = ADD[pk], signs = {};
    Object.keys(p.box).forEach((sk) => { signs[sk] = { box: p.box[sk], q: (p.q && p.q[sk]) || "" }; });
    window.ZPLANETS_IT[pk] = { label: p.label, sub: p.sub, color: p.color, signs };
  });
})();
