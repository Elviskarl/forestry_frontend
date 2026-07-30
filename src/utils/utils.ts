import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";

export async function loadBoundary(
  filename: string,
): Promise<FeatureCollection<Polygon | MultiPolygon>> {
  const res = await fetch(`${import.meta.env.BASE_URL}data/${filename}`);

  if (!res.ok) throw new Error(`Failed to load boundary: ${res.statusText}`);
  const data = (await res.json()) as FeatureCollection<Polygon | MultiPolygon>;
  return data;
}
