import {
  LayersControl,
  MapContainer,
  TileLayer,
  useMap,
  GeoJSON,
} from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useContext, useEffect, useRef, useState } from "react";
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
import { bounds } from "../../pages/map/components/data";
import fullScreenImgUrl from "../../assets/fullscreen.png";

const center: L.LatLngExpression = [-0.3809076267889981, 35.86911727658737];

function RefreshMap({ isFullscreen }: { isFullscreen: boolean }) {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
      map.setZoom(isFullscreen ? 11 : 9);
    }, 1);

    return () => clearTimeout(timer);
  }, [map, isFullscreen]);

  return null;
}

function MiniMap({
  description,
  data,
  url,
  purpose,
}: SingleMiniMapProps | DoubleMiniMapProps) {
  const [tileUrl, setTileUrl] = useState<string | null>(null);
  const [tileData, setTileData] = useState<ComparisonResponse["data"]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { mau_forest } = useContext(ShapefileContext)!;
  const miniMapContainer = useRef<HTMLDivElement>(null);

  async function handleFullscreenToggle() {
    if (!miniMapContainer.current) return;
    try {
      if (document.fullscreenElement === miniMapContainer.current) {
        await document.exitFullscreen();
      } else {
        await miniMapContainer.current.requestFullscreen();
      }
    } catch (error) {
      console.error("fullscreen error: ", error);
    }
  }

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(document.fullscreenElement === miniMapContainer.current);
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout> | null = null;

    let disposed = false;
    async function fetchTiles(signal: AbortSignal) {
      if (purpose !== "single") {
        const request = new Request(url, {
          method: "POST",
          body: JSON.stringify({
            data,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          signal,
        });

        const result = await fetch(request);
        const serverResponse = (await result.json()) as ComparisonResponse;
        const { data: responseData } = serverResponse;
        return responseData;
      }
      const request = new Request(url.concat(`/${data.dataset}/${data.year}`), {
        method: "GET",
      });
      const result = await fetch(request, {
        signal,
      });
      const tileData = (await result.json()) as SuccessfulResponse;

      const { data: responseData } = tileData;
      return responseData;
    }

    // function getTtl(
    //   data: SuccessfulResponse["data"] | ComparisonResponse["data"],
    // ) {
    //   if (Array.isArray(data)) {
    //     const ttls = data
    //       .map((item) => item.expiresIn)
    //       .filter((ttl): ttl is number => ttl !== null);

    //     if (ttls.length === 0) {
    //       return null;
    //     }

    //     return Math.min(...ttls);
    //   }

    //   return data.expiresIn;
    // }

    // function scheduleRefresh(ttl: number) {
    //   if (timer !== null) {
    //     clearTimeout(timer);
    //   }
    //   const buffer = 10;

    //   const delay = (ttl - buffer) * 1000;

    //   timer = setTimeout(() => {
    //     void refreshData();
    //   }, delay);
    // }

    async function refreshData() {
      try {
        const result = await fetchTiles(controller.signal);

        if (disposed) return;

        // const ttl = getTtl(result);

        if (disposed) return;

        if (Array.isArray(result)) {
          setTileData(result);
        } else {
          setTileUrl(result.map);
        }

        // Schedule the next refresh
        // if (ttl !== null) {
        //   scheduleRefresh(ttl);
        // }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error("Error fetching tiles:", error);
      }
    }

    void refreshData();
    return () => {
      disposed = true;
      controller.abort();

      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    };
  }, [data, url, purpose]);

  const forest_Style: L.StyleFunction = () => ({
    color: "#2E7D32",
    weight: 2,
    fillColor: "gray",
    fillOpacity: 0.2,
  });

  if (!mau_forest) return;

  return (
    <div className="mini-map-container" ref={miniMapContainer}>
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
            <>
              <LayersControl.BaseLayer
                name={`${data.dataset} ${data.year}`}
                checked
              >
                {tileUrl && <TileLayer url={tileUrl} noWrap={true} />}
              </LayersControl.BaseLayer>
              <LayersControl.Overlay name="mau forest">
                <GeoJSON data={mau_forest} style={forest_Style} />
              </LayersControl.Overlay>
            </>
          ) : purpose === "overlay" ? (
            <DatasetLayer data={tileData} />
          ) : (
            <ComparisonLayer data={tileData} />
          )}
        </LayersControl>
        <div
          className="full-screen-image-toggle-container"
          title={isFullscreen ? "collapse" : "fullscreen"}
          onClick={handleFullscreenToggle}
        >
          <img src={fullScreenImgUrl} alt="fullScreen" />
        </div>
        <RefreshMap isFullscreen={isFullscreen} />
      </MapContainer>
      <div className="map-description">
        <span className="description">{description}</span>
      </div>
    </div>
  );
}

export default MiniMap;
