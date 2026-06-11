/* ============================================================
   ZODIAC · THÈME NATAL — TEXTES (voix pop / BD) — VERSION FR
   Soleil = qui tu es · Lune = comment tu ressens · Ascendant = comment tu apparais
   + lignes courtes pour les planètes.
   window.NATALTXT_FR.sun(sign) / .moon(sign) / .asc(sign) / .planet(key, sign)
   ============================================================ */
(function () {
  const SUN = {
    Ariete: "Tu es l'étincelle qui met le feu à la pièce. Premier à partir, premier à oser : tu vis à fond la caisse et l'attente t'ennuie. Du courage à revendre, de la patience à muscler.",
    Toro: "Tu es le roc chaleureux : stable, sensuel, fidèle au beau et au bon. Lent à démarrer, impossible à déplacer. Tu savoures la vie avec les cinq sens.",
    Gemelli: "Esprit curieux, langue rapide, mille onglets ouverts. Tu changes d'avis comme de sujet — et tu fais les deux à merveille. Tu t'ennuies vite, mais tu n'es jamais ennuyeux.",
    Cancro: "Grand cœur avec carapace. Tu ressens tout, tu te souviens de tout, tu protèges les tiens comme un fortin. Maison, affections et mémoire sont ton superpouvoir.",
    Leone: "Né pour briller, et tu ne t'en excuses pas. Généreux, chaleureux, dramatique juste ce qu'il faut : quand tu entres, les projecteurs s'allument. Il te faut de vrais applaudissements.",
    Vergine: "Un œil chirurgical pour le détail que personne ne voit. Pratique, précis, utile : tu répares le monde un morceau à la fois. Apprends à te pardonner tes erreurs.",
    Bilancia: "Tu cherches l'équilibre, la beauté et l'harmonie en toute chose. Diplomate né, tu vis de relations et de détails élégants. La décision, c'est ta salle de sport.",
    Scorpione: "Intense jusqu'à la moelle : tout ou rien. Tu vois sous la surface, tu aimes en profondeur et tu n'oublies pas. Magnétique, loyal, impossible à ignorer.",
    Sagittario: "Une âme libre, la flèche pointée vers l'horizon. Tu vis d'aventures, de vérité et de sens — tu détestes les cages et les mensonges. Optimisme contagieux.",
    Capricorno: "Tu gravis la montagne avec calme et discipline. Ambitieux, fiable, ironique sous ta carapace de manager. Tu construis des choses qui durent.",
    Acquario: "Un cerveau venu du futur, allergique aux règles inutiles. Original, idéaliste, un peu alien — et fier de l'être. Tu changes les choses en voyant grand.",
    Pesci: "Rêveur avec les antennes branchées sur le monde invisible. Empathique, créatif, fluide : tu sens les gens avant qu'ils ne parlent. Tu as besoin de tes propres frontières."
  };
  const MOON = {
    Ariete: "Des émotions à cuisson rapide : tu t'enflammes tout de suite et ça te passe aussi vite. Tu as besoin d'agir pour aller bien, pas de ruminer.",
    Toro: "Tu as besoin de calme, de confort et de routine pour te sentir en sécurité. Câlins, bonne bouffe et stabilité : voilà ton médicament émotionnel.",
    Gemelli: "Tu ressens en pensant : il faut que tu en parles pour comprendre. La variété te calme, l'ennui t'agite. Cerveau allumé en permanence, même la nuit.",
    Cancro: "La Lune joue à domicile : tu ressens tout à plein volume. Les affections, les souvenirs et le nid te nourrissent ; blessé, tu te replies dans ta coquille.",
    Leone: "Tu as besoin de te sentir vu et aimé pour aller bien. Ton cœur chaud carbure à la reconnaissance, au drame et au jeu.",
    Vergine: "L'ordre te tranquillise : une liste cochée, une chose rangée. Tu as tendance à t'inquiéter — prendre soin des autres est ta langue d'amour.",
    Bilancia: "Tu vas bien quand l'harmonie règne autour de toi. Disputes et tensions te déstabilisent ; la beauté et la compagnie te remettent au centre.",
    Scorpione: "Tu ressens en profondeur et en secret : peu d'émotions, mais océaniques. Il te faut une confiance totale et une vraie intimité pour t'ouvrir.",
    Sagittario: "Tu as besoin d'espace, de liberté et de sens. Une aventure, un fou rire, un nouvel horizon te remontent le moral. La cage t'éteint.",
    Capricorno: "Tu contrôles tes émotions et tu fais confiance aux faits. Tu te sens en sécurité avec une structure et un cap. Autorise-toi à ressentir, pas seulement à gérer.",
    Acquario: "Tu vis tes sentiments à bonne distance : tu rationalises avant de ressentir. Tu as besoin de liberté et d'une tribu d'amis plus que de fusion.",
    Pesci: "Une éponge émotionnelle : tu absorbes l'humeur de la pièce. Il te faut de l'art, du rêve et des moments de solitude pour te recharger."
  };
  const ASC = {
    Ariete: "Tu débarques comme une énergie directe et sportive : on dirait que tu es prêt à démarrer. Première impression : du punch, de la spontanéité, un soupçon d'impatience.",
    Toro: "Tu dégages du calme et de la solidité : présence détendue, voix douce, style soigné. Tu as l'air de quelqu'un à qui on peut faire confiance.",
    Gemelli: "Tu sembles vif, brillant et bavard : tu mets tout de suite à l'aise. Un air jeune et curieux, mille questions en réserve.",
    Cancro: "Tu donnes l'impression d'être doux, accueillant et un peu réservé. Les autres se sentent protégés près de toi.",
    Leone: "Tu entres avec présence : port fier, sourire chaud, quelque chose de magnétique. Difficile de ne pas te remarquer.",
    Vergine: "Tu sembles posé, attentif et fiable : un œil sur les détails et des manières mesurées. Tu dégages une compétence tranquille.",
    Bilancia: "Un air élégant et gentil : charme naturel et manières diplomates. On t'apprécie facilement, tu mets la paix dans la pièce.",
    Scorpione: "Regard intense et magnétique, une aura de mystère. Tu as l'air de voir au-delà — tu fascines et tu intimides un peu.",
    Sagittario: "Tu arrives avec une énergie ouverte et optimiste : grand sourire, esprit voyageur. Tu as l'air de quelqu'un avec qui on s'amuse.",
    Capricorno: "Tu dégages du sérieux, du contrôle et de l'ambition : une présence adulte même jeune. Tu as l'air de savoir ce que tu fais.",
    Acquario: "Un air original et un peu hors cadre : amical mais détaché. Tu as l'air de penser autrement.",
    Pesci: "Une aura douce, rêveuse et insaisissable : regard gentil, manières souples. Tu sembles sensible et un peu ailleurs."
  };
  // Planètes mineures : mot-clé par domaine + comment le signe le colore
  const PLANET_THEME = {
    Mercury: "Comment tu penses et communiques",
    Venus: "Comment tu aimes et ce qui te plaît",
    Mars: "Comment tu agis et désires",
    Jupiter: "Où tu grandis et as de la chance",
    Saturn: "Où tu apprends et t'engages",
    Uranus: "Où tu es rebelle (génération)",
    Neptune: "Où tu rêves (génération)",
    Pluto: "Où tu te transformes (génération)"
  };
  const SIGN_KW = {
    Ariete: "avec un élan direct et impatient",
    Toro: "avec un calme concret et têtu",
    Gemelli: "de façon curieuse, rapide et polyvalente",
    Cancro: "de façon émotive, protectrice et intuitive",
    Leone: "avec chaleur, fierté et sens du théâtre",
    Vergine: "avec précision, méthode et sens pratique",
    Bilancia: "avec élégance, équilibre et diplomatie",
    Scorpione: "avec intensité, stratégie et profondeur",
    Sagittario: "avec enthousiasme, liberté et vision",
    Capricorno: "avec discipline, ambition et patience",
    Acquario: "de façon originale, libre et hors des sentiers battus",
    Pesci: "de façon sensible, fluide et imaginative"
  };

  // ====== PORTRAIT COMPLET : lecture synthétique du thème entier ======
  const ELEM = {
    fuoco: { adj: "feu", temper: "Tu carbures à l'instinct, à l'enthousiasme et à l'envie d'agir : tu t'enflammes vite, tu y mets chaleur et courage. Ton défi : canaliser toute cette énergie sans te cramer.", much: "Beaucoup de feu : tu vis à fond, tu es un moteur allumé — attention à ne pas démarrer avant de réfléchir.", lack: "Peu de feu : l'initiative et l'enthousiasme spontané ne sont pas ton mode automatique — parfois il te faut un coup de pouce pour te lancer." },
    terra: { adj: "terre", temper: "Tu as les pieds sur terre : du concret, de la patience et du sens pratique. Tu construis des choses qui durent et tu fais confiance à ce que tu peux toucher. Ton défi : ne pas te rigidifier et laisser de la place à l'imprévu.", much: "Beaucoup de terre : tu es solide, fiable, bâtisseur né — gare à la rigidité et au « on a toujours fait comme ça ».", lack: "Peu de terre : le concret et la routine te pèsent — ton boulot, c'est d'ancrer tes rêves dans le réel." },
    aria: { adj: "air", temper: "Tu vis d'idées, de mots et de relations : esprit rapide, curiosité infinie, besoin d'échange. Tu comprends le monde en y pensant et en le racontant. Ton défi : descendre de la tête vers le cœur et le corps.", much: "Beaucoup d'air : tu penses et communiques non-stop, mille connexions — attention à ne pas vivre que dans ta tête.", lack: "Peu d'air : rationaliser et prendre du recul, ce n'est pas ton fort — tu vis les choses plus que tu ne les analyses." },
    acqua: { adj: "eau", temper: "Tu ressens tout en profondeur : empathie, intuition et mémoire émotionnelle. Tu lis les gens avant qu'ils ne parlent et tu aimes intensément. Ton défi : protéger tes frontières sans te fermer.", much: "Beaucoup d'eau : tu es une antenne émotionnelle surpuissante — apprends à ne pas absorber l'humeur de tout le monde.", lack: "Peu d'eau : l'émotion affichée te met mal à l'aise — ta croissance, c'est de donner voix à ce que tu ressens." }
  };
  const MOD = {
    cardinale: "Tu es du genre à <b>démarrer</b> : tu lances, tu proposes, tu ouvres des routes. Une énergie de leader et de pionnier ; le défi, c'est de finir ce que tu commences.",
    fisso: "Tu es du genre à <b>construire et tenir bon</b> : détermination, constance, loyauté. Une fois décidé, tu ne lâches rien ; le défi, c'est la flexibilité.",
    mobile: "Tu es du genre à <b>t'adapter et connecter</b> : polyvalent, curieux, caméléon. Tu navigues bien dans le changement ; le défi, c'est de choisir et de rester."
  };
  // dialogue Soleil–Lune au niveau de l'élément
  function elemPair(a, b) {
    if (a === b) return "Soleil et Lune parlent la même langue : dedans et dehors, tu es cohérent — ce que tu montres est ce que tu ressens. Une belle force tranquille.";
    const k = [a, b].sort().join("|");
    if (k === "aria|fuoco") return "Soleil et Lune se nourrissent l'un l'autre (feu et air) : tes idées allument l'action et vice versa. Spontané, vif, un brin agité.";
    if (k === "acqua|terra") return "Soleil et Lune se nourrissent mutuellement (terre et eau) : le concret et l'émotion marchent bras dessus bras dessous. Profond et fiable à la fois.";
    if (k === "fuoco|terra" || k === "aria|terra") return "Il y a une tension créative entre qui tu es et ce que tu ressens : une partie de toi pousse, l'autre freine. Apprendre à faire dialoguer les deux moitiés, c'est ton superpouvoir.";
    if (k === "acqua|fuoco") return "En toi cohabitent le feu et l'eau : passion et sensibilité, élan et profondeur. Un mix intense, parfois contradictoire — mais magnétique.";
    if (k === "acqua|aria") return "Entre la tête et le cœur (air et eau), le dialogue est permanent : tu analyses ce que tu ressens et tu ressens ce que tu penses. Riche, mais parfois tu te compliques la vie.";
    return "Qui tu es (Soleil) et ce que tu ressens (Lune) roulent sur des rails différents : une richesse, si tu apprends à traduire l'un dans l'autre.";
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

  // construit le HTML du portrait à partir du résultat du calcul
  function reading(R) {
    const sun = R.sun, moon = R.moon, asc = R.ascendant;
    // on considère les 7 planètes "personnelles+sociales" pour l'équilibre (pas les transgénérationnelles) + Asc
    const core = R.planets.slice(0, 7).concat(asc ? [{ sign: asc.sign }] : []);
    const elc = countEl(core), modc = countMod(core);
    const domEl = topKey(elc), lowEl = lowKey(elc);
    const domMod = topKey(modc);

    let h = "";
    // 1. ouverture
    h += `<p>Ton thème respire surtout l'élément <b>${ELEM[domEl].adj}</b>. ${ELEM[domEl].temper}</p>`;
    // 2. les trois piliers ensemble
    let p2 = `<p>Avec le <b>Soleil en ${sun.sign.n}</b>, au fond, ${shortSun(sun.sign)}. `;
    p2 += `La <b>Lune en ${moon.sign.n}</b> raconte ton monde émotionnel : ${shortMoon(moon.sign)}. `;
    if (asc) p2 += `Et l'<b>Ascendant ${asc.sign.n}</b> est la première impression que tu donnes : ${shortAsc(asc.sign)}.`;
    else p2 += `(Avec ton heure de naissance, tu pourras aussi ajouter l'Ascendant, le masque avec lequel tu te présentes au monde.)`;
    p2 += `</p>`;
    h += p2;
    // 3. dialogue soleil-lune
    h += `<p>${elemPair(sun.sign.el, moon.sign.el)}</p>`;
    // 4. équilibre des éléments
    const elOrder = ["fuoco", "terra", "aria", "acqua"].sort((a, b) => elc[b] - elc[a]);
    h += `<p><b>Ton équilibre :</b> ${ELEM[domEl].much} `;
    if (elc[lowEl] === 0) h += `À l'opposé, l'élément <b>${ELEM[lowEl].adj}</b> est absent ou presque : ${ELEM[lowEl].lack}</p>`;
    else h += `L'élément le moins présent est le <b>${ELEM[lowEl].adj}</b> : ${ELEM[lowEl].lack}</p>`;
    // 5. modalité
    h += `<p>${MOD[domMod]}</p>`;
    // 6. tête / amour / action
    const merc = R.planets[2], ven = R.planets[3], mars = R.planets[4];
    h += `<p><b>Tête, amour, action.</b> Tu penses et communiques ${kw(merc.sign)} (Mercure en ${merc.sign.n}). `;
    h += `En amour et côté plaisir, tu avances ${kw(ven.sign)} (Vénus en ${ven.sign.n}). `;
    h += `Et quand tu agis ou désires, tu le fais ${kw(mars.sign)} (Mars en ${mars.sign.n}).</p>`;
    // 7. conclusion
    h += `<p class="closing">En résumé : ${closing(sun.sign, moon.sign, asc ? asc.sign : null, domEl)}</p>`;
    return h;
  }
  // extraits courts (première phrase) des textes piliers
  function firstSentence(t) { const m = t.match(/^[^.]*\./); return m ? m[0].toLowerCase().replace(/^./, c => c.toLowerCase()) : t; }
  function shortSun(s) { return firstSentence(SUN[s.n] || "").replace(/\.$/, ""); }
  function shortMoon(s) { return firstSentence(MOON[s.n] || "").replace(/\.$/, "").replace(/^[A-Z]/, c => c.toLowerCase()); }
  function shortAsc(s) { return firstSentence(ASC[s.n] || "").replace(/\.$/, "").replace(/^[A-Z]/, c => c.toLowerCase()); }
  function kw(s) { return SIGN_KW[s.n] || ""; }
  function closing(sun, moon, asc, domEl) {
    let t = `une âme côté ${ELEM[domEl].adj}, ${sun.n} dans le cœur`;
    t += ` et ${moon.n} dans les émotions`;
    if (asc) t += `, qui se présente au monde avec des airs de ${asc.n}`;
    t += `. Le plus beau dans ton thème, c'est exactement ça : tu n'es pas une seule étiquette, mais la rencontre de toutes ces énergies.`;
    return t;
  }

  window.NATALTXT_FR = {
    sun: s => SUN[s.n] || "",
    moon: s => MOON[s.n] || "",
    asc: s => ASC[s.n] || "",
    planetTheme: key => PLANET_THEME[key] || "",
    planet: (key, sign) => (PLANET_THEME[key] || "") + " " + (SIGN_KW[sign.n] || "") + ".",
    reading: reading
  };
})();
