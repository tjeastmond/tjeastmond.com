import Scrambler from "@components/scramblerText";

export default function Link({ url, text }) {
  return (
    <Scrambler href={url} as="a" useHover={true}>
      {text}
    </Scrambler>
  );
}
