import {
  MapContainer,
  TileLayer,
  LayersControl,
  GeoJSON,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import {
  useContext,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from "react";
import { ShapefileContext } from "../../../context/createShapefileContext";
import type { StyleFunction } from "leaflet";
import { bounds } from "./data";
import type { selectedTileDetails } from "../../../components/types";
import { ClassificationLegend } from "../../../components/mini-map/component/DatasetLayer";

function LayerComparison({
  data,
  setterFunction,
}: {
  data: selectedTileDetails[];
  setterFunction: Dispatch<SetStateAction<boolean>>;
}) {
  const map = useMap();

  useEffect(() => {
    if (data.length !== 2) return;

    const comparisonPane = map.createPane("comparisonPane");
    comparisonPane.style.zIndex = "450";

    const beforeLayer = L.tileLayer(data[0].url, {
      noWrap: true,
      pane: "comparisonPane",
    });

    const afterLayer = L.tileLayer(data[1].url, {
      noWrap: true,
      pane: "comparisonPane",
    });

    let loaded = 0;

    const handleLoad = () => {
      loaded++;

      if (loaded === 2) {
        setterFunction(false);
      }
    };

    beforeLayer.once("load", handleLoad);
    afterLayer.once("load", handleLoad);

    beforeLayer.addTo(map);
    afterLayer.addTo(map);

    const sideBySideControl = L.control
      .sideBySide(beforeLayer, afterLayer)
      .addTo(map);

    return () => {
      map.removeLayer(beforeLayer);
      map.removeLayer(afterLayer);
      sideBySideControl.remove();
    };
  }, [data, map, setterFunction]);

  return null;
}

function LeafletMap() {
  const { mau_forest, selectedTile, setIsMapLoading } =
    useContext(ShapefileContext)!;

  if (!mau_forest) return null;
  const center: L.LatLngExpression = [-0.3809076267889981, 35.86911727658737];

  const forest_Style: StyleFunction = () => ({
    color: "#2E7D32",
    weight: 2,
    fillColor: "gray",
    fillOpacity: 0.2,
  });

  const activeLayers = Array.isArray(selectedTile)
    ? selectedTile
    : selectedTile
      ? [selectedTile]
      : [];

  const hasClassificationLayer = activeLayers.some(
    (layer) => layer.dataset === "classification",
  );

  return (
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
        {selectedTile.length ? (
          selectedTile.length === 2 ? (
            <LayerComparison
              data={selectedTile}
              setterFunction={setIsMapLoading}
            />
          ) : (
            <LayersControl.Overlay
              key={selectedTile[0].dataset.concat(String(selectedTile[0].year))}
              name={`${selectedTile[0].dataset} ${selectedTile[0].year}`}
              checked
            >
              <TileLayer
                url={selectedTile[0].url}
                noWrap={true}
                eventHandlers={{
                  load: () => setIsMapLoading(false),
                  tileerror: () => setIsMapLoading(false),
                }}
              />
            </LayersControl.Overlay>
          )
        ) : null}
        <LayersControl.Overlay name="mau forest">
          <GeoJSON data={mau_forest} style={forest_Style} />
        </LayersControl.Overlay>
      </LayersControl>
      {hasClassificationLayer && <ClassificationLegend />}
    </MapContainer>
  );
}

export default LeafletMap;
