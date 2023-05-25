import axios from "axios";
import configData from "config.json";

export let apiUrl = configData.DATABASE_API;

export const getHeartRateData = () => {
  const request = axios.get(apiUrl + "/heartRateData");
  return request.then((response) => response.data);
};

export const getSleepData = () => {
  const request = axios.get(apiUrl + "/getSleepData");
  return request.then((response) => response.data);
};
