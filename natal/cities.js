/* ============================================================
   ZODIAC · TEMA NATALE — DATABASE CITTÀ
   Formato: [nome, area, lat, lon, IANA timezone]
   Italia: capoluoghi + grandi comuni (tutti Europe/Rome).
   Mondo: città principali con il loro fuso.
   Ricerca: window.CITY.search(q) -> array risultati.
   Fallback: inserimento manuale lat/lon/tz nella UI.
   ============================================================ */
(function () {
  // --- ITALIA (Europe/Rome) ---
  const IT = [
    ["Roma", "Lazio", 41.9028, 12.4964],
    ["Milano", "Lombardia", 45.4642, 9.1900],
    ["Napoli", "Campania", 40.8518, 14.2681],
    ["Torino", "Piemonte", 45.0703, 7.6869],
    ["Palermo", "Sicilia", 38.1157, 13.3615],
    ["Genova", "Liguria", 44.4056, 8.9463],
    ["Bologna", "Emilia-Romagna", 44.4949, 11.3426],
    ["Firenze", "Toscana", 43.7696, 11.2558],
    ["Bari", "Puglia", 41.1171, 16.8719],
    ["Catania", "Sicilia", 37.5079, 15.0830],
    ["Venezia", "Veneto", 45.4408, 12.3155],
    ["Verona", "Veneto", 45.4384, 10.9916],
    ["Messina", "Sicilia", 38.1938, 15.5540],
    ["Padova", "Veneto", 45.4064, 11.8768],
    ["Trieste", "Friuli-Venezia Giulia", 45.6495, 13.7768],
    ["Brescia", "Lombardia", 45.5416, 10.2118],
    ["Parma", "Emilia-Romagna", 44.8015, 10.3279],
    ["Taranto", "Puglia", 40.4644, 17.2470],
    ["Prato", "Toscana", 43.8777, 11.1021],
    ["Modena", "Emilia-Romagna", 44.6471, 10.9252],
    ["Reggio Calabria", "Calabria", 38.1102, 15.6612],
    ["Reggio Emilia", "Emilia-Romagna", 44.6983, 10.6310],
    ["Perugia", "Umbria", 43.1107, 12.3908],
    ["Ravenna", "Emilia-Romagna", 44.4184, 12.2035],
    ["Livorno", "Toscana", 43.5485, 10.3106],
    ["Cagliari", "Sardegna", 39.2238, 9.1217],
    ["Foggia", "Puglia", 41.4622, 15.5446],
    ["Rimini", "Emilia-Romagna", 44.0678, 12.5695],
    ["Salerno", "Campania", 40.6824, 14.7681],
    ["Ferrara", "Emilia-Romagna", 44.8378, 11.6196],
    ["Sassari", "Sardegna", 40.7259, 8.5557],
    ["Latina", "Lazio", 41.4677, 12.9036],
    ["Giugliano in Campania", "Campania", 40.9281, 14.1953],
    ["Monza", "Lombardia", 45.5845, 9.2744],
    ["Siracusa", "Sicilia", 37.0755, 15.2866],
    ["Pescara", "Abruzzo", 42.4618, 14.2161],
    ["Bergamo", "Lombardia", 45.6983, 9.6773],
    ["Forlì", "Emilia-Romagna", 44.2227, 12.0407],
    ["Trento", "Trentino-Alto Adige", 46.0700, 11.1190],
    ["Vicenza", "Veneto", 45.5455, 11.5354],
    ["Terni", "Umbria", 42.5636, 12.6427],
    ["Bolzano", "Trentino-Alto Adige", 46.4983, 11.3548],
    ["Novara", "Piemonte", 45.4469, 8.6222],
    ["Piacenza", "Emilia-Romagna", 45.0526, 9.6929],
    ["Ancona", "Marche", 43.6158, 13.5189],
    ["Andria", "Puglia", 41.2317, 16.2958],
    ["Arezzo", "Toscana", 43.4633, 11.8796],
    ["Udine", "Friuli-Venezia Giulia", 46.0711, 13.2346],
    ["Cesena", "Emilia-Romagna", 44.1391, 12.2431],
    ["Lecce", "Puglia", 40.3515, 18.1750],
    ["Pesaro", "Marche", 43.9097, 12.9131],
    ["La Spezia", "Liguria", 44.1025, 9.8240],
    ["Alessandria", "Piemonte", 44.9133, 8.6151],
    ["Catanzaro", "Calabria", 38.9097, 16.5877],
    ["Pisa", "Toscana", 43.7160, 10.3966],
    ["Pistoia", "Toscana", 43.9303, 10.9220],
    ["Como", "Lombardia", 45.8081, 9.0852],
    ["Lucca", "Toscana", 43.8430, 10.5079],
    ["Brindisi", "Puglia", 40.6327, 17.9418],
    ["Treviso", "Veneto", 45.6669, 12.2433],
    ["Busto Arsizio", "Lombardia", 45.6119, 8.8517],
    ["Marsala", "Sicilia", 37.7993, 12.4367],
    ["Grosseto", "Toscana", 42.7603, 11.1130],
    ["Sesto San Giovanni", "Lombardia", 45.5333, 9.2333],
    ["Pozzuoli", "Campania", 40.8231, 14.1222],
    ["Varese", "Lombardia", 45.8206, 8.8251],
    ["Fiumicino", "Lazio", 41.7714, 12.2370],
    ["Asti", "Piemonte", 44.9009, 8.2065],
    ["Caserta", "Campania", 41.0734, 14.3326],
    ["Cremona", "Lombardia", 45.1333, 10.0226],
    ["Potenza", "Basilicata", 40.6420, 15.7990],
    ["Campobasso", "Molise", 41.5630, 14.6560],
    ["Aosta", "Valle d'Aosta", 45.7372, 7.3206],
    ["L'Aquila", "Abruzzo", 42.3498, 13.3995],
    ["Cosenza", "Calabria", 39.2983, 16.2536],
    ["Trapani", "Sicilia", 38.0176, 12.5365],
    ["Agrigento", "Sicilia", 37.3109, 13.5765],
    ["Matera", "Basilicata", 40.6664, 16.6043],
    ["Benevento", "Campania", 41.1297, 14.7826],
    ["Savona", "Liguria", 44.3091, 8.4772],
    ["Imperia", "Liguria", 43.8893, 8.0390],
    ["Vibo Valentia", "Calabria", 38.6759, 16.1010],
    ["Crotone", "Calabria", 39.0808, 17.1270],
    ["Enna", "Sicilia", 37.5675, 14.2795],
    ["Caltanissetta", "Sicilia", 37.4863, 14.0625],
    ["Ragusa", "Sicilia", 36.9269, 14.7255],
    ["Nuoro", "Sardegna", 40.3210, 9.3290],
    ["Oristano", "Sardegna", 39.9036, 8.5917],
    ["Belluno", "Veneto", 46.1390, 12.2167],
    ["Sondrio", "Lombardia", 46.1700, 9.8700],
    ["Gorizia", "Friuli-Venezia Giulia", 45.9410, 13.6220],
    ["Pordenone", "Friuli-Venezia Giulia", 45.9564, 12.6605],
    ["Mantova", "Lombardia", 45.1564, 10.7914],
    ["Lodi", "Lombardia", 45.3140, 9.5036],
    ["Pavia", "Lombardia", 45.1847, 9.1582],
    ["Vercelli", "Piemonte", 45.3202, 8.4185],
    ["Biella", "Piemonte", 45.5660, 8.0540],
    ["Cuneo", "Piemonte", 44.3841, 7.5426],
    ["Verbania", "Piemonte", 45.9214, 8.5519],
    ["Massa", "Toscana", 44.0354, 10.1410],
    ["Siena", "Toscana", 43.3188, 11.3308],
    ["Macerata", "Marche", 43.3007, 13.4536],
    ["Ascoli Piceno", "Marche", 42.8537, 13.5749],
    ["Fermo", "Marche", 43.1604, 13.7186],
    ["Urbino", "Marche", 43.7262, 12.6365],
    ["Viterbo", "Lazio", 42.4175, 12.1041],
    ["Rieti", "Lazio", 42.4048, 12.8627],
    ["Frosinone", "Lazio", 41.6396, 13.3517],
    ["Teramo", "Abruzzo", 42.6589, 13.7041],
    ["Chieti", "Abruzzo", 42.3512, 14.1678],
    ["Isernia", "Molise", 41.5960, 14.2310],
    ["Avellino", "Campania", 40.9146, 14.7906],
    ["Barletta", "Puglia", 41.3194, 16.2842],
    ["Trani", "Puglia", 41.2772, 16.4172],
    ["Gallipoli", "Puglia", 40.0556, 17.9924]
  ].map(c => [c[0], c[1] + ", Italia", c[2], c[3], "Europe/Rome"]);

  // --- MONDO ---
  const W = [
    ["London", "Regno Unito", 51.5074, -0.1278, "Europe/London"],
    ["Paris", "Francia", 48.8566, 2.3522, "Europe/Paris"],
    ["Madrid", "Spagna", 40.4168, -3.7038, "Europe/Madrid"],
    ["Barcelona", "Spagna", 41.3851, 2.1734, "Europe/Madrid"],
    ["Berlin", "Germania", 52.5200, 13.4050, "Europe/Berlin"],
    ["Munich", "Germania", 48.1351, 11.5820, "Europe/Berlin"],
    ["Amsterdam", "Paesi Bassi", 52.3676, 4.9041, "Europe/Amsterdam"],
    ["Brussels", "Belgio", 50.8503, 4.3517, "Europe/Brussels"],
    ["Zürich", "Svizzera", 47.3769, 8.5417, "Europe/Zurich"],
    ["Geneva", "Svizzera", 46.2044, 6.1432, "Europe/Zurich"],
    ["Lugano", "Svizzera", 46.0037, 8.9511, "Europe/Zurich"],
    ["Wien", "Austria", 48.2082, 16.3738, "Europe/Vienna"],
    ["Lisbon", "Portogallo", 38.7223, -9.1393, "Europe/Lisbon"],
    ["Dublin", "Irlanda", 53.3498, -6.2603, "Europe/Dublin"],
    ["Athens", "Grecia", 37.9838, 23.7275, "Europe/Athens"],
    ["Prague", "Rep. Ceca", 50.0755, 14.4378, "Europe/Prague"],
    ["Warszawa", "Polonia", 52.2297, 21.0122, "Europe/Warsaw"],
    ["Budapest", "Ungheria", 47.4979, 19.0402, "Europe/Budapest"],
    ["Stockholm", "Svezia", 59.3293, 18.0686, "Europe/Stockholm"],
    ["Oslo", "Norvegia", 59.9139, 10.7522, "Europe/Oslo"],
    ["Copenhagen", "Danimarca", 55.6761, 12.5683, "Europe/Copenhagen"],
    ["Helsinki", "Finlandia", 60.1699, 24.9384, "Europe/Helsinki"],
    ["Moskva", "Russia", 55.7558, 37.6173, "Europe/Moscow"],
    ["İstanbul", "Turchia", 41.0082, 28.9784, "Europe/Istanbul"],
    ["Zagreb", "Croazia", 45.8150, 15.9819, "Europe/Zagreb"],
    ["Beograd", "Serbia", 44.7866, 20.4489, "Europe/Belgrade"],
    ["Bucharest", "Romania", 44.4268, 26.1025, "Europe/Bucharest"],
    ["Valletta", "Malta", 35.8989, 14.5146, "Europe/Malta"],
    ["Tirana", "Albania", 41.3275, 19.8187, "Europe/Tirane"],
    ["New York", "USA", 40.7128, -74.0060, "America/New_York"],
    ["Los Angeles", "USA", 34.0522, -118.2437, "America/Los_Angeles"],
    ["Chicago", "USA", 41.8781, -87.6298, "America/Chicago"],
    ["Miami", "USA", 25.7617, -80.1918, "America/New_York"],
    ["San Francisco", "USA", 37.7749, -122.4194, "America/Los_Angeles"],
    ["Boston", "USA", 42.3601, -71.0589, "America/New_York"],
    ["Washington", "USA", 38.9072, -77.0369, "America/New_York"],
    ["Toronto", "Canada", 43.6532, -79.3832, "America/Toronto"],
    ["Montréal", "Canada", 45.5017, -73.5673, "America/Toronto"],
    ["Vancouver", "Canada", 49.2827, -123.1207, "America/Vancouver"],
    ["Ciudad de México", "Messico", 19.4326, -99.1332, "America/Mexico_City"],
    ["São Paulo", "Brasile", -23.5505, -46.6333, "America/Sao_Paulo"],
    ["Rio de Janeiro", "Brasile", -22.9068, -43.1729, "America/Sao_Paulo"],
    ["Buenos Aires", "Argentina", -34.6037, -58.3816, "America/Argentina/Buenos_Aires"],
    ["Santiago", "Cile", -33.4489, -70.6693, "America/Santiago"],
    ["Lima", "Perù", -12.0464, -77.0428, "America/Lima"],
    ["Bogotá", "Colombia", 4.7110, -74.0721, "America/Bogota"],
    ["Cairo", "Egitto", 30.0444, 31.2357, "Africa/Cairo"],
    ["Casablanca", "Marocco", 33.5731, -7.5898, "Africa/Casablanca"],
    ["Tunis", "Tunisia", 36.8065, 10.1815, "Africa/Tunis"],
    ["Lagos", "Nigeria", 6.5244, 3.3792, "Africa/Lagos"],
    ["Nairobi", "Kenya", -1.2921, 36.8219, "Africa/Nairobi"],
    ["Johannesburg", "Sudafrica", -26.2041, 28.0473, "Africa/Johannesburg"],
    ["Cape Town", "Sudafrica", -33.9249, 18.4241, "Africa/Johannesburg"],
    ["Dubai", "Emirati", 25.2048, 55.2708, "Asia/Dubai"],
    ["Tel Aviv", "Israele", 32.0853, 34.7818, "Asia/Jerusalem"],
    ["Beirut", "Libano", 33.8938, 35.5018, "Asia/Beirut"],
    ["Riyadh", "Arabia Saudita", 24.7136, 46.6753, "Asia/Riyadh"],
    ["Tehran", "Iran", 35.6892, 51.3890, "Asia/Tehran"],
    ["Mumbai", "India", 19.0760, 72.8777, "Asia/Kolkata"],
    ["Delhi", "India", 28.7041, 77.1025, "Asia/Kolkata"],
    ["Bangkok", "Thailandia", 13.7563, 100.5018, "Asia/Bangkok"],
    ["Singapore", "Singapore", 1.3521, 103.8198, "Asia/Singapore"],
    ["Hong Kong", "Hong Kong", 22.3193, 114.1694, "Asia/Hong_Kong"],
    ["Shanghai", "Cina", 31.2304, 121.4737, "Asia/Shanghai"],
    ["Beijing", "Cina", 39.9042, 116.4074, "Asia/Shanghai"],
    ["Tokyo", "Giappone", 35.6762, 139.6503, "Asia/Tokyo"],
    ["Seoul", "Corea del Sud", 37.5665, 126.9780, "Asia/Seoul"],
    ["Jakarta", "Indonesia", -6.2088, 106.8456, "Asia/Jakarta"],
    ["Sydney", "Australia", -33.8688, 151.2093, "Australia/Sydney"],
    ["Melbourne", "Australia", -37.8136, 144.9631, "Australia/Melbourne"],
    ["Auckland", "Nuova Zelanda", -36.8485, 174.7633, "Pacific/Auckland"]
  ];

  const DB = IT.concat(W);

  function norm(s) {
    return s.toLowerCase()
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
  }

  function search(q, limit) {
    q = norm(q || "");
    if (!q) return [];
    limit = limit || 8;
    const out = [];
    for (const c of DB) {
      const name = norm(c[0]), area = norm(c[1]);
      let score = -1;
      if (name === q) score = 100;
      else if (name.startsWith(q)) score = 80 - name.length * 0.1;
      else if (name.includes(q)) score = 50;
      else if (area.includes(q)) score = 20;
      if (score >= 0) out.push([score, c]);
    }
    out.sort((a, b) => b[0] - a[0]);
    return out.slice(0, limit).map(x => ({
      name: x[1][0], area: x[1][1], lat: x[1][2], lon: x[1][3], tz: x[1][4]
    }));
  }

  window.CITY = { DB, search };
})();
