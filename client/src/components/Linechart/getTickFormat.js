import { timeFormat } from "d3";

export const getTickFormat = (data) => {
  const startDate = data.length >= 1 ? data[0].startTime : undefined;
  const endDate =
    data.length >= 1 ? data[data.length - 1].startTime : undefined;
  const timeDifference = endDate - startDate;

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
