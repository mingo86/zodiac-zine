# Zodiac · Social Studio

Generatore **statico** (HTML/CSS/JS, nessun build) di card social per l'oroscopo — formati **post 1:1**, **story/reel 9:16** e **cover 4:5**, tutti animati e con versione statica (`#still`).

## Cosa contiene
- **Singoli**: card per ogni segno — taglio, serie (checklist · fumetto · scatter · LUI/LEI), pianeti, compatibilità.
- **Coppie**: due segni con affinità %, green flag, 7 lenti (amore, amicizia, lavoro, famiglia, convivenza, ex, capo & team) + modalità "A letto".
- **8 stili** (`dir`): Pop · Cosmo · Adesivi · Notte · Vintage · Neon · Crema · Candy.
- Tutto generato dal motore in `social/cardkit.js` (mascotte, scene, badge, animazioni) + dati multilingua in `data/`.

## Entry point
- `index.html` — hub con tutti i moduli.
- `Zodiac Social Studio.html` — **pagina principale**: una sola pagina con toggle **Singoli / Coppie** e tutte le combinazioni.
- `Zodiac Pianeti - Proposte.html` — confronto delle varianti del simbolo-pianeta.

## Struttura
```
index.html                      hub
Zodiac Social Studio.html       pagina unificata (singoli + coppie)
Zodiac Social - *.html          pagine per modulo (Coppie, Pianeti, Tagli, …)
Zodiac Pianeti - Proposte.html  proposte simbolo-pianeta
social/
  cardkit.js     motore di rendering delle card (build / buildCouple / buildCompat / buildPlanet / buildSeries)
  cards.css      stili delle card + 8 direzioni grafiche
  i18n.js        lingua + caricamento dati
  generator.js   generatore batch
  fonts-local.css
coppie/
  engine.js      motore affinità coppie
  mascots.js     mascotte SVG
data/
  signs.<lang>.js  extra.<lang>.js  series.<lang>.js   (it · en · de · fr · es · pt)
```

## Avvio in locale
Nessuna dipendenza. Apri `index.html` nel browser, oppure servi la cartella:
```bash
python3 -m http.server 8000
# poi apri http://localhost:8000
```
> I file usano risorse relative (`social/…`, `data/…`): servire la cartella radice è il modo più affidabile.

## Deploy
Sito 100% statico → adatto a **GitHub Pages**, Netlify, Vercel (static), ecc. Pubblica la root; la home è `index.html`.

## Cache busting
CSS/JS sono referenziati con `?v=NN`. Quando modifichi `cards.css`/`cardkit.js`, incrementa il numero nelle pagine che li usano.
