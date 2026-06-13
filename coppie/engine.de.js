(function(){
/* ============================================================
   ZODIAC · PAARE — ENGINE (Daten + Scoring + geteilte compute)
   Deutsche Ausgabe. Die Scoring-Logik ist die originale, unverändert.
   ============================================================ */

const SIGNS = [
 {k:"ariete",   n:"Widder",     g:"♈", el:"fuoco", mod:"cardinale", ru:"Mars",            ll:"Tatkräftige Gesten und Quality Time mit hohem Adrenalinpegel.", rf:["Impulsiv und ungeduldig","Fängt Feuer und ghostet dann","Egozentrisch, wenn er gewinnt"]},
 {k:"toro",     n:"Stier",      g:"♉", el:"terra", mod:"fisso",     ru:"Venus",           ll:"Körperliche Nähe und konkrete Gesten (Essen, Komfort, Präsenz).", rf:["Stur über jede Vernunft hinaus","Besitzergreifend","Faul, sobald es bequem wird"]},
 {k:"gemelli",  n:"Zwillinge",  g:"♊", el:"aria",  mod:"mobile",    ru:"Merkur",          ll:"Worte, Geplänkel und endlose Gespräche.", rf:["Wankelmütig","Manchmal oberflächlich","Sagt alles und das Gegenteil davon"]},
 {k:"cancro",   n:"Krebs",      g:"♋", el:"acqua", mod:"cardinale", ru:"Mond",            ll:"Gesten der Fürsorge und Quality Time, zu Hause.", rf:["Launisch","Zieht sich in den Panzer zurück","Passiv-aggressiv"]},
 {k:"leone",    n:"Löwe",       g:"♌", el:"fuoco", mod:"fisso",     ru:"Sonne",           ll:"Komplimente, Aufmerksamkeit und große Gesten.", rf:["Egozentrisch","Braucht ständigen Applaus","Dramatisch"]},
 {k:"vergine",  n:"Jungfrau",   g:"♍", el:"terra", mod:"mobile",    ru:"Merkur",          ll:"Liebesdienste: hilft dir, kümmert sich, regelt alles.", rf:["Überkritisch","Ängstlich","Lähmend perfektionistisch"]},
 {k:"bilancia", n:"Waage",      g:"♎", el:"aria",  mod:"cardinale", ru:"Venus",           ll:"Romantische Gesten, Quality Time und gemeinsame Harmonie.", rf:["Unentschlossen","Meidet sogar notwendige Konflikte","Will es allen recht machen"]},
 {k:"scorpione",n:"Skorpion",   g:"♏", el:"acqua", mod:"fisso",     ru:"Mars/Pluto",      ll:"Totale Intimität, Loyalität und Intensität.", rf:["Eifersüchtig und besitzergreifend","Rachsüchtig","Kontrollierend"]},
 {k:"sagittario",n:"Schütze",   g:"♐", el:"fuoco", mod:"mobile",    ru:"Jupiter",         ll:"Gemeinsame Abenteuer, Lachen und Freiheit.", rf:["Rastlos","Brutal direkt","Allergisch gegen Verbindlichkeit"]},
 {k:"capricorno",n:"Steinbock", g:"♑", el:"terra", mod:"cardinale", ru:"Saturn",          ll:"Verlässlichkeit, konkrete Verbindlichkeit und gewidmete Zeit.", rf:["Distanzierter Workaholic","Kühl an der Oberfläche","Zu kontrollierend"]},
 {k:"acquario", n:"Wassermann", g:"♒", el:"aria",  mod:"fisso",     ru:"Saturn/Uranus",   ll:"Respektierte Freiheit, geistige Komplizenschaft und gemeinsame Ideale.", rf:["Distanziert","Stur bei seinen Ideen","Unberechenbar"]},
 {k:"pesci",    n:"Fische",     g:"♓", el:"acqua", mod:"mobile",    ru:"Jupiter/Neptun",  ll:"Romantik, Zärtlichkeit und emotionale Verschmelzung.", rf:["Schwer zu fassen","Neigt zur Opferrolle","Schwache Grenzen"]}
];
const BY = Object.fromEntries(SIGNS.map(s=>[s.k,s]));

/* elemento → visuelle Familie (für die thematischen Farben) */
const ELEMENT_FAMILY = { fuoco:"fuoco", terra:"terra", aria:"aria", acqua:"acqua" };

/* Anzeige-Labels (die technischen Schlüssel bleiben auf Italienisch) */
const EL_DE = { fuoco:"Feuer", terra:"Erde", aria:"Luft", acqua:"Wasser" };
const MOD_DE = { cardinale:"Kardinal", fisso:"Fix", mobile:"Veränderlich" };

/* ---------- Basis-Engine (Liebe) ---------- */
function elScore(a,b){if(a===b)return 5;const k=[a,b].sort().join("|");return {"aria|fuoco":4,"acqua|terra":4,"acqua|aria":3,"aria|terra":3,"fuoco|terra":3,"acqua|fuoco":2}[k]||3;}
function modAdj(a,b){return a===b?-0.5:0.25;}
function overall(a,b){return Math.min(5,Math.max(2,Math.round(elScore(a.el,b.el)+modAdj(a.mod,b.mod))));}
function dims(a,b){const e=[a.el,b.el];const has=x=>e.includes(x);const both=x=>e[0]===x&&e[1]===x;let P=3,E=3,I=3,S=3;
  if(has("fuoco"))P++; if(both("fuoco"))P=5; if(has("fuoco")&&has("aria"))P=Math.max(P,5);
  if(has("acqua"))E++; if(both("acqua"))E=5;
  if(has("aria"))I++; if(both("aria"))I=5; if(a.el===b.el)I++;
  if(has("terra"))S++; if(both("terra"))S=5; if(a.mod==="fisso"&&b.mod==="fisso")S++; if(a.mod==="cardinale"&&b.mod==="cardinale")S--;
  const c=x=>Math.min(5,Math.max(1,x));return{Passione:c(P),Emozione:c(E),Intesa:c(I),Stabilità:c(S)};}
const ELTX={"acqua|acqua":["emotionale Tiefe und Sehnsucht nach echter Intimität","zwei stürmische Meere: die Stimmungen schaukeln sich gegenseitig hoch"],"terra|terra":["Bodenständigkeit, Loyalität und gemeinsame Projekte","der Funke kann in der Routine verglühen"],"fuoco|fuoco":["Leidenschaft, Energie und Leben auf vollen Touren","zwei Egos im Kampf um dieselbe Flamme"],"aria|aria":["geistige Verbindung, Leichtigkeit und tausend Gespräche","nur Kopf, kein Bauch: das Gefühl bleibt auf der Strecke"],"aria|fuoco":["die Luft nährt das Feuer: Stimulation und Bewegung ohne Pause","ihr riskiert, zu schnell auszubrennen, ohne Wurzeln"],"acqua|terra":["Wasser nährt die Erde: Sicherheit, die wachsen lässt","die Erde kann ersticken und das Wasser überschwemmen"],"fuoco|terra":["gemeinsamer Ehrgeiz und der Drang, etwas aufzubauen","entgegengesetztes Tempo: einer sprintet, der andere plant"],"acqua|fuoco":["eine magnetische Anziehung zwischen Gegensätzen","das Feuer verdampft das Wasser, das Wasser löscht das Feuer"],"aria|terra":["Ideen plus Bodenständigkeit, wenn jeder ein Stück nachgibt","der eine zu abstrakt, der andere zu pragmatisch"],"acqua|aria":["Sensibilität und Fantasie, die sich leicht berühren","Logik gegen Emotion: Missverständnisse kommen leicht"]};
const MODTX={"cardinale|cardinale":"zwei Anführer: ein Armdrücken darum, wer steuert","fisso|fisso":"solide und loyal, aber stur wie ein Esel","mobile|mobile":"flexibel und neugierig, aber etwas zerstreut","cardinale|fisso":"einer startet, der andere festigt: eine schöne Balance","cardinale|mobile":"Initiative plus Anpassungsfähigkeit: ihr haltet gut miteinander Schritt","fisso|mobile":"Wurzeln plus Bewegung: Stabilität, die lebendig bleibt"};
function dyn(a,b){const ek=[a.el,b.el].sort().join("|");const mk=[a.mod,b.mod].sort().join("|");const e=ELTX[ek]||["",""];return{unisce:e[0],scotta:e[1],mod:MODTX[mk]||""};}
function verdict(s){return s>=5?"Bilderbuch-Paar: es funkt und es hält.":s>=4?"Riesiges Potenzial: mit ein wenig Arbeit hebt es ab.":s>=3?"Es funktioniert, aber ihr müsst euch in der Mitte treffen.":"Eine echte Herausforderung: Gegensätze, die sich schwer verstehen.";}

/* ---------- Linsen ---------- */
const LENSES=[
 {k:"amore",label:"Liebe",g:"♥",sym:"♥",dimN:["Leidenschaft","Emotion","Chemie","Stabilität"]},
 {k:"amicizia",label:"Freundschaft",g:"✦",sym:"✦",dimN:["Spaß","Loyalität","Wellenlänge","Abenteuer"]},
 {k:"lavoro",label:"Arbeit & Partner",g:"⚙",sym:"⚙",dimN:["Komplementarität","Verlässlichkeit","Vision","Konfliktmanagement"]},
 {k:"famiglia",label:"Familie",g:"⌂",sym:"⌂",dimN:["Harmonie im Alltag","Emotionaler Rückhalt","Respekt für Freiräume","Loyalität"]},
 {k:"convivenza",label:"Zusammenleben",g:"◆",sym:"◆",dimN:["Ordnung & Organisation","Gemeinsame Räume","Stimmung zu Hause","Praktische Konflikte"]},
 {k:"ex",label:"Ex",g:"♡",sym:"♡",dimN:["Freunde bleiben","Sauberer Abschluss","Gegenseitiger Respekt","Risiko, wieder anzufangen"]},
 {k:"capo",label:"Chef & Team",g:"★",sym:"★",dimN:["Klare Führung","Vertrauen & Delegieren","Kommunikation","Wachstum"]}
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
 amore:{u:{same:"ihr versteht euch instinktiv, dieselbe emotionale Sprache",ally:"eine Anziehung, die ganz natürlich fließt, ihr entfacht einander",challenge:"die magnetische Anziehung zweier Menschen, die verschieden sind und sich immer wieder suchen"},s:{same:"ihr seid euch zu ähnlich und verstärkt dieselben Schwächen",ally:"ihr lauft schnell, aber euch fehlen die Wurzeln",challenge:"ihr fühlt und reagiert entgegengesetzt, Missverständnisse en masse"}},
 amicizia:{u:{same:"dieselbe Wellenlänge, Freunde auf den ersten Blick",ally:"einer zieht den anderen in Abenteuer und Lachanfälle",challenge:"ihr ergänzt euch, jeder öffnet dem anderen eine ganz neue Welt"},s:{same:"zu ähnlich, niemand zieht je die Bremse",ally:"viel Action, aber wenig Tiefe, wenn es ernst wird",challenge:"unterschiedliche Rhythmen und Bedürfnisse, manchmal versteht ihr euch einfach nicht"}},
 lavoro:{u:{same:"dieselbe Vision und dasselbe Arbeitstempo",ally:"Energien, die sich gegenseitig nähren, und Ideen am laufenden Band",challenge:"ihr ergänzt euch: einer hat die Vision, der andere liefert"},s:{same:"überlappende Rollen und Zweifel, wer das Sagen hat",ally:"großartige Starts, aber wacklige Umsetzung im Detail",challenge:"unterschiedliche Prioritäten und Zeitpläne, ihr braucht klare Rollen"}},
 famiglia:{u:{same:"ihr erkennt euch ineinander wieder, dasselbe Naturell unter einem Dach",ally:"ein lebhaftes Zuhause, voller Energie",challenge:"verschieden, aber verbunden, ihr lernt voneinander"},s:{same:"zwei gleiche Charaktere stoßen sich an denselben Kanten",ally:"zu viel Unruhe, das Haus steht nie still",challenge:"entgegengesetzte Arten, Räume und Emotionen zu leben"}},
 convivenza:{u:{same:"dieselben Gewohnheiten, der Haushalt läuft wie am Schnürchen",ally:"eine fröhliche, gesellige Stimmung in den eigenen vier Wänden",challenge:"ihr gleicht euch aus: einer bringt Ordnung, der andere Leben"},s:{same:"dieselben Macken in doppelter Dosis: zu viel Ordnung oder Starrheit",ally:"viel Leben, aber wenig praktische Organisation",challenge:"entgegengesetzte Vorstellungen von Putzen, Räumen und Besuch"}},
 ex:{u:{same:"ihr kennt euch in- und auswendig: keine Überraschungen, nicht mal als Ex",ally:"ihr bleibt auf derselben Wellenlänge, Reden fällt leicht",challenge:"ihr lebt längst auf verschiedenen Planeten, das Kapitel zu schließen fällt leichter"},s:{same:"dieselben Gründe, die euch einst verbanden, gehen euch wieder auf die Nerven",ally:"die alte Vertrautheit droht das Feuer neu zu entfachen",challenge:"die Gegensätze, die einst anzogen, stoßen euch jetzt ab"}},
 capo:{u:{same:"dieselbe Sprache und derselbe Rhythmus, ihr versteht euch auf einen Blick",ally:"Energien, die sich nähren, Chef und Team im Gleichklang",challenge:"ihr ergänzt euch: einer steuert, einer liefert — natürliche Rollen"},s:{same:"zwei gleiche Köpfe: wer führt wirklich und wer führt wirklich aus?",ally:"viel Schwung, aber jemand muss sich um die Details kümmern",challenge:"unterschiedliche Prioritäten und Zeitpläne, ohne klare Rollen hakt alles"}}
};
function lensDyn(lk,a,b){const cat=elCat(a.el,b.el);const mk=[a.mod,b.mod].sort().join("|");const t=LTX[lk]||LTX.amore;return {uni:t.u[cat],sco:t.s[cat],mod:(MODTX[mk]||"")};}
const LVERD={
 amicizia:["Komplizierte Freunde: am besten in kleinen Dosen.","Eine Freundschaft, die mit ein wenig Mühe funktioniert.","Tolle Freundschaft, sie kommt ganz natürlich.","Freunde fürs Leben."],
 lavoro:["Schwierige Partner: hohes Konfliktrisiko.","Funktioniert, wenn ihr die Aufgaben klug aufteilt.","Tolles Team, mit klaren Rollen.","Geschäftspartner, gemacht für den Erfolg."],
 famiglia:["Spannungen zu Hause: Geduld ist gefragt.","Ihr kommt mit ein paar Kompromissen aus.","Ein schönes Band, ein harmonisches Zuhause.","Eine eng verbundene Familie."],
 convivenza:["Hartes Zusammenleben: haltet eure Räume gut getrennt.","Zusammenleben klappt, mit ein paar Hausregeln.","Bestes Mitbewohner-Material.","Perfekte Mitbewohner."],
 ex:["Ein schwer abzuschließendes Kapitel: Abstand ist besser.","Als Ex funktioniert ihr nur mit festen Grenzen.","Ihr schafft es, gut miteinander auszukommen.","Vorzeige-Exe: echte Freunde nach der Liebe."],
 capo:["Schwierige Hierarchie: Streit darum, wer das Sagen hat.","Funktioniert mit klaren Rollen und Regeln.","Gute Chef-Team-Dynamik.","Führungskraft und rechte Hand, ein perfektes Gespann."]
};
function lensVerdict(lk,s){if(lk==="amore")return verdict(s);const arr=LVERD[lk];return arr[Math.min(3,Math.max(0,s-2))];}
function lensRitratto(lk,a,b,s,dy){
 const word={amore:"Paar",amicizia:"Freunde",lavoro:"Geschäftspartner",famiglia:"Familie",convivenza:"Mitbewohner",ex:"Ex",capo:"Chef-Team-Gespann"}[lk]||"Paar";
 const el={fuoco:"bringt Energie und Antrieb",terra:"bringt Substanz und Wurzeln",aria:"bringt Ideen und Worte",acqua:"bringt Emotion und Intuition"};
 const mo={cardinale:"ergreift gern die Initiative",fisso:"bleibt standhaft",mobile:"passt sich mühelos an"};
 const lead = s>=4?`Als ${word} starten ${a.n} und ${b.n} mit einem Vorsprung.`
   : s>=3?`Als ${word} können ${a.n} und ${b.n} funktionieren, wenn sie sich in der Mitte treffen.`
   : `Als ${word} sind ${a.n} und ${b.n} eine knifflige Kombination.`;
 return `${lead} ${a.n} ${el[a.el]} und ${mo[a.mod]}; ${b.n} wiederum ${el[b.el]} und ${mo[b.mod]}. Was euch verbindet, ist ${dy.uni}; ${dy.mod}. Die Spannung flammt auf, wenn ${dy.sco}.`;
}
const LADV={
 amicizia:"Pflegt das, was euch zum Lachen bringt, und respektiert die Freiräume des anderen: Diese Freundschaft lebt von Leichtigkeit — und davon, da zu sein, wenn es wirklich zählt.",
 lavoro:"Legt klare Rollen vom ersten Tag an fest — wer entscheidet was — und haltet eure Absprachen schriftlich fest: Partner zerstreiten sich an Mehrdeutigkeit, nicht an Zahlen.",
 famiglia:"In einer Familie gewinnt niemand einen Streit — man hält ein Band zusammen: respektiert den Charakter und das Tempo des anderen.",
 convivenza:"Ein paar klare Regeln zu Putzen, Räumen und Besuch, gleich zu Beginn festgelegt: Zusammenleben scheitert am Unausgesprochenen, nicht an den Unterschieden.",
 ex:"Als Ex gibt es nur eine Regel: klare Grenzen und keine Graubereiche. Entscheidet, was ihr jetzt seid — Freunde oder distanziert — und hört auf, neu zu durchleben, wer ihr früher wart.",
 capo:"Hierarchie hält, wenn die Rollen klar sind: Wer entscheidet, entscheidet; wer ausführt, bekommt Autonomie und Vertrauen. Sie zerbricht, wenn der Chef die Kontrolle nicht abgibt oder das Team die Führung nicht respektiert."
};
function farla(a,b,ov){
  const pre = ov>=4?"Ihr habt ein solides Fundament — nehmt es nicht als selbstverständlich hin."
    : ov>=3?"Es kann funktionieren, aber es braucht echten Einsatz von beiden Seiten."
    : "Es braucht Geduld und eine ganze Menge Gespräche.";
  return `${pre} Der Schlüssel ist, die Sprache des anderen zu sprechen: ${a.n} fühlt sich geliebt durch „${a.ll.toLowerCase()}“, ${b.n} durch „${b.ll.toLowerCase()}“. Wer lernt zu geben, was dem anderen wirklich wichtig ist, gewinnt.`;
}
function lensAdvice(lk,a,b,s){
  if(lk==="amore")return farla(a,b,s);
  const pre = s>=4?"Ihr startet von einer tollen Basis.":s>=3?"Es kann funktionieren, mit ein wenig Achtsamkeit.":"Es braucht Einsatz von beiden Seiten.";
  return `${pre} ${LADV[lk]}`;
}
function cap(s){return s?s.charAt(0).toUpperCase()+s.slice(1):s;}

/* ============================================================
   compute(state) → von allen Richtungen geteiltes Modell.
   Die Inhalte sind über die Themen hinweg identisch; nur die Grafik ändert sich.
   ============================================================ */
function computeCouple(ka, kb, lk){
  lk = lk || "amore";
  const a = BY[ka], b = BY[kb], l = LBY[lk];
  const s = lensScore(lk,a,b);
  const da = lensDims(lk,a,b);
  const dy = lensDyn(lk,a,b);
  const state = s>=4 ? "good" : (s<=2 ? "bad" : "mid");
  const sym = s>=4 ? l.sym : (s<=2 ? "⚡" : "≈");
  const sint = ["Hohe Spannung","Balance, die aufzubauen ist","Schöne Chemie","Chemie jenseits der Skala"][Math.min(3,Math.max(0,s-2))];
  return {
    a, b, lens:l, lensKey:lk,
    score:s, pct:s*20, state, sym, sint,
    verdict: lensVerdict(lk,s),
    h2h: [
      {lab:"Element", va:EL_DE[a.el]||cap(a.el), vb:EL_DE[b.el]||cap(b.el)},
      {lab:"Modalität", va:MOD_DE[a.mod]||cap(a.mod), vb:MOD_DE[b.mod]||cap(b.mod)},
      {lab:"Planet",  va:a.ru, vb:b.ru},
      {lab:"Sprache der Liebe", va:a.ll, vb:b.ll},
      {lab:"Red Flag", va:a.rf[0], vb:b.rf[0]}
    ],
    ritratto: lensRitratto(lk,a,b,s,dy),
    unisce: cap(dy.uni),
    scotta: cap(dy.sco),
    dims: l.dimN.map((n,i)=>({n, v:da[i]})),
    advice: lensAdvice(lk,a,b,s)
  };
}

window.ZODIAC_DE = { SIGNS, BY, LENSES, LBY, computeCouple, cap };

})();
