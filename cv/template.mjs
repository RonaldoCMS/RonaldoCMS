/** Pagina HTML del curriculum: due fogli A4 esatti, pronti per essere stampati in PDF. */

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** **grassetto** e *corsivo* nei testi. */
const inline = (s) =>
  esc(s)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");

const mark = `
<svg class="mark" viewBox="0 0 64 64" aria-hidden="true">
  <rect width="64" height="64" rx="16" fill="#f5b942"/>
  <path d="M30 15V49M30 15H43a10 10 0 0 1 0 20H30M41 35l11 14" fill="none" stroke="#1c1300" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="8" y="50" width="16" height="6" rx="3" fill="#1c1300"/>
</svg>`;

const css = `
@page { size: 210mm 297mm; margin: 0; }
:root {
  --ink: #17191f;
  --muted: #4f5563;
  --soft: #6b7180;
  --accent: #9a5b00;
  --amber: #f5b942;
  --side: #f6f1e5;
  --line: #e4dccb;
}
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: "Manrope", "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  font-size: 9.8pt;
  line-height: 1.46;
  color: var(--ink);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
a { color: inherit; text-decoration: none; }
strong { font-weight: 700; }

.sheet {
  width: 210mm;
  height: 297mm;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  break-after: page;
  page-break-after: always;
}
.sheet:last-child { break-after: auto; page-break-after: auto; }

.head {
  display: flex;
  align-items: center;
  gap: 6mm;
  padding: 12mm 13mm 8mm 13mm;
  background: #faf7ef;
  border-bottom: 1.1mm solid var(--amber);
}
.mark { width: 17mm; height: 17mm; flex: none; }
.head__name { margin: 0; font-size: 27pt; line-height: 1.05; font-weight: 800; letter-spacing: -0.02em; }
.head__role { margin: 1.5mm 0 0; font-size: 12.5pt; font-weight: 700; color: var(--accent); }
.head__tag { margin: 1mm 0 0; font-size: 10pt; color: var(--muted); }

.head--slim { padding: 7mm 13mm 5mm; gap: 4mm; justify-content: space-between; border-bottom-width: 0.7mm; }
.head--slim .head__name { font-size: 14pt; }
.head--slim .mark { width: 9mm; height: 9mm; }
.head--slim .head__left { display: flex; align-items: center; gap: 4mm; }
.head__page { font-size: 8.2pt; color: var(--soft); letter-spacing: 0.02em; }

.cols { flex: 1; min-height: 0; display: grid; grid-template-columns: 61mm 1fr; }
.side { background: var(--side); padding: 8mm 6.5mm 8mm 7.5mm; }
.main { padding: 8mm 12mm 8mm 9mm; }

h2 {
  margin: 0 0 2.2mm;
  font-size: 8pt;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--accent);
}
section + section { margin-top: 7mm; }
.side section + section { margin-top: 6.5mm; }

.contact { list-style: none; margin: 0; padding: 0; }
.contact li { margin-bottom: 2.1mm; }
.contact span { display: block; font-size: 7.2pt; text-transform: uppercase; letter-spacing: 0.08em; color: var(--soft); }
.contact a, .contact b { font-weight: 600; font-size: 9.4pt; word-break: break-all; }

.skills { margin: 0; }
.skills dt { margin-top: 2.4mm; font-weight: 800; font-size: 9pt; }
.skills dd { margin: 0.3mm 0 0; color: var(--muted); font-size: 9.2pt; }

.edu { margin-bottom: 3.6mm; }
.edu b { display: block; font-size: 9.6pt; }
.edu span { display: block; color: var(--muted); font-size: 9pt; }
.edu i { display: block; font-style: normal; color: var(--soft); font-size: 8.2pt; margin-top: 0.6mm; font-family: "JetBrains Mono", Consolas, monospace; }

.plain { margin: 0; padding: 0; list-style: none; }
.plain li { margin-bottom: 1.6mm; color: var(--muted); font-size: 9.3pt; }
.note { margin: 2.4mm 0 0; font-size: 8.4pt; color: var(--soft); }

.profile { margin: 0; color: var(--muted); font-size: 10pt; line-height: 1.55; }

.job { margin-bottom: 6.4mm; break-inside: avoid; }
.job__top { display: flex; justify-content: space-between; align-items: baseline; gap: 4mm; }
.job__role { margin: 0; font-size: 11.6pt; font-weight: 800; letter-spacing: -0.005em; }
.job__period { font-family: "JetBrains Mono", Consolas, monospace; font-size: 8.2pt; color: var(--accent); white-space: nowrap; }
.job__org { margin: 0.4mm 0 2mm; font-weight: 700; font-size: 9.9pt; }
.job__org span { font-weight: 500; color: var(--soft); }
.job__intro { margin: 0 0 1.2mm; color: var(--muted); }
.job ul { margin: 0; padding-left: 4.2mm; }
.job li { margin-bottom: 1.5mm; color: var(--muted); padding-left: 0.5mm; }
.job li::marker { color: var(--amber); }
.job li strong { color: var(--ink); }

.projects { margin: 0; padding-left: 4.2mm; }
.projects li { margin-bottom: 2mm; color: var(--muted); }
.projects li::marker { color: var(--amber); }
.projects strong { color: var(--ink); }
`;

const job = (j) => `
  <article class="job">
    <div class="job__top"><h3 class="job__role">${esc(j.role)}</h3><span class="job__period">${esc(j.period)}</span></div>
    <p class="job__org">${esc(j.org)}${j.orgNote ? ` <span>· ${esc(j.orgNote)}</span>` : ""}</p>
    ${j.intro ? `<p class="job__intro">${inline(j.intro)}</p>` : ""}
    <ul>${j.bullets.map((b) => `<li>${inline(b)}</li>`).join("")}</ul>
  </article>`;

const contactItem = (c) =>
  `<li><span>${esc(c.label)}</span>${c.href ? `<a href="${esc(c.href)}">${esc(c.value)}</a>` : `<b>${esc(c.value)}</b>`}</li>`;

/** Restituisce il documento HTML completo per una lingua. */
export function renderCv(d) {
  const [promedya, dhonko, accenture, jotto] = d.jobs;
  return `<!doctype html>
<html lang="${d.lang}">
<head>
<meta charset="utf-8">
<title>${esc(d.documentTitle)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&display=block" rel="stylesheet">
<style>${css}</style>
</head>
<body>

<div class="sheet" id="sheet-1">
  <header class="head">
    ${mark}
    <div>
      <h1 class="head__name">${esc(d.name)}</h1>
      <p class="head__role">${esc(d.role)}</p>
      <p class="head__tag">${esc(d.tagline)}</p>
    </div>
  </header>
  <div class="cols">
    <aside class="side">
      <section>
        <h2>${esc(d.contactTitle)}</h2>
        <ul class="contact">${d.contact.map(contactItem).join("")}</ul>
      </section>
      <section>
        <h2>${esc(d.skillsTitle)}</h2>
        <dl class="skills">${d.skills.map((s) => `<dt>${esc(s.label)}</dt><dd>${esc(s.items)}</dd>`).join("")}</dl>
      </section>
      <section>
        <h2>${esc(d.languagesTitle)}</h2>
        <ul class="plain">${d.languages.map((l) => `<li><strong style="color:var(--ink)">${esc(l.name)}</strong> · ${esc(l.level)}</li>`).join("")}</ul>
      </section>
    </aside>
    <main class="main">
      <section>
        <h2>${esc(d.profileTitle)}</h2>
        <p class="profile">${inline(d.profile)}</p>
      </section>
      <section>
        <h2>${esc(d.experienceTitle)}</h2>
        ${job(promedya)}
        ${job(dhonko)}
      </section>
    </main>
  </div>
</div>

<div class="sheet" id="sheet-2">
  <header class="head head--slim">
    <div class="head__left">${mark}<h1 class="head__name">${esc(d.name)}</h1></div>
    <span class="head__page">${esc(d.page2)}</span>
  </header>
  <div class="cols">
    <aside class="side">
      <section>
        <h2>${esc(d.educationTitle)}</h2>
        ${d.education.map((e) => `<div class="edu"><b>${esc(e.title)}</b><span>${esc(e.detail)}</span><i>${esc(e.period)}</i></div>`).join("")}
      </section>
      <section>
        <h2>${esc(d.certsTitle)}</h2>
        <ul class="plain">${d.certs.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
        <p class="note">${esc(d.certsNote)}</p>
      </section>
    </aside>
    <main class="main">
      <section>
        <h2>${esc(d.experienceTitle)}</h2>
        ${job(accenture)}
        ${job(jotto)}
      </section>
      <section>
        <h2>${esc(d.projectsTitle)}</h2>
        <ul class="projects">${d.projects.map((p) => `<li>${inline(p)}</li>`).join("")}</ul>
      </section>
    </main>
  </div>
</div>

</body>
</html>`;
}
