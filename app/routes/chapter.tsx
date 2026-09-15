import ChapterPage from "@components/novel/ChapterPage";
import { getChapterById } from "@components/novel/indexData";
import type { Route } from "./+types/chapter";

export function meta({ params }: Route.MetaArgs) {
  const chapter = getChapterById(params.chapterId);

  if (!chapter) {
    return [{ title: "Not Found — TJ Eastmond" }];
  }

  return [
    { title: `${chapter.title} — TJ Eastmond` },
    {
      name: "description",
      content: `Chapter ${chapter.numeral}: ${chapter.title}. A folio entry from TJ Eastmond's personal catalog.`,
    },
  ];
}

export default function Chapter({ params }: Route.ComponentProps) {
  const chapter = getChapterById(params.chapterId);

  if (!chapter) {
    throw new Response("Not Found", { status: 404 });
  }

  return <ChapterPage chapter={chapter} />;
}
