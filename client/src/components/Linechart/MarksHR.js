import { line, curveBasis } from "d3";

export const MarksHR = ({ data, xScale, yScale, xValue, yValue }) => (
  <g className="marks">
    <path
      fill="none"
      stroke="#ad1d13"
      d={line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(yValue(d)))
        .curve(curveBasis)(data)}
    />
  </g>
);
