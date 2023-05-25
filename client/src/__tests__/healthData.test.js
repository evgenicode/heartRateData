import axios from "axios";
import { getHeartRateData, getSleepData } from "services/healthData";
import { apiUrl } from "services/healthData";

jest.mock("axios");

describe("getHeartRateData", () => {
  it("fetches heart rate data from the API", async () => {
    const responseData = { heartRate: 80 };
    axios.get.mockResolvedValueOnce({ data: responseData });

    const result = await getHeartRateData();

    expect(result).toEqual(responseData);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(apiUrl + "/heartRateData");
  });
});

describe("getSleepData", () => {
  it("fetches heart rate data from the API", async () => {
    const responseData = { data: "mockData" };
    axios.get.mockResolvedValueOnce({ data: responseData });

    const result = await getSleepData();

    expect(result).toEqual(responseData);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(apiUrl + "/getSleepData");
  });
});
