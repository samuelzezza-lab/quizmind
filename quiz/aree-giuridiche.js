/* ============================================================
   Quizmind — Aree giuridiche (blocco 1)
   ------------------------------------------------------------
   Esami con aree proprie. Ogni esame dichiara 4-5 aree del
   proprio programma; ogni area porta 3 casi parametrici con
   risposta corretta, tre distrattori e la nota sull'errore
   tipico dello studente.

   Il motore qui non usa i kind astratti di engine.js: ogni caso
   è una funzione che riceve l'RNG e restituisce prompt,
   correct, distractors e note. L'adattatore in school-*
   o engine-coverage.js li converte nel formato atteso.
   ============================================================ */

const AREE_GIURIDICHE = {};

function areaC(id, name, cases) {
  return { id: id, name: name, kind: "regola-caso", cases: cases };
}

/* ------------------------------------------------------------
   DIRITTO DEL LAVORO — 5 aree
   ------------------------------------------------------------ */
AREE_GIURIDICHE["diritto-del-lavoro"] = {
  name: "Diritto del lavoro",
  areas: [
    areaC("fonti", "Fonti e principi", [
      function () {
        return {
          prompt: "Nel rapporto di lavoro subordinato, l'art. 2094 del codice civile individua quale elemento caratterizzante:",
          correct: "la subordinazione, ossia l'assoggettamento del lavoratore al potere direttivo del datore di lavoro",
          distractors: [
            "l'iscrizione obbligatoria a un sindacato di categoria",
            "la durata contrattuale non inferiore a un anno",
            "lo svolgimento della prestazione nei locali dell'impresa"
          ],
          note: "Errore tipico: collocare la subordinazione nella modalità della prestazione anziché nel vincolo di soggezione al potere direttivo."
        };
      },
      function () {
        return {
          prompt: "Il principio di inderogabilità della norma lavoristica comporta che:",
          correct: "le clausole peggiorative rispetto alla norma di legge sono sostituite di diritto dalla norma inderogabile",
          distractors: [
            "il contratto individuale prevale sempre sul contratto collettivo",
            "il lavoratore può rinunciare ai propri diritti con atto scritto",
            "la norma inderogabile si applica ai soli contratti a tempo indeterminato"
          ],
          note: "Errore tipico: ritenere possibile la rinuncia a diritti derivanti da norme inderogabili."
        };
      },
      function () {
        return {
          prompt: "Il contratto collettivo nazionale di lavoro, nel sistema vigente, spiega efficacia verso i non iscritti:",
          correct: "attraverso l'estensione giurisprudenziale della retribuzione sufficiente ex art. 36 Cost. e l'uso della parte normativa come parametro",
          distractors: [
            "in forza di un'efficacia generale erga omnes stabilita dalla Costituzione",
            "per effetto di un decreto ministeriale di estensione rinnovato ogni anno",
            "soltanto se ratificato con referendum dai lavoratori interessati"
          ],
          note: "Errore tipico: attribuire al contratto collettivo un'efficacia generale che nel sistema vigente non possiede."
        };
      }
    ]),

    areaC("rapporto", "Costituzione e svolgimento del rapporto", [
      function () {
        return {
          prompt: "Il contratto a tempo determinato richiede l'indicazione della causale:",
          correct: "quando è stipulato oltre i limiti di durata previsti dalla legge, con esigenze organizzative specificamente individuate nel contratto",
          distractors: [
            "mai, perché la causale è in ogni caso facoltativa",
            "solo per i contratti stipulati con lavoratori extracomunitari",
            "solo dopo il superamento dei ventiquattro mesi complessivi"
          ],
          note: "Errore tipico: ritenere la causale sempre facoltativa, ignorando i limiti di durata che la rendono obbligatoria."
        };
      },
      function () {
        return {
          prompt: "Il patto di prova nel rapporto di lavoro deve risultare:",
          correct: "da atto scritto con indicazione della durata, e durante il periodo ciascuna parte può recedere liberamente senza preavviso",
          distractors: [
            "da accordo verbale, valido per la durata massima di sei mesi",
            "da comunicazione al centro per l'impiego, senza forma scritta fra le parti",
            "da atto scritto, ma il recesso richiede comunque il preavviso ordinario"
          ],
          note: "Errore tipico: confondere il recesso in prova, libero, con il recesso ordinario soggetto a preavviso."
        };
      },
      function () {
        return {
          prompt: "Le ore lavorate oltre l'orario normale settimanale:",
          correct: "costituiscono lavoro straordinario, ammesso entro i limiti di legge e retribuito con la maggiorazione prevista",
          distractors: [
            "sono sempre vietate e comportano la nullità del contratto",
            "sono compensate esclusivamente con riposi, senza scelta del lavoratore",
            "sono ammesse senza alcun limite se il lavoratore presta consenso"
          ],
          note: "Errore tipico: ritenere il lavoro straordinario liberamente prorogabile in assenza di limiti."
        };
      }
    ]),

    areaC("estinzione", "Estinzione del rapporto", [
      function () {
        return {
          prompt: "Il licenziamento del lavoratore assunto a tempo indeterminato deve essere:",
          correct: "comunicato per iscritto con l'indicazione dei motivi, ed è impugnabile nei termini di decadenza previsti",
          distractors: [
            "comunicato verbalmente, con effetto immediato e senza obbligo di motivazione",
            "preceduto da autorizzazione dell'ispettorato territoriale del lavoro",
            "approvato con accordo sindacale a pena di nullità"
          ],
          note: "Errore tipico: ritenere sufficiente la comunicazione verbale, mentre la legge esige forma scritta e motivazione."
        };
      },
      function () {
        return {
          prompt: "Il licenziamento per giusta causa si fonda su:",
          correct: "un inadempimento talmente grave da non consentire la prosecuzione del rapporto, neppure in via provvisoria",
          distractors: [
            "un inadempimento di scarsa importanza valutato secondo criteri soggettivi",
            "un motivo economico legato alla riorganizzazione aziendale",
            "il superamento del periodo di comporto per malattia"
          ],
          note: "Errore tipico: confondere la giusta causa, che impedisce la prosecuzione, con il giustificato motivo."
        };
      },
      function () {
        return {
          prompt: "Nel licenziamento per giustificato motivo oggettivo, l'onere della prova:",
          correct: "grava sul datore di lavoro, che deve dimostrare le ragioni inerenti all'attività produttiva e l'impossibilità di ricollocare il lavoratore",
          distractors: [
            "grava sul lavoratore, che deve provare l'insussistenza del motivo",
            "è ripartito in parti uguali fra le parti del rapporto",
            "non è richiesto, essendo il motivo oggettivo insindacabile dal giudice"
          ],
          note: "Errore tipico: ritenere insindacabile il motivo oggettivo, o invertire l'onere probatorio."
        };
      }
    ]),

    areaC("tutele", "Tutele e garanzie", [
      function () {
        return {
          prompt: "Il licenziamento privo di giustificazione comporta, come regola generale nel regime delle tutele crescenti:",
          correct: "un'indennità risarcitoria commisurata all'anzianità di servizio, con reintegrazione nei casi di nullità previsti dalla legge",
          distractors: [
            "la reintegrazione in ogni caso, con risarcimento pari a dodici mensilità",
            "la nullità del licenziamento senza alcun indennizzo",
            "la conversione automatica del rapporto in contratto a termine"
          ],
          note: "Errore tipico: considerare la reintegrazione la regola generale, mentre è circoscritta ai casi di nullità."
        };
      },
      function () {
        return {
          prompt: "L'impugnazione stragiudiziale del licenziamento deve avvenire entro il termine di decadenza di sessanta giorni:",
          correct: "decorrenti dalla comunicazione del licenziamento, con successiva impugnazione giudiziale nei termini previsti",
          distractors: [
            "decorrenti dalla data di assunzione del lavoratore",
            "decorrenti dalla cessazione effettiva del rapporto, prorogabili senza limiti",
            "sostituiti dal termine ordinario di prescrizione decennale"
          ],
          note: "Errore tipico: far decorrere la decadenza da un momento diverso dalla comunicazione del licenziamento."
        };
      },
      function () {
        return {
          prompt: "La tutela contro le discriminazioni nel rapporto di lavoro si fonda su:",
          correct: "il divieto di trattamenti differenziati per sesso, origine, religione, opinioni politiche e condizioni personali e sociali",
          distractors: [
            "il divieto limitato alle sole discriminazioni di genere",
            "il principio di libertà assoluta del datore nella scelta dei criteri",
            "una tutela operante soltanto nei rapporti a tempo indeterminato"
          ],
          note: "Errore tipico: circoscrivere il divieto alla sola discriminazione di genere."
        };
      }
    ]),

    areaC("sindacale", "Diritto sindacale", [
      function () {
        return {
          prompt: "La libertà sindacale riconosciuta dall'art. 39 della Costituzione comporta:",
          correct: "il diritto di costituire associazioni sindacali e di aderirvi, con libertà di scelta e senza autorizzazione",
          distractors: [
            "l'obbligo di iscrizione a un sindacato riconosciuto dallo Stato",
            "il divieto di costituire più sindacati per la stessa categoria",
            "l'obbligo di registrazione del sindacato presso il tribunale"
          ],
          note: "Errore tipico: confondere la libertà sindacale con un sistema di riconoscimento obbligatorio."
        };
      },
      function () {
        return {
          prompt: "Il diritto di sciopero, nel sistema costituzionale:",
          correct: "è esercitabile nei limiti delle leggi che lo regolano, con preavviso e prestazioni indispensabili nei servizi pubblici essenziali",
          distractors: [
            "costituisce reato, salvo autorizzazione preventiva del sindacato",
            "è libero senza alcun limite anche nei servizi pubblici essenziali",
            "è riconosciuto ai soli lavoratori del settore privato"
          ],
          note: "Errore tipico: ritenere lo sciopero privo di limiti nei servizi pubblici essenziali."
        };
      },
      function () {
        return {
          prompt: "La rappresentanza sindacale unitaria costituita in azienda:",
          correct: "è l'organismo eletto dai lavoratori con cui il datore negozia a livello aziendale",
          distractors: [
            "è nominata dal datore di lavoro fra i dipendenti",
            "coincide con le organizzazioni sindacali provinciali di categoria",
            "è prevista soltanto nelle imprese con oltre mille dipendenti"
          ],
          note: "Errore tipico: confondere l'organismo di rappresentanza dei lavoratori con una struttura datoriale."
        };
      }
    ])
  ]
};

export { AREE_GIURIDICHE, areaC };
