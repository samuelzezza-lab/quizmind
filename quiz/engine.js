/* ============================================================
   Quizmind — punto di ingresso del motore
   ------------------------------------------------------------
   app.js importa da qui. Il modulo core contiene il motore e
   registra le aree delle singole materie; questo file rende
   espliciti gli export usati dall'interfaccia.
   ============================================================ */

import {
  QUESTIONS_PER_SESSION,
  MIN_AREAS,
  AREA_INDEX,
  createRng,
  examCoverage,
  generateSession,
  gradeSession,
  variantEstimate,
  materieCoperte
} from "./engine-core.js";

export {
  QUESTIONS_PER_SESSION,
  MIN_AREAS,
  AREA_INDEX,
  createRng,
  examCoverage,
  generateSession,
  gradeSession,
  variantEstimate,
  materieCoperte
};
