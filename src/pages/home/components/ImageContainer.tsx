interface ImageContainerProps {
  url: string;
  attr: string;
}
export default function ImageContainer({ attr, url }: ImageContainerProps) {
  return (
    <div className="image-container">
      <img src={url} alt="forest-blocks" />
      <span className="attribution">{attr}</span>
    </div>
  );
}
