import { LINKEDIN_URL } from "./profile";

export const navItems = [
  { label: "About", href: "#about", external: false },
  { label: "LinkedIn", href: LINKEDIN_URL, external: true },
] as const;
