// TODO: the "undefined"s below if removed trigger a weird bug in HeartRateGraphView.js
// ternary operator in const filteredData is failing to return the expected value
export const getTimeline = (data) => {
  const startDate = data.length >= 1 ? data[0].startTime : undefined;
  const endDate =
    data.length >= 1 ? data[data.length - 1].startTime : undefined;
  const timeDifference = endDate - startDate;

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const minutesTotal = days * 24 * 60 + hours * 60 + minutes;
  return { days, hours, minutes, minutesTotal, timeDifference };
};

export const infinityNaNguard = (data) =>
  data === Infinity || isNaN(data) ? 0 : data;

// TODO: imporove all visual artifacts
export const tickModifier = (data) => {
  let axisTickModifier;
  if (data >= 825) {
    axisTickModifier = 8;
  } else if (data >= 690) {
    axisTickModifier = 7;
  } else if (data >= 510) {
    axisTickModifier = 6;
  } else if (data >= 400) {
    axisTickModifier = 4;
  } else {
    axisTickModifier = 2;
  }

  return axisTickModifier;
};

export const dataExtentFilter = ({ dataExtent, data, xValue }) =>
  dataExtent
    ? data.filter((d) => {
        const date = xValue(d);
        return date > dataExtent[0] && date < dataExtent[1];
      })
    : data;
