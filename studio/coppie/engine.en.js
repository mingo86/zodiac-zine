(function(){
/* ============================================================
   ZODIAC · COPPIE — ENGINE (dati + scoring + compute condiviso)
   English copy edition. La logica di punteggio è quella originale, intatta.
   ============================================================ */

const SIGNS = [
 {k:"ariete",   n:"Aries",      g:"♈", el:"fuoco", mod:"cardinale", ru:"Mars",           ll:"Action-packed gestures and high-adrenaline quality time.", rf:["Impulsive and impatient","Catches fire, then ghosts","Self-centered when winning"]},
 {k:"toro",     n:"Taurus",     g:"♉", el:"terra", mod:"fisso",     ru:"Venus",          ll:"Physical touch and tangible gestures (food, comfort, presence).", rf:["Stubborn beyond all reason","Possessive","Lazy once they get comfy"]},
 {k:"gemelli",  n:"Gemini",     g:"♊", el:"aria",  mod:"mobile",    ru:"Mercury",        ll:"Words, banter and endless conversations.", rf:["Fickle","Occasionally shallow","Says everything and its opposite"]},
 {k:"cancro",   n:"Cancer",     g:"♋", el:"acqua", mod:"cardinale", ru:"Moon",           ll:"Acts of care and quality time, at home.", rf:["Moody","Retreats into the shell","Passive-aggressive"]},
 {k:"leone",    n:"Leo",        g:"♌", el:"fuoco", mod:"fisso",     ru:"Sun",            ll:"Compliments, attention and showstopping gestures.", rf:["Self-centered","Needs constant applause","Dramatic"]},
 {k:"vergine",  n:"Virgo",      g:"♍", el:"terra", mod:"mobile",    ru:"Mercury",        ll:"Acts of service: helps you, looks after you, fixes things.", rf:["Hypercritical","Anxious","Paralyzingly perfectionist"]},
 {k:"bilancia", n:"Libra",      g:"♎", el:"aria",  mod:"cardinale", ru:"Venus",          ll:"Romantic gestures, quality time and shared harmony.", rf:["Indecisive","Avoids even necessary conflict","Wants to please everyone"]},
 {k:"scorpione",n:"Scorpio",    g:"♏", el:"acqua", mod:"fisso",     ru:"Mars/Pluto",     ll:"Total intimacy, loyalty and intensity.", rf:["Jealous and possessive","Vindictive","Controlling"]},
 {k:"sagittario",n:"Sagittarius",g:"♐",el:"fuoco", mod:"mobile",    ru:"Jupiter",        ll:"Shared adventures, laughter and freedom.", rf:["Restless","Brutally blunt","Allergic to commitment"]},
 {k:"capricorno",n:"Capricorn", g:"♑", el:"terra", mod:"cardinale", ru:"Saturn",         ll:"Reliability, concrete commitment and dedicated time.", rf:["Distant workaholic","Cold on the surface","Overly controlling"]},
 {k:"acquario", n:"Aquarius",   g:"♒", el:"aria",  mod:"fisso",     ru:"Saturn/Uranus",  ll:"Freedom respected, mental complicity and shared causes.", rf:["Detached","Stubborn about ideas","Unpredictable"]},
 {k:"pesci",    n:"Pisces",     g:"♓", el:"acqua", mod:"mobile",    ru:"Jupiter/Neptune",ll:"Romance, tenderness and emotional fusion.", rf:["Elusive","Prone to playing the victim","Weak boundaries"]}
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
const ELTX={"acqua|acqua":["emotional depth and a craving for real intimacy","two stormy seas: the moods amplify each other"],"terra|terra":["groundedness, loyalty and shared projects","the spark can fizzle out in the routine"],"fuoco|fuoco":["passion, energy and living life at full throttle","two egos fighting over the same flame"],"aria|aria":["mental connection, lightness and a thousand conversations","all head, no gut: the feelings go missing"],"aria|fuoco":["air feeds fire: nonstop stimulation and motion","you risk burning out fast, with no roots"],"acqua|terra":["water nourishes earth: security that makes you grow","earth can smother and water can flood"],"fuoco|terra":["shared ambition and the urge to build","opposite paces: one sprints, the other plans"],"acqua|fuoco":["a magnetic attraction between opposites","fire boils water away, water puts fire out"],"aria|terra":["ideas plus practicality, if you meet halfway","one too abstract, the other too down-to-earth"],"acqua|aria":["sensitivity and imagination brushing up against each other","logic versus emotion: misunderstandings come easy"]};
const MODTX={"cardinale|cardinale":"two leaders: an arm-wrestle over who steers","fisso|fisso":"solid and loyal, but stubborn as mules","mobile|mobile":"flexible and curious, but a bit scattered","cardinale|fisso":"one launches, the other consolidates: a fine balance","cardinale|mobile":"initiative plus adaptability: you keep up with each other nicely","fisso|mobile":"roots plus motion: stability that stays alive"};
function dyn(a,b){const ek=[a.el,b.el].sort().join("|");const mk=[a.mod,b.mod].sort().join("|");const e=ELTX[ek]||["",""];return{unisce:e[0],scotta:e[1],mod:MODTX[mk]||""};}
function verdict(s){return s>=5?"Textbook couple: sparks fly and it lasts.":s>=4?"Huge potential: with a little work, it soars.":s>=3?"It works, but you'll have to meet halfway.":"A real challenge: opposites struggling to get each other.";}

/* ---------- lenti ---------- */
const LENSES=[
 {k:"amore",label:"Love",g:"♥",sym:"♥",dimN:["Passion","Emotion","Chemistry","Stability"]},
 {k:"amicizia",label:"Friendship",g:"✦",sym:"✦",dimN:["Fun","Loyalty","Wavelength","Adventure"]},
 {k:"lavoro",label:"Work & Partners",g:"⚙",sym:"⚙",dimN:["Complementarity","Reliability","Vision","Conflict handling"]},
 {k:"famiglia",label:"Family",g:"⌂",sym:"⌂",dimN:["Everyday harmony","Emotional support","Respect for space","Loyalty"]},
 {k:"convivenza",label:"Living Together",g:"◆",sym:"◆",dimN:["Order & logistics","Shared spaces","Home vibes","Practical conflicts"]},
 {k:"ex",label:"Exes",g:"♡",sym:"♡",dimN:["Staying friends","Clean closure","Mutual respect","Rekindling risk"]},
 {k:"capo",label:"Boss & Team",g:"★",sym:"★",dimN:["Clear leadership","Trust & delegation","Communication","Growth"]}
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
 amore:{u:{same:"you get each other on instinct, same emotional language",ally:"an attraction that flows naturally, you spark each other on",challenge:"the magnetic pull of two people who are different and keep seeking each other"},s:{same:"you're too alike and amplify the same flaws",ally:"you run fast but you need roots",challenge:"you feel and react in opposite ways, misunderstandings galore"}},
 amicizia:{u:{same:"same wavelength, friends at first sight",ally:"you drag each other into adventures and laughing fits",challenge:"you complete each other, each opening up a whole new world"},s:{same:"too similar, nobody ever pulls the brake",ally:"plenty of action but little depth when things get serious",challenge:"different rhythms and needs, sometimes you just don't get each other"}},
 lavoro:{u:{same:"same vision and same working pace",ally:"energies that feed each other and ideas on tap",challenge:"you complete each other: one has the vision, the other delivers"},s:{same:"overlapping roles and doubts about who's in charge",ally:"great launches but shaky follow-through on the details",challenge:"different priorities and timelines, you need clear roles"}},
 famiglia:{u:{same:"you recognize yourselves in each other, same temperament under one roof",ally:"a lively home buzzing with energy",challenge:"different but bonded, you teach each other"},s:{same:"two identical characters keep hitting the same sharp corners",ally:"too much restlessness, the house never sits still",challenge:"opposite ways of living spaces and emotions"}},
 convivenza:{u:{same:"same habits, the household runs like clockwork",ally:"a cheerful, sociable vibe within the walls",challenge:"you balance each other out: one brings order, the other brings life"},s:{same:"the same bad habits times two, either chaos or rigidity",ally:"lots of life but little practical management",challenge:"opposite ideas about cleaning, spaces and guests"}},
 ex:{u:{same:"you know each other by heart: no surprises, not even as exes",ally:"you stay on the same wavelength, talking comes easy",challenge:"you live on different planets by now, turning the page is easier"},s:{same:"the same things that once bound you now get on your nerves again",ally:"the old complicity risks rekindling the fire",challenge:"the opposites that once attracted you now push you apart"}},
 capo:{u:{same:"same language and same rhythm, you get each other instantly",ally:"energies that feed each other, leader and team in sync",challenge:"you complete each other: one steers, one delivers — natural roles"},s:{same:"two identical heads: who actually leads and who actually executes?",ally:"plenty of drive, but someone has to mind the details",challenge:"different priorities and timelines, without clear roles things jam up"}}
};
function lensDyn(lk,a,b){const cat=elCat(a.el,b.el);const mk=[a.mod,b.mod].sort().join("|");const t=LTX[lk]||LTX.amore;return {uni:t.u[cat],sco:t.s[cat],mod:(MODTX[mk]||"")};}
const LVERD={
 amicizia:["Complicated friends: best in small doses.","A friendship that works with a bit of effort.","Great friendship, it comes naturally.","Friends for life."],
 lavoro:["Difficult partners: high risk of clashes.","Works if you split the tasks wisely.","Great team, with clear roles.","Business partners built for success."],
 famiglia:["Tension at home: patience required.","You get along with a few compromises.","A lovely bond, a harmonious home.","One tight-knit family."],
 convivenza:["Tough cohabitation: keep your spaces well apart.","Living together works, with a few house rules.","Excellent housemates material.","Perfect roommates."],
 ex:["A hard chapter to close: distance is better.","As exes you only work with firm boundaries.","You manage to stay on good terms.","Model exes: true friends after love."],
 capo:["Tricky hierarchy: clashes over who's in charge.","Works with clear roles and rules.","Good boss-team dynamic.","Leader and right hand, a perfect match."]
};
function lensVerdict(lk,s){if(lk==="amore")return verdict(s);const arr=LVERD[lk];return arr[Math.min(3,Math.max(0,s-2))];}
function lensRitratto(lk,a,b,s,dy){
 const word={amore:"a couple",amicizia:"friends",lavoro:"business partners",famiglia:"family",convivenza:"roommates",ex:"exes",capo:"a boss-team duo"}[lk]||"a couple";
 const el={fuoco:"brings energy and drive",terra:"brings substance and roots",aria:"brings ideas and words",acqua:"brings emotion and intuition"};
 const mo={cardinale:"loves taking the initiative",fisso:"stands their ground",mobile:"adapts with ease"};
 const lead = s>=4?`As ${word}, ${a.n} and ${b.n} start ahead of the game.`
   : s>=3?`As ${word}, ${a.n} and ${b.n} can work if they meet halfway.`
   : `As ${word}, ${a.n} and ${b.n} are a tricky fit.`;
 return `${lead} ${a.n} ${el[a.el]} and ${mo[a.mod]}; ${b.n}, meanwhile, ${el[b.el]} and ${mo[b.mod]}. What binds you is ${dy.uni}; ${dy.mod}. The tension flares up when ${dy.sco}.`;
}
const LADV={
 amicizia:"Cultivate what makes you laugh and respect each other's space: this friendship runs on lightness — and on showing up when it really counts.",
 lavoro:"Define clear roles from day one — who decides what — and put your agreements in writing: partners fall out over ambiguity, not over numbers.",
 famiglia:"In a family nobody wins an argument — you hold a bond together: respect each other's character and timing.",
 convivenza:"A few clear rules on cleaning, spaces and guests, set right away: living together breaks down over the unsaid, not over the differences.",
 ex:"As exes there's one rule: clear boundaries and no gray areas. Decide what you are now — friends or distant — and stop reliving who you used to be.",
 capo:"Hierarchy holds when roles are explicit: whoever decides, decides; whoever executes gets autonomy and trust. It breaks when the boss won't let go of control or the team won't respect the lead."
};
function farla(a,b,ov){
  const pre = ov>=4?"You've got a solid foundation — don't take it for granted."
    : ov>=3?"It can work, but it takes real effort from both sides."
    : "It will take patience and a whole lot of talking.";
  return `${pre} The key is speaking each other's language: ${a.n} feels loved through “${a.ll.toLowerCase()}”, ${b.n} through “${b.ll.toLowerCase()}”. Whoever learns to give what truly matters to the other, wins.`;
}
function lensAdvice(lk,a,b,s){
  if(lk==="amore")return farla(a,b,s);
  const pre = s>=4?"You're starting from a great base.":s>=3?"It can work, with a little care.":"It will take commitment from both sides.";
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
  const sint = ["High tension","Balance to be built","Lovely chemistry","Off-the-charts chemistry"][Math.min(3,Math.max(0,s-2))];
  return {
    a, b, lens:l, lensKey:lk,
    score:s, pct:s*20, state, sym, sint,
    verdict: lensVerdict(lk,s),
    h2h: [
      {lab:"element", va:cap(a.el), vb:cap(b.el)},
      {lab:"mode", va:cap(a.mod), vb:cap(b.mod)},
      {lab:"planet",  va:a.ru, vb:b.ru},
      {lab:"love language", va:a.ll, vb:b.ll},
      {lab:"red flag", va:a.rf[0], vb:b.rf[0]}
    ],
    ritratto: lensRitratto(lk,a,b,s,dy),
    unisce: cap(dy.uni),
    scotta: cap(dy.sco),
    dims: l.dimN.map((n,i)=>({n, v:da[i]})),
    advice: lensAdvice(lk,a,b,s)
  };
}

window.ZODIAC_EN = { SIGNS, BY, LENSES, LBY, computeCouple, cap };

})();
