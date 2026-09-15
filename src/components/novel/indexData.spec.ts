import { describe, expect, it } from "vitest";
import {
  CHAPTER_IDS,
  GITHUB_PROFILE_URL,
  INDEX_ROWS,
  INTERNAL_INDEX_ROWS,
  LINKEDIN_PROFILE_URL,
  PRERENDER_PATHS,
  getChapterById,
  getIndexRowById,
  isChapterId,
  isExternalIndexRow,
  isInternalIndexRow,
} from "./indexData";

describe("indexData", () => {
  it("lists six index rows with internal chapters and external profiles", () => {
    expect(INDEX_ROWS).toHaveLength(6);
    expect(INTERNAL_INDEX_ROWS).toHaveLength(4);
    expect(INDEX_ROWS.filter(isExternalIndexRow)).toHaveLength(2);
  });

  it("links GitHub and LinkedIn rows to external profile URLs", () => {
    const github = getIndexRowById("github");
    const linkedin = getIndexRowById("linkedin");

    expect(github).toMatchObject({
      kind: "external",
      href: GITHUB_PROFILE_URL,
      title: "GitHub Repository",
    });
    expect(linkedin).toMatchObject({
      kind: "external",
      href: LINKEDIN_PROFILE_URL,
      title: "LinkedIn Profile",
    });
  });

  it("prerender paths include only internal chapter routes", () => {
    expect(PRERENDER_PATHS).toEqual(["/", "/about", "/work", "/writing", "/contact"]);
    expect(PRERENDER_PATHS).not.toContain(GITHUB_PROFILE_URL);
    expect(PRERENDER_PATHS).not.toContain(LINKEDIN_PROFILE_URL);
  });

  it("resolves internal chapters by id and excludes external rows", () => {
    expect(getChapterById("about")).toMatchObject({ kind: "internal", href: "/about" });
    expect(getChapterById("github")).toBeUndefined();
    expect(getChapterById("linkedin")).toBeUndefined();
  });

  it("identifies chapter ids for routing", () => {
    CHAPTER_IDS.forEach((id) => {
      expect(isChapterId(id)).toBe(true);
    });

    expect(isChapterId("github")).toBe(false);
    expect(isChapterId("linkedin")).toBe(false);
    expect(isInternalIndexRow(INDEX_ROWS[0])).toBe(true);
    expect(isExternalIndexRow(INDEX_ROWS[3])).toBe(true);
  });
});
