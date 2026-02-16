'use strict';

// ============================================
// INTERNATIONALIZATION (i18n) SYSTEM
// ============================================

const translations = {
  it: {
    // Sidebar
    "sidebar.showContacts": "Mostra Contatti",
    "sidebar.email": "Email",
    "sidebar.phone": "Telefono",
    "sidebar.birthday": "Compleanno",
    "sidebar.birthdayDate": "23 Aprile, 2000",
    "sidebar.location": "Località",

    // Navbar
    "nav.about": "Chi Sono",
    "nav.resume": "Curriculum",
    "nav.blog": "Blog",
    "nav.contact": "Contatti",

    // About
    "about.title": "Chi sono",
    "about.text1": "Sono Fabio Danubbio, Full Stack Developer con sede a Nola, Napoli. Appassionato di tecnologie moderne, sviluppo applicazioni scalabili e performanti con un approccio orientato al clean code, alle best practice ingegneristiche e all'ottimizzazione continua.",
    "about.text2": "Negli ultimi anni ho lavorato su progetti che spaziano da app mobile cross-platform in Flutter, a backend complessi con Node.js ed Express, fino a soluzioni enterprise con Java e Spring Boot. Mi piace progettare architetture robuste, ottimizzare le performance e costruire esperienze utente fluide con mentalità Agile & DevOps.",
    "about.text3": "La mia formazione continua include certificazioni recenti Meta (2025) in React, JavaScript e Frontend Development, oltre a credenziali Google Developer Program, Apple Developer e Oracle Java. Sono curioso, in costante evoluzione e credo che la tecnologia sia un mezzo per costruire soluzioni concrete ai problemi reali.",
    "about.text4": "La mia filosofia è sempre orientata alla qualità del codice, sicurezza e scalabilità delle applicazioni, seguendo i principi del Clean Code e delle best practice ingegneristiche moderne.",

    // Services
    "service.title": "Cosa porto nei progetti",
    "service.1.title": "Frontend & Mobile",
    "service.1.text": "🔹 Flutter per app cross-platform performanti<br>🔹 React e Next.js per interfacce moderne<br>🔹 Gestione avanzata dello stato e design pattern solidi",
    "service.2.title": "Backend Development",
    "service.2.text": "🔹 Node.js, Express per API scalabili<br>🔹 Java Spring Boot per soluzioni enterprise<br>🔹 Architetture robuste e manutenibili",
    "service.3.title": "Database & Performance",
    "service.3.text": "🔹 MongoDB, PostgreSQL, MySQL, MSSQL<br>🔹 Query ottimizzate e performance tuning<br>🔹 Sicurezza avanzata (JWT, OAuth2, WebSocket)",
    "service.4.title": "Cloud & DevOps",
    "service.4.text": "🔹 Firebase, Docker, CI/CD pipeline<br>🔹 Git workflow e metodologie Agile<br>🔹 Deployment automatizzato e monitoraggio",

    // Resume
    "resume.title": "Curriculum",
    "resume.education": "Formazione",
    "resume.edu1.title": "Corso Full Stack Developer",
    "resume.edu1.date": "2018 — 2022",
    "resume.edu1.text": "Formazione completa su tecnologie moderne per lo sviluppo web e mobile, con focus su JavaScript, Python, database e metodologie agili.",
    "resume.edu2.title": "I.T.C.S.G. Masullo - Theti",
    "resume.edu2.date": "2015 — 2021",
    "resume.edu2.text": "Perito Informatico con votazione 96/100. Formazione tecnica approfondita in programmazione, reti, database e sistemi informatici.",

    // Certifications
    "resume.certs": "Certificazioni e Licenze",
    "resume.cert1.title": "Meta - Coding Interview Preparation",
    "resume.cert1.date": "Maggio 2025",
    "resume.cert1.text": "Certificazione Meta per preparazione ai colloqui tecnici. ID: TIS0YZD5UEY0",
    "resume.cert2.title": "Meta - React Fundamentals & JavaScript Programming",
    "resume.cert2.date": "Aprile - Maggio 2025",
    "resume.cert2.text": "Certificazioni Meta in React (ID: 2DG6BU3W0Q5A) e JavaScript Programming (ID: LSS9IL5F1INI). Competenze avanzate in sviluppo frontend moderno.",
    "resume.cert3.title": "Meta - Frontend Development & Version Control",
    "resume.cert3.date": "Marzo 2025",
    "resume.cert3.text": "Introduction to Front-End Development (ID: PP1IISC3WJDH) e Version Control (ID: 6KQB1JPT6ZFX). Metodologie di sviluppo e controllo versione.",
    "resume.cert4.title": "Google Developer Program",
    "resume.cert4.date": "Settembre 2021",
    "resume.cert4.text": "Membro del Google Developer Program con competenze in Android, Flutter e Angular. Accesso a risorse avanzate e community Google.",
    "resume.cert5.title": "Apple Developer Program",
    "resume.cert5.date": "Gennaio 2024 - Gennaio 2025",
    "resume.cert5.text": "Sviluppatore certificato Apple con competenze in Flutter e Swift per iOS. Abilitazione alla pubblicazione su App Store.",
    "resume.cert6.title": "Oracle Java & Vaadin Certification",
    "resume.cert6.date": "2017 - 2024",
    "resume.cert6.text": "Certificazioni Oracle Java (2017) e Vaadin (2024). Competenze enterprise in Java, Kotlin, Android e framework moderni.",

    // Courses
    "resume.courses": "Corsi Specialistici",
    "resume.course1.title": "Flutter & Dart - Complete Guide [2023 Edition]",
    "resume.course1.date": "Settembre 2022",
    "resume.course1.text": "Corso avanzato Udemy su Flutter e Dart con focus su design pattern, architetture scalabili e best practice per app mobile moderne.",
    "resume.course2.title": "Java Full Stack Course - Matrix Consulting",
    "resume.course2.date": "Aprile - Maggio 2022",
    "resume.course2.text": "Corso specialistico Java enterprise durante la collaborazione con Matrix, con approfondimenti su Spring Boot e architetture microservizi.",
    "resume.course3.title": "Corso Java EE & Clean Code Principles",
    "resume.course3.date": "2020",
    "resume.course3.text": "Formazione avanzata in Java EE, HTML5, CSS, Linux e principi di Clean Code. Influenzato dai principi di Robert C. Martin (Uncle Bob).",
    "resume.course4.title": "ICDL - Patente Europea del Computer",
    "resume.course4.date": "Maggio 2015",
    "resume.course4.text": "Certificazione europea per competenze informatiche di base, con focus su sistemi Linux e strumenti office.",

    // Experience
    "resume.experience": "Esperienza Lavorativa",
    "resume.exp1.title": "Full Stack Developer @ PROMEDYA SRL - Partner WKI",
    "resume.exp1.date": "Ottobre 2022 — Presente",
    "resume.exp1.text": "Esperienza nel mondo ERP customizzando e progettando applicativi per tutti i clienti italiani utilizzando varie linguaggi e tecnologie di programmazione che girano attorno al mondo di Arca Evolution. Competenze in JavaScript, Flutter e soluzioni enterprise scalabili.",
    "resume.exp2.title": "Full Stack Developer @ Accenture Italia",
    "resume.exp2.date": "Maggio 2022 — Ottobre 2022",
    "resume.exp2.text": "Esperienza nella tecnologia Adobe Experience Manager sull'autenticazione, autorizzazione e sulla gestione dei microservizi Spring MVC. Competenze in Git, MySQL, sicurezza enterprise e architetture distribuite.",
    "resume.exp3.title": "App Developer @ Jotto S.r.l.",
    "resume.exp3.date": "Settembre 2021 — Febbraio 2022",
    "resume.exp3.text": "Esperienza nel campo CrossPlatform in Flutter per la creazione di app aziendali. Acquisizione di conoscenze in componenti grafici, tecnologie WiFi-BLE, pattern architetturali e state management del ciclo di vita delle applicazioni mobile.",

    // Skills
    "resume.skills": "Stack Tecnologico",

    // Portfolio
    "portfolio.title": "Portfolio",
    "portfolio.filterAll": "Tutti",
    "portfolio.selectCategory": "Seleziona categoria",

    // Blog
    "blog.title": "Blog",
    "blog.cat1": "Sviluppo Software",
    "blog.post1.title": "La Sindrome da \"Shiny Object\" nello Sviluppo Software",
    "blog.post1.text": "Quando la curiosità diventa controproducente: analisi del fenomeno che spinge i developer a saltare continuamente tra nuove tecnologie.",
    "blog.cat2": "Clean Code",
    "blog.post2.title": "Robert Cecil Martin: L'uomo dietro il Clean Code",
    "blog.post2.text": "Approfondimento sulla figura di Uncle Bob e sui principi fondamentali che hanno rivoluzionato l'approccio alla scrittura di codice pulito.",
    "blog.cat3": "Career Development",
    "blog.post3.title": "La \"Comparison Trap\" nello Sviluppo Software",
    "blog.post3.text": "Perché confrontarsi con altri developer può essere dannoso: riflessioni sui pericoli del paragone costante nel mondo tech.",
    "blog.cat4": "Psicologia",
    "blog.post4.title": "La Sindrome dell'Impostore nel Mondo della Programmazione",
    "blog.post4.text": "Quando il talento si nasconde dietro l'insicurezza: analisi di un fenomeno comune tra i developer e strategie per superarlo.",
    "blog.cat5": "Tecnologia",
    "blog.post5.title": "Flutter: Best Practices per App Enterprise",
    "blog.post5.text": "Guida alle migliori pratiche per lo sviluppo di applicazioni Flutter scalabili in contesti aziendali e enterprise.",
    "blog.cat6": "Tutti gli Articoli",
    "blog.post6.title": "Scopri Tutti i Miei Articoli su LinkedIn",
    "blog.post6.text": "Accedi alla collezione completa dei miei articoli tecnici e riflessioni sul mondo dello sviluppo software moderno.",

    // Contact
    "contact.title": "Contatti",
    "contact.formTitle": "Modulo di Contatto",
    "contact.namePlaceholder": "Nome completo",
    "contact.emailPlaceholder": "Indirizzo email",
    "contact.messagePlaceholder": "Il tuo messaggio",
    "contact.sendBtn": "Invia Messaggio"
  },

  en: {
    // Sidebar
    "sidebar.showContacts": "Show Contacts",
    "sidebar.email": "Email",
    "sidebar.phone": "Phone",
    "sidebar.birthday": "Birthday",
    "sidebar.birthdayDate": "April 23, 2000",
    "sidebar.location": "Location",

    // Navbar
    "nav.about": "About Me",
    "nav.resume": "Resume",
    "nav.blog": "Blog",
    "nav.contact": "Contact",

    // About
    "about.title": "About Me",
    "about.text1": "I'm Fabio Danubbio, a Full Stack Developer based in Nola, Naples. Passionate about modern technologies, I build scalable and high-performance applications with a clean code approach, engineering best practices, and continuous optimization.",
    "about.text2": "Over the past few years, I've worked on projects ranging from cross-platform mobile apps in Flutter, to complex backends with Node.js and Express, to enterprise solutions with Java and Spring Boot. I enjoy designing robust architectures, optimizing performance, and building seamless user experiences with an Agile & DevOps mindset.",
    "about.text3": "My continuous learning includes recent Meta certifications (2025) in React, JavaScript, and Frontend Development, along with Google Developer Program, Apple Developer, and Oracle Java credentials. I'm curious, constantly evolving, and I believe technology is a means to build real solutions to real problems.",
    "about.text4": "My philosophy is always oriented towards code quality, security, and application scalability, following Clean Code principles and modern engineering best practices.",

    // Services
    "service.title": "What I Bring to Projects",
    "service.1.title": "Frontend & Mobile",
    "service.1.text": "🔹 Flutter for high-performance cross-platform apps<br>🔹 React and Next.js for modern interfaces<br>🔹 Advanced state management and solid design patterns",
    "service.2.title": "Backend Development",
    "service.2.text": "🔹 Node.js, Express for scalable APIs<br>🔹 Java Spring Boot for enterprise solutions<br>🔹 Robust and maintainable architectures",
    "service.3.title": "Database & Performance",
    "service.3.text": "🔹 MongoDB, PostgreSQL, MySQL, MSSQL<br>🔹 Optimized queries and performance tuning<br>🔹 Advanced security (JWT, OAuth2, WebSocket)",
    "service.4.title": "Cloud & DevOps",
    "service.4.text": "🔹 Firebase, Docker, CI/CD pipeline<br>🔹 Git workflow and Agile methodologies<br>🔹 Automated deployment and monitoring",

    // Resume
    "resume.title": "Resume",
    "resume.education": "Education",
    "resume.edu1.title": "Full Stack Developer Course",
    "resume.edu1.date": "2018 — 2022",
    "resume.edu1.text": "Comprehensive training in modern web and mobile development technologies, focused on JavaScript, Python, databases, and agile methodologies.",
    "resume.edu2.title": "I.T.C.S.G. Masullo - Theti",
    "resume.edu2.date": "2015 — 2021",
    "resume.edu2.text": "IT Specialist with a score of 96/100. In-depth technical training in programming, networking, databases, and computer systems.",

    // Certifications
    "resume.certs": "Certifications & Licenses",
    "resume.cert1.title": "Meta - Coding Interview Preparation",
    "resume.cert1.date": "May 2025",
    "resume.cert1.text": "Meta certification for technical interview preparation. ID: TIS0YZD5UEY0",
    "resume.cert2.title": "Meta - React Fundamentals & JavaScript Programming",
    "resume.cert2.date": "April - May 2025",
    "resume.cert2.text": "Meta certifications in React (ID: 2DG6BU3W0Q5A) and JavaScript Programming (ID: LSS9IL5F1INI). Advanced skills in modern frontend development.",
    "resume.cert3.title": "Meta - Frontend Development & Version Control",
    "resume.cert3.date": "March 2025",
    "resume.cert3.text": "Introduction to Front-End Development (ID: PP1IISC3WJDH) and Version Control (ID: 6KQB1JPT6ZFX). Development methodologies and version control.",
    "resume.cert4.title": "Google Developer Program",
    "resume.cert4.date": "September 2021",
    "resume.cert4.text": "Google Developer Program member with expertise in Android, Flutter, and Angular. Access to advanced resources and Google community.",
    "resume.cert5.title": "Apple Developer Program",
    "resume.cert5.date": "January 2024 - January 2025",
    "resume.cert5.text": "Certified Apple Developer with expertise in Flutter and Swift for iOS. Authorized for App Store publishing.",
    "resume.cert6.title": "Oracle Java & Vaadin Certification",
    "resume.cert6.date": "2017 - 2024",
    "resume.cert6.text": "Oracle Java (2017) and Vaadin (2024) certifications. Enterprise expertise in Java, Kotlin, Android, and modern frameworks.",

    // Courses
    "resume.courses": "Specialized Courses",
    "resume.course1.title": "Flutter & Dart - Complete Guide [2023 Edition]",
    "resume.course1.date": "September 2022",
    "resume.course1.text": "Advanced Udemy course on Flutter and Dart focused on design patterns, scalable architectures, and best practices for modern mobile apps.",
    "resume.course2.title": "Java Full Stack Course - Matrix Consulting",
    "resume.course2.date": "April - May 2022",
    "resume.course2.text": "Specialized Java enterprise course during collaboration with Matrix, with deep dives into Spring Boot and microservices architectures.",
    "resume.course3.title": "Java EE & Clean Code Principles Course",
    "resume.course3.date": "2020",
    "resume.course3.text": "Advanced training in Java EE, HTML5, CSS, Linux, and Clean Code principles. Influenced by Robert C. Martin's (Uncle Bob) principles.",
    "resume.course4.title": "ICDL - European Computer Driving Licence",
    "resume.course4.date": "May 2015",
    "resume.course4.text": "European certification for basic computer skills, with focus on Linux systems and office tools.",

    // Experience
    "resume.experience": "Work Experience",
    "resume.exp1.title": "Full Stack Developer @ PROMEDYA SRL - Partner WKI",
    "resume.exp1.date": "October 2022 — Present",
    "resume.exp1.text": "Experience in the ERP world, customizing and designing applications for all Italian clients using various programming languages and technologies within the Arca Evolution ecosystem. Expertise in JavaScript, Flutter, and scalable enterprise solutions.",
    "resume.exp2.title": "Full Stack Developer @ Accenture Italia",
    "resume.exp2.date": "May 2022 — October 2022",
    "resume.exp2.text": "Experience with Adobe Experience Manager technology focusing on authentication, authorization, and Spring MVC microservices management. Skills in Git, MySQL, enterprise security, and distributed architectures.",
    "resume.exp3.title": "App Developer @ Jotto S.r.l.",
    "resume.exp3.date": "September 2021 — February 2022",
    "resume.exp3.text": "Cross-platform experience in Flutter for building enterprise apps. Acquired knowledge in UI components, WiFi-BLE technologies, architectural patterns, and state management of mobile application lifecycle.",

    // Skills
    "resume.skills": "Tech Stack",

    // Portfolio
    "portfolio.title": "Portfolio",
    "portfolio.filterAll": "All",
    "portfolio.selectCategory": "Select category",

    // Blog
    "blog.title": "Blog",
    "blog.cat1": "Software Development",
    "blog.post1.title": "The \"Shiny Object\" Syndrome in Software Development",
    "blog.post1.text": "When curiosity becomes counterproductive: analysis of the phenomenon that drives developers to constantly jump between new technologies.",
    "blog.cat2": "Clean Code",
    "blog.post2.title": "Robert Cecil Martin: The Man Behind Clean Code",
    "blog.post2.text": "Deep dive into the figure of Uncle Bob and the fundamental principles that revolutionized the approach to writing clean code.",
    "blog.cat3": "Career Development",
    "blog.post3.title": "The \"Comparison Trap\" in Software Development",
    "blog.post3.text": "Why comparing yourself with other developers can be harmful: reflections on the dangers of constant comparison in the tech world.",
    "blog.cat4": "Psychology",
    "blog.post4.title": "Impostor Syndrome in the World of Programming",
    "blog.post4.text": "When talent hides behind insecurity: analysis of a common phenomenon among developers and strategies to overcome it.",
    "blog.cat5": "Technology",
    "blog.post5.title": "Flutter: Best Practices for Enterprise Apps",
    "blog.post5.text": "Guide to the best practices for developing scalable Flutter applications in business and enterprise contexts.",
    "blog.cat6": "All Articles",
    "blog.post6.title": "Discover All My Articles on LinkedIn",
    "blog.post6.text": "Access the complete collection of my technical articles and reflections on the world of modern software development.",

    // Contact
    "contact.title": "Contact",
    "contact.formTitle": "Contact Form",
    "contact.namePlaceholder": "Full name",
    "contact.emailPlaceholder": "Email address",
    "contact.messagePlaceholder": "Your message",
    "contact.sendBtn": "Send Message"
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
    // Apply saved language
    this.applyLanguage(this.currentLang);
    this.updateSwitcherUI();

    // Setup language switcher
    const switcher = document.getElementById('lang-switcher');
    if (switcher) {
      switcher.addEventListener('click', () => this.toggle());
    }
  }

  toggle() {
    this.currentLang = this.currentLang === 'it' ? 'en' : 'it';
    localStorage.setItem('fabio-lang', this.currentLang);
    this.applyLanguage(this.currentLang);
    this.updateSwitcherUI();
  }

  updateSwitcherUI() {
    const flagActive = document.querySelector('.lang-flag-active');
    const flagInactive = document.querySelector('.lang-flag-inactive');
    const labelActive = document.querySelector('.lang-label-active');
    const labelInactive = document.querySelector('.lang-label-inactive');
    
    if (flagActive && flagInactive) {
      if (this.currentLang === 'it') {
        flagActive.textContent = '🇮🇹';
        flagInactive.textContent = '🇬🇧';
        if (labelActive) labelActive.textContent = 'IT';
        if (labelInactive) labelInactive.textContent = 'EN';
      } else {
        flagActive.textContent = '🇬🇧';
        flagInactive.textContent = '🇮🇹';
        if (labelActive) labelActive.textContent = 'EN';
        if (labelInactive) labelInactive.textContent = 'IT';
      }
    }

    // Update html lang attribute
    document.documentElement.lang = this.currentLang;
  }

  applyLanguage(lang) {
    const dict = translations[lang];
    if (!dict) return;

    // Text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    // HTML content (for elements with <br> etc.)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) {
        el.placeholder = dict[key];
      }
    });

    // Update page title based on active article
    const activeArticle = document.querySelector('article.active');
    if (activeArticle) {
      const titleEl = activeArticle.querySelector('.article-title');
      if (titleEl) {
        document.title = `Fabio Danubbio - ${titleEl.textContent}`;
      }
    }
  }
}

// Initialize i18n when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.i18n = new I18nManager();
});
