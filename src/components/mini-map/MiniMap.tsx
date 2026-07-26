import { LayersControl, MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

interface MiniMapProps {
  url: string;
}

function MiniMap({ url }: MiniMapProps) {
  useEffect(() => {
    async function fetchTiles() {
      try {
        const request = new Request(url, {
          method: "GET",
        });
        const result = await fetch(request);
        const data = await result.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTiles();
  }, [url]);
  return (
    <div className="mini-map-container">
      <MapContainer>
        <LayersControl position="topright"></LayersControl>
      </MapContainer>
    </div>
  );
}

export default MiniMap;
