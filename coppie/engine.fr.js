(function(){
/* ============================================================
   ZODIAC · COPPIE — ENGINE FR (dati + scoring + compute condiviso)
   La logica di punteggio è quella originale, intatta.
   ============================================================ */

const SIGNS = [
 {k:"ariete",   n:"Bélier",     g:"♈", el:"fuoco", mod:"cardinale", ru:"Mars",            ll:"Des gestes d'action et du temps de qualité à haute dose d'adrénaline.", rf:["Impulsif et impatient","S'enflamme puis disparaît","Égocentrique quand il gagne"]},
 {k:"toro",     n:"Taureau",    g:"♉", el:"terra", mod:"fisso",     ru:"Vénus",           ll:"Contact physique et gestes concrets (bonne bouffe, confort, présence).", rf:["Têtu jusqu'à l'absurde","Possessif","Paresseux dès qu'il s'installe"]},
 {k:"gemelli",  n:"Gémeaux",    g:"♊", el:"aria",  mod:"mobile",    ru:"Mercure",         ll:"Des mots, des vannes et des conversations sans fin.", rf:["Inconstant","Parfois superficiel","Dit tout et son contraire"]},
 {k:"cancro",   n:"Cancer",     g:"♋", el:"acqua", mod:"cardinale", ru:"Lune",            ll:"Des gestes tendres et du temps de qualité, à la maison.", rf:["Lunatique","Se referme dans sa carapace","Passif-agressif"]},
 {k:"leone",    n:"Lion",       g:"♌", el:"fuoco", mod:"fisso",     ru:"Soleil",          ll:"Compliments, attention et gestes spectaculaires.", rf:["Égocentrique","Accro aux applaudissements","Dramatique"]},
 {k:"vergine",  n:"Vierge",     g:"♍", el:"terra", mod:"mobile",    ru:"Mercure",         ll:"Des actes de service : il t'aide, prend soin de toi, règle tout.", rf:["Hypercritique","Anxieux","Perfectionniste paralysant"]},
 {k:"bilancia", n:"Balance",    g:"♎", el:"aria",  mod:"cardinale", ru:"Vénus",           ll:"Gestes romantiques, temps de qualité et harmonie partagée.", rf:["Indécis","Évite même les conflits nécessaires","Veut plaire à tout le monde"]},
 {k:"scorpione",n:"Scorpion",   g:"♏", el:"acqua", mod:"fisso",     ru:"Mars/Pluton",     ll:"Intimité totale, loyauté et intensité.", rf:["Jaloux et possessif","Vindicatif","Contrôlant"]},
 {k:"sagittario",n:"Sagittaire",g:"♐", el:"fuoco", mod:"mobile",    ru:"Jupiter",         ll:"Aventures partagées, fous rires et liberté.", rf:["Agité en permanence","Brutalement franc","Allergique aux engagements"]},
 {k:"capricorno",n:"Capricorne",g:"♑", el:"terra", mod:"cardinale", ru:"Saturne",         ll:"Fiabilité, engagement concret et temps dédié.", rf:["Workaholic distant","Froid en apparence","Trop contrôlant"]},
 {k:"acquario", n:"Verseau",    g:"♒", el:"aria",  mod:"fisso",     ru:"Saturne/Uranus",  ll:"Liberté respectée, complicité mentale et causes communes.", rf:["Détaché","Têtu dans ses idées","Imprévisible"]},
 {k:"pesci",    n:"Poissons",   g:"♓", el:"acqua", mod:"mobile",    ru:"Jupiter/Neptune", ll:"Romantisme, tendresse et fusion émotionnelle.", rf:["Insaisissable","Tendance au victimisme","Limites floues"]}
];
const BY = Object.fromEntries(SIGNS.map(s=>[s.k,s]));

/* elemento → famiglia visiva (per i colori a tema) */
const ELEMENT_FAMILY = { fuoco:"fuoco", terra:"terra", aria:"aria", acqua:"acqua" };

/* ---------- motore base (amore) ---------- */
function elScore(a,b){if(a===b)return 5;const k=[a,b].sort().join("|");return {"aria|fuoco":4,"acqua|terra":4,"acqua|aria":3,"aria|terra":3,"fuoco|terra":3,"acqua|fuoco":2}[k]||3;}
function modAdj(a,b){return a===b?-0.5:0.25;}
function overall(a,b){return Math.min(5,Math.max(2,Math.round(elScore(a.el,b.el)+modAdj(a.mod,b.mod))));}
function dims(a,b){const e=[a.el,b.el];const has=x=>e.includes(x);const both=x=>e[0]===x&&e[1]===x;let P=3,E=3,I=3,S=3;
  if(has("fuoco"))P++; if(both("fuoco"))P=5; if(has("fuoco")&&has("aria"))P=Math.max(P,5);
  if(has("acqua"))E++; if(both("acqua"))E=5;
  if(has("aria"))I++; if(both("aria"))I=5; if(a.el===b.el)I++;
  if(has("terra"))S++; if(both("terra"))S=5; if(a.mod==="fisso"&&b.mod==="fisso")S++; if(a.mod==="cardinale"&&b.mod==="cardinale")S--;
  const c=x=>Math.min(5,Math.max(1,x));return{Passione:c(P),Emozione:c(E),Intesa:c(I),Stabilità:c(S)};}
const ELTX={"acqua|acqua":["profondeur émotionnelle et besoin d'intimité vraie","deux mers en tempête : les humeurs s'amplifient"],"terra|terra":["du concret, de la loyauté et des projets communs","l'étincelle peut s'éteindre dans la routine"],"fuoco|fuoco":["passion, énergie et envie de vivre à fond","deux ego qui veulent commander le même feu"],"aria|aria":["complicité mentale, légèreté et mille conversations","beaucoup de tête, peu de ventre : l'émotion fait défaut"],"aria|fuoco":["l'air attise le feu : stimulation et mouvement non-stop","on risque de brûler trop vite, sans racines"],"acqua|terra":["l'eau nourrit la terre : une sécurité qui fait grandir","la terre peut étouffer et l'eau tout inonder"],"fuoco|terra":["ambition partagée et envie de construire","rythmes opposés : l'un court, l'autre planifie"],"acqua|fuoco":["une attraction magnétique entre opposés","le feu évapore l'eau, l'eau éteint le feu"],"aria|terra":["des idées plus du concret, si on se retrouve à mi-chemin","l'un trop abstrait, l'autre trop terre à terre"],"acqua|aria":["sensibilité et imagination qui se frôlent","logique contre émotion : on se comprend vite de travers"]};
const MODTX={"cardinale|cardinale":"deux leaders : bras de fer pour savoir qui conduit","fisso|fisso":"solides et loyaux, mais têtus comme des mules","mobile|mobile":"flexibles et curieux, mais un peu dispersés","cardinale|fisso":"l'un lance, l'autre consolide : bel équilibre","cardinale|mobile":"initiative plus adaptabilité : ça avance bien ensemble","fisso|mobile":"des racines plus du mouvement : une stabilité qui reste vivante"};
function dyn(a,b){const ek=[a.el,b.el].sort().join("|");const mk=[a.mod,b.mod].sort().join("|");const e=ELTX[ek]||["",""];return{unisce:e[0],scotta:e[1],mod:MODTX[mk]||""};}
function verdict(s){return s>=5?"Couple de manuel : ça flashe et ça dure.":s>=4?"Grand potentiel : avec un peu de travail, ça décolle.":s>=3?"Ça marche, mais il faut se retrouver à mi-chemin.":"Vrai défi : des opposés qui peinent à se comprendre.";}

/* ---------- lenti ---------- */
const LENSES=[
 {k:"amore",label:"Amour",g:"♥",sym:"♥",dimN:["Passion","Émotion","Entente","Stabilité"]},
 {k:"amicizia",label:"Amitié",g:"✦",sym:"✦",dimN:["Fun","Loyauté","Connexion","Aventure"]},
 {k:"lavoro",label:"Travail & Associés",g:"⚙",sym:"⚙",dimN:["Complémentarité","Fiabilité","Vision","Gestion des conflits"]},
 {k:"famiglia",label:"Famille",g:"⌂",sym:"⌂",dimN:["Harmonie au quotidien","Soutien émotionnel","Respect des espaces","Loyauté"]},
 {k:"convivenza",label:"Colocation",g:"◆",sym:"◆",dimN:["Ordre & gestion","Espaces partagés","Ambiance à la maison","Conflits pratiques"]},
 {k:"ex",label:"Ex",g:"♡",sym:"♡",dimN:["Rester amis","Clôture sereine","Respect mutuel","Retour de flamme"]},
 {k:"capo",label:"Boss & Équipe",g:"★",sym:"★",dimN:["Leadership clair","Confiance & délégation","Communication","Évolution"]}
];
const LBY=Object.fromEntries(LENSES.map(l=>[l.k,l]));

function elCat(x,y){if(x===y)return "same";const k=[x,y].sort().join("|");return (k==="aria|fuoco"||k==="acqua|terra")?"ally":"challenge";}
function lensScore(lk,a,b){
 if(lk==="amore")return overall(a,b);
 const cat=elCat(a.el,b.el),cc=v=>Math.min(5,Math.max(1,Math.round(v)));
 const has=x=>a.el===x||b.el===x;
 const bothFire=a.el==="fuoco"&&b.el==="fuoco";
 const cardCard=a.mod==="cardinale"&&b.mod==="cardinale",fixFix=a.mod==="fisso"&&b.mod==="fisso",mutMut=a.mod==="mobile"&&b.mod==="mobile";
 const fixCnt=(a.mod==="fisso"?1:0)+(b.mod==="fisso"?1:0);
 if(lk==="amicizia"){let s=cat==="same"?5:cat==="ally"?4:3;if(fixFix)s-=0.5;return cc(s);}
 if(lk==="lavoro"){let s=cat==="challenge"?4.5:cat==="ally"?4:(bothFire?2:3);if(cardCard)s-=1.5;if(fixFix)s-=1;if(mutMut)s-=1;if(!cardCard&&!fixFix&&!mutMut)s+=0.5;return cc(s);}
 if(lk==="famiglia"){let s=cat==="same"?4:cat==="ally"?4:3;if(bothFire)s-=1;if(has("acqua"))s+=0.5;return cc(Math.max(3,s));}
 if(lk==="convivenza"){let s=cat==="ally"?4:cat==="same"?4:3;if(bothFire)s-=1;if(has("terra"))s+=0.5;if(fixFix)s-=0.5;return cc(s);}
 if(lk==="ex"){let s=3;if(has("aria"))s+=1;if(has("acqua"))s-=1;if(mutMut)s+=0.5;s-=fixCnt*0.4;if(a.k==="scorpione"||b.k==="scorpione")s-=0.5;return cc(s);}
 if(lk==="capo"){let s=3;if(cardCard)s-=1.5;else if(a.mod==="cardinale"||b.mod==="cardinale")s+=1;if(fixFix)s-=1;if(mutMut)s-=0.5;if(has("terra"))s+=0.5;return cc(s);}
 return overall(a,b);
}
function lensDims(lk,a,b){
 const e=[a.el,b.el],has=x=>e.includes(x),both=x=>e[0]===x&&e[1]===x,cc=v=>Math.min(5,Math.max(1,Math.round(v)));
 const sameEl=a.el===b.el,cat=elCat(a.el,b.el),fixCnt=(a.mod==="fisso"?1:0)+(b.mod==="fisso"?1:0);
 const cardCard=a.mod==="cardinale"&&b.mod==="cardinale",fixFix=a.mod==="fisso"&&b.mod==="fisso",mutMut=a.mod==="mobile"&&b.mod==="mobile";
 if(lk==="amore"){const d=dims(a,b);return [d.Passione,d.Emozione,d.Intesa,d.Stabilità];}
 if(lk==="amicizia"){
  let div=3+(has("fuoco")?1:0)+(has("aria")?1:0)-(both("acqua")?1:0);
  let lea=3+(has("acqua")?1:0)+(has("terra")?0.5:0)+fixCnt*0.5;
  let sin=sameEl?5:cat==="ally"?4:3;
  let avv=3+(has("fuoco")?1:0)+(mutMut?1:0)+(both("fuoco")?1:0);
  return [cc(div),cc(lea),cc(sin),cc(avv)];}
 if(lk==="lavoro"){
  let com=cat==="challenge"?5:cat==="ally"?4:3;if(both("fuoco"))com=2;
  let aff=3+(has("terra")?1:0)+(both("terra")?1:0)+fixCnt*0.5-((has("fuoco")&&has("aria"))?1:0);
  let vis=3+(has("fuoco")?1:0)+(has("aria")?1:0);
  let con=4-(cardCard?2:0)-(fixFix?1:0)-(mutMut?1:0);
  return [cc(com),cc(aff),cc(vis),cc(con)];}
 if(lk==="famiglia"){
  let arm=(sameEl?4:cat==="ally"?4:3)-(both("fuoco")?1:0)+(has("acqua")?0.5:0);
  let sup=3+(has("acqua")?1:0)+(both("acqua")?1:0)+(has("terra")?0.5:0);
  let spa=4-(fixFix?1:0)+(has("aria")?0.5:0);
  let lea=4+fixCnt*0.5+(has("acqua")?0.5:0);
  return [cc(arm),cc(sup),cc(spa),cc(lea)];}
 if(lk==="convivenza"){
  let ord=3+(has("terra")?1:0)+(both("terra")?1:0)-(both("fuoco")?1:0);
  let spa=3.5-(fixFix?1:0)+(has("aria")?0.5:0);
  let cli=((cat==="ally"||sameEl)?4:3)-(both("fuoco")?1:0)+(has("acqua")?0.5:0);
  let con=3.5-(cardCard?1:0)+((!cardCard&&!fixFix)?0.5:0);
  return [cc(ord),cc(spa),cc(cli),cc(con)];}
 if(lk==="ex"){
  const air=has("aria"),wat=has("acqua"),fir=has("fuoco");
  let ami=3+(air?1:0)+(mutMut?1:0)-(wat?1:0)-(fixFix?1:0);
  let chi=3+(air?1:0)+(mutMut?1:0)-(fir?1:0)-(fixFix?0.5:0);
  let ris=3.5+(has("terra")?0.5:0)+(air?0.5:0);
  let fia=2+(wat?1:0)+(fir?1:0)+fixCnt*0.5-(air?0.5:0);
  return [cc(ami),cc(chi),cc(ris),cc(fia)];}
 if(lk==="capo"){
  let led=cardCard?2:((a.mod==="cardinale"||b.mod==="cardinale")?5:3);
  let fid=3+(has("terra")?1:0)-(fixFix?1:0)+(has("acqua")?0.5:0);
  let com=3+(has("aria")?1:0)+(has("fuoco")?0.5:0);
  let cre=3+(cat==="ally"?1:0)+(cat==="challenge"?0.5:0)-(both("fuoco")?1:0)+(has("terra")?0.5:0);
  return [cc(led),cc(fid),cc(com),cc(cre)];}
 const d=dims(a,b);return [d.Passione,d.Emozione,d.Intesa,d.Stabilità];
}
const LTX={
 amore:{u:{same:"vous vous comprenez d'instinct, même langage émotionnel",ally:"une attraction qui coule de source, vous vous stimulez mutuellement",challenge:"l'étincelle magnétique de ceux qui sont différents et se cherchent"},s:{same:"vous vous ressemblez trop et amplifiez les mêmes défauts",ally:"vous courez vite mais il vous faut des racines",challenge:"vous ressentez et réagissez à l'opposé, on se comprend de travers"}},
 amicizia:{u:{same:"même longueur d'onde, amis au premier regard",ally:"vous vous embarquez mutuellement dans les aventures et les fous rires",challenge:"vous vous complétez, chacun ouvre à l'autre un monde nouveau"},s:{same:"trop semblables, personne ne tire jamais le frein",ally:"beaucoup de mouvement mais peu de profondeur dans les moments sérieux",challenge:"rythmes et besoins différents, parfois vous ne vous comprenez pas"}},
 lavoro:{u:{same:"même vision et même rythme de travail",ally:"des énergies qui se nourrissent et des idées en rafale",challenge:"vous vous complétez : l'un a la vision, l'autre exécute"},s:{same:"des rôles qui se chevauchent et des doutes sur qui commande",ally:"de grands départs mais peu de constance sur les détails",challenge:"priorités et tempos différents, il faut des rôles clairs"}},
 famiglia:{u:{same:"vous vous reconnaissez, même tempérament sous le même toit",ally:"une maison vivante et pleine d'énergie",challenge:"différents mais liés, vous apprenez l'un de l'autre"},s:{same:"deux caractères identiques butent sur les mêmes angles",ally:"trop d'agitation, la maison ne s'arrête jamais",challenge:"des façons opposées de vivre les espaces et les émotions"}},
 convivenza:{u:{same:"mêmes habitudes, la maison roule toute seule",ally:"ambiance joyeuse et sociale entre les murs",challenge:"vous vous équilibrez : l'un met de l'ordre, l'autre met de la vie"},s:{same:"les mêmes travers en double, ordre ou rigidité",ally:"beaucoup de vie mais peu de gestion pratique",challenge:"des idées opposées sur le ménage, les espaces et les invités"}},
 ex:{u:{same:"vous vous connaissez par cœur : aucune surprise, même en ex",ally:"vous restez sur la même longueur d'onde, vous parler reste facile",challenge:"vous vivez désormais sur des planètes différentes, plus facile de tourner la page"},s:{same:"les mêmes raisons qui vous liaient vous retapent sur les nerfs",ally:"la vieille complicité risque de rallumer le feu",challenge:"les opposés qui vous attiraient vous repoussent maintenant"}},
 capo:{u:{same:"même langage et même rythme, vous vous comprenez au quart de tour",ally:"des énergies qui se nourrissent, leader et équipe en phase",challenge:"vous vous complétez : l'un guide, l'autre réalise, des rôles naturels"},s:{same:"deux têtes identiques : qui guide et qui exécute vraiment ?",ally:"beaucoup d'élan, mais il faut quelqu'un pour tenir les détails",challenge:"priorités et tempos différents, sans rôles clairs ça coince"}}
};
function lensDyn(lk,a,b){const cat=elCat(a.el,b.el);const mk=[a.mod,b.mod].sort().join("|");const t=LTX[lk]||LTX.amore;return {uni:t.u[cat],sco:t.s[cat],mod:(MODTX[mk]||"")};}
const LVERD={
 amicizia:["Amis compliqués : à petites doses, c'est mieux.","Une amitié qui marche avec un peu d'effort.","Excellente amitié, ça vient tout seul.","Amis à la vie à la mort."],
 lavoro:["Associés difficiles : risque élevé de clashs.","Ça marche si vous vous répartissez bien les tâches.","Excellente équipe, avec des rôles clairs.","Associés d'une boîte qui cartonne."],
 famiglia:["Tensions à la maison : patience obligatoire.","On s'entend, avec quelques compromis.","Beau lien, maison harmonieuse.","Famille ultra soudée."],
 convivenza:["Colocation corsée : mieux vaut des espaces bien séparés.","Colocation ok, avec quelques règles.","Excellente colocation.","Colocs parfaits."],
 ex:["Chapitre difficile à clore : mieux vaut garder ses distances.","En ex, ça marche seulement avec des limites claires.","Vous arrivez à rester en bons termes.","Ex modèles : de vrais amis après l'amour."],
 capo:["Hiérarchie difficile : clashs sur qui commande.","Ça marche avec des rôles et des règles claires.","Bonne dynamique boss-équipe.","Leader et bras droit parfaits."]
};
function lensVerdict(lk,s){if(lk==="amore")return verdict(s);const arr=LVERD[lk];return arr[Math.min(3,Math.max(0,s-2))];}
function lensRitratto(lk,a,b,s,dy){
 const word={amore:"couple",amicizia:"amis",lavoro:"associés",famiglia:"famille",convivenza:"colocs",ex:"ex",capo:"duo boss-équipe"}[lk]||"couple";
 const el={fuoco:"apporte énergie et élan",terra:"apporte du concret et des racines",aria:"apporte idées et mots",acqua:"apporte émotion et intuition"};
 const mo={cardinale:"aime prendre l'initiative",fisso:"campe sur ses positions",mobile:"s'adapte facilement"};
 const lead = s>=4?`En tant que ${word}, ${a.n} et ${b.n} partent avec une longueur d'avance.`
   : s>=3?`En tant que ${word}, ${a.n} et ${b.n} peuvent fonctionner en se retrouvant à mi-chemin.`
   : `En tant que ${word}, ${a.n} et ${b.n} sont un puzzle compliqué.`;
 return `${lead} ${a.n} ${el[a.el]} et ${mo[a.mod]} ; ${b.n}, de son côté, ${el[b.el]} et ${mo[b.mod]}. Ce qui vous unit, c'est ${dy.uni} ; ${dy.mod}. La tension naît quand ${dy.sco}.`;
}
const LADV={
 amicizia:"Cultivez ce qui vous amuse et respectez les espaces de chacun : l'amitié tient sur la légèreté et la présence dans les moments qui comptent vraiment.",
 lavoro:"Définissez des rôles clairs dès le départ — qui décide quoi — et mettez les accords par écrit : les associés se disputent sur le flou, pas sur les chiffres.",
 famiglia:"En famille, on ne gagne pas une dispute, on préserve un lien : respectez les caractères et le rythme de chacun.",
 convivenza:"Quelques règles claires sur le ménage, les espaces et les invités, fixées tout de suite : la colocation se brise sur les non-dits, pas sur les différences.",
 ex:"En ex, la règle est unique : des limites claires et zéro zone grise. Décidez ce que vous êtes maintenant — amis ou chacun de son côté — et arrêtez de rejouer qui vous étiez.",
 capo:"La hiérarchie tient si les rôles sont explicites : qui décide décide, qui exécute a autonomie et confiance. Ça casse quand le boss ne lâche pas le contrôle ou quand l'équipe ne respecte pas le cap."
};
function farla(a,b,ov){
  const pre = ov>=4?"Vous avez une base solide — ne la prenez pas pour acquise."
    : ov>=3?"C'est jouable, mais avec un vrai travail des deux côtés."
    : "Il faudra de la patience et beaucoup de communication.";
  return `${pre} La clé, c'est de parler la langue de l'autre : ${a.n} vit l'amour à travers « ${a.ll.toLowerCase()} », ${b.n} à travers « ${b.ll.toLowerCase()} ». Qui apprend à donner ce qui compte vraiment pour l'autre a déjà gagné.`;
}
function lensAdvice(lk,a,b,s){
  if(lk==="amore")return farla(a,b,s);
  const pre = s>=4?"Vous avez une excellente base.":s>=3?"C'est jouable, avec un peu d'attention.":"Il faudra des efforts des deux côtés.";
  return `${pre} ${LADV[lk]}`;
}
function cap(s){return s?s.charAt(0).toUpperCase()+s.slice(1):s;}

/* ============================================================
   compute(state) → modello condiviso da tutte le direzioni.
   I contenuti sono identici fra i temi; cambia solo la grafica.
   ============================================================ */
function computeCouple(ka, kb, lk){
  lk = lk || "amore";
  const a = BY[ka], b = BY[kb], l = LBY[lk];
  const s = lensScore(lk,a,b);
  const da = lensDims(lk,a,b);
  const dy = lensDyn(lk,a,b);
  const state = s>=4 ? "good" : (s<=2 ? "bad" : "mid");
  const sym = s>=4 ? l.sym : (s<=2 ? "⚡" : "≈");
  const sint = ["Grosse tension","Équilibre à construire","Belle harmonie","Alchimie au top"][Math.min(3,Math.max(0,s-2))];
  return {
    a, b, lens:l, lensKey:lk,
    score:s, pct:s*20, state, sym, sint,
    verdict: lensVerdict(lk,s),
    h2h: [
      {lab:"élément", va:cap(a.el), vb:cap(b.el)},
      {lab:"modalité", va:cap(a.mod), vb:cap(b.mod)},
      {lab:"planète",  va:a.ru, vb:b.ru},
      {lab:"langage d'amour", va:a.ll, vb:b.ll},
      {lab:"red flag", va:a.rf[0], vb:b.rf[0]}
    ],
    ritratto: lensRitratto(lk,a,b,s,dy),
    unisce: cap(dy.uni),
    scotta: cap(dy.sco),
    dims: l.dimN.map((n,i)=>({n, v:da[i]})),
    advice: lensAdvice(lk,a,b,s)
  };
}

window.ZODIAC_FR = { SIGNS, BY, LENSES, LBY, computeCouple, cap };

})();
