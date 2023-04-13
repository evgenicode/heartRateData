import { timeFormat } from "d3";
import { getTimeline } from "utils";

export const getTickFormat = (data) => {
  const { timeDifference } = getTimeline(data);

  let tickFormat = undefined;
  if (timeDifference < 24 * 60 * 60 * 1000) {
    tickFormat = timeFormat("%H:%M");
  } else if (
    timeDifference >= 24 * 60 * 60 * 1000 &&
    timeDifference < 3 * 24 * 60 * 60 * 1000
  ) {
    tickFormat = timeFormat("%a %\n%H:%M");
  } else if (
    timeDifference >= 3 * 24 * 60 * 60 * 1000 &&
    timeDifference < 30 * 24 * 60 * 60 * 1000
  ) {
    tickFormat = timeFormat("%a");
  } else {
    tickFormat = timeFormat("%e %b");
  }

  return tickFormat;
};
