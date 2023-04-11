import { useState, useEffect } from "react";
import { getHeartRateData } from "services/healthData";

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getHeartRateData()
      .then((data) =>
        data.map((item) => ({
          startTime: new Date(item.startTime),
          value: +item.value,
        }))
      )
      .then((formattedData) => {
        setData(formattedData);
      });
  }, []);

  return data;
};
