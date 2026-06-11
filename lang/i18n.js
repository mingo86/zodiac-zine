/* ============================================================
   ZODIAC · I18N — lingua + selettore (in alto)
   Lingue: it, en, fr, es, pt (BR).
   Persistenza: URL ?lang=xx  >  localStorage  >  lingua browser.
   La lingua "viaggia" tra le pagine via parametro URL sui link interni
   (funziona anche aprendo i file in locale).
   API: ZI18N.get()/set(code)/t(dict)/pickerHTML()/mount(el)
        ZI18N.decorate()  -> aggiorna i link interni col ?lang
   Evento window 'zlangchange'.
   ============================================================ */
(function () {
  const LANGS = [
    { code: "it", label: "IT", name: "Italiano" },
    { code: "en", label: "EN", name: "English" },
    { code: "fr", label: "FR", name: "Français" },
    { code: "es", label: "ES", name: "Español" },
    { code: "pt", label: "PT", name: "Português (BR)" }
  ];
  const KEY = "zlang";
  const isLang = c => LANGS.some(l => l.code === c);
  function fromURL() {
    try { const u = new URLSearchParams(location.search).get("lang"); if (u && isLang(u)) return u; } catch (e) {}
    return null;
  }
  function detect() {
    const u = fromURL(); if (u) return u;
    try { const s = localStorage.getItem(KEY); if (s && isLang(s)) return s; } catch (e) {}
    const b = ((navigator.language || "it").slice(0, 2)).toLowerCase();
    return isLang(b) ? b : "it";
  }
  let cur = detect();
  function get() { return cur; }
  // aggiunge/aggiorna ?lang sui link interni (.html locali)
  function decorate() {
    const links = document.querySelectorAll('a[href]');
    links.forEach(a => {
      const href = a.getAttribute("href");
      if (!href || /^(https?:|mailto:|tel:|#)/i.test(href)) return;
      if (!/\.html(\?|#|$)/i.test(href)) return;
      try {
        const url = new URL(href, location.href);
        url.searchParams.set("lang", cur);
        // mantieni relativo
        a.setAttribute("href", url.pathname.split("/").pop() + url.search + url.hash);
      } catch (e) {}
    });
  }
  function set(code) {
    if (!isLang(code)) { syncButtons(); return; }
    cur = code;
    try { localStorage.setItem(KEY, code); } catch (e) {}
    try {  // rifletti nell'URL corrente senza ricaricare
      const u = new URL(location.href); u.searchParams.set("lang", code);
      history.replaceState(null, "", u.pathname.split("/").pop() + u.search + u.hash);
    } catch (e) {}
    document.documentElement.lang = code;
    syncButtons(); decorate();
    window.dispatchEvent(new CustomEvent("zlangchange", { detail: code }));
  }
  function t(dict) {
    if (dict == null) return "";
    if (typeof dict === "string") return dict;
    return dict[cur] != null ? dict[cur] : (dict.it != null ? dict.it : (dict.en != null ? dict.en : ""));
  }
  function pickerHTML() {
    return '<div class="zlang-picker" role="group" aria-label="Lingua">' +
      LANGS.map(l => `<button class="zlang-btn${l.code === cur ? " on" : ""}" data-l="${l.code}" title="${l.name}" aria-label="${l.name}">${l.label}</button>`).join("") +
      "</div>";
  }
  function syncButtons() { document.querySelectorAll(".zlang-btn").forEach(b => b.classList.toggle("on", b.dataset.l === cur)); }
  function mount(container) {
    if (!container) return;
    container.innerHTML = pickerHTML();
    container.querySelectorAll(".zlang-btn").forEach(b => { b.onclick = () => set(b.dataset.l); });
  }
  function injectCSS() {
    if (document.getElementById("zi18n-css")) return;
    const st = document.createElement("style"); st.id = "zi18n-css";
    st.textContent = `
.zlang-picker{display:inline-flex;gap:3px;background:#fff;border:2.5px solid #15110d;border-radius:999px;padding:3px;box-shadow:2px 2px 0 #15110d}
.zlang-btn{font-family:'Space Mono',monospace;font-weight:700;font-size:11px;border:none;background:transparent;color:#15110d;padding:4px 8px;border-radius:999px;cursor:pointer;line-height:1}
.zlang-btn:hover{background:#ffe9a8}
.zlang-btn.on{background:#15110d;color:#ffd23f}`;
    (document.head || document.documentElement).appendChild(st);
  }
  injectCSS();
  document.documentElement.lang = cur;
  if (document.readyState !== "loading") decorate();
  else document.addEventListener("DOMContentLoaded", decorate);
  window.ZI18N = { LANGS, get, set, t, pickerHTML, mount, syncButtons, decorate, KEY };
})();
