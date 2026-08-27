import { useContext } from "react";
import { ShapefileContext } from "../../../context/createShapefileContext";
import { getAreaData } from "../../../utils/utils";
import "../styles/statsTableStyle.css";
import { ScaleLoader } from "react-spinners";

function StatsTable({ year }: { year: number }) {
  const { statisticData, isConnecting } = useContext(ShapefileContext)!;
  return (
    <>
      <p className="text">
        The table below summarizes the estimated extent of each land-cover class
        in hectares.
      </p>
      <div className="table-container">
        <table>
          <caption>Classified area</caption>
          <thead>
            <tr>
              <th>Class</th>
              <th>Area (hectares)</th>
            </tr>
          </thead>
          <tbody>
            {!statisticData ? (
              <tr className="loader-container">
                <td colSpan={2}>
                  <ScaleLoader
                    color="var(--tertiary-shade)"
                    loading={isConnecting}
                    cssOverride={{
                      display: "inline-block",
                    }}
                  />
                </td>
              </tr>
            ) : (
              getAreaData(statisticData, year).map((data) => (
                <tr key={data.class}>
                  <td>{data.class}</td>
                  <td>{data.hectares.toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default StatsTable;
