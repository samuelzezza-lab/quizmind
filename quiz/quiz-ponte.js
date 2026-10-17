/* ============================================================
   Quizmind — ponte tra le aree modulari e il motore
   ------------------------------------------------------------
   I moduli quiz/aree-*.js dichiarano esami in forma snella:
     { name, areas: [{ id, name, kind, cases: [fn] }] }
   Il motore usa invece:
     { name, areas: [{ id, name, kind, spec: { cases: [fn] } }] }
   Questo modulo converte la prima nella seconda e la registra
   dentro AREA_INDEX, cosi le aree nuove sono subito
   utilizzabili da generateSession().
   ============================================================ */

import { AREA_INDEX } from "./engine-core.js";

function converti(collezione) {
  const out = {};
  if (!collezione) return out;
  for (const slug of Object.keys(collezione)) {
    const def = collezione[slug];
    out[slug] = {
      name: def.name,
      areas: def.areas.map(function (a) {
        return {
          id: a.id,
          name: a.name,
          kind: a.kind || "regola-caso",
          spec: { cases: a.cases, sets: a.sets, pairs: a.pairs, sequences: a.sequences, consequences: a.consequences, classes: a.classes, compute: a.compute }
        };
      })
    };
  }
  return out;
}

/* Registra nel motore le aree contenute in un modulo quiz/aree-*.js.
   Le materie gia coperte dal motore non vengono sovrascritte. */
function registraAree(collezione) {
  const convertite = converti(collezione);
  let aggiunti = 0;
  for (const slug of Object.keys(convertite)) {
    if (AREA_INDEX[slug]) continue;
    AREA_INDEX[slug] = convertite[slug];
    aggiunti++;
  }
  return aggiunti;
}

/* Elenco ordinato delle materie coperte dal motore. */
function esamiRegistrati() {
  return Object.keys(AREA_INDEX).sort();
}

export { registraAree, esamiRegistrati, converti };
