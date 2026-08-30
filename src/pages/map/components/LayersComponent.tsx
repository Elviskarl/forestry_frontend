import {
  useContext,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from "react";
import { ShapefileContext } from "../../../context/createShapefileContext";
import type { MiniMapUrlDetails } from "../../../components/types";
import { getTile } from "../../../components/mini-map/utils/utils";
import DatasetOptions from "./DatasetsOption";
import { BeatLoader } from "react-spinners";

export default function LayersComponent() {
  const { setSelectedTile, selectedTile, isMapLoading, setIsMapLoading } =
    useContext(ShapefileContext)!;
  const [layerData, setLayerData] = useState<MiniMapUrlDetails[]>([]);

  const [compareLayers, setCompareLayers] = useState(false);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (layerData.length === 0) return;

    const isMissing = layerData.some((layer) => !layer.dataset || !layer.year);

    if (isMissing) return;

    try {
      setIsMapLoading(true);

      if (!compareLayers) {
        const layer = layerData[0];

        const data = await getTile(
          layer,
          `${import.meta.env.VITE_API_URL}/api/v1/tiles`,
          false,
        );

        if (Array.isArray(data)) {
          throw new Error("Expected a single tile response");
        }

        setSelectedTile({
          ...layer,
          url: data.map,
        });

        return;
      }

      // Compare layers
      const data = await getTile(layerData, "/api/v1/tiles/comparisons", true);

      if (!Array.isArray(data) || data.length !== 2) {
        throw new Error("Expected exactly two layers for comparison");
      }

      const selectedData = data.map((layer) => ({
        dataset: layer.dataset as "landsat" | "classification",
        year: Number(layer.year),
        url: layer.map,
      }));

      setSelectedTile(selectedData);
    } catch (error) {
      console.error("Failed to load tile:", error);
    }
  }

  function removeFromMap() {
    setSelectedTile([]);
    setLayerData([]);
  }

  const activeLayers = Array.isArray(selectedTile)
    ? selectedTile
    : selectedTile
      ? [selectedTile]
      : [];

  return (
    <div className="sidebar-item">
      <form className="dataset-selection-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Comparison slider [optional]</legend>
          <div className="checkbox-container">
            <input
              type="checkbox"
              name="compare"
              id="compare-datasets"
              checked={compareLayers}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const checked = e.target.checked;

                setCompareLayers(checked);

                if (!checked) {
                  setLayerData((prev) => prev.slice(0, 1));
                }
              }}
            />
            <label htmlFor="compare-datasets">Compare two datasets</label>
          </div>
        </fieldset>
        {compareLayers ? (
          <div className="dataset-fieldset-container">
            <div className="dataset-fieldset">
              <span>first layer :</span>
              <DatasetOptions
                comparison={compareLayers}
                data={layerData}
                setData={setLayerData}
                layerIndex={0}
              />
            </div>
            <div className="dataset-fieldset">
              <span>second layer :</span>
              <DatasetOptions
                comparison={compareLayers}
                data={layerData}
                setData={setLayerData}
                layerIndex={1}
              />
            </div>
          </div>
        ) : (
          <DatasetOptions
            comparison={compareLayers}
            data={layerData}
            setData={setLayerData}
            layerIndex={0}
          />
        )}
        <div className="buttons-container">
          <button
            className="add-to-map-btn"
            disabled={
              layerData.length < 1 ||
              !layerData[0]?.dataset ||
              !layerData[0]?.year
            }
            title="Add layer"
          >
            Add
          </button>
          <BeatLoader color="#32cd32" loading={isMapLoading} size={8} />
          <button
            className="remove-from-map-btn"
            onClick={removeFromMap}
            disabled={
              Array.isArray(selectedTile) ? selectedTile.length === 0 : false
            }
            title="Remove layer"
          >
            Remove
          </button>
        </div>
      </form>
      <div className="available-layers">
        <div className="available-layers-heading">
          <span className="available-layers-title">active layers</span>
        </div>
        <div className="available-layers-list">
          {activeLayers.length > 0 ? (
            activeLayers.map((layer, index) => (
              <div
                className="available-layer"
                key={`${layer.dataset}-${layer.year}-${index}`}
              >
                <span className="available-item">{layer.dataset}</span>
                <span className="available-item"> {layer.year}</span>
              </div>
            ))
          ) : (
            <span className="no-available-item">No active layers</span>
          )}
        </div>
        <div className="reference-layers">
          <div className="available-layers-heading">
            <span className="available-layers-title">reference layers</span>
          </div>
          <div className="available-layers-list">
            <div className="available-layer">
              <span className="available-item">mau forest</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
