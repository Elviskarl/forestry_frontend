import { MapContainer, TileLayer, LayersControl, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useContext } from "react";
import { ShapefileContext } from "../../../context/createShapefileContext";
import type { StyleFunction } from "leaflet";

function LeafletMap() {
  const { target_counties, mau_forest } = useContext(ShapefileContext)!;
  if (!target_counties || !mau_forest) return;

  const counties_Style: StyleFunction = () => ({
    color: "#2E7D32",
    weight: 2,
    fillColor: "#66BB6A",
    fillOpacity: 0.2,
  });
  const forest_Style: StyleFunction = () => ({
    color: "#000",
    weight: 2,
    fillColor: "gray",
    fillOpacity: 0.2,
  });
  return (
    <MapContainer zoom={12} scrollWheelZoom={true} center={[-0.55, 35.648]}>
      <LayersControl position="topright">
        <LayersControl.BaseLayer name="OpenStreetMap" checked>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satellite View">
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            maxZoom={20}
            subdomains={["mt1", "mt2", "mt3"]}
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name="Counties">
          <GeoJSON data={target_counties} style={counties_Style} />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="mau forest">
          <GeoJSON data={mau_forest} style={forest_Style} />
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}

export default LeafletMap;
