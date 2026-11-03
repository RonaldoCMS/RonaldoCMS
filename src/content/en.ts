import type { SiteContent } from "./types";

export const en: SiteContent = {
  storia: {
    eyebrow: "Home",
    title: "My story",
    metaTitle: "My story",
    description:
      "How I started: from my first JavaScript scripts at twelve to Java, servers, Laravel, Xamarin and Flutter, and the products I build today.",
    blocks: [
      { type: "heading", text: "From Habbo to servers" },
      {
        type: "p",
        text: "I wrote my first JavaScript scripts at twelve, to publish interactive news on a Habbo retro. At secondary school, in the Computer Science and Telecommunications course, I moved from Small Basic and C to Java (object-oriented programming, event-driven interfaces with Swing, servlets) and MySQL, studying TCP/UDP, sockets, websockets and multithreading alongside. Around fifteen, studying the open source emulators of that game, I first came across dedicated servers, Laravel (my first MVC) and a production database.",
      },
      { type: "heading", text: "Mobile and patterns" },
      {
        type: "p",
        text: "Then came Xamarin with MVVM, which I compared with MVC. Before my first job I became passionate about Flutter: I studied the SDK and reactive programming in depth and, in personal projects, tried different approaches, from MVVM with Stacked to BLoC. I've read Uncle Bob's books and bring their principles to my work where the context allows.",
      },
      { type: "heading", text: "How I work with AI" },
      {
        type: "p",
        text: "Today I also use AI assistants when developing: I define the requirements and the architecture, and I review the code they produce.",
      },
    ],
  },

  formazione: {
    eyebrow: "School",
    title: "Education and certifications",
    metaTitle: "Education and certifications",
    description:
      "Computer Science diploma, Java Enterprise and Clean Code course, Meta and Oracle certifications, Apple and Google developer programs.",
    blocks: [
      {
        type: "cards",
        items: [
          {
            meta: "2015 – 2021",
            title: "Computer Science diploma, 96/100",
            text: "I.T.C.S.G. Masullo – Theti, Nola.",
          },
          {
            meta: "2022",
            title: "Specialist course in Java Enterprise and Clean Code",
            text: "Matrix Consulting / Oracle Academy, organised by Accenture. Architectural patterns, advanced object-oriented programming and microservices.",
          },
        ],
      },
      { type: "heading", text: "Certifications" },
      {
        type: "list",
        items: [
          "**Meta**: Coding Interview Preparation (2025)",
          "**Meta**: React and JavaScript Programming (2025)",
          "**Oracle**: Java and Vaadin",
        ],
      },
      { type: "heading", text: "Developer programs" },
      {
        type: "p",
        text: "Apple Developer Program and Google Developer Program: these are memberships that allow publishing on the stores, not certifications.",
      },
      {
        type: "links",
        items: [{ label: "Full details on LinkedIn", href: "https://www.linkedin.com/in/fabio-danubbio/" }],
      },
    ],
  },

  jotto: {
    eyebrow: "Jotto S.r.l. · September 2021 – February 2022",
    title: "App Developer",
    metaTitle: "Jotto: App Developer",
    description:
      "Jotto+: a Flutter home automation app for heating gateways and appliances, published on Google Play and the App Store.",
    blocks: [
      {
        type: "p",
        text: "I built Jotto+ in Flutter, the home automation app to configure and control heating gateways and appliances, published on Google Play and the App Store. I worked on the interface: authentication, device setup, a thermostat with a graphic knob, a weekly time-slot scheduler, charts and iPad adaptation. For local communication with the devices over Bluetooth Low Energy and WiFi, I wrote native Swift and Kotlin code where the Flutter libraries weren't enough.",
      },
      { type: "tags", items: ["Flutter", "Dart", "Stacked (MVVM)", "Bluetooth LE", "WiFi", "Swift", "Kotlin", "iOS", "Android"] },
    ],
  },

  accenture: {
    eyebrow: "Accenture Italia · May – October 2022",
    title: "Full Stack Developer",
    metaTitle: "Accenture: Full Stack Developer",
    description:
      "Authentication and authorisation for the italia.it portal with Adobe Experience Manager and Java Spring MVC microservices: JWT, OAuth, SPID and CIE.",
    blocks: [
      {
        type: "p",
        text: "Moving from mobile to full stack, I worked on the italia.it portal, with Adobe Experience Manager and Java Spring MVC microservices. I handled authentication and authorisation: access and refresh tokens (JWT), OAuth providers such as GitHub, Google and Apple, and login with SPID and CIE, the Italian digital identity systems. I also built a proxy that rewrites the requests aimed at the backend and masks internal addresses, so that they reach the main application as requests from the monolith. In parallel I developed other applications in React.",
      },
      {
        type: "p",
        text: "During that period I also took the specialist course on Java Enterprise and Clean Code (Matrix Consulting / Oracle Academy), organised by Accenture.",
      },
      { type: "tags", items: ["Java", "Spring MVC", "Adobe Experience Manager", "JWT", "OAuth", "SPID", "CIE", "React"] },
    ],
  },

  promedya: {
    eyebrow: "Promedya S.r.l. · October 2022 – today",
    title: "Full Stack Developer",
    metaTitle: "Promedya: products for Arca Evolution",
    description:
      "Vertical products for Arca Evolution, Wolters Kluwer's ERP: Smart Server, Smart Agenti, Tentata Vendita, Logistica, BI, @MAIL, Cashmatic and automatic data imports.",
    lead: "Promedya is a Wolters Kluwer agency.",
    blocks: [
      {
        type: "p",
        text: "I work in a team of three that customises Arca Evolution, Wolters Kluwer's ERP. Over four years, starting from many open projects and little time, we turned customer requests into vertical products that are now part of the company's offering.",
      },
      { type: "heading", text: "Designed and built, with the team" },
      {
        type: "cards",
        items: [
          {
            title: "Smart Server",
            meta: "Backend",
            text: "A *stateful* API that takes the customer's logic (customer records, documents, accounting) out of Arca without accessing SQL Server directly, because Arca is a closed product.",
            tags: ["Java", "Spring Boot"],
          },
          {
            title: "Smart Agenti",
            meta: "Mobile app",
            text: "The ERP in the sales agent's pocket: customers, price lists, orders and due dates, working offline and syncing afterwards.",
            tags: ["Flutter", "Dart"],
          },
          {
            title: "Smart Tentata Vendita",
            meta: "Mobile app · online only",
            text: "Van sales, with delivery notes, invoices and the stock on the vehicle.",
            tags: ["Flutter", "Dart"],
          },
          {
            title: "Smart Logistica",
            meta: "Web · on site in the warehouse",
            text: "Orders, picking, batches and stock levels, where transactions matter most.",
            tags: ["Next.js"],
          },
          {
            title: "Smart BI",
            meta: "Data",
            text: "Dashboards and business statistics, on the customer's premises or exposed online.",
            tags: ["Syncfusion"],
          },
          {
            title: "Smart @MAIL",
            meta: "Automation",
            text: "Automatic administrative communications, such as payment reminders, driven by rules on events and due dates.",
            tags: ["NestJS"],
          },
          {
            title: "Cashmatic integration",
            meta: "Integration · certified",
            text: "Connects an automatic cash machine to Arca and generates the daily takings records. The integration is certified.",
            tags: ["NestJS"],
          },
          {
            title: "Automatic data imports",
            meta: "Automation",
            text: "Turns PDF, Excel, TXT and JSON files into Arca documents.",
            tags: ["Next.js"],
          },
        ],
      },
      { type: "heading", text: "Contributed to" },
      {
        type: "cards",
        items: [
          {
            title: "Smart Produzione",
            meta: "Contribution",
            text: "Customer-specific cases on production resources, for example galvanising and cages.",
          },
          {
            title: "Smart B2B",
            meta: "Contribution",
            text: "Payment handling with Stripe.",
            tags: ["Stripe"],
          },
        ],
      },
      {
        type: "links",
        items: [
          {
            label: "Official information about the products",
            href: "https://www.softmaint.it/webapp",
            meta: "softmaint.it",
          },
        ],
      },
    ],
  },

  progetti: {
    eyebrow: "Lab",
    title: "Projects",
    metaTitle: "Projects",
    description:
      "Dhonko, Bandierina, amalia, hbds, GigliGame and my participation in Hack&Blast²: my projects, from client products to experiments.",
    lead: "Client products and personal experiments. Where I used AI assistants, I say so.",
    blocks: [
      {
        type: "projects",
        items: [
          {
            title: "Dhonko",
            meta: "Client · 2023 – today",
            text: "A platform to organise group trips and find travel companions. I built the whole product: infrastructure, backend, web and apps.",
            tags: ["Next.js", "NestJS", "PostgreSQL", "Capacitor"],
            href: "/progetti/dhonko",
            hrefLabel: "Read the case",
            categories: ["web", "mobile", "backend"],
          },
          {
            title: "Bandierina",
            meta: "Personal · prototype",
            text: "An app for amateur football: matches, teams and leagues with five tournament formats. The bracket is described by data rather than code, so the organiser can rewrite its rules.",
            tags: ["Next.js", "NestJS", "PostgreSQL"],
            categories: ["web", "backend"],
          },
          {
            title: "amalia",
            meta: "Personal",
            text: "A social platform for developers with coding challenges generated and graded by an AI, duels and a CV built from an interview. Built with AI assistance.",
            tags: ["Next.js", "NestJS", "PostgreSQL", "AI"],
            categories: ["web", "backend", "games"],
          },
          {
            title: "hbds",
            meta: "Personal",
            text: "An interactive gift website: a 3D cake whose candles go out when you blow into the microphone.",
            tags: ["Next.js", "Three.js", "Web Audio"],
            categories: ["web", "games"],
          },
          {
            title: "GigliGame",
            meta: "Personal · in development",
            text: "A simulation of the Festa dei Gigli of Nola in Unreal Engine 5 with C++, my first experience with the engine. Conceived and directed by me, built with AI assistance.",
            tags: ["Unreal Engine 5", "C++"],
            categories: ["games"],
          },
          {
            title: "Hack&Blast²",
            meta: "Hackathon · Caserta, May 2025",
            text: "Took part with CASERTA, a concept of AI agents that turn tasks into pull requests.",
            tags: ["AI", "Concept"],
            categories: ["games", "web"],
          },
        ],
      },
    ],
  },

  dhonko: {
    eyebrow: "Dhonko · 2023 – today",
    title: "Sole developer",
    metaTitle: "Dhonko: sole developer",
    description:
      "Dhonko: a group travel platform, from the 2023 Flutter app to a single TypeScript codebase with Next.js, NestJS and Capacitor.",
    blocks: [
      {
        type: "p",
        text: "Dhonko is a platform to organise group trips and find travel companions, born from a client's idea of combining matching, booking and the social side. Since 2023 I've been responsible for the whole product: infrastructure, backend, web and apps.",
      },
      {
        type: "p",
        text: "The first version was in Flutter. Then, needing a single codebase in a single language, I rewrote everything in TypeScript: a web application in Next.js, a backend in NestJS with PostgreSQL, and the iOS and Android apps with Capacitor.",
      },
      {
        type: "p",
        text: "The product includes trip itineraries with voting, shared expenses with balances, group bookings with held seats, real-time chat with translation, Stripe payments, notifications and a back office of over fifty pages, in seven languages.",
      },
      {
        type: "p",
        text: "The most delicate parts are payments (idempotent webhooks, a ledger of movements, automatic reconciliation), group bookings and session management.",
      },
      {
        type: "tags",
        items: ["Next.js", "React", "NestJS", "PostgreSQL", "Prisma", "Redis", "Socket.IO", "Stripe", "Firebase", "Capacitor"],
      },
      { type: "note", text: "The apps launch on 12 December 2026." },
      {
        type: "links",
        items: [{ label: "dhonko.it", href: "https://www.dhonko.it", meta: "Product website" }],
      },
    ],
  },

  articoli: {
    eyebrow: "Library",
    title: "Articles",
    metaTitle: "Articles",
    description:
      "Reflections published on LinkedIn about career, mindset and good practice in software development: Shiny Object syndrome, Clean Code, the Comparison Trap and impostor syndrome.",
    lead: "I write about software, but above all about the people who write it. The articles are on LinkedIn, in Italian.",
    blocks: [
      {
        type: "links",
        items: [
          {
            label: "La sindrome da “Shiny Object” nello sviluppo software",
            href: "https://www.linkedin.com/pulse/la-sindrome-da-shiny-object-nello-sviluppo-software-quando-danubbio-tw81f/",
            meta: "25 November 2024 · Shiny Object syndrome in software development",
          },
          {
            label: "Robert Cecil Martin: l'uomo dietro il Clean Code",
            href: "https://www.linkedin.com/pulse/robert-cecil-martin-luomo-dietro-il-clean-code-fabio-danubbio-azylf/",
            meta: "15 October 2024 · The man behind Clean Code",
          },
          {
            label: "La “Comparison Trap” nello sviluppo software",
            href: "https://www.linkedin.com/pulse/la-comparison-trap-nello-sviluppo-software-perch%C3%A9-agli-fabio-danubbio-fd7pf/",
            meta: "20 September 2024 · The Comparison Trap in software development",
          },
          {
            label: "La sindrome dell'impostore nel mondo della programmazione",
            href: "https://www.linkedin.com/pulse/la-sindrome-dellimpostore-nel-mondo-della-quando-il-talento-danubbio-lwtsf/",
            meta: "30 August 2024 · Impostor syndrome in programming",
          },
        ],
      },
    ],
  },

  contatti: {
    eyebrow: "Mailbox",
    title: "Contact",
    metaTitle: "Contact",
    description: "Write to me about a project, an idea or an open position: fabio@danubbio.it.",
    lead: "Got an idea, a project or an open position? Write to me.",
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
      { type: "note", text: "I'm based in Nola (Naples), Italy." },
      { type: "contactForm" },
    ],
  },
};
