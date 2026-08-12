import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import { createContext } from "react";
import type { StatsResponse } from "../components/types";

interface shapefileContext {
  mau_forest: FeatureCollection<Polygon | MultiPolygon> | null;
  target_counties: FeatureCollection<Polygon | MultiPolygon> | null;
  statisticData: StatsResponse["data"] | null;
}
export const ShapefileContext = createContext<shapefileContext | null>(null);
