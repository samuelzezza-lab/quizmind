/* ============================================================
   Quizmind — InstitutionalExamEngine
   Motore di generazione a tre step obbligatori.

   STEP 1 — Aree obbligatorie: ogni esame dichiara 4 macro-aree
            reali del proprio programma. Le 10 domande sono
            distribuite tra le aree, non pescate a caso.
   STEP 2 — Finestra mobile anti-ripetizione: prima di collocare
            una domanda si confrontano schema algoritmico e area
            con la domanda precedente. Se coincidono, la
            domanda viene scartata.
   STEP 3 — Distrattori dinamici: ogni risposta sbagliata nasce
            da un errore tipico reale e porta con se la
            spiegazione dell'errore nella revisione.

   Le aree delle singole materie vivono nei moduli:
     quiz/engine-aree-scientifiche.js  (chimica, statistica, fisica)
     quiz/engine-aree-mediche.js       (biochimica, fisiologia)
     quiz/engine-aree-biomediche.js    (anatomia, istologia, romano)
   e si registrano qui dentro AREA_INDEX, che e l'unico indice
   consultato dal generatore.

   Regola di onesta: se una materia non ha aree sufficienti, il
   motore la segnala come non disponibile invece di inventare
   domande.
   ============================================================ */

const QUESTIONS_PER_SESSION = 10;
const MIN_AREAS = 4;

/* ---------- RNG deterministico (mulberry32) ---------- */
function createRng(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }
function randInt(rng, min, max) { return Math.floor(rng() * (max - min + 1)) + min; }
function fmt(n) { return Number(n).toLocaleString("it-IT"); }

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

/* ============================================================
   DISTRATTORI NUMERICI
   Le opzioni sbagliate sono perturbazioni della risposta giusta
   che corrispondono a errori di calcolo reali.
   ============================================================ */
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
  const options = [render(correctValue)];
  const notes = [];

  const dyn = numericDynamics(correctValue, factor);
  for (let i = 0; i < dyn.length; i++) {
    const d = dyn[i];
    if (!isFinite(d.value)) continue;
    const k = roundKey(d.value);
    if (seen[k]) continue;
    seen[k] = true;
    options.push(render(d.value));
    notes.push(d.why);
    if (options.length === 4) break;
  }

  let m = 3;
  while (options.length < 4) {
    const v = correctValue * m;
    const k = roundKey(v);
    if (!seen[k] && isFinite(v)) {
      seen[k] = true;
      options.push(render(v));
      notes.push("fattore " + m + " applicato per errore");
    }
    m++;
  }
  return { correctText: render(correctValue), distractors: options.slice(1), notes: notes };
}

/* ============================================================
   INDICE DELLE AREE
   Popolato qui con le materie giuridiche di base e poi dai
   moduli di aree importati in fondo al file.
   ============================================================ */
const AREA_INDEX = {};

function area(id, name, kind, spec) {
  return { id: id, name: name, kind: kind, spec: spec };
}

function regolaCaso(prompt, correct, distractors, note) {
  return function () {
    return { prompt: prompt, correct: correct, distractors: distractors, note: note };
  };
}

/* ---------------- DIRITTO COSTITUZIONALE ---------------- */
AREA_INDEX["diritto-costituzionale"] = {
  name: "Diritto costituzionale",
  areas: [
    area("fonti", "Fonti del diritto", "regola-caso", {
      cases: [
        regolaCaso(
          "Nel conflitto tra un regolamento governativo e una legge ordinaria, quale fonte prevale?",
          "prevale la legge ordinaria, perche la fonte secondaria non puo derogare a quella primaria per il criterio gerarchico",
          [
            "prevale il regolamento, essendo la fonte piu recente per il criterio cronologico",
            "prevale il regolamento per il criterio di specialita della materia disciplinata",
            "le due fonti si applicano congiuntamente, senza alcuna prevalenza"
          ],
          "Errore tipico: sovrapporre il criterio gerarchico a quello cronologico o di specialita."
        ),
        regolaCaso(
          "Nel conflitto tra una legge regionale e un regolamento dell'Unione europea, quale prevale?",
          "prevale il regolamento europeo, con disapplicazione della norma interna contrastante da parte del giudice comune",
          [
            "prevale la legge regionale, per competenza esclusiva della Regione",
            "prevale la legge regionale se piu favorevole al cittadino",
            "le fonti sono pariordinate e il conflitto si risolve in via interpretativa"
          ],
          "Errore tipico: ritenere prevalente la legge regionale per competenza, ignorando il primato del diritto europeo."
        ),
        regolaCaso(
          "Qual e l'effetto di un decreto-legge non convertito nei sessanta giorni?",
          "perde efficacia con effetto retroattivo, con salvezza dei rapporti giuridici sorti nel periodo di vigenza",
          [
            "conserva efficacia fino a un'abrogazione espressa",
            "si converte automaticamente in legge al termine del periodo",
            "resta valido se non impugnato entro centoventi giorni"
          ],
          "Errore tipico: ritenere che il decreto non convertito conservi efficacia."
        )
      ]
    }),
    area("parlamento", "Parlamento e procedimento legislativo", "sequenza", {
      sequences: [
        { id: "iter", question: "Nel procedimento legislativo ordinario, dopo la fase dell'iniziativa:", first: "si apre l'esame in commissione e poi in assemblea, con discussione e votazione articolo per articolo" },
        { id: "referente", question: "Nella procedura in sede referente:", first: "la commissione istruisce il progetto e riferisce all'assemblea, che delibera nel merito" },
        { id: "deliberante", question: "Nella procedura in sede deliberante:", first: "la commissione approva il progetto in via definitiva, senza passaggio in assemblea, nei casi ammessi" },
        { id: "revisione", question: "Nel procedimento di revisione costituzionale:", first: "si tiene la prima deliberazione con il procedimento legislativo ordinario" }
      ]
    }),
    area("governo", "Governo e rapporto fiduciario", "regola-caso", {
      cases: [
        regolaCaso(
          "Se il Governo pone la questione di fiducia e non ottiene la maggioranza, che cosa accade?",
          "il Governo e obbligato a dimettersi, essendo venuto meno il rapporto fiduciario",
          [
            "il disegno di legge e rinviato alle Camere per un secondo esame",
            "il Presidente della Repubblica scioglie automaticamente le Camere",
            "la questione di fiducia si converte in mozione di sfiducia"
          ],
          "Errore tipico: ritenere che la mancata fiducia non comporti obbligo di dimissioni."
        ),
        regolaCaso(
          "Entro quale termine il Governo neoformato deve presentarsi alle Camere per ottenere la fiducia?",
          "entro dieci giorni dalla sua formazione, presentandosi a ciascuna Camera",
          [
            "entro trenta giorni dalla nomina",
            "entro sessanta giorni dall'incarico",
            "non e previsto alcun termine costituzionale"
          ],
          "Errore tipico: confondere il termine costituzionale con termini di prassi."
        )
      ]
    }),
    area("presidente", "Presidente della Repubblica", "regola-caso", {
      cases: [
        regolaCaso(
          "Quale atto del Presidente della Repubblica e personalissimo e non richiede controfirma ministeriale?",
          "l'atto di dimissioni dalla carica",
          [
            "lo scioglimento anticipato delle Camere",
            "la nomina dei giudici della Corte costituzionale",
            "la promulgazione delle leggi"
          ],
          "Errore tipico: ritenere esenti da controfirma atti che invece la richiedono."
        ),
        regolaCaso(
          "Quanti giudici della Corte costituzionale nomina il Presidente della Repubblica?",
          "cinque, come il Parlamento in seduta comune e le supreme magistrature",
          ["tre", "quattro", "sette"],
          "Errore tipico: sbagliare la ripartizione delle nomine tra gli organi."
        )
      ]
    }),
    area("giurisdizione", "Giurisdizione e Corte costituzionale", "conseguenza", {
      consequences: [
        { id: "conflitto", cause: "sorge un conflitto di attribuzione tra poteri dello Stato", effect: "decide la Corte costituzionale con sentenza che delimita le rispettive competenze" },
        { id: "legittimita", cause: "il giudice solleva questione di legittimita costituzionale rilevante e non manifestamente infondata", effect: "la Corte giudica nel merito e dichiara l'illegittimita con effetti erga omnes" },
        { id: "ricorso", cause: "lo Stato impugna una legge regionale per incompetenza", effect: "la Corte decide sul ricorso in via principale entro il termine previsto" },
        { id: "sentenza", cause: "la Corte emette una sentenza di accoglimento", effect: "la norma cessa di avere efficacia dal giorno successivo alla pubblicazione" }
      ]
    })
  ]
};

/* ---------------- DIRITTO PRIVATO ---------------- */
AREA_INDEX["diritto-privato"] = {
  name: "Diritto privato",
  areas: [
    area("prescrizione", "Prescrizione e decadenza", "regola-caso", {
      cases: [
        regolaCaso(
          "Qual e il termine ordinario di prescrizione previsto dal codice civile?",
          "dieci anni, salvo i casi in cui la legge stabilisce un termine diverso",
          [
            "due anni, perche si tratta di un diritto di credito",
            "cinque anni, termine previsto per le azioni di annullamento",
            "venti anni, termine di prescrizione piu lungo ammesso"
          ],
          "Errore tipico: confondere il termine ordinario con quelli speciali."
        ),
        regolaCaso(
          "Quali diritti sono imprescrittibili per loro natura?",
          "i diritti indisponibili e i diritti della personalita, che non si estinguono per il non uso",
          [
            "i diritti di credito, che si estinguono dopo dieci anni",
            "i diritti reali minori, che si perdono per non uso ventennale",
            "tutti i diritti patrimoniali, senza distinzione"
          ],
          "Errore tipico: applicare la prescrizione indistintamente a ogni diritto."
        )
      ]
    }),
    area("capacita", "Capacita e istituti di protezione", "classificazione", {
      classes: [
        { id: "minore", label: "minore di eta", members: ["il soggetto che non ha compiuto diciotto anni"] },
        { id: "emancipato", label: "minore emancipato", members: ["il minore che ha contratto matrimonio prima dei diciotto anni"] },
        { id: "inabilitato", label: "inabilitato", members: ["il soggetto con infermita che non lo priva del tutto della capacita"] },
        { id: "interdetto", label: "interdetto giudiziale", members: ["il soggetto dichiarato incapace in modo assoluto dal giudice"] }
      ]
    }),
    area("obbligazioni", "Obbligazioni e adempimento", "conseguenza", {
      consequences: [
        { id: "mora", cause: "il creditore costituisce in mora il debitore con richiesta scritta", effect: "il debitore risponde dei danni e degli interessi moratori" },
        { id: "impossibile", cause: "la prestazione diventa impossibile per causa non imputabile al debitore", effect: "l'obbligazione si estingue e il debitore e liberato" },
        { id: "parziale", cause: "il debitore esegue una prestazione parziale", effect: "il creditore puo rifiutarla se l'adempimento parziale non ha interesse" },
        { id: "garanzia", cause: "il debitore non adempie e il creditore agisce in via esecutiva", effect: "il creditore puo aggredire il patrimonio del debitore con l'esecuzione forzata" }
      ]
    }),
    area("contratto", "Contratto e validita", "regola-caso", {
      cases: [
        regolaCaso(
          "Qual e la conseguenza della mancanza di un requisito essenziale del contratto?",
          "il contratto e nullo, e la nullita puo essere rilevata anche d'ufficio dal giudice",
          [
            "il contratto e annullabile su richiesta della parte interessata",
            "il contratto produce effetti fino alla sua risoluzione",
            "il contratto e valido ma inefficace nei confronti dei terzi"
          ],
          "Errore tipico: confondere annullabilita e nullita."
        ),
        regolaCaso(
          "Che differenza c'e tra nullita e annullabilita del contratto?",
          "la nullita opera di diritto e puo essere rilevata d'ufficio; l'annullabilita e disposta solo su domanda della parte legittimata",
          [
            "la nullita richiede sempre il passaggio in giudicato, l'annullabilita e automatica",
            "sono sinonimi, cambia solo il termine usato dal codice",
            "la nullita e sempre sanabile, l'annullabilita mai"
          ],
          "Errore tipico: usare i due istituti come equivalenti."
        )
      ]
    })
  ]
};

/* ---------------- DIRITTO PENALE ---------------- */
AREA_INDEX["diritto-penale"] = {
  name: "Diritto penale",
  areas: [
    area("principi", "Principi e legalita", "regola-caso", {
      cases: [
        regolaCaso(
          "Che cosa impone il principio di legalita in materia penale?",
          "che nessuno possa essere punito se non in forza di una legge entrata in vigore prima del fatto commesso",
          [
            "che la pena sia sempre proporzionata al danno cagionato",
            "che il giudice possa estendere la norma per analogia a casi simili",
            "che le norme penali si applichino anche ai fatti anteriori alla loro entrata in vigore"
          ],
          "Errore tipico: ritenere ammessa l'analogia in materia penale."
        ),
        regolaCaso(
          "Come si applica una norma penale piu favorevole intervenuta dopo il fatto?",
          "si applica retroattivamente, perche la legge piu favorevole prevale anche se intervenuta dopo il fatto",
          [
            "si applica sempre la legge vigente al momento del fatto",
            "si applica la legge piu grave, per garantire l'efficacia deterrente",
            "l'applicazione e rimessa alla discrezionalita del giudice"
          ],
          "Errore tipico: applicare l'irretroattivita anche alla legge piu favorevole."
        )
      ]
    }),
    area("reato", "Struttura del reato", "classificazione", {
      classes: [
        { id: "dolo", label: "reato doloso", members: ["l'omicidio volontario", "il furto con coscienza e volonta"] },
        { id: "colpa", label: "reato colposo", members: ["l'omicidio colposo per imprudenza", "le lesioni da negligenza"] },
        { id: "preterint", label: "preterintenzione", members: ["l'evento piu grave non voluto dall'agente"] },
        { id: "omissione", label: "reato omissivo", members: ["l'omissione di soccorso", "la mancata denuncia"] }
      ]
    }),
    area("imputabilita", "Imputabilita ed esimenti", "conseguenza", {
      consequences: [
        { id: "infermita", cause: "l'agente e affetto da vizio totale di mente al momento del fatto", effect: "non e imputabile e non puo essere condannato" },
        { id: "legittima", cause: "l'agente reagisce per difendersi da un'offesa ingiusta", effect: "opera la legittima difesa e il fatto non e punibile nei limiti della proporzione" },
        { id: "forza", cause: "l'agente e costretto da forza maggiore", effect: "non risponde del fatto, che non gli e rimproverabile" },
        { id: "errore", cause: "l'agente versa in errore inevitabile sul fatto", effect: "l'errore sul fatto esclude il dolo" }
      ]
    }),
    area("tentativo", "Tentativo e concorso di persone", "regola-caso", {
      cases: [
        regolaCaso(
          "Quando il reato e tentato?",
          "quando l'azione e idonea e diretta in modo non equivoco a commettere il delitto, che non si compie",
          [
            "quando l'agente ha soltanto manifestato l'intenzione di commettere il reato",
            "quando il reato si compie ma senza danno per la vittima",
            "quando l'agente si pente prima di essere scoperto"
          ],
          "Errore tipico: far coincidere il tentativo con gli atti preparatori."
        ),
        regolaCaso(
          "Che cosa caratterizza il concorso di persone nel reato?",
          "il concorso di piu persone nella commissione del reato, punibile secondo il ruolo di ciascuna",
          [
            "la sola presenza sul luogo del fatto, che basta a fondare la responsabilita",
            "l'accordo preventivo, che e sempre necessario",
            "la responsabilita automatica di tutti i presenti"
          ],
          "Errore tipico: fondare il concorso sulla mera presenza."
        )
      ]
    })
  ]
};

/* ============================================================
   GENERATORI PER SCHEMA ALGORITMICO
   ============================================================ */
function generaDefinizione(rng, spec) {
  const set = pick(rng, spec.sets);
  const correct = pick(rng, set.items);
  const others = shuffleFisherYates(rng, set.items.filter((i) => i.id !== correct.id));
  return {
    prompt: set.question + " che cos'e " + correct.label + "?",
    options: [{ text: correct.text, correct: true, why: null }].concat(
      others.slice(0, 3).map((o) => ({
        text: o.text,
        correct: false,
        why: "confusione con una figura affine della stessa materia"
      }))
    ),
    errorNote: "Errore tipico: confondere istituti o grandezze affini per funzione, non per denominazione."
  };
}

function generaSequenza(rng, spec) {
  const s = pick(rng, spec.sequences);
  const wrong = shuffleFisherYates(rng, spec.sequences.filter((x) => x.id !== s.id));
  return {
    prompt: s.question + " quale e il primo passaggio?",
    options: [{ text: s.first, correct: true, why: null }].concat(
      wrong.slice(0, 3).map((w) => ({
        text: w.first,
        correct: false,
        why: "fase spostata di posizione nella sequenza"
      }))
    ),
    errorNote: "Errore tipico: anticipare o posticipare una fase della sequenza procedurale."
  };
}

function generaConseguenza(rng, spec) {
  const c = pick(rng, spec.consequences);
  const wrong = shuffleFisherYates(rng, spec.consequences.filter((x) => x.id !== c.id));
  return {
    prompt: "Dato il presupposto «" + c.cause + "», quale conseguenza ne deriva?",
    options: [{ text: c.effect, correct: true, why: null }].concat(
      wrong.slice(0, 3).map((w) => ({
        text: w.effect,
        correct: false,
        why: "conseguenza valida in astratto ma non prodotta dal presupposto"
      }))
    ),
    errorNote: "Errore tipico: applicare una conseguenza valida in astratto a un presupposto che non la produce."
  };
}

function generaClassificazione(rng, spec) {
  const classe = pick(rng, spec.classes);
  const membro = pick(rng, classe.members);
  const wrong = shuffleFisherYates(rng, spec.classes.filter((c) => c.id !== classe.id));
  return {
    prompt: "In quale categoria rientra " + membro + "?",
    options: [{ text: classe.label, correct: true, why: null }].concat(
      wrong.slice(0, 3).map((w) => ({
        text: w.label,
        correct: false,
        why: "categoria attribuita per assonanza"
      }))
    ),
    errorNote: "Errore tipico: attribuire al caso una categoria vicina ma con requisiti diversi."
  };
}

function generaRegolaCaso(rng, spec) {
  const built = pick(rng, spec.cases)(rng);
  return {
    prompt: built.prompt,
    options: [{ text: built.correct, correct: true, why: null }].concat(
      built.distractors.map((d) => ({ text: d, correct: false, why: built.note }))
    ),
    errorNote: built.note
  };
}

function generaCalcolo(rng, spec) {
  const built = spec.compute(rng);
  const num = buildNumericOptions(built.value, {
    unit: built.unit,
    factor: built.factor,
    decimals: built.decimals
  });
  const opts = [num.correctText].concat(num.distractors);
  const shuffled = shuffleFisherYates(rng, opts);
  return {
    prompt: built.prompt,
    options: shuffled.map((t) => ({ text: t, correct: t === num.correctText, why: t === num.correctText ? null : built.note })),
    errorNote: built.note,
    explanation: built.explanation,
    numeric: num
  };
}

const KINDS = ["definizione", "norma", "regola-caso", "calcolo", "classificazione", "sequenza", "conseguenza"];

function generaDomanda(rng, areaDef) {
  const kind = areaDef.kind;
  try {
    if (kind === "definizione") return generaDefinizione(rng, areaDef.spec);
    if (kind === "sequenza") return generaSequenza(rng, areaDef.spec);
    if (kind === "conseguenza") return generaConseguenza(rng, areaDef.spec);
    if (kind === "classificazione") return generaClassificazione(rng, areaDef.spec);
    if (kind === "regola-caso") return generaRegolaCaso(rng, areaDef.spec);
    if (kind === "calcolo") return generaCalcolo(rng, areaDef.spec);
  } catch (e) {
    return null;
  }
  return null;
}

/* ============================================================
   REGISTRAZIONE DEI MODULI DI AREE
   Gli import sono in coda: i moduli scrivono dentro AREA_INDEX,
   che e gia stato creato e popolato sopra.
   ============================================================ */
import "./engine-aree-scientifiche.js";
import "./engine-aree-mediche.js";
import "./engine-aree-biomediche.js";

/* ============================================================
   COPERTURA E GENERAZIONE SESSIONE
   ============================================================ */
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

function generaDomandaValidata(rng, areaDef, prevKind) {
  const built = generaDomanda(rng, areaDef);
  if (!built) return null;
  if (built.numeric) {
    const opts = built.options.map((o) => o.text);
    if (new Set(opts).size !== 4) return null;
    return {
      kind: areaDef.kind,
      areaId: areaDef.id,
      areaName: areaDef.name,
      prompt: built.prompt,
      options: opts,
      correctIndex: opts.findIndex((t) => t === built.numeric.correctText),
      correct_answer: built.numeric.correctText,
      distractors: built.numeric.distractors,
      explanation: built.explanation,
      errorNote: built.errorNote,
      distractorNotes: built.numeric.notes
    };
  }
  const opts = built.options.map((o) => o.text);
  if (opts.length !== 4) return null;
  if (new Set(opts).size !== 4) return null;
  if (opts.some((t) => !t || String(t).trim().length < 2)) return null;
  const correctText = built.options.find((o) => o.correct).text;
  return {
    kind: areaDef.kind,
    areaId: areaDef.id,
    areaName: areaDef.name,
    prompt: built.prompt,
    options: opts,
    correctIndex: opts.indexOf(correctText),
    correct_answer: correctText,
    distractors: opts.filter((t) => t !== correctText),
    explanation: built.explanation || null,
    errorNote: built.errorNote,
    distractorNotes: built.options.filter((o) => !o.correct).map((o) => o.why)
  };
}

function generateSession(slug, seed) {
  const def = AREA_INDEX[slug];
  if (!def) return { ok: false, reason: "materia-non-coperta", examSlug: slug, minRequired: MIN_AREAS };
  if (def.areas.length < MIN_AREAS) {
    return { ok: false, reason: "copertura", examSlug: slug, coverage: def.areas.length, minRequired: MIN_AREAS };
  }

  const rng = createRng(seed);
  const questions = [];
  const seen = new Set();
  const usate = {};
  let scartate = 0;

  for (let i = 0; i < QUESTIONS_PER_SESSION; i++) {
    const areaDef = def.areas[i % def.areas.length];
    const prevKind = questions.length ? questions[questions.length - 1].kind : null;
    let placed = null;

    for (let t = 0; t < 14; t++) {
      const cand = generaDomandaValidata(rng, areaDef, prevKind);
      if (!cand) continue;
      if (seen.has(cand.prompt)) { scartate++; continue; }
      if (prevKind && cand.kind === prevKind) { scartate++; continue; }
      placed = cand;
      break;
    }

    if (!placed) {
      for (let k = 0; k < def.areas.length; k++) {
        const alt = def.areas[k];
        if (alt.kind === prevKind) continue;
        const cand = generaDomandaValidata(rng, alt, prevKind);
        if (cand && !seen.has(cand.prompt)) { placed = cand; break; }
      }
    }

    if (placed) {
      seen.add(placed.prompt);
      usate[placed.areaId] = (usate[placed.areaId] || 0) + 1;
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
    areaCount: Object.keys(usate).length,
    repeatsDiscarded: scartate,
    distribution: usate
  };
}

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

/* Elenco delle materie coperte dal motore, per l'interfaccia. */
function materieCoperte() {
  return Object.keys(AREA_INDEX).sort();
}

export {
  QUESTIONS_PER_SESSION,
  MIN_AREAS,
  KINDS,
  AREA_INDEX,
  createRng,
  randInt,
  fmt,
  pick,
  shuffleFisherYates,
  buildNumericOptions,
  examCoverage,
  generateSession,
  gradeSession,
  variantEstimate,
  materieCoperte
};
