import { profile } from "@/content/profile";

export function AboutBlock() {
  return (
    <div className="copy-slot">
      <div className="about-block" id="about" data-step="about">
        <p className="kicker" data-about-kicker>
          <span className="kicker-rule" aria-hidden="true" />
          {profile.aboutKicker}
        </p>
        <div data-about-card>
          <h2>
            {profile.aboutTitleLead}
            <br />
            {profile.aboutTitleRest}
          </h2>
          <p className="lead">{profile.aboutLead}</p>
          <p className="body">{profile.aboutBody}</p>
        </div>
      </div>
    </div>
  );
}
