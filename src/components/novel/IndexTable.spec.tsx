import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import IndexTable from "./IndexTable";
import { INDEX_ROWS } from "./indexData";

describe("IndexTable", () => {
  it("renders six index rows with correct hrefs and text", () => {
    const html = renderToStaticMarkup(<IndexTable />);
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
});
