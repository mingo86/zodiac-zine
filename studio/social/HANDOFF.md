# Zodiac · Social Studio — HANDOFF (per nuova chat)

## Cosa stiamo costruendo
Contenuti **Instagram** per Zodiac, ispirati a **@ichatastrology**, con le **mascotte proprietarie**
e lo stile **zine "fumetto pop"**. Ogni card è **animata** (occhi→box; si registra lo schermo per il
Reel) e ha una **versione statica** (apri la pagina con `#still`). Cliente IT, tono pop/ironico.

## Direzioni (stili) · Tagli · Skin
- **3 stili**: **Pop** (principale, sunburst), **Cosmo** (notte cosmica), **Adesivi** (riso sticker).
- **3 tagli**: post 1:1 · story 9:16 · cover 4:5.
- **Skin per lente** (couple, tutte le direzioni): amore/amicizia/lavoro/famiglia/convivenza/ex/capo + sexual → colore+motivo di sfondo per lente, **intensità che segue l'affinità %**.
- **Sfondi pieni** singolo segno (solo Pop): `raggi` (default) · `pieno` · `bold` (app-icon) · `onde` · `stelle`.

## ARCHITETTURA (file in questo progetto)
- `social/cardkit.js` — **motore**, `window.CARDKIT`:
  - `build(host,{key,dir,format,size,still,bg,lang})` — singolo segno. format: `facts/date/flags`. bg: `raggi/pieno/bold/onde/stelle`.
  - `buildCouple(host,{a,b,lens,mode,dir,size,still,lang})` — coppia. `mode:'sexual'` per "a letto". Badge % rimappato `56+(score-2)*13`. Reagisce alla %: good→love+cuori, bad→sad+⚡.
  - `buildCompat(host,{key,dir,size,still,lang})` — best/worst match (♥ verde sopra, ⚡ rosso sotto).
  - `buildPlanet(host,{planet,key,dir,size,still,lang})` — pianeta nel segno (anello 6 box, titolo tinto).
- `social/cards.css` — stili: `.card` (ha `container-type:inline-size`), `.dir-*`, `.size-*`, `.couple`, `.compat`, `.planet`, `.skin-*`, `.vibe-*`, `.bgskin-*`.
- `social/i18n.js` — `window.ZLANG` (da `?lang=`), `window.ZI18N.mount(selectId)` (selettore che ricarica con `?lang`).
- `data/signs.it.js` (`ZSIGNS_IT`) + `data/signs.en.js` (`ZSIGNS_EN`) — 12 segni; campi `sap,con,deal,gf,rf,q,am,let,ll,sun,moon,asc`.
- `data/extra.it.js` — `ZSEX_IT` (sexual) + `ZPLANETS_IT` (6 pianeti: sole,luna,mercurio,venere,marte,ascendente). `data/extra.en.js` — solo `ZSEX_EN` (pianeti EN da fare).
- `coppie/mascots.js` (`window.MASCOT`), `coppie/engine.js` (`window.ZODIAC.computeCouple`) + `coppie/engine.en.js`.

### Pagine (root, nomi con trattino normale "-")
`index.html` (landing con selettore lingua) · `Zodiac Social - Direzioni/Tagli/Coppie/Compatibilità/Pianeti/Sfondi.html` · `Zodiac App Icon.html`.
Deploy statico pronto in `site/` (+ README GitHub Pages). File-delta in `edited/`.

## i18n — come funziona (IMPORTANTE)
- Lingua via URL `?lang=en` (default it). Selettore = `social/i18n.js` → `ZI18N.mount('lang')`.
- cardkit prende i dati con `window['ZSIGNS_'+LANG]`, `window['ZSEX_'+LANG]`, `window['ZPLANETS_'+LANG]`, e il motore `window['ZODIAC_'+LANG]`. Testi UI tradotti nella tabella `UI` dentro cardkit (helper **`TX(opts)`** — NB: si chiama TX, non T, perché T è il timer locale nei builder → conflitto TDZ già risolto).
- Per le pagine **couple/compat** serve catturare il motore per lingua:
  ```html
  <script src="coppie/engine.js"></script><script>window.ZODIAC_IT=window.ZODIAC;</script>
  <script src="coppie/engine.en.js"></script><script>window.ZODIAC_EN=window.ZODIAC;</script>
  ```

## ⚠️ GOTCHAS
1. **Screenshot ≠ realtà**: gli strumenti di cattura sbagliano le `cqw` → i titoli sembrano tagliati/ingranditi nelle catture ma **dal vivo sono giusti**. Verifica i layout con **`eval_js` + getBoundingClientRect**, non a occhio.
2. **Cache preview**: dopo aver editato `cardkit.js`/`cards.css`, **bumpa il `?v=N`** nei tag della pagina **e** apri con `show_html` aggiungendo `?cb=N` fresco. (Versioni attuali ~ cardkit/cards `?v=23`; i18n `?v=23`.)
3. `#still` = frame statico. `fitName()` riduce il nome solo se va in overflow.

## ✅ FATTO
- Singolo segno (facts/date/flags) · Coppia (7 lenti + sexual) · Compatibility with… · Pianeti (6) · Skin per lente (3 dir) + intensità % · Sfondi pieni singolo segno (5, incl. Bold) · Landing + export `site/`.
- **i18n base**: cardkit lingua-aware, dati EN (signs/engine/sexual), `i18n.js`, **Tagli** cablato e verificato in EN, **landing** col selettore IT/EN.
- **i18n COMPLETO su tutte le pagine**: Direzioni · Coppie · Compatibilità · Pianeti · Sfondi ora hanno il `<select id="lang">` + `ZI18N.mount('lang')`, caricano `signs.en.js` (+ `extra.en.js`; couple/compat/sfondi anche `engine.en.js` con cattura `ZODIAC_IT`), costruiscono i select da `ZSIGNS_<LANG>` e passano `lang:ZLANG` ai builder. Versioni cache: cardkit/cards/i18n **?v=25**, extra.en **?v=25**. Verificato in EN con eval_js. Fix: eyebrow IT lente *amore* era "in relationships…" → ora "in coppia…".
- **Pianeti EN tradotti** → `ZPLANETS_EN` in `data/extra.en.js` (6 pianeti × 12 segni × 6 frasi + mantra). Verificato: 0 mancanti.
- **6 LINGUE COMPLETE** (IT·EN·DE·FR·ES·PT): `data/signs.<l>.js` + `coppie/engine.<l>.js` copiati in progetto; **`data/extra.<l>.js`** scritti per DE/FR/ES/PT (ZSEX_ + ZPLANETS_ completi, 0 mancanti). UI di cardkit (`UI` table + helper TX) estesa con de/fr/es/pt (eyebrow, mantra, soulmate, sexline, lens). `i18n.js` ora: selettore 6 lingue + **`ZI18N.loadData({extra,engine,v})`** che fa `document.write` dei SOLI file della lingua attiva (IT resta statico come fallback). Tutte le pagine cablate a questo pattern. Cache: cardkit/i18n/extra **?v=27**. Verificato per lingua su ogni tipo di pagina con eval_js, 0 errori console.

## ⏳ DA FARE (prossimo giro)
1. **Sync `site/`**: la cartella deploy contiene copie statiche delle pagine — vanno riallineate con la cablatura i18n a 6 lingue (loadData), cardkit ?v=27 e i nuovi file `data/signs.*` `coppie/engine.*` `data/extra.*` (de/fr/es/pt).
2. **Scaricatore di massa** (richiesto dal cliente): export di tutte le card in **PNG** (post/story/cover) + file **caption & hashtag**, per ogni segno/coppia/pianeta/lingua.

### Ripartenza
Aprire una pagina e dire: "Continua dal file `social/HANDOFF.md`". Stato: **i18n 6 lingue completo** (motore loadData, dati+pianeti tradotti). Prossimo: **sync `site/`** poi **scaricatore di massa**. Gotcha: cache (`?v`/`?cb`), le cqw negli screenshot ingannano (usa eval_js), helper UI = **TX**, e il loader lingua è **`ZI18N.loadData()`** via document.write (IT statico come fallback).
