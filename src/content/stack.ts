/**
 * Tech stack marquee. `icon` is a simple-icons key resolved in
 * `src/components/TechIcon.astro`; omit it for a neutral glyph.
 */
export type StackItem = {
  name: string;
  icon?: string;
};

export const stack: StackItem[] = [
  { name: "Go", icon: "go" },
  { name: "JavaScript", icon: "javascript" },
  { name: "PHP", icon: "php" },
  { name: "Node.js", icon: "nodejs" },
  { name: "REST APIs" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "MySQL", icon: "mysql" },
  { name: "Elasticsearch", icon: "elasticsearch" },
  { name: "MinIO", icon: "minio" },
  { name: "Gin", icon: "gin" },
  { name: "CodeIgniter 4", icon: "codeigniter" },
  { name: "Yii", icon: "yii" },
  { name: "Docker", icon: "docker" },
  { name: "Linux", icon: "linux" },
  { name: "Git", icon: "git" },
  { name: "Grafana", icon: "grafana" },
  { name: "Kibana", icon: "kibana" },
  { name: "Postman", icon: "postman" },
  { name: "Cloud", icon: "cloud" },
];
