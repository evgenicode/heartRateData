import { tickModifier } from "utils";
import { memo } from "react";

export const AxisBottom = memo(
  ({ xScale, innerHeight, tickFormat, tickOffset = 3, width }) =>
    xScale.ticks(tickModifier(width)).map((tickValue) => (
      <g
        className="tick"
        key={tickValue}
        transform={`translate(${xScale(tickValue)}, 0)`}
      >
        <line y2={innerHeight} />

        <text
          style={{ textAnchor: "middle" }}
          dy="0.71em"
          y={innerHeight + tickOffset}
        >
          {tickFormat(tickValue)}
        </text>
      </g>
    ))
);
