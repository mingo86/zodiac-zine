/* ============================================================
   ZODIAC · COPPIE — ENGINE (dati + scoring + compute condiviso)
   La logica di punteggio è quella originale, intatta.
   ============================================================ */

const SIGNS = [
 {k:"ariete",   n:"Ariete",    g:"\u2648", el:"fuoco", mod:"cardinale", ru:"Marte",          ll:"Gesti d'azione e tempo di qualità ad alta adrenalina.", rf:["Impulsivo e impaziente","Si infiamma e poi sparisce","Egocentrico quando vince"]},
 {k:"toro",     n:"Toro",      g:"\u2649", el:"terra", mod:"fisso",     ru:"Venere",         ll:"Contatto fisico e gesti concreti (cibo, comfort, presenza).", rf:["Testardo fino all'assurdo","Possessivo","Pigro quando si comoda"]},
 {k:"gemelli",  n:"Gemelli",   g:"\u264A", el:"aria",  mod:"mobile",    ru:"Mercurio",       ll:"Parole, battute e conversazioni infinite.", rf:["Incostante","A volte superficiale","Dice tutto e il contrario"]},
 {k:"cancro",   n:"Cancro",    g:"\u264B", el:"acqua", mod:"cardinale", ru:"Luna",           ll:"Gesti di cura e tempo di qualità, a casa.", rf:["Lunatico","Si chiude nel guscio","Passivo-aggressivo"]},
 {k:"leone",    n:"Leone",     g:"\u264C", el:"fuoco", mod:"fisso",     ru:"Sole",           ll:"Complimenti, attenzione e gesti spettacolari.", rf:["Egocentrico","Bisognoso di applausi","Drammatico"]},
 {k:"vergine",  n:"Vergine",   g:"\u264D", el:"terra", mod:"mobile",    ru:"Mercurio",       ll:"Atti di servizio: ti aiuta, ti cura, risolve.", rf:["Ipercritico","Ansioso","Perfezionista paralizzante"]},
 {k:"bilancia", n:"Bilancia",  g:"\u264E", el:"aria",  mod:"cardinale", ru:"Venere",         ll:"Gesti romantici, tempo di qualità e armonia condivisa.", rf:["Indeciso","Evita anche i conflitti necessari","Vuole piacere a tutti"]},
 {k:"scorpione",n:"Scorpione", g:"\u264F", el:"acqua", mod:"fisso",     ru:"Marte/Plutone",  ll:"Intimità totale, lealtà e intensità.", rf:["Geloso e possessivo","Vendicativo","Controllante"]},
 {k:"sagittario",n:"Sagittario",g:"\u2650",el:"fuoco", mod:"mobile",    ru:"Giove",          ll:"Avventure condivise, risate e libertà.", rf:["Irrequieto","Brutalmente schietto","Allergico agli impegni"]},
 {k:"capricorno",n:"Capricorno",g:"\u2651",el:"terra", mod:"cardinale", ru:"Saturno",        ll:"Affidabilità, impegno concreto e tempo dedicato.", rf:["Workaholic distante","Freddo in apparenza","Troppo controllante"]},
 {k:"acquario", n:"Acquario",  g:"\u2652", el:"aria",  mod:"fisso",     ru:"Saturno/Urano",  ll:"Libertà rispettata, complicità mentale e cause condivise.", rf:["Distaccato","Testardo nelle idee","Imprevedibile"]},
 {k:"pesci",    n:"Pesci",     g:"\u2653", el:"acqua", mod:"mobile",    ru:"Giove/Nettuno",  ll:"Romanticismo, tenerezza e fusione emotiva.", rf:["Sfuggente","Tende al vittimismo","Confini deboli"]}
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
const ELTX={"acqua|acqua":["profondità emotiva e bisogno di intimità vera","due mari in tempesta: gli umori si amplificano"],"terra|terra":["concretezza, lealtà e progetti condivisi","la scintilla può spegnersi nella routine"],"fuoco|fuoco":["passione, energia e voglia di vivere al massimo","due ego che vogliono comandare lo stesso fuoco"],"aria|aria":["intesa mentale, leggerezza e mille conversazioni","tanta testa e poca pancia: l'emotività latita"],"aria|fuoco":["l'aria alimenta il fuoco: stimolo e movimento continui","si rischia di bruciare in fretta, senza radici"],"acqua|terra":["l'acqua nutre la terra: sicurezza che fa crescere","la terra può soffocare e l'acqua allagare"],"fuoco|terra":["ambizione condivisa e voglia di costruire","ritmi opposti: uno corre, l'altro pianifica"],"acqua|fuoco":["un'attrazione magnetica tra opposti","il fuoco evapora l'acqua, l'acqua spegne il fuoco"],"aria|terra":["idee più concretezza, se ci si incontra a metà","uno troppo astratto, l'altro troppo pratico"],"acqua|aria":["sensibilità e immaginazione che si sfiorano","logica contro emozione: ci si fraintende facile"]};
const MODTX={"cardinale|cardinale":"due leader: braccio di ferro su chi guida","fisso|fisso":"solidi e leali, ma testardi come muli","mobile|mobile":"flessibili e curiosi, ma un po' dispersivi","cardinale|fisso":"uno avvia, l'altro consolida: buon equilibrio","cardinale|mobile":"iniziativa più adattabilità: si seguono bene","fisso|mobile":"radici più movimento: stabilità che resta viva"};
function dyn(a,b){const ek=[a.el,b.el].sort().join("|");const mk=[a.mod,b.mod].sort().join("|");const e=ELTX[ek]||["",""];return{unisce:e[0],scotta:e[1],mod:MODTX[mk]||""};}
function verdict(s){return s>=5?"Coppia da manuale: scocca e dura.":s>=4?"Grande potenziale: con un po' di lavoro, vola.":s>=3?"Funziona, ma bisogna incontrarsi a metà.":"Sfida vera: opposti che faticano a capirsi.";}

/* ---------- lenti ---------- */
const LENSES=[
 {k:"amore",label:"Amore",g:"♥",sym:"♥",dimN:["Passione","Emozione","Intesa","Stabilità"]},
 {k:"amicizia",label:"Amicizia",g:"✦",sym:"✦",dimN:["Divertimento","Lealtà","Sintonia","Avventura"]},
 {k:"lavoro",label:"Lavoro & Soci",g:"⚙",sym:"⚙",dimN:["Complementarità","Affidabilità","Visione","Gestione conflitti"]},
 {k:"famiglia",label:"Famiglia",g:"⌂",sym:"⌂",dimN:["Armonia quotidiana","Supporto emotivo","Rispetto spazi","Lealtà"]},
 {k:"convivenza",label:"Convivenza",g:"◆",sym:"◆",dimN:["Ordine & gestione","Spazi condivisi","Clima in casa","Conflitti pratici"]},
 {k:"ex",label:"Ex",g:"♡",sym:"♡",dimN:["Restare amici","Chiusura serena","Rispetto reciproco","Ritorno di fiamma"]},
 {k:"capo",label:"Capo & Team",g:"★",sym:"★",dimN:["Leadership chiara","Fiducia & delega","Comunicazione","Crescita"]}
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
 amore:{u:{same:"vi capite d'istinto, stesso linguaggio emotivo",ally:"un'attrazione che scorre naturale, vi stimolate a vicenda",challenge:"la scintilla magnetica di chi è diverso e si cerca"},s:{same:"vi somigliate troppo e amplificate gli stessi difetti",ally:"correte veloci ma servono radici",challenge:"sentite e reagite in modi opposti, ci si fraintende"}},
 amicizia:{u:{same:"stessa lunghezza d'onda, amici a prima vista",ally:"vi trascinate nelle avventure e nelle risate",challenge:"vi completate, ognuno apre all'altro un mondo nuovo"},s:{same:"troppo simili, nessuno tira mai il freno",ally:"tanto movimento ma poca profondità nei momenti seri",challenge:"ritmi e bisogni diversi, a volte non vi capite"}},
 lavoro:{u:{same:"stessa visione e stesso passo di lavoro",ally:"energie che si alimentano e idee a raffica",challenge:"vi completate: chi ha la visione e chi esegue"},s:{same:"ruoli sovrapposti e dubbi su chi comanda",ally:"grandi partenze ma poca tenuta sui dettagli",challenge:"priorità e tempi diversi, servono ruoli chiari"}},
 famiglia:{u:{same:"vi riconoscete, stessa indole sotto lo stesso tetto",ally:"casa vivace e piena di energia",challenge:"diversi ma legati, vi insegnate a vicenda"},s:{same:"due caratteri uguali sbattono sugli stessi spigoli",ally:"troppa irrequietezza, la casa non si ferma mai",challenge:"modi opposti di vivere spazi ed emozioni"}},
 convivenza:{u:{same:"stesse abitudini, la casa fila liscia",ally:"clima allegro e sociale tra le mura",challenge:"vi bilanciate, chi mette ordine e chi mette vita"},s:{same:"stessi vizi raddoppiati, ordine o rigidità",ally:"tanta vita ma poca gestione pratica",challenge:"idee opposte su pulizia, spazi e ospiti"}},
 ex:{u:{same:"vi conoscete a memoria: nessuna sorpresa, neanche da ex",ally:"restate sulla stessa lunghezza d'onda, parlarvi è facile",challenge:"ormai vivete su pianeti diversi, più facile voltare pagina"},s:{same:"gli stessi motivi che vi legavano vi riaccendono i nervi",ally:"la vecchia complicità rischia di riaccendere il fuoco",challenge:"gli opposti che vi attiravano ora vi respingono"}},
 capo:{u:{same:"stesso linguaggio e stesso ritmo, vi capite al volo",ally:"energie che si alimentano, leader e team in sintonia",challenge:"vi completate: chi guida e chi realizza, ruoli naturali"},s:{same:"due teste uguali: chi guida e chi esegue davvero?",ally:"tanto slancio, ma serve chi tenga i dettagli",challenge:"priorità e tempi diversi, senza ruoli chiari ci si inceppa"}}
};
function lensDyn(lk,a,b){const cat=elCat(a.el,b.el);const mk=[a.mod,b.mod].sort().join("|");const t=LTX[lk]||LTX.amore;return {uni:t.u[cat],sco:t.s[cat],mod:(MODTX[mk]||"")};}
const LVERD={
 amicizia:["Amici complicati: meglio a piccole dosi.","Amicizia che funziona con un po' di sforzo.","Ottima amicizia, viene naturale.","Amici per la pelle."],
 lavoro:["Soci difficili: alto rischio di scontri.","Funziona se vi dividete bene i compiti.","Ottimo team, con ruoli chiari.","Soci da impresa di successo."],
 famiglia:["Tensioni in casa: serve pazienza.","Si va d'accordo con qualche compromesso.","Bel legame, casa armoniosa.","Famiglia molto affiatata."],
 convivenza:["Convivenza tosta: meglio spazi ben separati.","Convivenza ok, con qualche regola.","Ottima convivenza.","Coinquilini perfetti."],
 ex:["Capitolo difficile da chiudere: meglio distanza.","Da ex funzionate solo con dei paletti.","Riuscite a restare in buoni rapporti.","Ex modello: amici veri dopo l'amore."],
 capo:["Gerarchia difficile: scontri su chi comanda.","Funziona con ruoli e regole chiare.","Buona dinamica capo-team.","Leader e braccio destro perfetti."]
};
function lensVerdict(lk,s){if(lk==="amore")return verdict(s);const arr=LVERD[lk];return arr[Math.min(3,Math.max(0,s-2))];}
function lensRitratto(lk,a,b,s,dy){
 const word={amore:"coppia",amicizia:"amici",lavoro:"soci",famiglia:"famiglia",convivenza:"coinquilini",ex:"ex",capo:"dinamica capo-team"}[lk]||"coppia";
 const el={fuoco:"porta energia e slancio",terra:"porta concretezza e radici",aria:"porta idee e parole",acqua:"porta emozione e intuito"};
 const mo={cardinale:"ama prendere l'iniziativa",fisso:"tiene il punto",mobile:"si adatta con facilità"};
 const lead = s>=4?`Come ${word}, ${a.n} e ${b.n} partono avvantaggiati.`
   : s>=3?`Come ${word}, ${a.n} e ${b.n} possono funzionare incontrandosi a metà.`
   : `Come ${word}, ${a.n} e ${b.n} sono un incastro difficile.`;
 return `${lead} ${a.n} ${el[a.el]} e ${mo[a.mod]}; ${b.n} invece ${el[b.el]} e ${mo[b.mod]}. Ciò che vi lega è ${dy.uni}; ${dy.mod}. La tensione nasce quando ${dy.sco}.`;
}
const LADV={
 amicizia:"Coltivate ciò che vi diverte e rispettate gli spazi: l'amicizia regge sulla leggerezza e sulla presenza nei momenti veri.",
 lavoro:"Definite ruoli chiari fin dall'inizio — chi decide cosa — e mettete per iscritto gli accordi: i soci litigano sull'ambiguità, non sui numeri.",
 famiglia:"In famiglia non si vince una discussione, si tiene insieme un legame: rispettate i caratteri e i tempi di ciascuno.",
 convivenza:"Poche regole chiare su pulizia, spazi e ospiti, decise subito: la convivenza si rompe sui non-detti, non sulle differenze.",
 ex:"Da ex la regola è una: confini chiari e niente zone grigie. Decidete cosa siete ora — amici o lontani — e smettete di rivivere chi eravate.",
 capo:"La gerarchia regge se i ruoli sono espliciti: chi decide decide, chi esegue ha autonomia e fiducia. Si rompe quando il capo non molla il controllo o il team non rispetta la guida."
};
function farla(a,b,ov){
  const pre = ov>=4?"Avete una base solida — non datela per scontata."
    : ov>=3?"Si può fare, ma con lavoro vero da entrambe le parti."
    : "Servirà pazienza e molta comunicazione.";
  return `${pre} La chiave è parlare la lingua dell'altro: ${a.n} vive d'amore attraverso «${a.ll.toLowerCase()}», ${b.n} attraverso «${b.ll.toLowerCase()}». Chi impara a dare ciò che conta davvero per l'altro, vince.`;
}
function lensAdvice(lk,a,b,s){
  if(lk==="amore")return farla(a,b,s);
  const pre = s>=4?"Avete una base ottima.":s>=3?"Si può fare, con un po' di attenzione.":"Servirà impegno da entrambe le parti.";
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
  const sint = ["Tanta tensione","Equilibrio da costruire","Bella sintonia","Sintonia altissima"][Math.min(3,Math.max(0,s-2))];
  return {
    a, b, lens:l, lensKey:lk,
    score:s, pct:s*20, state, sym, sint,
    verdict: lensVerdict(lk,s),
    h2h: [
      {lab:"elemento", va:cap(a.el), vb:cap(b.el)},
      {lab:"modalità", va:cap(a.mod), vb:cap(b.mod)},
      {lab:"pianeta",  va:a.ru, vb:b.ru},
      {lab:"linguaggio d'amore", va:a.ll, vb:b.ll},
      {lab:"red flag", va:a.rf[0], vb:b.rf[0]}
    ],
    ritratto: lensRitratto(lk,a,b,s,dy),
    unisce: cap(dy.uni),
    scotta: cap(dy.sco),
    dims: l.dimN.map((n,i)=>({n, v:da[i]})),
    advice: lensAdvice(lk,a,b,s)
  };
}

window.ZODIAC = { SIGNS, BY, LENSES, LBY, computeCouple, cap };
