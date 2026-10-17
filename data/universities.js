/* ============================================================
   Quizmind — Atenei
   ------------------------------------------------------------
   Elenco degli atenei italiani previsti dalla piattaforma,
   raggruppati per area geografica.

   Nessun piano di studi viene attribuito a un singolo ateneo:
   i corsi e gli esami provengono dal catalogo delle facoltà
   (vedi data/faculties.js).
   ============================================================ */

const UNIVERSITIES = [
  /* --------------------------- NORD --------------------------- */
  { id: "unibo",      name: "Alma Mater Studiorum - Università di Bologna", area: "Nord", city: "Bologna" },
  { id: "unipd",      name: "Università degli Studi di Padova",              area: "Nord", city: "Padova" },
  { id: "unimi",      name: "Università degli Studi di Milano",              area: "Nord", city: "Milano" },
  { id: "polimi",     name: "Politecnico di Milano",                         area: "Nord", city: "Milano" },
  { id: "unito",      name: "Università degli Studi di Torino",              area: "Nord", city: "Torino" },
  { id: "polito",     name: "Politecnico di Torino",                         area: "Nord", city: "Torino" },
  { id: "unige",      name: "Università degli Studi di Genova",              area: "Nord", city: "Genova" },
  { id: "unipv",      name: "Università degli Studi di Pavia",               area: "Nord", city: "Pavia" },
  { id: "univr",      name: "Università degli Studi di Verona",              area: "Nord", city: "Verona" },
  { id: "unipr",      name: "Università degli Studi di Parma",               area: "Nord", city: "Parma" },
  { id: "unimore",    name: "Università di Modena e Reggio Emilia",          area: "Nord", city: "Modena" },
  { id: "unife",      name: "Università degli Studi di Ferrara",             area: "Nord", city: "Ferrara" },
  { id: "units",      name: "Università degli Studi di Trieste",             area: "Nord", city: "Trieste" },
  { id: "uniud",      name: "Università degli Studi di Udine",               area: "Nord", city: "Udine" },
  { id: "unitn",      name: "Università degli Studi di Trento",              area: "Nord", city: "Trento" },
  { id: "unibg",      name: "Università degli Studi di Bergamo",             area: "Nord", city: "Bergamo" },
  { id: "unibs",      name: "Università degli Studi di Brescia",             area: "Nord", city: "Brescia" },
  { id: "insubria",   name: "Università degli Studi dell'Insubria",          area: "Nord", city: "Varese" },

  /* -------------------------- CENTRO -------------------------- */
  { id: "uniroma1",   name: "Sapienza Università di Roma",                   area: "Centro", city: "Roma" },
  { id: "uniroma2",   name: "Università di Roma Tor Vergata",                area: "Centro", city: "Roma" },
  { id: "uniroma3",   name: "Università degli Studi Roma Tre",               area: "Centro", city: "Roma" },
  { id: "unifi",      name: "Università degli Studi di Firenze",             area: "Centro", city: "Firenze" },
  { id: "unipi",      name: "Università degli Studi di Pisa",                area: "Centro", city: "Pisa" },
  { id: "unisi",      name: "Università degli Studi di Siena",               area: "Centro", city: "Siena" },
  { id: "unipg",      name: "Università degli Studi di Perugia",             area: "Centro", city: "Perugia" },
  { id: "univpm",     name: "Università Politecnica delle Marche",           area: "Centro", city: "Ancona" },
  { id: "unicas",     name: "Università di Cassino e del Lazio Meridionale", area: "Centro", city: "Cassino" },
  { id: "unimc",      name: "Università degli Studi di Macerata",            area: "Centro", city: "Macerata" },
  { id: "unich",      name: "Università degli Studi G. d'Annunzio Chieti-Pescara", area: "Centro", city: "Chieti" },
  { id: "unite",      name: "Università degli Studi di Teramo",              area: "Centro", city: "Teramo" },

  /* ----------------------- SUD E ISOLE ------------------------ */
  { id: "unina",      name: "Università degli Studi di Napoli Federico II",  area: "Sud e Isole", city: "Napoli" },
  { id: "uniba",      name: "Università degli Studi di Bari Aldo Moro",      area: "Sud e Isole", city: "Bari" },
  { id: "unisa",      name: "Università degli Studi di Salerno",             area: "Sud e Isole", city: "Salerno" },
  { id: "unical",     name: "Università della Calabria",                     area: "Sud e Isole", city: "Rende" },
  { id: "uniaq",      name: "Università degli Studi dell'Aquila",            area: "Sud e Isole", city: "L'Aquila" },
  { id: "unict",      name: "Università degli Studi di Catania",             area: "Sud e Isole", city: "Catania" },
  { id: "unipa",      name: "Università degli Studi di Palermo",             area: "Sud e Isole", city: "Palermo" },
  { id: "unime",      name: "Università degli Studi di Messina",             area: "Sud e Isole", city: "Messina" },
  { id: "unica",      name: "Università degli Studi di Cagliari",            area: "Sud e Isole", city: "Cagliari" },
  { id: "unisalento", name: "Università del Salento",                        area: "Sud e Isole", city: "Lecce" }
];

/* Raggruppa gli atenei per area geografica. */
function universitiesByArea() {
  const out = {};
  for (const u of UNIVERSITIES) {
    if (!out[u.area]) out[u.area] = [];
    out[u.area].push(u);
  }
  return out;
}

function findUniversity(id) {
  return UNIVERSITIES.find(u => u.id === id) || null;
}

const AREAS = [...new Set(UNIVERSITIES.map(u => u.area))];

export { UNIVERSITIES, AREAS, universitiesByArea, findUniversity };
