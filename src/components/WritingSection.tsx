type Post = {
  title: string;
  href: string;
  meta: string;
};

// Placeholder rows until the first posts are published.
const POSTS: Post[] = [
  { title: "[Post title]", href: "#", meta: "Coming soon" },
  { title: "[Post title]", href: "#", meta: "Coming soon" },
  { title: "[Post title]", href: "#", meta: "Coming soon" },
];

export default function WritingSection() {
  return (
    <section id="writing" aria-labelledby="writing-title" className="section">
      <div className="writing-head">
        <h2 id="writing-title" className="section-label section-label--inline">
          Writing
        </h2>
        <p className="writing-note">First posts are on the way.</p>
      </div>
      <ul className="post-list">
        {POSTS.map(({ title, href, meta }, i) => (
          <li key={i}>
            <a className="post-row" href={href}>
              <span className="post-title">{title}</span>
              <span className="post-meta">{meta}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
