import { INDEX_ROW_DOTS, type IndexRowData } from "./indexData";

type IndexRowProps = IndexRowData;

export default function IndexRow({ href, number, title, numeral }: IndexRowProps) {
  return (
    <a href={href} className="index-row">
      <span className="row-number">{number}</span>
      <span className="row-title">{title}</span>
      <span className="row-dots" aria-hidden="true">
        {INDEX_ROW_DOTS}
      </span>
      <span className="row-numeral">{numeral}</span>
    </a>
  );
}
