import type {
  ComparisonResponse,
  MiniMapUrlDetails,
  SuccessfulResponse,
} from "../../types";

export async function getTile(
  data: MiniMapUrlDetails | MiniMapUrlDetails[],
  url: string,
  comparison: boolean,
) {
  if (comparison) {
    const request = new Request(`${import.meta.env.VITE_API_URL}${url}`, {
      method: "POST",
      body: JSON.stringify({
        data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await fetch(request);

    if (!result.ok) {
      throw new Error(`Tile request failed: ${result.status}`);
    }

    const serverResponse = (await result.json()) as ComparisonResponse;

    return serverResponse.data;
  }

  if (Array.isArray(data)) {
    throw new Error("Expected a single layer when comparison is disabled");
  }

  const request = new Request(url.concat(`/${data.dataset}/${data.year}`), {
    method: "GET",
  });

  const result = await fetch(request);

  if (!result.ok) {
    throw new Error(`Tile request failed: ${result.status}`);
  }

  const tileData = (await result.json()) as SuccessfulResponse;

  return tileData.data;
}
