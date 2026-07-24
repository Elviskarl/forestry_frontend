import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import { createContext } from "react";

interface shapefileContext {
  mau_forest: FeatureCollection<Polygon | MultiPolygon> | null;
  target_counties: FeatureCollection<Polygon | MultiPolygon> | null;
}
export const ShapefileContext = createContext<shapefileContext | null>(null);
