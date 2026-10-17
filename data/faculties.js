/* ============================================================
   Quizmind — Catalogo delle facoltà
   ------------------------------------------------------------
   Struttura: id facoltà -> nome, durata, esami per anno di corso.

   Le denominazioni degli esami e la loro distribuzione sugli anni
   sono quelle fornite come programma di riferimento della
   piattaforma. Nessun piano di studi viene attribuito a un
   singolo ateneo: gli esami appartengono alla facoltà e valgono
   per tutti gli atenei che la erogano.
   ============================================================ */

const FACULTIES_CATALOG = {
  scienze_educazione: {
    name: "Scienze dell'Educazione e della Formazione",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Pedagogia Generale e Sociale", "Storia della Pedagogia", "Psicologia dello Sviluppo", "Sociologia dell'Educazione"],
      2: ["Didattica e Pedagogia Speciale", "Metodologia Ricerca Educativa", "Psicologia dell'Educazione", "Letteratura per Infanzia"],
      3: ["Tecnologie dell'Istruzione", "Valutazione Processi Formativi", "Deontologia dell'Educatore"]
    }
  },
  medicina_chirurgia: {
    name: "Medicina e Chirurgia",
    duration: 6,
    src: "ufficiale",
    years: {
      1: ["Biochimica e Biologia Molecolare", "Anatomia Umana I", "Istologia ed Embriologia", "Fisica Medica"],
      2: ["Anatomia Umana II", "Fisiologia Umana", "Microbiologia e Virologia", "Immunologia"],
      3: ["Patologia Generale e Fisiopatologia", "Farmacologia Generale", "Semeiotica Medica e Chirurgica"],
      4: ["Anatomia Patologica", "Malattie Apparato Cardiovascolare", "Gastroenterologia ed Endocrinologia"],
      5: ["Neurologia e Psichiatria", "Ginecologia ed Ostetricia", "Pediatria Generale"],
      6: ["Medicina Legale", "Clinica Medica e Chirurgia Generale", "Medicina d'Urgenza"]
    }
  },
  giurisprudenza: {
    name: "Giurisprudenza",
    duration: 5,
    src: "ufficiale",
    years: {
      1: ["Diritto Privato I", "Diritto Costituzionale", "Storia del Diritto Romano"],
      2: ["Diritto Privato II", "Diritto Penale I", "Diritto Commerciale"],
      3: ["Diritto Penale II", "Diritto Amministrativo I", "Diritto del Lavoro"],
      4: ["Diritto Processuale Civile", "Diritto Processuale Penale", "Diritto Civile"],
      5: ["Diritto della Crisi d'Impresa", "Diritto Penale Commerciale", "Medicina Legale"]
    }
  },
  economia: {
    name: "Economia e Gestione Aziendale",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Economia Aziendale", "Microeconomia", "Matematica Generale", "Diritto Privato"],
      2: ["Macroeconomia", "Statistica", "Diritto Commerciale", "Economia e Gestione delle Imprese"],
      3: ["Programmazione e Controllo", "Finanza Aziendale", "Diritto Tributario", "Marketing"]
    }
  },
  ingegneria_meccanica: {
    name: "Ingegneria Meccanica",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Analisi Matematica I", "Fisica I", "Geometria e Algebra", "Disegno Tecnico Industriale"],
      2: ["Analisi Matematica II", "Fisica II", "Meccanica Razionale", "Scienza delle Costruzioni"],
      3: ["Fisica Tecnica Industriale", "Meccanica Applicata alle Macchine", "Tecnologia Meccanica", "Costruzione di Macchine"]
    }
  },
  ingegneria_informatica: {
    name: "Ingegneria Informatica",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Analisi Matematica I", "Programmazione e Strutture Dati", "Geometria", "Fisica I"],
      2: ["Algoritmi e Architetture degli Elaboratori", "Sistemi Operativi", "Reti di Calcolatori", "Basi di Dati"],
      3: ["Ingegneria del Software", "Elettronica Digitale", "Automatica", "Sicurezza Informatica"]
    }
  },
  fisica: {
    name: "Fisica",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Analisi Matematica I", "Fisica Generale I (Meccanica)", "Geometria", "Informatica per la Fisica"],
      2: ["Analisi Matematica II", "Fisica Generale II (Elettromagnetismo)", "Meccanica Razionale", "Laboratorio di Fisica II"],
      3: ["Istituzioni di Fisica Teorica", "Fisica della Materia", "Fisica Nucleare", "Metodi Matematici per la Fisica"]
    }
  },
  chimica: {
    name: "Chimica e Tecnologie Chimiche",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Chimica Generale ed Inorganica", "Analisi Matematica I", "Fisica I", "Chimica Analitica I"],
      2: ["Chimica Organica I", "Chimica Fisica I", "Laboratorio di Chimica Analitica", "Stechiometria"],
      3: ["Chimica Organica II", "Chimica Fisica II", "Chimica Industriale", "Spettroscopia"]
    }
  },
  biologia: {
    name: "Biologia e Biotecnologie",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Citologia ed Istologia", "Botanica Generale", "Chimica Generale", "Zoologia"],
      2: ["Anatomia Comparata", "Biochimica", "Genetica", "Microbiologia Generale"],
      3: ["Fisiologia Generale", "Ecologia", "Biologia Molecolare", "Igiene"]
    }
  },
  farmacia: {
    name: "Farmacia e CTF",
    duration: 5,
    src: "ufficiale",
    years: {
      1: ["Chimica Generale", "Biologia Vegetale ed Animale", "Fisica", "Anatomia Umana"],
      2: ["Chimica Organica", "Biochimica Generale", "Fisiologia Umana", "Microbiologia"],
      3: ["Chimica Farmaceutica I", "Farmacologia e Farmacognosia", "Analisi dei Medicinali I"],
      4: ["Chimica Farmaceutica II", "Tossicologia", "Tecnologia Farmaceutica"],
      5: ["Saggio e Controllo dei Farmaci", "Legislazione Farmaceutica", "Socioeconomia Farmaceutica"]
    }
  },
  psicologia: {
    name: "Psicologia",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Psicologia Generale", "Psicologia dello Sviluppo", "Neuroscienze", "Metodologia della Ricerca"],
      2: ["Psicologia Sociale", "Psicometria", "Psicologia Dinamica", "Psicologia del Lavoro"],
      3: ["Psicologia Clinica", "Psicopatologia", "Psicologia dell'Educazione", "Tecniche di Intervento"]
    }
  },
  architettura: {
    name: "Architettura e Ingegneria Edile",
    duration: 5,
    src: "ufficiale",
    years: {
      1: ["Disegno dell'Architettura", "Istituzioni di Matematica", "Storia dell'Architettura Antica", "Laboratorio di Progettazione I"],
      2: ["Scienza delle Costruzioni", "Storia dell'Architettura Moderna", "Fisica Tecnica Ambientale", "Laboratorio di Progettazione II"],
      3: ["Tecnologia dell'Architettura", "Urbanistica I", "Rilievo dell'Architettura", "Progettazione Strutturale"],
      4: ["Restauro Architettonico", "Progettazione Urbanistica II", "Estimo ed Esercizio Professionale"],
      5: ["Progettazione Esecutiva", "Architettura degli Interni", "Legislazione delle Opere Pubbliche"]
    }
  },
  scienze_politiche: {
    name: "Scienze Politiche e Relazioni Internazionali",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Storia Contemporanea", "Diritto Pubblico", "Sociologia Generale", "Economia Politica"],
      2: ["Scienza Politica", "Relazioni Internazionali", "Diritto Internazionale", "Storia delle Dottrine Politiche"],
      3: ["Diritto dell'Unione Europea", "Politica Economica", "Sociologia dei Processi Culturali", "Lingua Professionale"]
    }
  },
  lettere: {
    name: "Lettere e Beni Culturali",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Letteratura Italiana I", "Storia Greca", "Storia Romana", "Linguistica Generale"],
      2: ["Letteratura Latina", "Storia Medievale", "Storia Moderna", "Archeologia e Storia dell'Arte"],
      3: ["Letteratura Italiana Contemporanea", "Storia Contemporanea", "Filologia Italiana", "Archivistica e Biblioteconomia"]
    }
  },
  odontoiatria: {
    name: "Odontoiatria e Protesi Dentaria",
    duration: 6,
    src: "ufficiale",
    years: {
      1: ["Chimica e Propedeutica Biochimica", "Fisica Medica", "Anatomia Umana", "Istologia ed Embriologia"],
      2: ["Fisiologia Umana", "Microbiologia ed Igiene", "Patologia Generale", "Anatomia Patologica"],
      3: ["Materiali Dentari", "Odontoiatria Conservativa", "Endodonzia", "Anestesiologia"],
      4: ["Parodontologia", "Chirurgia Orale", "Ortodonzia", "Radiologia Odontostomatologica"],
      5: ["Protesi Dentaria", "Odontoiatria Pediatrica", "Gnatologia", "Implantologia"],
      6: ["Clinica Odontostomatologica", "Patologia Speciale Odontostomatologica", "Chirurgia Maxillo-Facciale"]
    }
  },
  infermieristica: {
    name: "Infermieristica e Professioni Sanitarie",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Scienze Infermieristiche Generali", "Anatomia Umana e Istologia", "Fisica Medica e Applicata", "Biochimica e Biologia"],
      2: ["Scienze Infermieristiche Cliniche I", "Patologia Generale e Farmacologia", "Microbiologia Clinica", "Infermieristica Preventiva e di Comunità"],
      3: ["Scienze Infermieristiche Cliniche II", "Infermieristica Critica e d'Urgenza", "Deontologia, Etica e Management Sanitario", "Medicina Legale"]
    }
  },
  lingue_mediazione: {
    name: "Lingue e Mediazione Linguistica",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Glottologia e Linguistica", "Letteratura Inglese I", "Lingua e Traduzione Inglese I", "Letteratura Francese/Tedesca I"],
      2: ["Letteratura Comparata", "Lingua e Traduzione Inglese II", "Lingua e Traduzione Seconda I", "Filologia Germanica/Romanza"],
      3: ["Mediazione Linguistica e Interculturale", "Letteratura Straniera Moderna", "Glottodidattica", "Traduzione Specialistica"]
    }
  },
  matematica_informatica: {
    name: "Matematica e Informatica",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Analisi Matematica I", "Algebra Lineare e Geometria", "Fondamenti di Informatica", "Programmazione I"],
      2: ["Analisi Matematica II", "Probabilità e Statistica", "Algoritmi e Strutture Dati", "Basi di Dati"],
      3: ["Fisica Generale", "Ricerca Operativa", "Ingegneria del Software", "Reti di Calcolatori"]
    }
  },
  scienze_comunicazione: {
    name: "Scienze della Comunicazione",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Teoria e Tecniche della Comunicazione", "Sociologia della Comunicazione", "Semiologia", "Storia dei Media"],
      2: ["Giornalismo e Scrittura Multimediale", "Marketing e Comunicazione d'Impresa", "Psicologia della Comunicazione", "Diritto dell'Informazione"],
      3: ["Sociologia dei Processi Culturali", "Comunicazione Pubblica e Politica", "Web Design e Nuovi Media", "Linguaggi Televisivi"]
    }
  },
  scienze_motorie: {
    name: "Scienze Motorie e Sportive",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Anatomia Umana Applicata allo Sport", "Fisiologia Umana", "Teoria e Metodologia del Movimento Umano", "Chimica e Biochimica"],
      2: ["Teoria e Didattica dello Sport", "Metodi e Didattica delle Attività Motorie", "Igiene e Medicina dello Sport", "Biomeccanica"],
      3: ["Attività Motoria Preventiva e Adattata", "Teoria e Metodologia dell'Allenamento", "Psicologia dello Sport", "Traumatologia"]
    }
  },
  sociologia: {
    name: "Sociologia",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Storia del Pensiero Sociologico", "Istituzioni di Sociologia", "Metodologia della Ricerca Sociale", "Antropologia Culturale"],
      2: ["Sociologia della Famiglia", "Sociologia Urbana e Territoriale", "Statistica Sociale", "Sociologia Economica"],
      3: ["Sociologia dei Fenomeni Politici", "Sociologia della Devianza", "Sociologia della Comunicazione", "Valutazione delle Politiche Pubbliche"]
    }
  },
  filosofia: {
    name: "Filosofia",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Storia della Filosofia Antica", "Filosofia Teoretica", "Logica", "Letteratura Greca o Latina"],
      2: ["Storia della Filosofia Medievale e Moderna", "Estetica", "Filosofia Morale", "Filosofia del Linguaggio"],
      3: ["Storia della Filosofia Contemporanea", "Filosofia Politica", "Storia della Scienza", "Ermeneutica Filosofica"]
    }
  },
  agraria: {
    name: "Scienze e Tecnologie Agrarie",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Matematica e Statistica", "Chimica Generale e Inorganica", "Botanica Agraria", "Genetica Agraria"],
      2: ["Agronomia Generale e Coltivazioni Arboree", "Microbiologia Agraria", "Economia ed Estimo Rurale", "Entomologia Agraria"],
      3: ["Patologia Vegetale", "Industrie Agrarie", "Ingegneria Agraria", "Nutrizione delle Piante"]
    }
  },
  geologia: {
    name: "Scienze Geologiche",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Matematica", "Fisica Generale", "Chimica", "Geologia Generale e Laboratorio"],
      2: ["Mineralogia", "Petrografia", "Paleontologia", "Geologia Strutturale"],
      3: ["Geofisica", "Idrogeologia", "Geologia Applicata", "Geomorfologia"]
    }
  },
  statistica: {
    name: "Statistica e Data Science",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Analisi Matematica I", "Informatica e Programmazione", "Algebra Lineare", "Statistica Descrittiva"],
      2: ["Statistica Inferenziale", "Calcolo delle Probabilità", "Econometria", "Demografia"],
      3: ["Modelli Statistici per il Business", "Machine Learning e Analisi Dati", "Statistica Medica", "Campioni Statistici"]
    }
  },
  design: {
    name: "Design e Comunicazione Visiva",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Disegno Industriale", "Storia del Design", "Laboratorio di Progettazione I", "Geometria Descrittiva"],
      2: ["Tecnologia dei Materiali", "Laboratorio di Progettazione II", "Ergonomia", "Interaction Design"],
      3: ["Design dei Servizi", "Grafica Editoriale e Brand Identity", "Modellazione Digitale CAD", "Exhibit Design"]
    }
  },
  biotecnologie: {
    name: "Biotecnologie",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Matematica e Fisica", "Chimica Generale e Organica", "Biologia Cellulare", "Genetica"],
      2: ["Biochimica", "Microbiologia Industriale", "Biologia Molecolare", "Ingegneria Genetica"],
      3: ["Biotecnologie Mediche", "Biotecnologie Agrarie e Industriali", "Immunologia Applicata", "Bioetica"]
    }
  },
  nutrizione: {
    name: "Scienze dell'Alimentazione e Nutrizione Umana",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Chimica Organica", "Anatomia Umana", "Biologia della Nutrizione", "Fisica Applicata"],
      2: ["Fisiologia della Nutrizione", "Biochimica della Nutrizione", "Microbiologia degli Alimenti", "Igiene degli Alimenti"],
      3: ["Scienza e Tecnologia degli Alimenti", "Dietetica Applicata", "Patologia della Nutrizione", "Valutazione Nutrizionale"]
    }
  },
  servizio_sociale: {
    name: "Servizio Sociale",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Principi e Fondamenti del Servizio Sociale", "Sociologia Generale", "Diritto Pubblico", "Psicologia Generale"],
      2: ["Metodologia del Lavoro Sociale", "Diritto di Famiglia e Minorile", "Psicologia dello Sviluppo", "Politiche Sociali"],
      3: ["Servizio Sociale e Famiglia", "Organizzazione dei Servizi Sociali", "Deontologia Professionale", "Sociologia della Marginalità"]
    }
  },
  archeologia: {
    name: "Archeologia e Storia dell'Arte",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Archeologia e Storia dell'Arte Greca e Romana", "Storia Antica", "Geografia", "Letteratura Italiana"],
      2: ["Archeologia Medievale", "Storia dell'Arte Medievale e Moderna", "Epigrafia", "Numismatica"],
      3: ["Metodologia della Ricerca Archeologica", "Topografia Antica", "Restauro dei Beni Culturali", "Museologia"]
    }
  },
  scienze_formazione_primaria: {
    name: "Scienze della Formazione Primaria",
    duration: 5,
    src: "ufficiale",
    years: {
      1: ["Pedagogia Generale", "Storia della Scuola", "Psicologia dello Sviluppo", "Letteratura per l'Infanzia"],
      2: ["Didattica Generale", "Pedagogia Speciale", "Matematica e sua Didattica", "Lingua Italiana e Didattica"],
      3: ["Geografia e Didattica", "Storia e Didattica", "Scienze Naturali e Didattica", "Musica e Didattica"],
      4: ["Disegno e Didattica dell'Arte", "Educazione Fisica e Didattica", "Tecnologie Didattiche", "Psicologia dell'Educazione"],
      5: ["Pedagogia dell'Inclusione", "Valutazione Scolastica", "Tirocinio e Laboratori", "Legislazione Scolastica"]
    }
  },
  veterinaria: {
    name: "Medicina Veterinaria",
    duration: 5,
    src: "ufficiale",
    years: {
      1: ["Anatomia Veterinaria I", "Fisica e Chimica", "Biologia Cellulare", "Zoologia Veterinaria"],
      2: ["Anatomia Veterinaria II", "Fisiologia Veterinaria", "Biochimica Veterinaria", "Microbiologia Veterinaria"],
      3: ["Patologia Generale Veterinaria", "Farmacologia e Tossicologia", "Parassitologia", "Ispezione degli Alimenti"],
      4: ["Semeiotica e Patologia Medica", "Patologia Chirurgica", "Ostetricia e Ginecologia Veterinaria", "Anestesiologia"],
      5: ["Clinica Medica Veterinaria", "Clinica Chirurgica Veterinaria", "Igiene e Sanità Pubblica Veterinaria", "Epidemiologia"]
    }
  },
  scienze_ambientali: {
    name: "Scienze Ambientali e Naturali",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Matematica e Statistica", "Chimica Generale ed Ecocompatibile", "Fisica dell'Ambiente", "Botanica Sistematica"],
      2: ["Ecologia Generale", "Zoologia dei Vertebrati", "Geologia e Geomorfologia", "Chimica Ambientale"],
      3: ["Valutazione di Impatto Ambientale (VIA)", "Conservazione della Natura", "Gestione delle Risorse Naturali", "Monitoraggio Ambientale"]
    }
  },
  scienze_gastronomiche: {
    name: "Scienze e Culture Enogastronomiche",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Storia dell'Alimentazione", "Chimica degli Alimenti", "Microbiologia degli Alimenti", "Diritto Agrario e Agroalimentare"],
      2: ["Tecnologie Alimentari", "Economia e Marketing Agroalimentare", "Agronomia e Viticoltura", "Sensometria ed Analisi Sensoriale"],
      3: ["Comunicazione Enogastronomica", "Turismo Gastronomico", "Gestione delle Imprese Ristorative", "Igiene e Sicurezza Alimentare"]
    }
  },
  scienze_zootecniche: {
    name: "Scienze Zootecniche e Tecnologie Animali",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Anatomia e Fisiologia Animale", "Chimica Generale e Organica", "Biologia Vegetale e Agronomia", "Genetica Animale"],
      2: ["Nutrizione e Alimentazione Animale", "Igiene e Sanità Animale", "Tecniche di Allevamento dei Ruminanti", "Tecniche di Allevamento dei Monogastrici"],
      3: ["Qualità e Sicurezza dei Prodotti di Origine Animale", "Economia della Produzione Zootecnica", "Benessere Animale", "Edilizia e Macchine Zootecniche"]
    }
  },
  scienze_geofisiche: {
    name: "Geofisica e Scienze della Terra",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Analisi Matematica I", "Fisica I", "Geologia Generale", "Informatica e Programmazione"],
      2: ["Geofisica Generale", "Fisica della Terra Solida", "Sismologia", "Geodesia e Telerilevamento"],
      3: ["Geofisica Applicata", "Rischio Sismico e Vulcanico", "Oceanografia e Meteorologia", "Laboratorio di Elaborazione Dati Geofisici"]
    }
  },
  turismo: {
    name: "Scienze del Turismo e Beni Culturali",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Economia del Turismo", "Storia dell'Arte e del Territorio", "Sociologia del Turismo", "Geografia del Turismo"],
      2: ["Diritto del Turismo", "Marketing Territoriale", "Lingua Inglese per il Turismo", "Seconda Lingua Straniera"],
      3: ["Management delle Imprese Turistiche", "Progettazione dell'Offerta Turistica", "Organizzazione di Eventi", "Informatica per il Turismo"]
    }
  },
  scienze_investigative: {
    name: "Scienze Investigative e Criminologia",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Diritto Penale Generale", "Criminologia", "Psicologia Generale", "Sociologia della Devianza"],
      2: ["Diritto Processuale Penale", "Tecniche di Investigazione", "Medicina Legale", "Criminalistica e Tossicologia Forense"],
      3: ["Cybercrime e Sicurezza Informatica", "Psicologia Forense", "Analisi della Scena del Crimine", "Vittimologia"]
    }
  },
  scienze_difesa: {
    name: "Scienze della Difesa e della Sicurezza",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Diritto Costituzionale e Amministrativo", "Storia Militare e Politica", "Geopolitica e Relazioni Internazionali", "Sociologia della Sicurezza"],
      2: ["Diritto Internazionale Umanitario", "Strategic Studies", "Gestione delle Crisi", "Cyber Security e Intelligence"],
      3: ["Logistica e Organizzazione Complessa", "Diritto Penale Militare", "Tecniche Operative e Gestione delle Emergenze", "Etica e Leadership"]
    }
  },
  scienze_statistiche_attuariali: {
    name: "Scienze Statistiche e Attuariali",
    duration: 3,
    src: "ufficiale",
    years: {
      1: ["Analisi Matematica I", "Algebra Lineare", "Statistica I", "Economia Politica"],
      2: ["Calcolo delle Probabilità", "Matematica Finanziaria", "Statistica II", "Diritto delle Assicurazioni"],
      3: ["Tecniche Attuariali delle Assicurazioni Vita", "Tecniche Attuariali Danni", "Teoria dei Portafogli e Gestione del Rischio", "Econometria"]
    }
  }
};

/* ============================================================
   UTILITÀ
   ============================================================ */

/* Slug dell'esame: normalizza la denominazione in una chiave
   stabile, così esami omonimi in facoltà diverse condividono le
   stesse aree del motore.
   Es. "Anatomia Umana I" -> "anatomia-umana" */
function examSlug(name) {
  return name
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\([^)]*\)/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\b(i{1,3}|iv|v|vi|vii|viii|ix|x)\b/g, " ")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* Tutti gli esami del catalogo, deduplicati per slug. */
function allExams() {
  const map = new Map();
  for (const [fid, f] of Object.entries(FACULTIES_CATALOG)) {
    for (const [year, exams] of Object.entries(f.years)) {
      for (const name of exams) {
        const slug = examSlug(name);
        if (!map.has(slug)) map.set(slug, { slug, name, faculties: [], years: [] });
        const e = map.get(slug);
        if (!e.faculties.includes(fid)) e.faculties.push(fid);
        const label = fid + " " + year;
        if (!e.years.includes(label)) e.years.push(label);
      }
    }
  }
  return [...map.values()];
}

function facultyById(id) { return FACULTIES_CATALOG[id] || null; }

function catalogStats() {
  let years = 0, exams = 0;
  const seen = new Set();
  for (const f of Object.values(FACULTIES_CATALOG)) {
    years += Object.keys(f.years).length;
    for (const list of Object.values(f.years)) {
      exams += list.length;
      for (const n of list) seen.add(examSlug(n));
    }
  }
  return {
    faculties: Object.keys(FACULTIES_CATALOG).length,
    years,
    exams,
    uniqueExams: seen.size
  };
}

export {
  FACULTIES_CATALOG,
  examSlug,
  allExams,
  facultyById,
  catalogStats
};
