import { Link } from "react-router";
import { INDEX_ROW_DOTS, isExternalIndexRow, type IndexRowData } from "./indexData";

type IndexRowProps = IndexRowData;

function IndexRowContent({ number, title, numeral }: Pick<IndexRowData, "number" | "title" | "numeral">) {
  return (
    <>
      <span className="row-number">{number}</span>
      <span className="row-title">{title}</span>
      <span className="row-dots" aria-hidden="true">
        {INDEX_ROW_DOTS}
      </span>
      <span className="row-numeral">{numeral}</span>
    </>
  );
}

export default function IndexRow(row: IndexRowProps) {
  if (isExternalIndexRow(row)) {
    return (
      <a href={row.href} className="index-row" target="_blank" rel="noopener noreferrer">
        <IndexRowContent number={row.number} title={row.title} numeral={row.numeral} />
      </a>
    );
  }

  return (
    <Link to={row.href} className="index-row">
      <IndexRowContent number={row.number} title={row.title} numeral={row.numeral} />
    </Link>
  );
}
