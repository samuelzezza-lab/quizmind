const fs = require("fs");
const path = require("path");

const dir = "scratch/engine-parts";
const parti = fs.readdirSync(dir).filter(f => f.endsWith(".part")).sort();

if (!parti.length) { console.error("nessuna parte in " + dir); process.exit(1); }

let intero = "";
for (const p of parti) intero += fs.readFileSync(path.join(dir, p), "utf8");

const attesi = ["function generateSession", "function gradeSession", "function examCoverage", "export {"];
const mancanti = attesi.filter(a => !intero.includes(a));
if (mancanti.length) { console.error("incompleto: " + mancanti.join(", ")); process.exit(1); }
if (intero.length < 60000) { console.error("troppo corto: " + intero.length); process.exit(1); }

fs.writeFileSync("quiz/engine.js", intero, "utf8");
console.log("quiz/engine.js scritto: " + intero.length + " byte, " + intero.split("\n").length + " righe");
