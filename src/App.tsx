import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import NovelPage from "@components/novel/NovelPage";
import "@styles/global.css";

export default function App() {
  return (
    <>
      <NovelPage />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
