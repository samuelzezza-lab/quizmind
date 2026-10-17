/* ============================================================
   Quizmind — InstitutionalExamEngine
   Motore di generazione a tre step obbligatori.

   STEP 1 — Aree obbligatorie: ogni esame dichiara 4-5 macro-aree
            reali del proprio programma. Le 10 domande sono
            distribuite tra le aree, non pescate a caso.
   STEP 2 — Finestra mobile anti-ripetizione: prima di collocare
            una domanda si confrontano schema algoritmico e area
            con la domanda precedente. Se coincidono, la
            domanda viene scartata.
   STEP 3 — Distrattori dinamici: ogni risposta sbagliata nasce
            da un errore tipico reale e porta con sé la
            spiegazione dell'errore nella revisione.

   Regola di onestà: se un esame non ha aree sufficienti, il
   motore lo segnala come non disponibile invece di inventare
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
   AREE PER MATERIA
   Ogni area produce domande con il proprio schema algoritmico.
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
          "prevale la legge ordinaria, perché la fonte secondaria non può derogare a quella primaria per il criterio gerarchico",
          [
            "prevale il regolamento, essendo la fonte più recente per il criterio cronologico",
            "prevale il regolamento per il criterio di specialità della materia disciplinata",
            "le due fonti si applicano congiuntamente, senza alcuna prevalenza"
          ],
          "Errore tipico: sovrapporre il criterio gerarchico a quello cronologico o di specialità."
        ),
        regolaCaso(
          "Nel conflitto tra una legge regionale e un regolamento dell'Unione europea, quale prevale?",
          "prevale il regolamento europeo, con disapplicazione della norma interna contrastante da parte del giudice comune",
          [
            "prevale la legge regionale, per competenza esclusiva della Regione",
            "prevale la legge regionale se più favorevole al cittadino",
            "le fonti sono pariordinate e il conflitto si risolve in via interpretativa"
          ],
          "Errore tipico: ritenere prevalente la legge regionale per competenza, ignorando il primato del diritto europeo."
        ),
        regolaCaso(
          "Qual è l'effetto di un decreto-legge non convertito nei sessanta giorni?",
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
          "il Governo è obbligato a dimettersi, essendo venuto meno il rapporto fiduciario",
          [
            "il disegno di legge è rinviato alle Camere per un secondo esame",
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
            "non è previsto alcun termine costituzionale"
          ],
          "Errore tipico: confondere il termine costituzionale con termini di prassi."
        )
      ]
    }),
    area("presidente", "Presidente della Repubblica", "regola-caso", {
      cases: [
        regolaCaso(
          "Quale atto del Presidente della Repubblica è personalissimo e non richiede controfirma ministeriale?",
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
        { id: "legittimita", cause: "il giudice solleva questione di legittimità costituzionale rilevante e non manifestamente infondata", effect: "la Corte giudica nel merito e dichiara l'illegittimità con effetti erga omnes" },
        { id: "ricorso", cause: "lo Stato impugna una legge regionale per incompetenza", effect: "la Corte decide sul ricorso in via principale entro il termine previsto" },
        { id: "sentenza", cause: "la Corte emette una sentenza di accoglimento", effect: "la norma cessa di avere efficacia dal giorno successivo alla pubblicazione" }
      ]
    })
  ]
};
