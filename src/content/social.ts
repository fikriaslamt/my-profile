/**
 * Social links used in the navbar, footer, and JSON-LD.
 * `icon` maps to a brand mark in `src/components/Social.astro`.
 */
export type SocialIcon = "github" | "x" | "linkedin" | "instagram" | "mail";

export type SocialLink = {
  label: string;
  url: string;
  icon: SocialIcon;
};

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    url: "https://github.com/fikriaslamt",
    icon: "github",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/fikri-aslam/",
    icon: "linkedin",
  },
  {
    label: "Instagram",
    url: "https://instagram.com/your-handle", // TODO: replace
    icon: "instagram",
  },
  {
    label: "Email",
    url: "mailto:fikriaslam.t@gmail.com",
    icon: "mail",
  },
];
