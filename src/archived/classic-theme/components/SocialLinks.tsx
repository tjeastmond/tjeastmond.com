import { SOCIAL_LINKS } from "./socialLinkData";

export default function SocialLinks() {
  return (
    <nav aria-label="Social links" className="social-nav">
      {SOCIAL_LINKS.map(({ href, label, attribution, Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
          data-attribution-hover={attribution}
        >
          <Icon className="social-icon-svg" />
          <span className="sr-only">{label}</span>
        </a>
      ))}
    </nav>
  );
}
