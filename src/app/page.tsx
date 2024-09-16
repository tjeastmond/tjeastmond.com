import Socials from "@components/socials";
import Title from "@components/title";
import Link from "@components/link";

export default function Home() {
  return (
    <div className="container">
      <div className="main-content">
        <Title />
        <p>
          You've stumbled upon the homepage of TJ Eastmond: Girl Dad, Husband,
          Gamer, Marvel SNAP player, Engineering Manager, Software Engineer, and
          Data Engineer.
        </p>
        <p>
          Shoot me an <Link url="mailto:tj.eastmond@gmail.com" text="email" />,
          or{" "}
          <Link
            url="https://buymeacoffee.com/tjeastmond"
            text="Buy Me a Coffee"
          />
          .
        </p>
        <Socials />
      </div>
    </div>
  );
}
