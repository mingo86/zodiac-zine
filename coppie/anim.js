/* ============================================================
   ZODIAC · ANIMAZIONI MASCOTTE (condiviso)
   - gesti idle casuali per ogni mascotte (.omino)
   - interazioni di coppia in base all'affinità (1..5)
   window.ZANIM.idle(rootEl?)            // attiva gesti casuali
   window.ZANIM.pair(containerEl, level) // anima la coppia + effetti
   ============================================================ */
(function () {
  const CSS = `
  .za-m{transform-origin:50% 88%}
  @keyframes za-hop{0%,100%{transform:translateY(0) scaleY(1)}28%{transform:translateY(-15%) scaleY(1.05)}55%{transform:translateY(0) scaleY(.94)}72%{transform:translateY(-5%)}}
  @keyframes za-wiggle{0%,100%{transform:rotate(0)}25%{transform:rotate(-8deg)}75%{transform:rotate(8deg)}}
  @keyframes za-squash{0%,100%{transform:scale(1,1)}40%{transform:scale(1.09,.9)}68%{transform:scale(.95,1.06)}}
  @keyframes za-spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
  @keyframes za-nod{0%,100%{transform:rotate(0) translateY(0)}45%{transform:rotate(7deg) translateY(-4%)}}
  .za-g-hop{animation:za-hop .85s ease}
  .za-g-wiggle{animation:za-wiggle .9s ease}
  .za-g-squash{animation:za-squash .8s ease}
  .za-g-spin{animation:za-spin .75s ease}
  .za-g-nod{animation:za-nod .8s ease}
  .za-pair{position:relative}
  @keyframes za-lean-l{0%,100%{transform:rotate(0) translateX(0)}50%{transform:rotate(8deg) translateX(7%)}}
  @keyframes za-lean-r{0%,100%{transform:rotate(0) translateX(0)}50%{transform:rotate(-8deg) translateX(-7%)}}
  @keyframes za-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-7%)}}
  @keyframes za-shake{0%,100%{transform:translateX(0) rotate(0)}25%{transform:translateX(-6%) rotate(-5deg)}75%{transform:translateX(6%) rotate(5deg)}}
  .za-lean-l{animation:za-lean-l 2.4s ease-in-out infinite;transform-origin:50% 92%}
  .za-lean-r{animation:za-lean-r 2.4s ease-in-out infinite;transform-origin:50% 92%}
  .za-bob{animation:za-bob 1.7s ease-in-out infinite}
  .za-shake{animation:za-shake .5s ease-in-out infinite}
  .za-fx{position:absolute;left:50%;top:42%;pointer-events:none;font-size:22px;z-index:5;will-change:transform,opacity;filter:drop-shadow(1px 1px 0 rgba(0,0,0,.25))}
  @keyframes za-floatup{0%{opacity:0;transform:translate(-50%,10px) scale(.5)}18%{opacity:1}100%{opacity:0;transform:translate(calc(-50% + var(--dx,0px)),-92px) scale(1.15)}}
  @media (prefers-reduced-motion: reduce){.za-g-hop,.za-g-wiggle,.za-g-squash,.za-g-spin,.za-g-nod,.za-lean-l,.za-lean-r,.za-bob,.za-shake{animation:none}}
  `;
  function inject(){
    if (document.getElementById('zanim-css')) return;
    const st = document.createElement('style'); st.id = 'zanim-css'; st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  }

  const GES = ['hop', 'wiggle', 'squash', 'nod', 'spin'];
  function gestureOnce(el, which) {
    const g = 'za-g-' + (which || GES[Math.floor(Math.random() * GES.length)]);
    el.classList.remove('za-g-hop','za-g-wiggle','za-g-squash','za-g-spin','za-g-nod');
    void el.offsetWidth;                 // reflow per ri-triggerare
    el.classList.add(g);
    setTimeout(() => el.classList.remove(g), 1000);
  }
  function idle(root) {
    inject();
    const scope = root || document;
    const list = scope.querySelectorAll ? scope.querySelectorAll('.omino') : [];
    list.forEach(el => {
      if (el.closest && el.closest('.hero-mwrap, .cstage')) return; // hanno gia' animazioni proprie
      el.classList.add('za-m');
      if (el._zaIdle) return;
      const loop = () => {
        if (!el.isConnected) { el._zaIdle = null; return; }   // ferma i nodi rimossi
        gestureOnce(el);
        el._zaIdle = setTimeout(loop, 2600 + Math.random() * 4500);
      };
      el._zaIdle = setTimeout(loop, 600 + Math.random() * 3200);
    });
  }

  function clearFx(c) { c.querySelectorAll(':scope > .za-fx').forEach(n => n.remove()); }
  function spawnFx(c, sym, color, n) {
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      s.className = 'za-fx'; s.textContent = sym; s.style.color = color;
      s.style.setProperty('--dx', (Math.random() * 70 - 35).toFixed(0) + 'px');
      s.style.animation = 'za-floatup ' + (1.2 + Math.random() * 0.8).toFixed(2) + 's ease-out ' + (i * 0.16).toFixed(2) + 's forwards';
      c.appendChild(s);
      setTimeout(() => s.remove(), 2700 + i * 170);
    }
  }
  function pair(container, level) {
    inject();
    container.classList.add('za-pair');
    let targets = container.querySelectorAll(':scope .pmascot');
    if (targets.length < 2) targets = container.querySelectorAll(':scope .cfig');
    if (targets.length < 2) targets = container.querySelectorAll('.omino');
    targets.forEach(t => t.classList.remove('za-lean-l', 'za-lean-r', 'za-bob', 'za-shake'));
    clearFx(container);
    if (level >= 4) {
      if (targets[0]) targets[0].classList.add('za-lean-l');
      if (targets[1]) targets[1].classList.add('za-lean-r');
      spawnFx(container, '♥', '#ff2d6f', level >= 5 ? 6 : 4);
    } else if (level <= 2) {
      targets.forEach(t => t.classList.add('za-shake'));
      spawnFx(container, '⚡', '#f5b700', 4);
    } else {
      targets.forEach(t => t.classList.add('za-bob'));
      spawnFx(container, '✦', '#2f9bdb', 3);
    }
  }
  window.ZANIM = { inject, idle, pair, gestureOnce, spawnFx };
})();
