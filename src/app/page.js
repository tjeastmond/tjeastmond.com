import Blurb from "@/modules/blurb";
import Contact from "@/modules/contact";
import Footer from "@/modules/footer";
import Logo from "@/modules/logo";

export default function Home() {
  return (
    <div className="container">
      <Logo />
      <Blurb />
      <Contact />
      <Footer />
    </div>
  );
}
