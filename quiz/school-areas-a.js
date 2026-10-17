/* ============================================================
   Quizmind — Scuola Superiore: aree, modulo A
   ------------------------------------------------------------
   Materie scientifiche, linguistiche e tecniche.
   Ogni area dichiara i contenuti per anno scolastico (1-5):
   la profondità cresce dalla prima alla quinta superiore.
   ============================================================ */

const SCHOOL_AREAS_A = {};

function area(id, name, kind, byYear) {
  return { id: id, name: name, kind: kind, byYear: byYear };
}

/* ---------------- MATEMATICA ---------------- */
SCHOOL_AREAS_A["matematica"] = {
  name: "Matematica",
  areas: [
    area("algebra", "Algebra ed equazioni", "calcolo", {
      1: { compute: function (rng) { const a = randInt(rng, 2, 9), x = randInt(rng, 2, 12), b = randInt(rng, 1, 20); return { prompt: "Risolvi l'equazione " + a + "x + " + b + " = " + (a * x + b) + ". Quanto vale x?", value: x, unit: "", decimals: 0, explanation: "Sottraendo " + b + " da entrambi i membri si ottiene " + a + "x = " + (a * x) + ", quindi x = " + x + ".", note: "Errore tipico: sottrarre il termine noto solo al secondo membro." }; } },
      2: { compute: function (rng) { const x = randInt(rng, 2, 10), y = randInt(rng, 2, 10); return { prompt: "Risolvi il sistema: x + y = " + (x + y) + " e x − y = " + (x - y) + ". Quanto vale x?", value: x, unit: "", decimals: 0, explanation: "Sommando membro a membro si ottiene 2x = " + (2 * x) + ", quindi x = " + x + ".", note: "Errore tipico: sommare senza dividere per due, oppure ricavare y invece di x." }; } },
      3: { compute: function (rng) { const a = randInt(rng, 1, 4), b = randInt(rng, 2, 8); return { prompt: "Risolvi l'equazione di secondo grado x² − " + (a + b) + "x + " + (a * b) + " = 0. Qual è la radice maggiore?", value: Math.max(a, b), unit: "", decimals: 0, explanation: "L'equazione si scompone in (x − " + a + ")(x − " + b + ") = 0, con radici " + a + " e " + b + ".", note: "Errore tipico: sbagliare il segno nella scomposizione del trinomio." }; } },
      4: { compute: function (rng) { const a = randInt(rng, 2, 5), x = randInt(rng, 1, 3); return { prompt: "Risolvi l'equazione esponenziale " + a + "^x = " + Math.pow(a, x) + ". Quanto vale x?", value: x, unit: "", decimals: 0, explanation: "Poiché il secondo membro è " + a + " elevato a " + x + ", la soluzione è x = " + x + ".", note: "Errore tipico: applicare la radice invece del logaritmo, perdendo l'incognita all'esponente." }; } },
      5: { compute: function (rng) { const a = randInt(rng, 1, 5); return { prompt: "Calcola il limite lim(x→∞) (" + a + "x² + 3x)/(x² − 1).", value: a, unit: "", decimals: 0, explanation: "Il rapporto dei coefficienti di grado massimo dà " + a + ".", note: "Errore tipico: confrontare i gradi senza considerare i coefficienti." }; } }
    }),
    area("geometria", "Geometria", "calcolo", {
      1: { compute: function (rng) { const b = randInt(rng, 3, 15), h = randInt(rng, 2, 12); return { prompt: "Un triangolo ha base " + b + " cm e altezza " + h + " cm. Qual è la sua area?", value: (b * h) / 2, unit: "cm²", decimals: 1, explanation: "L'area del triangolo è base × altezza / 2.", note: "Errore tipico: dimenticare la divisione per due, usando la formula del rettangolo." }; } },
      2: { compute: function (rng) { const r = randInt(rng, 2, 12); return { prompt: "Un cerchio ha raggio " + r + " cm. Qual è la sua area? (π ≈ 3,14)", value: Math.round(3.14 * r * r * 10) / 10, unit: "cm²", decimals: 1, explanation: "L'area del cerchio è πr².", note: "Errore tipico: usare 2πr, che è la circonferenza, al posto di πr²." }; } },
      3: { compute: function (rng) { const c1 = randInt(rng, 3, 8), c2 = randInt(rng, 4, 9); return { prompt: "Un triangolo rettangolo ha i cateti di " + c1 + " cm e " + c2 + " cm. Qual è la lunghezza dell'ipotenusa?", value: Math.round(Math.sqrt(c1 * c1 + c2 * c2) * 100) / 100, unit: "cm", decimals: 2, explanation: "Per il teorema di Pitagora l'ipotenusa è la radice della somma dei quadrati dei cateti.", note: "Errore tipico: sommare i cateti senza elevarli al quadrato." }; } },
      4: { compute: function (rng) { const r = randInt(rng, 2, 9), h = randInt(rng, 3, 12); return { prompt: "Un cilindro ha raggio di base " + r + " cm e altezza " + h + " cm. Qual è il volume? (π ≈ 3,14)", value: Math.round(3.14 * r * r * h * 10) / 10, unit: "cm³", decimals: 1, explanation: "Il volume del cilindro è πr²h.", note: "Errore tipico: usare l'area di base senza moltiplicare per l'altezza." }; } },
      5: { compute: function (rng) { const r = randInt(rng, 2, 8); return { prompt: "Una sfera ha raggio " + r + " cm. Qual è il suo volume? (π ≈ 3,14)", value: Math.round((4 / 3) * 3.14 * Math.pow(r, 3) * 10) / 10, unit: "cm³", decimals: 1, explanation: "Il volume della sfera è (4/3)πr³.", note: "Errore tipico: usare 4πr², che è la superficie, oppure omettere il fattore 4/3." }; } }
    }),
    area("funzioni", "Funzioni e grafici", "regola-caso", {
      1: { cases: [function (rng) { const a = pick(rng, [1, 2, -1, -2]); return { prompt: "La funzione y = " + a + "x rappresenta una proporzionalità diretta. Il suo grafico è:", correct: "una retta passante per l'origine degli assi", distractors: ["una parabola con vertice nell'origine", "un'iperbole con asintoti sugli assi", "una retta che non passa per l'origine"], note: "Errore tipico: confondere la proporzionalità diretta con quella inversa." }; }] },
      2: { cases: [function () { return { prompt: "Data la funzione y = x², il suo grafico è:", correct: "una parabola con vertice nell'origine e concavità verso l'alto", distractors: ["una retta con pendenza crescente", "una parabola con concavità verso il basso", "un'iperbole equilatera"], note: "Errore tipico: invertire il verso della concavità o confonderla con l'iperbole." }; }] },
      3: { cases: [function () { return { prompt: "Il dominio della funzione f(x) = 1/(x − 3) è:", correct: "tutti i numeri reali tranne x = 3", distractors: ["tutti i numeri reali", "solo i numeri positivi", "tutti i numeri reali tranne x = 0"], note: "Errore tipico: escludere lo zero invece del valore che annulla il denominatore." }; }] },
      4: { cases: [function (rng) { const a = pick(rng, [2, 3, 10]); return { prompt: "La funzione esponenziale y = " + a + "^x, con " + a + " > 1, è:", correct: "sempre crescente e definita su tutti i reali, sempre positiva", distractors: ["crescente solo per x > 0", "sempre decrescente", "definita solo per x positivi"], note: "Errore tipico: limitare il dominio delle funzioni esponenziali ai valori positivi." }; }] },
      5: { cases: [function () { return { prompt: "La funzione logaritmica y = ln(x) è definita:", correct: "solo per x > 0, ed è strettamente crescente", distractors: ["su tutti i numeri reali", "solo per x < 0", "solo per valori interi di x"], note: "Errore tipico: estendere il dominio del logaritmo ai valori negativi." }; }] }
    }),
    area("analisi", "Derivate e limiti", "calcolo", {
      1: { compute: function (rng) { const a = randInt(rng, 2, 9), b = randInt(rng, 1, 10), x = randInt(rng, 1, 6); return { prompt: "Data f(x) = " + a + "x + " + b + ", quanto vale f(" + x + ")?", value: a * x + b, unit: "", decimals: 0, explanation: "Sostituendo x = " + x + " si ottiene " + a + "·" + x + " + " + b + ".", note: "Errore tipico: moltiplicare il coefficiente per il termine noto invece che per x." }; } },
      2: { compute: function (rng) { const x = randInt(rng, 1, 8); return { prompt: "Data f(x) = x², quanto vale f(" + x + ") + f(" + (x + 1) + ")?", value: x * x + (x + 1) * (x + 1), unit: "", decimals: 0, explanation: "Si calcolano separatamente i quadrati e si sommano.", note: "Errore tipico: sommare le basi prima di elevarle al quadrato." }; } },
      3: { compute: function (rng) { const n = randInt(rng, 2, 6); return { prompt: "Data f(x) = x^" + n + ", quanto vale f'(1)?", value: n, unit: "", decimals: 0, explanation: "La derivata è " + n + "x^" + (n - 1) + "; sostituendo x = 1 si ottiene " + n + ".", note: "Errore tipico: dimenticare di decrementare l'esponente." }; } },
      4: { compute: function (rng) { const n = randInt(rng, 2, 5), x = randInt(rng, 2, 4); return { prompt: "Data f(x) = x^" + n + ", quanto vale f'(" + x + ")?", value: n * Math.pow(x, n - 1), unit: "", decimals: 0, explanation: "La derivata è " + n + "x^" + (n - 1) + ", valutata in x = " + x + ".", note: "Errore tipico: applicare la regola di derivazione a f(x) invece che a f'(x)." }; } },
      5: { compute: function (rng) { const m = randInt(rng, 2, 8), q = randInt(rng, 1, 5); return { prompt: "Qual è il valore del limite lim(x→0) sin(" + m + "x)/(" + q + "x)?", value: Math.round((m / q) * 1000) / 1000, unit: "", decimals: 3, explanation: "Il limite notevole dà il rapporto tra i coefficienti degli argomenti.", note: "Errore tipico: applicare il limite notevole senza confrontare i coefficienti." }; } }
    })
  ]
};

/* ---------------- FISICA ---------------- */
SCHOOL_AREAS_A["fisica"] = {
  name: "Fisica",
  areas: [
    area("cinematica", "Cinematica", "calcolo", {
      1: { compute: function (rng) { const s = randInt(rng, 10, 200), t = randInt(rng, 2, 10); return { prompt: "Un corpo percorre " + s + " m in " + t + " s a velocità costante. Qual è la sua velocità?", value: Math.round((s / t) * 100) / 100, unit: "m/s", decimals: 2, explanation: "La velocità è spazio diviso tempo.", note: "Errore tipico: moltiplicare spazio e tempo invece di dividere." }; } },
      2: { compute: function (rng) { const v = randInt(rng, 2, 30), t = randInt(rng, 2, 20); return { prompt: "Un'auto viaggia a " + v + " m/s per " + t + " s. Quale distanza percorre?", value: v * t, unit: "m", decimals: 0, explanation: "Lo spazio è velocità per tempo.", note: "Errore tipico: dividere la velocità per il tempo." }; } },
      3: { compute: function (rng) { const v0 = randInt(rng, 2, 20), a = randInt(rng, 1, 6), t = randInt(rng, 2, 10); return { prompt: "Un corpo parte con velocità " + v0 + " m/s e accelera a " + a + " m/s² per " + t + " s. Qual è la velocità finale?", value: v0 + a * t, unit: "m/s", decimals: 0, explanation: "Con moto uniformemente accelerato v = v₀ + at.", note: "Errore tipico: sommare v₀ e a senza moltiplicare per il tempo." }; } },
      4: { compute: function (rng) { const v0 = randInt(rng, 2, 15), a = randInt(rng, 1, 5), t = randInt(rng, 2, 8); return { prompt: "Un corpo parte con velocità " + v0 + " m/s e accelera a " + a + " m/s² per " + t + " s. Quale spazio percorre?", value: Math.round((v0 * t + 0.5 * a * t * t) * 10) / 10, unit: "m", decimals: 1, explanation: "Con moto uniformemente accelerato s = v₀t + ½at².", note: "Errore tipico: dimenticare il termine ½at², calcolando solo v₀t." }; } },
      5: { compute: function (rng) { const h = randInt(rng, 5, 80); return { prompt: "Un corpo cade da un'altezza di " + h + " m partendo da fermo. Con g = 9,8 m/s², quale velocità raggiunge al suolo?", value: Math.round(Math.sqrt(2 * 9.8 * h) * 10) / 10, unit: "m/s", decimals: 1, explanation: "Dalla conservazione dell'energia v = √(2gh).", note: "Errore tipico: usare v = gh invece di √(2gh)." }; } }
    }),
    area("dinamica", "Dinamica", "calcolo", {
      1: { compute: function (rng) { const m = randInt(rng, 1, 20); return { prompt: "Un corpo ha massa " + m + " kg. Con g = 9,8 m/s², qual è il suo peso?", value: Math.round(m * 9.8 * 10) / 10, unit: "N", decimals: 1, explanation: "Il peso è massa per accelerazione di gravità.", note: "Errore tipico: confondere massa e peso, dimenticando g." }; } },
      2: { compute: function (rng) { const m = randInt(rng, 1, 10), a = randInt(rng, 1, 8); return { prompt: "Un corpo di massa " + m + " kg subisce un'accelerazione di " + a + " m/s². Qual è la forza applicata?", value: m * a, unit: "N", decimals: 0, explanation: "Per il secondo principio della dinamica F = ma.", note: "Errore tipico: sommare massa e accelerazione invece di moltiplicarle." }; } },
      3: { compute: function (rng) { const f = randInt(rng, 10, 200), m = randInt(rng, 2, 20); return { prompt: "Una forza di " + f + " N agisce su una massa di " + m + " kg. Qual è l'accelerazione?", value: Math.round((f / m) * 100) / 100, unit: "m/s²", decimals: 2, explanation: "Dalla seconda legge della dinamica a = F/m.", note: "Errore tipico: moltiplicare forza e massa invece di dividere." }; } },
      4: { compute: function (rng) { const m = randInt(rng, 1, 20), a = randInt(rng, 1, 6), attrito = randInt(rng, 1, 5); return { prompt: "Un corpo di " + m + " kg accelera a " + a + " m/s² con una forza di attrito contraria di " + attrito + " N. Qual è la forza motrice necessaria?", value: m * a + attrito, unit: "N", decimals: 0, explanation: "La forza motrice deve vincere l'inerzia (ma) e l'attrito.", note: "Errore tipico: sottrarre l'attrito invece di sommarlo alla forza motrice." }; } },
      5: { compute: function (rng) { const m1 = randInt(rng, 1, 6), m2 = randInt(rng, 1, 6), a = randInt(rng, 1, 5); return { prompt: "Due masse di " + m1 + " kg e " + m2 + " kg sono collegate e trainate con accelerazione " + a + " m/s² su piano senza attrito. Qual è la forza applicata al sistema?", value: (m1 + m2) * a, unit: "N", decimals: 0, explanation: "La forza totale è la massa complessiva per l'accelerazione.", note: "Errore tipico: applicare la forza a una sola delle due masse." }; } }
    }),
    area("energia", "Energia e lavoro", "calcolo", {
      1: { compute: function (rng) { const f = randInt(rng, 10, 100), s = randInt(rng, 1, 20); return { prompt: "Una forza di " + f + " N sposta un corpo di " + s + " m nella sua stessa direzione. Qual è il lavoro compiuto?", value: f * s, unit: "J", decimals: 0, explanation: "Il lavoro è forza per spostamento.", note: "Errore tipico: sommare forza e spostamento invece di moltiplicarli." }; } },
      2: { compute: function (rng) { const m = randInt(rng, 1, 10), h = randInt(rng, 2, 15); return { prompt: "Un corpo di " + m + " kg si trova a " + h + " m di altezza. Qual è la sua energia potenziale? (g = 9,8 m/s²)", value: Math.round(m * 9.8 * h * 10) / 10, unit: "J", decimals: 1, explanation: "L'energia potenziale gravitazionale è mgh.", note: "Errore tipico: dimenticare l'accelerazione di gravità." }; } },
      3: { compute: function (rng) { const m = randInt(rng, 1, 10), v = randInt(rng, 2, 20); return { prompt: "Un corpo di " + m + " kg si muove a " + v + " m/s. Qual è la sua energia cinetica?", value: Math.round(0.5 * m * v * v * 10) / 10, unit: "J", decimals: 1, explanation: "L'energia cinetica è ½mv².", note: "Errore tipico: dimenticare il fattore ½ o non elevare al quadrato la velocità." }; } },
      4: { compute: function (rng) { const m = randInt(rng, 1, 8), h = randInt(rng, 2, 12); return { prompt: "Un corpo di " + m + " kg cade da " + h + " m. Qual è l'energia cinetica al suolo, trascurando l'attrito? (g = 9,8 m/s²)", value: Math.round(m * 9.8 * h * 10) / 10, unit: "J", decimals: 1, explanation: "Per la conservazione dell'energia, l'energia potenziale iniziale si trasforma integralmente in cinetica.", note: "Errore tipico: calcolare l'energia cinetica senza la velocità, oppure sommare due forme di energia che si conservano." }; } },
      5: { compute: function (rng) { const w = randInt(rng, 200, 5000), t = randInt(rng, 2, 60); return { prompt: "Una macchina compie un lavoro di " + fmt(w) + " J in " + t + " s. Qual è la potenza media sviluppata?", value: Math.round((w / t) * 100) / 100, unit: "W", decimals: 2, explanation: "La potenza è lavoro diviso tempo.", note: "Errore tipico: moltiplicare lavoro e tempo invece di dividere." }; } }
    }),
    area("elettromagnetismo", "Elettricità e magnetismo", "calcolo", {
      1: { compute: function (rng) { const v = randInt(rng, 1, 24), r = randInt(rng, 10, 200); return { prompt: "Una tensione di " + v + " V è applicata a una resistenza di " + r + " Ω. Qual è l'intensità di corrente?", value: Math.round((v / r) * 1000) / 1000, unit: "A", decimals: 3, explanation: "Per la legge di Ohm I = V/R.", note: "Errore tipico: moltiplicare tensione e resistenza invece di dividere." }; } },
      2: { compute: function (rng) { const i = randInt(rng, 1, 10), r = randInt(rng, 10, 200); return { prompt: "Un circuito è percorso da " + i + " A con una resistenza di " + r + " Ω. Qual è la tensione?", value: i * r, unit: "V", decimals: 0, explanation: "Per la legge di Ohm V = RI.", note: "Errore tipico: dividere invece di moltiplicare." }; } },
      3: { compute: function (rng) { const r1 = randInt(rng, 10, 100), r2 = randInt(rng, 10, 100); return { prompt: "Due resistenze di " + r1 + " Ω e " + r2 + " Ω sono in serie. Qual è la resistenza equivalente?", value: r1 + r2, unit: "Ω", decimals: 0, explanation: "In serie le resistenze si sommano.", note: "Errore tipico: applicare la formula del parallelo a una serie." }; } },
      4: { compute: function (rng) { const r1 = randInt(rng, 20, 100), r2 = randInt(rng, 20, 100); return { prompt: "Due resistenze di " + r1 + " Ω e " + r2 + " Ω sono in parallelo. Qual è la resistenza equivalente?", value: Math.round(((r1 * r2) / (r1 + r2)) * 100) / 100, unit: "Ω", decimals: 2, explanation: "In parallelo l'inverso della resistenza equivalente è la somma degli inversi.", note: "Errore tipico: sommare le resistenze come se fossero in serie." }; } },
      5: { compute: function (rng) { const p = randInt(rng, 10, 3000), t = randInt(rng, 1, 24); return { prompt: "Un apparecchio assorbe " + fmt(p) + " W per " + t + " ore. Quanta energia consuma in kilowattora?", value: Math.round((p / 1000) * t * 100) / 100, unit: "kWh", decimals: 2, explanation: "Si converte la potenza in kW e si moltiplica per le ore.", note: "Errore tipico: non convertire i watt in kilowatt prima del calcolo." }; } }
    })
  ]
};

/* ---------------- SCIENZE ---------------- */
SCHOOL_AREAS_A["scienze"] = {
  name: "Scienze Naturali",
  areas: [
    area("chimica", "Chimica", "calcolo", {
      1: { compute: function (rng) { const p = randInt(rng, 1, 20), n = randInt(rng, 1, 20); return { prompt: "Un atomo ha " + p + " protoni e " + n + " neutroni. Qual è il suo numero di massa?", value: p + n, unit: "", decimals: 0, explanation: "Il numero di massa è la somma di protoni e neutroni.", note: "Errore tipico: usare il solo numero di protoni, che è il numero atomico." }; } },
      2: { compute: function (rng) { const mol = randInt(rng, 1, 5); return { prompt: "Quante moli di acqua ci sono in " + (mol * 18) + " g di H₂O? (massa molare 18 g/mol)", value: mol, unit: "mol", decimals: 1, explanation: "Si divide la massa per la massa molare.", note: "Errore tipico: moltiplicare per la massa molare invece di dividere." }; } },
      3: { compute: function (rng) { const esp = randInt(rng, 1, 6); return { prompt: "Una soluzione ha concentrazione di H⁺ pari a 10⁻" + esp + " mol/L. Qual è il pH?", value: esp, unit: "", decimals: 1, explanation: "Il pH è l'opposto del logaritmo decimale della concentrazione di H⁺.", note: "Errore tipico: usare il pOH al posto del pH senza convertire." }; } },
      4: { compute: function (rng) { const c = randInt(rng, 2, 12); return { prompt: "Quanti atomi di carbonio contiene un alcano a catena lineare con " + (c + 2) + " atomi di idrogeno?", value: c, unit: "", decimals: 0, explanation: "Negli alcani lineari CnH2n+2: se l'idrogeno è " + (c + 2) + ", allora n = " + c + ".", note: "Errore tipico: usare la formula degli alcheni invece di quella degli alcani." }; } },
      5: { compute: function (rng) { const m = randInt(rng, 1, 5), v = randInt(rng, 1, 4); return { prompt: "Una soluzione contiene " + m + " mol di soluto in " + v + " L. Qual è la molarità?", value: Math.round((m / v) * 1000) / 1000, unit: "mol/L", decimals: 3, explanation: "La molarità è moli diviso litri.", note: "Errore tipico: moltiplicare moli e litri invece di dividere." }; } }
    }),
    area("biologia", "Biologia", "definizione", {
      1: { sets: [{ question: "Nella cellula,", items: [
        { id: "nucleo", label: "il nucleo", text: "la struttura che contiene il materiale genetico e dirige l'attività cellulare" },
        { id: "mitocondrio", label: "il mitocondrio", text: "l'organulo in cui avviene la respirazione cellulare e la produzione di energia" },
        { id: "membrana", label: "la membrana plasmatica", text: "la struttura che delimita la cellula e regola gli scambi con l'esterno" },
        { id: "cloroplasto", label: "il cloroplasto", text: "l'organulo in cui avviene la fotosintesi, presente nelle cellule vegetali" }
      ] }] },
      2: { sets: [{ question: "Nella genetica,", items: [
        { id: "gene", label: "il gene", text: "il tratto di DNA che contiene l'informazione per una proteina" },
        { id: "allele", label: "l'allele", text: "una delle forme alternative di uno stesso gene" },
        { id: "genotipo", label: "il genotipo", text: "la costituzione genetica di un individuo" },
        { id: "fenotipo", label: "il fenotipo", text: "l'insieme dei caratteri osservabili di un individuo" }
      ] }] },
      3: { sets: [{ question: "Nella fisiologia umana,", items: [
        { id: "circolazione", label: "la circolazione sanguigna", text: "il sistema che trasporta ossigeno e sostanze nutritive a tutti i tessuti" },
        { id: "respirazione", label: "la respirazione", text: "il processo che introduce ossigeno ed elimina anidride carbonica" },
        { id: "nervoso", label: "il sistema nervoso", text: "il sistema che raccoglie gli stimoli e coordina le risposte dell'organismo" }
      ] }] },
      4: { sets: [{ question: "Nell'anatomia comparata,", items: [
        { id: "omologhi", label: "gli organi omologhi", text: "organi con la stessa origine embrionale ma funzione diversa" },
        { id: "analoghi", label: "gli organi analoghi", text: "organi con funzione simile ma origine embrionale diversa" }
      ] }] },
      5: { sets: [{ question: "Nella biologia molecolare,", items: [
        { id: "trascrizione", label: "la trascrizione", text: "il processo che copia l'informazione del DNA in una molecola di RNA" },
        { id: "traduzione", label: "la traduzione", text: "il processo che costruisce una proteina a partire dall'informazione dell'mRNA" },
        { id: "replicazione", label: "la replicazione", text: "il processo che duplica il DNA prima della divisione cellulare" }
      ] }] }
    }),
    area("scienze-terra", "Scienze della Terra", "conseguenza", {
      1: { consequences: [
        { id: "ciclo-acqua", cause: "l'acqua evapora dagli oceani per effetto dell'energia solare", effect: "il vapore sale, condensa in nubi e ricade come precipitazione, chiudendo il ciclo idrologico" },
        { id: "suolo", cause: "le rocce affioranti subiscono l'azione degli agenti atmosferici", effect: "si forma il suolo per disgregazione fisica e alterazione chimica" }
      ] },
      3: { consequences: [
        { id: "tettonica", cause: "due placche litosferiche convergono", effect: "si formano catene montuose e si generano terremoti nella zona di contatto" },
        { id: "vulcani", cause: "il magma risale lungo una frattura della crosta", effect: "si origina un'attività vulcanica, con eruzioni e rilascio di gas" }
      ] },
      5: { consequences: [
        { id: "clima", cause: "aumenta la concentrazione di gas serra in atmosfera", effect: "si intensifica l'effetto serra, con incremento della temperatura media globale" },
        { id: "dissesto", cause: "si disbosca un versante in pendenza", effect: "aumenta il rischio di dissesto idrogeologico, per ridotta ritenzione del suolo" }
      ] }
    }),
    area("metodo", "Metodo scientifico e misura", "sequenza", {
      1: { sequences: [
        { id: "metodo", question: "Nel metodo scientifico sperimentale:", first: "si formula un'ipotesi verificabile a partire dall'osservazione" },
        { id: "esperimento", question: "Nella conduzione di un esperimento:", first: "si definiscono le variabili da controllare e il gruppo di confronto" }
      ] },
      3: { sequences: [
        { id: "dati", question: "Nell'elaborazione dei dati sperimentali:", first: "si organizzano le misure in tabelle e si calcolano medie e incertezze" }
      ] },
      5: { sequences: [
        { id: "conclusione", question: "Nella conclusione di una ricerca:", first: "si confrontano i risultati con l'ipotesi iniziale e si valutano le fonti di errore" }
      ] }
    })
  ]
};

/* ---------------- INGLESE ---------------- */
SCHOOL_AREAS_A["inglese"] = {
  name: "Lingua e Cultura Straniera",
  areas: [
    area("grammatica", "Grammatica", "regola-caso", {
      1: { cases: [function () { return { prompt: "Scegli la forma corretta: «She ___ to school every day».", correct: "goes", distractors: ["go", "going", "is go"], note: "Errore tipico: omettere la -s della terza persona singolare al presente semplice." }; }] },
      2: { cases: [function () { return { prompt: "Scegli la forma corretta: «I ___ TV when you called me».", correct: "was watching", distractors: ["watched", "have watched", "watch"], note: "Errore tipico: usare il passato semplice per un'azione in corso nel passato." }; }] },
      3: { cases: [function () { return { prompt: "Scegli la forma corretta: «If I ___ more, I would pass the exam».", correct: "studied", distractors: ["study", "will study", "have studied"], note: "Errore tipico: usare will nel periodo ipotetico di secondo tipo." }; }] },
      4: { cases: [function () { return { prompt: "Scegli la forma corretta: «The report ___ by the manager yesterday».", correct: "was written", distractors: ["wrote", "has written", "is writing"], note: "Errore tipico: usare la forma attiva quando il soggetto subisce l'azione." }; }] },
      5: { cases: [function () { return { prompt: "Scegli la forma corretta: «He said he ___ the letter the day before».", correct: "had sent", distractors: ["sent", "has sent", "will send"], note: "Errore tipico: non arretrare il tempo verbale nel discorso indiretto." }; }] }
    }),
    area("lessico", "Lessico", "classificazione", {
      1: { classes: [
        { id: "colori", label: "colours", members: ["blue", "green", "yellow"] },
        { id: "numeri", label: "numbers", members: ["seven", "twelve", "twenty"] },
        { id: "animali", label: "animals", members: ["horse", "sheep", "rabbit"] }
      ] },
      2: { classes: [
        { id: "cibo", label: "food", members: ["bread", "cheese", "apple"] },
        { id: "luoghi", label: "places", members: ["library", "station", "market"] },
        { id: "mestieri", label: "jobs", members: ["nurse", "engineer", "farmer"] }
      ] },
      3: { classes: [
        { id: "ambiente", label: "environment", members: ["pollution", "recycling", "climate"] },
        { id: "tecnologia", label: "technology", members: ["device", "software", "network"] }
      ] },
      4: { classes: [
        { id: "economia", label: "economics", members: ["demand", "supply", "investment"] },
        { id: "politica", label: "politics", members: ["election", "parliament", "policy"] }
      ] },
      5: { classes: [
        { id: "letteratura", label: "literature", members: ["novel", "poem", "essay"] },
        { id: "scienza", label: "science", members: ["experiment", "evidence", "hypothesis"] }
      ] }
    }),
    area("tempi", "Tempi e forme verbali", "conseguenza", {
      2: { consequences: [
        { id: "present-simple", cause: "il testo descrive una routine quotidiana", effect: "i verbi sono al presente semplice e compaiono avverbi di frequenza" },
        { id: "past-simple", cause: "il testo racconta un evento concluso nel passato", effect: "i verbi sono al passato semplice con indicazioni temporali definite" }
      ] },
      3: { consequences: [
        { id: "present-perfect", cause: "il testo collega un'azione passata al presente", effect: "si usa il present perfect con for, since, already, yet" },
        { id: "futuro", cause: "il testo esprime previsioni o intenzioni", effect: "si usa will per le previsioni e going to per le intenzioni" }
      ] },
      4: { consequences: [
        { id: "passivo", cause: "il testo descrive un processo senza indicare l'agente", effect: "si usa la forma passiva, frequente nei testi scientifici e tecnici" },
        { id: "condizionale", cause: "il testo esprime ipotesi non realizzate", effect: "si usa il terzo condizionale con il past perfect" }
      ] },
      5: { consequences: [
        { id: "registro", cause: "il testo appartiene a un registro formale", effect: "si usano forme impersonali e connettivi di coesione come however e therefore" },
        { id: "argomentazione", cause: "il testo sostiene una tesi", effect: "si riconoscono i connettivi di causa, conseguenza e contrapposizione" }
      ] }
    }),
    area("cultura", "Cultura e civiltà", "regola-caso", {
      2: { cases: [function () { return { prompt: "Il Regno Unito è composto da:", correct: "Inghilterra, Scozia, Galles e Irlanda del Nord", distractors: ["Inghilterra, Scozia e Irlanda", "Gran Bretagna e Irlanda", "Inghilterra, Galles e Irlanda"], note: "Errore tipico: confondere la Gran Bretagna, che è l'isola, con il Regno Unito, che comprende l'Irlanda del Nord." }; }] },
      4: { cases: [function () { return { prompt: "Il sistema politico britannico si caratterizza per:", correct: "un sistema parlamentare bicamerale con monarchia costituzionale", distractors: ["una repubblica presidenziale", "una monarchia assoluta", "un sistema federale con presidente eletto"], note: "Errore tipico: definire assoluta una monarchia che ha funzione simbolica e di garanzia." }; }] },
      5: { cases: [function () { return { prompt: "La Rivoluzione industriale prese avvio:", correct: "in Inghilterra nella seconda metà del Settecento, con l'industria tessile e le prime macchine a vapore", distractors: ["in Francia durante la Rivoluzione", "in Germania alla fine dell'Ottocento", "negli Stati Uniti nel Novecento"], note: "Errore tipico: collocare l'avvio della Rivoluzione industriale in un paese diverso dall'Inghilterra." }; }] }
    })
  ]
};

/* ---------------- INFORMATICA (istituti tecnici) ---------------- */
SCHOOL_AREAS_A["informatica"] = {
  name: "Informatica",
  areas: [
    area("fondamenti", "Fondamenti di informatica", "definizione", {
      1: { sets: [{ question: "Nell'informatica di base,", items: [
        { id: "cpu", label: "la CPU", text: "l'unità che esegue le istruzioni e coordina le operazioni del sistema" },
        { id: "ram", label: "la memoria RAM", text: "la memoria volatile che contiene i dati in uso durante l'elaborazione" },
        { id: "disco", label: "la memoria di massa", text: "la memoria permanente che conserva i dati anche a sistema spento" },
        { id: "so", label: "il sistema operativo", text: "il software che gestisce le risorse hardware e fornisce i servizi ai programmi" }
      ] }] },
      2: { sets: [{ question: "Nel software,", items: [
        { id: "compilatore", label: "il compilatore", text: "il programma che traduce il codice sorgente in codice eseguibile" },
        { id: "interprete", label: "l'interprete", text: "il programma che esegue il codice sorgente istruzione per istruzione" },
        { id: "debugger", label: "il debugger", text: "lo strumento che consente di eseguire un programma passo passo per individuare errori" }
      ] }] }
    }),
    area("numerazione", "Sistemi di numerazione", "calcolo", {
      1: { compute: function (rng) { const n = randInt(rng, 2, 8); return { prompt: "Quanti bit sono necessari per rappresentare " + n + " byte?", value: n * 8, unit: "bit", factor: 8, decimals: 0, explanation: "Un byte corrisponde a 8 bit.", note: "Errore tipico: confondere bit e byte, che differiscono di un fattore otto." }; } },
      2: { compute: function (rng) { const n = randInt(rng, 2, 15); return { prompt: "Qual è il valore decimale del numero binario " + n.toString(2) + "?", value: n, unit: "", decimals: 0, explanation: "Si sommano le potenze di due corrispondenti alle posizioni con cifra 1.", note: "Errore tipico: leggere le cifre binarie come se fossero decimali." }; } },
      3: { compute: function (rng) { const n = randInt(rng, 4, 16); return { prompt: "Quanti valori distinti si possono rappresentare con " + n + " bit?", value: Math.pow(2, n), unit: "", factor: 2, decimals: 0, explanation: "Con n bit si rappresentano 2^n valori distinti.", note: "Errore tipico: usare n² o 10^n al posto di 2^n." }; } },
      4: { compute: function (rng) { const k = randInt(rng, 1, 10); return { prompt: "Quanti byte sono " + k + " kilobyte, considerando 1 KB = 1024 byte?", value: k * 1024, unit: "byte", factor: 2, decimals: 0, explanation: "Si moltiplica per 1024, potenza di due usata nei multipli binari.", note: "Errore tipico: usare 1000 al posto di 1024 nei multipli binari." }; } },
      5: { compute: function (rng) { const n = randInt(rng, 20, 100); return { prompt: "Un algoritmo esegue su n = " + n + " elementi un numero di operazioni pari a n²/2. Quante operazioni esegue approssimativamente?", value: Math.round((n * n) / 2), unit: "operazioni", factor: 2, decimals: 0, explanation: "Si eleva n al quadrato e si divide per due.", note: "Errore tipico: calcolare n/2 invece di n²/2, confondendo complessità lineare e quadratica." }; } }
    }),
    area("programmazione", "Programmazione", "conseguenza", {
      3: { consequences: [
        { id: "while", cause: "un ciclo while ha una condizione sempre vera", effect: "il ciclo non termina mai, causando un blocco del programma" },
        { id: "indice", cause: "si accede a un array con indice pari alla sua lunghezza", effect: "si produce un errore di indice fuori dai limiti, perché gli indici partono da zero" }
      ] },
      4: { consequences: [
        { id: "funzione", cause: "una funzione viene invocata senza restituire alcun valore", effect: "la chiamata ha effetto solo per le modifiche prodotte, senza valore di ritorno utilizzabile" },
        { id: "tipo", cause: "si somma una stringa a un intero senza conversione", effect: "si ottiene una concatenazione o un errore, a seconda del linguaggio" }
      ] },
      5: { consequences: [
        { id: "complessita", cause: "un algoritmo di ricerca ha costo O(n²) su grandi volumi di dati", effect: "il tempo di esecuzione cresce rapidamente e diventa impraticabile oltre certe dimensioni" },
        { id: "modularita", cause: "il codice viene suddiviso in funzioni con responsabilità singola", effect: "aumentano leggibilità, riusabilità e facilità di verifica del programma" }
      ] }
    }),
    area("reti", "Reti e sicurezza", "regola-caso", {
      4: { cases: [function () { return { prompt: "In una rete locale, il router ha la funzione di:", correct: "collegare reti diverse e instradare i pacchetti verso la destinazione", distractors: ["assegnare nomi simbolici agli host", "controllare gli accessi fisici alla sala server", "tradurre i protocolli applicativi in linguaggio macchina"], note: "Errore tipico: attribuire al router funzioni che spettano al DNS." }; }] },
      5: { cases: [function () { return { prompt: "In una rete IPv4, una sottorete con maschera /24 dispone di:", correct: "254 indirizzi utilizzabili per gli host, esclusi indirizzo di rete e broadcast", distractors: ["256 indirizzi utilizzabili", "512 indirizzi utilizzabili", "128 indirizzi utilizzabili"], note: "Errore tipico: contare come utilizzabili anche l'indirizzo di rete e quello di broadcast." }; }] }
    })
  ]
};

/* ---------------- ELETTRONICA ---------------- */
SCHOOL_AREAS_A["elettronica"] = {
  name: "Elettrotecnica ed Elettronica",
  areas: [
    area("circuiti", "Circuiti elettrici", "calcolo", {
      1: { compute: function (rng) { const i = randInt(rng, 1, 10), r = randInt(rng, 10, 200); return { prompt: "Un circuito è percorso da " + i + " A con resistenza di " + r + " Ω. Qual è la tensione?", value: i * r, unit: "V", decimals: 0, explanation: "Per la legge di Ohm V = RI.", note: "Errore tipico: dividere invece di moltiplicare." }; } },
      2: { compute: function (rng) { const v = randInt(rng, 10, 240), r = randInt(rng, 10, 100); return { prompt: "Una tensione di " + v + " V è applicata a una resistenza di " + r + " Ω. Qual è l'intensità di corrente?", value: Math.round((v / r) * 1000) / 1000, unit: "A", decimals: 3, explanation: "Per la legge di Ohm I = V/R.", note: "Errore tipico: moltiplicare tensione e resistenza invece di dividere." }; } },
      3: { compute: function (rng) { const r1 = randInt(rng, 10, 100), r2 = randInt(rng, 10, 100); return { prompt: "Due resistenze di " + r1 + " Ω e " + r2 + " Ω sono in serie. Qual è la resistenza equivalente?", value: r1 + r2, unit: "Ω", decimals: 0, explanation: "In serie le resistenze si sommano.", note: "Errore tipico: applicare la formula del parallelo a una serie." }; } },
      4: { compute: function (rng) { const r1 = randInt(rng, 20, 100), r2 = randInt(rng, 20, 100); return { prompt: "Due resistenze di " + r1 + " Ω e " + r2 + " Ω sono in parallelo. Qual è la resistenza equivalente?", value: Math.round(((r1 * r2) / (r1 + r2)) * 100) / 100, unit: "Ω", decimals: 2, explanation: "In parallelo l'inverso della resistenza equivalente è la somma degli inversi.", note: "Errore tipico: sommare le resistenze come se fossero in serie." }; } },
      5: { compute: function (rng) { const p = randInt(rng, 10, 3000), t = randInt(rng, 1, 24); return { prompt: "Un apparecchio assorbe " + fmt(p) + " W per " + t + " ore. Quanta energia consuma in kWh?", value: Math.round((p / 1000) * t * 100) / 100, unit: "kWh", decimals: 2, explanation: "Si converte in kW e si moltiplica per le ore.", note: "Errore tipico: non convertire i watt in kilowatt prima del calcolo." }; } }
    }),
    area("misure", "Strumenti di misura", "definizione", {
      2: { sets: [{ question: "Nella strumentazione elettrica,", items: [
        { id: "voltmetro", label: "il voltmetro", text: "lo strumento che misura la differenza di potenziale e si collega in parallelo" },
        { id: "amperometro", label: "l'amperometro", text: "lo strumento che misura l'intensità di corrente e si collega in serie" },
        { id: "ohmmetro", label: "l'ohmmetro", text: "lo strumento che misura la resistenza, usato a circuito diseccitato" },
        { id: "oscilloscopio", label: "l'oscilloscopio", text: "lo strumento che visualizza l'andamento di un segnale nel tempo" }
      ] }] }
    }),
    area("segnali", "Segnali e sistemi", "conseguenza", {
      4: { consequences: [
        { id: "digitale", cause: "un segnale analogico viene campionato a frequenza troppo bassa rispetto alla sua banda", effect: "si produce aliasing e il segnale ricostruito risulta distorto" },
        { id: "filtro", cause: "si applica un filtro passa-basso a un segnale con disturbi ad alta frequenza", effect: "si attenua il rumore di alta frequenza, conservando le componenti utili" }
      ] },
      5: { consequences: [
        { id: "rumore", cause: "il rapporto segnale/rumore si riduce", effect: "peggiora la qualità della trasmissione e aumenta la probabilità di errore" },
        { id: "retroazione", cause: "si introduce una retroazione negativa in un amplificatore", effect: "si riduce il guadagno ma migliorano stabilità e larghezza di banda" }
      ] }
    }),
    area("sicurezza", "Sicurezza elettrica", "regola-caso", {
      3: { cases: [function () { return { prompt: "L'impianto di terra in un impianto elettrico serve a:", correct: "disperdere le correnti di guasto e proteggere le persone dal contatto indiretto", distractors: ["aumentare la potenza disponibile", "ridurre i consumi energetici", "migliorare la qualità della luce emessa"], note: "Errore tipico: attribuire all'impianto di terra funzioni di risparmio energetico." }; }] },
      5: { cases: [function () { return { prompt: "Prima di intervenire su un impianto, la messa fuori tensione richiede:", correct: "sezionare, verificare l'assenza di tensione, mettere a terra e in cortocircuito, delimitare l'area", distractors: ["solo l'apertura dell'interruttore generale", "la sola verifica con il cercafase", "l'avviso verbale ai colleghi"], note: "Errore tipico: ritenere sufficiente il sezionamento senza le altre operazioni previste." }; }] }
    }),
    area("componenti", "Componenti elettronici", "definizione", {
      4: { sets: [{ question: "Nei componenti elettronici,", items: [
        { id: "diodo", label: "il diodo", text: "il componente che consente il passaggio della corrente in una sola direzione" },
        { id: "transistor", label: "il transistor", text: "il componente a tre terminali che amplifica o commuta un segnale" },
        { id: "condensatore", label: "il condensatore", text: "il componente che immagazzina carica elettrica e si oppone alle variazioni di tensione" },
        { id: "induttore", label: "l'induttore", text: "il componente che immagazzina energia in un campo magnetico e si oppone alle variazioni di corrente" }
      ] }] }
    })
  ]
};

export { SCHOOL_AREAS_A };
