/* ============================================================
   Quizmind — Aree per anatomia, istologia e materie di base
   ------------------------------------------------------------
   Chiude il catalogo delle materie coperte dal motore
   parametrico. Ogni materia ha quattro macro-aree reali.
   ============================================================ */

import { AREA_INDEX, randInt, fmt, pick } from "./engine.js";

function area(id, name, kind, spec) {
  return { id: id, name: name, kind: kind, spec: spec };
}

function caso(prompt, correct, distractors, note) {
  return function () {
    return { prompt: prompt, correct: correct, distractors: distractors, note: note };
  };
}

/* ---------------- ANATOMIA ---------------- */
AREA_INDEX["anatomia"] = {
  name: "Anatomia umana",
  areas: [
    area("scheletro", "Apparato scheletrico", "calcolo", {
      compute: function (rng) {
        const tipi = [
          { t: "cervicali", v: 7 },
          { t: "toraciche", v: 12 },
          { t: "lombari", v: 5 },
          { t: "sacrali", v: 5 }
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
      sets: [{
        question: "Nell'apparato muscolare e nei tessuti connettivi,",
        items: [
          { id: "tendine", label: "il tendine", text: "la struttura di tessuto connettivo fibroso denso che connette il muscolo all'osso" },
          { id: "legamento", label: "il legamento", text: "la struttura che connette tra loro due ossa, stabilizzando l'articolazione" },
          { id: "cartilagine", label: "la cartilagine articolare", text: "il rivestimento che riduce l'attrito tra le superfici ossee dell'articolazione" },
          { id: "fascia", label: "la fascia", text: "la lamina di tessuto connettivo che avvolge e separa i gruppi muscolari" }
        ]
      }]
    }),
    area("circolazione", "Apparato cardiovascolare", "conseguenza", {
      consequences: [
        { id: "aorta", cause: "il ventricolo sinistro si contrae", effect: "il sangue ossigenato viene immesso nell'aorta e distribuito alla circolazione sistemica" },
        { id: "polmonare", cause: "il ventricolo destro si contrae", effect: "il sangue deossigenato e inviato alla circolazione polmonare attraverso l'arteria polmonare" },
        { id: "valvole", cause: "la pressione ventricolare supera quella atriale durante la sistole", effect: "le valvole atrioventricolari si chiudono impedendo il reflusso verso gli atri" },
        { id: "coronarie", cause: "le arterie coronarie si occludono parzialmente", effect: "si riduce l'apporto di ossigeno al miocardio, con rischio di ischemia" }
      ]
    }),
    area("respirazione", "Apparato respiratorio", "calcolo", {
      compute: function (rng) {
        const freq = randInt(rng, 10, 24);
        const vol = randInt(rng, 350, 600);
        return {
          prompt: "Un soggetto ha frequenza respiratoria di " + freq + " atti al minuto e volume corrente di " + vol + " mL. Qual e la ventilazione al minuto in mL?",
          value: freq * vol,
          unit: "mL/min",
          factor: 2,
          decimals: 0,
          explanation: "La ventilazione al minuto e frequenza x volume corrente = " + freq + " x " + vol + " = " + fmt(freq * vol) + " mL/min.",
          note: "Errore tipico: sommare frequenza e volume invece di moltiplicarli."
        };
      }
    })
  ]
};

/* ---------------- ISTOLOGIA ---------------- */
AREA_INDEX["istologia"] = {
  name: "Istologia",
  areas: [
    area("epiteliale", "Tessuto epiteliale", "definizione", {
      sets: [{
        question: "Nell'istologia dei tessuti epiteliali,",
        items: [
          { id: "pavimentoso", label: "l'epitelio pavimentoso semplice", text: "l'epitelio di un solo strato di cellule appiattite, presente negli alveoli polmonari dove facilita la diffusione" },
          { id: "cubico", label: "l'epitelio cubico semplice", text: "l'epitelio di cellule cuboidali, tipico dei tubuli renali e dei dotti ghiandolari" },
          { id: "stratificato", label: "l'epitelio pavimentoso stratificato", text: "l'epitelio pluristratificato con cellule superficiali appiattite, adatto a resistere all'abrasione come nell'epidermide" },
          { id: "ciliato", label: "l'epitelio cilindrico ciliato", text: "l'epitelio di cellule alte dotate di ciglia, presente nelle vie respiratorie per il trasporto del muco" }
        ]
      }]
    }),
    area("connettivo", "Tessuto connettivo", "classificazione", {
      classes: [
        { id: "proprio", label: "connettivo propriamente detto", members: ["il tessuto connettivo lasso", "il tessuto connettivo denso"] },
        { id: "sostegno", label: "connettivo di sostegno", members: ["il tessuto cartilagineo", "il tessuto osseo"] },
        { id: "trofico", label: "connettivo a funzione trofica", members: ["il sangue", "il tessuto adiposo"] },
        { id: "reticolare", label: "connettivo reticolare", members: ["lo stroma degli organi linfoidi"] }
      ]
    }),
    area("muscolare", "Tessuto muscolare", "regola-caso", {
      cases: [
        caso(
          "Quale caratteristica distingue il tessuto muscolare cardiaco dal muscolo scheletrico?",
          "le cellule cardiache sono mononucleate e unite da dischi intercalari che consentono la contrazione sincrona",
          [
            "le cellule cardiache sono plurinucleate e prive di striature",
            "il muscolo cardiaco e volontario mentre lo scheletrico e involontario",
            "il muscolo cardiaco non contiene actina ne miosina"
          ],
          "Errore tipico: attribuire al tessuto cardiaco la plurinucleazione propria del muscolo scheletrico."
        )
      ]
    }),
    area("nervoso", "Tessuto nervoso", "conseguenza", {
      consequences: [
        { id: "mielina", cause: "l'assone di un neurone e rivestito da guaina mielinica", effect: "la conduzione dello stimolo diventa saltatoria e piu rapida rispetto a un assone amielinico" },
        { id: "sinapsi", cause: "il potenziale d'azione raggiunge il terminale assonico", effect: "si liberano neurotrasmettitori nello spazio sinaptico, trasmettendo il segnale al neurone postsinaptico" },
        { id: "glia", cause: "le cellule gliali svolgono funzioni di supporto e isolamento", effect: "garantiscono il microambiente dei neuroni, con astrociti, oligodendrociti e cellule di Schwann" },
        { id: "lesione", cause: "il corpo cellulare del neurone subisce una lesione irreversibile", effect: "il neurone degenera, non essendo possibile la rigenerazione nel sistema nervoso centrale" }
      ]
    })
  ]
};

/* ---------------- ISTITUZIONI DI DIRITTO ROMANO ---------------- */
AREA_INDEX["istituzioni-di-diritto-romano"] = {
  name: "Istituzioni di diritto romano",
  areas: [
    area("persone", "Persone e famiglia", "classificazione", {
      classes: [
        { id: "liberi", label: "uomini liberi", members: ["il cittadino romano", "il latino", "il peregrino"] },
        { id: "servi", label: "servi", members: ["lo schiavo, che e oggetto di diritto e non soggetto"] },
        { id: "alieni", label: "alieni iuris", members: ["il figlio sottoposto alla patria potesta", "la moglie in manu"] },
        { id: "sui", label: "sui iuris", members: ["il pater familias", "il soggetto non sottoposto ad alcuna potesta"] }
      ]
    }),
    area("cose", "Cose e diritti reali", "definizione", {
      sets: [{
        question: "Nel diritto delle cose romano,",
        items: [
          { id: "mancipio", label: "le res mancipi", text: "i beni di maggior valore per l'economia arcaica, come fondi italici, schiavi e animali da tiro" },
          { id: "nec", label: "le res nec mancipi", text: "i beni trasferibili con la semplice traditio, come il denaro e i beni mobili di scarso valore" },
          { id: "incorporali", label: "le res incorporales", text: "le entita non percepibili con i sensi, come l'usufrutto e le servitu" },
          { id: "divini", label: "le res divini iuris", text: "le cose sottratte al commercio per la loro destinazione religiosa, come i sepolcri" }
        ]
      }]
    }),
    area("proprieta", "Proprieta e possesso", "regola-caso", {
      cases: [
        caso(
          "In che cosa consiste l'usucapione nel diritto romano?",
          "nell'acquisto della proprieta per il possesso continuato del bene per il tempo stabilito dalla legge",
          [
            "nell'acquisto della proprieta per semplice accordo tra le parti",
            "nella perdita della proprieta per il mancato uso del bene",
            "nel trasferimento della proprieta mediante atto pubblico"
          ],
          "Errore tipico: confondere l'usucapione con la traditio o con la prescrizione estintiva."
        )
      ]
    }),
    area("obbligazioni", "Obbligazioni e contratti", "conseguenza", {
      consequences: [
        { id: "mutuo", cause: "si conclude un mutuo con la consegna di una somma di denaro", effect: "il mutuatario deve restituire l'equivalente, sorgendo un'obbligazione re contracta" },
        { id: "compravendita", cause: "si conclude una compravendita con il consenso delle parti", effect: "sorgono le obbligazioni del venditore e del compratore, con trasferimento del possesso" },
        { id: "stipulatio", cause: "si pronuncia la formula solenne della stipulatio", effect: "nasce l'obbligazione verbale, vincolante per chi ha risposto in modo conforme" },
        { id: "delitto", cause: "si commette un furto o un danneggiamento ingiusto", effect: "sorge l'obbligazione da delitto, con l'obbligo di pagare una pena pecuniaria" }
      ]
    })
  ]
};

export { area, caso };
