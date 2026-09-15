import NovelPage from "@components/novel/NovelPage";

export function meta() {
  return [
    { title: "TJ Eastmond — Architect for the Modern Web" },
    {
      name: "description",
      content:
        "TJ Eastmond — Architect for the Modern Web. A personal repository and catalog of computer-aided crafts, system designs, and digital artifacts.",
    },
  ];
}

export default function Home() {
  return <NovelPage />;
}
