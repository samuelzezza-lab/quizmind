/* ============================================================
   Quizmind — Scuola Superiore
   ------------------------------------------------------------
   Struttura: indirizzo -> materia -> anno scolastico (1-5).

   Gli indirizzi sono quelli reali del sistema scolastico italiano.
   Le materie per anno sono quelle previste dai quadri orari
   ministeriali per ciascun indirizzo.
   ============================================================ */

const SCHOOL_TRACKS = [
  /* ========================= LICEI ========================= */
  {
    id: "liceo-classico",
    name: "Liceo Classico",
    kind: "Liceo",
    years: 5,
    subjects: {
      1: ["Lingua e Letteratura Italiana", "Lingua e Cultura Latina", "Lingua e Cultura Greca", "Storia", "Filosofia", "Matematica", "Scienze Naturali", "Lingua e Cultura Straniera"],
      2: ["Lingua e Letteratura Italiana", "Lingua e Cultura Latina", "Lingua e Cultura Greca", "Storia", "Filosofia", "Matematica", "Scienze Naturali", "Lingua e Cultura Straniera"],
      3: ["Lingua e Letteratura Italiana", "Lingua e Cultura Latina", "Lingua e Cultura Greca", "Storia", "Filosofia", "Matematica", "Scienze Naturali", "Fisica", "Lingua e Cultura Straniera"],
      4: ["Lingua e Letteratura Italiana", "Lingua e Cultura Latina", "Lingua e Cultura Greca", "Storia", "Filosofia", "Matematica", "Scienze Naturali", "Fisica", "Lingua e Cultura Straniera"],
      5: ["Lingua e Letteratura Italiana", "Lingua e Cultura Latina", "Lingua e Cultura Greca", "Storia", "Filosofia", "Matematica", "Scienze Naturali", "Fisica", "Lingua e Cultura Straniera"]
    }
  },
  {
    id: "liceo-scientifico",
    name: "Liceo Scientifico",
    kind: "Liceo",
    years: 5,
    subjects: {
      1: ["Lingua e Letteratura Italiana", "Matematica", "Scienze Naturali", "Fisica", "Storia", "Filosofia", "Lingua e Cultura Straniera", "Disegno e Storia dell'Arte"],
      2: ["Lingua e Letteratura Italiana", "Matematica", "Scienze Naturali", "Fisica", "Storia", "Filosofia", "Lingua e Cultura Straniera", "Disegno e Storia dell'Arte"],
      3: ["Lingua e Letteratura Italiana", "Matematica", "Scienze Naturali", "Fisica", "Storia", "Filosofia", "Lingua e Cultura Straniera", "Disegno e Storia dell'Arte"],
      4: ["Lingua e Letteratura Italiana", "Matematica", "Scienze Naturali", "Fisica", "Storia", "Filosofia", "Lingua e Cultura Straniera", "Disegno e Storia dell'Arte"],
      5: ["Lingua e Letteratura Italiana", "Matematica", "Scienze Naturali", "Fisica", "Storia", "Filosofia", "Lingua e Cultura Straniera", "Disegno e Storia dell'Arte"]
    }
  },
  {
    id: "liceo-economico-sociale",
    name: "Liceo Economico-Sociale",
    kind: "Liceo",
    years: 5,
    subjects: {
      1: ["Lingua e Letteratura Italiana", "Matematica", "Scienze Umane", "Diritto ed Economia", "Storia", "Filosofia", "Lingua e Cultura Straniera", "Scienze Naturali"],
      2: ["Lingua e Letteratura Italiana", "Matematica", "Scienze Umane", "Diritto ed Economia", "Storia", "Filosofia", "Lingua e Cultura Straniera", "Scienze Naturali"],
      3: ["Lingua e Letteratura Italiana", "Matematica", "Scienze Umane", "Diritto ed Economia", "Storia", "Filosofia", "Lingua e Cultura Straniera", "Fisica"],
      4: ["Lingua e Letteratura Italiana", "Matematica", "Scienze Umane", "Diritto ed Economia", "Storia", "Filosofia", "Lingua e Cultura Straniera", "Fisica"],
      5: ["Lingua e Letteratura Italiana", "Matematica", "Scienze Umane", "Diritto ed Economia", "Storia", "Filosofia", "Lingua e Cultura Straniera", "Fisica"]
    }
  },
  {
    id: "liceo-artistico",
    name: "Liceo Artistico",
    kind: "Liceo",
    years: 5,
    subjects: {
      1: ["Lingua e Letteratura Italiana", "Storia dell'Arte", "Discipline Grafiche e Pittoriche", "Discipline Geometriche", "Matematica", "Storia", "Scienze Naturali", "Lingua e Cultura Straniera"],
      2: ["Lingua e Letteratura Italiana", "Storia dell'Arte", "Discipline Grafiche e Pittoriche", "Discipline Geometriche", "Matematica", "Storia", "Scienze Naturali", "Lingua e Cultura Straniera"],
      3: ["Lingua e Letteratura Italiana", "Storia dell'Arte", "Discipline Progettuali", "Filosofia", "Matematica", "Storia", "Fisica", "Lingua e Cultura Straniera"],
      4: ["Lingua e Letteratura Italiana", "Storia dell'Arte", "Discipline Progettuali", "Filosofia", "Matematica", "Storia", "Fisica", "Lingua e Cultura Straniera"],
      5: ["Lingua e Letteratura Italiana", "Storia dell'Arte", "Discipline Progettuali", "Filosofia", "Matematica", "Storia", "Fisica", "Lingua e Cultura Straniera"]
    }
  },
  {
    id: "liceo-linguistico",
    name: "Liceo Linguistico",
    kind: "Liceo",
    years: 5,
    subjects: {
      1: ["Lingua e Letteratura Italiana", "Lingua e Cultura Straniera 1", "Lingua e Cultura Straniera 2", "Lingua e Cultura Straniera 3", "Matematica", "Storia", "Scienze Naturali"],
      2: ["Lingua e Letteratura Italiana", "Lingua e Cultura Straniera 1", "Lingua e Cultura Straniera 2", "Lingua e Cultura Straniera 3", "Matematica", "Storia", "Scienze Naturali"],
      3: ["Lingua e Letteratura Italiana", "Lingua e Cultura Straniera 1", "Lingua e Cultura Straniera 2", "Lingua e Cultura Straniera 3", "Matematica", "Storia", "Filosofia", "Fisica"],
      4: ["Lingua e Letteratura Italiana", "Lingua e Cultura Straniera 1", "Lingua e Cultura Straniera 2", "Lingua e Cultura Straniera 3", "Matematica", "Storia", "Filosofia", "Fisica"],
      5: ["Lingua e Letteratura Italiana", "Lingua e Cultura Straniera 1", "Lingua e Cultura Straniera 2", "Lingua e Cultura Straniera 3", "Matematica", "Storia", "Filosofia", "Fisica"]
    }
  },

  /* ============= ISTITUTI TECNICI E PROFESSIONALI ============= */
  {
    id: "iti-informatica",
    name: "ITI — Informatica e Telecomunicazioni",
    kind: "Istituto Tecnico",
    years: 5,
    subjects: {
      1: ["Lingua e Letteratura Italiana", "Matematica", "Informatica", "Fisica", "Storia", "Lingua e Cultura Straniera", "Scienze Naturali"],
      2: ["Lingua e Letteratura Italiana", "Matematica", "Informatica", "Fisica", "Storia", "Lingua e Cultura Straniera", "Scienze Naturali"],
      3: ["Lingua e Letteratura Italiana", "Matematica", "Informatica", "Sistemi e Reti", "Fisica", "Storia", "Lingua e Cultura Straniera"],
      4: ["Lingua e Letteratura Italiana", "Matematica", "Informatica", "Sistemi e Reti", "Fisica", "Storia", "Lingua e Cultura Straniera"],
      5: ["Lingua e Letteratura Italiana", "Matematica", "Informatica", "Sistemi e Reti", "Fisica", "Storia", "Lingua e Cultura Straniera"]
    }
  },
  {
    id: "iti-meccanica",
    name: "ITI — Meccanica, Meccatronica ed Energia",
    kind: "Istituto Tecnico",
    years: 5,
    subjects: {
      1: ["Lingua e Letteratura Italiana", "Matematica", "Scienze e Tecnologie Meccaniche", "Fisica", "Storia", "Lingua e Cultura Straniera", "Chimica"],
      2: ["Lingua e Letteratura Italiana", "Matematica", "Scienze e Tecnologie Meccaniche", "Fisica", "Storia", "Lingua e Cultura Straniera", "Chimica"],
      3: ["Lingua e Letteratura Italiana", "Matematica", "Meccanica, Macchine ed Energia", "Sistemi e Automazione", "Fisica", "Storia", "Lingua e Cultura Straniera"],
      4: ["Lingua e Letteratura Italiana", "Matematica", "Meccanica, Macchine ed Energia", "Sistemi e Automazione", "Fisica", "Storia", "Lingua e Cultura Straniera"],
      5: ["Lingua e Letteratura Italiana", "Matematica", "Meccanica, Macchine ed Energia", "Sistemi e Automazione", "Fisica", "Storia", "Lingua e Cultura Straniera"]
    }
  },
  {
    id: "iti-elettronica",
    name: "ITI — Elettronica ed Elettrotecnica",
    kind: "Istituto Tecnico",
    years: 5,
    subjects: {
      1: ["Lingua e Letteratura Italiana", "Matematica", "Scienze e Tecnologie Elettriche ed Elettroniche", "Fisica", "Storia", "Lingua e Cultura Straniera", "Chimica"],
      2: ["Lingua e Letteratura Italiana", "Matematica", "Scienze e Tecnologie Elettriche ed Elettroniche", "Fisica", "Storia", "Lingua e Cultura Straniera", "Chimica"],
      3: ["Lingua e Letteratura Italiana", "Matematica", "Elettrotecnica ed Elettronica", "Sistemi Automatici", "Fisica", "Storia", "Lingua e Cultura Straniera"],
      4: ["Lingua e Letteratura Italiana", "Matematica", "Elettrotecnica ed Elettronica", "Sistemi Automatici", "Fisica", "Storia", "Lingua e Cultura Straniera"],
      5: ["Lingua e Letteratura Italiana", "Matematica", "Elettrotecnica ed Elettronica", "Sistemi Automatici", "Fisica", "Storia", "Lingua e Cultura Straniera"]
    }
  },
  {
    id: "istituto-afm",
    name: "Istituto Tecnico Economico — Amministrazione, Finanza e Marketing",
    kind: "Istituto Tecnico",
    years: 5,
    subjects: {
      1: ["Lingua e Letteratura Italiana", "Matematica", "Economia Aziendale", "Diritto ed Economia", "Storia", "Lingua e Cultura Straniera", "Scienze Naturali", "Informatica"],
      2: ["Lingua e Letteratura Italiana", "Matematica", "Economia Aziendale", "Diritto ed Economia", "Storia", "Lingua e Cultura Straniera", "Scienze Naturali", "Informatica"],
      3: ["Lingua e Letteratura Italiana", "Matematica", "Economia Aziendale", "Diritto", "Economia Politica", "Storia", "Lingua e Cultura Straniera", "Informatica"],
      4: ["Lingua e Letteratura Italiana", "Matematica", "Economia Aziendale", "Diritto", "Economia Politica", "Storia", "Lingua e Cultura Straniera", "Informatica"],
      5: ["Lingua e Letteratura Italiana", "Matematica", "Economia Aziendale", "Diritto", "Economia Politica", "Storia", "Lingua e Cultura Straniera", "Informatica"]
    }
  },
  {
    id: "istituto-alberghiero",
    name: "Istituto Professionale — Enogastronomia e Ospitalità Alberghiera",
    kind: "Istituto Professionale",
    years: 5,
    subjects: {
      1: ["Lingua e Letteratura Italiana", "Matematica", "Scienza degli Alimenti", "Storia", "Lingua e Cultura Straniera", "Scienze Naturali", "Diritto ed Economia"],
      2: ["Lingua e Letteratura Italiana", "Matematica", "Scienza degli Alimenti", "Storia", "Lingua e Cultura Straniera", "Scienze Naturali", "Diritto ed Economia"],
      3: ["Lingua e Letteratura Italiana", "Matematica", "Scienza e Cultura dell'Alimentazione", "Diritto e Tecniche Amministrative", "Storia", "Lingua e Cultura Straniera", "Igiene"],
      4: ["Lingua e Letteratura Italiana", "Matematica", "Scienza e Cultura dell'Alimentazione", "Diritto e Tecniche Amministrative", "Storia", "Lingua e Cultura Straniera", "Igiene"],
      5: ["Lingua e Letteratura Italiana", "Matematica", "Scienza e Cultura dell'Alimentazione", "Diritto e Tecniche Amministrative", "Storia", "Lingua e Cultura Straniera", "Igiene"]
    }
  },
  {
    id: "istituto-socio-sanitario",
    name: "Istituto Professionale — Servizi Socio-Sanitari",
    kind: "Istituto Professionale",
    years: 5,
    subjects: {
      1: ["Lingua e Letteratura Italiana", "Matematica", "Scienze Umane e Sociali", "Metodologie Operative", "Storia", "Lingua e Cultura Straniera", "Scienze Naturali", "Diritto ed Economia"],
      2: ["Lingua e Letteratura Italiana", "Matematica", "Scienze Umane e Sociali", "Metodologie Operative", "Storia", "Lingua e Cultura Straniera", "Scienze Naturali", "Diritto ed Economia"],
      3: ["Lingua e Letteratura Italiana", "Matematica", "Scienze Umane e Sociali", "Igiene e Cultura Medico-Sanitaria", "Psicologia Generale", "Storia", "Lingua e Cultura Straniera", "Diritto"],
      4: ["Lingua e Letteratura Italiana", "Matematica", "Scienze Umane e Sociali", "Igiene e Cultura Medico-Sanitaria", "Psicologia Generale", "Storia", "Lingua e Cultura Straniera", "Diritto"],
      5: ["Lingua e Letteratura Italiana", "Matematica", "Scienze Umane e Sociali", "Igiene e Cultura Medico-Sanitaria", "Psicologia Generale", "Storia", "Lingua e Cultura Straniera", "Diritto"]
    }
  }
];

/* ============================================================
   UTILITÀ
   ============================================================ */

/* Slug della materia: normalizza la denominazione per collegarla
   alle aree del motore scolastico. */
function subjectSlug(name) {
  const n = name.toLowerCase();
  if (n.indexOf("letteratura italiana") >= 0 || n.indexOf("italiano") >= 0) return "italiano";
  if (n.indexOf("latina") >= 0 || n.indexOf("latino") >= 0) return "latino";
  if (n.indexOf("greca") >= 0 || n.indexOf("greco") >= 0) return "greco";
  if (n.indexOf("straniera 1") >= 0) return "inglese";
  if (n.indexOf("straniera 2") >= 0) return "francese";
  if (n.indexOf("straniera 3") >= 0) return "spagnolo";
  if (n.indexOf("straniera") >= 0) return "inglese";
  if (n.indexOf("matematica") >= 0) return "matematica";
  if (n.indexOf("fisica") >= 0) return "fisica";
  if (n.indexOf("scienze naturali") >= 0 || n.indexOf("chimica") >= 0) return "scienze";
  if (n.indexOf("storia dell'arte") >= 0 || n.indexOf("disegno e storia") >= 0) return "storia-arte";
  if (n.indexOf("storia") >= 0) return "storia";
  if (n.indexOf("filosofia") >= 0) return "filosofia";
  if (n.indexOf("economia aziendale") >= 0) return "economia-aziendale";
  if (n.indexOf("diritto") >= 0 || n.indexOf("economia politica") >= 0) return "diritto-economia";
  if (n.indexOf("informatica") >= 0 || n.indexOf("sistemi e reti") >= 0) return "informatica";
  if (n.indexOf("psicologia") >= 0 || n.indexOf("scienze umane") >= 0) return "scienze-umane";
  if (n.indexOf("igiene") >= 0 || n.indexOf("medico-sanitaria") >= 0) return "igiene";
  if (n.indexOf("alimentazione") >= 0 || n.indexOf("alimenti") >= 0) return "alimentazione";
  if (n.indexOf("meccanica") >= 0 || n.indexOf("macchine") >= 0) return "meccanica";
  if (n.indexOf("elettrotecnica") >= 0 || n.indexOf("elettronica") >= 0 || n.indexOf("elettriche") >= 0) return "elettronica";
  if (n.indexOf("grafiche") >= 0 || n.indexOf("pittoriche") >= 0 || n.indexOf("progettuali") >= 0 || n.indexOf("geometriche") >= 0) return "discipline-artistiche";
  if (n.indexOf("metodologie") >= 0) return "metodologie";
  return n.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function trackById(id) { return SCHOOL_TRACKS.find(t => t.id === id) || null; }

function tracksByKind() {
  const out = {};
  for (const t of SCHOOL_TRACKS) {
    if (!out[t.kind]) out[t.kind] = [];
    out[t.kind].push(t);
  }
  return out;
}

/* Materie distinte di un indirizzo, con lo slug corrispondente. */
function subjectsForTrack(trackId, year) {
  const t = trackById(trackId);
  if (!t) return [];
  const list = t.subjects[year] || [];
  return list.map(name => ({ name: name, slug: subjectSlug(name) }));
}

function schoolStats() {
  let combos = 0;
  const subjects = new Set();
  for (const t of SCHOOL_TRACKS) {
    for (const list of Object.values(t.subjects)) {
      combos += list.length;
      for (const s of list) subjects.add(subjectSlug(s));
    }
  }
  return {
    tracks: SCHOOL_TRACKS.length,
    licei: SCHOOL_TRACKS.filter(t => t.kind === "Liceo").length,
    istituti: SCHOOL_TRACKS.filter(t => t.kind !== "Liceo").length,
    combinations: combos,
    distinctSubjects: subjects.size
  };
}

export { SCHOOL_TRACKS, subjectSlug, trackById, tracksByKind, subjectsForTrack, schoolStats };
