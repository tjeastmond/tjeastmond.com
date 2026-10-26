import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function StrokeIcon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconGithub(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M9 19c-4 1.5-4-2-6-2.5M15 22v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.7 11.7 0 0 0-6.2 0C6.6 2.8 5.6 3.1 5.6 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.2 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V22" />
    </StrokeIcon>
  );
}

export function IconLinkedIn(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </StrokeIcon>
  );
}

export function IconX(props: IconProps) {
  return (
    <StrokeIcon fill="currentColor" stroke="none" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </StrokeIcon>
  );
}

export function IconBluesky(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M12 11C10.5 8 7 4.2 4.6 3.2 3.4 2.7 2.8 3.2 2.8 4.6c0 1 .4 4.8.7 5.8.8 2.4 3.3 3 5.7 2.6-3.3.7-4.3 2.9-2.4 4.9 2.8 2.9 4.4-.3 5.2-2.5.8 2.2 2.4 5.4 5.2 2.5 1.9-2 .9-4.2-2.4-4.9 2.4.4 4.9-.2 5.7-2.6.3-1 .7-4.8.7-5.8 0-1.4-.6-1.9-1.8-1.4C17 4.2 13.5 8 12 11z" />
    </StrokeIcon>
  );
}

export function IconSteam(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <path d="M9 2.2c5.41 0 9.8 4.39 9.8 9.8s-4.39 9.8-9.8 9.8" />
      <circle cx="9" cy="12" r="5.3" />
    </StrokeIcon>
  );
}

export function IconGlobe(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
    </StrokeIcon>
  );
}

export function IconMail(props: IconProps) {
  return (
    <StrokeIcon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </StrokeIcon>
  );
}

export function IconPause(props: IconProps) {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M9 5v14M15 5v14" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconPlay(props: IconProps) {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M7 5l12 7-12 7z" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
