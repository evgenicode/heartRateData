import axios from "axios";

const baseUrl = "http://localhost:5000/api/heartRateData";

export const getHeartRateData = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
