'use strict';

/* ==========================================================================
   Fabio Danubbio — Portfolio
   1. Tema chiaro/scuro   2. Lingua   3. Header e menu   4. Sezione attiva
   5. Animazioni di ingresso   6. Filtri progetti   7. Repository GitHub
   8. Modulo di contatto   9. Terminale (easter egg)
   ========================================================================== */

(function () {
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const t = (key, vars) => (window.i18n ? window.i18n.t(key, vars) : key);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  /* ------------------------------------------------------------------
     1. TEMA
     ------------------------------------------------------------------ */
  const root = document.documentElement;
  const darkMedia = window.matchMedia('(prefers-color-scheme: dark)');

  const currentTheme = () => root.getAttribute('data-theme') || (darkMedia.matches ? 'dark' : 'light');

  function updateThemeLabels() {
    const next = currentTheme() === 'dark' ? 'ui.themeLight' : 'ui.themeDark';
    $$('.theme-toggle').forEach((b) => b.setAttribute('aria-label', t(next)));
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('fd-theme', theme); } catch (e) { /* ignora */ }
    updateThemeLabels();
  }

  $$('.theme-toggle').forEach((btn) => {
    btn.addEventListener('click', () => applyTheme(currentTheme() === 'dark' ? 'light' : 'dark'));
  });
  darkMedia.addEventListener('change', updateThemeLabels);
  updateThemeLabels();

  /* ------------------------------------------------------------------
     2. LINGUA
     ------------------------------------------------------------------ */
  $$('.lang-switch button').forEach((btn) => {
    btn.addEventListener('click', () => window.i18n && window.i18n.set(btn.getAttribute('data-lang')));
  });

  window.addEventListener('fd:langchange', () => {
    updateThemeLabels();
    renderRepos();          // date formattate nella lingua giusta
    updateFormNote();
  });

  /* ------------------------------------------------------------------
     3. HEADER E MENU MOBILE
     ------------------------------------------------------------------ */
  const header = $('.site-header');
  const nav = $('.nav');
  const navToggle = $('.nav-toggle');
  const navMenu = $('#nav-menu');

  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  function setMenu(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
    $$('a', navMenu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('is-open') && !nav.contains(e.target)) setMenu(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) setMenu(false);
    });
  }

  /* ------------------------------------------------------------------
     4. LINK ATTIVO IN BASE ALLA SEZIONE VISIBILE
     ------------------------------------------------------------------ */
  const navLinks = $$('.nav-menu a[href^="#"]');
  const sections = navLinks.map((a) => $(a.getAttribute('href'))).filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = '#' + entry.target.id;
        navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === id));
      });
    }, { rootMargin: '-35% 0px -60% 0px', threshold: 0 });
    sections.forEach((s) => io.observe(s));
  }

  /* ------------------------------------------------------------------
     5. ANIMAZIONI DI INGRESSO
     ------------------------------------------------------------------ */
  const reveals = $$('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const ro = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach((el) => ro.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* ------------------------------------------------------------------
     6. FILTRI PROGETTI
     ------------------------------------------------------------------ */
  const filterBtns = $$('.filter');
  const projects = $$('.project');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const f = btn.getAttribute('data-filter');
      filterBtns.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      projects.forEach((p) => {
        const show = f === 'all' || p.getAttribute('data-cat') === f;
        p.classList.toggle('is-hidden', !show);
        if (show) p.classList.add('is-visible');
      });
    });
  });

  /* ------------------------------------------------------------------
     7. REPOSITORY GITHUB (caricati quando la sezione si avvicina)
     ------------------------------------------------------------------ */
  const GH_USER = 'RonaldoCMS';
  const GH_MAX = 6;
  const GH_CACHE_KEY = 'fd-gh-repos';
  const GH_CACHE_TTL = 60 * 60 * 1000; // 1 ora

  const LANG_COLORS = {
    JavaScript: '#f1e05a', TypeScript: '#3178c6', Dart: '#00b4ab', HTML: '#e34c26',
    CSS: '#563d7c', SCSS: '#c6538c', Java: '#b07219', Kotlin: '#a97bff', Swift: '#f05138',
    Python: '#3572a5', PHP: '#4f5d95', Shell: '#89e051', 'C#': '#178600', 'C++': '#f34b7d',
    C: '#555555', Go: '#00add8', Rust: '#dea584', Vue: '#41b883', Dockerfile: '#384d54'
  };

  const reposEl = $('#repos');
  let repoData = null;

  function fmtDate(iso) {
    const locale = window.i18n && window.i18n.lang === 'it' ? 'it-IT' : 'en-GB';
    try {
      return new Date(iso).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
      return iso.slice(0, 10);
    }
  }

  function renderRepos() {
    if (!reposEl || !repoData) return;
    if (!repoData.length) {
      reposEl.innerHTML = '<div class="repos__msg">' + esc(t('github.empty')) + '</div>';
      return;
    }
    reposEl.innerHTML = repoData.map((r) => {
      const color = LANG_COLORS[r.language] || 'var(--text-3)';
      return (
        '<a class="card repo" href="' + esc(r.url) + '" target="_blank" rel="noopener">' +
          '<span class="repo__name"><svg class="icon"><use href="#i-repo" /></svg>' + esc(r.name) + '</span>' +
          '<p>' + esc(r.description || t('github.noDesc')) + '</p>' +
          '<span class="repo__meta">' +
            (r.language ? '<span><i class="lang-dot" style="--dot:' + esc(color) + '"></i>' + esc(r.language) + '</span>' : '') +
            '<span><svg class="icon"><use href="#i-star" /></svg>' + r.stars + '</span>' +
            '<span><svg class="icon"><use href="#i-fork" /></svg>' + r.forks + '</span>' +
            '<span>' + esc(t('github.updated')) + ' ' + esc(fmtDate(r.updated)) + '</span>' +
          '</span>' +
        '</a>'
      );
    }).join('');
  }

  function showRepoError() {
    if (!reposEl) return;
    reposEl.innerHTML =
      '<div class="repos__msg">' + esc(t('github.error')) + ' ' +
      '<a href="https://github.com/' + GH_USER + '" target="_blank" rel="noopener">' + esc(t('github.profile')) + ' →</a></div>';
  }

  function showRepoSkeleton() {
    if (!reposEl) return;
    const card = '<div class="card repo repo--skeleton" aria-hidden="true"><span></span><span></span><span></span><span></span></div>';
    reposEl.innerHTML = '<span class="sr-only">' + esc(t('github.loading')) + '</span>' + card + card + card;
  }

  function readRepoCache() {
    try {
      const raw = sessionStorage.getItem(GH_CACHE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || Date.now() - parsed.at > GH_CACHE_TTL) return null;
      return parsed.data;
    } catch (e) {
      return null;
    }
  }

  async function loadRepos() {
    if (!reposEl) return;
    const cached = readRepoCache();
    if (cached) {
      repoData = cached;
      renderRepos();
      return;
    }

    showRepoSkeleton();
    try {
      const res = await fetch('https://api.github.com/users/' + GH_USER + '/repos?sort=updated&per_page=30', {
        headers: { Accept: 'application/vnd.github+json' }
      });
      if (!res.ok) throw new Error('GitHub API ' + res.status);
      const data = await res.json();

      repoData = data
        .filter((r) => !r.archived && !r.private)
        .sort((a, b) => (a.fork === b.fork ? 0 : a.fork ? 1 : -1)) // prima i repository propri
        .slice(0, GH_MAX)
        .map((r) => ({
          name: r.name,
          description: r.description,
          language: r.language,
          stars: r.stargazers_count || 0,
          forks: r.forks_count || 0,
          url: r.html_url,
          updated: r.pushed_at || r.updated_at
        }));

      try { sessionStorage.setItem(GH_CACHE_KEY, JSON.stringify({ at: Date.now(), data: repoData })); } catch (e) { /* ignora */ }
      renderRepos();
    } catch (err) {
      console.warn('[github]', err);
      showRepoError();
    }
  }

  const githubSection = $('#github');
  if (githubSection && 'IntersectionObserver' in window) {
    const go = new IntersectionObserver((entries, obs) => {
      if (entries.some((e) => e.isIntersecting)) {
        obs.disconnect();
        loadRepos();
      }
    }, { rootMargin: '400px 0px' });
    go.observe(githubSection);
  } else {
    loadRepos();
  }

  /* ------------------------------------------------------------------
     8. MODULO DI CONTATTO
     ------------------------------------------------------------------ */
  const form = $('#contact-form');
  const TO_EMAIL = 'fabio.danubbio@gmail.com';

  function updateFormNote() {
    if (!form) return;
    const note = $('.form__note', form);
    if (note) note.textContent = t(form.getAttribute('data-endpoint') ? 'contact.noteEndpoint' : 'contact.note');
  }
  updateFormNote();

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = $('.form__status', form);
      const submit = $('button[type="submit"]', form);
      const setStatus = (msg, cls) => {
        status.textContent = msg;
        status.className = 'form__status' + (cls ? ' ' + cls : '');
      };

      if (form.website && form.website.value) return; // honeypot anti-spam

      const data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        message: form.message.value.trim()
      };
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
      if (!data.name || !emailOk || !data.message) {
        setStatus(t('contact.missing'), 'is-err');
        (!data.name ? form.name : !emailOk ? form.email : form.message).focus();
        return;
      }

      const endpoint = form.getAttribute('data-endpoint');
      if (endpoint) {
        submit.disabled = true;
        setStatus(t('contact.sending'));
        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(data)
          });
          if (!res.ok) throw new Error('HTTP ' + res.status);
          setStatus(t('contact.success'), 'is-ok');
          form.reset();
        } catch (err) {
          console.warn('[contact]', err);
          setStatus(t('contact.error'), 'is-err');
        } finally {
          submit.disabled = false;
        }
      } else {
        const subject = encodeURIComponent(t('contact.mailSubject', { name: data.name }));
        const body = encodeURIComponent(data.message + '\n\n— ' + data.name + ' (' + data.email + ')');
        setStatus(t('contact.mailto'), 'is-ok');
        window.location.href = 'mailto:' + TO_EMAIL + '?subject=' + subject + '&body=' + body;
      }
    });
  }

  /* ------------------------------------------------------------------
     Anno nel footer
     ------------------------------------------------------------------ */
  $$('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });

  /* ------------------------------------------------------------------
     9. TERMINALE — un piccolo omaggio a chi vive nella riga di comando
     ------------------------------------------------------------------ */
  const term = $('#terminal');
  const termLog = $('#terminal-log');
  const termInput = $('#terminal-input');
  const SECTIONS = ['about', 'skills', 'experience', 'projects', 'articles', 'github', 'contact'];
  const history = [];
  let historyIdx = 0;
  let lastFocus = null;

  function print(text, cls) {
    if (!termLog) return;
    const line = document.createElement('div');
    if (cls) line.className = cls;
    line.textContent = text;
    termLog.appendChild(line);
    termLog.scrollTop = termLog.scrollHeight;
  }

  function openTerm() {
    if (!term) return;
    lastFocus = document.activeElement;
    term.hidden = false;
    if (!termLog.childElementCount) print(t('term.welcome'), 'muted');
    termInput.focus();
  }

  function closeTerm() {
    if (!term) return;
    term.hidden = true;
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  function run(line) {
    print('$ ' + line, 'cmd');
    const parts = line.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = (parts[1] || '').toLowerCase();

    switch (cmd) {
      case 'help': case '?':
        print(t('term.help'));
        break;
      case 'about': case 'whoami':
        print(t('term.about'));
        break;
      case 'skills': case 'stack':
        print(t('term.skills'));
        break;
      case 'projects':
        print(t('term.projects'));
        break;
      case 'contact':
        print(t('term.contact'));
        break;
      case 'ls': case 'dir':
        print(SECTIONS.join('  '));
        break;
      case 'go': case 'cd': case 'open': {
        const id = arg.replace(/^#/, '').replace(/\/$/, '');
        const target = id && document.getElementById(id);
        if (target && SECTIONS.includes(id)) {
          print(t('term.going', { id }), 'ok');
          target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        } else {
          print(t('term.noSection', { id: parts[1] || '' }));
        }
        break;
      }
      case 'theme':
        if (arg === 'light' || arg === 'dark') {
          applyTheme(arg);
          print(t('term.theme', { theme: arg }), 'ok');
        } else {
          print(t('term.themeUsage'));
        }
        break;
      case 'lang':
        if (arg === 'it' || arg === 'en') {
          window.i18n && window.i18n.set(arg);
          print(t('term.lang', { lang: arg }), 'ok');
        } else {
          print(t('term.langUsage'));
        }
        break;
      case 'clear': case 'cls':
        termLog.innerHTML = '';
        break;
      case 'exit': case 'quit': case 'q':
        closeTerm();
        break;
      case 'sudo':
        print(t('term.sudo'));
        break;
      default:
        print(t('term.unknown', { cmd: parts[0] }));
    }
  }

  if (term && termLog && termInput) {
    $$('[data-terminal-open]').forEach((b) => b.addEventListener('click', openTerm));
    const closeBtn = $('#terminal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeTerm);

    document.addEventListener('keydown', (e) => {
      const el = document.activeElement;
      const typing = el && (['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName) || el.isContentEditable);
      if (e.key === '`' && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        term.hidden ? openTerm() : closeTerm();
      } else if (e.key === 'Escape' && !term.hidden) {
        closeTerm();
      }
    });

    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const value = termInput.value.trim();
        termInput.value = '';
        if (value) {
          history.push(value);
          historyIdx = history.length;
          run(value);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length) {
          historyIdx = Math.max(0, historyIdx - 1);
          termInput.value = history[historyIdx];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        historyIdx = Math.min(history.length, historyIdx + 1);
        termInput.value = history[historyIdx] || '';
      }
    });
  }
})();
