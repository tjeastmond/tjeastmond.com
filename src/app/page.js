import About from '@/modules/about';
import Blurb from '@/modules/blurb';
import Contact from '@/modules/contact';
import Footer from '@/modules/footer';
import Logo from '@/modules/logo';
import Skills from '@/modules/skills';

export default function Home() {
  return (
    <div className="container">
      <Logo />
      <Blurb />
      <div className="row">
        <hr />
      </div>
      <About />
      <div className="row" style={{ marginTop: '10rem' }}>
        <hr />
      </div>
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}
