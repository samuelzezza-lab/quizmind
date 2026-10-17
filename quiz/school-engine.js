/* ============================================================
   Quizmind — Motore per la Scuola Superiore
   ------------------------------------------------------------
   Stessa logica a tre step del motore universitario, ma la chiave
   non è l'esame: è la coppia MATERIA + ANNO SCOLASTICO.

   STEP 1 — Aree della materia, distribuite equamente sulle 10
            domande (2 per area con 5 aree, 3/3/2/2 con 4).
   STEP 2 — Finestra mobile anti-ripetizione sull'indice i-1.
   STEP 3 — Variazione parametrica e distrattori dinamici.

   La difficoltà è commisurata all'anno: ogni area dichiara
   contenuti diversi per anno scolastico, con profondità crescente
   dalla prima alla quinta superiore.
   ============================================================ */

import { SCHOOL_AREAS_A } from "./school-areas-a.js";
import { SCHOOL_AREAS_B } from "./school-areas-b.js";

const QUESTIONS_PER_SESSION = 10;
const MIN_AREAS = 4;

function createRng(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];
const randInt = (rng, min, max) => Math.floor(rng() * (max - min + 1)) + min;
const fmt = (n) => Number(n).toLocaleString("it-IT");

function shuffleFisherYates(rng, array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
  return a;
}

/* ---------- STEP 3: distrattori dinamici ---------- */
const roundKey = (v) => String(Number(Number(v).toFixed(5)));

function numericDynamics(value, factor) {
  const out = [];
  if (value !== 0) out.push({ value: value / factor, why: "dimenticato il fattore " + factor });
  out.push({ value: value * factor, why: "fattore " + factor + " applicato due volte" });
  out.push({ value: value * 10, why: "errore di una potenza di dieci" });
  out.push({ value: value / 10, why: "errore di scala di un ordine" });
  if (value !== 0) out.push({ value: 1 / value, why: "rapporto invertito" });
  return out;
}

function buildNumericOptions(correctValue, opts) {
  const o = opts || {};
  const factor = o.factor || 2;
  const unit = o.unit || "";
  const decimals = o.decimals === undefined ? 2 : o.decimals;
  const render = (v) => {
    const n = Number(Number(v).toFixed(decimals));
    return unit ? fmt(n) + " " + unit : fmt(n);
  };

  const seen = {};
  seen[roundKey(correctValue)] = true;
  const options = [{ text: render(correctValue), correct: true, why: null }];
  const notes = [];

  const dyn = numericDynamics(correctValue, factor);
  for (let i = 0; i < dyn.length; i++) {
    const d = dyn[i];
    if (!isFinite(d.value)) continue;
    const k = roundKey(d.value);
    if (seen[k]) continue;
    seen[k] = true;
    options.push({ text: render(d.value), correct: false, why: d.why });
    notes.push(d.why);
    if (options.length === 4) break;
  }

  let m = 3;
  while (options.length < 4) {
    const v = correctValue * m;
    const k = roundKey(v);
    if (!seen[k] && isFinite(v)) {
      seen[k] = true;
      options.push({ text: render(v), correct: false, why: "fattore " + m + " applicato per errore" });
      notes.push("fattore " + m + " applicato per errore");
    }
    m++;
  }
  return { options: options, distractors: notes };
}

function validateOptions(options) {
  if (!options || options.length !== 4) return false;
  let corrects = 0;
  for (let i = 0; i < options.length; i++) if (options[i].correct) corrects++;
  if (corrects !== 1) return false;
  const texts = options.map((o) => String(o.text).trim());
  for (let i = 0; i < texts.length; i++) if (!texts[i] || texts[i].length < 2) return false;
  const uniq = {};
  for (let i = 0; i < texts.length; i++) uniq[texts[i]] = true;
  return Object.keys(uniq).length === 4;
}

/* ---------- Generatori per schema ---------- */
const GENERATORS = {
  definizione: function (rng, spec) {
    const set = pick(rng, spec.sets);
    const correct = pick(rng, set.items);
    const others = shuffleFisherYates(rng, set.items.filter((i) => i.id !== correct.id));
    return {
      prompt: set.question + " Che cos'è " + correct.label + "?",
      options: [{ text: correct.text, correct: true, why: null }].concat(
        others.slice(0, 3).map((o) => ({ text: o.text, correct: false, why: "confusione tra concetti affini" }))
      ),
      errorNote: "Errore tipico: confondere due concetti vicini per il ruolo che svolgono, non per il nome."
    };
  },

  "regola-caso": function (rng, spec) {
    const built = pick(rng, spec.cases)(rng);
    return {
      prompt: built.prompt,
      options: [{ text: built.correct, correct: true, why: null }].concat(
        built.distractors.map((d) => ({ text: d, correct: false, why: built.note }))
      ),
      errorNote: built.note
    };
  },

  calcolo: function (rng, spec) {
    const built = spec.compute(rng);
    return {
      prompt: built.prompt,
      numeric: {
        value: built.value,
        unit: built.unit,
        factor: built.factor || 2,
        decimals: built.decimals === undefined ? 2 : built.decimals
      },
      explanation: built.explanation,
      errorNote: built.note
    };
  },

  classificazione: function (rng, spec) {
    const classe = pick(rng, spec.classes);
    const membro = pick(rng, classe.members);
    const wrong = shuffleFisherYates(rng, spec.classes.filter((c) => c.id !== classe.id));
    return {
      prompt: "In quale categoria rientra " + membro + "?",
      options: [{ text: classe.label, correct: true, why: null }].concat(
        wrong.slice(0, 3).map((w) => ({ text: w.label, correct: false, why: "categoria attribuita per assonanza" }))
      ),
      errorNote: "Errore tipico: attribuire al caso una categoria vicina ma con caratteristiche diverse."
    };
  },

  sequenza: function (rng, spec) {
    const s = pick(rng, spec.sequences);
    const wrong = shuffleFisherYates(rng, spec.sequences.filter((x) => x.id !== s.id));
    return {
      prompt: s.question + " Che cosa viene per primo?",
      options: [{ text: s.first, correct: true, why: null }].concat(
        wrong.slice(0, 3).map((w) => ({ text: w.first, correct: false, why: "fase spostata di posizione" }))
      ),
      errorNote: "Errore tipico: anticipare o posticipare un passaggio dello svolgimento."
    };
  },

  conseguenza: function (rng, spec) {
    const c = pick(rng, spec.consequences);
    const wrong = shuffleFisherYates(rng, spec.consequences.filter((x) => x.id !== c.id));
    return {
      prompt: "Dato il presupposto «" + c.cause + "», quale conseguenza ne deriva?",
      options: [{ text: c.effect, correct: true, why: null }].concat(
        wrong.slice(0, 3).map((w) => ({ text: w.effect, correct: false, why: "conseguenza valida in astratto ma non prodotta dal presupposto" }))
      ),
      errorNote: "Errore tipico: applicare una regola corretta a una situazione che non la richiama."
    };
  },

  "analisi-brano": function (rng, spec) {
    const b = pick(rng, spec.brani);
    const other = shuffleFisherYates(rng, spec.brani.filter((x) => x.id !== b.id));
    return {
      prompt: "Individua la figura retorica che caratterizza il seguente passaggio: «" + b.testo + "»",
      options: [{ text: b.figura, correct: true, why: null }].concat(
        other.slice(0, 3).map((o) => ({ text: o.figura, correct: false, why: "figura riconosciuta per assonanza" }))
      ),
      errorNote: "Errore tipico: riconoscere una figura per somiglianza di suono invece che per il procedimento che la produce."
    };
  }
};

/* ---------- Indice delle materie ---------- */
const SUBJECT_INDEX = {};
for (const k of Object.keys(SCHOOL_AREAS_A)) SUBJECT_INDEX[k] = SCHOOL_AREAS_A[k];
for (const k of Object.keys(SCHOOL_AREAS_B)) SUBJECT_INDEX[k] = SCHOOL_AREAS_B[k];

function subjectCoverage(slug, year) {
  const def = SUBJECT_INDEX[slug];
  if (!def) return { areas: 0, available: false, minRequired: MIN_AREAS, list: [], subjectName: null };

  const list = def.areas.filter((a) => a.byYear && a.byYear[year]);
  return {
    areas: list.length,
    available: list.length >= MIN_AREAS,
    minRequired: MIN_AREAS,
    list: list.map((a) => ({ id: a.id, name: a.name })),
    subjectName: def.name
  };
}

function planDistribution(areaIds, total) {
  const plan = [];
  const base = Math.floor(total / areaIds.length);
  let resto = total % areaIds.length;
  for (let i = 0; i < areaIds.length; i++) {
    let n = base;
    if (resto > 0) { n++; resto--; }
    plan.push({ areaId: areaIds[i], count: n });
  }
  return plan;
}

function buildQuestion(rng, areaDef, subjectName, year, prevKind) {
  const spec = areaDef.byYear[year];
  if (!spec) return null;

  const gen = GENERATORS[areaDef.kind];
  if (!gen) return null;

  /* STEP 2 — scarto se lo schema coincide con la domanda precedente. */
  if (prevKind && areaDef.kind === prevKind) return null;

  const built = gen(rng, spec);
  if (!built) return null;

  let options = built.options;
  const distractorNotes = [];

  if (built.numeric) {
    const n = built.numeric;
    const res = buildNumericOptions(n.value, {
      factor: n.factor || 2,
      unit: n.unit || "",
      decimals: n.decimals === undefined ? 2 : n.decimals
    });
    options = res.options;
    for (let i = 0; i < res.distractors.length; i++) distractorNotes.push(res.distractors[i]);
  }

  if (!validateOptions(options)) return null;

  const mixed = shuffleFisherYates(rng, options);
  const correctObj = options.filter((o) => o.correct)[0];
  const correctIndex = mixed.indexOf(correctObj);

  return {
    areaId: areaDef.id,
    areaName: areaDef.name,
    kind: areaDef.kind,
    subjectName: subjectName,
    year: year,
    prompt: built.prompt,
    options: mixed.map((o) => o.text),
    correctIndex: correctIndex,
    correct_answer: mixed[correctIndex].text,
    distractors: mixed.filter((o, i) => i !== correctIndex).map((o) => o.text),
    explanation: built.explanation || null,
    errorNote: built.errorNote || null,
    distractorNotes: distractorNotes
  };
}

/* Genera una sessione: materia + anno scolastico. */
function generateSchoolSession(subjectSlug, year, seed) {
  const def = SUBJECT_INDEX[subjectSlug];
  const y = Number(year);

  if (!def) {
    return { ok: false, reason: "unknown_subject", subjectSlug: subjectSlug, year: y };
  }

  const cov = subjectCoverage(subjectSlug, y);
  if (!cov.available) {
    return {
      ok: false,
      reason: "coverage",
      subjectSlug: subjectSlug,
      subjectName: def.name,
      year: y,
      coverage: cov.areas,
      minRequired: MIN_AREAS
    };
  }

  const rng = createRng(seed);

  const areaIds = shuffleFisherYates(rng, cov.list.map((a) => a.id));
  const areaById = {};
  def.areas.forEach((a) => { areaById[a.id] = a; });
  const plan = planDistribution(areaIds, QUESTIONS_PER_SESSION);

  const questions = [];
  const usedAreaCount = {};
  const seenPrompts = {};
  let repeatsDiscarded = 0;

  for (let s = 0; s < plan.length; s++) {
    const step = plan[s];
    const areaDef = areaById[step.areaId];

    for (let i = 0; i < step.count; i++) {
      let placed = null;

      for (let attempt = 0; attempt < 12 && !placed; attempt++) {
        const prevKind = questions.length ? questions[questions.length - 1].kind : null;
        const candidate = buildQuestion(rng, areaDef, def.name, y, prevKind);

        if (!candidate) { repeatsDiscarded++; continue; }
        if (seenPrompts[candidate.prompt]) { repeatsDiscarded++; continue; }
        if (prevKind && candidate.kind === prevKind) { repeatsDiscarded++; continue; }

        seenPrompts[candidate.prompt] = true;
        placed = candidate;
      }

      /* Se l'area non produce una domanda valida, si passa alla
         categoria successiva senza inventare contenuti. */
      if (!placed) {
        const prevKind = questions.length ? questions[questions.length - 1].kind : null;
        let alt = null;
        for (let k = 0; k < def.areas.length; k++) {
          const a = def.areas[k];
          if (a.byYear[y] && a.kind !== prevKind && !usedAreaCount[a.id]) { alt = a; break; }
        }
        if (!alt) {
          for (let k = 0; k < def.areas.length; k++) {
            const a = def.areas[k];
            if (a.byYear[y] && a.kind !== prevKind) { alt = a; break; }
          }
        }
        if (alt) {
          const retry = buildQuestion(rng, alt, def.name, y, prevKind);
          if (retry && !seenPrompts[retry.prompt]) {
            seenPrompts[retry.prompt] = true;
            placed = retry;
          }
        }
      }

      if (placed) {
        usedAreaCount[placed.areaId] = (usedAreaCount[placed.areaId] || 0) + 1;
        questions.push({
          id: subjectSlug + "-a" + y + "-q" + (questions.length + 1),
          category: "Categoria " + (questions.length + 1) + " — " + placed.areaName,
          areaId: placed.areaId,
          areaName: placed.areaName,
          kind: placed.kind,
          subjectName: placed.subjectName,
          year: placed.year,
          prompt: placed.prompt,
          options: placed.options,
          correctIndex: placed.correctIndex,
          correct_answer: placed.correct_answer,
          distractors: placed.distractors,
          explanation: placed.explanation,
          errorNote: placed.errorNote,
          distractorNotes: placed.distractorNotes
        });
      }
    }
  }

  if (questions.length !== QUESTIONS_PER_SESSION) {
    return { ok: false, reason: "generation", subjectSlug: subjectSlug, year: y, generated: questions.length };
  }

  return {
    ok: true,
    subjectSlug: subjectSlug,
    subjectName: def.name,
    year: y,
    seed: seed,
    total: QUESTIONS_PER_SESSION,
    questions: questions,
    areaCount: Object.keys(usedAreaCount).length,
    repeatsDiscarded: repeatsDiscarded,
    distribution: usedAreaCount
  };
}

function gradeSchoolSession(session, answers) {
  let score = 0;
  const detail = session.questions.map((q, i) => {
    const given = answers[i];
    const correct = given === q.correctIndex;
    if (correct) score++;
    return {
      index: i + 1,
      area: q.areaName,
      category: q.category,
      prompt: q.prompt,
      givenIndex: given === undefined ? null : given,
      givenText: given === undefined || given === null ? null : q.options[given],
      correctIndex: q.correctIndex,
      correctText: q.options[q.correctIndex],
      correct: correct,
      explanation: q.explanation,
      errorNote: q.errorNote,
      distractorNotes: q.distractorNotes
    };
  });

  const areaNames = [];
  detail.forEach((d) => { if (areaNames.indexOf(d.area) < 0) areaNames.push(d.area); });

  return {
    score: score,
    total: session.total,
    percentage: Math.round((score / session.total) * 100),
    detail: detail,
    byArea: areaNames.map((a) => {
      const items = detail.filter((d) => d.area === a);
      return { area: a, correct: items.filter((d) => d.correct).length, total: items.length };
    })
  };
}

function schoolVariantEstimate(subjectSlug, year) {
  const cov = subjectCoverage(subjectSlug, year);
  if (!cov.available) return 0;
  return Math.round(Math.pow(cov.areas * 60, 1.4));
}

/* Materie coperte per un dato anno, usate dall'interfaccia. */
function coveredSubjects(year) {
  const out = [];
  for (const slug of Object.keys(SUBJECT_INDEX)) {
    const cov = subjectCoverage(slug, year);
    if (cov.available) out.push({ slug: slug, name: cov.subjectName, areas: cov.areas });
  }
  return out.sort((a, b) => a.name.localeCompare(b.name, "it"));
}

export {
  QUESTIONS_PER_SESSION,
  MIN_AREAS,
  GENERATORS,
  SUBJECT_INDEX,
  createRng,
  shuffleFisherYates,
  subjectCoverage,
  coveredSubjects,
  planDistribution,
  generateSchoolSession,
  gradeSchoolSession,
  schoolVariantEstimate
};
