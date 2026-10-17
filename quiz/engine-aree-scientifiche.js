/* ============================================================
   Quizmind — Aree per le materie scientifiche
   ------------------------------------------------------------
   Ogni materia dichiara 4 macro-aree reali del proprio
   programma, ciascuna con lo schema algoritmico con cui
   produrre le domande. Le domande di calcolo estraggono
   parametri diversi a ogni avvio; i distrattori derivano da
   errori di calcolo reali.
   ============================================================ */

import { AREA_INDEX, randInt, fmt, pick } from "./engine.js";

function area(id, name, kind, spec) {
  return { id: id, name: name, kind: kind, spec: spec };
}

/* ---------------- CHIMICA ---------------- */
AREA_INDEX["chimica"] = {
  name: "Chimica",
  areas: [
    area("stechiometria", "Stechiometria", "calcolo", {
      compute: function (rng) {
        const mol = randInt(rng, 2, 9);
        const massa = Number((mol * 18.015).toFixed(1));
        return {
          prompt: "Quante moli di acqua contiene una massa di " + fmt(massa) + " g di H2O? (massa molare 18,015 g/mol)",
          value: mol,
          unit: "mol",
          factor: 2,
          decimals: 2,
          explanation: "Dividendo la massa per la massa molare: " + massa + " / 18,015 = " + mol + " mol.",
          note: "Errore tipico: moltiplicare per la massa molare invece di dividere."
        };
      }
    }),
    area("soluzioni", "Soluzioni e molarita", "calcolo", {
      compute: function (rng) {
        const moli = randInt(rng, 1, 6);
        const litri = randInt(rng, 1, 5);
        const m = Math.round((moli / litri) * 1000) / 1000;
        return {
          prompt: "Una soluzione contiene " + moli + " mol di soluto in " + litri + " L di soluzione. Qual e la molarita?",
          value: m,
          unit: "mol/L",
          factor: 2,
          decimals: 3,
          explanation: "La molarita e moli/litri = " + moli + "/" + litri + " = " + fmt(m) + " mol/L.",
          note: "Errore tipico: moltiplicare moli e litri invece di dividere."
        };
      }
    }),
    area("equilibri", "Equilibri e pH", "calcolo", {
      compute: function (rng) {
        const esp = randInt(rng, 1, 6);
        return {
          prompt: "Una soluzione acquosa ha concentrazione di ioni H+ pari a 10 elevato a -" + esp + " mol/L. Qual e il pH?",
          value: esp,
          unit: "",
          factor: 2,
          decimals: 1,
          explanation: "Il pH e l'opposto del logaritmo decimale della concentrazione di H+: pH = " + esp + ".",
          note: "Errore tipico: invertire il rapporto con il pOH o usare l'esponente con segno positivo."
        };
      }
    }),
    area("atomo", "Struttura atomica", "calcolo", {
      compute: function (rng) {
        const z = randInt(rng, 3, 20);
        const a = z + randInt(rng, 0, 6);
        return {
          prompt: "Un atomo ha numero atomico Z = " + z + " e numero di massa A = " + a + ". Quanti neutroni contiene il nucleo?",
          value: a - z,
          unit: "neutroni",
          factor: 2,
          decimals: 0,
          explanation: "Il numero di neutroni e A - Z = " + a + " - " + z + " = " + (a - z) + ".",
          note: "Errore tipico: usare Z come numero di neutroni o sommare invece di sottrarre."
        };
      }
    })
  ]
};

/* ---------------- STATISTICA ---------------- */
AREA_INDEX["statistica"] = {
  name: "Statistica",
  areas: [
    area("descrittiva", "Statistica descrittiva", "calcolo", {
      compute: function (rng) {
        const vals = [];
        for (let i = 0; i < 5; i++) vals.push(randInt(rng, 2, 20));
        const somma = vals.reduce(function (a, b) { return a + b; }, 0);
        const media = Math.round((somma / vals.length) * 100) / 100;
        return {
          prompt: "Dato l'insieme di valori { " + vals.join(", ") + " }, qual e la media aritmetica?",
          value: media,
          unit: "",
          factor: 2,
          decimals: 2,
          explanation: "La media e la somma dei valori divisa per il loro numero: " + somma + " / " + vals.length + " = " + fmt(media) + ".",
          note: "Errore tipico: usare la mediana o il valore massimo al posto della media."
        };
      }
    }),
    area("probabilita", "Probabilita", "calcolo", {
      compute: function (rng) {
        const n = randInt(rng, 3, 5);
        const casi = [
          { q: "Si lancia " + n + " volte una moneta equilibrata. Qual e la probabilita di ottenere esattamente " + n + " teste? (5 cifre decimali)", v: Math.round((1 / Math.pow(2, n)) * 100000) / 100000, not: "Ogni lancio e indipendente con probabilita 1/2." },
          { q: "Si lancia " + n + " volte un dado a sei facce. Qual e la probabilita di ottenere sempre lo stesso numero? (5 cifre decimali)", v: Math.round((6 / Math.pow(6, n)) * 100000) / 100000, not: "Fissato il primo risultato, i restanti lanci devono coincidere con esso." }
        ];
        const c = pick(rng, casi);
        return {
          prompt: c.q,
          value: c.v,
          unit: "",
          factor: 2,
          decimals: 5,
          explanation: c.not,
          note: "Errore tipico: sommare le probabilita dei singoli lanci invece di moltiplicarle."
        };
      }
    }),
    area("inferenza", "Inferenza statistica", "conseguenza", {
      consequences: [
        { id: "pvalore", cause: "il p-value di un test risulta inferiore al livello di significativita fissato", effect: "si rifiuta l'ipotesi nulla al livello scelto, con possibilita residua di errore di primo tipo" },
        { id: "campione", cause: "la numerosita campionaria aumenta a parita di variabilita", effect: "l'errore standard della media diminuisce e la stima diventa piu precisa" },
        { id: "tipo2", cause: "si accetta l'ipotesi nulla quando in realta e falsa", effect: "si commette un errore di secondo tipo, legato alla potenza del test" },
        { id: "intervallo", cause: "si costruisce un intervallo di confidenza al 95% per la media", effect: "il livello di confidenza riguarda la procedura, non la singola stima" }
      ]
    }),
    area("correlazione", "Correlazione e regressione", "calcolo", {
      compute: function (rng) {
        const n = randInt(rng, 6, 10);
        let sommaX = 0, sommaY = 0, sommaXY = 0, sommaX2 = 0;
        const coppie = [];
        for (let i = 0; i < n; i++) {
          const x = randInt(rng, 1, 10);
          const y = x + randInt(rng, -2, 2);
          coppie.push(x + "/" + y);
          sommaX += x; sommaY += y; sommaXY += x * y; sommaX2 += x * x;
        }
        const num = n * sommaXY - sommaX * sommaY;
        const den = n * sommaX2 - sommaX * sommaX;
        const b = den === 0 ? 0 : Math.round((num / den) * 1000) / 1000;
        return {
          prompt: "Date le coppie x/y " + coppie.join(", ") + ", qual e il coefficiente angolare della retta di regressione di y su x? (3 decimali)",
          value: b,
          unit: "",
          factor: 2,
          decimals: 3,
          explanation: "Il coefficiente angolare e b = (n*Sxy - Sx*Sy) / (n*Sxx - Sx^2) = " + fmt(b) + ".",
          note: "Errore tipico: scambiare il ruolo di x e y, ottenendo il reciproco."
        };
      }
    })
  ]
};

/* ---------------- FISICA GENERALE ---------------- */
AREA_INDEX["fisica-generale"] = {
  name: "Fisica generale",
  areas: [
    area("cinematica", "Cinematica", "calcolo", {
      compute: function (rng) {
        const v = randInt(rng, 5, 30);
        const t = randInt(rng, 2, 12);
        return {
          prompt: "Un corpo si muove di moto rettilineo uniforme a velocita " + v + " m/s per " + t + " secondi. Qual e lo spazio percorso in metri?",
          value: v * t,
          unit: "m",
          factor: 2,
          decimals: 0,
          explanation: "Nel moto uniforme s = v * t = " + v + " * " + t + " = " + fmt(v * t) + " m.",
          note: "Errore tipico: sommare velocita e tempo invece di moltiplicarli."
        };
      }
    }),
    area("dinamica", "Dinamica", "calcolo", {
      compute: function (rng) {
        const m = randInt(rng, 2, 20);
        const a = randInt(rng, 1, 10);
        return {
          prompt: "Su un corpo di massa " + m + " kg agisce una forza che produce un'accelerazione di " + a + " m/s^2. Qual e l'intensita della forza in newton?",
          value: m * a,
          unit: "N",
          factor: 2,
          decimals: 0,
          explanation: "Per il secondo principio della dinamica F = m * a = " + m + " * " + a + " = " + fmt(m * a) + " N.",
          note: "Errore tipico: dividere la massa per l'accelerazione invece di moltiplicare."
        };
      }
    }),
    area("energia", "Lavoro ed energia", "calcolo", {
      compute: function (rng) {
        const m = randInt(rng, 1, 10);
        const h = randInt(rng, 2, 25);
        const e = Math.round(m * 9.81 * h * 10) / 10;
        return {
          prompt: "Qual e l'energia potenziale gravitazionale di un corpo di massa " + m + " kg posto a " + h + " m di altezza? (g = 9,81 m/s^2, un decimale)",
          value: e,
          unit: "J",
          factor: 2,
          decimals: 1,
          explanation: "L'energia potenziale e U = m * g * h = " + m + " * 9,81 * " + h + " = " + fmt(e) + " J.",
          note: "Errore tipico: dimenticare l'accelerazione di gravita nella formula."
        };
      }
    }),
    area("elettromagnetismo", "Elettromagnetismo", "calcolo", {
      compute: function (rng) {
        const r = randInt(rng, 1, 20);
        const i = randInt(rng, 1, 10);
        const v = Math.round(r * i * 100) / 100;
        return {
          prompt: "Un resistore di " + r + " ohm e attraversato da una corrente di " + i + " ampere. Qual e la differenza di potenziale ai suoi capi in volt?",
          value: v,
          unit: "V",
          factor: 2,
          decimals: 2,
          explanation: "Per la legge di Ohm V = R * I = " + r + " * " + i + " = " + fmt(v) + " V.",
          note: "Errore tipico: dividere la resistenza per la corrente invece di moltiplicare."
        };
      }
    })
  ]
};

export { area };
