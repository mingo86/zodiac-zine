/* ============================================================
   ZODIAC · GEBURTSHOROSKOP — TEXTE (Pop- / Comic-Stimme) — de
   Sonne = wer du bist · Mond = wie du fühlst · Aszendent = wie du wirkst
   + kurze Einzeiler für die Planeten.
   window.NATALTXT_DE.sun(sign) / .moon(sign) / .asc(sign) / .planet(key, sign)
   ============================================================ */
(function () {
  const SUN = {
    Ariete: "Du bist der Funke, der den Raum zum Leuchten bringt. Erste:r am Start, erste:r im Wagemut: Du lebst auf Vollgas, und Warten langweilt dich zu Tode. Mut im Überfluss, Geduld noch im Training.",
    Toro: "Du bist der warme Fels: stabil, sinnlich, treu zu allem Schönen und Köstlichen. Brauchst lange zum Entflammen, bist aber nicht vom Fleck zu kriegen. Du genießt das Leben mit allen fünf Sinnen.",
    Gemelli: "Neugieriger Kopf, schnelle Zunge, tausend offene Tabs. Du wechselst deine Meinung so schnell wie das Thema — und beides machst du brillant. Dir wird langweilig, aber langweilig bist du nie.",
    Cancro: "Ein großes Herz in voller Rüstung. Du fühlst alles, erinnerst dich an alles und beschützt deine Leute wie eine Festung. Zuhause, geliebte Menschen und Erinnerung sind deine Superkraft.",
    Leone: "Geboren, um zu strahlen — und dafür entschuldigst du dich nicht. Großzügig, warm, dramatisch in genau der richtigen Dosis: Wenn du den Raum betrittst, gehen die Lichter an. Du brauchst echten Applaus, kein höfliches Klatschen.",
    Vergine: "Ein Chirurgenauge für das Detail, das sonst niemand sieht. Praktisch, präzise, nützlich: Du reparierst die Welt Stück für Stück. Jetzt lerne noch, dir die eigenen Fehler zu verzeihen.",
    Bilancia: "Du suchst Gleichgewicht, Schönheit und Harmonie in allem. Geborene:r Diplomat:in, du lebst von Beziehungen und eleganten Details. Entscheidungen treffen ist dein Fitnessstudio.",
    Scorpione: "Intensiv bis ins Mark: alles oder nichts. Du siehst unter die Oberfläche, liebst in der Tiefe und vergisst nie. Magnetisch, loyal, unmöglich zu ignorieren.",
    Sagittario: "Eine freie Seele mit dem Pfeil auf den Horizont gerichtet. Du lebst von Abenteuer, Wahrheit und Sinn — du hasst Käfige und Lügen. Ein Optimismus, der regelrecht ansteckt.",
    Capricorno: "Du erklimmst den Berg mit Ruhe und Disziplin. Ehrgeizig, verlässlich, heimlich witzig unter dieser Manager-Rüstung. Du baust Dinge, die bleiben.",
    Acquario: "Ein Kopf aus der Zukunft, allergisch gegen sinnlose Regeln. Originell, idealistisch, ein bisschen außerirdisch — und stolz darauf. Du veränderst Dinge, indem du groß denkst.",
    Pesci: "Ein:e Träumer:in mit Antennen, die auf die unsichtbare Welt eingestellt sind. Empathisch, kreativ, fließend: Du spürst Menschen, bevor sie sprechen. Deine Grenzen brauchst du allerdings."
  };
  const MOON = {
    Ariete: "Gefühle auf schneller Flamme: Du entflammst sofort und kühlst genauso schnell wieder ab. Du musst handeln, um dich gut zu fühlen, statt zu grübeln.",
    Toro: "Du brauchst Ruhe, Geborgenheit und Routine, um dich sicher zu fühlen. Zärtlichkeit, gutes Essen und Stabilität sind deine emotionale Medizin.",
    Gemelli: "Du fühlst, indem du denkst: Du musst darüber reden, um es zu verstehen. Abwechslung beruhigt dich, Langeweile macht dich nervös. Gehirn immer an, auch nachts.",
    Cancro: "Der Mond ist hier zu Hause: Du fühlst alles in voller Lautstärke. Geliebte Menschen, Erinnerungen und dein Nest nähren dich; verletzt ziehst du dich in dein Schneckenhaus zurück.",
    Leone: "Du musst dich gesehen und geliebt fühlen, um dir gut zu sein. Dieses warme Herz läuft auf Anerkennung, Drama und Spiel.",
    Vergine: "Ordnung beruhigt dich: eine abgehakte Liste, eine erledigte Sache. Du neigst zum Sorgen — sich um andere zu kümmern ist deine Liebessprache.",
    Bilancia: "Du fühlst dich gut, wenn um dich herum Harmonie herrscht. Streit und Spannung bringen dich aus dem Gleichgewicht; Schönheit und gute Gesellschaft holen dich zurück in die Mitte.",
    Scorpione: "Du fühlst tief und im Verborgenen: wenige Gefühle, aber ozeanisch. Du brauchst volles Vertrauen und echte Nähe, bevor du dich öffnest.",
    Sagittario: "Du brauchst Raum, Freiheit und Sinn. Ein Abenteuer, ein Lachen, ein neuer Horizont richten dich sofort auf. Ein Käfig schaltet dich ab.",
    Capricorno: "Du hältst die Gefühle unter Kontrolle und vertraust den Fakten. Du fühlst dich sicher mit einer Struktur und einem Ziel. Erlaube dir, wirklich zu fühlen, nicht nur zu verwalten.",
    Acquario: "Du lebst deine Gefühle aus sicherer Distanz: Du rationalisierst, bevor du fühlst. Du brauchst Freiheit und eine Freundes-Tribe mehr als Symbiose.",
    Pesci: "Ein emotionaler Schwamm: Du saugst die Stimmung des ganzen Raums auf. Du brauchst Kunst, Träume und Momente der Einsamkeit zum Aufladen."
  };
  const ASC = {
    Ariete: "Du kommst wie ein Schub direkter, sportlicher Energie: Du wirkst startbereit. Erster Eindruck: Biss, Spontaneität, eine Prise Ungeduld.",
    Toro: "Du strahlst Ruhe und Solidität aus: entspannte Präsenz, weiche Stimme, gepflegter Stil. Du wirkst wie jemand, dem man vertrauen kann.",
    Gemelli: "Du wirkst scharfsinnig, hell und gesprächig: Du nimmst den Leuten sofort die Hemmung. Eine junge, neugierige Aura, tausend Fragen auf Abruf.",
    Cancro: "Du gibst eine süße, herzliche, leicht zurückhaltende Aura ab. In deiner Nähe fühlen sich Menschen beschützt.",
    Leone: "Du trittst mit Präsenz auf: stolze Haltung, warmes Lächeln, etwas Magnetisches. Schwer, dich nicht zu bemerken.",
    Vergine: "Du wirkst gefasst, aufmerksam und verlässlich: ein Auge fürs Detail und maßvolle Umgangsformen. Du strahlst stille Kompetenz aus.",
    Bilancia: "Eine elegante, sanfte Aura: natürlicher Charme und diplomatische Manieren. Man mag dich schnell — du bringst Frieden in den Raum.",
    Scorpione: "Ein intensiver, magnetischer Blick, eine Aura des Geheimnisvollen. Du wirkst wie jemand, der direkt durch die Dinge hindurchsieht — faszinierend und ein bisschen einschüchternd.",
    Sagittario: "Du kommst mit offener, optimistischer Energie: ein breites Lächeln, ein Reisegeist. Du wirkst wie jemand, mit dem man Spaß hat.",
    Capricorno: "Du strahlst Ernst, Kontrolle und Ehrgeiz aus: eine erwachsene Präsenz, selbst wenn du jung bist. Du wirkst wie jemand, der weiß, was er tut.",
    Acquario: "Eine originelle, leicht schräge Aura: freundlich, aber mit etwas Distanz. Du wirkst wie jemand, der anders denkt.",
    Pesci: "Eine süße, verträumte, schwer fassbare Aura: sanfter Blick, weiche Umgangsformen. Du wirkst sensibel und ein bisschen woanders."
  };
  // Kleinere Planeten: Schlüsselwort pro Lebensbereich + wie das Zeichen es einfärbt
  const PLANET_THEME = {
    Mercury: "Wie du denkst und kommunizierst",
    Venus: "Wie du liebst und was dir gefällt",
    Mars: "Wie du handelst und begehrst",
    Jupiter: "Wo du wächst und Glück hast",
    Saturn: "Wo du lernst und dich reinhängst",
    Uranus: "Wo du rebellierst (generationsbedingt)",
    Neptune: "Wo du träumst (generationsbedingt)",
    Pluto: "Wo du dich verwandelst (generationsbedingt)"
  };
  const SIGN_KW = {
    Ariete: "mit direktem, ungeduldigem Antrieb",
    Toro: "mit beständiger, sturer Ruhe",
    Gemelli: "auf neugierige, schnelle, vielseitige Art",
    Cancro: "auf emotionale, beschützende, intuitive Art",
    Leone: "mit Wärme, Stolz und einem Hang zum Theatralischen",
    Vergine: "mit Präzision, Methode und praktischem Sinn",
    Bilancia: "mit Eleganz, Ausgewogenheit und Diplomatie",
    Scorpione: "mit Intensität, Strategie und Tiefe",
    Sagittario: "mit Begeisterung, Freiheit und Weitblick",
    Capricorno: "mit Disziplin, Ehrgeiz und Geduld",
    Acquario: "auf originelle, freie Art, abseits der Norm",
    Pesci: "auf sensible, fließende, fantasievolle Art"
  };

  // ====== VOLLSTÄNDIGES PORTRÄT: eine kompakte Lesung des ganzen Horoskops ======
  const ELEM = {
    fuoco: { adj: "Feuer", temper: "Dich treiben Instinkt, Begeisterung und der Drang zu handeln: Du entflammst schnell und bringst Hitze und Mut mit. Deine Herausforderung ist, all diese Energie zu lenken, ohne auszubrennen.", much: "Viel Feuer: Du lebst auf Hochtouren, ein Motor, der nie stillsteht — pass auf, dass du nicht losstartest, bevor du denkst.", lack: "Wenig Feuer: Initiative und spontane Begeisterung sind nicht deine Grundeinstellung — manchmal brauchst du einen Schubs, um dich reinzustürzen." },
    terra: { adj: "Erde", temper: "Du hast die Füße fest auf dem Boden: Bodenständigkeit, Geduld und praktischer Sinn. Du baust Dinge, die bleiben, und vertraust auf das, was du anfassen kannst. Deine Herausforderung ist, nicht zu verhärten — lass Raum für das Unerwartete.", much: "Viel Erde: Du bist solide, verlässlich, ein:e geborene:r Macher:in — Vorsicht vor Starrheit und dem alten «das haben wir schon immer so gemacht».", lack: "Wenig Erde: Bodenständigkeit und Routine lasten auf dir — deine Aufgabe ist es, deine Träume in der echten Welt zu verwurzeln." },
    aria: { adj: "Luft", temper: "Du lebst von Ideen, Worten und Beziehungen: schneller Kopf, unendliche Neugier, ein Bedürfnis nach Austausch. Du verstehst die Welt, indem du über sie nachdenkst und von ihr erzählst. Deine Herausforderung ist, vom Kopf herunter ins Herz und in den Körper zu kommen.", much: "Viel Luft: Du denkst und kommunizierst pausenlos, tausend Verknüpfungen — pass auf, dass du nicht nur im Kopf lebst.", lack: "Wenig Luft: Rationalisieren und Abstand nehmen sind nicht deine Stärke — du neigst dazu, die Dinge zu erleben, statt sie zu analysieren." },
    acqua: { adj: "Wasser", temper: "Du fühlst alles in der Tiefe: Empathie, Intuition und emotionales Gedächtnis. Du liest Menschen, bevor sie sprechen, und liebst intensiv. Deine Herausforderung ist, deine Grenzen zu schützen, ohne dich zu verschließen.", much: "Viel Wasser: Du bist eine wahnsinnig starke emotionale Antenne — lerne, nicht die Stimmungen aller aufzusaugen.", lack: "Wenig Wasser: Offene Gefühlsbekundungen sind dir unangenehm — dein Wachstum besteht darin, dem eine Stimme zu geben, was du fühlst." }
  };
  const MOD = {
    cardinale: "Du bist ein:e <b>Starter:in</b>: Du legst los, schlägst vor, öffnest neue Wege. Anführer- und Pionier-Energie; die Herausforderung ist, zu Ende zu bringen, was du anfängst.",
    fisso: "Du bist ein:e <b>Baumeister:in, die:der die Stellung hält</b>: Entschlossenheit, Beständigkeit, Loyalität. Hast du dich einmal entschieden, lässt du nicht mehr los; die Herausforderung ist Flexibilität.",
    mobile: "Du bist ein:e <b>Anpasser:in und Verbinder:in</b>: vielseitig, neugierig, chamäleonhaft. Du bewegst dich wunderbar durch Veränderung; die Herausforderung ist, dich zu entscheiden und zu bleiben."
  };
  // Sonne–Mond-Dialog auf Ebene des Elements
  function elemPair(a, b) {
    if (a === b) return "Sonne und Mond sprechen dieselbe Sprache: innen wie außen bist du stimmig — was du zeigst, ist, was du fühlst. Eine schöne, ruhige Stärke.";
    const k = [a, b].sort().join("|");
    if (k === "aria|fuoco") return "Sonne und Mond nähren einander (Feuer und Luft): Deine Ideen entzünden das Handeln und umgekehrt. Spontan, lebhaft, ein bisschen rastlos.";
    if (k === "acqua|terra") return "Sonne und Mond nähren einander (Erde und Wasser): Bodenständigkeit und Gefühl gehen Arm in Arm. Tief und verlässlich zugleich.";
    if (k === "fuoco|terra" || k === "aria|terra") return "Zwischen dem, wer du bist, und dem, was du fühlst, steckt eine kreative Spannung: Ein Teil von dir drückt aufs Gas, ein Teil bremst. Die beiden Hälften ins Gespräch zu bringen ist deine Superkraft.";
    if (k === "acqua|fuoco") return "Feuer und Wasser leben in dir: Leidenschaft und Sensibilität, Antrieb und Tiefe. Eine intensive, manchmal widersprüchliche Mischung — aber magnetisch.";
    if (k === "acqua|aria") return "Zwischen Kopf und Herz (Luft und Wasser) läuft ein ständiger Dialog: Du analysierst, was du fühlst, und fühlst, was du denkst. Reich — auch wenn du dir manchmal das Leben verkomplizierst.";
    return "Wer du bist (Sonne) und wie du fühlst (Mond) fahren auf verschiedenen Gleisen: ein echter Reichtum, sobald du lernst, das eine ins andere zu übersetzen.";
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

  // baut das Porträt-HTML aus dem berechneten Horoskop
  function reading(R) {
    const sun = R.sun, moon = R.moon, asc = R.ascendant;
    // wir nehmen die 7 "persönlichen+sozialen" Planeten für das Gleichgewicht (keine transgenerationalen) + Asz
    const core = R.planets.slice(0, 7).concat(asc ? [{ sign: asc.sign }] : []);
    const elc = countEl(core), modc = countMod(core);
    const domEl = topKey(elc), lowEl = lowKey(elc);
    const domMod = topKey(modc);

    let h = "";
    // 1. Eröffnung
    h += `<p>Dein Horoskop atmet vor allem <b>${ELEM[domEl].adj}</b>. ${ELEM[domEl].temper}</p>`;
    // 2. die drei Säulen zusammen
    let p2 = `<p>Mit der <b>Sonne in ${sun.sign.n}</b> bist du im Grunde ${shortSun(sun.sign)}. `;
    p2 += `Der <b>Mond in ${moon.sign.n}</b> erzählt die Geschichte deiner Gefühlswelt: ${shortMoon(moon.sign)}. `;
    if (asc) p2 += `Und der <b>Aszendent in ${asc.sign.n}</b> ist der erste Eindruck, den du machst: ${shortAsc(asc.sign)}.`;
    else p2 += `(Füge deine Geburtszeit hinzu, dann schaltest du auch den Aszendenten frei — die Maske, die du trägst, wenn du der Welt begegnest.)`;
    p2 += `</p>`;
    h += p2;
    // 3. Sonne-Mond-Dialog
    h += `<p>${elemPair(sun.sign.el, moon.sign.el)}</p>`;
    // 4. Element-Gleichgewicht
    const elOrder = ["fuoco", "terra", "aria", "acqua"].sort((a, b) => elc[b] - elc[a]);
    h += `<p><b>Dein Gleichgewicht:</b> ${ELEM[domEl].much} `;
    if (elc[lowEl] === 0) h += `Auf der anderen Seite fehlt das Element <b>${ELEM[lowEl].adj}</b> oder ist fast nicht vorhanden: ${ELEM[lowEl].lack}</p>`;
    else h += `Dein am wenigsten vertretenes Element ist <b>${ELEM[lowEl].adj}</b>: ${ELEM[lowEl].lack}</p>`;
    // 5. Modalität
    h += `<p>${MOD[domMod]}</p>`;
    // 6. Geist / Liebe / Handlung
    const merc = R.planets[2], ven = R.planets[3], mars = R.planets[4];
    h += `<p><b>Geist, Liebe, Handlung.</b> Du denkst und kommunizierst ${kw(merc.sign)} (Merkur in ${merc.sign.n}). `;
    h += `In Liebe und Genuss bewegst du dich ${kw(ven.sign)} (Venus in ${ven.sign.n}). `;
    h += `Und wenn du handelst oder begehrst, tust du es ${kw(mars.sign)} (Mars in ${mars.sign.n}).</p>`;
    // 7. Abschluss
    h += `<p class="closing">Kurz gesagt: ${closing(sun.sign, moon.sign, asc ? asc.sign : null, domEl)}</p>`;
    return h;
  }
  // kurze Auszüge (erster Satz) der Säulentexte
  function firstSentence(t) { const m = t.match(/^[^.]*\./); return m ? m[0].toLowerCase().replace(/^./, c => c.toLowerCase()) : t; }
  function shortSun(s) { return firstSentence(SUN[s.n] || "").replace(/\.$/, ""); }
  function shortMoon(s) { return firstSentence(MOON[s.n] || "").replace(/\.$/, "").replace(/^[A-Z]/, c => c.toLowerCase()); }
  function shortAsc(s) { return firstSentence(ASC[s.n] || "").replace(/\.$/, "").replace(/^[A-Z]/, c => c.toLowerCase()); }
  function kw(s) { return SIGN_KW[s.n] || ""; }
  function closing(sun, moon, asc, domEl) {
    let t = `eine Seele aus ${ELEM[domEl].adj}, ${sun.n} im Herzen`;
    t += ` und ${moon.n} in den Gefühlen`;
    if (asc) t += `, die:der der Welt mit einer ${asc.n}-Aura begegnet`;
    t += `. Und genau darin liegt das Schöne an deinem Horoskop: Du bist nicht ein einziges Etikett, sondern der Treffpunkt all dieser Energien.`;
    return t;
  }

  window.NATALTXT_DE = {
    sun: s => SUN[s.n] || "",
    moon: s => MOON[s.n] || "",
    asc: s => ASC[s.n] || "",
    planetTheme: key => PLANET_THEME[key] || "",
    planet: (key, sign) => (PLANET_THEME[key] || "") + " " + (SIGN_KW[sign.n] || "") + ".",
    reading: reading
  };
})();
