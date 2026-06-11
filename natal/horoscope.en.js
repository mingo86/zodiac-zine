(function () {
  const TFLAV = {
    Sun:"light, focus and a craving for the spotlight",Moon:"moods and needs that change by the hour",
    Mercury:"fast thoughts, messages and words",Venus:"sweetness, pleasure and a hunger for beauty",
    Mars:"drive, grit and a pinch of friction",Jupiter:"openness, confidence and opportunities",
    Saturn:"seriousness, tests and a sense of responsibility",Uranus:"surprises and the urge to break the mold",
    Neptune:"dreams, inspiration and a veil of fog",Pluto:"intensity and deep transformation"
  };
  const NAREA = {
    Sun:"your identity and your vitality",Moon:"your emotions and your need to feel safe",
    Mercury:"your mind and the way you communicate",Venus:"your affections, pleasure and relationships",
    Mars:"your drive to act and your desires",Jupiter:"your urge to grow and expand",
    Saturn:"your commitments and your structures",Uranus:"your need for freedom",
    Neptune:"your dreams and your imagination",Pluto:"your deep currents of change",
    Ascendant:"the way you show up and your body",MC:"your direction and your public image"
  };
  const CONN = {
    facile:["caresses","favors","supports","lights up"],
    teso:["tests","shakes","challenges","stirs up"],
    intenso:["ignites","charges","awakens"]
  };
  const TWIST = {
    facile:"A day when this part of you runs smoothly: go with it.",
    teso:"A little friction that, ridden well, makes you level up.",
    intenso:"Strong, direct energy: use it consciously."
  };
  const MOONDAY = {
    ariete:"itching to act, short on patience",toro:"craving calm, comfort and good things",
    gemelli:"a racing mind, chatter and curiosity",cancro:"sensitivity dialed up, craving nest and loved ones",
    leone:"a craving to shine and feel warmth",vergine:"a practical mind, craving order and details",
    bilancia:"seeking harmony, beauty and company",scorpione:"intense emotions, nothing superficial allowed",
    sagittario:"craving space, adventure and lightness",capricorno:"groundedness, ambition and a work-mode brain",
    acquario:"a free mind, original ideas and independence",pesci:"sensitivity and imagination at full volume"
  };
  const VERDICT = {
    ottima:"A day with the wind at your back. ✦",buona:"A good day, with a few chances worth grabbing on the fly.",
    mista:"A two-faced day: some tailwind, some friction — nothing you can't handle.",
    intensa:"An intense day: keep your hand on the wheel and you'll come out stronger.",
    tranquilla:"A quiet day, no big jolts: good for tidying up your thoughts."
  };
  function pick(arr,seed){return arr[Math.abs(seed)%arr.length];}
  function sentence(a,seed){
    const flav=TFLAV[a.tKey]||"something new",area=NAREA[a.nKey]||"a part of you";
    const conn=pick(CONN[a.kind]||CONN.intenso,seed),rx=a.tRetro?" (retrograde)":"";
    return `<b>${a.tGlyph} ${a.tName}${rx}</b> today ${conn} <b>${area}</b> (${a.nGlyph} ${a.nName}): it brings ${flav}. ${TWIST[a.kind]}`;
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
    const meteo=`The <b>Moon in ${T.moon.sign.n}</b> (${T.moonPhase}) sets the tone: ${MOONDAY[moonSign]}. ${verdict}`;
    const seen=new Set(),moves=[];
    for(const a of T.top){const id=a.tKey+a.nKey;if(seen.has(id))continue;seen.add(id);moves.push(sentence(a,seed+moves.length));if(moves.length>=3)break;}
    const love=themeAspect(T.aspects,["Venus","Moon"],["Venus","Moon"]);
    const work=themeAspect(T.aspects,["Saturn","Mercury","Sun"],["Saturn","MC","Mercury"]);
    const energy=themeAspect(T.aspects,["Mars","Sun"],["Mars","Sun","Ascendant"]);
    const areas={
      amore:love?`<b>Love:</b> front and center today — ${love.kind==="teso"?"a little tension to smooth out with sweetness":love.kind==="facile"?"the climate is in your favor, let yourself go":"intense emotions, live them fully"} (${love.tName} on your ${love.nName}).`:`<b>Love:</b> a quiet day on the heart front. The Moon in ${T.moon.sign.n} asks you for ${MOONDAY[moonSign]}.`,
      lavoro:work?`<b>Work:</b> ${work.kind==="teso"?"demands effort and focus, but it pays off":work.kind==="facile"?"runs smoothly — a good moment to push things forward":"very active, keep your focus"} (${work.tName} on your ${work.nName}).`:`<b>Work:</b> nothing earth-shattering: a good day to clear the practical stuff.`,
      energia:energy?`<b>Energy:</b> ${energy.kind==="teso"?"high but jittery — burn it off in sport, not in arguments":energy.kind==="facile"?"great charge, make the most of it":"a strong, direct charge"} (${energy.tName} on your ${energy.nName}).`:`<b>Energy:</b> about average. Listen to the rhythm the Moon in ${T.moon.sign.n} is asking for.`
    };
    let consiglio;
    if(tn.hard>tn.easy)consiglio="Today friction is fuel: don't dodge it, use it to push. One thing at a time.";
    else if(tn.easy>0)consiglio="The doors are ajar: one small extra move and they swing open. Dare.";
    else consiglio=`A day to live at the Moon-in-${T.moon.sign.n} pace: ${MOONDAY[moonSign]}.`;
    return {verdict,meteo,moves,areas,consiglio,moonSign:T.moon.sign};
  }
  function dailyBySign(signKey, jsDate){
    const N=window.NATAL, TR=window.TRANSIT, SIGNS=N.SIGNS;
    const X=SIGNS.find(s=>s.k===signKey); if(!X) return null;
    const d=new Date(jsDate.getFullYear(),jsDate.getMonth(),jsDate.getDate(),12);
    const trans=TR.transitsAt(d), xi=SIGNS.indexOf(X);
    function aspOf(ts){const dist=((SIGNS.indexOf(ts)-xi)+12)%12;
      if(dist===0)return{n:'conjunction',k:'intenso',w:1};
      if(dist===2||dist===10)return{n:'sextile',k:'facile',w:0.6};
      if(dist===4||dist===8)return{n:'trine',k:'facile',w:0.85};
      if(dist===3||dist===9)return{n:'square',k:'teso',w:0.8};
      if(dist===6)return{n:'opposition',k:'teso',w:0.9};
      return null;}
    const PW={Sun:0.7,Moon:0.65,Mercury:0.6,Venus:0.9,Mars:0.9,Jupiter:0.8,Saturn:0.8,Uranus:0.5,Neptune:0.5,Pluto:0.5};
    const hits=[];
    trans.forEach(tp=>{const a=aspOf(tp.sign); if(a) hits.push({tp,a,score:a.w*(PW[tp.key]||0.5)});});
    hits.sort((p,q)=>q.score-p.score);
    const sun=trans[0], moon=trans[1];
    const pa=((moon.lon-sun.lon)%360+360)%360;
    let phase='waxing';
    if(pa<10||pa>350)phase='new moon'; else if(pa<80)phase='waxing'; else if(pa<100)phase='first quarter';
    else if(pa<170)phase='waxing gibbous'; else if(pa<190)phase='full moon'; else if(pa<260)phase='waning gibbous';
    else if(pa<280)phase='last quarter'; else phase='waning';
    let easy=0,hard=0,intense=0;
    hits.slice(0,4).forEach(h=>{if(h.a.k==='facile')easy+=h.score;else if(h.a.k==='teso')hard+=h.score;else intense+=h.score;});
    let verdict;
    if(intense>easy+hard)verdict=VERDICT.intensa;
    else if(easy>hard*1.6)verdict=VERDICT.ottima;
    else if(easy>hard)verdict=VERDICT.buona;
    else if(hard>easy*1.4)verdict=VERDICT.mista;
    else if(hits.length===0)verdict=VERDICT.tranquilla;
    else verdict=VERDICT.mista;
    const meteo=`The <b>Moon in ${moon.sign.n}</b> (${phase}) sets the tone: ${MOONDAY[moon.sign.k]}. ${verdict}`;
    const moves=hits.slice(0,3).map(h=>{
      const flav=TFLAV[h.tp.key]||'something new', rx=h.tp.retro?' (retrograde)':'';
      return `<b>${h.tp.glyph} ${h.tp.name}${rx} in ${h.tp.sign.n}</b> is in ${h.a.n} with your sign: it brings ${flav}. ${TWIST[h.a.k]}`;
    });
    function domain(keys){return hits.find(h=>keys.includes(h.tp.key));}
    const love=domain(['Venus','Moon']), work=domain(['Saturn','Mars','Mercury','Sun']), energy=domain(['Mars','Sun']);
    function dl(label,h,fb){ if(!h)return `<b>${label}:</b> ${fb}`;
      const v=h.a.k==='teso'?'handle with care':h.a.k==='facile'?'favored':'lit up and front and center';
      return `<b>${label}:</b> ${v} — ${h.tp.name} in ${h.a.n} with your sign.`; }
    const areas={
      amore:dl('Love',love,`a quiet day on the heart front. The Moon in ${moon.sign.n} asks you for ${MOONDAY[moon.sign.k]}.`),
      lavoro:dl('Work',work,'nothing earth-shattering: a good day to clear the practical stuff.'),
      energia:dl('Energy',energy,`about average. Listen to the rhythm of the Moon in ${moon.sign.n}.`)
    };
    let consiglio;
    if(hard>easy)consiglio='Some friction today: use it as fuel, one thing at a time.';
    else if(easy>0)consiglio='A day of doors left ajar: one small extra move and they open. Dare.';
    else consiglio=`A day to live at the Moon-in-${moon.sign.n} pace: ${MOONDAY[moon.sign.k]}.`;
    return {verdict,meteo,moves,areas,consiglio,moonSign:moon.sign,sign:X,bySign:true};
  }
  window.HOROSCOPE_EN={daily,dailyBySign};
})();
