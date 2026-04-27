export default function SiteHeader() {
  return (
    <header className="site-header">
      <a href="/" className="logo" aria-label="TJ Eastmond home">
        <div className="logo-mark" aria-hidden="true">
          TJE
        </div>
        <div className="logo-wordmark">
          <span className="logo-name">tjeastmond</span>
          <span className="logo-subtitle">Technical Leader &amp; Senior Software Engineer</span>
        </div>
      </a>
    </header>
  );
}
