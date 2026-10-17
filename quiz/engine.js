
/* ============================================================
   AREE SPECIFICHE PER MATERIA (base)
   ------------------------------------------------------------
   Gli altri esami arrivano dai moduli quiz/aree-*.js, registrati
   tramite quiz-ponte.js dentro buildAreaIndex().
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
