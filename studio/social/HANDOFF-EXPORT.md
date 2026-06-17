# Zodiac · Social — EXPORT & STUDIO · HANDOFF (per nuova chat)

> Scopo di questo file: **decidere lo scope dell'export PRIMA di costruire**, perché
> il matrix completo esplode. Tutti i numeri qui sotto sono calcolati sulla
> struttura reale del progetto (giugno 2026).

---

## 1) Le dimensioni del problema (dati reali)

| Asse | Valori | N |
|---|---|---|
| **Lingue** | IT · EN · DE · FR · ES · PT | **6** |
| **Stili** (`dir`) | Pop · Cosmo · Adesivi | **3** |
| **Formati/size** | Post 1:1 · Story/Reel 9:16 · Cover 4:5 | **3** |

### "Design base" (= 1 sola lingua, 1 stile, 1 size)
| Tipo contenuto | Conteggio | Base |
|---|---|---|
| **Singolo segno** | 12 segni × 3 varianti (facts/date/flags) | **36** |
| **Coppie** | 66 coppie distinte* × 8 lenti (amore, amicizia, lavoro, famiglia, convivenza, ex, capo, **sexual**) | **528** |
| **Compatibilità** | 12 segni (1 card "compatibile con tutti") | **12** |
| **Pianeti** | 6 pianeti × 12 segni | **72** |
| **TOTALE base** | | **648** |

\* 66 = combinazioni di 12 segni a coppie senza ripetizione. Se includi anche le
coppie stesso-segno (Leone+Leone…) → 78, e il totale base sale a 744.
Se invece usi le coppie **ordinate** (A→B ≠ B→A, 144) il numero raddoppia: evitalo.

---

## 2) Quanti file escono? (PNG)

Moltiplicatore pieno = **3 stili × 3 size × 6 lingue = 54×** sul base.

| Scenario | Stili | Size | Lingue | Coppie | **PNG totali** |
|---|---|---|---|---|---|
| **A — Tutto** (quello chiesto a voce) | 3 | 3 | 6 | 66×8 | **≈ 34.992** |
| **B — Solo Pop, tutte size+lingue** | 1 | 3 | 6 | 66×8 | **≈ 11.664** |
| **C — Pop, tutte size, IT+EN** | 1 | 3 | 2 | 66×8 | **≈ 3.888** |
| **D — Lancio sano** (Pop, 1:1+9:16, IT, coppie curate 30×3 lenti) | 1 | 2 | 1 | 30×3 | **≈ 420** |

> ⚠️ **Le coppie sono il 78% di tutto.** 66×8 = 528 design su 648.
> Tagliare le coppie (meno lenti, meno pairs curate) è la leva n.1 sul volume.

---

## 3) E i VIDEO? (la parte che preoccupa — giustamente)

**Realtà tecnica:** non genero MP4 in batch in modo affidabile da animazioni DOM.
La via solida è la **"modalità studio"**: una pagina che riproduce ogni card a
schermo intero nel formato giusto, fa partire l'animazione e **avanza da sola**,
mentre **registri lo schermo** (una sola passata per batch).

**Conseguenza:** i video sono **gated dal tempo reale di registrazione**, non dal
rendering. Stima ~7s animazione + ~2s stacco = **~9s a card**.

| N video | Tempo di registrazione (continuo) |
|---|---|
| 50 | ~7–8 min |
| 200 | ~30 min |
| 1.000 | ~2,5 ore |
| 34.992 (full) | **~87 ore** → impossibile |

➡️ **I video vanno tenuti a poche decine / basse centinaia.** Quasi sempre solo:
**Story/Reel 9:16 · stile Pop · 1 lingua per registrazione · solo contenuti "hero"**.

**Set video "hero" suggerito (da decidere):**
- 12 segni × 1 variante (es. "facts") = **12**
- 12 coppie curate (amore) = **12**
- 12 pianeti hero (es. Sole×12 segni) = **12**
- **≈ 36 video** ≈ 5–6 min di registrazione per lingua. Replicabile lingua per lingua.

---

## 4) Cosa costruisco (2 strumenti, una volta deciso lo scope)

1. **Studio di registrazione** (priorità):
   - Filtri (lingua / stile / size / tipo / selezione segni-coppie-pianeti-lenti).
   - Costruisce una **coda**; player full-screen nel size scelto; autoplay anim
     + auto-advance con countdown; pausa/skip; HUD con indice "12 / 36".
   - 9:16 a misura reale per Reel. (Registri schermo → MP4.)

2. **Export PNG + caption + ZIP**:
   - Rende ogni card alla **risoluzione IG reale** in modalità `#still` —
     cattura alla dimensione vera, **non** la cattura "finta" (le `cqw` ingannano: gotcha noto).
   - Naming: `tipo/lingua/segno[_segnoB]/stile/size.png`.
   - **Caption + hashtag** generate da template per formato/segno (richiesto).
   - Packaging: **ZIP** con alberatura + **pagina anteprime** con download singoli (entrambi).

Risoluzioni IG target: Post **1080×1080**, Story/Reel **1080×1920**, Cover **1080×1350**.

---

## 5) DECISIONI DA PRENDERE (apri la nuova chat con queste)

1. **PNG — quale scenario?** A / B / C / D (o un mix). → fissa stili, size, lingue.
2. **Coppie** — quante e quali pairs? tutte 66, o lista curata (es. 20–40)?
   E quante lenti (tutte 8 o solo amore+amicizia+lavoro+sexual)?
3. **Video** — confermi solo "hero" 9:16 Pop? quante card e quali lingue?
4. **Stesso-segno** nelle coppie: sì/no.
5. **Caption** — confermi template per formato/segno; che CTA/handle mettiamo?

> Consiglio operativo: **primo giro = Scenario D** (≈420 PNG + ≈36 video IT) per
> validare naming, qualità e caption su un volume gestibile; poi scali a B/C.

---

## 6) Stato del progetto (da dove parti)
- **i18n 6 lingue COMPLETO** su tutte le pagine (motore `ZI18N.loadData()` carica
  solo la lingua attiva via document.write; IT statico come fallback).
  Dati+pianeti tradotti in IT/EN/DE/FR/ES/PT (`data/extra.<l>.js`, 0 mancanti).
- Cache busting: cardkit/i18n/extra a **?v=27**. Apri sempre con `?cb=N` per evitare cache preview.
- Builder card: `window.CARDKIT.build / buildCouple / buildCompat / buildPlanet`
  ritornano `{replay, settle, fit, el}`. `still:true` (o `#still`) = frame fermo per PNG.
- Helper UI stringhe nel motore = **TX** (non T).
- **Gotcha**: le `cqw` negli screenshot ingannano → verifica con eval_js a misura reale.

### Ripartenza
Apri una pagina e di': "Continua dal file `social/HANDOFF-EXPORT.md`. Scope export:
[scenario scelto + risposte §5]". Poi costruiamo Studio + Export PNG.
