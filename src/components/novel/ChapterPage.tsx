import { Link } from "react-router";
import ChapterBody from "./ChapterBody";
import Colophon from "./Colophon";
import NovelShell from "./NovelShell";
import type { InternalIndexRow } from "./indexData";

type ChapterPageProps = {
  chapter: InternalIndexRow;
};

export default function ChapterPage({ chapter }: ChapterPageProps) {
  return (
    <NovelShell align="top" showDescription={false}>
      <div className="chapter-header folio-column">
        <Link to="/" className="chapter-back">
          ← Table of Contents
        </Link>
        <div className="chapter-heading">
          <span className="chapter-number">{chapter.number}</span>
          <h2 className="chapter-title">{chapter.title}</h2>
          <span className="chapter-numeral">{chapter.numeral}</span>
        </div>
      </div>
      <ChapterBody chapterId={chapter.id} title={chapter.title} />
      <Colophon />
    </NovelShell>
  );
}
