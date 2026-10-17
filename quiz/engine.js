
/* ---------------- AREA MEDICA ---------------- */
EXAM_AREAS["biochimica"] = {
  name: "Biochimica",
  areas: [
    area("enzimi", "Enzimi e cinetica", "definizione", {
      sets: [{
        question: "Nella cinetica enzimatica,",
        items: [
          { id: "km", label: "la costante Km", text: "la concentrazione di substrato alla quale la velocità di reazione è pari alla metà della velocità massima" },
          { id: "vmax", label: "la Vmax", text: "la velocità massima raggiunta quando l'enzima è saturato dal substrato" },
          { id: "kcat", label: "il numero di turnover", text: "il numero di molecole di substrato convertite per unità di tempo da una molecola di enzima saturata" },
          { id: "competitivo", label: "l'inibitore competitivo", text: "la molecola che si lega al sito attivo aumentando la Km apparente senza modificare la Vmax" }
        ]
      }]
    }),
    area("metabolismo", "Metabolismo energetico", "calcolo", {
      compute: function (rng) {
        const glucosio = randInt(rng, 2, 12);
        return {
          prompt: "Considerando una resa di 30 molecole di ATP per molecola di glucosio ossidata completamente, quante moli di ATP si producono da " + glucosio + " moli di glucosio?",
          value: glucosio * 30, unit: "mol di ATP", factor: 2, decimals: 0,
          explanation: "Ogni molecola di glucosio rende circa 30 ATP: " + glucosio + " × 30 = " + (glucosio * 30) + " mol.",
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
        return {
          prompt: "Quanti cicli di beta-ossidazione servono per degradare completamente un acido grasso saturo a catena lineare di " + atomi + " atomi di carbonio?",
          value: atomi / 2 - 1, unit: "cicli", factor: 2, decimals: 0,
          explanation: "Per un acido grasso saturo di n atomi di carbonio servono n/2 − 1 cicli.",
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
        const fc = randInt(rng, 55, 100), gs = randInt(rng, 50, 90);
        return {
          prompt: "Un soggetto ha frequenza cardiaca di " + fc + " battiti al minuto e gittata sistolica di " + gs + " mL. Qual è la portata cardiaca in mL/min?",
          value: fc * gs, unit: "mL/min", factor: 2, decimals: 0,
          explanation: "La portata cardiaca è frequenza × gittata sistolica.",
          note: "Errore tipico: sommare frequenza e gittata invece di moltiplicarle."
        };
      }
    }),
    area("respiratoria", "Fisiologia respiratoria", "calcolo", {
      compute: function (rng) {
        const vc = randInt(rng, 400, 700), spazio = randInt(rng, 120, 160);
        return {
          prompt: "Con un volume corrente di " + vc + " mL e uno spazio morto anatomico di " + spazio + " mL, qual è la ventilazione alveolare per atto respiratorio?",
          value: vc - spazio, unit: "mL", factor: 2, decimals: 0,
          explanation: "La ventilazione alveolare è volume corrente meno spazio morto.",
          note: "Errore tipico: sommare spazio morto e volume corrente invece di sottrarre."
        };
      }
    }),
    area("renale", "Fisiologia renale", "calcolo", {
      compute: function (rng) {
        const vfg = randInt(rng, 90, 140), riass = randInt(rng, 90, 99);
        return {
          prompt: "Con velocità di filtrazione glomerulare di " + vfg + " mL/min e riassorbimento tubulare del " + riass + "%, qual è il volume di urina prodotto al minuto?",
          value: Math.round(vfg * (1 - riass / 100) * 100) / 100, unit: "mL/min", factor: 2, decimals: 2,
          explanation: "Il volume escreto è VFG × (100 − riassorbimento)/100.",
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
        const tipi = [{ t: "cervicali", v: 7 }, { t: "toraciche", v: 12 }, { t: "lombari", v: 5 }];
        const x = pick(rng, tipi);
        return {
          prompt: "Quante vertebre " + x.t + " compongono il tratto corrispondente della colonna vertebrale?",
          value: x.v, unit: "vertebre", factor: 2, decimals: 0,
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
        { id: "polmonare", cause: "il ventricolo destro si contrae", effect: "il sangue deossigenato è inviato alla circolazione polmonare attraverso l'arteria polmonare" },
        { id: "valvole", cause: "la pressione ventricolare supera quella atriale durante la sistole", effect: "le valvole atrioventricolari si chiudono impedendo il reflusso verso gli atri" },
        { id: "coronarie", cause: "le arterie coronarie si occludono parzialmente", effect: "si riduce l'apporto di ossigeno al miocardio, con rischio di ischemia" }
      ]
    }),
    area("respirazione", "Apparato respiratorio", "calcolo", {
      compute: function (rng) {
        const freq = randInt(rng, 10, 24), vol = randInt(rng, 350, 600);
        return {
          prompt: "Un soggetto ha frequenza respiratoria di " + freq + " atti al minuto e volume corrente di " + vol + " mL. Qual è la ventilazione al minuto in mL?",
          value: freq * vol, unit: "mL/min", factor: 2, decimals: 0,
          explanation: "La ventilazione al minuto è frequenza × volume corrente.",
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
      sets: [{
        question: "Nell'istologia dei tessuti epiteliali,",
        items: [
          { id: "pavimentoso", label: "l'epitelio pavimentoso semplice", text: "l'epitelio di un solo strato di cellule appiattite, presente negli alveoli polmonari dove facilita la diffusione" },
          { id: "cubico", label: "l'epitelio cubico semplice", text: "l'epitelio di cellule cuboidali, tipico dei tubuli renali e dei dotti ghiandolari" },
          { id: "stratificato", label: "l'epitelio pavimentoso stratificato", text: "l'epitelio pluristratificato con cellule superficiali appiattite, adatto a resistere all'abrasione" },
          { id: "ciliato", label: "l'epitelio cilindrico ciliato", text: "l'epitelio di cellule alte dotate di ciglia, presente nelle vie respiratorie per il trasporto del muco" }
        ]
      }]
    }),
    area("connettivo", "Tessuto connettivo", "classificazione", {
      classes: [
        { id: "proprio", label: "connettivo propriamente detto", members: ["il tessuto connettivo lasso", "il tessuto connettivo denso"] },
        { id: "sostegno", label: "connettivo di sostegno", members: ["il tessuto cartilagineo", "il tessuto osseo"] },
        { id: "trofico", label: "connettivo a funzione trofica", members: ["il sangue", "il tessuto adiposo"] }
      ]
    }),
    area("muscolare", "Tessuto muscolare", "regola-caso", {
      cases: [function () {
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
      }]
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
