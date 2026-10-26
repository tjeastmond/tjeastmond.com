import { IconArrowRight } from "./SiteIcons";
import { EMAIL_LINK, LINKEDIN_LINK } from "./socialLinkData";

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="contact">
      <h2 id="contact-title" className="contact-title">
        Let&rsquo;s talk.
      </h2>
      <p className="contact-lede">
        Best way to reach me is by email.
        <br />
        Links up top if you&rsquo;d rather lurk first.
      </p>
      <div className="contact-actions">
        <a className="cta" href={EMAIL_LINK.href}>
          Email me
          <IconArrowRight className="cta-arrow" />
        </a>
        <a className="pill contact-pill" href={LINKEDIN_LINK.href} target="_blank" rel="noopener noreferrer">
          Connect on LinkedIn
        </a>
      </div>
    </section>
  );
}
