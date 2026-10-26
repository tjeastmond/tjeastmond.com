import { PILL_LINKS } from "./socialLinkData";

export default function SocialPills() {
  return (
    <ul aria-label="Elsewhere" className="social-pills">
      {PILL_LINKS.map(({ href, label, Icon }) => {
        const external = href.startsWith("http");
        return (
          <li key={href}>
            <a
              className="pill social-pill"
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
            >
              <Icon />
              {label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
