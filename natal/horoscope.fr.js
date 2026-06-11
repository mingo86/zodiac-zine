(function () {
  const TFLAV = {
    Sun:"de la lumière, du focus et l'envie de te faire remarquer",Moon:"une humeur et des besoins qui changent vite",
    Mercury:"des pensées rapides, des messages et des mots",Venus:"de la douceur, du plaisir et une envie de beauté",
    Mars:"de l'élan, du mordant et une pointe de friction",Jupiter:"de l'ouverture, de la confiance et des occasions",
    Saturn:"du sérieux, des épreuves et le sens des responsabilités",Uranus:"des imprévus et l'envie de casser les codes",
    Neptune:"du rêve, de l'inspiration et un voile de brume",Pluto:"de l'intensité et une transformation profonde"
  };
  const NAREA = {
    Sun:"ton identité et ta vitalité",Moon:"tes émotions et ton besoin de te sentir en sécurité",
    Mercury:"ton esprit et ta façon de communiquer",Venus:"tes affections, le plaisir et les relations",
    Mars:"ton envie d'agir et tes désirs",Jupiter:"ton envie de grandir et de t'étendre",
    Saturn:"tes engagements et tes structures",Uranus:"ton besoin de liberté",
    Neptune:"tes rêves et ton imagination",Pluto:"tes dynamiques profondes de changement",
    Ascendant:"ta façon de te présenter et ton corps",MC:"ta direction et ton image publique"
  };
  const CONN = {
    facile:["caresse","favorise","soutient","illumine"],
    teso:["met à l'épreuve","secoue","défie","agite"],
    intenso:["allume","charge","réveille"]
  };
  const TWIST = {
    facile:"Une journée où cette partie de toi roule toute seule : laisse-la faire.",
    teso:"Une petite friction qui, bien chevauchée, te fait faire un bond en avant.",
    intenso:"Une énergie forte et directe : utilise-la en conscience."
  };
  const MOONDAY = {
    ariete:"envie d'agir et peu de patience",toro:"besoin de calme, de confort et de bonnes choses",
    gemelli:"tête qui court, bavardages et curiosité",cancro:"sensibilité en hausse, envie de nid et de tendresse",
    leone:"envie de briller et de chaleur",vergine:"esprit pratique, envie d'ordre et de détails",
    bilancia:"quête d'harmonie, de beauté et de compagnie",scorpione:"émotions intenses, rien de superficiel",
    sagittario:"envie d'espace, d'aventure et de légèreté",capricorno:"du concret, de l'ambition et la tête au travail",
    acquario:"esprit libre, idées originales et indépendance",pesci:"sensibilité et imagination au maximum"
  };
  const VERDICT = {
    ottima:"Journée vent en poupe. ✦",buona:"Belle journée, avec quelques occasions à saisir au vol.",
    mista:"Journée à deux visages : quelques coups de pouce et quelques frictions, mais rien d'ingérable.",
    intensa:"Journée intense : garde le cap, et tu en sors plus fort.",
    tranquilla:"Journée tranquille, sans grandes secousses : parfaite pour remettre de l'ordre dans tes idées."
  };
  function pick(arr,seed){return arr[Math.abs(seed)%arr.length];}
  function sentence(a,seed){
    const flav=TFLAV[a.tKey]||"quelque chose de nouveau",area=NAREA[a.nKey]||"une partie de toi";
    const conn=pick(CONN[a.kind]||CONN.intenso,seed),rx=a.tRetro?" (rétrograde)":"";
    return `<b>${a.tGlyph} ${a.tName}${rx}</b> aujourd'hui ${conn} <b>${area}</b> (${a.nGlyph} ${a.nName}) : ça apporte ${flav}. ${TWIST[a.kind]}`;
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
    const meteo=`La <b>Lune en ${T.moon.sign.n}</b> (${T.moonPhase}) donne le ton : ${MOONDAY[moonSign]}. ${verdict}`;
    const seen=new Set(),moves=[];
    for(const a of T.top){const id=a.tKey+a.nKey;if(seen.has(id))continue;seen.add(id);moves.push(sentence(a,seed+moves.length));if(moves.length>=3)break;}
    const love=themeAspect(T.aspects,["Venus","Moon"],["Venus","Moon"]);
    const work=themeAspect(T.aspects,["Saturn","Mercury","Sun"],["Saturn","MC","Mercury"]);
    const energy=themeAspect(T.aspects,["Mars","Sun"],["Mars","Sun","Ascendant"]);
    const areas={
      amore:love?`<b>Amour :</b> au premier plan aujourd'hui — ${love.kind==="teso"?"quelques tensions à arrondir avec douceur":love.kind==="facile"?"climat favorable, laisse-toi aller":"émotions intenses, vis-les pleinement"} (${love.tName} sur ton ${love.nName}).`:`<b>Amour :</b> journée tranquille côté cœur. La Lune en ${T.moon.sign.n} te demande ${MOONDAY[moonSign]}.`,
      lavoro:work?`<b>Travail :</b> ${work.kind==="teso"?"ça demande effort et concentration, mais ça paie":work.kind==="facile"?"ça roule, bon moment pour faire avancer les choses":"très actif, garde le focus"} (${work.tName} sur ton ${work.nName}).`:`<b>Travail :</b> rien de renversant : une bonne journée pour expédier le pratique.`,
      energia:energy?`<b>Énergie :</b> ${energy.kind==="teso"?"haute mais nerveuse — défoule-la dans le sport, pas dans les disputes":energy.kind==="facile"?"excellente charge, profites-en":"une charge forte et directe"} (${energy.tName} sur ton ${energy.nName}).`:`<b>Énergie :</b> dans la moyenne. Écoute le rythme que te demande la Lune en ${T.moon.sign.n}.`
    };
    let consiglio;
    if(tn.hard>tn.easy)consiglio="Aujourd'hui les frictions sont du carburant : ne les évite pas, sers-t'en pour pousser. Une chose à la fois.";
    else if(tn.easy>0)consiglio="Les portes sont entrouvertes : un petit geste de plus et elles s'ouvrent en grand. Ose.";
    else consiglio=`Une journée à vivre au rythme de la Lune en ${T.moon.sign.n} : ${MOONDAY[moonSign]}.`;
    return {verdict,meteo,moves,areas,consiglio,moonSign:T.moon.sign};
  }
  function dailyBySign(signKey, jsDate){
    const N=window.NATAL, TR=window.TRANSIT, SIGNS=N.SIGNS;
    const X=SIGNS.find(s=>s.k===signKey); if(!X) return null;
    const d=new Date(jsDate.getFullYear(),jsDate.getMonth(),jsDate.getDate(),12);
    const trans=TR.transitsAt(d), xi=SIGNS.indexOf(X);
    function aspOf(ts){const dist=((SIGNS.indexOf(ts)-xi)+12)%12;
      if(dist===0)return{n:'conjonction',k:'intenso',w:1};
      if(dist===2||dist===10)return{n:'sextile',k:'facile',w:0.6};
      if(dist===4||dist===8)return{n:'trigone',k:'facile',w:0.85};
      if(dist===3||dist===9)return{n:'carré',k:'teso',w:0.8};
      if(dist===6)return{n:'opposition',k:'teso',w:0.9};
      return null;}
    const PW={Sun:0.7,Moon:0.65,Mercury:0.6,Venus:0.9,Mars:0.9,Jupiter:0.8,Saturn:0.8,Uranus:0.5,Neptune:0.5,Pluto:0.5};
    const hits=[];
    trans.forEach(tp=>{const a=aspOf(tp.sign); if(a) hits.push({tp,a,score:a.w*(PW[tp.key]||0.5)});});
    hits.sort((p,q)=>q.score-p.score);
    const sun=trans[0], moon=trans[1];
    const pa=((moon.lon-sun.lon)%360+360)%360;
    let phase='croissante';
    if(pa<10||pa>350)phase='nouvelle lune'; else if(pa<80)phase='croissante'; else if(pa<100)phase='premier quartier';
    else if(pa<170)phase='gibbeuse croissante'; else if(pa<190)phase='pleine lune'; else if(pa<260)phase='gibbeuse décroissante';
    else if(pa<280)phase='dernier quartier'; else phase='décroissante';
    let easy=0,hard=0,intense=0;
    hits.slice(0,4).forEach(h=>{if(h.a.k==='facile')easy+=h.score;else if(h.a.k==='teso')hard+=h.score;else intense+=h.score;});
    let verdict;
    if(intense>easy+hard)verdict=VERDICT.intensa;
    else if(easy>hard*1.6)verdict=VERDICT.ottima;
    else if(easy>hard)verdict=VERDICT.buona;
    else if(hard>easy*1.4)verdict=VERDICT.mista;
    else if(hits.length===0)verdict=VERDICT.tranquilla;
    else verdict=VERDICT.mista;
    const meteo=`La <b>Lune en ${moon.sign.n}</b> (${phase}) donne le ton : ${MOONDAY[moon.sign.k]}. ${verdict}`;
    const moves=hits.slice(0,3).map(h=>{
      const flav=TFLAV[h.tp.key]||'quelque chose de nouveau', rx=h.tp.retro?' (rétrograde)':'';
      return `<b>${h.tp.glyph} ${h.tp.name}${rx} en ${h.tp.sign.n}</b> est en ${h.a.n} avec ton signe : ça apporte ${flav}. ${TWIST[h.a.k]}`;
    });
    function domain(keys){return hits.find(h=>keys.includes(h.tp.key));}
    const love=domain(['Venus','Moon']), work=domain(['Saturn','Mars','Mercury','Sun']), energy=domain(['Mars','Sun']);
    function dl(label,h,fb){ if(!h)return `<b>${label} :</b> ${fb}`;
      const v=h.a.k==='teso'?'à gérer avec soin':h.a.k==='facile'?'favorisé':'allumé et au premier plan';
      return `<b>${label} :</b> ${v} — ${h.tp.name} en ${h.a.n} avec ton signe.`; }
    const areas={
      amore:dl('Amour',love,`journée tranquille côté cœur. La Lune en ${moon.sign.n} te demande ${MOONDAY[moon.sign.k]}.`),
      lavoro:dl('Travail',work,'rien de renversant : une bonne journée pour expédier le pratique.'),
      energia:dl('Énergie',energy,`dans la moyenne. Écoute le rythme de la Lune en ${moon.sign.n}.`)
    };
    let consiglio;
    if(hard>easy)consiglio="Quelques frictions aujourd'hui : sers-t'en comme moteur, une chose à la fois.";
    else if(easy>0)consiglio="Une journée aux portes entrouvertes : un petit geste de plus et elles s'ouvrent. Ose.";
    else consiglio=`Une journée à vivre au rythme de la Lune en ${moon.sign.n} : ${MOONDAY[moon.sign.k]}.`;
    return {verdict,meteo,moves,areas,consiglio,moonSign:moon.sign,sign:X,bySign:true};
  }
  window.HOROSCOPE_FR={daily,dailyBySign};
})();
