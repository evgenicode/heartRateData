import { timeFormat } from "d3";

export const getTickFormat = (data) => {
  const timeDifference = data[data.length - 1].startTime - data[0].startTime;
  let tickFormat = undefined;

  if (timeDifference < 24 * 60 * 60 * 1000) {
    tickFormat = timeFormat("%H:%M");
  } else if (
    timeDifference >= 24 * 60 * 60 * 1000 &&
    timeDifference < 3 * 24 * 60 * 60 * 1000
  ) {
    tickFormat = timeFormat("%a %\n%H:%M");
  } else {
    tickFormat = timeFormat("%a");
  }

  return tickFormat;
};
