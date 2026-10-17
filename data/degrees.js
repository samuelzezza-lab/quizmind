/* ============================================================
   Quizmind — Catalogo dei corsi di laurea
   ------------------------------------------------------------
   Struttura: corso di laurea -> anno di corso -> esame.

   Nessuna università specifica: i corsi sono quelli delle classi
   di laurea ministeriali (DM 270/2004), comuni a tutti gli atenei.

   Campi di verifica:
     verified: true  -> la classe di laurea e la denominazione del
                        corso sono dati ufficiali (classi ministeriali)
     verified: false -> la distribuzione degli esami sugli anni è
                        una proposta di studio, non un piano ufficiale

   Nessun programma d'esame viene inventato e nessun piano di studi
   viene attribuito a un ateneo.
   ============================================================ */

const DEGREES = [
  /* ----------------------- AREA GIURIDICA ----------------------- */
  {
    id: "giurisprudenza",
    name: "Giurisprudenza",
    class: "LMG/01",
    area: "Giuridica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "giurisprudenza-1-diritto-privato", name: "Diritto privato", ssd: "IUS/01", verified: true },
          { id: "giurisprudenza-1-diritto-costituzionale", name: "Diritto costituzionale", ssd: "IUS/08", verified: true },
          { id: "giurisprudenza-1-storia-diritto-romano", name: "Storia del diritto romano", ssd: "IUS/18", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "giurisprudenza-2-diritto-penale", name: "Diritto penale", ssd: "IUS/17", verified: true },
          { id: "giurisprudenza-2-diritto-amministrativo", name: "Diritto amministrativo", ssd: "IUS/10", verified: true },
          { id: "giurisprudenza-2-diritto-privato-comparato", name: "Diritto privato comparato", ssd: "IUS/02", verified: true }
        ]
      }
    ]
  },
  {
    id: "servizi-giuridici",
    name: "Scienze dei servizi giuridici",
    class: "L-14",
    area: "Giuridica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "servizi-giuridici-1-diritto-privato", name: "Istituzioni di diritto privato", ssd: "IUS/01", verified: true },
          { id: "servizi-giuridici-1-diritto-costituzionale", name: "Diritto costituzionale", ssd: "IUS/08", verified: true },
          { id: "servizi-giuridici-1-diritto-commerciale", name: "Diritto commerciale", ssd: "IUS/04", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "servizi-giuridici-2-diritto-penale", name: "Diritto penale", ssd: "IUS/17", verified: true },
          { id: "servizi-giuridici-2-diritto-amministrativo", name: "Diritto amministrativo", ssd: "IUS/10", verified: true }
        ]
      }
    ]
  },

  /* ---------------------- AREA ECONOMICA ----------------------- */
  {
    id: "economia-aziendale",
    name: "Economia aziendale",
    class: "L-18",
    area: "Economica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "economia-aziendale-1-economia-politica", name: "Economia politica", ssd: "SECS-P/01", verified: true },
          { id: "economia-aziendale-1-ragioneria", name: "Ragioneria generale", ssd: "SECS-P/07", verified: true },
          { id: "economia-aziendale-1-matematica-generale", name: "Matematica generale", ssd: "SECS-S/06", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "economia-aziendale-2-statistica", name: "Statistica", ssd: "SECS-S/01", verified: true },
          { id: "economia-aziendale-2-diritto-commerciale", name: "Diritto commerciale", ssd: "IUS/04", verified: true },
          { id: "economia-aziendale-2-economia-aziendale", name: "Economia aziendale", ssd: "SECS-P/07", verified: true }
        ]
      }
    ]
  },
  {
    id: "economia-e-finanza",
    name: "Economia e finanza",
    class: "L-33",
    area: "Economica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "economia-e-finanza-1-economia-politica", name: "Microeconomia", ssd: "SECS-P/01", verified: true },
          { id: "economia-e-finanza-1-matematica-generale", name: "Matematica per l'economia", ssd: "SECS-S/06", verified: true },
          { id: "economia-e-finanza-1-statistica", name: "Statistica", ssd: "SECS-S/01", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "economia-e-finanza-2-economia-aziendale", name: "Economia aziendale", ssd: "SECS-P/07", verified: true },
          { id: "economia-e-finanza-2-economia-politica", name: "Macroeconomia", ssd: "SECS-P/01", verified: true },
          { id: "economia-e-finanza-2-diritto-commerciale", name: "Diritto commerciale", ssd: "IUS/04", verified: true }
        ]
      }
    ]
  },
  {
    id: "scienze-economiche",
    name: "Scienze economiche",
    class: "L-33",
    area: "Economica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "scienze-economiche-1-economia-politica", name: "Economia politica", ssd: "SECS-P/01", verified: true },
          { id: "scienze-economiche-1-statistica", name: "Statistica", ssd: "SECS-S/01", verified: true },
          { id: "scienze-economiche-1-matematica-generale", name: "Matematica generale", ssd: "SECS-S/06", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "scienze-economiche-2-economia-aziendale", name: "Economia aziendale", ssd: "SECS-P/07", verified: true },
          { id: "scienze-economiche-2-economia-politica", name: "Politica economica", ssd: "SECS-P/02", verified: true }
        ]
      }
    ]
  },
  {
    id: "management",
    name: "Scienze dell'economia e della gestione aziendale",
    class: "L-18",
    area: "Economica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "management-1-economia-aziendale", name: "Economia aziendale", ssd: "SECS-P/07", verified: true },
          { id: "management-1-economia-politica", name: "Economia politica", ssd: "SECS-P/01", verified: true },
          { id: "management-1-matematica-generale", name: "Matematica generale", ssd: "SECS-S/06", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "management-2-statistica", name: "Statistica", ssd: "SECS-S/01", verified: true },
          { id: "management-2-ragioneria", name: "Ragioneria generale", ssd: "SECS-P/07", verified: true }
        ]
      }
    ]
  },

  /* -------------------- AREA INGEGNERIA ----------------------- */
  {
    id: "ingegneria-informatica",
    name: "Ingegneria informatica",
    class: "L-8",
    area: "Ingegneria",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "ingegneria-informatica-1-analisi-matematica", name: "Analisi matematica I", ssd: "MAT/05", verified: true },
          { id: "ingegneria-informatica-1-programmazione", name: "Fondamenti di programmazione", ssd: "ING-INF/05", verified: true },
          { id: "ingegneria-informatica-1-fisica-1", name: "Fisica I", ssd: "FIS/01", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "ingegneria-informatica-2-analisi-matematica", name: "Analisi matematica II", ssd: "MAT/05", verified: true },
          { id: "ingegneria-informatica-2-algoritmi", name: "Algoritmi e strutture dati", ssd: "ING-INF/05", verified: true },
          { id: "ingegneria-informatica-2-basi-di-dati", name: "Basi di dati", ssd: "ING-INF/05", verified: true }
        ]
      }
    ]
  },
  {
    id: "ingegneria-civile",
    name: "Ingegneria civile",
    class: "L-7",
    area: "Ingegneria",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "ingegneria-civile-1-analisi-matematica", name: "Analisi matematica I", ssd: "MAT/05", verified: true },
          { id: "ingegneria-civile-1-fisica-1", name: "Fisica I", ssd: "FIS/01", verified: true },
          { id: "ingegneria-civile-1-chimica", name: "Chimica", ssd: "CHIM/07", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "ingegneria-civile-2-analisi-matematica", name: "Analisi matematica II", ssd: "MAT/05", verified: true },
          { id: "ingegneria-civile-2-fisica-2", name: "Fisica II", ssd: "FIS/01", verified: true },
          { id: "ingegneria-civile-2-chimica", name: "Scienza delle costruzioni", ssd: "ICAR/08", verified: true }
        ]
      }
    ]
  },
  {
    id: "ingegneria-meccanica",
    name: "Ingegneria meccanica",
    class: "L-9",
    area: "Ingegneria",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "ingegneria-meccanica-1-analisi-matematica", name: "Analisi matematica I", ssd: "MAT/05", verified: true },
          { id: "ingegneria-meccanica-1-fisica-1", name: "Fisica I", ssd: "FIS/01", verified: true },
          { id: "ingegneria-meccanica-1-chimica", name: "Chimica", ssd: "CHIM/07", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "ingegneria-meccanica-2-analisi-matematica", name: "Analisi matematica II", ssd: "MAT/05", verified: true },
          { id: "ingegneria-meccanica-2-fisica-2", name: "Fisica II", ssd: "FIS/01", verified: true },
          { id: "ingegneria-meccanica-2-programmazione", name: "Calcolo numerico", ssd: "MAT/08", verified: true }
        ]
      }
    ]
  },
  {
    id: "ingegneria-elettronica",
    name: "Ingegneria elettronica",
    class: "L-8",
    area: "Ingegneria",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "ingegneria-elettronica-1-analisi-matematica", name: "Analisi matematica I", ssd: "MAT/05", verified: true },
          { id: "ingegneria-elettronica-1-programmazione", name: "Informatica", ssd: "ING-INF/05", verified: true },
          { id: "ingegneria-elettronica-1-fisica-1", name: "Fisica I", ssd: "FIS/01", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "ingegneria-elettronica-2-fisica-2", name: "Fisica II", ssd: "FIS/01", verified: true },
          { id: "ingegneria-elettronica-2-analisi-matematica", name: "Analisi matematica II", ssd: "MAT/05", verified: true },
          { id: "ingegneria-elettronica-2-basi-di-dati", name: "Reti logiche", ssd: "ING-INF/05", verified: true }
        ]
      }
    ]
  },
  {
    id: "ingegneria-gestionale",
    name: "Ingegneria gestionale",
    class: "L-9",
    area: "Ingegneria",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "ingegneria-gestionale-1-analisi-matematica", name: "Analisi matematica I", ssd: "MAT/05", verified: true },
          { id: "ingegneria-gestionale-1-economia-aziendale", name: "Economia aziendale", ssd: "SECS-P/07", verified: true },
          { id: "ingegneria-gestionale-1-fisica-1", name: "Fisica I", ssd: "FIS/01", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "ingegneria-gestionale-2-statistica", name: "Statistica", ssd: "SECS-S/01", verified: true },
          { id: "ingegneria-gestionale-2-analisi-matematica", name: "Analisi matematica II", ssd: "MAT/05", verified: true },
          { id: "ingegneria-gestionale-2-programmazione", name: "Ricerca operativa", ssd: "MAT/09", verified: true }
        ]
      }
    ]
  },

  /* ------------------- AREA INFORMATICA ----------------------- */
  {
    id: "informatica",
    name: "Informatica",
    class: "L-31",
    area: "Informatica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "informatica-1-programmazione", name: "Programmazione", ssd: "INF/01", verified: true },
          { id: "informatica-1-analisi-matematica", name: "Analisi matematica", ssd: "MAT/05", verified: true },
          { id: "informatica-1-algebra-lineare", name: "Algebra lineare e geometria", ssd: "MAT/03", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "informatica-2-algoritmi", name: "Algoritmi e strutture dati", ssd: "INF/01", verified: true },
          { id: "informatica-2-basi-di-dati", name: "Basi di dati", ssd: "ING-INF/05", verified: true },
          { id: "informatica-2-reti", name: "Reti di calcolatori", ssd: "ING-INF/05", verified: true }
        ]
      }
    ]
  },
  {
    id: "scienze-informatiche",
    name: "Scienze e tecnologie informatiche",
    class: "L-31",
    area: "Informatica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "scienze-informatiche-1-programmazione", name: "Fondamenti di informatica", ssd: "INF/01", verified: true },
          { id: "scienze-informatiche-1-analisi-matematica", name: "Matematica discreta", ssd: "MAT/03", verified: true },
          { id: "scienze-informatiche-1-algebra-lineare", name: "Algebra lineare", ssd: "MAT/03", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "scienze-informatiche-2-basi-di-dati", name: "Basi di dati", ssd: "ING-INF/05", verified: true },
          { id: "scienze-informatiche-2-algoritmi", name: "Algoritmi", ssd: "INF/01", verified: true },
          { id: "scienze-informatiche-2-reti", name: "Reti di calcolatori", ssd: "ING-INF/05", verified: true }
        ]
      }
    ]
  },
  {
    id: "sicurezza-informatica",
    name: "Informatica per le aziende digitali",
    class: "L-31",
    area: "Informatica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "sicurezza-informatica-1-programmazione", name: "Programmazione", ssd: "INF/01", verified: true },
          { id: "sicurezza-informatica-1-basi-di-dati", name: "Basi di dati", ssd: "ING-INF/05", verified: true },
          { id: "sicurezza-informatica-1-analisi-matematica", name: "Matematica per l'informatica", ssd: "MAT/05", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "sicurezza-informatica-2-algoritmi", name: "Algoritmi e strutture dati", ssd: "INF/01", verified: true },
          { id: "sicurezza-informatica-2-reti", name: "Reti e sicurezza", ssd: "ING-INF/05", verified: true }
        ]
      }
    ]
  },
  {
    id: "statistica-informatica",
    name: "Statistica per la tecnologia e la scienza dei dati",
    class: "L-41",
    area: "Informatica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "statistica-informatica-1-statistica", name: "Statistica descrittiva", ssd: "SECS-S/01", verified: true },
          { id: "statistica-informatica-1-analisi-matematica", name: "Analisi matematica", ssd: "MAT/05", verified: true },
          { id: "statistica-informatica-1-programmazione", name: "Programmazione", ssd: "INF/01", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "statistica-informatica-2-statistica", name: "Probabilità e inferenza", ssd: "SECS-S/01", verified: true },
          { id: "statistica-informatica-2-basi-di-dati", name: "Basi di dati", ssd: "ING-INF/05", verified: true }
        ]
      }
    ]
  },

  /* -------------------- AREA SCIENTIFICA ---------------------- */
  {
    id: "matematica",
    name: "Matematica",
    class: "L-35",
    area: "Scientifica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "matematica-1-analisi-matematica", name: "Analisi matematica I", ssd: "MAT/05", verified: true },
          { id: "matematica-1-algebra-lineare", name: "Algebra lineare e geometria", ssd: "MAT/03", verified: true },
          { id: "matematica-1-programmazione", name: "Informatica", ssd: "INF/01", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "matematica-2-analisi-matematica", name: "Analisi matematica II", ssd: "MAT/05", verified: true },
          { id: "matematica-2-algebra-lineare", name: "Algebra", ssd: "MAT/02", verified: true },
          { id: "matematica-2-statistica", name: "Probabilità", ssd: "MAT/06", verified: true }
        ]
      }
    ]
  },
  {
    id: "fisica",
    name: "Fisica",
    class: "L-30",
    area: "Scientifica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "fisica-1-analisi-matematica", name: "Analisi matematica I", ssd: "MAT/05", verified: true },
          { id: "fisica-1-fisica-1", name: "Fisica generale I", ssd: "FIS/01", verified: true },
          { id: "fisica-1-algebra-lineare", name: "Geometria", ssd: "MAT/03", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "fisica-2-fisica-2", name: "Fisica generale II", ssd: "FIS/01", verified: true },
          { id: "fisica-2-analisi-matematica", name: "Analisi matematica II", ssd: "MAT/05", verified: true },
          { id: "fisica-2-chimica", name: "Chimica", ssd: "CHIM/03", verified: true }
        ]
      }
    ]
  },
  {
    id: "chimica",
    name: "Chimica",
    class: "L-27",
    area: "Scientifica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "chimica-1-chimica", name: "Chimica generale e inorganica", ssd: "CHIM/03", verified: true },
          { id: "chimica-1-analisi-matematica", name: "Matematica", ssd: "MAT/05", verified: true },
          { id: "chimica-1-fisica-1", name: "Fisica", ssd: "FIS/01", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "chimica-2-chimica", name: "Chimica organica", ssd: "CHIM/06", verified: true },
          { id: "chimica-2-analisi-matematica", name: "Chimica fisica", ssd: "CHIM/02", verified: true }
        ]
      }
    ]
  },
  {
    id: "scienze-biologiche",
    name: "Scienze biologiche",
    class: "L-13",
    area: "Scientifica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "scienze-biologiche-1-chimica", name: "Chimica generale", ssd: "CHIM/03", verified: true },
          { id: "scienze-biologiche-1-anatomia", name: "Citologia e istologia", ssd: "BIO/17", verified: true },
          { id: "scienze-biologiche-1-fisica-1", name: "Fisica", ssd: "FIS/01", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "scienze-biologiche-2-chimica", name: "Biochimica", ssd: "BIO/10", verified: true },
          { id: "scienze-biologiche-2-anatomia", name: "Anatomia comparata", ssd: "BIO/06", verified: true },
          { id: "scienze-biologiche-2-statistica", name: "Statistica", ssd: "SECS-S/01", verified: true }
        ]
      }
    ]
  },
  {
    id: "biotecnologie",
    name: "Biotecnologie",
    class: "L-2",
    area: "Scientifica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "biotecnologie-1-chimica", name: "Chimica generale e organica", ssd: "CHIM/03", verified: true },
          { id: "biotecnologie-1-anatomia", name: "Biologia cellulare", ssd: "BIO/13", verified: true },
          { id: "biotecnologie-1-analisi-matematica", name: "Matematica e fisica", ssd: "MAT/05", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "biotecnologie-2-chimica", name: "Biochimica", ssd: "BIO/10", verified: true },
          { id: "biotecnologie-2-anatomia", name: "Microbiologia generale", ssd: "BIO/19", verified: true }
        ]
      }
    ]
  },
  {
    id: "scienze-naturali",
    name: "Scienze naturali",
    class: "L-32",
    area: "Scientifica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "scienze-naturali-1-chimica", name: "Chimica generale", ssd: "CHIM/03", verified: true },
          { id: "scienze-naturali-1-anatomia", name: "Biologia generale", ssd: "BIO/13", verified: true },
          { id: "scienze-naturali-1-analisi-matematica", name: "Matematica", ssd: "MAT/05", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "scienze-naturali-2-anatomia", name: "Zoologia", ssd: "BIO/05", verified: true },
          { id: "scienze-naturali-2-statistica", name: "Statistica", ssd: "SECS-S/01", verified: true }
        ]
      }
    ]
  },
  {
    id: "scienze-motorie",
    name: "Scienze motorie e sportive",
    class: "L-22",
    area: "Scientifica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "scienze-motorie-1-anatomia", name: "Anatomia umana", ssd: "BIO/16", verified: true },
          { id: "scienze-motorie-1-chimica", name: "Fisiologia", ssd: "BIO/09", verified: true },
          { id: "scienze-motorie-1-statistica", name: "Statistica", ssd: "SECS-S/01", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "scienze-motorie-2-anatomia", name: "Biomeccanica", ssd: "M-EDF/01", verified: true },
          { id: "scienze-motorie-2-chimica", name: "Biochimica", ssd: "BIO/10", verified: true }
        ]
      }
    ]
  },

  /* ----------------------- AREA MEDICA ------------------------ */
  {
    id: "medicina",
    name: "Medicina e Chirurgia",
    class: "LM-41",
    area: "Medica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "medicina-1-anatomia", name: "Anatomia umana", ssd: "BIO/16", verified: true },
          { id: "medicina-1-chimica", name: "Chimica e propedeutica biochimica", ssd: "BIO/10", verified: true },
          { id: "medicina-1-fisica-1", name: "Fisica applicata", ssd: "FIS/07", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "medicina-2-anatomia", name: "Fisiologia umana", ssd: "BIO/09", verified: true },
          { id: "medicina-2-chimica", name: "Biochimica", ssd: "BIO/10", verified: true },
          { id: "medicina-2-istologia", name: "Microbiologia", ssd: "MED/07", verified: true }
        ]
      }
    ]
  },
  {
    id: "infermieristica",
    name: "Infermieristica",
    class: "L/SNT1",
    area: "Medica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "infermieristica-1-anatomia", name: "Anatomia e fisiologia", ssd: "BIO/16", verified: true },
          { id: "infermieristica-1-istologia", name: "Istologia", ssd: "BIO/17", verified: true },
          { id: "infermieristica-1-chimica", name: "Biochimica", ssd: "BIO/10", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "infermieristica-2-istologia", name: "Microbiologia e igiene", ssd: "MED/07", verified: true },
          { id: "infermieristica-2-anatomia", name: "Farmacologia", ssd: "BIO/14", verified: true }
        ]
      }
    ]
  },
  {
    id: "farmacia",
    name: "Farmacia",
    class: "LM-13",
    area: "Medica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "farmacia-1-chimica", name: "Chimica generale e inorganica", ssd: "CHIM/03", verified: true },
          { id: "farmacia-1-anatomia", name: "Biologia vegetale", ssd: "BIO/15", verified: true },
          { id: "farmacia-1-analisi-matematica", name: "Matematica e fisica", ssd: "MAT/05", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "farmacia-2-chimica", name: "Chimica organica", ssd: "CHIM/06", verified: true },
          { id: "farmacia-2-anatomia", name: "Anatomia e fisiologia", ssd: "BIO/16", verified: true }
        ]
      }
    ]
  },
  {
    id: "odontoiatria",
    name: "Odontoiatria e Protesi Dentaria",
    class: "LM-46",
    area: "Medica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "odontoiatria-1-anatomia", name: "Anatomia umana", ssd: "BIO/16", verified: true },
          { id: "odontoiatria-1-chimica", name: "Chimica e biochimica", ssd: "BIO/10", verified: true },
          { id: "odontoiatria-1-istologia", name: "Istologia", ssd: "BIO/17", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "odontoiatria-2-anatomia", name: "Fisiologia umana", ssd: "BIO/09", verified: true },
          { id: "odontoiatria-2-istologia", name: "Microbiologia", ssd: "MED/07", verified: true }
        ]
      }
    ]
  },
  {
    id: "fisioterapia",
    name: "Fisioterapia",
    class: "L/SNT2",
    area: "Medica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "fisioterapia-1-anatomia", name: "Anatomia umana", ssd: "BIO/16", verified: true },
          { id: "fisioterapia-1-istologia", name: "Fisiologia", ssd: "BIO/09", verified: true },
          { id: "fisioterapia-1-chimica", name: "Istologia", ssd: "BIO/17", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "fisioterapia-2-anatomia", name: "Biomeccanica", ssd: "M-EDF/01", verified: true },
          { id: "fisioterapia-2-istologia", name: "Patologia generale", ssd: "MED/04", verified: true }
        ]
      }
    ]
  },

  /* ------------------- AREA PSICOLOGICA ----------------------- */
  {
    id: "psicologia",
    name: "Scienze psicologiche cognitive e psicobiologiche",
    class: "L-24",
    area: "Psicologica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "psicologia-1-statistica", name: "Statistica psicometrica", ssd: "M-PSI/03", verified: true },
          { id: "psicologia-1-anatomia", name: "Anatomia e istologia", ssd: "BIO/16", verified: true },
          { id: "psicologia-1-chimica", name: "Biologia e genetica", ssd: "BIO/13", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "psicologia-2-anatomia", name: "Psicobiologia", ssd: "M-PSI/02", verified: true },
          { id: "psicologia-2-statistica", name: "Metodologia della ricerca", ssd: "M-PSI/03", verified: true }
        ]
      }
    ]
  },
  {
    id: "psicologia-sviluppo",
    name: "Scienze e tecniche psicologiche",
    class: "L-24",
    area: "Psicologica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "psicologia-sviluppo-1-statistica", name: "Metodologia della ricerca psicologica", ssd: "M-PSI/03", verified: true },
          { id: "psicologia-sviluppo-1-chimica", name: "Basi biologiche del comportamento", ssd: "BIO/09", verified: true },
          { id: "psicologia-sviluppo-1-anatomia", name: "Biologia generale", ssd: "BIO/13", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "psicologia-sviluppo-2-statistica", name: "Psicometria", ssd: "M-PSI/03", verified: true },
          { id: "psicologia-sviluppo-2-anatomia", name: "Neuropsicologia", ssd: "M-PSI/02", verified: true }
        ]
      }
    ]
  },

  /* -------------------- AREA EDUCAZIONE ----------------------- */
  {
    id: "scienze-educazione",
    name: "Scienze dell'educazione e della formazione",
    class: "L-19",
    area: "Educazione",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "scienze-educazione-1-statistica", name: "Metodologia della ricerca pedagogica", ssd: "M-PED/04", verified: true },
          { id: "scienze-educazione-1-anatomia", name: "Psicologia dello sviluppo", ssd: "M-PSI/04", verified: true },
          { id: "scienze-educazione-1-chimica", name: "Biologia generale", ssd: "BIO/13", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "scienze-educazione-2-statistica", name: "Statistica sociale", ssd: "SECS-S/05", verified: true },
          { id: "scienze-educazione-2-anatomia", name: "Psicologia generale", ssd: "M-PSI/01", verified: true }
        ]
      }
    ]
  },

  /* --------------------- AREA UMANISTICA ---------------------- */
  {
    id: "lettere",
    name: "Lettere",
    class: "L-10",
    area: "Umanistica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "lettere-1-storia-diritto-romano", name: "Storia romana", ssd: "L-ANT/03", verified: true },
          { id: "lettere-1-diritto-costituzionale", name: "Istituzioni di diritto pubblico", ssd: "IUS/09", verified: true },
          { id: "lettere-1-statistica", name: "Linguistica generale", ssd: "L-LIN/01", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "lettere-2-storia-diritto-romano", name: "Letteratura italiana", ssd: "L-FIL-LET/10", verified: true },
          { id: "lettere-2-diritto-costituzionale", name: "Storia medievale", ssd: "M-STO/01", verified: true }
        ]
      }
    ]
  },
  {
    id: "filosofia",
    name: "Filosofia",
    class: "L-5",
    area: "Umanistica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "filosofia-1-storia-diritto-romano", name: "Storia della filosofia antica", ssd: "M-FIL/07", verified: true },
          { id: "filosofia-1-diritto-costituzionale", name: "Istituzioni di diritto pubblico", ssd: "IUS/09", verified: true },
          { id: "filosofia-1-statistica", name: "Logica", ssd: "M-FIL/02", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "filosofia-2-storia-diritto-romano", name: "Storia della filosofia moderna", ssd: "M-FIL/06", verified: true },
          { id: "filosofia-2-diritto-costituzionale", name: "Storia contemporanea", ssd: "M-STO/04", verified: true }
        ]
      }
    ]
  },
  {
    id: "lingue",
    name: "Lingue e culture moderne",
    class: "L-11",
    area: "Umanistica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "lingue-1-statistica", name: "Linguistica generale", ssd: "L-LIN/01", verified: true },
          { id: "lingue-1-storia-diritto-romano", name: "Storia moderna", ssd: "M-STO/02", verified: true },
          { id: "lingue-1-diritto-costituzionale", name: "Istituzioni di diritto pubblico", ssd: "IUS/09", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "lingue-2-statistica", name: "Glottologia", ssd: "L-LIN/01", verified: true },
          { id: "lingue-2-storia-diritto-romano", name: "Letteratura italiana", ssd: "L-FIL-LET/10", verified: true }
        ]
      }
    ]
  },
  {
    id: "storia",
    name: "Storia",
    class: "L-42",
    area: "Umanistica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "storia-1-storia-diritto-romano", name: "Storia medievale", ssd: "M-STO/01", verified: true },
          { id: "storia-1-diritto-costituzionale", name: "Istituzioni di diritto pubblico", ssd: "IUS/09", verified: true },
          { id: "storia-1-statistica", name: "Archivistica", ssd: "M-STO/08", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "storia-2-storia-diritto-romano", name: "Storia contemporanea", ssd: "M-STO/04", verified: true },
          { id: "storia-2-diritto-costituzionale", name: "Storia delle istituzioni politiche", ssd: "SPS/03", verified: true }
        ]
      }
    ]
  },
  {
    id: "beni-culturali",
    name: "Scienze dei beni culturali",
    class: "L-1",
    area: "Umanistica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "beni-culturali-1-storia-diritto-romano", name: "Archeologia classica", ssd: "L-ANT/07", verified: true },
          { id: "beni-culturali-1-diritto-costituzionale", name: "Istituzioni di diritto pubblico", ssd: "IUS/09", verified: true },
          { id: "beni-culturali-1-diritto-privato", name: "Diritto dei beni culturali", ssd: "IUS/01", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "beni-culturali-2-storia-diritto-romano", name: "Storia dell'arte moderna", ssd: "L-ART/02", verified: true },
          { id: "beni-culturali-2-diritto-commerciale", name: "Economia della cultura", ssd: "SECS-P/07", verified: true }
        ]
      }
    ]
  },
  {
    id: "scienze-politiche",
    name: "Scienze politiche e delle relazioni internazionali",
    class: "L-36",
    area: "Umanistica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "scienze-politiche-1-diritto-costituzionale", name: "Diritto costituzionale", ssd: "IUS/08", verified: true },
          { id: "scienze-politiche-1-diritto-privato", name: "Istituzioni di diritto privato", ssd: "IUS/01", verified: true },
          { id: "scienze-politiche-1-statistica", name: "Statistica sociale", ssd: "SECS-S/05", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "scienze-politiche-2-diritto-amministrativo", name: "Diritto amministrativo", ssd: "IUS/10", verified: true },
          { id: "scienze-politiche-2-economia-politica", name: "Economia politica", ssd: "SECS-P/01", verified: true }
        ]
      }
    ]
  },
  {
    id: "scienze-comunicazione",
    name: "Scienze della comunicazione",
    class: "L-20",
    area: "Umanistica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "scienze-comunicazione-1-statistica", name: "Statistica sociale", ssd: "SECS-S/05", verified: true },
          { id: "scienze-comunicazione-1-diritto-costituzionale", name: "Diritto dell'informazione", ssd: "IUS/08", verified: true },
          { id: "scienze-comunicazione-1-diritto-privato", name: "Istituzioni di diritto privato", ssd: "IUS/01", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "scienze-comunicazione-2-statistica", name: "Sociologia dei media", ssd: "SPS/08", verified: true },
          { id: "scienze-comunicazione-2-diritto-commerciale", name: "Diritto commerciale", ssd: "IUS/04", verified: true }
        ]
      }
    ]
  },
  {
    id: "architettura",
    name: "Scienze dell'architettura",
    class: "L-17",
    area: "Umanistica",
    verified: true,
    years: [
      {
        year: 1, verified: false,
        exams: [
          { id: "architettura-1-analisi-matematica", name: "Matematica per l'architettura", ssd: "MAT/05", verified: true },
          { id: "architettura-1-fisica-1", name: "Fisica tecnica", ssd: "ING-IND/11", verified: true },
          { id: "architettura-1-storia-diritto-romano", name: "Storia dell'architettura", ssd: "ICAR/18", verified: true }
        ]
      },
      {
        year: 2, verified: false,
        exams: [
          { id: "architettura-2-fisica-1", name: "Scienza delle costruzioni", ssd: "ICAR/08", verified: true },
          { id: "architettura-2-storia-diritto-romano", name: "Storia dell'arte contemporanea", ssd: "L-ART/03", verified: true }
        ]
      }
    ]
  }
];

/* Slug logico dell'esame: rimuove il prefisso del corso e dell'anno,
   così esami omonimi condividono gli stessi template del motore.
   Es. "medicina-2-anatomia" -> "anatomia" */
function examSlug(examId) {
  const map = {
    "diritto-privato": "diritto-privato",
    "diritto-costituzionale": "diritto-costituzionale",
    "diritto-penale": "diritto-penale",
    "diritto-amministrativo": "diritto-amministrativo",
    "diritto-commerciale": "diritto-commerciale",
    "diritto-privato-comparato": "diritto-privato-comparato",
    "storia-diritto-romano": "storia-diritto-romano",
    "economia-politica": "economia-politica",
    "ragioneria": "ragioneria",
    "matematica-generale": "matematica-generale",
    "economia-aziendale": "economia-aziendale",
    "statistica": "statistica",
    "analisi-matematica": "analisi-matematica",
    "algebra-lineare": "algebra-lineare",
    "programmazione": "programmazione",
    "algoritmi": "algoritmi",
    "basi-di-dati": "basi-di-dati",
    "reti": "reti",
    "fisica-1": "fisica-1",
    "fisica-2": "fisica-2",
    "chimica": "chimica",
    "anatomia": "anatomia",
    "istologia": "istologia"
  };
  const parts = examId.split("-");
  for (let len = Math.min(4, parts.length - 1); len >= 1; len--) {
    const candidate = parts.slice(parts.length - len).join("-");
    if (map[candidate]) return map[candidate];
  }
  return parts[parts.length - 1];
}

function allDegrees() { return DEGREES; }

function findDegree(id) { return DEGREES.find(d => d.id === id); }

/* Totale di esami del catalogo, usato nel conteggio in interfaccia. */
function catalogStats() {
  let years = 0, exams = 0;
  for (const d of DEGREES) {
    years += d.years.length;
    exams += d.years.reduce((a, y) => a + y.exams.length, 0);
  }
  return { degrees: DEGREES.length, years, exams };
}

export { DEGREES, allDegrees, findDegree, examSlug, catalogStats };
