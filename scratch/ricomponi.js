/* ============================================================
   Quizmind — ricomposizione di quiz/engine.js
   ------------------------------------------------------------
   Il motore completo e lungo oltre 70 KB, sopra il limite di
   scrittura degli strumenti che lo hanno creato. Le sue parti
   sono in scratch/engine-parts/*.part: questo script le salda
   nell'ordine alfabetico e scrive quiz/engine.js.

   Uso:  node scratch/ricomponi.js
   ============================================================ */

const fs = require("fs");
const path = require("path");

const DIR = "scratch/engine-parts";

const parti = fs
  .readdirSync(DIR)
  .filter((f) => f.endsWith(".part"))
  .sort();

if (parti.length === 0) {
  console.error("Nessuna parte trovata in " + DIR);
  process.exit(1);
}

let intero = "";
for (const p of parti) {
  intero += fs.readFileSync(path.join(DIR, p), "utf8");
  console.log("aggiunta " + p);
}

/* Controlli di integrità: il file deve essere un modulo completo. */
const attesi = [
  "function generateSession",
  "function gradeSession",
  "function examCoverage"
];
const mancanti = attesi.filter((a) => !intero.includes(a));
if (mancanti.length) {
  console.error("File incompleto, mancano: " + mancanti.join(", "));
  process.exit(1);
}
if (!intero.includes("export {")) {
  console.error("Manca il blocco export finale");
  process.exit(1);
}

const righe = intero.split("\n").length;
fs.writeFileSync("quiz/engine.js", intero, "utf8");
console.log("Scritto quiz/engine.js: " + intero.length + " byte, " + righe + " righe");
