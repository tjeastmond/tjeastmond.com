import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import SocialPills from "./SocialPills";
import { EMAIL_LINK, PILL_LINKS, SOCIAL_LINKS } from "./socialLinkData";

describe("SocialPills", () => {
  const html = renderToStaticMarkup(<SocialPills />);
  const doc = new DOMParser().parseFromString(html, "text/html");
  const anchors = Array.from(doc.querySelectorAll("a.social-pill"));

  it("renders one pill per social link plus email, in data order", () => {
    expect(PILL_LINKS).toEqual([...SOCIAL_LINKS, EMAIL_LINK]);
    expect(anchors.map((a) => a.getAttribute("href"))).toEqual(PILL_LINKS.map(({ href }) => href));
    expect(anchors.map((a) => a.textContent)).toEqual(PILL_LINKS.map(({ label }) => label));
  });

  it("gives every pill a decorative inline SVG icon", () => {
    anchors.forEach((anchor) => {
      expect(anchor.querySelector("svg")?.getAttribute("aria-hidden")).toBe("true");
    });
  });

  it("opens external links in a new tab but not the mailto link", () => {
    anchors.forEach((anchor) => {
      const external = anchor.getAttribute("href")!.startsWith("http");
      expect(anchor.getAttribute("target")).toBe(external ? "_blank" : null);
    });
  });
});
