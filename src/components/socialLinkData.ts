import type { ComponentType, SVGProps } from "react";
// IconBluesky is kept in SiteIcons for when the Bluesky link comes back.
import { IconGithub, IconGlobe, IconLinkedIn, IconMail, IconSteam, IconX } from "./SiteIcons";

export type SocialLink = {
  href: string;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const EMAIL_LINK: SocialLink = { href: "mailto:tj.eastmond+hi@gmail.com", label: "Email", Icon: IconMail };

export const LINKEDIN_LINK: SocialLink = {
  href: "https://www.linkedin.com/in/tjeastmond/",
  label: "LinkedIn",
  Icon: IconLinkedIn,
};

export const SOCIAL_LINKS: SocialLink[] = [
  { href: "https://github.com/tjeastmond", label: "GitHub", Icon: IconGithub },
  LINKEDIN_LINK,
  { href: "https://x.com/tjeastmond_", label: "x.com", Icon: IconX },
  // { href: "https://bsky.app/profile/tjeastmond.bsky.social", label: "Bluesky", Icon: IconBluesky },
  { href: "https://steamcommunity.com/id/spiteshow", label: "Steam", Icon: IconSteam },
  { href: "https://swoo.io", label: "swoo.io", Icon: IconGlobe },
];

/** Hero pill row: every social link, then email. */
export const PILL_LINKS: SocialLink[] = [...SOCIAL_LINKS, EMAIL_LINK];
