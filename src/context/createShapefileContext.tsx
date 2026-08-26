import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import { createContext, type Dispatch, type SetStateAction } from "react";
import type { selectedTileDetails, StatsResponse } from "../components/types";

interface shapefileContext {
  mau_forest: FeatureCollection<Polygon | MultiPolygon> | null;
  target_counties: FeatureCollection<Polygon | MultiPolygon> | null;
  statisticData: StatsResponse["data"] | null;
  selectedTile: selectedTileDetails | selectedTileDetails[];
  setSelectedTile: Dispatch<
    SetStateAction<selectedTileDetails | selectedTileDetails[]>
  >;
}
export const ShapefileContext = createContext<shapefileContext | null>(null);
