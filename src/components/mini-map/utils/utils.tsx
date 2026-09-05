import { tileDataCache } from "../../../cache/dataCache";
import type { MiniMapUrlDetails, SuccessfulResponse } from "../../types";

export async function getTile(data: MiniMapUrlDetails[], url: string) {
  const results: SuccessfulResponse["data"][] = [];

  for (const item of data) {
    const cachedData = tileDataCache.get(item.dataset, item.year);
    if (cachedData) {
      results.push(cachedData);
      continue;
    }
    const request = new Request(url.concat(`/${item.dataset}/${item.year}`), {
      method: "GET",
    });
    const result = await fetch(request);

    if (!result.ok) {
      throw new Error(`Tile request failed: ${result.status}`);
    }

    const tileData = (await result.json()) as SuccessfulResponse;

    tileDataCache.set(
      tileData.data.dataset,
      Number(tileData.data.year),
      tileData.data,
      18000, // 5 hours
    );
    results.push(tileData.data);
  }
  return results;
}
