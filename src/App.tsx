import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Link from "@components/link";
import LiteModeToggle from "@components/LiteModeToggle";
import Socials from "@components/socials";
import Title from "@components/title";
import "@styles/hack.css";

export default function App() {
  return (
    <>
      <div className="container">
        <div className="main-content">
          <Title />
          <p>
            You&apos;ve stumbled upon the homepage of TJ Eastmond: Girl Dad, Husband, Gamer, Marvel SNAP player,
            Engineering Manager, Software Engineer, and Data Engineer.
          </p>
          <p>
            Shoot me an <Link url="mailto:tj.eastmond@gmail.com" text="email" />, or{" "}
            <Link url="https://buymeacoffee.com/tjeastmond" text="Buy Me a Coffee" />.
          </p>
          <Socials />
        </div>
      </div>
      <LiteModeToggle />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
