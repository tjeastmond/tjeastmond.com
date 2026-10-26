const FOCUS_AREAS = [
  {
    index: "01",
    accent: "cyan",
    title: "Backend services",
    body: "APIs, data pipelines, and the unglamorous plumbing that keeps products fast and reliable at scale.",
  },
  {
    index: "02",
    accent: "violet",
    title: "Agentic workflows",
    body: "Pairing years of engineering judgment with AI agents to ship better software, faster, without cutting corners.",
  },
  {
    index: "03",
    accent: "cyan",
    title: "Off the clock",
    body: "Marvel SNAP, starting new games before finishing one, reading a ton, writing a little, and building cool shit.",
  },
];

export default function FocusSection() {
  return (
    <section aria-labelledby="focus-title" className="section">
      <h2 id="focus-title" className="section-label">
        What I work on
      </h2>
      <div className="focus-grid">
        {FOCUS_AREAS.map(({ index, accent, title, body }) => (
          <div key={index} className="focus-card">
            <p className={`focus-index accent-${accent}`}>{index}</p>
            <h3 className="focus-title">{title}</h3>
            <p className="focus-body">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
