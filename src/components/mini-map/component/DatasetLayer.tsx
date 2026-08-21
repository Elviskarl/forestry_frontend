import { LayersControl, TileLayer } from "react-leaflet";
import type { ComparisonResponse } from "../../types";
import downArrowUrl from "../../../assets/down_arrow.svg";
import { useState } from "react";

interface DatasetLayerProps {
  data: ComparisonResponse["data"];
}
function ClassificationLegend() {
  const [isMinimized, setIsMinimized] = useState(false);

  function handleClick() {
    setIsMinimized((prevVal) => !prevVal);
  }
  return (
    <div className="classification-legend">
      <div
        className={`${isMinimized ? "legend-title-container-minimized" : ""} legend-title-container`}
      >
        <strong>Legend</strong>
        <div
          className={`${isMinimized ? "legend-dropdown-container-minimized" : ""} legend-dropdown-container`}
          onClick={handleClick}
          title={isMinimized ? "expand" : "collapse"}
        >
          <img src={downArrowUrl} alt="arrow" />
        </div>
      </div>

      <div
        className={`${isMinimized ? "legend-classes-container-minimized" : ""} legend-classes-container`}
      >
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
