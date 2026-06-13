(function () {
  const TFLAV = {
    Sun:"Licht, Fokus und Lust, im Rampenlicht zu stehen",Moon:"Stimmungen und Bedürfnisse, die im Stundentakt wechseln",
    Mercury:"schnelle Gedanken, Nachrichten und Worte",Venus:"Süße, Genuss und Hunger nach Schönheit",
    Mars:"Antrieb, Biss und eine Prise Reibung",Jupiter:"Offenheit, Zuversicht und Chancen",
    Saturn:"Ernst, Prüfungen und ein Sinn für Verantwortung",Uranus:"Überraschungen und die Lust, aus der Reihe zu tanzen",
    Neptune:"Träume, Inspiration und ein Schleier aus Nebel",Pluto:"Intensität und tiefe Verwandlung"
  };
  const NAREA = {
    Sun:"deine Identität und deine Vitalität",Moon:"deine Gefühle und dein Bedürfnis, dich sicher zu fühlen",
    Mercury:"deinen Kopf und die Art, wie du kommunizierst",Venus:"deine Zuneigung, den Genuss und die Beziehungen",
    Mars:"deinen Tatendrang und deine Wünsche",Jupiter:"deine Lust zu wachsen und dich auszudehnen",
    Saturn:"deine Verpflichtungen und deine Strukturen",Uranus:"dein Bedürfnis nach Freiheit",
    Neptune:"deine Träume und deine Fantasie",Pluto:"deine tiefen Strömungen der Veränderung",
    Ascendant:"die Art, wie du auftrittst, und deinen Körper",MC:"deine Richtung und dein öffentliches Bild"
  };
  const CONN = {
    facile:["streichelt","begünstigt","unterstützt","erhellt"],
    teso:["stellt auf die Probe","rüttelt an","fordert heraus","wirbelt auf"],
    intenso:["entzündet","lädt auf","weckt"]
  };
  const TWIST = {
    facile:"Ein Tag, an dem dieser Teil von dir locker läuft: lass dich treiben.",
    teso:"Eine kleine Reibung, die dich, gut gesurft, ein Level höher bringt.",
    intenso:"Starke, direkte Energie: nutze sie bewusst."
  };
  const MOONDAY = {
    ariete:"Tatendrang und wenig Geduld",toro:"Lust auf Ruhe, Komfort und schöne Dinge",
    gemelli:"Kopf auf Hochtouren, Geplauder und Neugier",cancro:"Sensibilität ganz oben, Lust auf Nest und liebe Menschen",
    leone:"Lust zu strahlen und auf menschliche Wärme",vergine:"praktischer Kopf, Lust auf Ordnung und Details",
    bilancia:"Suche nach Harmonie, Schönheit und Gesellschaft",scorpione:"intensive Gefühle, nichts Oberflächliches erlaubt",
    sagittario:"Lust auf Weite, Abenteuer und Leichtigkeit",capricorno:"Bodenständigkeit, Ehrgeiz und Kopf im Arbeitsmodus",
    acquario:"freier Kopf, originelle Ideen und Unabhängigkeit",pesci:"Sensibilität und Fantasie auf voller Lautstärke"
  };
  const VERDICT = {
    ottima:"Ein Tag mit Rückenwind. ✦",buona:"Ein schöner Tag, mit ein paar Chancen, die man im Flug schnappen sollte.",
    mista:"Ein Tag mit zwei Gesichtern: etwas Rückenwind, etwas Reibung – nichts, was du nicht schaffst.",
    intensa:"Ein intensiver Tag: bleib am Steuer, und du gehst gestärkt daraus hervor.",
    tranquilla:"Ein ruhiger Tag, ohne große Ruckler: gut, um die Gedanken zu ordnen."
  };
  function pick(arr,seed){return arr[Math.abs(seed)%arr.length];}
  function sentence(a,seed){
    const flav=TFLAV[a.tKey]||"etwas Neues",area=NAREA[a.nKey]||"einen Teil von dir";
    const conn=pick(CONN[a.kind]||CONN.intenso,seed),rx=a.tRetro?" (rückläufig)":"";
    return `<b>${a.tGlyph} ${a.tName}${rx}</b> ${conn} heute <b>${area}</b> (${a.nGlyph} ${a.nName}): bringt ${flav}. ${TWIST[a.kind]}`;
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
    const meteo=`Der <b>Mond im ${T.moon.sign.n}</b> (${T.moonPhase}) gibt den Ton an: ${MOONDAY[moonSign]}. ${verdict}`;
    const seen=new Set(),moves=[];
    for(const a of T.top){const id=a.tKey+a.nKey;if(seen.has(id))continue;seen.add(id);moves.push(sentence(a,seed+moves.length));if(moves.length>=3)break;}
    const love=themeAspect(T.aspects,["Venus","Moon"],["Venus","Moon"]);
    const work=themeAspect(T.aspects,["Saturn","Mercury","Sun"],["Saturn","MC","Mercury"]);
    const energy=themeAspect(T.aspects,["Mars","Sun"],["Mars","Sun","Ascendant"]);
    const areas={
      amore:love?`<b>Liebe:</b> heute im Vordergrund – ${love.kind==="teso"?"etwas Spannung, die du mit Süße glätten kannst":love.kind==="facile"?"das Klima spielt für dich, lass es laufen":"intensive Gefühle, lebe sie voll aus"} (${love.tName} auf deiner ${love.nName}).`:`<b>Liebe:</b> ein ruhiger Tag an der Herzensfront. Der Mond im ${T.moon.sign.n} verlangt von dir ${MOONDAY[moonSign]}.`,
      lavoro:work?`<b>Arbeit:</b> ${work.kind==="teso"?"verlangt Einsatz und Konzentration, zahlt sich aber aus":work.kind==="facile"?"läuft rund – ein guter Moment, um Dinge voranzutreiben":"sehr aktiv, bleib fokussiert"} (${work.tName} auf deiner ${work.nName}).`:`<b>Arbeit:</b> nichts Weltbewegendes: ein guter Tag, um das Praktische abzuhaken.`,
      energia:energy?`<b>Energie:</b> ${energy.kind==="teso"?"hoch, aber nervös – verbrenne sie im Sport, nicht im Streit":energy.kind==="facile"?"großartige Ladung, nutze sie aus":"eine starke, direkte Ladung"} (${energy.tName} auf deiner ${energy.nName}).`:`<b>Energie:</b> im Mittelmaß. Hör auf den Rhythmus, den der Mond im ${T.moon.sign.n} verlangt.`
    };
    let consiglio;
    if(tn.hard>tn.easy)consiglio="Heute ist Reibung Treibstoff: weich ihr nicht aus, nutze sie zum Vorankommen. Eins nach dem anderen.";
    else if(tn.easy>0)consiglio="Die Türen stehen einen Spalt offen: ein kleiner Extra-Schritt und sie schwingen auf. Wag es.";
    else consiglio=`Ein Tag, um im Rhythmus des Mondes im ${T.moon.sign.n} zu leben: ${MOONDAY[moonSign]}.`;
    return {verdict,meteo,moves,areas,consiglio,moonSign:T.moon.sign};
  }
  function dailyBySign(signKey, jsDate){
    const N=window.NATAL, TR=window.TRANSIT, SIGNS=N.SIGNS;
    const X=SIGNS.find(s=>s.k===signKey); if(!X) return null;
    const d=new Date(jsDate.getFullYear(),jsDate.getMonth(),jsDate.getDate(),12);
    const trans=TR.transitsAt(d), xi=SIGNS.indexOf(X);
    function aspOf(ts){const dist=((SIGNS.indexOf(ts)-xi)+12)%12;
      if(dist===0)return{n:'Konjunktion',k:'intenso',w:1};
      if(dist===2||dist===10)return{n:'Sextil',k:'facile',w:0.6};
      if(dist===4||dist===8)return{n:'Trigon',k:'facile',w:0.85};
      if(dist===3||dist===9)return{n:'Quadrat',k:'teso',w:0.8};
      if(dist===6)return{n:'Opposition',k:'teso',w:0.9};
      return null;}
    const PW={Sun:0.7,Moon:0.65,Mercury:0.6,Venus:0.9,Mars:0.9,Jupiter:0.8,Saturn:0.8,Uranus:0.5,Neptune:0.5,Pluto:0.5};
    const hits=[];
    trans.forEach(tp=>{const a=aspOf(tp.sign); if(a) hits.push({tp,a,score:a.w*(PW[tp.key]||0.5)});});
    hits.sort((p,q)=>q.score-p.score);
    const sun=trans[0], moon=trans[1];
    const pa=((moon.lon-sun.lon)%360+360)%360;
    let phase='zunehmend';
    if(pa<10||pa>350)phase='Neumond'; else if(pa<80)phase='zunehmend'; else if(pa<100)phase='erstes Viertel';
    else if(pa<170)phase='zunehmender Mond'; else if(pa<190)phase='Vollmond'; else if(pa<260)phase='abnehmender Mond';
    else if(pa<280)phase='letztes Viertel'; else phase='abnehmend';
    let easy=0,hard=0,intense=0;
    hits.slice(0,4).forEach(h=>{if(h.a.k==='facile')easy+=h.score;else if(h.a.k==='teso')hard+=h.score;else intense+=h.score;});
    let verdict;
    if(intense>easy+hard)verdict=VERDICT.intensa;
    else if(easy>hard*1.6)verdict=VERDICT.ottima;
    else if(easy>hard)verdict=VERDICT.buona;
    else if(hard>easy*1.4)verdict=VERDICT.mista;
    else if(hits.length===0)verdict=VERDICT.tranquilla;
    else verdict=VERDICT.mista;
    const meteo=`Der <b>Mond im ${moon.sign.n}</b> (${phase}) gibt den Ton an: ${MOONDAY[moon.sign.k]}. ${verdict}`;
    const moves=hits.slice(0,3).map(h=>{
      const flav=TFLAV[h.tp.key]||'etwas Neues', rx=h.tp.retro?' (rückläufig)':'';
      return `<b>${h.tp.glyph} ${h.tp.name}${rx} im ${h.tp.sign.n}</b> steht in ${h.a.n} mit deinem Sternzeichen: bringt ${flav}. ${TWIST[h.a.k]}`;
    });
    function domain(keys){return hits.find(h=>keys.includes(h.tp.key));}
    const love=domain(['Venus','Moon']), work=domain(['Saturn','Mars','Mercury','Sun']), energy=domain(['Mars','Sun']);
    function dl(label,h,fb){ if(!h)return `<b>${label}:</b> ${fb}`;
      const v=h.a.k==='teso'?'mit Sorgfalt zu handhaben':h.a.k==='facile'?'begünstigt':'entflammt und im Vordergrund';
      return `<b>${label}:</b> ${v} – ${h.tp.name} in ${h.a.n} mit deinem Sternzeichen.`; }
    const areas={
      amore:dl('Liebe',love,`ein ruhiger Tag an der Herzensfront. Der Mond im ${moon.sign.n} verlangt von dir ${MOONDAY[moon.sign.k]}.`),
      lavoro:dl('Arbeit',work,'nichts Weltbewegendes: ein guter Tag, um das Praktische abzuhaken.'),
      energia:dl('Energie',energy,`im Mittelmaß. Hör auf den Rhythmus des Mondes im ${moon.sign.n}.`)
    };
    let consiglio;
    if(hard>easy)consiglio='Heute gibt es die ein oder andere Reibung: nutze sie als Antrieb, eins nach dem anderen.';
    else if(easy>0)consiglio='Ein Tag mit halb offenen Türen: ein kleiner Extra-Schritt und sie öffnen sich. Wag es.';
    else consiglio=`Ein Tag, um im Rhythmus des Mondes im ${moon.sign.n} zu leben: ${MOONDAY[moon.sign.k]}.`;
    return {verdict,meteo,moves,areas,consiglio,moonSign:moon.sign,sign:X,bySign:true};
  }
  window.HOROSCOPE_DE={daily,dailyBySign};
})();
