import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;
type IconFrameProps = IconProps & {
  children: ReactNode;
  strokeWidth?: string | number;
  variant?: "stroke" | "fill";
  viewBox?: string;
};

function IconFrame({
  children,
  strokeWidth = 1.5,
  variant = "stroke",
  viewBox = "0 0 24 24",
  ...props
}: IconFrameProps) {
  const sharedProps = {
    width: "1em",
    height: "1em",
    viewBox,
    "aria-hidden": true,
    ...props,
  };

  if (variant === "fill") {
    return (
      <svg {...sharedProps} fill="currentColor">
        {children}
      </svg>
    );
  }

  return (
    <svg
      {...sharedProps}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function IconLinkedIn(props: IconProps) {
  return (
    <IconFrame {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </IconFrame>
  );
}

export function IconGlobe(props: IconProps) {
  return (
    <IconFrame {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </IconFrame>
  );
}

export function IconGithub(props: IconProps) {
  return (
    <IconFrame {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.75v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </IconFrame>
  );
}

export function IconSun(props: IconProps) {
  return (
    <IconFrame {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </IconFrame>
  );
}

export function IconMoon(props: IconProps) {
  return (
    <IconFrame {...props}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </IconFrame>
  );
}

export function IconSteam(props: IconProps) {
  return (
    <IconFrame {...props}>
      <path d="M9 2.2c5.41 0 9.8 4.39 9.8 9.8s-4.39 9.8-9.8 9.8" />
      <circle cx="9" cy="12" r="5.3" />
    </IconFrame>
  );
}

export function IconBluesky(props: IconProps) {
  return (
    <IconFrame viewBox="-0.75 -0.75 17.5 17.5" strokeWidth={1.2} {...props}>
      <path d="M3.468 1.948C5.303 3.325 7.276 6.118 8 7.616c.725-1.498 2.698-4.29 4.532-5.668C13.855.955 16 .186 16 2.632c0 .489-.28 4.105-.444 4.692-.572 2.04-2.653 2.561-4.504 2.246 3.236.551 4.06 2.375 2.281 4.2-3.376 3.464-4.852-.87-5.23-1.98-.07-.204-.103-.3-.103-.218 0-.081-.033.014-.102.218-.379 1.11-1.855 5.444-5.231 1.98-1.778-1.825-.955-3.65 2.28-4.2-1.85.315-3.932-.205-4.503-2.246C.28 6.737 0 3.12 0 2.632 0 .186 2.145.955 3.468 1.948" />
    </IconFrame>
  );
}
