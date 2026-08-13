import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useContext, useEffect, useState } from "react";
import "./styles/index.css";
import type {
  ComparisonResponse,
  DoubleMiniMapProps,
  SingleMiniMapProps,
  SuccessfulResponse,
} from "../types";
import { ShapefileContext } from "../../context/createShapefileContext";
import { ComparisonLayer } from "./component/ComparisonLayer";
import DatasetLayer from "./component/DatasetLayer";

const bounds: L.LatLngBoundsExpression = [
  [-0.9995495358277411, 35.23259689084519], // southwest
  [0.23773428224974488, 36.50563766232956], // northeast
];
const center: L.LatLngExpression = [-0.3809076267889981, 35.86911727658737];

function MiniMap({
  description,
  data,
  url,
  purpose,
}: SingleMiniMapProps | DoubleMiniMapProps) {
  const [tileUrl, setTileUrl] = useState<string | null>(null);
  const [tileData, setTileData] = useState<ComparisonResponse["data"]>([]);
  const { mau_forest } = useContext(ShapefileContext)!;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const refreshBuffer = 10;
    async function fetchTiles() {
      try {
        if (purpose !== "single") {
          const request = new Request(url, {
            method: "POST",
            body: JSON.stringify({
              data,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const result = await fetch(request);
          const serverResponse = (await result.json()) as ComparisonResponse;
          const { data: responseData } = serverResponse;
          setTileData(responseData);

          const ttl = responseData
            .map((tile) => tile.expiresIn)
            .filter((ttl) => ttl !== null);

          if (ttl.length > 0) {
            const minTtl = Math.min(...ttl);
            timer = setTimeout(
              fetchTiles,
              Math.max(1000, (minTtl - refreshBuffer) * 1000),
            );
          }
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

        if (responseData.expiresIn !== null) {
          const ttl = Math.min(responseData.expiresIn);
          timer = setTimeout(
            fetchTiles,
            Math.max(1000, (ttl - refreshBuffer) * 1000),
          );
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchTiles();

    return () => {
      clearTimeout(timer);
    };
  }, [data, url, purpose]);

  if (!mau_forest) return;

  return (
    <div className="mini-map-container">
      <MapContainer
        center={center}
        minZoom={9}
        scrollWheelZoom={true}
        zoom={9}
        bounds={bounds}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
      >
        <LayersControl position="topright">
          {purpose === "single" && "dataset" in data ? (
            <LayersControl.BaseLayer
              name={`${data.dataset} ${data.year}`}
              checked
            >
              {tileUrl && <TileLayer url={tileUrl} noWrap={true} />}
            </LayersControl.BaseLayer>
          ) : purpose === "overlay" ? (
            <DatasetLayer data={tileData} />
          ) : (
            <ComparisonLayer data={tileData} />
          )}
        </LayersControl>
      </MapContainer>
      <div className="map-description">
        <span className="description">{description}</span>
      </div>
    </div>
  );
}

export default MiniMap;
