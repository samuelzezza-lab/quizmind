// Quizmind — ricomposizione di quiz/engine.js
// Le parti sono in scratch/engine-parts/*.part, in ordine alfabetico.

const fs = require("fs");
const path = require("path");

const DIR = "scratch/engine-parts";
const parti = fs.readdirSync(DIR).filter(f => f.endsWith(".part")).sort();

if (parti.length === 0) {
  console.error("Nessuna parte in " + DIR);
  process.exit(1);
}

let intero = "";
for (const p of parti) {
  intero += fs.readFileSync(path.join(DIR, p), "utf8");
}

const attesi = ["function generateSession", "function gradeSession", "function examCoverage", "export {"];
const mancanti = attesi.filter(a => !intero.includes(a));
if (mancanti.length) {
  console.error("Incompleto, mancano: " + mancanti.join(", "));
  process.exit(1);
}
if (intero.length < 60000) {
  console.error("Troppo corto: " + intero.length + " byte");
  process.exit(1);
}

fs.writeFileSync("quiz/engine.js", intero, "utf8");
console.log("quiz/engine.js: " + intero.length + " byte, " + intero.split("\n").length + " righe");
