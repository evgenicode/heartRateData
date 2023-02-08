export const getTimeDifference = (data) => {
  const startDate = data.length >= 1 ? data[0].startTime : undefined;
  const endDate =
    data.length >= 1 ? data[data.length - 1].startTime : undefined;
  const timeDifference = endDate - startDate;
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
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
