import Socials from "@components/socials";
import Title from "@components/title";
import Link from "@components/link";

export default function Home() {
  return (
    <div className="container">
      <div className="main-content">
        <Title />
        <p>
          You've stumbled upon the homepage of TJ Eastmond: a Girl Dad, Husband, Gamer, Marvel SNAP
          player, Engineering Managers, and Software and Data Engineer.
        </p>
        <p>
          Shoot me an <Link url="mailto:tj.eastmond@gmail.com" text="email" />.
        </p>
        <Socials />
      </div>
    </div>
  );
}
