import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import { createContext, type Dispatch, type SetStateAction } from "react";
import type { selectedTileDetails, StatsResponse } from "../components/types";

interface shapefileContext {
  mau_forest: FeatureCollection<Polygon | MultiPolygon> | null;
  statisticData: StatsResponse["data"] | null;
  selectedTile: selectedTileDetails[];
  setSelectedTile: Dispatch<SetStateAction<selectedTileDetails[]>>;
  isMapLoading: boolean;
  setIsMapLoading: Dispatch<SetStateAction<boolean>>;
  isConnecting: boolean;
  setIsConnecting: Dispatch<SetStateAction<boolean>>;
}
export const ShapefileContext = createContext<shapefileContext | null>(null);
