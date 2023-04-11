export const MarksSleep = ({ sleepData, xScale, yScale, xValue }) => {
  if (sleepData === undefined) {
    return;
  }
  const formattedSleepData = sleepData.map((d) => ({
    ...d,
    startTime: new Date(d.startTime),
    endTime: new Date(d.endTime),
  }));

  return formattedSleepData.map((d, i) => (
    <rect
      className="mark"
      key={i}
      x={xScale(xValue(d))}
      y={0}
      width={xScale(d.endTime) - xScale(d.startTime)}
      height={yScale.range()[0]}
    >
      {/* <title>{tooltipFormat(xValue(d))}</title> */}
    </rect>
  ));
};
