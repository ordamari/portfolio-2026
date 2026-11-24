import { ExternalLink } from "@/components/ExternalLink";
import { footerLinks } from "@/content/nav";
import { CONTACT_EMAIL, profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-bar">
        <div className="footer-brand">
          <a className="logo" href="#top">
            or<span className="logo-dot">.</span>
          </a>
          <p>{profile.footerNote}</p>
        </div>
        <nav aria-label="Footer">
          {footerLinks.map((item) =>
            item.external ? (
              <ExternalLink key={item.id} href={item.href}>
                {item.label} <span className="ext-arrow" aria-hidden="true">↗</span>
              </ExternalLink>
            ) : (
              <a key={item.id} href={item.href}>
                {item.label}
              </a>
            ),
          )}
          {CONTACT_EMAIL !== "" ? (
            <a className="mail-link" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          ) : null}
        </nav>
      </div>
    </footer>
  );
}
