import Socials from "@components/socials";
import Title from "@components/title";

export default function Home() {
  return (
    <div className="container">
      <div className="main-content">
        <Title />
        <p>This is some sample text to show the layout.</p>
        <Socials />
      </div>
    </div>
  );
}
