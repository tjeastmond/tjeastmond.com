import Socials from "@components/socials";
import Logo from "@components/logo";

export default function Home() {
  return (
    <div className="container">
      <div className="main-content">
        <Logo />
        <p>This is some sample text to show the layout.</p>
        <Socials />
      </div>
    </div>
  );
}
