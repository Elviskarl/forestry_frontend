import { LayersControl, TileLayer } from "react-leaflet";
import type { ComparisonResponse } from "../../types";

interface DatasetLayerProps {
  data: ComparisonResponse["data"];
}
function ClassificationLegend() {
  return (
    <div className="classification-legend">
      <strong>Legend</strong>

      <div>
        <span className="legend-color forest" />
        Forest
      </div>

      <div>
        <span className="legend-color herbaceous" />
        H.vegetation
      </div>

      <div>
        <span className="legend-color water" />
        Water
      </div>

      <div>
        <span className="legend-color urban" />
        Urban
      </div>

      <div>
        <span className="legend-color bare-soil" />
        Bare soil
      </div>
    </div>
  );
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
      <ClassificationLegend />
    </>
  );
}
