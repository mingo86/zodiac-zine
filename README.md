# Zodiac · Social Studio — sito statico

Cartella pronta per essere pubblicata online (es. **GitHub Pages**, Netlify, Vercel).
`index.html` è la **landing** con i link a tutti i generatori.

## Contenuto
- `index.html` — landing page
- `Zodiac Social - *.html` — i 6 generatori (Direzioni, Tagli, Coppie, Compatibilità, Pianeti, Sfondi)
- `Zodiac App Icon.html` — proposte icona
- `coppie/` — mascotte + motore affinità (`mascots.js`, `engine.js`)
- `data/` — testi dei segni + extra (`signs.it.js`, `extra.it.js`)
- `social/` — motore card (`cardkit.js`) + stili (`cards.css`)

## Pubblicare su GitHub Pages
1. Crea un repo su GitHub (es. `zodiac-social`).
2. Carica **tutto il contenuto di questa cartella** nel repo (trascina i file nella pagina "Add file → Upload files", oppure `git add . && git commit && git push`).
3. Repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main` / `/root` → Save.
4. Dopo ~1 minuto il sito è online su `https://<utente>.github.io/<repo>/`.

> Nota: i file caricano i font da Google Fonts (serve connessione). Tutto il resto è locale e funziona offline.

## Suggerimento URL
I nomi dei file hanno spazi e accenti: funzionano, ma per URL più puliti puoi rinominarli
(es. `coppie.html`) — ricordati di aggiornare i link in `index.html`.
