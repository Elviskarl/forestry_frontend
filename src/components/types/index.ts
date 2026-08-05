interface ServerResponse {
  message: string;
}
export interface SuccessfulResponse extends ServerResponse {
  data: { dataset: string; map: string; year: string };
}
export interface ComparisonResponse extends ServerResponse {
  data: SuccessfulResponse["data"][];
}

export interface MiniMapProps {
  description: string;
  url: string;
  data: MiniMapUrlDetails | MiniMapUrlDetails[];
  purpose: "comparison" | "single" | "overlay";
}

export interface MiniMapUrlDetails {
  dataset: "landsat" | "classification";
  year: number;
}
