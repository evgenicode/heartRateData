import React, { useState } from "react";

import { useData } from "./useData";

import { Linechart } from "components/Linechart/Linechart";
import { LinechartBrush } from "components/LinechartBrush/LinechartBrush";

const width = 960;
const height = 500;
const LinechartBrushSize = 0.3;

const xValue = (d) => d.startTime;

export const HeartRateGraphView = () => {
  const data = useData();
  const [brushExtent, setBrushExtent] = useState();

  if (!data) {
    return <pre>Loading...</pre>;
  }

  const filteredData = brushExtent
    ? data.filter((d) => {
        const date = xValue(d);
        return date > brushExtent[0] && date < brushExtent[1];
      })
    : data;

  return (
    <svg width={width} height={height}>
      <Linechart
        data={filteredData}
        height={height - LinechartBrushSize * height}
        width={width}
      />
      <g transform={`translate(${0}, ${height - LinechartBrushSize * height})`}>
        <LinechartBrush
          xValue={xValue}
          data={data}
          height={LinechartBrushSize * height}
          width={width}
          setBrushExtent={setBrushExtent}
        />
      </g>
    </svg>
  );
};
