import { Rich } from "@/components/Rich";
import { profile } from "@/content/profile";

export function Experience() {
  return (
    <section className="section" id="experience">
      <div className="ambient ambient-exp" aria-hidden="true" />
      <div className="wrap exp-grid">
        <aside className="exp-side">
          <p className="kicker">
            <span className="kicker-rule" aria-hidden="true" />
            {profile.experienceKicker}
          </p>
          <h2>
            {profile.experienceTitleLead}
            <br />
            {profile.experienceTitleRest}
          </h2>
          <p className="lede">{profile.experienceLede}</p>
        </aside>
        <div className="timeline">
          {profile.roles.map((role) => (
            <article className={role.latest ? "role is-current" : "role"} key={role.company}>
              <span className="node" aria-hidden="true" />
              <p className="role-meta">
                <span>{role.dates}</span>
                {role.latest ? <span className="latest">Latest</span> : null}
                {role.context ? (
                  <>
                    <span className="meta-sep" aria-hidden="true">
                      ·
                    </span>
                    <span>{role.context}</span>
                  </>
                ) : null}
              </p>
              <div className="role-head">
                <h3>{role.company}</h3>
                <p className="role-title">{role.title}</p>
              </div>
              <p className="role-where">{role.where}</p>
              <div className="glass role-card">
                <ul>
                  {role.bullets.map((bullet) => (
                    <li key={bullet.map((part) => (typeof part === "string" ? part : part.strong)).join("")}>
                      <Rich parts={bullet} />
                    </li>
                  ))}
                </ul>
                <ul className="tags">
                  {role.chips.map((chip) => (
                    <li key={chip}>{chip}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
