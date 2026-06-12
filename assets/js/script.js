'use strict';

// ============================================
// PARTICLE SYSTEM - Dynamic Accent Colors
// ============================================

class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 140 };
    this.particleCount = window.innerWidth < 768 ? 25 : 60;
    this.connectionDistance = window.innerWidth < 768 ? 90 : 130;
    this.accentColor = '0, 255, 255'; // default cyan
    this.init();
    this.animate();
    this.setupEvents();
  }

  init() {
    this.resize();
    this.particles = [];
    this.updateAccentColor();
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        pulseSpeed: Math.random() * 0.01 + 0.003,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }
  }

  updateAccentColor() {
    // Read the current CSS --accent-1 color dynamically
    const computedAccent = getComputedStyle(document.body).getPropertyValue('--accent-1').trim();
    
    // Simple hex/hsl map helper
    if (computedAccent.includes('#')) {
      // Hex conversion to RGB numbers
      let hex = computedAccent.replace('#', '');
      if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      this.accentColor = `${r}, ${g}, ${b}`;
    } else if (computedAccent.includes('rgb')) {
      const match = computedAccent.match(/\d+,\s*\d+,\s*\d+/);
      if (match) this.accentColor = match[0];
    } else {
      // Fallback conversions based on active theme class
      if (document.body.classList.contains('theme-matrix')) {
        this.accentColor = '0, 255, 0';
      } else if (document.body.classList.contains('theme-dracula')) {
        this.accentColor = '255, 121, 198';
      } else if (document.body.classList.contains('theme-monokai')) {
        this.accentColor = '230, 219, 116';
      } else {
        this.accentColor = '0, 255, 255';
      }
    }
  }

  setupEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.particleCount = window.innerWidth < 768 ? 25 : 60;
      this.connectionDistance = window.innerWidth < 768 ? 90 : 130;
    });
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.pulsePhase += p.pulseSpeed;
      const pulse = Math.sin(p.pulsePhase) * 0.3 + 0.7;

      // Mouse interactive push/pull
      if (this.mouse.x !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.vx += (dx / dist) * force * 0.1;
          p.vy += (dy / dist) * force * 0.1;
        }
      }

      // Damping
      p.vx *= 0.98;
      p.vy *= 0.98;

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = this.canvas.width + 10;
      if (p.x > this.canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = this.canvas.height + 10;
      if (p.y > this.canvas.height + 10) p.y = -10;

      // Draw nodes
      const size = p.size * pulse;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${this.accentColor}, ${p.opacity * pulse})`;
      this.ctx.fill();

      // Connections
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.connectionDistance) {
          const opacity = (1 - dist / this.connectionDistance) * 0.1;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(${this.accentColor}, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

// ============================================
// IDE CONTROLLER & EDITOR WORKSPACE
// ============================================

class WebIDE {
  constructor() {
    this.openTabs = ['Welcome.txt', 'About_Me.md', 'Projects_Showcase.js'];
    this.activeFile = 'Welcome.txt';
    this.viewModes = {
      'Welcome.txt': 'code',
      'About_Me.md': 'preview',
      'Tech_Stack.json': 'code',
      'Experience.ts': 'preview',
      'Projects_Showcase.js': 'preview',
      'Articles.txt': 'code',
      'Contact.css': 'preview',
      'GitHub_Repos.json': 'preview',
      'Sandbox.js': 'code',
      'Settings.json': 'code'
    };

    // Store custom edits in memory to preserve state between tab switching
    this.editedFiles = {
      'Sandbox.js': null,
      'Settings.json': null,
      'GitHub_Repos.json': null
    };

    this.githubData = null;

    this.lang = window.i18nManager.currentLang;

    this.initDOM();
    this.setupEvents();
    this.selectFile(this.activeFile);
  }

  initDOM() {
    this.explorerList = document.querySelectorAll('.sidebar-explorer [data-file]');
    this.openEditorsList = document.getElementById('open-editors-list');
    this.tabsBar = document.getElementById('tabs-bar');
    this.lineNumbers = document.getElementById('line-numbers');
    this.codeContainer = document.getElementById('code-container');
    
    this.btnToggleView = document.getElementById('btn-toggle-view');
    this.btnRunCode = document.getElementById('btn-run-code');
    this.btnSaveSettings = document.getElementById('btn-save-settings');
    this.editorPane = document.getElementById('editor-pane');

    // Pre-load edited files from i18n values
    this.resetEditedFiles();
  }

  resetEditedFiles() {
    const dict = window.translations[this.lang];
    if (!this.editedFiles['Sandbox.js']) {
      this.editedFiles['Sandbox.js'] = dict['files.sandbox'];
    }
    if (!this.editedFiles['Settings.json']) {
      this.editedFiles['Settings.json'] = dict['files.settings'];
    }
  }

  setupEvents() {
    // Explorer list clicks
    this.explorerList.forEach(item => {
      item.addEventListener('click', () => {
        const file = item.getAttribute('data-file');
        this.selectFile(file);
        
        // Mobile sidebar closing
        const sidebar = document.getElementById('sidebar-explorer');
        if (sidebar && sidebar.classList.contains('active')) {
          sidebar.classList.remove('active');
        }
      });
    });

    // Toggle View button (Code vs Rendered UI preview)
    this.btnToggleView.addEventListener('click', () => {
      const currentMode = this.viewModes[this.activeFile];
      const nextMode = currentMode === 'code' ? 'preview' : 'code';
      this.viewModes[this.activeFile] = nextMode;
      this.applyViewMode(this.activeFile, nextMode);
    });

    // Run Code Sandbox Button
    this.btnRunCode.addEventListener('click', () => {
      this.runSandboxCode();
    });

    // Save Settings Button
    this.btnSaveSettings.addEventListener('click', () => {
      this.saveSettings();
    });

    // Listen to Language changes
    window.addEventListener('languageChanged', (e) => {
      this.lang = e.detail.lang;
      this.resetEditedFiles();
      this.refreshFileContent();
    });

    // Project card preview categorization filters
    document.querySelectorAll('.projects-filter-bar button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.projects-filter-bar button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterVal = btn.getAttribute('data-filter');
        this.filterProjects(filterVal);
      });
    });

    // Submit contact form inside Contact.css UI overlay preview
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitContactMessage();
      });
    }

    // Toggle Activity explorer panel on mobile
    const btnExplorer = document.getElementById('btn-explorer');
    if (btnExplorer) {
      btnExplorer.addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar-explorer');
        if (sidebar) sidebar.classList.toggle('active');
      });
    }

    // About testimonial modals
    document.querySelectorAll('.testimonial-item-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = card.getAttribute('data-index');
        this.openTestimonialModal(idx);
      });
    });

    const modalClose = document.getElementById('modal-close-btn');
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalClose) modalClose.addEventListener('click', () => this.closeTestimonialModal());
    if (modalOverlay) modalOverlay.addEventListener('click', () => this.closeTestimonialModal());
  }

  selectFile(fileName) {
    this.activeFile = fileName;

    // Add to open tabs array if not present
    if (!this.openTabs.includes(fileName)) {
      this.openTabs.push(fileName);
    }

    // Render workspace layouts
    this.renderTabs();
    this.renderSidebarFileSelections();
    
    const mode = this.viewModes[fileName] || 'code';
    this.applyViewMode(fileName, mode);

    // Dynamic GitHub repositories pull
    if (fileName === 'GitHub_Repos.json') {
      this.fetchGitHubRepos();
    }
  }

  closeFile(fileName, event) {
    if (event) event.stopPropagation();

    // Remove from open list
    this.openTabs = this.openTabs.filter(f => f !== fileName);

    // If active was closed, switch active tab
    if (this.activeFile === fileName) {
      this.activeFile = this.openTabs.length > 0 ? this.openTabs[this.openTabs.length - 1] : 'Welcome.txt';
    }

    this.selectFile(this.activeFile);
  }

  renderTabs() {
    this.tabsBar.innerHTML = '';
    this.openTabs.forEach(file => {
      const tab = document.createElement('div');
      tab.className = `editor-tab ${file === this.activeFile ? 'active' : ''}`;
      
      const fileIcon = this.getFileIconHtml(file);
      
      tab.innerHTML = `
        <span class="file-icon">${fileIcon}</span>
        <span>${file}</span>
        <button class="tab-close"><ion-icon name="close-outline"></ion-icon></button>
      `;

      tab.addEventListener('click', () => this.selectFile(file));
      
      // Close button handler
      const closeBtn = tab.querySelector('.tab-close');
      // Hide close button for Welcome.txt if it is the only one
      if (file === 'Welcome.txt' && this.openTabs.length === 1) {
        closeBtn.style.display = 'none';
      } else {
        closeBtn.addEventListener('click', (e) => this.closeFile(file, e));
      }

      this.tabsBar.appendChild(tab);
    });

    // Populate "Open Editors" sidebar block
    this.openEditorsList.innerHTML = '';
    this.openTabs.forEach(file => {
      const item = document.createElement('li');
      item.className = `file-item ${file === this.activeFile ? 'active' : ''}`;
      item.innerHTML = `
        <span class="file-icon">${this.getFileIconHtml(file)}</span>
        <span>${file}</span>
      `;
      item.addEventListener('click', () => this.selectFile(file));
      this.openEditorsList.appendChild(item);
    });
  }

  getFileIconHtml(file) {
    const extension = file.split('.').pop();
    switch (extension) {
      case 'md': return '<ion-icon name="logo-markdown" class="file-icon md"></ion-icon>';
      case 'json': return '<ion-icon name="code-working-outline" class="file-icon json"></ion-icon>';
      case 'ts': return '<ion-icon name="logo-typescript" class="file-icon ts"></ion-icon>';
      case 'js': 
        if (file === 'Sandbox.js') return '<ion-icon name="play-circle-outline" class="file-icon js" style="color: #ffca28;"></ion-icon>';
        return '<ion-icon name="logo-javascript" class="file-icon js"></ion-icon>';
      case 'css': return '<ion-icon name="logo-css3" class="file-icon css"></ion-icon>';
      case 'txt': 
      default:
        return '<ion-icon name="document-text-outline" class="file-icon txt"></ion-icon>';
    }
  }

  renderSidebarFileSelections() {
    this.explorerList.forEach(item => {
      const file = item.getAttribute('data-file');
      if (file === this.activeFile) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  applyViewMode(file, mode) {
    // Hide all rendered overlay UI panels
    document.querySelectorAll('.ui-overlay-view').forEach(panel => {
      panel.classList.remove('active');
    });

    // Toggle source file editor pane
    if (mode === 'code') {
      this.editorPane.style.display = 'flex';
      this.btnToggleView.querySelector('span').textContent = 'UI Preview';
      this.btnToggleView.querySelector('ion-icon').setAttribute('name', 'eye-outline');
      this.loadEditorCode(file);
    } else {
      this.editorPane.style.display = 'none';
      this.btnToggleView.querySelector('span').textContent = 'Source Code';
      this.btnToggleView.querySelector('ion-icon').setAttribute('name', 'code-slash-outline');
      this.loadOverlayUI(file);
    }

    // Toggle toolbar button availabilities based on active file
    const supportsPreview = ['About_Me.md', 'Tech_Stack.json', 'Experience.ts', 'Projects_Showcase.js', 'Contact.css'].includes(file);
    this.btnToggleView.style.display = supportsPreview ? 'flex' : 'none';
    
    this.btnRunCode.style.display = file === 'Sandbox.js' ? 'flex' : 'none';
    this.btnSaveSettings.style.display = file === 'Settings.json' ? 'flex' : 'none';
  }

  getFileI18nKey(file) {
    const mapping = {
      'Welcome.txt': 'welcome',
      'About_Me.md': 'about',
      'Tech_Stack.json': 'tech',
      'Experience.ts': 'experience',
      'Projects_Showcase.js': 'projects',
      'Articles.txt': 'articles',
      'Contact.css': 'contact',
      'GitHub_Repos.json': 'github',
      'Sandbox.js': 'sandbox',
      'Settings.json': 'settings'
    };
    return 'files.' + (mapping[file] || file);
  }

  loadEditorCode(file) {
    // Get content from translations dictionary or from custom memory
    let content = '';
    const dict = window.translations[this.lang];

    if (file === 'Sandbox.js' && this.editedFiles['Sandbox.js'] !== null) {
      content = this.editedFiles['Sandbox.js'];
    } else if (file === 'Settings.json' && this.editedFiles['Settings.json'] !== null) {
      content = this.editedFiles['Settings.json'];
    } else {
      const i18nKey = this.getFileI18nKey(file);
      content = dict[i18nKey] || '';
    }

    // Render code
    if (file === 'Sandbox.js' || file === 'Settings.json') {
      // Editable elements
      this.codeContainer.innerHTML = `<textarea class="code-textarea" id="editor-textarea" spellcheck="false">${content}</textarea>`;
      
      // Update local storage / memory on input
      const textarea = document.getElementById('editor-textarea');
      textarea.addEventListener('input', () => {
        this.editedFiles[file] = textarea.value;
        this.updateLineNumbers(textarea.value);
      });
      this.updateLineNumbers(content);
    } else {
      // Read-only syntax highlight views
      const extension = file.split('.').pop();
      const highlighted = this.highlightSyntax(content, extension);
      this.codeContainer.innerHTML = `<code style="display:block;">${highlighted}</code>`;
      this.updateLineNumbers(content);
    }
  }

  renderMarkdownToHtml(md) {
    let html = md;
    
    // images
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="md-img" />');
    
    // headers
    html = html.replace(/^# (.*)$/gm, '<h1>$1</h1>');
    html = html.replace(/^## (.*)$/gm, '<h2>$1</h2>');
    html = html.replace(/^### (.*)$/gm, '<h3>$1</h3>');
    
    // blockquotes
    html = html.replace(/^> (.*)$/gm, '<blockquote>$1</blockquote>');
    
    // lists (group bullets)
    html = html.replace(/^[\*\-]\s+(.*)$/gm, '<li>$1</li>');
    
    // wrap list blocks
    html = html.replace(/((?:<li>.*?<\/li>\s*)+)/g, '<ul>$1</ul>');
    
    // bold text
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // code spans
    html = html.replace(/\`(.*?)\`/g, '<code>$1</code>');
    
    // split paragraphs
    const lines = html.split('\n');
    const processedLines = lines.map(line => {
      const trimmed = line.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('<h') || trimmed.startsWith('<blockquote') || trimmed.startsWith('<ul') || trimmed.startsWith('<li') || trimmed.startsWith('</ul') || trimmed.startsWith('<img')) {
        return trimmed;
      }
      return `<p>${trimmed}</p>`;
    });
    
    return processedLines.filter(l => l !== '').join('\n');
  }

  loadOverlayUI(file) {
    const panelId = 'overlay-' + file;
    const panel = document.getElementById(panelId);
    if (!panel) return;

    panel.classList.add('active');

    // Populate translations inside overlays specifically
    if (file === 'About_Me.md') {
      const dict = window.translations[this.lang];
      const markdown = dict['files.about'] || '';
      
      const contentEl = document.getElementById('about-md-content');
      if (contentEl) {
        contentEl.innerHTML = this.renderMarkdownToHtml(markdown);
      }
      
      const titleEl = document.getElementById('about-md-title');
      if (titleEl) {
        titleEl.style.display = 'none'; // handled by rendered markdown title
      }
    }

    if (file === 'GitHub_Repos.json') {
      this.renderGitHubReposUI();
    }
  }

  fetchGitHubRepos() {
    if (this.githubData) {
      this.renderGitHubReposUI();
      return;
    }

    const reposGrid = document.getElementById('github-repos-grid');
    if (reposGrid) {
      reposGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--accent-1); font-family: var(--ff-mono);">
          <div style="font-size: 24px; animation: blink 1s infinite;"><ion-icon name="sync-outline"></ion-icon></div>
          <p style="margin-top: 10px;">Fetching live repositories from api.github.com...</p>
        </div>
      `;
    }

    fetch('https://api.github.com/users/RonaldoCMS/repos?sort=updated&per_page=12')
      .then(response => {
        if (!response.ok) throw new Error('API Request Failed');
        return response.json();
      })
      .then(data => {
        this.githubData = data.map(repo => ({
          name: repo.name,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language || 'Markdown',
          description: repo.description || 'No description provided.',
          url: repo.html_url,
          updatedAt: new Date(repo.updated_at).toLocaleDateString(this.lang === 'it' ? 'it-IT' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })
        }));

        this.editedFiles['GitHub_Repos.json'] = JSON.stringify(this.githubData, null, 2);

        if (this.activeFile === 'GitHub_Repos.json') {
          if (this.viewModes['GitHub_Repos.json'] === 'preview') {
            this.renderGitHubReposUI();
          } else {
            this.loadEditorCode('GitHub_Repos.json');
          }
        }
      })
      .catch(err => {
        console.error('GitHub fetch failed, loading fallback local copy:', err);
        // Fallback local listings in case of offline testing or GitHub API rate limits
        this.githubData = [
          {
            name: "RonaldoCMS",
            stars: 18,
            forks: 4,
            language: "HTML",
            description: "Personal Web IDE Portfolio and CMS architecture engine.",
            url: "https://github.com/RonaldoCMS/RonaldoCMS",
            updatedAt: "12 Giu 2026"
          },
          {
            name: "SmartAgent-Mobile",
            stars: 8,
            forks: 2,
            language: "Dart",
            description: "ERP Arca Evolution integration client built in Flutter.",
            url: "https://github.com/RonaldoCMS",
            updatedAt: "18 Mag 2026"
          },
          {
            name: "Dhonko-Travel",
            stars: 15,
            forks: 3,
            language: "JavaScript",
            description: "Social network travel planner platform (MERN stack).",
            url: "https://github.com/RonaldoCMS",
            updatedAt: "10 Apr 2026"
          },
          {
            name: "SmartServer-API",
            stars: 5,
            forks: 1,
            language: "Java",
            description: "Enterprise Spring Boot database connector.",
            url: "https://github.com/RonaldoCMS",
            updatedAt: "25 Feb 2026"
          }
        ];

        this.editedFiles['GitHub_Repos.json'] = JSON.stringify(this.githubData, null, 2);

        if (this.activeFile === 'GitHub_Repos.json') {
          if (this.viewModes['GitHub_Repos.json'] === 'preview') {
            this.renderGitHubReposUI();
          } else {
            this.loadEditorCode('GitHub_Repos.json');
          }
        }
      });
  }

  renderGitHubReposUI() {
    const reposGrid = document.getElementById('github-repos-grid');
    if (!reposGrid || !this.githubData) return;

    reposGrid.innerHTML = '';
    
    const langColors = {
      'JavaScript': '#f1e05a',
      'TypeScript': '#3178c6',
      'Dart': '#00b4ab',
      'HTML': '#e34c26',
      'CSS': '#563d7c',
      'Java': '#b07219',
      'Python': '#3572a5',
      'Markdown': '#8b949e'
    };

    this.githubData.forEach(repo => {
      const card = document.createElement('div');
      card.className = 'project-card-view';
      card.setAttribute('data-cat', 'github');
      
      const langColor = langColors[repo.language] || '#8b949e';

      card.innerHTML = `
        <div class="project-card-details" style="padding: 20px; display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
              <h3 class="project-card-title" style="margin-bottom: 0; font-size: 15px; color: var(--text-primary); font-family: var(--ff-mono); word-break: break-all;">${repo.name}</h3>
              <div style="display: flex; gap: 8px; font-size: 12px; color: var(--text-secondary); white-space: nowrap;">
                <span style="display: flex; align-items: center; gap: 2px;"><ion-icon name="star-outline"></ion-icon> ${repo.stars}</span>
                <span style="display: flex; align-items: center; gap: 2px;"><ion-icon name="git-network-outline"></ion-icon> ${repo.forks}</span>
              </div>
            </div>
            <p class="project-card-desc" style="font-size: 12px; color: var(--text-secondary); margin-bottom: 16px; line-height: 1.4;">${repo.description}</p>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 12px; margin-top: auto;">
              <span style="display: flex; align-items: center; gap: 6px; font-size: 11px;">
                <span style="width: 8px; height: 8px; border-radius: 50%; background-color: ${langColor}; display: inline-block;"></span>
                <span style="color: var(--text-primary);">${repo.language}</span>
              </span>
              <span style="font-size: 10px; color: var(--text-comment);">${repo.updatedAt}</span>
            </div>
            <a href="${repo.url}" target="_blank" class="editor-btn" style="margin-top: 14px; width: 100%; display: flex; justify-content: center; align-items: center; padding: 5px 0; font-size: 11px;">
              <ion-icon name="logo-github" style="margin-right: 6px; font-size: 14px;"></ion-icon>
              <span>View Repository</span>
            </a>
          </div>
        </div>
      `;
      reposGrid.appendChild(card);
    });
  }

  refreshFileContent() {
    this.loadEditorCode(this.activeFile);
    if (this.viewModes[this.activeFile] === 'preview') {
      this.loadOverlayUI(this.activeFile);
    }
  }

  updateLineNumbers(content) {
    const lines = content.split('\n');
    const lineCount = Math.max(lines.length, 1);
    this.lineNumbers.innerHTML = '';
    for (let i = 1; i <= lineCount; i++) {
      const span = document.createElement('span');
      span.textContent = i;
      span.style.display = 'block';
      this.lineNumbers.appendChild(span);
    }
  }

  highlightSyntax(code, lang) {
    let escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    if (lang === 'json') {
      // highlight properties, strings, numbers, booleans
      return escaped
        .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*")/g, '<span class="t-string">$1</span>')
        .replace(/\b(true|false|null)\b/g, '<span class="t-keyword">$1</span>')
        .replace(/\b(-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)\b/g, '<span class="t-num">$1</span>');
    }

    if (lang === 'js' || lang === 'ts') {
      // strings
      escaped = escaped.replace(/(["'`])(.*?)\1/g, '<span class="t-string">$1$2$1</span>');
      // comments
      escaped = escaped.replace(/(\/\/.*)/g, '<span class="t-comment">$1</span>');
      // keywords
      const keywords = /\b(const|let|var|function|return|export|import|from|class|extends|new|if|else|for|while|typeof|interface|type|default|string|number|boolean|any|interface|implements|as)\b/g;
      escaped = escaped.replace(keywords, '<span class="t-keyword">$1</span>');
      // numbers
      escaped = escaped.replace(/\b(\d+)\b/g, '<span class="t-num">$1</span>');
      // functions
      escaped = escaped.replace(/\b(\w+)(?=\()/g, '<span class="t-func">$1</span>');
      return escaped;
    }

    if (lang === 'css') {
      // selectors
      escaped = escaped.replace(/([#.]?[\w-]+)\s*\{/g, '<span class="t-tag">$1</span> {');
      // properties
      escaped = escaped.replace(/([\w-]+)\s*:/g, '<span class="t-keyword">$1</span>:');
      // strings
      escaped = escaped.replace(/(["'])(.*?)\1/g, '<span class="t-string">$1$2$1</span>');
      // comments
      escaped = escaped.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="t-comment">$1</span>');
      return escaped;
    }

    if (lang === 'md') {
      // headers
      escaped = escaped.replace(/^(#+\s+.*)$/gm, '<span class="t-tag" style="font-weight:bold;">$1</span>');
      // bullets
      escaped = escaped.replace(/^(\*\s+.*)$/gm, '<span class="t-keyword">$1</span>');
      escaped = escaped.replace(/^(\-\s+.*)$/gm, '<span class="t-keyword">$1</span>');
      // bold
      escaped = escaped.replace(/(\*\*.*?\*\*)/g, '<span class="t-string" style="font-weight:bold;">$1</span>');
      // code
      escaped = escaped.replace(/(\`.*?\`)/g, '<span class="t-func" style="background:rgba(255,255,255,0.06);padding:1px 3px;border-radius:3px;">$1</span>');
      return escaped;
    }

    return escaped;
  }

  // --- Sandbox execution logic ---
  runSandboxCode() {
    const code = this.editedFiles['Sandbox.js'] || '';
    
    // Switch terminal tab to "Output"
    const outputTabBtn = document.querySelector('[data-terminal-tab="output"]');
    if (outputTabBtn) outputTabBtn.click();

    const sandboxLog = document.getElementById('sandbox-output');
    sandboxLog.textContent = `[RonaldoCMS JS Compiler] Executing Sandbox.js...\n\n`;

    const originalLog = console.log;
    const originalError = console.error;
    let logs = [];

    console.log = (...args) => {
      logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' '));
    };
    console.error = (...args) => {
      logs.push('[RUNTIME ERROR] ' + args.join(' '));
    };

    try {
      // Execute sandboxed evaluation
      const runner = new Function(code);
      const start = performance.now();
      const returnValue = runner();
      const end = performance.now();
      
      let finalLogs = logs.join('\n');
      if (finalLogs) {
        sandboxLog.textContent += finalLogs + '\n';
      }
      if (returnValue !== undefined) {
        sandboxLog.textContent += `\n> Return value: ${typeof returnValue === 'object' ? JSON.stringify(returnValue) : returnValue}\n`;
      }
      sandboxLog.textContent += `\n[System] Code executed successfully in ${(end - start).toFixed(2)}ms.`;
    } catch (err) {
      sandboxLog.textContent += `\n[COMPILATION FAILED] ${err.message}`;
    }

    // Restore original browser console functions
    console.log = originalLog;
    console.error = originalError;
  }

  // --- Settings save and apply theme/sizes ---
  saveSettings() {
    const content = this.editedFiles['Settings.json'] || '';
    const dict = window.translations[this.lang];
    const termBody = document.getElementById('terminal-body');

    try {
      const config = JSON.parse(content);
      
      // 1. Theme swap
      const validThemes = ['cyber-glow', 'matrix', 'dracula', 'monokai'];
      if (config.theme && validThemes.includes(config.theme)) {
        document.body.className = ''; // wipe previous
        document.body.classList.add('theme-' + config.theme);
        
        // Notify Particle system to update accent color
        if (window.particleSystem) {
          window.particleSystem.updateAccentColor();
        }
      }

      // 2. Font size adjustment
      if (config.fontSize) {
        document.documentElement.style.setProperty('--fs-code-settings', config.fontSize);
        // Apply inline to editor code areas
        this.codeContainer.style.fontSize = config.fontSize;
        this.lineNumbers.style.fontSize = config.fontSize;
      }

      // 3. Language swap
      if (config.language && config.language !== this.lang) {
        const langTarget = config.language.toLowerCase();
        if (langTarget === 'it' || langTarget === 'en') {
          window.i18nManager.applyLanguage(langTarget);
          
          // Re-trigger visual updates
          this.lang = langTarget;
          localStorage.setItem('fabio-lang', langTarget);
          this.resetEditedFiles();
          this.refreshFileContent();
        }
      }

      // Print success to terminal tab
      const termTabBtn = document.querySelector('[data-terminal-tab="terminal"]');
      if (termTabBtn) termTabBtn.click();
      
      const termLog = document.getElementById('terminal-log');
      termLog.textContent += `\n[System] settings.json parser: ${dict['terminal.settingsSaved']}`;
      
      // Auto scroll terminal
      const termBodyEl = document.getElementById('terminal-body');
      termBodyEl.scrollTop = termBodyEl.scrollHeight;

    } catch (err) {
      // Print parse error to terminal
      const termTabBtn = document.querySelector('[data-terminal-tab="terminal"]');
      if (termTabBtn) termTabBtn.click();

      const termLog = document.getElementById('terminal-log');
      termLog.textContent += `\n[System Error] settings.json parse error: ${err.message}\n`;
      
      const termBodyEl = document.getElementById('terminal-body');
      termBodyEl.scrollTop = termBodyEl.scrollHeight;
    }
  }

  // --- Portfolio items filters ---
  filterProjects(category) {
    const cards = document.querySelectorAll('.projects-grid .project-card-view');
    cards.forEach(card => {
      const cardCat = card.getAttribute('data-cat');
      if (category === 'all' || cardCat === category) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.4s ease';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // --- Contact form submit mock ---
  submitContactMessage() {
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;

    const termTabBtn = document.querySelector('[data-terminal-tab="terminal"]');
    if (termTabBtn) termTabBtn.click();

    const termLog = document.getElementById('terminal-log');
    termLog.textContent += `\n\n[Form Sender] Packaging SMTP client details...\n`;
    termLog.textContent += `[Form Sender] Encrypting message envelope...\n`;
    
    setTimeout(() => {
      termLog.textContent += `[Form Sender] Connecting to mail server routing host...\n`;
      
      setTimeout(() => {
        termLog.textContent += `[Success] Message securely routed to Fabio's inbox!\n`;
        termLog.textContent += `  From: ${name} (${email})\n`;
        termLog.textContent += `  Status code: 250 Envelope Accepted.\n`;
        
        // Reset form inputs
        document.getElementById('contact-form').reset();
        
        // Scroll down
        const termBodyEl = document.getElementById('terminal-body');
        termBodyEl.scrollTop = termBodyEl.scrollHeight;
      }, 1000);
    }, 800);
  }

  // --- Testimonials Modal ---
  openTestimonialModal(index) {
    const data = [
      {
        name: "Marco Rossi",
        meta: "Partner WKI - PM",
        avatar: "./assets/images/avatar-1.png",
        text: "Fabio ha dimostrato eccellenti competenze in Flutter e architetture backend. Il suo approccio al clean code e alle best practice ha migliorato significativamente la qualità del nostro progetto Smart Agent. Professionale, puntuale e orientato alla performance."
      },
      {
        name: "Laura Bianchi",
        meta: "Lead Architect",
        avatar: "./assets/images/avatar-2.png",
        text: "La collaborazione con Fabio per Adobe Experience Manager e Spring MVC è stata eccezionale. La sua competenza in microservizi, autenticazione enterprise e metodologie ha garantito soluzioni robuste e sicure. Ottima conoscenza di MySQL e Git."
      },
      {
        name: "Andrea Verdi",
        meta: "Senior CTO",
        avatar: "./assets/images/avatar-3.png",
        text: "Fabio ha progettato un'architettura scalabile e manutenibile con Node.js ed Express. La sua formazione continua (certificazioni Meta 2025) e la sua propensione al problem solving lo rendono uno sviluppatore eccellente per progetti complessi."
      },
      {
        name: "Giulia Neri",
        meta: "Enterprise Director",
        avatar: "./assets/images/avatar-4.png",
        text: "L'esperienza con Fabio su progetti ERP collegati ad Arca Evolution è stata straordinaria. La sua capacità di tradurre specifiche funzionali aziendali complesse in codice pulito in Flutter e JS è di altissimo livello."
      }
    ];

    const current = data[index];
    if (!current) return;

    document.getElementById('modal-img').src = current.avatar;
    document.getElementById('modal-img').alt = current.name;
    document.getElementById('modal-title').textContent = current.name;
    document.getElementById('modal-meta').textContent = current.meta;
    document.getElementById('modal-text').textContent = current.text;

    document.getElementById('testimonials-modal-container').classList.add('active');
  }

  closeTestimonialModal() {
    document.getElementById('testimonials-modal-container').classList.remove('active');
  }
}

// ============================================
// TERMINAL CONSOLE CORE ENGINE
// ============================================

class TerminalConsole {
  constructor(ide) {
    this.ide = ide;
    this.input = document.getElementById('terminal-input');
    this.logContainer = document.getElementById('terminal-log');
    this.history = [];
    this.historyIndex = -1;

    this.init();
    this.setupEvents();
  }

  init() {
    const dict = window.translations[this.ide.lang];
    this.logContainer.textContent = dict['terminal.welcome'];
  }

  setupEvents() {
    // Input submit key listener
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const value = this.input.value.trim();
        this.input.value = '';
        if (value) {
          this.executeCommand(value);
        }
      } else if (e.key === 'ArrowUp') {
        // history navigation backward
        e.preventDefault();
        if (this.history.length > 0) {
          this.historyIndex = Math.min(this.historyIndex + 1, this.history.length - 1);
          this.input.value = this.history[this.history.length - 1 - this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        // history navigation forward
        e.preventDefault();
        this.historyIndex = Math.max(this.historyIndex - 1, -1);
        if (this.historyIndex === -1) {
          this.input.value = '';
        } else {
          this.input.value = this.history[this.history.length - 1 - this.historyIndex];
        }
      }
    });

    // Sidebar Explorer settings / cog trigger
    const btnSettings = document.getElementById('btn-settings');
    if (btnSettings) {
      btnSettings.addEventListener('click', () => {
        this.ide.selectFile('Settings.json');
      });
    }

    // Git / version control button trigger
    const btnGit = document.getElementById('btn-git');
    if (btnGit) {
      btnGit.addEventListener('click', () => {
        const termTabBtn = document.querySelector('[data-terminal-tab="terminal"]');
        if (termTabBtn) termTabBtn.click();
        this.executeCommand('git log');
      });
    }

    // Language switch click trigger
    const btnLang = document.getElementById('lang-switcher');
    if (btnLang) {
      btnLang.addEventListener('click', () => {
        window.i18nManager.toggle();
        this.logContainer.textContent += `\n[System] Language toggled: ${window.i18nManager.currentLang.toUpperCase()}\n`;
        const termBodyEl = document.getElementById('terminal-body');
        termBodyEl.scrollTop = termBodyEl.scrollHeight;
      });
    }

    // Terminal Tabs toggling
    document.querySelectorAll('.terminal-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.terminal-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Hide all views
        document.querySelectorAll('.terminal-tab-view').forEach(view => {
          view.style.display = 'none';
        });

        // Show selected view
        const targetTab = btn.getAttribute('data-terminal-tab');
        document.getElementById(`view-${targetTab}-tab`).style.display = 'block';
      });
    });

    // Clear terminal screen
    const btnClear = document.getElementById('btn-clear-terminal');
    if (btnClear) {
      btnClear.addEventListener('click', () => {
        this.logContainer.textContent = '';
      });
    }

    // Toggle terminal pane height
    const btnToggleTerm = document.getElementById('btn-toggle-terminal');
    if (btnToggleTerm) {
      btnToggleTerm.addEventListener('click', () => {
        const termPanel = document.getElementById('terminal-panel');
        const icon = document.getElementById('icon-toggle-term');
        if (termPanel.style.height === '40px') {
          termPanel.style.height = ''; // Reset CSS default
          icon.setAttribute('name', 'chevron-up-outline');
        } else {
          termPanel.style.height = '40px';
          icon.setAttribute('name', 'chevron-down-outline');
        }
      });
    }
  }

  executeCommand(commandLine) {
    this.history.push(commandLine);
    this.historyIndex = -1;

    const parts = commandLine.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const promptHtml = `<div class="terminal-output-prompt"><span class="terminal-prompt">guest@ronaldocms:~$</span> ${commandLine}</div>`;
    
    // Print command to screen
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = promptHtml;
    this.logContainer.appendChild(tempDiv.firstElementChild);

    const dict = window.translations[this.ide.lang];

    let outputText = '';

    switch (cmd) {
      case 'help':
        outputText = dict['terminal.help'];
        break;
        
      case 'ls':
        outputText = 'Welcome.txt          About_Me.md          Tech_Stack.json\nExperience.ts        Projects_Showcase.js GitHub_Repos.json\nArticles.txt         Contact.css          Sandbox.js\nSettings.json\n';
        break;

      case 'clear':
        this.logContainer.textContent = '';
        return;

      case 'cat':
        if (args.length === 0) {
          outputText = 'cat: argomenti mancanti. Uso: cat <nomefile>\n';
        } else {
          const targetFile = args[0];
          // Check if file exists virtual
          const validFiles = ['Welcome.txt', 'About_Me.md', 'Tech_Stack.json', 'Experience.ts', 'Projects_Showcase.js', 'GitHub_Repos.json', 'Articles.txt', 'Contact.css', 'Sandbox.js', 'Settings.json'];
          
          if (validFiles.includes(targetFile)) {
            if (targetFile === 'Sandbox.js' && this.ide.editedFiles['Sandbox.js'] !== null) {
              outputText = this.ide.editedFiles['Sandbox.js'] + '\n';
            } else if (targetFile === 'Settings.json' && this.ide.editedFiles['Settings.json'] !== null) {
              outputText = this.ide.editedFiles['Settings.json'] + '\n';
            } else if (targetFile === 'GitHub_Repos.json' && this.ide.editedFiles['GitHub_Repos.json'] !== null) {
              outputText = this.ide.editedFiles['GitHub_Repos.json'] + '\n';
            } else {
              const i18nKey = this.ide.getFileI18nKey(targetFile);
              outputText = (dict[i18nKey] || '') + '\n';
            }
          } else {
            outputText = dict['terminal.fileNotFound'].replace('{file}', targetFile);
          }
        }
        break;

      case 'node':
        if (args.length === 0) {
          outputText = 'node: argomenti mancanti. Uso: node <Sandbox.js>\n';
        } else {
          const targetFile = args[0];
          if (targetFile === 'Sandbox.js') {
            this.logContainer.innerHTML += `<div>${dict['terminal.nodeExecute'].replace('{file}', targetFile)}</div>`;
            this.ide.runSandboxCode();
            return;
          } else {
            outputText = `Errore: Impossibile compilare ${targetFile}. Solo Sandbox.js è configurabile nell'ambiente virtuale node.\n`;
          }
        }
        break;

      case 'theme':
        if (args.length === 0) {
          outputText = 'theme: argomento mancanti. Temi: cyber-glow, matrix, dracula, monokai. Uso: theme <nome>\n';
        } else {
          const themeName = args[0].toLowerCase();
          const validThemes = ['cyber-glow', 'matrix', 'dracula', 'monokai'];
          if (validThemes.includes(themeName)) {
            document.body.className = '';
            document.body.classList.add('theme-' + themeName);
            
            // Sync with Settings file content
            const configObj = {
              theme: themeName,
              fontSize: document.documentElement.style.getPropertyValue('--fs-code-settings') || '14px',
              terminalCursor: 'block',
              hologramEffect: true,
              language: this.ide.lang
            };
            this.ide.editedFiles['Settings.json'] = JSON.stringify(configObj, null, 2);
            
            // Trigger refresh editor content if Settings.json is currently open
            if (this.ide.activeFile === 'Settings.json') {
              this.ide.loadEditorCode('Settings.json');
            }

            if (window.particleSystem) window.particleSystem.updateAccentColor();
            
            outputText = dict['terminal.themeChanged'].replace('{theme}', themeName);
          } else {
            outputText = dict['terminal.themeNotFound'].replace('{theme}', themeName);
          }
        }
        break;

      case 'git':
        if (args.length === 0) {
          outputText = 'git: comando incompleto. Comandi supportati: git log, git status\n';
        } else {
          const sub = args[0].toLowerCase();
          if (sub === 'log') {
            outputText = `commit 6d84a7e3f0ef0c2394df8211db4a899bc2d785a3 (HEAD -> master, origin/master)\nAuthor: Fabio Danubbio <fabio.danubbio@gmail.com>\nDate:   Sun Oct 16 14:23:10 2022 +0200\n\n    feat(promedya): Develop Smart Agent Mobile Client & ERP Arca modules in Flutter\n\ncommit 2f9d85c41adff082e6629910d65ff98218e8749e\nAuthor: Fabio Danubbio <fabio.danubbio@gmail.com>\nDate:   Mon May 2 09:15:44 2022 +0200\n\n    feat(accenture): Integrate Adobe AEM SPID security layers for italia.it institutional portal\n\ncommit a2c01f8d42cf38df920c74f762fbc0438dc238de\nAuthor: Fabio Danubbio <fabio.danubbio@gmail.com>\nDate:   Wed Sep 1 11:30:12 2021 +0200\n\n    feat(jotto): Integrate WiFi-BLE domotics gateway app in Flutter & IoT controls\n`;
          } else if (sub === 'status') {
            outputText = `On branch master\nYour branch is up to date with 'origin/master'.\n\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n  (use "git restore <file>..." to discard changes in working directory)\n\tmodified:   Sandbox.js\n\tmodified:   Settings.json\n\nno changes added to commit (use "git add" and/or "git commit")\n`;
          } else {
            outputText = `git: comando non riconosciuto '${sub}'. Comandi git supportati: log, status\n`;
          }
        }
        break;

      default:
        outputText = dict['terminal.invalidCommand'].replace('{cmd}', cmd);
    }

    // Output rendering
    if (outputText) {
      const outputDiv = document.createElement('div');
      outputDiv.className = 'terminal-output-log';
      outputDiv.textContent = outputText;
      this.logContainer.appendChild(outputDiv);
    }

    // Auto scroll terminal to bottom
    const termBodyEl = document.getElementById('terminal-body');
    termBodyEl.scrollTop = termBodyEl.scrollHeight;
  }
}


// ============================================
// INITIALIZE ALL SYSTEMS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Canvas particles
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    window.particleSystem = new ParticleSystem(canvas);
  }

  // 2. Web IDE
  const ide = new WebIDE();

  // 3. Terminal console
  new TerminalConsole(ide);

  // Set default body size property
  document.documentElement.style.setProperty('--fs-code-settings', '14px');
});