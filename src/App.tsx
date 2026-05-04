import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Link from "@components/link";
import SiteHeader from "@components/SiteHeader";
import SocialRow from "@components/SocialRow";
import "@styles/global.css";

export default function App() {
  return (
    <>
      <main className="page">
        <div className="main-content">
          <SiteHeader />
          <div className="body-text">
            <p>
              My name is TJ - girl dad first, everything else second. That everything else includes working as a Senior
              Technical Leader and Software Engineer. I build backend services and tooling that power platforms from
              fintech to foodtech. I lean into agentic workflows, drawing on my long history as an engineer to produce
              higher-quality software faster with the assistance of Agents.
            </p>
            <p>
              I&apos;m an avid gamer currently enjoying Marvel SNAP, and starting new games before finishing one I
              started only a weekend ago. I&apos;m usually reading a ton, writing a little, or building something I
              didn&apos;t need to build.
            </p>
            <p>
              Best way to reach me is by <Link url="mailto:tj.eastmond@gmail.com" text="email" />. Links below if
              you&apos;d rather lurk first.
            </p>
          </div>
          <SocialRow />
        </div>
      </main>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
