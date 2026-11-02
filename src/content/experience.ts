/**
 * Work experience timeline, newest first.
 * Dates are placeholders — TODO: replace `start` / `end` with real values.
 * `logo` points to an original monogram placeholder — TODO: swap in the
 * official company logo (64×64 SVG/PNG) when available.
 */
export type Experience = {
  role: string;
  company: string;
  url?: string;
  logo?: string;
  summary: string;
  start: string;
  end: string; // "Present" for the current role
};

export const experience: Experience[] = [
  {
    role: "Software Engineer",
    company: "CODE.ID",
    url: "https://code.id", // TODO: verify
    logo: "/companies/code-id.svg",
    summary:
      "Building backend services and web applications with Go, JavaScript, and PHP, focused on APIs, data, and cloud delivery.",
    start: "2024",
    end: "Present",
  },
  {
    role: "Thesis · Web Information System",
    company: "Universitas Lampung",
    url: "https://unila.ac.id",
    logo: "/companies/unila.svg",
    summary:
      "Designed and built SI TPST Unila, a web-based information system for the university's integrated waste-processing facility.",
    start: "2024",
    end: "2024",
  },
  {
    role: "Backend Development",
    company: "Digital Talent Scholarship",
    logo: "/companies/dts.svg",
    summary:
      "Completed a digital talent program focused on backend development and practical software engineering.",
    start: "2023",
    end: "2023",
  },
  {
    role: "Undergraduate · FMIPA",
    company: "Universitas Lampung",
    url: "https://unila.ac.id",
    logo: "/companies/unila.svg",
    summary:
      "Studied at the Faculty of Mathematics and Natural Sciences, graduating with a thesis on a web-based information system.",
    start: "2020",
    end: "2024",
  },
];
