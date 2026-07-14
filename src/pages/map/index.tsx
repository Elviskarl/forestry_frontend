import LeafletMap from "./components/LeafletMap";
import "./styles/leafletMap.css";

function Map() {
  return (
    <section className="leaflet-map-container">
      <LeafletMap />
    </section>
  );
}

export default Map;
