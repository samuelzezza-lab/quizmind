/* ============================================================
   Quizmind — Logica applicativa
   ------------------------------------------------------------
   Flusso lineare a tre passaggi:

     1. Corso    — corso di laurea o indirizzo scolastico
     2. Anno     — anno di corso o classe
     3. Materia  — le materie di quell'anno per quel percorso

   Scelta la materia, il motore parametrico genera la sessione:
   le domande nascono dai template attivati sulla materia, con
   valori e distrattori diversi a ogni avvio.
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

/* --------------------- UTILITA SELECT --------------------- */
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
  return Object.keys(gruppi).map((label) => ({
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
  return Object.keys(gruppi).map((label) => ({
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
  if (!corsoSel || !annoSel || !materiaSel) return;

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
      fillSelect(annoSel, anni.map((y) => ({ value: String(y), label: `${y}° anno` })), "Seleziona l'anno di corso");
    } else {
      const t = id ? SCHOOL_TRACKS.find((x) => x.id === id) : null;
      state.corsoNome = t ? t.name : null;
      const anni = t ? Object.keys(t.subjects).map(Number).sort((a, b) => a - b) : [];
      fillSelect(annoSel, anni.map((y) => ({ value: String(y), label: `${y}ª superiore` })), "Seleziona la classe");
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
      const items = esami.map((nome) => {
        const cov = examCoverage(esameCanonico(examSlug(nome)));
        return { value: nome, label: cov.available ? nome : nome + " — in preparazione" };
      });
      fillSelect(materiaSel, items, "Seleziona la materia");
    } else {
      const t = SCHOOL_TRACKS.find((x) => x.id === state.corso);
      const nomi = t && t.subjects[anno] ? t.subjects[anno] : [];
      const items = nomi.map((nome) => {
        const slug = subjectSlug(nome);
        const cov = subjectCoverage(slug, Number(anno));
        return { value: nome, label: cov.available ? nome : nome + " — in preparazione" };
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
  const varianti = eUniversita
    ? variantEstimate(cur.slug)
    : schoolVariantEstimate(cur.slug, Number(state.anno));
  const domande = eUniversita ? UNI_QUESTIONS : SCHOOL_QUESTIONS;
  const numAree = eUniversita ? (cov.templates || cov.areas || 0) : (cov.areas || 0);

  box.className = "";

  const wrapEl = el("div", "exam-summary");
  const left = el("div");

  left.appendChild(el("div", "exam-summary__path",
    (state.corsoNome || "") + " · " + (eUniversita ? state.anno + "° anno" : state.anno + "ª superiore")));
  left.appendChild(el("div", "exam-summary__name", state.materia));

  const meta = el("div", "exam-summary__meta");
  meta.appendChild(el("span", "badge badge--info", eUniversita ? "Università" : "Scuola Superiore"));
  meta.appendChild(el("span", cov.available ? "badge badge--verified" : "badge badge--pending",
    cov.available ? "Motore pronto" : "In preparazione"));
  left.appendChild(meta);

  const right = el("div");
  right.appendChild(coverageBlock([
    [String(numAree), "Aree della materia"],
    [String(domande), "Domande a sessione"],
    [varianti ? varianti.toLocaleString("it-IT") : "—", "Varianti stimate"]
  ]));

  if (!cov.available) {
    right.appendChild(noticeWarn(
      "Questa materia dispone di " + numAree + " aree sulle " + (cov.minRequired || 4) + " necessarie. " +
      "Il motore non genera la sessione invece di riproporre le stesse domande: le aree vanno aggiunte ai moduli in quiz/."));
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
    "Il conteggio è memorizzato nel browser: vale come misura di cortesia, non come limite opponibile. " +
    "Un limite effettivo richiede autenticazione e un database con conteggio giornaliero lato server."));
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
  card.appendChild(meta);

  const prompt = el("h2", "question-card__prompt", q.prompt);
  card.appendChild(prompt);

  const opts = el("div", "options");
  q.options.forEach((testo, i) => {
    const btn = el("button", "option");
    btn.type = "button";
    btn.appendChild(el("span", "option__letter", LETTERS[i]));
    btn.appendChild(el("span", "option__text", testo));
    if (state.answers[state.current] === i) btn.classList.add("option--selected");
    btn.addEventListener("click", () => {
      state.answers[state.current] = i;
      renderQuestion();
    });
    opts.appendChild(btn);
  });
  card.appendChild(opts);
  main.appendChild(card);

  const row = el("div", "btn-row");
  const prev = el("button", "btn btn--ghost", "Indietro");
  prev.type = "button";
  prev.disabled = state.current === 0;
  prev.addEventListener("click", () => { state.current--; renderQuestion(); });
  row.appendChild(prev);

  const avanti = state.current === s.total - 1;
  const next = el("button", "btn", avanti ? "Consegna" : "Avanti");
  next.type = "button";
  next.disabled = state.answers[state.current] === null;
  next.addEventListener("click", () => {
    if (avanti) { state.graded = true; renderResults(); }
    else { state.current++; renderQuestion(); }
  });
  row.appendChild(next);
  main.appendChild(row);

  const nav = el("div", "side-card");
  nav.appendChild(el("div", "side-card__title", "Riepilogo risposte"));
  const grid = el("div", "answer-grid");
  s.questions.forEach((_, i) => {
    const b = el("button", "answer-dot", String(i + 1));
    b.type = "button";
    if (state.answers[i] !== null) b.classList.add("answer-dot--filled");
    if (i === state.current) b.classList.add("answer-dot--current");
    b.addEventListener("click", () => { state.current = i; renderQuestion(); });
    grid.appendChild(b);
  });
  nav.appendChild(grid);
  side.appendChild(nav);

  layout.appendChild(main);
  layout.appendChild(side);
  view.appendChild(layout);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderResults() {
  const view = $("#view");
  const s = state.session;
  if (!s) return;

  const esito = state.sessionMode === "universita"
    ? gradeSession(s, state.answers)
    : gradeSchoolSession(s, state.answers);

  view.innerHTML = "";
  const panel = el("section", "panel panel--wide");
  panel.appendChild(el("div", "panel__title", "Risultato della sessione"));

  const scoreBox = el("div", "score");
  scoreBox.appendChild(el("div", "score__value num", esito.score + " / " + esito.total));
  scoreBox.appendChild(el("div", "score__label", esito.percentage + "% di risposte corrette"));
  panel.appendChild(scoreBox);

  if (esito.byArea) {
    const wrap = el("div", "area-results");
    esito.byArea.forEach((a) => {
      const item = el("div", "area-result");
      item.appendChild(el("div", "area-result__name", a.area));
      item.appendChild(el("div", "area-result__score num", a.correct + " / " + a.total));
      wrap.appendChild(item);
    });
    panel.appendChild(wrap);
  }

  esito.detail.forEach((d) => {
    const card = el("div", "review");
    const head = el("div", "review__head");
    head.appendChild(el("span", d.correct ? "badge badge--verified" : "badge badge--pending",
      d.correct ? "Corretta" : "Errata"));
    head.appendChild(el("span", "badge badge--info", d.area));
    card.appendChild(head);

    card.appendChild(el("div", "review__prompt", d.number + ". " + d.prompt));
    card.appendChild(el("div", "review__line", "La tua risposta: " + (d.givenText || "nessuna")));
    if (!d.correct) {
      card.appendChild(el("div", "review__correct", "Risposta corretta: " + d.correctText));
    }
    if (d.explanation) card.appendChild(el("div", "review__expl", d.explanation));
    if (d.errorNote) card.appendChild(el("div", "review__note", d.errorNote));
    panel.appendChild(card);
  });

  const row = el("div", "btn-row");
  const again = el("button", "btn", "Nuova sessione");
  again.type = "button";
  again.addEventListener("click", () => startSession());
  row.appendChild(again);

  const home = el("button", "btn btn--ghost", "Torna alla selezione");
  home.type = "button";
  home.addEventListener("click", renderHome);
  row.appendChild(home);
  panel.appendChild(row);

  view.appendChild(panel);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ============================================================
   HOME
   ============================================================ */
function renderHome() {
  const view = $("#view");
  view.innerHTML = "";
  const home = $("#home");
  if (home) home.style.display = "";
  initSelectors();
  renderSummary();
  renderSessionCounter();
}

/* ============================================================
   AVVIO
   ============================================================ */
function initMode() {
  const uniBtn = $("#mode-uni");
  const scuolaBtn = $("#mode-scuola");
  if (!uniBtn || !scuolaBtn) return;

  const applica = (mode) => {
    state.mode = mode;
    state.corso = null;
    state.anno = null;
    state.materia = null;
    uniBtn.classList.toggle("tab--active", mode === "universita");
    scuolaBtn.classList.toggle("tab--active", mode === "scuola");
    initSelectors();
    renderSummary();
  };

  uniBtn.addEventListener("click", () => applica("universita"));
  scuolaBtn.addEventListener("click", () => applica("scuola"));
}

function boot() {
  initMode();
  initSelectors();
  renderSummary();
  renderSessionCounter();

  const startBtn = $("#btn-start");
  if (startBtn) startBtn.addEventListener("click", startSession);

  const stats = catalogStats();
  const node = $("#catalog-stats");
  if (node) {
    const s2 = schoolStats();
    node.textContent = stats.corsi + " corsi universitari · " + s2.indirizzi + " indirizzi scolastici";
  }
}

document.addEventListener("DOMContentLoaded", boot);
