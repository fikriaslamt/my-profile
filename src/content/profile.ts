/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE FIRST.
 *  Identity, hero copy, bio, photos, links, and SEO live here.
 *  Search for "TODO" to find values meant to be replaced.
 * ─────────────────────────────────────────────────────────────
 */
import type { ImageMetadata } from "astro";
import photo from "../assets/profile-picture.jpeg";

export type HeroPhoto = {
  src: ImageMetadata;
  alt: string;
  caption: string;
};

export type NavItem = {
  label: string;
  href: string;
};

export const profile = {
  /* ── Identity ───────────────────────────────────────────── */
  firstName: "Fikri",
  fullName: "Fikri Aslam Taufiqurrahman",
  wordmark: "fikriaslam",
  role: "Software engineer",
  // The phrase rendered in the accent color inside the hero headline.
  roleEmphasis: "reliable backends",
  headlineAfter: ".",
  tagline:
    "I design and ship APIs, data models, and the quiet infrastructure behind products that stay online.",

  location: "Pringsewu, Lampung, Indonesia", // TODO: update if you move
  timezone: "GMT+7",
  email: "fikriaslam.t@gmail.com",

  availability: {
    label: "Open to work",
    detail: "Backend roles · freelance",
    open: true, // TODO: set false to hide the pulsing availability pill
  },

  /* ── Photos ─────────────────────────────────────────────── */
  avatar: photo,
  avatarAlt: "Portrait of Fikri Aslam",
  // 1–2 photos for the About section. Replace the imports above with your own
  // image files in src/assets and add them to this array.
  heroPhotos: [
    {
      src: photo,
      alt: "Fikri Aslam in a portrait photo",
      caption: "@fikriaslamt",
    },
    {
      src: photo,
      alt: "A second portrait of Fikri Aslam",
      caption: "Lampung, ID",
    },
  ] satisfies HeroPhoto[],

  /* ── About ──────────────────────────────────────────────── */
  bio: [
    "I'm a backend-focused software engineer based in Lampung, Indonesia. Most of my work is about making the invisible parts of a product dependable: endpoints, schemas, jobs, and deploy paths.",
    "I currently build services at CODE.ID with Go, JavaScript, and PHP. My day usually starts with a messy requirement and ends with something smaller, clearer, and easier to operate.",
    "I studied at Universitas Lampung, where my thesis was a web information system for the campus waste-processing facility — the first time I shipped software that people actually used every day.",
    "I learn by building in public: small repos, small experiments, and notes when something finally clicks. You can follow along on GitHub.",
    "I care about boring systems. Predictable deploys, visible failures, and code the next person can read without a meeting.",
  ],
  // Optional short facts shown under the bio.
  facts: [
    { label: "Based in", value: "Lampung, ID" },
    { label: "Focus", value: "Backend · APIs · Cloud" },
    { label: "Currently", value: "Software Engineer at CODE.ID" }, // TODO: keep current
    { label: "Timezone", value: "GMT+7" },
  ],

  /* ── Links ──────────────────────────────────────────────── */
  resumeUrl: "https://resume.fikriaslam.my.id/", // TODO: replace with your PDF URL or /resume.pdf
  bookingUrl: "https://cal.com/your-handle", // TODO: replace with your scheduling link

  /* ── Navigation ─────────────────────────────────────────── */
  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavItem[],

  /* ── SEO ────────────────────────────────────────────────── */
  seo: {
    title: "Fikri Aslam — Software Engineer",
    description:
      "Fikri Aslam Taufiqurrahman is a backend-focused software engineer in Lampung, Indonesia, building APIs, data models, and cloud delivery with Go, JavaScript, and PHP.",
    site: "https://fikriaslam.my.id", // keep in sync with astro.config.mjs
    ogImage: "/og.png",
    twitterHandle: "", // TODO: e.g. "@yourhandle" (optional)
  },
};

export type Profile = typeof profile;
