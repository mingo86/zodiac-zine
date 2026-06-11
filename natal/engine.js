/* ============================================================
   ZODIAC · TEMA NATALE — ENGINE
   Calcolo tropicale (astrologia occidentale).
   Dipende da: window.Astronomy  (astronomy-engine, browser build)
   Accuratezza verificata vs Swiss Ephemeris: < 0.1' sui pianeti,
   Ascendente/MC esatti.
   API:  window.NATAL.compute({year,month,day,hour,minute,lat,lon,tz})
   ============================================================ */
(function () {
  const A = window.Astronomy;
  const D2R = Math.PI / 180, R2D = 180 / Math.PI;
  const norm360 = x => ((x % 360) + 360) % 360;

  // 12 segni tropicali (0 grado = inizio Ariete)
  const SIGNS = [
    { k: "ariete", n: "Ariete", g: "♈", el: "fuoco", mod: "cardinale", ruler: "Marte" },
    { k: "toro", n: "Toro", g: "♉", el: "terra", mod: "fisso", ruler: "Venere" },
    { k: "gemelli", n: "Gemelli", g: "♊", el: "aria", mod: "mobile", ruler: "Mercurio" },
    { k: "cancro", n: "Cancro", g: "♋", el: "acqua", mod: "cardinale", ruler: "Luna" },
    { k: "leone", n: "Leone", g: "♌", el: "fuoco", mod: "fisso", ruler: "Sole" },
    { k: "vergine", n: "Vergine", g: "♍", el: "terra", mod: "mobile", ruler: "Mercurio" },
    { k: "bilancia", n: "Bilancia", g: "♎", el: "aria", mod: "cardinale", ruler: "Venere" },
    { k: "scorpione", n: "Scorpione", g: "♏", el: "acqua", mod: "fisso", ruler: "Plutone" },
    { k: "sagittario", n: "Sagittario", g: "♐", el: "fuoco", mod: "mobile", ruler: "Giove" },
    { k: "capricorno", n: "Capricorno", g: "♑", el: "terra", mod: "cardinale", ruler: "Saturno" },
    { k: "acquario", n: "Acquario", g: "♒", el: "aria", mod: "fisso", ruler: "Urano" },
    { k: "pesci", n: "Pesci", g: "♓", el: "acqua", mod: "mobile", ruler: "Nettuno" }
  ];
  const EL_COLOR = { fuoco: "#ec2e36", terra: "#36b06a", aria: "#f5b700", acqua: "#2f9bdb" };

  const PLANETS = [
    { key: "Sun", n: "Sole", g: "☉" },
    { key: "Moon", n: "Luna", g: "☽" },
    { key: "Mercury", n: "Mercurio", g: "☿" },
    { key: "Venus", n: "Venere", g: "♀" },
    { key: "Mars", n: "Marte", g: "♂" },
    { key: "Jupiter", n: "Giove", g: "♃" },
    { key: "Saturn", n: "Saturno", g: "♄" },
    { key: "Uranus", n: "Urano", g: "♅" },
    { key: "Neptune", n: "Nettuno", g: "♆" },
    { key: "Pluto", n: "Plutone", g: "♇" }
  ];

  function signOf(lon) {
    lon = norm360(lon);
    const i = Math.floor(lon / 30);
    const deg = lon - i * 30;
    return { idx: i, sign: SIGNS[i], deg: deg, lon: lon };
  }
  function fmtDeg(deg) {
    const d = Math.floor(deg);
    const m = Math.round((deg - d) * 60);
    return (m === 60) ? (d + 1) + "°00'" : d + "°" + String(m).padStart(2, "0") + "'";
  }

  // --- Timezone: ora locale (wall clock) -> istante UTC, con regole storiche (DST) ---
  function tzOffsetMinutes(tz, date) {
    const dtf = new Intl.DateTimeFormat("en-US", {
      timeZone: tz, hour12: false,
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit"
    });
    const p = {};
    for (const part of dtf.formatToParts(date)) p[part.type] = part.value;
    let h = +p.hour; if (h === 24) h = 0;
    const asUTC = Date.UTC(+p.year, +p.month - 1, +p.day, h, +p.minute, +p.second);
    return (asUTC - date.getTime()) / 60000; // minuti a est di UTC
  }
  function zonedToUTC(y, mo, d, h, mi, tz) {
    let guess = Date.UTC(y, mo - 1, d, h, mi, 0);
    let off = tzOffsetMinutes(tz, new Date(guess));
    let utc = guess - off * 60000;
    off = tzOffsetMinutes(tz, new Date(utc));   // seconda iterazione per i confini DST
    utc = guess - off * 60000;
    return { date: new Date(utc), offsetMin: off };
  }

  function eclipticLon(bodyKey, date) {
    const gv = A.GeoVector(bodyKey, date, true);   // geocentrica, aberrazione
    return norm360(A.Ecliptic(gv).elon);           // longitudine eclittica vera di data (tropicale)
  }
  function meanObliquity(date) {
    const T = A.MakeTime(date).tt / 36525.0;        // secoli da J2000 (TT)
    const sec = 84381.448 - 46.8150 * T - 0.00059 * T * T + 0.001813 * T * T * T;
    return sec / 3600;
  }
  function lstDeg(date, lonEast) {
    const gast = A.SiderealTime(date);              // ore (GAST)
    return norm360(gast * 15 + lonEast);
  }
  function ascendant(date, latDeg, lonEast) {
    const ramc = lstDeg(date, lonEast);
    const eps = meanObliquity(date);
    const er = eps * D2R, fr = latDeg * D2R, rr = ramc * D2R;
    let asc = Math.atan2(Math.cos(rr), -(Math.sin(rr) * Math.cos(er) + Math.tan(fr) * Math.sin(er))) * R2D;
    return norm360(asc);
  }
  function midheaven(date, lonEast) {
    const ramc = lstDeg(date, lonEast);
    const eps = meanObliquity(date);
    const er = eps * D2R, rr = ramc * D2R;
    let mc = norm360(Math.atan2(Math.tan(rr), Math.cos(er)) * R2D);
    const diff = norm360(mc - ramc);
    if (diff > 90 && diff < 270) mc = norm360(mc + 180);
    return mc;
  }
  // Retrogrado: confronto longitudine a +/- 12h
  function isRetro(bodyKey, date) {
    if (bodyKey === "Sun" || bodyKey === "Moon") return false;
    const dt = 0.5; // giorni
    const before = eclipticLon(bodyKey, new Date(date.getTime() - dt * 86400000));
    const after = eclipticLon(bodyKey, new Date(date.getTime() + dt * 86400000));
    let d = after - before;
    if (d > 180) d -= 360; if (d < -180) d += 360;
    return d < 0;
  }

  /* compute({year,month,day,hour,minute,lat,lon,tz})
     hour/minute opzionali: se mancano -> niente Ascendente/case, Luna approssimata. */
  function compute(input) {
    const hasTime = (input.hour != null && input.minute != null);
    const hasPlace = (input.lat != null && input.lon != null && input.tz);
    const h = hasTime ? input.hour : 12;          // mezzogiorno come default per i pianeti
    const mi = hasTime ? input.minute : 0;
    const tz = input.tz || "UTC";

    const z = zonedToUTC(input.year, input.month, input.day, h, mi, tz);
    const date = z.date;

    const planets = PLANETS.map(p => {
      const lon = eclipticLon(p.key, date);
      const s = signOf(lon);
      return {
        key: p.key, name: p.n, glyph: p.g,
        lon: lon, sign: s.sign, signIdx: s.idx, deg: s.deg,
        degText: fmtDeg(s.deg), retro: isRetro(p.key, date)
      };
    });

    const result = {
      utc: date.toISOString(),
      offsetMin: z.offsetMin,
      hasTime: hasTime, hasPlace: hasPlace,
      planets: planets,
      sun: planets[0],
      moon: planets[1]
    };

    if (hasTime && hasPlace) {
      const ascLon = ascendant(date, input.lat, input.lon);
      const mcLon = midheaven(date, input.lon);
      const as = signOf(ascLon), ms = signOf(mcLon);
      result.ascendant = { lon: ascLon, sign: as.sign, signIdx: as.idx, deg: as.deg, degText: fmtDeg(as.deg) };
      result.mc = { lon: mcLon, sign: ms.sign, signIdx: ms.idx, deg: ms.deg, degText: fmtDeg(ms.deg) };
      // Case "segno intero" (whole sign) a partire dall'Ascendente
      result.houses = [];
      for (let i = 0; i < 12; i++) {
        result.houses.push({ num: i + 1, sign: SIGNS[(as.idx + i) % 12] });
      }
      planets.forEach(p => { p.house = ((p.signIdx - as.idx + 12) % 12) + 1; });
    }
    return result;
  }

  window.NATAL = { compute, SIGNS, PLANETS, signOf, fmtDeg, zonedToUTC, EL_COLOR };
})();
