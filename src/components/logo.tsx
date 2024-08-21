import Scrambler from "@components/scramblerText";

export default function Logo(props = {}) {
  return <Scrambler as="h1" onHover={true} text="&gt; tjeastmond_" {...props} />;
}
