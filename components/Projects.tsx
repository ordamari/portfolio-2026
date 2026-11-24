import Image from "next/image";
import { ExternalLink } from "@/components/ExternalLink";
import { Rich } from "@/components/Rich";
import { profile } from "@/content/profile";

export function Projects() {
  return (
    <section className="section" id="projects">
      <div className="ambient ambient-projects" aria-hidden="true" />
      <div className="wrap">
        <div className="proj-head">
          <div>
            <p className="kicker">
              <span className="kicker-rule" aria-hidden="true" />
              {profile.projectsKicker}
            </p>
            <h2>{profile.projectsTitle}</h2>
          </div>
          <p className="lede">{profile.projectsLede}</p>
        </div>
        {profile.projects.map((project) => (
          <article
            className={`glass project-card project-${project.tone}${project.imageFirst ? " is-image-first" : ""}`}
            key={project.id}
          >
            <div className="project-copy">
              <p className={`project-label${project.hideExtraOnMobile ? " hides-extra" : ""}`}>
                {project.label}
                <span>{project.labelExtra}</span>
              </p>
              <h3>
                {project.name}
                <span className="name-dot">.</span>
              </h3>
              <p>{project.body}</p>
              <ul className="caps">
                {project.points.map((point) => (
                  <li key={point.map((part) => (typeof part === "string" ? part : part.strong)).join("")}>
                    <i aria-hidden="true" />
                    <span>
                      <Rich parts={point} />
                    </span>
                  </li>
                ))}
              </ul>
              {project.chips.length > 0 ? (
                <ul className="tags">
                  {project.chips.map((chip) => (
                    <li key={chip}>{chip}</li>
                  ))}
                </ul>
              ) : null}
              <div className="project-actions">
                <ExternalLink className={`btn btn-${project.actionStyle}`} href={project.href}>
                  {project.action}
                </ExternalLink>
                <span className="project-url">{project.url}</span>
              </div>
            </div>
            <div className={`project-art art-${project.tone}`}>
              <div className="browser">
                <div className="browser-bar" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <span>{project.url}</span>
                </div>
                <Image
                  src={project.image}
                  alt={project.alt}
                  width={project.width}
                  height={project.height}
                  sizes="(max-width: 767px) 100vw, 560px"
                  loading="lazy"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
