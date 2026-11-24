import { ExternalLink } from "@/components/ExternalLink";
import { Rich } from "@/components/Rich";
import { heroSub, LINKEDIN_URL, profile } from "@/content/profile";

export function HeroCopy() {
  return (
    <div className="copy-slot hero-slot">
      <div className="hero-copy" data-step="hero">
        <p className="kicker" data-intro>
          <span className="kicker-rule" aria-hidden="true" />
          {profile.heroKicker}
        </p>
        <h1 data-intro>{profile.name}</h1>
        <p className="sub" data-intro>
          <Rich parts={heroSub} />
        </p>
        <div className="cta-row" data-intro>
          <ExternalLink className="btn btn-primary" href={LINKEDIN_URL}>
            {profile.ctaPrimary}
          </ExternalLink>
          <a className="btn btn-secondary" href="#about">
            {profile.ctaSecondary}
          </a>
        </div>
      </div>
    </div>
  );
}
