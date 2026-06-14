# Zodiac · Social Studio — HANDOFF (per nuova chat)

## Cosa stiamo costruendo
Contenuti **Instagram** per il progetto Zodiac, ispirati a **@ichatastrology**, ma con le **mascotte
proprietarie** e lo stile **zine "fumetto pop"** del sito. Ogni card è:
- **animata** (la mascotte guarda i box che si evidenziano a turno → si registra lo schermo per il Reel);
- disponibile in **versione statica** per il feed (apri la pagina con l'hash `#still`).

Cliente: italiano, tono pop/ironico. **Per ora solo lingua IT.**

## Le 3 DIREZIONI visive (stili)
- **Pop** — fumetto, sfondo a raggi *sunburst* nel colore dell'elemento + halftone + stelline. **Stile principale** di questa serie.
- **Cosmo** — notte cosmica, starfield, mascotte con alone luminoso, box col bordo che brilla. *(per altre serie)*
- **Adesivi** — riso sticker, pastello, tutto die-cut con bordo bianco. *(per altre serie)*

## I 3 TAGLI
- **post** 1:1 (feed) · **story** 9:16 (reel/story) · **cover** 4:5 (gancio del carosello, mascotte grande + "scorri →", senza box)

---

## ARCHITETTURA (file in questo progetto)
- `social/cardkit.js` — **il motore**. Espone `window.CARDKIT`:
  - `build(host,{key,dir,format,size,still,variant})` — **singolo segno**. `format`: `facts` (cosa mi rende un…, usa `sap`+`gf`), `date` (come conquistare un…, `con`+`deal`), `flags` (le mie bandiere…, `gf`+`rf`).
  - `buildCouple(host,{a,b,lens,dir,size,still})` — **coppia**. Due mascotte + badge affinità % + 2 colonne di `gf` (green flag, colore per elemento) + verdetto. La mascotte **reagisce alla %**: `good`→mood `love` (occhi a cuore) + cuoricini + si avvicinano; `bad`→`sad` + ⚡ + si allontanano; `mid`→`happy` + ≈. Badge % **rimappato** generoso: `Math.round(56+(score-2)*13)` → 56/69/82/95.
  - `buildCompat(host,{key,dir,size,still})` — **compatibility with…**. Mascotte centrale + 3 match top (♥ verde, in alto) e 3 ostici (⚡ rosso, in basso), calcolati dal motore.
  - Helpers esposti: `FORMATS, EL, EL_ADES, signs`.
- `social/cards.css` — **stili condivisi**: `.card` base (ha `container-type:inline-size`), le 3 direzioni (`.dir-pop/.dir-cosmo/.dir-adesivi`), i 3 tagli (`.size-post/.size-story/.size-cover`), `.couple`, `.compat`.
- `data/signs.it.js` — `window.ZSIGNS_IT` (12 segni IT). Campi utili: `k,n,g,el,mod,ru, sap[5], con[5], deal[5], gf[3], rf[3], q, am, let, ll, sun, moon, asc, adv` (Capricorno ha anche `notes`).

### Dipendenze (caricate dalle pagine, già nel progetto)
- `coppie/mascots.js` → `window.MASCOT(sign{k,el}, colorHex, theme, look, mood, variant)`
  - `theme`: `'stampa'` (rese ink, per Pop/Cosmo) | `'adesivi'` (sticker).
  - `look`: `+1`/`-1` (direzione sguardo). `mood`: `happy|love|sad|angry|neutral`. `variant`: `'m'|'f'|null`.
  - Occhi: pupille in `<g class="zpup">` (anima con `transform: translate`), occhi bianchi = `circle[fill="#fff"]`. **Mood `love` sostituisce gli occhi con cuori → niente `.zpup`.**
- `coppie/engine.js` → `window.ZODIAC.computeCouple(ka,kb,lens)` → `{score 2-5, pct, state:'good'|'mid'|'bad', sym:'♥'|'≈'|'⚡', sint, verdict, unisce, scotta, dims[], advice, a, b}`. `LENSES`: amore, amicizia, lavoro, famiglia, convivenza, ex, capo.

### Colori elemento
`EL` (stampa): fuoco `#ec2e36`, terra `#36b06a`, aria `#f5b700`, acqua `#2f9bdb`.
`EL_ADES` (adesivi, più tenui): fuoco `#ff5d73`, terra `#4cb285`, aria `#ffc24b`, acqua `#4a86d8`.

### Pagine (deliverable)
- `Zodiac Social — Direzioni.html` — confronto 3 stili sul singolo segno.
- `Zodiac Social — Tagli.html` — post/story/cover del singolo segno.
- `Zodiac Social — Coppie.html` — couple (Segno A/B, Lente, Stile).
- `Zodiac Social — Compatibilità.html` — best/worst match.

Brand: paper `#fff6e3`, ink `#15110d`, red `#ec2e36`, yellow `#ffd23f`, blue `#2f9bdb`, green `#36b06a`.
Font: **Bangers** (titoli), **Baloo 2** (testo), **Space Mono** (mono). Effetti: sunburst (`repeating-conic-gradient`), halftone (`radial-gradient` a pois), stelle a 4 punte, starfield (cosmo).

---

## ⚠️ GOTCHAS IMPORTANTI (leggere!)
1. **Cattura screenshot ≠ realtà.** Gli strumenti di screenshot non risolvono bene le `cqw` (container query units): i **titoli appaiono tagliati/ingranditi** nelle catture ma **dal vivo sono corretti e centrati**. → **Verifica i layout con `eval_js` + `getBoundingClientRect`, non a occhio dagli screenshot.**
2. **Cache della preview.** Modificare `cardkit.js`/`cards.css` **non** si riflette nella preview finché non:
   - **bumpi il `?v=N`** nei tag `<script src="social/cardkit.js?v=N">` e `<link ...cards.css?v=N>` della pagina, **e**
   - apri con `show_html` aggiungendo una query fresca, es. `Pagina.html?cb=7#still`.
   Versioni attuali per pagina: Compatibilità `cardkit ?v=10`; Coppie `?v=8`; Direzioni/Tagli `?v=4`; `cards.css ?v=9` (Compatibilità) / `?v=6` (Coppie) — **basta usare un numero più alto a ogni modifica.**
3. **`#still`** = frame finale senza animazione (per catture pulite / versione statica feed).
4. Il **fit del nome**: `fitName()` azzera il font-size (torna alla `cqw` del CSS) e riduce **solo** se va in overflow.

---

## ✅ FATTO
- Singolo segno: facts / date / flags · 3 stili · 3 tagli · animato + still.
- Coppia: in relationships + 7 lenti · 144 coppie · reazione alla % · 3 tagli.
- Compatibility with…: best/worst dal motore · 3 tagli.

## ⏳ DA FARE (prossimi step)
Servono **testi nuovi** (non esistono nei dati). Concordato: **li scrive l'assistente in stile Zodiac**, il cliente rivede.

### 1) SEXUAL compatibility (coppia "sotto le lenzuola")
- Riusa `buildCouple` con un nuovo `mode:'sexual'` (o un `buildSexual`): colonne = 3 bullet "a letto" per segno invece dei `gf`.
- **Dati da creare**: `window.ZSEX_IT = { ariete:[3 frasi], toro:[...], ... }` (12×3 = 36 frasi, derivare dal campo `let` di ogni segno; tono pop, spicy ma elegante).
- Serie: "sotto le lenzuola…" / "chimica…". Badge: usa la dimensione **Passione** (`computeCouple('amore').dims`) o lo score amore. Mantra: una riga sulla chimica della coppia.

### 2) PIANETA nel segno (Luna / Venere / Marte / Mercurio / Ascendente / Sole)
- Riusa il template **singolo segno** (anello di box). Aggiungi un `buildPlanet` o un `format` dedicato.
- Serie: "luna in…", "venere in…", ecc. Colore titolo **tinto per pianeta** (es. Luna viola `#6b4fb0`), piccolo sub tipo "(emozioni)".
- **Dati da creare**: per ogni **pianeta × segno** ~6-8 frasi in prima persona + un mantra. È il lavoro di copy più grosso (~400 frasi) → **farlo un pianeta alla volta**, iniziare da **Luna** e **Venere** (più virali) per tutti i 12 segni.
- Riferimento di stile/contenuto già pronto: `uploads/Zodiac_Project/Capricorno - moon - post.html` (8 frasi scritte a mano + mantra). In `uploads/Zodiac_Project/natal/interpret.js` c'è l'interpretazione pianeta-in-segno del tema natale: utile come base da cui derivare le bullet.

### Suggerimento per ripartire
Aprire una delle pagine, dire all'assistente "continua dall'handoff: costruisci il format **sexual** (poi **Luna/Venere**)", e ricordargli i **gotchas cache + cqw** qui sopra.
