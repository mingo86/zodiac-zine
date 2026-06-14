/* ============================================================
   ZODIAC · COPPIE — RENDER DEI TEMI
   Una sola struttura, tre vesti grafiche (classe theme-*).
   I contenuti vengono da ZODIAC.computeCouple → identici fra i temi.
   ============================================================ */
(function(){
  const { SIGNS, BY, LENSES, computeCouple } = window.ZODIAC;

  const PAL = {
    stampa:  { fuoco:"#ec2e36", terra:"#36b06a", aria:"#f5b700", acqua:"#2f9bdb" },
    adesivi: { fuoco:"#ff5d73", terra:"#4cb285", aria:"#ffc24b", acqua:"#4a86d8" }
  };
  const colorFor = (theme, el)=> PAL[theme][el];
  const moodFor  = (s)=> s>=4 ? "happy" : (s<=2 ? "sad" : "neutral");

  let animTimers = [];
  function clearAnim(){ animTimers.forEach(t=>clearTimeout(t)); animTimers = []; }

  function optionsHTML(sel){
    return SIGNS.map(s=>`<option value="${s.k}" ${s.k===sel?"selected":""}>${s.g}  ${s.n}</option>`).join("");
  }
  function lensHTML(theme, cur){
    return LENSES.map(l=>`<button class="cl-lens-tab ${l.k===cur?"active":""}" data-lens="${l.k}">
      <span class="cl-lens-g">${l.g}</span><span class="cl-lens-l">${l.label}</span></button>`).join("");
  }

  /* la "scena": due segni che si avvicinano */
  function sceneHTML(theme, R){
    const mood = moodFor(R.score);
    const cA = window.MASCOT(R.a, colorFor(theme,R.a.el), theme, +1, mood);
    const cB = window.MASCOT(R.b, colorFor(theme,R.b.el), theme, -1, mood);
    const deco = R.state==="good"
        ? `<span class="deco d1">✦</span><span class="deco d2">✦</span><span class="deco d3">✦</span><span class="deco d4">✧</span>`
        : R.state==="bad"
        ? `<span class="deco bolt b1">⚡</span><span class="deco bolt b2">⚡</span>`
        : `<span class="deco d1">·</span><span class="deco d2">·</span>`;
    const vsLabel = "";
    return `<div class="cl-stage state-${R.state}">
        <div class="cl-floor"></div>
        <div class="fig fig-left">${cA}</div>
        <div class="fig fig-right">${cB}</div>
        <div class="cl-bond">${vsLabel}<span class="cl-bond-sym">${R.sym}</span></div>
        <div class="cl-burst"></div>
        <div class="cl-deco">${deco}</div>
      </div>`;
  }

  function resultHTML(theme, R){
    const rows = R.h2h.map(r=>`<tr><td class="ha">${r.va}</td><td class="hl">${r.lab}</td><td class="hb">${r.vb}</td></tr>`).join("");
    const bars = R.dims.map(d=>`<div class="cl-drow">
        <span class="cl-dn">${d.n}</span>
        <span class="cl-dtrack"><span class="cl-dfill" data-v="${d.v}" style="width:0%"></span></span>
        <span class="cl-ds">${d.v}</span></div>`).join("");
    return `
      ${sceneHTML(theme,R)}
      <div class="cl-score">
        <div class="cl-pct" data-pct="${R.pct}">0%</div>
        <div class="cl-names">${R.a.n.toUpperCase()} <span class="cl-names-sym">${R.sym}</span> ${R.b.n.toUpperCase()}</div>
        <div class="cl-verdict"><b>${R.sint}</b> · ${R.verdict}</div>
      </div>

      <div class="cl-block">
        <span class="cl-tag">confronto diretto</span>
        <table class="cl-h2h">
          <tr><th>${R.a.g} ${R.a.n}</th><th></th><th>${R.b.g} ${R.b.n}</th></tr>
          ${rows}
        </table>
      </div>

      <div class="cl-block alt">
        <span class="cl-tag">il ritratto del rapporto</span>
        <p class="cl-p">${R.ritratto}</p>
      </div>

      <div class="cl-two">
        <div class="cl-block tone-up"><span class="cl-tag">cosa vi unisce</span><p class="cl-p">${R.unisce}.</p></div>
        <div class="cl-block tone-down"><span class="cl-tag">dove scotta</span><p class="cl-p">${R.scotta}.</p></div>
      </div>

      <div class="cl-block dims">
        <span class="cl-tag">le 4 dimensioni</span>
        ${bars}
      </div>

      <div class="cl-advice"><span class="cl-advice-mark">→</span><p>${R.advice}</p></div>
    `;
  }

  function shellHTML(theme, state){
    const sub = {stampa:"// stampa pop · edizione fumetto", adesivi:"// album adesivi · riso edition"}[theme];
    const vs = "×";
    return `<div class="cl-root theme-${theme}">
      <div class="cl-head">
        <div class="cl-kicker">${sub}</div>
        <h1 class="cl-title" data-t="Coppie">Coppie</h1>
        <p class="cl-intro">Scegli due segni e la lente del rapporto.</p>
        <div class="cl-lens">${lensHTML(theme, state.lens)}</div>
      </div>
      <div class="cl-pickers">
        <div class="cl-pick">
          <span class="cl-pick-lab">primo segno</span>
          <div class="cl-select-wrap"><select id="selA">${optionsHTML(state.a)}</select></div>
        </div>
        <div class="cl-vs">${vs}</div>
        <div class="cl-pick">
          <span class="cl-pick-lab">secondo segno</span>
          <div class="cl-select-wrap"><select id="selB">${optionsHTML(state.b)}</select></div>
        </div>
        <button class="cl-shuffle" id="shuffle" title="coppia a caso">⇄ <span>caso</span></button>
      </div>
      <div class="cl-result" id="clResult"></div>
    </div>`;
  }

  /* anima i numeri + le barre + l'ingresso dei personaggi */
  function playScene(scope){
    const stage = scope.querySelector(".cl-stage");
    if(stage){
      animTimers.push(setTimeout(()=>stage.classList.add("play"), 50));
      animTimers.push(setTimeout(()=>stage.classList.add("met"), 700));
    }
    // conteggio percentuale
    const pctEl = scope.querySelector(".cl-pct");
    if(pctEl){
      const target = +pctEl.dataset.pct; let cur=0;
      const step = Math.max(1, Math.round(target/26));
      const tick = ()=>{ cur=Math.min(target,cur+step); pctEl.textContent=cur+"%"; if(cur<target) animTimers.push(setTimeout(tick,22)); };
      animTimers.push(setTimeout(tick,260));
    }
    // barre dimensioni
    animTimers.push(setTimeout(()=>{
      scope.querySelectorAll(".cl-dfill").forEach((f,i)=>{
        animTimers.push(setTimeout(()=>{ f.style.width = (f.dataset.v*20)+"%"; }, i*90));
      });
    }, 420));
  }

  function renderResult(theme, state){
    const host = document.getElementById("clResult");
    const R = computeCouple(state.a, state.b, state.lens);
    host.innerHTML = resultHTML(theme, R);
    clearAnim();
    playScene(host);
  }

  /* monta un intero tema nello stage, ricollegando gli eventi */
  function mount(stage, state, api){
    clearAnim();
    stage.innerHTML = shellHTML(state.theme, state);
    const selA = stage.querySelector("#selA"), selB = stage.querySelector("#selB");
    selA.addEventListener("change", ()=> api.setPair(selA.value, selB.value));
    selB.addEventListener("change", ()=> api.setPair(selA.value, selB.value));
    stage.querySelector("#shuffle").addEventListener("click", ()=> api.randomize());
    stage.querySelectorAll(".cl-lens-tab").forEach(t=>{
      t.addEventListener("click", ()=> api.setLens(t.dataset.lens));
    });
    renderResult(state.theme, state);
  }

  window.THEMES = { mount, renderResult };
})();
