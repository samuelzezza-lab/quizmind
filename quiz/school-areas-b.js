/* ============================================================
   Quizmind — Scuola Superiore: aree, modulo B
   ------------------------------------------------------------
   Materie umanistiche, giuridiche e tecniche.
   Ogni area dichiara i contenuti per anno scolastico (1-5).
   ============================================================ */

const SCHOOL_AREAS_B = {};

function area(id, name, kind, byYear) {
  return { id: id, name: name, kind: kind, byYear: byYear };
}

/* ---------------- ITALIANO ---------------- */
SCHOOL_AREAS_B["italiano"] = {
  name: "Lingua e Letteratura Italiana",
  areas: [
    area("morfologia", "Morfologia e analisi grammaticale", "classificazione", {
      1: { classes: [
        { id: "nome", label: "nome", members: ["casa", "fiume", "coraggio"] },
        { id: "verbo", label: "verbo", members: ["correre", "sembrare", "piove"] },
        { id: "avverbio", label: "avverbio", members: ["lentamente", "molto", "domani"] },
        { id: "aggettivo", label: "aggettivo", members: ["veloce", "azzurro", "gentile"] }
      ] },
      2: { classes: [
        { id: "transitivo", label: "verbo transitivo", members: ["leggere un libro", "rompere un vaso", "attendere l'autobus"] },
        { id: "intransitivo", label: "verbo intransitivo", members: ["partire all'alba", "nascere in inverno", "telefonare a un amico"] }
      ] },
      3: { classes: [
        { id: "soggettiva", label: "proposizione soggettiva", members: ["Sembra che piova", "È opportuno che tu parta", "Bisogna studiare"] },
        { id: "oggettiva", label: "proposizione oggettiva", members: ["Penso che tu abbia ragione", "Credo che verrà", "Dico che è tardi"] },
        { id: "relativa", label: "proposizione relativa", members: ["Il libro che ho letto", "L'uomo di cui parli", "La casa dove abito"] }
      ] },
      4: { classes: [
        { id: "ipotassi", label: "periodo ipotattico", members: ["Un periodo che subordina più proposizioni fra loro", "Un periodo con subordinate esplicite e implicite"] },
        { id: "paratassi", label: "periodo paratattico", members: ["Un periodo che accosta proposizioni coordinate fra loro"] }
      ] },
      5: { classes: [
        { id: "anastrofe", label: "anastrofe", members: ["L'inversione dell'ordine sintattico consueto"] },
        { id: "chiasmo", label: "chiasmo", members: ["La disposizione incrociata di due coppie di elementi"] }
      ] }
    }),
    area("figure", "Figure retoriche", "analisi-brano", {
      1: { brani: [
        { id: "metafora1", testo: "Sei un leone in battaglia", figura: "metafora" },
        { id: "similitudine1", testo: "Correva veloce come un lampo", figura: "similitudine" },
        { id: "personificazione1", testo: "Il sole sorride alla terra", figura: "personificazione" }
      ] },
      2: { brani: [
        { id: "ossimoro1", testo: "Un silenzio assordante", figura: "ossimoro" },
        { id: "antitesi1", testo: "Era il migliore dei tempi, era il peggiore dei tempi", figura: "antitesi" },
        { id: "iperbole1", testo: "Te l'ho detto un milione di volte", figura: "iperbole" }
      ] },
      3: { brani: [
        { id: "anastrofe1", testo: "Silenzioso scendeva il fiume fra le rive", figura: "anastrofe" },
        { id: "enjambement1", testo: "Un vento carico di voci che spezza il verso", figura: "enjambement" },
        { id: "sineddoche1", testo: "Una vela solcava il mare", figura: "sineddoche" }
      ] },
      4: { brani: [
        { id: "chiasmo1", testo: "Odi et amo: un amore che non so giustificare, un odio che non posso domare", figura: "chiasmo" },
        { id: "metonimia1", testo: "Ho letto Manzoni per l'esame", figura: "metonimia" },
        { id: "allegoria1", testo: "Nel mezzo del cammin di nostra vita mi ritrovai per una selva oscura", figura: "allegoria" }
      ] },
      5: { brani: [
        { id: "preterizione1", testo: "Non voglio parlare dei suoi difetti, e non ricorderò la sua negligenza", figura: "preterizione" },
        { id: "ironia1", testo: "Che splendido piano: abbiamo perso tutto in tre giorni", figura: "ironia" },
        { id: "asindeto1", testo: "Venni, vidi, vinsi", figura: "asindeto" }
      ] }
    }),
    area("letteratura", "Storia della letteratura", "conseguenza", {
      1: { consequences: [
        { id: "origini1", cause: "si studia la nascita della letteratura italiana nel Duecento", effect: "si parte dalla scuola siciliana e dal Dolce Stil Novo, con Dante, Petrarca e Boccaccio come autori fondativi" },
        { id: "poesia1", cause: "si analizza il sonetto come forma metrica", effect: "si riconosce la struttura in due quartine e due terzine, con rime incrociate e alternate" }
      ] },
      2: { consequences: [
        { id: "umanesimo", cause: "si affronta l'Umanesimo quattrocentesco", effect: "si studia il ritorno ai classici e il ruolo delle corti come centri di produzione culturale" },
        { id: "rinascimento", cause: "si studia il Rinascimento", effect: "si analizza il poema cavalleresco con Ariosto e il trattato politico con Machiavelli" }
      ] },
      3: { consequences: [
        { id: "barocco", cause: "si affronta il Seicento barocco", effect: "si analizza la ricerca della meraviglia e il concettismo, con Marino e Galilei nella prosa scientifica" },
        { id: "illuminismo", cause: "si studia l'Illuminismo settecentesco", effect: "si esamina la funzione civile della letteratura e il teatro di Goldoni e Parini" }
      ] },
      4: { consequences: [
        { id: "romanticismo", cause: "si affronta il Romanticismo ottocentesco", effect: "si studiano Manzoni e Leopardi, tra romanzo storico e lirica del pensiero" },
        { id: "verismo", cause: "si studia il Verismo", effect: "si analizza Verga e l'impersonalità narrativa come tecnica della rappresentazione sociale" }
      ] },
      5: { consequences: [
        { id: "decadentismo", cause: "si affronta il Decadentismo", effect: "si studia Pascoli con il fonosimbolismo e D'Annunzio con l'estetismo e il superomismo" },
        { id: "avanguardie", cause: "si analizzano le Avanguardie del Novecento", effect: "si esamina il Futurismo e la rottura delle forme tradizionali, fino a Ungaretti e Montale" }
      ] }
    }),
    area("testo", "Analisi del testo e scrittura", "sequenza", {
      1: { sequences: [
        { id: "riassunto", question: "Nello scrivere un riassunto:", first: "si individua l'idea centrale del testo e i passaggi che la sostengono" },
        { id: "paragrafi", question: "Nel dividere un testo in paragrafi:", first: "si isola ogni unità di senso compiuta" }
      ] },
      2: { sequences: [
        { id: "analisi", question: "Nell'analisi di un testo poetico:", first: "si individua il tema, poi la struttura metrica e le figure retoriche" },
        { id: "tema", question: "Nello svolgere un tema argomentativo:", first: "si costruisce la scaletta con tesi, argomenti e conclusione" }
      ] },
      3: { sequences: [
        { id: "saggio", question: "Nel saggio breve:", first: "si selezionano i documenti e si individua la tesi da sostenere" },
        { id: "commento", question: "Nel commento a un testo:", first: "si riassume il contenuto, poi si analizza la forma" }
      ] },
      4: { sequences: [
        { id: "tipoa", question: "Nell'analisi del testo letterario (tipologia A):", first: "si compie una lettura approfondita con parafrasi e individuazione delle tematiche" },
        { id: "tipob", question: "Nel testo argomentativo (tipologia B):", first: "si analizza il documento proposto per ricavarne la tesi" }
      ] },
      5: { sequences: [
        { id: "tipoc", question: "Nel tema di attualità (tipologia C):", first: "si individua la questione centrale e il proprio punto di vista" },
        { id: "collegamenti", question: "Nel collegamento interdisciplinare:", first: "si individua il concetto ponte tra le discipline coinvolte" }
      ] }
    })
  ]
};

/* ---------------- STORIA ---------------- */
SCHOOL_AREAS_B["storia"] = {
  name: "Storia",
  areas: [
    area("antica", "Storia antica", "regola-caso", {
      1: { cases: [
        function () { return { prompt: "La civiltà greca delle poleis si caratterizza per:", correct: "l'organizzazione in città-stato autonome, ciascuna con proprie leggi e istituzioni", distractors: ["un impero centralizzato con un unico sovrano", "un sistema di città federate prive di autonomia", "una monarchia ereditaria comune a tutta la Grecia"], note: "Errore tipico: confondere la polis con l'impero, che è una forma politica successiva." }; },
        function () { return { prompt: "L'ordinamento repubblicano romano si fonda su:", correct: "magistrature collegiali ed elettive, con il Senato come organo stabile di indirizzo", distractors: ["un re con potere assoluto e vitalizio", "un'assemblea popolare con potere esecutivo diretto", "un impero militare senza magistrature civili"], note: "Errore tipico: attribuire a una sola assemblea il potere che era distribuito tra più organi." }; }
      ] }
    }),
    area("medievale", "Storia medievale", "conseguenza", {
      2: { consequences: [
        { id: "feudo", cause: "si afferma il sistema feudale", effect: "il potere si frammenta in signorie locali legate da rapporti di vassallaggio" },
        { id: "comuni", cause: "nascono i comuni nell'Italia centro-settentrionale", effect: "si sviluppa un'autonomia cittadina con propri statuti e magistrature" }
      ] },
      3: { consequences: [
        { id: "crociate", cause: "si avviano le crociate verso la Terrasanta", effect: "si intensificano gli scambi commerciali nel Mediterraneo e si rafforzano le repubbliche marinare" },
        { id: "peste", cause: "la peste nera colpisce l'Europa a metà del Trecento", effect: "la popolazione crolla e si trasformano gli equilibri economici e sociali" }
      ] }
    }),
    area("moderna", "Storia moderna", "regola-caso", {
      4: { cases: [
        function () { return { prompt: "La Riforma protestante si avvia nel 1517 con:", correct: "la pubblicazione delle tesi di Lutero, che contestano il ruolo delle indulgenze", distractors: ["la convocazione del Concilio di Trento", "la nascita della Compagnia di Gesù", "l'incoronazione di Carlo V"], note: "Errore tipico: collocare gli eventi della Controriforma prima della Riforma." }; },
        function () { return { prompt: "La Rivoluzione francese del 1789 determina:", correct: "la fine dell'Antico Regime e l'affermazione dei principi di libertà e uguaglianza davanti alla legge", distractors: ["la restaurazione delle monarchie assolute in Europa", "l'unificazione politica dell'Italia", "l'inizio della Rivoluzione industriale"], note: "Errore tipico: collocare la Restaurazione prima della Rivoluzione." }; }
      ] }
    }),
    area("contemporanea", "Storia contemporanea", "regola-caso", {
      5: { cases: [
        function () { return { prompt: "Il processo di unificazione italiana si compie nel 1861 con:", correct: "la proclamazione del Regno d'Italia, a conclusione della seconda guerra d'indipendenza e della spedizione dei Mille", distractors: ["la conquista di Roma, che avviene nel 1870", "il Congresso di Vienna del 1815", "la firma del Patto di Londra"], note: "Errore tipico: anticipare al 1861 eventi che avvengono dopo, come la presa di Roma." }; },
        function () { return { prompt: "La Prima guerra mondiale termina nel 1918 con:", correct: "la sconfitta degli Imperi centrali e i trattati di pace che ridisegnano i confini europei", distractors: ["la fine del Fascismo in Italia", "la nascita dell'Unione Europea", "la divisione della Germania in due Stati"], note: "Errore tipico: confondere gli esiti del primo conflitto con quelli del secondo." }; },
        function () { return { prompt: "La Repubblica italiana nasce il 2 giugno 1946 con:", correct: "il referendum istituzionale e l'elezione dell'Assemblea Costituente", distractors: ["la firma del Trattato di Parigi", "l'entrata in vigore della Costituzione, che avviene nel 1948", "la nascita della CECA"], note: "Errore tipico: confondere la nascita della Repubblica con l'entrata in vigore della Costituzione." }; }
      ] }
    })
  ]
};

/* ---------------- FILOSOFIA ---------------- */
SCHOOL_AREAS_B["filosofia"] = {
  name: "Filosofia",
  areas: [
    area("antica", "Filosofia antica", "definizione", {
      3: { sets: [{ question: "Nella filosofia greca,", items: [
        { id: "socrate", label: "il metodo socratico", text: "la ricerca condotta attraverso il dialogo e la confutazione delle opinioni non fondate" },
        { id: "platone", label: "la teoria delle idee", text: "la dottrina secondo cui la realtà vera è costituita da entità immutabili e universali" },
        { id: "aristotele", label: "la metafisica aristotelica", text: "lo studio dell'essere in quanto essere, con la sostanza come categoria fondamentale" },
        { id: "atomismo", label: "l'atomismo", text: "la dottrina che riduce la realtà a particelle indivisibili e al vuoto" }
      ] }] },
      4: { sets: [{ question: "Nella filosofia antica e medievale,", items: [
        { id: "stoicismo", label: "lo stoicismo", text: "la dottrina che identifica la virtù nella vita secondo ragione e nell'accettazione del destino" },
        { id: "epicureismo", label: "l'epicureismo", text: "la dottrina che pone il piacere, inteso come assenza di dolore, quale fine della vita" },
        { id: "scolastica", label: "la scolastica", text: "il pensiero medievale che coniuga fede e ragione, con Tommaso d'Aquino come figura centrale" },
        { id: "agostinismo", label: "l'agostinismo", text: "la dottrina che fonda la conoscenza nell'interiorità e nell'illuminazione divina" }
      ] }] }
    }),
    area("moderna", "Filosofia moderna", "conseguenza", {
      4: { consequences: [
        { id: "razionalismo", cause: "si affronta il razionalismo seicentesco", effect: "si studia Descartes e la ricerca di un fondamento certo del sapere nel cogito" },
        { id: "empirismo", cause: "si affronta l'empirismo inglese", effect: "si studia Hume e la critica dell'idea di causalità come abitudine mentale" }
      ] },
      5: { consequences: [
        { id: "kant", cause: "si studia la filosofia critica di Kant", effect: "si analizza la distinzione tra fenomeno e noumeno e il ruolo delle forme a priori" },
        { id: "idealismo", cause: "si affronta l'idealismo tedesco", effect: "si studia Hegel e la dialettica come movimento dello spirito" }
      ] }
    }),
    area("contemporanea", "Filosofia contemporanea", "conseguenza", {
      5: { consequences: [
        { id: "esistenzialismo", cause: "si affronta l'esistenzialismo novecentesco", effect: "si studia la libertà come scelta e la questione del senso dell'esistenza" },
        { id: "positivismo", cause: "si studia il positivismo ottocentesco", effect: "si analizza l'idea di una conoscenza fondata sul metodo delle scienze naturali" },
        { id: "francoforte", cause: "si affronta la Scuola di Francoforte", effect: "si studia la critica della razionalità strumentale nella società industriale" },
        { id: "epistemologia", cause: "si studia l'epistemologia del Novecento", effect: "si analizza il problema della verificabilità e del mutamento dei paradigmi scientifici" }
      ] }
    }),
    area("logica", "Logica e argomentazione", "regola-caso", {
      4: { cases: [function () { return { prompt: "Un ragionamento deduttivo valido garantisce:", correct: "che, se le premesse sono vere, la conclusione è necessariamente vera", distractors: ["che la conclusione sia vera nella realtà", "che le premesse siano vere", "che la conclusione sia probabile ma non certa"], note: "Errore tipico: confondere la validità formale con la verità delle premesse." }; }] },
      5: { cases: [function () { return { prompt: "Un ragionamento induttivo:", correct: "procede dal particolare all'universale e fornisce una conclusione probabile, non necessaria", distractors: ["procede dall'universale al particolare con certezza", "non può mai essere corretto", "coincide con il ragionamento deduttivo"], note: "Errore tipico: attribuire all'induzione la certezza della deduzione." }; }] }
    })
  ]
};

/* ---------------- LATINO ---------------- */
SCHOOL_AREAS_B["latino"] = {
  name: "Lingua e Cultura Latina",
  areas: [
    area("morfologia", "Morfologia", "definizione", {
      1: { sets: [{ question: "Nella morfologia latina,", items: [
        { id: "nominativo", label: "il nominativo", text: "il caso che indica il soggetto o il nome del predicato" },
        { id: "genitivo", label: "il genitivo", text: "il caso che indica il complemento di specificazione e di possesso" },
        { id: "dativo", label: "il dativo", text: "il caso che indica il complemento di termine" },
        { id: "accusativo", label: "l'accusativo", text: "il caso che indica il complemento oggetto e il moto a luogo" }
      ] }] },
      2: { sets: [{ question: "Nel sistema verbale latino,", items: [
        { id: "indicativo", label: "l'indicativo", text: "il modo che esprime l'azione come reale" },
        { id: "congiuntivo", label: "il congiuntivo", text: "il modo che esprime l'azione come possibile, desiderata o dipendente" },
        { id: "infinito", label: "l'infinito", text: "il modo indefinito usato nelle proposizioni infinitive" }
      ] }] }
    }),
    area("sintassi", "Sintassi", "conseguenza", {
      3: { consequences: [
        { id: "ablativo-assoluto", cause: "compare un ablativo assoluto nella frase", effect: "si traduce con una proposizione subordinata, con valore temporale o causale" },
        { id: "infinitiva", cause: "compare una proposizione infinitiva", effect: "il soggetto dell'infinito va in accusativo e il verbo resta all'infinito" }
      ] },
      4: { consequences: [
        { id: "perifrastica", cause: "compare la perifrastica attiva con il verbo sum", effect: "esprime l'intenzione o l'imminenza dell'azione" },
        { id: "cum", cause: "compare un cum narrativo con il congiuntivo", effect: "si traduce con una subordinata temporale, causale o concessiva" }
      ] }
    }),
    area("letteratura", "Letteratura latina", "regola-caso", {
      4: { cases: [function () { return { prompt: "L'età augustea della letteratura latina è caratterizzata da:", correct: "il sostegno del princeps alla cultura e la fioritura di opere come l'Eneide di Virgilio", distractors: ["la fine della produzione letteraria in latino", "il predominio della letteratura cristiana", "la nascita del teatro comico con Plauto"], note: "Errore tipico: attribuire all'età augustea autori di epoche precedenti, come Plauto." }; }] },
      5: { cases: [function () { return { prompt: "La letteratura latina tardoantica e cristiana si sviluppa:", correct: "tra il III e il V secolo, con autori come Agostino che coniugano formazione classica e pensiero cristiano", distractors: ["nel I secolo a.C., contemporaneamente a Cicerone", "nel II secolo d.C., sotto Traiano", "nel Rinascimento italiano"], note: "Errore tipico: collocare gli autori cristiani in epoca repubblicana." }; }] }
    })
  ]
};

/* ---------------- GRECO ---------------- */
SCHOOL_AREAS_B["greco"] = {
  name: "Lingua e Cultura Greca",
  areas: [
    area("morfologia", "Morfologia e sintassi", "definizione", {
      1: { sets: [{ question: "Nella lingua greca antica,", items: [
        { id: "nominativo", label: "il nominativo", text: "il caso del soggetto e del nome del predicato" },
        { id: "genitivo", label: "il genitivo", text: "il caso del complemento di specificazione e di allontanamento" },
        { id: "ottativo", label: "l'ottativo", text: "il modo che esprime il desiderio o la possibilità, tipico del greco" }
      ] }] },
      3: { sets: [{ question: "Nella sintassi greca,", items: [
        { id: "participio", label: "il participio predicativo", text: "il participio che completa il senso di verbi che esprimono percezione o conoscenza" },
        { id: "genitivo-assoluto", label: "il genitivo assoluto", text: "la costruzione con genitivo e participio, resa in italiano con una subordinata" }
      ] }] }
    }),
    area("letteratura", "Letteratura greca", "regola-caso", {
      3: { cases: [function () { return { prompt: "L'epica greca arcaica è rappresentata da:", correct: "i poemi omerici, Iliade e Odissea, che tramandano il patrimonio mitico dell'età eroica", distractors: ["la lirica corale di Pindaro", "il teatro tragico di Eschilo", "la storiografia di Tucidide"], note: "Errore tipico: attribuire all'epica arcaica autori di epoche successive." }; }] },
      4: { cases: [function () { return { prompt: "La storiografia greca matura nel V secolo con:", correct: "Erodoto, che indaga le cause dei conflitti, e Tucidide, che analizza la guerra del Peloponneso", distractors: ["Omero e Esiodo", "Sofocle ed Euripide", "Platone e Aristotele"], note: "Errore tipico: confondere la storiografia con la produzione poetica e filosofica coeva." }; }] },
      5: { cases: [function () { return { prompt: "La filosofia greca classica raggiunge il suo vertice con:", correct: "Platone e Aristotele, che fondano la metafisica e le scienze dell'Occidente", distractors: ["i poeti tragici del V secolo", "gli oratori attici", "i medici ippocratici"], note: "Errore tipico: sovrapporre la produzione filosofica a quella teatrale del medesimo secolo." }; }] }
    }),
    area("civiltà", "Civiltà e istituzioni", "conseguenza", {
      2: { consequences: [
        { id: "democrazia", cause: "si afferma la democrazia ateniese nel V secolo", effect: "i cittadini partecipano all'assemblea e alle magistrature, mentre donne, schiavi e meteci restano esclusi" },
        { id: "polis", cause: "la polis entra in conflitto con un'altra polis", effect: "la guerra assume carattere interno al mondo greco, come nella guerra del Peloponneso" }
      ] },
      4: { consequences: [
        { id: "ellenismo", cause: "Alessandro Magno conquista l'Oriente", effect: "nasce la civiltà ellenistica, con la diffusione del greco come lingua comune" },
        { id: "biblioteche", cause: "si sviluppa il sapere specialistico in età ellenistica", effect: "nascono grandi centri di studio, come la Biblioteca di Alessandria" }
      ] }
    })
  ]
};

/* ---------------- DIRITTO ED ECONOMIA ---------------- */
SCHOOL_AREAS_B["diritto-economia"] = {
  name: "Diritto ed Economia",
  areas: [
    area("norma", "La norma giuridica", "definizione", {
      1: { sets: [{ question: "Nel diritto,", items: [
        { id: "norma", label: "la norma giuridica", text: "la regola generale e astratta che disciplina la condotta dei consociati, con una sanzione prevista" },
        { id: "fonte", label: "la fonte del diritto", text: "l'atto o il fatto da cui deriva una norma giuridica" },
        { id: "costituzione", label: "la Costituzione", text: "la fonte suprema dell'ordinamento, che fissa i principi fondamentali dello Stato" }
      ] }] },
      2: { sets: [{ question: "Nel diritto pubblico,", items: [
        { id: "costituzione2", label: "la Costituzione", text: "la legge fondamentale che organizza i poteri dello Stato e riconosce i diritti dei cittadini" },
        { id: "parlamento", label: "il Parlamento", text: "l'organo che esercita la funzione legislativa" },
        { id: "governo", label: "il Governo", text: "l'organo che esercita la funzione esecutiva e di indirizzo politico" },
        { id: "magistratura", label: "la magistratura", text: "l'ordine autonomo e indipendente che esercita la funzione giurisdizionale" }
      ] }] }
    }),
    area("diritti", "Diritti e doveri", "conseguenza", {
      2: { consequences: [
        { id: "voto", cause: "un cittadino compie diciotto anni", effect: "acquista il diritto di voto per la Camera dei deputati" },
        { id: "lavoro", cause: "un cittadino inizia un rapporto di lavoro subordinato", effect: "matura i diritti previsti dallo statuto dei lavoratori e la tutela previdenziale" }
      ] },
      3: { consequences: [
        { id: "legittimita", cause: "una legge ordinaria contrasta con un principio costituzionale", effect: "può essere dichiarata illegittima dalla Corte costituzionale" },
        { id: "contratto", cause: "due privati stipulano un contratto", effect: "nasce un vincolo giuridico che le parti sono tenute a rispettare" }
      ] }
    }),
    area("economia", "Economia", "calcolo", {
      3: { compute: function (rng) { const r = randInt(rng, 1000, 20000), c = randInt(rng, 500, r); return { prompt: "Un'azienda ha ricavi per " + fmt(r) + " euro e costi per " + fmt(c) + " euro. Qual è il suo utile?", value: r - c, unit: "euro", factor: 2, decimals: 0, explanation: "L'utile è la differenza tra ricavi e costi.", note: "Errore tipico: sommare ricavi e costi invece di sottrarre." }; } },
      4: { compute: function (rng) { const p = randInt(rng, 10, 100) * 10, s = randInt(rng, 10, 50); return { prompt: "Un prodotto costa " + fmt(p) + " euro e viene scontato del " + s + "%. Qual è il prezzo scontato?", value: Math.round(p * (1 - s / 100) * 100) / 100, unit: "euro", factor: 2, decimals: 2, explanation: "Il prezzo scontato è p × (1 − s/100).", note: "Errore tipico: applicare lo sconto al prezzo già scontato." }; } },
      5: { compute: function (rng) { const c = randInt(rng, 1000, 10000), t = randInt(rng, 1, 5); return { prompt: "Un capitale di " + fmt(c) + " euro è investito per " + t + " anni al 2% annuo semplice. Qual è l'interesse maturato?", value: Math.round(c * 0.02 * t * 100) / 100, unit: "euro", factor: 2, decimals: 2, explanation: "L'interesse semplice è C × i × t.", note: "Errore tipico: applicare l'interesse composto a un calcolo di interesse semplice." }; } }
    }),
    area("contratti", "Obbligazioni e contratti", "regola-caso", {
      4: { cases: [function () { return { prompt: "Un contratto di compravendita si conclude, come regola generale:", correct: "con l'accordo delle parti, che nel nostro ordinamento si perfeziona con lo scambio del consenso", distractors: ["solo con la consegna della cosa", "solo con il pagamento integrale del prezzo", "solo con la registrazione presso un pubblico ufficio"], note: "Errore tipico: ritenere la consegna un requisito di validità del contratto." }; }] },
      5: { cases: [function () { return { prompt: "In caso di inadempimento contrattuale, il creditore può chiedere:", correct: "l'adempimento o la risoluzione del contratto, oltre al risarcimento del danno", distractors: ["soltanto il risarcimento del danno", "la nullità automatica del contratto", "la restituzione del doppio della prestazione"], note: "Errore tipico: confondere la risoluzione con la nullità, che riguarda vizi originari del contratto." }; }] }
    })
  ]
};

/* ---------------- ECONOMIA AZIENDALE ---------------- */
SCHOOL_AREAS_B["economia-aziendale"] = {
  name: "Economia Aziendale",
  areas: [
    area("azienda", "L'azienda e la sua gestione", "definizione", {
      1: { sets: [{ question: "Nell'economia aziendale,", items: [
        { id: "azienda", label: "l'azienda", text: "l'organizzazione di persone e beni finalizzata alla produzione di beni o servizi" },
        { id: "patrimonio", label: "il patrimonio", text: "l'insieme dei beni e dei diritti di cui l'azienda dispone, al netto delle passività" },
        { id: "reddito", label: "il reddito d'esercizio", text: "il risultato economico della gestione in un periodo, dato dalla differenza tra ricavi e costi" }
      ] }] },
      2: { sets: [{ question: "Nella gestione aziendale,", items: [
        { id: "utile", label: "l'utile d'esercizio", text: "l'incremento del patrimonio netto per effetto della gestione positiva" },
        { id: "perdita", label: "la perdita d'esercizio", text: "la riduzione del patrimonio netto per effetto della gestione negativa" }
      ] }] }
    }),
    area("calcolo", "Calcoli aziendali", "calcolo", {
      1: { compute: function (rng) { const q = randInt(rng, 10, 200), p = randInt(rng, 5, 60); return { prompt: "Un'azienda vende " + q + " unità a " + p + " euro ciascuna. Qual è il ricavo totale?", value: q * p, unit: "euro", factor: 2, decimals: 0, explanation: "Il ricavo totale è quantità per prezzo unitario.", note: "Errore tipico: sommare quantità e prezzo invece di moltiplicarli." }; } },
      2: { compute: function (rng) { const imp = randInt(rng, 100, 5000); return { prompt: "Un imponibile è di " + fmt(imp) + " euro. Qual è l'IVA al 22%?", value: Math.round(imp * 0.22 * 100) / 100, unit: "euro", factor: 2, decimals: 2, explanation: "L'IVA è imponibile × aliquota/100.", note: "Errore tipico: calcolare l'IVA sull'imponibile maggiorato invece che sull'imponibile." }; } },
      3: { compute: function (rng) { const costo = randInt(rng, 1000, 20000), anni = randInt(rng, 4, 10); return { prompt: "Un impianto costa " + fmt(costo) + " euro e si ammortizza in " + anni + " anni a quote costanti. Qual è la quota annua?", value: Math.round(costo / anni), unit: "euro", factor: 2, decimals: 0, explanation: "La quota annua è costo diviso numero di anni.", note: "Errore tipico: calcolare l'ammortamento sul valore residuo anziché sul costo storico." }; } },
      4: { compute: function (rng) { const cf = randInt(rng, 1000, 20000), pv = randInt(rng, 20, 100), cv = randInt(rng, 5, pv - 5); return { prompt: "Con costi fissi di " + fmt(cf) + " euro, prezzo unitario di " + pv + " euro e costo variabile unitario di " + cv + " euro, qual è la quantità di pareggio?", value: Math.ceil(cf / (pv - cv)), unit: "unità", factor: 2, decimals: 0, explanation: "Il punto di pareggio è CF diviso il margine di contribuzione unitario.", note: "Errore tipico: dividere i costi fissi per il prezzo anziché per il margine." }; } },
      5: { compute: function (rng) { const attivo = randInt(rng, 50000, 500000), passivo = randInt(rng, 10000, 200000); return { prompt: "Un'azienda ha attività per " + fmt(attivo) + " euro e passività per " + fmt(passivo) + " euro. Qual è il patrimonio netto?", value: attivo - passivo, unit: "euro", factor: 2, decimals: 0, explanation: "Il patrimonio netto è attività meno passività.", note: "Errore tipico: sommare passività e patrimonio netto invece di sottrarre." }; } }
    }),
    area("bilancio", "Il bilancio", "regola-caso", {
      3: { cases: [function () { return { prompt: "Il conto economico evidenzia:", correct: "i costi e i ricavi dell'esercizio, con il risultato economico che ne deriva", distractors: ["la consistenza del patrimonio a fine esercizio", "i flussi di cassa dell'esercizio", "la situazione debitoria verso i fornitori"], note: "Errore tipico: confondere il conto economico con lo stato patrimoniale." }; }] },
      4: { cases: [function () { return { prompt: "Nello stato patrimoniale, il patrimonio netto è pari a:", correct: "la differenza tra il totale delle attività e il totale delle passività", distractors: ["la somma di attività e passività", "il totale dei ricavi d'esercizio", "il capitale sociale più i debiti a lungo termine"], note: "Errore tipico: includere i debiti nel patrimonio netto." }; }] },
      5: { cases: [function () { return { prompt: "Il rendiconto finanziario serve a:", correct: "evidenziare le variazioni della liquidità distinguendo l'area operativa, di investimento e di finanziamento", distractors: ["determinare l'utile d'esercizio", "calcolare il patrimonio netto", "definire il valore delle rimanenze finali"], note: "Errore tipico: attribuire al rendiconto finanziario il compito di determinare il risultato economico." }; }] }
    }),
    area("partita-doppia", "Rilevazioni contabili", "regola-caso", {
      1: { cases: [function (rng) { const imp = randInt(rng, 100, 3000); return { prompt: "L'azienda acquista merci per " + fmt(imp) + " euro in contanti. Quale rilevazione è corretta?", correct: "Merci in dare, cassa in avere", distractors: ["Cassa in dare, merci in avere", "Merci in avere, debiti in dare", "Costi in avere, ricavi in dare"], note: "Errore tipico: invertire dare e avere nei costi di acquisto." }; }] },
      2: { cases: [function (rng) { const imp = randInt(rng, 100, 3000); return { prompt: "L'azienda vende merci per " + fmt(imp) + " euro a dilazione. Quale rilevazione è corretta?", correct: "Crediti verso clienti in dare, ricavi di vendita in avere", distractors: ["Ricavi in dare, crediti in avere", "Cassa in dare, ricavi in avere", "Crediti in avere, merci in dare"], note: "Errore tipico: usare la cassa quando il regolamento è a dilazione." }; }] },
      3: { cases: [function (rng) { const imp = randInt(rng, 100, 5000); return { prompt: "L'azienda paga stipendi per " + fmt(imp) + " euro con bonifico bancario. Quale rilevazione è corretta?", correct: "Salari e stipendi in dare, banca in avere", distractors: ["Banca in dare, salari e stipendi in avere", "Salari in avere, debiti verso dipendenti in dare", "Cassa in dare, banca in avere"], note: "Errore tipico: trattare il pagamento di un costo come un ricavo." }; }] }
    })
  ]
};

/* ---------------- STORIA DELL'ARTE ---------------- */
SCHOOL_AREAS_B["storia-arte"] = {
  name: "Storia dell'Arte e Discipline Artistiche",
  areas: [
    area("antica", "Arte antica", "regola-caso", {
      1: { cases: [function () { return { prompt: "L'arte greca classica si caratterizza per:", correct: "la ricerca della proporzione e dell'equilibrio, con la figura umana come misura di riferimento", distractors: ["l'astrazione geometrica senza riferimento al corpo umano", "la rappresentazione simbolica priva di prospettiva", "il predominio della decorazione ornamentale"], note: "Errore tipico: attribuire all'arte greca caratteri propri dell'arte medievale." }; }] },
      2: { cases: [function () { return { prompt: "L'arte romana si distingue da quella greca per:", correct: "lo sviluppo dell'architettura e dell'ingegneria, con l'uso dell'arco e della volta", distractors: ["la rinuncia alla rappresentazione del corpo umano", "l'abolizione della scultura celebrativa", "l'uso esclusivo del legno come materiale edilizio"], note: "Errore tipico: ridurre l'arte romana a imitazione di quella greca, ignorandone le innovazioni tecniche." }; }] }
    }),
    area("moderna", "Arte moderna", "regola-caso", {
      3: { cases: [function () { return { prompt: "L'arte rinascimentale si fonda su:", correct: "la prospettiva lineare e lo studio della figura umana secondo canoni razionali", distractors: ["l'abbandono della prospettiva a favore del simbolismo", "la ripresa esclusiva dei modelli bizantini", "la negazione del disegno come strumento progettuale"], note: "Errore tipico: considerare il Rinascimento una ripresa dell'arte medievale." }; }] },
      4: { cases: [function () { return { prompt: "L'arte barocca si caratterizza per:", correct: "il movimento, il contrasto chiaroscurale e il coinvolgimento emotivo dello spettatore", distractors: ["la staticità compositiva e la simmetria rigorosa", "l'assenza di decorazione", "il rifiuto della rappresentazione del sacro"], note: "Errore tipico: applicare all'arte barocca i canoni dell'equilibrio rinascimentale." }; }] }
    }),
    area("contemporanea", "Arte contemporanea", "regola-caso", {
      5: { cases: [function () { return { prompt: "Le Avanguardie artistiche del Novecento si caratterizzano per:", correct: "la rottura dei canoni tradizionali e la ricerca di nuovi linguaggi espressivi", distractors: ["il ritorno ai modelli accademici ottocenteschi", "la fedeltà alla rappresentazione naturalistica", "il rifiuto di ogni sperimentazione formale"], note: "Errore tipico: leggere le Avanguardie come continuità della tradizione accademica." }; }] }
    }),
    area("linguaggio", "Linguaggio visivo e tecniche", "definizione", {
      1: { sets: [{ question: "Nel linguaggio visivo,", items: [
        { id: "linea", label: "la linea", text: "il segno che delimita le forme e ne definisce il contorno" },
        { id: "colore", label: "il colore", text: "l'elemento percettivo che distingue le superfici in base alla tonalità" },
        { id: "prospettiva", label: "la prospettiva", text: "il metodo geometrico che rappresenta la profondità su una superficie piana" }
      ] }] },
      3: { sets: [{ question: "Nelle tecniche artistiche,", items: [
        { id: "affresco", label: "l'affresco", text: "la tecnica pittorica eseguita su intonaco fresco, con i colori che si fissano asciugando" },
        { id: "olio", label: "la pittura a olio", text: "la tecnica che usa pigmenti legati con oli, che consente velature e ripensamenti" }
      ] }] }
    })
  ]
};

/* ---------------- SCIENZE UMANE ---------------- */
SCHOOL_AREAS_B["scienze-umane"] = {
  name: "Scienze Umane e Psicologia",
  areas: [
    area("pedagogia", "Pedagogia", "definizione", {
      1: { sets: [{ question: "Nelle scienze dell'educazione,", items: [
        { id: "pedagogia", label: "la pedagogia", text: "la disciplina che studia l'educazione e i processi formativi" },
        { id: "didattica", label: "la didattica", text: "lo studio dei metodi e degli strumenti dell'insegnamento" },
        { id: "educazione", label: "l'educazione", text: "il processo attraverso cui si trasmettono cultura e valori alle nuove generazioni" }
      ] }] },
      3: { sets: [{ question: "Nella riflessione pedagogica del Novecento,", items: [
        { id: "attivismo", label: "l'attivismo", text: "l'approccio che pone l'alunno al centro del processo di apprendimento, valorizzando l'esperienza diretta" },
        { id: "montessori", label: "il metodo Montessori", text: "il metodo che favorisce l'autonomia del bambino attraverso materiali strutturati e ambiente preparato" }
      ] }] }
    }),
    area("psicologia", "Psicologia", "conseguenza", {
      2: { consequences: [
        { id: "sviluppo", cause: "si studia lo sviluppo cognitivo del bambino secondo Piaget", effect: "si individuano stadi di sviluppo con modi di pensare qualitativamente diversi" },
        { id: "attaccamento", cause: "si studia la teoria dell'attaccamento", effect: "si analizza il legame affettivo precoce e la sua influenza sulle relazioni successive" }
      ] },
      4: { consequences: [
        { id: "sociale", cause: "si studia la psicologia sociale", effect: "si analizzano i processi di influenza, conformismo e costruzione della rappresentazione sociale" },
        { id: "clinica", cause: "si affronta la psicologia clinica", effect: "si studiano i disturbi e le tecniche di intervento, con i limiti del ruolo professionale" }
      ] }
    }),
    area("sociologia", "Sociologia", "regola-caso", {
      3: { cases: [function () { return { prompt: "La sociologia si distingue dalla psicologia perché:", correct: "studia i fenomeni sociali e le strutture collettive, non i processi individuali della mente", distractors: ["si occupa esclusivamente di dati statistici", "studia la biologia del comportamento umano", "coincide con l'antropologia culturale"], note: "Errore tipico: attribuire alla sociologia l'oggetto della psicologia individuale." }; }] },
      5: { cases: [function () { return { prompt: "Nel lavoro sociale, il colloquio si distingue dalla conversazione perché:", correct: "ha obiettivi definiti e si svolge entro una relazione professionale con tappe e verifica", distractors: ["è uno scambio libero senza obiettivi", "è condotto senza documentazione", "si svolge solo in presenza di un familiare"], note: "Errore tipico: trattare il colloquio professionale come un dialogo informale." }; }] }
    }),
    area("intervento", "Metodologie operative e intervento", "sequenza", {
      2: { sequences: [
        { id: "progetto", question: "Nella progettazione di un intervento socio-educativo:", first: "si analizza il bisogno della persona e del contesto di riferimento" },
        { id: "colloquio", question: "Nella conduzione di un colloquio professionale:", first: "si chiarisce il motivo dell'incontro e il mandato" }
      ] },
      4: { sequences: [
        { id: "equipe", question: "Nel lavoro di équipe:", first: "si condivide la lettura del caso e si definiscono gli obiettivi congiunti" },
        { id: "documentazione", question: "Nella documentazione del caso:", first: "si registrano i dati raccolti in modo conforme alle regole sulla riservatezza" }
      ] }
    })
  ]
};

/* ---------------- IGIENE ---------------- */
SCHOOL_AREAS_B["igiene"] = {
  name: "Igiene e Cultura Medico-Sanitaria",
  areas: [
    area("prevenzione", "Prevenzione e igiene", "definizione", {
      3: { sets: [{ question: "Nella cultura medico-sanitaria,", items: [
        { id: "primaria", label: "la prevenzione primaria", text: "l'insieme degli interventi che evitano l'insorgenza della malattia nella popolazione sana" },
        { id: "secondaria", label: "la prevenzione secondaria", text: "l'individuazione precoce della malattia già insorta, per limitarne le conseguenze" },
        { id: "screening", label: "lo screening", text: "l'indagine condotta su una popolazione per individuare precocemente una patologia" }
      ] }] },
      4: { sets: [{ question: "Nella prevenzione delle infezioni,", items: [
        { id: "asepsi", label: "l'asepsi", text: "l'insieme delle pratiche che impediscono la contaminazione da microrganismi" },
        { id: "antisepsi", label: "l'antisepsi", text: "l'insieme delle pratiche che eliminano i microrganismi presenti su tessuti o superfici" }
      ] }] }
    }),
    area("anatomia", "Anatomia e fisiologia di base", "definizione", {
      3: { sets: [{ question: "Nell'anatomia di base,", items: [
        { id: "circolatorio", label: "l'apparato circolatorio", text: "il sistema che trasporta il sangue e le sostanze a tutto l'organismo" },
        { id: "respiratorio", label: "l'apparato respiratorio", text: "il sistema che assicura gli scambi gassosi tra l'organismo e l'ambiente" },
        { id: "digerente", label: "l'apparato digerente", text: "il sistema che trasforma gli alimenti e ne assorbe i nutrienti" }
      ] }] },
      5: { sets: [{ question: "Nei parametri vitali,", items: [
        { id: "pressione", label: "la pressione arteriosa", text: "la forza esercitata dal sangue sulle pareti arteriose, espressa in millimetri di mercurio" },
        { id: "frequenza", label: "la frequenza cardiaca", text: "il numero di battiti del cuore in un minuto" },
        { id: "temperatura", label: "la temperatura corporea", text: "il valore termico del corpo, che in condizioni normali si aggira intorno ai 36,5 °C" }
      ] }] }
    }),
    area("assistenza", "Assistenza alla persona", "sequenza", {
      4: { sequences: [
        { id: "bisogni", question: "Nell'assistenza alla persona non autosufficiente:", first: "si rilevano i bisogni fondamentali e il livello di autonomia residua" },
        { id: "igiene-persona", question: "Nell'igiene della persona assistita:", first: "si prepara l'ambiente e il materiale, garantendo la privacy" }
      ] },
      5: { sequences: [
        { id: "emergenza", question: "Nel primo soccorso:", first: "si valuta la sicurezza della scena e lo stato di coscienza della persona" },
        { id: "documentazione", question: "Nella documentazione sanitaria:", first: "si registrano in modo cronologico e leggibile gli interventi effettuati" }
      ] }
    }),
    area("farmaci", "Farmaci e somministrazione", "regola-caso", {
      4: { cases: [function () { return { prompt: "Nella somministrazione di un farmaco, la regola delle 5 giuste comprende:", correct: "farmaco, dose, via, orario e paziente corretti", distractors: ["solo farmaco e dose", "farmaco, dose, colore, marca e confezione", "paziente, reparto, medico, infermiere e data"], note: "Errore tipico: ridurre i controlli alla sola dose, omettendo via e orario." }; }] },
      5: { cases: [function () { return { prompt: "Prima di somministrare un farmaco, occorre verificare le allergie perché:", correct: "una reazione allergica può essere grave e richiede la sospensione e l'allerta del medico", distractors: ["le allergie modificano la via di somministrazione ma non il rischio", "l'allergia riguarda solo i farmaci antibiotici", "la verifica è facoltativa se il paziente è cosciente"], note: "Errore tipico: considerare la verifica delle allergie un passaggio facoltativo." }; }] }
    })
  ]
};

/* ---------------- ALIMENTAZIONE ---------------- */
SCHOOL_AREAS_B["alimentazione"] = {
  name: "Scienza e Cultura dell'Alimentazione",
  areas: [
    area("nutrienti", "Nutrienti", "definizione", {
      1: { sets: [{ question: "Nella scienza dell'alimentazione,", items: [
        { id: "carboidrati", label: "i carboidrati", text: "i nutrienti che forniscono energia rapidamente e costituiscono la quota principale della dieta" },
        { id: "proteine", label: "le proteine", text: "i nutrienti con funzione plastica, essenziali per la costruzione e il rinnovo dei tessuti" },
        { id: "lipidi", label: "i lipidi", text: "i nutrienti a elevata densità energetica, con funzione di riserva e di trasporto delle vitamine liposolubili" },
        { id: "vitamine", label: "le vitamine", text: "i micronutrienti che non forniscono energia ma sono indispensabili per le funzioni metaboliche" }
      ] }] },
      3: { sets: [{ question: "Nei fabbisogni nutrizionali,", items: [
        { id: "bmr", label: "il metabolismo basale", text: "il dispendio energetico necessario al mantenimento delle funzioni vitali a riposo" },
        { id: "fabbisogno", label: "il fabbisogno energetico giornaliero", text: "l'energia necessaria a coprire metabolismo basale, attività fisica e termogenesi" }
      ] }] }
    }),
    area("conservazione", "Conservazione e sicurezza degli alimenti", "conseguenza", {
      3: { consequences: [
        { id: "freddo", cause: "un alimento deperibile resta fuori dalla catena del freddo", effect: "si moltiplicano rapidamente i microrganismi e aumenta il rischio di tossinfezione alimentare" },
        { id: "abbattimento", cause: "la temperatura di un alimento cucinato scende rapidamente sotto i 4 °C", effect: "si limita la proliferazione batterica nella fase di abbattimento" }
      ] },
      4: { consequences: [
        { id: "haccp", cause: "un'azienda alimentare applica le procedure di autocontrollo", effect: "identifica i punti critici e ne monitora i limiti, con verifiche documentate" },
        { id: "crociata", cause: "si usano gli stessi utensili per alimenti crudi e cotti", effect: "si produce contaminazione crociata, con rischio per la sicurezza igienica" }
      ] }
    }),
    area("dietetica", "Dietetica applicata", "calcolo", {
      4: { compute: function (rng) { const kcal = randInt(rng, 1500, 3000), perc = pick(rng, [15, 20, 25]); return { prompt: "Un fabbisogno di " + fmt(kcal) + " kcal al giorno con il " + perc + "% da proteine: quante kcal derivano dalle proteine?", value: Math.round((kcal * perc) / 100), unit: "kcal", factor: 2, decimals: 0, explanation: "Si applica la percentuale al fabbisogno totale.", note: "Errore tipico: convertire già in grammi, saltando il passaggio sulle kcal." }; } },
      5: { compute: function (rng) { const kcal = randInt(rng, 1800, 2600); return { prompt: "Con un fabbisogno di " + fmt(kcal) + " kcal e il 15% da proteine, quanti grammi di proteine servono? (4 kcal per grammo)", value: Math.round((kcal * 0.15) / 4), unit: "g", factor: 2, decimals: 0, explanation: "Si calcolano le kcal da proteine e si dividono per 4 kcal per grammo.", note: "Errore tipico: dividere per 9, che è il valore energetico dei grassi." }; } }
    }),
    area("igiene-alimenti", "Igiene degli alimenti", "sequenza", {
      4: { sequences: [
        { id: "preparazione", question: "Nella preparazione dei piatti:", first: "si organizza il lavoro evitando la contaminazione crociata" },
        { id: "porzionatura", question: "Nella porzionatura e conservazione:", first: "si controllano le temperature e si etichettano i contenitori" }
      ] },
      5: { sequences: [
        { id: "ricevimento", question: "Nella gestione delle derrate secondo l'HACCP:", first: "si verifica la temperatura e la tracciabilità degli alimenti in ricevimento" },
        { id: "servizio", question: "Nella fase di servizio:", first: "si controllano le temperature di mantenimento dei piatti pronti" }
      ] }
    })
  ]
};

/* ---------------- MECCANICA ---------------- */
SCHOOL_AREAS_B["meccanica"] = {
  name: "Meccanica, Macchine ed Energia",
  areas: [
    area("grandezze", "Grandezze fisiche e misure", "calcolo", {
      1: { compute: function (rng) { const f = randInt(rng, 10, 500), s = randInt(rng, 1, 10); return { prompt: "Una forza di " + f + " N sposta un corpo di " + s + " m. Qual è il lavoro compiuto?", value: f * s, unit: "J", factor: 2, decimals: 0, explanation: "Il lavoro è forza per spostamento, a parità di direzione.", note: "Errore tipico: sommare forza e spostamento invece di moltiplicarli." }; } },
      2: { compute: function (rng) { const m = randInt(rng, 1, 50), a = randInt(rng, 1, 9); return { prompt: "Un corpo di massa " + m + " kg subisce un'accelerazione di " + a + " m/s². Qual è la forza risultante?", value: m * a, unit: "N", factor: 2, decimals: 0, explanation: "Per il secondo principio della dinamica F = ma.", note: "Errore tipico: confondere massa e peso, dimenticando l'accelerazione di gravità." }; } },
      3: { compute: function (rng) { const forza = randInt(rng, 20, 400), braccio = randInt(rng, 1, 20) / 10; return { prompt: "Una forza di " + forza + " N agisce con un braccio di " + String(braccio).replace(".", ",") + " m. Qual è il momento torcente?", value: Math.round(forza * braccio * 100) / 100, unit: "N·m", factor: 2, decimals: 2, explanation: "Il momento è forza per braccio.", note: "Errore tipico: sommare forza e braccio invece di moltiplicarli." }; } },
      4: { compute: function (rng) { const w = randInt(rng, 1, 20) * 1000, t = randInt(rng, 2, 60); return { prompt: "Un sistema compie un lavoro di " + fmt(w) + " J in " + t + " s. Qual è la potenza media?", value: Math.round((w / t) * 100) / 100, unit: "W", factor: 2, decimals: 2, explanation: "La potenza è lavoro diviso tempo.", note: "Errore tipico: moltiplicare lavoro e tempo invece di dividere." }; } },
      5: { compute: function (rng) { const w = randInt(rng, 500, 5000), t = randInt(rng, 2, 20); return { prompt: "Un motore sviluppa " + w + " W per " + t + " s. Qual è l'energia trasferita?", value: w * t, unit: "J", factor: 2, decimals: 0, explanation: "L'energia è potenza per tempo.", note: "Errore tipico: invertire il rapporto tra potenza ed energia." }; } }
    }),
    area("materiali", "Materiali e tecnologia meccanica", "definizione", {
      1: { sets: [{ question: "Nella tecnologia dei materiali,", items: [
        { id: "durezza", label: "la durezza", text: "la resistenza di un materiale alla penetrazione o all'abrasione" },
        { id: "duttilita", label: "la duttilità", text: "la capacità di un materiale di deformarsi plasticamente senza rompersi" },
        { id: "tenacita", label: "la tenacità", text: "la capacità di assorbire energia prima di giungere a rottura" }
      ] }] },
      3: { sets: [{ question: "Nelle proprietà meccaniche,", items: [
        { id: "snervamento", label: "il carico di snervamento", text: "il valore di tensione oltre il quale il materiale inizia a deformarsi in modo permanente" },
        { id: "rottura", label: "il carico di rottura", text: "il valore massimo di tensione sopportato prima della separazione" }
      ] }] }
    }),
    area("macchine", "Macchine e organi meccanici", "conseguenza", {
      3: { consequences: [
        { id: "cinghia", cause: "una trasmissione a cinghia slitta per eccessiva usura", effect: "si perde il rapporto di trasmissione e diminuisce la potenza trasmessa" },
        { id: "cuscinetto", cause: "un cuscinetto si surriscalda durante il funzionamento", effect: "aumentano gli attriti e si riduce la durata dell'albero e della sede" }
      ] },
      4: { consequences: [
        { id: "rapporto", cause: "si vuole aumentare la coppia in uscita da un riduttore", effect: "si riduce il numero di giri in uscita, mantenendo la potenza al netto dei rendimenti" },
        { id: "attrito", cause: "si riduce l'attrito tra superfici con una corretta lubrificazione", effect: "diminuiscono le perdite di potenza e l'usura dei componenti" }
      ] },
      5: { consequences: [
        { id: "rendimento", cause: "si tiene conto del rendimento in una catena cinematica", effect: "la potenza utile in uscita risulta inferiore a quella in ingresso" },
        { id: "sicurezza", cause: "un organo in rotazione resta privo di protezione", effect: "aumenta il rischio di infortunio, con obbligo di installare ripari" }
      ] }
    }),
    area("disegno", "Disegno tecnico e sicurezza", "regola-caso", {
      1: { cases: [function () { return { prompt: "Nel disegno tecnico, la scala 1:2 indica:", correct: "che il disegno è la metà della dimensione reale dell'oggetto", distractors: ["che il disegno è il doppio delle dimensioni reali", "che il disegno ha le stesse dimensioni dell'oggetto", "che le quote sono espresse in centimetri"], note: "Errore tipico: invertire i termini del rapporto di scala." }; }] },
      5: { cases: [function () { return { prompt: "Un dispositivo di protezione su una macchina utensile serve a:", correct: "impedire il contatto con organi in movimento, senza ostacolare le operazioni normali", distractors: ["aumentare la velocità di lavorazione", "sostituire la formazione del personale", "ridurre il rumore prodotto dalla macchina"], note: "Errore tipico: attribuire al riparo funzioni di produttività invece di sicurezza." }; }] },
      3: { cases: [function () { return { prompt: "Nella rappresentazione di un pezzo meccanico, le viste ortografiche servono a:", correct: "descrivere la forma dell'oggetto da direzioni ortogonali tra loro", distractors: ["mostrare l'oggetto in prospettiva", "indicare solo le quote principali", "rappresentare la sequenza di lavorazione"], note: "Errore tipico: confondere le viste ortografiche con la rappresentazione assonometrica." }; }] }
    })
  ]
};

/* ---------------- TECNOLOGIE ---------------- */
SCHOOL_AREAS_B["tecnologie"] = {
  name: "Tecnologie e Progettazione",
  areas: [
    area("progetto", "Il progetto tecnico", "sequenza", {
      3: { sequences: [
        { id: "fasi", question: "Nella progettazione di un manufatto:", first: "si definisce il problema e si individuano i vincoli e i requisiti" },
        { id: "disegno-tecnico", question: "Nella restituzione grafica del progetto:", first: "si scelgono le viste e la scala più adatte alla rappresentazione" }
      ] },
      5: { sequences: [
        { id: "verifica", question: "Nella verifica di un progetto industriale:", first: "si confrontano i risultati con i requisiti definiti in fase di analisi" }
      ] }
    }),
    area("materiali", "Materiali e lavorazioni", "definizione", {
      2: { sets: [{ question: "Nelle lavorazioni industriali,", items: [
        { id: "tornitura", label: "la tornitura", text: "la lavorazione che asporta truciolo facendo ruotare il pezzo e avanzare l'utensile" },
        { id: "fresatura", label: "la fresatura", text: "la lavorazione che asporta materiale con un utensile rotante a più taglienti" },
        { id: "saldatura", label: "la saldatura", text: "il processo che unisce due parti mediante fusione locale del materiale" }
      ] }] },
      4: { sets: [{ question: "Nelle proprietà dei materiali,", items: [
        { id: "acciaio", label: "l'acciaio", text: "la lega di ferro e carbonio con tenore di carbonio inferiore a circa il 2%" },
        { id: "ghisa", label: "la ghisa", text: "la lega di ferro e carbonio con tenore di carbonio più elevato, adatta alla fusione" }
      ] }] }
    }),
    area("energia", "Fonti e impianti energetici", "conseguenza", {
      4: { consequences: [
        { id: "rinnovabili", cause: "si privilegia la produzione da fonti rinnovabili", effect: "si riducono le emissioni climalteranti, con la necessità di gestire l'intermittenza della produzione" },
        { id: "cogenerazione", cause: "si adotta un impianto di cogenerazione", effect: "si produce energia elettrica e calore nello stesso processo, con rendimento complessivo più alto" }
      ] }
    }),
    area("sicurezza", "Sicurezza nei processi", "regola-caso", {
      3: { cases: [function () { return { prompt: "Nella valutazione dei rischi in un ambiente di lavoro, il rischio è dato da:", correct: "il prodotto tra la probabilità che un evento dannoso si verifichi e la gravità del danno", distractors: ["la sola probabilità dell'evento", "la sola gravità del danno", "il numero di lavoratori coinvolti"], note: "Errore tipico: considerare solo uno dei due fattori, probabilità o gravità." }; }] },
      5: { cases: [function () { return { prompt: "I dispositivi di protezione individuale:", correct: "costituiscono l'ultima barriera di protezione, dopo la riduzione del rischio alla fonte", distractors: ["sostituiscono gli interventi tecnici di prevenzione", "sono obbligatori solo in cantiere", "possono essere scelti liberamente dal lavoratore"], note: "Errore tipico: collocare i DPI al primo posto nella gerarchia degli interventi di prevenzione." }; }] }
    })
  ]
};

/* ---------------- DISCIPLINE ARTISTICHE ---------------- */
SCHOOL_AREAS_B["discipline-artistiche"] = {
  name: "Discipline Grafiche, Pittoriche e Progettuali",
  areas: [
    area("strumenti", "Strumenti e tecniche", "definizione", {
      1: { sets: [{ question: "Nelle tecniche grafiche,", items: [
        { id: "matita", label: "la matita grafica", text: "lo strumento che traccia segni modulabili per intensità e pressione" },
        { id: "carboncino", label: "il carboncino", text: "lo strumento che consente segni netti e sfumature profonde, con forte contrasto" },
        { id: "tempera", label: "la tempera", text: "la tecnica pittorica a base di pigmento legato con emulsioni, con stesure opache" }
      ] }] },
      3: { sets: [{ question: "Nelle tecniche progettuali,", items: [
        { id: "bozzetto", label: "il bozzetto", text: "la prima restituzione sintetica dell'idea, che ne verifica l'impostazione" },
        { id: "esecutivo", label: "l'elaborato esecutivo", text: "il disegno definitivo con quote e indicazioni per la realizzazione" }
      ] }] }
    }),
    area("composizione", "Composizione e percezione", "regola-caso", {
      2: { cases: [function () { return { prompt: "Nella composizione visiva, la regola dei terzi serve a:", correct: "distribuire gli elementi seguendo una griglia che evita la simmetria statica e guida lo sguardo", distractors: ["garantire l'esatta simmetria dell'immagine", "determinare la scala cromatica da usare", "fissare il numero di elementi ammessi"], note: "Errore tipico: confondere la regola dei terzi con un criterio di simmetria." }; }] },
      4: { cases: [function () { return { prompt: "Nel linguaggio visivo, il contrasto simultaneo si produce quando:", correct: "un colore appare modificato dalla presenza dei colori che lo circondano", distractors: ["due colori identici occupano aree diverse della stessa immagine", "un colore viene usato in modo isolato", "la saturazione viene ridotta al minimo"], note: "Errore tipico: spiegare il contrasto simultaneo con la sola differenza di dimensione delle aree." }; }] }
    }),
    area("progetto", "Progettazione", "sequenza", {
      3: { sequences: [
        { id: "iter-progetto", question: "Nell'iter progettuale:", first: "si raccolgono i dati di partenza e si analizza il contesto" },
        { id: "restituzione", question: "Nella fase di restituzione:", first: "si scelgono i materiali e le tecniche coerenti con l'idea" }
      ] },
      5: { sequences: [
        { id: "portfolio", question: "Nella costruzione di un portfolio:", first: "si selezionano gli elaborati che documentano il percorso e le competenze acquisite" }
      ] }
    }),
    area("storia-tecniche", "Storia delle tecniche artistiche", "conseguenza", {
      3: { consequences: [
        { id: "prospettiva-rinasci", cause: "si afferma la prospettiva lineare nel Rinascimento", effect: "la rappresentazione dello spazio diventa razionale e misurabile" },
        { id: "olio-fiammingo", cause: "si diffonde la pittura a olio nei Paesi fiamminghi", effect: "si ottengono velature trasparenti e una resa minuziosa dei dettagli" }
      ] },
      5: { consequences: [
        { id: "fotografia", cause: "si afferma la fotografia nell'Ottocento", effect: "cambia il ruolo della pittura, che si orienta verso nuovi linguaggi non imitativi" },
        { id: "digitale", cause: "si diffondono gli strumenti digitali nel progetto", effect: "si ampliano le possibilità di modellazione e di verifica preventiva dell'idea" }
      ] }
    })
  ]
};

/* ---------------- METODOLOGIE OPERATIVE ---------------- */
SCHOOL_AREAS_B["metodologie"] = {
  name: "Metodologie Operative",
  areas: [
    area("progettazione", "Progettazione dell'intervento", "sequenza", {
      1: { sequences: [
        { id: "analisi", question: "Nell'analisi di un bisogno:", first: "si raccolgono informazioni sulla situazione della persona e sul contesto" },
        { id: "progetto-educativo", question: "Nella stesura di un progetto educativo:", first: "si definiscono finalità e obiettivi verificabili" }
      ] },
      4: { sequences: [
        { id: "verifica-intervento", question: "Nella verifica dell'intervento:", first: "si confrontano gli esiti con gli obiettivi definiti in fase di progettazione" }
      ] }
    }),
    area("strumenti", "Strumenti operativi", "definizione", {
      2: { sets: [{ question: "Negli strumenti del lavoro sociale,", items: [
        { id: "osservazione", label: "l'osservazione sistematica", text: "la rilevazione condotta con criteri definiti e registrazione dei comportamenti osservati" },
        { id: "colloquio", label: "il colloquio", text: "lo strumento relazionale condotto con obiettivi definiti e documentato" },
        { id: "scheda", label: "la scheda di rilevazione", text: "lo strumento che raccoglie in modo ordinato i dati utili alla valutazione" }
      ] }] },
      5: { sets: [{ question: "Nella documentazione professionale,", items: [
        { id: "relazione", label: "la relazione sociale", text: "il documento che ricostruisce la situazione, gli interventi e le valutazioni professionali" },
        { id: "progetto-verificato", label: "il progetto verificato", text: "il documento che riporta obiettivi, azioni ed esiti con i relativi indicatori" }
      ] }] }
    }),
    area("relazione", "Relazione d'aiuto", "regola-caso", {
      3: { cases: [function () { return { prompt: "Nella relazione d'aiuto, l'ascolto attivo comporta:", correct: "accogliere il vissuto dell'altro senza anticipare soluzioni, verificando la comprensione di quanto espresso", distractors: ["fornire immediatamente consigli pratici", "condurre il colloquio su temi scelti dall'operatore", "evitare di riformulare quanto detto per non influenzare"], note: "Errore tipico: confondere l'ascolto attivo con la somministrazione di consigli." }; }] },
      4: { cases: [function () { return { prompt: "Il segreto professionale nell'ambito dei servizi sociali:", correct: "vincola l'operatore a non divulgare informazioni apprese per ragioni del proprio ruolo professionale", distractors: ["può essere derogato in qualunque situazione di comodo", "riguarda solo i dati sanitari", "si applica solo ai colloqui svolti in sede"], note: "Errore tipico: ritenere derogabile il segreto professionale al di fuori dei casi previsti." }; }] }
    }),
    area("sistema", "Il sistema dei servizi", "conseguenza", {
      3: { consequences: [
        { id: "territorio", cause: "i servizi sociali operano in rete sul territorio", effect: "si integrano risorse pubbliche e del privato sociale per rispondere ai bisogni" },
        { id: "integrazione", cause: "si progetta un intervento integrato socio-sanitario", effect: "si coordina l'apporto di figure diverse, con obiettivi condivisi e verificabili" }
      ] }
    })
  ]
};

export { SCHOOL_AREAS_B };
