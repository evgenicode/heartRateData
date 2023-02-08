import axios from "axios";
import configData from "config.json";

let apiUrl = configData.DATABASE_API;

if (configData.DATA_ORIGIN === "local") {
  apiUrl = configData.LOCAL_DATA_STORAGE_API;
}

export const getHeartRateData = () => {
  const request = axios.get(apiUrl);
  return request.then((response) => response.data);
};
