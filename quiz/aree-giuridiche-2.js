/* ============================================================
   Quizmind — Aree giuridiche, parte 2
   ------------------------------------------------------------
   Formato pieno: 5 aree per esame, 3 casi parametrici per area,
   distrattori costruiti sull'errore tipico dello studente.

   Esami coperti: Diritto amministrativo, Diritto commerciale,
   Diritto penale.
   ============================================================ */

const AREE_GIURIDICHE_2 = {};

function areaC(id, name, cases) {
  return { id: id, name: name, kind: "regola-caso", cases: cases };
}

/* ------------------------------------------------------------
   DIRITTO AMMINISTRATIVO — 5 aree
   ------------------------------------------------------------ */
AREE_GIURIDICHE_2["diritto-amministrativo"] = {
  name: "Diritto amministrativo",
  areas: [
    areaC("principi", "Principi del procedimento", [
      function () {
        return {
          prompt: "L'art. 1 della legge 241/1990 fissa come criteri dell'azione amministrativa:",
          correct: "economicità, efficacia, imparzialità, pubblicità e trasparenza, secondo le modalità previste dalla legge",
          distractors: [
            "segretezza degli atti e riservatezza dell'azione amministrativa",
            "opportunità politica e discrezionalità assoluta dell'organo",
            "celerità a scapito della motivazione, purché il fine sia raggiunto"
          ],
          note: "Errore tipico: ritenere che la pubblicità degli atti operi solo nei procedimenti sanzionatori."
        };
      },
      function () {
        return {
          prompt: "L'obbligo di motivazione del provvedimento amministrativo serve a:",
          correct: "rendere controllabile la decisione, indicando i presupposti di fatto e le ragioni giuridiche che la determinano",
          distractors: [
            "soddisfare una formalità senza effetti sull'impugnazione",
            "garantire la segretezza dell'azione amministrativa",
            "sostituire la comunicazione di avvio del procedimento"
          ],
          note: "Errore tipico: considerare la motivazione un requisito formale privo di effetti sul controllo giurisdizionale."
        };
      },
      function () {
        return {
          prompt: "Nel procedimento amministrativo, la comunicazione di avvio:",
          correct: "va inviata ai soggetti interessati prima dell'adozione del provvedimento, salvo i casi di esclusione previsti dalla legge",
          distractors: [
            "va inviata dopo l'adozione del provvedimento",
            "è dovuta solo se il privato ne fa espressa richiesta",
            "riguarda esclusivamente i procedimenti sanzionatori"
          ],
          note: "Errore tipico: collocare la comunicazione di avvio dopo l'adozione dell'atto."
        };
      }
    ]),
    areaC("provvedimento", "Provvedimento e autotutela", [
      function () {
        return {
          prompt: "La revoca del provvedimento amministrativo si fonda su:",
          correct: "sopravvenuti motivi di pubblico interesse o mutamento della situazione di fatto, con effetto non retroattivo",
          distractors: [
            "l'illegittimità originaria dell'atto, con effetto retroattivo",
            "il solo errore di calcolo contenuto nell'atto",
            "la richiesta del privato interessato al riesame"
          ],
          note: "Errore tipico: confondere la revoca, che guarda all'interesse sopravvenuto, con l'annullamento d'ufficio per illegittimità."
        };
      },
      function () {
        return {
          prompt: "L'annullamento d'ufficio si adotta:",
          correct: "per eliminare un provvedimento illegittimo, entro un termine ragionevole e valutando l'interesse pubblico e gli interessi dei destinatari",
          distractors: [
            "in ogni tempo, senza limiti temporali di sorta",
            "solo su ricorso del privato interessato",
            "unicamente per i provvedimenti di natura sanzionatoria"
          ],
          note: "Errore tipico: ritenere l'annullamento d'ufficio esperibile senza limiti temporali."
        };
      },
      function () {
        return {
          prompt: "Il provvedimento amministrativo è esecutorio nel senso che:",
          correct: "l'amministrazione può darvi esecuzione senza preventiva pronuncia del giudice, nei limiti e con le garanzie previste",
          distractors: [
            "necessita sempre di un decreto del giudice per l'esecuzione",
            "va eseguito solo dopo la registrazione della Corte dei conti",
            "è eseguibile soltanto se notificato a due testimoni"
          ],
          note: "Errore tipico: ritenere necessaria una pronuncia giudiziale per l'esecuzione dell'atto."
        };
      }
    ]),
    areaC("vizi", "Vizi dell'atto", [
      function () {
        return {
          prompt: "L'incompetenza dell'organo che adotta il provvedimento determina:",
          correct: "un vizio di legittimità che rende l'atto annullabile, salvo il caso di incompetenza assoluta che incide sull'inesistenza",
          distractors: [
            "una mera irregolarità priva di conseguenze",
            "un vizio del merito, insindacabile dal giudice",
            "una causa di nullità in ogni caso"
          ],
          note: "Errore tipico: trattare l'incompetenza come semplice irregolarità anziché come vizio di legittimità."
        };
      },
      function () {
        return {
          prompt: "L'eccesso di potere si manifesta tipicamente con:",
          correct: "figure sintomatiche quali la contraddittorietà, la disparità di trattamento e il difetto di motivazione",
          distractors: [
            "la sola violazione di una norma di legge espressa",
            "la carenza assoluta di potere dell'organo",
            "l'illegittimità derivante da un reato del funzionario"
          ],
          note: "Errore tipico: confondere l'eccesso di potere, che attiene al cattivo uso della discrezionalità, con la violazione di legge."
        };
      },
      function () {
        return {
          prompt: "La nullità del provvedimento amministrativo si produce:",
          correct: "nei casi previsti dalla legge, come il difetto assoluto di attribuzione, la violazione del giudicato e l'adozione in carenza di potere",
          distractors: [
            "in ogni caso di vizio di motivazione",
            "quando l'atto è adottato oltre il termine procedimentale",
            "per il solo dissenso del privato destinatario"
          ],
          note: "Errore tipico: estendere la nullità ai vizi di annullabilità, che hanno disciplina e rimedi diversi."
        };
      }
    ]),
    areaC("ricorsi", "Tutela giurisdizionale", [
      function () {
        return {
          prompt: "Il ricorso al TAR avverso un provvedimento amministrativo va notificato, nel rito ordinario:",
          correct: "entro sessanta giorni dalla notificazione o dalla piena conoscenza dell'atto",
          distractors: [
            "entro trenta giorni dalla pubblicazione",
            "entro centoventi giorni dall'emanazione",
            "entro un anno dalla conoscenza dell'atto"
          ],
          note: "Errore tipico: far decorrere il termine dall'emanazione anziché dalla conoscenza dell'atto."
        };
      },
      function () {
        return {
          prompt: "Il ricorso straordinario al Presidente della Repubblica:",
          correct: "è un rimedio alternativo al ricorso giurisdizionale, esperibile su questioni di legittimità, con termini propri",
          distractors: [
            "è un ricorso interno deciso dal ministero competente",
            "è un ricorso alla Corte costituzionale per conflitto di attribuzione",
            "è un rimedio privo di termine di decadenza"
          ],
          note: "Errore tipico: confondere il ricorso straordinario con un rimedio amministrativo interno."
        };
      },
      function () {
        return {
          prompt: "Nel processo amministrativo, l'interesse legittimo:",
          correct: "è la posizione soggettiva che tutela l'interesse del privato alla legittimità dell'azione amministrativa che lo riguarda",
          distractors: [
            "coincide con il diritto soggettivo in ogni caso",
            "è tutelato solo in via risarcitoria, senza annullamento",
            "riguarda esclusivamente i rapporti tra amministrazioni"
          ],
          note: "Errore tipico: sovrapporre interesse legittimo e diritto soggettivo, che hanno tutele e giudici diversi."
        };
      }
    ]),
    areaC("contratti", "Contratti pubblici", [
      function () {
        return {
          prompt: "La procedura negoziata senza bando nel Codice dei contratti pubblici:",
          correct: "è ammessa nei casi tassativamente previsti dalla legge, per ragioni di urgenza o di carattere tecnico-economico",
          distractors: [
            "è liberamente utilizzabile per qualunque importo",
            "richiede la sola autorizzazione dell'ANAC",
            "riguarda esclusivamente i servizi intellettuali"
          ],
          note: "Errore tipico: ritenere la negoziata una procedura liberamente disponibile."
        };
      },
      function () {
        return {
          prompt: "Il criterio dell'offerta economicamente più vantaggiosa si fonda su:",
          correct: "il miglior rapporto qualità/prezzo, con criteri e punteggi indicati nella documentazione di gara",
          distractors: [
            "il solo prezzo più basso offerto",
            "la media aritmetica delle offerte presentate",
            "la maggiore anzianità dell'impresa concorrente"
          ],
          note: "Errore tipico: attribuire al criterio un contenuto esclusivamente economico."
        };
      },
      function () {
        return {
          prompt: "L'avvalimento consente all'operatore economico di:",
          correct: "utilizzare i requisiti di un altro soggetto che si impegna a mettere a disposizione risorse e mezzi",
          distractors: [
            "cedere il contratto a un terzo dopo l'aggiudicazione",
            "essere esentato dal possesso dei requisiti generali di moralità",
            "partecipare in nome e per conto della stazione appaltante"
          ],
          note: "Errore tipico: ritenere che l'avvalimento esoneri dai requisiti generali, mentre riguarda la capacità."
        };
      }
    ])
  ]
};

/* ------------------------------------------------------------
   DIRITTO COMMERCIALE — 5 aree
   ------------------------------------------------------------ */
AREE_GIURIDICHE_2["diritto-commerciale"] = {
  name: "Diritto commerciale",
  areas: [
    areaC("imprenditore", "Imprenditore e statuto", [
      function () {
        return {
          prompt: "Ai sensi dell'art. 2082 del codice civile, è imprenditore:",
          correct: "chi esercita professionalmente un'attività economica organizzata al fine della produzione o dello scambio di beni o servizi",
          distractors: [
            "chi svolge un'attività economica in forma occasionale",
            "chi opera esclusivamente in forma societaria",
            "chi possiede beni immobili locati a terzi"
          ],
          note: "Errore tipico: omettere il requisito della professionalità, che esclude l'attività occasionale."
        };
      },
      function () {
        return {
          prompt: "L'imprenditore commerciale non piccolo è soggetto a:",
          correct: "obbligo di iscrizione nel registro delle imprese, tenuta delle scritture contabili e assoggettabilità alle procedure concorsuali",
          distractors: [
            "al solo obbligo di iscrizione nel registro delle imprese",
            "a nessun obbligo di pubblicità legale",
            "all'obbligo di pubblicare il bilancio sul sito aziendale"
          ],
          note: "Errore tipico: ridurre lo statuto dell'imprenditore al solo obbligo pubblicitario."
        };
      },
      function () {
        return {
          prompt: "L'imprenditore agricolo si distingue da quello commerciale perché:",
          correct: "svolge attività essenzialmente agricole, con esonero dall'obbligo di tenuta delle scritture contabili e dal fallimento",
          distractors: [
            "opera esclusivamente in forma di società semplice",
            "non è mai soggetto a iscrizione nel registro delle imprese",
            "può esercitare qualsiasi attività purché in ambito rurale"
          ],
          note: "Errore tipico: attribuire all'imprenditore agricolo l'intero statuto dell'imprenditore commerciale."
        };
      }
    ]),
    areaC("societa-persone", "Società di persone", [
      function () {
        return {
          prompt: "Nella società in nome collettivo, i soci:",
          correct: "rispondono illimitatamente e solidalmente per le obbligazioni sociali, con beneficio di preventiva escussione del patrimonio sociale",
          distractors: [
            "godono di responsabilità limitata alla quota conferita",
            "rispondono in proporzione alla quota, senza solidarietà",
            "sono esenti da responsabilità se non amministratori"
          ],
          note: "Errore tipico: applicare alle società di persone la responsabilità limitata propria delle società di capitali."
        };
      },
      function () {
        return {
          prompt: "Nella società in accomandita semplice, gli accomandanti:",
          correct: "rispondono limitatamente alla quota conferita e non possono compiere atti di amministrazione",
          distractors: [
            "amministrano la società e rispondono illimitatamente",
            "hanno responsabilità illimitata ma non possono amministrare",
            "godono della responsabilità limitata e amministrano in via esclusiva"
          ],
          note: "Errore tipico: invertire le posizioni di accomandatari e accomandanti."
        };
      },
      function () {
        return {
          prompt: "Nella società semplice, la responsabilità dei soci per le obbligazioni sociali:",
          correct: "è illimitata e solidale, salvo patto contrario opponibile ai terzi nei limiti previsti dal codice civile",
          distractors: [
            "è limitata al patrimonio conferito",
            "riguarda i soli soci amministratori",
            "è esclusa se la società è iscritta in una sezione speciale"
          ],
          note: "Errore tipico: ritenere sufficiente l'iscrizione per limitare la responsabilità nelle società di persone."
        };
      }
    ]),
    areaC("societa-capitali", "Società di capitali", [
      function () {
        return {
          prompt: "Nella società a responsabilità limitata, la responsabilità dei soci:",
          correct: "è limitata al conferimento effettuato, salvo i casi di responsabilità previsti dalla legge",
          distractors: [
            "è illimitata e solidale come nelle società di persone",
            "è limitata solo se la società è iscritta al registro delle imprese",
            "dipende dall'ammontare del capitale sociale sottoscritto"
          ],
          note: "Errore tipico: legare la limitazione della responsabilità a condizioni che la legge non prevede."
        };
      },
      function () {
        return {
          prompt: "L'aumento del capitale sociale in una società per azioni è deliberato:",
          correct: "dall'assemblea dei soci con le maggioranze di legge, salvo delega agli amministratori nei limiti consentiti",
          distractors: [
            "dal collegio sindacale con parere vincolante",
            "dall'amministratore delegato in via autonoma",
            "dall'assemblea con il voto unanime in ogni caso"
          ],
          note: "Errore tipico: attribuire all'organo amministrativo una competenza riservata all'assemblea."
        };
      },
      function () {
        return {
          prompt: "Il patto parasociale:",
          correct: "obbliga i contraenti sul piano contrattuale e non incide sulla validità delle delibere sociali",
          distractors: [
            "ha efficacia reale e vincola la società in quanto tale",
            "coincide con una clausola dell'atto costitutivo",
            "limita per legge il diritto di recesso del socio"
          ],
          note: "Errore tipico: attribuire al patto parasociale efficacia reale, che non possiede."
        };
      }
    ]),
    areaC("organi", "Organi sociali e responsabilità", [
      function () {
        return {
          prompt: "Nella società per azioni, l'azione di responsabilità contro gli amministratori è promossa:",
          correct: "dall'assemblea dei soci, dal collegio sindacale o dai soci che rappresentino la quota minima prevista dalla legge",
          distractors: [
            "solo dal collegio sindacale, in via esclusiva",
            "solo dal pubblico ministero in caso di gravi irregolarità",
            "da ciascun socio, singolarmente, senza soglie"
          ],
          note: "Errore tipico: ignorare la legittimazione della minoranza qualificata prevista dalla legge."
        };
      },
      function () {
        return {
          prompt: "La delega di funzioni al comitato esecutivo comporta:",
          correct: "che i deleganti mantengono il dovere di vigilanza e non sono esenti da responsabilità per i profili loro rimessi",
          distractors: [
            "l'esonero totale da responsabilità dei deleganti",
            "la perdita della qualifica di amministratore per i deleganti",
            "l'obbligo di dimissioni del collegio sindacale"
          ],
          note: "Errore tipico: ritenere la delega uno scudo che azzera la responsabilità dei deleganti."
        };
      },
      function () {
        return {
          prompt: "Il collegio sindacale nella società per azioni ha funzione di:",
          correct: "vigilanza sull'osservanza della legge e dello statuto e sull'adeguatezza dell'assetto organizzativo",
          distractors: [
            "amministrazione ordinaria della società",
            "rappresentanza legale della società verso i terzi",
            "revisione legale obbligatoria in ogni caso"
          ],
          note: "Errore tipico: attribuire all'organo di controllo funzioni gestorie o di rappresentanza."
        };
      }
    ]),
    areaC("crisi", "Crisi d'impresa", [
      function () {
        return {
          prompt: "Il concordato preventivo consente all'imprenditore di:",
          correct: "proporre ai creditori un piano di soddisfacimento con continuità aziendale o con liquidazione, omologato dal tribunale",
          distractors: [
            "estinguere i debiti senza alcun pagamento ai creditori",
            "sospendere automaticamente ogni azione esecutiva per un anno",
            "trasferire la gestione a un commissario senza presentare un piano"
          ],
          note: "Errore tipico: confondere il concordato con una cancellazione dei debiti priva di piano."
        };
      },
      function () {
        return {
          prompt: "La composizione negoziata della crisi si rivolge:",
          correct: "all'imprenditore in squilibrio patrimoniale o economico-finanziario che renda probabile la crisi, con prospettive di risanamento",
          distractors: [
            "all'imprenditore già insolvente, in alternativa alla liquidazione",
            "alle sole società quotate in mercati regolamentati",
            "all'imprenditore che ha già cessato l'attività"
          ],
          note: "Errore tipico: collocare la composizione negoziata dopo l'insolvenza, mentre opera in via anticipata."
        };
      },
      function () {
        return {
          prompt: "La liquidazione giudiziale presuppone:",
          correct: "lo stato di insolvenza, ossia l'incapacità di soddisfare regolarmente le proprie obbligazioni, accertato dal tribunale",
          distractors: [
            "la semplice difficoltà finanziaria temporanea",
            "la perdita di un cliente rilevante",
            "la decisione dell'assemblea dei soci, senza verifica giudiziale"
          ],
          note: "Errore tipico: identificare la crisi reversibile con l'insolvenza irreversibile."
        };
      }
    ])
  ]
};

/* ------------------------------------------------------------
   DIRITTO PENALE — 5 aree
   ------------------------------------------------------------ */
AREE_GIURIDICHE_2["diritto-penale"] = {
  name: "Diritto penale",
  areas: [
    areaC("legalita", "Principi e legalità", [
      function () {
        return {
          prompt: "Il principio di legalità penale impone che:",
          correct: "sia la legge a prevedere in modo tassativo i fatti di reato e le pene applicabili",
          distractors: [
            "il giudice possa estendere per analogia le fattispecie incriminatrici",
            "la consuetudine possa creare nuove figure di reato",
            "il regolamento governativo possa sostituirsi alla legge"
          ],
          note: "Errore tipico: ritenere ammessa l'analogia in malam partem, che la riserva di legge esclude."
        };
      },
      function () {
        return {
          prompt: "Il divieto di retroattività della legge penale:",
          correct: "opera per le norme sfavorevoli, mentre le norme più favorevoli si applicano anche ai fatti anteriori",
          distractors: [
            "riguarda ogni norma penale senza eccezioni",
            "riguarda soltanto le contravvenzioni",
            "non si applica ai decreti-legge"
          ],
          note: "Errore tipico: ritenere il divieto assoluto, senza considerare la retroattività della norma favorevole."
        };
      },
      function () {
        return {
          prompt: "L'ignoranza della legge penale rileva come scusa quando:",
          correct: "è inevitabile, per oggettiva oscurità del testo normativo o per assenza di segnali di orientamento",
          distractors: [
            "nessuno può invocare la propria ignoranza della legge",
            "deriva da un errore su un elemento della fattispecie",
            "è accompagnata da un errore di fatto determinato da altri"
          ],
          note: "Errore tipico: confondere l'ignoranza inevitabile della legge con l'errore sul fatto."
        };
      }
    ]),
    areaC("reato", "Struttura del reato", [
      function () {
        return {
          prompt: "Nel sistema del reato, l'antigiuridicità:",
          correct: "consiste nel contrasto tra il fatto tipico e l'ordinamento, escluso in presenza di cause di giustificazione",
          distractors: [
            "coincide con la tipicità del fatto",
            "dipende dall'entità della pena edittale",
            "attiene alla sola imputabilità del soggetto"
          ],
          note: "Errore tipico: collocare la causa di giustificazione nel fatto tipico invece che nell'antigiuridicità."
        };
      },
      function () {
        return {
          prompt: "Il nesso di causalità nel reato richiede:",
          correct: "la connessione tra condotta ed evento secondo i criteri di legge, con le precisazioni elaborate dalla giurisprudenza",
          distractors: [
            "la sola successione temporale tra condotta ed evento",
            "la presenza di un testimone diretto del fatto",
            "l'accertamento della volontà dell'agente rispetto all'evento"
          ],
          note: "Errore tipico: ridurre la causalità alla successione temporale, secondo lo schema post hoc ergo propter hoc."
        };
      },
      function () {
        return {
          prompt: "L'elemento oggettivo del reato comprende:",
          correct: "condotta, evento, nesso di causalità e assenza di cause di giustificazione",
          distractors: [
            "soltanto l'evento lesivo prodotto dalla condotta",
            "il solo dolo dell'agente",
            "esclusivamente l'imputabilità del soggetto"
          ],
          note: "Errore tipico: ridurre l'elemento oggettivo all'evento, omettendo condotta e nesso causale."
        };
      }
    ]),
    areaC("colpevolezza", "Colpevolezza e imputabilità", [
      function () {
        return {
          prompt: "Il dolo eventuale si distingue dalla colpa cosciente perché:",
          correct: "nel dolo eventuale l'agente accetta il verificarsi dell'evento, accollandosene il rischio",
          distractors: [
            "nel dolo eventuale l'agente confida che l'evento non si verificherà",
            "le due figure coincidono nel trattamento sanzionatorio",
            "la colpa cosciente comporta sempre una pena più elevata"
          ],
          note: "Errore tipico: individuare il discrimine nella previsione dell'evento anziché nell'accettazione del rischio."
        };
      },
      function () {
        return {
          prompt: "L'imputabilità consiste:",
          correct: "nella capacità di intendere e di volere del soggetto al momento del fatto",
          distractors: [
            "nella capacità di stare in giudizio",
            "nell'attitudine a essere punito dal punto di vista processuale",
            "nella coscienza dell'antisocialità del fatto"
          ],
          note: "Errore tipico: confondere l'imputabilità con la capacità di partecipare coscientemente al processo."
        };
      },
      function () {
        return {
          prompt: "Il vizio parziale di mente:",
          correct: "comporta una diminuzione della pena quando la capacità di intendere e di volere è grandemente scemata ma non esclusa",
          distractors: [
            "esclude ogni responsabilità penale",
            "comporta l'applicazione di una misura di sicurezza senza pena",
            "coincide con il vizio totale quanto a conseguenze"
          ],
          note: "Errore tipico: attribuire al vizio parziale l'effetto escludente proprio del vizio totale."
        };
      }
    ]),
    areaC("tentativo", "Tentativo e concorso", [
      function () {
        return {
          prompt: "Il tentativo è configurabile quando:",
          correct: "l'agente compie atti idonei e diretti in modo non equivoco a commettere un delitto, senza riuscirvi",
          distractors: [
            "l'agente compie meri atti preparatori generici",
            "l'agente desiste volontariamente dopo aver posto in essere l'azione",
            "il reato non è punito con la reclusione"
          ],
          note: "Errore tipico: confondere gli atti preparatori generici, non punibili, con gli atti diretti in modo non equivoco."
        };
      },
      function () {
        return {
          prompt: "Nel concorso di persone nel reato, il contributo del concorrente:",
          correct: "può essere materiale o morale, purché consapevole e causalmente rilevante rispetto al fatto",
          distractors: [
            "richiede sempre la presenza fisica sul luogo del reato",
            "richiede un accordo scritto fra i concorrenti",
            "è irrilevante se il concorrente non ha posto in essere l'azione tipica"
          ],
          note: "Errore tipico: richiedere la presenza sul luogo o l'esecuzione materiale, che non sono necessarie."
        };
      },
      function () {
        return {
          prompt: "Nel concorso apparente di norme:",
          correct: "si applicano i criteri di specialità, sussidiarietà e consunzione, con applicazione di una sola norma",
          distractors: [
            "si applica il cumulo materiale delle pene",
            "si applica il cumulo giuridico delle pene",
            "si applica sempre la norma entrata in vigore per ultima"
          ],
          note: "Errore tipico: confondere il concorso apparente di norme, che esclude il concorso, con il concorso di reati."
        };
      }
    ]),
    areaC("sanzioni", "Sanzioni e conseguenze", [
      function () {
        return {
          prompt: "Il sistema sanzionatorio italiano si caratterizza per:",
          correct: "il doppio binario, con pene di funzione retributivo-preventiva e misure di sicurezza di difesa sociale",
          distractors: [
            "l'unicità della pena, senza misure di sicurezza",
            "la prevalenza delle misure di sicurezza sulle pene",
            "l'abolizione delle pene accessorie"
          ],
          note: "Errore tipico: trascurare le misure di sicurezza, estranee alla logica della pena a termine."
        };
      },
      function () {
        return {
          prompt: "La sospensione condizionale della pena:",
          correct: "può essere concessa nei limiti di pena previsti, con valutazione dei precedenti, e può essere subordinata a obblighi",
          distractors: [
            "è automatica per ogni pena detentiva",
            "è esclusa per le pene inferiori a un anno",
            "non può mai essere subordinata ad alcun obbligo"
          ],
          note: "Errore tipico: ritenere la sospensione automatica, mentre richiede valutazione e può prevedere obblighi."
        };
      },
      function () {
        return {
          prompt: "La prescrizione del reato decorre, come regola generale:",
          correct: "dal giorno della consumazione, con termini che dipendono dalla pena edittale e con interruzioni e sospensioni previste",
          distractors: [
            "dal giorno della scoperta del reato da parte dell'autorità",
            "dalla data di iscrizione della persona nel registro degli indagati",
            "dal giorno della commissione del primo atto di indagine"
          ],
          note: "Errore tipico: far decorrere la prescrizione dalla scoperta del reato anziché dalla consumazione."
        };
      }
    ])
  ]
};

export { AREE_GIURIDICHE_2, areaC };
