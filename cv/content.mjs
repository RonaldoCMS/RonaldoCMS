/**
 * Testi del curriculum, in italiano e in inglese.
 * Seguono le stesse regole del sito (nessun nome di cliente, nessuna affermazione non dimostrabile):
 * i test in `cv/cv.test.ts` controllano le parole vietate.
 * Nei testi: **grassetto**.
 */

const contact = (location) => [
  { label: "Email", value: "fabio@danubbio.it", href: "mailto:fabio@danubbio.it" },
  { label: "Web", value: "danubbio.it", href: "https://danubbio.it" },
  { label: "LinkedIn", value: "fabio-danubbio", href: "https://www.linkedin.com/in/fabio-danubbio/" },
  { label: "GitHub", value: "RonaldoCMS", href: "https://github.com/RonaldoCMS" },
  { label: location.label, value: location.value },
];

export const cv = {
  it: {
    lang: "it",
    documentTitle: "Fabio Danubbio · Curriculum vitae",
    name: "Fabio Danubbio",
    role: "Full Stack Developer",
    tagline: "Porto i prodotti dall'idea alla pubblicazione.",
    page2: "Curriculum vitae · pagina 2 di 2",
    contactTitle: "Contatti",
    contact: contact({ label: "Sede", value: "Nola (NA), Italia" }),
    profileTitle: "Profilo",
    profile:
      "Sviluppatore full stack di Nola, in ambito professionale dal 2021. Realizzo app mobile, applicazioni web e backend, dal cloud fino allo store. In azienda sviluppo prodotti verticali per Arca Evolution, il gestionale di Wolters Kluwer; come sviluppatore unico ho costruito Dhonko, una piattaforma per viaggi di gruppo, dall'infrastruttura all'app. Uso assistenti AI nello sviluppo: definisco io requisiti e architettura e rivedo il codice che producono.",
    experienceTitle: "Esperienza",
    jobs: [
      {
        role: "Full Stack Developer",
        org: "Promedya S.r.l.",
        orgNote: "agenzia di Wolters Kluwer",
        period: "ott 2022 – oggi",
        intro: "Team di tre persone che personalizza Arca Evolution. Prodotti verticali progettati e sviluppati con il team:",
        bullets: [
          "**Smart Server** (Java, Spring Boot): API *stateful* che porta fuori dal gestionale la logica del cliente (anagrafiche, documenti, contabilità) senza accedere direttamente a SQL Server.",
          "**Smart Agenti** e **Smart Tentata Vendita** (Flutter): il gestionale in tasca all'agente di vendita, con sincronizzazione offline, e la vendita dal furgone con DDT e fatture.",
          "**Smart Logistica** e **tracciati automatici** (Next.js): magazzino con lotti, giacenze e transazioni; importazione di PDF, Excel, TXT e JSON in documenti del gestionale.",
          "**Smart @MAIL** (NestJS): solleciti e comunicazioni amministrative automatiche guidati da regole; **integrazione Cashmatic** (NestJS) con una cassa automatica, certificata.",
          "**Smart BI** (Syncfusion); contributi a **Smart Produzione** e **Smart B2B** (pagamenti con Stripe).",
        ],
      },
      {
        role: "Sviluppatore unico",
        org: "Dhonko",
        orgNote: "progetto per cliente",
        period: "2023 – oggi",
        bullets: [
          "Piattaforma per viaggi di gruppo, sviluppata da sola in ogni parte: infrastruttura, backend, web e app. Dal Flutter del 2023 a un unico codebase TypeScript con **Next.js**, **NestJS**, **PostgreSQL** e **Capacitor**.",
          "Pagamenti con Stripe (webhook idempotenti, registro dei movimenti, riconciliazione automatica), prenotazioni di gruppo con posti bloccati, chat in tempo reale con traduzione, back office e sette lingue.",
          "Lancio previsto il 12 dicembre 2026.",
        ],
      },
      {
        role: "Full Stack Developer",
        org: "Accenture Italia",
        period: "mag – ott 2022",
        bullets: [
          "Portale italia.it con **Adobe Experience Manager** e microservizi **Java Spring MVC**.",
          "Autenticazione e autorizzazione: **JWT**, provider **OAuth** (GitHub, Google, Apple), login con **SPID** e **CIE**.",
          "Proxy che riscrive le richieste verso il backend e maschera gli indirizzi interni; altri applicativi in **React**.",
        ],
      },
      {
        role: "App Developer",
        org: "Jotto S.r.l.",
        period: "set 2021 – feb 2022",
        bullets: [
          "App di domotica **Jotto+** in **Flutter** (Google Play e App Store): configurazione dei dispositivi, termostato, programmazione settimanale, grafici, adattamento a iPad.",
          "Codice nativo **Swift** e **Kotlin** per la comunicazione locale via Bluetooth LE e WiFi.",
        ],
      },
    ],
    projectsTitle: "Progetti personali",
    projects: [
      "**Bandierina**: app per il calcio amatoriale (prototipo), con tabelloni descritti da dati e cinque formati di torneo.",
      "**amalia**: piattaforma social per sviluppatori con sfide generate e valutate da un'AI (sviluppata con assistenza AI).",
      "**GigliGame**: simulazione della Festa dei Gigli di Nola in Unreal Engine 5 con C++, ideata e diretta da me e sviluppata con assistenza AI.",
      "**Hack&Blast²** (Caserta, maggio 2025): partecipazione con CASERTA, un concept di agenti AI.",
    ],
    skillsTitle: "Competenze",
    skills: [
      { label: "Mobile", items: "Flutter, Dart, Capacitor" },
      { label: "Web", items: "Next.js, React, TypeScript" },
      { label: "Backend", items: "NestJS, Java Spring Boot, Node.js, REST, Socket.IO" },
      { label: "Dati", items: "PostgreSQL, SQL Server, MySQL, Prisma, Redis" },
      { label: "Integrazioni", items: "Stripe, Firebase, Cashmatic, API di OpenAI e Anthropic" },
      { label: "Sicurezza", items: "JWT, OAuth, SPID/CIE, ruoli e permessi" },
      { label: "Cloud", items: "Docker, Railway, Vercel" },
    ],
    educationTitle: "Formazione",
    education: [
      { title: "Diploma di Perito Informatico, 96/100", detail: "I.T.C.S.G. Masullo – Theti, Nola", period: "2015 – 2021" },
      { title: "Corso Java Enterprise e Clean Code", detail: "Matrix Consulting / Oracle Academy, organizzato da Accenture", period: "2022" },
    ],
    certsTitle: "Certificazioni",
    certs: [
      "Meta · Coding Interview Preparation (2025)",
      "Meta · React e JavaScript Programming (2025)",
      "Oracle · Java e Vaadin",
    ],
    certsNote: "Iscritto ad Apple Developer Program e Google Developer Program.",
    languagesTitle: "Lingue",
    languages: [
      { name: "Italiano", level: "madrelingua" },
      { name: "Inglese", level: "lingua di lavoro" },
    ],
  },

  en: {
    lang: "en",
    documentTitle: "Fabio Danubbio · Curriculum vitae",
    name: "Fabio Danubbio",
    role: "Full Stack Developer",
    tagline: "I take products from idea to release.",
    page2: "Curriculum vitae · page 2 of 2",
    contactTitle: "Contact",
    contact: contact({ label: "Based in", value: "Nola (Naples), Italy" }),
    profileTitle: "Profile",
    profile:
      "Full stack developer from Nola, Italy, working professionally since 2021. I build mobile apps, web applications and backends, from the cloud to the store. At work I develop vertical products for Arca Evolution, Wolters Kluwer's ERP; as sole developer I built Dhonko, a group travel platform, from infrastructure to app. I use AI assistants when developing: I define the requirements and the architecture, and I review the code they produce.",
    experienceTitle: "Experience",
    jobs: [
      {
        role: "Full Stack Developer",
        org: "Promedya S.r.l.",
        orgNote: "a Wolters Kluwer agency",
        period: "Oct 2022 – today",
        intro: "A team of three customising Arca Evolution. Vertical products designed and built with the team:",
        bullets: [
          "**Smart Server** (Java, Spring Boot): a *stateful* API that takes the customer's logic (customer records, documents, accounting) out of the ERP without accessing SQL Server directly.",
          "**Smart Agenti** and **Smart Tentata Vendita** (Flutter): the ERP in the sales agent's pocket, with offline sync, and van sales with delivery notes and invoices.",
          "**Smart Logistica** and **automatic data imports** (Next.js): warehouse with batches, stock levels and transactions; PDF, Excel, TXT and JSON files turned into ERP documents.",
          "**Smart @MAIL** (NestJS): automatic payment reminders and administrative messages driven by rules; **Cashmatic integration** (NestJS) with an automatic cash machine, certified.",
          "**Smart BI** (Syncfusion); contributions to **Smart Produzione** and **Smart B2B** (Stripe payments).",
        ],
      },
      {
        role: "Sole developer",
        org: "Dhonko",
        orgNote: "client project",
        period: "2023 – today",
        bullets: [
          "A group travel platform, built single-handedly in every part: infrastructure, backend, web and apps. From the 2023 Flutter app to a single TypeScript codebase with **Next.js**, **NestJS**, **PostgreSQL** and **Capacitor**.",
          "Stripe payments (idempotent webhooks, a ledger of movements, automatic reconciliation), group bookings with held seats, real-time chat with translation, a back office and seven languages.",
          "Launching on 12 December 2026.",
        ],
      },
      {
        role: "Full Stack Developer",
        org: "Accenture Italia",
        period: "May – Oct 2022",
        bullets: [
          "The italia.it portal with **Adobe Experience Manager** and **Java Spring MVC** microservices.",
          "Authentication and authorisation: **JWT**, **OAuth** providers (GitHub, Google, Apple), login with **SPID** and **CIE** (Italian digital identity).",
          "A proxy that rewrites requests to the backend and masks internal addresses; other applications in **React**.",
        ],
      },
      {
        role: "App Developer",
        org: "Jotto S.r.l.",
        period: "Sep 2021 – Feb 2022",
        bullets: [
          "**Jotto+**, a home automation app in **Flutter** (Google Play and App Store): device setup, thermostat, weekly scheduler, charts, iPad adaptation.",
          "Native **Swift** and **Kotlin** code for local communication over Bluetooth LE and WiFi.",
        ],
      },
    ],
    projectsTitle: "Personal projects",
    projects: [
      "**Bandierina**: an amateur football app (prototype), with brackets described by data and five tournament formats.",
      "**amalia**: a social platform for developers with coding challenges generated and graded by an AI (built with AI assistance).",
      "**GigliGame**: a simulation of the Festa dei Gigli of Nola in Unreal Engine 5 with C++, conceived and directed by me and built with AI assistance.",
      "**Hack&Blast²** (Caserta, May 2025): took part with CASERTA, a concept of AI agents.",
    ],
    skillsTitle: "Skills",
    skills: [
      { label: "Mobile", items: "Flutter, Dart, Capacitor" },
      { label: "Web", items: "Next.js, React, TypeScript" },
      { label: "Backend", items: "NestJS, Java Spring Boot, Node.js, REST, Socket.IO" },
      { label: "Data", items: "PostgreSQL, SQL Server, MySQL, Prisma, Redis" },
      { label: "Integrations", items: "Stripe, Firebase, Cashmatic, OpenAI and Anthropic APIs" },
      { label: "Security", items: "JWT, OAuth, SPID/CIE, roles and permissions" },
      { label: "Cloud", items: "Docker, Railway, Vercel" },
    ],
    educationTitle: "Education",
    education: [
      { title: "Computer Science diploma, 96/100", detail: "I.T.C.S.G. Masullo – Theti, Nola", period: "2015 – 2021" },
      { title: "Java Enterprise and Clean Code course", detail: "Matrix Consulting / Oracle Academy, organised by Accenture", period: "2022" },
    ],
    certsTitle: "Certifications",
    certs: [
      "Meta · Coding Interview Preparation (2025)",
      "Meta · React and JavaScript Programming (2025)",
      "Oracle · Java and Vaadin",
    ],
    certsNote: "Member of the Apple Developer Program and the Google Developer Program.",
    languagesTitle: "Languages",
    languages: [
      { name: "Italian", level: "native" },
      { name: "English", level: "working language" },
    ],
  },
};
