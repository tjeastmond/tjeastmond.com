import type { ComponentType } from "react";
import AboutContent from "./chapters/AboutContent";
import type { ChapterId } from "./indexData";

const CHAPTER_CONTENT: Partial<Record<ChapterId, ComponentType>> = {
  about: AboutContent,
};

type ChapterBodyProps = {
  chapterId: ChapterId;
  title: string;
};

export default function ChapterBody({ chapterId, title }: ChapterBodyProps) {
  const Content = CHAPTER_CONTENT[chapterId];

  if (Content) {
    return <Content />;
  }

  return (
    <p className="chapter-placeholder folio-column">
      This folio entry is in preparation. Content for {title.toLowerCase()} will appear here in a future edition.
    </p>
  );
}
