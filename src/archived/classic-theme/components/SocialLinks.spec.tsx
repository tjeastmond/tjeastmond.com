import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import SocialLinks from "./SocialLinks";
import { SOCIAL_LINKS } from "./socialLinkData";

describe("SocialLinks", () => {
  it("renders six social anchors with expected hrefs and inline SVG icons", () => {
    const html = renderToStaticMarkup(<SocialLinks />);
    const doc = new DOMParser().parseFromString(html, "text/html");

    const anchors = doc.querySelectorAll("a.social-link");
    expect(anchors).toHaveLength(6);

    const hrefs = Array.from(anchors).map((anchor) => anchor.getAttribute("href"));
    expect(hrefs).toEqual(SOCIAL_LINKS.map(({ href }) => href));

    anchors.forEach((anchor) => {
      expect(anchor.querySelector("svg")).not.toBeNull();
      expect(anchor.querySelector("i[class*='fa-']")).toBeNull();
    });
  });
});
