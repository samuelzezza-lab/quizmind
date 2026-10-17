/* ============================================================
   Quizmind — ponte tra le aree modulari e il motore
   ------------------------------------------------------------
   I moduli quiz/aree-*.js dichiarano gli esami in forma snella:
     { name, areas: [{ id, name, kind, cases: [fn] }] }
   Il motore usa invece:
     { name, areas: [{ id, name, kind, spec: { cases: [fn] } }] }
   Questa funzione converte la prima nella seconda e la registra
   dentro l'indice del motore, cosi le aree nuove sono subito
   utilizzabili da generateSession().
   ============================================================ */

function convertiAree(collezione) {
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
          spec: {
            cases: a.cases,
            sets: a.sets,
            pairs: a.pairs,
            sequences: a.sequences,
            consequences: a.consequences,
            classes: a.classes,
            compute: a.compute
          }
        };
      })
    };
  }
  return out;
}

/* Registra le aree nel registro del motore. Le materie gia
   coperte da aree proprie non vengono sovrascritte. */
function registraAree(registro) {
  let aggiunti = 0;
  for (const slug of Object.keys(QUIZ_AREAS_MODULARI)) {
    if (registro[slug]) continue;
    registro[slug] = QUIZ_AREAS_MODULARI[slug];
    aggiunti++;
  }
  return aggiunti;
}

/* Aree portate dai moduli quiz/aree-*.js. Se i moduli non sono
   presenti, la raccolta resta vuota e il motore usa le proprie. */
let QUIZ_AREAS_MODULARI = {};

function impostaAreeModulari(raccolta) {
  QUIZ_AREAS_MODULARI = convertiAree(raccolta);
  return Object.keys(QUIZ_AREAS_MODULARI).length;
}

export { registraAree, convertiAree, impostaAreeModulari };
