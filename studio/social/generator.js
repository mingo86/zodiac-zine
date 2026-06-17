/* ZODIAC · SOCIAL — GENERATORE (tutti i contenuti)
   Compositore multi-tipo (singolo · coppia · compat · pianeta) → coda → ZIP di cover PNG.
   Controllo di copertura: a "Genera" avvisa cosa manca rispetto all'obiettivo scelto.
   Dipende da: CARDKIT, ZSIGNS_<L>, ZSEX_<L>, ZPLANETS_<L>, ZODIAC_<L>, ZI18N. */
(function () {
  "use strict";
  var LS_KEY = "zodiac_gen_v2";
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

  var SIGNS_IT = window.ZSIGNS_IT || [];
  var SIGNKEYS = SIGNS_IT.map(function (s) { return s.k; });
  var EL = (window.CARDKIT && window.CARDKIT.EL) || { fuoco: "#ec2e36", terra: "#36b06a", aria: "#f5b700", acqua: "#2f9bdb" };
  var ZE = window.ZODIAC_IT || window.ZODIAC || { LENSES: [] };

  var FORMATS = ["facts", "date", "flags"];
  var FMT_LABEL = { facts: "facts", date: "date", flags: "flags" };
  var PLANETS = ["sole", "luna", "mercurio", "venere", "marte", "ascendente"];
  var PLANET_LABEL = { sole: "Sole", luna: "Luna", mercurio: "Mercurio", venere: "Venere", marte: "Marte", ascendente: "Ascendente" };
  /* 7 lenti dal motore + 'sexual' come 8ª (mode:'sexual') */
  var ENGINE_LENSES = (ZE.LENSES || []).map(function (l) { return l.k; });
  var LENSES = ENGINE_LENSES.concat(["sexual"]);
  var LENS_LABEL = {};
  (ZE.LENSES || []).forEach(function (l) { LENS_LABEL[l.k] = l.label; });
  LENS_LABEL.sexual = "Sexual 🔥";

  var TYPE_COL = { singolo: "#f5b700", coppia: "#ec5aa0", compat: "#36b06a", pianeta: "#6b4fb0" };
  var TYPE_LABEL = { singolo: "Singolo", coppia: "Coppia", compat: "Compat", pianeta: "Pianeta" };

  var $ = function (id) { return document.getElementById(id); };
  var els = {
    sign: $("sign"), sa: $("sa"), sb: $("sb"), fmt: $("fmt"), lens: $("lens"), planet: $("planet"),
    dir: $("dir"), bg: $("bg"), prev: $("c-prev"), nprev: $("n-prev"),
    add: $("add"), addbulk: $("addbulk"), clear: $("clear"),
    langs: $("langs"), queue: $("queue"), summary: $("summary"), cov: $("cov"),
    gen: $("gen"), progress: $("progress"), pfill: $("pfill"), ptxt: $("ptxt"),
    tabs: $("tabs"), gencard: $("gencard"),
    modal: $("modal"), mTitle: $("m-title"), mSub: $("m-sub"), mBody: $("m-body"), mGo: $("m-go"), mCancel: $("m-cancel"),
  };

  /* ---------- stato persistito ---------- */
  function load() { try { return JSON.parse(localStorage.getItem(LS_KEY)) || {}; } catch (e) { return {}; } }
  var store = load();
  var queue = store.queue || [];
  var langsOn = store.langs || ["it"];
  var scope = store.scope || { formats: FORMATS.slice(), lenses: LENSES.slice(), planets: PLANETS.slice(), sameSign: false };
  // ripara eventuali campi mancanti
  scope.formats = scope.formats || FORMATS.slice();
  scope.lenses = scope.lenses || LENSES.slice();
  scope.planets = scope.planets || PLANETS.slice();
  function save() { try { localStorage.setItem(LS_KEY, JSON.stringify({ queue: queue, langs: langsOn, scope: scope })); } catch (e) {} }

  var type = "singolo";

  /* ---------- popola i select ---------- */
  var signOpts = SIGNS_IT.map(function (s) { return '<option value="' + s.k + '">' + s.g + "  " + s.n + "</option>"; }).join("");
  els.sign.innerHTML = signOpts; els.sa.innerHTML = signOpts; els.sb.innerHTML = signOpts;
  els.sa.value = SIGNKEYS[0]; els.sb.value = SIGNKEYS[1];
  els.lens.innerHTML = LENSES.map(function (k) {
    var lab = LENS_LABEL[k] || k;
    return '<option value="' + k + '">' + lab + "</option>";
  }).join("");

  /* ---------- lingue ---------- */
  els.langs.innerHTML = window.ZI18N.LANGS.map(function (x) {
    return '<span class="lchip' + (langsOn.indexOf(x[0]) >= 0 ? " on" : "") + '" data-l="' + x[0] + '">' + x[1] + "</span>";
  }).join("");
  els.langs.addEventListener("click", function (e) {
    var c = e.target.closest(".lchip"); if (!c) return;
    var l = c.getAttribute("data-l"), i = langsOn.indexOf(l);
    if (i >= 0) { if (langsOn.length > 1) langsOn.splice(i, 1); } else langsOn.push(l);
    c.classList.toggle("on", langsOn.indexOf(l) >= 0);
    save(); renderSummary(); renderCoverage();
  });

  /* ---------- scope chips ---------- */
  function buildScopeChips(holderId, list, labels, scopeArr) {
    var h = $(holderId);
    h.innerHTML = list.map(function (k) {
      return '<span class="schip' + (scopeArr.indexOf(k) >= 0 ? " on" : "") + '" data-k="' + k + '">' + (labels[k] || k) + "</span>";
    }).join("");
    h.addEventListener("click", function (e) {
      var c = e.target.closest(".schip"); if (!c) return;
      var k = c.getAttribute("data-k"), i = scopeArr.indexOf(k);
      if (i >= 0) scopeArr.splice(i, 1); else scopeArr.push(k);
      c.classList.toggle("on", scopeArr.indexOf(k) >= 0);
      save(); renderCoverage();
    });
  }
  buildScopeChips("sc-fmt", FORMATS, FMT_LABEL, scope.formats);
  buildScopeChips("sc-lens", LENSES, LENS_LABEL, scope.lenses);
  buildScopeChips("sc-planet", PLANETS, PLANET_LABEL, scope.planets);
  // stesso-segno: chip toggle singolo
  (function () {
    var h = $("sc-same");
    h.innerHTML = '<span class="schip' + (scope.sameSign ? " on" : "") + '" data-k="same">Includi (Ariete+Ariete…)</span>';
    h.addEventListener("click", function (e) {
      var c = e.target.closest(".schip"); if (!c) return;
      scope.sameSign = !scope.sameSign;
      c.classList.toggle("on", scope.sameSign);
      save(); renderCoverage();
    });
  })();

  /* ---------- tabs ---------- */
  function setType(t) {
    type = t;
    [].forEach.call(els.tabs.querySelectorAll(".tab"), function (b) {
      var on = b.getAttribute("data-type") === t; b.classList.toggle("on", on);
      if (on) b.style.setProperty("--tabcol", TYPE_COL[t]);
    });
    [].forEach.call(document.querySelectorAll(".field[data-types]"), function (f) {
      f.classList.toggle("hide", f.getAttribute("data-types").split(" ").indexOf(t) < 0);
    });
    updateBulkLabel(); syncBg(); preview();
  }
  els.tabs.addEventListener("click", function (e) {
    var b = e.target.closest(".tab"); if (!b) return; setType(b.getAttribute("data-type"));
  });
  function updateBulkLabel() {
    var t = type, l;
    if (t === "singolo") l = "➕ tutti i 12 (questo format)";
    else if (t === "coppia") l = "➕ tutte le 66 (questa lente)";
    else if (t === "compat") l = "➕ tutti i 12 segni";
    else l = "➕ tutti i 12 (questo pianeta)";
    els.addbulk.textContent = l;
  }

  /* ---------- anteprima ---------- */
  function syncBg() { els.bg.disabled = (els.dir.value !== "pop"); }
  function curItem() {
    var dir = els.dir.value;
    if (type === "singolo") return { type: "singolo", sign: els.sign.value, fmt: els.fmt.value, dir: dir, bg: dir === "pop" ? els.bg.value : "raggi" };
    if (type === "coppia") {
      var ab = [els.sa.value, els.sb.value].sort();
      return { type: "coppia", a: ab[0], b: ab[1], lens: els.lens.value, dir: dir };
    }
    if (type === "compat") return { type: "compat", sign: els.sign.value, dir: dir };
    return { type: "pianeta", planet: els.planet.value, sign: els.sign.value, dir: dir };
  }
  function buildInto(host, it, lang) {
    if (it.type === "singolo") return window.CARDKIT.build(host, { key: it.sign, dir: it.dir, format: it.fmt, size: "cover", still: true, bg: it.bg, lang: lang });
    if (it.type === "coppia") {
      var sexual = it.lens === "sexual";
      return window.CARDKIT.buildCouple(host, { a: it.a, b: it.b, lens: sexual ? "amore" : it.lens, mode: sexual ? "sexual" : "", dir: it.dir, size: "cover", still: true, lang: lang });
    }
    if (it.type === "compat") return window.CARDKIT.buildCompat(host, { key: it.sign, dir: it.dir, size: "cover", still: true, lang: lang });
    return window.CARDKIT.buildPlanet(host, { planet: it.planet, key: it.sign, dir: it.dir, size: "cover", still: true, lang: lang });
  }
  function preview() {
    syncBg();
    buildInto(els.prev, curItem(), "it");
    els.nprev.style.transform = "scale(" + (252 / 1080) + ")";
  }
  [els.sign, els.sa, els.sb, els.fmt, els.lens, els.planet, els.dir, els.bg].forEach(function (s) {
    s.addEventListener("change", preview);
  });

  /* ---------- coda ---------- */
  function itemKey(it) {
    if (it.type === "singolo") return "singolo|" + it.sign + "|" + it.fmt + "|" + it.dir + "|" + (it.dir === "pop" ? it.bg : "");
    if (it.type === "coppia") return "coppia|" + [it.a, it.b].sort().join("+") + "|" + it.lens + "|" + it.dir;
    if (it.type === "compat") return "compat|" + it.sign + "|" + it.dir;
    return "pianeta|" + it.planet + "|" + it.sign + "|" + it.dir;
  }
  function addItem(it) {
    var k = itemKey(it);
    if (queue.some(function (q) { return itemKey(q) === k; })) return false;
    queue.push(it); return true;
  }
  els.add.addEventListener("click", function () { if (addItem(curItem())) { save(); renderQueue(); } });
  els.addbulk.addEventListener("click", function () {
    var dir = els.dir.value, n = 0;
    if (type === "singolo") {
      var bg = dir === "pop" ? els.bg.value : "raggi", fmt = els.fmt.value;
      SIGNKEYS.forEach(function (k) { if (addItem({ type: "singolo", sign: k, fmt: fmt, dir: dir, bg: bg })) n++; });
    } else if (type === "coppia") {
      var lens = els.lens.value;
      for (var i = 0; i < SIGNKEYS.length; i++) for (var j = i + 1; j < SIGNKEYS.length; j++) {
        if (addItem({ type: "coppia", a: SIGNKEYS[i], b: SIGNKEYS[j], lens: lens, dir: dir })) n++;
      }
    } else if (type === "compat") {
      SIGNKEYS.forEach(function (k) { if (addItem({ type: "compat", sign: k, dir: dir })) n++; });
    } else {
      var pl = els.planet.value;
      SIGNKEYS.forEach(function (k) { if (addItem({ type: "pianeta", planet: pl, sign: k, dir: dir })) n++; });
    }
    if (n) { save(); renderQueue(); }
  });
  els.clear.addEventListener("click", function () {
    if (!queue.length) return;
    if (confirm("Svuotare la lista (" + queue.length + " contenuti)?")) { queue = []; save(); renderQueue(); }
  });

  function sigOf(k) { return SIGNS_IT.find(function (s) { return s.k === k; }) || { g: "?", n: k, el: "aria" }; }
  function itemLabel(it) {
    if (it.type === "singolo") { var s = sigOf(it.sign); return { glyph: s.g, name: s.n, tags: FMT_LABEL[it.fmt], dir: it.dir, bg: it.bg, el: s.el }; }
    if (it.type === "coppia") { var a = sigOf(it.a), b = sigOf(it.b); return { glyph: a.g + b.g, name: a.n + " & " + b.n, tags: (LENS_LABEL[it.lens] || it.lens), dir: it.dir, el: a.el }; }
    if (it.type === "compat") { var c = sigOf(it.sign); return { glyph: c.g, name: c.n, tags: "compatibilità", dir: it.dir, el: c.el }; }
    var p = sigOf(it.sign); return { glyph: p.g, name: PLANET_LABEL[it.planet] + " in " + p.n, tags: "pianeta", dir: it.dir, el: p.el };
  }
  function renderQueue() {
    var order = { singolo: 0, coppia: 1, compat: 2, pianeta: 3 };
    var idx = queue.map(function (it, i) { return i; });
    idx.sort(function (x, y) { return (order[queue[x].type] - order[queue[y].type]) || (x - y); });
    els.queue.innerHTML = idx.map(function (i) {
      var it = queue[i], L = itemLabel(it), col = EL[L.el] || "#888";
      var bgpart = (it.type === "singolo" && it.dir === "pop") ? (" · " + it.bg) : "";
      return '<div class="qitem" style="--qel:' + col + '">' +
        '<span class="qbadge" style="--qbc:' + TYPE_COL[it.type] + '">' + TYPE_LABEL[it.type] + "</span>" +
        '<div class="qmeta"><div class="qname">' + L.name + "</div>" +
        '<div class="qtags"><span class="t">' + L.tags + "</span> · " + L.dir + bgpart + "</div></div>" +
        '<button class="qdel" data-i="' + i + '" title="rimuovi">✕</button></div>';
    }).join("");
    renderSummary(); renderCoverage();
  }
  els.queue.addEventListener("click", function (e) {
    var b = e.target.closest(".qdel"); if (!b) return;
    queue.splice(+b.getAttribute("data-i"), 1); save(); renderQueue();
  });

  function renderSummary() {
    var n = queue.length, L = langsOn.length, tot = n * L;
    els.summary.innerHTML = "<b>" + n + "</b> contenuti × <b>" + L + "</b> lingue = <b>" + tot + "</b> PNG";
    els.gen.disabled = (tot === 0);
  }

  /* ---------- COPERTURA ---------- */
  function pairList() {
    var arr = [];
    for (var i = 0; i < SIGNKEYS.length; i++) for (var j = i + 1; j < SIGNKEYS.length; j++) arr.push([SIGNKEYS[i], SIGNKEYS[j]]);
    if (scope.sameSign) SIGNKEYS.forEach(function (k) { arr.push([k, k]); });
    return arr;
  }
  /* ritorna {singolo,coppia,compat,pianeta} ciascuno {target,covered,missing:{group:[names]}} */
  function computeCoverage() {
    var have = { singolo: {}, coppia: {}, compat: {}, pianeta: {} };
    queue.forEach(function (it) {
      if (it.type === "singolo") have.singolo[it.sign + "|" + it.fmt] = 1;
      else if (it.type === "coppia") have.coppia[[it.a, it.b].sort().join("+") + "|" + it.lens] = 1;
      else if (it.type === "compat") have.compat[it.sign] = 1;
      else have.pianeta[it.planet + "|" + it.sign] = 1;
    });
    var res = {};
    // singoli: format in scope × 12 segni
    (function () {
      var target = 0, covered = 0, miss = {};
      scope.formats.forEach(function (f) {
        miss[f] = [];
        SIGNKEYS.forEach(function (k) {
          target++;
          if (have.singolo[k + "|" + f]) covered++; else miss[f].push(sigOf(k).n);
        });
      });
      res.singolo = { target: target, covered: covered, miss: miss, glabel: FMT_LABEL };
    })();
    // coppie: lenti in scope × coppie
    (function () {
      var pairs = pairList(), target = 0, covered = 0, miss = {};
      scope.lenses.forEach(function (l) {
        miss[l] = [];
        pairs.forEach(function (p) {
          target++;
          var key = p.slice().sort().join("+") + "|" + l;
          if (have.coppia[key]) covered++; else miss[l].push(sigOf(p[0]).n + "+" + sigOf(p[1]).n);
        });
      });
      res.coppia = { target: target, covered: covered, miss: miss, glabel: LENS_LABEL };
    })();
    // compat: 12 segni
    (function () {
      var target = 0, covered = 0, miss = { tutti: [] };
      SIGNKEYS.forEach(function (k) { target++; if (have.compat[k]) covered++; else miss.tutti.push(sigOf(k).n); });
      res.compat = { target: target, covered: covered, miss: miss, glabel: { tutti: "segni" } };
    })();
    // pianeti: pianeti in scope × 12 segni
    (function () {
      var target = 0, covered = 0, miss = {};
      scope.planets.forEach(function (pl) {
        miss[pl] = [];
        SIGNKEYS.forEach(function (k) { target++; if (have.pianeta[pl + "|" + k]) covered++; else miss[pl].push(sigOf(k).n); });
      });
      res.pianeta = { target: target, covered: covered, miss: miss, glabel: PLANET_LABEL };
    })();
    return res;
  }
  function renderCoverage() {
    var cov = computeCoverage();
    var rows = ["singolo", "coppia", "compat", "pianeta"].map(function (t) {
      var c = cov[t], pct = c.target ? Math.round(c.covered / c.target * 100) : 0;
      var full = c.target > 0 && c.covered >= c.target;
      return '<div class="covrow"><div class="cl">' + TYPE_LABEL[t] + "</div>" +
        '<div class="covbar"><div class="covfill" style="width:' + pct + "%;background:" + TYPE_COL[t] + '"></div></div>' +
        '<div class="covnum' + (full ? " full" : "") + '">' + c.covered + " / " + c.target + "</div></div>";
    }).join("");
    els.cov.innerHTML = rows;
    return cov;
  }

  /* ---------- download ---------- */
  function triggerDownload(blob, name) {
    var u = URL.createObjectURL(blob), a = document.createElement("a");
    a.href = u; a.download = name; document.body.appendChild(a); a.click();
    setTimeout(function () { a.remove(); URL.revokeObjectURL(u); }, 1500);
  }
  function zipPath(it, lang) {
    if (it.type === "singolo") return "singolo/" + lang + "/" + it.sign + "/" + it.fmt + "_" + it.dir + (it.dir === "pop" ? "_" + it.bg : "") + "_cover.png";
    if (it.type === "coppia") return "coppie/" + lang + "/" + it.a + "_" + it.b + "/" + it.lens + "_" + it.dir + "_cover.png";
    if (it.type === "compat") return "compat/" + lang + "/" + it.sign + "/" + it.dir + "_cover.png";
    return "pianeti/" + lang + "/" + it.planet + "_" + it.sign + "/" + it.dir + "_cover.png";
  }

  /* ---------- modal copertura ---------- */
  function names(arr, cap) {
    cap = cap || 8;
    if (!arr.length) return "";
    if (arr.length <= cap) return arr.join(", ");
    return arr.slice(0, cap).join(", ") + " +" + (arr.length - cap) + " altri";
  }
  function openModal() {
    var cov = computeCoverage();
    var totalGaps = 0, html = "";
    ["singolo", "coppia", "compat", "pianeta"].forEach(function (t) {
      var c = cov[t]; if (c.target === 0) return;
      var missGroups = Object.keys(c.miss).filter(function (g) { return c.miss[g].length; });
      var gapN = c.target - c.covered; totalGaps += gapN;
      var full = gapN === 0;
      var lines = "";
      if (full) lines = '<div class="gl"><span class="ln">tutto coperto ✓</span></div>';
      else {
        lines = '<div class="gl">' + missGroups.map(function (g) {
          return '<div><span class="ln">' + (c.glabel[g] || g) + ":</span> " + names(c.miss[g]) + "</div>";
        }).join("") + "</div>";
      }
      html += '<div class="gap"><div class="gt"><span>' + TYPE_LABEL[t] + '</span>' +
        '<span class="gn ' + (full ? "full" : "miss") + '">' + c.covered + " / " + c.target + (full ? " ✓" : "  ·  " + gapN + " mancanti") + "</span></div>" + lines + "</div>";
    });
    var nP = queue.length * langsOn.length;
    if (totalGaps === 0) {
      els.mTitle.textContent = "✓ Copertura completa";
      els.mSub.textContent = "Tutto l'obiettivo è coperto. Genero " + nP + " PNG.";
    } else {
      els.mTitle.textContent = "Hai dei buchi nell'obiettivo";
      els.mSub.textContent = totalGaps + " contenuti dell'obiettivo non sono in lista. Genero comunque i " + queue.length + " in coda (" + nP + " PNG).";
    }
    els.mBody.innerHTML = html || '<div class="gl"><span class="ln">nessun obiettivo attivo</span></div>';
    els.mGo.textContent = totalGaps === 0 ? ("Genera " + nP + " PNG") : "Genera comunque";
    els.modal.classList.add("on");
  }
  function closeModal() { els.modal.classList.remove("on"); }
  els.mCancel.addEventListener("click", closeModal);
  els.modal.addEventListener("click", function (e) { if (e.target === els.modal) closeModal(); });
  els.gen.addEventListener("click", function () { if (queue.length && langsOn.length) openModal(); });
  els.mGo.addEventListener("click", function () { closeModal(); generate(); });

  /* ---------- generazione ---------- */
  var GEN = { busy: false };
  async function generate() {
    if (GEN.busy) return;
    var langs = window.ZI18N.LANGS.map(function (x) { return x[0]; }).filter(function (l) { return langsOn.indexOf(l) >= 0; });
    if (!queue.length || !langs.length) return;
    GEN.busy = true; els.gen.disabled = true;
    els.progress.classList.add("on");
    var host = els.gencard, zip = new JSZip();
    if (document.fonts && document.fonts.ready) { await document.fonts.ready; }
    var total = queue.length * langs.length, done = 0;
    try {
      for (var li = 0; li < langs.length; li++) {
        var lang = langs[li];
        for (var qi = 0; qi < queue.length; qi++) {
          var it = queue[qi];
          buildInto(host, it, lang);
          await wait(55);
          var url = await htmlToImage.toPng(host, { pixelRatio: 1, width: 1080, height: 1350, cacheBust: true });
          var blob = await (await fetch(url)).blob();
          zip.file(zipPath(it, lang), blob);
          done++;
          els.pfill.style.width = Math.round(done / total * 100) + "%";
          els.ptxt.textContent = "render " + done + " / " + total + "  ·  " + lang.toUpperCase() + " · " + it.type;
        }
      }
      els.ptxt.textContent = "impacchetto lo ZIP…";
      var out = await zip.generateAsync({ type: "blob" }, function (m) { els.ptxt.textContent = "zip " + Math.round(m.percent) + "%"; });
      var nm = "zodiac_" + queue.length + "contenuti_" + langs.join("-") + ".zip";
      triggerDownload(out, nm);
      els.ptxt.textContent = "✓ pronto: " + nm + " (" + total + " PNG)";
    } catch (e) {
      els.ptxt.textContent = "✕ errore: " + e.message;
    }
    GEN.busy = false; els.gen.disabled = false;
  }

  /* ---------- hook di verifica programmatica ---------- */
  window.__genTest = async function (items, langs) {
    var host = els.gencard, zip = new JSZip();
    if (document.fonts && document.fonts.ready) { await document.fonts.ready; }
    for (var li = 0; li < langs.length; li++) for (var qi = 0; qi < items.length; qi++) {
      buildInto(host, items[qi], langs[li]);
      await wait(55);
      var url = await htmlToImage.toPng(host, { pixelRatio: 1, width: 1080, height: 1350, cacheBust: true });
      var blob = await (await fetch(url)).blob();
      zip.file(zipPath(items[qi], langs[li]), blob);
    }
    var out = await zip.generateAsync({ type: "blob" });
    return { entries: Object.keys(zip.files).length, bytes: out.size, names: Object.keys(zip.files).filter(function (n) { return n.slice(-4) === ".png"; }) };
  };
  window.__cov = computeCoverage;

  /* ---------- init ---------- */
  function init() { setType("singolo"); renderQueue(); }
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(init); }
  init();
})();
