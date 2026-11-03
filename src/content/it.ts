import type { SiteContent } from "./types";

export const it: SiteContent = {
  storia: {
    eyebrow: "Casa",
    title: "La mia storia",
    metaTitle: "La mia storia",
    description:
      "Come ho cominciato: dai primi script in JavaScript a dodici anni a Java, server, Laravel, Xamarin e Flutter, fino ai prodotti di oggi.",
    blocks: [
      { type: "heading", text: "Da Habbo ai server" },
      {
        type: "p",
        text: "Ho scritto i miei primi script in JavaScript a dodici anni, per pubblicare news interattive su un retrò di Habbo. Alle superiori, nel corso di Informatica e Telecomunicazioni, sono passato da Small Basic e C a Java (programmazione a oggetti, interfacce a eventi con Swing, servlet) e a MySQL, studiando in parallelo TCP/UDP, socket, websocket e multithreading. Intorno ai quindici anni, studiando gli emulatori open source di quel gioco, ho incontrato per la prima volta server dedicati, Laravel (il mio primo MVC) e un database in produzione.",
      },
      { type: "heading", text: "Mobile e pattern" },
      {
        type: "p",
        text: "Poi è arrivato Xamarin con MVVM, confrontato con MVC. Prima ancora del primo lavoro mi sono appassionato a Flutter: ho studiato l'SDK e la programmazione reattiva e, nei progetti personali, ho messo alla prova approcci diversi, da MVVM con Stacked a BLoC. Ho letto i libri di Uncle Bob e ne porto i principi dove il contesto lo permette.",
      },
      { type: "heading", text: "Come lavoro con l'AI" },
      {
        type: "p",
        text: "Oggi uso anche assistenti AI nello sviluppo: definisco io requisiti e architettura e rivedo il codice che producono.",
      },
    ],
  },

  formazione: {
    eyebrow: "Scuola",
    title: "Formazione e certificazioni",
    metaTitle: "Formazione e certificazioni",
    description:
      "Diploma di Perito Informatico, corso Java Enterprise e Clean Code, certificazioni Meta e Oracle, programmi sviluppatore Apple e Google.",
    blocks: [
      {
        type: "cards",
        items: [
          {
            meta: "2015 – 2021",
            title: "Diploma di Perito Informatico, 96/100",
            text: "I.T.C.S.G. Masullo – Theti, Nola.",
          },
          {
            meta: "2022",
            title: "Corso specialistico Java Enterprise e Clean Code",
            text: "Matrix Consulting / Oracle Academy, organizzato da Accenture. Pattern architetturali, programmazione a oggetti avanzata e microservizi.",
          },
        ],
      },
      { type: "heading", text: "Certificazioni" },
      {
        type: "list",
        items: [
          "**Meta**: Coding Interview Preparation (2025)",
          "**Meta**: React e JavaScript Programming (2025)",
          "**Oracle**: Java e Vaadin",
        ],
      },
      { type: "heading", text: "Programmi sviluppatore" },
      {
        type: "p",
        text: "Apple Developer Program e Google Developer Program: sono iscrizioni che permettono di pubblicare sugli store, non certificazioni.",
      },
      {
        type: "links",
        items: [{ label: "Tutti i dettagli su LinkedIn", href: "https://www.linkedin.com/in/fabio-danubbio/" }],
      },
    ],
  },

  jotto: {
    eyebrow: "Jotto S.r.l. · settembre 2021 – febbraio 2022",
    title: "App Developer",
    metaTitle: "Jotto: App Developer",
    description:
      "Jotto+: app Flutter di domotica per gateway di riscaldamento ed elettrodomestici, pubblicata su Google Play e App Store.",
    blocks: [
      {
        type: "p",
        text: "Ho sviluppato in Flutter Jotto+, l'app di domotica per configurare e controllare gateway di riscaldamento ed elettrodomestici, pubblicata su Google Play e App Store. Mi sono occupato dell'interfaccia: autenticazione, configurazione del dispositivo, termostato con manopola grafica, programmazione settimanale a fasce orarie, grafici e adattamento a iPad. Per la comunicazione locale con i dispositivi via Bluetooth Low Energy e WiFi ho scritto codice nativo in Swift e Kotlin dove le librerie Flutter non bastavano.",
      },
      { type: "tags", items: ["Flutter", "Dart", "Stacked (MVVM)", "Bluetooth LE", "WiFi", "Swift", "Kotlin", "iOS", "Android"] },
    ],
  },

  accenture: {
    eyebrow: "Accenture Italia · maggio – ottobre 2022",
    title: "Full Stack Developer",
    metaTitle: "Accenture: Full Stack Developer",
    description:
      "Autenticazione e autorizzazione del portale italia.it con Adobe Experience Manager e microservizi Java Spring MVC: JWT, OAuth, SPID e CIE.",
    blocks: [
      {
        type: "p",
        text: "Con il passaggio dal mobile al full stack ho lavorato sul portale italia.it, con Adobe Experience Manager e microservizi Java Spring MVC. Mi sono occupato dell'autenticazione e dell'autorizzazione: token di accesso e di rinnovo (JWT), provider OAuth come GitHub, Google e Apple, e il login con SPID e CIE. Ho inoltre realizzato un proxy che riscrive le richieste dirette al backend e maschera gli indirizzi interni, così che arrivino all'applicazione principale come richieste del monolite. In parallelo ho sviluppato altri applicativi in React.",
      },
      {
        type: "p",
        text: "In quel periodo ho seguito anche il corso specialistico su Java Enterprise e Clean Code (Matrix Consulting / Oracle Academy), organizzato da Accenture.",
      },
      { type: "tags", items: ["Java", "Spring MVC", "Adobe Experience Manager", "JWT", "OAuth", "SPID", "CIE", "React"] },
    ],
  },

  promedya: {
    eyebrow: "Promedya S.r.l. · ottobre 2022 – oggi",
    title: "Full Stack Developer",
    metaTitle: "Promedya: prodotti per Arca Evolution",
    description:
      "Prodotti verticali per Arca Evolution, il gestionale di Wolters Kluwer: Smart Server, Smart Agenti, Tentata Vendita, Logistica, BI, @MAIL, Cashmatic e tracciati automatici.",
    lead: "Promedya è un'agenzia di Wolters Kluwer.",
    blocks: [
      {
        type: "p",
        text: "Lavoro in un team di tre persone che personalizza Arca Evolution, il gestionale di Wolters Kluwer. In quattro anni, partendo da molti progetti aperti e poco tempo, abbiamo trasformato le richieste dei clienti in prodotti verticali che oggi fanno parte dell'offerta dell'azienda.",
      },
      { type: "heading", text: "Ho progettato e sviluppato, con il team" },
      {
        type: "cards",
        items: [
          {
            title: "Smart Server",
            meta: "Backend",
            text: "Un'API *stateful* che porta fuori da Arca la logica del cliente (anagrafiche, documenti, contabilità) senza accedere direttamente a SQL Server, perché Arca è un prodotto chiuso.",
            tags: ["Java", "Spring Boot"],
          },
          {
            title: "Smart Agenti",
            meta: "App mobile",
            text: "Il gestionale in tasca all'agente di vendita, con clienti, listini, ordini e scadenze, che lavora offline e si sincronizza.",
            tags: ["Flutter", "Dart"],
          },
          {
            title: "Smart Tentata Vendita",
            meta: "App mobile · solo online",
            text: "La vendita dal furgone, con DDT, fatture e magazzino sul mezzo.",
            tags: ["Flutter", "Dart"],
          },
          {
            title: "Smart Logistica",
            meta: "Web · in locale nel magazzino",
            text: "Ordini, prelievi, lotti e giacenze, dove contano soprattutto le transazioni.",
            tags: ["Next.js"],
          },
          {
            title: "Smart BI",
            meta: "Dati",
            text: "Cruscotti e statistiche aziendali, in locale dal cliente o esposti online.",
            tags: ["Syncfusion"],
          },
          {
            title: "Smart @MAIL",
            meta: "Automazione",
            text: "Comunicazioni amministrative automatiche, come i solleciti, guidate da regole su eventi e scadenze.",
            tags: ["NestJS"],
          },
          {
            title: "Integrazione Cashmatic",
            meta: "Integrazione · certificata",
            text: "Collega una cassa automatica ad Arca e genera i corrispettivi. L'integrazione è certificata.",
            tags: ["NestJS"],
          },
          {
            title: "Tracciati automatici",
            meta: "Automazione",
            text: "Trasforma PDF, Excel, TXT e JSON in documenti di Arca.",
            tags: ["Next.js"],
          },
        ],
      },
      { type: "heading", text: "Ho contribuito a" },
      {
        type: "cards",
        items: [
          {
            title: "Smart Produzione",
            meta: "Contributo",
            text: "Casistiche dei clienti sulle risorse di lavorazione, per esempio zincatura e gabbie.",
          },
          {
            title: "Smart B2B",
            meta: "Contributo",
            text: "Gestione dei pagamenti con Stripe.",
            tags: ["Stripe"],
          },
        ],
      },
      {
        type: "links",
        items: [
          {
            label: "Informazioni ufficiali sui prodotti",
            href: "https://www.softmaint.it/webapp",
            meta: "softmaint.it",
          },
        ],
      },
    ],
  },

  progetti: {
    eyebrow: "Laboratorio",
    title: "Progetti",
    metaTitle: "Progetti",
    description:
      "Dhonko, Bandierina, amalia, hbds, GigliGame e la partecipazione a Hack&Blast²: i miei progetti, dai prodotti per clienti agli esperimenti.",
    lead: "Prodotti per clienti ed esperimenti personali. Dove ho usato assistenti AI lo scrivo.",
    blocks: [
      {
        type: "projects",
        items: [
          {
            title: "Dhonko",
            meta: "Cliente · 2023 – oggi",
            text: "Piattaforma per organizzare viaggi di gruppo e trovare compagni di viaggio. Ho sviluppato l'intero prodotto: infrastruttura, backend, web e app.",
            tags: ["Next.js", "NestJS", "PostgreSQL", "Capacitor"],
            href: "/progetti/dhonko",
            hrefLabel: "Leggi il caso",
            categories: ["web", "mobile", "backend"],
          },
          {
            title: "Bandierina",
            meta: "Personale · prototipo",
            text: "App per il calcio amatoriale: partite, squadre e campionati con cinque formati di torneo. Il tabellone è descritto da dati e non dal codice, quindi l'organizzatore può riscriverne le regole.",
            tags: ["Next.js", "NestJS", "PostgreSQL"],
            categories: ["web", "backend"],
          },
          {
            title: "amalia",
            meta: "Personale",
            text: "Piattaforma social per sviluppatori con sfide generate e valutate da un'AI, duelli e CV da un'intervista. Sviluppata con assistenza AI.",
            tags: ["Next.js", "NestJS", "PostgreSQL", "AI"],
            categories: ["web", "backend", "games"],
          },
          {
            title: "hbds",
            meta: "Personale",
            text: "Sito-regalo interattivo: una torta 3D le cui candeline si spengono soffiando nel microfono.",
            tags: ["Next.js", "Three.js", "Web Audio"],
            categories: ["web", "games"],
          },
          {
            title: "GigliGame",
            meta: "Personale · in sviluppo",
            text: "Simulazione della Festa dei Gigli di Nola in Unreal Engine 5 con C++, la mia prima esperienza con il motore. Ideata e diretta da me, sviluppata con assistenza AI.",
            tags: ["Unreal Engine 5", "C++"],
            categories: ["games"],
          },
          {
            title: "Hack&Blast²",
            meta: "Hackathon · Caserta, maggio 2025",
            text: "Partecipazione con CASERTA, un concept di agenti AI che trasformano task in pull request.",
            tags: ["AI", "Concept"],
            categories: ["games", "web"],
          },
        ],
      },
    ],
  },

  dhonko: {
    eyebrow: "Dhonko · 2023 – oggi",
    title: "Sviluppatore unico",
    metaTitle: "Dhonko: sviluppatore unico",
    description:
      "Dhonko: piattaforma per viaggi di gruppo, dal Flutter del 2023 a un unico codebase TypeScript con Next.js, NestJS e Capacitor.",
    blocks: [
      {
        type: "p",
        text: "Dhonko è una piattaforma per organizzare viaggi di gruppo e trovare compagni di viaggio, nata da un'idea di un cliente che voleva unire il match, la prenotazione e la parte sociale. Dal 2023 mi occupo dell'intero prodotto: infrastruttura, backend, web e app.",
      },
      {
        type: "p",
        text: "La prima versione era in Flutter. Poi, avendo bisogno di un unico codebase in un solo linguaggio, ho riscritto tutto in TypeScript: un'applicazione web in Next.js, un backend in NestJS con PostgreSQL e le app per iOS e Android con Capacitor.",
      },
      {
        type: "p",
        text: "Il prodotto comprende programma del viaggio con voti, spese divise con saldi, prenotazioni di gruppo con posti bloccati, chat in tempo reale con traduzione, pagamenti con Stripe, notifiche e un back office di oltre cinquanta pagine, in sette lingue.",
      },
      {
        type: "p",
        text: "Le parti più delicate sono i pagamenti (webhook idempotenti, registro dei movimenti, riconciliazione automatica), le prenotazioni di gruppo e la gestione delle sessioni.",
      },
      {
        type: "tags",
        items: ["Next.js", "React", "NestJS", "PostgreSQL", "Prisma", "Redis", "Socket.IO", "Stripe", "Firebase", "Capacitor"],
      },
      { type: "note", text: "Le app sono in lancio il 12 dicembre 2026." },
      {
        type: "links",
        items: [{ label: "dhonko.it", href: "https://www.dhonko.it", meta: "Sito del prodotto" }],
      },
    ],
  },

  articoli: {
    eyebrow: "Biblioteca",
    title: "Articoli",
    metaTitle: "Articoli",
    description:
      "Riflessioni pubblicate su LinkedIn su carriera, mentalità e buone pratiche nello sviluppo: Shiny Object, Clean Code, Comparison Trap e sindrome dell'impostore.",
    lead: "Scrivo di software, ma soprattutto di chi lo scrive. Gli articoli sono su LinkedIn, in italiano.",
    blocks: [
      {
        type: "links",
        items: [
          {
            label: "La sindrome da “Shiny Object” nello sviluppo software",
            href: "https://www.linkedin.com/pulse/la-sindrome-da-shiny-object-nello-sviluppo-software-quando-danubbio-tw81f/",
            meta: "25 novembre 2024",
          },
          {
            label: "Robert Cecil Martin: l'uomo dietro il Clean Code",
            href: "https://www.linkedin.com/pulse/robert-cecil-martin-luomo-dietro-il-clean-code-fabio-danubbio-azylf/",
            meta: "15 ottobre 2024",
          },
          {
            label: "La “Comparison Trap” nello sviluppo software",
            href: "https://www.linkedin.com/pulse/la-comparison-trap-nello-sviluppo-software-perch%C3%A9-agli-fabio-danubbio-fd7pf/",
            meta: "20 settembre 2024",
          },
          {
            label: "La sindrome dell'impostore nel mondo della programmazione",
            href: "https://www.linkedin.com/pulse/la-sindrome-dellimpostore-nel-mondo-della-quando-il-talento-danubbio-lwtsf/",
            meta: "30 agosto 2024",
          },
        ],
      },
    ],
  },

  contatti: {
    eyebrow: "Cassetta delle lettere",
    title: "Contatti",
    metaTitle: "Contatti",
    description: "Scrivimi per un progetto, un'idea o una posizione aperta: fabio@danubbio.it.",
    lead: "Hai un'idea, un progetto o una posizione aperta? Scrivimi.",
    blocks: [
      {
        type: "links",
        items: [
          { label: "fabio@danubbio.it", href: "mailto:fabio@danubbio.it", meta: "Email" },
          { label: "fabio-danubbio", href: "https://www.linkedin.com/in/fabio-danubbio/", meta: "LinkedIn" },
          { label: "RonaldoCMS", href: "https://github.com/RonaldoCMS", meta: "GitHub" },
          { label: "@fabio.danubbio", href: "https://www.instagram.com/fabio.danubbio/", meta: "Instagram" },
        ],
      },
      { type: "note", text: "Sono a Nola (Napoli), in Italia." },
      { type: "contactForm" },
    ],
  },
};
