import Colophon from "./Colophon";
import HeaderMeta from "./HeaderMeta";
import IndexTable from "./IndexTable";
import TitleBlock from "./TitleBlock";

export default function NovelPage() {
  return (
    <div className="content">
      <HeaderMeta />
      <TitleBlock />
      <IndexTable />
      <Colophon />
    </div>
  );
}
