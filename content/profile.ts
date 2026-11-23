const rsquo = "\u2019";
const mdash = "\u2014";
const dot = "\u00b7";
const arrow = "\u2192";

export const LINKEDIN_URL = "https://www.linkedin.com/in/or-damari";

/** Until a resume PDF exists, the hiring CTA uses the LinkedIn profile. */
export const RESUME_URL = LINKEDIN_URL;

export const profile = {
  avail: `Open to work ${dot} Israel`,
  name: "Or Damari",
  roleChip: "Frontend",
  roleSep: "/",
  roleRest: "Full Stack Engineer",
  heroSub:
    `I build product interfaces in React, TypeScript, and Node.js ${mdash} the kind of frontend that has to stay fast and clear even when the data and the workflows get complicated.`,
  ctaPrimary: "Hiring? See my resume",
  ctaSecondary: `Need a site or app? Let${rsquo}s talk`,
  scrollHint: "Scroll to meet me",
  aboutKicker: "02 / About",
  aboutTitleLead: "The work",
  aboutTitleRest: "behind the UI.",
  aboutLead:
    `I care about the work behind the UI too: performance, design systems other teams can actually use, and tests that don${rsquo}t flake.`,
  aboutBody:
    `That${rsquo}s been the through-line, whether I was the only frontend on a small squad or working inside a large banking platform. On the side I built Winnow, a tool I use myself to tailor resumes with a RAG pipeline.`,
  whatKicker: "03 / What I do",
  whatTitle: "Built for both sides.",
  teamTitle: "For teams",
  teamWho: "Recruiters & product orgs",
  teamRows: [
    { label: "Frontend", value: "React, TypeScript, micro-frontends" },
    { label: "Backend & data", value: "Node.js, GraphQL" },
    { label: "Quality", value: "Playwright" },
    { label: "AI", value: "RAG pipelines" },
  ],
  teamLink: `Hiring? See my resume ${arrow}`,
  bizTitle: "For businesses",
  bizWho: "Founders & local companies",
  bizTicks: [
    "A landing page for your business",
    "An internal tool or dashboard",
    "AI features for a product you already have",
  ],
  bizLink: `Need a site or app? Let${rsquo}s talk ${arrow}`,
} as const;
