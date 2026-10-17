/* ============================================================
   Quizmind — Catalogo delle facoltà
   ------------------------------------------------------------
   Struttura: id facoltà -> nome, durata, esami per anno di corso.
   `src` distingue la provenienza del dato: "ufficiale" per la
   denominazione e la distribuzione fornite come programma di
   riferimento; "tipico" per gli insegnamenti ricorrenti, il cui
   piano di studi varia da ateneo ad ateneo.
   ============================================================ */

const FACULTIES_CATALOG = {
  "giurisprudenza": {
    name: "Giurisprudenza",
    duration: 5,
    src: "ufficiale",
    years: {
      1: ["Diritto costituzionale", "Diritto privato", "Istituzioni di diritto romano", "Storia del diritto"],
      2: ["Diritto amministrativo", "Diritto penale", "Diritto civile", "Diritto commerciale"],
      3: ["Diritto processuale civile", "Diritto processuale penale", "Diritto del lavoro", "Diritto dell'Unione europea"],
      4: ["Diritto tributario", "Diritto internazionale", "Diritto ecclesiastico"],
      5: ["Filosofia del diritto", "Diritto penale avanzato", "Prova finale"]
    }
  },
  "medicina": {
    name: "Medicina e Chirurgia",
    duration: 6,
    src: "ufficiale",
    years: {
      1: ["Chimica", "Biologia generale", "Anatomia", "Istologia", "Fisica medica"],
      2: ["Biochimica", "Fisiologia", "Anatomia avanzata", "Genetica medica"],
      3: ["Patologia generale", "Microbiologia", "Farmacologia", "Fisiologia avanzata"],
      4: ["Patologia sistematica", "Immunologia", "Radiologia"],
      5: ["Clinica medica", "Chirurgia generale", "Pediatria"],
      6: ["Clinica chirurgica", "Ginecologia", "Prova finale"]
    }
  },
  "economia": {
    name: "Economia e Commercio",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Microeconomia", "Matematica generale", "Diritto privato", "Statistica"],
      2: ["Macroeconomia", "Ragioneria generale", "Statistica economica", "Diritto commerciale"],
      3: ["Economia aziendale", "Politica economica", "Diritto del lavoro", "Econometria"]
    }
  },
  "ingegneria-informatica": {
    name: "Ingegneria Informatica",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Analisi matematica", "Geometria", "Programmazione", "Fisica generale"],
      2: ["Algoritmi", "Basi di dati", "Architettura degli elaboratori", "Analisi matematica 2"],
      3: ["Reti di calcolatori", "Ingegneria del software", "Sistemi operativi"]
    }
  },
  "psicologia": {
    name: "Psicologia",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Psicologia generale", "Statistica psicometrica", "Biologia generale", "Storia della psicologia"],
      2: ["Psicologia dello sviluppo", "Psicologia sociale", "Psicometria", "Neurofisiologia"],
      3: ["Psicologia clinica", "Psicopatologia", "Metodologia della ricerca"]
    }
  },
  "lettere": {
    name: "Lettere",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Letteratura italiana", "Linguistica generale", "Storia romana", "Letteratura latina"],
      2: ["Filologia romanza", "Storia medievale", "Letteratura greca", "Letteratura italiana 2"],
      3: ["Critica letteraria", "Storia della lingua italiana", "Letterature comparate"]
    }
  },
  "scienze-politiche": {
    name: "Scienze Politiche",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Diritto costituzionale", "Storia contemporanea", "Scienza politica", "Sociologia"],
      2: ["Diritto amministrativo", "Diritto internazionale", "Storia delle dottrine politiche", "Metodologia della ricerca"],
      3: ["Diritto dell'Unione europea", "Politica comparata", "Economia politica"]
    }
  },
  "biologia": {
    name: "Scienze Biologiche",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Chimica generale", "Biologia generale", "Matematica generale", "Citologia"],
      2: ["Biochimica", "Genetica", "Istologia", "Microbiologia"],
      3: ["Ecologia", "Fisiologia vegetale", "Biologia molecolare"]
    }
  },
  "matematica": {
    name: "Matematica",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Analisi matematica", "Geometria", "Algebra lineare", "Informatica"],
      2: ["Analisi matematica 2", "Fisica generale", "Probabilita", "Equazioni differenziali"],
      3: ["Analisi numerica", "Geometria differenziale", "Statistica"]
    }
  },
  "farmacia": {
    name: "Farmacia",
    duration: 5,
    src: "ufficiale",
    years: {
      1: ["Chimica generale", "Chimica organica", "Biologia", "Anatomia"],
      2: ["Biochimica", "Fisiologia", "Chimica analitica", "Microbiologia"],
      3: ["Farmacologia", "Chimica farmaceutica", "Farmacognosia"],
      4: ["Tecnologia farmaceutica", "Farmacoterapia"],
      5: ["Prova finale", "Tirocinio valutativo"]
    }
  },
  "infermieristica": {
    name: "Scienze Infermieristiche",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Anatomia", "Fisiologia", "Infermieristica generale", "Chimica"],
      2: ["Patologia generale", "Farmacologia", "Microbiologia", "Infermieristica clinica"],
      3: ["Igiene", "Infermieristica chirurgica", "Scienze infermieristiche avanzate"]
    }
  }
};

/* Slug dell'esame: minuscolo, spazi e apostrofi in trattini. */
function examSlug(nome) {
  return String(nome)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* Tutti gli esami del catalogo, senza duplicati. */
function allExams() {
  const visti = {};
  for (const id of Object.keys(FACULTIES_CATALOG)) {
    const f = FACULTIES_CATALOG[id];
    for (const anno of Object.keys(f.years)) {
      for (const esame of f.years[anno]) visti[esame] = true;
    }
  }
  return Object.keys(visti).sort(function (a, b) { return a.localeCompare(b, "it"); });
}

function facultyById(id) {
  return FACULTIES_CATALOG[id] || null;
}

/* Numeri di riepilogo del catalogo. */
function catalogStats() {
  const corsi = Object.keys(FACULTIES_CATALOG).length;
  let anni = 0;
  for (const id of Object.keys(FACULTIES_CATALOG)) {
    anni += Object.keys(FACULTIES_CATALOG[id].years).length;
  }
  return { corsi: corsi, anni: anni, esami: allExams().length };
}

export { FACULTIES_CATALOG, examSlug, allExams, facultyById, catalogStats };
