import { ExternalLink } from "@/components/ExternalLink";
import { LINKEDIN_URL, RESUME_URL, profile } from "@/content/profile";

export function HeroCopy() {
  return (
    <div className="copy-slot hero-slot">
      <div className="hero-copy" data-step="hero">
        <p className="avail" data-intro>
          <span className="avail-dot" aria-hidden="true" />
          {profile.avail}
        </p>
        <h1 data-intro>{profile.name}</h1>
        <p className="roles" data-intro>
          <span className="chip">{profile.roleChip}</span>
          <span>{profile.roleSep}</span>
          <span>{profile.roleRest}</span>
        </p>
        <p className="sub" data-intro>
          {profile.heroSub}
        </p>
        <div className="cta-row" data-intro>
          <ExternalLink className="btn btn-primary" href={RESUME_URL}>
            {profile.ctaPrimary}
          </ExternalLink>
          <ExternalLink className="btn btn-secondary" href={LINKEDIN_URL}>
            {profile.ctaSecondary}
          </ExternalLink>
        </div>
      </div>
    </div>
  );
}
