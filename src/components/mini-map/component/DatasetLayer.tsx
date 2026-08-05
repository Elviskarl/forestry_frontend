import { LayersControl, TileLayer } from "react-leaflet";
import type { SuccessfulResponse } from "../../types";

interface DatasetLayerProps {
  data: SuccessfulResponse["data"][];
}

export default function DatasetLayer({ data }: DatasetLayerProps) {
  if (data.length !== 2) return null;

  const baseLayer = data.find((tile) => tile.dataset === "landsat");
  const overlayLayer = data.find((tile) => tile.dataset === "classification");

  if (!baseLayer || !overlayLayer) return null;
  return (
    <>
      <LayersControl.BaseLayer
        key={baseLayer.dataset.concat(baseLayer.year)}
        name={`${baseLayer.dataset} ${baseLayer.year}`}
        checked
      >
        <TileLayer url={baseLayer.map} noWrap={true} />
      </LayersControl.BaseLayer>
      <LayersControl.Overlay
        key={overlayLayer.dataset.concat(overlayLayer.year)}
        name={`${overlayLayer.dataset} ${overlayLayer.year}`}
        checked
      >
        <TileLayer url={overlayLayer.map} noWrap={true} />
      </LayersControl.Overlay>
    </>
  );
}
