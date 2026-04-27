import type { ComponentType, SVGProps } from "react";
import { IconBluesky, IconGithub, IconGlobe, IconLinkedIn, IconSteam } from "./SiteIcons";

export type SocialAttribution = "github" | "linkedin" | "steam" | "bluesky" | "swoo";

export type SocialLink = {
  href: string;
  label: string;
  attribution: SocialAttribution;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const SOCIAL_ATTRIBUTION_LABELS: Record<SocialAttribution, string> = {
  github: "github",
  linkedin: "linkedin",
  steam: "steam",
  bluesky: "bluesky",
  swoo: "swoo.io",
};

export const SOCIAL_LINKS: SocialLink[] = [
  { href: "https://github.com/tjeastmond", label: "GitHub", attribution: "github", Icon: IconGithub },
  {
    href: "https://www.linkedin.com/in/tjeastmond/",
    label: "LinkedIn",
    attribution: "linkedin",
    Icon: IconLinkedIn,
  },
  { href: "https://steamcommunity.com/id/spiteshow", label: "Steam", attribution: "steam", Icon: IconSteam },
  {
    href: "https://bsky.app/profile/tjeastmond.bsky.social",
    label: "Bluesky",
    attribution: "bluesky",
    Icon: IconBluesky,
  },
  { href: "https://swoo.io", label: "Swoo.io", attribution: "swoo", Icon: IconGlobe },
];
