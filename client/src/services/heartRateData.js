import axios from "axios";
import configData from "config.json";

const baseUrl = configData.DATABASE_API;

export const getHeartRateData = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
