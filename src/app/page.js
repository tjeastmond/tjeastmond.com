import Blurb from "@/modules/blurb";
import Footer from "@/modules/footer";
// import Contact from "@/modules/contact";
// import Footer from "@/modules/footer";
import Logo from "@/modules/logo";

export default function Home() {
  return (
    <div className="wrapper">
      <div className="container">
        <Logo />
        <Blurb />
        <Footer />
      </div>
    </div>
  );
}
