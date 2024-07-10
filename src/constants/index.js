import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  jotto,
  accenture,
  dhonko,
  promedya,
  java,
  flutter,
  spring
} from "../assets";

export const navLinks = [
  {
    id: "#about",
    title: "About",
  },
  {
    id: "#work",
    title: "Work",
  },
  {
    id: "https://www.linkedin.com/in/fabio-danubbio-52149219a/",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Flutter Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Content Creator",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  // {
  //   name: "Tailwind CSS",
  //   icon: tailwind,
  // },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  // {
  //   name: "Three JS",
  //   icon: threejs,
  // },
   {
     name: "git",
     icon: git,
   },
  // {
  //   name: "figma",
  //   icon: figma,
  // },
  // {
  //   name: "docker",
  //   icon: docker,
  // },
  {
    name: "Java",
    icon: java,
  },
  {
    name: "Flutter",
    icon: flutter,
  },
  {
    name: "Spring Boot",
    icon: spring,
  },
];

const experiences = [
  {
    title: "Flutter Developer",
    company_name: "Jotto SRL",
    icon: jotto,
    iconBg: "#ff914cfe",
    date: "September 2021 - March 2022",
    points: [
      "Developing and maintaining web applications using Flutter and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
    content: "I'm an experienced developer specializing in home automation, with a wealth of experience in designing and developing applications for smart home management. I've had the privilege of working on an exciting project called Jotto, an application that allows users to control and automate a wide range of home devices via their smartphones or other connected devices. Throughout my work on Jotto, I've undertaken various tasks, including designing an intuitive and user-friendly interface to enable users to easily control their home devices. I've integrated various IoT technologies to ensure compatibility with a variety of devices and communication protocols. Additionally, I've paid close attention to data security, implementing robust security measures to ensure user privacy and safety. I've also worked hard to optimize the application's performance, ensuring it's responsive and reliable in all situations. My goal was to create an application that simplifies users' daily lives, offering them intuitive and flexible control over their home devices while also improving energy efficiency and convenience. I'm proud of my contribution to Jotto and am excited to continue innovating in the field of home automation.",
  },
  {
    title: "Full Stack Developer",
    company_name: "Accenture",
    icon: accenture,
    iconBg: "#FFF",
    date: "Apr 2022 - October 2022",
    points: [
      "Developing and maintaining web applications using Adobe Experience Manager and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
    content: "I led the authentication and authorization phase for the italia.it project at Accenture, focusing on integrating JSON Web Tokens (JWT) with Adobe Experience Manager (AEM). My responsibilities included designing and implementing secure authentication mechanisms to ensure seamless user access to the platform. I collaborated closely with the development team to integrate JWT into AEM, leveraging its capabilities for efficient user management and authorization. This experience equipped me with valuable skills in identity management, security, and system integration within a complex digital ecosystem",
  },
  {
    title: "Full Stack Developer",
    company_name: "Promedya",
    icon: promedya,
    iconBg: "#FFF",
    date: "Jan 2022 - Present",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
    content: "At Promedya, I specialized in designing and developing applications tailored to enterprise management, covering areas such as accounting, warehouse management, and production. My role involved understanding the specific needs of businesses and crafting software solutions to streamline their operations and enhance efficiency. I collaborated closely with clients to gather requirements, design user-friendly interfaces, and implement robust functionalities. Additionally, I focused on integrating these applications seamlessly with existing systems to ensure smooth workflow and data synchronization. This experience honed my skills in software development, project management, and business analysis within the context of enterprise resource planning (ERP) systems"
  },
  // {
  //   title: "Full stack Developer",
  //   company_name: "Dhonko",
  //   icon: dhonko,
  //   iconBg: "#E6DEDD",
  //   date: "Jan 2023 - Present",
  //   points: [
  //     "Developing and maintaining web applications using React.js and other related technologies.",
  //     "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
  //     "Implementing responsive design and ensuring cross-browser compatibility.",
  //     "Participating in code reviews and providing constructive feedback to other developers.",
  //   ],
  // },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Dhonko",
    description:
      "Travel social, which allows you to book, make friends, meet new friends and travel all together! Discover new places and share your experiences with other people!",
    tags: [
      {
        name: "Flutter",
        color: "blue-text-gradient",
      },
      {
        name: "Laravel",
        color: "green-text-gradient",
      },
      {
        name: "MySQL",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Jotto+",
    description:
      "Italian chronothermostat that allows you to configure temperatures even away from home thanks to an internet connection. The configuration device is located in the cloud using the surrounding connection via wifi or bluetooth",
    tags: [
      {
        name: "AWS",
        color: "blue-text-gradient",
      },
      {
        name: "Flutter",
        color: "green-text-gradient",
      },
    ],
    image: jotto,
    source_code_link: null,
    link: "https://apps.apple.com/th/app/jotto-plus/id1588095848",
  },
  {
    name: "Italia.it",
    description:
      "Breathtaking landscapes, a rich history and lots of delicious food will make your trip to Italy unforgettable.",
    tags: [
      {
        name: "Java",
        color: "blue-text-gradient",
      },
      {
        name: "AWS",
        color: "green-text-gradient",
      },
      {
        name: "Spid",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
  {
    name: "Promedya SmartAgent",
    description:
      "Application that allows you to place B2B orders via smartphone",
    tags: [
      {
        name: "Flutter",
        color: "blue-text-gradient",
      },
      {
        name: "Spring boot",
        color: "green-text-gradient",
      },
      {
        name: "SQL Server",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
  {
    name: "Tic Tac Toe",
    description:
     "Arcade game",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
  {
    name: "Tetris",
    description:
    "Arcade game",
      tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
  
  {
    name: "Calculator",
    description:
      "",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
  {
    name: "Formula One",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
  {
    name: "Sport app",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },

];

export { services, technologies, experiences, testimonials, projects };
