/* ============================================================
   Quizmind — Logica applicativa
   ------------------------------------------------------------
   Percorso: ateneo -> facoltà -> anno di corso -> esame ->
   sessione da 10 domande -> correzione -> revisione.

   Il motore genera le domande attraverso la factory a tre step
   (quiz/engine.js): sottocategorie obbligatorie, finestra mobile
   anti-ripetizione e distrattori dinamici.
   ============================================================ */

import { UNIVERSITIES, universitiesByArea, findUniversity } from "./data/universities.js";
import { FACULTIES_CATALOG, examSlug, catalogStats } from "./data/faculties.js";
import {
  examCoverage,
  generateSession,
  gradeSession,
  variantEstimate,
  QUESTIONS_PER_SESSION
} from "./quiz/engine.js";

/* ------------------------- STATO -------------------------- */
const state = {
  university: null,
  facultyId: null,
  faculty: null,
  year: null,
  exam: null,
  session: null,
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
/* Il conteggio vive nel browser: vale come misura di cortesia,
   non come limite opponibile. L'interfaccia lo dichiara. */
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
  const left = sessionsLeft();
  node.innerHTML = `Sessioni gratuite oggi: <strong>${left} / ${FREE_SESSIONS_PER_DAY}</strong>`;
}

/* --------------------- SELEZIONE PERCORSO ----------------- */
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

/* Facoltà del catalogo, in ordine alfabetico. */
function facultyItems() {
  return Object.entries(FACULTIES_CATALOG)
    .map(([id, f]) => ({ value: id, label: `${f.name} — ${f.duration} anni`, name: f.name }))
    .sort((a, b) => a.name.localeCompare(b.name, "it"));
}

function initSelectors() {
  const uniSel = $("#sel-university");
  const facSel = $("#sel-faculty");
  const yearSel = $("#sel-year");
  const examSel = $("#sel-exam");

  const byArea = universitiesByArea();
  fillGroupedSelect(
    uniSel,
    Object.keys(byArea).map(area => ({
      label: area,
      items: byArea[area].map(u => ({ value: u.id, label: u.name }))
    })),
    "Seleziona l'ateneo"
  );

  fillSelect(facSel, [], "Seleziona prima l'ateneo");
  fillSelect(yearSel, [], "Seleziona prima la facoltà");
  fillSelect(examSel, [], "Seleziona prima l'anno");

  uniSel.addEventListener("change", () => {
    state.university = findUniversity(uniSel.value);
    fillGroupedSelect(
      facSel,
      state.university ? [{ label: "Facoltà del catalogo", items: facultyItems() }] : [],
      "Seleziona la facoltà"
    );
    fillSelect(yearSel, [], "Seleziona prima la facoltà");
    fillSelect(examSel, [], "Seleziona prima l'anno");
    state.faculty = state.facultyId = state.year = state.exam = null;
    renderExamSummary();
  });

  facSel.addEventListener("change", () => {
    const f = FACULTIES_CATALOG[facSel.value] || null;
    state.faculty = f;
    state.facultyId = facSel.value || null;
    const years = f ? Object.keys(f.years).map(Number).sort((a, b) => a - b) : [];
    fillSelect(
      yearSel,
      years.map(y => ({ value: String(y), label: `${y}° anno` })),
      "Seleziona l'anno di corso"
    );
    fillSelect(examSel, [], "Seleziona prima l'anno");
    state.year = state.exam = null;
    renderExamSummary();
  });

  yearSel.addEventListener("change", () => {
    const list = state.faculty ? state.faculty.years[yearSel.value] : null;
    state.year = yearSel.value || null;
    fillSelect(
      examSel,
      list ? list.map(name => ({ value: name, label: name })) : [],
      "Seleziona l'esame"
    );
    state.exam = null;
    renderExamSummary();
  });

  examSel.addEventListener("change", () => {
    state.exam = examSel.value || null;
    renderExamSummary();
  });
}

/* ---------------------- RIEPILOGO ESAME ------------------- */
function renderExamSummary() {
  const box = $("#exam-summary");
  if (!box) return;
  box.innerHTML = "";

  const startBtn = $("#btn-start");

  if (!state.exam) {
    box.className = "empty";
    box.appendChild(el("p", "empty__title", "Nessun esame selezionato"));
    box.appendChild(el("p", null, "Completa i quattro menu qui sopra per vedere la copertura del motore."));
    if (startBtn) startBtn.disabled = true;
    return;
  }

  const slug = examSlug(state.exam);
  const cov = examCoverage(slug);
  const variants = variantEstimate(slug);
  box.className = "";

  const wrapEl = el("div", "exam-summary");
  const left = el("div");

  left.appendChild(el("div", "exam-summary__path",
    `${state.university.name} · ${state.faculty.name} · ${state.year}° anno`));
  left.appendChild(el("div", "exam-summary__name", state.exam));

  const meta = el("div", "exam-summary__meta");
  meta.appendChild(el("span", "badge badge--info", `${state.faculty.duration} anni di corso`));
  meta.appendChild(el("span",
    cov.available ? "badge badge--verified" : "badge badge--pending",
    cov.available ? "Motore pronto" : "Motore in preparazione"));
  left.appendChild(meta);

  const right = el("div");
  const covWrap = el("div", "coverage");
  for (const [value, label] of [
    [String(cov.templates), "Aree del programma"],
    [String(QUESTIONS_PER_SESSION), "Domande a sessione"],
    [variants ? variants.toLocaleString("it-IT") : "—", "Varianti stimate"]
  ]) {
    const item = el("div", "coverage__item");
    item.appendChild(el("div", "coverage__value num", value));
    item.appendChild(el("div", "coverage__label", label));
    covWrap.appendChild(item);
  }
  right.appendChild(covWrap);

  if (cov.available) {
    const tags = el("div", "exam-summary__meta");
    tags.style.marginTop = "0.6rem";
    for (const a of cov.areas) tags.appendChild(el("span", "badge badge--info", a.name));
    right.appendChild(tags);
  } else {
    const n = el("div", "notice notice--warning");
    n.textContent =
      `Questo esame dispone di ${cov.templates} aree su ${cov.minRequired} necessarie. ` +
      `Il motore non genera la sessione invece di riproporre le stesse domande: ` +
      `le aree vanno aggiunte in quiz/engine.js.`;
    right.appendChild(n);
  }

  wrapEl.appendChild(left);
  wrapEl.appendChild(right);
  box.appendChild(wrapEl);

  if (startBtn) startBtn.disabled = !cov.available;
}

/* --------------------------- QUIZ ------------------------- */
function startSession() {
  if (!state.exam) return;

  const usage = readUsage();
  if (usage.count >= FREE_SESSIONS_PER_DAY) {
    renderLimitScreen(usage);
    return;
  }

  const slug = examSlug(state.exam);
  const seed = (Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0;
  const session = generateSession(slug, seed);

  if (!session.ok) {
    renderUnsupportedScreen(session);
    return;
  }

  state.session = session;
  state.answers = new Array(session.total).fill(null);
  state.current = 0;
  state.graded = false;

  usage.count += 1;
  writeUsage({ date: todayKey(), count: usage.count });
  renderSessionCounter();

  renderQuestion();
}

function renderLimitScreen(usage) {
  const view = $("#view");
  view.innerHTML = "";
  const panel = el("section", "panel");
  panel.appendChild(el("div", "panel__title", "Limite giornaliero raggiunto"));
  panel.appendChild(el("div", "panel__desc",
    `Hai utilizzato ${usage.count} sessioni oggi. Il limite di ${FREE_SESSIONS_PER_DAY} ` +
    `sessioni gratuite si azzera a mezzanotte, ora locale.`));

  const n = el("div", "notice notice--warning");
  n.textContent =
    "Il conteggio è memorizzato nel browser e non è quindi verificabile lato server: " +
    "vale come misura di cortesia, non come limite opponibile. Un limite effettivo " +
    "richiede autenticazione e un database con conteggio giornaliero.";
  panel.appendChild(n);

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
  panel.appendChild(el("div", "panel__title", "Esame non ancora coperto dal motore"));
  panel.appendChild(el("div", "panel__desc",
    `L'esame «${state.exam}» non dispone di aree sufficienti per generare una sessione completa.`));

  const n = el("div", "notice notice--warning");
  n.textContent =
    `Aree presenti: ${info.coverage ?? 0}. Minimo richiesto: ${info.minRequired ?? 4}. ` +
    `Il motore non genera domande inventate per riempire la sessione.`;
  panel.appendChild(n);

  const row = el("div", "btn-row");
  const home = el("button", "btn btn--ghost", "Torna alla selezione");
  home.type = "button";
  home.addEventListener("click", renderHome);
  row.appendChild(home);
  panel.appendChild(row);

  view.appendChild(panel);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

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
  fill.style.width = `${((state.current + 1) / s.total) * 100}%`;
  bar.appendChild(fill);
  prog.appendChild(bar);
  prog.appendChild(el("span", "quiz-progress__label", `Domanda ${state.current + 1} di ${s.total}`));
  main.appendChild(prog);

  const q = s.questions[state.current];
  const card = el("div", "question-card");

  const meta = el("div", "question-card__meta");
  meta.appendChild(el("span", "badge badge--accent", q.areaName));
  meta.appendChild(el("span", "badge badge--info", q.examName));
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
    li.appendChild(el("span", null, `Categoria ${i + 1}`));
    list.appendChild(li);
  });
  navPanel.appendChild(list);
  side.appendChild(navPanel);

  const infoPanel = el("div", "side-panel");
  infoPanel.appendChild(el("div", "side-panel__title", "Sessione"));
  const kv = el("dl", "kv");
  for (const [k, v] of [
    ["Ateneo", state.university.name],
    ["Facoltà", state.faculty.name],
    ["Anno", `${state.year}° anno`],
    ["Esame", state.exam],
    ["Aree coperte", String(s.areaCount)],
    ["Domande", String(s.total)]
  ]) {
    const r = el("div", "kv__row");
    r.appendChild(el("dt", null, k));
    r.appendChild(el("dd", null, v));
    kv.appendChild(r);
  }
  infoPanel.appendChild(kv);
  side.appendChild(infoPanel);

  if (s.repeatsDiscarded > 0) {
    const rep = el("div", "side-panel");
    rep.appendChild(el("div", "side-panel__title", "Controllo anti-ripetizione"));
    rep.appendChild(el("div", "explanation",
      `${s.repeatsDiscarded} estrazioni scartate perché riproponevano lo stesso schema ` +
      `della domanda precedente o un testo già presente nella sessione.`));
    side.appendChild(rep);
  }

  const honesty = el("div", "side-panel");
  honesty.appendChild(el("div", "side-panel__title", "Nota sui contenuti"));
  honesty.appendChild(el("div", "explanation",
    "Le domande sono generate da una factory parametrica su nozioni stabili della disciplina. " +
    "Non riproducono prove d'esame ufficiali né i programmi dei singoli atenei."));
  side.appendChild(honesty);

  layout.appendChild(side);
  view.appendChild(layout);
}

/* ------------------------- RISULTATI ---------------------- */
function renderResults() {
  const view = $("#view");
  const r = gradeSession(state.session, state.answers);

  view.innerHTML = "";

  const head = el("div", "panel");
  const headInner = el("div", "result-head");

  const ring = el("div", "score-ring");
  const pct = r.percentage;
  ring.style.borderColor = pct >= 70 ? "var(--success)" : pct >= 40 ? "var(--warning)" : "var(--danger)";
  ring.appendChild(el("div", "score-ring__value", `${r.score}/${r.total}`));
  ring.appendChild(el("div", "score-ring__label", `${pct}% corrette`));
  headInner.appendChild(ring);

  const text = el("div", "result-head__text");
  text.appendChild(el("h2", null, resultHeadline(pct)));
  text.appendChild(el("p", null,
    `${state.exam} — ${state.faculty.name}, ${state.year}° anno. ` +
    `Risposte corrette: ${r.score} su ${r.total}.`));

  const areaBox = el("div", "exam-summary__meta");
  areaBox.style.marginTop = "0.85rem";
  for (const t of r.byArea) {
    areaBox.appendChild(el("span",
      t.correct === t.total ? "badge badge--verified" : "badge badge--info",
      `${t.area}: ${t.correct}/${t.total}`));
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
    headRow.appendChild(el("span", "review-item__num", `#${d.index}`));
    headRow.appendChild(el("span", "badge badge--accent", d.area));
    headRow.appendChild(el("span",
      d.correct ? "badge badge--verified" : "badge badge--pending",
      d.correct ? "Corretta" : "Errata"));
    item.appendChild(headRow);

    item.appendChild(el("div", "review-item__prompt", d.prompt));

    const given = el("div", `answer-line ${d.correct ? "answer-line--ok" : "answer-line--ko"}`);
    given.appendChild(el("span", "answer-line__tag", "Tua risposta"));
    given.appendChild(el("span", "answer-line__text", d.givenText ?? "— non risposta —"));
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

  const actions = el("div", "panel");
  const row = el("div", "btn-row");
  row.style.marginTop = "0";
  row.style.paddingTop = "0";
  row.style.borderTop = "none";

  const again = el("button", "btn btn--primary", "Ripeti con nuove varianti");
  again.type = "button";
  again.addEventListener("click", startSession);
  row.appendChild(again);

  const home = el("button", "btn btn--ghost", "Torna alla selezione");
  home.type = "button";
  home.addEventListener("click", renderHome);
  row.appendChild(home);
  row.appendChild(el("div", "spacer"));
  row.appendChild(el("span", "quiz-progress__label", `Sessioni gratuite rimaste oggi: ${sessionsLeft()}`));

  actions.appendChild(row);
  view.appendChild(actions);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resultHeadline(pct) {
  if (pct >= 90) return "Preparazione solida";
  if (pct >= 70) return "Buon livello di preparazione";
  if (pct >= 50) return "Preparazione parziale";
  return "Preparazione da consolidare";
}

/* -------------------------- VISTA HOME -------------------- */
function renderHome() {
  const view = $("#view");
  view.innerHTML = "";

  const panel = el("section", "panel");
  panel.appendChild(el("div", "panel__title", "Seleziona il percorso d'esame"));
  panel.appendChild(el("div", "panel__desc",
    "Scegli ateneo, facoltà, anno di corso ed esame. La sessione generata contiene " +
    `${QUESTIONS_PER_SESSION} domande distribuite sulle aree del programma dell'esame.`));

  const grid = el("div", "selector-grid");
  for (const [id, label] of [
    ["sel-university", "Ateneo"],
    ["sel-faculty", "Facoltà"],
    ["sel-year", "Anno di corso"],
    ["sel-exam", "Esame"]
  ]) {
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
  const start = el("button", "btn btn--primary", `Avvia la sessione da ${QUESTIONS_PER_SESSION} domande`);
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
    renderExamSummary();
  });
  row.appendChild(reset);

  panel.appendChild(row);
  view.appendChild(panel);

  const summaryPanel = el("section", "panel");
  summaryPanel.appendChild(el("div", "panel__title", "Copertura del motore"));
  summaryPanel.appendChild(el("div", "panel__desc",
    "Aree del programma coperte, numero di domande e varianti stimabili per l'esame selezionato."));
  const summary = el("div", "empty");
  summary.id = "exam-summary";
  summary.appendChild(el("p", "empty__title", "Nessun esame selezionato"));
  summary.appendChild(el("p", null, "Completa i quattro menu qui sopra per vedere la copertura del motore."));
  summaryPanel.appendChild(summary);
  view.appendChild(summaryPanel);

  initSelectors();
  renderExamSummary();
}

/* --------------------- VISTA CATALOGO --------------------- */
function renderCatalog() {
  const view = $("#view");
  view.innerHTML = "";

  const stats = catalogStats();

  const panel = el("section", "panel");
  panel.appendChild(el("div", "panel__title", "Atenei"));
  panel.appendChild(el("div", "panel__desc",
    `${UNIVERSITIES.length} atenei italiani raggruppati per area geografica. ` +
    "Le facoltà e gli esami sono comuni a tutti gli atenei: la piattaforma non attribuisce " +
    "a un singolo ateneo un piano di studi specifico."));

  const byArea = universitiesByArea();
  const list = el("div", "review");
  for (const area of Object.keys(byArea)) {
    const item = el("div", "review-item");
    item.appendChild(el("div", "review-item__prompt", `${area} — ${byArea[area].length} atenei`));
    const ul = el("ul", "dot-list");
    ul.style.columns = "2";
    ul.style.columnGap = "2.5rem";
    for (const u of byArea[area]) {
      const li = el("li");
      li.appendChild(el("span", "dot"));
      li.appendChild(el("span", null, u.name));
      ul.appendChild(li);
    }
    item.appendChild(ul);
    list.appendChild(item);
  }
  panel.appendChild(list);
  view.appendChild(panel);

  const dPanel = el("section", "panel");
  dPanel.appendChild(el("div", "panel__title", "Facoltà ed esami"));
  dPanel.appendChild(el("div", "panel__desc",
    `${stats.faculties} facoltà su ${stats.years} anni di corso e ${stats.exams} esami complessivi, ` +
    `pari a ${stats.uniqueExams} esami distinti. La colonna «Copertura» indica quanti esami ` +
    "hanno già le aree necessarie per generare una sessione completa."));

  const table = el("div", "table-wrap");
  const t = el("table");
  const thead = el("thead");
  const hr = el("tr");
  for (const h of ["Facoltà", "Durata", "Anni", "Esami", "Copertura"]) hr.appendChild(el("th", null, h));
  thead.appendChild(hr);
  t.appendChild(thead);

  const tbody = el("tbody");
  for (const f of Object.values(FACULTIES_CATALOG)) {
    const yearCount = Object.keys(f.years).length;
    let examCount = 0;
    let covered = 0;
    for (const list of Object.values(f.years)) {
      for (const name of list) {
        examCount++;
        if (examCoverage(examSlug(name)).available) covered++;
      }
    }
    const tr = el("tr");
    tr.appendChild(el("td", null, f.name));
    tr.appendChild(el("td", "num", `${f.duration} anni`));
    tr.appendChild(el("td", "num", String(yearCount)));
    tr.appendChild(el("td", "num", String(examCount)));
    const td = el("td");
    td.appendChild(el("span",
      covered === examCount ? "badge badge--verified" : covered === 0 ? "badge badge--pending" : "badge badge--info",
      `${covered}/${examCount}`));
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
  t.appendChild(tbody);
  table.appendChild(t);
  dPanel.appendChild(table);
  view.appendChild(dPanel);
}

/* ---------------------- NAVIGAZIONE ----------------------- */
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

// Avvio dell'applicazione all'interno della pagina
document.addEventListener("DOMContentLoaded", init);
