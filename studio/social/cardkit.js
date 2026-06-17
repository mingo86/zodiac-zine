/* ============================================================
   ZODIAC · SOCIAL CARDKIT
   Costruisce una card "singolo segno" in 3 direzioni visive
   (pop · cosmo · adesivi), con effetti (sunburst/halftone/stelle),
   mascotte centrata e animazione occhi→box.
   Dipende da: window.MASCOT (coppie/mascots.js), window.ZSIGNS_IT.
   ============================================================ */
(function () {
  const EL = { fuoco: "#ec2e36", terra: "#36b06a", aria: "#f5b700", acqua: "#2f9bdb" };
  const EL_ADES = { fuoco: "#ff5d73", terra: "#4cb285", aria: "#ffc24b", acqua: "#4a86d8" };

  const SIGNS = (lang) => window["ZSIGNS_" + (lang || "it").toUpperCase()] || window.ZSIGNS_IT || [];
  const byKey = (k, lang) => SIGNS(lang).find((s) => s.k === k);
  const LG = (o) => (o && o.lang ? o.lang : "it").toLowerCase();

  /* ---- UI strings per lingua ---- */
  const UI = {
    it: {
      facts: "cosa mi rende un\u2026", date: "come conquistare un\u2026", flags: "le mie bandiere\u2026",
      sexSeries: "chimica a letto\u2026", compatSeries: "compatibility with\u2026",
      mantra: "MANTRA", match: "MATCH", chimica: "CHIMICA",
      soulmate: (a, b) => `Anima gemella: ${a}. Tieni d'occhio: ${b}.`,
      sexline: ["Chimica da costruire.", "Si scalda piano.", "Bella scintilla.", "Fuoco vero."],
      lens: { amore: "in coppia\u2026", amicizia: "come amici\u2026", lavoro: "come soci\u2026", famiglia: "in famiglia\u2026", convivenza: "da conviventi\u2026", ex: "da ex\u2026", capo: "capo & team\u2026" },
    },
    en: {
      facts: "what makes me a\u2026", date: "how to date a\u2026", flags: "my flags\u2026",
      sexSeries: "between the sheets\u2026", compatSeries: "compatibility with\u2026",
      mantra: "MANTRA", match: "MATCH", chimica: "CHEMISTRY",
      soulmate: (a, b) => `Soulmate: ${a}. Watch out for: ${b}.`,
      sexline: ["Chemistry to build.", "Warms up slowly.", "Real spark.", "Pure fire."],
      lens: { amore: "in relationships\u2026", amicizia: "as friends\u2026", lavoro: "as partners\u2026", famiglia: "as family\u2026", convivenza: "as roommates\u2026", ex: "as exes\u2026", capo: "boss & team\u2026" },
    },
    de: {
      facts: "das macht mich zum\u2026", date: "so erobert man einen\u2026", flags: "meine Flaggen\u2026",
      sexSeries: "Chemie im Bett\u2026", compatSeries: "Kompatibilit\u00e4t mit\u2026",
      mantra: "MANTRA", match: "MATCH", chimica: "CHEMIE",
      soulmate: (a, b) => `Seelenverwandt: ${a}. Aufpassen bei: ${b}.`,
      sexline: ["Chemie muss wachsen.", "Wird langsam hei\u00df.", "Sch\u00f6ner Funke.", "Echtes Feuer."],
      lens: { amore: "als Paar\u2026", amicizia: "als Freunde\u2026", lavoro: "als Partner\u2026", famiglia: "als Familie\u2026", convivenza: "als Mitbewohner\u2026", ex: "als Ex\u2026", capo: "Chef & Team\u2026" },
    },
    fr: {
      facts: "ce qui fait de moi un\u2026", date: "comment s\u00e9duire un\u2026", flags: "mes drapeaux\u2026",
      sexSeries: "alchimie au lit\u2026", compatSeries: "compatibilit\u00e9 avec\u2026",
      mantra: "MANTRA", match: "MATCH", chimica: "ALCHIMIE",
      soulmate: (a, b) => `\u00c2me s\u0153ur : ${a}. M\u00e9fie-toi de : ${b}.`,
      sexline: ["Alchimie \u00e0 construire.", "\u00c7a chauffe doucement.", "Belle \u00e9tincelle.", "Vrai feu."],
      lens: { amore: "en couple\u2026", amicizia: "entre amis\u2026", lavoro: "comme associ\u00e9s\u2026", famiglia: "en famille\u2026", convivenza: "en coloc\u2026", ex: "entre ex\u2026", capo: "chef & \u00e9quipe\u2026" },
    },
    es: {
      facts: "lo que me hace un\u2026", date: "c\u00f3mo conquistar a un\u2026", flags: "mis banderas\u2026",
      sexSeries: "qu\u00edmica en la cama\u2026", compatSeries: "compatibilidad con\u2026",
      mantra: "MANTRA", match: "MATCH", chimica: "QU\u00cdMICA",
      soulmate: (a, b) => `Alma gemela: ${a}. Ojo con: ${b}.`,
      sexline: ["Qu\u00edmica por construir.", "Se calienta despacio.", "Buena chispa.", "Fuego de verdad."],
      lens: { amore: "en pareja\u2026", amicizia: "como amigos\u2026", lavoro: "como socios\u2026", famiglia: "en familia\u2026", convivenza: "como convivientes\u2026", ex: "como ex\u2026", capo: "jefe y equipo\u2026" },
    },
    pt: {
      facts: "o que me torna um\u2026", date: "como conquistar um\u2026", flags: "minhas bandeiras\u2026",
      sexSeries: "qu\u00edmica na cama\u2026", compatSeries: "compatibilidade com\u2026",
      mantra: "MANTRA", match: "MATCH", chimica: "QU\u00cdMICA",
      soulmate: (a, b) => `Alma g\u00eamea: ${a}. Fica de olho em: ${b}.`,
      sexline: ["Qu\u00edmica pra construir.", "Esquenta devagar.", "Fa\u00edsca boa.", "Fogo de verdade."],
      lens: { amore: "a dois\u2026", amicizia: "como amigos\u2026", lavoro: "como s\u00f3cios\u2026", famiglia: "em fam\u00edlia\u2026", convivenza: "morando juntos\u2026", ex: "como ex\u2026", capo: "chefe & equipe\u2026" },
    },
  };
  const TX = (o) => UI[LG(o)] || UI.it;

  /* ---- FORMAT: quali campi diventano i box + il mantra ---- */
  const FORMATS = {
    facts: { key: "facts", boxes: (s) => s.sap.concat(s.gf), mantra: (s) => s.q },
    date: { key: "date", boxes: (s) => s.con.concat(s.deal.slice(0, 3)), mantra: (s) => s.q },
    flags: { key: "flags", boxes: (s) => s.gf.concat(s.rf, s.sap.slice(0, 2)), mantra: (s) => s.q },
  };

  /* ---- GEOMETRIA per TAGLIO: post 1:1 · story 9:16 · cover 4:5 ---- */
  const GEO = {
    post: {
      mascot: { top: 27, w: 33 },
      slots: [
        { cls: "C", top: 15.5, w: 46, gx: 0, gy: -4 },
        { cls: "R", top: 27, w: 32, right: 3, gx: 4, gy: -3 },
        { cls: "R", top: 44, w: 30, right: 1, gx: 5, gy: 0 },
        { cls: "R", top: 59, w: 31, right: 3.5, gx: 4, gy: 3 },
        { cls: "C", top: 70, w: 48, gx: 0, gy: 4 },
        { cls: "L", top: 59, w: 31, left: 3.5, gx: -4, gy: 3 },
        { cls: "L", top: 44, w: 30, left: 1, gx: -5, gy: 0 },
        { cls: "L", top: 27, w: 32, left: 3, gx: -4, gy: -3 },
      ],
    },
    story: {
      mascot: { top: 35, w: 30 },
      slots: [
        { cls: "C", top: 18.5, w: 62, gx: 0, gy: -4 },
        { cls: "R", top: 25.5, w: 45, right: 4, gx: 4, gy: -3 },
        { cls: "L", top: 25.5, w: 45, left: 4, gx: -4, gy: -3 },
        { cls: "R", top: 46, w: 36, right: 3, gx: 5, gy: 0 },
        { cls: "L", top: 46, w: 36, left: 3, gx: -5, gy: 0 },
        { cls: "C", top: 65, w: 64, gx: 0, gy: 4 },
        { cls: "R", top: 76, w: 45, right: 4, gx: 4, gy: 3 },
        { cls: "L", top: 76, w: 45, left: 4, gx: -4, gy: 3 },
      ],
    },
    cover: {
      mascot: { top: 27, w: 44 },
      slots: [],
    },
  };

  /* ---- piccola stella a 4 punte (sparkle pop) ---- */
  function star(size, col, stroke) {
    const r = size / 2, ri = r * 0.34;
    const pts = [];
    for (let i = 0; i < 8; i++) {
      const rad = i % 2 ? ri : r;
      const a = (Math.PI / 4) * i - Math.PI / 2;
      pts.push((r + rad * Math.cos(a)).toFixed(1) + "," + (r + rad * Math.sin(a)).toFixed(1));
    }
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <polygon points="${pts.join(" ")}" fill="${col}" ${stroke ? `stroke="${stroke}" stroke-width="1.4" stroke-linejoin="round"` : ""}/></svg>`;
  }

  function decoStars(dir, el) {
    const wrap = document.createElement("div");
    wrap.className = "fx stars";
    if (dir === "cosmo") {
      let dots = "";
      for (let i = 0; i < 46; i++) {
        const x = Math.random() * 100, y = Math.random() * 100;
        const inCenter = x > 32 && x < 68 && y > 26 && y < 70;
        const s = (Math.random() * 1.7 + 0.6).toFixed(1);
        const o = (Math.random() * 0.5 + (inCenter ? 0.12 : 0.35)).toFixed(2);
        dots += `<span class="dot" style="left:${x.toFixed(1)}%;top:${y.toFixed(1)}%;width:${s}px;height:${s}px;opacity:${o}"></span>`;
      }
      wrap.innerHTML = dots;
    }
    const SP = dir === "cosmo"
      ? [[7, 12, 18, "#fff"], [90, 18, 14, el], [86, 80, 16, "#fff"], [10, 84, 13, el], [50, 8, 12, el]]
      : dir === "adesivi"
        ? [[8, 14, 22, "#fff", "#15110d"], [88, 20, 17, "#fff", "#15110d"], [85, 82, 20, "#fff", "#15110d"], [11, 80, 16, "#fff", "#15110d"]]
        : [[7, 13, 22, "#15110d"], [89, 17, 16, el], [87, 82, 19, "#15110d"], [10, 83, 15, el], [50, 6, 14, "#15110d"]];
    SP.forEach(([x, y, sz, col, st]) => {
      const sp = document.createElement("span");
      sp.className = "sparkle";
      sp.style.cssText = `left:${x}%;top:${y}%`;
      sp.innerHTML = star(sz, col, st);
      wrap.appendChild(sp);
    });
    return wrap;
  }

  /* ============================================================
     buildCard(host, {key, dir, format, variant})
     ritorna { replay() }
     ============================================================ */
  function buildCard(host, opts) {
    const s = byKey(opts.key, opts.lang);
    if (!s) return null;
    const dir = opts.dir || "pop";
    const fmt = FORMATS[opts.format || "facts"];
    const el = s.el;
    const adesivi = dir === "adesivi";
    const elColor = (adesivi ? EL_ADES : EL)[el];
    const theme = adesivi ? "adesivi" : "stampa";
    const variant = opts.variant || null;
    const size = opts.size || "post";
    const geo = GEO[size] || GEO.post;

    host.className = "card dir-" + dir + " size-" + size + " bgskin-" + (opts.bg || "raggi") + (opts.still ? " still" : "");
    host.style.setProperty("--el", elColor);
    host.innerHTML = "";

    /* --- effetti di sfondo --- */
    const bg = document.createElement("div"); bg.className = "fx bgbase";
    const sun = document.createElement("div"); sun.className = "fx sun";
    const ht = document.createElement("div"); ht.className = "fx halftone";
    const glow = document.createElement("div"); glow.className = "fx glow";
    host.append(bg, sun, ht, glow, decoStars(dir, elColor));

    /* --- testata: serie + nome segno --- */
    const head = document.createElement("div"); head.className = "head";
    head.innerHTML = `<div class="series">${TX(opts)[fmt.key]}</div><div class="signname">${s.n.toUpperCase()}</div>`;
    host.appendChild(head);

    /* --- mascotte --- */
    const wrap = document.createElement("div"); wrap.className = "mascotWrap";
    wrap.style.top = geo.mascot.top + "%";
    wrap.style.width = geo.mascot.w + "%";
    const mascot = document.createElement("div"); mascot.className = "mascot";
    mascot.innerHTML = window.MASCOT({ k: s.k, el: el }, elColor, theme, 1, "happy", variant);
    wrap.appendChild(mascot);
    host.appendChild(wrap);

    /* --- box frasi --- */
    const phrases = geo.slots.length ? fmt.boxes(s).slice(0, geo.slots.length) : [];
    const boxes = [];
    geo.slots.forEach((slot, i) => {
      if (i >= phrases.length) return;
      const b = document.createElement("div");
      b.className = "box " + slot.cls + (i % 2 ? " alt" : "");
      b.style.top = slot.top + "%";
      b.style.width = slot.w + "%";
      if (slot.left != null) b.style.left = slot.left + "%";
      if (slot.right != null) b.style.right = slot.right + "%";
      const rot = (i % 2 ? 1 : -1) * (1 + (i % 2));
      b.style.setProperty("--rot", rot + "deg");
      b.textContent = phrases[i];
      b.dataset.gx = slot.gx; b.dataset.gy = slot.gy;
      host.appendChild(b);
      boxes.push(b);
    });

    /* --- mantra --- */
    const mantra = document.createElement("div"); mantra.className = "mantra";
    const quote = fmt.mantra(s);
    mantra.innerHTML = `<span class="tag">${TX(opts).mantra}</span><span class="mt"></span>`;
    host.appendChild(mantra);
    const mt = mantra.querySelector(".mt");

    /* --- cover: indizio "scorri" --- */
    let swipe = null;
    if (size === "cover") {
      swipe = document.createElement("div"); swipe.className = "swipe";
      swipe.innerHTML = `<span>scorri</span> \u2192`;
      host.appendChild(swipe);
    }

    /* --- fit del nome del segno (evita overflow/sdoppiamenti) --- */
    function fitName() {
      const sn = head.querySelector(".signname");
      sn.style.fontSize = "";
      const max = host.clientWidth * 0.92;
      let guard = 40;
      while (sn.scrollWidth > max && guard-- > 0) {
        const cur = parseFloat(getComputedStyle(sn).fontSize);
        sn.style.fontSize = (cur - 1) + "px";
      }
    }

    /* --- occhi --- */
    const pup = mascot.querySelector(".zpup");
    const ew = mascot.querySelectorAll('circle[fill="#fff"]');
    const pp = mascot.querySelectorAll(".zpup circle");
    const DX = pp[0] && ew[0] ? parseFloat(pp[0].getAttribute("cx")) - parseFloat(ew[0].getAttribute("cx")) : 0;
    function look(gx, gy) { if (pup) pup.style.transform = `translate(${gx - DX}px,${gy}px)`; }
    function wink() {
      const e = ew[1], p = pp[1];
      [e, p].forEach((x) => { if (!x) return; x.style.transformBox = "fill-box"; x.style.transformOrigin = "center"; x.style.transition = "transform .14s ease"; x.style.transform = "scaleY(.07)"; });
      setTimeout(() => { [e, p].forEach((x) => { if (x) x.style.transform = "scaleY(1)"; }); }, 360);
    }

    /* --- animazione --- */
    let timers = [], loop = null, idx = -1;
    const T = (fn, ms) => timers.push(setTimeout(fn, ms));
    function clearAll() { timers.forEach(clearTimeout); timers = []; if (loop) { clearInterval(loop); loop = null; } }
    function step() {
      if (!boxes.length) return;
      boxes.forEach((d) => d.classList.remove("hot"));
      idx = (idx + 1) % boxes.length;
      const d = boxes[idx];
      d.classList.add("hot");
      look(+d.dataset.gx, +d.dataset.gy);
    }
    function typeM(done) {
      let i = 0; mt.textContent = ""; mt.classList.add("typing");
      (function tk() { mt.textContent = quote.slice(0, ++i); if (i < quote.length) T(tk, 34); else { mt.classList.remove("typing"); done && done(); } })();
    }
    function reset() {
      clearAll();
      head.classList.remove("in"); wrap.classList.remove("in"); mascot.classList.remove("bob");
      mantra.classList.remove("in"); mt.textContent = ""; look(0, 0);
      if (swipe) swipe.classList.remove("in");
      boxes.forEach((d) => d.classList.remove("in", "hot"));
    }
    function play() {
      reset();
      T(() => wrap.classList.add("in"), 200);
      T(() => mascot.classList.add("bob"), 850);
      T(() => head.classList.add("in"), 750);
      T(() => mantra.classList.add("in"), 1450);
      T(() => swipe && swipe.classList.add("in"), 1700);
      T(() => typeM(after), 1850);
      function after() {
        wink();
        if (!boxes.length) return;
        T(() => {
          boxes.forEach((b, k) => T(() => b.classList.add("in"), k * 170));
          T(() => { idx = -1; step(); loop = setInterval(step, 1550); }, boxes.length * 170 + 420);
        }, 480);
      }
    }

    function settle() {
      clearAll();
      head.classList.add("in"); wrap.classList.add("in"); mascot.classList.add("bob");
      mantra.classList.add("in"); mt.textContent = quote;
      if (swipe) swipe.classList.add("in");
      boxes.forEach((d) => d.classList.add("in"));
      if (boxes[2]) { boxes[2].classList.add("hot"); look(+boxes[2].dataset.gx, +boxes[2].dataset.gy); }
    }

    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitName);
    fitName();
    setTimeout(fitName, 300);
    if (opts.still) settle(); else play();
    return { replay: play, settle: settle, fit: fitName, el: elColor };
  }

  /* ============================================================
     COUPLE — due mascotte + badge % + 2 colonne (green flag) + verdetto
     dipende anche da window.ZODIAC (coppie/engine.js)
     ============================================================ */
  const LENS_SERIES = {
    amore: "in coppia…", amicizia: "come amici…", lavoro: "come soci…",
    famiglia: "in famiglia…", convivenza: "da conviventi…", ex: "da ex…", capo: "capo & team…",
  };
  const COUPLE_GEO = {
    post: {
      mA: { top: 33, left: 30, w: 19 }, mB: { top: 33, left: 51, w: 19 }, badge: { top: 50 },
      shared: { top: 18.5, w: 48 },
      colsA: [{ top: 32, w: 30, edge: 3 }, { top: 47, w: 29, edge: 2 }, { top: 61.5, w: 30, edge: 3 }],
      colsB: [{ top: 32, w: 30, edge: 3 }, { top: 47, w: 29, edge: 2 }, { top: 61.5, w: 30, edge: 3 }],
    },
    story: {
      mA: { top: 20, left: 25, w: 24 }, mB: { top: 20, left: 51, w: 24 }, badge: { top: 32 },
      shared: { top: 43, w: 66 },
      colsA: [{ top: 54, w: 42, edge: 5 }, { top: 64, w: 42, edge: 5 }, { top: 74, w: 42, edge: 5 }],
      colsB: [{ top: 54, w: 42, edge: 5 }, { top: 64, w: 42, edge: 5 }, { top: 74, w: 42, edge: 5 }],
    },
    cover: {
      mA: { top: 32, left: 22, w: 25 }, mB: { top: 32, left: 50, w: 25 }, badge: { top: 59 },
      shared: null, colsA: [], colsB: [], swipe: true,
    },
  };
  const SCENE_GEO = {
    post:  { front: [{ l: 35, t: 51, w: 9 }, { l: 56, t: 51, w: 9 }],
             kid: [{ l: 28, t: 48, w: 8 }, { l: 33, t: 49, w: 8 }, { l: 59, t: 49, w: 8 }, { l: 64, t: 48, w: 8 }],
             heart: { l: 31, t: 21, w: 38 } },
    story: { front: [{ l: 31, t: 32, w: 11 }, { l: 58, t: 32, w: 11 }],
             kid: [{ l: 26, t: 30, w: 10 }, { l: 32, t: 31, w: 10 }, { l: 58, t: 31, w: 10 }, { l: 64, t: 30, w: 10 }],
             heart: { l: 27, t: 14, w: 46 } },
    cover: { front: [{ l: 29, t: 51, w: 11 }, { l: 57, t: 51, w: 11 }],
             kid: [{ l: 24, t: 48, w: 11 }, { l: 30, t: 49, w: 11 }, { l: 58, t: 49, w: 11 }, { l: 64, t: 48, w: 11 }],
             heart: { l: 25, t: 26, w: 50 } },
  };
  function pacifierSVG() {
    const ink = "#15110d";
    return `<svg viewBox="0 0 40 40"><ellipse cx="20" cy="13" rx="6.5" ry="5" fill="#ffd2de" stroke="${ink}" stroke-width="2.6"/><circle cx="20" cy="24" r="8.5" fill="#fff6e3" stroke="${ink}" stroke-width="2.8"/><circle cx="20" cy="24" r="3.4" fill="#ff9bb0" stroke="${ink}" stroke-width="2"/></svg>`;
  }
  function briefcaseSVG(col) {
    const ink = "#15110d";
    return `<svg viewBox="0 0 100 80"><g stroke="${ink}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"><rect x="36" y="12" width="28" height="16" rx="4" fill="none"/><rect x="8" y="26" width="84" height="48" rx="9" fill="${col}"/><line x1="8" y1="46" x2="92" y2="46"/><rect x="42" y="40" width="16" height="12" rx="2.5" fill="#fff6e3"/></g></svg>`;
  }
  function brokenHeartSVG() {
    const ink = "#15110d", red = "#ec2e36";
    return `<svg viewBox="0 0 100 92"><path d="M50,86 C10,58 5,28 24,16 C37,8 49,17 50,28 C51,17 63,8 76,16 C95,28 90,58 50,86 Z" fill="${red}" stroke="${ink}" stroke-width="4" stroke-linejoin="round"/><path d="M50,24 L43,40 L57,51 L45,66 L52,82" fill="none" stroke="#fff6e3" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }
  function houseSVG(elA, elB) {
    const ink = "#15110d", wall = "rgba(255,246,227,0.2)", red = "#ec2e36";
    return `<svg viewBox="0 0 100 84"><g stroke="${ink}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"><rect x="69" y="11" width="9" height="23" rx="1.5" fill="${elB}"/><rect x="16" y="40" width="68" height="43" fill="${wall}"/><path d="M5,42 L50,5 L95,42 Z" fill="${elA}"/><rect x="25" y="50" width="15" height="15" rx="1.5" fill="${elB}"/><rect x="60" y="50" width="15" height="15" rx="1.5" fill="${elB}"/><line x1="32.5" y1="50" x2="32.5" y2="65"/><line x1="25" y1="57.5" x2="40" y2="57.5"/><line x1="67.5" y1="50" x2="67.5" y2="65"/><line x1="60" y1="57.5" x2="75" y2="57.5"/><rect x="44" y="66" width="12" height="17" rx="1.5" fill="${elA}"/></g><path d="M50,21 c-2.5,-5 -10,-2.5 -10,2.6 c0,3.7 6,7.2 10,10.4 c4,-3.2 10,-6.7 10,-10.4 c0,-5.1 -7.5,-7.6 -10,-2.6 Z" fill="${red}" stroke="${ink}" stroke-width="2"/></svg>`;
  }

  const PLANET_SYM = { sole: "\u2609", luna: "\u263D", mercurio: "\u263F", venere: "\u2640", marte: "\u2642", ascendente: "\u2191" };
  function coupleEmblem(lens, elA, elB) {
    const ink = "#15110d";
    if (lens === "famiglia") return `<svg viewBox="0 0 46 40"><g stroke="${ink}" stroke-width="2.4" stroke-linejoin="round"><circle cx="17" cy="21" r="9.5" fill="${elA}"/><circle cx="29" cy="21" r="9.5" fill="${elB}"/></g><g fill="${ink}"><circle cx="14" cy="20" r="1.5"/><circle cx="20" cy="20" r="1.5"/><circle cx="26" cy="20" r="1.5"/><circle cx="32" cy="20" r="1.5"/></g><path d="M13,25 q4,3 8,0 M25,25 q4,3 8,0" fill="none" stroke="${ink}" stroke-width="1.7" stroke-linecap="round"/></svg>`;
    if (lens === "ex") return `<svg viewBox="0 0 44 40"><g stroke="${ink}" stroke-width="2.4" stroke-linejoin="round"><path d="M21,12 C19,8 7,7 7,16 C7,24 17,29 21,34 Z" fill="${elA}" transform="rotate(-7 14 20) translate(-1,0)"/><path d="M23,12 C25,8 37,7 37,16 C37,24 27,29 23,34 Z" fill="${elB}" transform="rotate(7 30 20) translate(1,0)"/></g></svg>`;
    if (lens === "capo") return `<svg viewBox="0 0 40 40"><g stroke="${ink}" stroke-width="2.4" stroke-linejoin="round"><path d="M14,12 q0,-4 4,-4 h4 q4,0 4,4" fill="none"/><rect x="6" y="13" width="28" height="20" rx="3" fill="${elA}"/><rect x="16" y="19" width="8" height="7" rx="1.4" fill="#fff6e3"/></g><line x1="6" y1="22.5" x2="34" y2="22.5" stroke="${ink}" stroke-width="2"/></svg>`;
    return null;
  }

  function planetIcon(planet, col) {
    const ink = "#15110d", st = `stroke="${ink}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"`;
    if (planet === "sole") { let r = ""; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; r += `<line x1="${(20 + 12.5 * Math.cos(a)).toFixed(1)}" y1="${(20 + 12.5 * Math.sin(a)).toFixed(1)}" x2="${(20 + 17.5 * Math.cos(a)).toFixed(1)}" y2="${(20 + 17.5 * Math.sin(a)).toFixed(1)}" ${st}/>`; } return `<svg viewBox="0 0 40 40">${r}<circle cx="20" cy="20" r="9" fill="${col}" ${st}/></svg>`; }
    if (planet === "luna") return `<svg viewBox="0 0 40 40"><path d="M27,7 a14,14 0 1 0 0,26 a10.5,10.5 0 1 1 0,-26 Z" fill="${col}" ${st}/></svg>`;
    if (planet === "venere") return `<svg viewBox="0 0 40 40"><circle cx="20" cy="15" r="7.5" fill="${col}" ${st}/><line x1="20" y1="22.5" x2="20" y2="34" ${st}/><line x1="14.5" y1="29" x2="25.5" y2="29" ${st}/></svg>`;
    if (planet === "marte") return `<svg viewBox="0 0 40 40"><circle cx="16" cy="24" r="7.5" fill="${col}" ${st}/><line x1="21.5" y1="18.5" x2="31" y2="9" ${st}/><path d="M24,9 H31 V16" fill="none" ${st}/></svg>`;
    if (planet === "mercurio") return `<svg viewBox="0 0 40 40"><path d="M14,7 q6,6 12,0" fill="none" ${st}/><circle cx="20" cy="18" r="6.5" fill="${col}" ${st}/><line x1="20" y1="24.5" x2="20" y2="34" ${st}/><line x1="15" y1="30" x2="25" y2="30" ${st}/></svg>`;
    if (planet === "ascendente") return `<svg viewBox="0 0 40 40"><line x1="20" y1="34" x2="20" y2="12" ${st}/><path d="M11,19 L20,8 L29,19 Z" fill="${col}" ${st}/></svg>`;
    return "";
  }

  /* pianeti come personaggi: faccina + simbolo identificativo */
  function planetFace(planet, col) {
    const ink = "#15110d", cheek = "#ff9bb0";
    const sw = 'stroke="' + ink + '" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"';
    const face = (cx, cy, s) => `<g><ellipse cx="${cx - 8 * s}" cy="${cy - 2 * s}" rx="${3 * s}" ry="${3.6 * s}" fill="${ink}"/><ellipse cx="${cx + 8 * s}" cy="${cy - 2 * s}" rx="${3 * s}" ry="${3.6 * s}" fill="${ink}"/><path d="M${cx - 7.5 * s},${cy + 4 * s} Q${cx},${cy + 12 * s} ${cx + 7.5 * s},${cy + 4 * s}" fill="none" stroke="${ink}" stroke-width="${2.8 * s}" stroke-linecap="round"/><circle cx="${cx - 13 * s}" cy="${cy + 4.5 * s}" r="${2.7 * s}" fill="${cheek}"/><circle cx="${cx + 13 * s}" cy="${cy + 4.5 * s}" r="${2.7 * s}" fill="${cheek}"/></g>`;
    if (planet === "sole") {
      let r = ""; for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; r += `<line x1="${(50 + 37 * Math.cos(a)).toFixed(1)}" y1="${(50 + 37 * Math.sin(a)).toFixed(1)}" x2="${(50 + 49 * Math.cos(a)).toFixed(1)}" y2="${(50 + 49 * Math.sin(a)).toFixed(1)}"/>`; }
      return `<svg viewBox="0 0 100 100"><g ${sw}>${r}</g><circle cx="50" cy="50" r="35" fill="${col}" ${sw}/>${face(50, 50, 1.35)}</svg>`;
    }
    if (planet === "luna") return `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="${col}" ${sw}/><g fill="rgba(21,17,13,.12)"><circle cx="31" cy="33" r="6.5"/><circle cx="71" cy="42" r="4.5"/><circle cx="62" cy="70" r="5.5"/></g>${face(50, 52, 1.3)}</svg>`;
    if (planet === "mercurio") return `<svg viewBox="0 0 100 100"><g ${sw} fill="none"><path d="M37,16 q13,-13 26,0"/><line x1="50" y1="71" x2="50" y2="91"/><line x1="40" y1="82" x2="60" y2="82"/></g><circle cx="50" cy="47" r="24" fill="${col}" ${sw}/>${face(50, 47, 0.95)}</svg>`;
    if (planet === "venere") return `<svg viewBox="0 0 100 100"><g ${sw} fill="none"><line x1="50" y1="65" x2="50" y2="91"/><line x1="39" y1="80" x2="61" y2="80"/></g><circle cx="50" cy="41" r="27" fill="${col}" ${sw}/>${face(50, 41, 1.05)}</svg>`;
    if (planet === "marte") return `<svg viewBox="0 0 100 100"><g ${sw} fill="none"><line x1="64" y1="50" x2="85" y2="29"/><path d="M69,25 H88 V44"/></g><circle cx="46" cy="58" r="27" fill="${col}" ${sw}/>${face(46, 58, 1.05)}</svg>`;
    if (planet === "ascendente") return `<svg viewBox="0 0 100 100"><g ${sw} fill="none"><line x1="50" y1="42" x2="50" y2="13"/><path d="M37,26 L50,11 L63,26"/></g><circle cx="50" cy="60" r="27" fill="${col}" ${sw}/>${face(50, 60, 1.05)}</svg>`;
    return "";
  }

  function buildCouple(host, opts) {
    const Z = window["ZODIAC_" + LG(opts).toUpperCase()] || window.ZODIAC; if (!Z) return null;
    const sA = byKey(opts.a, opts.lang), sB = byKey(opts.b, opts.lang);
    if (!sA || !sB) return null;
    const lens = opts.lens || "amore";
    const R = Z.computeCouple(opts.a, opts.b, lens);
    const sexual = opts.mode === "sexual";
    const ZSEX = window["ZSEX_" + LG(opts).toUpperCase()] || window.ZSEX_IT || {};
    const pass = (R.dims && R.dims[0]) ? R.dims[0].v : R.score;
    const st = sexual ? (pass >= 4 ? "good" : pass <= 2 ? "bad" : "mid") : R.state;
    const dir = opts.dir || "pop", size = opts.size || "post";
    const adesivi = dir === "adesivi", theme = adesivi ? "adesivi" : "stampa";
    const PAL = adesivi ? EL_ADES : EL;
    const elA = PAL[sA.el], elB = PAL[sB.el];
    const geo = COUPLE_GEO[size] || COUPLE_GEO.post;
    const div = (c) => { const d = document.createElement("div"); d.className = c; return d; };

    host.className = "card couple dir-" + dir + " size-" + size + " skin-" + (sexual ? "sexual" : lens) + " vibe-" + R.score + (opts.still ? " still" : "");
    host.style.setProperty("--elA", elA);
    host.style.setProperty("--elB", elB);
    host.style.setProperty("--el", elA);
    host.innerHTML = "";
    host.append(div("fx bgbase"), div("fx sun"), div("fx motif"), div("fx halftone"), div("fx glow"), decoStars(dir, elA));

    const head = div("head");
    head.innerHTML = `<div class="series">${sexual ? TX(opts).sexSeries : (TX(opts).lens[lens] || "")}</div>
      <div class="signname couplename"><span style="color:${elA}">${sA.n.toUpperCase()}</span> <span class="amp">&amp;</span> <span style="color:${elB}">${sB.n.toUpperCase()}</span></div>`;
    host.appendChild(head);

    const mood = st === "good" ? "love" : st === "bad" ? "sad" : "happy";
    const shift = st === "good" ? 2.5 : st === "bad" ? -2.5 : 0;
    const mwA = div("mw mwA"); mwA.style.cssText = `top:${geo.mA.top}%;left:${geo.mA.left + shift}%;width:${geo.mA.w}%`;
    mwA.innerHTML = window.MASCOT({ k: sA.k, el: sA.el }, elA, theme, 1, mood, "f");
    const mwB = div("mw mwB"); mwB.style.cssText = `top:${geo.mB.top}%;left:${geo.mB.left - shift}%;width:${geo.mB.w}%`;
    mwB.innerHTML = window.MASCOT({ k: sB.k, el: sB.el }, elB, theme, -1, mood, "m");
    host.append(mwA, mwB);

    const badge = div("badge state-" + st); badge.style.top = geo.badge.top + "%";
    const pct = sexual ? Math.round(56 + (pass - 2) * 13) : Math.round(56 + (R.score - 2) * 13);
    badge.innerHTML = `<span class="badge-sym">${sexual ? "\uD83D\uDD25" : R.sym}</span><span class="badge-pct">${pct}%</span>`;
    host.appendChild(badge);
    if (st === "good") {
      const hh = div("hearts"); hh.style.top = (geo.badge.top - 7) + "%";
      hh.innerHTML = "<span>\u2665</span><span>\u2665</span><span>\u2665</span>";
      host.appendChild(hh);
    }
    const SG = SCENE_GEO[size] || SCENE_GEO.post;
    if (!sexual && lens === "famiglia") {
      const baby = function(slot, sign, col, sx){ const k = div("couple-kid baby"); k.style.cssText = `left:${slot.l}%;top:${slot.t}%;width:${slot.w}%`; k.innerHTML = window.MASCOT({ k: sign.k, el: sign.el }, col, theme, sx, "happy", null) + '<span class="kid-paci">' + pacifierSVG() + '</span>'; return k; };
      host.append(baby(SG.kid[0], sB, elB, 1), baby(SG.kid[1], sB, elB, -1), baby(SG.kid[2], sA, elA, 1), baby(SG.kid[3], sA, elA, -1));
    } else if (!sexual && lens === "ex") {
      const hr = div("couple-heart"); hr.style.cssText = `left:${SG.heart.l}%;top:${SG.heart.t}%;width:${SG.heart.w}%`;
      hr.innerHTML = brokenHeartSVG(); host.appendChild(hr);
    } else if (!sexual && lens === "capo") {
      const cA = div("couple-front"); cA.style.cssText = `left:${SG.front[0].l}%;top:${SG.front[0].t}%;width:${SG.front[0].w}%`;
      cA.innerHTML = briefcaseSVG(elA);
      const cB = div("couple-front"); cB.style.cssText = `left:${SG.front[1].l}%;top:${SG.front[1].t}%;width:${SG.front[1].w}%`;
      cB.innerHTML = briefcaseSVG(elB);
      host.append(cA, cB);
    } else if (!sexual && lens !== "convivenza") {
      const emb = coupleEmblem(lens, elA, elB);
      if (emb) { const ee = div("couple-emblem"); ee.innerHTML = emb; host.appendChild(ee); }
    }
    if (sexual) {
      const bbk = div("couple-bed-back"); bbk.innerHTML = `<svg viewBox="0 0 100 46"><g stroke="#15110d" stroke-width="2" stroke-linejoin="round"><rect x="5" y="9" width="40" height="28" rx="10" fill="#fff6e3" transform="rotate(-5 25 23)"/><rect x="55" y="9" width="40" height="28" rx="10" fill="#fff6e3" transform="rotate(5 75 23)"/></g></svg>`;
      const bfr = div("couple-bed-front"); bfr.innerHTML = `<svg viewBox="0 0 100 50" preserveAspectRatio="none"><g stroke="#15110d" stroke-width="2.2" stroke-linejoin="round"><path d="M3,18 Q50,9 97,18 L97,50 L3,50 Z" fill="#ff8fae"/><path d="M3,18 Q50,9 97,18 L97,27 Q50,18 3,27 Z" fill="#ffd2de"/></g></svg>`;
      host.append(bbk, bfr);
    }
    if (lens === "convivenza" && !sexual) {
      const ho = div("couple-house"); ho.innerHTML = houseSVG(elA, elB);
      host.appendChild(ho);
    }

    const boxes = [];
    if (geo.shared) {
      const sh = div("box C shared"); sh.style.top = geo.shared.top + "%"; sh.style.width = geo.shared.w + "%";
      sh.style.setProperty("--rot", "-1deg");
      sh.textContent = Z.cap(R.unisce); host.appendChild(sh); boxes.push(sh);
    }
    function mkCol(list, sign, side, cls) {
      const arr = sexual ? (ZSEX[sign.k] || sign.gf) : sign.gf;
      list.forEach((c, i) => {
        if (!arr[i]) return;
        const b = div("box " + cls + " side" + side);
        b.style.top = c.top + "%"; b.style.width = c.w + "%";
        b.style[side === "A" ? "left" : "right"] = c.edge + "%";
        b.style.setProperty("--rot", ((i % 2 ? 1 : -1) * (1 + (i % 2))) + "deg");
        b.textContent = arr[i];
        b.dataset.side = side; b.dataset.gy = (c.top < geo.mA.top ? -3 : 3);
        host.appendChild(b); boxes.push(b);
      });
    }
    mkCol(geo.colsA, sA, "A", "L");
    mkCol(geo.colsB, sB, "B", "R");

    const mantra = div("mantra");
    const SEXLINE = TX(opts).sexline;
    const quote = sexual ? SEXLINE[Math.min(3, Math.max(0, pass - 2))] : R.verdict;
    mantra.innerHTML = `<span class="tag">${sexual ? TX(opts).chimica : R.sint.toUpperCase()}</span><span class="mt"></span>`;
    host.appendChild(mantra);
    const mt = mantra.querySelector(".mt");

    let swipe = null;
    if (geo.swipe) { swipe = div("swipe"); swipe.innerHTML = `<span>scorri</span> \u2192`; host.appendChild(swipe); }

    function fitName() {
      const sn = head.querySelector(".signname");
      sn.style.fontSize = "";
      const max = host.clientWidth * 0.94;
      let guard = 40;
      while (sn.scrollWidth > max && guard-- > 0) {
        const cur = parseFloat(getComputedStyle(sn).fontSize);
        sn.style.fontSize = (cur - 1) + "px";
      }
    }

    function mkEyes(mEl) {
      const pup = mEl.querySelector(".zpup");
      const ew = mEl.querySelectorAll('circle[fill="#fff"]');
      const pp = mEl.querySelectorAll(".zpup circle");
      const DX = pp[0] && ew[0] ? parseFloat(pp[0].getAttribute("cx")) - parseFloat(ew[0].getAttribute("cx")) : 0;
      return {
        look: (gx, gy) => { if (pup) pup.style.transform = `translate(${gx - DX}px,${gy}px)`; },
        wink: () => { const e = ew[1], p = pp[1];[e, p].forEach((x) => { if (!x) return; x.style.transformBox = "fill-box"; x.style.transformOrigin = "center"; x.style.transition = "transform .14s ease"; x.style.transform = "scaleY(.07)"; }); setTimeout(() => { [e, p].forEach((x) => { if (x) x.style.transform = "scaleY(1)"; }); }, 360); },
      };
    }
    const eyA = mkEyes(mwA), eyB = mkEyes(mwB);

    let timers = [], loop = null, idx = -1;
    const T = (fn, ms) => timers.push(setTimeout(fn, ms));
    function clearAll() { timers.forEach(clearTimeout); timers = []; if (loop) { clearInterval(loop); loop = null; } }
    const colBoxes = boxes.filter((b) => b.dataset.side);
    function step() {
      if (!colBoxes.length) return;
      colBoxes.forEach((d) => d.classList.remove("hot"));
      idx = (idx + 1) % colBoxes.length;
      const d = colBoxes[idx];
      d.classList.add("hot");
      const gy = +d.dataset.gy;
      if (d.dataset.side === "A") { eyA.look(-4, gy); eyB.look(-4, 0); }
      else { eyB.look(4, gy); eyA.look(4, 0); }
    }
    function typeM(done) {
      let i = 0; mt.textContent = ""; mt.classList.add("typing");
      (function tk() { mt.textContent = quote.slice(0, ++i); if (i < quote.length) T(tk, 28); else { mt.classList.remove("typing"); done && done(); } })();
    }
    function baseLook() { eyA.look(4, 0); eyB.look(-4, 0); }
    function reset() {
      clearAll();
      head.classList.remove("in"); mwA.classList.remove("in", "bob"); mwB.classList.remove("in", "bob");
      badge.classList.remove("in"); mantra.classList.remove("in"); mt.textContent = "";
      if (swipe) swipe.classList.remove("in");
      boxes.forEach((d) => d.classList.remove("in", "hot"));
      baseLook();
    }
    function play() {
      reset();
      T(() => { mwA.classList.add("in"); mwB.classList.add("in"); }, 200);
      T(() => { mwA.classList.add("bob"); mwB.classList.add("bob"); }, 850);
      T(() => head.classList.add("in"), 700);
      T(() => badge.classList.add("in"), 1050);
      T(() => { eyA.wink(); eyB.wink(); }, 1250);
      T(() => mantra.classList.add("in"), 1500);
      T(() => swipe && swipe.classList.add("in"), 1700);
      T(() => typeM(after), 1800);
      function after() {
        const seq = boxes.filter((b) => !b.dataset.side).concat(colBoxes);
        seq.forEach((b, k) => T(() => b.classList.add("in"), k * 150));
        if (colBoxes.length) T(() => { idx = -1; step(); loop = setInterval(step, 1500); }, seq.length * 150 + 400);
      }
    }
    function settle() {
      clearAll();
      head.classList.add("in"); mwA.classList.add("in", "bob"); mwB.classList.add("in", "bob");
      badge.classList.add("in"); mantra.classList.add("in"); mt.textContent = quote;
      boxes.forEach((d) => d.classList.add("in"));
      if (colBoxes[0]) { colBoxes[0].classList.add("hot"); eyA.look(-4, +colBoxes[0].dataset.gy); eyB.look(-4, 0); }
      else baseLook();
    }

    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitName);
    fitName();
    setTimeout(fitName, 300);
    if (opts.still) settle(); else play();
    return { replay: play, settle: settle, fit: fitName };
  }

  /* ============================================================
     COMPAT — "X compatibility with…": migliori e peggiori match
     dal motore (computeCouple su tutti gli altri 11 segni).
     ============================================================ */
  const COMPAT_GEO = {
    post: {
      mascot: { top: 28, w: 25 },
      best: [{ cls: "C", top: 16.5, w: 48, gx: 0, gy: -4 }, { cls: "L", top: 30, w: 33, edge: 3, gx: -4, gy: -3 }, { cls: "R", top: 30, w: 33, edge: 3, gx: 4, gy: -3 }],
      worst: [{ cls: "L", top: 57, w: 33, edge: 3, gx: -4, gy: 3 }, { cls: "R", top: 57, w: 33, edge: 3, gx: 4, gy: 3 }, { cls: "C", top: 70, w: 48, gx: 0, gy: 4 }],
    },
    story: {
      mascot: { top: 37, w: 27 },
      best: [{ cls: "C", top: 18, w: 62, gx: 0, gy: -4 }, { cls: "L", top: 29, w: 44, edge: 5, gx: -4, gy: -3 }, { cls: "R", top: 29, w: 44, edge: 5, gx: 4, gy: -3 }],
      worst: [{ cls: "L", top: 62, w: 44, edge: 5, gx: -4, gy: 3 }, { cls: "R", top: 62, w: 44, edge: 5, gx: 4, gy: 3 }, { cls: "C", top: 73, w: 62, gx: 0, gy: 4 }],
    },
    cover: { mascot: { top: 28, w: 42 }, best: [], worst: [], swipe: true },
  };

  function buildCompat(host, opts) {
    const Z = window["ZODIAC_" + LG(opts).toUpperCase()] || window.ZODIAC; if (!Z) return null;
    const s = byKey(opts.key, opts.lang); if (!s) return null;
    const dir = opts.dir || "pop", size = opts.size || "post";
    const adesivi = dir === "adesivi", theme = adesivi ? "adesivi" : "stampa";
    const elColor = (adesivi ? EL_ADES : EL)[s.el];
    const geo = COMPAT_GEO[size] || COMPAT_GEO.post;
    const div = (c) => { const d = document.createElement("div"); d.className = c; return d; };

    const ranked = SIGNS(opts.lang).filter((o) => o.k !== s.k)
      .map((o) => ({ o, sc: Z.computeCouple(s.k, o.k, "amore").score }))
      .sort((a, b) => b.sc - a.sc);
    const best = ranked.slice(0, 3);
    const worst = ranked.slice(-3).reverse();

    host.className = "card compat dir-" + dir + " size-" + size + (opts.still ? " still" : "");
    host.style.setProperty("--el", elColor);
    host.innerHTML = "";
    host.append(div("fx bgbase"), div("fx sun"), div("fx halftone"), div("fx glow"), decoStars(dir, elColor));

    const head = div("head");
    head.innerHTML = `<div class="series">${TX(opts).compatSeries}</div><div class="signname">${s.n.toUpperCase()}</div>`;
    host.appendChild(head);

    const wrap = div("mascotWrap"); wrap.style.top = geo.mascot.top + "%"; wrap.style.width = geo.mascot.w + "%";
    const mascot = div("mascot"); mascot.innerHTML = window.MASCOT({ k: s.k, el: s.el }, elColor, theme, 1, "happy", null);
    wrap.appendChild(mascot); host.appendChild(wrap);

    const boxes = [];
    function mk(slot, m, kind, i) {
      const b = div("box " + slot.cls + " " + kind);
      b.style.top = slot.top + "%"; b.style.width = slot.w + "%";
      if (slot.cls === "L") b.style.left = slot.edge + "%";
      else if (slot.cls === "R") b.style.right = slot.edge + "%";
      b.style.setProperty("--rot", ((i % 2 ? 1 : -1) * (1 + (i % 2))) + "deg");
      b.innerHTML = `<span class="mk">${kind === "good" ? "\u2665" : "\u26A1"}</span><span class="mg">${m.o.g}</span><span class="mn">${m.o.n}</span>`;
      b.dataset.gx = slot.gx; b.dataset.gy = slot.gy;
      host.appendChild(b); boxes.push(b);
    }
    geo.best.forEach((slot, i) => best[i] && mk(slot, best[i], "good", i));
    geo.worst.forEach((slot, i) => worst[i] && mk(slot, worst[i], "bad", i));

    const mantra = div("mantra");
    const quote = best[0] ? TX(opts).soulmate(best[0].o.n, worst[0].o.n) : "";
    mantra.innerHTML = `<span class="tag">${TX(opts).match}</span><span class="mt"></span>`;
    host.appendChild(mantra);
    const mt = mantra.querySelector(".mt");

    let swipe = null;
    if (geo.swipe) { swipe = div("swipe"); swipe.innerHTML = `<span>scorri</span> \u2192`; host.appendChild(swipe); }

    function fitName() {
      const sn = head.querySelector(".signname"); sn.style.fontSize = "";
      const max = host.clientWidth * 0.92; let g = 40;
      while (sn.scrollWidth > max && g-- > 0) { const c = parseFloat(getComputedStyle(sn).fontSize); sn.style.fontSize = (c - 1) + "px"; }
    }

    const pup = mascot.querySelector(".zpup");
    const ew = mascot.querySelectorAll('circle[fill="#fff"]');
    const pp = mascot.querySelectorAll(".zpup circle");
    const DX = pp[0] && ew[0] ? parseFloat(pp[0].getAttribute("cx")) - parseFloat(ew[0].getAttribute("cx")) : 0;
    const look = (gx, gy) => { if (pup) pup.style.transform = `translate(${gx - DX}px,${gy}px)`; };

    let timers = [], loop = null, idx = -1;
    const T = (fn, ms) => timers.push(setTimeout(fn, ms));
    function clearAll() { timers.forEach(clearTimeout); timers = []; if (loop) { clearInterval(loop); loop = null; } }
    function step() {
      if (!boxes.length) return;
      boxes.forEach((d) => d.classList.remove("hot"));
      idx = (idx + 1) % boxes.length; const d = boxes[idx];
      d.classList.add("hot"); look(+d.dataset.gx, +d.dataset.gy);
    }
    function typeM(done) { let i = 0; mt.textContent = ""; mt.classList.add("typing"); (function tk() { mt.textContent = quote.slice(0, ++i); if (i < quote.length) T(tk, 26); else { mt.classList.remove("typing"); done && done(); } })(); }
    function reset() { clearAll(); head.classList.remove("in"); wrap.classList.remove("in"); mascot.classList.remove("bob"); mantra.classList.remove("in"); mt.textContent = ""; look(0, 0); if (swipe) swipe.classList.remove("in"); boxes.forEach((d) => d.classList.remove("in", "hot")); }
    function play() {
      reset();
      T(() => wrap.classList.add("in"), 200); T(() => mascot.classList.add("bob"), 850);
      T(() => head.classList.add("in"), 750); T(() => mantra.classList.add("in"), 1450);
      T(() => swipe && swipe.classList.add("in"), 1700); T(() => typeM(after), 1800);
      function after() { if (!boxes.length) return; boxes.forEach((b, k) => T(() => b.classList.add("in"), k * 160)); T(() => { idx = -1; step(); loop = setInterval(step, 1450); }, boxes.length * 160 + 400); }
    }
    function settle() { clearAll(); head.classList.add("in"); wrap.classList.add("in"); mascot.classList.add("bob"); mantra.classList.add("in"); mt.textContent = quote; if (swipe) swipe.classList.add("in"); boxes.forEach((d) => d.classList.add("in")); if (boxes[0]) { boxes[0].classList.add("hot"); look(+boxes[0].dataset.gx, +boxes[0].dataset.gy); } }

    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitName);
    fitName(); setTimeout(fitName, 300);
    if (opts.still) settle(); else play();
    return { replay: play, settle: settle, fit: fitName };
  }

  /* ============================================================
     PLANET — "luna/venere in <segno>": anello di 6 frasi 1ª persona
     dati: window.ZPLANETS_IT[planet] = {label,sub,color,signs{...}}
     ============================================================ */
  const PLANET_GEO = {
    post: {
      mascot: { top: 41, w: 22 },
      slots: [
        { cls: "C", top: 28, w: 48, gx: 0, gy: -4 },
        { cls: "R", top: 38, w: 33, edge: 3, gx: 4, gy: -3 },
        { cls: "L", top: 38, w: 33, edge: 3, gx: -4, gy: -3 },
        { cls: "R", top: 62, w: 33, edge: 3, gx: 4, gy: 3 },
        { cls: "L", top: 62, w: 33, edge: 3, gx: -4, gy: 3 },
        { cls: "C", top: 72, w: 48, gx: 0, gy: 4 },
      ],
    },
    story: {
      mascot: { top: 44, w: 26 },
      slots: [
        { cls: "C", top: 25, w: 62, gx: 0, gy: -4 },
        { cls: "R", top: 35, w: 44, edge: 5, gx: 4, gy: -3 },
        { cls: "L", top: 35, w: 44, edge: 5, gx: -4, gy: -3 },
        { cls: "R", top: 64, w: 44, edge: 5, gx: 4, gy: 3 },
        { cls: "L", top: 64, w: 44, edge: 5, gx: -4, gy: 3 },
        { cls: "C", top: 75, w: 62, gx: 0, gy: 4 },
      ],
    },
    cover: { mascot: { top: 28, w: 42 }, slots: [], swipe: true },
  };

  function buildPlanet(host, opts) {
    const s = byKey(opts.key, opts.lang); if (!s) return null;
    const P = (window["ZPLANETS_" + LG(opts).toUpperCase()] || window.ZPLANETS_IT || {})[opts.planet]; if (!P) return null;
    const data = P.signs[s.k] || { box: [], q: s.q };
    const dir = opts.dir || "pop", size = opts.size || "post";
    const adesivi = dir === "adesivi", theme = adesivi ? "adesivi" : "stampa";
    const elColor = (adesivi ? EL_ADES : EL)[s.el];
    const geo = PLANET_GEO[size] || PLANET_GEO.post;
    const div = (c) => { const d = document.createElement("div"); d.className = c; return d; };

    host.className = "card planet dir-" + dir + " size-" + size + (opts.still ? " still" : "");
    host.style.setProperty("--el", elColor);
    host.style.setProperty("--pl", P.color);
    host.innerHTML = "";
    host.append(div("fx bgbase"), div("fx sun"), div("fx halftone"), div("fx glow"), decoStars(dir, elColor));

    const head = div("head");
    head.innerHTML = `<div class="series">${P.label}</div><div class="signname">${s.n.toUpperCase()}</div><div class="psub">${P.sub}</div>`;
    host.appendChild(head);
    { const pic = planetFace(opts.planet, P.color); if (pic) { const PE_SIDE = { sole: "left", luna: "right", mercurio: "left", venere: "right", marte: "left", ascendente: "right" }; const pe = div("planet-emblem pe-" + (PE_SIDE[opts.planet] || "left")); pe.innerHTML = pic; host.appendChild(pe); } }

    const wrap = div("mascotWrap"); wrap.style.top = geo.mascot.top + "%"; wrap.style.width = geo.mascot.w + "%";
    const mascot = div("mascot"); mascot.innerHTML = window.MASCOT({ k: s.k, el: s.el }, elColor, theme, 1, "happy", null);
    wrap.appendChild(mascot); host.appendChild(wrap);

    const phrases = geo.slots.length ? (data.box || []).slice(0, geo.slots.length) : [];
    const boxes = [];
    geo.slots.forEach((slot, i) => {
      if (!phrases[i]) return;
      const b = div("box " + slot.cls + (i % 2 ? " alt" : ""));
      b.style.top = slot.top + "%"; b.style.width = slot.w + "%";
      if (slot.cls === "L") b.style.left = slot.edge + "%"; else if (slot.cls === "R") b.style.right = slot.edge + "%";
      b.style.setProperty("--rot", ((i % 2 ? 1 : -1) * (1 + (i % 2))) + "deg");
      b.textContent = phrases[i];
      b.dataset.gx = slot.gx; b.dataset.gy = slot.gy;
      host.appendChild(b); boxes.push(b);
    });

    const mantra = div("mantra");
    const quote = data.q || s.q;
    mantra.innerHTML = `<span class="tag">${TX(opts).mantra}</span><span class="mt"></span>`;
    host.appendChild(mantra);
    const mt = mantra.querySelector(".mt");

    let swipe = null;
    if (geo.swipe) { swipe = div("swipe"); swipe.innerHTML = `<span>scorri</span> \u2192`; host.appendChild(swipe); }

    function fitName() { const sn = head.querySelector(".signname"); sn.style.fontSize = ""; const max = host.clientWidth * 0.92; let g = 40; while (sn.scrollWidth > max && g-- > 0) { const c = parseFloat(getComputedStyle(sn).fontSize); sn.style.fontSize = (c - 1) + "px"; } }

    const pup = mascot.querySelector(".zpup");
    const ew = mascot.querySelectorAll('circle[fill="#fff"]');
    const pp = mascot.querySelectorAll(".zpup circle");
    const DX = pp[0] && ew[0] ? parseFloat(pp[0].getAttribute("cx")) - parseFloat(ew[0].getAttribute("cx")) : 0;
    const look = (gx, gy) => { if (pup) pup.style.transform = `translate(${gx - DX}px,${gy}px)`; };

    let timers = [], loop = null, idx = -1;
    const T = (fn, ms) => timers.push(setTimeout(fn, ms));
    function clearAll() { timers.forEach(clearTimeout); timers = []; if (loop) { clearInterval(loop); loop = null; } }
    function step() { if (!boxes.length) return; boxes.forEach((d) => d.classList.remove("hot")); idx = (idx + 1) % boxes.length; const d = boxes[idx]; d.classList.add("hot"); look(+d.dataset.gx, +d.dataset.gy); }
    function typeM(done) { let i = 0; mt.textContent = ""; mt.classList.add("typing"); (function tk() { mt.textContent = quote.slice(0, ++i); if (i < quote.length) T(tk, 30); else { mt.classList.remove("typing"); done && done(); } })(); }
    function reset() { clearAll(); head.classList.remove("in"); wrap.classList.remove("in"); mascot.classList.remove("bob"); mantra.classList.remove("in"); mt.textContent = ""; look(0, 0); if (swipe) swipe.classList.remove("in"); boxes.forEach((d) => d.classList.remove("in", "hot")); }
    function play() { reset(); T(() => wrap.classList.add("in"), 200); T(() => mascot.classList.add("bob"), 850); T(() => head.classList.add("in"), 750); T(() => mantra.classList.add("in"), 1450); T(() => swipe && swipe.classList.add("in"), 1700); T(() => typeM(after), 1800); function after() { if (!boxes.length) return; boxes.forEach((b, k) => T(() => b.classList.add("in"), k * 160)); T(() => { idx = -1; step(); loop = setInterval(step, 1500); }, boxes.length * 160 + 400); } }
    function settle() { clearAll(); head.classList.add("in"); wrap.classList.add("in"); mascot.classList.add("bob"); mantra.classList.add("in"); mt.textContent = quote; if (swipe) swipe.classList.add("in"); boxes.forEach((d) => d.classList.add("in")); if (boxes[1]) { boxes[1].classList.add("hot"); look(+boxes[1].dataset.gx, +boxes[1].dataset.gy); } }

    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitName);
    fitName(); setTimeout(fitName, 300);
    if (opts.still) settle(); else play();
    return { replay: play, settle: settle, fit: fitName };
  }

  /* ============================================================
     SERIE — card a fondo "dark editoriale" (checklist · fumetto · scatter)
     Riusa mascotte + animazione. Contenuti: o riuso campi del segno
     (sap/gf/deal/q/adv — già in 6 lingue), o un dataset custom (es. ZPLEASEDONT).
     Variante GUY/GIRL via 6° parametro di MASCOT ('m'/'f').
     ============================================================ */
  const SERIES = {
    pleasedont:   { arche: "checklist", title: { it: "per favore non\u2026", en: "please don't\u2026", de: "bitte nicht\u2026", fr: "s'il te pla\u00eet, ne\u2026", es: "por favor no\u2026", pt: "por favor n\u00e3o\u2026" }, mood: "neutral", custom: "PLEASEDONT" },
    dealbreakers: { arche: "checklist", title: { it: "cosa rompe la relazione\u2026", en: "relationship dealbreakers\u2026", de: "Beziehungs-Dealbreaker\u2026", fr: "ce qui brise le couple\u2026", es: "lo que rompe la relaci\u00f3n\u2026", pt: "o que quebra a rela\u00e7\u00e3o\u2026" }, mood: "angry", items: (s) => s.deal },
    whoami:       { arche: "checklist", title: { it: "sono fatto cos\u00ec\u2026", en: "this is me\u2026", de: "so bin ich\u2026", fr: "voil\u00e0 qui je suis\u2026", es: "as\u00ed soy yo\u2026", pt: "eu sou assim\u2026" }, items: (s) => s.sap.concat(s.gf) },
    frase:        { arche: "bubble", title: { it: "in una frase\u2026", en: "in one line\u2026", de: "in einem Satz\u2026", fr: "en une phrase\u2026", es: "en una frase\u2026", pt: "em uma frase\u2026" }, quote: (s) => s.q },
    consiglio:    { arche: "bubble", title: { it: "il mio consiglio\u2026", en: "my advice\u2026", de: "mein Rat\u2026", fr: "mon conseil\u2026", es: "mi consejo\u2026", pt: "meu conselho\u2026" }, quote: (s) => s.adv },
    say:          { arche: "scatter", title: { it: "cose che dico\u2026", en: "things i say\u2026", de: "was ich sage\u2026", fr: "ce que je dis\u2026", es: "cosas que digo\u2026", pt: "coisas que digo\u2026" }, items: (s) => s.sap.concat(s.gf) },
    annoy:        { arche: "scatter", title: { it: "cose che mi annoiano\u2026", en: "things that bore me\u2026", de: "was mich langweilt\u2026", fr: "ce qui m'ennuie\u2026", es: "lo que me aburre\u2026", pt: "o que me entedia\u2026" }, mood: "annoyed", items: (s) => s.deal },
    seduce:       { arche: "scatter", title: { it: "come conquistarmi\u2026", en: "how to win me\u2026", de: "wie du mich gewinnst\u2026", fr: "comment me s\u00e9duire\u2026", es: "c\u00f3mo conquistarme\u2026", pt: "como me conquistar\u2026" }, mood: "love", items: (s) => s.con },
    lui:          { arche: "prose", gender: "m", theme: "lui", badge: { it: "LUI", en: "HIM", de: "ER", fr: "LUI", es: "\u00c9L", pt: "ELE" }, custom: "LUI" },
    lei:          { arche: "prose", gender: "f", theme: "lei", badge: { it: "LEI", en: "HER", de: "SIE", fr: "ELLE", es: "ELLA", pt: "ELA" }, custom: "LEI" },
  };
  const SERIE_GEO = {
    checklist: {
      post:  { mascot: { top: 31, left: 2, w: 39 }, list: { top: 25, bottom: 7, left: 43, right: 5 } },
      story: { mascot: { top: 21, center: true, w: 42 }, list: { top: 45, bottom: 6, left: 9, right: 9 } },
      cover: { mascot: { top: 26, left: 2, w: 41 }, list: { top: 23, bottom: 9, left: 45, right: 5 } },
    },
    bubble: {
      post:  { mascot: { top: 24, left: 50, w: 44 }, quote: { top: 24, left: 3, right: 46, tail: "right" } },
      story: { mascot: { top: 46, center: true, w: 48 }, quote: { bottom: 51, left: 8, right: 8, tail: "down" } },
      cover: { mascot: { top: 46, center: true, w: 44 }, quote: { bottom: 52, left: 6, right: 6, tail: "down" } },
    },
    prose: {
      post:  { badge: { top: 7, left: 6 }, mascot: { top: 34, left: 4, w: 33 }, prose: { top: 30, left: 42, right: 6 } },
      story: { badge: { top: 6, left: 7 }, mascot: { top: 12, center: true, w: 34 }, prose: { top: 48, left: 8, right: 8 } },
      cover: { badge: { top: 6, left: 6 }, mascot: { top: 18, center: true, w: 38 }, prose: { top: 52, left: 7, right: 7 } },
    },
    scatter: {
      post:  { mascot: { top: 42, center: true, w: 36 }, slots: [
        { cls: "L", top: 31, w: 30, left: 3, gx: -4, gy: -3 },
        { cls: "R", top: 31, w: 30, right: 3, gx: 4, gy: -3 },
        { cls: "L", top: 47, w: 30, left: 3, gx: -4, gy: 0 },
        { cls: "R", top: 47, w: 30, right: 3, gx: 4, gy: 0 },
        { cls: "C", top: 82, w: 56, gx: 0, gy: 4 },
        { cls: "R", top: 63, w: 30, right: 3, gx: 4, gy: 3 },
        { cls: "L", top: 63, w: 30, left: 3, gx: -4, gy: 3 },
        { cls: "C", top: 25, w: 50, gx: 0, gy: -4 },
      ] },
      story: { mascot: { top: 47, center: true, w: 44 }, slots: [
        { cls: "L", top: 31, w: 40, left: 4, gx: -4, gy: -3 },
        { cls: "R", top: 31, w: 40, right: 4, gx: 4, gy: -3 },
        { cls: "L", top: 42, w: 40, left: 4, gx: -4, gy: 0 },
        { cls: "R", top: 42, w: 40, right: 4, gx: 4, gy: 0 },
        { cls: "C", top: 85, w: 64, gx: 0, gy: 4 },
        { cls: "R", top: 74, w: 44, right: 4, gx: 4, gy: 3 },
        { cls: "L", top: 74, w: 44, left: 4, gx: -4, gy: 3 },
        { cls: "C", top: 23, w: 60, gx: 0, gy: -4 },
      ] },
      cover: { mascot: { top: 45, center: true, w: 36 }, slots: [
        { cls: "L", top: 31, w: 32, left: 4, gx: -4, gy: -3 },
        { cls: "R", top: 31, w: 32, right: 4, gx: 4, gy: -3 },
        { cls: "L", top: 47, w: 32, left: 4, gx: -4, gy: 0 },
        { cls: "R", top: 47, w: 32, right: 4, gx: 4, gy: 0 },
        { cls: "C", top: 80, w: 60, gx: 0, gy: 4 },
        { cls: "R", top: 63, w: 32, right: 4, gx: 4, gy: 3 },
        { cls: "L", top: 63, w: 32, left: 4, gx: -4, gy: 3 },
      ] },
    },
  };
  const GENDERCOL = { lui: "#3a8fd6", lei: "#ec5aa0" };
  function burstSVG(col) {
    const N = 12, ro = 50, ri = 33, pts = [];
    for (let i = 0; i < N * 2; i++) { const r = i % 2 ? ri : ro; const a = Math.PI / N * i - Math.PI / 2; pts.push((50 + r * Math.cos(a)).toFixed(1) + "," + (50 + r * Math.sin(a)).toFixed(1)); }
    return '<svg viewBox="0 0 100 100"><polygon points="' + pts.join(" ") + '" fill="' + col + '" stroke="#15110d" stroke-width="2.6" stroke-linejoin="round"/></svg>';
  }

  function buildSeries(host, opts) {
    const s = byKey(opts.key, opts.lang); if (!s) return null;
    const def = SERIES[opts.serie] || SERIES.pleasedont;
    const arche = def.arche;
    const size = opts.size || "post";
    const lang = LG(opts);
    const geo = (SERIE_GEO[arche] || SERIE_GEO.checklist)[size] || SERIE_GEO[arche].post;
    const el = s.el;
    const elColor = EL[el];
    const isProse = arche === "prose";
    const gender = def.gender || (opts.gender === "m" ? "m" : "f");
    const div = (c) => { const d = document.createElement("div"); d.className = c; return d; };

    const bgC = arche === "scatter" ? (" serie-bg-" + opts.serie) : "";
    host.className = (isProse ? "card serie-prose theme-" + (def.theme || "lui") : "card serie serie-" + arche + bgC) + " size-" + size + (opts.still ? " still" : "");
    host.style.setProperty("--el", elColor);
    host.innerHTML = "";
    if (isProse) host.append(div("fx bgbase"), div("fx sun"), div("fx halftone"));
    else host.append(div("fx bgbase"), div("fx watermark"), div("fx glow"));

    /* testata (checklist/bubble) o badge LUI/LEI (prose) */
    let head = null, badge = null;
    if (!isProse) {
      head = div("head");
      const title = (def.title && (def.title[lang] || def.title.it)) || "";
      head.innerHTML = `<div class="series">${title}</div><div class="signname">${s.n.toUpperCase()}</div>`;
      host.appendChild(head);
    } else {
      badge = div("serie-badge");
      badge.innerHTML = `<span class="bsym">${gender === "m" ? "\u2642" : "\u2640"}</span><span>${(def.badge && (def.badge[lang] || def.badge.it)) || ""}</span>`;
      badge.style.top = geo.badge.top + "%"; badge.style.left = geo.badge.left + "%";
      host.appendChild(badge);
    }
    const topEl = head || badge;

    /* mascotte (+ starburst di genere per prose); LEI specchiata a destra */
    const mirror = isProse && !geo.mascot.center && def.theme === "lei";
    const mLeft = mirror ? (100 - geo.mascot.left - geo.mascot.w) : geo.mascot.left;
    const mw = div("serie-mascot" + (geo.mascot.center ? " cen" : ""));
    mw.style.top = geo.mascot.top + "%"; mw.style.width = geo.mascot.w + "%";
    mw.style.left = geo.mascot.center ? "50%" : (mLeft + "%");
    if (isProse) {
      const burst = div("serie-burst"); burst.innerHTML = burstSVG("#fff6e3"); mw.appendChild(burst);
      const cx = geo.mascot.center ? 50 : (mLeft + geo.mascot.w / 2);
      host.style.setProperty("--sx", cx + "%"); host.style.setProperty("--sy", (geo.mascot.top + 17) + "%");
    }
    const mascot = div("mascot");
    mascot.innerHTML = window.MASCOT({ k: s.k, el: el }, elColor, "stampa", 1, (def.mood || "happy"), gender);
    mw.appendChild(mascot); host.appendChild(mw);

    /* contenuto per archetipo */
    const rows = []; const scats = []; let quoteEl = null, qmt = null, quote = "", proseEl = null;
    if (arche === "checklist") {
      let items;
      if (def.custom) { const data = window["Z" + def.custom + "_" + lang.toUpperCase()] || window["Z" + def.custom + "_IT"] || {}; items = (data[s.k] || []).slice(0, 7); }
      else items = (def.items(s) || []).slice(0, 7);
      const list = div("serie-list"); const g = geo.list;
      list.style.top = g.top + "%"; list.style.left = g.left + "%"; list.style.right = g.right + "%";
      if (g.bottom != null) list.style.bottom = g.bottom + "%";
      items.forEach((t) => {
        const r = div("serie-row");
        r.innerHTML = `<span class="serie-check">\u2713</span><span class="serie-txt">${t}</span>`;
        list.appendChild(r); rows.push(r);
      });
      host.appendChild(list);
    } else if (arche === "bubble") {
      quote = (def.quote ? def.quote(s) : "") || s.q || "";
      const g = geo.quote;
      quoteEl = div("serie-quote tail-" + (g.tail || "down"));
      if (g.bottom != null) quoteEl.style.bottom = g.bottom + "%"; else quoteEl.style.top = g.top + "%";
      quoteEl.style.left = g.left + "%"; quoteEl.style.right = g.right + "%";
      quoteEl.innerHTML = `<span class="qmt"></span>`;
      host.appendChild(quoteEl);
      qmt = quoteEl.querySelector(".qmt");
    } else if (arche === "scatter") {
      let items;
      if (def.custom) { const data = window["Z" + def.custom + "_" + lang.toUpperCase()] || window["Z" + def.custom + "_IT"] || {}; items = (data[s.k] || []); }
      else items = (def.items(s) || []);
      const slots = geo.slots || [];
      items = items.slice(0, slots.length);
      slots.forEach((slot, i) => {
        if (!items[i]) return;
        const b = div("scat " + slot.cls);
        b.style.top = slot.top + "%"; b.style.width = slot.w + "%";
        if (slot.left != null) b.style.left = slot.left + "%";
        if (slot.right != null) b.style.right = slot.right + "%";
        b.style.setProperty("--rot", ((i % 2 ? 1 : -1) * (1 + (i % 2))) + "deg");
        b.textContent = items[i];
        b.dataset.gx = slot.gx; b.dataset.gy = slot.gy;
        host.appendChild(b); scats.push(b);
      });
    } else {
      const data = window["Z" + def.custom + "_" + lang.toUpperCase()] || window["Z" + def.custom + "_IT"] || {};
      const g = geo.prose;
      const pL = mirror ? g.right : g.left, pR = mirror ? g.left : g.right;
      proseEl = div("serie-prose-txt"); proseEl.textContent = data[s.k] || "";
      proseEl.style.top = g.top + "%"; proseEl.style.left = pL + "%"; proseEl.style.right = pR + "%";
      if (g.bottom != null) proseEl.style.bottom = g.bottom + "%";
      host.appendChild(proseEl);
    }

    function fitName() {
      if (!head) return;
      const sn = head.querySelector(".signname"); sn.style.fontSize = "";
      const max = host.clientWidth * 0.92; let g = 40;
      while (sn.scrollWidth > max && g-- > 0) { const c = parseFloat(getComputedStyle(sn).fontSize); sn.style.fontSize = (c - 1) + "px"; }
    }

    /* occhi + wink */
    const ew = mascot.querySelectorAll('circle[fill="#fff"]');
    const pp = mascot.querySelectorAll(".zpup circle");
    function wink() { const e = ew[1], p = pp[1];[e, p].forEach((x) => { if (!x) return; x.style.transformBox = "fill-box"; x.style.transformOrigin = "center"; x.style.transition = "transform .14s ease"; x.style.transform = "scaleY(.07)"; }); setTimeout(() => { [e, p].forEach((x) => { if (x) x.style.transform = "scaleY(1)"; }); }, 360); }
    const pup = mascot.querySelector(".zpup");
    const DX = (pp[0] && ew[0]) ? parseFloat(pp[0].getAttribute("cx")) - parseFloat(ew[0].getAttribute("cx")) : 0;
    function lookText() { if (!isProse || !pup) return; let gx = 0, gy = 0; if (geo.mascot.center) gy = 3; else gx = (def.theme === "lei") ? -4 : 4; pup.style.transform = `translate(${gx - DX}px,${gy}px)`; }
    function look(gx, gy) { if (pup) pup.style.transform = `translate(${gx - DX}px,${gy}px)`; }
    let sidx = -1;
    function stepScat() { if (!scats.length) return; scats.forEach((d) => d.classList.remove("hot")); sidx = (sidx + 1) % scats.length; const d = scats[sidx]; d.classList.add("hot"); look(+d.dataset.gx, +d.dataset.gy); }

    let timers = [], loop = null;
    const T = (fn, ms) => timers.push(setTimeout(fn, ms));
    function clearAll() { timers.forEach(clearTimeout); timers = []; if (loop) { clearInterval(loop); loop = null; } }
    function typeQ(done) { if (!qmt) return; let i = 0; qmt.textContent = ""; qmt.classList.add("typing"); (function tk() { qmt.textContent = quote.slice(0, ++i); if (i < quote.length) T(tk, 26); else { qmt.classList.remove("typing"); done && done(); } })(); }
    function reset() {
      clearAll();
      topEl.classList.remove("in"); mw.classList.remove("in"); mascot.classList.remove("bob");
      rows.forEach((r) => r.classList.remove("in"));
      scats.forEach((d) => d.classList.remove("in", "hot"));
      if (quoteEl) { quoteEl.classList.remove("in"); qmt.textContent = ""; }
      if (proseEl) proseEl.classList.remove("in");
      if (pup) pup.style.transform = "";
    }
    function play() {
      reset();
      T(() => mw.classList.add("in"), 180);
      T(() => mascot.classList.add("bob"), 820);
      T(() => topEl.classList.add("in"), 640);
      if (!def.mood || def.mood === "happy") T(() => wink(), 1180);
      if (arche === "checklist") rows.forEach((r, k) => T(() => r.classList.add("in"), 900 + k * 170));
      else if (arche === "bubble") T(() => { quoteEl.classList.add("in"); typeQ(); }, 950);
      else if (arche === "scatter") { scats.forEach((b, k) => T(() => b.classList.add("in"), 900 + k * 150)); T(() => { sidx = -1; stepScat(); loop = setInterval(stepScat, 1500); }, 900 + scats.length * 150 + 450); }
      else { T(() => proseEl.classList.add("in"), 900); T(() => lookText(), 1000); }
    }
    function settle() {
      clearAll();
      topEl.classList.add("in"); mw.classList.add("in"); mascot.classList.add("bob");
      rows.forEach((r) => r.classList.add("in"));
      scats.forEach((d) => d.classList.add("in"));
      if (scats.length) { scats[0].classList.add("hot"); look(+scats[0].dataset.gx, +scats[0].dataset.gy); }
      if (quoteEl) { quoteEl.classList.add("in"); qmt.textContent = quote; }
      if (proseEl) { proseEl.classList.add("in"); lookText(); }
    }

    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitName);
    fitName(); setTimeout(fitName, 300);
    if (opts.still) settle(); else play();
    return { replay: play, settle: settle, fit: fitName, el: elColor };
  }

  window.CARDKIT = { build: buildCard, buildCouple: buildCouple, buildCompat: buildCompat, buildPlanet: buildPlanet, buildSeries: buildSeries, planetIcon: planetIcon, planetFace: planetFace, SERIES: SERIES, FORMATS, EL, EL_ADES, signs: SIGNS };
})();
