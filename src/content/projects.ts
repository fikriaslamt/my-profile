/**
 * Featured work. Rendered as large clickable rows in `SelectedWork.astro`.
 * `logo` is optional — omit it to fall back to a monogram tile.
 */
export type Project = {
  title: string;
  description: string;
  url: string;
  logo?: string;
  tags: string[];
  year: string;
};

export const projects: Project[] = [
  {
    title: "Deploy Golang",
    description:
      "A deployment-focused Go service built on the standard library and shipped with a GitHub Actions pipeline.",
    url: "https://github.com/fikriaslamt/deploy-golang",
    logo: "/projects/deploy-golang.svg",
    tags: ["Go", "net/http", "GitHub Actions"],
    year: "2025",
  },
  {
    title: "SI TPST Unila",
    description:
      "A web information system for the integrated waste-processing facility at Universitas Lampung, built as my undergraduate thesis.",
    url: "https://github.com/fikriaslamt/si-tpst",
    logo: "/projects/si-tpst.svg",
    tags: ["CodeIgniter 4", "PHP", "Tailwind CSS"],
    year: "2024",
  },
  {
    title: "Book API",
    description:
      "A REST API for managing books with Gin, GORM, and PostgreSQL, including JWT auth and layered handlers.",
    url: "https://github.com/fikriaslamt/book-api",
    logo: "/projects/book-api.svg",
    tags: ["Go", "Gin", "PostgreSQL"],
    year: "2023",
  },
  {
    title: "Kanban App",
    description:
      "A Kanban backend with boards, lists, and tasks, backed by PostgreSQL and shipped with Docker and Fly.io.",
    url: "https://github.com/fikriaslamt/kanban-app",
    logo: "/projects/kanban-app.svg",
    tags: ["Go", "GORM", "Docker"],
    year: "2022",
  },
];
