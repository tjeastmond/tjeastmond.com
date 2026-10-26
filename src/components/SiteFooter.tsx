import { scrollToTop } from "../hooks/scrollToTop";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>&copy; {new Date().getFullYear()} TJ Eastmond</span>
      <a href="#top" onClick={scrollToTop} className="back-to-top">
        Back to top &uarr;
      </a>
    </footer>
  );
}
