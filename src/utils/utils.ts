import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import type { StatsResponse } from "../components/types";

export async function loadBoundary(
  filename: string,
): Promise<FeatureCollection<Polygon | MultiPolygon>> {
  const res = await fetch(`${import.meta.env.BASE_URL}data/${filename}`);

  if (!res.ok) throw new Error(`Failed to load boundary: ${res.statusText}`);
  const data = (await res.json()) as FeatureCollection<Polygon | MultiPolygon>;
  return data;
}

export function getAreaData(data: StatsResponse["data"] | null, year: number) {
  if (!data) return [];
  try {
    const doi = data.find((item) => Number(item.year) === year);
    if (!doi) return [];
    return doi.areaData.sort((a, b) => b.hectares - a.hectares);
  } catch (error) {
    console.error("Error processing area data:", error);
    return [];
  }
}
