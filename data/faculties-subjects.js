/* ============================================================
   Quizmind — Struttura accademica
   Facoltà (università) + indirizzi superiori, con gli
   insegnamenti tipici per ogni anno di corso.

   Regola di onestà: questo file descrive gli insegnamenti
   TIPICI del percorso. Non è il piano di studi ufficiale di
   un singolo ateneo, che varia da università a università.
   Ogni voce non ancora derivata da un piano ufficiale è
   marcata verified: false.
   ============================================================ */

const FACULTIES = [
  /* ---------------- AREA GIURIDICO-ECONOMICA ---------------- */
  {
    id: "giurisprudenza",
    name: "Giurisprudenza",
    area: "Giuridico",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["diritto-costituzionale", "diritto-privato", "storia-del-diritto", "istituzioni-di-diritto-romano"] },
      { year: 2, label: "2° anno", subjects: ["diritto-amministrativo", "diritto-penale", "diritto-civile", "diritto-commerciale"] },
      { year: 3, label: "3° anno", subjects: ["diritto-processuale-civile", "diritto-processuale-penale", "diritto-del-lavoro", "diritto-dellunione-europea"] },
      { year: 4, label: "4° anno", subjects: ["diritto-tributario", "diritto-internazionale", "diritto-costituzionale-avanzato"] },
      { year: 5, label: "5° anno", subjects: ["diritto-ecclesiastico", "filosofia-del-diritto", "diritto-penale-avanzato"] }
    ]
  },
  {
    id: "economia",
    name: "Economia e Commercio",
    area: "Economico",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["microeconomia", "matematica-generale", "diritto-privato", "statistica"] },
      { year: 2, label: "2° anno", subjects: ["macroeconomia", "ragioneria-generale", "statistica-economica", "diritto-commerciale"] },
      { year: 3, label: "3° anno", subjects: ["economia-aziendale", "politica-economica", "diritto-del-lavoro", "econometria"] }
    ]
  },
  {
    id: "scienze-politiche",
    name: "Scienze Politiche",
    area: "Politico-sociale",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["diritto-costituzionale", "storia-contemporanea", "scienza-politica", "sociologia"] },
      { year: 2, label: "2° anno", subjects: ["diritto-amministrativo", "diritto-internazionale", "metodologia-della-ricerca", "storia-delle-dottrine-politiche"] },
      { year: 3, label: "3° anno", subjects: ["diritto-dellunione-europea", "politica-comparata", "diritto-pubblico-dell-economia"] }
    ]
  },
  {
    id: "scienze-comunicazione",
    name: "Scienze della Comunicazione",
    area: "Politico-sociale",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["sociologia", "semiotica", "storia-contemporanea", "teorie-della-comunicazione"] },
      { year: 2, label: "2° anno", subjects: ["giornalismo", "psicologia-sociale", "diritto-dell-informazione", "linguistica-generale"] },
      { year: 3, label: "3° anno", subjects: ["comunicazione-politica", "media-e-societa", "marketing"] }
    ]
  },
  {
    id: "psicologia",
    name: "Psicologia",
    area: "Sociale",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["psicologia-generale", "statistica-psicometrica", "biologia-generale", "storia-della-psicologia"] },
      { year: 2, label: "2° anno", subjects: ["psicologia-dello-sviluppo", "psicologia-sociale", "psicometria", "neurofisiologia"] },
      { year: 3, label: "3° anno", subjects: ["psicologia-clinica", "psicopatologia", "metodologia-della-ricerca"] }
    ]
  },

  /* ---------------- AREA MEDICO-SANITARIA ---------------- */
  {
    id: "medicina",
    name: "Medicina e Chirurgia",
    area: "Medica",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["chimica", "biologia-generale", "anatomia", "istologia", "fisica-medica"] },
      { year: 2, label: "2° anno", subjects: ["biochimica", "fisiologia", "anatomia-avanzata", "genetica-medica"] },
      { year: 3, label: "3° anno", subjects: ["fisiologia-avanzata", "patologia-generale", "microbiologia", "farmacologia"] },
      { year: 4, label: "4° anno", subjects: ["patologia-sistematica", "immunologia", "radiologia"] },
      { year: 5, label: "5° anno", subjects: ["clinica-medica", "chirurgia-generale", "pediatria"] },
      { year: 6, label: "6° anno", subjects: ["clinica-chirurgica", "ginecologia", "tirocinio-valutativo"] }
    ]
  },
  {
    id: "infermieristica",
    name: "Scienze Infermieristiche",
    area: "Medica",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["anatomia", "fisiologia", "infermieristica-generale", "chimica"] },
      { year: 2, label: "2° anno", subjects: ["patologia-generale", "farmacologia", "infermieristica-clinica", "microbiologia"] },
      { year: 3, label: "3° anno", subjects: ["infermieristica-chirurgica", "igiene", "infermieristica-avanzata"] }
    ]
  },
  {
    id: "farmacia",
    name: "Farmacia",
    area: "Medica",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["chimica-generale", "chimica-organica", "biologia", "anatomia"] },
      { year: 2, label: "2° anno", subjects: ["biochimica", "fisiologia", "chimica-analitica", "microbiologia"] },
      { year: 3, label: "3° anno", subjects: ["farmacologia", "chimica-farmaceutica", "farmacognosia"] },
      { year: 4, label: "4° anno", subjects: ["tecnologia-farmaceutica", "farmacoterapia"] }
    ]
  },
  {
    id: "biologia",
    name: "Scienze Biologiche",
    area: "Scientifica",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["chimica-generale", "biologia-generale", "matematica-generale", "citologia"] },
      { year: 2, label: "2° anno", subjects: ["biochimica", "genetica", "istologia", "microbiologia"] },
      { year: 3, label: "3° anno", subjects: ["ecologia", "fisiologia-vegetale", "biologia-molecolare"] }
    ]
  },

  /* ---------------- AREA SCIENTIFICA ---------------- */
  {
    id: "matematica",
    name: "Matematica",
    area: "Scientifica",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["analisi-matematica", "geometria", "algebra-lineare", "informatica"] },
      { year: 2, label: "2° anno", subjects: ["analisi-matematica-2", "fisica-generale", "probabilita", "equazioni-differenziali"] },
      { year: 3, label: "3° anno", subjects: ["analisi-numerica", "geometria-differenziale", "statistica"] }
    ]
  },
  {
    id: "fisica",
    name: "Fisica",
    area: "Scientifica",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["analisi-matematica", "fisica-generale", "geometria", "chimica-generale"] },
      { year: 2, label: "2° anno", subjects: ["meccanica-analitica", "termodinamica", "elettromagnetismo", "analisi-matematica-2"] },
      { year: 3, label: "3° anno", subjects: ["meccanica-quantistica", "fisica-statistica", "fisica-dello-stato-solido"] }
    ]
  },
  {
    id: "chimica-e-tecnologie",
    name: "Chimica",
    area: "Scientifica",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["chimica-generale", "matematica-generale", "fisica-generale", "chimica-organica"] },
      { year: 2, label: "2° anno", subjects: ["chimica-analitica", "chimica-fisica", "chimica-inorganica", "biochimica"] },
      { year: 3, label: "3° anno", subjects: ["chimica-organica-avanzata", "chimica-dei-materiali"] }
    ]
  },
  {
    id: "scienze-naturali",
    name: "Scienze Naturali",
    area: "Scientifica",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["biologia-generale", "chimica-generale", "geologia", "botanica"] },
      { year: 2, label: "2° anno", subjects: ["zoologia", "ecologia", "mineralogia", "statistica"] },
      { year: 3, label: "3° anno", subjects: ["paleontologia", "geografia-fisica", "biologia-molecolare"] }
    ]
  },
  {
    id: "scienze-motorie",
    name: "Scienze Motorie",
    area: "Scientifica",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["anatomia", "fisiologia", "biologia-generale", "pedagogia-generale"] },
      { year: 2, label: "2° anno", subjects: ["fisiologia-dellesercizio", "biomeccanica", "psicologia-dello-sport"] },
      { year: 3, label: "3° anno", subjects: ["medicina-dello-sport", "metodologia-dellallenamento"] }
    ]
  },
  {
    id: "geologia",
    name: "Scienze Geologiche",
    area: "Scientifica",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["geologia", "chimica-generale", "matematica-generale", "fisica-generale"] },
      { year: 2, label: "2° anno", subjects: ["mineralogia", "paleontologia", "geofisica", "geochimica"] },
      { year: 3, label: "3° anno", subjects: ["geologia-strutturale", "geomorfologia", "idrogeologia"] }
    ]
  },

  /* ---------------- AREA INGEGNERISTICA ---------------- */
  {
    id: "ingegneria-informatica",
    name: "Ingegneria Informatica",
    area: "Ingegneristica",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["analisi-matematica", "geometria", "programmazione", "fisica-generale"] },
      { year: 2, label: "2° anno", subjects: ["basi-di-dati", "algoritmi", "architettura-degli-elaboratori", "analisi-matematica-2"] },
      { year: 3, label: "3° anno", subjects: ["reti-di-calcolatori", "ingegneria-del-software", "sistemi-operativi"] }
    ]
  },
  {
    id: "ingegneria-civile",
    name: "Ingegneria Civile",
    area: "Ingegneristica",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["analisi-matematica", "geometria", "fisica-generale", "chimica-generale"] },
      { year: 2, label: "2° anno", subjects: ["meccanica-razionale", "scienza-delle-costruzioni", "idraulica", "geotecnica"] },
      { year: 3, label: "3° anno", subjects: ["tecnica-delle-costruzioni", "progettazione-strutturale"] }
    ]
  },
  {
    id: "ingegneria-meccanica",
    name: "Ingegneria Meccanica",
    area: "Ingegneristica",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["analisi-matematica", "geometria", "fisica-generale", "disegno-tecnico"] },
      { year: 2, label: "2° anno", subjects: ["meccanica-razionale", "termodinamica", "scienza-delle-costruzioni", "tecnologia-meccanica"] },
      { year: 3, label: "3° anno", subjects: ["macchine", "meccanica-applicata", "controlli-automatici"] }
    ]
  },
  {
    id: "ingegneria-elettronica",
    name: "Ingegneria Elettronica",
    area: "Ingegneristica",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["analisi-matematica", "fisica-generale", "geometria", "elettrotecnica"] },
      { year: 2, label: "2° anno", subjects: ["elettronica-analogica", "teoria-dei-segnali", "campi-elettromagnetici"] },
      { year: 3, label: "3° anno", subjects: ["elettronica-digitale", "misure-elettroniche", "microelettronica"] }
    ]
  },
  {
    id: "architettura",
    name: "Architettura",
    area: "Ingegneristica",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["disegno-dellarchitettura", "storia-dellarchitettura", "matematica-generale", "tecnologia-dei-materiali"] },
      { year: 2, label: "2° anno", subjects: ["progettazione-architettonica", "scienza-delle-costruzioni", "urbanistica"] },
      { year: 3, label: "3° anno", subjects: ["restauro", "progettazione-urbana", "estimo"] },
      { year: 4, label: "4° anno", subjects: ["composizione-architettonica", "tecnica-delle-costruzioni"] },
      { year: 5, label: "5° anno", subjects: ["laboratorio-di-sintesi-finale", "organizzazione-del-cantiere"] }
    ]
  },

  /* ---------------- AREA UMANISTICA ---------------- */
  {
    id: "lettere",
    name: "Lettere",
    area: "Umanistica",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["letteratura-italiana", "linguistica-generale", "storia-romana", "letteratura-latina"] },
      { year: 2, label: "2° anno", subjects: ["letteratura-italiana-2", "filologia-romanza", "storia-medievale", "letteratura-greca"] },
      { year: 3, label: "3° anno", subjects: ["critica-letteraria", "storia-della-lingua-italiana", "letterature-comparate"] }
    ]
  },
  {
    id: "storia",
    name: "Storia",
    area: "Umanistica",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["storia-romana", "storia-medievale", "storiografia", "geografia-storica"] },
      { year: 2, label: "2° anno", subjects: ["storia-moderna", "storia-contemporanea", "archivistica", "paleografia"] },
      { year: 3, label: "3° anno", subjects: ["storia-economica", "storia-delle-religioni", "storia-dell-arte"] }
    ]
  },
  {
    id: "filosofia",
    name: "Filosofia",
    area: "Umanistica",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["storia-della-filosofia-antica", "filosofia-teoretica", "logica", "storia-greca"] },
      { year: 2, label: "2° anno", subjects: ["storia-della-filosofia-moderna", "filosofia-morale", "estetica", "metafisica"] },
      { year: 3, label: "3° anno", subjects: ["storia-della-filosofia-contemporanea", "filosofia-del-linguaggio", "epistemologia"] }
    ]
  },
  {
    id: "lingue",
    name: "Lingue e Letterature Straniere",
    area: "Umanistica",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["linguistica-generale", "letteratura-inglese", "letteratura-spagnola", "glottologia"] },
      { year: 2, label: "2° anno", subjects: ["letteratura-inglese-2", "letteratura-francese", "letteratura-tedesca", "traduzione"] },
      { year: 3, label: "3° anno", subjects: ["letteratura-angloamericana", "linguistica-applicata"] }
    ]
  },
  {
    id: "beni-culturali",
    name: "Beni Culturali",
    area: "Umanistica",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["storia-dell-arte", "archeologia", "storia-medievale", "museologia"] },
      { year: 2, label: "2° anno", subjects: ["storia-dell-arte-moderna", "archeologia-classica", "legislazione-dei-beni-culturali"] },
      { year: 3, label: "3° anno", subjects: ["conservazione-dei-beni-culturali", "catalogazione", "diagnostica-artistica"] }
    ]
  },
  {
    id: "scienze-educazione",
    name: "Scienze della Formazione",
    area: "Umanistica",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["pedagogia-generale", "psicologia-dello-sviluppo", "storia-della-pedagogia", "sociologia"] },
      { year: 2, label: "2° anno", subjects: ["didattica-generale", "pedagogia-speciale", "psicologia-dellapprendimento"] },
      { year: 3, label: "3° anno", subjects: ["pedagogia-interculturale", "valutazione-scolastica"] }
    ]
  },
  {
    id: "scienze-politiche-internazionali",
    name: "Relazioni Internazionali",
    area: "Politico-sociale",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["diritto-internazionale", "storia-contemporanea", "scienza-politica", "economia-politica"] },
      { year: 2, label: "2° anno", subjects: ["diritto-dellunione-europea", "politica-internazionale", "lingua-inglese"] },
      { year: 3, label: "3° anno", subjects: ["geopolitica", "organizzazioni-internazionali"] }
    ]
  },
  {
    id: "servizio-sociale",
    name: "Servizio Sociale",
    area: "Sociale",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["sociologia", "psicologia-generale", "diritto-costituzionale", "metodi-del-servizio-sociale"] },
      { year: 2, label: "2° anno", subjects: ["diritto-di-famiglia", "psicologia-sociale", "organizzazione-dei-servizi"] },
      { year: 3, label: "3° anno", subjects: ["progettazione-sociale", "politiche-sociali"] }
    ]
  },
  {
    id: "statistica-corso",
    name: "Statistica",
    area: "Scientifica",
    kind: "universita",
    verified: false,
    years: [
      { year: 1, label: "1° anno", subjects: ["analisi-matematica", "probabilita", "statistica", "informatica"] },
      { year: 2, label: "2° anno", subjects: ["statistica-inferenziale", "algebra-lineare", "statistica-economica"] },
      { year: 3, label: "3° anno", subjects: ["modelli-statistici", "analisi-multivariata", "campionamento"] }
    ]
  }
];

export { FACULTIES };
