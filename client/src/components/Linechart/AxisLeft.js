import React, { memo } from "react";

export const AxisLeft = memo(({ yScale, innerWidth, tickOffset = 3 }) =>
  yScale.ticks().map((tickValue) => (
    <g
      key={tickValue}
      className="tick"
      transform={`translate(0, ${yScale(tickValue)})`}
    >
      <line x2={innerWidth} />
      <text
        key={tickValue}
        style={{ textAnchor: "end" }}
        x={-tickOffset}
        dy="0.32em"
      >
        {tickValue}
      </text>
      {console.log("AxisLeft")}
    </g>
  ))
);
