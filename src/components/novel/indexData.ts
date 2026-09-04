/** Enough periods to fill desktop index-table width; overflow:hidden on .row-dots clips excess. */
export const INDEX_ROW_DOTS =
  "......................................................................................................................";

export type IndexRowData = {
  href: string;
  number: string;
  title: string;
  numeral: string;
};

export const INDEX_ROWS: IndexRowData[] = [
  { href: "#about", number: "01.", title: "About the Engineer", numeral: "I" },
  { href: "#work", number: "02.", title: "Selected Code & Craft", numeral: "II" },
  { href: "#design", number: "03.", title: "Design Portfolio", numeral: "III" },
  { href: "#writing", number: "04.", title: "Writings & Essays", numeral: "IV" },
  { href: "#github", number: "05.", title: "GitHub Repository", numeral: "V" },
  { href: "#contact", number: "06.", title: "Contact & Telegraphy", numeral: "VI" },
];
