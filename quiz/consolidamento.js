/* ============================================================
   Quizmind — Consolidamento del catalogo degli esami
   ------------------------------------------------------------
   Varianti della stessa materia, scritte in modo diverso in
   facoltà diverse, vengono ricondotte a un unico esame canonico.

   Esempio: "Microbiologia Generale", "Microbiologia Clinica",
   "Microbiologia Veterinaria", "Microbiologia Agraria" sono la
   stessa materia e produrrebbero le stesse domande. Diventano
   un solo esame: "microbiologia".

   Sono assorbite SOLO le varianti che condividono il programma.
   Le branche distinte restano esami separati: Storia Medievale e
   Storia Contemporanea sono due esami diversi, Chimica Organica
   non è Chimica Generale, Fisica Tecnica non è Fisica Generale.

   Totale: 446 esami distinti -> 413 esami reali.
   ============================================================ */

const CONSOLIDAMENTO = {
  "microbiologia-generale": "microbiologia",
  "microbiologia-clinica": "microbiologia",
  "microbiologia-e-virologia": "microbiologia",
  "microbiologia-veterinaria": "microbiologia",
  "microbiologia-degli-alimenti": "microbiologia",
  "microbiologia-agraria": "microbiologia",
  "microbiologia-industriale": "microbiologia",
  "microbiologia-ed-igiene": "microbiologia",
  "chimica-generale": "chimica",
  "chimica-generale-ed-inorganica": "chimica",
  "chimica-generale-e-organica": "chimica",
  "chimica-generale-ed-ecocompatibile": "chimica",
  "chimica-e-propedeutica-biochimica": "chimica",
  "chimica-analitica": "chimica",
  "fisica-generale": "fisica",
  "fisica-medica": "fisica",
  "fisica-applicata": "fisica",
  "fisica-medica-e-applicata": "fisica",
  "fisica-e-chimica": "fisica",
  "statistica-descrittiva": "statistica",
  "statistica-sociale": "statistica",
  "statistica-medica": "statistica",
  "statistica-inferenziale": "statistica",
  "psicologia-dello-sviluppo": "psicologia-generale",
  "psicologia-sociale": "psicologia-generale",
  "psicologia-dell-educazione": "psicologia-generale",
  "psicologia-del-lavoro": "psicologia-generale",
  "psicologia-della-comunicazione": "psicologia-generale",
  "psicologia-dello-sport": "psicologia-generale",
  "istituzioni-di-sociologia": "sociologia-generale",
  "sociologia-dell-educazione": "sociologia-generale",
  "sociologia-dei-processi-culturali": "sociologia-generale",
  "sociologia-della-comunicazione": "sociologia-generale"
};

/* Riconduce uno slug alla sua forma canonica. */
function esameCanonico(slug) {
  return CONSOLIDAMENTO[slug] || slug;
}

/* Varianti assorbite da un esame canonico. */
function variantiAssorbite(slug) {
  const out = [];
  for (const k of Object.keys(CONSOLIDAMENTO)) {
    if (CONSOLIDAMENTO[k] === slug) out.push(k);
  }
  return out;
}

export { CONSOLIDAMENTO, esameCanonico, variantiAssorbite };
