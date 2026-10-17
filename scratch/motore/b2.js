        { id: "legittimita", cause: "il giudice solleva questione di legittimita costituzionale rilevante e non manifestamente infondata", effect: "la Corte giudica nel merito e dichiara l'illegittimita con effetti erga omnes" },
        { id: "ricorso", cause: "lo Stato impugna una legge regionale per incompetenza", effect: "la Corte decide sul ricorso in via principale entro il termine previsto" },
        { id: "sentenza", cause: "la Corte emette una sentenza di accoglimento", effect: "la norma cessa di avere efficacia dal giorno successivo alla pubblicazione" }
      ]
    })
  ]
};

/* ============================================================
   Aree di diritto privato e penale
   ============================================================ */

EXAM_AREAS["diritto-privato"] = {
  name: "Diritto privato",
  areas: [
    area("prescrizione", "Prescrizione e decadenza", "regola-caso", {
      cases: [
        function () {
          return {
            prompt: "Qual e il termine ordinario di prescrizione previsto dal codice civile?",
            correct: "dieci anni, salvo i casi in cui la legge stabilisce un termine diverso",
            distractors: [
              "due anni, perche si tratta di un diritto di credito",
              "cinque anni, termine previsto per le azioni di annullamento",
              "venti anni, termine di prescrizione piu lungo ammesso"
            ],
            note: "Errore tipico: confondere il termine ordinario con quelli speciali."
          };
        },
        function () {
          return {
            prompt: "Quali diritti sono imprescrittibili per loro natura?",
            correct: "i diritti indisponibili e i diritti della personalita, che non si estinguono per il non uso",
            distractors: [
              "i diritti di credito, che si estinguono dopo dieci anni",
              "i diritti reali minori, che si perdono per non uso ventennale",
              "tutti i diritti patrimoniali, senza distinzione"
            ],
            note: "Errore tipico: applicare la prescrizione indistintamente a ogni diritto."
          };
        }
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
        function () {
          return {
            prompt: "Qual e la conseguenza della mancanza di un requisito essenziale del contratto?",
            correct: "il contratto e nullo, e la nullita puo essere rilevata anche d'ufficio dal giudice",
            distractors: [
              "il contratto e annullabile su richiesta della parte interessata",
              "il contratto produce effetti fino alla sua risoluzione",
              "il contratto e valido ma inefficace nei confronti dei terzi"
            ],
            note: "Errore tipico: confondere annullabilita e nullita."
          };
        },
        function () {
          return {
            prompt: "Che differenza c'e tra nullita e annullabilita del contratto?",
            correct: "la nullita opera di diritto e puo essere rilevata d'ufficio; l'annullabilita e disposta solo su domanda della parte legittimata",
            distractors: [
              "la nullita richiede sempre il passaggio in giudicato, l'annullabilita e automatica",
              "sono sinonimi, cambia solo il termine usato dal codice",
              "la nullita e sempre sanabile, l'annullabilita mai"
            ],
            note: "Errore tipico: usare i due istituti come equivalenti."
          };
        }
      ]
    })
  ]
};

EXAM_AREAS["diritto-penale"] = {
  name: "Diritto penale",
  areas: [
    area("principi", "Principi e legalita", "regola-caso", {
      cases: [
        function () {
          return {
            prompt: "Che cosa impone il principio di legalita in materia penale?",
            correct: "che nessuno possa essere punito se non in forza di una legge entrata in vigore prima del fatto commesso",
            distractors: [
              "che la pena sia sempre proporzionata al danno cagionato",
              "che il giudice possa estendere la norma per analogia a casi simili",
              "che le norme penali si applichino anche ai fatti anteriori alla loro entrata in vigore"
            ],
            note: "Errore tipico: ritenere ammessa l'analogia in materia penale."
          };
        },
        function () {
          return {
            prompt: "Come si applica una norma penale piu favorevole intervenuta dopo il fatto?",
            correct: "si applica retroattivamente, perche la legge piu favorevole prevale anche se intervenuta dopo il fatto",
            distractors: [
              "si applica sempre la legge vigente al momento del fatto",
              "si applica la legge piu grave, per garantire l'efficacia deterrente",
              "l'applicazione e rimessa alla discrezionalita del giudice"
            ],
            note: "Errore tipico: applicare l'irretroattivita anche alla legge piu favorevole."
          };
        }
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
        function () {
          return {
            prompt: "Quando il reato e tentato?",
            correct: "quando l'azione e idonea e diretta in modo non equivoco a commettere il delitto, che non si compie",
            distractors: [
              "quando l'agente ha soltanto manifestato l'intenzione di commettere il reato",
              "quando il reato si compie ma senza danno per la vittima",
              "quando l'agente si pente prima di essere scoperto"
            ],
            note: "Errore tipico: far coincidere il tentativo con gli atti preparatori."
          };
        }
      ]
    })
  ]
};

/* ============================================================
   Aree biomediche
   ============================================================ */

EXAM_AREAS["biochimica"] = {
  name: "Biochimica",
  areas: [
    area("enzimi", "Enzimi e cinetica", "definizione", {
      sets: [{
        question: "Nella cinetica enzimatica,",
        items: [
          { id: "km", label: "la costante Km", text: "la concentrazione di substrato alla quale la velocita di reazione e pari alla meta della velocita massima" },
          { id: "vmax", label: "la Vmax", text: "la velocita massima raggiunta quando l'enzima e saturato dal substrato" },
          { id: "kcat", label: "il numero di turnover", text: "il numero di molecole di substrato convertite per unita di tempo da una singola molecola di enzima saturata" },
          { id: "competitivo", label: "l'inibitore competitivo", text: "la molecola che si lega al sito attivo aumentando la Km apparente senza modificare la Vmax" }
        ]
      }]
    }),
    area("metabolismo", "Metabolismo energetico", "calcolo", {
      compute: function (rng) {
        const glucosio = randInt(rng, 2, 12);
        return {
          prompt: "Considerando una resa di 30 molecole di ATP per molecola di glucosio ossidata completamente, quante moli di ATP si producono da " + glucosio + " moli di glucosio?",
          value: glucosio * 30,
          unit: "mol di ATP",
          factor: 2,
          decimals: 0,
          explanation: "Ogni molecola di glucosio rende circa 30 ATP: " + glucosio + " x 30 = " + (glucosio * 30) + " mol.",
          note: "Errore tipico: usare la sola resa della glicolisi, dimenticando il ciclo di Krebs."
        };
      }
    }),
    area("glicolisi", "Glicolisi e gluconeogenesi", "conseguenza", {
      consequences: [
        { id: "netto", cause: "una molecola di glucosio e degradata lungo la glicolisi", effect: "si ottengono 2 molecole di piruvato con un guadagno netto di 2 ATP e 2 NADH" },
        { id: "carenza", cause: "l'apporto di glucosio si riduce drasticamente", effect: "si attivano gluconeogenesi e chetogenesi, con produzione di corpi chetonici" },
        { id: "pfk", cause: "la fosfofruttochinasi-1 e inibita da elevate concentrazioni di ATP", effect: "la glicolisi rallenta per regolazione a feedback negativo" },
        { id: "ossigeno", cause: "l'ossigeno e disponibile in quantita sufficiente", effect: "il piruvato entra nel mitocondrio e viene decarbossilato ad acetil-CoA" }
      ]
    }),
    area("lipidi", "Lipidi e beta-ossidazione", "calcolo", {
      compute: function (rng) {
        const atomi = randInt(rng, 10, 18);
        return {
          prompt: "Quanti cicli di beta-ossidazione servono per degradare completamente un acido grasso saturo di " + atomi + " atomi di carbonio?",
          value: atomi / 2 - 1,
          unit: "cicli",
          factor: 2,
          decimals: 0,
          explanation: "Per un acido grasso saturo di n atomi servono n/2 - 1 cicli: " + atomi + "/2 - 1 = " + (atomi / 2 - 1) + ".",
          note: "Errore tipico: usare n/2 cicli, dimenticando che l'ultimo passaggio produce due acetil-CoA."
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
        return {
          prompt: "Un soggetto ha frequenza cardiaca di " + fc + " battiti al minuto e gittata sistolica di " + gs + " mL. Qual e la portata cardiaca in mL/min?",
          value: fc * gs,
          unit: "mL/min",
          factor: 2,
          decimals: 0,
          explanation: "La portata cardiaca e frequenza x gittata sistolica = " + fc + " x " + gs + " = " + fmt(fc * gs) + " mL/min.",
          note: "Errore tipico: sommare frequenza e gittata invece di moltiplicarle."
        };
      }
    }),
    area("respiratoria", "Fisiologia respiratoria", "calcolo", {
      compute: function (rng) {
        const vc = randInt(rng, 400, 700);
        const spazio = randInt(rng, 120, 160);
        return {
          prompt: "Con volume corrente di " + vc + " mL e spazio morto di " + spazio + " mL, qual e la ventilazione alveolare per atto respiratorio?",
          value: vc - spazio,
          unit: "mL",
          factor: 2,
          decimals: 0,
          explanation: "La ventilazione alveolare e volume corrente meno spazio morto: " + vc + " - " + spazio + " = " + (vc - spazio) + " mL.",
          note: "Errore tipico: sommare spazio morto e volume corrente invece di sottrarre."
        };
      }
    })
  ]
};
