export type RichPart = string | { readonly strong: string };

export const LINKEDIN_URL = "https://www.linkedin.com/in/or-damari";

export const siteTitle = "Or Damari — Frontend & Full-Stack Engineer";

export const heroSub: readonly RichPart[] = [
  "I build ",
  { strong: "fast, clear web products" },
  " that hold up in production, from enterprise fintech platforms to apps I’ve shipped end to end.",
];

export const siteDescription = heroSub
  .map((part) => (typeof part === "string" ? part : part.strong))
  .join("");

export const profile = {
  heroKicker: "Frontend & Full-Stack Engineer",
  name: "Or Damari",
  ctaPrimary: "Let’s talk ↗",
  ctaSecondary: "Explore my work ↓",
  scrollHint: "Scroll to meet me",
  aboutKicker: "02 / About",
  aboutTitleLead: "Complex systems,",
  aboutTitleRest: "simple to use.",
  aboutLead:
    "I’m a frontend-leaning full-stack engineer focused on the craft behind the interface — turning complex logic, data-heavy workflows, and rough ideas into fast, clear software.",
  aboutBody:
    "I care about the details users feel right away and the architecture teams feel a year later: clean components, reliable tests, and shipping real products built for daily use.",
  focusKicker: "03 / Core focus",
  focusTitleLead: "Where I bring",
  focusTitleRest: "the most value.",
  focusRows: [
    {
      number: "01",
      title: "Frontend Architecture",
      body: "Scalable component systems, micro-frontends, and state layers that stay fast as products grow.",
    },
    {
      number: "02",
      title: "Product UI & Interaction",
      body: "Thoughtful layouts, responsive polish, and motion that serves clarity rather than getting in the way.",
    },
    {
      number: "03",
      title: "Full-Stack Delivery",
      body: "Taking features and standalone apps from early idea and backend APIs all the way to production.",
    },
  ],
  experienceKicker: "04 / Experience",
  experienceTitleLead: "Where the",
  experienceTitleRest: "work happened.",
  experienceLede:
    "From client products to a bank’s micro-frontends to an enterprise fund platform.",
  roles: [
    {
      company: "FundGuard",
      title: "Frontend Developer",
      dates: "Sep 2025 — Aug 2026",
      context: "",
      latest: true,
      where: "Tel Aviv District · Hybrid",
      chips: ["React", "GraphQL", "Playwright"],
      bullets: [
        [
          { strong: "Sole frontend engineer" },
          " on a 7-person squad, with 100% on-time delivery across 4 major quarterly releases of an enterprise React and GraphQL fund platform.",
        ],
        [
          "Owned the ",
          { strong: "Reconciliation platform" },
          ", the squad’s flagship, up to Manual Matching over 100k+ records with real-time backend balance calculations.",
        ],
        [
          "Owned ",
          { strong: "Playwright E2E quality" },
          " across 4,000+ tests and resolved 100+ flaky ones, cutting failures under 4%.",
        ],
      ] as readonly (readonly RichPart[])[],
    },
    {
      company: "Matrix",
      title: "Full Stack Developer",
      dates: "Oct 2024 — Sep 2025",
      context: "Mizrahi Bank",
      latest: false,
      where: "Israel",
      chips: ["React", "TypeScript", "NestJS", "Module Federation"],
      bullets: [
        [
          "Led ",
          { strong: "frontend modernization" },
          " of Mizrahi Bank’s digital platforms, with legacy AngularJS and jQuery running alongside modern React micro-frontends.",
        ],
        [
          "Engineered ",
          { strong: "Vite Module Federation" },
          " infrastructure for core banking apps, with shared session auth and event-driven messaging.",
        ],
        [
          "Co-built an enterprise ",
          { strong: "MUI-based design system" },
          " adopted across 5+ micro-frontends, standardized through Storybook.",
        ],
      ] as readonly (readonly RichPart[])[],
    },
    {
      company: "Oversight",
      title: "Full Stack Developer",
      dates: "Jan 2022 — Oct 2024",
      context: "",
      latest: false,
      where: "Petah Tikva · Full-time",
      chips: ["React", "Node.js", "Next.js", "Electron"],
      bullets: [
        [
          "Delivered web and desktop apps across retail, e-commerce and messaging, including an ",
          { strong: "Electron POS" },
          ", Shopify apps and real-time WebSocket platforms.",
        ],
        [
          "Drove the ",
          { strong: "TypeScript migration" },
          ", introduced Sentry, and modernized state management with Zustand and TanStack Query.",
        ],
        [
          "Built a ",
          { strong: "GSAP-animated" },
          " gamified workout app and a server-rendered Next.js booking platform.",
        ],
      ] as readonly (readonly RichPart[])[],
    },
  ],
  projectsKicker: "05 / Projects",
  projectsTitle: "Things I’ve shipped.",
  projectsLede: "Side projects built for real use, not just demos.",
  projects: [
    {
      id: "winnow",
      tone: "cyan" as const,
      imageFirst: false,
      label: "Featured",
      labelExtra: "· Side project · AI / RAG",
      hideExtraOnMobile: false,
      name: "Winnow",
      body: "A private job-search workspace I built and use myself. It tailors resumes to job descriptions, strictly fact-based, with PDFs rendered in real time.",
      points: [
        [{ strong: "Adaptive RAG pipeline" }, " on PostgreSQL with pgvector"],
        [{ strong: "Weighted re-ranking" }, " calibrated on past match performance"],
        [{ strong: "OpenAI Structured Outputs" }, ": zero generated text"],
        [{ strong: "Real-time PDF" }, " rendering"],
      ] as readonly (readonly RichPart[])[],
      chips: [] as readonly string[],
      action: "Open Winnow ↗",
      actionStyle: "primary" as const,
      href: "https://winnow.ordamari.com",
      url: "winnow.ordamari.com",
      image: "/projects/winnow-preview.webp",
      width: 2140,
      height: 1150,
      alt: "Winnow home page",
    },
    {
      id: "garage",
      tone: "amber" as const,
      imageFirst: true,
      label: "Website & appointment system",
      labelExtra: "· in daily use",
      hideExtraOnMobile: true,
      name: "Damari Garage",
      body: "A website and appointment system for my family’s garage. Simple, clear UI was the top priority.",
      points: [
        [{ strong: "Landing page" }, " with live opening hours, navigation and one-tap WhatsApp"],
        [{ strong: "3D car" }, " built with three.js"],
        [{ strong: "Mobile-first Hebrew calendar" }, " with PIN login"],
        [{ strong: "Used by the team" }, " every day"],
      ] as readonly (readonly RichPart[])[],
      chips: ["React", "TypeScript", "three.js"] as readonly string[],
      action: "Visit the site ↗",
      actionStyle: "secondary" as const,
      href: "https://damari-garage.vercel.app/",
      url: "damari-garage.vercel.app",
      image: "/projects/damari-garage-preview.webp",
      width: 2380,
      height: 1300,
      alt: "Damari Garage home page",
    },
  ],
  contactKicker: "06 / Let’s talk",
  contactTitleLead: "Let’s build",
  contactTitleRest: "something solid.",
  contactBody: "Have a product, platform or idea worth building? I’m always glad to connect.",
  contactAction: "Connect on LinkedIn ↗",
  contactUrl: "linkedin.com/in/or-damari",
  footerNote: "© 2026 Or Damari",
} as const;
