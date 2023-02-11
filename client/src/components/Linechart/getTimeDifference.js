import { getTimeline } from "utils";

export const getTimeDifference = (data) => {
  const { days, hours, minutes } = getTimeline(data);

  if (isNaN(days)) {
    return `Please select time period`;
  } else if (days >= 1) {
    return `${days} days, ${hours} hours, ${minutes} minutes`;
  } else if (hours >= 1) {
    return `${hours} hours, ${minutes} minutes`;
  } else {
    return `${minutes} minutes`;
  }
};
