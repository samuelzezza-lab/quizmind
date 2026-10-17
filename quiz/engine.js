
/* ============================================================
   AREE SPECIFICHE PER MATERIA (base)
   ------------------------------------------------------------
   Gli altri esami arrivano dai moduli quiz/aree-*.js,
   registrati tramite quiz-ponte.js dentro buildAreaIndex().
   ============================================================ */
const EXAM_AREAS = {};

function area(id, name, kind, spec) {
  return { id: id, name: name, kind: kind, spec: spec };
}

/* ---------------- DIRITTO COSTITUZIONALE ---------------- */
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

/* ---------------- DIRITTO PRIVATO ---------------- */
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
          explanation: "Con " + figli + " figli e il coniuge, ai figli spetta " + (figli === 1 ? "1/2" : figli === 2 ? "1/3" : "1/4") + " del patrimonio.",
          note: "Errore tipico: attribuire ai figli la quota del coniuge, che con un solo figlio è pari a 1/2."
        };
      }
    })
  ]
};
