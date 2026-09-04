import PrinterMarkIcon from "./PrinterMarkIcon";

export default function Colophon() {
  return (
    <div className="colophon">
      <hr className="colophon-rule" />
      <div className="printer-mark" title="Rock on">
        <PrinterMarkIcon />
      </div>
      <div className="colophon-meta">
        <span className="edition-line">Edition v4.2.1 &bull; Typeset in Cormorant &amp; Geist</span>
        <span className="printed-line">Printed and compiled on the Atlantic Coast of New Jersey</span>
      </div>
    </div>
  );
}
