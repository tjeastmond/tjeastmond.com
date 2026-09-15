import IndexRow from "./IndexRow";
import { INDEX_ROWS } from "./indexData";

export default function IndexTable() {
  return (
    <nav className="index-table folio-column" aria-label="Table of Contents">
      {INDEX_ROWS.map((row) => (
        <IndexRow key={row.id} {...row} />
      ))}
    </nav>
  );
}
