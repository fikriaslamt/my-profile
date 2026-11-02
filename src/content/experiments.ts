/**
 * Small experiments — lighter, smaller builds.
 * TODO: replace the placeholder URLs with your own repos or demos.
 */
export type Experiment = {
  title: string;
  description: string;
  url: string;
};

export const experiments: Experiment[] = [
  {
    title: "Endpoint Inspector",
    description:
      "A tiny CLI that diffs OpenAPI responses between environments and prints only what changed.",
    url: "https://github.com/fikriaslamt", // TODO
  },
  {
    title: "Seed Kit",
    description:
      "Generates deterministic seed data from a database schema so local resets stop being a chore.",
    url: "https://github.com/fikriaslamt", // TODO
  },
  {
    title: "JSON → Go Structs",
    description:
      "Paste a JSON payload, get typed Go structs with tags. A weekend exercise in code generation.",
    url: "https://github.com/fikriaslamt", // TODO
  },
  {
    title: "Uptime Notes",
    description:
      "A cron job, SQLite, and a single status page for watching the side projects nobody else watches.",
    url: "https://github.com/fikriaslamt", // TODO
  },
];
