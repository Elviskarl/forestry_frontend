import { type Dispatch, type SetStateAction } from "react";
import type { MiniMapUrlDetails } from "../../../components/types";
import { assets } from "./data";

export default function DatasetOptions({
  data,
  setData,
  layerIndex,
}: {
  comparison: boolean;
  data: MiniMapUrlDetails[];
  setData: Dispatch<SetStateAction<MiniMapUrlDetails[]>>;
  layerIndex: number;
}) {
  return (
    <>
      <fieldset>
        <legend>Select dataset</legend>
        <select
          name="dataset"
          id="dataset"
          value={data[layerIndex]?.dataset || ""}
          onChange={(e) => {
            const value = e.target.value as MiniMapUrlDetails["dataset"];
            setData((prevData) => {
              const newData = [...prevData];

              newData[layerIndex] = {
                ...newData[layerIndex],
                dataset: value,
                year: 0,
              };

              return newData;
            });
          }}
          required
        >
          <option value="" disabled>
            --please choose an option--
          </option>
          {Object.keys(assets).map((val, index) => (
            <option key={val.concat(String(index))} value={val}>
              {val}
            </option>
          ))}
        </select>
      </fieldset>
      <fieldset>
        <legend>Select year</legend>
        <select
          name="year"
          id="year"
          disabled={!data[layerIndex]?.dataset}
          value={data[layerIndex]?.year || 0}
          onChange={(e) => {
            const value = Number(e.target.value) as MiniMapUrlDetails["year"];

            setData((prevData) => {
              const newData = [...prevData];

              if (!newData[layerIndex]) {
                return prevData;
              }

              newData[layerIndex] = {
                ...newData[layerIndex],
                year: value,
              };

              return newData;
            });
          }}
          required
        >
          <option value={0} disabled>
            --please choose an option--
          </option>
          {data[layerIndex]?.dataset &&
            assets[data[layerIndex]?.dataset].years.map((val, index) => (
              <option value={val} key={String(val).concat(String(index))}>
                {val}
              </option>
            ))}
        </select>
      </fieldset>
    </>
  );
}
