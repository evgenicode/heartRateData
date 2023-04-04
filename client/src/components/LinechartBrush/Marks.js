import { line, curveNatural } from "d3";
import { useMemo } from "react";

export const Marks = ({ data, xScale, yScale, xValue, yValue }) => (
  <g className="marks">
    {useMemo(
      () => (
        <>
          <path
            fill="none"
            stroke="#ad1d13"
            d={line()
              .x((d) => xScale(xValue(d)))
              .y((d) => yScale(yValue(d)))
              .curve(curveNatural)(data)}
          />
        </>
      ),
      [data, xScale, xValue, yScale, yValue]
    )}
  </g>
);
