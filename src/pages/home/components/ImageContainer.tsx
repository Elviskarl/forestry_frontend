import CitationLink from "./CitationLink";

interface ImageContainerProps {
  url: string;
  attr: string;
  citation?: { id: string; position: number };
}
export default function ImageContainer({
  attr,
  url,
  citation,
}: ImageContainerProps) {
  return (
    <div className="image-container">
      <img src={url} alt="forest-blocks" />
      <span className="attribution">
        {attr}{" "}
        {citation && (
          <CitationLink id={citation.id} position={citation.position} />
        )}
      </span>
    </div>
  );
}
