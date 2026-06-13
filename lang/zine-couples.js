/* ============================================================
   ZODIAC ZINE · COUPLES i18n — stringhe leggibili del motore coppie.
   Chiavi logiche/glifi/calcoli restano INTATTI nello Zine.
   Qui solo testo: ELTX, MODTX, verdict, LTX, LVERD, LADV, sint,
   verdetto-amore, ritratto (parole), lente label+dimN.
   Espone window.ZCPL_<LANG>.
   ============================================================ */
(function(){
function P(o){return o;}

window.ZCPL_EN = {
 ELTX:{"acqua|acqua":["deep emotion and a need for real intimacy","two seas in a storm: moods amplify each other"],"terra|terra":["solidity, loyalty and shared projects","the spark can fade into routine"],"fuoco|fuoco":["passion, energy and the urge to live full-throttle","two egos wanting to rule the same fire"],"aria|aria":["mental rapport, lightness and a thousand conversations","lots of head, little gut: emotion goes missing"],"aria|fuoco":["air feeds the fire: constant stimulation and movement","risk of burning fast, with no roots"],"acqua|terra":["water nurtures earth: security that helps you grow","earth can smother and water can flood"],"fuoco|terra":["shared ambition and the urge to build","opposite rhythms: one races, the other plans"],"acqua|fuoco":["a magnetic attraction between opposites","fire boils the water, water puts out the fire"],"aria|terra":["ideas plus grounding, if you meet halfway","one too abstract, the other too practical"],"acqua|aria":["sensitivity and imagination brushing past each other","logic vs emotion: easy to misread one another"]},
 MODTX:{"cardinale|cardinale":"two leaders: a tug-of-war over who drives","fisso|fisso":"solid and loyal, but stubborn as mules","mobile|mobile":"flexible and curious, but a bit scattered","cardinale|fisso":"one starts, the other consolidates: good balance","cardinale|mobile":"initiative plus adaptability: they follow each other well","fisso|mobile":"roots plus movement: stability that stays alive"},
 verdict:s=>s>=5?"Textbook couple: sparks and lasts.":s>=4?"Great potential: with a bit of work, it flies.":s>=3?"It works, but you must meet halfway.":"A real challenge: opposites that struggle to get each other.",
 LTX:{
  amore:{u:{same:"you get each other on instinct, same emotional language",ally:"an attraction that flows naturally, you stimulate each other",challenge:"the magnetic spark of those who are different and seek each other"},s:{same:"too alike, you amplify the same flaws",ally:"you run fast but need roots",challenge:"you feel and react in opposite ways, easy to misread"}},
  amicizia:{u:{same:"same wavelength, friends at first sight",ally:"you drag each other into adventures and laughter",challenge:"you complete each other, each opens a new world"},s:{same:"too similar, nobody ever hits the brakes",ally:"lots of movement but little depth in serious moments",challenge:"different rhythms and needs, sometimes you don't get each other"}},
  lavoro:{u:{same:"same vision and same work pace",ally:"energies that feed each other and ideas galore",challenge:"you complete each other: one has the vision, one executes"},s:{same:"overlapping roles and doubts over who's in charge",ally:"great starts but weak follow-through on detail",challenge:"different priorities and timing, you need clear roles"}},
  famiglia:{u:{same:"you recognise each other, same nature under one roof",ally:"a lively home full of energy",challenge:"different but bonded, you teach each other"},s:{same:"two identical characters hit the same edges",ally:"too much restlessness, the home never stops",challenge:"opposite ways of living spaces and emotions"}},
  convivenza:{u:{same:"same habits, the home runs smooth",ally:"a cheerful, social vibe within the walls",challenge:"you balance out, one brings order, one brings life"},s:{same:"same vices doubled, order or rigidity",ally:"lots of life but little practical management",challenge:"opposite ideas on cleaning, spaces and guests"}},
  ex:{u:{same:"you know each other by heart: no surprises, even as exes",ally:"you stay on the same wavelength, talking is easy",challenge:"you now live on different planets, easier to turn the page"},s:{same:"the very reasons that bonded you fray your nerves again",ally:"the old chemistry risks reigniting the fire",challenge:"the opposites that drew you now push you apart"}},
  capo:{u:{same:"same language and same pace, you click instantly",ally:"energies that feed each other, leader and team in sync",challenge:"you complete each other: one leads, one delivers, natural roles"},s:{same:"two identical heads: who leads and who actually executes?",ally:"plenty of drive, but you need someone to hold the details",challenge:"different priorities and timing, without clear roles it jams"}}
 },
 LVERD:{
  amicizia:["Tricky friends: better in small doses.","A friendship that works with a bit of effort.","Great friendship, it comes naturally.","Friends for life."],
  lavoro:["Difficult partners: high risk of clashes.","Works if you split tasks well.","Great team, with clear roles.","Partners for a winning venture."],
  famiglia:["Tensions at home: patience needed.","You get along with some compromise.","Lovely bond, a harmonious home.","A very close-knit family."],
  convivenza:["Tough flatmates: best with well-separated spaces.","Living together is ok, with a few rules.","Great living-together.","Perfect flatmates."],
  ex:["A hard chapter to close: distance is best.","As exes you work only with boundaries.","You manage to stay on good terms.","Model exes: true friends after love."],
  capo:["Tricky hierarchy: clashes over who's in charge.","Works with clear roles and rules.","Good boss-team dynamic.","Leader and right hand, perfect."]
 },
 LADV:{
  amicizia:"Cultivate what you enjoy and respect each other's space: friendship runs on lightness and showing up in the real moments.",
  lavoro:"Define clear roles from the start — who decides what — and put deals in writing: partners fight over ambiguity, not numbers.",
  famiglia:"In a family you don't win an argument, you hold a bond together: respect each one's character and timing.",
  convivenza:"A few clear rules on cleaning, spaces and guests, decided right away: living together breaks on the unsaid, not on differences.",
  ex:"As exes the rule is one: clear boundaries and no grey zones. Decide what you are now — friends or distant — and stop reliving who you were.",
  capo:"Hierarchy holds when roles are explicit: who decides decides, who executes has autonomy and trust. It breaks when the boss won't let go of control or the team won't respect the lead."
 },
 sint:["Lots of tension","A balance to build","Lovely chemistry","Sky-high chemistry"],
 portrait:{
  word:{amore:"couple",amicizia:"friends",lavoro:"partners",famiglia:"family",convivenza:"flatmates",ex:"exes",capo:"boss-team dynamic"},
  el:{fuoco:"brings energy and drive",terra:"brings grounding and roots",aria:"brings ideas and words",acqua:"brings emotion and intuition"},
  mo:{cardinale:"loves to take the lead",fisso:"holds its ground",mobile:"adapts easily"},
  lead:(word,a,b,s)=>s>=4?`As ${word}, ${a} and ${b} start with an edge.`:s>=3?`As ${word}, ${a} and ${b} can work by meeting halfway.`:`As ${word}, ${a} and ${b} are a tricky fit.`,
  body:(a,ela,moa,b,elb,mob,uni,mod,sco)=>`${a} ${ela} and ${moa}; ${b} instead ${elb} and ${mob}. What binds you is ${uni}; ${mod}. Tension arises when ${sco}.`
 },
 farla:{
  pre:ov=>ov>=4?"You have a solid base — don't take it for granted.":ov>=3?"It can work, but with real effort on both sides.":"It'll take patience and a lot of communication.",
  body:(a,lla,b,llb)=>`The key is speaking each other's language: ${a} lives love through «${lla}», ${b} through «${llb}». Whoever learns to give what truly matters to the other, wins.`
 },
 advice:{pre:s=>s>=4?"You have an excellent base.":s>=3?"It can work, with a bit of care.":"It'll take effort from both sides."},
 lenses:[
  {k:"amore",label:"Love",dimN:["Passion","Emotion","Rapport","Stability"]},
  {k:"amicizia",label:"Friendship",dimN:["Fun","Loyalty","Sync","Adventure"]},
  {k:"lavoro",label:"Work & Partners",dimN:["Complementarity","Reliability","Vision","Conflict handling"]},
  {k:"famiglia",label:"Family",dimN:["Daily harmony","Emotional support","Respecting space","Loyalty"]},
  {k:"convivenza",label:"Living together",dimN:["Order & management","Shared spaces","Home vibe","Practical conflicts"]},
  {k:"ex",label:"Ex",dimN:["Staying friends","Clean closure","Mutual respect","Rekindling"]},
  {k:"capo",label:"Boss & Team",dimN:["Clear leadership","Trust & delegation","Communication","Growth"]}
 ]
};

window.ZCPL_FR = {
 ELTX:{"acqua|acqua":["profondeur émotive et besoin d'intimité vraie","deux mers en tempête: les humeurs s'amplifient"],"terra|terra":["solidité, loyauté et projets partagés","l'étincelle peut s'éteindre dans la routine"],"fuoco|fuoco":["passion, énergie et envie de vivre à fond","deux egos qui veulent commander le même feu"],"aria|aria":["entente mentale, légèreté et mille conversations","beaucoup de tête, peu de ventre: l'émotion manque"],"aria|fuoco":["l'air alimente le feu: stimulation et mouvement constants","risque de brûler vite, sans racines"],"acqua|terra":["l'eau nourrit la terre: une sécurité qui fait grandir","la terre peut étouffer et l'eau inonder"],"fuoco|terra":["ambition partagée et envie de construire","rythmes opposés: l'un court, l'autre planifie"],"acqua|fuoco":["une attraction magnétique entre opposés","le feu évapore l'eau, l'eau éteint le feu"],"aria|terra":["des idées plus du concret, si l'on se rejoint à mi-chemin","l'un trop abstrait, l'autre trop pratique"],"acqua|aria":["sensibilité et imagination qui se frôlent","logique contre émotion: on se méprend facilement"]},
 MODTX:{"cardinale|cardinale":"deux leaders: bras de fer sur qui mène","fisso|fisso":"solides et loyaux, mais têtus comme des mules","mobile|mobile":"flexibles et curieux, mais un peu dispersés","cardinale|fisso":"l'un lance, l'autre consolide: bon équilibre","cardinale|mobile":"initiative plus adaptabilité: ils se suivent bien","fisso|mobile":"racines plus mouvement: une stabilité qui reste vivante"},
 verdict:s=>s>=5?"Couple de manuel: ça jaillit et ça dure.":s>=4?"Grand potentiel: avec un peu de travail, ça vole.":s>=3?"Ça marche, mais il faut se rejoindre à mi-chemin.":"Vrai défi: des opposés qui peinent à se comprendre.",
 LTX:{
  amore:{u:{same:"vous vous comprenez d'instinct, même langage émotionnel",ally:"une attraction qui coule de source, vous vous stimulez",challenge:"l'étincelle magnétique de ceux qui diffèrent et se cherchent"},s:{same:"trop semblables, vous amplifiez les mêmes défauts",ally:"vous courez vite mais il faut des racines",challenge:"vous ressentez et réagissez à l'opposé, on se méprend"}},
  amicizia:{u:{same:"même longueur d'onde, amis au premier regard",ally:"vous vous entraînez dans les aventures et les rires",challenge:"vous vous complétez, chacun ouvre un monde nouveau"},s:{same:"trop semblables, personne ne freine jamais",ally:"beaucoup de mouvement mais peu de profondeur aux moments sérieux",challenge:"rythmes et besoins différents, parfois vous ne vous comprenez pas"}},
  lavoro:{u:{same:"même vision et même rythme de travail",ally:"des énergies qui s'alimentent et des idées à profusion",challenge:"vous vous complétez: l'un a la vision, l'autre exécute"},s:{same:"rôles qui se chevauchent et doutes sur qui commande",ally:"beaux départs mais peu de tenue sur les détails",challenge:"priorités et délais différents, il faut des rôles clairs"}},
  famiglia:{u:{same:"vous vous reconnaissez, même nature sous le même toit",ally:"une maison vivante et pleine d'énergie",challenge:"différents mais liés, vous vous apprenez l'un l'autre"},s:{same:"deux caractères identiques butent sur les mêmes angles",ally:"trop d'agitation, la maison ne s'arrête jamais",challenge:"façons opposées de vivre les espaces et les émotions"}},
  convivenza:{u:{same:"mêmes habitudes, la maison roule sans accroc",ally:"une ambiance gaie et sociale entre les murs",challenge:"vous vous équilibrez, l'un met l'ordre, l'autre la vie"},s:{same:"mêmes vices doublés, ordre ou rigidité",ally:"beaucoup de vie mais peu de gestion pratique",challenge:"idées opposées sur le ménage, les espaces et les invités"}},
  ex:{u:{same:"vous vous connaissez par cœur: aucune surprise, même en ex",ally:"vous restez sur la même longueur d'onde, se parler est facile",challenge:"vous vivez désormais sur des planètes différentes, plus facile de tourner la page"},s:{same:"les raisons mêmes qui vous liaient vous rallument les nerfs",ally:"la vieille complicité risque de rallumer le feu",challenge:"les opposés qui vous attiraient vous repoussent maintenant"}},
  capo:{u:{same:"même langage et même rythme, vous vous comprenez d'un coup",ally:"des énergies qui s'alimentent, leader et équipe en phase",challenge:"vous vous complétez: l'un guide, l'autre réalise, rôles naturels"},s:{same:"deux têtes identiques: qui mène et qui exécute vraiment ?",ally:"beaucoup d'élan, mais il faut quelqu'un pour tenir les détails",challenge:"priorités et délais différents, sans rôles clairs ça coince"}}
 },
 LVERD:{
  amicizia:["Amis compliqués: mieux à petites doses.","Une amitié qui marche avec un peu d'effort.","Excellente amitié, ça vient tout seul.","Amis pour la vie."],
  lavoro:["Associés difficiles: fort risque de clashs.","Marche si vous vous répartissez bien les tâches.","Excellente équipe, avec des rôles clairs.","Associés pour une entreprise gagnante."],
  famiglia:["Tensions à la maison: il faut de la patience.","On s'entend avec quelques compromis.","Beau lien, foyer harmonieux.","Une famille très soudée."],
  convivenza:["Coloc difficile: mieux avec des espaces bien séparés.","Coloc ok, avec quelques règles.","Excellente colocation.","Colocataires parfaits."],
  ex:["Chapitre dur à clore: mieux vaut la distance.","En ex vous fonctionnez seulement avec des limites.","Vous arrivez à rester en bons termes.","Ex modèles: vrais amis après l'amour."],
  capo:["Hiérarchie difficile: clashs sur qui commande.","Marche avec des rôles et des règles clairs.","Bonne dynamique chef-équipe.","Leader et bras droit parfaits."]
 },
 LADV:{
  amicizia:"Cultivez ce qui vous amuse et respectez vos espaces: l'amitié tient sur la légèreté et la présence aux moments vrais.",
  lavoro:"Définissez des rôles clairs dès le départ — qui décide quoi — et mettez les accords par écrit: les associés se disputent sur l'ambiguïté, pas sur les chiffres.",
  famiglia:"En famille on ne gagne pas une dispute, on tient un lien ensemble: respectez le caractère et le rythme de chacun.",
  convivenza:"Quelques règles claires sur le ménage, les espaces et les invités, décidées tout de suite: la coloc se casse sur les non-dits, pas sur les différences.",
  ex:"En ex la règle est une: des limites claires et zéro zone grise. Décidez ce que vous êtes maintenant — amis ou loin — et arrêtez de revivre qui vous étiez.",
  capo:"La hiérarchie tient si les rôles sont explicites: qui décide décide, qui exécute a autonomie et confiance. Ça casse quand le chef ne lâche pas le contrôle ou l'équipe ne respecte pas la direction."
 },
 sint:["Beaucoup de tension","Un équilibre à construire","Belle entente","Entente au sommet"],
 portrait:{
  word:{amore:"couple",amicizia:"amis",lavoro:"associés",famiglia:"famille",convivenza:"colocataires",ex:"ex",capo:"dynamique chef-équipe"},
  el:{fuoco:"apporte énergie et élan",terra:"apporte du concret et des racines",aria:"apporte des idées et des mots",acqua:"apporte émotion et intuition"},
  mo:{cardinale:"aime prendre l'initiative",fisso:"tient bon",mobile:"s'adapte facilement"},
  lead:(word,a,b,s)=>s>=4?`En tant que ${word}, ${a} et ${b} partent avantagés.`:s>=3?`En tant que ${word}, ${a} et ${b} peuvent marcher en se rejoignant à mi-chemin.`:`En tant que ${word}, ${a} et ${b} sont un assemblage difficile.`,
  body:(a,ela,moa,b,elb,mob,uni,mod,sco)=>`${a} ${ela} et ${moa}; ${b} en revanche ${elb} et ${mob}. Ce qui vous lie, c'est ${uni}; ${mod}. La tension naît quand ${sco}.`
 },
 farla:{
  pre:ov=>ov>=4?"Vous avez une base solide — ne la tenez pas pour acquise.":ov>=3?"C'est faisable, mais avec un vrai travail des deux côtés.":"Il faudra de la patience et beaucoup de communication.",
  body:(a,lla,b,llb)=>`La clé est de parler la langue de l'autre: ${a} vit l'amour à travers «${lla}», ${b} à travers «${llb}». Celui qui apprend à donner ce qui compte vraiment pour l'autre gagne.`
 },
 advice:{pre:s=>s>=4?"Vous avez une excellente base.":s>=3?"C'est faisable, avec un peu d'attention.":"Il faudra de l'engagement des deux côtés."},
 lenses:[
  {k:"amore",label:"Amour",dimN:["Passion","Émotion","Entente","Stabilité"]},
  {k:"amicizia",label:"Amitié",dimN:["Plaisir","Loyauté","Sync","Aventure"]},
  {k:"lavoro",label:"Travail & Associés",dimN:["Complémentarité","Fiabilité","Vision","Gestion des conflits"]},
  {k:"famiglia",label:"Famille",dimN:["Harmonie au quotidien","Soutien émotionnel","Respect des espaces","Loyauté"]},
  {k:"convivenza",label:"Cohabitation",dimN:["Ordre & gestion","Espaces partagés","Ambiance maison","Conflits pratiques"]},
  {k:"ex",label:"Ex",dimN:["Rester amis","Clôture sereine","Respect mutuel","Retour de flamme"]},
  {k:"capo",label:"Chef & Équipe",dimN:["Leadership clair","Confiance & délégation","Communication","Croissance"]}
 ]
};

window.ZCPL_ES = {
 ELTX:{"acqua|acqua":["profundidad emocional y necesidad de intimidad real","dos mares en tormenta: los humores se amplifican"],"terra|terra":["solidez, lealtad y proyectos compartidos","la chispa puede apagarse en la rutina"],"fuoco|fuoco":["pasión, energía y ganas de vivir al máximo","dos egos que quieren mandar sobre el mismo fuego"],"aria|aria":["sintonía mental, ligereza y mil conversaciones","mucha cabeza y poca tripa: falta la emoción"],"aria|fuoco":["el aire alimenta el fuego: estímulo y movimiento continuos","riesgo de arder rápido, sin raíces"],"acqua|terra":["el agua nutre la tierra: seguridad que hace crecer","la tierra puede asfixiar y el agua inundar"],"fuoco|terra":["ambición compartida y ganas de construir","ritmos opuestos: uno corre, el otro planifica"],"acqua|fuoco":["una atracción magnética entre opuestos","el fuego evapora el agua, el agua apaga el fuego"],"aria|terra":["ideas más concreción, si os encontráis a medio camino","uno demasiado abstracto, el otro demasiado práctico"],"acqua|aria":["sensibilidad e imaginación que se rozan","lógica contra emoción: es fácil malinterpretarse"]},
 MODTX:{"cardinale|cardinale":"dos líderes: pulso por quién manda","fisso|fisso":"sólidos y leales, pero tercos como mulas","mobile|mobile":"flexibles y curiosos, pero algo dispersos","cardinale|fisso":"uno arranca, el otro consolida: buen equilibrio","cardinale|mobile":"iniciativa más adaptabilidad: se siguen bien","fisso|mobile":"raíces más movimiento: estabilidad que sigue viva"},
 verdict:s=>s>=5?"Pareja de manual: salta y dura.":s>=4?"Gran potencial: con un poco de trabajo, vuela.":s>=3?"Funciona, pero hay que encontrarse a medio camino.":"Reto de verdad: opuestos a los que les cuesta entenderse.",
 LTX:{
  amore:{u:{same:"os entendéis por instinto, mismo lenguaje emocional",ally:"una atracción que fluye natural, os estimuláis",challenge:"la chispa magnética de quienes son distintos y se buscan"},s:{same:"demasiado parecidos, amplificáis los mismos defectos",ally:"corréis rápido pero hacen falta raíces",challenge:"sentís y reaccionáis de forma opuesta, es fácil malinterpretarse"}},
  amicizia:{u:{same:"misma onda, amigos a primera vista",ally:"os arrastráis a las aventuras y a las risas",challenge:"os completáis, cada uno abre un mundo nuevo"},s:{same:"demasiado parecidos, nadie frena nunca",ally:"mucho movimiento pero poca profundidad en los momentos serios",challenge:"ritmos y necesidades distintas, a veces no os entendéis"}},
  lavoro:{u:{same:"misma visión y mismo ritmo de trabajo",ally:"energías que se alimentan e ideas a raudales",challenge:"os completáis: uno tiene la visión, el otro ejecuta"},s:{same:"roles solapados y dudas sobre quién manda",ally:"grandes arranques pero poco aguante en el detalle",challenge:"prioridades y tiempos distintos, hacen falta roles claros"}},
  famiglia:{u:{same:"os reconocéis, misma índole bajo el mismo techo",ally:"una casa animada y llena de energía",challenge:"distintos pero unidos, os enseñáis mutuamente"},s:{same:"dos caracteres iguales chocan en las mismas aristas",ally:"demasiada inquietud, la casa no para nunca",challenge:"modos opuestos de vivir espacios y emociones"}},
  convivenza:{u:{same:"mismos hábitos, la casa va sobre ruedas",ally:"clima alegre y social entre las paredes",challenge:"os equilibráis, uno pone orden y el otro vida"},s:{same:"mismos vicios duplicados, orden o rigidez",ally:"mucha vida pero poca gestión práctica",challenge:"ideas opuestas sobre limpieza, espacios e invitados"}},
  ex:{u:{same:"os conocéis de memoria: ninguna sorpresa, ni siquiera de ex",ally:"seguís en la misma onda, hablar es fácil",challenge:"ya vivís en planetas distintos, más fácil pasar página"},s:{same:"los mismos motivos que os unían os crispan los nervios",ally:"la vieja complicidad puede reavivar el fuego",challenge:"los opuestos que os atraían ahora os repelen"}},
  capo:{u:{same:"mismo lenguaje y mismo ritmo, os entendéis al vuelo",ally:"energías que se alimentan, líder y equipo en sintonía",challenge:"os completáis: uno guía, el otro realiza, roles naturales"},s:{same:"dos cabezas iguales: ¿quién guía y quién ejecuta de verdad?",ally:"mucho ímpetu, pero hace falta quien sostenga los detalles",challenge:"prioridades y tiempos distintos, sin roles claros se atasca"}}
 },
 LVERD:{
  amicizia:["Amigos complicados: mejor en pequeñas dosis.","Una amistad que funciona con algo de esfuerzo.","Estupenda amistad, sale sola.","Amigos del alma."],
  lavoro:["Socios difíciles: alto riesgo de choques.","Funciona si os repartís bien las tareas.","Gran equipo, con roles claros.","Socios para una empresa de éxito."],
  famiglia:["Tensiones en casa: hace falta paciencia.","Os lleváis con algún compromiso.","Bonito vínculo, casa armoniosa.","Familia muy unida."],
  convivenza:["Convivencia dura: mejor espacios bien separados.","Convivencia ok, con algunas reglas.","Estupenda convivencia.","Compañeros de piso perfectos."],
  ex:["Capítulo difícil de cerrar: mejor distancia.","De ex funcionáis solo con límites.","Lográis quedar en buenos términos.","Ex modelo: amigos de verdad tras el amor."],
  capo:["Jerarquía difícil: choques sobre quién manda.","Funciona con roles y reglas claros.","Buena dinámica jefe-equipo.","Líder y mano derecha perfectos."]
 },
 LADV:{
  amicizia:"Cultivad lo que os divierte y respetad los espacios: la amistad se sostiene en la ligereza y en estar en los momentos de verdad.",
  lavoro:"Definid roles claros desde el inicio — quién decide qué — y poned por escrito los acuerdos: los socios discuten por la ambigüedad, no por los números.",
  famiglia:"En familia no se gana una discusión, se mantiene unido un vínculo: respetad el carácter y los tiempos de cada uno.",
  convivenza:"Pocas reglas claras sobre limpieza, espacios e invitados, decididas enseguida: la convivencia se rompe por lo no dicho, no por las diferencias.",
  ex:"De ex la regla es una: límites claros y nada de zonas grises. Decidid qué sois ahora — amigos o lejanos — y dejad de revivir quiénes erais.",
  capo:"La jerarquía aguanta si los roles son explícitos: quien decide decide, quien ejecuta tiene autonomía y confianza. Se rompe cuando el jefe no suelta el control o el equipo no respeta la guía."
 },
 sint:["Mucha tensión","Un equilibrio por construir","Buena sintonía","Sintonía altísima"],
 portrait:{
  word:{amore:"pareja",amicizia:"amigos",lavoro:"socios",famiglia:"familia",convivenza:"compañeros de piso",ex:"ex",capo:"dinámica jefe-equipo"},
  el:{fuoco:"aporta energía e impulso",terra:"aporta concreción y raíces",aria:"aporta ideas y palabras",acqua:"aporta emoción e intuición"},
  mo:{cardinale:"ama tomar la iniciativa",fisso:"mantiene su posición",mobile:"se adapta con facilidad"},
  lead:(word,a,b,s)=>s>=4?`Como ${word}, ${a} y ${b} parten con ventaja.`:s>=3?`Como ${word}, ${a} y ${b} pueden funcionar encontrándose a medio camino.`:`Como ${word}, ${a} y ${b} son un encaje difícil.`,
  body:(a,ela,moa,b,elb,mob,uni,mod,sco)=>`${a} ${ela} y ${moa}; ${b} en cambio ${elb} y ${mob}. Lo que os une es ${uni}; ${mod}. La tensión nace cuando ${sco}.`
 },
 farla:{
  pre:ov=>ov>=4?"Tenéis una base sólida — no la deis por sentada.":ov>=3?"Se puede hacer, pero con trabajo real de ambas partes.":"Hará falta paciencia y mucha comunicación.",
  body:(a,lla,b,llb)=>`La clave es hablar el idioma del otro: ${a} vive el amor a través de «${lla}», ${b} a través de «${llb}». Quien aprende a dar lo que de verdad importa al otro, gana.`
 },
 advice:{pre:s=>s>=4?"Tenéis una base estupenda.":s>=3?"Se puede hacer, con un poco de atención.":"Hará falta empeño de ambas partes."},
 lenses:[
  {k:"amore",label:"Amor",dimN:["Pasión","Emoción","Sintonía","Estabilidad"]},
  {k:"amicizia",label:"Amistad",dimN:["Diversión","Lealtad","Sintonía","Aventura"]},
  {k:"lavoro",label:"Trabajo & Socios",dimN:["Complementariedad","Fiabilidad","Visión","Gestión de conflictos"]},
  {k:"famiglia",label:"Familia",dimN:["Armonía diaria","Apoyo emocional","Respeto de espacios","Lealtad"]},
  {k:"convivenza",label:"Convivencia",dimN:["Orden & gestión","Espacios compartidos","Clima en casa","Conflictos prácticos"]},
  {k:"ex",label:"Ex",dimN:["Quedar amigos","Cierre sereno","Respeto mutuo","Volver"]},
  {k:"capo",label:"Jefe & Equipo",dimN:["Liderazgo claro","Confianza & delegación","Comunicación","Crecimiento"]}
 ]
};

window.ZCPL_PT = {
 ELTX:{"acqua|acqua":["profundidade emocional e necessidade de intimidade real","dois mares em tempestade: os humores se amplificam"],"terra|terra":["solidez, lealdade e projetos compartilhados","a faísca pode se apagar na rotina"],"fuoco|fuoco":["paixão, energia e vontade de viver no máximo","dois egos que querem mandar no mesmo fogo"],"aria|aria":["sintonia mental, leveza e mil conversas","muita cabeça e pouca barriga: falta a emoção"],"aria|fuoco":["o ar alimenta o fogo: estímulo e movimento contínuos","risco de queimar rápido, sem raízes"],"acqua|terra":["a água nutre a terra: segurança que faz crescer","a terra pode sufocar e a água inundar"],"fuoco|terra":["ambição compartilhada e vontade de construir","ritmos opostos: um corre, o outro planeja"],"acqua|fuoco":["uma atração magnética entre opostos","o fogo evapora a água, a água apaga o fogo"],"aria|terra":["ideias mais concretude, se vocês se encontram no meio do caminho","um abstrato demais, o outro prático demais"],"acqua|aria":["sensibilidade e imaginação que se roçam","lógica contra emoção: é fácil se desentender"]},
 MODTX:{"cardinale|cardinale":"dois líderes: queda de braço sobre quem comanda","fisso|fisso":"sólidos e leais, mas teimosos como mulas","mobile|mobile":"flexíveis e curiosos, mas um tanto dispersos","cardinale|fisso":"um inicia, o outro consolida: bom equilíbrio","cardinale|mobile":"iniciativa mais adaptabilidade: se seguem bem","fisso|mobile":"raízes mais movimento: estabilidade que continua viva"},
 verdict:s=>s>=5?"Casal de manual: pega e dura.":s>=4?"Grande potencial: com um pouco de trabalho, voa.":s>=3?"Funciona, mas é preciso se encontrar no meio do caminho.":"Desafio de verdade: opostos que custam a se entender.",
 LTX:{
  amore:{u:{same:"vocês se entendem por instinto, mesma linguagem emocional",ally:"uma atração que flui natural, vocês se estimulam",challenge:"a faísca magnética de quem é diferente e se procura"},s:{same:"parecidos demais, amplificam os mesmos defeitos",ally:"correm rápido mas precisam de raízes",challenge:"sentem e reagem de forma oposta, é fácil se desentender"}},
  amicizia:{u:{same:"mesma sintonia, amigos à primeira vista",ally:"vocês se arrastam às aventuras e às risadas",challenge:"vocês se completam, cada um abre um mundo novo"},s:{same:"semelhantes demais, ninguém puxa o freio",ally:"muito movimento mas pouca profundidade nos momentos sérios",challenge:"ritmos e necessidades diferentes, às vezes não se entendem"}},
  lavoro:{u:{same:"mesma visão e mesmo ritmo de trabalho",ally:"energias que se alimentam e ideias a rodo",challenge:"vocês se completam: um tem a visão, o outro executa"},s:{same:"papéis sobrepostos e dúvidas sobre quem manda",ally:"ótimas largadas mas pouca tenacidade no detalhe",challenge:"prioridades e prazos diferentes, precisam de papéis claros"}},
  famiglia:{u:{same:"vocês se reconhecem, mesma índole sob o mesmo teto",ally:"uma casa animada e cheia de energia",challenge:"diferentes mas ligados, ensinam um ao outro"},s:{same:"dois temperamentos iguais batem nas mesmas quinas",ally:"inquietação demais, a casa não para nunca",challenge:"modos opostos de viver espaços e emoções"}},
  convivenza:{u:{same:"mesmos hábitos, a casa anda lisa",ally:"clima alegre e social entre as paredes",challenge:"vocês se equilibram, um põe ordem, o outro põe vida"},s:{same:"mesmos vícios dobrados, ordem ou rigidez",ally:"muita vida mas pouca gestão prática",challenge:"ideias opostas sobre limpeza, espaços e convidados"}},
  ex:{u:{same:"vocês se conhecem de cor: nenhuma surpresa, nem como ex",ally:"continuam na mesma sintonia, conversar é fácil",challenge:"agora vivem em planetas diferentes, mais fácil virar a página"},s:{same:"os mesmos motivos que uniam vocês reacendem os nervos",ally:"a velha cumplicidade pode reacender o fogo",challenge:"os opostos que atraíam agora repelem"}},
  capo:{u:{same:"mesma linguagem e mesmo ritmo, vocês se entendem na hora",ally:"energias que se alimentam, líder e equipe em sintonia",challenge:"vocês se completam: um guia, o outro realiza, papéis naturais"},s:{same:"duas cabeças iguais: quem guia e quem executa de fato?",ally:"muito ímpeto, mas precisa de quem segure os detalhes",challenge:"prioridades e prazos diferentes, sem papéis claros trava"}}
 },
 LVERD:{
  amicizia:["Amigos complicados: melhor em pequenas doses.","Uma amizade que funciona com algum esforço.","Ótima amizade, vem natural.","Amigos pra vida toda."],
  lavoro:["Sócios difíceis: alto risco de choques.","Funciona se dividirem bem as tarefas.","Ótima equipe, com papéis claros.","Sócios de empresa de sucesso."],
  famiglia:["Tensões em casa: é preciso paciência.","Vocês se dão com alguns acordos.","Belo vínculo, casa harmoniosa.","Família muito unida."],
  convivenza:["Convivência dura: melhor espaços bem separados.","Convivência ok, com algumas regras.","Ótima convivência.","Colegas de casa perfeitos."],
  ex:["Capítulo difícil de fechar: melhor distância.","Como ex vocês funcionam só com limites.","Conseguem ficar em bons termos.","Ex modelo: amigos de verdade depois do amor."],
  capo:["Hierarquia difícil: choques sobre quem manda.","Funciona com papéis e regras claros.","Boa dinâmica chefe-equipe.","Líder e braço direito perfeitos."]
 },
 LADV:{
  amicizia:"Cultivem o que diverte vocês e respeitem os espaços: a amizade se sustenta na leveza e na presença nos momentos de verdade.",
  lavoro:"Definam papéis claros desde o início — quem decide o quê — e ponham os acordos por escrito: os sócios brigam pela ambiguidade, não pelos números.",
  famiglia:"Em família não se vence uma discussão, mantém-se um vínculo: respeitem o jeito e os tempos de cada um.",
  convivenza:"Poucas regras claras sobre limpeza, espaços e convidados, decididas já: a convivência quebra no não dito, não nas diferenças.",
  ex:"Como ex a regra é uma: limites claros e nada de zonas cinzentas. Decidam o que são agora — amigos ou distantes — e parem de reviver quem eram.",
  capo:"A hierarquia se sustenta se os papéis forem explícitos: quem decide decide, quem executa tem autonomia e confiança. Quebra quando o chefe não larga o controle ou a equipe não respeita a liderança."
 },
 sint:["Muita tensão","Um equilíbrio a construir","Bela sintonia","Sintonia altíssima"],
 portrait:{
  word:{amore:"casal",amicizia:"amigos",lavoro:"sócios",famiglia:"família",convivenza:"colegas de casa",ex:"ex",capo:"dinâmica chefe-equipe"},
  el:{fuoco:"traz energia e impulso",terra:"traz concretude e raízes",aria:"traz ideias e palavras",acqua:"traz emoção e intuição"},
  mo:{cardinale:"adora tomar a iniciativa",fisso:"mantém sua posição",mobile:"se adapta com facilidade"},
  lead:(word,a,b,s)=>s>=4?`Como ${word}, ${a} e ${b} partem na frente.`:s>=3?`Como ${word}, ${a} e ${b} podem funcionar se encontrando no meio do caminho.`:`Como ${word}, ${a} e ${b} são um encaixe difícil.`,
  body:(a,ela,moa,b,elb,mob,uni,mod,sco)=>`${a} ${ela} e ${moa}; ${b} já ${elb} e ${mob}. O que une vocês é ${uni}; ${mod}. A tensão nasce quando ${sco}.`
 },
 farla:{
  pre:ov=>ov>=4?"Vocês têm uma base sólida — não a deem como certa.":ov>=3?"Dá pra fazer, mas com trabalho de verdade dos dois lados.":"Vai exigir paciência e muita comunicação.",
  body:(a,lla,b,llb)=>`A chave é falar a língua do outro: ${a} vive o amor através de «${lla}», ${b} através de «${llb}». Quem aprende a dar o que de fato importa pro outro, vence.`
 },
 advice:{pre:s=>s>=4?"Vocês têm uma base ótima.":s>=3?"Dá pra fazer, com um pouco de atenção.":"Vai exigir empenho dos dois lados."},
 lenses:[
  {k:"amore",label:"Amor",dimN:["Paixão","Emoção","Sintonia","Estabilidade"]},
  {k:"amicizia",label:"Amizade",dimN:["Diversão","Lealdade","Sintonia","Aventura"]},
  {k:"lavoro",label:"Trabalho & Sócios",dimN:["Complementaridade","Confiabilidade","Visão","Gestão de conflitos"]},
  {k:"famiglia",label:"Família",dimN:["Harmonia diária","Apoio emocional","Respeito aos espaços","Lealdade"]},
  {k:"convivenza",label:"Convivência",dimN:["Ordem & gestão","Espaços compartilhados","Clima em casa","Conflitos práticos"]},
  {k:"ex",label:"Ex",dimN:["Ficar amigos","Encerramento sereno","Respeito mútuo","Reatar"]},
  {k:"capo",label:"Chefe & Equipe",dimN:["Liderança clara","Confiança & delegação","Comunicação","Crescimento"]}
 ]
};

window.ZCPL_DE = {
 ELTX:{"acqua|acqua":["tiefe Gefühle und das Bedürfnis nach echter Nähe","zwei Meere im Sturm: die Stimmungen schaukeln sich auf"],"terra|terra":["Stabilität, Loyalität und gemeinsame Projekte","der Funke kann in der Routine verglühen"],"fuoco|fuoco":["Leidenschaft, Energie und die Lust, mit Vollgas zu leben","zwei Egos, die über dasselbe Feuer herrschen wollen"],"aria|aria":["geistige Verbundenheit, Leichtigkeit und tausend Gespräche","viel Kopf, wenig Bauch: das Gefühl bleibt auf der Strecke"],"aria|fuoco":["Luft nährt das Feuer: ständige Anregung und Bewegung","Gefahr, schnell zu verbrennen, ohne Wurzeln"],"acqua|terra":["Wasser nährt die Erde: Sicherheit, die wachsen lässt","Erde kann ersticken, Wasser kann überfluten"],"fuoco|terra":["gemeinsamer Ehrgeiz und die Lust zu bauen","gegensätzliche Rhythmen: einer rast, der andere plant"],"acqua|fuoco":["eine magnetische Anziehung zwischen Gegensätzen","Feuer bringt das Wasser zum Kochen, Wasser löscht das Feuer"],"aria|terra":["Ideen plus Bodenhaftung, wenn ihr euch auf halbem Weg trefft","der eine zu abstrakt, der andere zu praktisch"],"acqua|aria":["Sensibilität und Fantasie, die sich streifen","Logik gegen Gefühl: leicht missversteht man einander"]},
 MODTX:{"cardinale|cardinale":"zwei Anführer: ein Tauziehen, wer das Steuer hält","fisso|fisso":"solide und treu, aber stur wie Esel","mobile|mobile":"flexibel und neugierig, aber etwas zerstreut","cardinale|fisso":"der eine fängt an, der andere festigt: gute Balance","cardinale|mobile":"Initiative plus Anpassungsfähigkeit: sie folgen einander gut","fisso|mobile":"Wurzeln plus Bewegung: Stabilität, die lebendig bleibt"},
 verdict:s=>s>=5?"Lehrbuch-Paar: es funkt und es hält.":s>=4?"Großes Potenzial: mit etwas Arbeit hebt es ab.":s>=3?"Es funktioniert, aber ihr müsst euch auf halbem Weg treffen.":"Eine echte Herausforderung: Gegensätze, die sich schwer verstehen.",
 LTX:{
  amore:{u:{same:"ihr versteht euch instinktiv, dieselbe Gefühlssprache",ally:"eine Anziehung, die ganz natürlich fließt, ihr beflügelt euch",challenge:"der magnetische Funke derer, die verschieden sind und sich suchen"},s:{same:"zu ähnlich, ihr verstärkt dieselben Schwächen",ally:"ihr lauft schnell, braucht aber Wurzeln",challenge:"ihr fühlt und reagiert gegensätzlich, leicht missversteht man sich"}},
  amicizia:{u:{same:"gleiche Wellenlänge, Freunde auf den ersten Blick",ally:"ihr reißt euch gegenseitig in Abenteuer und Gelächter",challenge:"ihr ergänzt euch, jeder öffnet dem anderen eine neue Welt"},s:{same:"zu ähnlich, niemand tritt je auf die Bremse",ally:"viel Bewegung, aber wenig Tiefe in den ernsten Momenten",challenge:"unterschiedliche Rhythmen und Bedürfnisse, manchmal versteht ihr euch nicht"}},
  lavoro:{u:{same:"gleiche Vision und gleiches Arbeitstempo",ally:"Energien, die sich gegenseitig nähren, und Ideen in Hülle und Fülle",challenge:"ihr ergänzt euch: einer hat die Vision, einer setzt sie um"},s:{same:"überlappende Rollen und Zweifel, wer das Sagen hat",ally:"großartige Starts, aber schwacher Atem beim Detail",challenge:"unterschiedliche Prioritäten und Timing, ihr braucht klare Rollen"}},
  famiglia:{u:{same:"ihr erkennt euch wieder, dieselbe Natur unter einem Dach",ally:"ein lebendiges Zuhause voller Energie",challenge:"verschieden, aber verbunden, ihr lehrt einander"},s:{same:"zwei identische Charaktere ecken an denselben Kanten an",ally:"zu viel Unruhe, das Zuhause kommt nie zur Ruhe",challenge:"gegensätzliche Arten, Räume und Gefühle zu leben"}},
  convivenza:{u:{same:"gleiche Gewohnheiten, der Haushalt läuft wie geschmiert",ally:"eine fröhliche, gesellige Stimmung in den eigenen vier Wänden",challenge:"ihr gleicht euch aus, einer bringt Ordnung, einer bringt Leben"},s:{same:"dieselben Macken verdoppelt, Ordnung oder Sturheit",ally:"viel Leben, aber wenig praktische Organisation",challenge:"gegensätzliche Vorstellungen über Putzen, Räume und Gäste"}},
  ex:{u:{same:"ihr kennt euch in- und auswendig: keine Überraschungen, auch als Ex nicht",ally:"ihr bleibt auf derselben Wellenlänge, das Reden fällt leicht",challenge:"ihr lebt inzwischen auf verschiedenen Planeten, leichter, das Kapitel zu schließen"},s:{same:"genau die Gründe, die euch verbanden, gehen euch wieder auf die Nerven",ally:"die alte Chemie droht das Feuer neu zu entfachen",challenge:"die Gegensätze, die euch anzogen, stoßen euch jetzt ab"}},
  capo:{u:{same:"gleiche Sprache und gleiches Tempo, ihr versteht euch sofort",ally:"Energien, die sich gegenseitig nähren, Chef und Team im Gleichklang",challenge:"ihr ergänzt euch: einer führt, einer liefert, natürliche Rollen"},s:{same:"zwei identische Köpfe: wer führt und wer setzt eigentlich um?",ally:"jede Menge Antrieb, aber ihr braucht jemanden, der die Details im Griff hat",challenge:"unterschiedliche Prioritäten und Timing, ohne klare Rollen hakt es"}}
 },
 LVERD:{
  amicizia:["Schwierige Freunde: besser in kleinen Dosen.","Eine Freundschaft, die mit etwas Mühe funktioniert.","Großartige Freundschaft, sie kommt ganz von selbst.","Freunde fürs Leben."],
  lavoro:["Schwierige Partner: hohes Risiko für Reibereien.","Funktioniert, wenn ihr die Aufgaben gut aufteilt.","Großartiges Team, mit klaren Rollen.","Partner für ein erfolgreiches Vorhaben."],
  famiglia:["Spannungen zu Hause: Geduld ist gefragt.","Ihr versteht euch mit ein paar Kompromissen.","Schöne Bindung, ein harmonisches Zuhause.","Eine sehr eng verbundene Familie."],
  convivenza:["Schwierige Mitbewohner: am besten mit klar getrennten Räumen.","Zusammenleben okay, mit ein paar Regeln.","Großartiges Zusammenleben.","Perfekte Mitbewohner."],
  ex:["Ein schwer zu schließendes Kapitel: Abstand ist am besten.","Als Ex funktioniert ihr nur mit Grenzen.","Ihr schafft es, im Guten auseinanderzugehen.","Vorzeige-Ex: echte Freunde nach der Liebe."],
  capo:["Schwierige Hierarchie: Reibereien darum, wer das Sagen hat.","Funktioniert mit klaren Rollen und Regeln.","Gute Chef-Team-Dynamik.","Anführer und rechte Hand, perfekt."]
 },
 LADV:{
  amicizia:"Pflegt, was euch Spaß macht, und respektiert den Freiraum des anderen: Freundschaft lebt von Leichtigkeit und davon, in den echten Momenten da zu sein.",
  lavoro:"Legt von Anfang an klare Rollen fest — wer entscheidet was — und haltet Abmachungen schriftlich fest: Partner streiten über Uneindeutigkeit, nicht über Zahlen.",
  famiglia:"In einer Familie gewinnt man keinen Streit, man hält eine Bindung zusammen: respektiert den Charakter und das Tempo jedes Einzelnen.",
  convivenza:"Ein paar klare Regeln zu Putzen, Räumen und Gästen, gleich zu Beginn vereinbart: Zusammenleben scheitert am Unausgesprochenen, nicht an Unterschieden.",
  ex:"Als Ex gilt eine Regel: klare Grenzen und keine Grauzonen. Entscheidet, was ihr jetzt seid — Freunde oder distanziert — und hört auf, neu zu erleben, wer ihr wart.",
  capo:"Hierarchie hält, wenn die Rollen klar sind: wer entscheidet, entscheidet, wer ausführt, hat Autonomie und Vertrauen. Sie zerbricht, wenn der Chef die Kontrolle nicht abgibt oder das Team die Führung nicht respektiert."
 },
 sint:["Viel Spannung","Eine Balance, die es zu bauen gilt","Schöne Chemie","Chemie auf Höchststand"],
 portrait:{
  word:{amore:"Paar",amicizia:"Freunde",lavoro:"Partner",famiglia:"Familie",convivenza:"Mitbewohner",ex:"Ex",capo:"Chef-Team-Dynamik"},
  el:{fuoco:"bringt Energie und Antrieb",terra:"bringt Bodenhaftung und Wurzeln",aria:"bringt Ideen und Worte",acqua:"bringt Gefühl und Intuition"},
  mo:{cardinale:"übernimmt gern die Führung",fisso:"hält die Stellung",mobile:"passt sich mühelos an"},
  lead:(word,a,b,s)=>s>=4?`Als ${word} starten ${a} und ${b} mit einem Vorsprung.`:s>=3?`Als ${word} können ${a} und ${b} funktionieren, wenn sie sich auf halbem Weg treffen.`:`Als ${word} sind ${a} und ${b} eine knifflige Kombination.`,
  body:(a,ela,moa,b,elb,mob,uni,mod,sco)=>`${a} ${ela} und ${moa}; ${b} hingegen ${elb} und ${mob}. Was euch verbindet, ist ${uni}; ${mod}. Spannung entsteht, wenn ${sco}.`
 },
 farla:{
  pre:ov=>ov>=4?"Ihr habt eine solide Basis — nehmt sie nicht als selbstverständlich.":ov>=3?"Es kann klappen, aber mit echter Arbeit auf beiden Seiten.":"Es braucht Geduld und viel Kommunikation.",
  body:(a,lla,b,llb)=>`Der Schlüssel ist, die Sprache des anderen zu sprechen: ${a} lebt die Liebe über «${lla}», ${b} über «${llb}». Wer lernt zu geben, was dem anderen wirklich wichtig ist, gewinnt.`
 },
 advice:{pre:s=>s>=4?"Ihr habt eine ausgezeichnete Basis.":s>=3?"Es kann klappen, mit etwas Achtsamkeit.":"Es braucht Einsatz von beiden Seiten."},
 lenses:[
  {k:"amore",label:"Liebe",dimN:["Leidenschaft","Gefühl","Verbundenheit","Stabilität"]},
  {k:"amicizia",label:"Freundschaft",dimN:["Spaß","Loyalität","Gleichklang","Abenteuer"]},
  {k:"lavoro",label:"Arbeit & Partner",dimN:["Komplementarität","Verlässlichkeit","Vision","Konfliktmanagement"]},
  {k:"famiglia",label:"Familie",dimN:["Alltagsharmonie","Emotionale Unterstützung","Freiraum respektieren","Loyalität"]},
  {k:"convivenza",label:"Zusammenleben",dimN:["Ordnung & Organisation","Gemeinsame Räume","Stimmung zu Hause","Praktische Konflikte"]},
  {k:"ex",label:"Ex",dimN:["Freunde bleiben","Sauberer Abschluss","Gegenseitiger Respekt","Neu entfachen"]},
  {k:"capo",label:"Chef & Team",dimN:["Klare Führung","Vertrauen & Delegation","Kommunikation","Wachstum"]}
 ]
};
})();
