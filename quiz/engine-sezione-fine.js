/* ============================================================
   Quizmind — Motore, sezione finale
   ------------------------------------------------------------
   Costruisce una domanda a partire da un'area, applica i tre
   step obbligatori e produce la sessione da ESATTAMENTE 10
   domande. Se un esame non ha abbastanza aree, restituisce
   ok:false con il motivo, senza inventare contenuti.
   ============================================================ */

const KINDS_VALIDI = ["definizione", "norma", "regola-caso", "calcolo", "classificazione", "sequenza", "conseguenza"];

/* Costruisce una domanda da un'area. Tenta piu' estrazioni
   perche' uno stesso schema puo' non riuscire, e in quel caso
   si passa alla categoria successiva invece di forzare. */
function buildQuestion(rng, area, examSlug, prevKind) {
  for (let attempt = 0; attempt < 12; attempt++) {
    const gen = GENERATORS[area.kind];
    if (!gen) return null;

    let built;
    try {
      built = gen(rng, area.spec);
    } catch (e) {
      continue;
    }
    if (!built) continue;

    if (built.numeric) {
      const num = buildNumericOptions(built.numeric.value, {
        unit: built.numeric.unit,
        factor: built.numeric.factor,
        decimals: built.numeric.decimals
      });
      const opts = [num.correctText].concat(num.distractors);
      const shuffled = shuffleFisherYates(rng, opts);
      return {
        kind: area.kind,
        areaId: area.id,
        areaName: area.name,
        examName: examSlug,
        prompt: built.prompt,
        options: shuffled,
        correctIndex: shuffled.indexOf(num.correctText),
        correct_answer: num.correctText,
        distractors: num.distractors,
        explanation: built.explanation,
        errorNote: built.errorNote,
        distractorNotes: num.notes
      };
    }

    const texts = built.options.map(function (o) { return o.text; });
    if (!validateOptions(texts)) continue;

    const correctText = built.options.filter(function (o) { return o.correct; })[0].text;
    const shuffled = shuffleFisherYates(rng, texts);
    const notes = built.options
      .filter(function (o) { return !o.correct; })
      .map(function (o) { return o.why; });

    return {
      kind: area.kind,
      areaId: area.id,
      areaName: area.name,
      examName: examSlug,
      prompt: built.prompt,
      options: shuffled,
      correctIndex: shuffled.indexOf(correctText),
      correct_answer: correctText,
      distractors: texts.filter(function (t) { return t !== correctText; }),
      explanation: built.explanation || null,
      errorNote: built.errorNote,
      distractorNotes: notes
    };
  }
  return null;
}

/* Valida la struttura di un set di opzioni: 4 voci, una sola
   corretta, nessun duplicato, nessun testo vuoto. */
function validateOptions(texts) {
  if (!texts || texts.length !== 4) return false;
  const clean = texts.map(function (t) { return String(t).trim(); });
  for (let i = 0; i < clean.length; i++) {
    if (!clean[i] || clean[i].length < 2) return false;
  }
  const uniq = {};
  for (let i = 0; i < clean.length; i++) uniq[clean[i]] = true;
  return Object.keys(uniq).length === 4;
}

/* Ripartisce le 10 domande tra le aree dell'esame. Le aree con
   meno estrazioni vengono privilegiate, cosi' ogni macro-area
   del programma risulta coperta nella sessione. */
function planDistribution(areaCount, total) {
  const plan = [];
  let i = 0;
  while (plan.length < total) {
    plan.push(i % areaCount);
    i++;
  }
  return plan;
}

function examCoverage(slug) {
  const def = AREA_INDEX[slug];
  if (!def) {
    return { available: false, reason: "materia-non-coperta", areas: 0, minRequired: MIN_AREAS };
  }
  return {
    available: def.areas.length >= MIN_AREAS,
    reason: def.areas.length >= MIN_AREAS ? null : "aree-insufficienti",
    areas: def.areas.length,
    minRequired: MIN_AREAS,
    name: def.name
  };
}

/* ============================================================
   GENERAZIONE SESSIONE — esattamente 10 domande
   ============================================================ */
function generateSession(slug, seed) {
  const def = AREA_INDEX[slug];
  if (!def) {
    return { ok: false, reason: "materia-non-coperta", examSlug: slug, coverage: 0, minRequired: MIN_AREAS };
  }
  if (def.areas.length < MIN_AREAS) {
    return { ok: false, reason: "copertura", examSlug: slug, coverage: def.areas.length, minRequired: MIN_AREAS };
  }

  const rng = createRng(seed);
  const plan = planDistribution(def.areas.length, QUESTIONS_PER_SESSION);
  const questions = [];
  const seenPrompts = {};
  const usedAreaCount = {};
  let repeatsDiscarded = 0;

  for (let i = 0; i < plan.length; i++) {
    const areaDef = def.areas[plan[i]];
    const prevKind = questions.length ? questions[questions.length - 1].kind : null;

    let placed = null;
    for (let attempt = 0; attempt < 14; attempt++) {
      const candidate = buildQuestion(rng, areaDef, slug, prevKind);
      if (!candidate) continue;
      if (seenPrompts[candidate.prompt]) { repeatsDiscarded++; continue; }
      if (prevKind && candidate.kind === prevKind) { repeatsDiscarded++; continue; }
      seenPrompts[candidate.prompt] = true;
      placed = candidate;
      break;
    }

    /* Se l'area non riesce a produrre una domanda valida, si passa
       alla categoria successiva: la distribuzione viene
       riequilibrata invece di riempire con contenuti inventati. */
    if (!placed) {
      const lastKind = questions.length ? questions[questions.length - 1].kind : null;
      for (let k = 0; k < def.areas.length; k++) {
        const alt = def.areas[k];
        if (alt.kind === lastKind) continue;
        const retry = buildQuestion(rng, alt, slug, lastKind);
        if (retry && !seenPrompts[retry.prompt]) {
          seenPrompts[retry.prompt] = true;
          placed = retry;
          break;
        }
      }
    }

    if (placed) {
      usedAreaCount[placed.areaId] = (usedAreaCount[placed.areaId] || 0) + 1;
      questions.push({
        id: slug + "-q" + (questions.length + 1),
        number: questions.length + 1,
        areaId: placed.areaId,
        areaName: placed.areaName,
        kind: placed.kind,
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

  if (questions.length !== QUESTIONS_PER_SESSION) {
    return { ok: false, reason: "generation", examSlug: slug, generated: questions.length };
  }

  return {
    ok: true,
    examSlug: slug,
    examName: def.name,
    seed: seed,
    total: QUESTIONS_PER_SESSION,
    questions: questions,
    areaCount: Object.keys(usedAreaCount).length,
    repeatsDiscarded: repeatsDiscarded,
    distribution: usedAreaCount
  };
}

/* Correzione automatica: punteggio, esito per singola domanda ed
   esito aggregato per macro-area. */
function gradeSession(session, answers) {
  let score = 0;
  const detail = session.questions.map(function (q, i) {
    const given = answers[i];
    const correct = given === q.correctIndex;
    if (correct) score++;
    return {
      number: i + 1,
      area: q.areaName,
      prompt: q.prompt,
      givenIndex: given === undefined ? null : given,
      givenText: given === undefined || given === null ? null : q.options[given],
      correctIndex: q.correctIndex,
      correctText: q.options[q.correctIndex],
      correct: correct,
      explanation: q.explanation,
      errorNote: q.errorNote
    };
  });

  const areaNames = [];
  detail.forEach(function (d) { if (areaNames.indexOf(d.area) < 0) areaNames.push(d.area); });

  return {
    score: score,
    total: session.total,
    percentage: Math.round((score / session.total) * 100),
    detail: detail,
    byArea: areaNames.map(function (a) {
      const items = detail.filter(function (d) { return d.area === a; });
      return {
        area: a,
        correct: items.filter(function (d) { return d.correct; }).length,
        total: items.length
      };
    })
  };
}

/* Stima trasparente del numero di varianti distinte ottenibili.
   Non viene dichiarato alcun valore "infinito": dipende dal
   numero di aree, di schemi per area e dall'ampiezza dei
   parametri numerici. */
function variantEstimate(slug) {
  const def = AREA_INDEX[slug];
  if (!def) return 0;
  let schemi = 0;
  def.areas.forEach(function (a) {
    if (a.spec.sets) schemi += a.spec.sets.length * 4;
    if (a.spec.cases) schemi += a.spec.cases.length;
    if (a.spec.consequences) schemi += a.spec.consequences.length;
    if (a.spec.sequences) schemi += a.spec.sequences.length;
    if (a.spec.classes) schemi += a.spec.classes.length;
    if (a.spec.compute) schemi += 12;
  });
  if (!schemi) return 0;
  return Math.round(Math.pow(schemi * 6, 1.5));
}

export {
  QUESTIONS_PER_SESSION,
  MIN_AREAS,
  AREA_INDEX,
  KINDS_VALIDI,
  createRng,
  shuffleFisherYates,
  buildQuestion,
  validateOptions,
  planDistribution,
  examCoverage,
  generateSession,
  gradeSession,
  variantEstimate
};
