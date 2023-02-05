import { line, curveBasis } from "d3";

export const Marks = ({ data, xScale, yScale, xValue, yValue }) => (
  <g className="marks">
    <path
      fill="none"
      stroke="black"
      d={line()
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(yValue(d)))
        .curve(curveBasis)(data)}
    />
  </g>
);