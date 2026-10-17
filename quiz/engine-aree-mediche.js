/* ============================================================
   Quizmind — Aree per le materie mediche e biologiche
   ------------------------------------------------------------
   Quattro macro-aree reali per ciascuna materia, con gli
   schemi algoritmici che producono le domande. Biochimica e
   fisiologia usano il calcolo parametrico: i valori cambiano
   a ogni avvio, non il testo.
   ============================================================ */

import { AREA_INDEX, randInt, fmt, pick } from "./engine.js";

function area(id, name, kind, spec) {
  return { id: id, name: name, kind: kind, spec: spec };
}

function caso(prompt, correct, distractors, note) {
  return function () {
    return { prompt: prompt, correct: correct, distractors: distractors, note: note };
  };
}

/* ---------------- BIOCHIMICA ---------------- */
AREA_INDEX["biochimica"] = {
  name: "Biochimica",
  areas: [
    area("enzimi", "Enzimi e cinetica", "definizione", {
      sets: [{
        question: "Nella cinetica enzimatica,",
        items: [
          { id: "km", label: "la costante Km", text: "la concentrazione di substrato alla quale la velocita di reazione e pari alla meta della velocita massima" },
          { id: "vmax", label: "la Vmax", text: "la velocita massima raggiunta quando l'enzima e saturato dal substrato" },
          { id: "kcat", label: "il numero di turnover", text: "il numero di molecole di substrato convertite per unita di tempo da una singola molecola di enzima saturata" },
          { id: "competitivo", label: "l'inibitore competitivo", text: "la molecola che si lega al sito attivo aumentando la Km apparente senza modificare la Vmax" }
        ]
      }]
    }),
    area("metabolismo", "Metabolismo energetico", "calcolo", {
      compute: function (rng) {
        const glucosio = randInt(rng, 2, 12);
        const atp = glucosio * 30;
        return {
          prompt: "Considerando una resa di 30 molecole di ATP per molecola di glucosio ossidata completamente, quante moli di ATP si producono da " + glucosio + " moli di glucosio?",
          value: atp,
          unit: "mol di ATP",
          factor: 2,
          decimals: 0,
          explanation: "Ogni molecola di glucosio rende circa 30 ATP: " + glucosio + " x 30 = " + atp + " mol.",
          note: "Errore tipico: usare la sola resa della glicolisi, dimenticando il ciclo di Krebs e la fosforilazione ossidativa."
        };
      }
    }),
    area("glicolisi", "Glicolisi e gluconeogenesi", "conseguenza", {
      consequences: [
        { id: "netto", cause: "una molecola di glucosio e degradata lungo la glicolisi", effect: "si ottengono 2 molecole di piruvato con un guadagno netto di 2 ATP e 2 NADH" },
        { id: "carenza", cause: "l'apporto di glucosio si riduce drasticamente", effect: "si attivano gluconeogenesi e chetogenesi, con produzione di corpi chetonici dagli acidi grassi" },
        { id: "pfk", cause: "la fosfofruttochinasi-1 e inibita da elevate concentrazioni di ATP", effect: "la glicolisi rallenta per regolazione a feedback negativo sul flusso glicolitico" },
        { id: "ossigeno", cause: "l'ossigeno e disponibile in quantita sufficiente", effect: "il piruvato entra nel mitocondrio e viene decarbossilato ad acetil-CoA per il ciclo di Krebs" }
      ]
    }),
    area("lipidi", "Lipidi e beta-ossidazione", "calcolo", {
      compute: function (rng) {
        const atomi = randInt(rng, 10, 18);
        const cicli = atomi / 2 - 1;
        return {
          prompt: "Quanti cicli di beta-ossidazione servono per degradare completamente un acido grasso saturo a catena lineare di " + atomi + " atomi di carbonio?",
          value: cicli,
          unit: "cicli",
          factor: 2,
          decimals: 0,
          explanation: "Per un acido grasso saturo di n atomi di carbonio servono n/2 - 1 cicli: " + atomi + "/2 - 1 = " + cicli + ".",
          note: "Errore tipico: usare n/2 cicli, dimenticando che l'ultimo passaggio produce due molecole di acetil-CoA."
        };
      }
    })
  ]
};

/* ---------------- FISIOLOGIA ---------------- */
AREA_INDEX["fisiologia"] = {
  name: "Fisiologia umana",
  areas: [
    area("cardiaca", "Fisiologia cardiaca", "calcolo", {
      compute: function (rng) {
        const fc = randInt(rng, 55, 100);
        const gs = randInt(rng, 50, 90);
        return {
          prompt: "Un soggetto ha frequenza cardiaca di " + fc + " battiti al minuto e gittata sistolica di " + gs + " mL. Qual e la portata cardiaca in mL/min?",
          value: fc * gs,
          unit: "mL/min",
          factor: 2,
          decimals: 0,
          explanation: "La portata cardiaca e frequenza x gittata sistolica = " + fc + " x " + gs + " = " + fmt(fc * gs) + " mL/min.",
          note: "Errore tipico: sommare frequenza e gittata invece di moltiplicarle."
        };
      }
    }),
    area("respiratoria", "Fisiologia respiratoria", "calcolo", {
      compute: function (rng) {
        const vc = randInt(rng, 400, 700);
        const spazio = randInt(rng, 120, 160);
        return {
          prompt: "Con un volume corrente di " + vc + " mL e uno spazio morto anatomico di " + spazio + " mL, qual e la ventilazione alveolare per atto respiratorio?",
          value: vc - spazio,
          unit: "mL",
          factor: 2,
          decimals: 0,
          explanation: "La ventilazione alveolare e volume corrente meno spazio morto: " + vc + " - " + spazio + " = " + (vc - spazio) + " mL.",
          note: "Errore tipico: sommare spazio morto e volume corrente invece di sottrarre."
        };
      }
    }),
    area("renale", "Fisiologia renale", "calcolo", {
      compute: function (rng) {
        const vfg = randInt(rng, 90, 140);
        const riass = randInt(rng, 90, 99);
        const escreta = Math.round(vfg * (1 - riass / 100) * 100) / 100;
        return {
          prompt: "Con velocita di filtrazione glomerulare di " + vfg + " mL/min e riassorbimento tubulare del " + riass + "%, qual e il volume di urina prodotto al minuto?",
          value: escreta,
          unit: "mL/min",
          factor: 2,
          decimals: 2,
          explanation: "Il volume escreto e VFG x (100 - " + riass + ")/100 = " + fmt(escreta) + " mL/min.",
          note: "Errore tipico: usare la percentuale di riassorbimento come volume escreto anziche come quota trattenuta."
        };
      }
    }),
    area("neuro", "Fisiologia del sistema nervoso", "conseguenza", {
      consequences: [
        { id: "soglia", cause: "lo stimolo raggiunge la soglia di depolarizzazione della membrana", effect: "si genera un potenziale d'azione con andamento tutto-o-nulla" },
        { id: "refrattario", cause: "il neurone si trova nel periodo refrattario assoluto", effect: "non puo essere eccitato da alcuno stimolo, qualunque ne sia l'intensita" },
        { id: "pompa", cause: "la pompa sodio-potassio ripristina i gradienti ionici", effect: "si ristabilisce il potenziale di riposo della membrana" },
        { id: "mielina", cause: "la fibra nervosa e amielinica", effect: "la velocita di conduzione risulta inferiore rispetto a una fibra mielinica di pari diametro" }
      ]
    })
  ]
};

export { area, caso };
