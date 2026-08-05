import { useMap } from "react-leaflet";
import * as L from "leaflet";
import type { SuccessfulResponse } from "../../types";
import { useEffect } from "react";
import "leaflet-side-by-side";

interface CompareLayersProps {
  data: SuccessfulResponse["data"][];
}

export function ComparisonLayer({ data }: CompareLayersProps) {
  const map = useMap();
  useEffect(() => {

    if (data.length === 2) {
      const beforeLayer = L.tileLayer(data[0].map, { noWrap: true });
      const afterLayer = L.tileLayer(data[1].map, { noWrap: true });

      beforeLayer.addTo(map);
      afterLayer.addTo(map);

      const sideBySideControl = L.control
        .sideBySide(beforeLayer, afterLayer)
        .addTo(map);

      return () => {
        map.removeLayer(beforeLayer);
        map.removeLayer(afterLayer);
        sideBySideControl.remove();
      };
    }
  }, [data, map]);
  return null;
}
