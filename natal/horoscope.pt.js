(function () {
  const TFLAV = {
    Sun:"luz, foco e vontade de aparecer",Moon:"humor e necessidades que mudam rapidinho",
    Mercury:"pensamentos rápidos, mensagens e palavras",Venus:"doçura, prazer e vontade de beleza",
    Mars:"impulso, garra e uma pitada de atrito",Jupiter:"abertura, confiança e oportunidades",
    Saturn:"seriedade, provas e senso de responsabilidade",Uranus:"imprevistos e vontade de quebrar padrões",
    Neptune:"sonho, inspiração e um véu de névoa",Pluto:"intensidade e transformação profunda"
  };
  const NAREA = {
    Sun:"a sua identidade e a sua vitalidade",Moon:"as suas emoções e a necessidade de se sentir seguro",
    Mercury:"a sua mente e o seu jeito de se comunicar",Venus:"os seus afetos, o prazer e as relações",
    Mars:"o seu impulso de agir e os seus desejos",Jupiter:"a sua vontade de crescer e se expandir",
    Saturn:"os seus compromissos e as suas estruturas",Uranus:"a sua necessidade de liberdade",
    Neptune:"os seus sonhos e a sua imaginação",Pluto:"as suas dinâmicas profundas de mudança",
    Ascendant:"o jeito como você se apresenta e o seu corpo",MC:"a sua direção e a sua imagem pública"
  };
  const CONN = {
    facile:["acaricia","favorece","apoia","ilumina"],
    teso:["põe à prova","sacode","desafia","agita"],
    intenso:["acende","carrega","desperta"]
  };
  const TWIST = {
    facile:"Dia em que essa parte de você flui numa boa: vá com ela.",
    teso:"Uma pequena fricção que, se você surfar direito, te faz dar um salto.",
    intenso:"Energia forte e direta: use com consciência."
  };
  const MOONDAY = {
    ariete:"vontade de fazer e pouca paciência",toro:"necessidade de calma, conforto e coisas gostosas",
    gemelli:"cabeça a mil, papo e curiosidade",cancro:"sensibilidade lá em cima, vontade de ninho e afeto",
    leone:"vontade de brilhar e de calor humano",vergine:"mente prática, vontade de ordem e detalhes",
    bilancia:"busca de harmonia, beleza e companhia",scorpione:"emoções intensas, nada de superficialidade",
    sagittario:"vontade de espaço, aventura e leveza",capricorno:"concretude, ambição e cabeça no trabalho",
    acquario:"mente livre, ideias originais e independência",pesci:"sensibilidade e imaginação no máximo"
  };
  const VERDICT = {
    ottima:"Dia de vento a favor. ✦",buona:"Belo dia, com algumas oportunidades para agarrar no ar.",
    mista:"Dia de duas caras: alguns empurrões e algumas fricções, mas nada que você não dê conta.",
    intensa:"Dia intenso: segure o leme, e você sai mais forte.",
    tranquilla:"Dia tranquilo, sem grandes solavancos: bom para organizar as ideias."
  };
  function pick(arr,seed){return arr[Math.abs(seed)%arr.length];}
  function sentence(a,seed){
    const flav=TFLAV[a.tKey]||"algo novo",area=NAREA[a.nKey]||"uma parte de você";
    const conn=pick(CONN[a.kind]||CONN.intenso,seed),rx=a.tRetro?" (retrógrado)":"";
    return `<b>${a.tGlyph} ${a.tName}${rx}</b> hoje ${conn} <b>${area}</b> (${a.nGlyph} ${a.nName}): traz ${flav}. ${TWIST[a.kind]}`;
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
    const meteo=`A <b>Lua em ${T.moon.sign.n}</b> (${T.moonPhase}) dá o tom: ${MOONDAY[moonSign]}. ${verdict}`;
    const seen=new Set(),moves=[];
    for(const a of T.top){const id=a.tKey+a.nKey;if(seen.has(id))continue;seen.add(id);moves.push(sentence(a,seed+moves.length));if(moves.length>=3)break;}
    const love=themeAspect(T.aspects,["Venus","Moon"],["Venus","Moon"]);
    const work=themeAspect(T.aspects,["Saturn","Mercury","Sun"],["Saturn","MC","Mercury"]);
    const energy=themeAspect(T.aspects,["Mars","Sun"],["Mars","Sun","Ascendant"]);
    const areas={
      amore:love?`<b>Amor:</b> em primeiro plano hoje — ${love.kind==="teso"?"algumas tensões para aparar com doçura":love.kind==="facile"?"clima favorável, deixe rolar":"emoções intensas, viva cada uma delas"} (${love.tName} sobre ${love.nName}, no seu mapa).`:`<b>Amor:</b> dia tranquilo no front do coração. A Lua em ${T.moon.sign.n} pede de você ${MOONDAY[moonSign]}.`,
      lavoro:work?`<b>Trabalho:</b> ${work.kind==="teso"?"exige empenho e concentração, mas rende":work.kind==="facile"?"flui bem, bom momento para tocar as coisas adiante":"bem ativo, mantenha o foco"} (${work.tName} sobre ${work.nName}, no seu mapa).`:`<b>Trabalho:</b> nada de arrebatador: bom dia para despachar o lado prático.`,
      energia:energy?`<b>Energia:</b> ${energy.kind==="teso"?"alta, mas nervosa — descarregue no esporte, não nas brigas":energy.kind==="facile"?"ótima carga, aproveite":"carga forte e direta"} (${energy.tName} sobre ${energy.nName}, no seu mapa).`:`<b>Energia:</b> na média. Escute o ritmo que a Lua em ${T.moon.sign.n} pede.`
    };
    let consiglio;
    if(tn.hard>tn.easy)consiglio="Hoje as fricções são combustível: não fuja delas, use-as para empurrar. Uma coisa de cada vez.";
    else if(tn.easy>0)consiglio="As portas estão entreabertas: basta um pequeno gesto a mais para abri-las. Ouse.";
    else consiglio=`Dia para viver no ritmo da Lua em ${T.moon.sign.n}: ${MOONDAY[moonSign]}.`;
    return {verdict,meteo,moves,areas,consiglio,moonSign:T.moon.sign};
  }
  function dailyBySign(signKey, jsDate){
    const N=window.NATAL, TR=window.TRANSIT, SIGNS=N.SIGNS;
    const X=SIGNS.find(s=>s.k===signKey); if(!X) return null;
    const d=new Date(jsDate.getFullYear(),jsDate.getMonth(),jsDate.getDate(),12);
    const trans=TR.transitsAt(d), xi=SIGNS.indexOf(X);
    function aspOf(ts){const dist=((SIGNS.indexOf(ts)-xi)+12)%12;
      if(dist===0)return{n:'conjunção',k:'intenso',w:1};
      if(dist===2||dist===10)return{n:'sextil',k:'facile',w:0.6};
      if(dist===4||dist===8)return{n:'trígono',k:'facile',w:0.85};
      if(dist===3||dist===9)return{n:'quadratura',k:'teso',w:0.8};
      if(dist===6)return{n:'oposição',k:'teso',w:0.9};
      return null;}
    const PW={Sun:0.7,Moon:0.65,Mercury:0.6,Venus:0.9,Mars:0.9,Jupiter:0.8,Saturn:0.8,Uranus:0.5,Neptune:0.5,Pluto:0.5};
    const hits=[];
    trans.forEach(tp=>{const a=aspOf(tp.sign); if(a) hits.push({tp,a,score:a.w*(PW[tp.key]||0.5)});});
    hits.sort((p,q)=>q.score-p.score);
    const sun=trans[0], moon=trans[1];
    const pa=((moon.lon-sun.lon)%360+360)%360;
    let phase='crescente';
    if(pa<10||pa>350)phase='lua nova'; else if(pa<80)phase='crescente'; else if(pa<100)phase='quarto crescente';
    else if(pa<170)phase='gibosa crescente'; else if(pa<190)phase='lua cheia'; else if(pa<260)phase='gibosa minguante';
    else if(pa<280)phase='quarto minguante'; else phase='minguante';
    let easy=0,hard=0,intense=0;
    hits.slice(0,4).forEach(h=>{if(h.a.k==='facile')easy+=h.score;else if(h.a.k==='teso')hard+=h.score;else intense+=h.score;});
    let verdict;
    if(intense>easy+hard)verdict=VERDICT.intensa;
    else if(easy>hard*1.6)verdict=VERDICT.ottima;
    else if(easy>hard)verdict=VERDICT.buona;
    else if(hard>easy*1.4)verdict=VERDICT.mista;
    else if(hits.length===0)verdict=VERDICT.tranquilla;
    else verdict=VERDICT.mista;
    const meteo=`A <b>Lua em ${moon.sign.n}</b> (${phase}) dá o tom: ${MOONDAY[moon.sign.k]}. ${verdict}`;
    const moves=hits.slice(0,3).map(h=>{
      const flav=TFLAV[h.tp.key]||'algo novo', rx=h.tp.retro?' (retrógrado)':'';
      return `<b>${h.tp.glyph} ${h.tp.name}${rx} em ${h.tp.sign.n}</b> está em ${h.a.n} com o seu signo: traz ${flav}. ${TWIST[h.a.k]}`;
    });
    function domain(keys){return hits.find(h=>keys.includes(h.tp.key));}
    const love=domain(['Venus','Moon']), work=domain(['Saturn','Mars','Mercury','Sun']), energy=domain(['Mars','Sun']);
    function dl(label,h,fb){ if(!h)return `<b>${label}:</b> ${fb}`;
      const v=h.a.k==='teso'?'para administrar com cuidado':h.a.k==='facile'?'favorecido':'aceso e em primeiro plano';
      return `<b>${label}:</b> ${v} — ${h.tp.name} em ${h.a.n} com o seu signo.`; }
    const areas={
      amore:dl('Amor',love,`dia tranquilo no front do coração. A Lua em ${moon.sign.n} pede de você ${MOONDAY[moon.sign.k]}.`),
      lavoro:dl('Trabalho',work,'nada de arrebatador: bom dia para despachar o lado prático.'),
      energia:dl('Energia',energy,`na média. Escute o ritmo da Lua em ${moon.sign.n}.`)
    };
    let consiglio;
    if(hard>easy)consiglio='Hoje tem uma fricção ou outra: use como impulso, uma coisa de cada vez.';
    else if(easy>0)consiglio='Dia de portas entreabertas: um pequeno gesto a mais e elas se abrem. Ouse.';
    else consiglio=`Dia para viver no ritmo da Lua em ${moon.sign.n}: ${MOONDAY[moon.sign.k]}.`;
    return {verdict,meteo,moves,areas,consiglio,moonSign:moon.sign,sign:X,bySign:true};
  }
  window.HOROSCOPE_PT={daily,dailyBySign};
})();
