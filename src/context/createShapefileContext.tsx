import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import { createContext, type RefObject } from "react";

interface shapefileContext {
  mau_forest: RefObject<FeatureCollection<Polygon | MultiPolygon> | null>;
  target_counties: RefObject<FeatureCollection<Polygon | MultiPolygon> | null>;
}
export const ShapefileContext = createContext<shapefileContext | null>(
  null,
);
