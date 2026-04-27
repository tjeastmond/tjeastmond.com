export type LinkProps = {
  url: string;
  text: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

export default function Link({ url, text, target, rel, ariaLabel }: LinkProps) {
  const isExternal = url.startsWith("http") || url.startsWith("mailto:");
  const linkRel = rel ?? (isExternal ? "noopener noreferrer" : undefined);

  return (
    <a href={url} target={target} rel={linkRel} aria-label={ariaLabel}>
      {text}
    </a>
  );
}
