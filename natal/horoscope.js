(function () {
  const TFLAV = {
    Sun:"luce, focus e voglia di farti notare",Moon:"umore e bisogni che cambiano in fretta",
    Mercury:"pensieri veloci, messaggi e parole",Venus:"dolcezza, piacere e voglia di bellezza",
    Mars:"spinta, grinta e un pizzico di attrito",Jupiter:"apertura, fiducia e occasioni",
    Saturn:"serietà, prove e senso di responsabilità",Uranus:"imprevisti e voglia di rompere gli schemi",
    Neptune:"sogno, ispirazione e un velo di nebbia",Pluto:"intensità e trasformazione profonda"
  };
  const NAREA = {
    Sun:"la tua identità e la tua vitalità",Moon:"le tue emozioni e il bisogno di sentirti al sicuro",
    Mercury:"la tua mente e il modo di comunicare",Venus:"i tuoi affetti, il piacere e le relazioni",
    Mars:"la tua spinta ad agire e i tuoi desideri",Jupiter:"la tua voglia di crescere ed espanderti",
    Saturn:"i tuoi impegni e le tue strutture",Uranus:"il tuo bisogno di libertà",
    Neptune:"i tuoi sogni e la tua immaginazione",Pluto:"le tue dinamiche profonde di cambiamento",
    Ascendant:"il modo in cui ti presenti e il tuo corpo",MC:"la tua direzione e la tua immagine pubblica"
  };
  const CONN = {
    facile:["accarezza","favorisce","sostiene","illumina"],
    teso:["mette alla prova","scuote","sfida","agita"],
    intenso:["accende","carica","risveglia"]
  };
  const TWIST = {
    facile:"Giornata in cui questa parte di te fila liscia: assecondala.",
    teso:"Una piccola frizione che, se la cavalchi bene, ti fa fare un salto.",
    intenso:"Energia forte e diretta: usala con consapevolezza."
  };
  const MOONDAY = {
    ariete:"voglia di fare e poca pazienza",toro:"bisogno di calma, comfort e cose buone",
    gemelli:"testa che corre, chiacchiere e curiosità",cancro:"sensibilità su, voglia di nido e affetti",
    leone:"voglia di brillare e di calore",vergine:"mente pratica, voglia di ordine e dettagli",
    bilancia:"ricerca di armonia, bellezza e compagnia",scorpione:"emozioni intense, niente superficiale",
    sagittario:"voglia di spazio, avventura e leggerezza",capricorno:"concretezza, ambizione e testa sul lavoro",
    acquario:"mente libera, idee originali e indipendenza",pesci:"sensibilità e immaginazione al massimo"
  };
  const VERDICT = {
    ottima:"Giornata col vento in poppa. ✦",buona:"Bella giornata, con qualche occasione da prendere al volo.",
    mista:"Giornata a due facce: qualche spinta e qualche frizione, ma niente di ingestibile.",
    intensa:"Giornata intensa: tieni il timone, e ne esci più forte.",
    tranquilla:"Giornata tranquilla, senza grandi scosse: buona per riordinare le idee."
  };
  function pick(arr,seed){return arr[Math.abs(seed)%arr.length];}
  function sentence(a,seed){
    const flav=TFLAV[a.tKey]||"qualcosa di nuovo",area=NAREA[a.nKey]||"una parte di te";
    const conn=pick(CONN[a.kind]||CONN.intenso,seed),rx=a.tRetro?" (retrogrado)":"";
    return `<b>${a.tGlyph} ${a.tName}${rx}</b> oggi ${conn} <b>${area}</b> (${a.nGlyph} ${a.nName}): porta ${flav}. ${TWIST[a.kind]}`;
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
    const meteo=`La <b>Luna in ${T.moon.sign.n}</b> (${T.moonPhase}) dà il tono: ${MOONDAY[moonSign]}. ${verdict}`;
    const seen=new Set(),moves=[];
    for(const a of T.top){const id=a.tKey+a.nKey;if(seen.has(id))continue;seen.add(id);moves.push(sentence(a,seed+moves.length));if(moves.length>=3)break;}
    const love=themeAspect(T.aspects,["Venus","Moon"],["Venus","Moon"]);
    const work=themeAspect(T.aspects,["Saturn","Mercury","Sun"],["Saturn","MC","Mercury"]);
    const energy=themeAspect(T.aspects,["Mars","Sun"],["Mars","Sun","Ascendant"]);
    const areas={
      amore:love?`<b>Amore:</b> in primo piano oggi — ${love.kind==="teso"?"qualche tensione da smussare con dolcezza":love.kind==="facile"?"clima favorevole, lasciati andare":"emozioni intense, vivile pienamente"} (${love.tName} sul tuo ${love.nName}).`:`<b>Amore:</b> giornata tranquilla sul fronte cuore. La Luna in ${T.moon.sign.n} ti chiede ${MOONDAY[moonSign]}.`,
      lavoro:work?`<b>Lavoro:</b> ${work.kind==="teso"?"richiede impegno e concentrazione, ma rende":work.kind==="facile"?"fila bene, buon momento per portare avanti le cose":"molto attivo, tieni il focus"} (${work.tName} sul tuo ${work.nName}).`:`<b>Lavoro:</b> niente di travolgente: buona giornata per sbrigare il pratico.`,
      energia:energy?`<b>Energia:</b> ${energy.kind==="teso"?"alta ma nervosa — sfogala nello sport, non nei litigi":energy.kind==="facile"?"ottima carica, sfruttala":"carica forte e diretta"} (${energy.tName} sul tuo ${energy.nName}).`:`<b>Energia:</b> nella media. Ascolta il ritmo che ti chiede la Luna in ${T.moon.sign.n}.`
    };
    let consiglio;
    if(tn.hard>tn.easy)consiglio="Oggi le frizioni sono carburante: non evitarle, usale per spingere. Una cosa alla volta.";
    else if(tn.easy>0)consiglio="Le porte sono socchiuse: basta un piccolo gesto in più per farle aprire. Osa.";
    else consiglio=`Giornata da vivere col ritmo della Luna in ${T.moon.sign.n}: ${MOONDAY[moonSign]}.`;
    return {verdict,meteo,moves,areas,consiglio,moonSign:T.moon.sign};
  }
  function dailyBySign(signKey, jsDate){
    const N=window.NATAL, TR=window.TRANSIT, SIGNS=N.SIGNS;
    const X=SIGNS.find(s=>s.k===signKey); if(!X) return null;
    const d=new Date(jsDate.getFullYear(),jsDate.getMonth(),jsDate.getDate(),12);
    const trans=TR.transitsAt(d), xi=SIGNS.indexOf(X);
    function aspOf(ts){const dist=((SIGNS.indexOf(ts)-xi)+12)%12;
      if(dist===0)return{n:'congiunzione',k:'intenso',w:1};
      if(dist===2||dist===10)return{n:'sestile',k:'facile',w:0.6};
      if(dist===4||dist===8)return{n:'trigono',k:'facile',w:0.85};
      if(dist===3||dist===9)return{n:'quadrato',k:'teso',w:0.8};
      if(dist===6)return{n:'opposizione',k:'teso',w:0.9};
      return null;}
    const PW={Sun:0.7,Moon:0.65,Mercury:0.6,Venus:0.9,Mars:0.9,Jupiter:0.8,Saturn:0.8,Uranus:0.5,Neptune:0.5,Pluto:0.5};
    const hits=[];
    trans.forEach(tp=>{const a=aspOf(tp.sign); if(a) hits.push({tp,a,score:a.w*(PW[tp.key]||0.5)});});
    hits.sort((p,q)=>q.score-p.score);
    const sun=trans[0], moon=trans[1];
    const pa=((moon.lon-sun.lon)%360+360)%360;
    let phase='crescente';
    if(pa<10||pa>350)phase='luna nuova'; else if(pa<80)phase='crescente'; else if(pa<100)phase='primo quarto';
    else if(pa<170)phase='gibbosa crescente'; else if(pa<190)phase='luna piena'; else if(pa<260)phase='gibbosa calante';
    else if(pa<280)phase='ultimo quarto'; else phase='calante';
    let easy=0,hard=0,intense=0;
    hits.slice(0,4).forEach(h=>{if(h.a.k==='facile')easy+=h.score;else if(h.a.k==='teso')hard+=h.score;else intense+=h.score;});
    let verdict;
    if(intense>easy+hard)verdict=VERDICT.intensa;
    else if(easy>hard*1.6)verdict=VERDICT.ottima;
    else if(easy>hard)verdict=VERDICT.buona;
    else if(hard>easy*1.4)verdict=VERDICT.mista;
    else if(hits.length===0)verdict=VERDICT.tranquilla;
    else verdict=VERDICT.mista;
    const meteo=`La <b>Luna in ${moon.sign.n}</b> (${phase}) dà il tono: ${MOONDAY[moon.sign.k]}. ${verdict}`;
    const moves=hits.slice(0,3).map(h=>{
      const flav=TFLAV[h.tp.key]||'qualcosa di nuovo', rx=h.tp.retro?' (retrogrado)':'';
      return `<b>${h.tp.glyph} ${h.tp.name}${rx} in ${h.tp.sign.n}</b> è in ${h.a.n} col tuo segno: porta ${flav}. ${TWIST[h.a.k]}`;
    });
    function domain(keys){return hits.find(h=>keys.includes(h.tp.key));}
    const love=domain(['Venus','Moon']), work=domain(['Saturn','Mars','Mercury','Sun']), energy=domain(['Mars','Sun']);
    function dl(label,h,fb){ if(!h)return `<b>${label}:</b> ${fb}`;
      const v=h.a.k==='teso'?'da gestire con cura':h.a.k==='facile'?'favorito':'acceso e in primo piano';
      return `<b>${label}:</b> ${v} — ${h.tp.name} in ${h.a.n} col tuo segno.`; }
    const areas={
      amore:dl('Amore',love,`giornata tranquilla sul fronte cuore. La Luna in ${moon.sign.n} ti chiede ${MOONDAY[moon.sign.k]}.`),
      lavoro:dl('Lavoro',work,'niente di travolgente: buona giornata per sbrigare il pratico.'),
      energia:dl('Energia',energy,`nella media. Ascolta il ritmo della Luna in ${moon.sign.n}.`)
    };
    let consiglio;
    if(hard>easy)consiglio='Oggi qualche frizione: usala come spinta, una cosa alla volta.';
    else if(easy>0)consiglio='Giornata con porte socchiuse: un piccolo gesto in più e si aprono. Osa.';
    else consiglio=`Giornata da vivere col ritmo della Luna in ${moon.sign.n}: ${MOONDAY[moon.sign.k]}.`;
    return {verdict,meteo,moves,areas,consiglio,moonSign:moon.sign,sign:X,bySign:true};
  }
  window.HOROSCOPE={daily,dailyBySign};
})();
