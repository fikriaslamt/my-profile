/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE TO CUSTOMIZE THE WHOLE SITE.
 *  Every section reads from the `profile` object below.
 *  Search for "TODO" to find the values meant to be replaced.
 * ─────────────────────────────────────────────────────────────
 */

export type NavItem = { label: string; href: string };

export type Pillar = {
  index: string;
  label: string;
  title: string;
  description: string;
  icon: "layers" | "code";
  bullets: string[];
  href: string;
  cta: string;
};

export type Step = {
  index: string;
  title: string;
  description: string;
};

export type FlowNode = {
  label: string;
  title: string;
  note: string;
};

export type Project = {
  index: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  status: "Shipped" | "In progress" | "Archived";
  href: string;
};

export type Stat = {
  value: number;
  suffix?: string;
  label: string;
};

export type Experience = {
  period: string;
  role: string;
  company: string;
  description: string;
  current?: boolean;
};

export type Social = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "x" | "mail";
};

export const profile = {
  /* ── Identity ───────────────────────────────────────────── */
  name: "Your Name", // TODO
  wordmark: "yourname", // TODO: shown in the navbar
  initials: "YN", // TODO: avatar initials
  role: "Product Engineer", // TODO
  location: "Jakarta, Indonesia", // TODO
  availability: "Open for select work", // TODO
  timezone: "GMT+7",

  /* ── Hero ───────────────────────────────────────────────── */
  headline: {
    before: "I design and build ",
    highlight: "products", // rendered with a white marker highlight
    after: " that feel inevitable.",
  },
  lede:
    "I work in the space between a rough idea and a shipped interface. Focused on clarity, speed, and the small details that make software feel considered.",
  tagline: "", // optional: leave empty to build "role · location · availability"
  heroCard: {
    kicker: "PROFILE / 01",
    label: "Independent practice",
    facts: [
      { value: "7 yrs", label: "Building" },
      { value: "40+", label: "Projects" },
      { value: "<24h", label: "Reply" },
    ],
  },
  ctas: {
    primary: { label: "View projects", href: "#work" },
    secondary: { label: "Contact me", href: "#contact" },
  },
  marquee: [
    "TypeScript",
    "Astro",
    "React",
    "Design systems",
    "Tailwind CSS",
    "Node.js",
    "Postgres",
    "Accessibility",
    "Prototyping",
    "Figma",
  ],

  /* ── Navigation ─────────────────────────────────────────── */
  nav: [
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavItem[],

  /* ── Two pillars ("What I do") ──────────────────────────── */
  pillars: [
    {
      index: "01",
      label: "PRODUCT",
      title: "Shape the thing worth building",
      description:
        "From a half-formed brief to a sharp product direction. I help teams decide what to make, what to cut, and how it should feel.",
      icon: "layers",
      bullets: [
        "Discovery and problem framing",
        "Interface systems that scale",
        "Prototypes that answer real questions",
      ],
      href: "#work",
      cta: "See product work",
    },
    {
      index: "02",
      label: "ENGINEERING",
      title: "Ship it, then make it fast",
      description:
        "Production frontends built to be maintained. Type-safe, accessible, and tuned until the interaction disappears.",
      icon: "code",
      bullets: [
        "Type-safe frontends with Astro and React",
        "Design-system driven UI",
        "Performance and accessibility budgets",
      ],
      href: "#stack",
      cta: "See the stack",
    },
  ] satisfies Pillar[],

  /* ── Process stepper ────────────────────────────────────── */
  process: [
    {
      index: "01",
      title: "Listen",
      description:
        "Start with the constraint, not the solution. I map the problem, the users, and the thing that actually hurts.",
    },
    {
      index: "02",
      title: "Frame",
      description:
        "Turn findings into a point of view: one clear direction, a small surface area, and trade-offs written down.",
    },
    {
      index: "03",
      title: "Build",
      description:
        "Ship the thinnest real version. Tight loops, real content, and decisions made in the browser instead of a deck.",
    },
    {
      index: "04",
      title: "Sharpen",
      description:
        "Measure, remove friction, and polish the details that make people trust the thing they are using.",
    },
  ] satisfies Step[],

  /* ── Flow diagram ───────────────────────────────────────── */
  flow: {
    kicker: "THE PATH",
    title: "One loop, four moves",
    lede:
      "A project is not a straight line, but the shape is predictable. Each pass through the loop leaves less guesswork behind.",
    caption:
      "Every step produces an artifact you can react to — a note, a screen, a build, a metric.",
    nodes: [
      { label: "INPUT", title: "Signal", note: "Interviews · data" },
      { label: "SHAPE", title: "Frame", note: "Scope · direction" },
      { label: "MAKE", title: "Build", note: "Interface · code" },
      { label: "LEARN", title: "Ship", note: "Measure · refine" },
    ] satisfies FlowNode[],
  },

  /* ── Projects ───────────────────────────────────────────── */
  projectsKicker: "SELECTED WORK",
  projectsTitle: "Things I have shipped",
  projectsLede:
    "A small selection of product and interface work. Replace these placeholders with your own case studies.",
  projects: [
    {
      index: "01",
      title: "Northwind",
      description:
        "A calm operations dashboard for messy real-world data. Fewer charts, better questions, faster decisions.",
      tags: ["Product design", "Next.js", "TypeScript"],
      year: "2026",
      status: "Shipped",
      href: "#",
    },
    {
      index: "02",
      title: "Ledger",
      description:
        "A component and token system that let a small team ship consistent UI across four products without a design police.",
      tags: ["Design system", "Astro", "Tailwind"],
      year: "2025",
      status: "Shipped",
      href: "#",
    },
    {
      index: "03",
      title: "Relay",
      description:
        "Realtime handoff tool for distributed teams. Presence, comments, and state that never needs a refresh.",
      tags: ["Realtime", "WebSocket", "React"],
      year: "2025",
      status: "In progress",
      href: "#",
    },
    {
      index: "04",
      title: "Field Notes",
      description:
        "An editorial home for long-form writing. Quiet typography, fast pages, and motion that stays out of the way.",
      tags: ["Editorial", "CMS", "Motion"],
      year: "2024",
      status: "Shipped",
      href: "#",
    },
  ] satisfies Project[],

  /* ── Code block ─────────────────────────────────────────── */
  stack: {
    kicker: "THE TOOLKIT",
    title: "Tools I reach for",
    lede:
      "Boring where it counts, sharp where it matters. This is the working set — it changes as the problem does.",
    filename: "profile.json",
    focus: ["product", "frontend", "design systems"],
    groups: {
      languages: ["TypeScript", "JavaScript", "SQL"],
      frontend: ["Astro", "React", "Tailwind CSS"],
      backend: ["Node.js", "Postgres", "Edge functions"],
      tooling: ["Vite", "Playwright", "Figma"],
    },
    currently: "Building small, sharp tools for the web.",
    principles: [
      {
        title: "Interfaces over artifacts",
        note: "Decisions get made in the browser, not in a deck.",
      },
      {
        title: "Accessible by default",
        note: "Keyboard paths, contrast, and semantics are part of the build.",
      },
      {
        title: "Fast is a feature",
        note: "Ship less JavaScript and let the platform do the work.",
      },
    ],
  },

  /* ── Stats ──────────────────────────────────────────────── */
  stats: [
    { value: 7, suffix: "+", label: "Years building" },
    { value: 40, suffix: "+", label: "Projects shipped" },
    { value: 12, suffix: "", label: "Teams partnered" },
    { value: 99, suffix: "", label: "Avg. Lighthouse" },
  ] satisfies Stat[],

  /* ── Experience ─────────────────────────────────────────── */
  aboutKicker: "EXPERIENCE",
  aboutTitle: "A short history",
  aboutLede:
    "Independent by choice, collaborative by default. I have worked across early-stage products, studios, and in-house teams.",
  experience: [
    {
      period: "2024 — Now",
      role: "Product Engineer",
      company: "Independent",
      description:
        "Partnering with small teams to take products from prototype to launch. Design, frontend, and the glue in between.",
      current: true,
    },
    {
      period: "2021 — 2024",
      role: "Senior Frontend Engineer",
      company: "Studio North",
      description:
        "Led the frontend for a multi-product platform and built the design system that kept it coherent.",
    },
    {
      period: "2019 — 2021",
      role: "Frontend Engineer",
      company: "Ledger Labs",
      description:
        "Shipped data-heavy interfaces for finance teams. Learned to make dense information feel quiet.",
    },
    {
      period: "2017 — 2019",
      role: "Designer & Developer",
      company: "Freelance",
      description:
        "Websites, identities, and the occasional small application. The years that taught me to finish things.",
    },
  ] satisfies Experience[],

  /* ── Contact ────────────────────────────────────────────── */
  contact: {
    kicker: "CONTACT",
    title: {
      before: "Let's build something ",
      highlight: "worth shipping",
      after: ".",
    },
    lede:
      "I take on a small number of projects at a time. If you have a product that needs shape, or a team that needs momentum, tell me about it.",
    email: "hello@your-domain.com", // TODO
    emailLabel: "hello@your-domain.com",
    note: "Usually replies within a day. Based in Jakarta, working across time zones.",
    socials: [
      { label: "GitHub", href: "https://github.com/your-handle", icon: "github" },
      { label: "LinkedIn", href: "https://linkedin.com/in/your-handle", icon: "linkedin" },
      { label: "X", href: "https://x.com/your-handle", icon: "x" },
      { label: "Email", href: "mailto:hello@your-domain.com", icon: "mail" },
    ] satisfies Social[],
  },

  /* ── Footer ─────────────────────────────────────────────── */
  footer: {
    note: "Designing and building sharp interfaces for the web.",
    columns: [
      {
        title: "Navigate",
        links: [
          { label: "Work", href: "#work" },
          { label: "Process", href: "#process" },
          { label: "Stack", href: "#stack" },
          { label: "About", href: "#about" },
        ],
      },
      {
        title: "Elsewhere",
        links: [
          { label: "GitHub", href: "https://github.com/your-handle" },
          { label: "LinkedIn", href: "https://linkedin.com/in/your-handle" },
          { label: "X", href: "https://x.com/your-handle" },
          { label: "Email", href: "mailto:hello@your-domain.com" },
        ],
      },
    ],
  },

  /* ── SEO ────────────────────────────────────────────────── */
  seo: {
    title: "Your Name — Product Engineer",
    description:
      "Personal profile of Your Name, a product engineer designing and building sharp interfaces for the web.",
    site: "https://fikriaslam.my.id", // TODO: keep in sync with astro.config.mjs
    ogImage: "/og.png",
  },
};

export type Profile = typeof profile;
