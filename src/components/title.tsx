import Scrambler from "@components/scramblerText";

export default function Title() {
  return (
    <h1>
      <Scrambler className="title" as="a" href="/" useHover={true} options={{ changes: 5 }}>
        &gt; tjeastmond_
      </Scrambler>
    </h1>
  );
}
