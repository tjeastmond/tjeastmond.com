/** Enough periods to fill desktop index-table width; overflow:hidden on .row-dots clips excess. */
export const INDEX_ROW_DOTS =
  "......................................................................................................................";

export const CHAPTER_IDS = ["about", "work", "writing", "contact"] as const;

export type ChapterId = (typeof CHAPTER_IDS)[number];

export const EXTERNAL_LINK_IDS = ["github", "linkedin"] as const;

export type ExternalLinkId = (typeof EXTERNAL_LINK_IDS)[number];

export type InternalIndexRow = {
  kind: "internal";
  id: ChapterId;
  href: `/${ChapterId}`;
  number: string;
  title: string;
  numeral: string;
};

export type ExternalIndexRow = {
  kind: "external";
  id: ExternalLinkId;
  href: string;
  number: string;
  title: string;
  numeral: string;
};

export type IndexRowData = InternalIndexRow | ExternalIndexRow;

export const GITHUB_PROFILE_URL = "https://github.com/tjeastmond";
export const LINKEDIN_PROFILE_URL = "https://www.linkedin.com/in/tjeastmond/";

export const INDEX_ROWS: IndexRowData[] = [
  { kind: "internal", id: "about", href: "/about", number: "01.", title: "About the Engineer", numeral: "I" },
  { kind: "internal", id: "work", href: "/work", number: "02.", title: "Selected Code & Craft", numeral: "II" },
  { kind: "internal", id: "writing", href: "/writing", number: "03.", title: "Writings & Essays", numeral: "III" },
  {
    kind: "external",
    id: "github",
    href: GITHUB_PROFILE_URL,
    number: "04.",
    title: "GitHub Repository",
    numeral: "IV",
  },
  {
    kind: "external",
    id: "linkedin",
    href: LINKEDIN_PROFILE_URL,
    number: "05.",
    title: "LinkedIn Profile",
    numeral: "V",
  },
  {
    kind: "internal",
    id: "contact",
    href: "/contact",
    number: "06.",
    title: "Contact & Telegraphy",
    numeral: "VI",
  },
];

export const INTERNAL_INDEX_ROWS = INDEX_ROWS.filter(isInternalIndexRow);

export const PRERENDER_PATHS = ["/", ...INTERNAL_INDEX_ROWS.map((row) => row.href)];

export function isInternalIndexRow(row: IndexRowData): row is InternalIndexRow {
  return row.kind === "internal";
}

export function isExternalIndexRow(row: IndexRowData): row is ExternalIndexRow {
  return row.kind === "external";
}

export function getChapterById(id: string | undefined): InternalIndexRow | undefined {
  if (!id) {
    return undefined;
  }

  return INDEX_ROWS.find((row): row is InternalIndexRow => row.kind === "internal" && row.id === id);
}

export function isChapterId(id: string): id is ChapterId {
  return (CHAPTER_IDS as readonly string[]).includes(id);
}

export function getIndexRowById(id: string): IndexRowData | undefined {
  return INDEX_ROWS.find((row) => row.id === id);
}
