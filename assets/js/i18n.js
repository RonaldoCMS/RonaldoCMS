'use strict';

// ============================================
// INTERNATIONALIZATION (i18n) SYSTEM
// ============================================

const translations = {
  it: {
    // UI General Elements
    "ui.explorerTitle": "ESPLORATORE",
    "ui.openEditors": "EDITOR APERTI",
    "ui.ronaldocms": "RONALDO_CMS",
    "ui.terminalTitle": "Terminale",
    "ui.problemsTitle": "Problemi",
    "ui.outputTitle": "Output",
    "ui.runCodeBtn": "Esegui",
    "ui.saveSettingsBtn": "Salva",
    "ui.welcomeTab": "Benvenuto.txt",
    "ui.sidebarShowContacts": "Mostra Contatti",
    "github.desc": "Progetti live caricati dal mio profilo GitHub (@RonaldoCMS) tramite API in tempo reale.",
    
    // Terminal Messages
    "terminal.welcome": "SISTEMA OPERATIVO RONALDOCMS v3.5.0-high\n(c) 2026 Fabio Danubbio. Tutti i diritti riservati.\n\nDigitare 'help' per la lista dei comandi disponibili.\n",
    "terminal.help": "Comandi disponibili:\n  ls               Mostra l'elenco dei file virtuali\n  cat <file>       Mostra il contenuto di un file (es: cat About_Me.md)\n  node <file>      Esegue un file JavaScript (es: node Sandbox.js)\n  theme <nome>     Cambia il tema del sistema (matrix, dracula, cyber-glow, monokai)\n  git log          Mostra la cronologia professionale come commit git\n  git status       Mostra lo stato attuale del sistema\n  clear            Pulisce la console del terminale\n",
    "terminal.invalidCommand": "Comando non trovato: '{cmd}'. Digitare 'help' per assistenza.\n",
    "terminal.fileNotFound": "File non trovato: '{file}'. Digitare 'ls' per vedere i file disponibili.\n",
    "terminal.nodeExecute": "Esecuzione in corso di '{file}' in Sandbox JS...\n",
    "terminal.themeChanged": "Tema modificato in: '{theme}'.\n",
    "terminal.themeNotFound": "Tema '{theme}' non riconosciuto. Temi disponibili: cyber-glow, matrix, dracula, monokai.\n",
    "terminal.settingsSaved": "Impostazioni salvate ed applicate con successo.\n",
    "terminal.settingsError": "Errore di parsing JSON nelle impostazioni! Controlla la sintassi.\n",
    
    // Virtual Files Content
    "files.welcome": "Benvenuto nella mia Web IDE!\n===========================\n\nHo creato questo template interattivo per sorprenderti. \nPuoi esplorare il mio profilo modificando ed eseguendo codice reale.\n\n💻 Usa l'Explorer a sinistra per navigare tra i file:\n  - About_Me.md          -> Informazioni su di me\n  - Tech_Stack.json       -> Il mio stack tecnologico\n  - Experience.ts        -> Formazione e lavori in formato TypeScript\n  - Projects_Showcase.js -> Progetti realizzati\n  - Articles.txt         -> I miei articoli tecnici su LinkedIn\n  - Contact.css          -> Informazioni di contatto e modulo in formato CSS\n  - Sandbox.js           -> Area di gioco JavaScript modificabile ed eseguibile!\n  - Settings.json        -> Configurazione dell'interfaccia (modificala per cambiare tema!)\n\n⌨️ Usa il Terminale in basso per inserire comandi.\n🔥 Modifica 'Sandbox.js' e premi il tasto 'Esegui' in alto a destra per far girare il tuo codice.\n",

    "files.about": "# Chi Sono | Fabio Danubbio\n\n![Fabio Danubbio](./assets/images/my-avatar.jpg)\n\nSono un Full Stack Developer con sede a Nola, Napoli. Appassionato di tecnologie moderne, sviluppo applicazioni scalabili e performanti con un approccio orientato al clean code, alle best practice ingegneristiche e all'ottimizzazione continua.\n\n## Cosa porto nei progetti\n- **Frontend & Mobile**: Sviluppo in Flutter per app cross-platform e React/Next.js per interfacce web moderne.\n- **Backend**: API scalabili con Node.js/Express e architetture enterprise solide con Java Spring Boot.\n- **Database**: Ottimizzazione query e gestione dati complessi con MongoDB, PostgreSQL e MySQL.\n- **Cloud & DevOps**: Pipeline di integrazione continua (CI/CD), Docker, e deployment scalabili su Firebase/AWS.\n\n## La mia filosofia\n> \"Lento per essere veloci nei casi di urgenza.\"\nCredo nella progettazione di architetture robuste e manutenibili per ridurre al minimo il debito tecnologico e facilitare l'evoluzione aziendale nel lungo termine.\n",

    "files.tech": "{\n  \"name\": \"Fabio Danubbio\",\n  \"role\": \"Full Stack Developer\",\n  \"skills\": {\n    \"Mobile\": [\"Flutter\", \"Dart\", \"Android SDK\", \"Swift/iOS basics\"],\n    \"Frontend\": [\"React.js\", \"Next.js\", \"JavaScript (ES6+)\", \"HTML5 & CSS3\"],\n    \"Backend\": [\"Node.js\", \"Express.js\", \"Java\", \"Spring Boot\", \"RESTful APIs\"],\n    \"Databases\": [\"MongoDB\", \"PostgreSQL\", \"MySQL\", \"MSSQL\"],\n    \"DevOps\": [\"Docker\", \"Firebase\", \"CI/CD (GitHub Actions)\", \"Git & GitFlow\"]\n  },\n  \"certifications\": [\n    \"Meta Coding Interview Preparation (2025)\",\n    \"Meta React & JavaScript Programming (2025)\",\n    \"Google Developer Program Member\",\n    \"Apple Developer Program Accredited\",\n    \"Oracle Java & Vaadin Accredited\"\n  ]\n}\n",

    "files.experience": "import { Developer, Job, Education } from './fabio-danubbio';\n\n// Cronologia dell'esperienza professionale e formativa\n\nconst lavoro: Job[] = [\n  {\n    role: \"Full Stack Developer\",\n    company: \"PROMEDYA SRL - Partner WKI\",\n    period: \"Ottobre 2022 — Presente\",\n    description: \"Sviluppo ed evoluzione di soluzioni collegate al gestionale ERP Arca Evolution. Integrazioni in JavaScript, moduli desktop e applicazioni mobili cross-platform in Flutter.\"\n  },\n  {\n    role: \"Full Stack Developer\",\n    company: \"Accenture Italia\",\n    period: \"Maggio 2022 — Ottobre 2022\",\n    description: \"Gestione dell'autenticazione ed autorizzazione enterprise sul portale italia.it tramite tecnologia Adobe Experience Manager e microservizi Spring MVC Java.\"\n  },\n  {\n    role: \"App Developer\",\n    company: \"Jotto S.r.l.\",\n    period: \"Settembre 2021 — Febbraio 2022\",\n    description: \"Creazione di applicazioni mobile aziendali in Flutter integrate con hardware di domotica domestica tramite protocolli WiFi e Bluetooth BLE.\"\n  }\n];\n\nconst formazione: Education[] = [\n  {\n    course: \"Corso Specialistico Java Enterprise & Clean Code\",\n    institute: \"Matrix Consulting / Oracle Academy\",\n    period: \"2022\",\n    details: \"Pattern architetturali, programmazione a oggetti avanzata e microservizi.\"\n  },\n  {\n    course: \"Diploma di Perito Informatico\",\n    institute: \"I.T.C.S.G. Masullo - Theti (Nola)\",\n    period: \"2015 — 2021\",\n    score: \"96/100\"\n  }\n];\n",

    "files.projects": "// Modulo dei Progetti in evidenza\n\nexport const getProjects = () => {\n  return [\n    {\n      id: 1,\n      title: \"ERP Arca Evolution (Promedya)\",\n      category: \"App Mobile\",\n      techStack: [\"Flutter\", \"Dart\", \"SQLite\", \"Node.js\"],\n      description: \"Ricostruzione mobile del gestionale Arca Evolution per agenti commerciali. Permette la gestione offline del carrello prodotti e invio sincrono dei documenti al server.\"\n    },\n    {\n      id: 2,\n      title: \"Dhonko Travel Platform\",\n      category: \"Web Development\",\n      techStack: [\"React\", \"Node.js\", \"Express\", \"MongoDB\", \"WebSockets\"],\n      description: \"Social network volto alla creazione e condivisione di viaggi, itinerari e interazione real-time tra partecipanti.\"\n    },\n    {\n      id: 3,\n      title: \"Smart Server API\",\n      category: \"Backend\",\n      techStack: [\"Java\", \"Spring Boot\", \"PostgreSQL\", \"Docker\", \"JWT\"],\n      description: \"Backend enterprise sicuro e robusto per l'interazione tra database ERP desktop e client mobili.\"\n    },\n    {\n      id: 4,\n      title: \"Adobe AEM Custom Auth (Accenture)\",\n      category: \"Backend\",\n      techStack: [\"Java\", \"Spring MVC\", \"Adobe AEM\", \"SPID / CIE Auth\"],\n      description: \"Sviluppo dei meccanismi di integrazione per credenziali e sicurezza degli accessi istituzionali.\"\n    },\n    {\n      id: 5,\n      title: \"App Domotica WiFi-BLE (Jotto)\",\n      category: \"App Mobile\",\n      techStack: [\"Flutter\", \"Dart\", \"Bluetooth BLE\", \"WiFi Link\"],\n      description: \"App cross-platform per il controllo a distanza e accoppiamento locale di gateway per riscaldamento ed elettrodomestici.\"\n    }\n  ];\n};\n",

    "files.articles": "=== ARTICOLI TECNICI SU LINKEDIN ===\n\n1. La Sindrome da \"Shiny Object\" nello Sviluppo Software\n   - Data di pubblicazione: 25 Nov, 2024\n   - Link: https://www.linkedin.com/pulse/la-sindrome-da-shiny-object-nello-sviluppo-software-quando-danubbio-tw81f/\n   - Sintesi: Analisi di quando la continua rincorsa delle ultime librerie o framework frammenta le competenze e rallenta i reali progetti in produzione.\n\n2. Robert Cecil Martin: L'uomo dietro il Clean Code\n   - Data di pubblicazione: 15 Ott, 2024\n   - Link: https://www.linkedin.com/pulse/robert-cecil-martin-luomo-dietro-il-clean-code-fabio-danubbio-azylf/\n   - Sintesi: Focus sulla scrittura di codice ordinato, leggibile, manutenibile e le buone pratiche di sviluppo.\n\n3. La \"Comparison Trap\" nello Sviluppo Software\n   - Data di pubblicazione: 20 Set, 2024\n   - Link: https://www.linkedin.com/pulse/la-comparison-trap-nello-sviluppo-software-perch%C3%A9-agli-fabio-danubbio-fd7pf/\n   - Sintesi: Le ripercussioni psicologiche e di carriera nel paragonarsi costantemente agli altri su GitHub o LinkedIn.\n\n4. La Sindrome dell'Impostore nel Mondo della Programmazione\n   - Data di pubblicazione: 30 Ago, 2024\n   - Link: https://www.linkedin.com/pulse/la-sindrome-dellimpostore-nel-mondo-della-quando-il-talento-danubbio-lwtsf/\n   - Sintesi: Perché i programmatori si sentono spesso inadeguati e come superare questa barriera psicologica.\n",

    "files.contact": "/* FOGLIO DI STILE DI CONTATTO - FABIO DANUBBIO */\n\n#profile-card {\n  fullname: \"Fabio Danubbio\";\n  title: \"Full Stack Developer\";\n  email: \"fabio.danubbio@gmail.com\";\n  phone: \"+39 340 194 9331\";\n  birthday: \"23 Aprile, 2000\";\n  location: \"Nola, Napoli, Italia\";\n}\n\n#social-networks {\n  linkedin: \"linkedin.com/in/fabio-danubbio\";\n  github: \"github.com/RonaldoCMS\";\n  instagram: \"instagram.com/fabio.danubbio\";\n}\n\n/* \n  Puoi inviare un messaggio reale compilando il modulo\n  nello schermo a destra o premendo Invia!\n*/\n.form-sender {\n  status: \"In Attesa\";\n  action: \"Compila i campi nome, email e messaggio ed invia.\";\n}\n",

    "files.sandbox": "// ==================================================================\n// Sandbox JavaScript - Fabio Danubbio\n// ==================================================================\n//\n// Scrivi qui del codice JavaScript ed esegui premendo il tasto \"Esegui\"\n// in alto a destra o digitando 'node Sandbox.js' nel terminale.\n//\n\nfunction salutaVisitatore(nome) {\n  console.log(\"Inizializzazione della sandbox...\");\n  console.log(\"Benvenuto, \" + nome + \"!\");\n  console.log(\"Stato di Fabio: Disponibile per nuovi progetti professionali.\");\n  console.log(\"Motto: 'Lento per essere veloci nei casi di urgenza.'\");\n  \n  return \"Sandbox testata ed eseguita correttamente.\";\n}\n\nsalutaVisitatore(\"Ospite Tech\");\n",

    "files.settings": "{\n  \"theme\": \"cyber-glow\",\n  \"fontSize\": \"14px\",\n  \"terminalCursor\": \"block\",\n  \"hologramEffect\": true,\n  \"language\": \"it\"\n}\n",
    "files.github": "[\n  {\n    \"info\": \"Caricamento repository in corso da api.github.com...\",\n    \"user\": \"RonaldoCMS\"\n  }\n]\n"
  },

  en: {
    // UI General Elements
    "ui.explorerTitle": "EXPLORER",
    "ui.openEditors": "OPEN EDITORS",
    "ui.ronaldocms": "RONALDO_CMS",
    "ui.terminalTitle": "Terminal",
    "ui.problemsTitle": "Problems",
    "ui.outputTitle": "Output",
    "ui.runCodeBtn": "Run",
    "ui.saveSettingsBtn": "Save",
    "ui.welcomeTab": "Welcome.txt",
    "ui.sidebarShowContacts": "Show Contacts",
    "github.desc": "Live projects fetched from my GitHub profile (@RonaldoCMS) via real-time API.",

    // Terminal Messages
    "terminal.welcome": "RONALDOCMS OPERATING SYSTEM v3.5.0-high\n(c) 2026 Fabio Danubbio. All rights reserved.\n\nType 'help' to see list of available commands.\n",
    "terminal.help": "Available commands:\n  ls               List virtual files\n  cat <file>       Print file contents (e.g. cat About_Me.md)\n  node <file>      Execute a JavaScript file (e.g. node Sandbox.js)\n  theme <name>     Change environment color theme (matrix, dracula, cyber-glow, monokai)\n  git log          Display professional journey as git commits\n  git status       Display system status info\n  clear            Clear the terminal console\n",
    "terminal.invalidCommand": "Command not found: '{cmd}'. Type 'help' for support.\n",
    "terminal.fileNotFound": "File not found: '{file}'. Type 'ls' to see available files.\n",
    "terminal.nodeExecute": "Executing '{file}' in JS Sandbox...\n",
    "terminal.themeChanged": "Theme successfully changed to: '{theme}'.\n",
    "terminal.themeNotFound": "Theme '{theme}' unrecognized. Available themes: cyber-glow, matrix, dracula, monokai.\n",
    "terminal.settingsSaved": "Settings saved and applied successfully.\n",
    "terminal.settingsError": "JSON parsing error in settings! Check your syntax.\n",

    // Virtual Files Content
    "files.welcome": "Welcome to my Web IDE!\n===========================\n\nI built this interactive template to surprise you.\nYou can explore my profile, edit files, and execute live code.\n\n💻 Use the Explorer on the left to navigate files:\n  - About_Me.md          -> About me info\n  - Tech_Stack.json       -> My developer tech stack\n  - Experience.ts        -> Education & Career details in TypeScript format\n  - Projects_Showcase.js -> Completed projects list\n  - Articles.txt         -> My technical LinkedIn articles\n  - Contact.css          -> Contact details and form mapping in CSS format\n  - Sandbox.js           -> Editable and runnable JavaScript playground!\n  - Settings.json        -> Workspace configuration (edit to change colors!)\n\n⌨️ Use the Terminal panel at the bottom to write commands.\n🔥 Edit 'Sandbox.js' and press the 'Run' button on the top right to run your code.\n",

    "files.about": "# About Me | Fabio Danubbio\n\n![Fabio Danubbio](./assets/images/my-avatar.jpg)\n\nI am a Full Stack Developer based in Nola, Naples. Passionate about modern technologies, I build scalable and high-performance applications with a clean code approach, engineering best practices, and continuous optimization.\n\n## What I Bring to Projects\n- **Frontend & Mobile**: Cross-platform development in Flutter and React/Next.js for modern web interfaces.\n- **Backend**: Scalable APIs with Node.js/Express and solid enterprise architectures with Java Spring Boot.\n- **Database**: Query optimization and complex data handling with MongoDB, PostgreSQL, and MySQL.\n- **Cloud & DevOps**: Continuous Integration / Continuous Deployment (CI/CD) pipelines, Docker, and deployments on Firebase/AWS.\n\n## My Philosophy\n> \"Slow to be fast in urgent cases.\"\nI believe in building robust and maintainable architectures to minimize technical debt and facilitate long-term business scalability.\n",

    "files.tech": "{\n  \"name\": \"Fabio Danubbio\",\n  \"role\": \"Full Stack Developer\",\n  \"skills\": {\n    \"Mobile\": [\"Flutter\", \"Dart\", \"Android SDK\", \"Swift/iOS basics\"],\n    \"Frontend\": [\"React.js\", \"Next.js\", \"JavaScript (ES6+)\", \"HTML5 & CSS3\"],\n    \"Backend\": [\"Node.js\", \"Express.js\", \"Java\", \"Spring Boot\", \"RESTful APIs\"],\n    \"Databases\": [\"MongoDB\", \"PostgreSQL\", \"MySQL\", \"MSSQL\"],\n    \"DevOps\": [\"Docker\", \"Firebase\", \"CI/CD (GitHub Actions)\", \"Git & GitFlow\"]\n  },\n  \"certifications\": [\n    \"Meta Coding Interview Preparation (2025)\",\n    \"Meta React & JavaScript Programming (2025)\",\n    \"Google Developer Program Member\",\n    \"Apple Developer Program Accredited\",\n    \"Oracle Java & Vaadin Accredited\"\n  ]\n}\n",

    "files.experience": "import { Developer, Job, Education } from './fabio-danubbio';\n\n// Professional history and education timeline\n\nconst jobs: Job[] = [\n  {\n    role: \"Full Stack Developer\",\n    company: \"PROMEDYA SRL - Partner WKI\",\n    period: \"October 2022 — Present\",\n    description: \"Development and evolution of systems integrated with the Arca Evolution ERP. Integrations in JavaScript, desktop modules, and mobile apps in Flutter.\"\n  },\n  {\n    role: \"Full Stack Developer\",\n    company: \"Accenture Italia\",\n    period: \"May 2022 — October 2022\",\n    description: \"Managed enterprise authentication and authorization on the italia.it portal using Adobe Experience Manager and Spring MVC Java microservices.\"\n  },\n  {\n    role: \"App Developer\",\n    company: \"Jotto S.r.l.\",\n    period: \"September 2021 — February 2022\",\n    description: \"Built enterprise mobile apps in Flutter integrated with smart home IoT devices via WiFi and Bluetooth BLE protocols.\"\n  }\n];\n\nconst education: Education[] = [\n  {\n    course: \"Java Enterprise & Clean Code Specialization\",\n    institute: \"Matrix Consulting / Oracle Academy\",\n    period: \"2022\",\n    details: \"Architectural design patterns, advanced OOP, and microservices.\"\n  },\n  {\n    course: \"High School Diploma in Computer Science\",\n    institute: \"I.T.C.S.G. Masullo - Theti (Nola)\",\n    period: \"2015 — 2021\",\n    score: \"96/100\"\n  }\n];\n",

    "files.projects": "// Highlighted Projects Module\n\nexport const getProjects = () => {\n  return [\n    {\n      id: 1,\n      title: \"ERP Arca Evolution (Promedya)\",\n      category: \"App Mobile\",\n      techStack: [\"Flutter\", \"Dart\", \"SQLite\", \"Node.js\"],\n      description: \"Mobile reconstruction of the Arca Evolution ERP for sales agents. Supports offline cart management and background document syncing to server.\"\n    },\n    {\n      id: 2,\n      title: \"Dhonko Travel Platform\",\n      category: \"Web Development\",\n      techStack: [\"React\", \"Node.js\", \"Express\", \"MongoDB\", \"WebSockets\"],\n      description: \"Social network for trip planning, custom itineraries, and real-time user interaction.\"\n    },\n    {\n      id: 3,\n      title: \"Smart Server API\",\n      category: \"Backend\",\n      techStack: [\"Java\", \"Spring Boot\", \"PostgreSQL\", \"Docker\", \"JWT\"],\n      description: \"Secure and robust backend enterprise layer communicating desktop ERP databases with mobile clients.\"\n    },\n    {\n      id: 4,\n      title: \"Adobe AEM Custom Auth (Accenture)\",\n      category: \"Backend\",\n      techStack: [\"Java\", \"Spring MVC\", \"Adobe AEM\", \"SPID / CIE Auth\"],\n      description: \"Development of microservices integrations for credentials verification and institutional portal security.\"\n    },\n    {\n      id: 5,\n      title: \"WiFi-BLE Domotics App (Jotto)\",\n      category: \"App Mobile\",\n      techStack: [\"Flutter\", \"Dart\", \"Bluetooth BLE\", \"WiFi Link\"],\n      description: \"Cross-platform app for remote control and local pairing of heating and appliance gateways.\"\n    }\n  ];\n};\n",

    "files.articles": "=== TECHNICAL LINKEDIN ARTICLES ===\n\n1. The \"Shiny Object\" Syndrome in Software Development\n   - Published: 25 Nov, 2024\n   - Link: https://www.linkedin.com/pulse/la-sindrome-da-shiny-object-nello-sviluppo-software-quando-danubbio-tw81f/\n   - Summary: An analysis of how chasing new framework trends can slow down real production-grade progress.\n\n2. Robert Cecil Martin: The Man Behind Clean Code\n   - Published: 15 Oct, 2024\n   - Link: https://www.linkedin.com/pulse/robert-cecil-martin-luomo-dietro-il-clean-code-fabio-danubbio-azylf/\n   - Summary: In-depth focus on clean, readable, and maintainable software practices as outlined by Uncle Bob.\n\n3. The \"Comparison Trap\" in Software Development\n   - Published: 20 Set, 2024\n   - Link: https://www.linkedin.com/pulse/la-comparison-trap-nello-sviluppo-software-perch%C3%A9-agli-fabio-danubbio-fd7pf/\n   - Summary: Psychological impacts of comparing oneself constantly to profiles on GitHub or LinkedIn.\n\n4. Impostor Syndrome in Programming\n   - Published: 30 Ago, 2024\n   - Link: https://www.linkedin.com/pulse/la-sindrome-dellimpostore-nel-mondo-della-quando-il-talento-danubbio-lwtsf/\n   - Summary: Exploring why developers frequently doubt their talents and strategies to overcome it.\n",

    "files.contact": "/* CONTACT STYLESHEET - FABIO DANUBBIO */\n\n#profile-card {\n  fullname: \"Fabio Danubbio\";\n  title: \"Full Stack Developer\";\n  email: \"fabio.danubbio@gmail.com\";\n  phone: \"+39 340 194 9331\";\n  birthday: \"April 23, 2000\";\n  location: \"Nola, Naples, Italy\";\n}\n\n#social-networks {\n  linkedin: \"linkedin.com/in/fabio-danubbio\";\n  github: \"github.com/RonaldoCMS\";\n  instagram: \"instagram.com/fabio.danubbio\";\n}\n\n/*\n  You can send a real message by filling in the fields\n  in the contact panel on the screen and clicking Send!\n*/\n.form-sender {\n  status: \"Idle\";\n  action: \"Fill in the name, email, and message inputs to send.\";\n}\n",

    "files.sandbox": "// ==================================================================\n// JavaScript Sandbox - Fabio Danubbio\n// ==================================================================\n//\n// Write JavaScript code here and run it by clicking the \"Run\" button\n// on the top right, or typing 'node Sandbox.js' in the terminal.\n//\n\nfunction greetVisitor(name) {\n  console.log(\"Initializing sandbox execution...\");\n  console.log(\"Hello, \" + name + \"!\");\n  console.log(\"Fabio's Status: Open to interesting career opportunities.\");\n  console.log(\"Motto: 'Slow to be fast in urgent cases.'\");\n  \n  return \"Sandbox successfully run.\";\n}\n\ngreetVisitor(\"Tech Guest\");\n",

    "files.settings": "{\n  \"theme\": \"cyber-glow\",\n  \"fontSize\": \"14px\",\n  \"terminalCursor\": \"block\",\n  \"hologramEffect\": true,\n  \"language\": \"en\"\n}\n",
    "files.github": "[\n  {\n    \"info\": \"Fetching live repositories from api.github.com...\",\n    \"user\": \"RonaldoCMS\"\n  }\n]\n"
  }
};


// ============================================
// I18N ENGINE
// ============================================

class I18nManager {
  constructor() {
    this.currentLang = localStorage.getItem('fabio-lang') || 'it';
    this.init();
  }

  init() {
    // Apply language setting
    this.applyLanguage(this.currentLang);
  }

  toggle() {
    this.currentLang = this.currentLang === 'it' ? 'en' : 'it';
    localStorage.setItem('fabio-lang', this.currentLang);
    this.applyLanguage(this.currentLang);
    
    // Dispatch custom event to notify script.js to refresh active tab file contents
    const event = new CustomEvent('languageChanged', { detail: { lang: this.currentLang } });
    window.dispatchEvent(event);
  }

  applyLanguage(lang) {
    this.currentLang = lang;
    const dict = translations[lang];
    if (!dict) return;

    // Standard translation mappings
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) {
        el.placeholder = dict[key];
      }
    });

    // Update html lang tag
    document.documentElement.lang = this.currentLang;
  }
}

// Instantiate globally
window.i18nManager = new I18nManager();
window.translations = translations;
