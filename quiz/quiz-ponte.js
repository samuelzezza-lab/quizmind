/* ============================================================
   Quizmind — Ponte tra le aree modulari e il motore
   ------------------------------------------------------------
   I file quiz/aree-*.js dichiarano gli esami in forma snella:
     { name, areas: [{ id, name, kind, cases: [fn, fn, fn] }] }
   Il motore si aspetta invece la forma:
     { name, areas: [{ id, name, kind, spec: { cases: [fn] } }] }

   Questo modulo converte la prima nella seconda e la registra
   nel registro del motore, così le aree nuove diventano
   immediatamente utilizzabili da generateSession().
   ============================================================ */

import { AREE_GIURIDICHE } from "./aree-giuridiche.js";
import { AREE_GIURIDICHE_2 } from "./aree-giuridiche-2.js";

/* Converte una collezione di esami nella forma attesa dal motore. */
function converti(collezione) {
  const out = {};
  for (const slug of Object.keys(collezione)) {
    const def = collezione[slug];
    out[slug] = {
      name: def.name,
      areas: def.areas.map(function (a) {
        return {
          id: a.id,
          name: a.name,
          kind: a.kind || "regola-caso",
          spec: { cases: a.cases }
        };
      })
    };
  }
  return out;
}

const AREE_MODULARI = Object.assign(
  {},
  converti(AREE_GIURIDICHE),
  converti(AREE_GIURIDICHE_2)
);

/* Registra le aree nel registro passato dal motore. Il motore chiama
   questa funzione una volta, prima di costruire il proprio indice,
   così un esame con aree proprie non viene coperto da un alias. */
function registraAree(registro) {
  let aggiunti = 0;
  for (const slug of Object.keys(AREE_MODULARI)) {
    if (!registro[slug]) {
      registro[slug] = AREE_MODULARI[slug];
      aggiunti++;
    }
  }
  return aggiunti;
}

/* Elenco degli esami coperti da questi moduli. */
function esamiModulari() {
  return Object.keys(AREE_MODULARI).sort();
}

export { AREE_MODULARI, registraAree, esamiModulari, converti };
