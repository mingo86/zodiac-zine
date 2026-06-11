/* ============================================================
   ZODIAC · NATAL CHART — COPY (pop / comic-book voice)
   Sun = who you are · Moon = how you feel · Ascendant = how you come across
   + short one-liners for the planets.
   window.NATALTXT_EN.sun(sign) / .moon(sign) / .asc(sign) / .planet(key, sign)
   ============================================================ */
(function () {
  const SUN = {
    Ariete: "You're the spark that lights up the room. First to start, first to dare: you live at full throttle and waiting bores you to tears. Courage to spare, patience to train.",
    Toro: "You're the warm rock: steady, sensual, loyal to all things beautiful and delicious. Slow to ignite, impossible to budge. You savor life with all five senses.",
    Gemelli: "Curious mind, quick tongue, a thousand tabs open. You change your mind as fast as you change the subject — and you do both brilliantly. You get bored, but you're never boring.",
    Cancro: "A big heart in full armor. You feel everything, remember everything, and guard your people like a fortress. Home, loved ones and memory are your superpower.",
    Leone: "Born to shine and not sorry about it. Generous, warm, dramatic in exactly the right dose: when you walk in, the lights come on. You need real applause, not polite clapping.",
    Vergine: "A surgeon's eye for the detail nobody else sees. Practical, precise, useful: you fix the world one piece at a time. Now learn to forgive your own mistakes.",
    Bilancia: "You chase balance, beauty and harmony in everything. A born diplomat, you live on relationships and elegant details. Making decisions is your gym.",
    Scorpione: "Intense to the bone: all or nothing. You see beneath the surface, love deeply and never forget. Magnetic, loyal, impossible to ignore.",
    Sagittario: "A free spirit with an arrow aimed at the horizon. You live on adventure, truth and meaning — you hate cages and lies. Optimism that's downright contagious.",
    Capricorno: "You climb the mountain with calm and discipline. Ambitious, reliable, secretly funny under that manager's armor. You build things that last.",
    Acquario: "A mind from the future, allergic to pointless rules. Original, idealistic, slightly alien — and proud of it. You change things by thinking big.",
    Pesci: "A dreamer with antennas tuned to the invisible world. Empathetic, creative, fluid: you feel people before they speak. You do need your boundaries, though."
  };
  const MOON = {
    Ariete: "Emotions on a fast flame: you flare up instantly and cool off just as fast. You need to act to feel good, not to brood.",
    Toro: "You need calm, comfort and routine to feel safe. Cuddles, good food and stability are your emotional medicine.",
    Gemelli: "You feel by thinking: you have to talk it out to understand it. Variety calms you, boredom rattles you. Brain always on, even at night.",
    Cancro: "The Moon is home here: you feel everything at full volume. Loved ones, memories and your nest feed you; you retreat into the shell when hurt.",
    Leone: "You need to feel seen and loved to be okay. That warm heart runs on recognition, drama and play.",
    Vergine: "Order soothes you: a list checked off, one thing fixed. You tend to worry — taking care of others is your love language.",
    Bilancia: "You feel good when there's harmony around you. Fights and tension throw you off balance; beauty and good company put you back at center.",
    Scorpione: "You feel deeply and in secret: few emotions, but oceanic ones. You need total trust and real intimacy before you open up.",
    Sagittario: "You need space, freedom and meaning. An adventure, a laugh, a new horizon lifts you right up. A cage switches you off.",
    Capricorno: "You keep emotions under control and trust the facts. You feel safe with a structure and a goal. Allow yourself to actually feel, not just manage.",
    Acquario: "You live your feelings from a safe distance: you rationalize before you feel. You need freedom and a tribe of friends more than symbiosis.",
    Pesci: "An emotional sponge: you absorb the mood of the whole room. You need art, dreams and moments of solitude to recharge."
  };
  const ASC = {
    Ariete: "You arrive like a burst of direct, sporty energy: you look ready to launch. First impression: grit, spontaneity, a pinch of impatience.",
    Toro: "You radiate calm and solidity: relaxed presence, soft voice, polished style. You look like someone people can trust.",
    Gemelli: "You come across sharp, bright and chatty: you put people at ease instantly. A young, curious air, a thousand questions ready to go.",
    Cancro: "You give off a sweet, welcoming, slightly reserved vibe. People feel protected around you.",
    Leone: "You enter with presence: proud posture, warm smile, something magnetic. Hard not to notice you.",
    Vergine: "You look composed, attentive and reliable: an eye for detail and measured manners. You radiate quiet competence.",
    Bilancia: "An elegant, gentle air: natural charm and diplomatic manners. People like you fast — you bring peace into the room.",
    Scorpione: "An intense, magnetic gaze, an aura of mystery. You look like someone who sees right through things — fascinating and slightly intimidating.",
    Sagittario: "You arrive with open, optimistic energy: a wide smile, a traveler's spirit. You look like someone people have fun with.",
    Capricorno: "You project seriousness, control and ambition: an adult presence even when young. You look like someone who knows what they're doing.",
    Acquario: "An original, slightly offbeat air: friendly but detached. You look like someone who thinks differently.",
    Pesci: "A sweet, dreamy, elusive aura: gentle eyes, soft manners. You seem sensitive and a little elsewhere."
  };
  // Minor planets: keyword per domain + how the sign colors it
  const PLANET_THEME = {
    Mercury: "How you think and communicate",
    Venus: "How you love and what you like",
    Mars: "How you act and desire",
    Jupiter: "Where you grow and get lucky",
    Saturn: "Where you learn and put in the work",
    Uranus: "Where you rebel (generational)",
    Neptune: "Where you dream (generational)",
    Pluto: "Where you transform (generational)"
  };
  const SIGN_KW = {
    Ariete: "with direct, impatient drive",
    Toro: "with steady, stubborn calm",
    Gemelli: "in a curious, quick, versatile way",
    Cancro: "in an emotional, protective, intuitive way",
    Leone: "with warmth, pride and theatrical flair",
    Vergine: "with precision, method and practical sense",
    Bilancia: "with elegance, balance and diplomacy",
    Scorpione: "with intensity, strategy and depth",
    Sagittario: "with enthusiasm, freedom and vision",
    Capricorno: "with discipline, ambition and patience",
    Acquario: "in an original, free, out-of-the-box way",
    Pesci: "in a sensitive, fluid, imaginative way"
  };

  // ====== FULL PORTRAIT: a compact reading of the whole chart ======
  const ELEM = {
    fuoco: { adj: "fire", temper: "You're driven by instinct, enthusiasm and the itch to act: you ignite fast, bringing heat and courage. Your challenge is channeling all that energy without burning out.", much: "Lots of fire: you live at full blast, an engine always running — careful not to launch before you think.", lack: "Little fire: initiative and spontaneous enthusiasm aren't your default setting — sometimes you need a push to jump in." },
    terra: { adj: "earth", temper: "Your feet are on the ground: concreteness, patience and practical sense. You build things that last and trust what you can touch. Your challenge is not to stiffen up — leave room for the unexpected.", much: "Lots of earth: you're solid, reliable, a born builder — watch out for rigidity and the old «we've always done it this way».", lack: "Little earth: concreteness and routine weigh on you — your job is to root your dreams in the real world." },
    aria: { adj: "air", temper: "You live on ideas, words and relationships: quick mind, infinite curiosity, a need for exchange. You understand the world by thinking about it and telling it. Your challenge is getting from the head down to the heart and the body.", much: "Lots of air: you think and communicate non-stop, a thousand connections — careful not to live in your head only.", lack: "Little air: rationalizing and stepping back aren't your strong suit — you tend to live things rather than analyze them." },
    acqua: { adj: "water", temper: "You feel everything deeply: empathy, intuition and emotional memory. You read people before they speak and you love intensely. Your challenge is protecting your boundaries without shutting down.", much: "Lots of water: you're a wildly powerful emotional antenna — learn not to absorb everyone's moods.", lack: "Little water: open displays of emotion make you uncomfortable — your growth is giving a voice to what you feel." }
  };
  const MOD = {
    cardinale: "You're a <b>starter</b>: you launch, propose, open new roads. Leader-and-pioneer energy; the challenge is finishing what you start.",
    fisso: "You're a <b>builder who holds the line</b>: determination, consistency, loyalty. Once you decide, you don't let go; the challenge is flexibility.",
    mobile: "You're an <b>adapter and connector</b>: versatile, curious, chameleonic. You move beautifully through change; the challenge is choosing and staying."
  };
  // Sun–Moon dialogue at the element level
  function elemPair(a, b) {
    if (a === b) return "Sun and Moon speak the same language: inside and out, you're consistent — what you show is what you feel. A lovely quiet strength.";
    const k = [a, b].sort().join("|");
    if (k === "aria|fuoco") return "Sun and Moon feed each other (fire and air): your ideas spark action and vice versa. Spontaneous, lively, a touch restless.";
    if (k === "acqua|terra") return "Sun and Moon nourish each other (earth and water): concreteness and emotion walk arm in arm. Deep and dependable at the same time.";
    if (k === "fuoco|terra" || k === "aria|terra") return "There's a creative tension between who you are and what you feel: part of you pushes, part of you brakes. Getting the two halves to talk is your superpower.";
    if (k === "acqua|fuoco") return "Fire and water live inside you: passion and sensitivity, drive and depth. An intense, sometimes contradictory mix — but magnetic.";
    if (k === "acqua|aria") return "Between head and heart (air and water) there's an ongoing dialogue: you analyze what you feel and feel what you think. Rich — though sometimes you overcomplicate things.";
    return "Who you are (Sun) and how you feel (Moon) travel on different tracks: a real asset, once you learn to translate one into the other.";
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

  // builds the portrait HTML from the computed chart
  function reading(R) {
    const sun = R.sun, moon = R.moon, asc = R.ascendant;
    // we use the 7 "personal+social" planets for the balance (no transgenerational ones) + Asc
    const core = R.planets.slice(0, 7).concat(asc ? [{ sign: asc.sign }] : []);
    const elc = countEl(core), modc = countMod(core);
    const domEl = topKey(elc), lowEl = lowKey(elc);
    const domMod = topKey(modc);

    let h = "";
    // 1. opening
    h += `<p>Your chart breathes mostly <b>${ELEM[domEl].adj}</b>. ${ELEM[domEl].temper}</p>`;
    // 2. the three pillars together
    let p2 = `<p>With the <b>Sun in ${sun.sign.n}</b> you are, deep down, ${shortSun(sun.sign)}. `;
    p2 += `The <b>Moon in ${moon.sign.n}</b> tells the story of your emotional world: ${shortMoon(moon.sign)}. `;
    if (asc) p2 += `And the <b>Ascendant in ${asc.sign.n}</b> is the first impression you make: ${shortAsc(asc.sign)}.`;
    else p2 += `(Add your birth time and you'll unlock the Ascendant too — the mask you wear when you meet the world.)`;
    p2 += `</p>`;
    h += p2;
    // 3. sun-moon dialogue
    h += `<p>${elemPair(sun.sign.el, moon.sign.el)}</p>`;
    // 4. element balance
    const elOrder = ["fuoco", "terra", "aria", "acqua"].sort((a, b) => elc[b] - elc[a]);
    h += `<p><b>Your balance:</b> ${ELEM[domEl].much} `;
    if (elc[lowEl] === 0) h += `On the flip side, the <b>${ELEM[lowEl].adj}</b> element is missing or nearly so: ${ELEM[lowEl].lack}</p>`;
    else h += `Your least-present element is <b>${ELEM[lowEl].adj}</b>: ${ELEM[lowEl].lack}</p>`;
    // 5. modality
    h += `<p>${MOD[domMod]}</p>`;
    // 6. mind / love / action
    const merc = R.planets[2], ven = R.planets[3], mars = R.planets[4];
    h += `<p><b>Mind, love, action.</b> You think and communicate ${kw(merc.sign)} (Mercury in ${merc.sign.n}). `;
    h += `In love and pleasure you move ${kw(ven.sign)} (Venus in ${ven.sign.n}). `;
    h += `And when you act or desire, you do it ${kw(mars.sign)} (Mars in ${mars.sign.n}).</p>`;
    // 7. closing
    h += `<p class="closing">In short: ${closing(sun.sign, moon.sign, asc ? asc.sign : null, domEl)}</p>`;
    return h;
  }
  // short extracts (first sentence) of the pillar texts
  function firstSentence(t) { const m = t.match(/^[^.]*\./); return m ? m[0].toLowerCase().replace(/^./, c => c.toLowerCase()) : t; }
  function shortSun(s) { return firstSentence(SUN[s.n] || "").replace(/\.$/, ""); }
  function shortMoon(s) { return firstSentence(MOON[s.n] || "").replace(/\.$/, "").replace(/^[A-Z]/, c => c.toLowerCase()); }
  function shortAsc(s) { return firstSentence(ASC[s.n] || "").replace(/\.$/, "").replace(/^[A-Z]/, c => c.toLowerCase()); }
  function kw(s) { return SIGN_KW[s.n] || ""; }
  function closing(sun, moon, asc, domEl) {
    let t = `a ${ELEM[domEl].adj} soul, ${sun.n} at heart`;
    t += ` and ${moon.n} in the feelings`;
    if (asc) t += `, showing up to the world with a ${asc.n} air`;
    t += `. And that's the beauty of your chart: you're not one single label, but the meeting point of all these energies.`;
    return t;
  }

  window.NATALTXT_EN = {
    sun: s => SUN[s.n] || "",
    moon: s => MOON[s.n] || "",
    asc: s => ASC[s.n] || "",
    planetTheme: key => PLANET_THEME[key] || "",
    planet: (key, sign) => (PLANET_THEME[key] || "") + " " + (SIGN_KW[sign.n] || "") + ".",
    reading: reading
  };
})();
