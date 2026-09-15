import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";
import IndexTable from "./IndexTable";
import { GITHUB_PROFILE_URL, INDEX_ROWS, LINKEDIN_PROFILE_URL } from "./indexData";

describe("IndexTable", () => {
  it("renders six index rows with correct hrefs and text", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <IndexTable />
      </MemoryRouter>,
    );
    const doc = new DOMParser().parseFromString(html, "text/html");

    const rows = doc.querySelectorAll("a.index-row");
    expect(rows).toHaveLength(6);

    rows.forEach((row, index) => {
      expect(row.getAttribute("href")).toBe(INDEX_ROWS[index].href);
      expect(row.querySelector(".row-number")?.textContent).toBe(INDEX_ROWS[index].number);
      expect(row.querySelector(".row-title")?.textContent).toBe(INDEX_ROWS[index].title);
      expect(row.querySelector(".row-numeral")?.textContent).toBe(INDEX_ROWS[index].numeral);
    });
  });

  it("opens external profile rows in a new tab", () => {
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <IndexTable />
      </MemoryRouter>,
    );
    const doc = new DOMParser().parseFromString(html, "text/html");
    const rows = [...doc.querySelectorAll("a.index-row")];

    const githubRow = rows.find((row) => row.getAttribute("href") === GITHUB_PROFILE_URL);
    const linkedinRow = rows.find((row) => row.getAttribute("href") === LINKEDIN_PROFILE_URL);

    expect(githubRow?.getAttribute("target")).toBe("_blank");
    expect(githubRow?.getAttribute("rel")).toBe("noopener noreferrer");
    expect(linkedinRow?.getAttribute("target")).toBe("_blank");
    expect(linkedinRow?.getAttribute("rel")).toBe("noopener noreferrer");
  });
});
