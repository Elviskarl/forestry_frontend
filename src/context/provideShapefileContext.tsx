import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import { ShapefileContext } from "./createShapefileContext";
import { useEffect, useState } from "react";
import { loadBoundary } from "../utils/utils";
import type { selectedTileDetails, StatsResponse } from "../components/types";

export function ShapefileContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mau_forest, set_mau_forest] = useState<FeatureCollection<
    Polygon | MultiPolygon
  > | null>(null);
  const [statisticData, setStatisticData] = useState<
    StatsResponse["data"] | null
  >(null);
  const [selectedTile, setSelectedTile] = useState<
    selectedTileDetails | selectedTileDetails[]
  >([]);
  const [isMapLoading, setIsMapLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    async function loadShapefile() {
      try {
        set_mau_forest(await loadBoundary("mau_forest_reserve.geojson"));
      } catch (error) {
        console.error("Error loading shapefile:", error);
      }
    }
    async function fetchStatistics() {
      try {
        setIsConnecting(true);
        const response = await fetch("/api/v1/stats");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const statsResponseData: StatsResponse = await response.json();
        const { data } = statsResponseData;
        setStatisticData(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsConnecting(false);
      }
    }
    loadShapefile();
    fetchStatistics();
  }, []);
  return (
    <ShapefileContext.Provider
      value={{
        mau_forest,
        statisticData,
        selectedTile,
        setSelectedTile,
        isMapLoading,
        setIsMapLoading,
        isConnecting,
        setIsConnecting,
      }}
    >
      {children}
    </ShapefileContext.Provider>
  );
}
