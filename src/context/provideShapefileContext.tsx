import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import { ShapefileContext } from "./createShapefileContext";
import { useEffect, useState } from "react";
import { loadBoundary } from "../utils/utils";

export function ShapefileContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mau_forest, set_mau_forest] = useState<FeatureCollection<
    Polygon | MultiPolygon
  > | null>(null);
  const [target_counties, set_target_counties] = useState<FeatureCollection<
    Polygon | MultiPolygon
  > | null>(null);

  useEffect(() => {
    async function loadShapefile() {
      try {
        set_mau_forest(await loadBoundary("mau_forest_reserve.geojson"));
        set_target_counties(await loadBoundary("target_counties.json"));
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
