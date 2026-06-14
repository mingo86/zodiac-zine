/* ============================================================
   ZODIAC · COPPIE — MASCOTTE v2
   12 personaggi con SILHOUETTE DIVERSE, ognuna evoca il segno.
   2 rese: "ink" (temi Stampa & Cosmo) · "sticker" (Adesivi, con alone die-cut).
     mascot(sign, color, theme, look, mood)
   viewBox 0 0 140 184 · suolo ~166
   ============================================================ */
(function(){
  const INK = { stroke:"#15110d", sw:4, face:"#15110d", eye:"cartoon", cheeks:"#ff8aa0" };
  const STK = { stroke:"#2c2138", sw:3.7, face:"#2c2138", eye:"dot",     cheeks:"#ffffff" };

  /* cuore (per occhi innamorati) */
  function heart(x,y,r,col){
    return `<path d="M${x},${(y-r*0.45).toFixed(1)} C${(x-r*0.55).toFixed(1)},${(y-r*1.25).toFixed(1)} ${(x-r*1.5).toFixed(1)},${(y-r*0.15).toFixed(1)} ${x},${(y+r*0.8).toFixed(1)} C${(x+r*1.5).toFixed(1)},${(y-r*0.15).toFixed(1)} ${(x+r*0.55).toFixed(1)},${(y-r*1.25).toFixed(1)} ${x},${(y-r*0.45).toFixed(1)} Z" fill="${col}"/>`;
  }

  /* faccina riutilizzabile — mood: happy|neutral|sad|love|angry · K.variant: m|f */
  function face(cx, cy, sc, K, mood, look){
    const ex=12*sc, er=8*sc, pr=3.4*sc, dx=look*3*sc;
    const v=K.variant, inlove=mood==="love", angry=mood==="angry";
    let s="";
    if(inlove){
      s+=heart(cx-ex,cy+1,5*sc,"#ff3b6b")+heart(cx+ex,cy+1,5*sc,"#ff3b6b");
    } else if(K.eye==="cartoon"){
      s+=`<circle cx="${cx-ex}" cy="${cy}" r="${er}" fill="#fff" stroke="#15110d" stroke-width="${2.4*sc}"/>`;
      s+=`<circle cx="${cx+ex}" cy="${cy}" r="${er}" fill="#fff" stroke="#15110d" stroke-width="${2.4*sc}"/>`;
      s+=`<g class="zpup"><circle cx="${cx-ex+dx}" cy="${cy+(angry?2:1)}" r="${pr}" fill="#15110d"/><circle cx="${cx+ex+dx}" cy="${cy+(angry?2:1)}" r="${pr}" fill="#15110d"/></g>`;
    } else {
      s+=`<g class="zpup"><circle cx="${cx-ex+dx}" cy="${cy}" r="${4.6*sc}" fill="${K.face}"/><circle cx="${cx+ex+dx}" cy="${cy}" r="${4.6*sc}" fill="${K.face}"/><circle cx="${cx-ex+dx+1.4}" cy="${cy-1.4}" r="${1.5*sc}" fill="#fff"/><circle cx="${cx+ex+dx+1.4}" cy="${cy-1.4}" r="${1.5*sc}" fill="#fff"/></g>`;
    }
    const bw=2.6*sc;
    if(angry){
      s+=`<path d="M${cx-ex-7*sc},${cy-9*sc} L${cx-ex+5*sc},${cy-4*sc}" fill="none" stroke="${K.face}" stroke-width="${bw}" stroke-linecap="round"/>`;
      s+=`<path d="M${cx+ex+7*sc},${cy-9*sc} L${cx+ex-5*sc},${cy-4*sc}" fill="none" stroke="${K.face}" stroke-width="${bw}" stroke-linecap="round"/>`;
    } else if(v==="m"){
      // sopracciglia folte, basse e marcate (più mascoline)
      const mbw=3.8*sc;
      s+=`<path d="M${cx-ex-7*sc},${cy-8.5*sc} L${cx-ex+5.5*sc},${cy-10.5*sc}" fill="none" stroke="${K.face}" stroke-width="${mbw}" stroke-linecap="round"/>`;
      s+=`<path d="M${cx+ex+7*sc},${cy-8.5*sc} L${cx+ex-5.5*sc},${cy-10.5*sc}" fill="none" stroke="${K.face}" stroke-width="${mbw}" stroke-linecap="round"/>`;
    }
    if(v==="f" && !inlove){
      // ciglia lunghe e ricurve (più femminili)
      const lc=`fill="none" stroke="${K.face}" stroke-width="${1.8*sc}" stroke-linecap="round"`;
      s+=`<path d="M${cx-ex-4.5*sc},${cy-6*sc} q${-2.5*sc},${-4.5*sc} ${-7*sc},${-5.5*sc}" ${lc}/>`;
      s+=`<path d="M${cx-ex-7*sc},${cy-3*sc} q${-3.5*sc},${-2.5*sc} ${-8.5*sc},${-2.5*sc}" ${lc}/>`;
      s+=`<path d="M${cx-ex-7.5*sc},${cy+0.5*sc} q${-4*sc},${-0.5*sc} ${-8.5*sc},${1*sc}" ${lc}/>`;
      s+=`<path d="M${cx+ex+4.5*sc},${cy-6*sc} q${2.5*sc},${-4.5*sc} ${7*sc},${-5.5*sc}" ${lc}/>`;
      s+=`<path d="M${cx+ex+7*sc},${cy-3*sc} q${3.5*sc},${-2.5*sc} ${8.5*sc},${-2.5*sc}" ${lc}/>`;
      s+=`<path d="M${cx+ex+7.5*sc},${cy+0.5*sc} q${4*sc},${-0.5*sc} ${8.5*sc},${1*sc}" ${lc}/>`;
      // ombretto soffuso sulla palpebra
      s+=`<path d="M${cx-ex-er*0.7},${cy-er*0.55} Q${cx-ex},${cy-er*1.35} ${cx-ex+er*0.8},${cy-er*0.5}" fill="none" stroke="#c98bd6" stroke-width="${1.8*sc}" stroke-linecap="round" opacity=".75"/>`;
      s+=`<path d="M${cx+ex+er*0.7},${cy-er*0.55} Q${cx+ex},${cy-er*1.35} ${cx+ex-er*0.8},${cy-er*0.5}" fill="none" stroke="#c98bd6" stroke-width="${1.8*sc}" stroke-linecap="round" opacity=".75"/>`;
    }
    const cheekCol = v==="m" ? null : (v==="f" ? (K.cheeks||"#ff8aa0") : K.cheeks);
    if(cheekCol && !angry){
      const o = cheekCol==="#ffffff" ? .5 : .85;
      s+=`<ellipse cx="${cx-ex-3}" cy="${cy+11*sc}" rx="${5.6*sc}" ry="${3.8*sc}" fill="${cheekCol}" opacity="${o}"/>`;
      s+=`<ellipse cx="${cx+ex+3}" cy="${cy+11*sc}" rx="${5.6*sc}" ry="${3.8*sc}" fill="${cheekCol}" opacity="${o}"/>`;
    }
    const my=cy+18*sc;
    let mp;
    if(angry){ mp=`M${cx-9*sc},${my+2} Q${cx},${my-7*sc} ${cx+9*sc},${my+2}`; }
    else if(mood==="happy"||inlove){ mp=`M${cx-9*sc},${my-2} Q${cx},${my+8*sc} ${cx+9*sc},${my-2}`; }
    else if(mood==="sad"){ mp=`M${cx-9*sc},${my+3} Q${cx},${my-6*sc} ${cx+9*sc},${my+3}`; }
    else { mp=`M${cx-8*sc},${my} L${cx+8*sc},${my}`; }
    s+=`<path d="${mp}" fill="none" stroke="${K.face}" stroke-width="${3*sc}" stroke-linecap="round"/>`;
    if(v==="f" && !inlove && !angry){
      // labbra rossetto sotto al sorriso
      s+=`<path d="M${cx-6*sc},${my-0.5} Q${cx},${my+6*sc} ${cx+6*sc},${my-0.5}" fill="none" stroke="#ff4d86" stroke-width="${2.4*sc}" stroke-linecap="round"/>`;
    }
    if(v==="m" && !inlove && !angry){
      // baffi a manubrio più folti + pizzetto
      s+=`<path d="M${cx},${cy+12.5*sc} C${cx-4*sc},${cy+9*sc} ${cx-9*sc},${cy+9*sc} ${cx-13*sc},${cy+14*sc} C${cx-9*sc},${cy+12*sc} ${cx-4*sc},${cy+13*sc} ${cx},${cy+15.5*sc} C${cx+4*sc},${cy+13*sc} ${cx+9*sc},${cy+12*sc} ${cx+13*sc},${cy+14*sc} C${cx+9*sc},${cy+9*sc} ${cx+4*sc},${cy+9*sc} ${cx},${cy+12.5*sc} Z" fill="${K.face}"/>`;
      s+=`<path d="M${cx-3*sc},${cy+21*sc} Q${cx},${cy+28*sc} ${cx+3*sc},${cy+21*sc} Q${cx},${cy+23*sc} ${cx-3*sc},${cy+21*sc} Z" fill="${K.face}"/>`;
    }
    if(v==="f"){
      s+=`<g stroke="${K.face}" stroke-width="${1.5*sc}" stroke-linejoin="round"><path d="M${cx},${cy+25*sc} l${-11*sc},${-5*sc} l0,${10*sc} Z" fill="#ff5d8f"/><path d="M${cx},${cy+25*sc} l${11*sc},${-5*sc} l0,${10*sc} Z" fill="#ff5d8f"/><circle cx="${cx}" cy="${cy+25*sc}" r="${3.2*sc}" fill="#ff5d8f"/></g>`;
    }
    return s;
  }

  /* ----------------------- 12 SILHOUETTE ----------------------- */
  const DRAW = {

  // ARIETE — vello tondo + grandi corna a spirale + orecchie
  ariete(P){const{F,S,W,FACE,K}=P, st=`fill="${F}" stroke="${S}" stroke-width="${W}" stroke-linejoin="round"`;
    let wool="";[ [44,86,11],[60,80,12],[78,80,12],[94,86,11],[104,102,10],[36,102,10] ].forEach(b=>wool+=`<circle cx="${b[0]}" cy="${b[1]}" r="${b[2]}" ${st}/>`);
    return `
      <path d="M40,98 C20,92 14,110 26,120 C34,127 48,124 47,112" ${st}/>
      <path d="M100,98 C120,92 126,110 114,120 C106,127 92,124 93,112" ${st}/>
      <ellipse cx="70" cy="120" rx="38" ry="40" ${st}/>
      ${wool}
      <path d="M52,158 l-3,9 M88,158 l3,9" fill="none" stroke="${S}" stroke-width="${W}" stroke-linecap="round"/>
      ${face(70,116,1,K,P.mood,P.look)}`;
  },

  // TORO — testa larga squadrata + grandi corna + muso + anello
  toro(P){const{F,S,W,FACE,K}=P, st=`fill="${F}" stroke="${S}" stroke-width="${W}" stroke-linejoin="round"`;
    return `
      <path d="M40,84 C26,68 12,66 5,72 C16,77 30,82 41,96 Z" ${st}/>
      <path d="M100,84 C114,68 128,66 135,72 C124,77 110,82 99,96 Z" ${st}/>
      <path d="M44,78 l-6,-12 l14,4 Z" ${st}/><path d="M96,78 l6,-12 l-14,4 Z" ${st}/>
      <path d="M34,92 C34,76 48,68 70,68 C92,68 106,76 106,92 L106,120 C106,142 92,154 70,154 C48,154 34,142 34,120 Z" ${st}/>
      <ellipse cx="70" cy="132" rx="20" ry="13" fill="#fff" stroke="${S}" stroke-width="${W*0.7}" opacity=".4"/>
      <circle cx="62" cy="131" r="2" fill="${FACE}"/><circle cx="78" cy="131" r="2" fill="${FACE}"/>
      <circle cx="70" cy="146" r="5" fill="none" stroke="${S}" stroke-width="${W*0.8}"/>
      ${face(70,104,0.95,K,P.mood,P.look)}`;
  },

  // GEMELLI — due figure gemelle che si tengono
  gemelli(P){const{F,S,W,K}=P, st=`fill="${F}" stroke="${S}" stroke-width="${W}" stroke-linejoin="round"`;
    const body=(cx)=>`<path d="M${cx-22},150 C${cx-22},120 ${cx-16},92 ${cx},92 C${cx+16},92 ${cx+22},120 ${cx+22},150 Z" ${st}/>`;
    return `
      ${body(46)}${body(94)}
      <path d="M58,140 q12,8 24,0" fill="none" stroke="${S}" stroke-width="${W}" stroke-linecap="round"/>
      <path d="M40,150 l-3,10 M52,150 l-2,10 M88,150 l2,10 M100,150 l3,10" fill="none" stroke="${S}" stroke-width="${W}" stroke-linecap="round"/>
      ${face(46,112,0.74,K,P.mood,P.look)}
      ${face(94,112,0.74,K,P.mood,P.look)}`;
  },

  // CANCRO — guscio largo basso + chele + zampe + occhi su peduncoli
  cancro(P){const{F,S,W,FACE,K}=P, st=`fill="${F}" stroke="${S}" stroke-width="${W}" stroke-linejoin="round"`;
    const leg=(x,y,dir)=>`<path d="M${x},${y} q${dir*10},6 ${dir*16},16" fill="none" stroke="${S}" stroke-width="${W}" stroke-linecap="round"/>`;
    const claw=(x,dir)=>`<path d="M${x},108 q${dir*-4},-20 ${dir*4},-26 q${dir*10},-4 ${dir*9},8 l${dir*-4},2 q${dir*-3},-4 ${dir*-6},-1
        q${dir*-2},10 ${dir*4},14 Z" ${st}/>`;
    return `
      ${leg(34,128,-1)}${leg(38,138,-1)}${leg(106,128,1)}${leg(102,138,1)}
      ${claw(30,1)}${claw(110,-1)}
      <path d="M58,104 L52,82" fill="none" stroke="${S}" stroke-width="${W}" stroke-linecap="round"/>
      <path d="M82,104 L88,82" fill="none" stroke="${S}" stroke-width="${W}" stroke-linecap="round"/>
      <circle cx="52" cy="78" r="7" ${st}/><circle cx="88" cy="78" r="7" ${st}/>
      <circle cx="${52+P.look*1.6}" cy="78" r="2.6" fill="${FACE}"/><circle cx="${88+P.look*1.6}" cy="78" r="2.6" fill="${FACE}"/>
      <ellipse cx="70" cy="120" rx="46" ry="30" ${st}/>
      <ellipse cx="56" cy="124" rx="5.6" ry="3.8" fill="${K.cheeks||'#ff8aa0'}" opacity="${K.cheeks==='#ffffff'?.5:.85}"/>
      <ellipse cx="84" cy="124" rx="5.6" ry="3.8" fill="${K.cheeks||'#ff8aa0'}" opacity="${K.cheeks==='#ffffff'?.5:.85}"/>
      <path d="${(P.mood==='sad'||P.mood==='angry')?'M62,128 Q70,122 78,128':'M62,124 Q70,132 78,124'}" fill="none" stroke="${FACE}" stroke-width="3" stroke-linecap="round"/>`;
  },

  // LEONE — criniera a raggi + muso
  leone(P){const{F,S,W,K}=P, st=`fill="${F}" stroke="${S}" stroke-width="${W}" stroke-linejoin="round"`;
    let mane="";const cx=70,cy=116,rin=34,rout=52,n=16;
    for(let i=0;i<n;i++){const a=i*(360/n)*Math.PI/180;
      const ax=cx+rin*Math.cos(a),ay=cy+rin*Math.sin(a);
      const bx=cx+rout*Math.cos(a-0.11),by=cy+rout*Math.sin(a-0.11);
      const dx=cx+rout*Math.cos(a+0.11),dy=cy+rout*Math.sin(a+0.11);
      mane+=`<path d="M${ax.toFixed(1)},${ay.toFixed(1)} L${bx.toFixed(1)},${by.toFixed(1)} L${dx.toFixed(1)},${dy.toFixed(1)} Z" ${st}/>`;}
    return `
      ${mane}
      <circle cx="52" cy="92" r="8" ${st}/><circle cx="88" cy="92" r="8" ${st}/>
      <circle cx="70" cy="116" r="34" ${st}/>
      <path d="M70,124 q-7,3 0,8 q7,-3 0,-8" fill="${P.S}" opacity=".5"/>
      <path d="M58,148 l-3,8 M82,148 l3,8" fill="none" stroke="${S}" stroke-width="${W}" stroke-linecap="round"/>
      ${face(70,110,0.92,K,P.mood,P.look)}`;
  },

  // VERGINE — figura snella + capelli + fiore di grano
  vergine(P){const{F,S,W,K}=P, st=`fill="${F}" stroke="${S}" stroke-width="${W}" stroke-linejoin="round"`;
    return `
      <path d="M44,78 C30,96 32,128 46,140 L54,128 C44,118 44,96 54,82 Z" ${st}/>
      <path d="M96,78 C110,96 108,128 94,140 L86,128 C96,118 96,96 86,82 Z" ${st}/>
      <ellipse cx="70" cy="116" rx="32" ry="46" ${st}/>
      <path d="M70,72 L70,46" fill="none" stroke="${S}" stroke-width="${W}" stroke-linecap="round"/>
      <g fill="${F}" stroke="${S}" stroke-width="${W}" stroke-linejoin="round">
        <ellipse cx="70" cy="44" rx="3.6" ry="6.4"/>
        <ellipse cx="61" cy="54" rx="3.2" ry="5.4" transform="rotate(-32 61 54)"/>
        <ellipse cx="79" cy="54" rx="3.2" ry="5.4" transform="rotate(32 79 54)"/>
        <ellipse cx="62" cy="64" rx="3.2" ry="5.4" transform="rotate(-32 62 64)"/>
        <ellipse cx="78" cy="64" rx="3.2" ry="5.4" transform="rotate(32 78 64)"/>
      </g>
      <path d="M58,160 l-3,7 M82,160 l3,7" fill="none" stroke="${S}" stroke-width="${W}" stroke-linecap="round"/>
      ${face(70,112,1,K,P.mood,P.look)}`;
  },

  // BILANCIA — corpo che regge una bilancia a due piatti
  bilancia(P){const{F,S,W,K}=P, st=`fill="${F}" stroke="${S}" stroke-width="${W}" stroke-linejoin="round"`;
    const ln=`fill="none" stroke="${S}" stroke-width="${W}" stroke-linecap="round"`;
    return `
      <g ${ln}>
        <path d="M38,58 L102,58"/>
        <path d="M70,58 L70,42"/>
        <path d="M38,58 L30,74 M38,58 L46,74"/>
        <path d="M102,58 L94,74 M102,58 L110,74"/>
      </g>
      <path d="M30,74 a8,5 0 0 0 16,0 Z" ${st}/>
      <path d="M94,74 a8,5 0 0 0 16,0 Z" ${st}/>
      <circle cx="70" cy="42" r="4" ${st}/>
      <ellipse cx="70" cy="124" rx="32" ry="38" ${st}/>
      <path d="M44,116 q-10,4 -8,18 M96,116 q10,4 8,18" ${ln}/>
      <path d="M60,160 l-3,8 M80,160 l3,8" ${ln}/>
      ${face(70,120,1,K,P.mood,P.look)}`;
  },

  // SCORPIONE — corpo + chele + coda a uncino con pungiglione
  scorpione(P){const{F,S,W,FACE,K}=P, st=`fill="${F}" stroke="${S}" stroke-width="${W}" stroke-linejoin="round"`;
    let tail="";const pts=[[100,138],[112,128],[120,112],[120,94],[112,82]];
    pts.forEach((p,i)=>tail+=`<circle cx="${p[0]}" cy="${p[1]}" r="${9-i*0.6}" ${st}/>`);
    const claw=(x,dir)=>`<path d="M${x},118 q${dir*-4},-16 ${dir*4},-22 q${dir*9},-3 ${dir*8},7 l${dir*-4},2 q${dir*-2},-3 ${dir*-5},-1
        q${dir*-2},9 ${dir*4},12 Z" ${st}/>`;
    return `
      ${tail}
      <path d="M110,80 l9,-9 l-1,9 l8,3" fill="none" stroke="${S}" stroke-width="${W}" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M118,73 l8,-4 l-3,8 Z" ${st}/>
      <ellipse cx="60" cy="122" rx="36" ry="32" ${st}/>
      ${claw(30,1)}${claw(94,-1)}
      <path d="M48,154 l-3,8 M72,154 l3,8" fill="none" stroke="${S}" stroke-width="${W}" stroke-linecap="round"/>
      ${face(60,116,0.95,K,P.mood,P.look)}`;
  },

  // SAGITTARIO — figura che tende un grande arco
  sagittario(P){const{F,S,W,K}=P, st=`fill="${F}" stroke="${S}" stroke-width="${W}" stroke-linejoin="round"`;
    const ln=`fill="none" stroke="${S}" stroke-width="${W}" stroke-linecap="round"`;
    return `
      <path d="M104,70 C126,92 126,140 104,162" ${ln}/>
      <path d="M104,70 L104,162" fill="none" stroke="${S}" stroke-width="${W*0.7}"/>
      <ellipse cx="60" cy="124" rx="32" ry="36" ${st}/>
      <path d="M30,118 L112,98" ${ln}/>
      <path d="M30,118 l11,-2 l-5,-9" ${ln}/>
      <path d="M112,98 l-10,-3 l3,9 Z" ${st}/>
      <path d="M50,156 l-3,8 M70,156 l3,8" ${ln}/>
      ${face(58,118,0.95,K,P.mood,P.look)}`;
  },

  // CAPRICORNO — testa caprina con corna + coda di pesce a spirale
  capricorno(P){const{F,S,W,FACE,K}=P, st=`fill="${F}" stroke="${S}" stroke-width="${W}" stroke-linejoin="round"`;
    return `
      <path d="M50,86 C40,68 44,50 56,44 L60,52 C50,58 50,74 60,88 Z" ${st}/>
      <path d="M90,86 C100,68 96,50 84,44 L80,52 C90,58 90,74 80,88 Z" ${st}/>
      <ellipse cx="70" cy="104" rx="34" ry="34" ${st}/>
      <path d="M62,132 Q70,146 78,132 Z" ${st}/>
      <path d="M64,128 C58,148 58,160 70,156 C70,164 84,166 90,156 C98,148 92,134 80,134" ${st}/>
      <path d="M86,150 q9,-2 14,4 q-8,4 -14,1 Z" ${st}/>
      ${face(70,100,0.96,K,P.mood,P.look)}`;
  },

  // ACQUARIO — portatore d'acqua con anfora e onde
  acquario(P){const{F,S,W,K}=P, st=`fill="${F}" stroke="${S}" stroke-width="${W}" stroke-linejoin="round"`;
    const ln=`fill="none" stroke="${S}" stroke-width="${W*0.85}" stroke-linecap="round"`;
    return `
      <ellipse cx="62" cy="116" rx="30" ry="36" ${st}/>
      <g transform="rotate(24 100 96)">
        <path d="M88,84 C84,80 86,74 92,74 L112,74 C118,74 120,80 116,84 L114,100 C114,106 108,110 102,110 C96,110 90,106 90,100 Z" ${st}/>
        <path d="M92,74 C92,70 96,68 102,68 C108,68 112,70 112,74" fill="none" stroke="${S}" stroke-width="${W*0.7}"/>
      </g>
      <g ${ln}>
        <path d="M96,116 q5,5 0,11 q-5,6 0,12 q5,5 0,11"/>
        <path d="M104,118 q5,5 0,11 q-5,6 0,12"/>
      </g>
      <path d="M50,150 l-3,8 M68,150 l3,8" fill="none" stroke="${S}" stroke-width="${W}" stroke-linecap="round"/>
      ${face(60,110,0.95,K,P.mood,P.look)}`;
  },

  // PESCI — due pesci che nuotano in direzioni opposte
  pesci(P){const{F,S,W,FACE,K}=P, st=`fill="${F}" stroke="${S}" stroke-width="${W}" stroke-linejoin="round"`;
    const fish=(x,y,rot,withFace)=>`<g transform="translate(${x},${y}) rotate(${rot})">
        <ellipse cx="0" cy="0" rx="26" ry="17" ${st}/>
        <path d="M24,0 L42,-15 L42,15 Z" ${st}/>
        <path d="M-2,-17 q6,-9 14,-6 q-3,8 -10,8 Z" ${st}/>
        ${withFace?`<circle cx="-14" cy="-3" r="6" fill="#fff" stroke="#15110d" stroke-width="2"/><circle cx="${-14+P.look*1.4}" cy="-2" r="2.6" fill="#15110d"/>
          <path d="${(P.mood==='sad'||P.mood==='angry')?'M-20,7 q6,-5 12,-1':'M-20,4 q6,6 12,1'}" fill="none" stroke="#15110d" stroke-width="2.4" stroke-linecap="round"/>`
          :`<circle cx="-14" cy="-3" r="3" fill="${FACE}"/>`}
      </g>`;
    return `
      <path d="M52,70 C24,84 24,128 52,142" fill="none" stroke="${S}" stroke-width="${W*0.8}" stroke-linecap="round"/>
      ${fish(58,138,-22,false)}
      ${fish(72,86,158,true)}`;
  }

  };

  function mascot(sign, color, theme, look, mood, variant){
    const sticker = theme==="adesivi";
    const K = Object.assign({}, sticker?STK:INK);
    K.variant = variant||null;
    const P = { F:color, color, S:K.stroke, W:K.sw, FACE:K.face, K, look:look||1, mood:mood||"happy" };
    const shapes = (DRAW[sign.k]||DRAW.ariete)(P);
    const gid = "ha-"+theme+"-"+sign.k;
    const defs = sticker
      ? `<defs><filter id="${gid}" x="-30%" y="-30%" width="160%" height="160%">
          <feMorphology operator="dilate" radius="3" in="SourceAlpha" result="d"/>
          <feFlood flood-color="#fff" result="w"/>
          <feComposite in="w" in2="d" operator="in" result="o"/>
          <feMerge><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter></defs>`
      : `<defs><filter id="${gid}" x="-25%" y="-25%" width="150%" height="150%">
          <feOffset in="SourceAlpha" dx="-6" dy="-8" result="o"/>
          <feComposite in="SourceAlpha" in2="o" operator="out" result="edge"/>
          <feGaussianBlur in="edge" stdDeviation="1.6" result="eb"/>
          <feFlood flood-color="#000" flood-opacity="0.17" result="f"/>
          <feComposite in="f" in2="eb" operator="in" result="shade"/>
          <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="shade"/></feMerge>
        </filter></defs>`;
    const open = `<g filter="url(#${gid})">`;
    return `<svg class="omino omino-${theme}" viewBox="0 0 140 184" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      ${defs}<ellipse cx="70" cy="170" rx="36" ry="6" fill="#000" opacity=".15"/>
      ${open}${shapes}</g></svg>`;
  }

  window.MASCOT = mascot;
})();
