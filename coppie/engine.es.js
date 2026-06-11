(function(){
/* ============================================================
   ZODIAC · PAREJAS — ENGINE ES (datos + scoring + compute compartido)
   La lógica de puntuación es la original, intacta.
   ============================================================ */

const SIGNS = [
 {k:"ariete",   n:"Aries",      g:"♈", el:"fuoco", mod:"cardinale", ru:"Marte",          ll:"Gestos de acción y tiempo de calidad a pura adrenalina.", rf:["Impulsivo e impaciente","Se enciende y luego desaparece","Egocéntrico cuando gana"]},
 {k:"toro",     n:"Tauro",      g:"♉", el:"terra", mod:"fisso",     ru:"Venus",          ll:"Contacto físico y gestos concretos (comida, confort, presencia).", rf:["Terco hasta el absurdo","Posesivo","Perezoso cuando se acomoda"]},
 {k:"gemelli",  n:"Géminis",    g:"♊", el:"aria",  mod:"mobile",    ru:"Mercurio",       ll:"Palabras, bromas y conversaciones infinitas.", rf:["Inconstante","A veces superficial","Dice una cosa y la contraria"]},
 {k:"cancro",   n:"Cáncer",     g:"♋", el:"acqua", mod:"cardinale", ru:"Luna",           ll:"Gestos de cuidado y tiempo de calidad, en casa.", rf:["Lunático","Se encierra en su caparazón","Pasivo-agresivo"]},
 {k:"leone",    n:"Leo",        g:"♌", el:"fuoco", mod:"fisso",     ru:"Sol",            ll:"Cumplidos, atención y gestos espectaculares.", rf:["Egocéntrico","Necesitado de aplausos","Dramático"]},
 {k:"vergine",  n:"Virgo",      g:"♍", el:"terra", mod:"mobile",    ru:"Mercurio",       ll:"Actos de servicio: te ayuda, te cuida, lo resuelve todo.", rf:["Hipercrítico","Ansioso","Perfeccionista paralizante"]},
 {k:"bilancia", n:"Libra",      g:"♎", el:"aria",  mod:"cardinale", ru:"Venus",          ll:"Gestos románticos, tiempo de calidad y armonía compartida.", rf:["Indeciso","Evita hasta los conflictos necesarios","Quiere gustarle a todo el mundo"]},
 {k:"scorpione",n:"Escorpio",   g:"♏", el:"acqua", mod:"fisso",     ru:"Marte/Plutón",   ll:"Intimidad total, lealtad e intensidad.", rf:["Celoso y posesivo","Vengativo","Controlador"]},
 {k:"sagittario",n:"Sagitario", g:"♐", el:"fuoco", mod:"mobile",    ru:"Júpiter",        ll:"Aventuras compartidas, risas y libertad.", rf:["Inquieto","Brutalmente sincero","Alérgico a los compromisos"]},
 {k:"capricorno",n:"Capricornio",g:"♑",el:"terra", mod:"cardinale", ru:"Saturno",        ll:"Fiabilidad, compromiso concreto y tiempo dedicado.", rf:["Workaholic distante","Frío en apariencia","Demasiado controlador"]},
 {k:"acquario", n:"Acuario",    g:"♒", el:"aria",  mod:"fisso",     ru:"Saturno/Urano",  ll:"Libertad respetada, complicidad mental y causas compartidas.", rf:["Distante","Terco con sus ideas","Impredecible"]},
 {k:"pesci",    n:"Piscis",     g:"♓", el:"acqua", mod:"mobile",    ru:"Júpiter/Neptuno",ll:"Romanticismo, ternura y fusión emocional.", rf:["Escurridizo","Tiende al victimismo","Límites difusos"]}
];
const BY = Object.fromEntries(SIGNS.map(s=>[s.k,s]));

/* elemento → familia visual (para los colores temáticos) */
const ELEMENT_FAMILY = { fuoco:"fuoco", terra:"terra", aria:"aria", acqua:"acqua" };

/* ---------- motor base (amore) ---------- */
function elScore(a,b){if(a===b)return 5;const k=[a,b].sort().join("|");return {"aria|fuoco":4,"acqua|terra":4,"acqua|aria":3,"aria|terra":3,"fuoco|terra":3,"acqua|fuoco":2}[k]||3;}
function modAdj(a,b){return a===b?-0.5:0.25;}
function overall(a,b){return Math.min(5,Math.max(2,Math.round(elScore(a.el,b.el)+modAdj(a.mod,b.mod))));}
function dims(a,b){const e=[a.el,b.el];const has=x=>e.includes(x);const both=x=>e[0]===x&&e[1]===x;let P=3,E=3,I=3,S=3;
  if(has("fuoco"))P++; if(both("fuoco"))P=5; if(has("fuoco")&&has("aria"))P=Math.max(P,5);
  if(has("acqua"))E++; if(both("acqua"))E=5;
  if(has("aria"))I++; if(both("aria"))I=5; if(a.el===b.el)I++;
  if(has("terra"))S++; if(both("terra"))S=5; if(a.mod==="fisso"&&b.mod==="fisso")S++; if(a.mod==="cardinale"&&b.mod==="cardinale")S--;
  const c=x=>Math.min(5,Math.max(1,x));return{Passione:c(P),Emozione:c(E),Intesa:c(I),Stabilità:c(S)};}
const ELTX={"acqua|acqua":["profundidad emocional y necesidad de intimidad de verdad","dos mares en tempestad: los humores se amplifican"],"terra|terra":["concreción, lealtad y proyectos compartidos","la chispa puede apagarse en la rutina"],"fuoco|fuoco":["pasión, energía y ganas de vivir al máximo","dos egos que quieren mandar sobre el mismo fuego"],"aria|aria":["conexión mental, ligereza y mil conversaciones","mucha cabeza y poca tripa: la emoción brilla por su ausencia"],"aria|fuoco":["el aire alimenta el fuego: estímulo y movimiento continuos","el riesgo es arder demasiado rápido, sin raíces"],"acqua|terra":["el agua nutre la tierra: seguridad que hace crecer","la tierra puede asfixiar y el agua inundar"],"fuoco|terra":["ambición compartida y ganas de construir","ritmos opuestos: uno corre, el otro planifica"],"acqua|fuoco":["una atracción magnética entre opuestos","el fuego evapora el agua, el agua apaga el fuego"],"aria|terra":["ideas más concreción, si se encuentran a medio camino","uno demasiado abstracto, el otro demasiado práctico"],"acqua|aria":["sensibilidad e imaginación que se rozan","lógica contra emoción: malentendidos garantizados"]};
const MODTX={"cardinale|cardinale":"dos líderes: pulso permanente por ver quién manda","fisso|fisso":"sólidos y leales, pero tercos como mulas","mobile|mobile":"flexibles y curiosos, aunque un poco dispersos","cardinale|fisso":"uno arranca, el otro consolida: buen equilibrio","cardinale|mobile":"iniciativa más adaptabilidad: se siguen bien el ritmo","fisso|mobile":"raíces más movimiento: estabilidad que sigue viva"};
function dyn(a,b){const ek=[a.el,b.el].sort().join("|");const mk=[a.mod,b.mod].sort().join("|");const e=ELTX[ek]||["",""];return{unisce:e[0],scotta:e[1],mod:MODTX[mk]||""};}
function verdict(s){return s>=5?"Pareja de manual: salta la chispa y dura.":s>=4?"Gran potencial: con un poco de trabajo, vuela.":s>=3?"Funciona, pero hay que encontrarse a medio camino.":"Reto de verdad: opuestos a los que les cuesta entenderse.";}

/* ---------- lentes ---------- */
const LENSES=[
 {k:"amore",label:"Amor",g:"♥",sym:"♥",dimN:["Pasión","Emoción","Conexión","Estabilidad"]},
 {k:"amicizia",label:"Amistad",g:"✦",sym:"✦",dimN:["Diversión","Lealtad","Sintonía","Aventura"]},
 {k:"lavoro",label:"Trabajo & Socios",g:"⚙",sym:"⚙",dimN:["Complementariedad","Fiabilidad","Visión","Gestión de conflictos"]},
 {k:"famiglia",label:"Familia",g:"⌂",sym:"⌂",dimN:["Armonía diaria","Apoyo emocional","Respeto de espacios","Lealtad"]},
 {k:"convivenza",label:"Convivencia",g:"◆",sym:"◆",dimN:["Orden & gestión","Espacios compartidos","Clima en casa","Conflictos prácticos"]},
 {k:"ex",label:"Ex",g:"♡",sym:"♡",dimN:["Quedar como amigos","Cierre sereno","Respeto mutuo","Recaída amorosa"]},
 {k:"capo",label:"Jefe & Equipo",g:"★",sym:"★",dimN:["Liderazgo claro","Confianza & delegación","Comunicación","Crecimiento"]}
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
 amore:{u:{same:"se entienden por puro instinto, mismo idioma emocional",ally:"una atracción que fluye natural, se estimulan mutuamente",challenge:"la chispa magnética de quien es distinto y aun así se busca"},s:{same:"se parecen demasiado y amplifican los mismos defectos",ally:"corren rápido pero faltan raíces",challenge:"sienten y reaccionan de formas opuestas, los malentendidos están servidos"}},
 amicizia:{u:{same:"misma longitud de onda, amigos a primera vista",ally:"se arrastran mutuamente a aventuras y carcajadas",challenge:"se completan, cada uno le abre al otro un mundo nuevo"},s:{same:"demasiado parecidos, nadie pisa nunca el freno",ally:"mucho movimiento pero poca profundidad en los momentos serios",challenge:"ritmos y necesidades distintos, a veces no se entienden"}},
 lavoro:{u:{same:"misma visión y mismo paso de trabajo",ally:"energías que se alimentan e ideas en ráfaga",challenge:"se completan: uno pone la visión y el otro ejecuta"},s:{same:"roles solapados y dudas sobre quién manda",ally:"grandes arranques pero poco aguante en los detalles",challenge:"prioridades y tiempos distintos, hacen falta roles claros"}},
 famiglia:{u:{same:"se reconocen al instante, misma índole bajo el mismo techo",ally:"casa animada y llena de energía",challenge:"distintos pero unidos, se enseñan mutuamente"},s:{same:"dos caracteres iguales chocan contra las mismas esquinas",ally:"demasiada inquietud, la casa no para nunca",challenge:"modos opuestos de vivir los espacios y las emociones"}},
 convivenza:{u:{same:"mismas costumbres, la casa va sobre ruedas",ally:"clima alegre y social entre esas cuatro paredes",challenge:"se equilibran: uno pone orden y el otro pone vida"},s:{same:"mismos vicios por duplicado, orden o rigidez",ally:"mucha vida pero poca gestión práctica",challenge:"ideas opuestas sobre limpieza, espacios e invitados"}},
 ex:{u:{same:"se conocen de memoria: cero sorpresas, ni siquiera de ex",ally:"siguen en la misma longitud de onda, hablarse es fácil",challenge:"ya viven en planetas distintos, más fácil pasar página"},s:{same:"los mismos motivos que los unían vuelven a crisparles los nervios",ally:"la vieja complicidad amenaza con reavivar el fuego",challenge:"los opuestos que antes los atraían ahora los repelen"}},
 capo:{u:{same:"mismo idioma y mismo ritmo, se entienden al vuelo",ally:"energías que se alimentan, líder y equipo en sintonía",challenge:"se completan: uno guía y el otro ejecuta, roles naturales"},s:{same:"dos cabezas iguales: ¿quién guía y quién ejecuta de verdad?",ally:"mucho impulso, pero hace falta alguien que cuide los detalles",challenge:"prioridades y tiempos distintos, sin roles claros todo se atasca"}}
};
function lensDyn(lk,a,b){const cat=elCat(a.el,b.el);const mk=[a.mod,b.mod].sort().join("|");const t=LTX[lk]||LTX.amore;return {uni:t.u[cat],sco:t.s[cat],mod:(MODTX[mk]||"")};}
const LVERD={
 amicizia:["Amigos complicados: mejor en dosis pequeñas.","Amistad que funciona con algo de esfuerzo.","Gran amistad, sale sola.","Amigos del alma."],
 lavoro:["Socios difíciles: alto riesgo de choques.","Funciona si se reparten bien las tareas.","Equipazo, con roles claros.","Socios de empresa de éxito."],
 famiglia:["Tensiones en casa: hace falta paciencia.","Se llevan bien con algún que otro compromiso.","Bonito vínculo, casa armoniosa.","Familia superunida."],
 convivenza:["Convivencia dura: mejor espacios bien separados.","Convivencia ok, con alguna regla.","Convivencia excelente.","Compañeros de piso perfectos."],
 ex:["Capítulo difícil de cerrar: mejor distancia.","Como ex solo funcionan con límites claros.","Logran mantener una buena relación.","Ex de manual: amigos de verdad después del amor."],
 capo:["Jerarquía difícil: choques sobre quién manda.","Funciona con roles y reglas claras.","Buena dinámica jefe-equipo.","Líder y mano derecha perfectos."]
};
function lensVerdict(lk,s){if(lk==="amore")return verdict(s);const arr=LVERD[lk];return arr[Math.min(3,Math.max(0,s-2))];}
function lensRitratto(lk,a,b,s,dy){
 const word={amore:"pareja",amicizia:"amigos",lavoro:"socios",famiglia:"familia",convivenza:"compañeros de piso",ex:"ex",capo:"dinámica jefe-equipo"}[lk]||"pareja";
 const el={fuoco:"aporta energía e impulso",terra:"aporta concreción y raíces",aria:"aporta ideas y palabras",acqua:"aporta emoción e intuición"};
 const mo={cardinale:"adora tomar la iniciativa",fisso:"se mantiene en sus trece",mobile:"se adapta con facilidad"};
 const lead = s>=4?`Como ${word}, ${a.n} y ${b.n} parten con ventaja.`
   : s>=3?`Como ${word}, ${a.n} y ${b.n} pueden funcionar encontrándose a medio camino.`
   : `Como ${word}, ${a.n} y ${b.n} son un encaje difícil.`;
 return `${lead} ${a.n} ${el[a.el]} y ${mo[a.mod]}; ${b.n} en cambio ${el[b.el]} y ${mo[b.mod]}. Lo que los une es ${dy.uni}; ${dy.mod}. La tensión nace cuando ${dy.sco}.`;
}
const LADV={
 amicizia:"Cultiven lo que los divierte y respeten los espacios: la amistad se sostiene en la ligereza y en estar presentes en los momentos que cuentan.",
 lavoro:"Definan roles claros desde el principio — quién decide qué — y pongan los acuerdos por escrito: los socios pelean por la ambigüedad, no por los números.",
 famiglia:"En familia no se gana una discusión, se mantiene unido un vínculo: respeten los caracteres y los tiempos de cada uno.",
 convivenza:"Pocas reglas claras sobre limpieza, espacios e invitados, decididas desde el día uno: la convivencia se rompe por lo no dicho, no por las diferencias.",
 ex:"De ex la regla es una sola: límites claros y nada de zonas grises. Decidan qué son ahora — amigos o distancia — y dejen de revivir lo que fueron.",
 capo:"La jerarquía aguanta si los roles son explícitos: quien decide, decide; quien ejecuta tiene autonomía y confianza. Se rompe cuando el jefe no suelta el control o el equipo no respeta a quien guía."
};
function farla(a,b,ov){
  const pre = ov>=4?"Tienen una base sólida — no la den por sentada."
    : ov>=3?"Se puede, pero con trabajo de verdad por ambas partes."
    : "Hará falta paciencia y mucha comunicación.";
  return `${pre} La clave es hablar el idioma del otro: ${a.n} vive el amor a través de «${a.ll.toLowerCase()}», ${b.n} a través de «${b.ll.toLowerCase()}». Quien aprende a dar lo que de verdad le importa al otro, gana.`;
}
function lensAdvice(lk,a,b,s){
  if(lk==="amore")return farla(a,b,s);
  const pre = s>=4?"Tienen una base excelente.":s>=3?"Se puede, con un poco de atención.":"Hará falta compromiso por ambas partes.";
  return `${pre} ${LADV[lk]}`;
}
function cap(s){return s?s.charAt(0).toUpperCase()+s.slice(1):s;}

/* ============================================================
   compute(state) → modelo compartido por todas las direcciones.
   Los contenidos son idénticos entre temas; solo cambia la gráfica.
   ============================================================ */
function computeCouple(ka, kb, lk){
  lk = lk || "amore";
  const a = BY[ka], b = BY[kb], l = LBY[lk];
  const s = lensScore(lk,a,b);
  const da = lensDims(lk,a,b);
  const dy = lensDyn(lk,a,b);
  const state = s>=4 ? "good" : (s<=2 ? "bad" : "mid");
  const sym = s>=4 ? l.sym : (s<=2 ? "⚡" : "≈");
  const sint = ["Tensión a raudales","Equilibrio por construir","Buena sintonía","Sintonía altísima"][Math.min(3,Math.max(0,s-2))];
  return {
    a, b, lens:l, lensKey:lk,
    score:s, pct:s*20, state, sym, sint,
    verdict: lensVerdict(lk,s),
    h2h: [
      {lab:"elemento", va:cap(a.el), vb:cap(b.el)},
      {lab:"modalidad", va:cap(a.mod), vb:cap(b.mod)},
      {lab:"planeta",  va:a.ru, vb:b.ru},
      {lab:"lenguaje del amor", va:a.ll, vb:b.ll},
      {lab:"red flag", va:a.rf[0], vb:b.rf[0]}
    ],
    ritratto: lensRitratto(lk,a,b,s,dy),
    unisce: cap(dy.uni),
    scotta: cap(dy.sco),
    dims: l.dimN.map((n,i)=>({n, v:da[i]})),
    advice: lensAdvice(lk,a,b,s)
  };
}

window.ZODIAC_ES = { SIGNS, BY, LENSES, LBY, computeCouple, cap };

})();
