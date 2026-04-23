import type { ComponentType, SVGProps } from "react";
import { Bird, Gamepad2, Github, Globe, Linkedin } from "lucide-react";

// was fab: fa-github-alt, fa-linkedin-in, fa-steam, fa-bluesky

type LucideIcon = ComponentType<SVGProps<SVGSVGElement>>;

type Item = { label: string; link: string; icon: LucideIcon };

const socials: Item[] = [
  { label: "GitHub", link: "https://github.com/tjeastmond", icon: Github },
  { label: "LinkedIn", link: "https://www.linkedin.com/in/tjeastmond/", icon: Linkedin },
  { label: "Steam", link: "https://steamcommunity.com/id/spiteshow", icon: Gamepad2 },
  { label: "Bluesky", link: "https://bsky.app/profile/tjeastmond.bsky.social", icon: Bird },
  { label: "Swoo.io", link: "https://swoo.io", icon: Globe },
];

export default function Socials() {
  return (
    <ul className="social-media">
      {socials.map(({ label, link, icon: Icon }) => (
        <li key={label}>
          <a className="social-icon" href={link} rel="noopener noreferrer" target="_blank" aria-label={label}>
            <span className="label">{label}</span>
            <Icon className="social-icon-lucide" aria-hidden focusable="false" />
          </a>
        </li>
      ))}
    </ul>
  );
}
