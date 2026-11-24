import { profile } from "@/content/profile";

export function CoreFocus() {
  return (
    <div className="copy-slot core-slot">
      <div className="focus-block" id="core-focus" data-step="focus">
        <p className="kicker" data-focus-kicker>
          <span className="kicker-rule" aria-hidden="true" />
          {profile.focusKicker}
        </p>
        <h2 data-focus-title>
          {profile.focusTitleLead}
          <br />
          {profile.focusTitleRest}
        </h2>
        <div className="focus-rows">
          {profile.focusRows.map((row) => (
            <article className="focus-row" key={row.number} data-focus-row>
              <h3>
                <span>{row.number}</span>
                {row.title}
              </h3>
              <p>{row.body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
