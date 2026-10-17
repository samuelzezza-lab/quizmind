/* ============================================================
   Quizmind — motore dei quiz (punto di ingresso)
   ------------------------------------------------------------
   Il motore e lungo oltre 70 KB: le sue parti sono in
   scratch/engine-parts/p1..p5.part e si uniscono con
   `node scratch/ricomponi.js`, che produce quiz/engine-completo.js.
   Questo file rende disponibili all'interfaccia le funzioni del
   motore, importandole dal file ricomposto.
   ============================================================ */

import {
  QUESTIONS_PER_SESSION,
  MIN_AREAS,
  GENERATORS,
  EXAM_AREAS,
  AREA_INDEX,
  createRng,
  shuffleFisherYates,
  examCoverage,
  planDistribution,
  generateSession,
  gradeSession,
  variantEstimate
} from "./engine-completo.js";

export {
  QUESTIONS_PER_SESSION,
  MIN_AREAS,
  GENERATORS,
  EXAM_AREAS,
  AREA_INDEX,
  createRng,
  shuffleFisherYates,
  examCoverage,
  planDistribution,
  generateSession,
  gradeSession,
  variantEstimate
};
