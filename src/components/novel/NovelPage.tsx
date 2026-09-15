import Colophon from "./Colophon";
import IndexTable from "./IndexTable";
import NovelShell from "./NovelShell";

export default function NovelPage() {
  return (
    <NovelShell>
      <IndexTable />
      <Colophon />
    </NovelShell>
  );
}
