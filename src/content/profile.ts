/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE TO CUSTOMIZE THE WHOLE SITE.
 *  Every section reads from the `profile` object below.
 *  Search for "TODO" to find the values meant to be replaced.
 * ─────────────────────────────────────────────────────────────
 */

export type NavItem = { label: string; href: string };

export type ProjectStack = {
  label: string;
  value: string;
};

export type Project = {
  index: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  status: "Shipped" | "In progress" | "Archived";
  href: string;
  image: string;
  stack: ProjectStack[];
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
  name: "Fikri Aslam Taufiqurrahman",
  wordmark: "fikriaslam",
  initials: "FA",
  avatar: "/profile-picture.jpeg",
  role: "Software Engineer",
  location: "Pringsewu, Lampung, Indonesia",
  availability: "Open to backend roles",
  timezone: "GMT+7",

  /* ── Hero ───────────────────────────────────────────────── */
  headline: {
    before: "I build ",
    highlight: "backends",
    after: " that stay boring.",
  },
  lede:
    "Backend-focused software engineer working with Go, JavaScript, and PHP. I care about clean APIs, reliable data, and the quiet infrastructure that keeps a product running.",
  tagline: "", // optional: leave empty to build "role · location · availability"
  heroCard: {
    kicker: "PROFILE / 01",
    label: "Backend · Cloud",
    facts: [
      { value: "7 yrs", label: "On GitHub" },
      { value: "34", label: "Public repos" },
      { value: "3", label: "Languages" },
    ],
  },
  ctas: {
    primary: { label: "View projects", href: "#work" },
    secondary: { label: "Contact me", href: "#contact" },
  },
  cv: {
    label: "Download CV",
    href: "/cv/fikri-aslam-cv.pdf",
    filename: "Fikri-Aslam-CV.pdf",
  },
  marquee: [
    { label: "Go", icon: "go" },
    { label: "JavaScript", icon: "javascript" },
    { label: "PHP", icon: "php" },
    { label: "Node.js", icon: "nodejs" },
    { label: "REST APIs", icon: "rest" },
    { label: "PostgreSQL", icon: "postgresql" },
    { label: "MySQL", icon: "mysql" },
    { label: "Elasticsearch", icon: "elasticsearch" },
    { label: "MinIO", icon: "minio" },
    { label: "Gin", icon: "gin" },
    { label: "CodeIgniter 4", icon: "codeigniter" },
    { label: "Yii", icon: "yii" },
    { label: "Docker", icon: "docker" },
    { label: "Linux", icon: "linux" },
    { label: "Git", icon: "git" },
    { label: "Grafana", icon: "grafana" },
    { label: "Kibana", icon: "kibana" },
    { label: "Postman", icon: "postman" },
    { label: "Cloud", icon: "cloud" },
  ],

  /* ── Navigation ─────────────────────────────────────────── */
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavItem[],

  /* ── Projects ───────────────────────────────────────────── */
  projectsKicker: "SELECTED WORK",
  projectsTitle: "Backend systems I've built",
  projectsLede:
    "Public repositories from my work and study. Each one starts with a real problem: an API, a data model, or a deployment path.",
  projects: [
    {
      index: "01",
      title: "Deploy Golang",
      description:
        "A deployment-focused Go service built with the standard library and shipped with a GitHub Actions workflow.",
      tags: ["Go", "net/http", "GitHub Actions"],
      year: "2025",
      status: "Shipped",
      href: "https://github.com/fikriaslamt/deploy-golang",
      image: "/projects/deploy-golang.svg",
      stack: [
        { label: "Language", value: "Go 1.23" },
        { label: "HTTP", value: "net/http" },
        { label: "CI/CD", value: "GitHub Actions" },
        { label: "Focus", value: "Deployment" },
      ],
    },
    {
      index: "02",
      title: "SI TPST Unila",
      description:
        "Web-based information system for the integrated waste processing facility at Universitas Lampung. Built as my undergraduate thesis.",
      tags: ["CodeIgniter 4", "PHP", "Tailwind CSS"],
      year: "2024",
      status: "Shipped",
      href: "https://github.com/fikriaslamt/si-tpst",
      image: "/projects/si-tpst.svg",
      stack: [
        { label: "Language", value: "PHP 8 · JavaScript" },
        { label: "Framework", value: "CodeIgniter 4" },
        { label: "Styling", value: "Tailwind CSS" },
        { label: "Build", value: "Laravel Mix" },
        { label: "Data", value: "MySQL" },
        { label: "Context", value: "Undergraduate thesis" },
      ],
    },
    {
      index: "03",
      title: "Book API",
      description:
        "REST API for managing books, built with Gin, GORM, and PostgreSQL, including JWT auth and layered handlers.",
      tags: ["Go", "Gin", "PostgreSQL"],
      year: "2023",
      status: "Shipped",
      href: "https://github.com/fikriaslamt/book-api",
      image: "/projects/book-api.svg",
      stack: [
        { label: "Language", value: "Go 1.19" },
        { label: "Framework", value: "Gin" },
        { label: "ORM", value: "GORM" },
        { label: "Database", value: "PostgreSQL" },
        { label: "Auth", value: "JWT" },
      ],
    },
    {
      index: "04",
      title: "Kanban App",
      description:
        "Kanban backend with boards, lists, and tasks, backed by PostgreSQL and shipped with Docker and Fly.io.",
      tags: ["Go", "GORM", "PostgreSQL", "Docker"],
      year: "2022",
      status: "Shipped",
      href: "https://github.com/fikriaslamt/kanban-app",
      image: "/projects/kanban-app.svg",
      stack: [
        { label: "Language", value: "Go 1.16" },
        { label: "ORM", value: "GORM" },
        { label: "Database", value: "PostgreSQL" },
        { label: "Runtime", value: "Docker · Fly.io" },
        { label: "Tests", value: "Ginkgo" },
      ],
    },
  ] satisfies Project[],

  /* ── Code block ─────────────────────────────────────────── */
  stack: {
    kicker: "THE TOOLKIT",
    title: "Tools I reach for",
    lede:
      "The working set I use to build and ship backend services. It follows the problem, not the other way around.",
    filename: "profile.json",
    focus: ["backend", "apis", "cloud"],
    groups: {
      languages: ["Go", "JavaScript", "PHP"],
      backend: ["REST APIs", "Gin", "CodeIgniter 4", "Yii", "Node.js"],
      data: ["PostgreSQL", "MySQL", "Elasticsearch", "MinIO"],
      tooling: ["Docker", "Git", "Linux", "Fly.io", "Grafana", "Kibana", "Postman"],
    },
    currently: "Building backend services and learning in public.",
    principles: [
      {
        title: "Model the data first",
        note: "Schemas outlive frameworks. Get the relationships right before the handlers.",
      },
      {
        title: "Make failures visible",
        note: "Logs, clear errors, and health checks are part of the feature.",
      },
      {
        title: "Boring is a feature",
        note: "Simple systems are easier to operate, debug, and hand over.",
      },
    ],
  },

  /* ── Stats ──────────────────────────────────────────────── */
  stats: [
    { value: 7, suffix: "+", label: "Years on GitHub" },
    { value: 34, suffix: "", label: "Public repositories" },
    { value: 3, suffix: "", label: "Core languages" },
    { value: 2, suffix: "", label: "Focus areas" },
  ] satisfies Stat[],

  /* ── Experience ─────────────────────────────────────────── */
  aboutKicker: "EXPERIENCE",
  aboutTitle: "A short history",
  aboutLede:
    "Backend engineer with a degree from Universitas Lampung, a thesis in web information systems, and a habit of learning by shipping.",
  experience: [
    {
      period: "Now",
      role: "Software Engineer",
      company: "CODE.ID",
      description:
        "Building backend services and web applications with Go, JavaScript, and PHP, with a focus on APIs, data, and cloud delivery.",
      current: true,
    },
    {
      period: "2024",
      role: "Thesis · Web Information System",
      company: "Universitas Lampung",
      description:
        "Designed and built SI TPST Unila, a web-based information system for the university's integrated waste processing facility.",
    },
    {
      period: "Program",
      role: "Backend Development",
      company: "Digital Talent Scholarship",
      description:
        "Participated in a digital talent program focused on backend development and practical software engineering.",
    },
    {
      period: "Education",
      role: "Undergraduate · FMIPA",
      company: "Universitas Lampung",
      description:
        "Studied at the Faculty of Mathematics and Natural Sciences, with a thesis on a web-based information system for TPST Unila (2024).",
    },
  ] satisfies Experience[],

  /* ── Contact ────────────────────────────────────────────── */
  contact: {
    kicker: "CONTACT",
    title: {
      before: "Let's build something ",
      highlight: "reliable",
      after: ".",
    },
    lede:
      "I'm open to backend engineering roles and freelance work involving APIs, data, and cloud delivery. If you have a system that needs building or fixing, tell me about it.",
    email: "fikriaslam.t@gmail.com",
    emailLabel: "fikriaslam.t@gmail.com",
    note: "Based in Pringsewu, Lampung. Usually replies within a day.",
    socials: [
      { label: "GitHub", href: "https://github.com/fikriaslamt", icon: "github" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/fikri-aslam/", icon: "linkedin" },
      { label: "Email", href: "mailto:fikriaslam.t@gmail.com", icon: "mail" },
    ] satisfies Social[],
  },

  /* ── Footer ─────────────────────────────────────────────── */
  footer: {
    note: "Backend engineering, APIs, and cloud delivery.",
    columns: [
      {
        title: "Navigate",
        links: [
          { label: "Work", href: "#work" },
          { label: "Stack", href: "#stack" },
          { label: "About", href: "#about" },
        ],
      },
      {
        title: "Elsewhere",
        links: [
          { label: "GitHub", href: "https://github.com/fikriaslamt" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/fikri-aslam/" },
          { label: "Email", href: "mailto:fikriaslam.t@gmail.com" },
        ],
      },
    ],
  },

  /* ── SEO ────────────────────────────────────────────────── */
  seo: {
    title: "Fikri Aslam — Software Engineer",
    description:
      "Fikri Aslam Taufiqurrahman is a backend-focused software engineer in Lampung, Indonesia, building APIs and data-driven services with Go, JavaScript, and PHP.",
    site: "https://fikriaslam.my.id", // TODO: keep in sync with astro.config.mjs
    ogImage: "/og.png",
  },
};

export type Profile = typeof profile;
