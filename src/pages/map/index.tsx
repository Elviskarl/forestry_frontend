import LeafletMap from "./components/LeafletMap";
import Sidebar from "./components/Sidebar";
import "./styles/leafletMap.css";

function Map() {
  return (
    <section className="map-section-container">
      <section className="leaflet-map-container">
        <Sidebar />
        <LeafletMap />
      </section>
    </section>
  );
}

export default Map;
