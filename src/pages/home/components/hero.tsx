import "../styles/index.css";

function Hero() {
  return (
    <div className="hero">
      <div className="hero-texts">
        <h1 className="hero-title">Above the canopy</h1>
        <h3 className="hero-subtitle">
          Tracking the Changing Landscape of the Mau Forest
        </h3>
      </div>
      <div className="hero-footer">
        <span className="image-source-link-container">
          Aerial view of Mau forest -{" "}
          <a
            href="https://infonile.org/en/2022/10/how-politics-has-subverted-conservation-efforts-to-protect-kenyas-mau-forest/"
            target="_blank"
            className="image-source-link"
          >
            infonile.org
          </a>
        </span>
      </div>
    </div>
  );
}

export default Hero;
