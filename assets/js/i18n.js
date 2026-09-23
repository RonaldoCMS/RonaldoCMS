'use strict';

/* ==========================================================================
   i18n — dizionario IT / EN e motore di traduzione
   Uso nell'HTML:
     data-i18n="chiave"              → textContent
     data-i18n-html="chiave"         → innerHTML (solo per stringhe nostre)
     data-i18n-attr="attr:chiave|…"  → attributi (aria-label, placeholder…)
   ========================================================================== */

(function () {
  const dict = {
    /* ------------------------------------------------------------------ */
    it: {
      'meta.title': 'Fabio Danubbio — Full Stack Developer',
      'meta.description': 'Fabio Danubbio, Full Stack Developer a Nola (Napoli). App mobile in Flutter, piattaforme web in React e Node.js, backend enterprise in Java Spring Boot.',

      'ui.skip': 'Vai al contenuto',
      'ui.navLabel': 'Navigazione principale',
      'ui.langLabel': 'Lingua',
      'ui.themeToggle': 'Cambia tema',
      'ui.themeLight': 'Passa al tema chiaro',
      'ui.themeDark': 'Passa al tema scuro',
      'ui.menuToggle': 'Apri menu',
      'ui.close': 'Chiudi',
      'ui.command': 'Comando',

      'nav.about': 'Chi sono',
      'nav.skills': 'Competenze',
      'nav.experience': 'Percorso',
      'nav.projects': 'Progetti',
      'nav.articles': 'Articoli',
      'nav.contact': 'Contatti',

      'hero.eyebrow': '// full stack developer · Nola, Italia',
      'hero.title': 'Ciao, sono <span class="accent">Fabio</span>.<br />Costruisco software che dura.',
      'hero.lead': 'Sviluppatore full stack: progetto e realizzo app mobile, piattaforme web e sistemi backend per aziende che hanno bisogno di strumenti solidi, chiari e facili da far crescere.',
      'hero.cta1': 'Guarda i progetti',
      'hero.cta2': 'Scrivimi',
      'hero.status': 'Disponibile per nuovi progetti',
      'hero.codeMotto': '"lento per essere veloci"',
      'hero.techLabel': 'ogni giorno lavoro con →',

      'about.eyebrow': '01 · chi sono',
      'about.title': 'Tradurre problemi reali in software chiaro e manutenibile.',
      'about.p1': "Sono <strong>Fabio Danubbio</strong>, Full Stack Developer con base a Nola, in provincia di Napoli. Lavoro su tutta l'architettura di un'applicazione: dal modello dei dati alla sicurezza, dalle API fino all'interfaccia che le persone usano davvero.",
      'about.p2': "Negli ultimi anni ho costruito app mobile per agenti di vendita collegate a gestionali ERP, un layer di sicurezza per il portale italia.it e app di domotica che dialogano con l'hardware via WiFi e Bluetooth. Mi piacciono i progetti in cui la tecnologia deve semplificare il lavoro di qualcuno.",
      'about.p3': 'Fuori dal codice: palestra, chitarra (sto imparando), cinema, teatro e almeno un viaggio al mese verso un posto nuovo.',
      'about.factNow': 'oggi',
      'about.fact1': 'sviluppo professionale',
      'about.fact2': 'Italia, anche da remoto',
      'about.fact3': 'lingue di lavoro',
      'about.quoteLabel': '// la mia filosofia',
      'about.quote': '"Lento per essere veloci nei casi di urgenza."',
      'about.quoteDesc': "Progettare bene all'inizio significa meno debito tecnico dopo e un sistema che può crescere insieme all'azienda.",
      'about.s1.title': 'Frontend & Mobile',
      'about.s1.text': 'App cross-platform in Flutter e interfacce web con React e Next.js, con gestione dello stato e design pattern solidi.',
      'about.s2.title': 'Backend & API',
      'about.s2.text': 'API scalabili con Node.js ed Express e soluzioni enterprise con Java Spring Boot: architetture robuste e manutenibili.',
      'about.s3.title': 'Database & Sicurezza',
      'about.s3.text': 'MongoDB, PostgreSQL, MySQL e MSSQL con query ottimizzate, autenticazione JWT/OAuth2 e comunicazione in tempo reale via WebSocket.',
      'about.s4.title': 'Cloud & DevOps',
      'about.s4.text': 'Firebase, Docker e pipeline CI/CD, con workflow Git e metodologie Agile per deploy automatizzati e monitorati.',

      'skills.eyebrow': '02 · competenze',
      'skills.title': 'Gli strumenti che uso davvero.',
      'skills.intro': 'Le tecnologie con cui lavoro in produzione, raggruppate per area. Quelle evidenziate sono il mio nucleo quotidiano.',
      'skills.c1': 'Mobile',
      'skills.c2': 'Frontend',
      'skills.c3': 'Backend',
      'skills.c4': 'Database',
      'skills.c5': 'Cloud & DevOps',
      'skills.ios': 'iOS (basi)',
      'skills.legendChip': 'esempio',
      'skills.legend': '= uso quotidiano in produzione',

      'exp.eyebrow': '03 · percorso',
      'exp.title': 'Dove ho lavorato e cosa ho costruito.',
      'exp.jobs': 'Esperienza',
      'exp.now': 'in corso',
      'exp.j1.period': 'ott 2022 — oggi',
      'exp.j1.text': 'Sviluppo ed evoluzione di soluzioni collegate al gestionale ERP Arca Evolution: integrazioni JavaScript, moduli desktop e app mobile cross-platform in Flutter per agenti di vendita e reparti di produzione.',
      'exp.j2.period': 'mag 2022 — ott 2022',
      'exp.j2.text': 'Autenticazione e autorizzazione enterprise sul portale italia.it con Adobe Experience Manager e microservizi Java Spring MVC: filtri di sicurezza e mascheramento degli URI verso il backend.',
      'exp.j3.period': 'set 2021 — feb 2022',
      'exp.j3.text': 'App mobile aziendali in Flutter integrate con hardware di domotica tramite WiFi e Bluetooth BLE, pubblicate su Google Play e App Store (Jotto+).',
      'exp.edu': 'Formazione',
      'exp.e1.title': 'Corso specialistico Java Enterprise & Clean Code',
      'exp.e1.school': 'Matrix Consulting / Oracle Academy',
      'exp.e1.text': 'pattern architetturali, OOP avanzata e microservizi.',
      'exp.e2.title': 'Diploma di Perito Informatico · 96/100',
      'exp.certs': 'Certificazioni e programmi',

      'projects.eyebrow': '04 · progetti',
      'projects.title': 'Una selezione di lavori.',
      'projects.intro': 'Progetti realizzati per aziende e clienti, tra app mobile, piattaforme web e sistemi backend.',
      'projects.filterLabel': 'Filtra progetti',
      'projects.fAll': 'Tutti',
      'projects.fMobile': 'App mobile',
      'projects.fWeb': 'Web',
      'projects.fBackend': 'Backend',
      'projects.catMobile': 'app mobile',
      'projects.catBackend': 'backend',
      'projects.p1.ctx': 'Promedya · 2022 — oggi',
      'projects.p1.text': 'Client mobile per agenti di vendita collegato al gestionale Arca Evolution: clienti, listini e documenti anche offline, carrello e sincronizzazione automatica dei preventivi verso il gestionale.',
      'projects.p2.ctx': 'Promedya · sistema enterprise',
      'projects.p2.text': 'Backend enterprise sicuro e a bassa latenza che espone i dati del gestionale ai client mobili fuori dalla rete aziendale, con autenticazione JWT e deploy in container.',
      'projects.p3.ctx': 'Progetto personale · in sviluppo',
      'projects.p3.text': "Social network per pianificare viaggi: crei l'itinerario, inviti gli amici e interagisci in tempo reale con i partecipanti.",
      'projects.p4.ctx': 'Accenture · italia.it',
      'projects.p4.title': 'Layer di sicurezza SPID / CIE',
      'projects.p4.text': "Filtri di sicurezza e mascheramento degli URI per l'integrazione del login SPID/CIE sul portale istituzionale, su Adobe Experience Manager e Spring MVC.",
      'projects.p5.ctx': 'Jotto S.r.l. · Google Play & App Store',
      'projects.p5.text': 'App di domotica per configurare e controllare gateway di riscaldamento ed elettrodomestici, in locale via Bluetooth BLE e WiFi.',
      'projects.p6.ctx': 'Integrazione cloud · notifiche push',
      'projects.p6.text': 'Database in tempo reale e invio massivo di notifiche push con Firebase Cloud Messaging, integrato con un backend Node.js.',

      'articles.eyebrow': '05 · articoli',
      'articles.title': 'Scrivo di software, ma soprattutto di chi lo scrive.',
      'articles.intro': 'Riflessioni pubblicate su LinkedIn su carriera, mentalità e buone pratiche nello sviluppo.',
      'articles.read': 'Leggi su LinkedIn',
      'articles.a1.date': '25 nov 2024',
      'articles.a1.title': 'La sindrome da "Shiny Object" nello sviluppo software',
      'articles.a1.text': "Quando la rincorsa continua all'ultima libreria o framework frammenta le competenze e rallenta i progetti reali in produzione.",
      'articles.a2.date': '15 ott 2024',
      'articles.a2.title': "Robert Cecil Martin: l'uomo dietro il Clean Code",
      'articles.a2.text': 'Scrivere codice ordinato, leggibile e manutenibile: le buone pratiche di sviluppo raccontate attraverso chi le ha rese celebri.',
      'articles.a3.date': '20 set 2024',
      'articles.a3.title': 'La "Comparison Trap" nello sviluppo software',
      'articles.a3.text': 'Le ripercussioni psicologiche e di carriera del paragonarsi costantemente agli altri su GitHub o LinkedIn.',
      'articles.a4.date': '30 ago 2024',
      'articles.a4.title': "La sindrome dell'impostore nel mondo della programmazione",
      'articles.a4.text': 'Perché chi programma si sente spesso inadeguato e come superare questa barriera psicologica.',

      'github.eyebrow': '06 · open source',
      'github.title': 'Dal mio GitHub.',
      'github.intro': 'Gli ultimi repository aggiornati sul mio profilo, caricati in tempo reale.',
      'github.profile': 'Vai al profilo',
      'github.loading': 'Carico i repository…',
      'github.error': 'Non riesco a caricare i repository in questo momento.',
      'github.empty': 'Nessun repository pubblico da mostrare.',
      'github.updated': 'aggiornato',
      'github.noDesc': 'Nessuna descrizione.',

      'contact.eyebrow': '07 · contatti',
      'contact.title': 'Parliamone.',
      'contact.intro': "Hai un'idea, un progetto o una posizione aperta? Scrivimi una mail o usa il modulo qui accanto.",
      'contact.phone': 'Telefono',
      'contact.where': 'Dove sono',
      'contact.location': 'Nola (Napoli), Italia',
      'contact.social': 'Social',
      'contact.formTitle': 'Inviami un messaggio',
      'contact.name': 'Nome',
      'contact.message': 'Messaggio',
      'contact.send': 'Invia',
      'contact.sending': 'Invio in corso…',
      'contact.success': 'Messaggio inviato, grazie! Ti rispondo al più presto.',
      'contact.error': 'Qualcosa è andato storto. Scrivimi direttamente a fabio.danubbio@gmail.com.',
      'contact.missing': 'Compila tutti i campi con un indirizzo email valido.',
      'contact.mailto': 'Sto aprendo il tuo client di posta con il messaggio pronto.',
      'contact.mailSubject': 'Contatto dal sito — {name}',
      'contact.note': '// si aprirà il tuo client di posta con il messaggio già pronto',
      'contact.noteEndpoint': '// il messaggio arriva direttamente nella mia casella',

      'footer.tag': 'Full Stack Developer · Nola, Italia',
      'footer.rights': 'tutti i diritti riservati',
      'footer.built': '// fatto a mano con HTML, CSS e JavaScript',
      'footer.terminal': 'terminale',
      'footer.top': 'Torna su',

      'term.welcome': "ronaldocms · portfolio v4\nDigita 'help' per vedere i comandi. Esc per chiudere.",
      'term.help': "comandi disponibili:\n  about        chi sono in due righe\n  skills       le tecnologie che uso\n  projects     i progetti in evidenza\n  contact      come contattarmi\n  ls           elenca le sezioni del sito\n  go <sezione> vai a una sezione (es. go projects)\n  theme <light|dark>   cambia tema\n  lang <it|en>         cambia lingua\n  clear        pulisce lo schermo\n  exit         chiude il terminale",
      'term.about': "Fabio Danubbio — Full Stack Developer, Nola (NA).\nApp mobile in Flutter, web in React/Node.js, backend in Java Spring Boot.\nMotto: lento per essere veloci nei casi di urgenza.",
      'term.skills': 'Flutter · Dart · React · Next.js · JavaScript · Node.js · Express · Java · Spring Boot · PostgreSQL · MongoDB · MySQL · MSSQL · Docker · Firebase · Git',
      'term.projects': '1. Smart Agent · ERP Arca Evolution (Flutter)\n2. Smart Server API (Spring Boot)\n3. Dhonko (React + Node.js)\n4. Layer di sicurezza SPID/CIE · italia.it (AEM + Spring MVC)\n5. Jotto+ (Flutter, BLE/WiFi)\n6. Firebase Cloud Integration (Node.js)',
      'term.contact': 'email    fabio.danubbio@gmail.com\ntel      +39 340 194 9331\ngithub   github.com/RonaldoCMS\nlinkedin linkedin.com/in/fabio-danubbio-52149219a',
      'term.going': 'vado a #{id}…',
      'term.noSection': "sezione '{id}' non trovata. Prova 'ls'.",
      'term.theme': "tema impostato su '{theme}'.",
      'term.themeUsage': 'uso: theme <light|dark>',
      'term.lang': "lingua impostata su '{lang}'.",
      'term.langUsage': 'uso: lang <it|en>',
      'term.unknown': "comando non trovato: '{cmd}'. Prova 'help'.",
      'term.sudo': 'bel tentativo. qui comando io :)'
    },

    /* ------------------------------------------------------------------ */
    en: {
      'meta.title': 'Fabio Danubbio — Full Stack Developer',
      'meta.description': 'Fabio Danubbio, Full Stack Developer based in Nola (Naples, Italy). Mobile apps in Flutter, web platforms in React and Node.js, enterprise backends in Java Spring Boot.',

      'ui.skip': 'Skip to content',
      'ui.navLabel': 'Main navigation',
      'ui.langLabel': 'Language',
      'ui.themeToggle': 'Toggle theme',
      'ui.themeLight': 'Switch to light theme',
      'ui.themeDark': 'Switch to dark theme',
      'ui.menuToggle': 'Open menu',
      'ui.close': 'Close',
      'ui.command': 'Command',

      'nav.about': 'About',
      'nav.skills': 'Skills',
      'nav.experience': 'Journey',
      'nav.projects': 'Projects',
      'nav.articles': 'Writing',
      'nav.contact': 'Contact',

      'hero.eyebrow': '// full stack developer · Nola, Italy',
      'hero.title': "Hi, I'm <span class=\"accent\">Fabio</span>.<br />I build software that lasts.",
      'hero.lead': 'Full stack developer: I design and build mobile apps, web platforms and backend systems for companies that need tools that are solid, clear and easy to grow.',
      'hero.cta1': 'See my projects',
      'hero.cta2': 'Get in touch',
      'hero.status': 'Open to new projects',
      'hero.codeMotto': '"slow, to be fast when it counts"',
      'hero.techLabel': 'every day I work with →',

      'about.eyebrow': '01 · about me',
      'about.title': 'Turning real problems into clear, maintainable software.',
      'about.p1': "I'm <strong>Fabio Danubbio</strong>, a Full Stack Developer based in Nola, near Naples. I work across the whole architecture of an application: from the data model to security, from the APIs to the interface people actually use.",
      'about.p2': "Over the last few years I've built mobile apps for sales agents connected to ERP systems, a security layer for the italia.it government portal and home-automation apps that talk to hardware over WiFi and Bluetooth. I like projects where technology has to make someone's job simpler.",
      'about.p3': 'Away from the keyboard: gym, guitar (still learning), cinema, theatre and at least one trip a month somewhere new.',
      'about.factNow': 'today',
      'about.fact1': 'professional development',
      'about.fact2': 'Italy, remote-friendly',
      'about.fact3': 'working languages',
      'about.quoteLabel': '// my philosophy',
      'about.quote': '"Slow, so we can be fast when it\'s urgent."',
      'about.quoteDesc': 'Designing well up front means less technical debt later and a system that can grow together with the business.',
      'about.s1.title': 'Frontend & Mobile',
      'about.s1.text': 'Cross-platform apps in Flutter and web interfaces with React and Next.js, with solid state management and design patterns.',
      'about.s2.title': 'Backend & APIs',
      'about.s2.text': 'Scalable APIs with Node.js and Express and enterprise solutions with Java Spring Boot: robust, maintainable architectures.',
      'about.s3.title': 'Databases & Security',
      'about.s3.text': 'MongoDB, PostgreSQL, MySQL and MSSQL with optimised queries, JWT/OAuth2 authentication and real-time communication over WebSocket.',
      'about.s4.title': 'Cloud & DevOps',
      'about.s4.text': 'Firebase, Docker and CI/CD pipelines, with Git workflows and Agile methods for automated, monitored deployments.',

      'skills.eyebrow': '02 · skills',
      'skills.title': 'The tools I actually use.',
      'skills.intro': 'The technologies I work with in production, grouped by area. The highlighted ones are my daily core.',
      'skills.c1': 'Mobile',
      'skills.c2': 'Frontend',
      'skills.c3': 'Backend',
      'skills.c4': 'Databases',
      'skills.c5': 'Cloud & DevOps',
      'skills.ios': 'iOS (basics)',
      'skills.legendChip': 'example',
      'skills.legend': '= daily use in production',

      'exp.eyebrow': '03 · journey',
      'exp.title': "Where I've worked and what I've built.",
      'exp.jobs': 'Experience',
      'exp.now': 'current',
      'exp.j1.period': 'Oct 2022 — present',
      'exp.j1.text': 'Development and evolution of solutions connected to the Arca Evolution ERP: JavaScript integrations, desktop modules and cross-platform Flutter mobile apps for sales agents and production departments.',
      'exp.j2.period': 'May 2022 — Oct 2022',
      'exp.j2.text': 'Enterprise authentication and authorisation on the italia.it portal with Adobe Experience Manager and Java Spring MVC microservices: security filters and URI masking towards the backend.',
      'exp.j3.period': 'Sep 2021 — Feb 2022',
      'exp.j3.text': 'Business mobile apps in Flutter integrated with home-automation hardware over WiFi and Bluetooth BLE, published on Google Play and the App Store (Jotto+).',
      'exp.edu': 'Education',
      'exp.e1.title': 'Java Enterprise & Clean Code specialisation',
      'exp.e1.school': 'Matrix Consulting / Oracle Academy',
      'exp.e1.text': 'architectural patterns, advanced OOP and microservices.',
      'exp.e2.title': 'High-school diploma in Computer Science · 96/100',
      'exp.certs': 'Certifications & programs',

      'projects.eyebrow': '04 · projects',
      'projects.title': 'A selection of work.',
      'projects.intro': 'Projects built for companies and clients, across mobile apps, web platforms and backend systems.',
      'projects.filterLabel': 'Filter projects',
      'projects.fAll': 'All',
      'projects.fMobile': 'Mobile apps',
      'projects.fWeb': 'Web',
      'projects.fBackend': 'Backend',
      'projects.catMobile': 'mobile app',
      'projects.catBackend': 'backend',
      'projects.p1.ctx': 'Promedya · 2022 — present',
      'projects.p1.text': 'Mobile client for sales agents connected to the Arca Evolution ERP: customers, price lists and documents also offline, cart and automatic syncing of quotes back to the ERP.',
      'projects.p2.ctx': 'Promedya · enterprise system',
      'projects.p2.text': "Secure, low-latency enterprise backend exposing the ERP's data to mobile clients outside the company network, with JWT authentication and container deployment.",
      'projects.p3.ctx': 'Side project · in progress',
      'projects.p3.text': 'Social network for planning trips: create the itinerary, invite friends and interact in real time with the participants.',
      'projects.p4.ctx': 'Accenture · italia.it',
      'projects.p4.title': 'SPID / CIE security layer',
      'projects.p4.text': 'Security filters and URI masking for the SPID/CIE login integration on the Italian government portal, on Adobe Experience Manager and Spring MVC.',
      'projects.p5.ctx': 'Jotto S.r.l. · Google Play & App Store',
      'projects.p5.text': 'Home-automation app to set up and control heating and appliance gateways locally over Bluetooth BLE and WiFi.',
      'projects.p6.ctx': 'Cloud integration · push notifications',
      'projects.p6.text': 'Real-time database and bulk push notifications with Firebase Cloud Messaging, integrated with a Node.js backend.',

      'articles.eyebrow': '05 · writing',
      'articles.title': 'I write about software, but mostly about the people who write it.',
      'articles.intro': 'Pieces published on LinkedIn about careers, mindset and good practice in software development.',
      'articles.read': 'Read on LinkedIn',
      'articles.a1.date': '25 Nov 2024',
      'articles.a1.title': 'The "Shiny Object" syndrome in software development',
      'articles.a1.text': 'When constantly chasing the latest library or framework fragments your skills and slows down real projects in production. (Italian)',
      'articles.a2.date': '15 Oct 2024',
      'articles.a2.title': 'Robert Cecil Martin: the man behind Clean Code',
      'articles.a2.text': 'Writing tidy, readable, maintainable code: good development practice told through the person who made it famous. (Italian)',
      'articles.a3.date': '20 Sep 2024',
      'articles.a3.title': 'The "Comparison Trap" in software development',
      'articles.a3.text': 'The psychological and career impact of constantly comparing yourself to others on GitHub or LinkedIn. (Italian)',
      'articles.a4.date': '30 Aug 2024',
      'articles.a4.title': 'Impostor syndrome in the world of programming',
      'articles.a4.text': 'Why developers so often feel inadequate, and how to get past that mental barrier. (Italian)',

      'github.eyebrow': '06 · open source',
      'github.title': 'From my GitHub.',
      'github.intro': 'The latest updated repositories on my profile, loaded live.',
      'github.profile': 'Go to profile',
      'github.loading': 'Loading repositories…',
      'github.error': "I can't load the repositories right now.",
      'github.empty': 'No public repositories to show.',
      'github.updated': 'updated',
      'github.noDesc': 'No description.',

      'contact.eyebrow': '07 · contact',
      'contact.title': "Let's talk.",
      'contact.intro': 'Got an idea, a project or an open role? Send me an email or use the form.',
      'contact.phone': 'Phone',
      'contact.where': 'Where I am',
      'contact.location': 'Nola (Naples), Italy',
      'contact.social': 'Social',
      'contact.formTitle': 'Send me a message',
      'contact.name': 'Name',
      'contact.message': 'Message',
      'contact.send': 'Send',
      'contact.sending': 'Sending…',
      'contact.success': "Message sent, thank you! I'll get back to you soon.",
      'contact.error': 'Something went wrong. Email me directly at fabio.danubbio@gmail.com.',
      'contact.missing': 'Please fill in every field with a valid email address.',
      'contact.mailto': 'Opening your email app with the message ready to send.',
      'contact.mailSubject': 'Contact from the website — {name}',
      'contact.note': '// your email app will open with the message ready to send',
      'contact.noteEndpoint': '// the message lands straight in my inbox',

      'footer.tag': 'Full Stack Developer · Nola, Italy',
      'footer.rights': 'all rights reserved',
      'footer.built': '// handmade with HTML, CSS and JavaScript',
      'footer.terminal': 'terminal',
      'footer.top': 'Back to top',

      'term.welcome': "ronaldocms · portfolio v4\nType 'help' to list commands. Esc to close.",
      'term.help': 'available commands:\n  about        who I am in two lines\n  skills       the technologies I use\n  projects     featured projects\n  contact      how to reach me\n  ls           list the site sections\n  go <section> jump to a section (e.g. go projects)\n  theme <light|dark>   switch theme\n  lang <it|en>         switch language\n  clear        clear the screen\n  exit         close the terminal',
      'term.about': 'Fabio Danubbio — Full Stack Developer, Nola (Italy).\nMobile apps in Flutter, web in React/Node.js, backends in Java Spring Boot.\nMotto: slow, so we can be fast when it counts.',
      'term.skills': 'Flutter · Dart · React · Next.js · JavaScript · Node.js · Express · Java · Spring Boot · PostgreSQL · MongoDB · MySQL · MSSQL · Docker · Firebase · Git',
      'term.projects': '1. Smart Agent · ERP Arca Evolution (Flutter)\n2. Smart Server API (Spring Boot)\n3. Dhonko (React + Node.js)\n4. SPID/CIE security layer · italia.it (AEM + Spring MVC)\n5. Jotto+ (Flutter, BLE/WiFi)\n6. Firebase Cloud Integration (Node.js)',
      'term.contact': 'email    fabio.danubbio@gmail.com\nphone    +39 340 194 9331\ngithub   github.com/RonaldoCMS\nlinkedin linkedin.com/in/fabio-danubbio-52149219a',
      'term.going': 'jumping to #{id}…',
      'term.noSection': "section '{id}' not found. Try 'ls'.",
      'term.theme': "theme set to '{theme}'.",
      'term.themeUsage': 'usage: theme <light|dark>',
      'term.lang': "language set to '{lang}'.",
      'term.langUsage': 'usage: lang <it|en>',
      'term.unknown': "command not found: '{cmd}'. Try 'help'.",
      'term.sudo': "nice try. I'm the one in charge here :)"
    }
  };

  /* Lingua iniziale: scelta salvata, altrimenti quella del browser */
  function detect() {
    try {
      const saved = localStorage.getItem('fd-lang');
      if (saved === 'it' || saved === 'en') return saved;
    } catch (e) { /* storage non disponibile */ }
    const nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    return nav.indexOf('it') === 0 ? 'it' : 'en';
  }

  const i18n = {
    lang: detect(),

    /* Traduce una chiave, con segnaposto {nome} opzionali */
    t: function (key, vars) {
      const table = dict[this.lang] || dict.it;
      let s = table[key];
      if (s === undefined) s = dict.it[key];
      if (s === undefined) return key;
      if (vars) {
        Object.keys(vars).forEach(function (k) {
          s = s.split('{' + k + '}').join(String(vars[k]));
        });
      }
      return s;
    },

    /* Applica la lingua corrente a tutto il documento */
    apply: function () {
      const table = dict[this.lang];
      if (!table) return;
      document.documentElement.lang = this.lang;

      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        const v = table[el.getAttribute('data-i18n')];
        if (v !== undefined) el.textContent = v;
      });

      document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
        const v = table[el.getAttribute('data-i18n-html')];
        if (v !== undefined) el.innerHTML = v;
      });

      document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
        el.getAttribute('data-i18n-attr').split('|').forEach(function (pair) {
          const idx = pair.indexOf(':');
          if (idx < 0) return;
          const attr = pair.slice(0, idx).trim();
          const v = table[pair.slice(idx + 1).trim()];
          if (v !== undefined) el.setAttribute(attr, v);
        });
      });

      document.querySelectorAll('.lang-switch button').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === i18n.lang));
      });

      if (table['meta.title']) document.title = table['meta.title'];
      const desc = document.querySelector('meta[name="description"]');
      if (desc && table['meta.description']) desc.setAttribute('content', table['meta.description']);
    },

    /* Cambia lingua, salva la scelta e avvisa il resto della pagina */
    set: function (lang) {
      if (!dict[lang] || lang === this.lang) return;
      this.lang = lang;
      try { localStorage.setItem('fd-lang', lang); } catch (e) { /* ignora */ }
      this.apply();
      window.dispatchEvent(new CustomEvent('fd:langchange', { detail: { lang: lang } }));
    }
  };

  window.i18n = i18n;
  i18n.apply();
})();
