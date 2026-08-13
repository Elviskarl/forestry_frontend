interface ServerResponse {
  message: string;
}
export interface SuccessfulResponse extends ServerResponse {
  data: {
    dataset: string;
    map: string;
    year: string;
    expiresIn: number | null;
  };
}
export interface ComparisonResponse extends ServerResponse {
  data: SuccessfulResponse["data"][];
}

export interface MiniMapProps {
  description: string;
  url: string;
}

export interface DoubleMiniMapProps extends MiniMapProps {
  purpose: "comparison" | "overlay";
  data: MiniMapUrlDetails[];
}

export interface SingleMiniMapProps extends MiniMapProps {
  purpose: "single";
  data: MiniMapUrlDetails;
}
export interface MiniMapUrlDetails {
  dataset: "landsat" | "classification";
  year: number;
}

export interface StatsResponse extends ServerResponse {
  data: {
    year: string;
    areaData: {
      class:
        | "Forest"
        | "Water"
        | "Urban"
        | "Bare soil"
        | "Herbaceous vegetation";
      hectares: number;
    }[];
  }[];
}
