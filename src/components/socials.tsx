import type { ComponentType, SVGProps } from "react";
import { IconBluesky, IconGithub, IconGlobe, IconLinkedIn, IconSteam, IconX } from "./SiteIcons";

type Item = { label: string; link: string; Icon: ComponentType<SVGProps<SVGSVGElement>> };

const socials: Item[] = [
  { label: "GitHub", link: "https://github.com/tjeastmond", Icon: IconGithub },
  { label: "LinkedIn", link: "https://www.linkedin.com/in/tjeastmond/", Icon: IconLinkedIn },
  { label: "X", link: "https://x.com/tjeastmond_", Icon: IconX },
  { label: "Bluesky", link: "https://bsky.app/profile/tjeastmond.bsky.social", Icon: IconBluesky },
  { label: "Steam", link: "https://steamcommunity.com/id/spiteshow", Icon: IconSteam },
  { label: "Swoo.io", link: "https://swoo.io", Icon: IconGlobe },
];

export default function Socials() {
  return (
    <ul className="social-media">
      {socials.map(({ label, link, Icon }) => (
        <li key={label}>
          <a className="social-icon" href={link} rel="noopener noreferrer" target="_blank" aria-label={label}>
            <span className="label">{label}</span>
            <Icon className="social-icon-svg" />
          </a>
        </li>
      ))}
    </ul>
  );
}
