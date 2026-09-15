import HeaderMeta from "./HeaderMeta";
import TitleBlock from "./TitleBlock";

type NovelShellProps = {
  children: React.ReactNode;
  align?: "center" | "top";
  showDescription?: boolean;
};

export default function NovelShell({ children, align = "center", showDescription = true }: NovelShellProps) {
  return (
    <div className={`content${align === "top" ? " content--top" : ""}`}>
      <div className="folio-header">
        <HeaderMeta />
        <TitleBlock showDescription={showDescription} />
      </div>
      {children}
    </div>
  );
}
