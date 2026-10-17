/**
 * faculties-subjects.js
 * Database completo basato sulle Classi di Laurea Ministeriali (Triennale, Magistrale, Ciclo Unico)
 * e sui programmi ufficiali delle Scuole Superiori (Licei e Istituti).
 *
 * Struttura: ACADEMIC_SUBJECTS.university[corso].years[anno] = [materie]
 *            ACADEMIC_SUBJECTS.highschool[indirizzo].years[classe] = [materie]
 *
 * 30 corsi universitari e 10 indirizzi scolastici.
 */

const ACADEMIC_SUBJECTS = {
  // ==========================================
  // 1. UNIVERSITA (30 Classi di Laurea / Facolta)
  // ==========================================
  university: {
    "medicina-chirurgia": {
      name: "Medicina e Chirurgia (LM-41)",
      years: {
        1: ["Anatomia Umana I", "Chimica e Propedeutica Biochimica", "Fisica Medica", "Biologia e Genetica", "Istologia ed Embriologia"],
        2: ["Anatomia Umana II", "Biochimica", "Fisiologia Umana", "Microbiologia e Virologia", "Immunologia e Immunopatologia"],
        3: ["Patologia Generale", "Farmacologia Generale", "Anatomia Patologica I", "Semeiotica Medica e Chirurgica", "Statistica Medica ed Epidemiologia"],
        4: ["Cardiologia e Pneumologia", "Gastroenterologia", "Endocrinologia e Malattie del Ricambio", "Nefrologia e Urologia", "Ematologia e Oncologia Medica", "Malattie Infettive", "Dermatologia e Venereologia", "Anatomia Patologica II"],
        5: ["Neurologia e Psichiatria", "Ortopedia e Traumatologia", "Ginecologia e Ostetricia", "Pediatria Generale e Specialistica", "Otorinolaringoiatria e Oculistica", "Diagnostica per Immagini e Radioterapia"],
        6: ["Medicina Interna", "Chirurgia Generale", "Medicina Legale", "Igiene e Sanita Pubblica", "Emergenze Medico-Chirurgiche"]
      }
    },
    "giurisprudenza": {
      name: "Giurisprudenza (LMG/01)",
      years: {
        1: ["Istituzioni di Diritto Privato", "Istituzioni di Diritto Pubblico", "Storia del Diritto Romano", "Filosofia del Diritto", "Diritto Costituzionale"],
        2: ["Diritto Commerciale", "Diritto del Lavoro", "Diritto dell'Unione Europea", "Diritto Ecclesiastico", "Storia del Diritto Medievale e Moderno"],
        3: ["Diritto Penale I", "Diritto Amministrativo I", "Diritto Civile I", "Diritto Internazionale", "Sistemi Giuridici Comparati"],
        4: ["Procedura Penale", "Diritto Processuale Civile", "Diritto Penale II", "Diritto Amministrativo II", "Diritto Tributario"],
        5: ["Diritto Civile II", "Diritto Fallimentare e Crisi d'Impresa", "Medicina Legale", "Esecuzione Penale e Penitenziaria"]
      }
    },
    "economia-aziendale": {
      name: "Economia Aziendale e Management (L-18 / LM-77)",
      years: {
        1: ["Economia Aziendale", "Microeconomia", "Matematica Generale", "Diritto Privato", "Statistica"],
        2: ["Contabilita e Bilancio", "Macroeconomia", "Diritto Commerciale", "Finanza Aziendale", "Marketing"],
        3: ["Programmazione e Controllo", "Diritto Tributario", "Organizzazione Aziendale", "Economia degli Intermediari Finanziari", "Economia Industriale"],
        4: ["Finanza Aziendale Avanzata", "Corporate Governance", "Econometria", "Diritto Commerciale Progredito", "Strategia d'Impresa"],
        5: ["International Business", "Valutazione d'Azienda", "Audit e Controllo di Gestione", "Gestione dell'Innovazione"]
      }
    },
    "ingegneria-informatica": {
      name: "Ingegneria Informatica e AI (L-8 / LM-32)",
      years: {
        1: ["Analisi Matematica I", "Geometria e Algebra Lineare", "Fisica I", "Fondamenti di Informatica", "Calcolatori Elettronici"],
        2: ["Analisi Matematica II", "Fisica II", "Algoritmi e Strutture Dati", "Sistemi Operativi", "Reti di Calcolatori", "Elettrotecnica"],
        3: ["Basi di Dati", "Ingegneria del Software", "Automatica e Teoria dei Sistemi", "Elettronica Digitale", "Sicurezza Informatica"],
        4: ["Machine Learning e Intelligenza Artificiale", "Sistemi Distribuiti e Cloud Computing", "Cybersecurity Avanzata", "Visione Artificiale", "Elaborazione del Linguaggio Naturale"],
        5: ["Big Data Analytics", "Robotica e Sistemi Autonomi", "Architetture Software Avanzate", "Sistemi Embedded e IoT"]
      }
    },
    "ingegneria-meccanica": {
      name: "Ingegneria Meccanica (L-9 / LM-33)",
      years: {
        1: ["Analisi Matematica I", "Geometria", "Fisica I", "Chimica", "Disegno Tecnico Industriale"],
        2: ["Analisi Matematica II", "Fisica II", "Meccanica Razionale", "Scienza delle Costruzioni", "Fisica Tecnica e Termodinamica"],
        3: ["Meccanica Applicata alle Macchine", "Tecnologia Meccanica", "Macchine e Sistemi Energetici", "Costruzione di Macchine", "Impianti Industriali"],
        4: ["Meccanica dei Fluidi Avanzata", "Robotica Industriale", "Progettazione Meccanica Computazionale", "Dinamica delle Macchine"],
        5: ["Sistemi Energetici Avanzati", "Comportamento Meccanico dei Materiali", "Automazione Industriale", "Gestione dell'Innovazione Meccanica"]
      }
    },
    "psicologia": {
      name: "Psicologia e Neuroscienze (L-24 / LM-51)",
      years: {
        1: ["Psicologia Generale", "Psicologia dello Sviluppo", "Fondamenti Anatomofisiologici dell'Attivita Psichica", "Metodologia della Ricerca Psicologica", "Sociologia Generale"],
        2: ["Psicologia Sociale", "Psicobiologia e Psicologia Fisiologica", "Psicometria", "Psicologia Dinamica", "Psicologia del Lavoro e delle Organizzazioni"],
        3: ["Psicologia Clinica", "Psicopatologia dello Sviluppo", "Neuroscienze Cognitive", "Psicologia della Salute", "Tecniche del Colloquio Psicologico"],
        4: ["Neuropsicologia Clinica", "Psicodiagnostica Avanzata", "Psicoterapia e Modelli di Intervento", "Psicologia Cognitiva Applicata"],
        5: ["Psicologia della Salute e Traumi", "Neuroscienze del Comportamento", "Valutazione e Riabilitazione Neuropsicologica", "Deontologia Professionale"]
      }
    },
    "infermieristica": {
      name: "Infermieristica (L/SNT1)",
      years: {
        1: ["Anatomia e Istologia", "Fisiologia e Biochimica", "Infermieristica Generale e Clinica", "Patologia Generale e Fisiopatologia", "Microbiologia e Igiene"],
        2: ["Infermieristica Medico-Chirurgica", "Farmacologia", "Anatomia Patologica", "Medicina Interna e Chirurgia", "Psicologia Clinica e Pediatria"],
        3: ["Infermieristica in Area Critica ed Emergenza", "Infermieristica di Sanita Pubblica e Comunita", "Diritto Sanitario e Deontologia", "Organizzazione dei Servizi Sanitari"]
      }
    },
    "biotecnologie": {
      name: "Biotecnologie (L-2 / LM-8)",
      years: {
        1: ["Chimica Generale e Inorganica", "Biologia Cellulare e Animale", "Matematica e Statistica", "Fisica Generale", "Botanica Generale"],
        2: ["Chimica Organica", "Biochimica", "Genetica", "Microbiologia Generale", "Biologia Molecolare"],
        3: ["Biotecnologie Ricombinanti", "Ingegneria Genetica", "Immunologia", "Farmacologia e Tossicologia", "Biotecnologie Industriali e Fermentazioni"],
        4: ["Biotecnologie Mediche Avanzate", "Terapia Genica", "Proteomica e Genomica", "Bionanotecnologie"],
        5: ["Sviluppo Processi Biotecnologici", "Brevetti e Regolamentazione Biotecnologica", "Bioinformatica Avanzata"]
      }
    },
    "farmacia": {
      name: "Farmacia (LM-13)",
      years: {
        1: ["Chimica Generale e Inorganica", "Biologia Vegetale e Botanica Farmaceutica", "Anatomia Umana", "Fisica e Matematica", "Chimica Organica"],
        2: ["Biochimica Generale e Molecolare", "Fisiologia Umana", "Microbiologia e Igiene", "Chimica Analitica"],
        3: ["Chimica Farmaceutica I", "Farmacologia e Farmacognosia", "Patologia Generale e Fisiopatologia", "Chimica degli Alimenti"],
        4: ["Chimica Farmaceutica II", "Tecnologia, Socioeconomia e Legislazione Farmaceutica", "Tossicologia", "Saggi e Dosaggi dei Farmaci"],
        5: ["Chimica Computazionale", "Farmacoterapia", "Prodotti Cosmetici", "Tirocinio Professionale in Farmacia"]
      }
    },
    "architettura": {
      name: "Architettura (LM-4)",
      years: {
        1: ["Disegno e Rilievo dell'Architettura", "Storia dell'Architettura I", "Istituzioni di Matematica", "Laboratorio di Progettazione Architettonica I", "Fisica Tecnica Ambientale"],
        2: ["Storia dell'Architettura II", "Scienza delle Costruzioni", "Laboratorio di Progettazione Architettonica II", "Geometria Descrittiva", "Tecnologia dell'Architettura"],
        3: ["Tecnica delle Costruzioni", "Urbanistica I", "Laboratorio di Restauro Architettonico", "Laboratorio di Progettazione III", "Estimo ed Esercizio Professionale"],
        4: ["Progettazione Urbana", "Fisica Tecnica Ambientale Avanzata", "Infrastrutture e Territorio", "Laboratorio di Sintesi Finale I"],
        5: ["Laboratorio di Tesi e Progetto Finale", "Legislazione delle Opere Pubbliche", "Conservazione dei Beni Architettonici"]
      }
    },
    "scienze-politiche": {
      name: "Scienze Politiche e Relazioni Internazionali (L-36 / LM-62)",
      years: {
        1: ["Storia Contemporanea", "Diritto Pubblico", "Sociologia Generale", "Economia Politica", "Scienza Politica"],
        2: ["Relazioni Internazionali", "Diritto Internazionale", "Storia delle Relazioni Internazionali", "Storia delle Dottrine Politiche", "Statistica Sociale"],
        3: ["Diritto dell'Unione Europea", "Sociologia Politica", "Economia Internazionale", "Geopolitica e Geografia Economica"],
        4: ["Analisi delle Politiche Pubbliche", "Geopolitica Avanzata", "Diritto Diplomatico e Consolare", "Economia dello Sviluppo"],
        5: ["Gestione delle Crisi Internazionali", "Governance Globale", "Politica Estera Comparata"]
      }
    },
    "lettere-moderne": {
      name: "Lettere Moderne (L-10 / LM-14)",
      years: {
        1: ["Letteratura Italiana I", "Lingua e Grammatica Italiana", "Storia Romana", "Storia Medievale", "Linguistica Generale"],
        2: ["Letteratura Italiana II", "Storia Contemporanea", "Filologia Romanza", "Geografia Umana", "Letteratura Latina"],
        3: ["Letteratura Italiana Contemporanea", "Crittografia e Paleografia", "Critica Letteraria e Ermeneutica", "Storia Moderna"],
        4: ["Filologia Italiana", "Letteratura Rinascimentale", "Storia della Lingua Italiana", "Estetica Letteraria"],
        5: ["Ermeneutica Testuale", "Letteratura Comparata Avanzata", "Didattica della Lingua Italiana"]
      }
    },
