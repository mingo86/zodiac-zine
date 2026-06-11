(function () {
  const TFLAV = {
    Sun:"luz, foco y ganas de hacerte notar",Moon:"humor y necesidades que cambian deprisa",
    Mercury:"pensamientos veloces, mensajes y palabras",Venus:"dulzura, placer y ganas de belleza",
    Mars:"empuje, garra y una pizca de fricción",Jupiter:"apertura, confianza y oportunidades",
    Saturn:"seriedad, pruebas y sentido de la responsabilidad",Uranus:"imprevistos y ganas de romper esquemas",
    Neptune:"sueño, inspiración y un velo de niebla",Pluto:"intensidad y transformación profunda"
  };
  const NAREA = {
    Sun:"tu identidad y tu vitalidad",Moon:"tus emociones y la necesidad de sentirte a salvo",
    Mercury:"tu mente y tu forma de comunicar",Venus:"tus afectos, el placer y las relaciones",
    Mars:"tu impulso de actuar y tus deseos",Jupiter:"tus ganas de crecer y expandirte",
    Saturn:"tus compromisos y tus estructuras",Uranus:"tu necesidad de libertad",
    Neptune:"tus sueños y tu imaginación",Pluto:"tus dinámicas profundas de cambio",
    Ascendant:"tu forma de presentarte y tu cuerpo",MC:"tu dirección y tu imagen pública"
  };
  const CONN = {
    facile:["acaricia","favorece","apoya","ilumina"],
    teso:["pone a prueba","sacude","desafía","agita"],
    intenso:["enciende","carga","despierta"]
  };
  const TWIST = {
    facile:"Día en que esta parte de ti va sobre ruedas: déjate llevar.",
    teso:"Una pequeña fricción que, si la cabalgas bien, te hace dar un salto.",
    intenso:"Energía fuerte y directa: úsala con cabeza."
  };
  const MOONDAY = {
    ariete:"ganas de hacer y poca paciencia",toro:"necesidad de calma, comodidad y cosas ricas",
    gemelli:"cabeza acelerada, charlas y curiosidad",cancro:"sensibilidad a tope, ganas de nido y afectos",
    leone:"ganas de brillar y de calidez",vergine:"mente práctica, ganas de orden y detalles",
    bilancia:"búsqueda de armonía, belleza y compañía",scorpione:"emociones intensas, nada superficial",
    sagittario:"ganas de espacio, aventura y ligereza",capricorno:"concreción, ambición y cabeza en el trabajo",
    acquario:"mente libre, ideas originales e independencia",pesci:"sensibilidad e imaginación al máximo"
  };
  const VERDICT = {
    ottima:"Día con viento a favor. ✦",buona:"Buen día, con alguna oportunidad para cazar al vuelo.",
    mista:"Día con dos caras: algún empujón y alguna fricción, pero nada ingobernable.",
    intensa:"Día intenso: agarra el timón y saldrás más fuerte.",
    tranquilla:"Día tranquilo, sin grandes sacudidas: bueno para ordenar las ideas."
  };
  function pick(arr,seed){return arr[Math.abs(seed)%arr.length];}
  function sentence(a,seed){
    const flav=TFLAV[a.tKey]||"algo nuevo",area=NAREA[a.nKey]||"una parte de ti";
    const conn=pick(CONN[a.kind]||CONN.intenso,seed),rx=a.tRetro?" (retrógrado)":"";
    return `<b>${a.tGlyph} ${a.tName}${rx}</b> hoy ${conn} <b>${area}</b> (${a.nGlyph} ${a.nName}): trae ${flav}. ${TWIST[a.kind]}`;
  }
  function tone(top){let easy=0,hard=0,intense=0;top.slice(0,4).forEach(a=>{if(a.kind==="facile")easy+=a.score;else if(a.kind==="teso")hard+=a.score;else intense+=a.score;});return{easy,hard,intense};}
  function themeAspect(aspects,transitKeys,natalKeys){return aspects.find(a=>transitKeys.includes(a.tKey))||aspects.find(a=>natalKeys.includes(a.nKey));}
  function daily(natal,T){
    const seed=T.date.getDate()+T.date.getMonth(),moonSign=T.moon.sign.k,tn=tone(T.top);
    let verdict;
    if(tn.intense>tn.easy+tn.hard)verdict=VERDICT.intensa;
    else if(tn.easy>tn.hard*1.6)verdict=VERDICT.ottima;
    else if(tn.easy>tn.hard)verdict=VERDICT.buona;
    else if(tn.hard>tn.easy*1.4)verdict=VERDICT.mista;
    else if(T.top.length===0)verdict=VERDICT.tranquilla;
    else verdict=VERDICT.mista;
    const meteo=`La <b>Luna en ${T.moon.sign.n}</b> (${T.moonPhase}) marca el tono: ${MOONDAY[moonSign]}. ${verdict}`;
    const seen=new Set(),moves=[];
    for(const a of T.top){const id=a.tKey+a.nKey;if(seen.has(id))continue;seen.add(id);moves.push(sentence(a,seed+moves.length));if(moves.length>=3)break;}
    const love=themeAspect(T.aspects,["Venus","Moon"],["Venus","Moon"]);
    const work=themeAspect(T.aspects,["Saturn","Mercury","Sun"],["Saturn","MC","Mercury"]);
    const energy=themeAspect(T.aspects,["Mars","Sun"],["Mars","Sun","Ascendant"]);
    const areas={
      amore:love?`<b>Amor:</b> hoy en primer plano — ${love.kind==="teso"?"alguna tensión que limar con dulzura":love.kind==="facile"?"clima favorable, déjate llevar":"emociones intensas, vívelas a fondo"} (${love.tName} sobre tu ${love.nName}).`:`<b>Amor:</b> día tranquilo en el frente del corazón. La Luna en ${T.moon.sign.n} te pide ${MOONDAY[moonSign]}.`,
      lavoro:work?`<b>Trabajo:</b> ${work.kind==="teso"?"exige esfuerzo y concentración, pero rinde":work.kind==="facile"?"va fino, buen momento para sacar cosas adelante":"muy activo, mantén el foco"} (${work.tName} sobre tu ${work.nName}).`:`<b>Trabajo:</b> nada arrollador: buen día para despachar lo práctico.`,
      energia:energy?`<b>Energía:</b> ${energy.kind==="teso"?"alta pero nerviosa — descárgala en el deporte, no en las peleas":energy.kind==="facile"?"carga estupenda, aprovéchala":"carga fuerte y directa"} (${energy.tName} sobre tu ${energy.nName}).`:`<b>Energía:</b> en la media. Escucha el ritmo que te pide la Luna en ${T.moon.sign.n}.`
    };
    let consiglio;
    if(tn.hard>tn.easy)consiglio="Hoy las fricciones son combustible: no las esquives, úsalas para empujar. Una cosa a la vez.";
    else if(tn.easy>0)consiglio="Las puertas están entornadas: basta un pequeño gesto extra para abrirlas. Atrévete.";
    else consiglio=`Día para vivir al ritmo de la Luna en ${T.moon.sign.n}: ${MOONDAY[moonSign]}.`;
    return {verdict,meteo,moves,areas,consiglio,moonSign:T.moon.sign};
  }
  function dailyBySign(signKey, jsDate){
    const N=window.NATAL, TR=window.TRANSIT, SIGNS=N.SIGNS;
    const X=SIGNS.find(s=>s.k===signKey); if(!X) return null;
    const d=new Date(jsDate.getFullYear(),jsDate.getMonth(),jsDate.getDate(),12);
    const trans=TR.transitsAt(d), xi=SIGNS.indexOf(X);
    function aspOf(ts){const dist=((SIGNS.indexOf(ts)-xi)+12)%12;
      if(dist===0)return{n:'conjunción',k:'intenso',w:1};
      if(dist===2||dist===10)return{n:'sextil',k:'facile',w:0.6};
      if(dist===4||dist===8)return{n:'trígono',k:'facile',w:0.85};
      if(dist===3||dist===9)return{n:'cuadratura',k:'teso',w:0.8};
      if(dist===6)return{n:'oposición',k:'teso',w:0.9};
      return null;}
    const PW={Sun:0.7,Moon:0.65,Mercury:0.6,Venus:0.9,Mars:0.9,Jupiter:0.8,Saturn:0.8,Uranus:0.5,Neptune:0.5,Pluto:0.5};
    const hits=[];
    trans.forEach(tp=>{const a=aspOf(tp.sign); if(a) hits.push({tp,a,score:a.w*(PW[tp.key]||0.5)});});
    hits.sort((p,q)=>q.score-p.score);
    const sun=trans[0], moon=trans[1];
    const pa=((moon.lon-sun.lon)%360+360)%360;
    let phase='creciente';
    if(pa<10||pa>350)phase='luna nueva'; else if(pa<80)phase='creciente'; else if(pa<100)phase='cuarto creciente';
    else if(pa<170)phase='gibosa creciente'; else if(pa<190)phase='luna llena'; else if(pa<260)phase='gibosa menguante';
    else if(pa<280)phase='cuarto menguante'; else phase='menguante';
    let easy=0,hard=0,intense=0;
    hits.slice(0,4).forEach(h=>{if(h.a.k==='facile')easy+=h.score;else if(h.a.k==='teso')hard+=h.score;else intense+=h.score;});
    let verdict;
    if(intense>easy+hard)verdict=VERDICT.intensa;
    else if(easy>hard*1.6)verdict=VERDICT.ottima;
    else if(easy>hard)verdict=VERDICT.buona;
    else if(hard>easy*1.4)verdict=VERDICT.mista;
    else if(hits.length===0)verdict=VERDICT.tranquilla;
    else verdict=VERDICT.mista;
    const meteo=`La <b>Luna en ${moon.sign.n}</b> (${phase}) marca el tono: ${MOONDAY[moon.sign.k]}. ${verdict}`;
    const moves=hits.slice(0,3).map(h=>{
      const flav=TFLAV[h.tp.key]||'algo nuevo', rx=h.tp.retro?' (retrógrado)':'';
      return `<b>${h.tp.glyph} ${h.tp.name}${rx} en ${h.tp.sign.n}</b> está en ${h.a.n} con tu signo: trae ${flav}. ${TWIST[h.a.k]}`;
    });
    function domain(keys){return hits.find(h=>keys.includes(h.tp.key));}
    const love=domain(['Venus','Moon']), work=domain(['Saturn','Mars','Mercury','Sun']), energy=domain(['Mars','Sun']);
    function dl(label,h,fb){ if(!h)return `<b>${label}:</b> ${fb}`;
      const v=h.a.k==='teso'?'para gestionar con cuidado':h.a.k==='facile'?'favorecido':'encendido y en primer plano';
      return `<b>${label}:</b> ${v} — ${h.tp.name} en ${h.a.n} con tu signo.`; }
    const areas={
      amore:dl('Amor',love,`día tranquilo en el frente del corazón. La Luna en ${moon.sign.n} te pide ${MOONDAY[moon.sign.k]}.`),
      lavoro:dl('Trabajo',work,'nada arrollador: buen día para despachar lo práctico.'),
      energia:dl('Energía',energy,`en la media. Escucha el ritmo de la Luna en ${moon.sign.n}.`)
    };
    let consiglio;
    if(hard>easy)consiglio='Hoy hay alguna fricción: úsala como impulso, una cosa a la vez.';
    else if(easy>0)consiglio='Día con puertas entornadas: un pequeño gesto extra y se abren. Atrévete.';
    else consiglio=`Día para vivir al ritmo de la Luna en ${moon.sign.n}: ${MOONDAY[moon.sign.k]}.`;
    return {verdict,meteo,moves,areas,consiglio,moonSign:moon.sign,sign:X,bySign:true};
  }
  window.HOROSCOPE_ES={daily,dailyBySign};
})();
