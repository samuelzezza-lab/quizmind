/* ============================================================
   Quizmind — Logica applicativa
   Flusso: corso di laurea -> anno -> esame -> sessione da
   10 domande -> correzione -> revisione.
   Nessuna università specifica: solo corsi di laurea.
   ============================================================ */

import { DEGREES, findDegree, examSlug, catalogStats } from "./data/degrees.js";
import {
  examCoverage,
  generateSession,
  gradeSession,
  variantEstimate,
  QUESTIONS_PER_SESSION
} from "./quiz/engine.js";

/* ------------------------- STATO -------------------------- */
const state = {
  degree: null,
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

const LETTERS = ["A", "B", "C", "D", "E"];

/* --------------------- CONTATORE LOCALE ------------------- */
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
    return parsed;
  } catch {
    return { date: todayKey(), count: 0 };
  }
}

function writeUsage(usage) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(usage)); } catch { /* ignorato */ }
}

function renderSessionCounter() {
  const usage = readUsage();
  const left = Math.max(0, FREE_SESSIONS_PER_DAY - usage.count);
  const node = $("#session-counter");
  if (!node) return;
  node.innerHTML = `Sessioni gratuite oggi: <strong>${left} / ${FREE_SESSIONS_PER_DAY}</strong>`;
}

/* --------------------- SELEZIONE PERCORSO ----------------- */
function fillSelect(select, items, placeholder) {
  select.innerHTML = "";
  const opt = el("option", null, placeholder);
  opt.value = "";
  select.appendChild(opt);
  for (const it of items) {
    const o = el("option", null, it.label);
    o.value = it.value;
    select.appendChild(o);
  }
  select.disabled = items.length === 0;
}

function initSelectors() {
  const degSel = $("#sel-degree");
  const yearSel = $("#sel-year");
  const examSel = $("#sel-exam");

  /* Raggruppa i corsi per area disciplinare. */
  const areas = [...new Set(DEGREES.map(d => d.area))];
  degSel.innerHTML = "";
  const ph = el("option", null, "Seleziona il corso di laurea");
  ph.value = "";
  degSel.appendChild(ph);
  for (const area of areas) {
    const group = document.createElement("optgroup");
    group.label = area;
    for (const d of DEGREES.filter(x => x.area === area)) {
      const o = el("option", null, `${d.name} — ${d.class}`);
      o.value = d.id;
      group.appendChild(o);
    }
    degSel.appendChild(group);
  }
  degSel.disabled = false;

  fillSelect(yearSel, [], "Seleziona prima il corso");
  fillSelect(examSel, [], "Seleziona prima l'anno");

  degSel.addEventListener("change", () => {
    const deg = findDegree(degSel.value);
    state.degree = deg || null;
    fillSelect(
      yearSel,
      deg ? deg.years.map(y => ({ value: String(y.year), label: `${y.year}° anno` })) : [],
      "Seleziona l'anno di corso"
    );
    fillSelect(examSel, [], "Seleziona prima l'anno");
    state.exam = null;
    renderExamSummary();
  });

  yearSel.addEventListener("change", () => {
    const deg = state.degree;
    const y = deg?.years.find(x => String(x.year) === yearSel.value) || null;
    state.year = y;
    fillSelect(
      examSel,
      y ? y.exams.map(e => ({ value: e.id, label: `${e.name} (${e.ssd})` })) : [],
      "Seleziona l'esame"
    );
    state.exam = null;
    renderExamSummary();
  });

  examSel.addEventListener("change", () => {
    state.exam = state.year?.exams.find(e => e.id === examSel.value) || null;
    renderExamSummary();
  });
}

/* ---------------------- RIEPILOGO ESAME ------------------- */
function renderExamSummary() {
  const box = $("#exam-summary");
  if (!box) return;
  box.innerHTML = "";

  if (!state.exam) {
    box.className = "empty";
    box.appendChild(el("p", "empty__title", "Nessun esame selezionato"));
    box.appendChild(el("p", null, "Completa i tre menu qui sopra per vedere la copertura del motore."));
    return;
  }

  const slug = examSlug(state.exam.id);
  const cov = examCoverage(slug);
  const variants = variantEstimate(slug);
  box.className = "";

  const wrapEl = el("div", "exam-summary");
  const left = el("div");

  left.appendChild(el("div", "exam-summary__path",
    `${state.degree.name} (${state.degree.class}) · ${state.year.year}° anno · ${state.degree.area}`));
  left.appendChild(el("div", "exam-summary__name", state.exam.name));

  const meta = el("div", "exam-summary__meta");
  meta.appendChild(el("span", "badge badge--info", state.exam.ssd));
  meta.appendChild(el("span",
    cov.available ? "badge badge--verified" : "badge badge--pending",
    cov.available ? "Motore pronto" : "Motore in preparazione"));
  left.appendChild(meta);

  const right = el("div");
  const covWrap = el("div", "coverage");

  const stats = [
    [String(cov.templates), "Template attivi"],
    [String(QUESTIONS_PER_SESSION), "Domande a sessione"],
    [variants ? variants.toLocaleString("it-IT") : "—", "Varianti stimate"]
  ];
  for (const [value, label] of stats) {
    const item = el("div", "coverage__item");
    item.appendChild(el("div", "coverage__value num", value));
    item.appendChild(el("div", "coverage__label", label));
    covWrap.appendChild(item);
  }
  right.appendChild(covWrap);

  if (!cov.available) {
    const n = el("div", "notice notice--warning");
    n.textContent =
      `Questo esame dispone di ${cov.templates} template su ${cov.minRequired} necessari. ` +
      `Il motore non genera la sessione per evitare di riproporre le stesse domande: ` +
      `i template vanno aggiunti in quiz/engine.js.`;
    right.appendChild(n);
  }

  wrapEl.appendChild(left);
  wrapEl.appendChild(right);
  box.appendChild(wrapEl);

  const startBtn = $("#btn-start");
  if (startBtn) startBtn.disabled = !cov.available;
}

function startSession() {
  if (!state.exam) return;

  const usage = readUsage();
  if (usage.count >= FREE_SESSIONS_PER_DAY) {
    renderLimitScreen(usage);
    return;
  }

  const slug = examSlug(state.exam.id);
  const seed = (Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0;
  const session = generateSession(slug, seed);

  if (!session.ok) {
    renderUnsupportedScreen(slug, session);
    return;
  }

  state.session = session;
  state.answers = new Array(session.total).fill(null);
  state.current = 0;
  state.graded = false;

  usage.count += 1;
  writeUsage(usage);
  renderSessionCounter();

  renderQuestion();
}

function renderLimitScreen(usage) {
  const view = $("#view");
  view.innerHTML = "";
  const panel = el("section", "panel");
  panel.appendChild(el("div", "panel__title", "Limite giornaliero raggiunto"));
  panel.appendChild(el("div", "panel__desc",
    `Hai utilizzato ${usage.count} sessioni oggi. Il limite di ${FREE_SESSIONS_PER_DAY} sessioni ` +
    `gratuite si azzera a mezzanotte, ora locale.`));
  const n = el("div", "notice notice--warning");
  n.textContent =
    "Nota tecnica: in questa fase il conteggio è memorizzato nel browser e non è quindi " +
    "verificabile lato server. Un limite opponibile richiede autenticazione e database.";
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

function renderUnsupportedScreen(slug, info) {
  const view = $("#view");
  view.innerHTML = "";
  const panel = el("section", "panel");
  panel.appendChild(el("div", "panel__title", "Esame non ancora coperto dal motore"));
  panel.appendChild(el("div", "panel__desc",
    `L'esame «${state.exam.name}» (${state.exam.ssd}) non dispone di template sufficienti.`));
  const n = el("div", "notice notice--warning");
  n.textContent =
    `Template presenti: ${info.coverage ?? 0}. Minimo richiesto: ${info.minRequired ?? 3}. ` +
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
  meta.appendChild(el("span", "badge badge--accent", q.topic));
  meta.appendChild(el("span", "badge badge--info", `${s.total} domande · sessione standard`));
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
    li.appendChild(el("span", null, `Domanda ${i + 1}`));
    list.appendChild(li);
  });
  navPanel.appendChild(list);
  side.appendChild(navPanel);

  const infoPanel = el("div", "side-panel");
  infoPanel.appendChild(el("div", "side-panel__title", "Sessione"));
  const kv = el("dl", "kv");
  for (const [k, v] of [
    ["Esame", state.exam.name],
    ["Corso", `${state.degree.name} (${state.degree.class})`],
    ["Anno", `${state.year.year}° anno`],
    ["Domande", String(s.total)],
    ["Template usati", String(s.usedTemplates)]
  ]) {
    const r = el("div", "kv__row");
    r.appendChild(el("dt", null, k));
    r.appendChild(el("dd", null, v));
    kv.appendChild(r);
  }
  infoPanel.appendChild(kv);
  side.appendChild(infoPanel);

  const honesty = el("div", "side-panel");
  honesty.appendChild(el("div", "side-panel__title", "Nota sui contenuti"));
  honesty.appendChild(el("div", "explanation",
    "Le domande sono generate da template parametrici su nozioni stabili della disciplina. " +
    "Non riproducono prove d'esame ufficiali né i programmi dei singoli atenei."));
  side.appendChild(honesty);

  layout.appendChild(side);
  view.appendChild(layout);
}

function renderResults() {
  const view = $("#view");
  const s = state.session;
  const r = gradeSession(s, state.answers);

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
    `Esame: ${state.exam.name} — ${state.degree.name} (${state.degree.class}), ` +
    `${state.year.year}° anno. Hai risposto correttamente a ${r.score} domande su ${r.total}.`));

  const topicBox = el("div", "exam-summary__meta");
  topicBox.style.marginTop = "0.85rem";
  for (const t of r.byTopic) {
    topicBox.appendChild(el("span",
      t.correct === t.total ? "badge badge--verified" : "badge badge--info",
      `${t.topic}: ${t.correct}/${t.total}`));
  }
  text.appendChild(topicBox);
  headInner.appendChild(text);

  head.appendChild(headInner);
  view.appendChild(head);

  const review = el("div", "panel");
  review.appendChild(el("div", "panel__title", "Revisione delle risposte"));
  review.appendChild(el("div", "panel__desc",
    "Ogni voce riporta la risposta data, quella corretta e la spiegazione."));

  const list = el("div", "review");
  for (const d of r.detail) {
    const item = el("div", "review-item");

    const headRow = el("div", "review-item__head");
    headRow.appendChild(el("span", "review-item__num", `#${d.index}`));
    headRow.appendChild(el("span", "badge badge--accent", d.topic));
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

    const expl = el("div", "explanation");
    expl.appendChild(el("strong", null, "Spiegazione: "));
    expl.appendChild(document.createTextNode(d.explanation));
    item.appendChild(expl);

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

  const left = Math.max(0, FREE_SESSIONS_PER_DAY - readUsage().count);
  row.appendChild(el("span", "quiz-progress__label", `Sessioni gratuite rimaste oggi: ${left}`));

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

function renderHome() {
  const view = $("#view");
  view.innerHTML = "";

  const panel = el("section", "panel");
  panel.appendChild(el("div", "panel__title", "Seleziona il percorso d'esame"));
  panel.appendChild(el("div", "panel__desc",
    "Scegli corso di laurea, anno di corso ed esame. La sessione generata contiene " +
    `${QUESTIONS_PER_SESSION} domande a risposta multipla con correzione automatica.`));

  const grid = el("div", "selector-grid");
  for (const [id, label] of [
    ["sel-degree", "Corso di laurea"],
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

  const reset = el("button", "btn btn--ghost", "Azzera contatore locale (debug)");
  reset.type = "button";
  reset.title = "Strumento di sviluppo: il contatore reale sarà lato server";
  reset.addEventListener("click", () => {
    writeUsage({ date: todayKey(), count: 0 });
    renderSessionCounter();
  });
  row.appendChild(reset);

  panel.appendChild(row);
  view.appendChild(panel);

  const summaryPanel = el("section", "panel");
  summaryPanel.appendChild(el("div", "panel__title", "Copertura del motore"));
  summaryPanel.appendChild(el("div", "panel__desc", "Dati dichiarati in modo trasparente per l'esame selezionato."));
  const summary = el("div", "empty");
  summary.id = "exam-summary";
  summary.appendChild(el("p", "empty__title", "Nessun esame selezionato"));
  summary.appendChild(el("p", null, "Completa i tre menu qui sopra per vedere la copertura del motore."));
  summaryPanel.appendChild(summary);
  view.appendChild(summaryPanel);

  initSelectors();
  renderExamSummary();
}

function renderCatalog() {
  const view = $("#view");
  view.innerHTML = "";

  const stats = catalogStats();

  const panel = el("section", "panel");
  panel.appendChild(el("div", "panel__title", "Corsi di laurea"));
  panel.appendChild(el("div", "panel__desc",
    "Catalogo organizzato per classi di laurea ministeriali (DM 270/2004). " +
    "Nessuna università specifica: i corsi sono comuni a tutti gli atenei."));

  const wrap = el("div", "table-wrap");
  const table = el("table");
  const thead = el("thead");
  const hr = el("tr");
  for (const h of ["Corso di laurea", "Classe", "Area", "Anni", "Esami"]) {
    hr.appendChild(el("th", null, h));
  }
  thead.appendChild(hr);
  table.appendChild(thead);

  const tbody = el("tbody");
  for (const d of DEGREES) {
    const exams = d.years.reduce((a, y) => a + y.exams.length, 0);
    const tr = el("tr");
    tr.appendChild(el("td", null, d.name));
    tr.appendChild(el("td", null, d.class));
    tr.appendChild(el("td", null, d.area));
    tr.appendChild(el("td", "num", String(d.years.length)));
    tr.appendChild(el("td", "num", String(exams)));
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  wrap.appendChild(table);
  panel.appendChild(wrap);

  const row = el("div", "btn-row");
  row.appendChild(el("span", "quiz-progress__label",
    `${stats.degrees} corsi · ${stats.years} anni di corso · ${stats.exams} esami`));
  panel.appendChild(row);
  view.appendChild(panel);

  const detail = el("section", "panel");
  detail.appendChild(el("div", "panel__title", "Esami e copertura del motore"));
  detail.appendChild(el("div", "panel__desc",
    "Per ogni esame è indicato il settore scientifico-disciplinare e se il motore dispone " +
    "dei template necessari a generare una sessione completa."));

  const dList = el("div", "review");
  for (const d of DEGREES) {
    const item = el("div", "review-item");
    item.appendChild(el("div", "review-item__prompt", `${d.name} — ${d.class}`));
    for (const y of d.years) {
      for (const e of y.exams) {
        const cov = examCoverage(examSlug(e.id));
        const line = el("div", "answer-line");
        line.appendChild(el("span", "answer-line__tag", `${y.year}° anno`));
        const text = el("span", "answer-line__text");
        text.textContent = `${e.name} · ${e.ssd}`;
        line.appendChild(text);
        line.appendChild(el("span",
          cov.available ? "badge badge--verified" : "badge badge--pending",
          cov.available ? `${cov.templates} template` : "in preparazione"));
        item.appendChild(line);
      }
    }
    dList.appendChild(item);
  }
  detail.appendChild(dList);
  view.appendChild(detail);
}

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
