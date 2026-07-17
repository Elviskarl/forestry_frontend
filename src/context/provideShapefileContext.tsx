import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import { ShapefileContext } from "./createShapefileContext";
import { useEffect, useRef } from "react";
import { loadBoundary } from "../utils/utils";

export function ShapefileContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const mau_forest = useRef<FeatureCollection<Polygon | MultiPolygon> | null>(
    null,
  );
  const target_counties = useRef<FeatureCollection<
    Polygon | MultiPolygon
  > | null>(null);

  useEffect(() => {
    async function loadShapefile() {
      try {
        if (!mau_forest.current) {
          const data = await loadBoundary("mau_forest_reserve.geojson");
          mau_forest.current = data;
        }
        if (!target_counties.current) {
          const data = await loadBoundary("target_counties.json");
          target_counties.current = data;
        }
      } catch (error) {
        console.error("Error loading shapefile:", error);
      }
    }
    loadShapefile();
  }, []);
  return (
    <ShapefileContext.Provider value={{ mau_forest, target_counties }}>
      {children}
    </ShapefileContext.Provider>
  );
}
