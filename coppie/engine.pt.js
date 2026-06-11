(function(){
/* ============================================================
   ZODIAC · CASAIS — ENGINE pt-BR (dados + scoring + compute)
   A lógica de pontuação é a original, intacta.
   ============================================================ */

const SIGNS = [
 {k:"ariete",   n:"Áries",      g:"♈", el:"fuoco", mod:"cardinale", ru:"Marte",           ll:"Gestos de ação e tempo de qualidade com adrenalina alta.", rf:["Impulsivo e impaciente","Pega fogo e depois some","Egocêntrico quando ganha"]},
 {k:"toro",     n:"Touro",      g:"♉", el:"terra", mod:"fisso",     ru:"Vênus",           ll:"Contato físico e gestos concretos (comida, conforto, presença).", rf:["Teimoso até o absurdo","Possessivo","Preguiçoso quando se acomoda"]},
 {k:"gemelli",  n:"Gêmeos",     g:"♊", el:"aria",  mod:"mobile",    ru:"Mercúrio",        ll:"Palavras, piadas e conversas infinitas.", rf:["Inconstante","Às vezes superficial","Diz tudo e o contrário de tudo"]},
 {k:"cancro",   n:"Câncer",     g:"♋", el:"acqua", mod:"cardinale", ru:"Lua",             ll:"Gestos de cuidado e tempo de qualidade, em casa.", rf:["De lua","Se fecha na concha","Passivo-agressivo"]},
 {k:"leone",    n:"Leão",       g:"♌", el:"fuoco", mod:"fisso",     ru:"Sol",             ll:"Elogios, atenção e gestos espetaculares.", rf:["Egocêntrico","Carente de aplausos","Dramático"]},
 {k:"vergine",  n:"Virgem",     g:"♍", el:"terra", mod:"mobile",    ru:"Mercúrio",        ll:"Atos de serviço: te ajuda, cuida de você, resolve.", rf:["Hipercrítico","Ansioso","Perfeccionista de paralisar"]},
 {k:"bilancia", n:"Libra",      g:"♎", el:"aria",  mod:"cardinale", ru:"Vênus",           ll:"Gestos românticos, tempo de qualidade e harmonia compartilhada.", rf:["Indeciso","Foge até dos conflitos necessários","Quer agradar todo mundo"]},
 {k:"scorpione",n:"Escorpião",  g:"♏", el:"acqua", mod:"fisso",     ru:"Marte/Plutão",    ll:"Intimidade total, lealdade e intensidade.", rf:["Ciumento e possessivo","Vingativo","Controlador"]},
 {k:"sagittario",n:"Sagitário", g:"♐", el:"fuoco", mod:"mobile",    ru:"Júpiter",         ll:"Aventuras compartilhadas, risadas e liberdade.", rf:["Inquieto","Sincero na lata","Alérgico a compromisso"]},
 {k:"capricorno",n:"Capricórnio",g:"♑",el:"terra", mod:"cardinale", ru:"Saturno",         ll:"Confiabilidade, compromisso concreto e tempo dedicado.", rf:["Workaholic distante","Frio na aparência","Controlador demais"]},
 {k:"acquario", n:"Aquário",    g:"♒", el:"aria",  mod:"fisso",     ru:"Saturno/Urano",   ll:"Liberdade respeitada, cumplicidade mental e causas compartilhadas.", rf:["Distante","Teimoso nas ideias","Imprevisível"]},
 {k:"pesci",    n:"Peixes",     g:"♓", el:"acqua", mod:"mobile",    ru:"Júpiter/Netuno",  ll:"Romantismo, ternura e fusão emocional.", rf:["Escorregadio","Tende ao vitimismo","Limites fracos"]}
];
const BY = Object.fromEntries(SIGNS.map(s=>[s.k,s]));

/* elemento → família visual (para as cores temáticas) */
const ELEMENT_FAMILY = { fuoco:"fuoco", terra:"terra", aria:"aria", acqua:"acqua" };

/* rótulos de exibição (as chaves técnicas ficam em italiano) */
const EL_PT = { fuoco:"Fogo", terra:"Terra", aria:"Ar", acqua:"Água" };
const MOD_PT = { cardinale:"Cardinal", fisso:"Fixo", mobile:"Mutável" };

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
const ELTX={"acqua|acqua":["profundidade emocional e necessidade de intimidade de verdade","dois mares em tempestade: os humores se amplificam"],"terra|terra":["concretude, lealdade e projetos em comum","a faísca pode apagar na rotina"],"fuoco|fuoco":["paixão, energia e vontade de viver no máximo","dois egos querendo mandar no mesmo fogo"],"aria|aria":["conexão mental, leveza e mil conversas","muita cabeça e pouca barriga: a emoção fica devendo"],"aria|fuoco":["o ar alimenta o fogo: estímulo e movimento sem parar","o risco é queimar rápido demais, sem raízes"],"acqua|terra":["a água nutre a terra: segurança que faz crescer","a terra pode sufocar e a água, alagar"],"fuoco|terra":["ambição em comum e vontade de construir","ritmos opostos: um corre, o outro planeja"],"acqua|fuoco":["uma atração magnética entre opostos","o fogo evapora a água, a água apaga o fogo"],"aria|terra":["ideias mais concretude, se cada um ceder um pouco","um abstrato demais, o outro prático demais"],"acqua|aria":["sensibilidade e imaginação que se tocam de leve","lógica contra emoção: o mal-entendido vem fácil"]};
const MODTX={"cardinale|cardinale":"dois líderes: queda de braço pra ver quem dirige","fisso|fisso":"sólidos e leais, mas teimosos feito mula","mobile|mobile":"flexíveis e curiosos, mas meio dispersos","cardinale|fisso":"um começa, o outro consolida: bom equilíbrio","cardinale|mobile":"iniciativa mais adaptabilidade: se acompanham bem","fisso|mobile":"raízes mais movimento: estabilidade que continua viva"};
function dyn(a,b){const ek=[a.el,b.el].sort().join("|");const mk=[a.mod,b.mod].sort().join("|");const e=ELTX[ek]||["",""];return{unisce:e[0],scotta:e[1],mod:MODTX[mk]||""};}
function verdict(s){return s>=5?"Casal de manual: acende e dura.":s>=4?"Grande potencial: com um pouco de trabalho, decola.":s>=3?"Funciona, mas cada um tem que ceder um pouco.":"Desafio de verdade: opostos que penam pra se entender.";}

/* ---------- lenti ---------- */
const LENSES=[
 {k:"amore",label:"Amor",g:"♥",sym:"♥",dimN:["Paixão","Emoção","Entrosamento","Estabilidade"]},
 {k:"amicizia",label:"Amizade",g:"✦",sym:"✦",dimN:["Diversão","Lealdade","Sintonia","Aventura"]},
 {k:"lavoro",label:"Trabalho & Sócios",g:"⚙",sym:"⚙",dimN:["Complementaridade","Confiabilidade","Visão","Gestão de conflitos"]},
 {k:"famiglia",label:"Família",g:"⌂",sym:"⌂",dimN:["Harmonia no dia a dia","Apoio emocional","Respeito aos espaços","Lealdade"]},
 {k:"convivenza",label:"Convivência",g:"◆",sym:"◆",dimN:["Ordem & organização","Espaços compartilhados","Clima em casa","Conflitos práticos"]},
 {k:"ex",label:"Ex",g:"♡",sym:"♡",dimN:["Continuar amigos","Término em paz","Respeito mútuo","Risco de recaída"]},
 {k:"capo",label:"Chefe & Equipe",g:"★",sym:"★",dimN:["Liderança clara","Confiança & delegação","Comunicação","Crescimento"]}
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
 amore:{u:{same:"vocês se entendem por instinto, mesma língua emocional",ally:"uma atração que flui natural, um estimula o outro",challenge:"a faísca magnética de quem é diferente e se procura"},s:{same:"vocês se parecem demais e amplificam os mesmos defeitos",ally:"correm rápido, mas faltam raízes",challenge:"sentem e reagem de jeitos opostos, o mal-entendido vem fácil"}},
 amicizia:{u:{same:"mesma frequência, amigos à primeira vista",ally:"um arrasta o outro pras aventuras e pras risadas",challenge:"vocês se completam, cada um abre pro outro um mundo novo"},s:{same:"parecidos demais, ninguém nunca puxa o freio",ally:"muito movimento, mas pouca profundidade nas horas sérias",challenge:"ritmos e necessidades diferentes, às vezes vocês não se entendem"}},
 lavoro:{u:{same:"mesma visão e mesmo ritmo de trabalho",ally:"energias que se alimentam e ideias em rajada",challenge:"vocês se completam: um tem a visão, o outro executa"},s:{same:"papéis sobrepostos e dúvida sobre quem manda",ally:"grandes largadas, mas pouco fôlego nos detalhes",challenge:"prioridades e tempos diferentes, precisam de papéis claros"}},
 famiglia:{u:{same:"vocês se reconhecem, mesma índole debaixo do mesmo teto",ally:"casa animada e cheia de energia",challenge:"diferentes mas ligados, um ensina o outro"},s:{same:"dois gênios iguais batem nas mesmas quinas",ally:"inquietação demais, a casa nunca para",challenge:"jeitos opostos de viver espaços e emoções"}},
 convivenza:{u:{same:"mesmos hábitos, a casa anda nos trilhos",ally:"clima alegre e sociável entre quatro paredes",challenge:"vocês se equilibram: um põe ordem, o outro põe vida"},s:{same:"os mesmos vícios em dobro: ordem demais ou rigidez",ally:"muita vida, mas pouca gestão prática",challenge:"ideias opostas sobre limpeza, espaços e visitas"}},
 ex:{u:{same:"vocês se conhecem de cor: nenhuma surpresa, nem como ex",ally:"continuam na mesma sintonia, conversar é fácil",challenge:"já vivem em planetas diferentes, mais fácil virar a página"},s:{same:"os mesmos motivos que uniam vocês ainda dão nos nervos",ally:"a velha cumplicidade pode reacender o fogo",challenge:"os opostos que atraíam agora repelem"}},
 capo:{u:{same:"mesma língua e mesmo ritmo, vocês se entendem no olhar",ally:"energias que se alimentam, líder e equipe em sintonia",challenge:"vocês se completam: um guia, o outro realiza, papéis naturais"},s:{same:"duas cabeças iguais: quem manda e quem obedece de verdade?",ally:"muito embalo, mas falta alguém pra segurar os detalhes",challenge:"prioridades e tempos diferentes, sem papéis claros tudo trava"}}
};
function lensDyn(lk,a,b){const cat=elCat(a.el,b.el);const mk=[a.mod,b.mod].sort().join("|");const t=LTX[lk]||LTX.amore;return {uni:t.u[cat],sco:t.s[cat],mod:(MODTX[mk]||"")};}
const LVERD={
 amicizia:["Amigos complicados: melhor em doses pequenas.","Amizade que funciona com um pouco de esforço.","Ótima amizade, sai natural.","Amigos pra vida toda."],
 lavoro:["Sócios difíceis: alto risco de briga.","Funciona se dividirem bem as tarefas.","Ótimo time, com papéis claros.","Sócios de empresa de sucesso."],
 famiglia:["Tensão em casa: precisa de paciência.","Dá pra conviver, com alguns acordos.","Belo laço, casa harmoniosa.","Família superentrosada."],
 convivenza:["Convivência puxada: melhor espaços bem separados.","Convivência ok, com algumas regras.","Ótima convivência.","Colegas de casa perfeitos."],
 ex:["Capítulo difícil de fechar: melhor manter distância.","Como ex, só funcionam com limites bem marcados.","Conseguem manter uma boa relação.","Ex exemplares: amigos de verdade depois do amor."],
 capo:["Hierarquia difícil: briga pra ver quem manda.","Funciona com papéis e regras claras.","Boa dinâmica chefe-equipe.","Líder e braço direito perfeitos."]
};
function lensVerdict(lk,s){if(lk==="amore")return verdict(s);const arr=LVERD[lk];return arr[Math.min(3,Math.max(0,s-2))];}
function lensRitratto(lk,a,b,s,dy){
 const word={amore:"casal",amicizia:"amigos",lavoro:"sócios",famiglia:"família",convivenza:"colegas de casa",ex:"ex",capo:"dupla chefe-equipe"}[lk]||"casal";
 const el={fuoco:"traz energia e ímpeto",terra:"traz concretude e raízes",aria:"traz ideias e palavras",acqua:"traz emoção e intuição"};
 const mo={cardinale:"adora tomar a iniciativa",fisso:"não arreda pé",mobile:"se adapta numa boa"};
 const lead = s>=4?`Como ${word}, ${a.n} e ${b.n} já largam na frente.`
   : s>=3?`Como ${word}, ${a.n} e ${b.n} podem funcionar se cada um ceder um pouco.`
   : `Como ${word}, ${a.n} e ${b.n} são um encaixe difícil.`;
 return `${lead} ${a.n} ${el[a.el]} e ${mo[a.mod]}; ${b.n}, por sua vez, ${el[b.el]} e ${mo[b.mod]}. O que une vocês é ${dy.uni}; ${dy.mod}. A tensão aparece quando ${dy.sco}.`;
}
const LADV={
 amicizia:"Cultivem o que diverte vocês e respeitem os espaços: a amizade se sustenta na leveza e na presença nas horas que importam.",
 lavoro:"Definam papéis claros desde o início — quem decide o quê — e ponham os acordos por escrito: sócios brigam por ambiguidade, não por números.",
 famiglia:"Em família ninguém vence uma discussão, o que se faz é manter um laço: respeitem o jeito e o tempo de cada um.",
 convivenza:"Poucas regras claras sobre limpeza, espaços e visitas, definidas logo de cara: a convivência quebra nos não-ditos, não nas diferenças.",
 ex:"Como ex, a regra é uma só: limites claros e nada de zona cinzenta. Decidam o que vocês são agora — amigos ou distantes — e parem de reviver quem vocês eram.",
 capo:"A hierarquia se sustenta se os papéis são explícitos: quem decide, decide; quem executa tem autonomia e confiança. Quebra quando o chefe não solta o controle ou a equipe não respeita quem guia."
};
function farla(a,b,ov){
  const pre = ov>=4?"Vocês têm uma base sólida — não deem isso por garantido."
    : ov>=3?"Dá pra fazer funcionar, mas com trabalho de verdade dos dois lados."
    : "Vai precisar de paciência e muita conversa.";
  return `${pre} A chave é falar a língua do outro: ${a.n} vive o amor através de «${a.ll.toLowerCase()}», ${b.n} através de «${b.ll.toLowerCase()}». Quem aprende a dar o que realmente importa pro outro, ganha.`;
}
function lensAdvice(lk,a,b,s){
  if(lk==="amore")return farla(a,b,s);
  const pre = s>=4?"Vocês têm uma base ótima.":s>=3?"Dá pra fazer funcionar, com um pouco de atenção.":"Vai precisar de empenho dos dois lados.";
  return `${pre} ${LADV[lk]}`;
}
function cap(s){return s?s.charAt(0).toUpperCase()+s.slice(1):s;}

/* ============================================================
   compute(state) → modelo compartilhado por todas as direções.
   Os conteúdos são idênticos entre os temas; só muda o visual.
   ============================================================ */
function computeCouple(ka, kb, lk){
  lk = lk || "amore";
  const a = BY[ka], b = BY[kb], l = LBY[lk];
  const s = lensScore(lk,a,b);
  const da = lensDims(lk,a,b);
  const dy = lensDyn(lk,a,b);
  const state = s>=4 ? "good" : (s<=2 ? "bad" : "mid");
  const sym = s>=4 ? l.sym : (s<=2 ? "⚡" : "≈");
  const sint = ["Muita tensão","Equilíbrio a construir","Bela sintonia","Sintonia lá em cima"][Math.min(3,Math.max(0,s-2))];
  return {
    a, b, lens:l, lensKey:lk,
    score:s, pct:s*20, state, sym, sint,
    verdict: lensVerdict(lk,s),
    h2h: [
      {lab:"elemento", va:EL_PT[a.el]||cap(a.el), vb:EL_PT[b.el]||cap(b.el)},
      {lab:"modalidade", va:MOD_PT[a.mod]||cap(a.mod), vb:MOD_PT[b.mod]||cap(b.mod)},
      {lab:"planeta",  va:a.ru, vb:b.ru},
      {lab:"linguagem do amor", va:a.ll, vb:b.ll},
      {lab:"red flag", va:a.rf[0], vb:b.rf[0]}
    ],
    ritratto: lensRitratto(lk,a,b,s,dy),
    unisce: cap(dy.uni),
    scotta: cap(dy.sco),
    dims: l.dimN.map((n,i)=>({n, v:da[i]})),
    advice: lensAdvice(lk,a,b,s)
  };
}

window.ZODIAC_PT = { SIGNS, BY, LENSES, LBY, computeCouple, cap };

})();
