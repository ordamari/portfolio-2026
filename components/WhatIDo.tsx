import { ExternalLink } from "@/components/ExternalLink";
import { LINKEDIN_URL, RESUME_URL, profile } from "@/content/profile";

export function WhatIDo() {
  return (
    <div className="copy-slot">
      <div className="what-block" id="what-i-do" data-step="what">
        <p className="kicker" data-what-kicker>
          <span className="kicker-rule" aria-hidden="true" />
          {profile.whatKicker}
        </p>
        <h2 data-what-title>{profile.whatTitle}</h2>
        <div className="what-stack">
          <article className="glass what-card" data-what-card>
            <h3>{profile.teamTitle}</h3>
            <p className="who">{profile.teamWho}</p>
            <div className="rows">
              {profile.teamRows.map((row) => (
                <p key={row.label}>
                  <strong>{row.label}</strong> {row.value}
                </p>
              ))}
            </div>
            <ExternalLink className="card-link" href={RESUME_URL}>
              {profile.teamLink}
            </ExternalLink>
          </article>
          <article className="glass what-card" data-what-card>
            <h3>{profile.bizTitle}</h3>
            <p className="who">{profile.bizWho}</p>
            <ul className="ticks">
              {profile.bizTicks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <ExternalLink className="card-link card-link-violet" href={LINKEDIN_URL}>
              {profile.bizLink}
            </ExternalLink>
          </article>
        </div>
      </div>
    </div>
  );
}
