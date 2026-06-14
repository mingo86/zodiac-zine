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

  const SIGNS = () => window.ZSIGNS_IT || [];
  const byKey = (k) => SIGNS().find((s) => s.k === k);

  /* ---- FORMAT: quali campi diventano i box + il mantra ---- */
  const FORMATS = {
    facts: {
      series: "cosa mi rende un…",
      boxes: (s) => s.sap.concat(s.gf),
      mantra: (s) => s.q,
    },
    date: {
      series: "come conquistare un…",
      boxes: (s) => s.con.concat(s.deal.slice(0, 3)),
      mantra: (s) => s.q,
    },
    flags: {
      series: "le mie bandiere…",
      boxes: (s) => s.gf.concat(s.rf, s.sap.slice(0, 2)),
      mantra: (s) => s.q,
    },
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
    const s = byKey(opts.key);
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
    head.innerHTML = `<div class="series">${fmt.series}</div><div class="signname">${s.n.toUpperCase()}</div>`;
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
      const rot = size === "story" ? 0 : (i % 2 ? 1 : -1) * (1 + (i % 2));
      b.style.setProperty("--rot", rot + "deg");
      b.textContent = phrases[i];
      b.dataset.gx = slot.gx; b.dataset.gy = slot.gy;
      host.appendChild(b);
      boxes.push(b);
    });

    /* --- mantra --- */
    const mantra = document.createElement("div"); mantra.className = "mantra";
    const quote = fmt.mantra(s);
    mantra.innerHTML = `<span class="tag">MANTRA</span><span class="mt"></span>`;
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
    amore: "in relationships…", amicizia: "come amici…", lavoro: "come soci…",
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
      mA: { top: 15, left: 25, w: 24 }, mB: { top: 15, left: 51, w: 24 }, badge: { top: 32 },
      shared: { top: 43, w: 66 },
      colsA: [{ top: 54, w: 42, edge: 5 }, { top: 64, w: 42, edge: 5 }, { top: 74, w: 42, edge: 5 }],
      colsB: [{ top: 54, w: 42, edge: 5 }, { top: 64, w: 42, edge: 5 }, { top: 74, w: 42, edge: 5 }],
    },
    cover: {
      mA: { top: 32, left: 22, w: 25 }, mB: { top: 32, left: 50, w: 25 }, badge: { top: 59 },
      shared: null, colsA: [], colsB: [], swipe: true,
    },
  };

  function buildCouple(host, opts) {
    const Z = window.ZODIAC; if (!Z) return null;
    const sA = byKey(opts.a), sB = byKey(opts.b);
    if (!sA || !sB) return null;
    const lens = opts.lens || "amore";
    const R = Z.computeCouple(opts.a, opts.b, lens);
    const sexual = opts.mode === "sexual";
    const ZSEX = window.ZSEX_IT || {};
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
    head.innerHTML = `<div class="series">${sexual ? "chimica a letto…" : (LENS_SERIES[lens] || "in coppia…")}</div>
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

    const boxes = [];
    if (geo.shared) {
      const sh = div("box C shared"); sh.style.top = geo.shared.top + "%"; sh.style.width = geo.shared.w + "%";
      sh.textContent = Z.cap(R.unisce); host.appendChild(sh); boxes.push(sh);
    }
    function mkCol(list, sign, side, cls) {
      const arr = sexual ? (ZSEX[sign.k] || sign.gf) : sign.gf;
      list.forEach((c, i) => {
        if (!arr[i]) return;
        const b = div("box " + cls + " side" + side);
        b.style.top = c.top + "%"; b.style.width = c.w + "%";
        b.style[side === "A" ? "left" : "right"] = c.edge + "%";
        b.textContent = arr[i];
        b.dataset.side = side; b.dataset.gy = (c.top < geo.mA.top ? -3 : 3);
        host.appendChild(b); boxes.push(b);
      });
    }
    mkCol(geo.colsA, sA, "A", "L");
    mkCol(geo.colsB, sB, "B", "R");

    const mantra = div("mantra");
    const SEXLINE = ["Chimica da costruire.", "Si scalda piano.", "Bella scintilla.", "Fuoco vero."];
    const quote = sexual ? SEXLINE[Math.min(3, Math.max(0, pass - 2))] : R.verdict;
    mantra.innerHTML = `<span class="tag">${sexual ? "CHIMICA" : R.sint.toUpperCase()}</span><span class="mt"></span>`;
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
    const Z = window.ZODIAC; if (!Z) return null;
    const s = byKey(opts.key); if (!s) return null;
    const dir = opts.dir || "pop", size = opts.size || "post";
    const adesivi = dir === "adesivi", theme = adesivi ? "adesivi" : "stampa";
    const elColor = (adesivi ? EL_ADES : EL)[s.el];
    const geo = COMPAT_GEO[size] || COMPAT_GEO.post;
    const div = (c) => { const d = document.createElement("div"); d.className = c; return d; };

    const ranked = SIGNS().filter((o) => o.k !== s.k)
      .map((o) => ({ o, sc: Z.computeCouple(s.k, o.k, "amore").score }))
      .sort((a, b) => b.sc - a.sc);
    const best = ranked.slice(0, 3);
    const worst = ranked.slice(-3).reverse();

    host.className = "card compat dir-" + dir + " size-" + size + (opts.still ? " still" : "");
    host.style.setProperty("--el", elColor);
    host.innerHTML = "";
    host.append(div("fx bgbase"), div("fx sun"), div("fx halftone"), div("fx glow"), decoStars(dir, elColor));

    const head = div("head");
    head.innerHTML = `<div class="series">compatibility with…</div><div class="signname">${s.n.toUpperCase()}</div>`;
    host.appendChild(head);

    const wrap = div("mascotWrap"); wrap.style.top = geo.mascot.top + "%"; wrap.style.width = geo.mascot.w + "%";
    const mascot = div("mascot"); mascot.innerHTML = window.MASCOT({ k: s.k, el: s.el }, elColor, theme, 1, "happy", null);
    wrap.appendChild(mascot); host.appendChild(wrap);

    const boxes = [];
    function mk(slot, m, kind) {
      const b = div("box " + slot.cls + " " + kind);
      b.style.top = slot.top + "%"; b.style.width = slot.w + "%";
      if (slot.cls === "L") b.style.left = slot.edge + "%";
      else if (slot.cls === "R") b.style.right = slot.edge + "%";
      b.innerHTML = `<span class="mk">${kind === "good" ? "\u2665" : "\u26A1"}</span><span class="mg">${m.o.g}</span><span class="mn">${m.o.n}</span>`;
      b.dataset.gx = slot.gx; b.dataset.gy = slot.gy;
      host.appendChild(b); boxes.push(b);
    }
    geo.best.forEach((slot, i) => best[i] && mk(slot, best[i], "good"));
    geo.worst.forEach((slot, i) => worst[i] && mk(slot, worst[i], "bad"));

    const mantra = div("mantra");
    const quote = best[0] ? `Anima gemella: ${best[0].o.n}. Tieni d'occhio: ${worst[0].o.n}.` : "";
    mantra.innerHTML = `<span class="tag">MATCH</span><span class="mt"></span>`;
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
    const s = byKey(opts.key); if (!s) return null;
    const P = (window.ZPLANETS_IT || {})[opts.planet]; if (!P) return null;
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
      b.style.setProperty("--rot", 0);
      b.textContent = phrases[i];
      b.dataset.gx = slot.gx; b.dataset.gy = slot.gy;
      host.appendChild(b); boxes.push(b);
    });

    const mantra = div("mantra");
    const quote = data.q || s.q;
    mantra.innerHTML = `<span class="tag">MANTRA</span><span class="mt"></span>`;
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

  window.CARDKIT = { build: buildCard, buildCouple: buildCouple, buildCompat: buildCompat, buildPlanet: buildPlanet, FORMATS, EL, EL_ADES, signs: SIGNS };
})();
