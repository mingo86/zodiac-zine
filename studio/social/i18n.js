/* ZODIAC · SOCIAL — selettore lingua (via URL ?lang=) + loader dati per lingua.
   Lingue: IT (default) · EN · DE · FR · ES · PT.
   - window.ZLANG: codice lingua corrente.
   - ZI18N.mount(selectId): popola e cabla il <select> (ricarica con ?lang).
   - ZI18N.loadData({extra,engine,v}): document.write dei file dati della lingua
     ATTIVA (signs[+extra][+engine]) quando ZLANG!=='it'. L'IT resta caricato
     staticamente nella pagina come fallback. Va chiamato inline TRA i18n.js e
     cardkit.js, così i file si caricano in ordine prima del motore. */
(function () {
  var LANGS = [["it", "IT"], ["en", "EN"], ["de", "DE"], ["fr", "FR"], ["es", "ES"], ["pt", "PT"]];
  var CODES = LANGS.map(function (x) { return x[0]; });
  var l = (new URLSearchParams(location.search).get("lang") || "it").toLowerCase();
  window.ZLANG = CODES.indexOf(l) >= 0 ? l : "it";

  window.ZI18N = {
    LANGS: LANGS,
    mount: function (id) {
      var s = document.getElementById(id);
      if (!s) return;
      s.innerHTML = LANGS.map(function (x) {
        return '<option value="' + x[0] + '"' + (x[0] === window.ZLANG ? " selected" : "") + ">" + x[1] + "</option>";
      }).join("");
      s.addEventListener("change", function () {
        var u = new URL(location.href);
        u.searchParams.set("lang", s.value);
        location.href = u.toString();
      });
    },
    loadData: function (opts) {
      opts = opts || {};
      var L = window.ZLANG;
      if (L === "it") return; // IT caricato staticamente come fallback
      var v = opts.v ? "?v=" + opts.v : "";
      var w = function (src) { document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>'); };
      w("data/signs." + L + ".js" + v);
      if (opts.extra) w("data/extra." + L + ".js" + v);
      if (opts.engine) w("coppie/engine." + L + ".js" + v);
      if (opts.series) w("data/series." + L + ".js" + v);
    },
  };
})();
