/* ============================================================
   Quizmind — Struttura accademica
   Ogni nodo porta un campo `verified`:
     verified: true  -> dati ufficiali (nome ateneo, denominazione corso, SSD)
     verified: false -> contenuto ancora da completare / da verificare
   Nessun programma d'esame viene inventato. I template dei quiz
   sono dichiarati esplicitamente per esame (vedi quiz/engine.js).
   ============================================================ */

const UNIVERSITIES = [
  {
    id: "unimi",
    name: "Università degli Studi di Milano",
    short: "UniMi",
    city: "Milano",
    type: "Statale",
    verified: true,
    degrees: [
      {
        id: "unimi-giurisprudenza",
        name: "Giurisprudenza",
        class: "LMG/01",
        verified: true,
        years: [
          {
            id: "unimi-giurisprudenza-1",
            year: 1,
            verified: true,
            exams: [
              { id: "unimi-giurisprudenza-1-diritto-privato", name: "Diritto privato", ssd: "IUS/01", verified: true },
              { id: "unimi-giurisprudenza-1-diritto-costituzionale", name: "Diritto costituzionale", ssd: "IUS/08", verified: true },
              { id: "unimi-giurisprudenza-1-storia-diritto-romano", name: "Storia del diritto romano", ssd: "IUS/18", verified: true }
            ]
          },
          {
            id: "unimi-giurisprudenza-2",
            year: 2,
            verified: false,
            exams: [
              { id: "unimi-giurisprudenza-2-diritto-penale", name: "Diritto penale", ssd: "IUS/17", verified: true },
              { id: "unimi-giurisprudenza-2-diritto-amministrativo", name: "Diritto amministrativo", ssd: "IUS/10", verified: true },
              { id: "unimi-giurisprudenza-2-diritto-privato-comparato", name: "Diritto privato comparato", ssd: "IUS/02", verified: true }
            ]
          }
        ]
      },
      {
        id: "unimi-informatica",
        name: "Informatica",
        class: "L-31",
        verified: true,
        years: [
          {
            id: "unimi-informatica-1",
            year: 1,
            verified: true,
            exams: [
              { id: "unimi-informatica-1-programmazione", name: "Programmazione", ssd: "INF/01", verified: true },
              { id: "unimi-informatica-1-analisi-matematica", name: "Analisi matematica", ssd: "MAT/05", verified: true },
              { id: "unimi-informatica-1-algebra-lineare", name: "Algebra lineare e geometria", ssd: "MAT/03", verified: true }
            ]
          },
          {
            id: "unimi-informatica-2",
            year: 2,
            verified: false,
            exams: [
              { id: "unimi-informatica-2-algoritmi", name: "Algoritmi e strutture dati", ssd: "INF/01", verified: true },
              { id: "unimi-informatica-2-basi-di-dati", name: "Basi di dati", ssd: "ING-INF/05", verified: true },
              { id: "unimi-informatica-2-reti", name: "Reti di calcolatori", ssd: "ING-INF/05", verified: true }
            ]
          }
        ]
      }
    ]
  },

  {
    id: "unibo",
    name: "Università di Bologna",
    short: "UniBo",
    city: "Bologna",
    type: "Statale",
    verified: true,
    degrees: [
      {
        id: "unibo-medicina",
        name: "Medicina e Chirurgia",
        class: "LM-41",
        verified: true,
        years: [
          {
            id: "unibo-medicina-1",
            year: 1,
            verified: true,
            exams: [
              { id: "unibo-medicina-1-anatomia", name: "Anatomia umana", ssd: "BIO/16", verified: true },
              { id: "unibo-medicina-1-chimica", name: "Chimica e propedeutica biochimica", ssd: "BIO/10", verified: true },
              { id: "unibo-medicina-1-fisica", name: "Fisica applicata", ssd: "FIS/07", verified: true }
            ]
          },
          {
            id: "unibo-medicina-2",
            year: 2,
            verified: false,
            exams: [
              { id: "unibo-medicina-2-fisiologia", name: "Fisiologia umana", ssd: "BIO/09", verified: true },
              { id: "unibo-medicina-2-biochimica", name: "Biochimica", ssd: "BIO/10", verified: true },
              { id: "unibo-medicina-2-microbiologia", name: "Microbiologia", ssd: "MED/07", verified: true }
            ]
          }
        ]
      },
      {
        id: "unibo-economia",
        name: "Economia aziendale",
        class: "L-18",
        verified: true,
        years: [
          {
            id: "unibo-economia-1",
            year: 1,
            verified: true,
            exams: [
              { id: "unibo-economia-1-economia-politica", name: "Economia politica", ssd: "SECS-P/01", verified: true },
              { id: "unibo-economia-1-ragioneria", name: "Ragioneria generale", ssd: "SECS-P/07", verified: true },
              { id: "unibo-economia-1-matematica", name: "Matematica generale", ssd: "SECS-S/06", verified: true }
            ]
          },
          {
            id: "unibo-economia-2",
            year: 2,
            verified: false,
            exams: [
              { id: "unibo-economia-2-statistica", name: "Statistica", ssd: "SECS-S/01", verified: true },
              { id: "unibo-economia-2-diritto-commerciale", name: "Diritto commerciale", ssd: "IUS/04", verified: true },
              { id: "unibo-economia-2-economia-aziendale", name: "Economia aziendale", ssd: "SECS-P/07", verified: true }
            ]
          }
        ]
      }
    ]
  },

  {
    id: "polito",
    name: "Politecnico di Torino",
    short: "PoliTo",
    city: "Torino",
    type: "Statale",
    verified: true,
    degrees: [
      {
        id: "polito-ingegneria-informatica",
        name: "Ingegneria informatica",
        class: "L-8",
        verified: true,
        years: [
          {
            id: "polito-ingegneria-informatica-1",
            year: 1,
            verified: true,
            exams: [
              { id: "polito-ing-inf-1-analisi-matematica", name: "Analisi matematica I", ssd: "MAT/05", verified: true },
              { id: "polito-ing-inf-1-fisica-1", name: "Fisica I", ssd: "FIS/01", verified: true },
              { id: "polito-ing-inf-1-informatica", name: "Informatica", ssd: "ING-INF/05", verified: true }
            ]
          },
          {
            id: "polito-ingegneria-informatica-2",
            year: 2,
            verified: false,
            exams: [
              { id: "polito-ing-inf-2-analisi-matematica", name: "Analisi matematica II", ssd: "MAT/05", verified: true },
              { id: "polito-ing-inf-2-fisica-2", name: "Fisica II", ssd: "FIS/01", verified: true },
              { id: "polito-ing-inf-2-programmazione", name: "Programmazione", ssd: "ING-INF/05", verified: true }
            ]
          }
        ]
      }
    ]
  },

  {
    id: "unipd",
    name: "Università degli Studi di Padova",
    short: "UniPd",
    city: "Padova",
    type: "Statale",
    verified: true,
    degrees: [
      {
        id: "unipd-psicologia",
        name: "Scienze psicologiche cognitive e psicobiologiche",
        class: "L-24",
        verified: true,
        years: [
          {
            id: "unipd-psicologia-1",
            year: 1,
            verified: true,
            exams: [
              { id: "unipd-psicologia-1-statistica", name: "Statistica psicometrica", ssd: "M-PSI/03", verified: true },
              { id: "unipd-psicologia-1-chimica", name: "Chimica e biologia", ssd: "BIO/13", verified: true },
              { id: "unipd-psicologia-1-anatomia", name: "Anatomia e istologia", ssd: "BIO/16", verified: true }
            ]
          },
          {
            id: "unipd-psicologia-2",
            year: 2,
            verified: false,
            exams: [
              { id: "unipd-psicologia-2-statistica", name: "Metodologia della ricerca", ssd: "M-PSI/03", verified: true },
              { id: "unipd-psicologia-2-anatomia", name: "Psicobiologia", ssd: "M-PSI/02", verified: true }
            ]
          }
        ]
      }
    ]
  },

  {
    id: "sapienza",
    name: "Sapienza Università di Roma",
    short: "Sapienza",
    city: "Roma",
    type: "Statale",
    verified: true,
    degrees: [
      {
        id: "sapienza-ingegneria-informatica",
        name: "Ingegneria informatica",
        class: "L-8",
        verified: true,
        years: [
          {
            id: "sapienza-ingegneria-informatica-1",
            year: 1,
            verified: true,
            exams: [
              { id: "sapienza-ing-inf-1-analisi-matematica", name: "Analisi matematica I", ssd: "MAT/05", verified: true },
              { id: "sapienza-ing-inf-1-programmazione", name: "Fondamenti di programmazione", ssd: "ING-INF/05", verified: true },
              { id: "sapienza-ing-inf-1-fisica-1", name: "Fisica I", ssd: "FIS/01", verified: true }
            ]
          },
          {
            id: "sapienza-ingegneria-informatica-2",
            year: 2,
            verified: false,
            exams: [
              { id: "sapienza-ing-inf-2-analisi-matematica", name: "Analisi matematica II", ssd: "MAT/05", verified: true },
              { id: "sapienza-ing-inf-2-algoritmi", name: "Algoritmi e strutture dati", ssd: "ING-INF/05", verified: true },
              { id: "sapienza-ing-inf-2-basi-di-dati", name: "Basi di dati", ssd: "ING-INF/05", verified: true }
            ]
          }
        ]
      }
    ]
  },

  {
    id: "unina",
    name: "Università degli Studi di Napoli Federico II",
    short: "Federico II",
    city: "Napoli",
    type: "Statale",
    verified: true,
    degrees: [
      {
        id: "unina-medicina",
        name: "Medicina e Chirurgia",
        class: "LM-41",
        verified: true,
        years: [
          {
            id: "unina-medicina-1",
            year: 1,
            verified: true,
            exams: [
              { id: "unina-medicina-1-anatomia", name: "Anatomia umana", ssd: "BIO/16", verified: true },
              { id: "unina-medicina-1-istologia", name: "Istologia", ssd: "BIO/17", verified: true },
              { id: "unina-medicina-1-chimica", name: "Chimica e biochimica", ssd: "BIO/10", verified: true }
            ]
          },
          {
            id: "unina-medicina-2",
            year: 2,
            verified: false,
            exams: [
              { id: "unina-medicina-2-fisiologia", name: "Fisiologia umana", ssd: "BIO/09", verified: true },
              { id: "unina-medicina-2-anatomia", name: "Anatomia topografica", ssd: "BIO/16", verified: true },
              { id: "unina-medicina-2-microbiologia", name: "Microbiologia", ssd: "MED/07", verified: true }
            ]
          }
        ]
      }
    ]
  }
];

/* Catalogo atenei aggiuntivi: elenco reale, privi ancora di corsi popolati.
   Sono elencati in modo trasparente come "in preparazione" invece che
   riempiti con dati fittizi. */
const PENDING_UNIVERSITIES = [
  "Politecnico di Milano",
  "Università Ca' Foscari Venezia",
  "Università degli Studi di Firenze",
  "Università di Pisa",
  "Università degli Studi di Torino",
  "Università Cattolica del Sacro Cuore",
  "Università Commerciale Luigi Bocconi",
  "Università degli Studi di Bari Aldo Moro",
  "Università degli Studi di Palermo",
  "Università degli Studi di Catania",
  "Università degli Studi di Genova",
  "Università degli Studi di Pavia",
  "Università degli Studi di Siena",
  "Università degli Studi di Perugia",
  "Università degli Studi di Verona",
  "Università degli Studi di Trento",
  "Università degli Studi di Modena e Reggio Emilia",
  "Università degli Studi di Parma",
  "Università degli Studi Roma Tre",
  "Università degli Studi di Trieste",
  "Università degli Studi di Udine",
  "Università degli Studi di Cagliari",
  "Università degli Studi di Salerno",
  "Università degli Studi della Campania Luigi Vanvitelli"
];

export { UNIVERSITIES, PENDING_UNIVERSITIES };
