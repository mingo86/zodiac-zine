# 🧶 Zodiac in Feltro — Prompt per gli hook video

Prompt AI per generare le 12 mascotte Zodiac in stile **needle-felt / lana cardata**
(estetica della pubblicità ElevenLabs). Da usare **solo per gli hook video di Reels/TikTok**
(3-5 sec iniziali) — il feed statico resta con le card flat pop.

## Come si usano (il flusso)

1. Apri questo file → **copia un prompt**.
2. Incollalo nella casella prompt di un generatore immagini (vedi "Tool" sotto).
3. Genera 4 varianti, scegli la migliore.
4. **La prima mascotte scelta diventa il riferimento di stile** per tutte le altre 11
   (così non driftano → sembrano la stessa collezione di pupazzi).
5. Per il video: passa l'immagine a un image-to-video (Kling / Runway / Veo / ElevenLabs)
   con un micro-movimento (saluta, sbatte gli occhi, fluttua).

## Tool consigliati

| Tool | Dove | Nota consistenza |
|------|------|------------------|
| **Midjourney** | midjourney.com / Discord | Migliore. Usa `--sref <url>` con la stessa immagine per tutti e 12; `--cref` per i video |
| **DALL·E 3** | ChatGPT / Bing | Riusa lo stesso frame come riferimento, descrivi "same character as before" |
| **Ideogram / Flux** | ideogram.ai | Buona resa texture, blocca il seed |
| **ElevenLabs / Kling / Runway / Veo** | per il video | image-to-video partendo dall'immagine scelta |

---

## 🔒 BLOCCO MASTER (anteponi a OGNI prompt = consistenza)

```
Needle-felted wool craft character, soft handmade felt texture with visible fibers,
miniature stop-motion puppet, big round glossy cartoon eyes, rosy felt cheeks,
gentle warm smile, chubby rounded cute body, studio softbox lighting,
macro shot with shallow depth of field, cozy tactile mood, centered subject,
9:16 vertical, high detail, ElevenLabs claymation aesthetic --ar 9:16
```

> Tieni fissi: texture, occhi, luce, taglio. Cambia **solo** la creatura e il colore-elemento.

### Palette per elemento (NON cambiarla)
- 🔴 **Fuoco** `#ec2e36` — Ariete · Leone · Sagittario — sfondo *soft peach-coral pastel*
- 🟢 **Terra** `#36b06a` — Toro · Vergine · Capricorno — sfondo *soft sage-mint pastel*
- 🟡 **Aria** `#f5b700` — Gemelli · Bilancia · Acquario — sfondo *soft butter-yellow pastel*
- 🔵 **Acqua** `#2f9bdb` — Cancro · Scorpione · Pesci — sfondo *soft sky-blue pastel*

---

## I 12 prompt completi (master + creatura, pronti da incollare)

### ♈ Ariete — Fuoco 🔴
```
Needle-felted wool craft character, soft handmade felt texture with visible fibers, miniature stop-motion puppet, big round glossy cartoon eyes, rosy felt cheeks, gentle warm smile, chubby rounded cute body, studio softbox lighting, macro shot with shallow depth of field, cozy tactile mood, centered subject, 9:16 vertical, high detail, ElevenLabs claymation aesthetic
+ a chubby felt baby ram, big curled spiral horns, fluffy cream wool fleece, tiny ears, confident little grin, warm red felt scarf accent, soft peach-coral pastel background. --ar 9:16
```

### ♉ Toro — Terra 🟢
```
Needle-felted wool craft character, soft handmade felt texture with visible fibers, miniature stop-motion puppet, big round glossy cartoon eyes, rosy felt cheeks, gentle warm smile, chubby rounded cute body, studio softbox lighting, macro shot with shallow depth of field, cozy tactile mood, centered subject, 9:16 vertical, high detail, ElevenLabs claymation aesthetic
+ a sturdy little felt bull, wide soft head, short rounded horns, small nose ring, calm content smile, mossy green felt body, soft sage-mint pastel background. --ar 9:16
```

### ♊ Gemelli — Aria 🟡
```
Needle-felted wool craft character, soft handmade felt texture with visible fibers, miniature stop-motion puppet, big round glossy cartoon eyes, rosy felt cheeks, gentle warm smile, chubby rounded cute body, studio softbox lighting, macro shot with shallow depth of field, cozy tactile mood, centered subject, 9:16 vertical, high detail, ElevenLabs claymation aesthetic
+ two identical felt twin characters side by side holding hands, playful mirrored smiles, sunny yellow felt outfits, soft butter-yellow pastel background. --ar 9:16
```

### ♋ Cancro — Acqua 🔵
```
Needle-felted wool craft character, soft handmade felt texture with visible fibers, miniature stop-motion puppet, big round glossy cartoon eyes, rosy felt cheeks, gentle warm smile, chubby rounded cute body, studio softbox lighting, macro shot with shallow depth of field, cozy tactile mood, centered subject, 9:16 vertical, high detail, ElevenLabs claymation aesthetic
+ a round felt crab, big soft shell, two plush claws, cute eyes on short stalks, shy gentle smile, aqua blue felt, soft sky-blue pastel background. --ar 9:16
```

### ♌ Leone — Fuoco 🔴
```
Needle-felted wool craft character, soft handmade felt texture with visible fibers, miniature stop-motion puppet, big round glossy cartoon eyes, rosy felt cheeks, gentle warm smile, chubby rounded cute body, studio softbox lighting, macro shot with shallow depth of field, cozy tactile mood, centered subject, 9:16 vertical, high detail, ElevenLabs claymation aesthetic
+ a little felt lion, fluffy radial mane like sun rays, proud beaming grin, golden-red wool, tiny tufted tail, soft peach-coral pastel background. --ar 9:16
```

### ♍ Vergine — Terra 🟢
```
Needle-felted wool craft character, soft handmade felt texture with visible fibers, miniature stop-motion puppet, big round glossy cartoon eyes, rosy felt cheeks, gentle warm smile, chubby rounded cute body, studio softbox lighting, macro shot with shallow depth of field, cozy tactile mood, centered subject, 9:16 vertical, high detail, ElevenLabs claymation aesthetic
+ a slender gentle felt maiden, soft wool hair, holding a tiny wheat sprig, serene calm smile, sage green felt dress, soft sage-mint pastel background. --ar 9:16
```

### ♎ Bilancia — Aria 🟡
```
Needle-felted wool craft character, soft handmade felt texture with visible fibers, miniature stop-motion puppet, big round glossy cartoon eyes, rosy felt cheeks, gentle warm smile, chubby rounded cute body, studio softbox lighting, macro shot with shallow depth of field, cozy tactile mood, centered subject, 9:16 vertical, high detail, ElevenLabs claymation aesthetic
+ a graceful felt character holding tiny two-pan balance scales, harmonious peaceful smile, soft yellow felt robe, soft butter-yellow pastel background. --ar 9:16
```

### ♏ Scorpione — Acqua 🔵
```
Needle-felted wool craft character, soft handmade felt texture with visible fibers, miniature stop-motion puppet, big round glossy cartoon eyes, rosy felt cheeks, gentle warm smile, chubby rounded cute body, studio softbox lighting, macro shot with shallow depth of field, cozy tactile mood, centered subject, 9:16 vertical, high detail, ElevenLabs claymation aesthetic
+ a small cute felt scorpion, little plush claws, curved tail with a rounded soft stinger, mysterious half-smile, deep blue felt, soft sky-blue pastel background. --ar 9:16
```

### ♐ Sagittario — Fuoco 🔴
```
Needle-felted wool craft character, soft handmade felt texture with visible fibers, miniature stop-motion puppet, big round glossy cartoon eyes, rosy felt cheeks, gentle warm smile, chubby rounded cute body, studio softbox lighting, macro shot with shallow depth of field, cozy tactile mood, centered subject, 9:16 vertical, high detail, ElevenLabs claymation aesthetic
+ an adventurous felt archer character drawing a tiny felt bow and arrow, free-spirited grin, fiery red wool, little quiver, soft peach-coral pastel background. --ar 9:16
```

### ♑ Capricorno — Terra 🟢
```
Needle-felted wool craft character, soft handmade felt texture with visible fibers, miniature stop-motion puppet, big round glossy cartoon eyes, rosy felt cheeks, gentle warm smile, chubby rounded cute body, studio softbox lighting, macro shot with shallow depth of field, cozy tactile mood, centered subject, 9:16 vertical, high detail, ElevenLabs claymation aesthetic
+ a felt sea-goat, goat head with curved horns, spiral fish tail of felt, determined calm look, forest green wool, soft sage-mint pastel background. --ar 9:16
```

### ♒ Acquario — Aria 🟡
```
Needle-felted wool craft character, soft handmade felt texture with visible fibers, miniature stop-motion puppet, big round glossy cartoon eyes, rosy felt cheeks, gentle warm smile, chubby rounded cute body, studio softbox lighting, macro shot with shallow depth of field, cozy tactile mood, centered subject, 9:16 vertical, high detail, ElevenLabs claymation aesthetic
+ a quirky felt water-bearer holding an amphora pouring stylized felt water waves, visionary friendly smile, electric yellow felt, soft butter-yellow pastel background. --ar 9:16
```

### ♓ Pesci — Acqua 🔵
```
Needle-felted wool craft character, soft handmade felt texture with visible fibers, miniature stop-motion puppet, big round glossy cartoon eyes, rosy felt cheeks, gentle warm smile, chubby rounded cute body, studio softbox lighting, macro shot with shallow depth of field, cozy tactile mood, centered subject, 9:16 vertical, high detail, ElevenLabs claymation aesthetic
+ two little felt fish swimming in a gentle circle in opposite directions, dreamy soft eyes, calm blue felt, tiny bubbles, soft sky-blue pastel background. --ar 9:16
```

---

## Note di consistenza (la parte che conta)

- **Genera bene il PRIMO** (consiglio: Capricorno), poi usalo come `--sref` / immagine di riferimento per gli altri 11.
- **Blocca il seed** quando il tool lo permette: stessa luce, stesso sfondo, stessa inquadratura.
- **Non cambiare la palette** per elemento.
- **Solo hook**: 3-5 sec di feltro → transizione → card flat con l'oroscopo. Il feed NON cambia.
- Quando hai la prima mascotte di prova, salvala in `studio/social/felt-ref/` come riferimento.
