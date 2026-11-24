import { ExternalLink } from "@/components/ExternalLink";
import { CONTACT_EMAIL, LINKEDIN_URL, profile } from "@/content/profile";

export function Contact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="wrap">
        <div className="contact-panel">
          <div className="contact-mesh" aria-hidden="true" />
          <p className="kicker kicker-center">
            <span className="kicker-rule" aria-hidden="true" />
            {profile.contactKicker}
          </p>
          <h2>
            {profile.contactTitleLead}
            <br />
            <span className="gradient-text">{profile.contactTitleRest}</span>
          </h2>
          <p>{profile.contactBody}</p>
          <div className="contact-actions">
            <ExternalLink className="btn btn-primary" href={LINKEDIN_URL}>
              {profile.contactAction}
            </ExternalLink>
            {CONTACT_EMAIL !== "" ? (
              <a className="mail-link" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            ) : null}
          </div>
          <p className="contact-url">{profile.contactUrl}</p>
        </div>
      </div>
    </section>
  );
}
