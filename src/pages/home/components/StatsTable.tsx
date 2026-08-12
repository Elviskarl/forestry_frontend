import { useContext } from "react";
import { ShapefileContext } from "../../../context/createShapefileContext";
import { getAreaData } from "../../../utils/utils";

function StatsTable({ year }: { year: number }) {
  const { statisticData } = useContext(ShapefileContext)!;
  return (
    <>
      <p className="text">
        The table below summarizes the estimated extent of each land-cover class
        in hectares.
      </p>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Class</th>
              <th>Area (hectares)</th>
            </tr>
          </thead>
          <tbody>
            {statisticData &&
              getAreaData(statisticData, year).map((data) => (
                <tr key={data.class}>
                  <td>{data.class}</td>
                  <td>{data.hectares.toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default StatsTable;
