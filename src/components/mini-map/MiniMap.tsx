import { LayersControl, MapContainer, TileLayer, useMap } from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useContext, useEffect, useState } from "react";
import "./styles/index.css";
import type { SuccessfulResponse } from "../types";
import { ShapefileContext } from "../../context/createShapefileContext";
import type { FeatureCollection } from "geojson";

interface MiniMapProps {
  description: string;
  url: string;
  data: MiniMapUrlDetails | MiniMapUrlDetails[];
}

interface MiniMapUrlDetails {
  dataset: "landsat" | "classification";
  year: number;
}

function FitToBounds({ data }: { data: FeatureCollection }) {
  const map = useMap();

  useEffect(() => {
    const layer = L.geoJSON(data);
    map.fitBounds(layer.getBounds());
  }, [data]);
  return null;
}

function MiniMap({ description, data, url }: MiniMapProps) {
  const [tileUrl, setTileUrl] = useState<string | null>(null);
  const { mau_forest } = useContext(ShapefileContext)!;

  useEffect(() => {
    async function fetchTiles() {
      try {
        if (Array.isArray(data)) {
          const request = new Request(url, {
            method: "POST",
            body: JSON.stringify({
              data: [
                { dataset: data[0].dataset, year: data[0].year },
                {
                  dataset: data[1].dataset,
                  year: data[1].year,
                },
              ],
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const result = await fetch(request);
          const tileData = (await result.json()) as SuccessfulResponse;
          console.log(tileData);

          return;
        }
        const request = new Request(
          url.concat(`/${data.dataset}/${data.year}`),
          {
            method: "GET",
          },
        );
        const result = await fetch(request);
        const tileData = (await result.json()) as SuccessfulResponse;

        const { data: responseData } = tileData;
        const { map } = responseData;
        setTileUrl(map);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTiles();
  }, [data, url]);

  if (!mau_forest) return;
  return (
    <div className="mini-map-container">
      <MapContainer>
        <FitToBounds data={mau_forest} />
        <LayersControl position="topright">
          <LayersControl.BaseLayer name="Landsat 1984" checked>
            {tileUrl && <TileLayer url={tileUrl} />}
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>
      <div className="map-description">
        <span className="description">{description}</span>
      </div>
    </div>
  );
}

export default MiniMap;
