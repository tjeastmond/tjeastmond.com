export type LinkProps = {
  url: string;
  text: string;
};

export default function Link({ url, text }: LinkProps) {
  return <a href={url}>{text}</a>;
}
