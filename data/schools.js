/* ============================================================
   Quizmind — Scuola Superiore
   ------------------------------------------------------------
   Struttura: indirizzo -> materia -> anno scolastico (1-5).
   Gli indirizzi sono quelli reali del sistema scolastico
   italiano; le materie per anno seguono i quadri orario
   ministeriali.
   ============================================================ */

const SCHOOL_TRACKS = [
  {
    id: "liceo-scientifico",
    name: "Liceo Scientifico",
    kind: "Licei",
    subjects: {
      1: ["Italiano", "Matematica", "Fisica", "Chimica", "Biologia", "Storia", "Inglese"],
      2: ["Italiano", "Matematica", "Fisica", "Chimica", "Biologia", "Storia", "Inglese"],
      3: ["Italiano", "Matematica", "Fisica", "Chimica", "Filosofia", "Storia", "Inglese"],
      4: ["Italiano", "Matematica", "Fisica", "Chimica", "Filosofia", "Storia", "Inglese"],
      5: ["Italiano", "Matematica", "Fisica", "Filosofia", "Storia", "Inglese"]
    }
  },
  {
    id: "liceo-classico",
    name: "Liceo Classico",
    kind: "Licei",
    subjects: {
      1: ["Italiano", "Latino", "Greco", "Matematica", "Storia", "Inglese"],
      2: ["Italiano", "Latino", "Greco", "Matematica", "Storia", "Inglese"],
      3: ["Italiano", "Latino", "Greco", "Filosofia", "Matematica", "Storia", "Inglese"],
      4: ["Italiano", "Latino", "Greco", "Filosofia", "Matematica", "Storia", "Inglese"],
      5: ["Italiano", "Latino", "Greco", "Filosofia", "Storia", "Inglese"]
    }
  },
  {
    id: "liceo-linguistico",
    name: "Liceo Linguistico",
    kind: "Licei",
    subjects: {
      1: ["Italiano", "Inglese", "Francese", "Spagnolo", "Matematica", "Storia"],
      2: ["Italiano", "Inglese", "Francese", "Spagnolo", "Matematica", "Storia"],
      3: ["Italiano", "Inglese", "Francese", "Spagnolo", "Filosofia", "Storia"],
      4: ["Italiano", "Inglese", "Francese", "Spagnolo", "Filosofia", "Storia"],
      5: ["Italiano", "Inglese", "Francese", "Spagnolo", "Filosofia", "Storia"]
    }
  },
  {
    id: "liceo-scienze-umane",
    name: "Liceo delle Scienze Umane",
    kind: "Licei",
    subjects: {
      1: ["Italiano", "Scienze umane", "Matematica", "Storia", "Inglese"],
      2: ["Italiano", "Scienze umane", "Matematica", "Storia", "Inglese"],
      3: ["Italiano", "Scienze umane", "Filosofia", "Matematica", "Storia", "Inglese"],
      4: ["Italiano", "Scienze umane", "Filosofia", "Matematica", "Storia", "Inglese"],
      5: ["Italiano", "Scienze umane", "Filosofia", "Storia", "Inglese"]
    }
  },
  {
    id: "istituto-tecnico-informatica",
    name: "Istituto Tecnico — Informatica",
    kind: "Istituti Tecnici",
    subjects: {
      1: ["Italiano", "Matematica", "Informatica", "Scienze", "Storia", "Inglese"],
      2: ["Italiano", "Matematica", "Informatica", "Scienze", "Storia", "Inglese"],
      3: ["Italiano", "Matematica", "Informatica", "Sistemi e reti", "Storia", "Inglese"],
      4: ["Italiano", "Matematica", "Informatica", "Sistemi e reti", "Storia", "Inglese"],
      5: ["Italiano", "Matematica", "Informatica", "Sistemi e reti", "Inglese"]
    }
  },
  {
    id: "istituto-tecnico-economia",
    name: "Istituto Tecnico — Amministrazione Finanza e Marketing",
    kind: "Istituti Tecnici",
    subjects: {
      1: ["Italiano", "Matematica", "Economia aziendale", "Diritto", "Storia", "Inglese"],
      2: ["Italiano", "Matematica", "Economia aziendale", "Diritto", "Storia", "Inglese"],
      3: ["Italiano", "Matematica", "Economia aziendale", "Diritto", "Economia politica", "Inglese"],
      4: ["Italiano", "Matematica", "Economia aziendale", "Diritto", "Economia politica", "Inglese"],
      5: ["Italiano", "Matematica", "Economia aziendale", "Diritto", "Economia politica", "Inglese"]
    }
  },
  {
    id: "istituto-professionale-servizi",
    name: "Istituto Professionale — Servizi",
    kind: "Istituti Professionali",
    subjects: {
      1: ["Italiano", "Matematica", "Scienze", "Storia", "Inglese"],
      2: ["Italiano", "Matematica", "Scienze", "Storia", "Inglese"],
      3: ["Italiano", "Matematica", "Diritto", "Storia", "Inglese"],
      4: ["Italiano", "Matematica", "Diritto", "Storia", "Inglese"],
      5: ["Italiano", "Matematica", "Diritto", "Inglese"]
    }
  }
];

function subjectSlug(nome) {
  return String(nome)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function trackById(id) {
  for (let i = 0; i < SCHOOL_TRACKS.length; i++) {
    if (SCHOOL_TRACKS[i].id === id) return SCHOOL_TRACKS[i];
  }
  return null;
}

function allSubjects() {
  const visti = {};
  for (const t of SCHOOL_TRACKS) {
    for (const anno of Object.keys(t.subjects)) {
      for (const s of t.subjects[anno]) visti[s] = true;
    }
  }
  return Object.keys(visti).sort(function (a, b) { return a.localeCompare(b, "it"); });
}

function schoolStats() {
  let anni = 0;
  for (const t of SCHOOL_TRACKS) anni += Object.keys(t.subjects).length;
  return { indirizzi: SCHOOL_TRACKS.length, anni: anni, materie: allSubjects().length };
}

export { SCHOOL_TRACKS, subjectSlug, trackById, allSubjects, schoolStats };
