/* ============================================================
   ZODIAC · WIRE — attiva i motori nella lingua scelta + localizza i nomi
   - swap dei global tradotti (window.<GLOBAL>_<LANG>)
   - localizza i NOMI di segni e pianeti dentro NATAL (condiviso coi calcoli),
     così "Ariete"→"Aries", "Sole"→"Sun" appaiono ovunque.
   Uso: ZWIRE.activate(lang) prima di renderizzare; ri-attiva su 'zlangchange'.
   ============================================================ */
(function () {
  const GLOBALS = ["ZODIAC", "NATALTXT", "HOROSCOPE", "NATALDETAIL", "MATCH", "NATALASPECTS"];
  const SIGN_NAMES = {
    ariete:{it:"Ariete",en:"Aries",fr:"Bélier",es:"Aries",pt:"Áries",de:"Widder"},
    toro:{it:"Toro",en:"Taurus",fr:"Taureau",es:"Tauro",pt:"Touro",de:"Stier"},
    gemelli:{it:"Gemelli",en:"Gemini",fr:"Gémeaux",es:"Géminis",pt:"Gêmeos",de:"Zwillinge"},
    cancro:{it:"Cancro",en:"Cancer",fr:"Cancer",es:"Cáncer",pt:"Câncer",de:"Krebs"},
    leone:{it:"Leone",en:"Leo",fr:"Lion",es:"Leo",pt:"Leão",de:"Löwe"},
    vergine:{it:"Vergine",en:"Virgo",fr:"Vierge",es:"Virgo",pt:"Virgem",de:"Jungfrau"},
    bilancia:{it:"Bilancia",en:"Libra",fr:"Balance",es:"Libra",pt:"Libra",de:"Waage"},
    scorpione:{it:"Scorpione",en:"Scorpio",fr:"Scorpion",es:"Escorpio",pt:"Escorpião",de:"Skorpion"},
    sagittario:{it:"Sagittario",en:"Sagittarius",fr:"Sagittaire",es:"Sagitario",pt:"Sagitário",de:"Schütze"},
    capricorno:{it:"Capricorno",en:"Capricorn",fr:"Capricorne",es:"Capricornio",pt:"Capricórnio",de:"Steinbock"},
    acquario:{it:"Acquario",en:"Aquarius",fr:"Verseau",es:"Acuario",pt:"Aquário",de:"Wassermann"},
    pesci:{it:"Pesci",en:"Pisces",fr:"Poissons",es:"Piscis",pt:"Peixes",de:"Fische"}
  };
  const PLANET_NAMES = {
    Sun:{it:"Sole",en:"Sun",fr:"Soleil",es:"Sol",pt:"Sol",de:"Sonne"},
    Moon:{it:"Luna",en:"Moon",fr:"Lune",es:"Luna",pt:"Lua",de:"Mond"},
    Mercury:{it:"Mercurio",en:"Mercury",fr:"Mercure",es:"Mercurio",pt:"Mercúrio",de:"Merkur"},
    Venus:{it:"Venere",en:"Venus",fr:"Vénus",es:"Venus",pt:"Vênus",de:"Venus"},
    Mars:{it:"Marte",en:"Mars",fr:"Mars",es:"Marte",pt:"Marte",de:"Mars"},
    Jupiter:{it:"Giove",en:"Jupiter",fr:"Jupiter",es:"Júpiter",pt:"Júpiter",de:"Jupiter"},
    Saturn:{it:"Saturno",en:"Saturn",fr:"Saturne",es:"Saturno",pt:"Saturno",de:"Saturn"},
    Uranus:{it:"Urano",en:"Uranus",fr:"Uranus",es:"Urano",pt:"Urano",de:"Uranus"},
    Neptune:{it:"Nettuno",en:"Neptune",fr:"Neptune",es:"Neptuno",pt:"Netuno",de:"Neptun"},
    Pluto:{it:"Plutone",en:"Pluto",fr:"Pluton",es:"Plutón",pt:"Plutão",de:"Pluto"}
  };
  const EL_NAMES = {
    fuoco:{it:"fuoco",en:"fire",fr:"feu",es:"fuego",pt:"fogo",de:"Feuer"},
    terra:{it:"terra",en:"earth",fr:"terre",es:"tierra",pt:"terra",de:"Erde"},
    aria:{it:"aria",en:"air",fr:"air",es:"aire",pt:"ar",de:"Luft"},
    acqua:{it:"acqua",en:"water",fr:"eau",es:"agua",pt:"água",de:"Wasser"}
  };
  let snapped = false;
  function snapshotIT() {
    if (snapped) return;
    GLOBALS.forEach(g => { if (window[g] != null && window["__IT_" + g] == null) window["__IT_" + g] = window[g]; });
    snapped = true;
  }
  function localizeNames(lang) {
    const N = window.NATAL; if (!N) return;
    if (N.SIGNS) N.SIGNS.forEach(s => { const t = SIGN_NAMES[s.k]; if (t && t[lang]) s.n = t[lang]; });
    if (N.PLANETS) N.PLANETS.forEach(p => { const t = PLANET_NAMES[p.key]; if (t && t[lang]) p.n = t[lang]; });
  }
  function activate(lang) {
    snapshotIT();
    lang = lang || (window.ZI18N ? window.ZI18N.get() : "it");
    const SUF = lang.toUpperCase();
    GLOBALS.forEach(g => {
      let v = (lang === "it") ? window["__IT_" + g] : window[g + "_" + SUF];
      if (v != null) window[g] = v;
    });
    localizeNames(lang);
    return lang;
  }
  function signName(key, lang) { lang = lang || (window.ZI18N ? window.ZI18N.get() : "it"); return (SIGN_NAMES[key] || {})[lang] || key; }
  function elName(key, lang) { lang = lang || (window.ZI18N ? window.ZI18N.get() : "it"); return (EL_NAMES[key] || {})[lang] || key; }
  function signs(lang, itArray) {
    lang = lang || (window.ZI18N ? window.ZI18N.get() : "it");
    if (lang === "it") return itArray;
    const v = window["ZSIGNS_" + lang.toUpperCase()];
    return v || itArray;
  }
  window.ZWIRE = { activate, signs, signName, elName, localizeNames, GLOBALS, SIGN_NAMES, PLANET_NAMES, EL_NAMES };
})();
