/* ============================================================
   Quizmind — Logica applicativa
   ------------------------------------------------------------
   Flusso lineare a tre passaggi:

     1. Corso      — corso di laurea o indirizzo scolastico
     2. Anno       — anno di corso o classe
     3. Materia    — le materie di quell'anno per quel percorso

   Scelta la materia, il motore parametrico genera la sessione:
   le domande nascono dai template attivati sulla materia, con
   valori e distrattori diversi a ogni avvio.

   I piani di studio provengono da data/faculties.js per
   l'università e da data/schools.js per la scuola superiore.
   ============================================================ */

import { FACULTIES_CATALOG, examSlug, catalogStats } from "./data/faculties.js";
import { SCHOOL_TRACKS, subjectSlug, schoolStats } from "./data/schools.js";
import {
  examCoverage,
  generateSession,
  gradeSession,
  variantEstimate,
  QUESTIONS_PER_SESSION as UNI_QUESTIONS
} from "./quiz/engine.js";
import {
  subjectCoverage,
  generateSchoolSession,
  gradeSchoolSession,
  schoolVariantEstimate,
  QUESTIONS_PER_SESSION as SCHOOL_QUESTIONS
} from "./quiz/school-engine.js";
import { esameCanonico } from "./quiz/consolidamento.js";

/* ------------------------- STATO -------------------------- */
const state = {
  mode: "universita",
  corso: null,
  corsoNome: null,
  anno: null,
  materia: null,
  session: null,
  sessionMode: null,
  answers: [],
  current: 0,
  graded: false
};

const FREE_SESSIONS_PER_DAY = 7;
const STORAGE_KEY = "quizmind.sessions.v1";

/* ------------------------ UTILITY ------------------------- */
const $ = (sel) => document.querySelector(sel);

function el(tag, className, text) {
  const n = document.createElement(tag);
  if (className) n.className = className;
  if (text != null) n.textContent = text;
  return n;
}

const LETTERS = ["A", "B", "C", "D"];

/* --------------------- CONTATORE SESSIONI ----------------- */
function todayKey() {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function readUsage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { date: todayKey(), count: 0 };
    const parsed = JSON.parse(raw);
    if (parsed.date !== todayKey()) return { date: todayKey(), count: 0 };
    return { date: parsed.date, count: Number(parsed.count) || 0 };
  } catch {
    return { date: todayKey(), count: 0 };
  }
}

function writeUsage(usage) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(usage)); } catch { /* storage non disponibile */ }
}

function sessionsLeft() {
  return Math.max(0, FREE_SESSIONS_PER_DAY - readUsage().count);
}

function renderSessionCounter() {
  const node = $("#session-counter");
  if (!node) return;
  node.innerHTML = `Sessioni gratuite oggi: <strong>${sessionsLeft()} / ${FREE_SESSIONS_PER_DAY}</strong>`;
}

/* --------------------- UTILITÀ SELECT --------------------- */
function fillSelect(select, items, placeholder) {
  select.innerHTML = "";
  const ph = el("option", null, placeholder);
  ph.value = "";
  select.appendChild(ph);
  for (const it of items) {
    const o = el("option", null, it.label);
    o.value = it.value;
    select.appendChild(o);
  }
  select.disabled = items.length === 0;
}

function fillGroupedSelect(select, groups, placeholder) {
  select.innerHTML = "";
  const ph = el("option", null, placeholder);
  ph.value = "";
  select.appendChild(ph);
  for (const g of groups) {
    const group = document.createElement("optgroup");
    group.label = g.label;
    for (const it of g.items) {
      const o = el("option", null, it.label);
      o.value = it.value;
      group.appendChild(o);
    }
    select.appendChild(group);
  }
  select.disabled = groups.length === 0;
}

/* Corsi universitari raggruppati per ciclo. */
function corsiUniversitari() {
  const gruppi = {};
  for (const [id, f] of Object.entries(FACULTIES_CATALOG)) {
    const ciclo = f.duration >= 5
      ? "Corsi di laurea magistrale a ciclo unico"
      : "Corsi di laurea triennale";
    if (!gruppi[ciclo]) gruppi[ciclo] = [];
    gruppi[ciclo].push({ value: id, label: f.name, name: f.name });
  }
  return Object.keys(gruppi).map(label => ({
    label: label,
    items: gruppi[label].sort((a, b) => a.name.localeCompare(b.name, "it"))
  }));
}

/* Indirizzi scolastici raggruppati per tipo di istituto. */
function indirizziScolastici() {
  const gruppi = {};
  for (const t of SCHOOL_TRACKS) {
    if (!gruppi[t.kind]) gruppi[t.kind] = [];
    gruppi[t.kind].push({ value: t.id, label: t.name, name: t.name });
  }
  return Object.keys(gruppi).map(label => ({
    label: label,
    items: gruppi[label].sort((a, b) => a.name.localeCompare(b.name, "it"))
  }));
}

/* ============================================================
   SELEZIONE — tre passaggi
   ============================================================ */
function initSelectors() {
  const corsoSel = $("#sel-corso");
  const annoSel = $("#sel-anno");
  const materiaSel = $("#sel-materia");

  fillGroupedSelect(
    corsoSel,
    state.mode === "universita" ? corsiUniversitari() : indirizziScolastici(),
    state.mode === "universita" ? "Seleziona il corso di laurea" : "Seleziona l'indirizzo"
  );

  fillSelect(annoSel, [], "Seleziona prima il corso");
  fillSelect(materiaSel, [], "Seleziona prima l'anno");

  /* --- 1. Corso --- */
  corsoSel.addEventListener("change", () => {
    const id = corsoSel.value || null;
    state.corso = id;
    state.anno = null;
    state.materia = null;

    if (state.mode === "universita") {
      const f = id ? FACULTIES_CATALOG[id] : null;
      state.corsoNome = f ? f.name : null;
      const anni = f ? Object.keys(f.years).map(Number).sort((a, b) => a - b) : [];
      fillSelect(annoSel, anni.map(y => ({ value: String(y), label: `${y}° anno` })), "Seleziona l'anno di corso");
    } else {
      const t = id ? SCHOOL_TRACKS.find(x => x.id === id) : null;
      state.corsoNome = t ? t.name : null;
      const anni = t ? Object.keys(t.subjects).map(Number).sort((a, b) => a - b) : [];
      fillSelect(annoSel, anni.map(y => ({ value: String(y), label: `${y}ª superiore` })), "Seleziona la classe");
    }

    fillSelect(materiaSel, [], "Seleziona prima l'anno");
    renderSummary();
  });

  /* --- 2. Anno --- */
  annoSel.addEventListener("change", () => {
    const anno = annoSel.value || null;
    state.anno = anno;
    state.materia = null;

    if (!anno) {
      fillSelect(materiaSel, [], "Seleziona prima l'anno");
      renderSummary();
      return;
    }

    if (state.mode === "universita") {
      const f = FACULTIES_CATALOG[state.corso];
      const esami = f && f.years[anno] ? f.years[anno] : [];
      const items = esami.map(nome => {
        const cov = examCoverage(esameCanonico(examSlug(nome)));
        return {
          value: nome,
          label: cov.available ? nome : nome + " — in preparazione"
        };
      });
      fillSelect(materiaSel, items, "Seleziona la materia");
    } else {
      const t = SCHOOL_TRACKS.find(x => x.id === state.corso);
      const nomi = t && t.subjects[anno] ? t.subjects[anno] : [];
      const items = nomi.map(nome => {
        const slug = subjectSlug(nome);
        const cov = subjectCoverage(slug, Number(anno));
        return {
          value: nome,
          label: cov.available ? nome : nome + " — in preparazione"
        };
      });
      fillSelect(materiaSel, items, "Seleziona la materia");
    }

    renderSummary();
  });

  /* --- 3. Materia --- */
  materiaSel.addEventListener("change", () => {
    state.materia = materiaSel.value || null;
    renderSummary();
  });
}

/* Copertura della materia scelta, nei due percorsi. */
function currentCoverage() {
  if (!state.materia) return null;
  if (state.mode === "universita") {
    const slug = esameCanonico(examSlug(state.materia));
    return { kind: "uni", slug: slug, cov: examCoverage(slug) };
  }
  const slug = subjectSlug(state.materia);
  return { kind: "scuola", slug: slug, cov: subjectCoverage(slug, Number(state.anno)) };
}

/* ============================================================
   RIEPILOGO
   ============================================================ */
function emptySummary(box, title, text) {
  box.className = "empty";
  box.appendChild(el("p", "empty__title", title));
  box.appendChild(el("p", null, text));
}

function noticeWarn(text) {
  const n = el("div", "notice notice--warning");
  n.textContent = text;
  return n;
}

function coverageBlock(pairs) {
  const wrap = el("div", "coverage");
  for (const coppia of pairs) {
    const value = coppia[0], label = coppia[1];
    const item = el("div", "coverage__item");
    item.appendChild(el("div", "coverage__value num", value));
    item.appendChild(el("div", "coverage__label", label));
    wrap.appendChild(item);
  }
  return wrap;
}

function renderSummary() {
  const box = $("#exam-summary");
  if (!box) return;
  box.innerHTML = "";
  const startBtn = $("#btn-start");

  const cur = currentCoverage();

  if (!cur) {
    emptySummary(box, "Nessuna materia selezionata",
      "Completa i tre menu qui sopra per vedere la copertura del motore.");
    if (startBtn) startBtn.disabled = true;
    return;
  }

  const eUniversita = cur.kind === "uni";
  const cov = cur.cov;
  const aree = eUniversita ? cov.areas : cov.list;
  const varianti = eUniversita
    ? variantEstimate(cur.slug)
    : schoolVariantEstimate(cur.slug, Number(state.anno));
  const domande = eUniversita ? UNI_QUESTIONS : SCHOOL_QUESTIONS;
  const numAree = eUniversita ? cov.templates : cov.areas;

  box.className = "";

  const wrapEl = el("div", "exam-summary");
  const left = el("div");

  left.appendChild(el("div", "exam-summary__path",
    state.corsoNome + " · " + (eUniversita ? state.anno + "° anno" : state.anno + "ª superiore")));
  left.appendChild(el("div", "exam-summary__name", state.materia));

  const meta = el("div", "exam-summary__meta");
  meta.appendChild(el("span", "badge badge--info",
    eUniversita ? "Università" : "Scuola Superiore"));
  meta.appendChild(el("span",
    cov.available ? "badge badge--verified" : "badge badge--pending",
    cov.available ? "Motore pronto" : "Motore in preparazione"));
  left.appendChild(meta);

  const right = el("div");
  right.appendChild(coverageBlock([
    [String(numAree), "Aree della materia"],
    [String(domande), "Domande a sessione"],
    [varianti ? varianti.toLocaleString("it-IT") : "—", "Varianti stimate"]
  ]));

  if (cov.available) {
    const tags = el("div", "exam-summary__meta");
    tags.style.marginTop = "0.6rem";
    for (const a of aree) tags.appendChild(el("span", "badge badge--info", a.name));
    right.appendChild(tags);
  } else {
    right.appendChild(noticeWarn(
      "Questa materia dispone di " + numAree + " aree su " + cov.minRequired + " necessarie. " +
      "Il motore non genera la sessione invece di riproporre le stesse domande: " +
      "le aree vanno aggiunte ai moduli in quiz/."));
  }

  wrapEl.appendChild(left);
  wrapEl.appendChild(right);
  box.appendChild(wrapEl);
  if (startBtn) startBtn.disabled = !cov.available;
}

/* ============================================================
   AVVIO SESSIONE
   ============================================================ */
function startSession() {
  if (!state.materia) return;

  const usage = readUsage();
  if (usage.count >= FREE_SESSIONS_PER_DAY) {
    renderLimitScreen(usage);
    return;
  }

  const eUniversita = state.mode === "universita";
  const seed = (Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0;

  const session = eUniversita
    ? generateSession(esameCanonico(examSlug(state.materia)), seed)
    : generateSchoolSession(subjectSlug(state.materia), Number(state.anno), seed);

  if (!session.ok) {
    renderUnsupportedScreen(session);
    return;
  }

  state.session = session;
  state.sessionMode = eUniversita ? "universita" : "scuola";
  state.answers = new Array(session.total).fill(null);
  state.current = 0;
  state.graded = false;

  writeUsage({ date: todayKey(), count: usage.count + 1 });
  renderSessionCounter();
  renderQuestion();
}

function renderLimitScreen(usage) {
  const view = $("#view");
  view.innerHTML = "";
  const panel = el("section", "panel");
  panel.appendChild(el("div", "panel__title", "Limite giornaliero raggiunto"));
  panel.appendChild(el("div", "panel__desc",
    "Hai utilizzato " + usage.count + " sessioni oggi. Il limite di " + FREE_SESSIONS_PER_DAY +
    " sessioni gratuite si azzera a mezzanotte, ora locale."));

  panel.appendChild(noticeWarn(
    "Il conteggio è memorizzato nel browser: vale come misura di cortesia, non come limite " +
    "opponibile. Un limite effettivo richiede autenticazione e un database con conteggio " +
    "giornaliero lato server."));

  const row = el("div", "btn-row");
  const home = el("button", "btn btn--ghost", "Torna alla selezione");
  home.type = "button";
  home.addEventListener("click", renderHome);
  row.appendChild(home);
  panel.appendChild(row);
  view.appendChild(panel);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderUnsupportedScreen(info) {
  const view = $("#view");
  view.innerHTML = "";
  const panel = el("section", "panel");
  panel.appendChild(el("div", "panel__title", "Contenuto non ancora coperto dal motore"));
  panel.appendChild(el("div", "panel__desc",
    "La materia «" + state.materia + "» non dispone di aree sufficienti per generare una sessione completa."));

  panel.appendChild(noticeWarn(
    "Aree presenti: " + (info.coverage || 0) + ". Minimo richiesto: " + (info.minRequired || 4) + ". " +
    "Il motore non genera domande inventate per riempire la sessione."));

  const row = el("div", "btn-row");
  const home = el("button", "btn btn--ghost", "Torna alla selezione");
  home.type = "button";
  home.addEventListener("click", renderHome);
  row.appendChild(home);
  panel.appendChild(row);
  view.appendChild(panel);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ============================================================
   QUIZ
   ============================================================ */
function renderQuestion() {
  const view = $("#view");
  const s = state.session;
  if (!s) return;

  view.innerHTML = "";
  const layout = el("div", "quiz-layout");
  const main = el("div");
  const side = el("aside", "side-stack");

  const prog = el("div", "quiz-progress");
  const bar = el("div", "progress-bar");
  const fill = el("div", "progress-bar__fill");
  fill.style.width = (((state.current + 1) / s.total) * 100) + "%";
  bar.appendChild(fill);
  prog.appendChild(bar);
  prog.appendChild(el("span", "quiz-progress__label", "Domanda " + (state.current + 1) + " di " + s.total));
  main.appendChild(prog);

  const q = s.questions[state.current];
  const card = el("div", "question-card");

  const meta = el("div", "question-card__meta");
  meta.appendChild(el("span", "badge badge--accent", q.areaName));
  meta.appendChild(el("span", "badge badge--info",
    state.sessionMode === "universita"
      ? q.examName
      : q.subjectName + " · " + q.year + "ª superiore"));
  card.appendChild(meta);

  card.appendChild(el("div", "question-card__prompt", q.prompt));

  const opts = el("div", "options");
  const answered = state.answers[state.current];
  q.options.forEach((text, i) => {
    const btn = el("button", "option");
    btn.type = "button";
    btn.appendChild(el("span", "option__key", LETTERS[i]));
    btn.appendChild(el("span", "option__text", text));
    if (state.graded) {
      btn.disabled = true;
      if (i === q.correctIndex) btn.dataset.state = "correct";
      else if (i === answered) btn.dataset.state = "wrong";
    } else if (i === answered) {
      btn.dataset.state = "selected";
    }
    btn.addEventListener("click", () => {
      if (state.graded) return;
      state.answers[state.current] = i;
      renderQuestion();
    });
    opts.appendChild(btn);
  });
  card.appendChild(opts);
  main.appendChild(card);

  const row = el("div", "btn-row");
  const back = el("button", "btn btn--ghost", "← Indietro");
  back.type = "button";
  back.disabled = state.current === 0;
  back.addEventListener("click", () => { state.current--; renderQuestion(); });
  row.appendChild(back);

  const next = el("button", "btn btn--primary",
    state.current === s.total - 1 ? "Concludi e correggi" : "Avanti →");
  next.type = "button";
  const unanswered = state.answers[state.current] == null;
  next.disabled = unanswered;
  if (unanswered) next.title = "Seleziona una risposta per proseguire";
  next.addEventListener("click", () => {
    if (state.current === s.total - 1) {
      state.graded = true;
      renderResults();
    } else {
      state.current++;
      renderQuestion();
    }
  });
  row.appendChild(next);
  row.appendChild(el("div", "spacer"));

  const abort = el("button", "btn btn--ghost", "Annulla sessione");
  abort.type = "button";
  abort.addEventListener("click", () => {
    if (confirm("Annullare la sessione? Le risposte non verranno salvate.")) {
      state.session = null;
      renderHome();
    }
  });
  row.appendChild(abort);
  main.appendChild(row);
  layout.appendChild(main);

  const navPanel = el("div", "side-panel");
  navPanel.appendChild(el("div", "side-panel__title", "Avanzamento"));
  const list = el("ul", "dot-list");
  s.questions.forEach((_, i) => {
    const li = el("li");
    const dot = el("span", "dot");
    if (i === state.current) dot.dataset.state = "current";
    else if (state.answers[i] != null) dot.dataset.state = "answered";
    li.appendChild(dot);
    li.appendChild(el("span", null, "Domanda " + (i + 1)));
    list.appendChild(li);
  });
  navPanel.appendChild(list);
  side.appendChild(navPanel);

  const infoPanel = el("div", "side-panel");
  infoPanel.appendChild(el("div", "side-panel__title", "Sessione"));
  const kv = el("dl", "kv");
  const righe = [
    ["Percorso", state.sessionMode === "universita" ? "Università" : "Scuola Superiore"],
    ["Corso", state.corsoNome],
    ["Anno", state.sessionMode === "universita" ? s.year + "° anno" : s.year + "ª superiore"],
    ["Materia", state.sessionMode === "universita" ? s.examName : s.subjectName],
    ["Aree coperte", String(s.areaCount)],
    ["Domande", String(s.total)]
  ];
  for (const coppia of righe) {
    const r = el("div", "kv__row");
    r.appendChild(el("dt", null, coppia[0]));
    r.appendChild(el("dd", null, coppia[1]));
    kv.appendChild(r);
  }
  infoPanel.appendChild(kv);
  side.appendChild(infoPanel);

  if (s.repeatsDiscarded > 0) {
    const rep = el("div", "side-panel");
    rep.appendChild(el("div", "side-panel__title", "Controllo anti-ripetizione"));
    rep.appendChild(el("div", "explanation",
      s.repeatsDiscarded + " estrazioni scartate perché riproponevano lo stesso schema " +
      "della domanda precedente o un testo già presente nella sessione."));
    side.appendChild(rep);
  }

  const honesty = el("div", "side-panel");
  honesty.appendChild(el("div", "side-panel__title", "Nota sui contenuti"));
  honesty.appendChild(el("div", "explanation",
    "Le domande sono generate da template parametrici attivati sulla materia. " +
    "Non riproducono prove d'esame ufficiali né i programmi dei singoli atenei o istituti."));
  side.appendChild(honesty);

  layout.appendChild(side);
  view.appendChild(layout);
}

/* ============================================================
   RISULTATI
   ============================================================ */
function resultHeadline(pct) {
  if (pct >= 90) return "Preparazione solida";
  if (pct >= 70) return "Buon livello di preparazione";
  if (pct >= 50) return "Preparazione parziale";
  return "Preparazione da consolidare";
}

/* Modalità avanzate. Non sono attive e i pulsanti non effettuano
   alcun addebito: lo dichiarano in interfaccia. */
function premiumPanel() {
  const panel = el("section", "panel");

  const title = el("div", "panel__title", "Modalità avanzate");
  title.appendChild(el("span", "badge badge--pending", "non attive"));
  panel.appendChild(title);

  panel.appendChild(el("div", "panel__desc",
    "Queste modalità richiedono un backend e un pagamento verificato lato server. " +
    "I pulsanti non effettuano alcun addebito e non attivano nulla."));

  const grid = el("div", "selector-grid");

  const f1 = el("div", "field");
  f1.appendChild(el("div", "exam-summary__name", "Esame a risposta aperta — 1 €"));
  f1.appendChild(el("div", "explanation",
    "15 domande a risposta scritta, con correzione e voto in trentesimi. " +
    "La valutazione di un testo libero richiede un modello linguistico lato server: " +
    "senza backend non può essere reale."));
  const b1 = el("button", "btn btn--ghost", "Richiede backend e pagamenti");
  b1.type = "button";
  b1.disabled = true;
  f1.appendChild(b1);
  grid.appendChild(f1);

  const f2 = el("div", "field");
  f2.appendChild(el("div", "exam-summary__name", "Mappe e riassunti — 1 €"));
  f2.appendChild(el("div", "explanation",
    "Mappe concettuali e sintesi calibrate sull'anno di corso. La struttura delle mappe " +
    "può essere costruita dalle aree già note al motore; i riassunti discorsivi " +
    "richiedono invece un modello linguistico."));
  const b2 = el("button", "btn btn--ghost", "Richiede backend e pagamenti");
  b2.type = "button";
  b2.disabled = true;
  f2.appendChild(b2);
  grid.appendChild(f2);

  panel.appendChild(grid);
  return panel;
}

function renderResults() {
  const view = $("#view");
  const r = (state.sessionMode === "universita"
    ? gradeSession(state.session, state.answers)
    : gradeSchoolSession(state.session, state.answers));

  view.innerHTML = "";

  const head = el("div", "panel");
  const headInner = el("div", "result-head");

  const ring = el("div", "score-ring");
  const pct = r.percentage;
  ring.style.borderColor = pct >= 70 ? "var(--success)" : pct >= 40 ? "var(--warning)" : "var(--danger)";
  ring.appendChild(el("div", "score-ring__value", r.score + "/" + r.total));
  ring.appendChild(el("div", "score-ring__label", pct + "% corrette"));
  headInner.appendChild(ring);

  const text = el("div", "result-head__text");
  text.appendChild(el("h2", null, resultHeadline(pct)));
  const etichetta = state.sessionMode === "universita"
    ? state.session.examName + " — " + state.corsoNome + ", " + state.session.year + "° anno"
    : state.session.subjectName + " — " + state.corsoNome + ", " + state.session.year + "ª superiore";
  text.appendChild(el("p", null,
    etichetta + ". Risposte corrette: " + r.score + " su " + r.total + "."));

  const areaBox = el("div", "exam-summary__meta");
  areaBox.style.marginTop = "0.85rem";
  for (const t of r.byArea) {
    areaBox.appendChild(el("span",
      t.correct === t.total ? "badge badge--verified" : "badge badge--info",
      t.area + ": " + t.correct + "/" + t.total));
  }
  text.appendChild(areaBox);
  headInner.appendChild(text);
  head.appendChild(headInner);
  view.appendChild(head);

  const review = el("div", "panel");
  review.appendChild(el("div", "panel__title", "Revisione delle risposte"));
  review.appendChild(el("div", "panel__desc",
    "Ogni voce riporta la risposta data, quella corretta, la spiegazione e l'errore tipico evidenziato dai distrattori."));

  const list = el("div", "review");
  for (const d of r.detail) {
    const item = el("div", "review-item");

    const headRow = el("div", "review-item__head");
    headRow.appendChild(el("span", "review-item__num", "#" + d.index));
    headRow.appendChild(el("span", "badge badge--accent", d.area));
    headRow.appendChild(el("span",
      d.correct ? "badge badge--verified" : "badge badge--pending",
      d.correct ? "Corretta" : "Errata"));
    item.appendChild(headRow);

    item.appendChild(el("div", "review-item__prompt", d.prompt));

    const given = el("div", "answer-line " + (d.correct ? "answer-line--ok" : "answer-line--ko"));
    given.appendChild(el("span", "answer-line__tag", "Tua risposta"));
    given.appendChild(el("span", "answer-line__text", d.givenText || "— non risposta —"));
    item.appendChild(given);

    if (!d.correct) {
      const right = el("div", "answer-line answer-line--ok");
      right.appendChild(el("span", "answer-line__tag", "Corretta"));
      right.appendChild(el("span", "answer-line__text", d.correctText));
      item.appendChild(right);
    }

    if (d.explanation) {
      const expl = el("div", "explanation");
      expl.appendChild(el("strong", null, "Spiegazione: "));
      expl.appendChild(document.createTextNode(d.explanation));
      item.appendChild(expl);
    }

    if (d.errorNote) {
      const err = el("div", "explanation");
      err.appendChild(el("strong", null, "Errore tipico evidenziato: "));
      err.appendChild(document.createTextNode(d.errorNote));
      item.appendChild(err);
    }

    list.appendChild(item);
  }
  review.appendChild(list);
  view.appendChild(review);

  view.appendChild(premiumPanel());

  const actions = el("div", "panel");
  const row = el("div", "btn-row");
  row.style.marginTop = "0";
  row.style.paddingTop = "0";
  row.style.borderTop = "none";

  const again = el("button", "btn btn--primary", "Nuova sessione, nuove varianti");
  again.type = "button";
  again.addEventListener("click", startSession);
  row.appendChild(again);

  const home = el("button", "btn btn--ghost", "Cambia materia");
  home.type = "button";
  home.addEventListener("click", renderHome);
  row.appendChild(home);
  row.appendChild(el("div", "spacer"));
  row.appendChild(el("span", "quiz-progress__label", "Sessioni gratuite rimaste oggi: " + sessionsLeft()));

  actions.appendChild(row);
  view.appendChild(actions);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ============================================================
   VISTA HOME — tre passaggi
   ============================================================ */
function renderHome() {
  const view = $("#view");
  view.innerHTML = "";

  /* --- percorso --- */
  const modePanel = el("section", "panel");
  modePanel.appendChild(el("div", "panel__title", "Percorso"));

  const modeRow = el("div", "btn-row");
  modeRow.style.marginTop = "0";
  modeRow.style.paddingTop = "0";
  modeRow.style.borderTop = "none";

  for (const coppia of [["universita", "Università"], ["scuola", "Scuola Superiore"]]) {
    const key = coppia[0], label = coppia[1];
    const b = el("button", key === state.mode ? "btn btn--primary" : "btn btn--ghost", label);
    b.type = "button";
    b.addEventListener("click", () => {
      state.mode = key;
      state.corso = state.anno = state.materia = null;
      state.session = null;
      renderHome();
    });
    modeRow.appendChild(b);
  }
  modePanel.appendChild(modeRow);
  view.appendChild(modePanel);

  /* --- tre selettori --- */
  const panel = el("section", "panel");
  panel.appendChild(el("div", "panel__title", "Scegli materia e avvia la sessione"));

  const domande = state.mode === "universita" ? UNI_QUESTIONS : SCHOOL_QUESTIONS;
  panel.appendChild(el("div", "panel__desc",
    state.mode === "universita"
      ? "Seleziona il corso di laurea, l'anno e la materia. La sessione contiene " + domande +
        " domande generate dai template attivati sulla materia scelta."
      : "Seleziona l'indirizzo, la classe e la materia. La sessione contiene " + domande +
        " domande, con difficoltà commisurata all'anno frequentato."));

  const grid = el("div", "selector-grid");
  const campi = [
    ["sel-corso", state.mode === "universita" ? "Corso di laurea" : "Indirizzo"],
    ["sel-anno", state.mode === "universita" ? "Anno di corso" : "Classe"],
    ["sel-materia", "Materia"]
  ];

  for (const coppia of campi) {
    const id = coppia[0], label = coppia[1];
    const f = el("div", "field");
    const lb = el("label", null, label);
    lb.setAttribute("for", id);
    f.appendChild(lb);
    const sel = document.createElement("select");
    sel.id = id;
    f.appendChild(sel);
    grid.appendChild(f);
  }
  panel.appendChild(grid);

  const row = el("div", "btn-row");
  const start = el("button", "btn btn--primary", "Avvia la sessione da " + domande + " domande");
  start.id = "btn-start";
  start.type = "button";
  start.disabled = true;
  start.addEventListener("click", startSession);
  row.appendChild(start);

  const reset = el("button", "btn btn--ghost", "Azzera contatore locale");
  reset.type = "button";
  reset.title = "Riporta a 7 il contatore delle sessioni gratuite di oggi";
  reset.addEventListener("click", () => {
    writeUsage({ date: todayKey(), count: 0 });
    renderSessionCounter();
    renderSummary();
  });
  row.appendChild(reset);

  panel.appendChild(row);
  view.appendChild(panel);

  /* --- copertura --- */
  const summaryPanel = el("section", "panel");
  summaryPanel.appendChild(el("div", "panel__title", "Copertura del motore"));
  summaryPanel.appendChild(el("div", "panel__desc",
    "Aree della materia coperte, numero di domande e varianti stimabili."));
  const summary = el("div", "empty");
  summary.id = "exam-summary";
  summary.appendChild(el("p", "empty__title", "Nessuna materia selezionata"));
  summary.appendChild(el("p", null, "Completa i tre menu qui sopra per vedere la copertura del motore."));
  summaryPanel.appendChild(summary);
  view.appendChild(summaryPanel);

  initSelectors();
  renderSummary();
}

/* ============================================================
   VISTA CATALOGO
   ============================================================ */
function renderCatalog() {
  const view = $("#view");
  view.innerHTML = "";

  const stats = catalogStats();
  const sstats = schoolStats();

  /* --- corsi universitari --- */
  const panel = el("section", "panel");
  panel.appendChild(el("div", "panel__title", "Corsi di laurea"));
  panel.appendChild(el("div", "panel__desc",
    stats.faculties + " corsi su " + stats.years + " anni di studio e " + stats.exams +
    " materie complessive, pari a " + stats.uniqueExams + " materie distinte. La colonna «Copertura» " +
    "indica quante materie hanno già le aree necessarie per generare una sessione completa."));

  const table = el("div", "table-wrap");
  const t = el("table");
  const thead = el("thead");
  const hr = el("tr");
  for (const h of ["Corso di laurea", "Durata", "Anni", "Materie", "Copertura"]) hr.appendChild(el("th", null, h));
  thead.appendChild(hr);
  t.appendChild(thead);

  const tbody = el("tbody");
  for (const f of Object.values(FACULTIES_CATALOG)) {
    const anni = Object.keys(f.years).length;
    let materie = 0, coperte = 0;
    for (const lista of Object.values(f.years)) {
      for (const nome of lista) {
        materie++;
        if (examCoverage(esameCanonico(examSlug(nome))).available) coperte++;
      }
    }
    const tr = el("tr");
    tr.appendChild(el("td", null, f.name));
    tr.appendChild(el("td", "num", f.duration + " anni"));
    tr.appendChild(el("td", "num", String(anni)));
    tr.appendChild(el("td", "num", String(materie)));
    const td = el("td");
    td.appendChild(el("span",
      coperte === materie ? "badge badge--verified" : coperte === 0 ? "badge badge--pending" : "badge badge--info",
      coperte + "/" + materie));
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
  t.appendChild(tbody);
  table.appendChild(t);
  panel.appendChild(table);
  view.appendChild(panel);

  /* --- indirizzi scolastici --- */
  const sPanel = el("section", "panel");
  sPanel.appendChild(el("div", "panel__title", "Indirizzi della scuola superiore"));
  sPanel.appendChild(el("div", "panel__desc",
    sstats.tracks + " indirizzi (" + sstats.licei + " licei e " + sstats.istituti +
    " istituti tecnici o professionali), " + sstats.combinations + " combinazioni materia-classe e " +
    sstats.distinctSubjects + " materie distinte."));

  const sWrap = el("div", "table-wrap");
  const st = el("table");
  const sth = el("thead");
  const shr = el("tr");
  for (const h of ["Indirizzo", "Tipo", "Anni", "Aree coperte per classe"]) shr.appendChild(el("th", null, h));
  sth.appendChild(shr);
  st.appendChild(sth);

  const stb = el("tbody");
  for (const track of SCHOOL_TRACKS) {
    const tr = el("tr");
    tr.appendChild(el("td", null, track.name));
    tr.appendChild(el("td", null, track.kind));
    tr.appendChild(el("td", "num", String(track.years)));

    const covTd = el("td");
    const perAnno = [];
    for (const y of Object.keys(track.subjects).map(Number).sort((a, b) => a - b)) {
      const nomi = track.subjects[y];
      let coperte = 0;
      for (const n of nomi) if (subjectCoverage(subjectSlug(n), y).available) coperte++;
      perAnno.push(y + "ª: " + coperte + "/" + nomi.length);
    }
    covTd.appendChild(el("span", "badge badge--info", perAnno.join("  ·  ")));
    tr.appendChild(covTd);
    stb.appendChild(tr);
  }
  st.appendChild(stb);
  sWrap.appendChild(st);
  sPanel.appendChild(sWrap);
  view.appendChild(sPanel);
}

/* ============================================================
   NAVIGAZIONE
   ============================================================ */
function setRoute(route) {
  for (const a of document.querySelectorAll(".header-nav a[data-route]")) {
    if (a.dataset.route === route) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  }
  if (route === "catalogo") renderCatalog();
  else renderHome();
}

function init() {
  renderSessionCounter();
  for (const a of document.querySelectorAll(".header-nav a[data-route]")) {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      state.session = null;
      setRoute(a.dataset.route);
    });
  }
  const brand = document.querySelector(".brand");
  if (brand) brand.addEventListener("click", (e) => {
    e.preventDefault();
    state.session = null;
    setRoute("home");
  });
  setRoute("home");
}

document.addEventListener("DOMContentLoaded", init);
