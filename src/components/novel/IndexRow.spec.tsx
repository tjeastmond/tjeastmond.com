import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import IndexRow from "./IndexRow";
import { GITHUB_PROFILE_URL, INDEX_ROWS, LINKEDIN_PROFILE_URL } from "./indexData";

describe("IndexRow", () => {
  it("renders an internal route with React Router Link", () => {
    const about = INDEX_ROWS[0];
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <IndexRow {...about} />
      </MemoryRouter>,
    );
    const doc = new DOMParser().parseFromString(html, "text/html");
    const row = doc.querySelector("a.index-row");

    expect(row?.getAttribute("href")).toBe("/about");
    expect(row?.getAttribute("target")).toBeNull();
    expect(row?.getAttribute("rel")).toBeNull();
  });

  it("renders external profile links in a new tab", () => {
    const github = INDEX_ROWS.find((row) => row.id === "github");
    const linkedin = INDEX_ROWS.find((row) => row.id === "linkedin");

    if (!github || !linkedin) {
      throw new Error("Expected GitHub and LinkedIn index rows");
    }

    const githubHtml = renderToStaticMarkup(<IndexRow {...github} />);
    const linkedinHtml = renderToStaticMarkup(<IndexRow {...linkedin} />);

    const githubDoc = new DOMParser().parseFromString(githubHtml, "text/html");
    const linkedinDoc = new DOMParser().parseFromString(linkedinHtml, "text/html");

    const githubRow = githubDoc.querySelector("a.index-row");
    const linkedinRow = linkedinDoc.querySelector("a.index-row");

    expect(githubRow?.getAttribute("href")).toBe(GITHUB_PROFILE_URL);
    expect(githubRow?.getAttribute("target")).toBe("_blank");
    expect(githubRow?.getAttribute("rel")).toBe("noopener noreferrer");

    expect(linkedinRow?.getAttribute("href")).toBe(LINKEDIN_PROFILE_URL);
    expect(linkedinRow?.getAttribute("target")).toBe("_blank");
    expect(linkedinRow?.getAttribute("rel")).toBe("noopener noreferrer");
  });
});
