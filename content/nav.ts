import { LINKEDIN_URL } from "./profile";

export const navLinks = [
  { id: "about", label: "About", href: "#about" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Projects", href: "#projects" },
] as const;

export const talkLink = {
  label: "Let’s talk",
  href: LINKEDIN_URL,
} as const;

export const footerLinks = [
  { id: "about", label: "About", href: "#about", external: false },
  { id: "experience", label: "Experience", href: "#experience", external: false },
  { id: "projects", label: "Projects", href: "#projects", external: false },
  { id: "linkedin", label: "LinkedIn", href: LINKEDIN_URL, external: true },
] as const;
