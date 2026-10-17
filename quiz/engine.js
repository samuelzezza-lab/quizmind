/* ============================================================
   Quizmind — InstitutionalExamEngine
   Factory di generazione a tre step obbligatori.

   STEP 1 — Sottocategorie obbligatorie: ogni esame dichiara
            4-5 macro-aree reali del proprio programma. Le 10
            domande sono distribuite equamente tra le aree.
   STEP 2 — Finestra mobile anti-ripetizione: controllo
            sull'indice precedente (i-1). Se lo schema
            algoritmico coincide, l'estrazione viene scartata
            e si passa alla categoria successiva.
   STEP 3 — Variazione parametrica e distrattori dinamici: i
            valori cambiano a ogni clic; i distrattori sono
            calcolati perturbando l'errore tipico dello
            studente, mai con risposte assurde.

   Le aree sono specifiche per materia: Diritto costituzionale
   ha Fonti/Parlamento/Governo/Presidente/Giurisdizione,
   Biochimica ha Enzimi/Metabolismo/Glicolisi/Lipidi. Non
   esistono categorie generiche applicate a tutte le materie.
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

/* ---------- Fisher-Yates ---------- */
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
   STEP 3 — DISTRATTORI DINAMICI
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
  const texts = options.map(function (o) { return String(o.text).trim(); });
  for (let i = 0; i < texts.length; i++) if (!texts[i] || texts[i].length < 2) return false;
  const uniq = {};
  for (let i = 0; i < texts.length; i++) uniq[texts[i]] = true;
  return Object.keys(uniq).length === 4;
}

/* ============================================================
   GENERATORI PER SCHEMA ALGORITMICO (`kind`)
   ============================================================ */
const GENERATORS = {
  definizione: function (rng, spec) {
    const set = pick(rng, spec.sets);
    const correct = pick(rng, set.items);
    const others = shuffleFisherYates(rng, set.items.filter(function (i) { return i.id !== correct.id; }));
    return {
      prompt: set.question + " Che cos'è " + correct.label + "?",
      options: [{ text: correct.text, correct: true, why: null }].concat(
        others.slice(0, 3).map(function (o) {
          return { text: o.text, correct: false, why: "confusione con una figura affine della stessa materia" };
        })
      ),
      errorNote: "Errore tipico: confondere istituti o grandezze affini per funzione, non per denominazione."
    };
  },

  norma: function (rng, spec) {
    const pairs = spec.pairs;
    const x = pick(rng, pairs);
    const wrong = shuffleFisherYates(rng, pairs.filter(function (p) { return p.ref !== x.ref; }));
    return {
      prompt: "A quale riferimento corrisponde il seguente enunciato? «" + x.text + "»",
      options: [{ text: x.ref, correct: true, why: null }].concat(
        wrong.slice(0, 3).map(function (p) {
          return { text: p.ref, correct: false, why: "riferimento vicino per materia ma non pertinente al caso" };
        })
      ),
      errorNote: "Errore tipico: citare una norma vicina per materia ma non applicabile alla fattispecie."
    };
  },

  "regola-caso": function (rng, spec) {
    const built = pick(rng, spec.cases)(rng);
    return {
      prompt: built.prompt,
      options: [{ text: built.correct, correct: true, why: null }].concat(
        built.distractors.map(function (d) {
          return { text: d, correct: false, why: built.note };
        })
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
    const wrong = shuffleFisherYates(rng, spec.classes.filter(function (c) { return c.id !== classe.id; }));
    return {
      prompt: "In quale categoria rientra " + membro + "?",
      options: [{ text: classe.label, correct: true, why: null }].concat(
        wrong.slice(0, 3).map(function (w) {
          return { text: w.label, correct: false, why: "categoria attribuita per assonanza" };
        })
      ),
      errorNote: "Errore tipico: attribuire al caso una categoria vicina ma con requisiti diversi."
    };
  },

  sequenza: function (rng, spec) {
    const s = pick(rng, spec.sequences);
    const wrong = shuffleFisherYates(rng, spec.sequences.filter(function (x) { return x.id !== s.id; }));
    return {
      prompt: s.question + " Qual è il primo passaggio?",
      options: [{ text: s.first, correct: true, why: null }].concat(
        wrong.slice(0, 3).map(function (w) {
          return { text: w.first, correct: false, why: "fase spostata di posizione nella sequenza" };
        })
      ),
      errorNote: "Errore tipico: anticipare o posticipare una fase della sequenza procedurale."
    };
  },

  conseguenza: function (rng, spec) {
    const c = pick(rng, spec.consequences);
    const wrong = shuffleFisherYates(rng, spec.consequences.filter(function (x) { return x.id !== c.id; }));
    return {
      prompt: "Dato il presupposto «" + c.cause + "», quale conseguenza ne deriva?",
      options: [{ text: c.effect, correct: true, why: null }].concat(
        wrong.slice(0, 3).map(function (w) {
          return { text: w.effect, correct: false, why: "conseguenza corretta in astratto ma non prodotta dal presupposto" };
        })
      ),
      errorNote: "Errore tipico: applicare una conseguenza valida in astratto a un presupposto che non la produce."
    };
  }
};

/* ============================================================
   AREE SPECIFICHE PER MATERIA
   ============================================================ */
const EXAM_AREAS = {};

function area(id, name, kind, spec) {
  return { id: id, name: name, kind: kind, spec: spec };
}

/* ---------------- GIURIDICA ---------------- */
EXAM_AREAS["diritto-costituzionale"] = {
  name: "Diritto costituzionale",
  areas: [
    area("fonti", "Fonti del diritto", "regola-caso", {
      cases: [
        function () {
          return {
            prompt: "Nel conflitto tra un regolamento governativo e una legge ordinaria, quale fonte prevale?",
            correct: "prevale la legge ordinaria, perché la fonte secondaria non può derogare a quella primaria per il criterio gerarchico",
            distractors: [
              "prevale il regolamento, essendo la fonte più recente per il criterio cronologico",
              "prevale il regolamento per il criterio di specialità della materia disciplinata",
              "le due fonti si applicano congiuntamente, senza alcuna prevalenza"
            ],
            note: "Errore tipico: sovrapporre il criterio gerarchico a quello cronologico o di specialità."
          };
        },
        function () {
          return {
            prompt: "Nel conflitto tra una legge regionale e un regolamento dell'Unione europea, quale prevale?",
            correct: "prevale il regolamento europeo, con disapplicazione della norma interna contrastante da parte del giudice comune",
            distractors: [
              "prevale la legge regionale, per competenza esclusiva della Regione",
              "prevale la legge regionale se più favorevole al cittadino",
              "le fonti sono pariordinate e il conflitto si risolve in via interpretativa"
            ],
            note: "Errore tipico: ritenere la legge regionale prevalente per competenza, ignorando il primato europeo."
          };
        },
        function () {
          return {
            prompt: "Qual è l'effetto di un decreto-legge non convertito nei sessanta giorni?",
            correct: "perde efficacia con effetto retroattivo, con salvezza dei rapporti giuridici sorti nel periodo di vigenza",
            distractors: [
              "conserva efficacia fino a un'abrogazione espressa",
              "si converte automaticamente in legge al termine del periodo",
              "resta valido se non impugnato entro centoventi giorni"
            ],
            note: "Errore tipico: ritenere che il decreto non convertito conservi efficacia o si converta d'ufficio."
          };
        }
      ]
    }),
    area("parlamento", "Parlamento e procedimento legislativo", "sequenza", {
      sequences: [
        { id: "iter", question: "Nel procedimento legislativo ordinario, dopo la fase dell'iniziativa:", first: "si apre l'esame in commissione e poi in assemblea, con discussione e votazione articolo per articolo" },
        { id: "referente", question: "Nella procedura in sede referente:", first: "la commissione istruisce il progetto e riferisce all'assemblea, che delibera nel merito" },
        { id: "deliberante", question: "Nella procedura in sede deliberante:", first: "la commissione approva il progetto in via definitiva, senza passaggio in assemblea, nei casi ammessi" },
        { id: "revisione", question: "Nel procedimento di revisione costituzionale:", first: "si tiene la prima deliberazione con il procedimento legislativo ordinario" },
        { id: "redigente", question: "Nella procedura in sede redigente:", first: "la commissione redige i singoli articoli e l'assemblea approva il testo nel suo complesso" }
      ]
    }),
    area("governo", "Governo e rapporto fiduciario", "regola-caso", {
      cases: [
        function () {
          return {
            prompt: "Se il Governo pone la questione di fiducia su un disegno di legge e non ottiene la maggioranza, che cosa accade?",
            correct: "il Governo è obbligato a dimettersi, essendo venuto meno il rapporto fiduciario",
            distractors: [
              "il disegno di legge è rinviato alle Camere per un secondo esame",
              "il Presidente della Repubblica scioglie automaticamente le Camere",
              "la questione di fiducia si converte in mozione di sfiducia"
            ],
            note: "Errore tipico: ritenere che la mancata fiducia su un singolo atto non comporti obbligo di dimissioni."
          };
        },
        function () {
          return {
            prompt: "Entro quale termine il Governo neoformato deve presentarsi alle Camere per ottenere la fiducia?",
            correct: "entro dieci giorni dalla sua formazione, presentandosi a ciascuna Camera",
            distractors: [
              "entro trenta giorni dalla nomina",
              "entro sessanta giorni dall'incarico",
              "non è previsto alcun termine costituzionale"
            ],
            note: "Errore tipico: confondere il termine costituzionale con termini di prassi o di altra natura."
          };
        }
      ]
    }),
    area("presidente", "Presidente della Repubblica", "regola-caso", {
      cases: [
        function () {
          return {
            prompt: "Quale atto del Presidente della Repubblica è atto personalissimo e non richiede controfirma ministeriale?",
            correct: "l'atto di dimissioni dalla carica",
            distractors: [
              "lo scioglimento anticipato delle Camere",
              "la nomina dei giudici della Corte costituzionale",
              "la promulgazione delle leggi"
            ],
            note: "Errore tipico: ritenere esenti da controfirma atti che invece la richiedono per la loro natura sostanziale."
          };
        },
        function () {
          return {
            prompt: "Quanti giudici della Corte costituzionale nomina il Presidente della Repubblica?",
            correct: "cinque, come il Parlamento in seduta comune e le supreme magistrature",
            distractors: ["tre", "quattro", "sette"],
            note: "Errore tipico: sbagliare la ripartizione delle nomine tra gli organi."
          };
        }
      ]
    }),
    area("giurisdizione", "Giurisdizione e Corte costituzionale", "conseguenza", {
      consequences: [
        { id: "conflitto", cause: "sorge un conflitto di attribuzione tra poteri dello Stato", effect: "decide la Corte costituzionale con sentenza che delimita le rispettive competenze" },
        { id: "legittimita", cause: "il giudice a quo solleva questione di legittimità costituzionale rilevante e non manifestamente infondata", effect: "la Corte costituzionale esamina nel merito e, se accoglie, dichiara l'illegittimità della norma" },
        { id: "referendum", cause: "una legge di revisione costituzionale è approvata con la maggioranza richiesta ma non quella dei due terzi", effect: "può essere richiesto il referendum costituzionale entro tre mesi dalla pubblicazione" },
        { id: "supplenza", cause: "il Presidente della Repubblica è temporaneamente impedito nell'esercizio delle funzioni", effect: "le funzioni sono esercitate dal Presidente del Senato in qualità di supplente" }
      ]
    })
  ]
};

EXAM_AREAS["diritto-privato"] = {
  name: "Diritto privato",
  areas: [
    area("persone", "Persone e capacità", "classificazione", {
      classes: [
        { id: "limitata", label: "persona con capacità di agire limitata, assistita da un curatore", members: ["l'inabilitato", "il minore emancipato"] },
        { id: "priva", label: "persona priva di capacità di agire, rappresentata da un tutore", members: ["l'interdetto giudiziale", "il minore non emancipato"] },
        { id: "piena", label: "persona con piena capacità di agire", members: ["il maggiorenne non sottoposto a misure di protezione"] }
      ]
    }),
    area("obbligazioni", "Obbligazioni e mora", "regola-caso", {
      cases: [
        function (rng) {
          const giorni = randInt(rng, 15, 120);
          return {
            prompt: "Un contratto fissa un termine di " + giorni + " giorni per l'adempimento. Decorso il termine senza richiesta scritta del creditore, il debitore è in mora?",
            correct: "no, come regola generale serve la costituzione in mora mediante intimazione o richiesta scritta",
            distractors: [
              "sì, il solo decorso del termine produce automaticamente la mora",
              "no, la mora richiede sempre un provvedimento del giudice",
              "sì, ma solo se il termine era qualificato come essenziale"
            ],
            note: "Errore tipico: credere che la mora si produca automaticamente per il decorso del termine."
          };
        }
      ]
    }),
    area("contratto", "Contratto e invalidità", "conseguenza", {
      consequences: [
        { id: "nullita", cause: "il contratto è privo dei requisiti essenziali o ha oggetto impossibile", effect: "la nullità opera di diritto ed è rilevabile d'ufficio dal giudice" },
        { id: "annullabilita", cause: "il consenso è stato dato per errore essenziale e riconoscibile dall'altro contraente", effect: "il contratto è annullabile su domanda della parte interessata, con prescrizione quinquennale dell'azione" },
        { id: "rescissione", cause: "il contratto è concluso in stato di pericolo o con lesione ultra dimidium", effect: "si può chiedere la rescissione, con i limiti e gli effetti propri dell'azione di rescissione" },
        { id: "risoluzione", cause: "in un contratto a prestazioni corrispettive una parte non esegue la prestazione", effect: "l'altra parte può chiedere la risoluzione, salvo che l'inadempimento abbia scarsa importanza" }
      ]
    }),
    area("prescrizione", "Prescrizione e decadenza", "regola-caso", {
      cases: [
        function () {
          return {
            prompt: "Qual è il termine ordinario di prescrizione dei diritti previsto dal codice civile?",
            correct: "dieci anni, salvo i casi in cui la legge stabilisce un termine diverso",
            distractors: [
              "cinque anni, per ogni diritto di credito",
              "venti anni, coincidendo con il termine più lungo ammesso",
              "due anni, come termine generale residuale"
            ],
            note: "Errore tipico: assumere come generale un termine speciale, come quello quinquennale."
          };
        },
        function () {
          return {
            prompt: "Qual è la differenza tra prescrizione e decadenza?",
            correct: "la prescrizione tutela l'inerzia ed è sospendibile e interrompibile; la decadenza è di regola perentoria e non ammette interruzione",
            distractors: [
              "sono istituti sinonimi con identica disciplina",
              "la decadenza si applica soltanto ai diritti reali",
              "la prescrizione è sempre rilevabile d'ufficio, la decadenza mai"
            ],
            note: "Errore tipico: sovrapporre i due istituti, che hanno funzione e disciplina diverse."
          };
        }
      ]
    }),
    area("successioni", "Successioni e famiglia", "calcolo", {
      compute: function (rng) {
        const figli = randInt(rng, 1, 3);
        const patrimonio = randInt(rng, 2, 20) * 50000;
        const frazione = figli === 1 ? 1 / 2 : figli === 2 ? 1 / 3 : 1 / 4;
        const valore = Math.round(patrimonio * frazione);
        return {
          prompt: "Con un coniuge e " + figli + " figli, e un patrimonio di " + fmt(patrimonio) + " euro, qual è il valore della quota di riserva spettante all'insieme dei figli?",
          value: valore,
          unit: "euro",
          factor: figli + 1,
          decimals: 0,
          explanation: "Con " + figli + " figli e il coniuge, ai figli spetta " + (figli === 1 ? "1/2" : figli === 2 ? "1/3" : "1/4") + " del patrimonio: " + fmt(patrimonio) + " = " + fmt(valore) + " euro.",
          note: "Errore tipico: attribuire ai figli la quota del coniuge, che con un solo figlio è pari a 1/2."
        };
      }
    })
  ]
};

/* ---------------- MEDICA ---------------- */
EXAM_AREAS["biochimica"] = {
  name: "Biochimica",
  areas: [
    area("enzimi", "Enzimi e cinetica", "definizione", {
      sets: [
        {
          question: "Nella cinetica enzimatica,",
          items: [
            { id: "km", label: "la costante Km", text: "la concentrazione di substrato alla quale la velocità di reazione è pari alla metà della velocità massima" },
            { id: "vmax", label: "la Vmax", text: "la velocità massima raggiunta quando l'enzima è saturato dal substrato" },
            { id: "kcat", label: "il numero di turnover", text: "il numero di molecole di substrato convertite per unità di tempo da una singola molecola di enzima saturata" },
            { id: "competitivo", label: "l'inibitore competitivo", text: "la molecola che si lega al sito attivo aumentando la Km apparente senza modificare la Vmax" }
          ]
        }
      ]
    }),
    area("metabolismo", "Metabolismo energetico", "calcolo", {
      compute: function (rng) {
        const glucosio = randInt(rng, 2, 12);
        const atp = glucosio * 30;
        return {
          prompt: "Considerando una resa di 30 molecole di ATP per molecola di glucosio ossidata completamente, quante moli di ATP si producono da " + glucosio + " moli di glucosio?",
          value: atp,
          unit: "mol di ATP",
          factor: 2,
          decimals: 0,
          explanation: "Ogni molecola di glucosio rende circa 30 ATP: " + glucosio + " × 30 = " + atp + " mol.",
          note: "Errore tipico: usare la sola resa della glicolisi, dimenticando il ciclo di Krebs e la fosforilazione ossidativa."
        };
      }
    }),
    area("glicolisi", "Glicolisi e gluconeogenesi", "conseguenza", {
      consequences: [
        { id: "netto", cause: "una molecola di glucosio è degradata lungo la glicolisi", effect: "si ottengono 2 molecole di piruvato con un guadagno netto di 2 ATP e 2 NADH" },
        { id: "carenza", cause: "l'apporto di glucosio si riduce drasticamente", effect: "si attivano gluconeogenesi e chetogenesi, con produzione di corpi chetonici dagli acidi grassi" },
        { id: "pfk", cause: "la fosfofruttochinasi-1 è inibita da elevate concentrazioni di ATP", effect: "la glicolisi rallenta per regolazione a feedback negativo sul flusso glicolitico" },
        { id: "ossigeno", cause: "l'ossigeno è disponibile in quantità sufficiente", effect: "il piruvato entra nel mitocondrio e viene decarbossilato ad acetil-CoA per il ciclo di Krebs" }
      ]
    }),
    area("lipidi", "Lipidi e beta-ossidazione", "calcolo", {
      compute: function (rng) {
        const atomi = randInt(rng, 10, 18);
        const cicli = atomi / 2 - 1;
        return {
          prompt: "Quanti cicli di beta-ossidazione servono per degradare completamente un acido grasso saturo a catena lineare di " + atomi + " atomi di carbonio?",
          value: cicli,
          unit: "cicli",
          factor: 2,
          decimals: 0,
          explanation: "Per un acido grasso saturo di n atomi di carbonio servono n/2 − 1 cicli: " + atomi + "/2 − 1 = " + cicli + ".",
          note: "Errore tipico: usare n/2 cicli, dimenticando che l'ultimo passaggio produce due molecole di acetil-CoA."
        };
      }
    })
  ]
};

EXAM_AREAS["fisiologia"] = {
  name: "Fisiologia umana",
  areas: [
    area("cardiaca", "Fisiologia cardiaca", "calcolo", {
      compute: function (rng) {
        const fc = randInt(rng, 55, 100);
        const gs = randInt(rng, 50, 90);
        const gc = fc * gs;
        return {
          prompt: "Un soggetto ha frequenza cardiaca di " + fc + " battiti al minuto e gittata sistolica di " + gs + " mL. Qual è la portata cardiaca in mL/min?",
          value: gc,
          unit: "mL/min",
          factor: 2,
          decimals: 0,
          explanation: "La portata cardiaca è frequenza × gittata sistolica = " + fc + " × " + gs + " = " + fmt(gc) + " mL/min.",
          note: "Errore tipico: sommare frequenza e gittata invece di moltiplicarle."
        };
      }
    }),
    area("respiratoria", "Fisiologia respiratoria", "calcolo", {
      compute: function (rng) {
        const vc = randInt(rng, 400, 700);
        const spazio = randInt(rng, 120, 160);
        const alveolare = vc - spazio;
        return {
          prompt: "Con un volume corrente di " + vc + " mL e uno spazio morto anatomico di " + spazio + " mL, qual è la ventilazione alveolare per atto respiratorio?",
          value: alveolare,
          unit: "mL",
          factor: 2,
          decimals: 0,
          explanation: "La ventilazione alveolare è volume corrente meno spazio morto: " + vc + " − " + spazio + " = " + alveolare + " mL.",
          note: "Errore tipico: sommare spazio morto e volume corrente invece di sottrarre."
        };
      }
    }),
    area("renale", "Fisiologia renale", "calcolo", {
      compute: function (rng) {
        const vfg = randInt(rng, 90, 140);
        const riass = randInt(rng, 90, 99);
        const escreta = vfg * (1 - riass / 100);
        return {
          prompt: "Con velocità di filtrazione glomerulare di " + vfg + " mL/min e riassorbimento tubulare del " + riass + "%, qual è il volume di urina prodotto al minuto?",
          value: Math.round(escreta * 100) / 100,
          unit: "mL/min",
          factor: 2,
          decimals: 2,
          explanation: "Il volume escreto è VFG × (100 − " + riass + ")/100 = " + fmt(Math.round(escreta * 100) / 100) + " mL/min.",
          note: "Errore tipico: usare la percentuale di riassorbimento come volume escreto anziché come quota trattenuta."
        };
      }
    }),
    area("neuro", "Fisiologia del sistema nervoso", "conseguenza", {
      consequences: [
        { id: "soglia", cause: "lo stimolo raggiunge la soglia di depolarizzazione della membrana", effect: "si genera un potenziale d'azione con andamento tutto-o-nulla" },
        { id: "refrattario", cause: "il neurone si trova nel periodo refrattario assoluto", effect: "non può essere eccitato da alcuno stimolo, qualunque ne sia l'intensità" },
        { id: "pompa", cause: "la pompa sodio-potassio ripristina i gradienti ionici", effect: "si ristabilisce il potenziale di riposo della membrana" },
        { id: "mielina", cause: "la fibra nervosa è amielinica", effect: "la velocità di conduzione risulta inferiore rispetto a una fibra mielinica di pari diametro" }
      ]
    })
  ]
};

EXAM_AREAS["anatomia"] = {
  name: "Anatomia umana",
  areas: [
    area("scheletro", "Apparato scheletrico", "calcolo", {
      compute: function (rng) {
        const tipi = [
          { t: "cervicali", v: 7 },
          { t: "toraciche", v: 12 },
          { t: "lombari", v: 5 }
        ];
        const x = pick(rng, tipi);
        return {
          prompt: "Quante vertebre " + x.t + " compongono il tratto corrispondente della colonna vertebrale?",
          value: x.v,
          unit: "vertebre",
          factor: 2,
          decimals: 0,
          explanation: "Il tratto " + x.t + " della colonna comprende " + x.v + " vertebre.",
          note: "Errore tipico: scambiare il numero di vertebre tra i diversi tratti della colonna."
        };
      }
    }),
    area("muscoli", "Apparato muscolare", "definizione", {
      sets: [
        {
          question: "Nell'apparato muscolare e nei tessuti connettivi,",
          items: [
            { id: "tendine", label: "il tendine", text: "la struttura di tessuto connettivo fibroso denso che connette il muscolo all'osso" },
            { id: "legamento", label: "il legamento", text: "la struttura che connette tra loro due ossa, stabilizzando l'articolazione" },
            { id: "cartilagine", label: "la cartilagine articolare", text: "il rivestimento che riduce l'attrito tra le superfici ossee dell'articolazione" },
            { id: "fascia", label: "la fascia", text: "la lamina di tessuto connettivo che avvolge e separa i gruppi muscolari" }
          ]
        }
      ]
    }),
    area("circolazione", "Apparato cardiovascolare", "conseguenza", {
      consequences: [
        { id: "aorta", cause: "il ventricolo sinistro si contrae", effect: "il sangue ossigenato viene immesso nell'aorta e distribuito alla circolazione sistemica" },
        { id: "polmonare", cause: "il ventricolo destro si contrae", effect: "il sangue deossigenato è inviato alla circolazione polmonare attraverso l'arteria polmonare" },
        { id: "valvole", cause: "la pressione ventricolare supera quella atriale durante la sistole", effect: "le valvole atrioventricolari si chiudono impedendo il reflusso verso gli atri" },
        { id: "coronarie", cause: "le arterie coronarie si occludono parzialmente", effect: "si riduce l'apporto di ossigeno al miocardio, con rischio di ischemia" }
      ]
    }),
    area("respirazione", "Apparato respiratorio", "calcolo", {
      compute: function (rng) {
        const freq = randInt(rng, 10, 24);
        const vol = randInt(rng, 350, 600);
        const vmc = freq * vol;
        return {
          prompt: "Un soggetto ha frequenza respiratoria di " + freq + " atti al minuto e volume corrente di " + vol + " mL. Qual è la ventilazione al minuto in mL?",
          value: vmc,
          unit: "mL/min",
          factor: 2,
          decimals: 0,
          explanation: "La ventilazione al minuto è frequenza × volume corrente = " + freq + " × " + vol + " = " + fmt(vmc) + " mL/min.",
          note: "Errore tipico: sommare frequenza e volume invece di moltiplicarli."
        };
      }
    }),
    area("nervoso", "Sistema nervoso", "classificazione", {
      classes: [
        { id: "snc", label: "sistema nervoso centrale", members: ["l'encefalo", "il midollo spinale"] },
        { id: "snp", label: "sistema nervoso periferico", members: ["i nervi cranici", "i nervi spinali"] },
        { id: "autonomo", label: "sistema nervoso autonomo", members: ["il sistema simpatico", "il sistema parasimpatico"] }
      ]
    })
  ]
};

EXAM_AREAS["istologia"] = {
  name: "Istologia",
  areas: [
    area("epiteliale", "Tessuto epiteliale", "definizione", {
      sets: [
        {
          question: "Nell'istologia dei tessuti epiteliali,",
          items: [
            { id: "pavimentoso", label: "l'epitelio pavimentoso semplice", text: "l'epitelio di un solo strato di cellule appiattite, presente negli alveoli polmonari dove facilita la diffusione" },
            { id: "cubico", label: "l'epitelio cubico semplice", text: "l'epitelio di cellule cuboidali, tipico dei tubuli renali e dei dotti ghiandolari" },
            { id: "stratificato", label: "l'epitelio pavimentoso stratificato", text: "l'epitelio pluristratificato con cellule superficiali appiattite, adatto a resistere all'abrasione come nell'epidermide" },
            { id: "ciliato", label: "l'epitelio cilindrico ciliato", text: "l'epitelio di cellule alte dotate di ciglia, presente nelle vie respiratorie per il trasporto del muco" }
          ]
        }
      ]
    }),
    area("connettivo", "Tessuto connettivo", "classificazione", {
      classes: [
        { id: "proprio", label: "connettivo propriamente detto", members: ["il tessuto connettivo lasso", "il tessuto connettivo denso"] },
        { id: "sostegno", label: "connettivo di sostegno", members: ["il tessuto cartilagineo", "il tessuto osseo"] },
        { id: "trofico", label: "connettivo a funzione trofica", members: ["il sangue", "il tessuto adiposo"] }
      ]
    }),
    area("muscolare", "Tessuto muscolare", "regola-caso", {
      cases: [
        function () {
          return {
            prompt: "Quale caratteristica distingue il tessuto muscolare cardiaco dal muscolo scheletrico?",
            correct: "le cellule cardiache sono mononucleate e unite da dischi intercalari che consentono la contrazione sincrona",
            distractors: [
              "le cellule cardiache sono plurinucleate e prive di striature",
              "il muscolo cardiaco è volontario mentre lo scheletrico è involontario",
              "il muscolo cardiaco non contiene actina né miosina"
            ],
            note: "Errore tipico: attribuire al tessuto cardiaco la plurinucleazione propria del muscolo scheletrico."
          };
        }
      ]
    }),
    area("nervoso", "Tessuto nervoso", "conseguenza", {
      consequences: [
        { id: "mielina", cause: "l'assone di un neurone è rivestito da guaina mielinica", effect: "la conduzione dello stimolo diventa saltatoria e più rapida rispetto a un assone amielinico" },
        { id: "sinapsi", cause: "il potenziale d'azione raggiunge il terminale assonico", effect: "si liberano neurotrasmettitori nello spazio sinaptico, trasmettendo il segnale al neurone postsinaptico" },
        { id: "glia", cause: "le cellule gliali svolgono funzioni di supporto e isolamento", effect: "garantiscono il microambiente dei neuroni, con astrociti, oligodendrociti e cellule di Schwann" },
        { id: "lesione", cause: "il corpo cellulare del neurone subisce una lesione irreversibile", effect: "il neurone degenera, non essendo possibile la rigenerazione nel sistema nervoso centrale" }
      ]
    })
  ]
};

/* ---------------- SCIENTIFICA ---------------- */
EXAM_AREAS["chimica"] = {
  name: "Chimica",
  areas: [
    area("stechiometria", "Stechiometria", "calcolo", {
      compute: function (rng) {
        const mol = randInt(rng, 2, 9);
        const massa = Number((mol * 18.015).toFixed(1));
        return {
          prompt: "Quante moli di acqua contiene una massa di " + fmt(massa) + " g di H₂O? (massa molare 18,015 g/mol)",
          value: mol,
          unit: "mol",
          factor: 2,
          decimals: 2,
          explanation: "Dividendo la massa per la massa molare: " + massa + " / 18,015 = " + mol + " mol.",
          note: "Errore tipico: moltiplicare per la massa molare invece di dividere."
        };
      }
    }),
    area("soluzioni", "Soluzioni e molarità", "calcolo", {
      compute: function (rng) {
        const moli = randInt(rng, 1, 6);
        const litri = randInt(rng, 1, 5);
        const m = moli / litri;
        return {
          prompt: "Una soluzione contiene " + moli + " mol di soluto in " + litri + " L di soluzione. Qual è la molarità?",
          value: Math.round(m * 1000) / 1000,
          unit: "mol/L",
          factor: 2,
          decimals: 3,
          explanation: "La molarità è moli/litri = " + moli + "/" + litri + " = " + fmt(Math.round(m * 1000) / 1000) + " mol/L.",
          note: "Errore tipico: moltiplicare moli e litri invece di dividere."
        };
      }
    }),
    area("equilibri", "Equilibri e pH", "calcolo", {
      compute: function (rng) {
        const esp = randInt(rng, 1, 6);
        return {
          prompt: "Una soluzione acquosa ha concentrazione di ioni H⁺ pari a 10⁻" + esp + " mol/L. Qual è il pH?",
          value: esp,
          unit: "",
          factor: 2,
          decimals: 1,
          explanation: "Il pH è l'opposto del logaritmo decimale della concentrazione di H⁺: pH = −log(10⁻" + esp + ") = " + esp + ".",
          note: "Errore tipico: invertire il rapporto con il pOH o usare l'esponente con segno positivo."
        };
      }
    }),
    area("atomo", "Struttura atomica", "calcolo", {
      compute: function (rng) {
        const z = randInt(rng, 3, 20);
        const a = z + randInt(rng, 0, 6);
        return {
          prompt: "Un atomo ha numero atomico Z = " + z + " e numero di massa A = " + a + ". Quanti neutroni contiene il nucleo?",
          value: a - z,
          unit: "neutroni",
          factor: 2,
          decimals: 0,
          explanation: "Il numero di neutroni è A − Z = " + a + " − " + z + " = " + (a - z) + ".",
          note: "Errore tipico: confondere il numero atomico con il numero di neutroni, o sommare invece di sottrarre."
        };
      }
    })
  ]
};

EXAM_AREAS["analisi-matematica"] = {
  name: "Analisi matematica",
  areas: [
    area("limiti", "Limiti e successioni", "calcolo", {
      compute: function (rng) {
        const a = randInt(rng, 1, 6);
        const b = randInt(rng, 1, 6);
        const v = a / b;
        return {
          prompt: "Quanto vale il limite lim(x→∞) (" + a + "x³ + 3x)/(" + b + "x³ − 1)?",
          value: Math.round(v * 1000) / 1000,
          unit: "",
          factor: 2,
          decimals: 3,
          explanation: "Confrontando i termini di grado massimo si ottiene " + a + "/" + b + " = " + fmt(Math.round(v * 1000) / 1000) + ".",
          note: "Errore tipico: confrontare i gradi senza considerare i coefficienti, oppure concludere che il limite è infinito."
        };
      }
    }),
    area("derivate", "Derivate", "regola-caso", {
      cases: [
        function (rng) {
          const n = randInt(rng, 2, 7);
          const a = randInt(rng, 2, 9);
          return {
            prompt: "Qual è la derivata di f(x) = " + a + "x^" + n + "?",
            correct: "f'(x) = " + (a * n) + "x^" + (n - 1),
            distractors: [
              "f'(x) = " + a + "x^" + (n - 1),
              "f'(x) = " + (a * n) + "x^" + n,
              "f'(x) = " + n + "x^" + (a - 1)
            ],
            note: "Errore tipico: dimenticare di decrementare l'esponente o di moltiplicare per il coefficiente."
          };
        }
      ]
    }),
    area("integrali", "Integrali", "calcolo", {
      compute: function (rng) {
        const n = randInt(rng, 1, 4);
        const a = randInt(rng, 1, 6);
        const b = randInt(rng, 2, 8);
        const v = (a / (n + 1)) * Math.pow(b, n + 1);
        return {
          prompt: "Quanto vale l'integrale definito da 0 a " + b + " della funzione f(x) = " + a + "x^" + n + "?",
          value: Math.round(v * 100) / 100,
          unit: "",
          factor: 2,
          decimals: 2,
          explanation: "La primitiva è " + a + "/" + (n + 1) + " · x^" + (n + 1) + "; valutata tra 0 e " + b + " dà " + fmt(Math.round(v * 100) / 100) + ".",
          note: "Errore tipico: dimenticare di dividere per il nuovo esponente nella primitiva."
        };
      }
    }),
    area("serie", "Serie numeriche", "calcolo", {
      compute: function (rng) {
        const r = pick(rng, [0.5, 0.25, 0.2, 0.1]);
        const a = randInt(rng, 1, 5);
        const somma = a / (1 - r);
        return {
          prompt: "Qual è la somma della serie geometrica di primo termine " + a + " e ragione " + r + "?",
          value: Math.round(somma * 100) / 100,
          unit: "",
          factor: 2,
          decimals: 2,
          explanation: "La serie converge perché |r| < 1 e la somma è a/(1 − r) = " + fmt(Math.round(somma * 100) / 100) + ".",
          note: "Errore tipico: usare a/(1 + r) oppure a·r come valore della somma."
        };
      }
    })
  ]
};

/* ---------------- INFORMATICA ---------------- */
EXAM_AREAS["programmazione"] = {
  name: "Programmazione e strutture dati",
  areas: [
    area("complessita", "Complessità algoritmica", "calcolo", {
      compute: function (rng) {
        const n = randInt(rng, 2, 9) * 1000;
        const ops = Math.round(n * Math.log2(n));
        return {
          prompt: "Un algoritmo esegue su n = " + fmt(n) + " elementi un numero di operazioni proporzionale a n·log₂n. Quante operazioni elementari esegue approssimativamente?",
          value: ops,
          unit: "operazioni",
          factor: 2,
          decimals: 0,
          explanation: "n·log₂n con n = " + fmt(n) + " vale circa " + fmt(ops) + " operazioni (complessità O(n log n)).",
          note: "Errore tipico: confondere O(n log n) con O(n²), che differisce di un fattore n."
        };
      }
    }),
    area("strutture", "Strutture dati", "classificazione", {
      classes: [
        { id: "array", label: "array ordinato", members: ["una ricerca binaria con costo O(log n)", "un inserimento ordinato con costo O(n) per lo spostamento"] },
        { id: "lista", label: "lista concatenata", members: ["un accesso all'elemento i-esimo con costo O(n)", "un inserimento in testa con costo O(1)"] },
        { id: "hash", label: "tabella hash", members: ["una ricerca media O(1) con buona funzione di dispersione", "collisioni gestite con concatenamento o indirizzamento aperto"] },
        { id: "coda", label: "coda", members: ["un inserimento in coda con costo O(1)", "un'estrazione dalla testa con costo O(1)"] }
      ]
    }),
    area("ricorsione", "Ricorsione", "calcolo", {
      compute: function (rng) {
        const n = randInt(rng, 4, 10);
        const fib = [0, 1];
        for (let i = 2; i <= n + 1; i++) fib[i] = fib[i - 1] + fib[i - 2];
        const chiamate = 2 * fib[n + 1] - 1;
        return {
          prompt: "Quante chiamate totali effettua una funzione ricorsiva naive che calcola F(" + n + ") senza memoizzazione, con F(0)=0 e F(1)=1?",
          value: chiamate,
          unit: "chiamate",
          factor: 2,
          decimals: 0,
          explanation: "Il numero di chiamate è 2·F(n+1) − 1; con F(" + (n + 1) + ") = " + fib[n + 1] + " si ottiene " + fmt(chiamate) + ".",
          note: "Errore tipico: confondere il valore della funzione con il numero di chiamate che lo producono."
        };
      }
    }),
    area("tipi", "Tipi e memoria", "calcolo", {
      compute: function (rng) {
        const n = randInt(rng, 1, 16);
        const bit = n * 32;
        return {
          prompt: "Un array di " + n + " valori interi a 32 bit occupa quanti bit in memoria, escludendo l'overhead?",
          value: bit,
          unit: "bit",
          factor: 8,
          decimals: 0,
          explanation: "Ogni intero a 32 bit occupa 32 bit: " + n + " × 32 = " + bit + " bit, pari a " + (bit / 8) + " byte.",
          note: "Errore tipico: confondere bit e byte, applicando una conversione non richiesta."
        };
      }
    })
  ]
};

EXAM_AREAS["basi-di-dati"] = {
  name: "Basi di dati",
  areas: [
    area("sql", "SQL", "regola-caso", {
      cases: [
        function () {
          return {
            prompt: "In SQL, quale clausola permette di filtrare i gruppi dopo un raggruppamento, mentre WHERE filtra le righe prima del raggruppamento?",
            correct: "la clausola HAVING",
            distractors: ["la clausola ORDER BY", "la clausola DISTINCT", "la clausola UNION"],
            note: "Errore tipico: usare una funzione di aggregazione nella clausola WHERE."
          };
        }
      ]
    }),
    area("algebra", "Algebra relazionale", "definizione", {
      sets: [
        {
          question: "In algebra relazionale,",
          items: [
            { id: "selezione", label: "la selezione", text: "l'operatore che estrae le righe che soddisfano una condizione, agendo sulle tuple" },
            { id: "proiezione", label: "la proiezione", text: "l'operatore che estrae un sottoinsieme di attributi, eliminando i duplicati nel modello insiemistico" },
            { id: "join", label: "il join naturale", text: "l'operatore che combina le tuple con valori uguali sugli attributi omonimi, eliminando le colonne duplicate" },
            { id: "differenza", label: "la differenza insiemistica", text: "l'operatore che restituisce le tuple della prima relazione non presenti nella seconda, richiedendo compatibilità degli schemi" }
          ]
        }
      ]
    }),
    area("normalizzazione", "Normalizzazione", "conseguenza", {
      consequences: [
        { id: "parziali", cause: "una relazione contiene dipendenze funzionali parziali rispetto alla chiave", effect: "si genera ridondanza, con anomalie di inserimento, aggiornamento e cancellazione" },
        { id: "transitiva", cause: "un attributo non primo dipende transitivamente dalla chiave", effect: "la relazione non è in terza forma normale e deve essere decomposta" },
        { id: "bcnf", cause: "esiste una dipendenza funzionale non banale in cui il determinante non è superchiave", effect: "la relazione viola la forma normale di Boyce-Codd e va decomposta" },
        { id: "decomposizione", cause: "si decompone una relazione conservando dipendenze e proprietà di lossless join", effect: "si preserva l'informazione originaria senza perdita di tuple" }
      ]
    }),
    area("transazioni", "Transazioni", "definizione", {
      sets: [
        {
          question: "Nelle proprietà ACID delle transazioni,",
          items: [
            { id: "atomicita", label: "l'atomicità", text: "la proprietà per cui la transazione è eseguita per intero o per nulla" },
            { id: "coerenza", label: "la coerenza", text: "la proprietà per cui il database passa da uno stato consistente a un altro stato consistente" },
            { id: "isolamento", label: "l'isolamento", text: "la proprietà per cui le transazioni concorrenti non interferiscono tra loro" },
            { id: "durabilita", label: "la durabilità", text: "la proprietà per cui le modifiche confermate sono permanenti anche in caso di guasto" }
          ]
        }
      ]
    })
  ]
};

/* ---------------- ECONOMICA ---------------- */
EXAM_AREAS["economia-politica"] = {
  name: "Economia politica",
  areas: [
    area("domanda-offerta", "Domanda e offerta", "calcolo", {
      compute: function (rng) {
        const a = randInt(rng, 100, 400);
        const b = randInt(rng, 2, 6);
        const c = randInt(rng, 20, 80);
        const d = randInt(rng, 1, 4);
        const q = (a - c) / (b + d);
        return {
          prompt: "In un mercato la domanda è Qd = " + a + " − " + b + "P e l'offerta è Qo = " + c + " + " + d + "P. Qual è la quantità di equilibrio?",
          value: Math.round(q * 100) / 100,
          unit: "unità",
          factor: 2,
          decimals: 2,
          explanation: "All'equilibrio Qd = Qo: " + a + " − " + b + "P = " + c + " + " + d + "P, da cui Q = " + fmt(Math.round(q * 100) / 100) + ".",
          note: "Errore tipico: sottrarre i coefficienti invece di sommarli, invertendo il rapporto tra pendenza e prezzo."
        };
      }
    }),
    area("elasticita", "Elasticità", "calcolo", {
      compute: function (rng) {
        const p = randInt(rng, 10, 40);
        const q = randInt(rng, 100, 500);
        const dp = randInt(rng, 1, 8);
        const dq = randInt(rng, 10, 90);
        const e = (dq / q) / (dp / p);
        return {
          prompt: "Il prezzo passa da " + p + " a " + (p + dp) + " euro e la quantità domandata da " + q + " a " + (q - dq) + " unità. Qual è l'elasticità della domanda rispetto al prezzo, in valore assoluto?",
          value: Math.round(Math.abs(e) * 1000) / 1000,
          unit: "",
          factor: 2,
          decimals: 3,
          explanation: "L'elasticità è il rapporto tra le variazioni percentuali: (" + dq + "/" + q + ") / (" + dp + "/" + p + ") = " + fmt(Math.round(Math.abs(e) * 1000) / 1000) + ".",
          note: "Errore tipico: invertire numeratore e denominatore, dividendo la variazione di prezzo per quella di quantità."
        };
      }
    }),
    area("costi", "Costi di produzione", "calcolo", {
      compute: function (rng) {
        const cf = randInt(rng, 200, 2000);
        const cv = randInt(rng, 5, 40);
        const q = randInt(rng, 20, 200);
        const ct = cf + cv * q;
        return {
          prompt: "Un'impresa ha costi fissi di " + fmt(cf) + " euro e costo variabile unitario di " + cv + " euro. Con una produzione di " + q + " unità, qual è il costo medio totale?",
          value: Math.round((ct / q) * 100) / 100,
          unit: "euro",
          factor: 2,
          decimals: 2,
          explanation: "Il costo totale è " + fmt(cf) + " + " + cv + "·" + q + " = " + fmt(ct) + " euro; il costo medio è CT/q = " + fmt(Math.round((ct / q) * 100) / 100) + " euro.",
          note: "Errore tipico: dimenticare i costi fissi nel totale, o confondere costo medio e costo marginale."
        };
      }
    }),
    area("mercati", "Forme di mercato", "definizione", {
      sets: [
        {
          question: "Nella teoria delle forme di mercato,",
          items: [
            { id: "concorrenza", label: "la concorrenza perfetta", text: "il regime con molte imprese, prodotto omogeneo e libertà di entrata, in cui nel lungo periodo il profitto economico è nullo" },
            { id: "monopolio", label: "il monopolio", text: "il regime con un solo venditore, in cui il ricavo marginale è inferiore al prezzo" },
            { id: "oligopolio", label: "l'oligopolio", text: "il regime con poche imprese interdipendenti, in cui le scelte di ciascuna influenzano le altre" },
            { id: "concorrenza-monopolistica", label: "la concorrenza monopolistica", text: "il regime con molte imprese e prodotti differenziati, in cui ciascuna ha un limitato potere di prezzo" }
          ]
        }
      ]
    }),
    area("macro", "Macroeconomia", "calcolo", {
      compute: function (rng) {
        const c = randInt(rng, 50, 90) / 100;
        const g = randInt(rng, 100, 500) * 10;
        const k = 1 / (1 - c);
        const dy = Math.round(k * g);
        return {
          prompt: "Con propensione marginale al consumo pari a " + c + ", un aumento della spesa pubblica di " + fmt(g) + " euro produce quale variazione del reddito di equilibrio?",
          value: dy,
          unit: "euro",
          factor: 2,
          decimals: 0,
          explanation: "Il moltiplicatore è k = 1/(1 − c) = " + fmt(Math.round(k * 1000) / 1000) + "; la variazione è ΔY = k·ΔG ≈ " + fmt(dy) + " euro.",
          note: "Errore tipico: usare c/(1−c) invece di 1/(1−c), oppure applicare il moltiplicatore in modo additivo."
        };
      }
    })
  ]
};

EXAM_AREAS["economia-aziendale"] = {
  name: "Economia aziendale",
  areas: [
    area("equilibrio", "Equilibrio aziendale", "definizione", {
      sets: [
        {
          question: "Nell'economia aziendale,",
          items: [
            { id: "economico", label: "l'equilibrio economico", text: "la condizione in cui i ricavi coprono i costi e i fattori produttivi ottengono una remunerazione congrua nel tempo" },
            { id: "finanziario", label: "l'equilibrio finanziario", text: "la capacità di far fronte alle uscite con le entrate, con un rapporto sostenibile tra fonti e impieghi" },
            { id: "patrimoniale", label: "l'equilibrio patrimoniale", text: "la coerenza tra impieghi e fonti di finanziamento, con adeguata capitalizzazione" },
            { id: "monetario", label: "l'equilibrio monetario", text: "la coincidenza temporale tra flussi in entrata e in uscita, a prescindere dalla redditività" }
          ]
        }
      ]
    }),
    area("gestione", "Gestione e controllo", "conseguenza", {
      consequences: [
        { id: "scorte", cause: "l'impresa accumula scorte oltre il fabbisogno produttivo", effect: "aumentano i costi di mantenimento e il capitale circolante immobilizzato, con effetto negativo sulla redditività" },
        { id: "disallineamento", cause: "l'impresa finanzia investimenti durevoli con debito a breve termine", effect: "si crea un disallineamento tra fonti e impieghi, con rischio finanziario crescente" },
        { id: "pareggio", cause: "il margine di contribuzione unitario è inferiore ai costi fissi unitari", effect: "il punto di pareggio si colloca a volumi non raggiungibili, con perdita strutturale" },
        { id: "capitale", cause: "il patrimonio netto scende sotto il capitale sociale minimo", effect: "si apre l'obbligo di ricapitalizzazione o trasformazione, con responsabilità degli amministratori" }
      ]
    }),
    area("bilancio", "Bilancio e patrimonio", "calcolo", {
      compute: function (rng) {
        const attivo = randInt(rng, 100, 900) * 1000;
        const passivo = randInt(rng, 50, 400) * 1000;
        const pn = attivo - passivo;
        return {
          prompt: "Un'impresa presenta un totale attività di " + fmt(attivo) + " euro e un totale passività di " + fmt(passivo) + " euro. Qual è il patrimonio netto?",
          value: pn,
          unit: "euro",
          factor: 2,
          decimals: 0,
          explanation: "Il patrimonio netto è dato da attività meno passività: " + fmt(attivo) + " − " + fmt(passivo) + " = " + fmt(pn) + " euro.",
          note: "Errore tipico: sommare passività e patrimonio netto invece di sottrarre le passività dalle attività."
        };
      }
    }),
    area("costi", "Punto di pareggio", "calcolo", {
      compute: function (rng) {
        const cf = randInt(rng, 100, 900) * 10;
        const pv = randInt(rng, 30, 90);
        const cv = randInt(rng, 10, pv - 10);
        const mc = pv - cv;
        const q = Math.ceil(cf / mc);
        return {
          prompt: "Un'impresa ha costi fissi di " + fmt(cf) + " euro, prezzo di vendita unitario di " + pv + " euro e costo variabile unitario di " + cv + " euro. Qual è la quantità di pareggio?",
          value: q,
          unit: "unità",
          factor: 2,
          decimals: 0,
          explanation: "Il punto di pareggio in quantità è CF / (P − CV) = " + fmt(cf) + " / (" + pv + " − " + cv + ") = " + q + " unità.",
          note: "Errore tipico: dividere i costi fissi per il prezzo anziché per il margine di contribuzione unitario."
        };
      }
    }),
    area("partita-doppia", "Rilevazioni contabili", "regola-caso", {
      cases: [
        function (rng) {
          const importo = randInt(rng, 5, 200) * 100;
          const ops = pick(rng, [
            { p: "Un'impresa acquista merci per " + fmt(importo) + " euro a dilazione.", c: "Merci in dare, debiti verso fornitori in avere", w: ["Merci in avere, debiti verso fornitori in dare", "Merci in dare, cassa in avere", "costi in avere, ricavi in dare"] },
            { p: "Un'impresa vende merci per " + fmt(importo) + " euro a dilazione.", c: "crediti verso clienti in dare, ricavi delle vendite in avere", w: ["ricavi in dare, crediti in avere", "cassa in dare, ricavi in avere", "crediti in avere, merci in dare"] },
            { p: "Un'impresa incassa " + fmt(importo) + " euro da un cliente a saldo di un credito.", c: "cassa in dare, crediti verso clienti in avere", w: ["crediti in dare, cassa in avere", "cassa in avere, ricavi in dare", "nessuna rilevazione, essendo un giro di partite"] }
          ]);
          return {
            prompt: ops.p + " Quale rilevazione in partita doppia è corretta?",
            correct: ops.c,
            distractors: ops.w,
            note: "Errore tipico: invertire dare e avere nei debiti e nei crediti, o trattare l'incasso come ricavo."
          };
        }
      ]
    })
  ]
};

/* ---------------- STATISTICA ---------------- */
EXAM_AREAS["statistica"] = {
  name: "Statistica e data science",
  areas: [
    area("descrittiva", "Statistica descrittiva", "calcolo", {
      compute: function (rng) {
        const vals = [];
        for (let i = 0; i < 5; i++) vals.push(randInt(rng, 2, 40));
        const somma = vals.reduce(function (a, b) { return a + b; }, 0);
        const media = somma / vals.length;
        const ord = vals.slice().sort(function (a, b) { return a - b; });
        const useMedia = rng() < 0.5;
        return {
          prompt: useMedia
            ? "Dato l'insieme {" + vals.join(", ") + "}, qual è la media aritmetica?"
            : "Dato l'insieme {" + vals.join(", ") + "}, qual è la mediana?",
          value: useMedia ? Math.round(media * 100) / 100 : ord[2],
          unit: "",
          factor: 2,
          decimals: 2,
          explanation: "La media è " + fmt(Math.round(media * 100) / 100) + "; la serie ordinata è {" + ord.join(", ") + "} e il valore centrale è " + ord[2] + ".",
          note: "Errore tipico: calcolare la mediana sulla serie non ordinata, oppure usare la media al posto della mediana."
        };
      }
    }),
    area("variabilita", "Variabilità", "calcolo", {
      compute: function (rng) {
        const vals = [];
        for (let i = 0; i < 5; i++) vals.push(randInt(rng, 4, 30));
        const somma = vals.reduce(function (a, b) { return a + b; }, 0);
        const media = somma / vals.length;
        let sq = 0;
        for (let i = 0; i < vals.length; i++) sq += Math.pow(vals[i] - media, 2);
        const varianza = sq / vals.length;
        const scarto = Math.sqrt(varianza);
        const useScarto = rng() < 0.5;
        return {
          prompt: useScarto
            ? "Dato l'insieme {" + vals.join(", ") + "}, qual è la deviazione standard con denominatore n?"
            : "Dato l'insieme {" + vals.join(", ") + "}, qual è la varianza con denominatore n?",
          value: Math.round((useScarto ? scarto : varianza) * 100) / 100,
          unit: "",
          factor: 2,
          decimals: 2,
          explanation: "La media è " + fmt(Math.round(media * 100) / 100) + "; la varianza è la media degli scarti al quadrato e la deviazione standard è la sua radice quadrata.",
          note: "Errore tipico: calcolare gli scarti senza elevarli al quadrato, o confondere varianza e deviazione standard."
        };
      }
    }),
    area("probabilita", "Probabilità", "calcolo", {
      compute: function (rng) {
        const n = randInt(rng, 3, 8);
        const p = 1 / Math.pow(2, n);
        return {
          prompt: "Si lancia una moneta equilibrata " + n + " volte. Qual è la probabilità che escano " + n + " teste?",
          value: Math.round(p * 100000) / 100000,
          unit: "",
          factor: 2,
          decimals: 5,
          explanation: "Gli eventi sono indipendenti con probabilità 1/2 ciascuno: la probabilità congiunta è (1/2)^" + n + " = " + fmt(Math.round(p * 100000) / 100000) + ".",
          note: "Errore tipico: sommare le probabilità invece di moltiplicarle, oppure usare 1/n."
        };
      }
    }),
    area("inferenza", "Inferenza statistica", "calcolo", {
      compute: function (rng) {
        const sd = randInt(rng, 2, 20);
        const n = randInt(rng, 25, 400);
        const se = sd / Math.sqrt(n);
        return {
          prompt: "Con deviazione standard pari a " + sd + " e numerosità campionaria " + n + ", qual è l'errore standard della media?",
          value: Math.round(se * 1000) / 1000,
          unit: "",
          factor: 2,
          decimals: 3,
          explanation: "L'errore standard è sd/√n = " + sd + "/√" + n + " = " + fmt(Math.round(se * 1000) / 1000) + ".",
          note: "Errore tipico: dividere per n invece che per la radice quadrata di n."
        };
      }
    })
  ]
};

/* ============================================================
   ALIAS: esami del catalogo che riusano le aree di un esame
   affine, dichiarandolo esplicitamente.
   ============================================================ */
const EXAM_ALIASES = {
  "diritto-costituzionale": ["diritto-pubblico", "istituzioni-di-diritto-pubblico"],
  "diritto-privato": ["istituzioni-di-diritto-privato", "diritto-civile", "diritto-privato-i", "diritto-privato-ii"],
  "statistica": ["statistica-descrittiva", "statistica-i", "statistica-ii", "probabilita-e-statistica", "statistica-sociale", "statistica-psicometrica", "metodologia-della-ricerca-sociale", "metodologia-della-ricerca"],
  "analisi-matematica": ["analisi-matematica-i", "analisi-matematica-ii", "matematica", "matematica-e-statistica", "istituzioni-di-matematica"],
  "programmazione": ["programmazione-i", "programmazione-ii", "programmazione-e-strutture-dati", "fondamenti-di-informatica", "algoritmi-e-strutture-dati", "algoritmi-e-architetture-degli-elaboratori", "ingegneria-del-software", "sistemi-operativi", "informatica-e-programmazione", "informatica-per-la-fisica"],
  "basi-di-dati": ["basi-di-dati-e-sistemi-informativi"],
  "chimica": ["chimica-generale", "chimica-generale-ed-inorganica", "chimica-generale-e-organica", "chimica-organica", "stechiometria", "chimica-e-propedeutica-biochimica", "chimica-analitica-i", "chimica-fisica-i", "chimica-organica-i", "chimica-organica-ii", "chimica-farmaceutica-i", "chimica-farmaceutica-ii", "chimica-degli-alimenti"],
  "biochimica": ["biochimica-e-biologia-molecolare", "biochimica-generale", "biochimica-della-nutrizione", "biochimica-veterinaria", "biologia-molecolare", "chimica-e-biochimica", "biochimica-e-biologia"],
  "anatomia": ["anatomia-umana", "anatomia-umana-i", "anatomia-umana-ii", "anatomia-e-fisiologia", "anatomia-umana-e-istologia", "anatomia-umana-applicata-allo-sport", "anatomia-comparata", "anatomia-veterinaria-i", "anatomia-veterinaria-ii", "anatomia-topografica", "anatomia-patologica", "anatomia-e-istologia", "anatomia-e-fisiologia-animale"],
  "istologia": ["istologia-ed-embriologia", "citologia-ed-istologia", "biologia-cellulare", "istologia", "biologia-generale"],
  "fisiologia": ["fisiologia-umana", "fisiologia", "fisiologia-generale", "fisiologia-della-nutrizione", "neuroscienze", "fisiologia-veterinaria", "fisiologia-animale"],
  "economia-aziendale": ["economia-e-gestione-delle-imprese", "ragioneria-generale", "ragioneria", "programmazione-e-controllo", "finanza-aziendale", "marketing", "economia-ed-estimo-rurale", "economia-della-cultura"],
  "economia-politica": ["microeconomia", "macroeconomia", "politica-economica", "economia-politica", "economia-economia-politica"],
  "psicologia": ["psicologia-generale", "psicologia-dello-sviluppo", "psicometria", "psicologia-sociale", "psicologia-clinica", "psicologia-dell-educazione", "psicologia-del-lavoro", "psicologia-della-comunicazione", "psicologia-dello-sport", "psicologia-forense", "psicopatologia", "psicobiologia", "neuropsicologia", "psicologia-dinamica", "psicologia-economica"],
  "informatica": ["informatica", "informatica-generale", "ricerca-operativa", "calcolo-numerico", "metodi-matematici-per-la-fisica"],
  "fisica-1": ["fisica-i", "fisica-generale-i-meccanica", "fisica", "fisica-generale", "fisica-medica", "fisica-applicata", "fisica-tecnica", "fisica-generale-e-laboratorio", "fisica-dell-ambiente", "fisica-e-chimica"],
  "fisica-2": ["fisica-ii", "fisica-generale-ii-elettromagnetismo", "fisica-tecnica-industriale", "fisica-tecnica-ambientale"],
  "algebra-lineare": ["geometria", "geometria-e-algebra", "algebra-lineare-e-geometria", "algebra-lineare", "algebra"]
};

function buildAreaIndex() {
  const index = {};
  Object.keys(EXAM_AREAS).forEach(function (slug) {
    index[slug] = EXAM_AREAS[slug];
  });
  Object.keys(EXAM_ALIASES).forEach(function (target) {
    const def = EXAM_AREAS[target];
    if (!def) return;
    EXAM_ALIASES[target].forEach(function (a) {
      if (!index[a]) index[a] = { name: def.name, areas: def.areas, aliasOf: target };
    });
  });
  return index;
}

const AREA_INDEX = buildAreaIndex();

/* ============================================================
   API PUBBLICA
   ============================================================ */
function examCoverage(slug) {
  const def = AREA_INDEX[slug];
  const areas = def ? def.areas : [];
  return {
    templates: areas.length,
    areas: def ? def.areas.map(function (a) { return { id: a.id, name: a.name }; }) : [],
    available: areas.length >= MIN_AREAS,
    minRequired: MIN_AREAS,
    aliasOf: def && def.aliasOf ? def.aliasOf : null
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

function buildQuestion(rng, areaDef, slug, prevKind) {
  const gen = GENERATORS[areaDef.kind];
  if (!gen) return null;
  if (prevKind && areaDef.kind === prevKind) return null;

  const built = gen(rng, areaDef.spec || {});
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
  const correctObj = options.filter(function (o) { return o.correct; })[0];
  const correctIndex = mixed.indexOf(correctObj);

  return {
    areaId: areaDef.id,
    areaName: areaDef.name,
    kind: areaDef.kind,
    examName: AREA_INDEX[slug].name,
    prompt: built.prompt,
    options: mixed.map(function (o) { return o.text; }),
    correctIndex: correctIndex,
    correct_answer: mixed[correctIndex].text,
    distractors: mixed.filter(function (o, i) { return i !== correctIndex; }).map(function (o) { return o.text; }),
    explanation: built.explanation || null,
    errorNote: built.errorNote || null,
    distractorNotes: distractorNotes
  };
}

function generateSession(slug, seed) {
  const def = AREA_INDEX[slug];

  if (!def || def.areas.length < MIN_AREAS) {
    return {
      ok: false,
      reason: "coverage",
      examSlug: slug,
      coverage: def ? def.areas.length : 0,
      minRequired: MIN_AREAS
    };
  }

  const rng = createRng(seed);

  const areaIds = shuffleFisherYates(rng, def.areas.map(function (a) { return a.id; }));
  const areaById = {};
  def.areas.forEach(function (a) { areaById[a.id] = a; });
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
        const candidate = buildQuestion(rng, areaDef, slug, prevKind);

        if (!candidate) { repeatsDiscarded++; continue; }
        if (seenPrompts[candidate.prompt]) { repeatsDiscarded++; continue; }
        if (prevKind && candidate.kind === prevKind) { repeatsDiscarded++; continue; }

        seenPrompts[candidate.prompt] = true;
        placed = candidate;
      }

      if (!placed) {
        const prevKind = questions.length ? questions[questions.length - 1].kind : null;
        let alt = null;
        for (let k = 0; k < def.areas.length; k++) {
          const a = def.areas[k];
          if (a.kind !== prevKind && !usedAreaCount[a.id]) { alt = a; break; }
        }
        if (!alt) {
          for (let k = 0; k < def.areas.length; k++) {
            const a = def.areas[k];
            if (a.kind !== prevKind) { alt = a; break; }
          }
        }
        if (alt) {
          const retry = buildQuestion(rng, alt, slug, prevKind);
          if (retry && !seenPrompts[retry.prompt]) {
            seenPrompts[retry.prompt] = true;
            placed = retry;
          }
        }
      }

      if (placed) {
        usedAreaCount[placed.areaId] = (usedAreaCount[placed.areaId] || 0) + 1;
        questions.push({
          id: slug + "-q" + (questions.length + 1),
          category: "Categoria " + (questions.length + 1) + " — " + placed.areaName,
          areaId: placed.areaId,
          areaName: placed.areaName,
          kind: placed.kind,
          examName: placed.examName,
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
    return { ok: false, reason: "generation", examSlug: slug, generated: questions.length };
  }

  return {
    ok: true,
    examSlug: slug,
    examName: def.name,
    aliasOf: def.aliasOf || null,
    seed: seed,
    total: QUESTIONS_PER_SESSION,
    questions: questions,
    areaCount: Object.keys(usedAreaCount).length,
    repeatsDiscarded: repeatsDiscarded,
    distribution: usedAreaCount
  };
}

function gradeSession(session, answers) {
  let score = 0;
  const detail = session.questions.map(function (q, i) {
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
  detail.forEach(function (d) { if (areaNames.indexOf(d.area) < 0) areaNames.push(d.area); });

  return {
    score: score,
    total: session.total,
    percentage: Math.round((score / session.total) * 100),
    detail: detail,
    byArea: areaNames.map(function (a) {
      const items = detail.filter(function (d) { return d.area === a; });
      return { area: a, correct: items.filter(function (d) { return d.correct; }).length, total: items.length };
    })
  };
}

function variantEstimate(slug) {
  const cov = examCoverage(slug);
  if (!cov.available) return 0;
  return Math.round(Math.pow(cov.templates * 60, 1.4));
}

export {
  QUESTIONS_PER_SESSION,
  MIN_AREAS,
  GENERATORS,
  EXAM_AREAS,
  AREA_INDEX,
  createRng,
  shuffleFisherYates,
  examCoverage,
  planDistribution,
  generateSession,
  gradeSession,
  variantEstimate
};
