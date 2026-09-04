import FloretIcon from "./FloretIcon";

export default function TitleBlock() {
  return (
    <div className="title-block">
      <div className="main-title">
        <h1>TJ EASTMOND</h1>
        <span className="subtitle">Architect for the Modern Web</span>
      </div>
      <div className="floret">
        <span className="floret-line" />
        <span className="floret-icon">
          <FloretIcon />
        </span>
        <span className="floret-line" />
      </div>
      <p className="description">
        A personal repository and catalog of computer-aided crafts, system designs, and various digital artifacts
        produced at the intersection of engineering and visual style.
      </p>
    </div>
  );
}
