import FloretIcon from "./FloretIcon";

type TitleBlockProps = {
  showDescription?: boolean;
};

export default function TitleBlock({ showDescription = true }: TitleBlockProps) {
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
      {showDescription ? (
        <p className="description">
          A personal repository and catalog of computer-aided crafts, system designs, and various digital artifacts
          produced at the intersection of engineering and visual style.
        </p>
      ) : null}
    </div>
  );
}
