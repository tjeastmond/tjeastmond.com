import SocialPills from "./SocialPills";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero">
      <div className="hero-panel">
        <p className="eyebrow">hello, world</p>
        <h1 id="hero-title" className="hero-title">
          TJ Eastmond is a software engineer and technical leader building{" "}
          <span className="accent-cyan">backend services</span> and{" "}
          <span className="accent-violet">agentic workflows</span>.
        </h1>
        <p className="hero-lede">
          Girl dad first, everything else second. By day, a Senior Technical Leader building the backend services and
          tooling that power platforms from fintech to foodtech, with agents helping me ship higher-quality software,
          faster.
        </p>
        <SocialPills />
      </div>
    </section>
  );
}
