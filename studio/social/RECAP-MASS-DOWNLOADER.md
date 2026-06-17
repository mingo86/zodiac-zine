# Zodiac · Social — RECAP per nuova chat (scaricatore di massa)

> Incolla questo come primo messaggio in una nuova chat. Poi leggi i file citati PRIMA di costruire.

## Contesto
Progetto **Zodiac** (cartella attuale). Sto costruendo gli strumenti social per generare/scaricare card oroscopo
in massa. Leggi PRIMA, in quest'ordine:
1. `social/HANDOFF-EXPORT.md` (scope + decisioni)
2. `social/HANDOFF.md`
3. `social/cardkit.js` (motore card — 4 builder)
4. `social/i18n.js` (loader lingue)
5. Questo file.

## Com'è fatto il sistema (capirlo bene)
- **Motore unico** `window.CARDKIT` con 4 builder: `build` (singolo segno), `buildCouple`,
  `buildCompat`, `buildPlanet`. Ognuno: `host` DOM + opts → `{replay, settle, fit, el}`.
- **Opts**: `{key|a|b, dir, format, size, lens, mode, lang, still, bg}`.
  `dir` = pop/cosmo/adesivi · `size` = post(1:1)/story(9:16)/cover(4:5).
- **`still:true`** (o hash `#still`) = frame fermo via `settle()` → cattura pulita.
- **i18n**: `ZI18N.loadData({v:27})` carica i dati della SOLA lingua attiva (IT è statico).
  Va chiamato TRA `i18n.js` e `cardkit.js`. Lingua via `?lang=` (it·en·de·fr·es·pt).
- **Stringhe UI** nel motore = helper **`TX(opts)`** (NON `T`).
- **Layout in `cqw`** → la card scala su `container-type:inline-size`. ATTENZIONE:
  gli screenshot INGANNANO. Per misure vere usa **eval_js** (`clientWidth`, `getBoundingClientRect`),
  non a occhio. L'host per le PNG IG dev'essere FISICAMENTE 1080 / 1080×1920 / 1080×1350.
- **Cache**: tutto a `?v=27` (appena bumpato da v26). Apri sempre con `?cb=N`.
- **Dati multilingua già pronti**: `data/signs.{it,en,de,fr,es,pt}.js`, `data/extra.*.js`,
  `coppie/engine.*.js`. NON serve tradurre nulla — basta fare il giro lingue con loadData.

## Cosa è GIÀ FATTO (non rifare)
1. **`Zodiac Studio - Export.html`** — pagina export funzionante per UNA card (Capricorno Pop):
   - 3 tagli: Post 1:1 + Story 9:16 (video) · Cover 4:5 (PNG).
   - **PNG**: `htmlToImage.toCanvas/toPng` in-pagina a 1080×N → download. FEDELE.
   - **Video**: `getDisplayMedia({preferCurrentTab})` + **Region Capture** (`CropTarget`/`cropTo`)
     ritaglia solo la card → MediaRecorder → MP4 → download. Countdown 3s, ~8s registrazione.
   - GOTCHA RISOLTO: gli screenshot/cattura sostituivano il font **Bangers** con un serif più largo
     (titolo che sforava). FIX: **font self-hostati** in `social/fonts/` + `social/fonts-local.css`
     (Bangers, Baloo 2 VF, Space Mono R/B da google/fonts). Same-origin → html-to-image li embedda
     sempre. La pagina export usa fonts-local.css, NON Google Fonts.
   - **`Zodiac Studio - Export (standalone).html`** = versione self-contained (super_inline_html)
     da scaricare e aprire in browser vero (la registrazione NON va dentro l'iframe di preview).
2. **`Zodiac Studio - Test Qualita.html`** — viewer dei 3 tagli a risoluzione reale (senza download).
3. **Vignette storte** (-1°/+2° via `--rot`) ora su TUTTI e 4 i tipi di card, su post E story
   (prima solo singolo-segno aveva la rotazione; story era dritto). Modifica in `social/cardkit.js`
   in 4 punti (single, couple mkCol, compat mk, planet). PUSH: sostituire l'intero file.
4. **Cache-bust `v=26 → v=27`** su tutte le pagine + HANDOFF docs.

## Decisioni di scope GIÀ PRESE (rif. §5 HANDOFF-EXPORT)
- **1 variante per contenuto**: ogni combinazione segno-fonte-stile ha UN solo trattamento
  (lo stile NON moltiplica). Es. "cosa mi rende Capricorno" = solo Pop/raggi, punto.
- **Contenuti distinti = 648**: 36 singoli (12×3) + 528 coppie (66×8 lenti) + 12 compat + 72 pianeti.
- **PNG** = solo **cover 4:5** (cover del post IG). `PNG = 648 × n_lingue`.
- **Video** = **2 formati** (9:16 reel + 1:1 post) sul set "hero" (~36 card), gated dal tempo di
  registrazione (~9s × 2 × n_lingue). `Video = 36 × 2 × n_lingue`.
- **Coppie stesso-segno**: [DA CONFERMARE — sì/no].
- Le DUE leve di volume: **n. lingue** (×1→×6) e **n. lenti coppie** (528/648 = 81% del totale).

## Cosa MANCA da decidere (chiedi all'utente se non l'ha già detto)
1. **Lingue** primo giro: solo IT / IT+EN / tutte 6.
2. **Lenti coppie**: tutte 8 / 4 (amore·amicizia·lavoro·sexual) / lista curata.
3. **Handle `@____` + testo CTA** per le caption.
4. Coppie stesso-segno sì/no.

## Cosa COSTRUIRE ora — lo scaricatore di massa
Ordine dal HANDOFF: prima **MODALITÀ STUDIO** (player full-screen per registrare i Reel in sequenza),
poi **EXPORT PNG + caption + ZIP**.

### A) Modalità Studio (registrazione Reel)
- Filtri (tipo · segno/coppia · lente · stile · lingua) → costruisce una CODA.
- Player full-screen alla risoluzione del size scelto; autoplay `replay()` + auto-advance con
  countdown; pausa/skip; HUD "12 / 36". Pensata per registrare lo schermo in un'unica passata.
- Riusa il pattern Region Capture già validato in Export.html.

### B) Export PNG + ZIP
- Render in `#still` a risoluzione IG reale (host fisico 1080×N, **mai a occhio** → verifica eval_js).
- **PNG** via `htmlToImage.toCanvas` + font self-hostati (già pronti).
- **Naming**: `tipo/lingua/segno[_segnoB]/stile/size.png`.
- **Caption + hashtag** da template per formato/segno; CTA/handle dai parametri utente.
- **ZIP** (JSZip) con alberatura + pagina anteprime con download singoli.

### Helper / gotcha da ricordare
- Loader dati = `ZI18N.loadData({v:27})` tra i18n.js e cardkit.js.
- Stringhe UI = `TX`. Cache = `?v=27` + `?cb=N`.
- Misure SEMPRE con eval_js, mai dagli screenshot (cqw + font ingannano).
- Font: usa `social/fonts-local.css`, NON Google Fonts, per ogni pagina che esporta.
- La registrazione video richiede una scheda browser VERA (non l'iframe di preview) →
  fornisci sempre una versione standalone (super_inline_html) da scaricare.

## Design system
Il progetto è agganciato al design system in `/projects/dd708540-2a55-4d8e-851d-803faec5cb55/`.
Esploralo (README/base + .css) e usa i suoi token/font per QUALSIASI chrome/UI nuova (pannelli,
pulsanti dello Studio). Le card invece seguono il loro stile consolidato in `social/cards.css`.

## Primo messaggio operativo suggerito
"Continua Zodiac. Leggi social/RECAP-MASS-DOWNLOADER.md e i file citati. Le mie scelte:
lingue = [...], lenti coppie = [...], handle = @____, CTA = '...', stesso-segno = [sì/no].
Costruisci prima la Modalità Studio, poi l'Export PNG+ZIP."
